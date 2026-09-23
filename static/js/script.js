document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================
        1. MENÚ RESPONSIVE (TOGGLE EN MÓVILES)
       =================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('activo');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('activo');
            });
        });
    }

    /* ===================================================
        2. PANEL INTERACTIVO DE HABILIDADES
       =================================================== */
    const tarjetasHabilidad = document.querySelectorAll('.tarjeta-habilidad');
    const panelInfo = document.getElementById('panel-info');

    if (tarjetasHabilidad.length > 0) {
        tarjetasHabilidad.forEach(tarjeta => {
            tarjeta.addEventListener('click', () => {
                tarjetasHabilidad.forEach(t => t.classList.remove('activa'));
                tarjeta.classList.add('activa');

                const info = tarjeta.getAttribute('data-info');
                if (panelInfo && info) {
                    panelInfo.textContent = info;
                }
            });
        });
    }

    /* ===================================================
        3. LLUVIA TORRENCIAL Y ESPORAS DE LUZ (ESTILO CIUDAD DE LAS LÁGRIMAS)
       =================================================== */
    const canvas = document.getElementById('bg-particulas');

    if (canvas) {
        const ctx = canvas.getContext('2d');

        function ajustarTamanoCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        ajustarTamanoCanvas();
        window.addEventListener('resize', ajustarTamanoCanvas);

        // --- CONFIGURACIÓN DE LA LLUVIA ---
        const cantidadGotas = 130;
        const gotas = [];
        let ondas = [];
        const vientoX = -1.5;

        for (let i = 0; i < cantidadGotas; i++) {
            const profundidad = Math.random();

            gotas.push({
                x: Math.random() * (canvas.width + 200),
                y: Math.random() * canvas.height,
                largo: profundidad * 25 + 25,
                velocidadY: profundidad * 25 + 35,
                velocidadX: vientoX,
                grosor: profundidad * 1.2 + 0.6,
                opacidad: profundidad * 0.4 + 0.15,
                color: Math.random() > 0.25 ? 'rgba(56, 189, 248, ' : 'rgba(129, 140, 248, '
            });
        }

        // --- CONFIGURACIÓN DE PARTÍCULAS / ESPORAS DE LUZ (MÁS VISIBLES Y CONSTANTES) ---
        const cantidadParticulas = Math.floor((canvas.width * canvas.height) / 15000);
        const particulas = [];

        for (let i = 0; i < cantidadParticulas; i++) {
            particulas.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2.5 + 1.2,
                speedX: Math.random() * 0.6 - 0.3,
                speedY: Math.random() * -0.5 - 0.2,
                opacity: Math.random() * 0.5 + 0.4
            });
        }

        // --- BUCLE DE ANIMACIÓN ---
        function animarAmbiente() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Dibujar Partículas de Luz Flotantes (Efecto Alma / Resplandor)
            particulas.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;

                ctx.shadowBlur = 8;
                ctx.shadowColor = '#38bdf8';

                ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0;
            });

            // 2. Dibujar Gotas de Lluvia
            gotas.forEach(g => {
                g.y += g.velocidadY;
                g.x += g.velocidadX;

                ctx.beginPath();
                ctx.moveTo(g.x, g.y);
                ctx.lineTo(g.x + g.velocidadX, g.y + g.largo);
                ctx.strokeStyle = g.color + g.opacidad + ')';
                ctx.lineWidth = g.grosor;
                ctx.stroke();

                if (g.y > canvas.height) {
                    if (g.grosor > 1.0) {
                        ondas.push({
                            x: g.x,
                            y: canvas.height - 3,
                            radio: 1,
                            maxRadio: Math.random() * 7 + 4,
                            opacidad: 0.6,
                            color: g.color
                        });
                    }

                    g.y = -g.largo;
                    g.x = Math.random() * (canvas.width + 200);
                }
            });

            // 3. Dibujar Salpicones (Ondas)
            ondas = ondas.filter(o => {
                ctx.beginPath();
                ctx.arc(o.x, o.y, o.radio, 0, Math.PI * 2);
                ctx.strokeStyle = o.color + o.opacidad + ')';
                ctx.lineWidth = 0.8;
                ctx.stroke();

                o.radio += 0.8;
                o.opacidad -= 0.05;

                return o.opacidad > 0 && o.radio < o.maxRadio;
            });

            requestAnimationFrame(animarAmbiente);
        }

        animarAmbiente();
    }

    /* ===================================================
        4. MANEJO DEL FORMULARIO DE CONTACTO
       =================================================== */
    const formulario = document.getElementById('form-contacto');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Axel te responderá pronto.');
            formulario.reset();
        });
    }
});