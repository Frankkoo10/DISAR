// ====================================================================
// 1. CONFIGURACIÓN DE SUPABASE
// ====================================================================
// TUS DATOS REALES YA CONECTADOS
const SUPABASE_URL = 'https://bflpqaqzerynxpzgoupi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmbHBxYXF6ZXJ5bnhwemdvdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MTIzMjksImV4cCI6MjEwMDE4ODMyOX0.5N368Fkp7la20lSOnDImBNh0pu6if3dPmY4C4bvS0Ng';

// CORRECCIÓN: Cambiamos "supabase" a "supabaseClient" para evitar conflicto con el CDN
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ====================================================================
// DATOS DE PRUEBA ACTUALIZADOS (Con Variantes: Color + Talle + Stock)
// ====================================================================
const MOCK_PRODUCTS = [
    {
        id: 1, name: "Heavyweight Boxy Tee 'Midnight'", category: "remeras", price: 32000, is_popular: true, is_latest_drop: true,
        image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        description: "Remera oversize de algodón pesado 280g. Corte boxy fit impecable con cuello reforzado. Caída perfecta para un outfit drip de alta gama.",
        variants: [
            { color: "Negro Onyx", color_hex: "#0a0a0a", size: "S", stock: 5 },
            { color: "Negro Onyx", color_hex: "#0a0a0a", size: "M", stock: 10 },
            { color: "Negro Onyx", color_hex: "#0a0a0a", size: "L", stock: 0 },
            { color: "Blanco Hielo", color_hex: "#f5f5f5", size: "M", stock: 4 },
            { color: "Blanco Hielo", color_hex: "#f5f5f5", size: "L", stock: 8 }
        ]
    },
    {
        id: 2, name: "Drip Hoodie 'Onyx & Snow'", category: "buzos", price: 65000, is_popular: true, is_latest_drop: true,
        image_url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
        description: "Buzo canguro con capucha pesada de doble tela. Interior frizado premium, calce relajado y puños ajustados para potenciar la silueta oversize.",
        variants: [
            { color: "Negro Profundo", color_hex: "#111111", size: "M", stock: 3 },
            { color: "Negro Profundo", color_hex: "#111111", size: "L", stock: 5 },
            { color: "Gris Grafito", color_hex: "#4a4f55", size: "L", stock: 2 },
            { color: "Gris Grafito", color_hex: "#4a4f55", size: "XL", stock: 6 }
        ]
    },
    {
        id: 3, name: "Cargo Pants 'Tactical Dark'", category: "pantalones", price: 58000, is_popular: true, is_latest_drop: false,
        image_url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
        description: "Pantalón cargo con múltiples bolsillos utilitarios, herrajes mate y cordones de ajuste en el tobillo para regular la caída sobre las zapatillas.",
        variants: [
            { color: "Negro Táctico", color_hex: "#1a1a1a", size: "S", stock: 2 },
            { color: "Negro Táctico", color_hex: "#1a1a1a", size: "M", stock: 5 },
            { color: "Verde Oliva", color_hex: "#3b4537", size: "M", stock: 4 },
            { color: "Verde Oliva", color_hex: "#3b4537", size: "L", stock: 1 }
        ]
    },
    {
        id: 4, name: "Sneakers 'Chunky Drip V1'", category: "zapatillas", price: 120000, is_popular: true, is_latest_drop: true,
        image_url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
        description: "Zapatillas de suela gruesa con diseño arquitectónico en cuero y malla transpirable. Exclusivas.",
        variants: [
            { color: "Triple Black", color_hex: "#050505", size: "40", stock: 2 },
            { color: "Triple Black", color_hex: "#050505", size: "41", stock: 5 },
            { color: "Bone White", color_hex: "#e3e1dc", size: "42", stock: 4 },
            { color: "Bone White", color_hex: "#e3e1dc", size: "43", stock: 0 }
        ]
    },
    {
        id: 5, name: "Beanie Gorro 'Knit Logo'", category: "gorros", price: 18000, is_popular: false, is_latest_drop: true,
        image_url: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80",
        description: "Gorro tejido acrílico de alta densidad con bordado frontal de la marca en hilo de plata.",
        variants: [
            { color: "Negro", color_hex: "#000000", size: "ÚNICO", stock: 15 }
        ]
    },
    {
        id: 6, name: "Denim Jeans 'Washed Baggy'", category: "jeans", price: 62000, is_popular: false, is_latest_drop: false,
        image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
        description: "Jeans con lavado especial desgastado y corte baggy extremo al estilo streetwear europeo.",
        variants: [
            { color: "Azul Lavado", color_hex: "#5c718a", size: "38", stock: 2 },
            { color: "Azul Lavado", color_hex: "#5c718a", size: "40", stock: 6 },
            { color: "Gris Oscuro", color_hex: "#33363b", size: "42", stock: 3 }
        ]
    }
];

