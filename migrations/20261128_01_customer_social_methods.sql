BEGIN;
SET LOCAL lock_timeout = '2s';
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS social_methods_v1 jsonb NULL;
COMMIT;
