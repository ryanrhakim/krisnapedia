REVOKE EXECUTE ON FUNCTION public.increment_view(text, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_view(text, text, text) TO service_role;