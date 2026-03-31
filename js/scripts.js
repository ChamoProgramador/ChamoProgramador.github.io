// script.js - Copia todo esto

// Datos de mascotas (puedes agregar más)
const mascotas = [
    {
        id: 1,
        nombre: "Luna",
        tipo: "perro",
        edad: "2 años",
        tamaño: "Mediano",
        descripcion: "Muy juguetona y cariñosa, le encanta correr y jugar con niños.",
        imagen: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        nombre: "Max",
        tipo: "perro",
        edad: "3 años",
        tamaño: "Grande",
        descripcion: "Leal y protector, ideal para familias activas.",
        imagen: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        nombre: "Mia",
        tipo: "gato",
        edad: "1 año",
        tamaño: "Pequeño",
        descripcion: "Tranquila y cariñosa, le gustan las caricias y las siestas al sol.",
        imagen: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        nombre: "Simba",
        tipo: "gato",
        edad: "4 años",
        tamaño: "Mediano",
        descripcion: "Independiente y curioso, se lleva bien con otros gatos.",
        imagen: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        nombre: "Rocky",
        tipo: "perro",
        edad: "6 meses",
        tamaño: "Pequeño",
        descripcion: "Cachorro lleno de energía, busca una familia que le enseñe con amor.",
        imagen: "https://images.unsplash.com/photo-1598137030340-c506ef56a5d2?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        nombre: "Lola",
        tipo: "gato",
        edad: "2 años",
        tamaño: "Pequeño",
        descripcion: "Muy sociable y juguetona, perfecta para departamento.",
        imagen: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop"
    }
];

// Función para mostrar las mascotas en la cuadrícula
function mostrarMascotas(tipo = "todos") {
    const grid = document.getElementById("grid-mascotas");
    if (!grid) return;

    // Filtrar según tipo
    let mascotasFiltradas = mascotas;
    if (tipo !== "todos") {
        mascotasFiltradas = mascotas.filter(m => m.tipo === tipo);
    }

    // Si no hay mascotas
    if (mascotasFiltradas.length === 0) {
        grid.innerHTML = '<div class="loading">No hay mascotas disponibles en esta categoría 🐾</div>';
        return;
    }

    // Generar HTML de las tarjetas
    grid.innerHTML = mascotasFiltradas.map(mascota => `
        <div class="tarjeta">
            <img src="${mascota.imagen}" alt="${mascota.nombre}" loading="lazy">
            <div class="tarjeta-content">
                <h3>${mascota.nombre}</h3>
                <p><strong>${mascota.tipo === "perro" ? "🐕 Perro" : "🐱 Gato"}</strong></p>
                <p>📅 Edad: ${mascota.edad}</p>
                <p>📏 Tamaño: ${mascota.tamaño}</p>
                <p>💭 ${mascota.descripcion}</p>
                <button class="btn" onclick="interesar('${mascota.nombre}')">Me interesa</button>
            </div>
        </div>
    `).join("");
}

// Función para cuando alguien hace clic en "Me interesa"
window.interesar = function(nombre) {
    alert(`¡Gracias por tu interés en ${nombre}! 💕\nCompleta el formulario para continuar con el proceso de adopción.`);
    // Desplazar suavemente al formulario
    document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
    
    // Opcional: pre-seleccionar la mascota en el select del formulario
    const selectMascota = document.getElementById("mascota");
    if (selectMascota) {
        const option = Array.from(selectMascota.options).find(opt => opt.value === nombre || opt.text.includes(nombre));
        if (option) selectMascota.value = option.value;
    }
};

// Configurar los filtros
function setupFiltros() {
    const botones = document.querySelectorAll(".filtro-btn");
    if (!botones.length) return;
    
    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            // Cambiar clase activa
            botones.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const tipo = btn.getAttribute("data-tipo");
            mostrarMascotas(tipo);
        });
    });
}

// Llenar el select de mascotas en el formulario
function llenarSelectMascotas() {
    const select = document.getElementById("mascota");
    if (!select) return;
    
    select.innerHTML = '<option value="">Selecciona una mascota</option>' + 
        mascotas.map(m => `<option value="${m.nombre}">${m.nombre} - ${m.tipo === "perro" ? "Perro" : "Gato"} (${m.edad})</option>`).join("");
}

// Manejar envío del formulario
function setupFormulario() {
    const form = document.getElementById("form-adopcion");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Obtener datos (esto se enviará a Firebase más adelante)
        const nombre = document.getElementById("nombre")?.value || "";
        const email = document.getElementById("email")?.value || "";
        const telefono = document.getElementById("telefono")?.value || "";
        const mascota = document.getElementById("mascota")?.value || "";
        const motivo = document.getElementById("motivo")?.value || "";
        const experiencia = document.getElementById("experiencia")?.value || "";
        
        // Validación simple
        if (!nombre || !email || !mascota || !motivo) {
            mostrarMensaje("Por favor completa todos los campos obligatorios (*)", "error");
            return;
        }
        
        // Simulación de envío (luego se reemplazará por Firebase)
        console.log("Solicitud enviada:", { nombre, email, telefono, mascota, motivo, experiencia });
        
        mostrarMensaje("✅ ¡Solicitud enviada con éxito! En breve nos pondremos en contacto contigo. ¡Gracias por dar el paso de adoptar! 🐾", "success");
        form.reset();
    });
}

function mostrarMensaje(texto, tipo) {
    const contenedor = document.getElementById("form-mensaje");
    if (!contenedor) return;
    
    contenedor.innerHTML = `<p style="color: ${tipo === "success" ? "#28a745" : "#dc3545"}; background: ${tipo === "success" ? "#d4edda" : "#f8d7da"}; padding: 1rem; border-radius: 8px;">${texto}</p>`;
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        contenedor.innerHTML = "";
    }, 5000);
}

// Menú hamburguesa para móviles
function setupMenuMobile() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    mostrarMascotas();
    setupFiltros();
    llenarSelectMascotas();
    setupFormulario();
    setupMenuMobile();
});
