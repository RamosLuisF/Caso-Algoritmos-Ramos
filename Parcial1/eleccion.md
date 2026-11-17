Luis Fernando Ramos Canaviri

# P1.3 — Elegir

Datos del problema:
- n = 250.000 códigos de producto
- q = 8.000 consultas al día
- No se puede duplicar el listado (memoria limitada)


## Costo total de cada opción

**Opción 1 — Recorrer la lista entera en cada consulta**
Cada consulta cuesta O(n) porque hay que mirar hasta 250.000 códigos.
- Por consulta: 250.000 operaciones
- Total: 8.000 × 250.000 = **2.000.000.000 operaciones** (2 × 10⁹)

**Opción 2 — Ordenar una vez con n log n + búsqueda binaria**
- Ordenar una vez: n · log₂(n) = 250.000 × 17,93 ≈ **4.480.000 operaciones**
- Buscar cada consulta: 8.000 × 17,93 ≈ **143.000 operaciones**
- Total: 4.480.000 + 143.000 ≈ **4.623.000 operaciones** (4,6 × 10⁶)

**Opción 3 — Ordenar una vez con un algoritmo cuadrático + búsqueda binaria**
- Ordenar una vez (burbuja/inserción): n²/2 ≈ 250.000²/2 ≈ **31.250.000.000 operaciones** (3,1 × 10¹⁰)
- Buscar cada consulta: 8.000 × 17,93 ≈ **143.000 operaciones**
- Total: 31.250.000.000 + 143.000 ≈ **31.250.143.000 operaciones** (3,1 × 10¹⁰)

## Comparación

| Opción | Costo total | Veces más lenta que la mejor |
|---|---:|---:|
| 1 — Lineal siempre | 2,0 × 10⁹ | ×433 |
| **2 — n log n + binaria** | **4,6 × 10⁶** | **×1** |
| 3 — Cuadrático + binaria | 3,1 × 10¹⁰ | ×6.800 |

## Mi elección

**Elijo la Opción 2: ordenar una vez con n log n y usar búsqueda binaria en cada consulta.**

Razones:
1. Es la más barata: unas 433 veces menos operaciones que recorrer lineal cada vez, y unas 6.800 veces menos que ordenar con un cuadrático.
2. Coincide con lo que medí en P1.2: cuando comparé O(n²) contra O(n) en la práctica, subir un orden de eficiencia hizo que el tiempo pasara de segundos a fracciones de milisegundo. Aquí pasa lo mismo, pero entre 10⁹ y 10⁶ operaciones.
3. La Opción 3 queda descartada porque ordenar con un cuadrático cuesta 3,1 × 10¹⁰, más incluso que la Opción 1: pagar ese precio una sola vez ya arruina toda la mañana.

## ¿A partir de cuántas consultas cambiaría de opinión?

Igualo el costo de la Opción 1 con el de la Opción 2, dejando q como incógnita:

- Opción 1: q · n
- Opción 2: n · log₂(n) + q · log₂(n)

Igualando:
q · n = n · log₂(n) + q · log₂(n)
q · (n − log₂(n)) = n · log₂(n)

Como n = 250.000 es mucho más grande que log₂(n) ≈ 17,93, aproximamos (n − log₂(n)) ≈ n, y queda:

q ≈ log₂(n) ≈ 17,93

**Punto de cruce: alrededor de 18 consultas.**

Verificación:
- Con q = 18: Opción 1 = 4.500.000; Opción 2 ≈ 4.480.000. Están empatadas.
- Con q = 8.000 (el caso del almacén): la Opción 2 gana por mucho.
- Con q = 10: Opción 1 = 2.500.000; Opción 2 = 4.480.000. Aquí conviene la Opción 1.

**Conclusión:** con 8.000 consultas al día, ordenar una vez conviene claramente. Solo cambiaría de opinión si el almacén hiciera **menos de ~18 consultas al día**, porque ahí el costo de ordenar no se recupera y sale más barato recorrer la lista directamente.