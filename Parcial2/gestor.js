// Luis Fernando Ramos Canaviri
// Ejecutar con: node gestor.js
// SOLUCIÓN INGENUA 

class GestorIngenuo {
    constructor() {
        this.lista = [];
        this.llegadas = 0;
    }

    registrar(nombre, urgencia) {
        this.lista.push({ nombre, urgencia, llegada: this.llegadas++ });
    }

    atenderSiguiente() {
        if (this.lista.length === 0) return null;
        
        let mejorIdx = 0;
        for (let i = 1; i < this.lista.length; i++) {
            const p = this.lista[i];
            const m = this.lista[mejorIdx];
            // Menor urgencia gana. Si empatan, menor llegada gana.
            if (p.urgencia < m.urgencia || (p.urgencia === m.urgencia && p.llegada < m.llegada)) {
                mejorIdx = i;
            }
        }
        const nombre = this.lista[mejorIdx].nombre;
        this.lista.splice(mejorIdx, 1); // Borra en O(n)
        return nombre;
    }

    estaEsperando(nombre) {
        for (const p of this.lista) {
            if (p.nombre === nombre) return true;
        }
        return false;
    }

    get esperando() {
        return this.lista.length;
    }
}


// MI SOLUCIÓN MEJORADA (HEAP + MAP)

// Un Heap mínimo (Min-Heap) manual
class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Devuelve true si A tiene más prioridad que B
    // Prioridad: menor urgencia primero. Si empatan, menor llegada primero.
    _esMenor(a, b) {
        if (a.urgencia !== b.urgencia) {
            return a.urgencia < b.urgencia;
        }
        return a.llegada < b.llegada;
    }

    insertar(paciente) {
        this.heap.push(paciente);
        this._subir(this.heap.length - 1);
    }

    extraerMinimo() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop(); // El último pasa a la raíz
        this._bajar(0);
        return min;
    }

    _subir(i) {
        while (i > 0) {
            const padre = Math.floor((i - 1) / 2);
            if (this._esMenor(this.heap[i], this.heap[padre])) {
                [this.heap[i], this.heap[padre]] = [this.heap[padre], this.heap[i]];
                i = padre;
            } else {
                break;
            }
        }
    }

    _bajar(i) {
        const n = this.heap.length;
        while (true) {
            let menor = i;
            const izq = 2 * i + 1;
            const der = 2 * i + 2;

            if (izq < n && this._esMenor(this.heap[izq], this.heap[menor])) menor = izq;
            if (der < n && this._esMenor(this.heap[der], this.heap[menor])) menor = der;

            if (menor !== i) {
                [this.heap[i], this.heap[menor]] = [this.heap[menor], this.heap[i]];
                i = menor;
            } else {
                break;
            }
        }
    }

    get tamaño() {
        return this.heap.length;
    }
}

class GestorMejorado {
    constructor() {
        this.heap = new MinHeap();
        this.enEspera = new Map(); // nombre -> { urgencia, llegada }
        this.llegadas = 0;
    }

    registrar(nombre, urgencia) {
        const paciente = { nombre, urgencia, llegada: this.llegadas++ };
        this.heap.insertar(paciente);
        this.enEspera.set(nombre, true);
    }

    atenderSiguiente() {
        while (this.heap.tamaño > 0) {
            const p = this.heap.extraerMinimo();
            // Si el paciente sigue en el Map, lo atendemos. 
            if (this.enEspera.has(p.nombre)) {
                this.enEspera.delete(p.nombre);
                return p.nombre;
            }
        }
        return null;
    }

    estaEsperando(nombre) {
        return this.enEspera.has(nombre);
    }

    get esperando() {
        return this.enEspera.size;
    }
}

// PRUEBAS Y MEDICIÓN (Main)
const guion = [
    ["registrar", "Ana", 3, ""], ["registrar", "Beto", 1, ""], ["registrar", "Carla", 3, ""], ["registrar", "Diego", 2, ""],
    ["esperando", "", 0, "4"],
    ["esta", "Beto", 0, "True"], ["esta", "Zoe", 0, "False"],
    ["atender", "", 0, "Beto"], ["esta", "Beto", 0, "False"],
    ["atender", "", 0, "Diego"],
    ["registrar", "Elena", 1, ""],
    ["atender", "", 0, "Elena"], ["atender", "", 0, "Ana"], ["atender", "", 0, "Carla"],
    ["atender", "", 0, "(nadie)"], ["esperando", "", 0, "0"],
];

function ejecutar(g, op, arg, urg) {
    switch (op) {
        case "registrar": g.registrar(arg, urg); return "";
        case "atender": return g.atenderSiguiente() || "(nadie)";
        case "esta": return String(g.estaEsperando(arg));
        default: return String(g.esperando);
    }
}

function probar(titulo, g) {
    let bien = 0, total = 0;
    for (const [op, arg, urg, esperado] of guion) {
        const obtenido = ejecutar(g, op, arg, urg);
        if (op === "registrar") continue;
        total++;
        if (obtenido === esperado) bien++;
        else console.log(`   MAL en «${op} ${arg}»: esperado ${esperado}, obtuvo ${obtenido}`);
    }
    console.log(`${titulo}: ${bien} de ${total} pasos correctos`);
}

function ejecutarCarga(g, n) {
    for (let i = 0; i < n; i++) g.registrar("P" + i, ((i * 7919) % 5) + 1);
    let control = 0;
    for (let i = 0; i < n; i++) {
        const atendido = g.atenderSiguiente();
        if (atendido) control += atendido.length;
    }
    return control;
}

function promedio(f, n) {
    f(n); // calentamiento
    let suma = 0;
    for (let c = 0; c < 3; c++) {
        const t0 = process.hrtime.bigint();
        f(n);
        const t1 = process.hrtime.bigint();
        suma += Number(t1 - t0) / 1e6; // ms
    }
    return suma / 3.0;
}

function main() {
    probar("GestorIngenuo ", new GestorIngenuo());
    probar("GestorMejorado", new GestorMejorado());

    console.log("\n    Medición (n pacientes llegan y se atienden)    ");
    console.log("         n    Ingenuo ms      x    Mejorado ms      x");

    let antL = 0, antC = 0;
    const tamanos = [10_000, 20_000, 40_000]; // Ajusta estos valores según tu máquina

    for (const n of tamanos) {
        const tl = promedio((x) => ejecutarCarga(new GestorIngenuo(), x), n);
        const tc = promedio((x) => ejecutarCarga(new GestorMejorado(), x), n);

        const rl = antL > 0 ? `x${(tl / antL).toFixed(1)}` : "—";
        const rc = antC > 0 ? `x${(tc / antC).toFixed(1)}` : "—";

        console.log(`${n.toString().padStart(10)} ${tl.toFixed(1).padStart(13)} ${rl.padStart(6)} ${tc.toFixed(1).padStart(14)} ${rc.padStart(6)}`);
        antL = tl;
        antC = tc;
    }
}

main();