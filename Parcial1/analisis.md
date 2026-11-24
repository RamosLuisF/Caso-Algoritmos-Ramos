Luis Fernando Ramos Canaviri
### P1.1 — Analizar (5 puntos) · archivo `analisis.md`
**a) Cuatro fragmentos.** Para cada uno: su costo O en el peor caso y UNA línea que lo justifique.

```
// F1                                   
cuenta = 0                              
for i = 1 to n:                         
    if dato[i] es par:                      
        cuenta = cuenta + 1   

Costo: O(n). Hay un solo for que pasa por los n elementos una vez, y dentro solo se hace una comparación y una suma, que son constantes. Entonces el tiempo crece igual que n.

// F2
cuenta = 0
for i = 1 to n:
    for j = 1 to n:
        if dato[i] + dato[j] == meta: cuenta = cuenta + 1

Costo: O(n²). Son dos for metidos uno dentro del otro, y los dos van de 1 hasta n. Por cada vuelta del de afuera, el de adentro hace n vueltas, así que en total son n·n = n² comparaciones.

// F3                                   
k = 1                                  
while k < n:                              
    k = k * 2                    
    paso = paso + 1   

Costo: O(log n). Aquí k empieza en 1 y se va multiplicando por 2 (1, 2, 4, 8, 16...). Para llegar a n o pasarlo necesita log₂(n) vueltas, no n. Por eso es logarítmico.
                   
// F4
for i = 1 to n:
    k = n
    while k > 1:
        k = k / 3
Costo: O(n log n). El for de afuera se repite n veces. Adentro, el while parte k entre 3 cada vez (n, n/3, n/9...) hasta que llega a 1, y eso son log₃(n) pasos. Entonces el total es n multiplicado por log₃(n), o sea n log n.

```

**b) Dos recurrencias. ** Resuelve con el teorema maestro de bolsillo (T(1) = 1): escribe a, b, d, la comparación de a con b^d y la forma.

```
(i)   T(n) = 4 T(n/3) + n
- a = 4, b = 3, d = 1
- b^d = 3^1 = 3
- Comparo: 4 > 3, o sea a > b^d
- Como a es mayor, la forma es Θ(n^(log_b a)) = Θ(n^(log₃ 4)) ≈ Θ(n^1.26)
(ii)  T(n) = 2 T(n/2) + n²
- a = 2, b = 2, d = 2
- b^d = 2^2 = 4
- Comparo: 2 < 4, o sea a < b^d
- Como a es menor, gana el término de trabajo y la forma es Θ(n^d) = Θ(n²)
```