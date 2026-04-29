import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// --- 1. BASE DE DATOS Y ESTADO ---
const datosPlanetas = {
    "SOL": "Estrella de tipo espectral G2V. Es el corazón del sistema y contiene el 99.8% de la masa total.",
    "MERCURIO": "El planeta más pequeño y cercano al Sol. Es rocoso y no tiene atmósfera.",
    "VENUS": "Similar en tamaño a la Tierra pero con una atmósfera tóxica y un calor extremo.",
    "TIERRA": "Nuestro hogar. El único planeta conocido con vida y agua líquida.",
    "MARTE": "El planeta rojo. Posee el volcán más grande del sistema solar: el Monte Olimpo.",
    "JÚPITER": "El gigante gaseoso. Su Gran Mancha Roja es una tormenta más grande que la Tierra.",
    "SATURNO": "Famoso por sus anillos de hielo. Es tan poco denso que flotaría en el agua.",
    "URANO": "Un gigante de hielo que rota de lado (su eje está inclinado 98 grados).",
    "NEPTUNO": "El planeta más lejano. Tiene los vientos más rápidos del sistema solar.",
    "COMETA": "Un cuerpo pequeño de hielo y polvo con una órbita muy elíptica.",
    "CINTURÓN DE ASTEROIDES": "Región entre Marte y Júpiter llena de fragmentos rocosos antiguos.",
    "CINTURÓN DE KUIPER": "Vasta región helada más allá de la órbita de Neptuno. Contiene objetos congelados y planetas enanos."
};

let velocidadTiempo = 1;
const planetas = [];
let tierraMesh, lunaGroup, cometaMesh, cinturonAsteroides, cinturonKuiper;

// --- 2. CONFIGURACIÓN ESCENA ---
const canvas = document.getElementById('universo-canvas');
const infoPanel = document.getElementById('info-panel');
const infoNombre = document.getElementById('planeta-nombre');
const infoDesc = document.getElementById('planeta-descripcion');
const infoDist = document.getElementById('planeta-distancia');
const infoVel = document.getElementById('planeta-velocidad');
const velDisplay = document.getElementById('vel-display');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000000); 
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
camera.position.set(120000, 80000, 200000);

scene.add(new THREE.AmbientLight(0xffffff, 0.3)); 
const solLuz = new THREE.PointLight(0xffffff, 10, 1000000, 0.5); 
scene.add(solLuz);

const textureLoader = new THREE.TextureLoader();

// --- 3. FUNCIONES DE CREACIÓN ---
function crearFondoEstrellas() {
    const geo = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 40000; i++) {
        const r = 3000000;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        vertices.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 3 })));
}

function crearEtiqueta(texto) {
    const can = document.createElement('canvas');
    const ctx = can.getContext('2d');
    can.width = 512; can.height = 256;
    ctx.font = 'Bold 80px Arial'; ctx.fillStyle = 'white'; ctx.textAlign = 'center';
    ctx.fillText(texto, 256, 128);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(can), transparent: true, opacity: 0.8 }));
    sprite.scale.set(4500, 2250, 1);
    return sprite;
}

function crearCinturon(nombre, cantidad, distMin, distMax, yVar, color, tam) {
    const geo = new THREE.IcosahedronGeometry(tam, 0);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, emissive: color, emissiveIntensity: 0.3 });
    const mesh = new THREE.InstancedMesh(geo, mat, cantidad);
    mesh.userData = { nombre, distancia: `${distMin} - ${distMax}`, velocidad: "Lenta", radioReal: 15000 };

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    for (let i = 0; i < cantidad; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = distMin + Math.random() * (distMax - distMin);
        position.set(Math.cos(a) * d, (Math.random() - 0.5) * yVar, Math.sin(a) * d);
        quaternion.setFromEuler(new THREE.Euler(Math.random(), Math.random(), Math.random()));
        const s = 0.5 + Math.random() * 2.5;
        scale.set(s, s, s);
        matrix.compose(position, quaternion, scale);
        mesh.setMatrixAt(i, matrix);
    }
    scene.add(mesh);
    return mesh;
}

