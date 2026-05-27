import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// --- 1. DATOS ---
const datosPlanetas = {
    "SOL": "El Sol es una estrella enana amarilla (tipo espectral G2V) y representa la fuente principal de luz y energía del sistema solar. Su gravedad mantiene unidos a los planetas y su actividad magnética impulsa el viento solar, que afecta a la magnetosfera de los mundos cercanos.",

    "MERCURIO": "Mercurio es el planeta más pequeño y el más cercano al Sol. Tiene una superficie muy craterizada y apenas una atmósfera (muy tenue), por lo que las temperaturas entre el día y la noche son extremas: calor abrasador de día y frío intenso durante la noche.",

    "VENUS": "Venus se caracteriza por un efecto invernadero muy marcado: su atmósfera, extremadamente densa, atrapa el calor y convierte al planeta en el más caliente del sistema solar. Su superficie es volcánica y está cubierta por nubes de ácido sulfúrico.",

    "TIERRA": "La Tierra es el único lugar conocido con vida. Tiene una atmósfera rica en nitrógeno y oxígeno, océanos de agua líquida y un campo magnético que ayuda a proteger la superficie frente al viento solar. Su clima dinámico y ciclos biogeoquímicos la hacen especialmente estable.",

    "MARTE": "Marte, apodado el “planeta rojo” por el óxido de hierro de su suelo, alberga volcanes enormes y el mayor cañón del sistema solar (Valles Marineris). Su atmósfera es delgada, pero hay indicios de agua pasada y hielo en los polos, lo que lo vuelve un foco de exploración.",

    "JÚPITER": "Júpiter es un gigante gaseoso dominado por hidrógeno y helio. Posee una atmósfera con bandas y tormentas gigantes, incluyendo la Gran Mancha Roja. Su fuerte campo gravitatorio influye en las órbitas de muchos cuerpos y tiene un sistema de satélites muy variado.",

    "SATURNO": "Saturno es otro gigante gaseoso, famoso por sus anillos, compuestos principalmente por hielo y material rocoso. Los anillos forman múltiples estructuras y separaciones (divisiones), y sus lunas —como Titán— son fundamentales para entender la evolución del sistema.",

    "URANO": "Urano es un gigante helado con una inclinación axial extrema, por lo que “rueda” prácticamente de lado al orbitar el Sol. Su atmósfera muestra bandas y nubes, y su color verdoso se atribuye a la presencia de metano. Es un planeta frío y dinámico.",

    "NEPTUNO": "Neptuno es el planeta más lejano. Se conoce por sus vientos supersónicos y por su color azul profundo debido a moléculas en su atmósfera. Aunque es oscuro y frío, su meteorología es intensa: tormentas y remolinos se observan con telescopios.",

    "CINTURÓN DE ASTEROIDES": "El cinturón de asteroides es una región entre Marte y Júpiter llena de cuerpos rocosos de diferentes tamaños y composiciones. Sus colisiones y resonancias gravitacionales ayudan a explicar por qué algunos asteroides cambian sus órbitas con el tiempo.",

    "CINTURÓN DE KUIPER": "El Cinturón de Kuiper es una vasta zona más allá de Neptuno con objetos helados. Muchos cometas provienen de esta región. Su masa y distribución ayudan a entender el origen del sistema solar y la formación de planetas en las zonas exteriores.",

    "PLUTÓN": "Plutón es un planeta enano del borde interior del Cinturón de Kuiper. Tiene una atmósfera tenue, una superficie rica en hielos (como nitrógeno y monóxido de carbono) y una órbita excéntrica. Su región incluye también pequeñas lunas y estructuras complejas.",

    "ERIS": "Eris es un planeta enano muy lejano, uno de los objetos más conocidos del disco disperso más exterior. Su distancia extrema hace que su estudio sea principalmente espectroscópico, y su presencia ayuda a comprender la población de objetos helados transneptunianos.",

    "HAUMEA": "Haumea es un planeta enano famoso por su forma elipsoidal (casi “aplastada”) y por su rápida rotación. Se cree que su estructura es consecuencia de colisiones en el pasado. También tiene lunas y una familia de cuerpos relacionados.",

    "MAKEMAKE": "Makemake es un planeta enano del Cinturón de Kuiper. Es especialmente conocido por su brillo y por su superficie helada, donde predominan compuestos como el metano. Su órbita contribuye al mapa dinámico de objetos transneptunianos.",

    // Constelaciones (zodiaco)
    "ARIES": "ARIES (El Carnero) es una constelación zodiacal asociada en la tradición al carnero. En el cielo destacan estrellas brillantes que forman un patrón reconocible (la figura del carnero).",
    "TAURO": "TAURO (El Toro) es una constelación zodiacal asociada al toro. Contiene regiones y estrellas llamativas, incluida la familia de estrellas de las Pléyades y el “ojo” de Aldebarán.",
    "GÉMINIS": "GÉMINIS (Los Gemelos) es una constelación zodiacal marcada por un patrón doble (Castor y Pólux). Es una de las constelaciones más reconocibles por su forma de “gemelos” en el cielo.",
    "CÁNCER": "CÁNCER (El Cangrejo) es una constelación zodiacal con un conjunto de estrellas que define su figura. Es una constelación menos brillante pero muy significativa por su posición zodiacal.",
    "LEO": "LEO (El León) es una constelación zodiacal con una forma distintiva asociada a la figura del león. Sus estrellas principales permiten reconocer la “hoz” y la zona de la melena.",
    "VIRGO": "VIRGO (La Virgen) es una constelación zodiacal conectada por patrones que culminan en estrellas destacadas. Es una constelación extensa y rica en objetos de cielo profundo.",
    "LIBRA": "LIBRA (La Balanza) representa la balanza en la tradición astrológica. Sus estrellas principales trazan un patrón en forma de rombo/triángulos característicos.",
    "ESCORPIO": "ESCORPIO (El Escorpión) es una constelación zodiacal famosa por su forma curvada y por un “aguijón” definido por estrellas destacadas. Es muy reconocible en cartas del cielo.",
    "SAGITARIO": "SAGITARIO (El Arquero) es una constelación zodiacal asociada al arco/centauro. Su patrón incluye una “tetera” muy conocida por la forma de sus estrellas principales.",
    "CAPRICORNIO": "CAPRICORNIO (El Cabrito) es una constelación zodiacal con un patrón que combina un triángulo y una cola. Es una constelación clásica del zodiaco.",
    "ACUARIO": "ACUARIO (El Aguador) es una constelación zodiacal relacionada con el aguador. Se reconoce por una figura en cadena que conecta estrellas brillantes.",
    "PISCIS": "PISCIS (Los Peces) es una constelación zodiacal que representa a dos peces unidos por un cordón. Sus estrellas principales permiten trazar una forma en “V” abierta.",
};


