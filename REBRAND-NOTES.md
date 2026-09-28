# System Studio — notas de rebrand

Trabajo derivado de **Avatar App Kit** (Hainrixz, MIT). Cambios aplicados:

## Marca
- Nombre de producto → **System Studio** (layout, studio, header/wordmark, footer, badge).
- Tagline → *Conecta · Organiza · Transforma*.
- Favicon → logo propio (`app/icon.png`); removido el `icon.svg` anterior.
- `theme-color` (barra del navegador) → `#000813`.

## Tema (app/globals.css)
- Fondo → navy `#000813`; paneles retintados a navy.
- Acento → cyan `#00bfc6` (hover `#2fd4d9`, press `#019497`).
- Foco/borde → cyan `#22b8c4`.
- **Contraste:** el texto de los CTA pasó a navy (`text-canvas`) porque el cyan es
  brillante y no admite texto blanco legible. Coherente con el logo (oscuro sobre cyan).

## Licencia
- `LICENSE`: se **conserva** `Copyright (c) 2026 Hainrixz` y se **agrega**
  `Copyright (c) 2026 System Studio`. (MIT exige mantener el aviso original.)
- README: bloque de créditos + atribución al kit original y a las fuentes (ITF FFL).

## Hardening incluido (seguro)
- `next.config.ts`: X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy.
- CSP incluida como **plantilla comentada** (activar y probar build antes de publicar).

## Seguridad (auditoría System Studio) — ver SECURITY.md
- ✅ Guard `Sec-Fetch-Site` en `GET /api/download` (bloquea uso cross-site como proxy).
- ✅ Security headers en `next.config.ts` (anti-clickjacking, nosniff, referrer, permissions).

## Pendiente / opcional (no aplicado)
- Reemplazar `.github/banner.jpg` y `opengraph-image.jpg` por arte propio.
- Definir la fuente exacta del logo si se quiere el wordmark idéntico.

## Intacto por pedido
- Nombre de carpeta `avater-appkit` y `package.json` — sin tocar.
