# Una sola Olympia

## Comparación

Referencia personal: `origin/main`, merge de PR #34 (`3b397fc`). La rama local
main estaba atrasada; no se utilizó. Los PR #32–#34 ya están fusionados.
Olympia partía de `c3a2e78`. 152 archivos eran idénticos entre ambos árboles.

| Función | Resultado |
|---|---|
| #32: descanso flotante, safe-area, panel y registro real | Ya incorporado |
| #33: tarjetas, anatomía SVG, transiciones y resumen final | Ya incorporado |
| #34: onboarding, Perfil, comida/sueño/cardio/check | Ya incorporado |
| Editor: descansos, redondeos y técnicas opcionales | Ya incorporado |
| Editor: patrón, preparación manual/Auto y zona | Recuperado en Ajustes del ejercicio; no registra previas |
| Prioridades Classic Physique | Recuperadas como información de la plantilla en Método |
| Precargas corporales, meta/fechas personales e imagen específica | Excluidas |

Las demás diferencias son saneamiento, aislamiento del almacenamiento,
plantillas/editor, textos independientes y mejoras PWA. No se copió historial Git
del repositorio personal. La plantilla PPL no contiene pesos personales.

## Migrar los datos reales

1. En el celular y navegador donde tienes tus registros, abre la app personal.
   Espera a que termine el guardado. Ajustes → Configuración → **Exportar mis
   datos** (en versiones anteriores: Descargar copia de seguridad). El botón
   ya existe: no requiere otro despliegue personal. Guarda el JSON fuera del navegador.
2. Abre https://alvarovz14.github.io/Olympia-amigos/ y actualiza si aparece el
   aviso. Puedes completar el onboarding con los mínimos: luego se importa tu perfil.
3. En Olympia, exporta primero cualquier dato que quieras conservar del destino.
   Ajustes → Configuración → Importar datos → selecciona el JSON personal.
4. Comprueba origen, sesiones, series, medidas, checks y fotos. Seleccionar el
   archivo no escribe nada. Para trasladar exactamente tu rutina y perfil,
   elige Reemplazar y confirma tras leer el aviso. Combinar añade lo nuevo y
   conserva los valores locales cuando coinciden; no sobrescribe el perfil local.
5. Comprueba Historial (años/meses/sesiones), Perfil, pesos, rutina, comidas,
   diario, medidas y las tres poses de Check mensual. Reexporta desde Olympia
   y conserva ambas copias. Prueba abrir sin conexión.
6. Confirma que todo está migrado. Solo después se propondrá el aviso de traslado
   y retirar los despliegues del repositorio anterior; no se elimina ahora.

No borres almacenamiento del sitio ni desinstales la app anterior durante la
migración. Las bases `heavy-duty-personal` y `olympia-friends` siguen separadas;
la importación explícita solo escribe en la segunda. Un formato futuro o
incompatible se rechaza antes de escribir.

## Demostración con datos ficticios

`tests/fixtures/personal-backup.js` genera 40 sesiones, 762 registros de series
(incluye previas históricas y extensiones), seis fotos, perfil e historial de
perfil, rutina editada, pesos, notas, descansos, cardio, pasos, diario, comidas,
medidas, revisiones de sesiones y archivo previo. No provienen de una persona real.

`tests/backup-migration.test.js` comprueba conservación exacta y rechazo de
versiones/fotos faltantes. `tests/browser/backup-migration.spec.js` cancela primero
y verifica que el destino no cambió, importa, recarga offline y reexporta.
Compara campos, fotos y colecciones y exige una copia exacta del origen.
Las pruebas existentes cubren combinación idempotente, fotos y rollback por
fallo después de clear dentro de la transacción. Esto demuestra el mecanismo,
no afirma que los datos del celular real ya se hayan migrado.

Verificación local de esta entrega: 201 pruebas unitarias aprobadas, compilación
de producción aprobada y 82 pruebas de navegador aprobadas. El caso de migración
personal se ejecutó realmente con confirmación cancelada/aceptada y recarga offline.
`npm ci` informó cero vulnerabilidades en las dependencias fijadas.

## Privacidad y acciones pendientes

La app inicia sin perfil, historial, fotos, medidas ni fases personales. Los
fixtures de pruebas son ficticios. Los límites de validación y referencias
nutricionales generales no son datos del usuario. El identificador GitHub en
los enlaces de alojamiento es público; no es un perfil precargado.

Se retiró el correo personal de About/README actuales. Los commits anteriores
todavía lo contienen; no se reescribió Git. Usa un buzón exclusivo de soporte
o formulario con destino oculto. Las variables VITE_* son públicas.
El escaneo de archivos rastreados no encontró archivos .env ni patrones de
claves privadas, tokens GitHub, claves AWS, Google API u OpenAI. No constituye
una garantía absoluta frente a cualquier secreto de formato desconocido.

Pendiente: confirmar la migración real, elegir destino de comentarios y luego
aprobar el retiro de Templates (aviso, detener workflows, archivar/privatizar
si GitHub lo permite sin perder el aviso). No se borran carpetas ni ramas antiguas.
