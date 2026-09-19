/// <reference types="vite/client" />
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Cliente de Supabase para el formulario de presupuesto.
 *
 * Se construye al cargar el módulo, así que cualquier excepción aquí impide
 * montar React y deja la web en blanco entera. Ya pasó una vez: una variable
 * de entorno mal pegada en Vercel tumbó el sitio completo, no solo el envío
 * del formulario.
 *
 * Por eso nada de lo que hay debajo lanza. Si la configuración no sirve,
 * `supabase` vale null y quien lo use se encarga; el resto de la web
 * —teléfono, WhatsApp, fotos, páginas legales— sigue funcionando.
 */

/** Quita espacios y comillas sueltas que se cuelan al copiar y pegar. */
function limpiar(valor: string | undefined): string {
  return (valor ?? "").trim().replace(/^["']|["']$/g, "");
}

function crearCliente(): SupabaseClient<Database> | null {
  const url = limpiar(import.meta.env.VITE_SUPABASE_URL);
  const clave = limpiar(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

  if (!url || !clave) {
    avisar("Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY.");
    return null;
  }

  // El error clásico es pegar la línea entera del .env en el campo de valor,
  // con lo que el valor acaba siendo "VITE_SUPABASE_URL=https://...".
  if (!/^https?:\/\//i.test(url)) {
    avisar(
      `VITE_SUPABASE_URL no empieza por https:// (vale "${url}"). ` +
        "Si ahí aparece el nombre de la variable, en Vercel se pegó la línea " +
        "completa en el campo Value en lugar de solo el valor.",
    );
    return null;
  }

  try {
    return createClient<Database>(url, clave, {
      auth: {
        storage: localStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  } catch (e) {
    avisar(`Supabase rechazó la configuración: ${(e as Error).message}`);
    return null;
  }
}

function avisar(mensaje: string) {
  // eslint-disable-next-line no-console
  console.error(`[supabase] ${mensaje} El formulario de contacto no funcionará.`);
}

export const supabase = crearCliente();

/** Para que quien envíe el formulario sepa si hay a dónde enviarlo. */
export const supabaseConfigurado = supabase !== null;
