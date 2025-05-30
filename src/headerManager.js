class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                body {
                    margin: 0;
                    font-family: 'Inter', Arial, sans-serif;
                    background: #fff;
                    color: #2d2233;
                    display: flex;
                    min-height: 100vh;
                }

                :root {
                    --sidebar-width: 220px;
                }

                .sidebar {
                    width: var(--sidebar-width);
                    background: #3b2a41;
                    color: #fff;
                    padding-top: 32px;
                    padding-left: 0;
                    height: 100%;
                    position: fixed;
                    top: 0;
                    left: 0;
                    min-height: 100vh;
                    box-sizing: border-box;
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
        })
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
                    margin-left: var(--sidebar-width);
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
            </style>
            <header class="page-header">
                <span class="page-header-title">${title}</span>
                <div class="page-header-icons">
                    <button class="page-header-icon" title="Notificaciones">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2" />
                        </svg>
                    </button>
                    <button class="page-header-icon" title="Perfil">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10" />
                        </svg>
                    </button>
                    <button class="page-header-icon" title="Agregar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
                        </svg>
                    </button>
                </div>
            </header>
        `;
    }
}

customElements.define('page-header', PageHeader);