let velocidadTiempo = 1;
const planetas = [];
const cometas  = [];
let tierraMesh, lunaGroup, cinturonAsteroides, cinturonKuiper;
const lineasOrbitas = [];
const lunasPorPlaneta = new Map();



// --- 2. ESCENA ---
const canvas = document.getElementById('universo-canvas');
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 5000000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enableRotate = true;
controls.enablePan = false;
controls.enableZoom = true;
// Touch: 1 dedo rota, 2 dedos hace zoom/gestos
controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
};
camera.position.set(60000, 40000, 80000);
controls.target.set(0, 0, 0);


const textureLoader = new THREE.TextureLoader();

// --- 3. FONDO Y LUZ ---
scene.add(new THREE.Mesh(
    new THREE.SphereGeometry(2000000, 64, 64),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('Fondo.jpg'), side: THREE.BackSide })
));
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
scene.add(new THREE.PointLight(0xffffff, 15, 1000000, 0.5));

// --- 4. HELPERS ---
function crearEtiqueta(texto) {
    const can = document.createElement('canvas');
    const ctx = can.getContext('2d');
    can.width = 512; can.height = 128;
    ctx.font = 'Bold 60px Arial';
    ctx.fillStyle = '#00aaff';
    ctx.textAlign = 'center';
    ctx.fillText(texto, 256, 80);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(can), transparent: true }));
    sprite.scale.set(4000, 1000, 1);
    return sprite;
}

function crearLuna({ nombre, radio, distancia, vel, color, ejeY }) {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radio, 32, 32),
        new THREE.MeshStandardMaterial({ 
            color: color || 0xffffff,
            roughness: 0.8,
            metalness: 0.1
        })
    );
    
    mesh.userData = { 
        nombre, 
        distancia, 
        vel, 
        angulo: Math.random() * Math.PI * 2,
        radioReal: radio 
    };
    
    return mesh;
}

function crearCinturon(nombre, cantidad, dMin, dMax, yVar, color, tamaño) {
    const geo  = new THREE.IcosahedronGeometry(tamaño, 0);
    // Más “color/vida” para que se distingan los asteroides bajo la luz del fondo.
    const mat  = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 2.0,
        roughness: 0.35,
        metalness: 0.2
    });
    const mesh = new THREE.InstancedMesh(geo, mat, cantidad);
    // Centro del cinturón para la cámara
    const centroR = (dMin + dMax) / 2;
    mesh.userData = { nombre, distancia: `${dMin} km`, velocidad: "Lenta", radioReal: centroR, esCinturon: true, centroR };
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < cantidad; i++) {
        const ang  = Math.random() * Math.PI * 2;
        const dist = dMin + Math.random() * (dMax - dMin);
        const s    = 1.5 + Math.random() * 2.0;
        matrix.compose(
            new THREE.Vector3(Math.cos(ang) * dist, (Math.random() - 0.5) * yVar, Math.sin(ang) * dist),
            new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.random(), Math.random(), Math.random())),
            new THREE.Vector3(s, s, s)
        );
        mesh.setMatrixAt(i, matrix);
    }
    scene.add(mesh);
    return mesh;
}

function crearPlaneta(nombre, radio, distancia, vel, tieneAnillos = false, tex = null) {
    const rReal = radio * 6;
    const mesh  = new THREE.Mesh(
        new THREE.SphereGeometry(rReal, 32, 32),
        new THREE.MeshStandardMaterial({ map: textureLoader.load(`${tex}.jpg`) })
    );
    mesh.userData = { nombre, distancia, velocidad: vel, radioReal: rReal, orbitDist: distancia };

    const etiqueta = crearEtiqueta(nombre);
    etiqueta.position.y = rReal * 2.5;
    mesh.add(etiqueta);
    if (tieneAnillos) {
        const ring = new THREE.Mesh(
            // Más grande y con más detalle para que se vea claro
            new THREE.RingGeometry(rReal * 2.0, rReal * 3.4, 96),
            new THREE.MeshStandardMaterial({
                map: textureLoader.load('anillos de saturno.png'),
                side: THREE.DoubleSide,
                transparent: true,
                emissive: 0x000000,
                emissiveIntensity: 0,
                roughness: 1.0,
                metalness: 0.0
            })
        );
        // Anillo en el plano XZ y un pequeño “tilt” para destacar
        ring.rotation.x = Math.PI / 2;
        ring.rotation.y = 0.25;
        ring.position.y = 0;
        mesh.add(ring);

    }
    planetas.push({ mesh, distancia, vel, angulo: Math.random() * Math.PI * 2 });
    scene.add(mesh);
    return mesh;
}

