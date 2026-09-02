import LegalLayout from "@/components/legal/LegalLayout";
import { LEGAL } from "@/lib/legal";
import { EMAIL } from "@/lib/contact";

export default function Cookies() {
  return (
    <LegalLayout
      titulo="Política de cookies"
      descripcion={`Qué cookies y almacenamiento local utiliza el sitio web de ${LEGAL.nombreComercial}.`}
    >
      <h2>1. Qué es una cookie</h2>
      <p>
        Una cookie es un pequeño archivo que un sitio web guarda en tu navegador al visitarlo.
        Sirve, por ejemplo, para recordar tus preferencias o para medir cuánta gente entra en la
        web. Junto a las cookies existen otras tecnologías de almacenamiento equivalentes, como
        el <em>almacenamiento local</em> del navegador, a las que se aplica la misma normativa
        (artículo 22.2 de la LSSI-CE).
      </p>

      <h2>2. Qué usa esta web</h2>
      <p>
        Este sitio <strong>no instala cookies de analítica, de publicidad ni de perfilado</strong>.
        No utilizamos Google Analytics, ni el píxel de Meta, ni herramientas de mapas de calor o
        seguimiento de usuarios.
      </p>
      <p>
        El único almacenamiento que puede crearse es estrictamente técnico y necesario para que
        la web funcione:
      </p>
      <table>
        <thead>
          <tr><th>Nombre</th><th>Tipo</th><th>Finalidad y duración</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>sb-…-auth-token</td>
            <td>Almacenamiento local · propia</td>
            <td>
              La generaría la librería de base de datos (Supabase) para mantener una sesión
              iniciada. Como esta web no tiene área privada ni registro de usuarios, en la
              práctica no llega a crearse durante una visita normal. Persistente hasta que se
              borran los datos del navegador.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Al tratarse de almacenamiento técnico imprescindible, está exento del deber de
        consentimiento previo conforme al artículo 22.2 de la LSSI-CE y a la Guía sobre el uso de
        cookies de la Agencia Española de Protección de Datos. Por eso{" "}
        <strong>esta web no muestra banner de cookies</strong>: no habría nada que consentir.
      </p>

      <h2>3. Servicios de terceros que se cargan en la página</h2>
      <p>
        Aunque no instalan cookies, algunos recursos se solicitan a servidores de terceros, lo
        que implica que estos reciben tu dirección IP y datos básicos de tu navegador:
      </p>
      <ul>
        <li>
          <strong>Google Fonts</strong> — la tipografía de la web se descarga de los servidores
          de Google (<span className="whitespace-nowrap">fonts.googleapis.com</span> y{" "}
          <span className="whitespace-nowrap">fonts.gstatic.com</span>). Google no instala
          cookies al servir estos archivos, pero sí registra la petición.
        </li>
        <li>
          <strong>WhatsApp</strong> — los botones de WhatsApp son enlaces normales. Solo se
          conecta con los servidores de Meta si pulsas uno de ellos y se abre la aplicación.
        </li>
      </ul>

      <h2>4. Cómo gestionar el almacenamiento desde tu navegador</h2>
      <p>
        Puedes bloquear o eliminar cookies y almacenamiento local desde la configuración de tu
        navegador. Ten en cuenta que bloquear el almacenamiento técnico puede afectar al
        funcionamiento de algunas webs.
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>5. Si esto cambia</h2>
      <p>
        Si en el futuro {LEGAL.nombreComercial} incorpora herramientas de analítica o publicidad
        —por ejemplo Google Analytics o el píxel de Meta—, será obligatorio mostrar un banner de
        consentimiento previo que permita aceptar, rechazar y configurar las cookies antes de que
        se instalen, y esta política se actualizará para detallarlas. Hasta entonces, lo descrito
        arriba es todo lo que hay.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Para cualquier duda sobre esta política puedes escribir a{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Encontrarás información sobre el resto de
        tratamientos de datos en la <a href="/privacidad">Política de privacidad</a>.
      </p>
    </LegalLayout>
  );
}
