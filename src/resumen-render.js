import { get_user_data } from './utils.js';

const SVG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2"/></svg>`;

function formatFecha(fecha) {
    if (!fecha) return '';
    // Asegura que la fecha se interprete como local, no UTC
    const [year, month, day] = fecha.split('-');
    const d = new Date(Number(year), Number(month) - 1, Number(day));
    return d.toLocaleDateString('es-EC', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function getAllActividades() {
    const datos = get_user_data();
    if (!datos) return [];
    const tareas = (datos.tareas || []).map(t => ({ ...t, tipo: 'Tarea' }));
    const examenes = (datos.examenes || []).map(e => ({ ...e, tipo: 'Examen' }));
    return [...tareas, ...examenes];
}

function renderReporteSemanal(actividades) {
    const contenedor = document.querySelector('.tareas-semanal');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    actividades.forEach(act => {
        contenedor.innerHTML += `
      <div class="tarea">
        ${SVG_ICON} ${act.tipo}<br> ${act.nombre}<br>
        <span>${act.materia}<br>${formatFecha(act.fecha)}</span>
      </div>
    `;
    });
}

function renderActividadesDia(actividades, selector, diasDespues) {
    const contenedor = document.querySelector(selector);
    if (!contenedor) return;
    contenedor.innerHTML = `<h4>${diasDespues === 0 ? 'Actividades de hoy' : 'Actividades de mañana'}</h4>`;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    actividades.filter(act => {
        if (!act.fecha) return false;
        // Parsear fecha como local
        const [year, month, day] = act.fecha.split('-');
        const fecha = new Date(Number(year), Number(month) - 1, Number(day));
        fecha.setHours(0, 0, 0, 0);
        const diff = Math.floor((fecha - hoy) / (1000 * 60 * 60 * 24));
        return diff === diasDespues;
    }).forEach(act => {
        contenedor.innerHTML += `
      <p><a href="#">${SVG_ICON}</a> ${act.tipo}: ${act.nombre}<br><small>${act.materia}<br>${formatFecha(act.fecha)}</small></p>
    `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const actividades = getAllActividades();
    renderReporteSemanal(actividades);
    renderActividadesDia(actividades, '.actividades .actividad-box:nth-child(1)', 0);
    renderActividadesDia(actividades, '.actividades .actividad-box:nth-child(2)', 1);
});