function crearCometa(id) {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(300, 8, 8),
        // Más brillantes para que se noten moviéndose
        new THREE.MeshBasicMaterial({ color: 0x88ccff })
    );
    mesh.userData = {
        nombre: `COMETA ${id}`,
        radioReal: 300,
        tOffset: Math.random() * 50,
        rx: 80000 + id * 15000,
        ry: 25000,
        rz: 70000
    };
    scene.add(mesh);
    cometas.push({ mesh });
}

// --- 5. CONSTELACIONES (estrellas conectadas)
// Las constelaciones se renderizan con un mapeo no-vago: se usa un conjunto de estrellas principales
// descritas con coordenadas celestes (RA/Dec J2000) y se conectan con pares que forman figuras.

// Helper: convierte RA/Dec (grados) a XYZ sobre una "esfera celeste" de radio R
function raDecA3D(raDeg, decDeg, R = 1700000) {
    const ra = (raDeg * Math.PI) / 180;
    const dec = (decDeg * Math.PI) / 180;
    return {
        x: R * Math.cos(dec) * Math.cos(ra),
        y: R * Math.sin(dec),
        z: R * Math.cos(dec) * Math.sin(ra)
    };
}

const constelacionesData = {
    // ARIES — Hamal/Sheratan/Mesarthim + cuernos
    "ARIES": {
        estrellas: [
            raDecA3D(41.2803, 23.4620),  // Hamal
            raDecA3D(31.9510, 20.8150),  // Sheratan
            raDecA3D(53.1400, 35.6200),  // Mesarthim
            raDecA3D(37.1700, 23.0000),  // Al Butain
            raDecA3D(61.3900, 9.9800),   // Botein
            raDecA3D(44.1130, 10.9930),  // ι Ari (extra)
            raDecA3D(33.9330, 14.8410),  // ι Ari / extra
        ],
        conexiones: [[1,0],[0,3],[0,2],[2,4],[3,6],[6,5]]
    },

    // TAURO — Aldebaran + Pléyades + cuernos
    "TAURO": {
        estrellas: [
            raDecA3D(68.9800, 16.5090),  // Aldebaran
            raDecA3D(58.5300, 22.9000),  // 78 Tau (cúmulo/torro)
            raDecA3D(56.5120, 24.1050),  // Alcyone
            raDecA3D(66.7700, 16.0000),  // Hyadum
            raDecA3D(81.2820, 28.6070),  // Elnath
            raDecA3D(49.7490, 23.5700),  // Maia-ish (extra)
            raDecA3D(68.00, 18.00),      // Hoja extra visual
        ],
        conexiones: [[0,3],[3,2],[2,1],[1,6],[0,4],[4,5]]
    },

    // GÉMINIS — Castor/Pollux + cadena
    "GÉMINIS": {
        estrellas: [
            raDecA3D(113.6500, 31.8880), // Castor
            raDecA3D(116.3289, 28.0262), // Pollux
            raDecA3D(110.5700, 16.0000), // Alhena
            raDecA3D(111.9000, 24.0000), // Mebsuta-ish
            raDecA3D(107.4000, 21.0000), // Propus-ish
            raDecA3D(109.0000, 17.0000), // η Gem extra
        ],
        conexiones: [[0,2],[2,4],[4,3],[3,1],[0,5],[5,1]]
    },

    // CÁNCER — Acubens + Asellus + Y
    "CÁNCER": {
        estrellas: [
            raDecA3D(130.1680, 11.9680), // Acubens
            raDecA3D(131.7000, 16.4000), // Asellus Borealis
            raDecA3D(128.2000, 20.2000), // Asellus Australis
            raDecA3D(126.7000, 18.5000), // Tarf
            raDecA3D(123.0000, 14.0000), // ι Cnc extra
        ],
        conexiones: [[0,3],[3,1],[1,2],[0,2],[2,4]]
    },

    // LEO — Regulus + Algieba + Denébola + Zosma
    "LEO": {
        estrellas: [
            raDecA3D(152.0929, 11.9672), // Regulus
            raDecA3D(177.2640, 14.5720), // Denebola
            raDecA3D(152.7000, 19.4000), // Algieba
            raDecA3D(170.0000, 19.0000), // Zosma
            raDecA3D(157.2850, 59.0500), // Chertan (cola)
            raDecA3D(148.0000, 12.0000), // η Leo extra
        ],
        conexiones: [[0,5],[5,2],[2,3],[3,1],[2,4]]
    },

    // VIRGO — Spica + Porrima + Vindemiatrix
    "VIRGO": {
        estrellas: [
            raDecA3D(201.2983, -11.1613), // Spica
            raDecA3D(197.7910, -1.0190),  // Porrima
            raDecA3D(193.5070, 11.9670),  // Vindemiatrix
            raDecA3D(204.2300, -10.0000), // Auva
            raDecA3D(179.0000, 10.0000),  // Zaniah-ish
            raDecA3D(199.0000, 15.0000),  // ε Vir extra
        ],
        conexiones: [[0,1],[1,2],[2,5],[1,3],[2,4]]
    },

    // LIBRA — Zubenelgenubi + Zubeneschamali + Brachium
    "LIBRA": {
        estrellas: [
            raDecA3D(168.6530, -9.4430),  // Zubenelgenubi
            raDecA3D(174.1300, -9.9790),  // Zubeneschamali
            raDecA3D(164.9000, -14.0000), // Brachium
            raDecA3D(164.3000, -26.0000), // Sigma Librae
            raDecA3D(168.9000, -15.0000), // Kappa Librae
        ],
        conexiones: [[0,1],[0,2],[1,4],[4,3]]
    },

    // ESCORPIO — Antares + Sargas + Shaula + cola
    "ESCORPIO": {
        estrellas: [
            raDecA3D(247.3519, -26.4320), // Antares
            raDecA3D(242.4670, -20.5720), // Sargas
            raDecA3D(258.0000, -17.0000), // Lesath
            raDecA3D(263.4020, -37.1030), // Shaula
            raDecA3D(246.0000, -35.0000), // Kappa Sco
            raDecA3D(251.0000, -23.0000), // μ/ζ Sco extra
        ],
        conexiones: [[1,0],[0,2],[2,5],[5,4],[2,3]]
    },

    // SAGITARIO — Kaus Australis + Nunki + cadena
    "SAGITARIO": {
        estrellas: [
            raDecA3D(288.9000, -34.3830), // Kaus Australis
            raDecA3D(283.8000, -26.2950), // Nunki
            raDecA3D(283.0000, -37.2000), // Ascella
            raDecA3D(286.0000, -25.0000), // Kaus Media
            raDecA3D(267.0000, -40.0000), // Rukbat-ish extra
        ],
        conexiones: [[0,1],[1,3],[3,2],[0,3],[1,4]]
    },

    // CAPRICORNIO — Deneb Algedi + Algedi + cola
    "CAPRICORNIO": {
        estrellas: [
            raDecA3D(306.6500, -16.1300), // Deneb Algedi
            raDecA3D(307.5000, -26.0000), // Algedi
            raDecA3D(315.0000, -20.0000), // Baham-ish
            raDecA3D(295.0000, -22.0000), // Markab-ish
            raDecA3D(351.0000, -5.0000),  // Sadalsuud-ish extra
        ],
        conexiones: [[0,1],[0,2],[1,3],[2,4]]
    },

    // ACUARIO — Sadalsuud/Skat + cadena
    "ACUARIO": {
        estrellas: [
            raDecA3D(323.0000, -5.0000), // Sadalsuud
            raDecA3D(340.0000, -15.0000), // Skat
            raDecA3D(355.0000, 0.0000), // Sadalmelik
            raDecA3D(325.0000, -16.0000), // Enif-ish
            raDecA3D(315.0000, -8.0000), // Ancha-ish
        ],
        conexiones: [[0,3],[3,4],[4,1],[1,2]]
    },

    // PISCIS — Alrescha/Torcular + nudo y peces
    "PISCIS": {
        estrellas: [
            raDecA3D(19.0000, 3.0000),  // Alrescha
            raDecA3D(11.0000, 7.0000),  // Torcular
            raDecA3D(23.0000, -10.0000), // Pisces 40-ish
            raDecA3D(35.0000, 5.0000),   // Eta Piscium-ish
            raDecA3D(344.0000, -25.0000),// Fomalhaut-ish extra (para cierre visual)
        ],
        conexiones: [[0,1],[1,2],[2,3],[3,4]]
    }
};


