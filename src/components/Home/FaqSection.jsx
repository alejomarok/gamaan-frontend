import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

export default function FaqSection() {
  const faqs = [
    {
      question: "¿Qué requisitos necesito?",
      answer:
        "Para solicitar un crédito en Gamaan necesitás ser mayor de 18 años, presentar DNI, comprobante de domicilio y demostrar ingresos regulares. Los requisitos específicos pueden variar según el monto solicitado.",
    },
    {
      question: "¿Cuánto tarda la aprobación?",
      answer:
        "El proceso de aprobación suele tomar menos de 24 horas hábiles. Una vez aprobado, el desembolso se realiza en un plazo de 24 a 48 horas dependiendo de tu entidad bancaria.",
    },
    {
      question: "¿Puedo cancelar anticipadamente?",
      answer:
        "Sí, podés cancelar tu crédito de forma anticipada en cualquier momento. Al hacerlo, se te descontarán los intereses no devengados, pagando solo por el tiempo que utilizaste el dinero.",
    },
    {
      question: "¿Qué pasa si me atraso en un pago?",
      answer:
        "Los pagos atrasados generan intereses punitorios. Te recomendamos comunicarte con nosotros ante cualquier dificultad para encontrar juntos la mejor solución.",
    },
    {
      question: "¿Puedo solicitar otro crédito si ya tengo uno vigente?",
      answer:
        "Dependiendo de tu historial de pagos y capacidad crediticia, podés calificar para un nuevo préstamo o una ampliación del existente. Cada caso se evalúa individualmente.",
    },
  ]

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">Resolvemos tus dudas sobre nuestros créditos.</p>
        </div>
        <div className="max-w-[800px] mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
