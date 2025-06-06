import { Clock, CheckCircle, HeadphonesIcon } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      title: "Aprobación rápida",
      description: "Obtenés respuesta en menos de 24 horas.",
    },
    {
      icon: CheckCircle,
      title: "Cuotas fijas",
      description: "Pagás siempre lo mismo, sin sorpresas.",
    },
    {
      icon: HeadphonesIcon,
      title: "Atención personalizada",
      description: "Te acompañamos en todo el proceso.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="rounded-full bg-[#DBC5A8]/20 p-4 mb-4">
                <benefit.icon className="h-8 w-8 text-[#003226]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
