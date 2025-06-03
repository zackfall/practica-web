import { get_user_data, set_user_data } from "./utils.js";

window.addEventListener('load', function () {
    const datos = get_user_data();
    if (!datos) return;
    const tareas = datos.tareas || [];
    const examenes = datos.examenes || [];
    const tareasSection = document.querySelector('.activities:nth-of-type(1)');
    const examenesSection = document.querySelector('.activities:nth-of-type(2)');
    if (tareasSection) {
        tareasSection.innerHTML = '<h2>Tareas</h2>' + tareas.map((t, i) => `
            <div class="activity">
                <div class="left">
                    <p><a href="editar-actividad.html?categoria=tareas&actividad=${i}">${t.nombre}</a></p>
                    <p>${t.materia}</p>
                </div>
                <div class="right">
                    <p>Calificación: ${t.calificacion ? t.calificacion : '-'}/10</p>
                    <p>Fecha: ${t.fecha}</p>
                </div>
                <button class="btn-delete" aria-label="Delete activity" data-categoria="tareas" data-idx="${i}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                </button>
            </div>
        `).join('');
    }
    if (examenesSection) {
        examenesSection.innerHTML = '<h2>Examenes</h2>' + examenes.map((t, i) => `
            <div class="activity">
                <div class="left">
                    <p><a href="editar-actividad.html?categoria=examenes&actividad=${i}">${t.nombre}</a></p>
                    <p>${t.materia}</p>
                </div>
                <div class="right">
                    <p>Calificación: ${t.calificacion ? t.calificacion : '-'}/10</p>
                    <p>Fecha: ${t.fecha}</p>
                </div>
                <button class="btn-delete" aria-label="Delete activity" data-categoria="examenes" data-idx="${i}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                </button>
            </div>
        `).join('');
    }
    // Eliminar actividad
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function () {
            const cat = btn.getAttribute('data-categoria');
            const idx = parseInt(btn.getAttribute('data-idx'));
            if (confirm('¿Seguro que deseas eliminar esta actividad?')) {
                datos[cat].splice(idx, 1);
                set_user_data(datos);
                window.location.reload();
            }
        });
    });
});