import { get_user_data, set_user_data, check_and_notify_reminder, add_notification } from "./utils.js";

window.addEventListener('load', function () {
    // No prellenar nada, es para crear
});

const form = document.querySelector('.form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const datos = get_user_data();
    if (!datos) return;
    const tipo = document.getElementById("tipo-actividad").value; // "tareas" o "examenes"
    if (!datos[tipo]) datos[tipo] = [];
    const nuevoIndice = datos[tipo].length;
    const nuevaActividad = {
        nombre: document.getElementById("activity-name").value,
        fecha: document.getElementById("date").value,
        recordatorio: document.getElementById("reminder").value,
        materia: document.getElementById("subject").value,
        descripcion: document.getElementById("description").value,
        calificacion: "",
        estado: "undone",
        url: `editar-actividad.html?categoria=${tipo}&actividad=${nuevoIndice}`
    };
    datos[tipo].push(nuevaActividad);
    set_user_data(datos);
    add_notification(`Nueva actividad creada: "${nuevaActividad.nombre}" (${nuevaActividad.materia}) para el ${nuevaActividad.fecha}`);
    check_and_notify_reminder(nuevaActividad);
    alert('Actividad creada correctamente');
    window.location.href = 'actividades.html';
});
