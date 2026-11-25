# Elección del algoritmo para MI caso — practicas/c6/eleccion.md

Copia este archivo a `practicas/c6/eleccion.md` en tu repositorio `caso-algoritmos-apellido`
y rellénalo con tu proceso real (el de tu H1). Una pantalla de texto alcanza; lo importante
es que cada decisión tenga su porqué.

## 1. Mi proceso, en una línea

Revisión, validación y transcripción de documentos educativos y listas
de participantes de la Oficina Departamental Oruro del Programa Nacional
de Post-Alfabetización.

## 2. Mis datos

- Cuántos datos manejo hoy (n): La muestra de mi H1 contiene 20
    registros de participantes. Como línea base inicial, se plantea
    revisar aproximadamente 20 registros por jornada.
- Cuántos en el peor mes o el peor día: Todavía no tengo un dato
    histórico confirmado del peor mes o día. Esta cantidad se debe
    registrar durante la prueba piloto para conocer el volumen máximo
    real.
- Qué forma tienen: Los registros contienen nombres, apellidos,
    RUDE, fecha de nacimiento, género, número de CI, lugar de
    nacimiento, ocupación y calificaciones. La información llega en
    documentos físicos, archivos digitales y planillas con diferentes
    formatos. No necesariamente viene ordenada y pueden existir
    registros repetidos, incompletos o con diferencias. Para ordenar y
    buscar utilizaré el RUDE o número de CI como identificador.

## 3. La operación que más pesa

La operación que más pesa para este análisis es **buscar y comparar
registros por RUDE o número de CI** para verificar los datos de los
participantes y detectar posibles duplicados.

Actualmente, la revisión se realiza de manera secuencial, comprobando
los registros uno por uno y comparándolos con sus documentos de
respaldo. Cuando se necesita localizar varias veces a un participante o
revisar una planilla con muchos registros, esta actividad puede aumentar
el tiempo de trabajo.

## 4. Dos candidatos

  -----------------------------------------------------------------------
  Técnica           Cómo funciona     Costo en el peor  Qué necesita
                    (una línea)       caso (O)          (memoria, datos
                                                        ordenados, etc.)
  ----------------- ----------------- ----------------- -----------------
  A: Búsqueda       Recorre los       O(n) por búsqueda No necesita que
  secuencial        registros uno por                   los datos estén
                    uno hasta                           ordenados;
                    encontrar el RUDE                   utiliza poca
                    o llegar al final                   memoria
                    de la lista.                        adicional.

  B: Ordenamiento + Ordena primero    O(n log n) para   Necesita ordenar
  búsqueda binaria  los registros por ordenar y O(log   los datos
                    RUDE y después    n) por búsqueda   previamente y
                    divide la lista                     utilizar memoria
                    en mitades para                     auxiliar para
                    localizar el                        Merge Sort.
                    dato.                               
  -----------------------------------------------------------------------

Para la opción B utilizaré **Merge Sort**. Su recurrencia es:

\[ T(n) = 2T(n/2) + O(n) \]

Según el teorema maestro:

-   a = 2
-   b = 2
-   f(n) = O(n)
-   n\^(log_b(a)) = n\^(log_2(2)) = n

Corresponde al caso 2 del teorema maestro, por lo tanto:

\[ T(n) = O(n `\log `{=tex}n) \]

Después del ordenamiento, la búsqueda binaria tiene un costo de O(log n)
por consulta.

## 5. Mi elección y por qué

Mi elección es la opción B: ordenar la planilla por RUDE mediante
Merge Sort y utilizar búsqueda binaria**, cuando se necesite realizar
varias búsquedas sobre la misma planilla consolidada.

Con los datos de mi proceso, esta opción puede ser conveniente porque
los registros de participantes se consultan para verificar información y
detectar posibles duplicados. Al ordenar una sola vez la planilla, las
búsquedas posteriores pueden realizarse mediante búsqueda binaria, sin
recorrer todos los registros desde el principio.

Sin embargo, si tengo pocos registros o realizo una sola búsqueda, la
opción A (búsqueda secuencial) puede convenir más, porque no necesita el
tiempo inicial de ordenamiento.

El punto o cantidad de registros a partir del cual deja de convenir la
búsqueda secuencial **no se puede establecer todavía**. Lo determinaré
comparando los tiempos medidos para cada tamaño de datos y para la
cantidad de consultas definida en la prueba. La opción B será
conveniente en los tamaños donde el tiempo de ordenar y realizar las
búsquedas binarias sea menor que el tiempo de las búsquedas
secuenciales.

## 6. Cómo lo voy a medir

Realizaré las pruebas en JavaScript con Node.js, desde Visual Studio
Code, utilizando `performance.now()` para medir el tiempo en
milisegundos.

-   **Tamaños de n:** 20, 50, 100, 200, 500 y 1.000 registros.
-   **Cantidad de consultas:** 1.000 búsquedas por ejecución, utilizando
    el mismo RUDE de prueba que no se encuentra en la lista. Así se mide
    el peor caso de la búsqueda secuencial.
-   **Cantidad de corridas:** 10 repeticiones para cada tamaño de datos
    y cada alternativa.
-   **Calentamiento:** ejecutar búsquedas de prueba antes de comenzar a
    medir, para reducir el efecto de la primera ejecución.
-   **Promedio:** sumar los tiempos de las 10 repeticiones y dividir el
    resultado entre 10.
-   **Comparación:** medir la búsqueda secuencial por separado. Para la
    opción B, medir el ordenamiento y las 1.000 búsquedas binarias;
    luego sumar ambos tiempos para obtener el tiempo total.

---
### Ejemplo resuelto (el padrón de la clase 1)
- Proceso: verificar si un carnet está en el padrón.
- Datos: 1.000.000 de carnets, 10.000 consultas, sin orden garantizado.
- Operación que pesa: buscar (10.000 veces).
- Candidato A: recorrer la lista uno por uno, O(n) por consulta.
- Candidato B: ordenar una vez (n log n) y usar la binaria, O(log n) por consulta.
- Candidato C: un conjunto (HashSet), O(1) por consulta, pero necesita memoria extra.
- Elección: C si solo hay que saber si el carnet está; B si además se piden rangos u orden.
- Evidencia: la medición del duelo (alrededor de 1 segundo contra alrededor de 1 milisegundo).
