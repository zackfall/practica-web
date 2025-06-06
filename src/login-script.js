const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

// FORMULARIOS
const inicioForm = document.querySelector(".inicio-session");
const registroForm = document.querySelector(".registro");

// CAMPOS FORMULARIO REGISTRO
const nombreInput = document.getElementById("nombre");
const emailRegistroInput = document.getElementById("emailRegistro");
const passwordRegistroInput = document.getElementById("passwordRegistro");
const confirmPasswordInput = document.getElementById("confirmPassword");

// BARRA DE FUERZA
const barraFuerza = document.getElementById("barraFuerza");
const strengthText = document.getElementById("strengthText");

// FUNCIONES
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function evaluarFuerza(password) {
    let fuerza = 0;
    if (password.length >= 8) fuerza++;
    if (/[A-Z]/.test(password)) fuerza++;
    if (/[a-z]/.test(password)) fuerza++;
    if (/[0-9]/.test(password)) fuerza++;
    if (/[\W]/.test(password)) fuerza++;

    return fuerza;
}

function actualizarBarraFuerza(fuerza) {
    const colores = ["red", "orange", "yellow", "blue", "green"];
    const textos = ["Muy débil", "Débil", "Regular", "Fuerte", "Muy fuerte"];

    barraFuerza.style.width = (fuerza * 20) + "%";
    barraFuerza.style.backgroundColor = colores[fuerza - 1] || "gray";
    strengthText.textContent = textos[fuerza - 1] || "";
}

// EVENTOS
passwordRegistroInput.addEventListener("input", () => {
    const fuerza = evaluarFuerza(passwordRegistroInput.value);
    actualizarBarraFuerza(fuerza);
});

// VALIDAR INICIO
inicioForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("emailInicio").value.trim();
    const password = document.getElementById("passwordInicio").value;
    const passwordError = document.getElementById("passwordError");
    const emailError = document.getElementById("emailError");
    emailError.textContent = "";
    passwordError.textContent = "";

    if (!email || !password) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (!validarEmail(email)) {
        alert("Ingrese un correo válido.");
        return;
    }

    alert("Inicio de sesión exitoso");
    window.location.href = "/";
});

// VALIDAR REGISTRO
registroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formError = document.getElementById("formError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const emailError = document.getElementById("emailError");
    formError.textContent = ""; // Limpiar mensajes de error
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    emailError.textContent = "";
    const nombre = nombreInput.value.trim();
    const email = emailRegistroInput.value.trim();
    const password = passwordRegistroInput.value;
    const confirmPassword = confirmPasswordInput.value;
    if (!nombre || !email || !password || !confirmPassword) {
        formError.textContent = "Por favor, complete todos los campos.";
        return;
    }

    if (!validarEmail(email)) {
        emailError.textContent = "Ingrese un correo electrónico válido.";
        return;
    }

    if (password.length < 8) {
        passwordError.textContent = "La contraseña debe tener al menos 10 caracteres.";
        return;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Las contraseñas no coinciden.";
        return;
    }

    alert("Registro exitoso");
    window.location.href = "/";
});