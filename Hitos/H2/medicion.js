// H2 · Medición: Lista vs Tabla Hash (Map) en la validación de RUDEs
// Ejecutar con: node medicion.js

function generarRUDEs(n) {
    const datos = [];
    for (let i = 0; i < n; i++) {
        // Simulamos RUDEs de 18 dígitos como en el H1
        datos.push("99000000000000" + i.toString().padStart(4, '0'));
    }
    return datos;
}

//  VERSIÓN INGENUA (Lista) 
function buscarIngenuo(lista, rude) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] === rude) return true;
    }
    return false;
}

// ===== VERSIÓN MEJORADA (Map / Hash) =====
function crearMapa(lista) {
    const mapa = new Map();
    for (const r of lista) mapa.set(r, true);
    return mapa;
}

function buscarMejorado(mapa, rude) {
    return mapa.has(rude);
}

function promedio(f, datos, repeticiones = 3) {
    f(datos); // calentamiento
    let suma = 0;
    for (let c = 0; c < repeticiones; c++) {
        const t0 = process.hrtime.bigint();
        f(datos);
        const t1 = process.hrtime.bigint();
        suma += Number(t1 - t0) / 1e6;
    }
    return suma / repeticiones;
}

function main() {
    console.log(" H2 · Búsqueda de RUDEs: Lista vs Map ");
    console.log("         n     Lista (ms)     x       Map (ms)     x");

    // Hacemos 1000 búsquedas por tamaño para simular el trabajo de una jornada
    const buscarEnLista = (lista) => {
        for (let i = 0; i < 1000; i++) buscarIngenuo(lista, "990000000000009999"); // Buscamos uno que no está (peor caso)
    };

    const buscarEnMapa = (lista) => {
        const mapa = crearMapa(lista); // Creamos el mapa (cuesta O(n) una vez)
        for (let i = 0; i < 1000; i++) buscarMejorado(mapa, "990000000000009999");
    };

    let antL = 0, antM = 0;
    const tamanos = [10000, 20000, 40000, 80000];

    for (const n of tamanos) {
        const datos = generarRUDEs(n);
        
        const tL = promedio(buscarEnLista, datos);
        const tM = promedio(buscarEnMapa, datos);

        const rL = antL > 0 ? `x${(tL / antL).toFixed(1)}` : "—";
        const rM = antM > 0 ? `x${(tM / antM).toFixed(1)}` : "—";

        console.log(`${n.toString().padStart(10)} ${tL.toFixed(1).padStart(13)} ${rL.padStart(6)} ${tM.toFixed(1).padStart(13)} ${rM.padStart(6)}`);
        
        antL = tL;
        antM = tM;
    }
}

main();