const constelacionesGroup = new THREE.Group();
constelacionesGroup.userData = { tipo: 'constelaciones' };
scene.add(constelacionesGroup);

// Crea textura circular con glow para las estrellas de constelaciones
function crearTexturaEstrellaGlow() {
    const size = 128;
    const can = document.createElement('canvas');
    can.width = size; can.height = size;
    const ctx = can.getContext('2d');
    const cx = size / 2, cy = size / 2, r = size / 2;
    // Núcleo blanco brillante
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0,    'rgba(255,255,255,1.0)');
    grad.addColorStop(0.12, 'rgba(200,230,255,0.95)');
    grad.addColorStop(0.35, 'rgba(100,180,255,0.55)');
    grad.addColorStop(0.70, 'rgba( 30,100,200,0.18)');
    grad.addColorStop(1.0,  'rgba(  0, 50,150,0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(can);
}

const texturaGlowEstrellas = crearTexturaEstrellaGlow();

function crearConstelacion({ nombre, estrellas, conexiones }) {
    const grupo = new THREE.Group();
    grupo.userData = { nombre, tipo: 'constelacion', esCinturon: false };

    // -- Líneas conectadas (se añaden PRIMERO para que queden detrás de las estrellas)
    const linePositions = [];
    conexiones.forEach(([a, b]) => {
        const pa = estrellas[a];
        const pb = estrellas[b];
        linePositions.push(pa.x, pa.y, pa.z);
        linePositions.push(pb.x, pb.y, pb.z);
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
        color: 0x4488cc,
        transparent: true,
        opacity: 0.65
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    grupo.add(lineSegments);

    // -- Estrellas con glow (Points con textura circular)
    const positions = new Float32Array(estrellas.length * 3);
    estrellas.forEach((p, i) => {
        positions[i * 3]     = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
    });
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Capa exterior (halo azulado grande)
    const haloMat = new THREE.PointsMaterial({
        map: texturaGlowEstrellas,
        color: 0x66bbff,
        size: 18000,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    grupo.add(new THREE.Points(pointsGeo.clone(), haloMat));

    // Capa interior (núcleo blanco brillante)
    const coreMat = new THREE.PointsMaterial({
        map: texturaGlowEstrellas,
        color: 0xffffff,
        size: 7000,
        sizeAttenuation: true,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    grupo.add(new THREE.Points(pointsGeo, coreMat));

    // -- Etiqueta del nombre cerca del centroide
    const cx = estrellas.reduce((acc, p) => acc + p.x, 0) / estrellas.length;
    const cy = estrellas.reduce((acc, p) => acc + p.y, 0) / estrellas.length;
    const cz = estrellas.reduce((acc, p) => acc + p.z, 0) / estrellas.length;

    // Canvas con borde suave y texto estilo Solar System Scope
    const labelCan = document.createElement('canvas');
    labelCan.width = 512; labelCan.height = 96;
    const lctx = labelCan.getContext('2d');
    lctx.font = 'Bold 42px Arial';
    lctx.letterSpacing = '3px';
    lctx.fillStyle = 'rgba(150,210,255,0.85)';
    lctx.textAlign = 'center';
    // Sombra suave
    lctx.shadowColor = 'rgba(0,80,200,0.8)';
    lctx.shadowBlur = 12;
    lctx.fillText(nombre, 256, 58);
    const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(labelCan),
        transparent: true,
        depthWrite: false
    }));
    labelSprite.scale.set(60000, 11000, 1);

    // Colocar etiqueta en la dirección del centroide (sobre la esfera)
    const dir = new THREE.Vector3(cx, cy, cz).normalize();
    const labelPos = dir.multiplyScalar(1720000); // un poco más afuera
    labelSprite.position.copy(labelPos);
    grupo.add(labelSprite);

    // El grupo no necesita centrado porque las coordenadas son absolutas
    return grupo;
}

const listaConstelaciones = [];
Object.entries(constelacionesData).forEach(([nombre, datos]) => {
    const g = crearConstelacion({ nombre, estrellas: datos.estrellas, conexiones: datos.conexiones });
    listaConstelaciones.push(g);
    constelacionesGroup.add(g);
});

// --- 6. OBJETOS ---

// “Asteroides con nombre” alrededor de un planeta
function crearAsteroidesNombrados({ nombreGrupo, items, planetaMesh, ejeY = 0 }) {
    const group = new THREE.Group();
    group.userData = { nombreGrupo };

    // Hacer que se mueva con el planeta
    planetaMesh.add(group);

    // Posicionar/definir posiciones locales en el mismo frame
    items.forEach((d) => {
        // asteroide
        const ast = new THREE.Mesh(
            new THREE.SphereGeometry(d.radio, 16, 16),
            new THREE.MeshStandardMaterial({
                color: d.color,
                roughness: 1.0,
                metalness: 0.0
            })
        );

        ast.userData = {
            nombre: d.nombre,
            radio: d.radio,
            distancia: d.distancia,
            vel: d.vel,
            ejeY,
            angulo: Math.random() * Math.PI * 2
        };

        group.add(ast);
    });

    return group;
}

function agregarLunasPlaneta({ planetaMesh, planetName, ejeY = 0 }) {
    // Grupo de lunas (se posiciona alrededor del planeta en runtime)
    const group = new THREE.Group();
    group.userData = { planeta: planetName };

    // Pivot: que el grupo se mueva con el planeta
    // (si no se asocia al planeta, las lunas quedan en el origen)
    planetaMesh.add(group);

    // Parámetros: (distancia escalar dentro del mundo visual)
    const lunas = {
        // Marte
        'MARTE': [
            { nombre: 'FOBOS', radio: 18, distancia: 1300, vel: 0.035, color: 0xb0b0b0 },
            { nombre: 'DEIMOS', radio: 14, distancia: 2000, vel: 0.025, color: 0xc7c7c7 }
        ],
        // Júpiter
        'JÚPITER': [
            { nombre: 'ÍO', radio: 30, distancia: 2200, vel: 0.040, color: 0xffcc66 },
            { nombre: 'EUROPA', radio: 26, distancia: 2700, vel: 0.032, color: 0x99ccff },
            { nombre: 'GANÍMEDES', radio: 34, distancia: 3300, vel: 0.028, color: 0xbbaaa0 },
            { nombre: 'CALISTO', radio: 32, distancia: 3900, vel: 0.022, color: 0xd9c7b8 }
        ],
        // Saturno
        'SATURNO': [
            { nombre: 'TITÁN', radio: 36, distancia: 2600, vel: 0.030, color: 0xd7c38a }
        ]
    };

    const items = lunas[planetaMesh.userData.nombre] || lunas[planetaMesh.userData.nombre.toUpperCase()] || [];

    // Inicializar posiciones para que se vean desde el primer frame
    const baseAng = Math.random() * Math.PI * 2;

    items.forEach((d, idx) => {
        const luna = crearLuna({
            nombre: d.nombre,
            radio: d.radio,
            distancia: d.distancia,
            vel: d.vel,
            tex: null,
            color: d.color,
            ejeY
        });

        group.add(luna);
        luna.userData.padrePlaneta = planetaMesh;
    });

    return group;
}

const sol = new THREE.Mesh(
    new THREE.SphereGeometry(6000, 48, 48),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('sol.jpg') })
);
sol.userData = { nombre: "SOL", distancia: "0 UA", velocidad: "0 km/s", radioReal: 6000 };
scene.add(sol);

crearPlaneta("MERCURIO", 100,  14000, 0.015, false, "mercurio");
crearPlaneta("VENUS",    180,  24000, 0.012, false, "venus");
tierraMesh = crearPlaneta("TIERRA", 200, 35000, 0.01, false, "tierra");

// --- ÓRBITAS VISIBLES (líneas circulares) ---
function crearOrbitaCircular(distancia, colorHex = 0x2233ff) {

    const radio = distancia;
    const puntos = 128;
    const positions = new Float32Array((puntos + 1) * 3);
    for (let i = 0; i <= puntos; i++) {
        const ang = (i / puntos) * Math.PI * 2;
        const idx = i * 3;
        positions[idx] = Math.cos(ang) * radio;
        positions[idx + 1] = 0;
        positions[idx + 2] = Math.sin(ang) * radio;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    // Línea punteada y más tenue
    const mat = new THREE.LineDashedMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.25,
        dashSize: 600,
        gapSize: 1400
    });
    const line = new THREE.LineLoop(geo, mat);
    // Necesario para que LineDashed funcione
    line.computeLineDistances();

    scene.add(line);
    return line;
}

