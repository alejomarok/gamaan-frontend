import { Button } from "../ui/button"

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative h-[600px] bg-[#003226]" />
      <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Créditos a tu medida
        </h1>
        <p className="mt-4 max-w-[700px] text-lg sm:text-xl">Simulá y solicitá tu préstamo en minutos.</p>
        <Button className="mt-8 bg-[#003226] hover:bg-[#DBC5A8] hover:text-[#003226] text-white" size="lg" asChild>
          <a href="#simulador">Simular Ahora</a>
        </Button>
      </div>
    </section>
  )
}
