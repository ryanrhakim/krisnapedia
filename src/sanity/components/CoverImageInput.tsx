import { useCallback, useMemo, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { set, unset, type ObjectInputProps } from "sanity";
import { Stack, Text, Card, Flex, Box } from "@sanity/ui";
import { urlFor } from "@/lib/sanity";

/**
 * Custom cover image input for KRISNApedia.
 *
 * Replaces Sanity's built-in hotspot (circle) + crop (rectangle) tools with a
 * single Instagram-style pan-and-zoom cropper locked to the 4:3 aspect ratio
 * of the content cards. The resulting crop is written to the field's native
 * `crop` and `hotspot` values so `@sanity/image-url` still applies them at
 * render time — no frontend changes required.
 */

const ASPECT = 4 / 3;

type CoverImageValue = {
  asset?: { _ref?: string; _type?: string };
  hotspot?: { x: number; y: number; width: number; height: number; _type?: string };
  crop?: { top: number; bottom: number; left: number; right: number; _type?: string };
  _type?: string;
};

function pctAreaToSanity(area: Area) {
  // react-easy-crop reports croppedArea in percent (0-100) relative to the
  // full image. Convert to Sanity's crop (0-1 from each edge) and hotspot
  // (0-1 center + size).
  const x = area.x / 100;
  const y = area.y / 100;
  const w = area.width / 100;
  const h = area.height / 100;
  const crop = {
    _type: "sanity.imageCrop",
    top: Math.max(0, y),
    left: Math.max(0, x),
    bottom: Math.max(0, 1 - (y + h)),
    right: Math.max(0, 1 - (x + w)),
  };
  const hotspot = {
    _type: "sanity.imageHotspot",
    x: x + w / 2,
    y: y + h / 2,
    width: w,
    height: h,
  };
  return { crop, hotspot };
}

function sanityCropToInitialArea(
  crop: CoverImageValue["crop"] | undefined,
): { x: number; y: number; width: number; height: number } | undefined {
  if (!crop) return undefined;
  const width = Math.max(0, 1 - (crop.left ?? 0) - (crop.right ?? 0)) * 100;
  const height = Math.max(0, 1 - (crop.top ?? 0) - (crop.bottom ?? 0)) * 100;
  if (width <= 0 || height <= 0) return undefined;
  return { x: (crop.left ?? 0) * 100, y: (crop.top ?? 0) * 100, width, height };
}

export function CoverImageInput(props: ObjectInputProps<CoverImageValue>) {
  const { value, onChange, renderDefault, readOnly } = props;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const hasUserInteractedRef = useRef(false);

  const imageUrl = useMemo(() => {
    if (!value?.asset?._ref) return null;
    const b = urlFor({ asset: value.asset });
    return b ? b.width(1600).auto("format").url() : null;
  }, [value?.asset?._ref]);

  const initialArea = useMemo(
    () => sanityCropToInitialArea(value?.crop),
    [value?.crop],
  );

  const onCropComplete = useCallback(
    (area: Area) => {
      // Skip auto-fired completion on mount and any read-only view
      // (e.g. published document, insufficient permissions, reference preview).
      if (readOnly) return;
      if (!hasUserInteractedRef.current) return;
      const { crop: nextCrop, hotspot: nextHotspot } = pctAreaToSanity(area);
      onChange([set(nextCrop, ["crop"]), set(nextHotspot, ["hotspot"])]);
    },
    [onChange, readOnly],
  );

  const onReset = useCallback(() => {
    if (readOnly) return;
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    hasUserInteractedRef.current = true;
    onChange([unset(["crop"]), unset(["hotspot"])]);
  }, [onChange, readOnly]);

  const markInteracted = () => {
    hasUserInteractedRef.current = true;
  };

  return (
    <Stack space={3}>
      {/* Sanity's default image input handles upload / replace / remove. */}
      {renderDefault(props)}

      {imageUrl ? (
        <Card padding={3} radius={2} shadow={1} tone="transparent">
          <Stack space={3}>
            <Text size={1} weight="semibold">
              Atur cover (rasio kartu 4:3)
            </Text>
            <Text size={1} muted>
              Geser gambar dan gunakan slider zoom untuk mengepaskan cover
              seperti pada Instagram. Hasilnya langsung tersimpan.
            </Text>

            <Box
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                background: "#0b0b0b",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={ASPECT}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_pct, pixels) => {
                  // We only need the % area; pixels also work but require the
                  // image's natural size. Recompute from state:
                  // react-easy-crop's onCropComplete gives (croppedArea, croppedAreaPixels)
                  // croppedArea is in percent — use it directly.
                  onCropComplete(_pct);
                  void pixels;
                }}
                initialCroppedAreaPercentages={initialArea}
                objectFit="contain"
                showGrid={true}
                zoomSpeed={0.3}
                minZoom={1}
                maxZoom={4}
              />
            </Box>

            <Flex align="center" gap={3}>
              <Text size={1}>Zoom</Text>
              <input
                type="range"
                min={1}
                max={4}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                style={{ flex: 1 }}
                aria-label="Zoom cover"
              />
              <button
                type="button"
                onClick={onReset}
                style={{
                  padding: "6px 10px",
                  borderRadius: 4,
                  border: "1px solid var(--card-border-color, #333)",
                  background: "transparent",
                  color: "inherit",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                Reset crop
              </button>
            </Flex>
          </Stack>
        </Card>
      ) : null}
    </Stack>
  );
}
