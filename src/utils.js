export async function fetch_data(url) {
    const data = await fetch(url)
        .then(res => res.json())
        .then(json => json);
    localStorage.setItem('allData', JSON.stringify(data));
    localStorage.setItem('usuarioActivo', data.usuarioActivo);
    return data;
}

export function get_user_data() {
    const allData = JSON.parse(localStorage.getItem('allData'));
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    if (!allData || !usuarioActivo) return null;
    const userIndex = allData.usuarios.findIndex(u => u.nombre === usuarioActivo);
    if (userIndex === -1) return null;
    return allData.usuarios[userIndex].datos;
}

export function set_user_data(datos) {
    const allData = JSON.parse(localStorage.getItem('allData'));
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    if (!allData || !usuarioActivo) return;
    const userIndex = allData.usuarios.findIndex(u => u.nombre === usuarioActivo);
    if (userIndex === -1) return;
    allData.usuarios[userIndex].datos = datos;
    localStorage.setItem('allData', JSON.stringify(allData));
}

export function get_notifications() {
    const allData = JSON.parse(localStorage.getItem('allData'));
    return allData && allData.notificaciones ? allData.notificaciones : [];
}

export function set_notifications(notificaciones) {
    const allData = JSON.parse(localStorage.getItem('allData'));
    if (!allData) return;
    allData.notificaciones = notificaciones;
    localStorage.setItem('allData', JSON.stringify(allData));
}

export function add_notification(msg) {
    const notificaciones = get_notifications();
    notificaciones.unshift({
        mensaje: msg,
        fecha: new Date().toISOString()
    });
    set_notifications(notificaciones);
}

export function check_and_notify_reminder(actividad) {
    if (!actividad || !actividad.recordatorio) return;
    const today = new Date();
    const rec = new Date(actividad.recordatorio);
    if (
        today.getFullYear() === rec.getFullYear() &&
        today.getMonth() === rec.getMonth() &&
        today.getDate() === rec.getDate()
    ) {
        add_notification(`Recordatorio: "${actividad.nombre}" (${actividad.materia}) es para hoy.`);
    }
}

// Chequea si hay tareas para hoy y notifica si corresponde
export function check_today_tasks_and_notify() {
    const allData = JSON.parse(localStorage.getItem('allData'));
    if (!allData || !allData.usuarios || !localStorage.getItem('usuarioActivo')) return;
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const user = allData.usuarios.find(u => u.nombre === usuarioActivo);
    if (!user || !user.datos || !user.datos.actividades) return;
    const today = new Date();
    user.datos.actividades.forEach(actividad => {
        if (!actividad.recordatorio) return;
        const fechaAct = new Date(actividad.recordatorio);
        if (
            fechaAct.getFullYear() === today.getFullYear() &&
            fechaAct.getMonth() === today.getMonth() &&
            fechaAct.getDate() === today.getDate()
        ) {
            add_notification(`Tienes la actividad "${actividad.nombre}" (${actividad.materia}) para hoy.`);
        }
    });
}