function crearOrbitsParaPlanetas() {
    // Solo planetas (no cometas / cinturones)
    const colores = [0x00aaff, 0x44ccff, 0x66ffcc, 0xaaffff, 0x8899ff];
    planetas.forEach((p, i) => {
        const orb = crearOrbitaCircular(p.distancia, colores[i % colores.length]);
        lineasOrbitas.push(orb);

        // Guardar referencias para luego crear/destruir lunas o futuras funciones
        lunasPorPlaneta.set(p.mesh.userData?.nombre, { orbit: orb });
    });
}



lunaGroup = new THREE.Group();
lunaGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(80, 32, 32),
    new THREE.MeshStandardMaterial({ map: textureLoader.load('luna.jpg') })
));
scene.add(lunaGroup);

const marteMesh = crearPlaneta("MARTE",   140,  50000, 0.008, false, "marte");

cinturonAsteroides = crearCinturon("CINTURÓN DE ASTEROIDES", 12000, 58000, 72000, 800,  0xffffff, 50);

const jupiterMesh = crearPlaneta("JÚPITER", 650, 105000, 0.004, false, "jupiter");
const saturnoMesh = crearPlaneta("SATURNO", 560, 145000, 0.003, true,  "saturno");

// “Asteroides” con nombre alrededor (en vez de lunas)
crearAsteroidesNombrados({
    nombreGrupo: 'MARTE',
    planetaMesh: marteMesh,
    items: [
        { nombre: 'FOBOS', radio: 18, distancia: 1300, vel: 0.035, color: 0xb0b0b0 },
        { nombre: 'DEIMOS', radio: 14, distancia: 2000, vel: 0.025, color: 0xc7c7c7 }
    ]
});

