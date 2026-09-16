/**
 * Datos identificativos de la empresa para las páginas legales.
 *
 * Los campos marcados como PENDIENTE deben rellenarse con los datos reales
 * antes de publicar. Un aviso legal incompleto no cumple el artículo 10 de la
 * LSSI-CE (Ley 34/2002) y expone a sanción.
 */

export const LEGAL = {
  /** Nombre comercial: el que ve el cliente. */
  nombreComercial: "IRC Service",

  /** Razón social del titular del sitio web. */
  razonSocial: "IRC Service, S.L.",

  /** CIF de la sociedad. Verificado: el dígito de control (5) es correcto. */
  nif: "B88421045",

  /** Domicilio social / centro de trabajo. */
  direccion: "Calle Invierno 2, Nave 25 · Polígono Industrial Las Monjas",
  codigoPostal: "28850",
  localidad: "Torrejón de Ardoz",
  provincia: "Madrid",
  pais: "España",

  /**
   * PENDIENTE: datos de inscripción en el Registro Mercantil.
   * Obligatorio para sociedades (art. 10.1.a LSSI-CE). Están en la primera
   * hoja de la escritura de constitución.
   * Formato: "Registro Mercantil de Madrid, tomo 00000, folio 00, hoja M-000000".
   */
  registro: "[PENDIENTE: tomo, folio y hoja del Registro Mercantil de Madrid]",

  /** Proveedor de alojamiento web. */
  hosting: {
    nombre: "Vercel Inc.",
    ubicacion:
      "Estados Unidos, con red de distribución global. La región concreta del proyecto se consulta en el panel de Vercel",
  },

  /** Fecha de la última revisión de los textos legales. */
  ultimaActualizacion: "16 de septiembre de 2026",
} as const;

/** Dirección en una sola línea, para el pie y los datos estructurados. */
export const DIRECCION_COMPLETA = `${LEGAL.direccion}, ${LEGAL.codigoPostal} ${LEGAL.localidad}, ${LEGAL.provincia}`;

/**
 * Valida el carácter de control de un CIF español.
 * Suma los dígitos de posición par y, para los de posición impar, los duplica
 * y suma las cifras del resultado. El control es el complemento a 10 de la
 * última cifra del total, expresado como número o como letra según la forma
 * jurídica.
 */
export function cifValido(cif: string): boolean {
  const limpio = cif.trim().toUpperCase().replace(/[\s-]/g, "");
  if (!/^[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]$/.test(limpio)) return false;

  const digitos = limpio.slice(1, 8);
  let suma = 0;
  for (let i = 0; i < 7; i++) {
    const d = Number(digitos[i]);
    // Posiciones impares (índice par) se duplican y se suman sus cifras.
    suma += i % 2 === 0 ? Math.floor((d * 2) / 10) + ((d * 2) % 10) : d;
  }

  const control = (10 - (suma % 10)) % 10;
  return limpio[8] === String(control) || limpio[8] === "JABCDEFGHI"[control];
}

/** Lista legible de lo que falta por rellenar. Vacía = listo para publicar. */
export function datosLegalesPendientes(): string[] {
  const pendientes: string[] = [];
  const marcado = (v: string) => v.includes("[PENDIENTE");

  if (marcado(LEGAL.razonSocial)) pendientes.push("la razón social");
  if (marcado(LEGAL.nif)) pendientes.push("el CIF");
  else if (!cifValido(LEGAL.nif))
    pendientes.push(`el CIF (${LEGAL.nif} no supera la validación del dígito de control)`);
  if (LEGAL.registro && marcado(LEGAL.registro)) pendientes.push("los datos del Registro Mercantil");
  if (marcado(LEGAL.hosting.nombre)) pendientes.push("el proveedor de alojamiento");

  return pendientes;
}
