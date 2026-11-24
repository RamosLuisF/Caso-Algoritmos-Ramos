# H3 · Estrategia para el caso (Oruro - Post-Alfabetización)

En mi caso, el problema de optimización consiste en asignar un tiempo limitado de revisión (horas de trabajo al día) a los diferentes municipios que envían documentos, con el fin de maximizar la cantidad de participantes auditados o la criticidad de los mismos.

## ¿Sirve un algoritmo Voraz (Greedy)?
**No**, un voraz no garantiza el óptimo en este caso. 
*   **Intento de lógica voraz:** "Revisar primero el municipio que me dé más participantes por hora".
*   **Por qué falla (contraejemplo):** Supongamos que tengo 10 horas de revisión. 
    *   El municipio A tarda 6 horas y me da 60 participantes (10 por hora).
    *   El municipio B tarda 5 horas y me da 45 participantes (9 por hora).
    *   El municipio C tarda 4 horas y me da 36 participantes (9 por hora).
    *   El voraz elegiría A (porque 10 > 9). Le quedarían 4 horas. El siguiente mejor es B, pero no entra (tarda 5). El siguiente es C, que sí entra. Total: A + C = 60 + 36 = **96 participantes**. 
    *   Si hubiera elegido B + C, tardaría 5 + 4 = 9 horas y obtendría 45 + 36 = **81**. En este caso el voraz gana. Pero si la criticidad fuera distinta (ej. A vale 60, B vale 50, C vale 40), el voraz elegiría A, pero B+C daría 90, que es mayor. **El voraz toma decisiones locales y puede quedar atrapado.**

## ¿Sirve Programación Dinámica?
**Sí**. El problema tiene las dos propiedades de la Clase 12:
1.  **Subestructura óptima:** La mejor forma de usar 5 horas en 3 municipios se construye a partir de la mejor forma de usar 5 horas en 2 municipios.
2.  **Subproblemas repetidos:** Si tengo que calcular cuánto valor saco con 4 horas para los primeros 5 municipios, ese resultado se reutiliza para calcular el valor con 5 horas y 6 municipios. Anotar esto en una tabla evita recalcular.

Por lo tanto, usaré **Programación Dinámica (Mochila 0/1)** para resolver este problema de asignación.