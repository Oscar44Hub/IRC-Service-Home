import LegalLayout from "@/components/legal/LegalLayout";
import { LEGAL } from "@/lib/legal";
import { EMAIL, PHONE } from "@/lib/contact";

export default function Privacidad() {
  return (
    <LegalLayout
      titulo="Política de privacidad"
      descripcion={`Cómo trata ${LEGAL.nombreComercial} los datos personales que facilitas a través de la web.`}
    >
      <p>
        Esta política explica quién trata tus datos personales cuando usas este sitio web, para
        qué los usamos, durante cuánto tiempo los guardamos y qué puedes hacer al respecto. Está
        redactada conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de
        Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <dl className="dl">
        <div><dt>Responsable</dt><dd>{LEGAL.razonSocial} ({LEGAL.nombreComercial})</dd></div>
        <div><dt>NIF / CIF</dt><dd>{LEGAL.nif}</dd></div>
        <div>
          <dt>Domicilio</dt>
          <dd>{LEGAL.direccion}, {LEGAL.codigoPostal} {LEGAL.localidad} ({LEGAL.provincia})</dd>
        </div>
        <div><dt>Correo de contacto</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
        <div><dt>Teléfono</dt><dd>{PHONE}</dd></div>
      </dl>

      <h2>2. Qué datos tratamos y de dónde salen</h2>
      <p>
        Solo tratamos los datos que tú nos facilitas voluntariamente. No compramos bases de
        datos ni obtenemos tus datos de terceros.
      </p>
      <table>
        <thead>
          <tr><th>Vía</th><th>Datos</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Formulario de presupuesto</td>
            <td>Nombre, teléfono, correo electrónico (opcional), tipo de reforma, superficie aproximada y el texto que escribas describiendo tu proyecto.</td>
          </tr>
          <tr>
            <td>Llamada o WhatsApp</td>
            <td>Tu número de teléfono y el contenido de la conversación, en la medida necesaria para atenderte.</td>
          </tr>
          <tr>
            <td>Correo electrónico</td>
            <td>Tu dirección de correo y el contenido del mensaje.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Te pedimos que <strong>no incluyas datos de categorías especiales</strong> (salud,
        ideología, origen étnico) en el campo de texto libre: no los necesitamos para
        presupuestar una reforma.
      </p>

      <h2>3. Para qué usamos tus datos y con qué legitimación</h2>
      <table>
        <thead>
          <tr><th>Finalidad</th><th>Base jurídica</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Responder a tu solicitud, concertar la visita y elaborar el presupuesto.</td>
            <td>Tu consentimiento, prestado al marcar la casilla del formulario (art. 6.1.a RGPD), y la aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD).</td>
          </tr>
          <tr>
            <td>Gestionar la relación contractual si contratas la obra: facturación, seguimiento y garantía posterior.</td>
            <td>Ejecución del contrato (art. 6.1.b RGPD).</td>
          </tr>
          <tr>
            <td>Conservar la documentación fiscal y contable de las obras ejecutadas.</td>
            <td>Obligación legal (art. 6.1.c RGPD): Código de Comercio y Ley General Tributaria.</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>No usamos tus datos para enviarte publicidad</strong> ni los cedemos a terceros
        con fines comerciales. Si en el futuro quisiéramos enviarte comunicaciones comerciales,
        te pediríamos antes un consentimiento específico y separado.
      </p>

      <h2>4. Cuánto tiempo los guardamos</h2>
      <ul>
        <li><strong>Si no llegamos a trabajar juntos:</strong> hasta 12 meses desde el último contacto, por si retomas el proyecto. Después se eliminan.</li>
        <li><strong>Si contratas la obra:</strong> durante la vigencia del contrato y el periodo de garantía, y posteriormente bloqueados durante los plazos de prescripción legal (6 años para la documentación mercantil, 4 años para las obligaciones fiscales y hasta 15 años para responsabilidades derivadas de la edificación conforme a la Ley de Ordenación de la Edificación).</li>
        <li><strong>Si retiras tu consentimiento:</strong> se eliminan de inmediato, salvo los que debamos conservar por obligación legal.</li>
      </ul>

      <h2>5. A quién se comunican</h2>
      <p>
        No vendemos ni cedemos tus datos. Sí intervienen proveedores que actúan como
        encargados del tratamiento, con contrato firmado conforme al artículo 28 del RGPD:
      </p>
      <table>
        <thead>
          <tr><th>Proveedor</th><th>Servicio</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Supabase</td>
            <td>Base de datos donde se almacenan las solicitudes recibidas por el formulario.</td>
          </tr>
          <tr>
            <td>{LEGAL.hosting.nombre}</td>
            <td>Alojamiento del sitio web ({LEGAL.hosting.ubicacion}).</td>
          </tr>
          <tr>
            <td>Meta Platforms (WhatsApp)</td>
            <td>Si eliges contactarnos por WhatsApp, la conversación se rige además por las condiciones de WhatsApp.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Además, podrán acceder a tus datos la asesoría fiscal y contable y las administraciones
        públicas cuando exista obligación legal.
      </p>
      <p>
        <strong>Transferencias internacionales:</strong> alguno de estos proveedores puede tratar
        datos fuera del Espacio Económico Europeo. En ese caso la transferencia se ampara en las
        cláusulas contractuales tipo aprobadas por la Comisión Europea o en una decisión de
        adecuación. Puedes solicitarnos información sobre las garantías aplicadas escribiendo a{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>

      <h2>6. Tus derechos</h2>
      <p>Puedes ejercer en cualquier momento los siguientes derechos:</p>
      <ul>
        <li><strong>Acceso:</strong> saber qué datos tuyos tratamos.</li>
        <li><strong>Rectificación:</strong> corregir los datos inexactos.</li>
        <li><strong>Supresión:</strong> pedir que los eliminemos cuando ya no sean necesarios.</li>
        <li><strong>Oposición:</strong> oponerte a un tratamiento concreto.</li>
        <li><strong>Limitación:</strong> pedir que suspendamos el tratamiento mientras se resuelve una reclamación.</li>
        <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y de uso común.</li>
        <li><strong>Retirar el consentimiento</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento anterior.</li>
      </ul>
      <p>
        Para ejercerlos, escribe a <a href={`mailto:${EMAIL}`}>{EMAIL}</a> indicando el derecho
        que quieres ejercer y adjuntando copia de tu documento de identidad. Responderemos en el
        plazo máximo de un mes.
      </p>
      <p>
        Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una
        reclamación ante la <strong>Agencia Española de Protección de Datos</strong> (C/ Jorge
        Juan 6, 28001 Madrid){" "}
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos frente a
        pérdida, acceso no autorizado o alteración: conexión cifrada mediante HTTPS en todo el
        sitio, acceso restringido a la base de datos y limitación del personal que puede
        consultar las solicitudes recibidas.
      </p>

      <h2>8. Decisiones automatizadas</h2>
      <p>
        No tomamos decisiones automatizadas ni elaboramos perfiles con tus datos. Cada
        presupuesto lo prepara una persona tras una visita.
      </p>

      <h2>9. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política para adaptarla a cambios legales o a nuevos servicios.
        La versión vigente es siempre la publicada en esta página, con su fecha de última
        actualización.
      </p>
    </LegalLayout>
  );
}
