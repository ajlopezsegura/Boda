# Boda Pilar & Pablo · 12.12.2026

Web de boda con estética de **pasaporte y boarding pass** (larga distancia Zúrich ↔ Madrid, orígenes Málaga y Jaén → destino: Jaén).

Reutiliza el sistema visual de la plantilla original: cursor dorado, transiciones con Framer Motion, paleta azul marino + oro y tipografía elegante (Cormorant Garamond + Montserrat).

## Stack
React 18 · Vite · Tailwind CSS · Framer Motion · HashRouter

## Desarrollo
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera /dist
```

## Editar el contenido
**Todo el texto e información vive en un único archivo:** `src/data/wedding.js`
(nombres, fecha, itinerario, viaje, hoteles, galería, FAQ y datos de RSVP).

- **Fotos:** sustituye las imágenes de `public/assets/images/` y el vídeo de portada
  en `public/assets/videos/Hero.mp4`, y actualiza las rutas en `src/data/wedding.js`.
- **RSVP:** sin backend. Los invitados confirman por WhatsApp o email; configura el
  número y el correo en `wedding.rsvp`.

## Secciones
Portada + cuenta atrás · Nuestra historia · El día (itinerario) · Viaje & alojamiento ·
Galería · Info (dress code, regalo, FAQ) · Confirmar asistencia (RSVP).
