# Caso Integrador · Análisis de Algoritmos 
**Luis Fernando Ramos Canaviri**

Proceso real: **Revisión, validación y transcripción de documentos educativos y listas de participantes** de la **Oficina Departamental de Oruro — Programa Nacional de Post-Alfabetización**.

---

## Índice del expediente

### 📁 [H1 · Proceso real](./h1/)
Análisis del proceso actual: revisión manual (O(n)) y detección de duplicados por comparación exhaustiva (O(n²)).
- Problema identificado: comparar cada registro contra todos los demás es inviable con miles de participantes.
- Línea base: ~20 registros por jornada, con proyección a decenas de miles al consolidar municipios.

### 📁 [Prácticas de clases 3 a 6](./practicas/)
Ejercicios de medición, búsqueda lineal vs binaria, ordenamientos cuadráticos y medición empírica con protocolo.
- Clase 3: Medición empírica (calentar, repetir, promediar).
- Clase 4: Búsqueda lineal O(n) vs binaria O(log n) y el precio de ordenar.
- Clase 5: Ordenamientos O(n²) — burbuja e inserción.
- Clase 6: Recurrencias y el teorema maestro de bolsillo.

### 📁 [H2 · Estructura del caso](./hitos/h2/)
Inventario de operaciones e elección de estructuras (Map + Árbol) para el proceso de validación de RUDEs y CIs.
- **Elegido:** `Map` (Tabla Hash) para búsquedas O(1) y un Árbol (BST) para reportes en orden y rangos.
- **Medición:** lista ingenua O(n) vs Map O(1) con 10.000, 20.000, 40.000 y 80.000 registros.

### 📁 [H3 · Estrategia y comparación](./hitos/h3/)
Análisis de la estrategia de optimización para asignar horas limitadas de revisión entre municipios.
- **Voraz descartado:** contraejemplo con números (el voraz elige mal y pierde valor).
- **Programación Dinámica elegida:** Mochila 0/1 con costo O(n × capacidad).
- **Medición:** fuerza bruta O(2^n) vs DP O(n × capacidad) con verificación de mismo resultado.

### 📁 [Evaluación Integradora · Variante B](./integradora/)
Caso análogo resuelto: compras de una escuela con presupuesto limitado (Mochila 0/1).
- Análisis del costo O(n · 2^n) del ingenuo y por qué el teorema maestro no aplica a `T(n) = 2T(n-1) + 1`.
- Contraejemplo del voraz con números reales del primer caso de prueba.
- Implementación en JS con Programación Dinámica y verificación de los 6 casos.

---

## Proceso real (resumen)

La Oficina Departamental de Oruro recibe información de múltiples municipios (Sabaya, Oruro, Potosí, La Paz) en formatos distintos: documentos físicos, archivos digitales y planillas con diferentes estructuras. El personal debe revisar manualmente que cada registro tenga los datos necesarios, que los documentos de respaldo coincidan y que no haya duplicados. Después, transcribe los datos a una planilla consolidada.

**El problema:** este proceso manual es O(n²) para detectar duplicados y no permite planificar eficientemente qué municipios revisar primero con las horas limitadas de trabajo.

**La solución propuesta (en tres fases):**
1. **H2:** usar un Map para validar RUDEs y CIs en O(1), eliminando la búsqueda lineal.
2. **H3:** usar Programación Dinámica para planificar la asignación de horas entre municipios (Mochila 0/1).
3. **Integradora:** demostrar que la fuerza bruta es inviable y que la DP da el mismo resultado en tiempo razonable.

---

## Estado del expediente

| Parte | Estado | Última actualización |
|---|---|---|
| H1 (proceso real) | ✅ Completo | 16-nov-2026 |
| Prácticas (clases 3-6) | ✅ Completas | Durante el curso |
| H2 (estructura + medición) | ✅ Completo | 22-nov-2026 |
| H3 (estrategia + medición) | ✅ Completo | 24-nov-2026 |
| Integradora (Variante B) | ✅ Completa | 24-nov-2026 |

---

## Enlaces rápidos

- [H1 · Proceso real](./h1/)
- [Prácticas](./practicas/)
- [H2 · Estructura](./hitos/h2/)
- [H3 · Estrategia](./hitos/h3/)
- [Integradora](./integradora/)

---
