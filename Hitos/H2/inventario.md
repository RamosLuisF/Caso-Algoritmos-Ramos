# H2 · Inventario de operaciones del caso (Oficina Departamental Oruro)

Basado en el proceso de revisión, validación y transcripción de documentos educativos y listas de participantes (H1).

## 1. ¿Qué datos guarda tu proceso y cuántos son?
- **Hoy:** Aproximadamente 20 registros por jornada (datos personales: nombres, RUDE, CI, fecha de nacimiento, ocupación).
- **Proyección (el peor mes):** Al consolidar todos los municipios (Sabaya, Oruro, Potosí, etc.), el padrón crece a **decenas de miles de registros** (10.000 a 50.000 participantes).

## 2. ¿Qué operaciones haces sobre esos datos?
- **Buscar por clave:** Validar si un participante ya existe buscando su RUDE o su N° CI.
- **Insertar:** Agregar un nuevo participante a la planilla consolidada tras validar sus documentos.
- **Borrar:** Dar de baja a un participante registrado por error (poco frecuente).
- **Recorrer en orden:** Generar reportes por orden alfabético (apellidos) o agrupados por municipio.
- **Buscar en un rango:** Listar a todos los participantes que nacieron en cierta década (ej. 1980-1989) o que tienen cierto estado.

## 3. ¿Cuáles haces más veces (muchas o pocas)?
- **Búsqueda por clave (RUDE/CI): MUCHAS veces.** Cada documento que llega de un municipio hay que cruzarlo para no duplicar.
- **Inserción: MODERADA.** Ocurre cada vez que se valida a un nuevo participante.
- **Borrado: POCAS veces.** Solo cuando hay errores de digitación.
- **Recorrer en orden y rangos: POCAS veces (al final del día/mes).** Para generar los reportes a la oficina central.