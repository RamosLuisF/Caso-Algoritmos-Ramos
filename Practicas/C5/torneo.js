// CLASE 5 · EL TORNEO DE ORDENAMIENTOS EN JAVASCRIPT (VERSIÓN ROBUSTA)
// PROTOCOLO: 1 corrida de calentamiento + 3 corridas medidas + promedio.

// ---------- 1. INSERCIÓN (Cuadrático O(n²)) ----------
function insercion(a) {
    let c = 0;
    for (let i = 1; i < a.length; i++) {
        let actual = a[i];
        let j = i - 1;
        while (j >= 0) {
            c++;
            if (a[j] > actual) {
                a[j + 1] = a[j];
                j--;
            } else {
                break;
            }
        }
        a[j + 1] = actual;
    }
    return c;
}

// ---------- 2. MERGESORT (O(n log n)) ----------
function mergeSort(a) {
    let tmp = new Int32Array(a.length);
    mergeSortRec(a, tmp, 0, a.length - 1);
}

function mergeSortRec(a, tmp, ini, fin) {
    if (ini >= fin) return;
    let medio = Math.floor(ini + (fin - ini) / 2);
    mergeSortRec(a, tmp, ini, medio);
    mergeSortRec(a, tmp, medio + 1, fin);
    
    let i = ini, j = medio + 1, k = ini;
    while (i <= medio && j <= fin) {
        if (a[i] <= a[j]) {
            tmp[k++] = a[i++];
        } else {
            tmp[k++] = a[j++];
        }
    }
    while (i <= medio) tmp[k++] = a[i++];
    while (j <= fin) tmp[k++] = a[j++];
    for (let x = ini; x <= fin; x++) {
        a[x] = tmp[x];
    }
}

// ---------- 3. QUICKSORT ITERATIVO (Evita desbordamiento de pila) ----------
function quickSort(a) {
    let stack = [];
    stack.push(0);
    stack.push(a.length - 1);

    while (stack.length > 0) {
        let fin = stack.pop();
        let ini = stack.pop();

        if (ini >= fin) continue;

        let pivote = a[fin];
        let i = ini;
        for (let j = ini; j < fin; j++) {
            if (a[j] < pivote) {
                let t = a[i]; a[i] = a[j]; a[j] = t;
                i++;
            }
        }
        let t2 = a[i]; a[i] = a[fin]; a[fin] = t2;
        let pivIndex = i;

        // Empujar sub-arreglos a la pila
        stack.push(ini);
        stack.push(pivIndex - 1);

        stack.push(pivIndex + 1);
        stack.push(fin);
    }
}

// ---------- 4. SORT NATIVO DE JAVASCRIPT ----------
function nativeSort(a) {
    a.sort((x, y) => x - y);
}

// ---------- UTILIDADES: Generador y Verificación ----------
function alAzar(n, semilla, tope = 1_000_000) {
    let seed = semilla;
    const d = new Int32Array(n);
    for (let i = 0; i < n; i++) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        d[i] = seed % tope;
    }
    return d;
}

function verificar(a, quien) {
    for (let i = 1; i < a.length; i++) {
        if (a[i - 1] > a[i]) {
            throw new Error(`${quien} NO dejó el arreglo ordenado en la posición ${i}`);
        }
    }
}

// ---------- APLICACIÓN DEL PROTOCOLO ----------
function promedio(original, fnOrdenamiento) {
    let copiaWarmup = new Int32Array(original);
    fnOrdenamiento(copiaWarmup);
    verificar(copiaWarmup, "algoritmo del torneo");

    let suma = 0;
    for (let c = 0; c < 3; c++) {
        let copia = new Int32Array(original);
        const inicio = performance.now();
        fnOrdenamiento(copia);
        const fin = performance.now();
        verificar(copia, "algoritmo del torneo");
        suma += (fin - inicio);
    }
    return suma / 3;
}

// EJECUCIÓN PRINCIPAL DEL TORNEO
function ejecutarTorneo() {

    console.log(" PARTE C · EL TORNEO MEDIDO EN JAVASCRIPT (DATOS AL AZAR)               ");
    console.log(" PROTOCOLO: 1 calentamiento + 3 corridas medidas + promedio.          ");

    console.log();

    console.log("--- Tabla 1: Inserción vs MergeSort vs QuickSort ---");
    console.log(`${"n".padStart(10)} ${"inserción".padStart(14)} ${"MergeSort".padStart(12)} ${"QuickSort".padStart(12)}`);

    const tamanios = [10_000, 20_000, 40_000, 80_000];
    for (let n of tamanios) {
        const datos = alAzar(n, 9);
        const pi = promedio(datos, a => insercion(a));
        const pm = promedio(datos, a => mergeSort(a));
        const pq = promedio(datos, a => quickSort(a));
        
        console.log(`${n.toString().padStart(10)} ${pi.toFixed(1).padStart(11)} ms ${pm.toFixed(1).padStart(9)} ms ${pq.toFixed(1).padStart(9)} ms`);
    }

    console.log();
    console.log("--- Tabla 2: Competencia con tamaños grandes ---");
    console.log(`${"n".padStart(10)} ${"MergeSort".padStart(14)} ${"QuickSort".padStart(14)} ${"Array.prototype.sort".padStart(22)}`);

    const tamaniosGrandes = [100_000, 1_000_000];
    for (let n of tamaniosGrandes) {
        const datos = alAzar(n, 9);
        const pm = promedio(datos, a => mergeSort(a));
        const pq = promedio(datos, a => quickSort(a));
        const ps = promedio(datos, a => nativeSort(a));

        console.log(`${n.toString().padStart(10)} ${pm.toFixed(1).padStart(11)} ms ${pq.toFixed(1).padStart(11)} ms ${ps.toFixed(1).padStart(19)} ms`);
    }

    console.log();
    console.log(" INFORME CORTO DE CONCLUSIONES (practicas/c5/)");
    console.log("1. Crecimiento Cuadrático O(n²): El algoritmo de Inserción se vuelve ineficiente");
    console.log("   rápidamente; al duplicar el tamaño 'n', el tiempo se multiplica por ~4.");
    console.log("2. Escalabilidad O(n log n): MergeSort y QuickSort demuestran una eficiencia");
    console.log("   excepcional, procesando grandes volúmenes de datos en milisegundos.");
    console.log("3. Optimización del Motor V8: El método nativo de JavaScript (`Array.sort`)");
    console.log("   ofrece un rendimiento sobresaliente gracias a optimizaciones nativas de bajo nivel.");

}

ejecutarTorneo();