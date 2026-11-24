// H3 · Comparación: Fuerza Bruta vs Programación Dinámica
// Ejecutar con: node comparacion.js

function generarMunicipios(n) {
    const municipios = [];
    for (let i = 0; i < n; i++) {
        const tiempo = Math.floor(Math.random() * 10) + 5; // Entre 5 y 14 horas
        const valor = Math.floor(Math.random() * 50) + 10; // Entre 10 y 59 participantes
        municipios.push({ tiempo, valor });
    }
    return municipios;
}

// VERSIÓN FUERZA BRUTA (2^n combinaciones)
function fuerzaBruta(municipios, capacidad) {
    let mejorValor = 0;
    const n = municipios.length;
    // Probar todas las combinaciones de 0 a 2^n - 1
    for (let mask = 0; mask < (1 << n); mask++) {
        let pesoTotal = 0;
        let valorTotal = 0;
        for (let i = 0; i < n; i++) {
            if ((mask & (1 << i)) !== 0) {
                pesoTotal += municipios[i].tiempo;
                valorTotal += municipios[i].valor;
            }
        }
        if (pesoTotal <= capacidad && valorTotal > mejorValor) {
            mejorValor = valorTotal;
        }
    }
    return mejorValor;
}
// VERSIÓN PROGRAMACIÓN DINÁMICA (Mochila 0/1)
function dinamica(municipios, capacidad) {
    const n = municipios.length;
    // Tabla de (n+1) x (capacidad+1), llena de ceros
    const dp = Array.from({ length: n + 1 }, () => new Array(capacidad + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const { tiempo, valor } = municipios[i - 1];
        for (let c = 0; c <= capacidad; c++) {
            if (tiempo <= c) {
                // Opción 1: no llevarlo (dp[i-1][c])
                // Opción 2: llevarlo y sumar valor (dp[i-1][c-tiempo] + valor)
                dp[i][c] = Math.max(dp[i - 1][c], dp[i - 1][c - tiempo] + valor);
            } else {
                dp[i][c] = dp[i - 1][c];
            }
        }
    }
    return dp[n][capacidad];
}
// MEDICIÓN
function promedio(f, municipios, capacidad) {
    f(municipios, capacidad); // Calentamiento
    let suma = 0;
    for (let c = 0; c < 3; c++) {
        const t0 = process.hrtime.bigint();
        f(municipios, capacidad);
        const t1 = process.hrtime.bigint();
        suma += Number(t1 - t0) / 1e6; // ms
    }
    return suma / 3;
}

function main() {
    console.log(" H3 · Mochila 0/1: Fuerza Bruta vs Dinámica ");
    console.log("         n    Bruta (ms)      x    Dinámica (ms)      x");

    // Usamos n = 5, 10, 15, 20 (se duplican, y el 2^n de la bruta se dispara)
    const tamanos = [5, 10, 15, 20];
    const capacidad = 50; // Capacidad fija de horas

    let antB = 0, antD = 0;

    for (const n of tamanos) {
        const municipios = generarMunicipios(n);

        const tb = promedio(fuerzaBruta, municipios, capacidad);
        const td = promedio(dinamica, municipios, capacidad);

        // Verificación: ambos deben dar el mismo resultado
        const resB = fuerzaBruta(municipios, capacidad);
        const resD = dinamica(municipios, capacidad);
        if (resB !== resD) {
            console.log(`   ¡ERROR! No coinciden: Bruta ${resB}, Dinámica ${resD}`);
        }

        const rb = antB > 0 ? `x${(tb / antB).toFixed(1)}` : "—";
        const rd = antD > 0 ? `x${(td / antD).toFixed(1)}` : "—";

        console.log(`${n.toString().padStart(10)} ${tb.toFixed(2).padStart(14)} ${rb.padStart(6)} ${td.toFixed(2).padStart(14)} ${rd.padStart(6)}`);

        antB = tb;
        antD = td;
    }
}

main();