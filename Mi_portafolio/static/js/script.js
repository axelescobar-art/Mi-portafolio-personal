document.addEventListener('DOMContentLoaded', () => {

    // --- MENÚ MÓVIL Y OTRAS INTERACCIONES ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('activo');
        });
    }

    // --- INTERACCIÓN CON LAS TARJETAS DE HABILIDADES ---
    const tarjetasHabilidad = document.querySelectorAll('.tarjeta-habilidad');
    const panelInfo = document.getElementById('infoHabilidad');

    tarjetasHabilidad.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            tarjetasHabilidad.forEach(t => t.classList.remove('activa'));
            tarjeta.classList.add('activa');
            const info = tarjeta.getAttribute('data-info');

            if (panelInfo) {
                panelInfo.style.opacity = '0';
                setTimeout(() => {
                    panelInfo.innerHTML = `<p>${info}</p>`;
                    panelInfo.style.opacity = '1';
                }, 150);
            }
        });
    });

    // --- LLUVIA Y SALPICONES (CIUDAD DE LAS LÁGRIMAS) ---
    const canvas = document.getElementById('bg-particulas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const cantidadGotas = 80;
        const gotas = [];
        const ondas = [];

        for (let i = 0; i < cantidadGotas; i++) {
            gotas.push({
                x: Math.random() * width,
                y: Math.random() * height,
                largo: Math.random() * 20 + 15,
                velocidadY: Math.random() * 10 + 8,
                velocidadX: -1.5,
                opacidad: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.3 ? 'rgba(56, 189, 248, ' : 'rgba(129, 140, 248, '
            });
        }

        function animarCiudadDeLasLagrimas() {
            ctx.clearRect(0, 0, width, height);

            gotas.forEach(g => {
                g.y += g.velocidadY;
                g.x += g.velocidadX;

                ctx.beginPath();
                ctx.moveTo(g.x, g.y);
                ctx.lineTo(g.x + g.velocidadX, g.y + g.largo);
                ctx.strokeStyle = g.color + g.opacidad + ')';
                ctx.lineWidth = 1.2;
                ctx.stroke();

                if (g.y > height) {
                    ondas.push({
                        x: g.x,
                        y: height - 5,
                        radio: 1,
                        maxRadio: Math.random() * 8 + 4,
                        opacidad: 0.6,
                        color: g.color
                    });

                    g.y = -g.largo;
                    g.x = Math.random() * (width + 200);
                }
            });

            ondas.forEach((o, index) => {
                ctx.beginPath();
                ctx.arc(o.x, o.y, o.radio, 0, Math.PI * 2);
                ctx.strokeStyle = o.color + o.opacidad + ')';
                ctx.lineWidth = 0.8;
                ctx.stroke();

                o.radio += 0.4;
                o.opacidad -= 0.03;

                if (o.opacidad <= 0 || o.radio >= o.maxRadio) {
                    ondas.splice(index, 1);
                }
            });

            requestAnimationFrame(animarCiudadDeLasLagrimas);
        }

        animarCiudadDeLasLagrimas();
    }
});