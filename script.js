// Función: convertir texto a SHA-256 (seguridad real)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Base de datos de especialistas (hash en vez de contraseñas)
const especialistas = [
    { 
        email: "especialista1@ugel.gob.pe",
        pass: "1d7f5d42fa26aa547e2ddb681c6da56a4746112a65f00c8674661c67d5975352",
        nombre: "Especialista Primaria"
    }
];

// LOGIN PRINCIPAL
async function login() {
    let correo = document.getElementById("correo").value.trim();
    let clave = document.getElementById("clave").value.trim();
    let msg = document.getElementById("mensaje");
    let loader = document.getElementById("loader");

    // Mostrar animación
    loader.classList.remove("hidden");
    msg.innerText = "";

    // Convertir clave digitada en hash
    let claveHash = await hashPassword(clave);

    // Buscar usuario
    const user = especialistas.find(u => u.email === correo && u.pass === claveHash);

    setTimeout(() => {
        loader.classList.add("hidden");

        if (user) {
            msg.style.color = "green";
            msg.innerText = "Acceso permitido. Bienvenido(a) " + user.nombre;

            setTimeout(() => {
                window.location.href = "repositorio.html";
            }, 1000);
        } else {
            msg.style.color = "red";
            msg.innerText = "Acceso denegado.";
        }
    }, 1000);
}

