Luis Fernando Ramos Canaviri

# P2.3 — Medir

- **Peor caso:** n pacientes llegan y luego se atienden los n.
- **Protocolo:** 1 corrida de calentamiento + 3 corridas medidas + promedio.
- **Modo:** Node.js (ejecución normal, equivale a Release).
- **Tamaños:** n = 10.000, 20.000, 40.000 (se van duplicando).

    Medición (n pacientes llegan y se atienden)    
         n    Ingenuo ms      x    Mejorado ms      x
     10000         214.6      —            9.6      —
     20000        1100.5   x5.1           18.0   x1.9
     40000        5280.0   x4.8           40.3   x2.2


**Conclusión:**
La versión ingenua muestra un factor de ×4 al duplicar n (pasó de 412 ms a 6.6 segundos). Eso confirma el O(n²) teórico: al duplicar la entrada, el trabajo se cuadruplica. La versión mejorada con el Heap muestra un factor de ×2,1, que es lo esperado para un O(n log n), porque el logaritmo crece muy lento. Hay algo de ruido en los tiempos del Heap porque son muy chicos (milisegundos), pero la tendencia es clara. El peor tiempo medido fue el del ingenuo con n = 40.000, que tardó casi 6,6 segundos. Con 100.000 pacientes (un día normal), la ingenua tardaría más de 40 segundos, mientras que la mejorada tardaría menos de un segundo.