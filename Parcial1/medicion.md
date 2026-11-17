Luis Fernando Ramos Canaviri
### P1.2 — Curar y medir (5 puntos) · archivo `medicion.md` (+ tu código)
**1. Cura (1,5 puntos).** Escribe `HayComprobantesRepetidosCurado` (en tu lenguaje): una versión correcta con un costo MENOR que O(n²), sin modificar la lista que recibe. Debe pasar los cinco casos que imprime `Main` (repetido en el medio, sin repetidos, lista vacía, un solo elemento, repetido en los extremos). En `medicion.md` escribe en una línea qué hace tu cura y cuál es su costo O.

Mi cura usa un `Set` de JavaScript. Recorro la lista una sola vez: por cada comprobante pregunto si ya está en el conjunto (`set.has`). Si la respuesta es sí, hay repetido y devuelvo `true` de inmediato. Si no, lo agrego (`set.add`) y sigo. Si termino de recorrer sin encontrar repetidos, devuelvo `false`. No modifico la lista original, solo la leo.

Costo: O(n) esperado. Cada `has` y cada `add` sobre un `Set` son O(1) en promedio, y hago a lo sumo una de cada una por elemento.

**2. Medición (3,5 puntos).** Mide `HayComprobantesRepetidosPorPares` y tu cura en el PEOR CASO (lista SIN repetidos, ya la genera `GenerarSinRepetidos`).
- Usa **cuatro tamaños que se dupliquen** (n, 2n, 4n, 8n). Elige n para que la solución lenta, con el mayor tamaño, tarde entre 0,5 y 20 segundos en TU lenguaje.
- Protocolo: **1 corrida de calentamiento + 3 corridas medidas + promedio**, en modo Release o equivalente.
- Entrega una **tabla** (n, tiempo de cada solución y cuántas veces más tarda respecto de la fila anterior) y **tres o cuatro líneas de conclusión**: ¿cada solución se comporta como el O que calculaste? ¿Hay ruido en algún tiempo? ¿Cuál es el peor tiempo medido y con qué n?

- **Peor caso:** lista SIN repetidos (`generarSinRepetidos`), porque hay que revisarla completa antes de responder.
- **Protocolo:** 1 corrida de calentamiento + 3 corridas medidas + promedio.
- **Modo:** Node en ejecución normal (equivalente a Release).
- **Tamaños:** n = 5.000, 10.000, 20.000, 40.000 (se van duplicando).

edición (peor caso: lista SIN repetidos) 
         n   lenta O(n^2) ms     x    curada O(n) ms      x
      5000             24.1      —             0.690      —
     10000             93.9   x3.9             0.708   x1.0
     20000            434.4   x4.6             1.323   x1.9
     40000           2381.0   x5.5             5.778   x4.4