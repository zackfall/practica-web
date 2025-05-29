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

                .sidebar {
                width: 220px;
                background: #3b2a41;
                color: #fff;
                padding-top: 32px;
                padding-left: 0;
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

                .main-content {
                flex: 1;
                padding: 32px 48px;
                background: #fff;
                min-height: 100vh;
                }
            </style>
            <aside class="sidebar">
                <nav>
                    <ul>
                        <li class="active"><a href="index.html">Resumen</a></li>
                        <li><a href="#">Actividades</a></li>
                        <li>Horario</li>
                        <hr />
                        <li>Calificaciones</li>
                        <li>Asignaturas</li>
                        <li>Profesores</li>
                    </ul>
                </nav>
            </aside>
        `;
    }
}

customElements.define('special-header', SpecialHeader);