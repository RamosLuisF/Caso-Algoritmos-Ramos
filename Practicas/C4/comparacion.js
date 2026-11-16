function busquedaLineal(lista, objetivo) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] === objetivo) {
            return i;
        }
    }
    return -1;
}

function busquedaBinaria(lista, objetivo) {
    let inf = 0;
    let sup = lista.length - 1;
    while (inf <= sup) {
        let medio = Math.floor((inf + sup) / 2);
        if (lista[medio] === objetivo) {
            return medio;
        } else if (lista[medio] < objetivo) {
            inf = medio + 1;
        } else {
            sup = medio - 1;
        }
    }
    return -1;
}

function ejecutarComparacion() {
    const n = 1_000_000;
    const numClaves = 1_000;

    console.log("1. Generando arreglo ordenado de 1,000,000 enteros...");
    const datos = new Int32Array(n);
    for (let i = 0; i < n; i++) {
        datos[i] = i * 2; // Números pares ordenados
    }

    console.log(`2. Generando ${numClaves} claves de prueba que sí existen...`);
    const clavesPrueba = new Int32Array(numClaves);
    for (let i = 0; i < numClaves; i++) {
        const indiceAleatorio = Math.floor(Math.random() * n);
        clavesPrueba[i] = datos[indiceAleatorio];
    }

    const corridas = 3;

    // MEDICIÓN: BÚSQUEDA LINEAL O(n)
    // Fase de calentamiento (warm-up)
    for (let w = 0; w < 50; w++) {
        busquedaLineal(datos, clavesPrueba[0]);
    }

    let sumaTiemposLineal = 0;
    for (let c = 0; c < corridas; c++) {
        const inicio = performance.now();
        for (let k = 0; k < numClaves; k++) {
            busquedaLineal(datos, clavesPrueba[k]);
        }
        const fin = performance.now();
        sumaTiemposLineal += (fin - inicio);
    }
    const promedioLineal = sumaTiemposLineal / corridas;


    // MEDICIÓN: BÚSQUEDA BINARIA O(log n)

    // Fase de calentamiento (warm-up)
    for (let w = 0; w < 50; w++) {
        busquedaBinaria(datos, clavesPrueba[0]);
    }

    let sumaTiemposBinaria = 0;
    for (let c = 0; c < corridas; c++) {
        const inicio = performance.now();
        for (let k = 0; k < numClaves; k++) {
            busquedaBinaria(datos, clavesPrueba[k]);
        }
        const fin = performance.now();
        sumaTiemposBinaria += (fin - inicio);
    }
    const promedioBinaria = sumaTiemposBinaria / corridas;

    // Cálculo del cociente (cuántas veces más lenta es la lineal frente a la binaria)
    const cociente = promedioBinaria > 0 ? (promedioLineal / promedioBinaria) : 0;

    // RESULTADOS EN TABLA
    console.log("       TABLA DE RESULTADOS: LINEAL VS BINARIA           ");
    console.log("Algoritmo            Tiempo Promedio (1000 búsquedas)");
    console.log(`Búsqueda Lineal      ${promedioLineal.toFixed(4)} ms`);
    console.log(`Búsqueda Binaria     ${promedioBinaria.toFixed(4)} ms`);
    console.log(`Cociente (Lineal / Binaria): ${cociente.toFixed(2)}x`);

}

ejecutarComparacion();