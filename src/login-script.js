const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

// Capturamos los formularios
const inicioForm = document.querySelector(".inicio-session");
const registroForm = document.querySelector(".registro");

// Evitar que los formularios recarguen la página al enviar
inicioForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Aquí puedes poner la lógica para el inicio de sesión
    console.log("Inicio de sesión enviado");
});

registroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Aquí puedes poner la lógica para el registro
    console.log("Registro enviado");
});
