# Publicar Olympia

Documento vigente: README.md. Carpeta única Olympia-amigos-publicacion;
repositorio AlvaroVZ14/Olympia-amigos; rama principal y de despliegue main.
URL: https://alvarovz14.github.io/Olympia-amigos/

## GitHub Pages

Settings → Pages → Source: GitHub Actions. Mantener Enforce HTTPS.
El único workflow .github/workflows/friends.yml verifica PRs contra main.
Publica pushes a main solo después de semver, pruebas, build y pruebas Chromium.
No despliega PRs ni otras ramas. El sitio estático no necesita servidor de datos.
Los cinco comandos de trabajo con PR están en el README.

## PWA y datos

Base Vite /Olympia-amigos/. Manifest con id/start_url/scope relativos;
worker bajo esa ruta. IndexedDB olympia-friends se conserva para usuarios actuales.
Cambiar el dominio o base de datos no traslada los registros automáticamente.
Exportar/importar JSON incluye fotos. La compatibilidad personal, el procedimiento
y las pruebas están en unificacion.md.

La versión aparece en Ajustes → Acerca de. El worker descarga la app completa
offline antes de ofrecer Hay una versión nueva · Actualizar. Guarda series y
borradores antes de activarse; solo renueva caché, nunca borra IndexedDB.

## Migraciones futuras

DATA_SCHEMA_VERSION en src/schema.js y STATE_MIGRATIONS en domain.js controlan
el estado JSON. DATABASE_VERSION y el registro de dbMigrations.js controlan
stores/índices. Añadir pasos consecutivos, sin modificar el origen si fallan.
Actualizar pruebas de ida/vuelta y rollback; CI lo exige al cambiar persistencia.
Mantener lectores de respaldos antiguos y rechazar versiones futuras con aviso.

## Auditoría reproducible

```powershell
npm ci
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run audit:lighthouse -- https://alvarovz14.github.io/Olympia-amigos/
node scripts/audit-pwa.mjs https://alvarovz14.github.io/Olympia-amigos/
```

Los resultados anteriores a esta unificación están en publicacion/README.md y
corresponden a v1.1.0. Lighthouse moderno no incluye categoría PWA: el script
independiente revisa manifest, iconos e instalación/offline. Las pruebas de
Chromium no sustituyen probar Safari/iPhone y Android físicos.

QR: public/compartir-qr.png y .svg; también en Ayuda / Instalar.
Android usa iconos 192/512 y maskable. Las pantallas de inicio de iPhone cubren
seis tamaños habituales; el arranque HTML se adapta a los demás.

## Checklist en un celular real

- Abrir por HTTPS; completar perfil propio; instalar desde Safari/Chrome.
- Registrar una serie; cerrar y abrir; comprobar persistencia.
- Activar modo avión; abrir e introducir otra serie.
- Guardar un check con las tres poses; exportar y conservar el JSON privado.
- Importar en otro perfil/dispositivo: revisar cantidades y confirmar.
- Tras una nueva publicación, aceptar Actualizar y comprobar historial y fotos.
- Confirmar migración personal antes de retirar Templates.
