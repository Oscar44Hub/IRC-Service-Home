/**
 * Aviso por email cuando entra un lead del formulario de la web.
 *
 * La dispara un Database Webhook de Supabase al insertar en `leads`.
 * Se despliega desde el panel: Edge Functions → Deploy a new function →
 * Via Editor, y se pega este fichero tal cual.
 *
 * El editor del panel NO guarda historial, así que la copia buena es esta.
 * Si hay que cambiar algo, se cambia aquí, se commitea y luego se pega.
 *
 * Secretos que necesita (Edge Functions → Secrets):
 *   RESEND_API_KEY   clave de la API de Resend
 *   AVISO_TOKEN      cadena inventada, la misma que se pone en la cabecera
 *                    del webhook, para que nadie más pueda invocar la función
 *   AVISO_DESTINO    (opcional) a quién avisar; por defecto el buzón de IRC
 *   AVISO_REMITENTE  (opcional) desde qué dirección se envía
 */

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const AVISO_TOKEN = Deno.env.get("AVISO_TOKEN");
const DESTINO = Deno.env.get("AVISO_DESTINO") ?? "info@reformasentorrejon.com";
const REMITENTE = Deno.env.get("AVISO_REMITENTE") ?? "Web IRC Service <web@envios.reformasentorrejon.com>";

type Lead = {
  id?: string;
  nombre?: string;
  telefono?: string;
  email?: string | null;
  tipo_reforma?: string | null;
  superficie?: string | null;
  mensaje?: string | null;
  created_at?: string;
};

/** Evita que un nombre con < o & rompa el HTML del correo. */
function escapar(valor: unknown): string {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fila(etiqueta: string, valor: unknown): string {
  if (valor === null || valor === undefined || String(valor).trim() === "") return "";
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${etiqueta}</td>
    <td style="padding:6px 0;color:#111"><strong>${escapar(valor)}</strong></td>
  </tr>`;
}

function cuerpo(lead: Lead): string {
  const telefono = escapar(lead.telefono);
  // El teléfono se deja como enlace: el aviso se lee casi siempre en el móvil
  // y así se llama de vuelta con un toque.
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px">
  <h2 style="margin:0 0 4px;font-size:18px">Nueva solicitud de presupuesto</h2>
  <p style="margin:0 0 20px;color:#666;font-size:14px">Entrada desde el formulario de la web.</p>
  <table style="border-collapse:collapse;font-size:14px;width:100%">
    ${fila("Nombre", lead.nombre)}
    ${fila("Teléfono", lead.telefono)}
    ${fila("Email", lead.email)}
    ${fila("Tipo de reforma", lead.tipo_reforma)}
    ${fila("Superficie", lead.superficie)}
    ${fila("Mensaje", lead.mensaje)}
  </table>
  <p style="margin:24px 0 0">
    <a href="tel:${telefono}" style="background:#111;color:#fff;text-decoration:none;padding:10px 18px;display:inline-block;font-size:14px">Llamar a ${escapar(lead.nombre)}</a>
  </p>
</div>`;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Sin esto, cualquiera que descubra la URL podría gastar la cuota de envío.
  if (!AVISO_TOKEN || req.headers.get("x-aviso-token") !== AVISO_TOKEN) {
    return new Response("No autorizado", { status: 401 });
  }

  if (!RESEND_API_KEY) {
    console.error("Falta el secreto RESEND_API_KEY.");
    return new Response("Sin configurar", { status: 500 });
  }

  let lead: Lead;
  try {
    const payload = await req.json();
    // El webhook envía { type, table, schema, record, old_record }.
    lead = payload?.record ?? payload;
  } catch {
    return new Response("Cuerpo ilegible", { status: 400 });
  }

  if (!lead?.nombre && !lead?.telefono) {
    return new Response("Sin datos de lead", { status: 400 });
  }

  const envio = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: REMITENTE,
      to: [DESTINO],
      // Responder al correo contesta directamente al cliente, si lo dejó.
      ...(lead.email ? { reply_to: lead.email } : {}),
      subject: `Nuevo presupuesto: ${lead.nombre ?? "sin nombre"} · ${lead.telefono ?? ""}`.trim(),
      html: cuerpo(lead),
    }),
  });

  if (!envio.ok) {
    const detalle = await envio.text();
    console.error(`Resend respondió ${envio.status}: ${detalle}`);
    // 500 hace que el intento quede registrado como fallido en los logs del
    // webhook. El lead ya está guardado en la tabla: no se pierde nada.
    return new Response("No se pudo enviar el aviso", { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
