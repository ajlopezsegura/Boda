# Luminal — Carpintería de Aluminio y PVC (MVP)

App de presentación + portal de seguimiento de obra para el sector de carpintería de aluminio y PVC.

Basada en la arquitectura del template Las Conchas, adaptada a esta vertical.

**Rutas:**
- `/` → Portada con acceso a obra por código
- `/empresa` → Quiénes somos + valores + materiales
- `/sistemas` → Catálogo filtrable
- `/sistemas/:slug` → Ficha técnica
- `/obra/:codigo` → Portal cliente con fases + progreso
- `/contacto` → Formulario de presupuesto
- `/admin` → Panel obras + presupuestos + actividad

**Códigos de obra demo:** MTZ001, ALA002, VIS003
**Admin password por defecto:** luminal2024

## Stack
React 18 + Vite + Tailwind + Framer Motion + Supabase

## Comandos
```bash
npm install
npm run dev
```
