document.addEventListener('DOMContentLoaded', () => {

    // 1. MENÚ RESPONSIVE (TOGGLE EN MÓVILES)
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Cierra el menú al hacer clic en cualquier enlace
        document.querySelectorAll('.nav-menu a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. PANEL INTERACTIVO DE HABILIDADES
    const tarjetasHabilidades = document.querySelectorAll('.tarjeta-habilidad');
    const panelInfo = document.getElementById('infoHabilidad');

    tarjetasHabilidades.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            // Remover clase activa de todas las demás tarjetas
            tarjetasHabilidades.forEach(t => t.classList.remove('activa'));
            
            // Activar la tarjeta seleccionada
            tarjeta.classList.add('activa');

            // Obtener información del atributo data-info y colocarla en el panel
            const info = tarjeta.getAttribute('data-info');
            if (panelInfo && info) {
                panelInfo.innerHTML = `<p>${info}</p>`;
            }
        });
    });

    // 3. EFECTO DE LLUVIA / PARTÍCULAS (CIUDAD DE LAS LÁGRIMAS)
    const canvas = document.getElementById('bg-particulas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function ajustarTamanoCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        ajustarTamanoCanvas();
        window.addEventListener('resize', ajustarTamanoCanvas);

        // Crear gotas de lluvia
        const cantidadGotas = 80;
        const gotas = [];

        for (let i = 0; i < cantidadGotas; i++) {
            gotas.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                longitud: Math.random() * 18 + 10,
                velocidad: Math.random() * 4 + 4,
                opacidad: Math.random() * 0.4 + 0.1
            });
        }

        // Bucle de animación
        function animarLluvia() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            gotas.forEach(gota => {
                ctx.beginPath();
                ctx.moveTo(gota.x, gota.y);
                ctx.lineTo(gota.x - 1, gota.y + gota.longitud); // Ligera inclinación en la caída
                ctx.strokeStyle = `rgba(56, 189, 248, ${gota.opacidad})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Actualizar posición Y
                gota.y += gota.velocidad;

                // Reiniciar gota al salir de la pantalla
                if (gota.y > canvas.height) {
                    gota.y = -gota.longitud;
                    gota.x = Math.random() * canvas.width;
                }
            });

            requestAnimationFrame(animarLluvia);
        }

        animarLluvia();
    }
});