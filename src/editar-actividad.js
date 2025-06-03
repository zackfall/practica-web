import { get_user_data, set_user_data, check_and_notify_reminder, add_notification } from "./utils.js";

window.addEventListener('load', function () {
    // Obtenemos los parametros de la url
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    const actividadIdx = parseInt(params.get('actividad'));
    const datos = get_user_data();
    if (!datos || !datos[categoria] || !datos[categoria][actividadIdx]) return;
    const actividad = datos[categoria][actividadIdx];
    document.getElementById("score").textContent = `${actividad.calificacion === "" ? "?" : actividad.calificacion}`;
    document.getElementById("activity-name").value = actividad.nombre;
    document.getElementById("date").value = actividad.fecha;
    document.getElementById("reminder").value = actividad.recordatorio;
    document.getElementById("subject").value = actividad.materia;
    document.getElementById("description").value = actividad.descripcion;

    // Calificación editable
    const editBtn = document.getElementById('edit-score-btn');
    const scoreSpan = document.getElementById('score');
    const scoreInput = document.getElementById('score-input');
    editBtn.addEventListener('click', function () {
        scoreInput.value = actividad.calificacion;
        scoreSpan.style.display = 'none';
        scoreInput.style.display = 'inline-block';
        scoreInput.focus();
    });
    scoreInput.addEventListener('blur', function () {
        scoreSpan.textContent = scoreInput.value;
        scoreSpan.style.display = '';
        scoreInput.style.display = 'none';
    });
    scoreInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            scoreInput.blur();
        }
    });
});

const form = document.getElementById('form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    const actividadIdx = parseInt(params.get('actividad'));
    const datos = get_user_data();
    if (!datos || !datos[categoria] || !datos[categoria][actividadIdx]) return;
    const actividad = datos[categoria][actividadIdx];
    actividad.nombre = document.getElementById("activity-name").value;
    actividad.fecha = document.getElementById("date").value;
    actividad.recordatorio = document.getElementById("reminder").value;
    actividad.materia = document.getElementById("subject").value;
    actividad.descripcion = document.getElementById("description").value;
    // Guardar calificación
    const scoreInput = document.getElementById('score-input');
    const scoreSpan = document.getElementById('score');
    const prevCalificacion = actividad.calificacion;
    const nuevaCalificacion = scoreInput.style.display === 'none' ? scoreSpan.textContent : scoreInput.value;
    actividad.calificacion = nuevaCalificacion;
    // Si antes no tenía calificación y ahora sí, marcar como done
    if ((!prevCalificacion || prevCalificacion === "") && nuevaCalificacion && nuevaCalificacion !== "") {
        actividad.estado = "done";
    }
    set_user_data(datos);
    add_notification(`Actividad editada: "${actividad.nombre}" (${actividad.materia}) para el ${actividad.fecha}`);
    check_and_notify_reminder(actividad);
    alert('Actividad actualizada correctamente');
    window.location.href = 'actividades.html';
});