crearAsteroidesNombrados({
    nombreGrupo: 'JÚPITER',
    planetaMesh: jupiterMesh,
    items: [
        { nombre: 'ÍO', radio: 30, distancia: 2200, vel: 0.040, color: 0xffcc66 },
        { nombre: 'EUROPA', radio: 26, distancia: 2700, vel: 0.032, color: 0x99ccff },
        { nombre: 'GANÍMEDES', radio: 34, distancia: 3300, vel: 0.028, color: 0xbbaaa0 },
        { nombre: 'CALISTO', radio: 32, distancia: 3900, vel: 0.022, color: 0xd9c7b8 }
    ]
});

crearAsteroidesNombrados({
    nombreGrupo: 'SATURNO',
    planetaMesh: saturnoMesh,
    items: [
        { nombre: 'TITÁN', radio: 36, distancia: 2600, vel: 0.030, color: 0xd7c38a }
    ]
});
crearPlaneta("URANO",   420, 185000, 0.002, false, "urano");
crearPlaneta("NEPTUNO", 400, 220000, 0.001, false, "neptuno");
// Más asteroides en el cinturón de Kuiper para que se note mejor
cinturonKuiper = crearCinturon("CINTURÓN DE KUIPER", 24000, 260000, 360000, 3000, 0xaaddff, 70);

// Objetos destacados del Cinturón de Kuiper (Plutón + Eris + Haumea + Makemake)
// Se agregan como “puntos”/mallas independientes para que el menú realmente los pueda enfocar.
const kuiperObjetos = [
    { nombre: "PLUTÓN",   radio: 90,  escala: 320, distancia: 260000, vel: 0.0007, color: 0xd4c9ff },
    { nombre: "ERIS",     radio: 75,  escala: 280, distancia: 340000, vel: 0.00055, color: 0xfff1cc },
    { nombre: "HAUMEA",   radio: 70,  escala: 260, distancia: 300000, vel: 0.0006, color: 0xc9f1ff },
    { nombre: "MAKEMAKE", radio: 65,  escala: 250, distancia: 325000, vel: 0.00058, color: 0xe6e6ff }
];

window.__kuiperObjetos = kuiperObjetos.map((d, idx) => {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(d.radio, 20, 20),
        new THREE.MeshStandardMaterial({
            color: d.color,
            emissive: d.color,
            emissiveIntensity: 0.8,
            roughness: 0.9,
            metalness: 0.0
        })
    );

    mesh.userData = {
        nombre: d.nombre,
        distancia: `${d.distancia} km`,
        velocidad: "Kuiper",
        radioReal: d.radio,
        tipo: "kuiper-objeto",
        vel: d.vel,
        angulo: Math.random() * Math.PI * 2,
        orbitDist: d.distancia
    };

    // Distribuir en plano casi XZ y un poco de variación en Y para que se vean
    const y = (Math.random() - 0.5) * 35000;
    const x = Math.cos(mesh.userData.angulo) * d.distancia;
    const z = Math.sin(mesh.userData.angulo) * d.distancia;
    mesh.position.set(x, y, z);

    scene.add(mesh);
    return mesh;
});


for (let i = 1; i <= 5; i++) crearCometa(i);

// Crear órbitas visibles para planetas
crearOrbitsParaPlanetas();

// --- 6. SEGUIMIENTO ---
let planetaActivo = null;
const prevTarget  = new THREE.Vector3();
const _delta      = new THREE.Vector3();

// Vista inicial (para restaurar cámara/target como al cargar la página)
const camInicial = camera.position.clone();
const targetInicial = controls.target.clone();

function enfocarPlaneta(obj) {
    const pos   = obj.position.clone();
    const radio = obj.userData.radioReal || 1000;
    const dist  = Math.max(radio * 8, 8000);
    const dir   = camera.position.clone().sub(controls.target).normalize();

    controls.target.copy(pos);
    camera.position.copy(pos).addScaledVector(dir, dist);
    controls.update();

    prevTarget.copy(pos);
    planetaActivo = obj;
}