function crearPlaneta(nombre, radio, distancia, vel, tieneAnillos = false, tex = null, texAnillo = null) {
    const radioReal = radio * 6;
    const geo = new THREE.SphereGeometry(radioReal, 64, 64);
    const mat = new THREE.MeshStandardMaterial({ 
        map: tex ? textureLoader.load(`${tex}.jpg`) : null, 
        metalness: 0.2, roughness: 0.6 
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { nombre, distancia, velocidad: vel, radioReal };

    const etiqueta = crearEtiqueta(nombre);
    etiqueta.position.set(0, radioReal * 2.5, 0);
    mesh.add(etiqueta);

    if (tieneAnillos) {
        const rGeo = new THREE.RingGeometry(radioReal * 1.4, radioReal * 2.6, 64);
        const rMat = new THREE.MeshStandardMaterial({ 
            map: texAnillo ? textureLoader.load(`${texAnillo}.png`) : null, 
            side: THREE.DoubleSide, transparent: true, opacity: 0.7 
        });
        const ring = new THREE.Mesh(rGeo, rMat);
        ring.rotation.x = Math.PI / 2;
        ring.raycast = () => {}; 
        mesh.add(ring);
    }

    const obj = { mesh, etiqueta, distancia, vel, angulo: Math.random() * Math.PI * 2 };
    planetas.push(obj);
    scene.add(mesh);
    return mesh;
}

// --- 4. INICIALIZACIÓN DE OBJETOS ---
crearFondoEstrellas();

const solGeo = new THREE.SphereGeometry(7500, 64, 64);
const solMat = new THREE.MeshBasicMaterial({ map: textureLoader.load('sol.jpg') });
const sol = new THREE.Mesh(solGeo, solMat);
sol.userData = { nombre: "SOL", distancia: 0, velocidad: 0, radioReal: 7500 };

const glowTexture = textureLoader.load('https://threejs.org/examples/textures/lensflare/lensflare0.png');
const spriteMat = new THREE.SpriteMaterial({ map: glowTexture, color: 0xffaa00, transparent: true, blending: THREE.AdditiveBlending });
const sprite = new THREE.Sprite(spriteMat);
sprite.scale.set(40000, 40000, 1);
sprite.raycast = () => {}; 
sol.add(sprite);
scene.add(sol);

crearPlaneta("MERCURIO", 180, 15000, 0.015, false, "mercurio");
crearPlaneta("VENUS", 310, 22000, 0.012, false, "venus");
tierraMesh = crearPlaneta("TIERRA", 340, 31000, 0.01, false, "tierra");

lunaGroup = new THREE.Group();
const lunaMesh = new THREE.Mesh(new THREE.SphereGeometry(210, 32, 32), new THREE.MeshStandardMaterial({ map: textureLoader.load('luna.jpg') }));
lunaGroup.add(lunaMesh);
scene.add(lunaGroup);

crearPlaneta("MARTE", 250, 42000, 0.008, false, "marte");
cinturonAsteroides = crearCinturon("CINTURÓN DE ASTEROIDES", 8000, 52000, 65000, 2000, 0xaaaaaa, 80); 
crearPlaneta("JÚPITER", 1100, 95000, 0.004, false, "jupiter");
crearPlaneta("SATURNO", 950, 125000, 0.003, true, "saturno", "anillos de saturno");
crearPlaneta("URANO", 700, 155000, 0.002, false, "urano");
crearPlaneta("NEPTUNO", 680, 185000, 0.001, false, "neptuno");
cinturonKuiper = crearCinturon("CINTURÓN DE KUIPER", 15000, 210000, 280000, 6000, 0x88ccff, 100); 

cometaMesh = new THREE.Mesh(new THREE.SphereGeometry(300, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
cometaMesh.userData = { nombre: "COMETA", distancia: "Variable", velocidad: "Alta", radioReal: 300 };
scene.add(cometaMesh);

// --- 5. INTERACCIÓN Y RAYCASTER ---
const raycaster = new THREE.Raycaster();
raycaster.params.Mesh = { threshold: 50 }; 
const mouse = new THREE.Vector2();
let objetivo = null;

function actualizarHUDTiempo() {
    velDisplay.innerText = velocidadTiempo.toFixed(1) + "x";
    document.getElementById('btn-pausa').innerText = (velocidadTiempo === 0) ? "REANUDAR" : "PAUSA";
}

document.getElementById('btn-mas').onclick = () => { velocidadTiempo *= 1.5; actualizarHUDTiempo(); };
document.getElementById('btn-menos').onclick = () => { velocidadTiempo /= 1.5; actualizarHUDTiempo(); };
document.getElementById('btn-pausa').onclick = () => {
    velocidadTiempo = (velocidadTiempo === 0) ? 1 : 0;
    actualizarHUDTiempo();
};

// Función de enfoque unificada (para clicks y menú)
function enfocarObjeto(obj) {
    objetivo = obj;
    infoPanel.style.display = 'block';
    infoNombre.innerText = objetivo.userData.nombre;
    infoDesc.innerText = datosPlanetas[objetivo.userData.nombre] || "Cuerpo celeste.";
    infoDist.innerText = objetivo.userData.distancia + (typeof objetivo.userData.distancia === 'number' ? " u." : "");
    infoVel.innerText = objetivo.userData.velocidad;

    const radio = objetivo.userData.radioReal;
    if(objetivo.userData.nombre.includes("CINTURÓN")) {
        camera.position.set(objetivo.position.x + 100000, 60000, objetivo.position.z + 100000);
    } else {
        const distCam = radio * 6;
        camera.position.set(objetivo.position.x + distCam, objetivo.position.y + distCam/2, objetivo.position.z + distCam);
    }
}

window.addEventListener('click', (e) => {
    if (e.target.id === 'select-destino' || e.target.closest('#time-controls')) return;

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    const objetosClick = planetas.map(p => p.mesh).concat(sol, cometaMesh, cinturonAsteroides, cinturonKuiper);
    const hits = raycaster.intersectObjects(objetosClick);

    if (hits.length > 0) {
        enfocarObjeto(hits[0].object);
    } else {
        objetivo = null;
        infoPanel.style.display = 'none';
        controls.target.set(0, 0, 0);
    }
});

// LÓGICA DE NAVEGACIÓN POR MENÚ
document.getElementById('select-destino').onchange = (e) => {
    const nombre = e.target.value;
    if (!nombre) return;
    
    const todos = planetas.map(p => p.mesh).concat(sol, cometaMesh, cinturonAsteroides, cinturonKuiper);
    const encontrado = todos.find(obj => obj.userData.nombre === nombre);
    
    if (encontrado) enfocarObjeto(encontrado);
};

// --- 6. BUCLE DE ANIMACIÓN ---
let tCometa = 0;
function animate() {
    requestAnimationFrame(animate);
    
    planetas.forEach(p => {
        p.angulo += p.vel * velocidadTiempo * 0.5;
        p.mesh.position.set(Math.cos(p.angulo) * p.distancia, 0, Math.sin(p.angulo) * p.distancia);
        p.mesh.rotation.y += 0.005;
        p.etiqueta.visible = camera.position.distanceTo(p.mesh.position) < 400000;
    });

    if (tierraMesh) {
        const lt = Date.now() * 0.002 * (velocidadTiempo || 1);
        lunaGroup.position.set(tierraMesh.position.x + Math.cos(lt)*5500, 200, tierraMesh.position.z + Math.sin(lt)*5500);
        lunaMesh.rotation.y += 0.01;
    }

    if (cometaMesh) {
        tCometa += 0.004 * velocidadTiempo;
        cometaMesh.position.set(Math.cos(tCometa)*250000, Math.sin(tCometa)*60000, Math.sin(tCometa)*100000);
    }

    if (objetivo) controls.target.lerp(objetivo.position, 0.1);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});