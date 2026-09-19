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

## ⚠️ El formulario de contacto no funciona

Esto es lo más importante que hay abierto ahora mismo.

El formulario inserta en la tabla `leads` de **Supabase**
(`src/components/landing/ContactForm.tsx`). El cliente se configura en
`src/integrations/supabase/client.ts` a partir de dos variables de entorno:

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

**No están puestas en Vercel.** Comprobado leyendo el JavaScript publicado: el
build lleva incrustados los valores de reserva, `https://placeholder.supabase.co`
y `placeholder-key`. Con eso el `insert` falla siempre.

Lo que ve el visitante: rellena el formulario, pulsa enviar y le sale
*"No se pudo enviar tu solicitud. Inténtalo de nuevo o llámanos."* No se pierde
en silencio, pero **el lead no llega a ninguna parte**.

Para arreglarlo hacen falta las credenciales del proyecto de Supabase y darlas
de alta en Vercel → Settings → Environment Variables, para Production. Ojo:
Vite incrusta las variables **en tiempo de build**, así que después hay que
volver a desplegar; no basta con guardarlas.

Mientras tanto, las vías que sí funcionan son el teléfono y el botón de
WhatsApp, que son enlaces directos y no dependen de nada.

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

1. **Variables de Supabase en Vercel** — sin ellas no entra ni un lead por el
   formulario. Es lo más urgente.
2. **Datos del Registro Mercantil** en `src/lib/legal.ts`.
3. **Mudanza del dominio** `reformasentorrejon.com`, cuando lo decida el
   cliente.

## Cosas que conviene no repetir

- `irc-service-demo.zip` (52 MB) es la demo empaquetada para el cliente. Está
  en `.gitignore` y se regenera desde `dist/`. No volver a versionarlo.
- En el panel de Vercel hay un proyecto **`irc-home`** con nombre parecido y
  sin repo conectado. No es este. Tampoco lo son los tres de `movilhome`.
