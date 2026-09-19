-- Tabla de leads del formulario de presupuesto de la web.
--
-- Se ejecuta una sola vez, en el SQL Editor del proyecto de Supabase de
-- IRC Service. Las columnas y sus tipos tienen que coincidir con lo que
-- declara src/integrations/supabase/types.ts y con lo que inserta
-- src/components/landing/ContactForm.tsx.

create table if not exists public.leads (
  id           uuid        primary key default gen_random_uuid(),
  nombre       text        not null,
  telefono     text        not null,
  email        text,
  tipo_reforma text,
  superficie   text,
  mensaje      text,
  created_at   timestamptz not null default now()
);

-- Sin RLS activo, la clave anónima —que viaja dentro del JavaScript que
-- descarga cualquier visitante— daría acceso libre a la tabla.
alter table public.leads enable row level security;

-- Único permiso para el público: dejar un lead. El formulario es abierto,
-- así que no hay condición que comprobar.
drop policy if exists "formulario publico puede insertar leads" on public.leads;
create policy "formulario publico puede insertar leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- A propósito NO se crea ninguna política de select, update o delete para
-- el rol anónimo: sin ellas, nadie puede leer ni tocar los datos de los
-- clientes desde el navegador. Para consultarlos se entra al panel de
-- Supabase, que usa credenciales de servicio y se salta RLS.
