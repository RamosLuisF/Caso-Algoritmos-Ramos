// Luis Fernando Ramos Canaviri
// Parcial 1 · Variante B · P1.2 — Cura y medición
// Correr con:  node medicion.js

// VERSIÓN LENTA 
function hayComprobantesRepetidosPorPares(comprobantes) {
  for (let a = 0; a < comprobantes.length; a++) {
    for (let b = a + 1; b < comprobantes.length; b++) {
      if (comprobantes[a] === comprobantes[b]) return true;
    }
  }
  return false;
}

// Mi cura

function hayComprobantesRepetidosCurado(comprobantes) {
  const vistos = new Set();
  for (const c of comprobantes) {
    if (vistos.has(c)) return true;
    vistos.add(c);
  }
  return false;
}

//  Peor caso: lista SIN repetidos 
function generarSinRepetidos(n, semilla = 77) {
  const datos = new Array(n);
  for (let i = 0; i < n; i++) datos[i] = 1000 + i;

  // PRNG con semilla 
  let s = semilla >>> 0;
  function rand() {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  }

  // Fisher-Yates
  for (let i = n - 1; i > 0; i--) {
    const k = Math.floor(rand() * (i + 1));
    [datos[i], datos[k]] = [datos[k], datos[i]];
  }
  return datos;
}

// Protocolo: 1 calentamiento + 3 medidas + promedio
function promedio(f, datos) {
  f(datos); // calentamiento
  let suma = 0;
  for (let c = 0; c < 3; c++) {
    const t0 = process.hrtime.bigint();
    f(datos);
    const t1 = process.hrtime.bigint();
    suma += Number(t1 - t0) / 1e6; // ns → ms
  }
  return suma / 3;
}


function main() {
  // 1) Verificar los 5 casos
  console.log('=== Verificación de la cura (5 casos) ===');
  const casos = [
    { datos: [1010, 1003, 1009, 1003, 1005], esperado: true,  que: 'repetido en el medio' },
    { datos: [1010, 1003, 1009, 1004, 1005], esperado: false, que: 'sin repetidos' },
    { datos: [],                            esperado: false, que: 'lista vacía' },
    { datos: [1008],                        esperado: false, que: 'un solo elemento' },
    { datos: [1004, 1001, 1002, 1006, 1004], esperado: true,  que: 'repetido en los extremos' },
  ];

  let todosOk = true;
  for (const { datos, esperado, que } of casos) {
    const obtenido = hayComprobantesRepetidosCurado(datos);
    const ok = obtenido === esperado;
    todosOk = todosOk && ok;
    console.log(`  ${que.padEnd(28)} esperado ${String(esperado).padEnd(5)} · cura ${String(obtenido).padEnd(5)} · ${ok ? 'OK' : 'FALLA'}`);
  }
  console.log(todosOk ? 'Todos los casos pasan.\n' : '¡HAY UN CASO MAL!\n');

  // 2) Tabla de tiempos
  console.log('Medición (peor caso: lista SIN repetidos) ');
  console.log('         n   lenta O(n^2) ms     x    curada O(n) ms      x');

  let antL = 0, antC = 0;
  const tamanos = [5_000, 10_000, 20_000, 40_000];

  for (const n of tamanos) {
    const datos = generarSinRepetidos(n);

    const tl = promedio(hayComprobantesRepetidosPorPares, datos);
    const tc = promedio(hayComprobantesRepetidosCurado, datos);

    const rl = antL > 0 ? `x${(tl / antL).toFixed(1)}` : '—';
    const rc = antC > 0 ? `x${(tc / antC).toFixed(1)}` : '—';

    console.log(
      `${String(n).padStart(10)} ${tl.toFixed(1).padStart(16)} ${rl.padStart(6)} ${tc.toFixed(3).padStart(17)} ${rc.padStart(6)}`
    );

    antL = tl;
    antC = tc;
  }

}

main();