# Auditoría de Brai, 10 noviembre 2026

## Alcance y estado
Revisión estática de frontend, esquema SQL, dependencias y archivos versionados. Aplicación actual: prototipo local sin backend ni autenticación. No es un sistema de registro real. Compilación, revisión visual y publicación pendientes de confirmación al redactar este informe.

## Cambios aplicados
- Portada editorial centrada en la obra y su ficha, con tokens de marca existentes. Referencia visual: https://docs.21st.dev/%40felipemenezes098/components/hero-04. Implementación propia, sin añadir dependencias.
- Aviso de prototipo en landing. Reclamar ya explica que no acredita propiedad ni notifica al artista; propone correo ficticio.
- Fallo explícito si sessionStorage rechaza la escritura. Validación de estructura del estado guardado.
- Corrección del mensaje de límite de intentos de demo.
- Visor mueve, contiene y devuelve foco de teclado.
- Enlace para saltar al contenido.
- CSP, nosniff, política de referencia y permisos; SAMEORIGIN conserva los iframes internos.
- Eliminado script inline de index.html para compatibilidad con CSP. Contenido visible sin depender de la animación de revelado.

## Pendientes prioritarios antes de datos reales
1. schema.sql obra_publica escribe telemetría por cada consulta sin límite. Separar lectura de escritura y limitar solicitudes en servidor.
2. reclamar permite que cinco solicitudes anónimas bloqueen una obra para todos. Añadir límites por solicitante y recuperación sin debilitar protección contra adivinación.
3. UPDATE permite cambiar identificadores y ficha sin reflejarlo en cadena. Identificadores inmutables y versiones auditadas de metadatos.
4. No hay Supabase conectado, autenticación, panel operativo ni transferencias reales. No presentarlos como terminados.
5. prueba.sql imprime resultados en vez de fallar automáticamente. Convertirlo en prueba con aserciones antes de aplicar migraciones.
6. Correo comercial y dominio requieren verificación operativa. Los CTA no deben ofrecer contacto que nadie recibe.
7. Falta prueba completa en móvil, teclado, almacenamiento bloqueado, URL inexistente, reclamo duplicado y recarga.
8. Datos e historias de José Luis son ejemplos. No atribuirlos como testimonio o registro real; mantener aviso visible.

## Evidencia de seguridad
Auditor especializado: pnpm audit --prod sin vulnerabilidades conocidas. Siete tablas con RLS; revocación de ejecución pública al final del esquema. Sin secretos reales detectados en archivos versionados. .env.example contiene valores vacíos y patrones .env ignorados. Historial revisado por nombres, no todos sus contenidos. SQL no ejecutado contra una base viva. No hay certificación de seguridad de producción.

## Validación pendiente
No interpretar la existencia de cambios como verificación. Confirmar build, navegación visual y headers en URL desplegada antes de declarar finalización.
