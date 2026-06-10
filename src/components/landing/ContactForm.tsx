import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, MessageCircle, Mail, MapPin, Clock, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PHONE, PHONE_TEL, WHATSAPP_URL, EMAIL, ADDRESS } from "@/lib/contact";

const schema = z.object({
  nombre: z.string().trim().min(2, "Nombre demasiado corto").max(100),
  telefono: z.string().trim().min(6, "Teléfono no válido").max(30),
  email: z.string().trim().email("Email no válido").max(255).optional().or(z.literal("")),
  tipo_reforma: z.string().max(60).optional(),
  superficie: z.string().max(30).optional(),
  mensaje: z.string().max(2000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Debes aceptar la política de privacidad" }) }),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { tipo_reforma: "Reforma integral" },
  });

  const onSubmit = async (values: FormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("leads").insert({
      nombre: values.nombre,
      telefono: values.telefono,
      email: values.email || null,
      tipo_reforma: values.tipo_reforma || null,
      superficie: values.superficie || null,
      mensaje: values.mensaje || null,
    });
    if (error) {
      toast.error("No se pudo enviar tu solicitud. Inténtalo de nuevo o llámanos.");
      return;
    }
    setSent(true);
    reset();
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-surface-alt">
      <div className="container-edge grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="eyebrow mb-4">Contacto</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Pide tu presupuesto sin compromiso.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Cuéntanos tu proyecto y te llamamos en menos de 24 horas. Visita y presupuesto totalmente gratuitos.
          </p>

          <div className="mt-10 space-y-5">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-4 group">
              <span className="h-10 w-10 grid place-items-center bg-primary text-primary-foreground"><Phone className="h-4 w-4" /></span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Teléfono</div>
                <div className="font-medium group-hover:underline">{PHONE}</div>
              </div>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <span className="h-10 w-10 grid place-items-center bg-primary text-primary-foreground"><MessageCircle className="h-4 w-4" /></span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</div>
                <div className="font-medium group-hover:underline">Escribir ahora</div>
              </div>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 group">
              <span className="h-10 w-10 grid place-items-center bg-primary text-primary-foreground"><Mail className="h-4 w-4" /></span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="font-medium group-hover:underline">{EMAIL}</div>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <span className="h-10 w-10 grid place-items-center bg-primary text-primary-foreground"><MapPin className="h-4 w-4" /></span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Ubicación</div>
                <div className="font-medium">{ADDRESS}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="h-10 w-10 grid place-items-center bg-primary text-primary-foreground"><Clock className="h-4 w-4" /></span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Horario</div>
                <div className="font-medium">Lun – Vie · 9:00 – 19:00</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-background border border-hairline p-7 md:p-10">
            {sent ? (
              <div className="py-12 text-center">
                <div className="mx-auto h-14 w-14 grid place-items-center bg-primary text-primary-foreground rounded-full">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl">¡Solicitud recibida!</h3>
                <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                  Te contactaremos en menos de 24 horas para concertar la visita y preparar tu presupuesto.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm underline underline-offset-4"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Nombre" error={errors.nombre?.message}>
                    <input
                      {...register("nombre")}
                      className="w-full border border-hairline bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Tu nombre"
                    />
                  </Field>
                  <Field label="Teléfono" error={errors.telefono?.message}>
                    <input
                      {...register("telefono")}
                      type="tel"
                      className="w-full border border-hairline bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="6XX XX XX XX"
                    />
                  </Field>
                </div>
                <Field label="Email (opcional)" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full border border-hairline bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="tu@email.com"
                  />
                </Field>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Tipo de reforma">
                    <select
                      {...register("tipo_reforma")}
                      className="w-full border border-hairline bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    >
                      <option>Reforma integral</option>
                      <option>Cocina</option>
                      <option>Baño</option>
                      <option>Local comercial</option>
                      <option>Pintura y acabados</option>
                      <option>Otro</option>
                    </select>
                  </Field>
                  <Field label="Superficie aprox.">
                    <input
                      {...register("superficie")}
                      className="w-full border border-hairline bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Ej. 80 m²"
                    />
                  </Field>
                </div>
                <Field label="Cuéntanos tu proyecto" error={errors.mensaje?.message}>
                  <textarea
                    {...register("mensaje")}
                    rows={4}
                    className="w-full border border-hairline bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Detalles, plazos deseados, presupuesto orientativo..."
                  />
                </Field>

                <label className="flex items-start gap-3 text-xs text-muted-foreground">
                  <input type="checkbox" {...register("consent")} className="mt-0.5 accent-foreground" />
                  <span>
                    Acepto la política de privacidad y el tratamiento de mis datos para que IRC Service me contacte.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:bg-foreground/85 transition-colors disabled:opacity-60 w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
                    </>
                  ) : (
                    "Enviar solicitud"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</span>
      {children}
      {error && <span className="block text-xs text-destructive mt-1">{error}</span>}
    </label>
  );
}