// Estado de la app
let products = [];
let cart = JSON.parse(localStorage.getItem('drip_cart')) || [];
let currentAuthMode = 'login'; // login, register, reset
let currentUser = null;
let selectedColor = null;
let selectedSize = null;
let currentProduct = null;

// ====================================================================
// 2. INICIALIZACIÓN Y CARGA DE DATOS
// ====================================================================
window.addEventListener('DOMContentLoaded', async () => {
    await fetchProducts();
    updateCartUI();
    checkAuthSession();
    startSlider();
});

// Función para obtener productos desde Supabase pidiendo las variantes
async function fetchProducts() {
    try {
        // CORRECCIÓN: Usamos supabaseClient
        const { data, error } = await supabaseClient
            .from('products')
            .select('*, variants:product_variants(*)');

        if (error || !data || data.length === 0) {
            console.log("Usando datos de prueba (Conecta tu Supabase para datos reales)");
            products = MOCK_PRODUCTS;
        } else {
            products = data;
        }
    } catch (e) {
        products = MOCK_PRODUCTS;
    }
    renderAllGrids();
}

// Renderizar las tarjetas en las distintas pestañas
function renderAllGrids() {
    renderGrid('grid-populares', products.filter(p => p.is_popular));
    renderGrid('grid-ultimo-drop', products.filter(p => p.is_latest_drop));
    renderGrid('grid-indumentaria', products.filter(p => p.category !== 'zapatillas'));
    renderGrid('grid-zapatillas', products.filter(p => p.category === 'zapatillas'));
    lucide.createIcons();
}

