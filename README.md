# Olympia

Una app para todos. Cada persona guarda sus datos exclusivamente en su dispositivo
(IndexedDB). Sin cuentas, backend de datos, analytics ni rastreadores.
Cada instalación empieza vacía y pasa por el onboarding.

**Web/PWA:** https://alvarovz14.github.io/Olympia-amigos/

**Repositorio único:** AlvaroVZ14/Olympia-amigos.
**Carpeta de trabajo:** Olympia-amigos-publicacion. **Rama principal:** main.
Las carpetas anteriores quedan históricas hasta confirmar la migración real.

## Ejecutar

```powershell
npm ci
npm run dev
```

Abre http://localhost:5173/Olympia-amigos/.
Producción: `npm run build` y `npm run preview`.
Ayuda / Instalar y el número de versión están en Ajustes.

## Cómo cambiar algo y publicarlo: cinco comandos

Desde esta carpeta, con GitHub CLI autenticado y las referencias actualizadas:

```powershell
git switch -c cambio/descripcion origin/main
npm version patch --no-git-tag-version
git commit -am "Describe el cambio"
git push -u origin HEAD
gh pr create --base main --fill
```

Edita después del primer comando. Usa minor para funciones, major para cambios
incompatibles y patch para correcciones. Añade archivos nuevos con `git add ruta`
antes del commit. Antes del push: `npm test`, `npm run build`, `npm run test:e2e`.
Revisa el PR y pulsa **Squash and merge** cuando sus comprobaciones aprueben.
Antes de otro cambio: `git fetch origin`; usa un nombre de rama nuevo.

Un único workflow verifica PRs y publica cada push a main, después de aprobar
pruebas, compilación y pruebas en navegador. Exige versión semántica creciente.
Cambiar almacenamiento/esquema/importación exige actualizar pruebas de migración.
No se publica desde otras ramas. No se usa el repositorio personal para cambios nuevos.

## Rutinas

Ajustes → Rutina: PPL + Torso + Leg 5 días, Full Body 3, Torso/Pierna 4 y PPL 6.
Puedes cambiar ejercicios, orden, músculo, series, reps, técnicas y descansos.
Drop y RP son extensiones de la última serie y no aumentan el volumen.
El volumen semanal se calcula; editar no borra el historial.

## Datos y migración

Ajustes → Configuración → **Exportar mis datos / Importar datos**.
El JSON incluye perfil, rutina, pesos, sesiones/series, descansos, cardio, diario,
comidas, medidas, fases, checks, fotos y archivos internos de recuperación.
No subas ese archivo al repositorio ni lo envíes para solicitar soporte.

Importar acepta Olympia y respaldos de la app personal anterior (formato 1,
base 2). Valida, muestra cantidades y pide confirmación. Combinar conserva lo local
en coincidencias; Reemplazar sustituye la instalación tras el aviso explícito.
Ambos conservan copias internas del destino anterior y del origen.
Una transacción fallida no reemplaza nada.

[Comparación, prueba y pasos para migrar](docs/unificacion.md).

El aviso **Hay una versión nueva · Actualizar** guarda series y borradores
antes de activar el worker; nunca borra IndexedDB. Se conservan enlace, scope,
y base olympia-friends para quienes ya instalaron Olympia.

## Futuras migraciones

`src/schema.js`: versión JSON. `STATE_MIGRATIONS` en domain.js exige pasos
consecutivos y rechaza versiones futuras. `dbMigrations.js`: stores e índices.
Aumentar versiones requiere migración y pruebas con fixtures ficticios.
Prueba ida/vuelta, fotos, errores y rollback, manteniendo respaldos antiguos.

## Privacidad y comentarios

Se retiró el correo personal predeterminado. **Enviar comentarios** queda
preparado: configura VITE_FEEDBACK_EMAIL con un buzón aparte antes de compilar.
El correo será público en el navegador. Un formulario externo permite ocultar
el destino; no se adjuntan datos automáticamente. Nunca pongas secretos en VITE_*.
Los commits antiguos pueden conservar la dirección anterior: no se reescribió Git.

Borrar todo requiere confirmación y afecta solo a esta instalación. noindex no
es autenticación. Portada/logo SVG propios; fuentes locales con licencias OFL.
Sin afiliación con deportistas o entrenadores. Cálculos orientativos, no atención
médica. Consulta a un profesional si tienes una condición médica.

[Instalación y auditoría PWA](docs/publicar-amigos.md).
