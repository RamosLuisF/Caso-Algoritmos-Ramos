Luis Fernando Ramos Canaviri

# P2.1 — Elegir

## Tabla de operaciones

| Operación | Veces al día | Estructura que uso | Costo O |
| :--- | :--- | :--- | :--- |
| `Registrar(nombre, urgencia)` | 100.000 | Un `Map` (diccionario) y un `Heap` (cola de prioridad) | O(log n) en el Heap, O(1) en el Map |
| `AtenderSiguiente()` | 100.000 | El `Heap` (saca al de mayor prioridad) y el `Map` | O(log n) en el Heap, O(1) en el Map |
| `EstaEsperando(nombre)` | 30.000 | Solo el `Map` | O(1) |
| `Esperando` (cantidad) | Muchas | Una variable que cuenta | O(1) |

## ¿Por qué no sirve la lista simple (con números)?
La lista simple del `GestorIngenuo` es un arreglo. 
- **Registrar:** Es O(1), porque solo agrega al final.
- **EstaEsperando:** Es O(n), recorre toda la lista buscando el nombre.
- **AtenderSiguiente:** Es **O(n)**. Tiene que recorrer toda la lista para buscar al más urgente.

Si sumamos un día de trabajo (n = 100.000):
- **Con la lista simple:** Para atender a 100.000 pacientes, en cada atención recorre hasta 100.000. Eso son 100.000 * 100.000 = **10.000.000.000 operaciones (10 mil millones)**. Además, borrar de una lista en JS (`splice`) también es O(n) porque mueve todos los elementos. Esto es O(n²) y colapsaría la clínica.
- **Con mi estructura (Heap + Map):** Atender cuesta O(log n) ≈ 17 pasos. Registrar cuesta lo mismo. Al día: 100.000 * 17 = **1.700.000 operaciones**. Y la búsqueda con el `Map` cuesta O(1), así que 30.000 consultas son 30.000 pasos. En total, hacemos **~1,73 millones de operaciones**, unas **5.780 veces menos** que con la lista.

## Condición para cambiar de opinión
Cambiaría de opinión si la clínica pidiera buscar a los pacientes por un **rango de urgencia** (por ejemplo: "muéstrame a todos los críticos"). El Heap no sirve para recorrer rangos; en ese caso usaría un **Árbol Binario de Búsqueda (BST) balanceado** o un `SortedSet`.