# Estado del proyecto — Web de IRC Service

> Documento de contexto. Está en el repo a propósito: así cualquier sesión de
> trabajo lo lee al arrancar, esté en este ordenador, en la nube o en el móvil.
> Si cambias algo importante de lo que aquí se cuenta, actualízalo en el mismo
> commit.
>
> Última revisión: 19 de septiembre de 2026.

## Qué es

Web de captación de **IRC Service**, empresa de reformas integrales en Torrejón
de Ardoz (Madrid). Una sola página de aterrizaje más tres páginas legales. El
objetivo del sitio es que entren solicitudes de presupuesto, por formulario,
teléfono o WhatsApp.

No confundir con **`irc-movilhome`**: otro cliente del mismo grupo (casas
móviles prefabricadas), otro repo y otra web. Son proyectos separados.

## Dónde está publicado

| | |
|---|---|
| URL pública | https://irc-service-home.vercel.app |
| Proyecto en Vercel | `irc-service-home` |
| Repositorio | `Oscar44Hub/IRC-Service-Home` |
| Rama de producción | `main` |

Cada push a `main` genera un despliegue de producción automáticamente. No hay
que hacer nada más.

### Dos trampas que ya costaron un susto

**La rama de producción la hereda Vercel de GitHub.** Hasta el 19-09-2026 la
rama por defecto del repo era `claude/brave-turing-nk85wn`, un resto de junio,
y Vercel la había copiado como rama de producción al conectarse. Resultado:
todo lo que se empujaba a `main` se desplegaba como *Preview* y la web pública
llevaba tres meses congelada, **sin ningún error a la vista**. Las dos cosas
están corregidas, pero si algún día vuelve a pasar que un push no sale
publicado, mira ahí antes que en el código:

- GitHub → Settings → General → Default branch
- Vercel → Settings → Environments → Production → Branch Tracking
  (no está en Settings → Git, que es donde uno lo busca primero)

**El trabajo repartido entre sesiones.** Una sesión en la nube dejó cuatro
commits en una rama durante más de dos semanas mientras en local se tocaba
`main`. Nadie lo supo hasta que se revisó a mano. Si trabajas desde varios
sitios, fusiona el mismo día y no dejes ramas vivas.

## El dominio, pendiente

`reformasentorrejon.com` **todavía apunta al WordPress antiguo** del cliente,
no a esta web.

Aun así, los `canonical`, el `sitemap.xml`, el Open Graph y los datos
estructurados de esta web **ya apuntan a ese dominio**, preparados para el día
del cambio. Mientras no se haga la mudanza:

- El `canonical` señala a un sitio distinto del que se está sirviendo.
- La imagen de Open Graph (`reformasentorrejon.com/og-image.jpg`) da 404, así
  que al compartir el enlace no sale la tarjeta.

Es deliberado, no un descuido. Se arregla solo cuando se mueva el dominio.

## El formulario de contacto y Supabase

El formulario inserta en la tabla `leads` de **Supabase**
(`src/components/landing/ContactForm.tsx`). El cliente se configura en
`src/integrations/supabase/client.ts` a partir de dos variables de entorno,
dadas de alta en Vercel para Production y Preview:

```
VITE_SUPABASE_URL              https://djkohoaszrhbzvdgxpta.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY  sb_publishable_...
```

El proyecto de Supabase se creó el 19-09-2026; antes no existía, y por eso el
formulario nunca había llegado a funcionar. El esquema de la tabla y su
política de RLS están en `supabase/001-tabla-leads.sql`.

Las dos variables son **Config**, no *Secret*, y así debe ser: el prefijo
`VITE_` las incrusta en el JavaScript que descarga cualquier visitante, o sea
que no pueden ser secretas. No pasa nada, porque **la seguridad la da la RLS,
no ocultar la clave**: con la publishable solo se puede insertar un lead, no
leer los de nadie. La `service_role` no debe aparecer jamás por aquí.

### Tres trampas que ya costaron un rato