function renderGrid(elementId, items) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    if (items.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-sm col-span-full text-center py-10">Próximamente nuevos lanzamientos en esta categoría.</p>`;
        return;
    }

    container.innerHTML = items.map(p => `
        <div onclick="openProductModal(${p.id})" class="drip-card bg-[#121212] border border-white/5 cursor-pointer group rounded-sm overflow-hidden flex flex-col justify-between">
            <div class="relative aspect-[4/5] bg-black overflow-hidden">
                <img src="${p.image_url}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100">
                ${p.is_latest_drop ? '<span class="absolute top-2 left-2 md:top-3 md:left-3 bg-white text-black font-bold text-[8px] md:text-[9px] uppercase px-1.5 py-0.5 md:px-2 md:py-0.5 tracking-widest">NEW DROP</span>' : ''}
            </div>
            <div class="p-2.5 sm:p-4 flex flex-col justify-between flex-grow">
                <div>
                    <span class="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest block font-bold">${p.category}</span>
                    <h4 class="font-['Syne'] font-bold text-xs sm:text-base uppercase mt-1 tracking-tight text-white group-hover:text-gray-300 transition line-clamp-1">${p.name}</h4>
                </div>
                <div class="flex justify-between items-center mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-white/5">
                    <span class="font-bold text-xs sm:text-sm text-gray-200">$${p.price.toLocaleString('es-AR')}</span>
                    <span class="text-[9px] sm:text-[10px] uppercase tracking-widest underline text-gray-400 group-hover:text-white">Ver Talles</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ====================================================================
// 3. SISTEMA DE PESTAÑAS Y FILTROS
// ====================================================================
function switchTab(tabId) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('block'));
    
    // Mostrar la elegida
    const selectedTab = document.getElementById(`tab-${tabId}`);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
        selectedTab.classList.add('block');
    }

    // Actualizar estilos de barra de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-white', 'border-white');
        link.classList.add('text-gray-400', 'border-transparent');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterCategory(category) {
    switchTab('indumentaria');
    const title = document.getElementById('indumentaria-title');
    
    if (category === 'all') {
        title.innerText = "Toda la Indumentaria";
        renderGrid('grid-indumentaria', products.filter(p => p.category !== 'zapatillas'));
    } else {
        title.innerText = `Categoría: ${category.toUpperCase()}`;
        renderGrid('grid-indumentaria', products.filter(p => p.category === category));
    }
    lucide.createIcons();
}

// ====================================================================
// 4. SLIDER AUTOMÁTICO EN EL HERO
// ====================================================================
let currentSlide = 0;
function startSlider() {
    setInterval(() => nextSlide(), 5000); // Cambia cada 5 segundos
}
function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if(slides.length === 0) return;
    slides[currentSlide].classList.replace('opacity-100', 'opacity-0');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.replace('opacity-0', 'opacity-100');
}
function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    if(slides.length === 0) return;
    slides[currentSlide].classList.replace('opacity-100', 'opacity-0');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.replace('opacity-0', 'opacity-100');
}

// ====================================================================
// 5. MODALES Y CARRITO DE COMPRAS
// ====================================================================
function openModal(id) { 
    const el = document.getElementById(id);
    if (el) {
        el.classList.remove('hidden');
        el.classList.add('flex');
    }
}
function closeModal(id) { 
    const el = document.getElementById(id);
    if (el) {
        el.classList.add('hidden');
        el.classList.remove('flex');
    }
}

// ABRIR MODAL CON COLORES Y TALLES
function openProductModal(productId) {
    currentProduct = products.find(item => item.id === productId);
    if (!currentProduct) return;

    // Resetear selecciones previas
    selectedColor = null;
    selectedSize = null;

    document.getElementById('modal-img').src = currentProduct.image_url;
    document.getElementById('modal-category').innerText = currentProduct.category;
    document.getElementById('modal-title').innerText = currentProduct.name;
    document.getElementById('modal-price').innerText = `$${currentProduct.price.toLocaleString('es-AR')}`;
    document.getElementById('modal-desc').innerText = currentProduct.description || "Prenda exclusiva de alta calidad con corte streetwear.";
    
    document.getElementById('selected-color-name').innerText = "";
    document.getElementById('modal-stock-status').innerText = "Seleccioná un color primero";
    document.getElementById('modal-stock-status').className = "text-gray-500 text-[11px]";

    // AGRUPAR VARIANTES POR COLOR (Evita círculos duplicados)
    const uniqueColorVariants = [];
    const colorsSeen = new Set();

    if (currentProduct.variants) {
        currentProduct.variants.forEach(variant => {
            const colorNormalized = (variant.color || '').trim().toLowerCase();
            if (colorNormalized && !colorsSeen.has(colorNormalized)) {
                colorsSeen.add(colorNormalized);
                uniqueColorVariants.push(variant); // Guardamos la primera variante de cada color
            }
        });
    }

    // Dibujar botones de colores (uno solo por color)
    const colorsContainer = document.getElementById('modal-colors');
    if (uniqueColorVariants.length === 0) {
        colorsContainer.innerHTML = `<span class="text-xs text-gray-500">Sin variantes disponibles</span>`;
    } else {
        colorsContainer.innerHTML = uniqueColorVariants.map(v => {
            const colorHex = v.color_hex || v.color;
            return `
                <button onclick="selectColor('${v.color}', this)" class="color-btn flex items-center gap-2 px-3 py-1.5 border border-white/20 bg-black hover:border-white transition rounded-full text-xs">
                    <span class="w-3.5 h-3.5 rounded-full border border-white/40 inline-block" style="background-color: ${colorHex};"></span>
                    <span>${v.color}</span>
                </button>
            `;
        }).join('');
    }

    // Limpiar talles hasta que elijan un color
    document.getElementById('modal-sizes').innerHTML = `<p class="text-gray-500 text-xs italic">Elegí un color arriba para ver los talles en stock.</p>`;

    // Resetear botón de compra
    const addBtn = document.getElementById('modal-add-btn');
    addBtn.innerText = "Seleccioná Color y Talle";
    addBtn.classList.add('opacity-50', 'pointer-events-none');

    openModal('product-modal');
    lucide.createIcons();

    // Auto-seleccionar el primer color por defecto
    if (uniqueColorVariants.length > 0) {
        setTimeout(() => {
            const firstColorBtn = colorsContainer.querySelector('.color-btn');
            if (firstColorBtn) selectColor(uniqueColorVariants[0].color, firstColorBtn);
        }, 20);
    }
}

// SELECCIONAR COLOR
function selectColor(colorName, btnElement) {
    selectedColor = colorName;
    selectedSize = null; // Reseteamos el talle si cambia de color

    document.getElementById('selected-color-name').innerText = `(${colorName})`;

    // Resaltar botón de color seleccionado
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('border-white', 'bg-white/10', 'font-bold'));
    if (btnElement) btnElement.classList.add('border-white', 'bg-white/10', 'font-bold');

    // Filtrar qué talles existen PARA ESTE COLOR exacto
    const availableVariants = (currentProduct.variants || []).filter(
        v => (v.color || '').trim().toLowerCase() === colorName.trim().toLowerCase()
    );

    // CAMBIAR LA IMAGEN SEGÚN EL COLOR (Si existe la columna image_url)
    const imgEl = document.getElementById('modal-img');
    const variantWithImg = availableVariants.find(v => v.image_url);
    if (variantWithImg && variantWithImg.image_url) {
        imgEl.style.opacity = '0.5';
        setTimeout(() => {
            imgEl.src = variantWithImg.image_url;
            imgEl.style.opacity = '1';
        }, 150);
    } else {
        imgEl.src = currentProduct.image_url;
    }

    // Dibujar botones de talles para este color
    const sizesContainer = document.getElementById('modal-sizes');
    sizesContainer.innerHTML = availableVariants.map(v => {
        const isOut = v.stock <= 0;
        return `
            <button onclick="selectSize('${v.size}', ${v.stock}, this)" 
                ${isOut ? 'disabled' : ''}
                class="size-btn px-4 py-2 text-xs font-bold border ${isOut ? 'border-white/5 text-gray-600 bg-black/40 cursor-not-allowed line-through' : 'border-white/30 text-white hover:border-white bg-black'} transition rounded-sm">
                ${v.size} ${isOut ? '(Agotado)' : ''}
            </button>
        `;
    }).join('');

    document.getElementById('modal-stock-status').innerText = "Ahora elegí tu talle";
    document.getElementById('modal-stock-status').className = "text-gray-300 text-[11px]";

    const addBtn = document.getElementById('modal-add-btn');
    addBtn.innerText = `Seleccioná un Talle para ${colorName}`;
    addBtn.classList.add('opacity-50', 'pointer-events-none');
}

// SELECCIONAR TALLE
function selectSize(size, stock, btnElement) {
    selectedSize = size;

    // Resaltar botón de talle seleccionado
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('bg-white', 'text-black', 'border-white'));
    btnElement.classList.add('bg-white', 'text-black', 'border-white');

    // Mostrar estado de stock
    const statusEl = document.getElementById('modal-stock-status');
    statusEl.innerText = `¡Stock Disponible! (${stock} unidades)`;
    statusEl.className = "text-green-400 font-bold text-[11px]";

    // Habilitar botón de compra
    const addBtn = document.getElementById('modal-add-btn');
    addBtn.innerHTML = `<i data-lucide="shopping-bag" class="w-4 h-4"></i> Agregar al Carrito (${selectedColor} - ${size})`;
    addBtn.classList.remove('opacity-50', 'pointer-events-none');
    addBtn.onclick = () => addToCart();
    lucide.createIcons();
}

// AGREGAR AL CARRITO (Con Color y Talle)
function addToCart() {
    if (!selectedColor || !selectedSize || !currentProduct) return;

    // Buscamos la imagen del color seleccionado para el carrito, sino dejamos la por defecto
    const variantWithImg = (currentProduct.variants || []).find(v => 
        (v.color || '').trim().toLowerCase() === selectedColor.trim().toLowerCase() && v.image_url
    );
    const imageUrlToUse = (variantWithImg && variantWithImg.image_url) ? variantWithImg.image_url : currentProduct.image_url;

    // Verificar si ya está exactamente el mismo producto, en el mismo color y mismo talle en el carrito
    const existingIndex = cart.findIndex(item => 
        item.id === currentProduct.id && 
        item.color === selectedColor && 
        item.size === selectedSize
    );

    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image_url: imageUrlToUse,
            color: selectedColor,
            size: selectedSize,
            qty: 1
        });
    }

    saveAndRefreshCart();
    closeModal('product-modal');
    toggleCart(); // Abrimos el carrito lateral para mostrar que se agregó
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveAndRefreshCart();
}

function saveAndRefreshCart() {
    localStorage.setItem('drip_cart', JSON.stringify(cart));
    updateCartUI();
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
        drawer.classList.add('flex');
    } else {
        drawer.classList.add('hidden');
        drawer.classList.remove('flex');
    }
}

function updateCartUI() {
    // Actualizar burbuja contadora en la nav
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').innerText = totalQty;

    // Dibujar lista dentro del drawer
    const container = document.getElementById('cart-items-container');
    if (cart.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-sm text-center py-10">Tu carrito está vacío. Sumá algo de drip.</p>`;
        document.getElementById('cart-total').innerText = "$0";
        return;
    }

    let totalPrice = 0;
    container.innerHTML = cart.map((item, index) => {
        totalPrice += item.price * item.qty;
        return `
            <div class="flex items-center justify-between border-b border-white/5 pb-4">
                <div class="flex items-center gap-3">
                    <img src="${item.image_url}" alt="${item.name}" class="w-14 h-16 object-cover bg-black">
                    <div>
                        <h5 class="font-['Syne'] text-xs uppercase font-bold text-white line-clamp-1">${item.name}</h5>
                        <p class="text-gray-400 text-[10px] uppercase mt-0.5">Color: <span class="text-white font-bold">${item.color || 'N/A'}</span> | Talle: <span class="text-white font-bold">${item.size}</span> | Cant: ${item.qty}</p>
                        <p class="font-bold text-xs text-gray-200 mt-1">$${(item.price * item.qty).toLocaleString('es-AR')}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="text-gray-500 hover:text-red-500 p-1"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
        `;
    }).join('');

    document.getElementById('cart-total').innerText = `$${totalPrice.toLocaleString('es-AR')}`;
    lucide.createIcons();
}

