// Luis Fernando Ramos Canaviri
// Evaluación Integradora · Variante B · Compras de una escuela
// Ejecutar con: node comprador.js

class CompradorIngenuo {
    constructor() {
        this.elegidos = [];
    }

    elegir(utiles, presupuestoBs) {
        const n = utiles.length;
        let mejorUtilidad = 0;
        let mejorMascara = 0;
        for (let mascara = 0; mascara < (1 << n); mascara++) {
            let costo = 0;
            let utilidad = 0;
            for (let i = 0; i < n; i++) {
                if ((mascara & (1 << i)) !== 0) {
                    costo += utiles[i].costoBs;
                    utilidad += utiles[i].utilidad;
                }
            }
            if (costo <= presupuestoBs && utilidad > mejorUtilidad) {
                mejorUtilidad = utilidad;
                mejorMascara = mascara;
            }
        }

        this.elegidos = [];
        for (let i = 0; i < n; i++) {
            if ((mejorMascara & (1 << i)) !== 0) {
                this.elegidos.push(utiles[i].codigo);
            }
        }
        return { utilidad: mejorUtilidad, codigos: [...this.elegidos] };
    }

    estaEnLaCompra(codigo) {
        return this.elegidos.includes(codigo);
    }
}

class CompradorMejorado {
    constructor() {
        this.elegidosSet = new Set();
    }