- **Vite incrusta las variables al construir**, no al cargar la página.
  Guardarlas en Vercel no cambia nada por sí solo: hay que **redesplegar**.
- **En el campo *Value* va solo el valor.** Pegar la línea entera del `.env`
  deja el valor como `VITE_SUPABASE_URL=https://...`, que no es una URL válida.
- **El nombre tiene que ser exacto.** Un `PUBLICSHABLE` en vez de
  `PUBLISHABLE` y el código no la encuentra: cae al valor de reserva sin decir
  nada.

Ninguna de las tres puede ya tumbar el sitio: si la configuración no sirve,
`supabase` vale `null`, la consola explica qué falla y **solo se pierde el
formulario**. El teléfono y el WhatsApp son enlaces directos y funcionan
siempre.

## Cómo levantarlo en local

```bash
npm ci            # limpio, como hace Vercel
npm run dev       # desarrollo en http://localhost:8080
npm run build     # tsc + vite build, deja el resultado en dist/
npm run preview   # sirve el build de producción ya compilado
```

Hay configuraciones listas en `.claude/launch.json` para arrancar tanto el
servidor de desarrollo como el build de producción.

Si `npm run build` falla con un error raro de tipos de `react-hook-form`
(«has no exported member 'useForm'»), es que `node_modules` se ha corrompido:
los `.d.ts` acaban apuntando a una carpeta `src/` que el paquete no publica.
Se arregla con `rm -rf node_modules && npm ci`. No es un problema del código.

## Cómo está montado

Vite + React 18 + TypeScript, Tailwind y React Router. Una sola página compuesta
por secciones en `src/components/landing/`, más las tres páginas legales.

Piezas que conviene conocer antes de tocar nada:

| Fichero | Para qué |
|---|---|
| `src/lib/contact.ts` | Teléfono, email, dirección, valoración. **Punto único**: cámbialo aquí y se propaga a toda la web |
| `src/lib/legal.ts` | Datos de la sociedad para las páginas legales, más la validación del CIF |
| `index.html` | Metadatos, Schema.org y el `<noscript>` de respaldo. Todo el SEO que los bots leen sin ejecutar JavaScript vive aquí |
| `public/robots.txt` | Abierto a propósito a los rastreadores de IA (GPTBot, PerplexityBot, ClaudeBot…) para poder aparecer citados |
| `vercel.json` | El *rewrite* que evita que `/aviso-legal` y compañía den 404 al entrar directamente |

### Sobre las páginas legales

Los datos salen de `src/lib/legal.ts`. Hay dos protecciones para que un dato a
medio rellenar no llegue nunca al visitante:

- `publicable()` omite la fila entera si el valor sigue marcado `[PENDIENTE]`.
- El recuadro de aviso «Borrador pendiente de datos» solo aparece en
  desarrollo; desaparece del build de producción.

**Falta un dato obligatorio:** tomo, folio y hoja del Registro Mercantil de
Madrid, exigidos a las sociedades por el artículo 10.1.a de la LSSI-CE. Están
en la primera hoja de la escritura de constitución. Ahora mismo la fila
simplemente no se muestra.

## Resumen de lo pendiente

1. **Aviso por email de cada lead.** Los leads ya se guardan en Supabase, pero
   nadie se entera de que han entrado. Hace falta un *Database Webhook* que
   dispare al insertar y llame a un servicio de envío (Resend encaja bien y
   tiene plan gratuito). Sin esto, hay que entrar al panel a mirar.
2. **Datos del Registro Mercantil** en `src/lib/legal.ts`.
3. **Mudanza del dominio** `reformasentorrejon.com`, cuando lo decida el
   cliente.

## Cosas que conviene no repetir

- `irc-service-demo.zip` (52 MB) es la demo empaquetada para el cliente. Está
  en `.gitignore` y se regenera desde `dist/`. No volver a versionarlo.
- En el panel de Vercel hay un proyecto **`irc-home`** con nombre parecido y
  sin repo conectado. No es este. Tampoco lo son los tres de `movilhome`.