// ====================================================================
// FINALIZAR COMPRA: GUARDAR EN SUPABASE Y REDIRIGIR A WHATSAPP
// ====================================================================
async function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // 1. Calcular el precio total del carrito
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // 2. Si el usuario inició sesión, guardamos el pedido en la tabla 'orders' de Supabase
    if (currentUser) {
        try {
            await supabase.from('orders').insert([
                {
                    user_id: currentUser.id,
                    total_price: totalPrice,
                    status: 'pendiente_whatsapp',
                    items: cart
                }
            ]);
        } catch (err) {
            console.log("Aviso: No se pudo registrar la orden en Supabase, continuando con WhatsApp...", err);
        }
    }

    // 3. Armar el mensaje estructurado para WhatsApp
    let mensaje = "¡Hola!  Vengo de la web y quiero confirmar este pedido:\n\n";
    
    cart.forEach((item, index) => {
        mensaje += `${index + 1}. *${item.name}*\n`;
        mensaje += `   - Color: ${item.color}\n`;
        mensaje += `   - Talle: ${item.size}\n`;
        mensaje += `   - Cantidad: ${item.qty}\n`;
        mensaje += `   - Subtotal: $${(item.price * item.qty).toLocaleString('es-AR')}\n\n`;
    });

    mensaje += ` *TOTAL A PAGAR: $${totalPrice.toLocaleString('es-AR')}*\n\n`;
    if (currentUser) {
        mensaje += ` Usuario registrado: ${currentUser.email}\n`;
    }
    mensaje += "Por favor, ¿me pasás los datos de pago para avanzar?";

    // ====================================================================
    // ⚠️ CONFIGURÁ TU NÚMERO DE WHATSAPP ACÁ ⚠️
    // Formato internacional sin símbolos: Código de país + área sin 0 + número
    // Ejemplo Argentina (Buenos Aires): 5491123456789
    // ====================================================================
    const tuNumeroWhatsApp = "5491132555791"; 

    const urlWhatsApp = `https://wa.me/${tuNumeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // 4. Vaciar el carrito localmente, actualizar la interfaz y cerrar el drawer
    cart = [];
    saveAndRefreshCart();
    toggleCart();

    // 5. Abrir el chat de WhatsApp con el mensaje redactado
    window.open(urlWhatsApp, '_blank');
}
// ====================================================================
// 6. AUTENTICACIÓN Y USUARIOS CON SUPABASE
// ====================================================================
async function checkAuthSession() {
    // CORRECCIÓN: Usamos supabaseClient
    const { data: { session } } = await supabaseClient.auth.getSession();
    updateAuthUI(session ? session.user : null);

    // CORRECCIÓN: Usamos supabaseClient
    supabaseClient.auth.onAuthStateChange((_event, session) => {
        updateAuthUI(session ? session.user : null);
    });
}

function updateAuthUI(user) {
    currentUser = user;
    const btnText = document.getElementById('auth-btn-text');
    if (user) {
        btnText.innerText = "Mi Cuenta (" + user.email.split('@')[0] + ")";
        document.getElementById('auth-btn').onclick = () => {
            if(confirm("¿Deseas cerrar sesión?")) {
                // CORRECCIÓN: Usamos supabaseClient
                supabaseClient.auth.signOut();
            }
        };
    } else {
        btnText.innerText = "Iniciar Sesión";
        document.getElementById('auth-btn').onclick = () => openModal('auth-modal');
    }
}

function toggleAuthMode(mode) {
    currentAuthMode = mode;
    const title = document.getElementById('auth-title');
    const submitBtn = document.getElementById('auth-submit-btn');
    const passField = document.getElementById('password-field');
    const toggleText = document.getElementById('toggle-auth-text');

    if (mode === 'login') {
        title.innerText = "Iniciar Sesión";
        submitBtn.innerText = "Ingresar";
        passField.style.display = 'block';
        toggleText.innerHTML = `¿No tenés cuenta? <a href="#" onclick="toggleAuthMode('register')" class="text-white underline font-bold">Registrate acá</a>`;
    } else if (mode === 'register') {
        title.innerText = "Crear Cuenta Drip";
        submitBtn.innerText = "Registrarme";
        passField.style.display = 'block';
        toggleText.innerHTML = `¿Ya tenés cuenta? <a href="#" onclick="toggleAuthMode('login')" class="text-white underline font-bold">Iniciá Sesión</a>`;
    } else if (mode === 'reset') {
        title.innerText = "Recuperar Contraseña";
        submitBtn.innerText = "Enviar correo de recuperación";
        passField.style.display = 'none';
        toggleText.innerHTML = `Volver al <a href="#" onclick="toggleAuthMode('login')" class="text-white underline font-bold">Login</a>`;
    }
}

async function handleAuth(event) {
    event.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-pass').value;

    try {
        if (currentAuthMode === 'login') {
            // CORRECCIÓN: Usamos supabaseClient
            const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) throw error;
            closeModal('auth-modal');
            alert("¡Bienvenido al Drip!");
        } else if (currentAuthMode === 'register') {
            // CORRECCIÓN: Usamos supabaseClient
            const { error } = await supabaseClient.auth.signUp({ email, password });
            if (error) throw error;
            alert("Cuenta creada con éxito. Revisá tu correo para confirmar o iniciá sesión.");
            toggleAuthMode('login');
        } else if (currentAuthMode === 'reset') {
            // CORRECCIÓN: Usamos supabaseClient
            const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
            if (error) throw error;
            alert("Te enviamos un correo con las instrucciones para cambiar tu contraseña.");
            closeModal('auth-modal');
        }
    } catch (err) {
        alert("Error de Supabase: " + err.message);
    }
}