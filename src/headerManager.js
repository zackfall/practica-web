class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
                :root {
                    --sidebar-width: 220px;
                }
                body {
                    margin: 0;
                    font-family: 'Roboto', Arial, sans-serif;
                    background: #fff;
                    color: #2d2233;
                    min-height: 100vh;
                    display: grid;
                    grid-template-columns: var(--sidebar-width) 1fr;
                    grid-template-rows: 1fr;
                    width: 100vw;
                    height: 100vh;
                }
                .sidebar {
                    width: var(--sidebar-width);
                    background: #3b2a41;
                    color: #fff;
                    padding-top: 32px;
                    padding-left: 0;
                    height: 100vh;
                    box-sizing: border-box;
                    grid-row: 1 / span 1;
                    grid-column: 1 / span 1;
                    position: relative;
                }
                .sidebar ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .sidebar li {
                    padding: 16px 32px;
                    font-size: 1.1em;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .sidebar li.active {
                    background: #4e3757;
                    color: #ff8c8c;
                    font-weight: bold;
                }
                .sidebar li.section {
                    margin-top: 32px;
                    color: #bba4c7;
                    font-weight: bold;
                    background: none;
                    cursor: default;
                }
                .sidebar li:hover:not(.active):not(.section) {
                    background: #4e3757;
                }
                .sidebar a {
                    color: #ff8c8c;
                    text-decoration: none;
                }
                .sidebar a:hover {
                    text-decoration: underline;
                }
                .main-content {
                    grid-column: 2 / span 1;
                    grid-row: 1 / span 1;
                    width: 100%;
                }
            </style>
            <aside class="sidebar">
                <nav>
                    <ul>
                        <li class="active"><a href="index.html">Resumen</a></li>
                        <li><a href="actividades.html">Actividades</a></li>
                        <li><a href="login.html">Login</a></li>
                    </ul>
                </nav>
            </aside>
        `;

        const links = this.querySelectorAll('.sidebar a');
        const currentPath = window.location.pathname.split('/').pop();

        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
        });
    }
}

customElements.define('special-header', SpecialHeader);

class PageHeader extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'Título';
        this.innerHTML = `
            <style>
                .page-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 24px 32px 0 32px;
                    background: #fff;
                    border-bottom: 2px solid #f2e6f7;
                    margin-bottom: 24px;
                }
                .page-header-title {
                    font-size: 2rem;
                    color: #ff8c8c;
                    font-family: 'Inter', Arial, sans-serif;
                    font-weight: 500;
                }
                .page-header-icons {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    margin-left: auto;
                }
                .page-header-icon {
                    font-size: 1.6rem;
                    color: #ff8c8c;
                    cursor: pointer;
                    transition: color 0.2s;
                    background: none;
                    border: none;
                    outline: none;
                }
                .page-header-icon:hover {
                    color: #e06b6b;
                }
                .modal-bg {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .modal {
                    background: #fff;
                    border-radius: 10px;
                    padding: 32px 40px;
                    min-width: 320px;
                    max-width: 90vw;
                    max-height: 80vh;
                    box-shadow: 0 2px 16px rgba(0,0,0,0.15);
                    color: #2d2233;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .modal h3 {
                    margin-bottom: 16px;
                    color: #4c2b4c;
                }
                .modal .user-list {
                    margin: 16px 0;
                    width: 100%;
                }
                .modal .user-list a {
                    display: block;
                    color: #4c2b4c;
                    text-decoration: none;
                    padding: 8px 0;
                    border-radius: 5px;
                    transition: background 0.2s;
                    text-align: center;
                }
                .modal .user-list a.active-user {
                    background: #ff8c8c;
                    color: #fff;
                    font-weight: bold;
                }
                .modal .close-btn {
                    margin-top: 16px;
                    background: #ff8c8c;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    padding: 8px 24px;
                    cursor: pointer;
                }
                .modal .notifications-list {
                    max-height: 300px;
                    overflow-y: auto;
                    width: 100%;
                    margin: 16px 0;
                }
                .modal .notification-item {
                    background: #f8f4fa;
                    border-radius: 6px;
                    padding: 10px 16px;
                    margin-bottom: 10px;
                    color: #4c2b4c;
                    font-size: 1em;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
                }
                .modal .notification-date {
                    font-size: 0.85em;
                    color: #a7a7a7;
                    margin-top: 4px;
                }
            </style>
            <header class="page-header">
                <span class="page-header-title">${title}</span>
                <div class="page-header-icons">
                    <button class="page-header-icon" title="Notificaciones" id="notif-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2" />
                        </svg>
                    </button>
                    <button class="page-header-icon" title="Perfil" id="profile-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10" />
                        </svg>
                    </button>
                    <button class="page-header-icon" title="Agregar" id="add-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
                        </svg>
                    </button>
                </div>
            </header>
            <div id="modal-root"></div>
        `;
        // Redirigir al crear tarea
        this.querySelector('#add-btn').onclick = () => {
            window.location.href = 'crear-actividad.html';
        };
        // Modal de notificaciones
        this.querySelector('#notif-btn').onclick = () => {
            const modalRoot = this.querySelector('#modal-root');
            const allData = JSON.parse(localStorage.getItem('allData'));
            const notificaciones = allData && allData.notificaciones ? allData.notificaciones : [];
            modalRoot.innerHTML = `
                <div class="modal-bg" id="modal-bg">
                    <div class="modal">
                        <h3>Notificaciones</h3>
                        <div class="notifications-list">
                            ${notificaciones.length === 0 ? '<div style="color:#a7a7a7;text-align:center;">No hay notificaciones</div>' :
                    notificaciones.map(n => `
                                    <div class="notification-item">
                                        <div>${n.mensaje}</div>
                                        <div class="notification-date">${new Date(n.fecha).toLocaleString()}</div>
                                    </div>
                                `).join('')}
                        </div>
                        <button class="close-btn" id="close-modal">Cerrar</button>
                    </div>
                </div>
            `;
            // Cerrar modal
            modalRoot.querySelector('#close-modal').onclick = () => {
                modalRoot.innerHTML = '';
            };
            modalRoot.querySelector('#modal-bg').onclick = (e) => {
                if (e.target.id === 'modal-bg') modalRoot.innerHTML = '';
            };
        };
        // Modal de perfil
        this.querySelector('#profile-btn').onclick = () => {
            const modalRoot = this.querySelector('#modal-root');
            const allData = JSON.parse(localStorage.getItem('allData'));
            const usuarioActivo = localStorage.getItem('usuarioActivo');
            if (!allData) return;
            const usuarios = allData.usuarios.map(u => u.nombre);
            modalRoot.innerHTML = `
                <div class="modal-bg" id="modal-bg">
                    <div class="modal">
                        <h3>Usuario actual</h3>
                        <div><b>${usuarioActivo}</b></div>
                        <div class="user-list">
                            ${usuarios.map(u => `<a href="#" class="${u === usuarioActivo ? 'active-user' : ''}" data-user="${u}">${u}</a>`).join('')}
                        </div>
                        <button class="close-btn" id="close-modal">Cerrar</button>
                    </div>
                </div>
            `;
            // Cambiar usuario activo
            modalRoot.querySelectorAll('.user-list a').forEach(link => {
                link.onclick = (e) => {
                    e.preventDefault();
                    const user = link.getAttribute('data-user');
                    localStorage.setItem('usuarioActivo', user);
                    window.location.reload();
                };
            });
            // Cerrar modal
            modalRoot.querySelector('#close-modal').onclick = () => {
                modalRoot.innerHTML = '';
            };
            modalRoot.querySelector('#modal-bg').onclick = (e) => {
                if (e.target.id === 'modal-bg') modalRoot.innerHTML = '';
            };
        };
    }
}

customElements.define('page-header', PageHeader);