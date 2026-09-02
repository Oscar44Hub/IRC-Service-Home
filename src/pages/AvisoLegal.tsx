import LegalLayout from "@/components/legal/LegalLayout";
import { LEGAL } from "@/lib/legal";
import { EMAIL, PHONE, WEBSITE } from "@/lib/contact";

export default function AvisoLegal() {
  return (
    <LegalLayout
      titulo="Aviso legal"
      descripcion={`Información legal y condiciones de uso del sitio web de ${LEGAL.nombreComercial}.`}
    >
      <h2>1. Datos identificativos del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
        Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se ponen a disposición
        de los usuarios los siguientes datos:
      </p>
      <dl className="dl">
        <div><dt>Nombre comercial</dt><dd>{LEGAL.nombreComercial}</dd></div>
        <div><dt>Titular</dt><dd>{LEGAL.razonSocial}</dd></div>
        <div><dt>NIF / CIF</dt><dd>{LEGAL.nif}</dd></div>
        <div>
          <dt>Domicilio</dt>
          <dd>{LEGAL.direccion}, {LEGAL.codigoPostal} {LEGAL.localidad} ({LEGAL.provincia}), {LEGAL.pais}</dd>
        </div>
        <div><dt>Teléfono</dt><dd>{PHONE}</dd></div>
        <div><dt>Correo electrónico</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
        <div><dt>Sitio web</dt><dd>{WEBSITE}</dd></div>
        {LEGAL.registro && <div><dt>Datos registrales</dt><dd>{LEGAL.registro}</dd></div>}
      </dl>

      <h2>2. Objeto y ámbito de aplicación</h2>
      <p>
        Este aviso legal regula el acceso, la navegación y el uso del sitio web{" "}
        {WEBSITE} (en adelante, «el sitio web»), titularidad de {LEGAL.nombreComercial}. El
        acceso al sitio web es gratuito y atribuye la condición de usuario a quien lo realiza,
        implicando la aceptación plena de las condiciones recogidas en este aviso legal desde el
        momento del acceso.
      </p>
      <p>
        El sitio web tiene por objeto dar a conocer los servicios de reforma de viviendas,
        cocinas, baños y locales comerciales que presta {LEGAL.nombreComercial}, así como poner a
        disposición de los usuarios un formulario para solicitar información y presupuesto sin
        compromiso.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>El usuario se compromete a:</p>
      <ul>
        <li>Hacer un uso adecuado y lícito del sitio web y de sus contenidos, conforme a la legislación vigente, la buena fe y el orden público.</li>
        <li>No emplear el sitio web con fines ilícitos o lesivos para los derechos e intereses de terceros.</li>
        <li>No introducir ni difundir programas, datos, virus o cualquier elemento que pueda dañar los sistemas informáticos del titular o de terceros.</li>
        <li>Facilitar información veraz en los formularios de contacto, y no suplantar la identidad de otras personas.</li>
      </ul>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio web —textos, fotografías, vídeos de obra, gráficos,
        logotipos, iconos, software y su diseño y código fuente— son titularidad de{" "}
        {LEGAL.nombreComercial} o de terceros que han autorizado su uso, y están protegidos por
        la normativa española y europea de propiedad intelectual e industrial.
      </p>
      <p>
        Queda prohibida la reproducción, distribución, comunicación pública, transformación o
        cualquier otra forma de explotación, total o parcial, de dichos contenidos sin la
        autorización expresa y por escrito del titular. En particular, las fotografías y vídeos
        de las obras ejecutadas no pueden utilizarse con fines comerciales por terceros.
      </p>
      <p>
        La marca y el logotipo de {LEGAL.nombreComercial} son signos distintivos del titular. El
        acceso al sitio web no otorga al usuario derecho alguno sobre ellos.
      </p>

      <h2>5. Exclusión de responsabilidad</h2>
      <p>
        {LEGAL.nombreComercial} no garantiza la disponibilidad y continuidad ininterrumpida del
        sitio web, y no será responsable de los daños derivados de su falta de disponibilidad,
        de fallos en el acceso o de interrupciones del servicio, siempre que actúe con la
        diligencia debida.
      </p>
      <p>
        La información sobre plazos, precios orientativos y características de los servicios
        publicada en el sitio web tiene carácter meramente informativo y no constituye una oferta
        vinculante. Cualquier compromiso contractual requiere presupuesto firmado por ambas
        partes.
      </p>

      <h2>6. Enlaces a sitios de terceros</h2>
      <p>
        El sitio web puede contener enlaces a plataformas de terceros (WhatsApp, Google, redes
        sociales). {LEGAL.nombreComercial} no controla ni asume responsabilidad alguna sobre los
        contenidos, políticas de privacidad o prácticas de dichos sitios, que se rigen por sus
        propias condiciones.
      </p>

      <h2>7. Protección de datos personales</h2>
      <p>
        El tratamiento de los datos personales facilitados a través del sitio web se rige por lo
        dispuesto en la <a href="/privacidad">Política de privacidad</a>. El uso de cookies y
        tecnologías similares se detalla en la <a href="/cookies">Política de cookies</a>.
      </p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para la resolución de cualquier
        controversia derivada del acceso o uso del sitio web, las partes se someten a los
        juzgados y tribunales que correspondan conforme a la normativa aplicable. Cuando el
        usuario tenga la condición de consumidor, será competente el tribunal de su domicilio.
      </p>

      <h2>9. Modificaciones</h2>
      <p>
        {LEGAL.nombreComercial} se reserva el derecho a modificar en cualquier momento el
        contenido de este aviso legal, así como la presentación y configuración del sitio web.
        Se recomienda revisar periódicamente esta página.
      </p>
    </LegalLayout>
  );
}
