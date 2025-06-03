// Selecciona el contenedor principal y los botones de iniciar sesión y registrarse
const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

// Cambia la vista del contenedor al hacer clic en los botones (iniciar o registrar)
btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");// Muestra formulario de inicio
});

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");// Muestra formulario de registro
});

// FORMULARIOS
// Selecciona los formularios de inicio de sesión y de registro
const inicioForm = document.querySelector(".inicio-session");
const registroForm = document.querySelector(".registro");

// CAMPOS FORMULARIO REGISTRO
// Selecciona los campos del formulario de registro
const nombreInput = document.getElementById("nombre");
const emailRegistroInput = document.getElementById("emailRegistro");
const passwordRegistroInput = document.getElementById("passwordRegistro");
const confirmPasswordInput = document.getElementById("confirmPassword");

// BARRA DE FUERZA
// Selecciona elementos relacionados con la barra de fuerza de contraseña
const barraFuerza = document.getElementById("barraFuerza");
const strengthText = document.getElementById("strengthText");

// FUNCIONES
// Función para validar formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); // Devuelve true si el correo es válido
}

// Función para evaluar la fuerza de la contraseña
function evaluarFuerza(password) {
    let fuerza = 0;
    if (password.length >= 8) fuerza++; // Suma 1 si tiene al menos 8 caracteres
    if (/[A-Z]/.test(password)) fuerza++; // Suma 1 si contiene una mayúscula
    if (/[a-z]/.test(password)) fuerza++; // Suma 1 si contiene una minúscula
    if (/[0-9]/.test(password)) fuerza++; // Suma 1 si contiene un número
    if (/[\W]/.test(password)) fuerza++; // Suma 1 si contiene un símbolo

    return fuerza;
}

// Actualiza visualmente la barra de fuerza de la contraseña según el puntaje
function actualizarBarraFuerza(fuerza) {
    const colores = ["red", "orange", "yellow", "blue", "green"];
    const textos = ["Muy débil", "Débil", "Regular", "Fuerte", "Muy fuerte"];

    barraFuerza.style.width = (fuerza * 20) + "%";// Cambia el ancho de la barra
    barraFuerza.style.backgroundColor = colores[fuerza - 1] || "gray"; // Cambia el color
    strengthText.textContent = textos[fuerza - 1] || ""; // Muestra el texto descriptivo
}


function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "ocultar"; // Cambia el icono a "ocultar"
    } else {
        input.type = "password";
        btn.textContent = "mostrar"; // Cambia el icono a "mostrar"
    }
}


// EVENTOS
// Evento que evalúa la contraseña en tiempo real mientras el usuario escribe
passwordRegistroInput.addEventListener("input", () => {
    const fuerza = evaluarFuerza(passwordRegistroInput.value);
    actualizarBarraFuerza(fuerza);
});

// VALIDAR INICIO
// Validación del formulario de inicio de sesión
inicioForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que se recargue la página


    const email = document.getElementById("emailInicio").value.trim();
    const password = document.getElementById("passwordInicio").value;
    const passwordError = document.getElementById("passwordError");
    const emailError = document.getElementById("emailError");
    emailError.textContent = "";
    passwordError.textContent = "";

    // Verifica que ambos campos estén llenos
    if (!email || !password) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    // Verifica que el email tenga un formato válilo
    if (!validarEmail(email)) {
        alert("Ingrese un correo válido.");
        return;
    }
    // Si pasa todo, muestra mensaje de éxito
    alert("Inicio de sesión exitoso");
});

// VALIDAR REGISTRO
// Validación del formulario de registro
registroForm.addEventListener("submit", (e) => {
    e.preventDefault();// Evita que se recargue la página

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

    // Verifica que todos los campos estén completos
    if (!nombre || !email || !password || !confirmPassword) {
        formError.textContent = "Por favor, complete todos los campos.";
        return;
    }
    // Verifica que el email sea válido
    if (!validarEmail(email)) {
        emailError.textContent = "Ingrese un correo electrónico válido.";
        return;
    }
    // Verifica que la contraseña tenga al menos 8 caracteres
    if (password.length < 8) {
        passwordError.textContent = "La contraseña debe tener al menos 10 caracteres.";
        return;
    }
    // Verifica que ambas contraseñas coincidan
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Las contraseñas no coinciden.";
        return;
    }
    // Si todo está correcto, muestra mensaje de éxito
    alert("Registro exitoso");
});