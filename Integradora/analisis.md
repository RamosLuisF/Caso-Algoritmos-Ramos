Luis Fernando Ramos Canaviri

# I1 — Analizar y elegir

**a) Costo de `CompradorIngenuo.Elegir`**
El costo es **O(n · 2^n)**. 
El algoritmo prueba todos los subconjuntos posibles (desde 0 hasta 2^n - 1). Por cada subconjunto, hace un bucle interno que recorre los n útiles para sumar los costos y las utilidades. En el peor caso, el tiempo se multiplica por 2 cada vez que se agrega un útil nuevo, lo cual es inviable muy rápido.

**b) La recurrencia T(n) = 2T(n-1) + 1**
El teorema maestro de bolsillo **NO se aplica** aquí porque la recursión no divide el problema en fracciones (como n/2 o n/3), sino que lo reduce restando de a uno (n-1). El teorema maestro es para algoritmos de divide y conquista. 
Al resolverla por el método del árbol, tenemos 1 llamada en el nivel 0, 2 en el nivel 1, 4 en el nivel 2... hasta 2^n en el último nivel. Sumando todo, el costo es **O(2^n)**.

**c) ¿Sirve un algoritmo voraz?**
**No sirve.** Un voraz que elija el útil con mayor "utilidad por Bs" se equivoca. 
*Contraejemplo con los datos del primer caso:* 
- U1: Costo 20, Utilidad 120 → Ratio: 6.0
- U2: Costo 40, Utilidad 200 → Ratio: 5.0
- U3: Costo 60, Utilidad 240 → Ratio: 4.0
- Presupuesto: 100 Bs.

El voraz elige el U1 (ratio 6). Nos quedan 80 Bs. Luego elige el U2 (ratio 5). Nos quedan 40 Bs. El U3 ya no cabe. 
Total con voraz: 120 + 200 = **320**. 
Sin embargo, la mejor solución es comprar U2 y U3. Costo: 40 + 60 = 100 Bs. Utilidad: 200 + 240 = **440**. 
Como 440 > 320, el voraz falla.

**Estrategia elegida: Programación Dinámica (Mochila 0/1)**
Funciona porque el problema tiene **subestructura óptima** (la mejor compra con 100 Bs se arma a partir de la mejor compra con menos presupuesto) y **subproblemas repetidos** (calcular cuánta utilidad máxima saco con los primeros 3 útiles y 50 Bs se reutiliza para calcular con 4 útiles y 60 Bs). Su costo es **O(n · Presupuesto)**.

**d) Estructura para `EstaEnLaCompra`**
Para que las consultas sean rápidas, usaría un **Set (Hash)**. Al terminar de elegir la compra, guardo los códigos en el Set. 
- Costo con el Set: **O(1)** en promedio.
- Costo recorriendo una lista (como en el ingenuo): **O(n)**.