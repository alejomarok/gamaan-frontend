import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Función para combinar clases condicionales con Tailwind
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Función para formatear números como moneda en ARS
export function formatCurrency(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(value);
}
