# H2 · Elección de estructuras

Para este caso voy a combinar **dos estructuras**:
1. **Un Mapa / Diccionario (Tabla Hash)** para la búsqueda rápida por RUDE o CI.
2. **Un Árbol Binario de Búsqueda (BST)** (como un `SortedSet`) para mantener el orden alfabético o por fecha.

**¿Por qué no una lista simple?** Porque una lista obliga a recorrerla entera para buscar un RUDE. Si el padrón tiene 50.000 registros y llegan 10.000 documentos al mes, con una lista haríamos 500 millones de comparaciones. Con un Mapa, la búsqueda es directa, sin recorrer.

## Tabla de operaciones

| Operación | Cuántas veces la haces | Estructura que uso | Costo O |
| :--- | :--- | :--- | :--- |
| Buscar por RUDE (clave) | Muchas (cada validación) | Tabla Hash (Map) | O(1) promedio |
| Insertar participante | Moderada | Tabla Hash + Árbol | O(1) / O(log n) |
| Borrar participante | Pocas | Tabla Hash + Árbol | O(1) / O(log n) |
| Recorrer en orden (alfabético) | Pocas (reportes) | Árbol (BST) | O(n) |
| Buscar en rango (ej. 1980-1989) | Pocas | Árbol (BST) | O(log n + k) |

*(k es la cantidad de resultados que caen en el rango).*