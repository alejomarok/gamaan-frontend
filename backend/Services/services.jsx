// Función para crear un crédito prendario
export async function postCreditoPrendario(data) {
  const response = await fetch('/api/credito-prendario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Función para crear un crédito personal
export async function postCreditoPersonal(data) {
  const response = await fetch('/api/credito-personal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Función para crear un crédito hipotecario
export async function postCreditoHipotecario(data) {
  const response = await fetch('/api/credito-hipotecario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}