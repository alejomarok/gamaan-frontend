import { MessageCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"

export default function ContactSection() {
  return (
    <section id="contacto" className="py-16 bg-[#F8F8F8]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Contacto</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Estamos para ayudarte. No dudes en comunicarte con nosotros.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Dirección</h3>
              <p className="text-muted-foreground">Garibaldi esquina General Paz, Río Tercero, Córdoba</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Teléfono</h3>
              <p className="text-muted-foreground">+54 11 4567-8900</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground">info@gamaan.com.ar</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Horario de atención</h3>
              <p className="text-muted-foreground">Lunes a Viernes de 9:00 a 18:00</p>
            </div>
            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white w-full" size="lg">
              <MessageCircle className="mr-2 h-4 w-4" /> Contactanos por WhatsApp
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="¿En qué podemos ayudarte?" rows={4} />
              </div>
              <Button className="w-full bg-[#003226] hover:bg-[#DBC5A8] hover:text-[#003226]" type="submit">
                Enviar mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
