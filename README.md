# Caso Integrador · Análisis de Algoritmos
**Luis Fernando Ramos Canaviri**

## Proceso real (resumen)

La Oficina Departamental de Oruro recibe información de múltiples municipios (Sabaya, Oruro, Potosí, La Paz) en formatos distintos: documentos físicos, archivos digitales y planillas con diferentes estructuras. El personal debe revisar manualmente que cada registro tenga los datos necesarios, que los documentos de respaldo coincidan y que no haya duplicados. Después, transcribe los datos a una planilla consolidada.

**El problema:** este proceso manual es O(n²) para detectar duplicados y no permite planificar eficientemente qué municipios revisar primero con las horas limitadas de trabajo.

**La solución propuesta:**
1. **H2:** usar un Map para validar RUDEs y CIs en O(1), eliminando la búsqueda lineal.
2. **H3:** usar Programación Dinámica para planificar la asignación de horas entre municipios (Mochila 0/1).
3. **Integradora:** demostrar que la fuerza bruta es inviable y que la DP da el mismo resultado en tiempo razonable.

---

## Índice del expediente

### 📁 [H1 · Proceso real](./H1/)
Análisis del proceso actual: revisión manual (O(n)) y detección de duplicados por comparación exhaustiva (O(n²)).
- Problema identificado: comparar cada registro contra todos los demás es inviable con miles de participantes.
- Línea base: ~20 registros por jornada, con proyección a decenas de miles al consolidar municipios.

### 📁 [Prácticas de clases](./Practicas/)
Ejercicios de medición, búsqueda lineal vs binaria, ordenamientos cuadráticos y medición empírica con protocolo.

### 📁 [Hitos (H2 y H3)](./Hitos/)
- **[H2 · Estructura del caso](./Hitos/H2/)**: Inventario de operaciones e elección de estructuras (Map + Árbol) para la validación de RUDEs y CIs.
- **[H3 · Estrategia y comparación](./Hitos/H3/)**: Análisis de la estrategia (Voraz descartado, Programación Dinámica elegida) con medición de fuerza bruta vs DP.

### 📁 [Evaluación Integradora · Variante B](./Integradora/)
Caso análogo resuelto: compras de una escuela con presupuesto limitado (Mochila 0/1).
- Análisis del costo O(n · 2^n) del ingenuo.
- Contraejemplo del voraz con números reales.
- Implementación en JS con Programación Dinámica.

### 📁 [Parciales](./Parcial1/)
Evaluaciones del curso:
- [Parcial 1](./Parcial1/)
- [Parcial 2](./Parcial2/)

---

## Cómo reproducir las mediciones

Todas las mediciones fueron ejecutadas en **JavaScript (Node.js v24.11.1)** aplicando el protocolo estándar del curso: **1 corrida de calentamiento + 3 corridas medidas + promedio** (usando `process.hrtime.bigint()` o `performance.now()` según el archivo).

```bash
node Hitos/H2/medicion.js
node Hitos/H3/comparacion.js
node Parcial1/medicion.js
node Parcial2/gestor.js
node Integradora/comprador.js
```