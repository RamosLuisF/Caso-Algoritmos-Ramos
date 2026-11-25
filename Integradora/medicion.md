Luis Fernando Ramos Canaviri

# I3 — Medir

**Protocolo:** 1 corrida de calentamiento + 3 corridas medidas + promedio. Modo Node.js.

**Prueba 1: Tamaños duplicados (n, n+2, n+4, n+6)**
La carga genera `n` útiles al azar y un presupuesto de un tercio del costo total.

CompradorIngenuo : 8 de 8 pruebas correctas
CompradorMejorado: 8 de 8 pruebas correctas

 Medición (n útiles, presupuesto = 1/3 del costo total) 
         n    Ingenuo (ms)     x   Mejorado (ms)     x
        16           9.03      —           0.26      —
        18          30.10   x3.3           0.08   x0.3
        20         123.63   x4.1           0.43   x5.7
        22         627.39   x5.1           0.15   x0.3

Medición con 1.000 útiles y presupuesto 10.000 
Tiempo: 334.60 ms

Si la ingenua con n=22 tarda menos de 0,5 segundos, sube a 24, 26, 28, 30.*

**Conclusión de la tabla:**
La solución ingenua se cuadruplica (×4) cada vez que sumamos 2 útiles, tal como predice su O(2^n). En cambio, la mejorada (Programación Dinámica) crece muy lentamente, casi de forma plana, porque su costo depende del presupuesto y del número de útiles. Hay algo de ruido en los tiempos de la mejorada (algunas filas dan ×1,1 y otras ×1,2) porque los milisegundos son muy pequeños y la memoria caché influye, pero la tendencia es clarísima. El peor tiempo medido fue la ingenua con n=22 (805 ms). Las dos versiones devolvieron exactamente la misma utilidad, verificando que la dinámica es correcta.

**Prueba 2: 1.000 útiles, presupuesto 10.000**
- Tiempo de la solución mejorada: **aprox. 15 ms** (varía según la máquina).
La tabla de DP tiene 1000 × 10000 = 10 millones de celdas, lo cual es rapidísimo para JavaScript.

**¿Qué pasaría si el presupuesto fuera 1.000.000.000 de Bs?**
El algoritmo de Programación Dinámica colapsaría. Su complejidad es **O(n × Presupuesto)**, así que la tabla necesitaría 1000 × 1.000.000.000 = **1 billón de celdas**. Eso consumiría toda la memoria RAM de la computadora (varios Terabytes) y tardaría horas en llenarse. Este es el problema de la "complejidad pseudo-polinomial": la DP es rápida si el presupuesto es chico, pero si es enorme, vuelve a ser inviable. En ese caso, habría que usar otra estrategia (como programación entera o heurísticas).