    elegir(utiles, presupuestoBs) {
        const n = utiles.length;
        const dp = Array.from({ length: n + 1 }, () => new Array(presupuestoBs + 1).fill(0));

        for (let i = 1; i <= n; i++) {
            const { costoBs, utilidad } = utiles[i - 1];
            for (let w = 0; w <= presupuestoBs; w++) {
                if (costoBs <= w) {
                    // Max entre no llevarlo o llevarlo
                    dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - costoBs] + utilidad);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        this.elegidosSet.clear();
        let w = presupuestoBs;
        for (let i = n; i > 0; i--) {
            if (dp[i][w] !== dp[i - 1][w]) {
                this.elegidosSet.add(utiles[i - 1].codigo);
                w -= utiles[i - 1].costoBs;
            }
        }

        return { 
            utilidad: dp[n][presupuestoBs], 
            codigos: Array.from(this.elegidosSet) 
        };
    }

    estaEnLaCompra(codigo) {
        return this.elegidosSet.has(codigo); 
    }
}

// PRUEBAS Y MEDICIÓN
function lote(...datos) {
    return datos.map(d => ({ codigo: d[0], costoBs: d[1], utilidad: d[2] }));
}

const casos = [
    { que: "el voraz se equivoca", utiles: lote(["U1", 20, 120], ["U2", 40, 200], ["U3", 60, 240]), presupuesto: 100, esperada: 440, codigos: ["U2", "U3"] },
    { que: "cuatro útiles", utiles: lote(["U1", 4, 6], ["U2", 6, 8], ["U3", 8, 10], ["U4", 10, 12]), presupuesto: 16, esperada: 20, codigos: ["U2", "U4"] },
    { que: "presupuesto cero", utiles: lote(["U1", 5, 10], ["U2", 7, 12]), presupuesto: 0, esperada: 0, codigos: [] },
    { que: "sin útiles", utiles: [], presupuesto: 30, esperada: 0, codigos: [] },
    { que: "nada cabe", utiles: lote(["U1", 80, 90], ["U2", 100, 100]), presupuesto: 60, esperada: 0, codigos: [] },
    { que: "entran todos", utiles: lote(["U1", 10, 20], ["U2", 14, 24], ["U3", 6, 8]), presupuesto: 200, esperada: 52, codigos: ["U1", "U2", "U3"] }
];

function probar(titulo, claseComprador) {
    let bien = 0, total = 0;
    for (const c of casos) {
        const comprador = new claseComprador();
        const { utilidad, codigos } = comprador.elegir(c.utiles, c.presupuesto);
        total++;
        
        const codigosOrd = [...codigos].sort().join(",");
        const esperadosOrd = [...c.codigos].sort().join(",");
        
        if (utilidad === c.esperada && codigosOrd === esperadosOrd) {
            bien++;
        } else {
            console.log(`   MAL en «${c.que}»: esperado ${c.esperada} con [${esperadosOrd}], obtuvo ${utilidad} con [${codigosOrd}]`);
        }
    }

    const comp = new claseComprador();
    comp.elegir(casos[0].utiles, casos[0].presupuesto);
    total += 2;
    if (comp.estaEnLaCompra("U2")) bien++; else console.log("   MAL en EstaEnLaCompra(U2)");
    if (!comp.estaEnLaCompra("U1")) bien++; else console.log("   MAL en EstaEnLaCompra(U1)");
    
    console.log(`${titulo}: ${bien} de ${total} pruebas correctas`);
}

function ejecutarCarga(comprador, n) {
    const azar = new (class {
        constructor(semilla) { this.s = semilla; }
        next(min, max) { this.s = (this.s * 9301 + 49297) % 233280; return min + Math.floor((this.s / 233280) * (max - min)); }
    })(n + 1000);

    const utiles = [];
    for (let i = 0; i < n; i++) {
        utiles.push({ codigo: "K" + i, costoBs: azar.next(4, 50), utilidad: azar.next(10, 100) });
    }
    const presupuesto = Math.floor(utiles.reduce((sum, u) => sum + u.costoBs, 0) / 3);
    const { utilidad } = comprador.elegir(utiles, presupuesto);
    return utilidad;
}

function promedio(f, comp, n) {
    f(comp, n); 
    let suma = 0;
    for (let c = 0; c < 3; c++) {
        const t0 = process.hrtime.bigint();
        f(comp, n);
        const t1 = process.hrtime.bigint();
        suma += Number(t1 - t0) / 1e6;
    }
    return suma / 3;
}

function main() {
    probar("CompradorIngenuo ", CompradorIngenuo);
    probar("CompradorMejorado", CompradorMejorado);

    console.log("\n Medición (n útiles, presupuesto = 1/3 del costo total) ");
    console.log("         n    Ingenuo (ms)     x   Mejorado (ms)     x");

    const tamanos = [16, 18, 20, 22];
    let antI = 0, antM = 0;

    for (const n of tamanos) {
        const ti = promedio((c, x) => ejecutarCarga(c, x), new CompradorIngenuo(), n);
        const tm = promedio((c, x) => ejecutarCarga(c, x), new CompradorMejorado(), n);

        // Verificamos que den lo mismo
        const resI = ejecutarCarga(new CompradorIngenuo(), n);
        const resM = ejecutarCarga(new CompradorMejorado(), n);
        if (resI !== resM) console.log(`   ¡ERROR! No coinciden: Ingenuo ${resI}, Mejorado ${resM}`);

        const ri = antI > 0 ? `x${(ti / antI).toFixed(1)}` : "—";
        const rm = antM > 0 ? `x${(tm / antM).toFixed(1)}` : "—";

        console.log(`${n.toString().padStart(10)} ${ti.toFixed(2).padStart(14)} ${ri.padStart(6)} ${tm.toFixed(2).padStart(14)} ${rm.padStart(6)}`);
        antI = ti;
        antM = tm;
    }

    // Medición con 1000 útiles y presupuesto 10000
    console.log("\n Medición con 1.000 útiles y presupuesto 10.000 ");
    const comp1000 = new CompradorMejorado();
    const azar1000 = new (class { constructor(s) { this.s = s; } next(m, n) { this.s = (this.s * 9301 + 49297) % 233280; return m + Math.floor((this.s / 233280) * (n - m)); } })(42);
    const utiles1000 = [];
    for (let i = 0; i < 1000; i++) utiles1000.push({ codigo: "K" + i, costoBs: azar1000.next(4, 50), utilidad: azar1000.next(10, 100) });
    
    const t0 = process.hrtime.bigint();
    comp1000.elegir(utiles1000, 10000);
    const t1 = process.hrtime.bigint();
    console.log(`Tiempo: ${(Number(t1 - t0) / 1e6).toFixed(2)} ms`);
}

main();