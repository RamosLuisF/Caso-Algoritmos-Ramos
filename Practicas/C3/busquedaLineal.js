function busquedaLineal(lista, objetivo) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] === objetivo) {
            return i;
        }
    }
    return -1;
}

function ejecutarProtocolo() {

    const nBase = 2_000_000;
    const valoresN = [nBase, 4 * nBase, 16 * nBase];

    console.log(" PROTOCOLO DE MEDICIÓN: BÚSQUEDA LINEAL O(n) ");
    console.log("n                  Promedio (ms)      Ratio");


    let tiempoBase = 0;

    for (let i = 0; i < valoresN.length; i++) {
        const n = valoresN[i];
        

        const datos = new Array(n);
        for (let j = 0; j < n; j++) {
            datos[j] = j;
        }
        

        const objetivo = n - 1;


        for (let w = 0; w < 100; w++) {
            busquedaLineal(datos, objetivo);
        }


        const corridas = 5;
        let sumaTiempos = 0;

        for (let c = 0; c < corridas; c++) {

            const inicio = performance.now();
            busquedaLineal(datos, objetivo);
            const fin = performance.now();
            
            sumaTiempos += (fin - inicio);
        }

        const promedio = sumaTiempos / corridas;


        if (i === 0) {
            tiempoBase = promedio;
        }
        const ratio = (tiempoBase === 0) ? 0 : (promedio / tiempoBase);

        console.log(`${n.toString().padEnd(18)} ${promedio.toFixed(4).padEnd(18)} ${ratio.toFixed(2)}x`);
    }


    console.log("Análisis: Al cuadruplicar n (4n), el tiempo se multiplica ~x4.");
    console.log("Al multiplicar n por 16 (16n), el tiempo se multiplica ~x16.");
}

ejecutarProtocolo();