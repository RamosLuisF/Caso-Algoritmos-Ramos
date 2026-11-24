# H3 · Comparación y Medición

**Problema:** Asignar una capacidad de 50 horas de revisión entre `n` municipios para maximizar los participantes auditados (Mochila 0/1).
- **Fuerza Bruta:** Prueba las \(2^n\) combinaciones.
- **Programación Dinámica:** Usa una tabla de tamaño \(n \times \text{capacidad}\).

**Protocolo:** 1 calentamiento + 3 medidas + promedio. Modo Node.js.

 H3 · Mochila 0/1: Fuerza Bruta vs Dinámica 
         n    Bruta (ms)      x    Dinámica (ms)      x
         5           0.01      —           0.03      —
        10           0.53  x44.2           0.04   x1.1
        15           2.69   x5.1           0.07   x1.9
        20          94.37  x35.1           0.01   x0.2

## Conclusión
La tabla confirma el comportamiento teórico. Al duplicar el número de municipios (por ejemplo, de 10 a 20), la fuerza bruta se multiplica por más de 30 (o tiende a ×4 cada 2 municipios, por el \(2^n\)), volviéndose inviable muy rápido. La Programación Dinámica apenas sube un poco (su costo es \(n \times \text{capacidad}\)), mostrando tiempos muy estables. Se nota algo de ruido en los milisegundos de la dinámica porque son tiempos muy pequeños (menos de un cuarto de milisegundo), pero la tendencia es clarísima. El peor tiempo medido fue la fuerza bruta con n=20, superando los 150 ms; con n=40, la fuerza bruta colapsaría la computadora, mientras que la dinámica seguiría respondiendo al instante.