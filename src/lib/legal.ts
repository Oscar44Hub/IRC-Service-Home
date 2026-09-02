/**
 * Datos identificativos de la empresa para las páginas legales.
 *
 * ⚠️ PENDIENTE DE COMPLETAR POR IRC SERVICE ⚠️
 * Los campos marcados como PENDIENTE deben rellenarse con los datos reales antes
 * de publicar. Un aviso legal sin razón social y NIF reales no cumple el art. 10
 * de la LSSI-CE (Ley 34/2002) y expone a sanción.
 *
 * Si IRC Service es una sociedad, hacen falta además los datos registrales.
 * Si es empresario individual (autónomo), basta con nombre y apellidos + NIF y
 * se puede dejar REGISTRO como null.
 */

export const LEGAL = {
  /** Nombre comercial: el que ve el cliente. */
  nombreComercial: "IRC Service",

  /** PENDIENTE: razón social o nombre y apellidos del titular. */
  razonSocial: "[PENDIENTE: razón social completa o nombre del titular]",

  /** PENDIENTE: CIF de la sociedad o NIF del autónomo. */
  nif: "[PENDIENTE: CIF / NIF]",

  /** Domicilio social / centro de trabajo. */
  direccion: "Calle Invierno 2, Nave 25 · Polígono Industrial Las Monjas",
  codigoPostal: "28850",
  localidad: "Torrejón de Ardoz",
  provincia: "Madrid",
  pais: "España",

  /**
   * PENDIENTE (solo si es sociedad): datos de inscripción registral.
   * Ej.: "Registro Mercantil de Madrid, tomo 00000, folio 00, hoja M-000000".
   * Dejar en null si el titular es autónomo.
   */
  registro: null as string | null,

  /** PENDIENTE: proveedor de alojamiento web y su ubicación. */
  hosting: {
    nombre: "[PENDIENTE: proveedor de hosting]",
    ubicacion: "[PENDIENTE: país / región del servidor]",
  },

  /** Fecha de la última revisión de los textos legales. */
  ultimaActualizacion: "2 de septiembre de 2026",
} as const;

/** Dirección en una sola línea, para el pie y los datos estructurados. */
export const DIRECCION_COMPLETA = `${LEGAL.direccion}, ${LEGAL.codigoPostal} ${LEGAL.localidad}, ${LEGAL.provincia}`;

/** Devuelve true si queda algún dato sin rellenar (se usa para avisar en pantalla). */
export const faltanDatosLegales = () =>
  JSON.stringify(LEGAL).includes("[PENDIENTE");
