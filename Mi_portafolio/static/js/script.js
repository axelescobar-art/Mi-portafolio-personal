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

    // --- LLUVIA Y SALPICONES (CIUDAD DE LAS LÁGRIMAS - FIDELIDAD AL LORE) ---
    const canvas = document.getElementById('bg-particulas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const cantidadGotas = 100;
        const gotas = [];
        let ondas = [];

        // Inicialización de gotas (filtración directa del Lago Azul: rápidas y 100% verticales)
        for (let i = 0; i < cantidadGotas; i++) {
            gotas.push({
                x: Math.random() * width,
                y: Math.random() * height,
                largo: Math.random() * 20 + 25,       // Gotas finas y esbeltas
                velocidadY: Math.random() * 14 + 20,  // Caída rápida por gravedad constante (20 - 34 px/f)
                velocidadX: 0,                         // 0 = Caída completamente vertical sin viento
                opacidad: Math.random() * 0.45 + 0.25,
                color: Math.random() > 0.3 ? 'rgba(56, 189, 248, ' : 'rgba(129, 140, 248, '
            });
        }

        function animarCiudadDeLasLagrimas() {
            ctx.clearRect(0, 0, width, height);

            // Dibujar lluvia recta hacia abajo
            gotas.forEach(g => {
                g.y += g.velocidadY;

                ctx.beginPath();
                ctx.moveTo(g.x, g.y);
                ctx.lineTo(g.x, g.y + g.largo); // Trazo vertical perfecto
                ctx.strokeStyle = g.color + g.opacidad + ')';
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // Generar impacto al colisionar con el suelo
                if (g.y > height) {
                    ondas.push({
                        x: g.x,
                        y: height - 4,
                        radio: 1,
                        maxRadio: Math.random() * 6 + 4,
                        opacidad: 0.5,
                        color: g.color
                    });

                    g.y = -g.largo;
                    g.x = Math.random() * width;
                }
            });

            // Dibujar salpicones/ondas en el suelo optimizando rendimiento
            ondas = ondas.filter(o => {
                ctx.beginPath();
                ctx.arc(o.x, o.y, o.radio, 0, Math.PI * 2);
                ctx.strokeStyle = o.color + o.opacidad + ')';
                ctx.lineWidth = 0.8;
                ctx.stroke();

                o.radio += 0.5;
                o.opacidad -= 0.04;

                return o.opacidad > 0 && o.radio < o.maxRadio;
            });

            requestAnimationFrame(animarCiudadDeLasLagrimas);
        }

        animarCiudadDeLasLagrimas();
    }
});