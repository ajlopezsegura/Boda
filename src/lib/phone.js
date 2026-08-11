const PREFIJO = '+34'

/* Los teléfonos se guardan en formato nacional («953 22 22 22») porque así se
   leen y se corrigen mejor en data/wedding.js. El prefijo internacional se
   añade aquí, al mostrarlos y al enlazarlos, que es donde hace falta: media
   boda viene de fuera y sin él no se puede marcar. */

export function textoTel(numero) {
  const n = String(numero).trim()
  // Si ya trae prefijo propio —hay números suizos— se respeta tal cual
  return n.includes('+') ? n : `(${PREFIJO}) ${n}`
}

export function enlaceTel(numero) {
  const limpio = String(numero).replace(/[^\d+]/g, '')
  return `tel:${limpio.startsWith('+') ? limpio : PREFIJO + limpio}`
}

export function enlaceWhatsapp(numero, texto) {
  const digitos = String(numero).replace(/\D/g, '')
  // Un fijo español empieza por 8 o 9 y un móvil por 6 o 7, así que un 34
  // delante solo puede ser ya el prefijo del país
  const internacional = digitos.startsWith('34') ? digitos : `34${digitos}`
  const base = `https://wa.me/${internacional}`
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base
}
