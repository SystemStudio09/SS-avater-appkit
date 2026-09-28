# Auditoría de seguridad — System Studio build

Este documento resume la revisión de seguridad realizada sobre el build de
**System Studio**, un *fork* de [Avatar App Kit](https://github.com/Hainrixz/avater-appkit)
(Hainrixz, MIT). La ingeniería base es del proyecto original; **el análisis de
seguridad, la evaluación de riesgo y las correcciones documentadas aquí son aporte
de System Studio.**

> **Nota de honestidad.** Los hallazgos son de severidad **Media / Baja /
> Informativa** — no hay vulnerabilidades críticas. Se documentan en su severidad
> real, sin inflar, porque una auditoría precisa vale más que una alarmista.

## Alcance y método

Revisión con enfoque *attacker mindset* (mentalidad de atacante) orientada a defensa,
sobre: manejo de credenciales, CSRF, SSRF, *supply chain* (cadena de suministro),
secretos expuestos y configuración de seguridad. La app corre localmente y reenvía
peticiones a la API de Higgsfield con la llave del usuario.

## Hallazgos y estado

| # | Severidad | Hallazgo | Estado |
|---|---|---|---|
| 1 | **Media** | `GET /api/download` no validaba el origen de la petición: un sitio de terceros podía usar el `localhost` de la víctima como proxy de descarga (acotado a hosts de CloudFront/S3/Higgsfield). | ✅ **Corregido** |
| 2 | **Media** | `next.config.ts` no definía *security headers* (anti-clickjacking, `nosniff`, `Referrer-Policy`, `Permissions-Policy`). | ✅ **Corregido** |
| 3 | **Baja** | La *allowlist* de descarga acepta todo `*.amazonaws.com` (cualquier bucket S3 público). | 🟡 **Mitigado** (ver #1) + documentado |
| 4 | **Informativa** | `AGENTS.md` contiene instrucciones auto-generadas dirigidas a agentes de IA (leer archivos de `node_modules`, commitear el bloque). Es *instrucciones-como-dato*: patrón a vigilar como vector de *supply chain*. | 📝 Documentado |
| 5 | **Informativa** | La cookie de credenciales tiene `maxAge` de 30 días; en equipos compartidos conviene cerrar sesión manualmente. | 📝 Documentado |

## Correcciones aplicadas

**#1 — Proxy de descarga cross-site (`/api/download`).**
La ruta es un `GET` disparado por un `<a download>` *same-origin*, por lo que no puede
llevar el header anti-CSRF del resto de la API. Se añadió un guard por **Fetch Metadata**
(`Sec-Fetch-Site`): el navegador envía esta cabecera en toda petición, incluidas
navegaciones. Se permite `same-origin` (la descarga legítima) y `none` (acceso directo),
y se rechaza `cross-site`. Esto neutraliza el abuso cross-site sin romper la descarga, y
de paso mitiga el hallazgo #3 (un tercero ya no puede disparar el proxy).

**#2 — Security headers.**
`next.config.ts` ahora emite `X-Frame-Options: DENY` (anti-clickjacking),
`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` y
`Permissions-Policy` deshabilitando cámara/micrófono/geolocalización. Se incluye además
una *Content-Security-Policy* como plantilla comentada, lista para activar y probar antes
de un despliegue público.

## Postura de seguridad heredada (positivos del base)

La revisión también confirmó que el proyecto original parte de una base sólida, que se
conservó intacta:

- **Credenciales** en cookie `httpOnly` + `secure` en producción; *fingerprint* SHA-256
  y `redact()` para no filtrar la llave a logs. La llave nunca llega al bundle del cliente.
- **Anti-SSRF** explícito en `status`/`cancel`: valida las URLs contra el origen del
  proveedor (bloquea, p. ej., `169.254.169.254`).
- **Upload** validado por *magic bytes* (no por `Content-Type`), con tope de 10 MB.
- **CSRF** de doble capa en rutas mutantes (header propio que fuerza *preflight* + chequeo
  de `Origin`).
- **Supply chain** verificado: sin *lifecycle scripts* maliciosos, `package-lock.json`
  resuelve íntegramente al registro oficial de npm, y las dependencias directas se
  cotejaron contra el registro (sin *typosquats*).
- **Sin secretos** hardcodeados; `.env.local` correctamente ignorado por git.

## Reporte de vulnerabilidades

Si encontrás un problema de seguridad, abrí un *issue* privado o contactá al mantenedor
del repositorio. No publiques detalles explotables antes de una corrección.