function enfocarCinturon(obj) {
    // Vista desde arriba del cinturón
    const centroR = obj.userData.centroR || 65000;

    // target en el centro del sistema solar (0,0,0)
    controls.target.set(0, 0, 0);

    // En móvil, alejamos más la cámara para que los cinturones se vean mejor
    const esMovil = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    const factor = esMovil ? 2.0 : 1.4;

    // cámara muy arriba para ver todo el anillo
    camera.position.set(0, centroR * factor, 0);
    controls.update();

    // Sin seguimiento automático (el cinturón no se mueve)
    planetaActivo = null;
}

function enfocarConstelacion(obj) {
    // Las constelaciones están sobre la esfera de fondo (~1.7M de radio).
    // Calculamos el centroide del grupo en espacio mundo y apuntamos hacia allá.
    const dataCons = constelacionesData[obj.userData.nombre];
    if (!dataCons) return;
    const ests = dataCons.estrellas;
    const cx = ests.reduce((a, p) => a + p.x, 0) / ests.length;
    const cy = ests.reduce((a, p) => a + p.y, 0) / ests.length;
    const cz = ests.reduce((a, p) => a + p.z, 0) / ests.length;
    const centroide = new THREE.Vector3(cx, cy, cz);

    // Target: origen (0,0,0) — miramos desde el centro del sistema hacia la constelación
    controls.target.set(0, 0, 0);
    // Cámara: en la dirección opuesta a la constelación, a ~120k del centro
    const dir = centroide.clone().normalize().negate();
    camera.position.copy(dir.multiplyScalar(120000));
    controls.update();
    planetaActivo = null;
}

function enfocar(obj) {
    if (!obj) return;

    if (obj.userData.esCinturon) {
        enfocarCinturon(obj);
    } else if (obj.userData.tipo === 'constelacion') {
        enfocarConstelacion(obj);
    } else {
        enfocarPlaneta(obj);
    }

    // UI
    document.getElementById('info-panel').style.display     = 'block';
    document.getElementById('planeta-nombre').innerText      = obj.userData.nombre;
    document.getElementById('planeta-descripcion').innerText = datosPlanetas[obj.userData.nombre] || "Cuerpo celeste.";
    document.getElementById('planeta-distancia').innerText   = obj.userData.distancia || "N/A";
    document.getElementById('planeta-velocidad').innerText   = obj.userData.velocidad || "N/A";

    // Mostrar botones de regresar SOLO en móvil (fuera del menú)
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    const infoBackQuick = document.getElementById('info-back-quick');
    const infoBackMobile = document.getElementById('info-back-quick-mobile');

    if (isMobile) {
        if (infoBackQuick) infoBackQuick.style.display = 'block';
        if (infoBackMobile) infoBackMobile.style.display = 'block';
    } else {
        if (infoBackQuick) infoBackQuick.style.display = 'none';
        if (infoBackMobile) infoBackMobile.style.display = 'none';
    }


    // Mantener el menú cerrado aquí para que no te tape el universo
    document.getElementById('side-menu').classList.remove('active');


    // Cerrar menú para que puedas seguir viendo el universo sin volver a tocar el menú
    // (el botón back-to-select queda visible dentro del menú, pero como el menú se cierra
    // solo mostramos su lógica cuando el menú vuelva a abrirse)

}



// Restaura la vista original (como al cargar la página)
function verVisionNormal() {
    planetaActivo = null;
    prevTarget.copy(targetInicial);

    controls.target.copy(targetInicial);
    camera.position.copy(camInicial);
    controls.update();

    // Cerrar menú como hace “volver al sol”
    document.getElementById('side-menu').classList.remove('active');

    // Mantener el panel oculto como “visión normal”
    document.getElementById('info-panel').style.display = 'none';
}

// --- 7. UI ---
function setupSelect(id, selectorTipo = null) {
    const el = document.getElementById(id);
    if (!el) return;
    el.onchange = (e) => {
        const val = e.target.value;
        if (!val) return;

        let obj = null;
        if (selectorTipo === 'constelaciones') {
            obj = listaConstelaciones.find(g => g.userData.nombre === val);
        } else {
    const lista = [sol, ...planetas.map(p => p.mesh), ...cometas.map(c => c.mesh), cinturonAsteroides, cinturonKuiper];
            // Objetos del Cinturón de Kuiper (Plutón, Eris, Haumea, Makemake) se guardan como meshes con userData.nombre
            if (selectorTipo === 'kuiper-objetos') {
                const kuiperObjs = (window.__kuiperObjetos || []);
                obj = kuiperObjs.find(o => o.userData && o.userData.nombre === val) || lista.find(o => o.userData.nombre === val);
            } else {
                obj = lista.find(o => o.userData.nombre === val);
            }
        }

        if (obj) enfocar(obj);
        e.target.value = '';
    };
}
setupSelect('sel-planetas');
setupSelect('sel-cinturones');
setupSelect('sel-cometas');
setupSelect('sel-constelaciones', 'constelaciones');


document.getElementById('btn-sol-home').onclick = () => enfocar(sol);
document.getElementById('btn-ver-normal').onclick = () => verVisionNormal();

// Botón "volver" (solo móvil)
const btnBackSelect = document.getElementById('btn-back-select');

