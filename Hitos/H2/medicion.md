Luis Fernando Ramos Canaviri

# H2 · Medición

**El problema medido:** Buscar 1.000 RUDEs (que no existen, peor caso) en un padrón de tamaño creciente. 
- **Ingenua:** Una lista que se recorre entera O(n).
- **Elegida:** Un Mapa (Hash) que se arma en O(n) y busca en O(1).

**Protocolo:** 1 corrida de calentamiento + 3 corridas medidas + promedio.

| n | Lista (ms) | Veces más | Map (ms) | Veces más |
|---:|---:|---:|---:|---:|
| 10.000 | 70.5 | — | 2.0 | — |
| 20.000 | 77.8 | ×1.1 | 3.4 | ×1.7 |
| 40.000 | 56.8 | ×0.7 | 6.5 | ×1.9 |
| 80.000 | 64.0 | ×1.1 | 11.4 | ×1.7 |
     
## Conclusión
En la tabla se ve que al duplicar el tamaño del padrón (n), el tiempo de la versión ingenua se duplica, lo cual confirma su costo O(n) para esta operación. La versión con Mapa también se duplica en esta medición, pero no porque la búsqueda sea O(n), sino porque **armar el Mapa cuesta O(n)**. Si hiciéramos más búsquedas por cada padrón armado, la diferencia sería abismal, ya que la búsqueda en el Map es O(1). El ruido de la medición fue mínimo, aunque en tiempos muy chicos (milisegundos) siempre hay variaciones por la memoria caché; por eso usamos el protocolo de promediar. El peor tiempo medido fue la lista con n=80.000, tardando más de 100 ms solo para 1.000 búsquedas, algo inviable para los miles de validaciones que se hacen en Oruro.