if (btnBackSelect) {
    btnBackSelect.onclick = () => {
        // Restaurar cámara/target a visión normal
        verVisionNormal();

        // Ocultar botón rápido
        const infoBackQuick = document.getElementById('info-back-quick');
        if (infoBackQuick) infoBackQuick.style.display = 'none';

        // Abrir el menú para poder seleccionar otra cosa

        document.getElementById('side-menu').classList.add('active');

        // Forzar foco al primer select (así puedes cambiar rápido)
        const sel = document.getElementById('sel-planetas');
        if (sel && sel.focus) sel.focus();
    };
}
document.getElementById('menu-toggle').onclick  = () => document.getElementById('side-menu').classList.add('active');
document.getElementById('menu-close').onclick   = () => document.getElementById('side-menu').classList.remove('active');

// Botón rápido: solo cierra el panel info para que puedas tocar el universo y elegir otra cosa.
const btnInfoBackQuick = document.getElementById('btn-info-back-quick');
if (btnInfoBackQuick) {
    btnInfoBackQuick.onclick = () => {
        // Ocultar panel info
        document.getElementById('info-panel').style.display = 'none';

        // Ocultar botón rápido
        const infoBackQuick = document.getElementById('info-back-quick');
        if (infoBackQuick) infoBackQuick.style.display = 'none';
        
        // Ocultar botón móvil
        const infoBackMobile = document.getElementById('info-back-quick-mobile');
        if (infoBackMobile) infoBackMobile.style.display = 'none';

        // Ocultar back-to-select
        const backToSelect = document.getElementById('back-to-select');
        if (backToSelect) backToSelect.style.display = 'none';

        // Mantener menú cerrado
        document.getElementById('side-menu').classList.remove('active');

        planetaActivo = null;
    };
}

// Botón móvil (fuera del menú)
const btnInfoBackMobile = document.getElementById('btn-info-back-quick-mobile');
if (btnInfoBackMobile) {
    btnInfoBackMobile.onclick = () => {
        // Ocultar panel info
        document.getElementById('info-panel').style.display = 'none';

        // Ocultar botón móvil
        const infoBackMobile = document.getElementById('info-back-quick-mobile');
        if (infoBackMobile) infoBackMobile.style.display = 'none';
        
        // Ocultar botón rápido del menú
        const infoBackQuick = document.getElementById('info-back-quick');
        if (infoBackQuick) infoBackQuick.style.display = 'none';

        // Mantener menú cerrado
        document.getElementById('side-menu').classList.remove('active');

        planetaActivo = null;
    };
}


const raycaster = new THREE.Raycaster();
const mouse     = new THREE.Vector2();
window.addEventListener('click', (e) => {
    // Ignorar clicks del UI para que no interfieran con el raycast
    if (
        e.target.closest('#side-menu') ||
        e.target.closest('#menu-toggle') ||
        e.target.closest('#menu-close') ||
        e.target.closest('#btn-back-select') ||
        e.target.closest('#btn-info-back-quick') ||
        e.target.closest('#btn-info-back-quick-mobile') ||
        e.target.closest('button, select, input, option, label, a')
    ) return;


    mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects([sol, ...planetas.map(p => p.mesh), cinturonAsteroides, cinturonKuiper]);
    if (hits.length > 0) {
        let obj = hits[0].object;
        while (obj.parent && !obj.userData.nombre) obj = obj.parent;
        enfocar(obj);
    }
});

document.getElementById('btn-mas').onclick   = () => { velocidadTiempo *= 1.5; actualizarVel(); };
document.getElementById('btn-menos').onclick = () => { velocidadTiempo /= 1.5; actualizarVel(); };
document.getElementById('btn-pausa').onclick = () => { velocidadTiempo = velocidadTiempo === 0 ? 1 : 0; actualizarVel(); };
function actualizarVel() { document.getElementById('vel-display').innerText = velocidadTiempo.toFixed(1) + 'x'; }

// --- 8. LOOP ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta() * velocidadTiempo;
    const elapsed = clock.getElapsedTime() * velocidadTiempo;

    planetas.forEach(p => {
        p.angulo += p.vel * delta * 20; // Multiplicador para mantener velocidad visual
        p.mesh.position.set(Math.cos(p.angulo) * p.distancia, 0, Math.sin(p.angulo) * p.distancia);
        p.mesh.rotation.y += 0.2 * delta;
    });

    cometas.forEach(c => {
        const d = c.mesh.userData;
        const t = elapsed * 0.2 + d.tOffset;
        c.mesh.position.set(Math.cos(t) * d.rx, Math.sin(t) * d.ry, Math.sin(t) * d.rz);
    });

    if (tierraMesh) {
        const lt = elapsed * 0.5;
        lunaGroup.position.set(
            tierraMesh.position.x + Math.cos(lt) * 3500,
            300,
            tierraMesh.position.z + Math.sin(lt) * 3500
        );
    }

    // Seguimiento: mover cámara + target con el delta del planeta
    if (planetaActivo) {
        _delta.subVectors(planetaActivo.position, prevTarget);
        if (_delta.lengthSq() > 0) {
            controls.target.add(_delta);
            camera.position.add(_delta);
        }
        prevTarget.copy(planetaActivo.position);
    }

    controls.update();
    renderer.render(scene, camera);
}
animate();

// Ocultar pantalla de carga cuando el proyecto está listo
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        loadingScreen.style.pointerEvents = 'none';
    }
}

// Timer de 3 segundos para mostrar el botón
setTimeout(() => {
    const loaderLoading = document.getElementById('loader-loading');
    const btnEnter = document.getElementById('btn-enter-universe');
    
    if (loaderLoading) {
        loaderLoading.style.opacity = '0';
        loaderLoading.style.visibility = 'hidden';
    }
    
    if (btnEnter) {
        btnEnter.classList.add('show');
    }
}, 3000);

// Botón para entrar manualmente (OBLIGATORIO)
const btnEnter = document.getElementById('btn-enter-universe');
if (btnEnter) {
    btnEnter.onclick = () => {
        hideLoadingScreen();
    };
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
