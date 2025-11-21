// Obtener el parámetro id de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Base de datos TOTAL de productos (8 destacados + 12 de ver más)
const productos = {
  // ----- DESTACADOS -----
  teclado: {
    nombre: "Teclado Mecánico RGB",
    imagen: "src/img/teclado.png",
    precio: 49.99,
    descripcion:
      "Teclado mecánico con retroiluminación RGB y switches táctiles que ofrecen precisión y durabilidad. Ideal para gamers y programadores que buscan una experiencia fluida. Su estructura reforzada garantiza estabilidad en sesiones intensas.",
    descripcionLarga:
      "Este teclado mecánico cuenta con iluminación RGB completamente personalizable y switches de alta respuesta diseñados para resistir millones de pulsaciones. Su construcción sólida reduce vibraciones y ofrece una sensación profesional al escribir o jugar. Es perfecto para quienes buscan comodidad, precisión y estilo en su setup."
  },

  mousepad: {
    nombre: "Mousepad Gamer XL",
    imagen: "src/img/mousepad.png",
    precio: 29.99,
    descripcion:
      "Mousepad extendido con textura optimizada para sensores ópticos y láser. Su base antideslizante evita movimientos involuntarios. Perfecto para setups amplios y juegos competitivos.",
    descripcionLarga:
      "Este mousepad XL ofrece una superficie suave diseñada para mejorar la precisión del cursor, brindando un movimiento fluido y controlado. Su material resistente al desgaste garantiza una larga duración aun con uso intensivo. Ideal para jugadores que buscan estabilidad y amplitud en su área de trabajo."
  },

  audifonos: {
    nombre: "Audífonos Inalámbricos",
    imagen: "src/img/audifonos.png",
    precio: 59.99,
    descripcion:
      "Audífonos cómodos con sonido envolvente y graves profundos. Incluyen micrófono retráctil para mayor claridad en llamadas o juegos. Su batería de larga duración permite horas de uso continuo.",
    descripcionLarga:
      "Disfruta de una experiencia auditiva envolvente con estos audífonos inalámbricos que ofrecen un sonido claro y potente. Su diseño acolchado brinda comodidad prolongada, mientras que su micrófono retráctil mejora la comunicación en juegos y reuniones. Conectividad estable y carga rápida los convierten en un accesorio indispensable."
  },

  monitor: {
    nombre: "Monitor 27'' 144Hz",
    imagen: "src/img/monitor.png",
    precio: 199.99,
    descripcion:
      "Monitor de 27 pulgadas con panel Full HD y alta tasa de refresco de 144Hz. Ideal para gaming competitivo. Su tiempo de respuesta de 1ms garantiza imágenes más fluidas.",
    descripcionLarga:
      "Este monitor de 27'' brinda una experiencia visual fluida y nítida gracias a sus 144Hz y su capacidad de respuesta ultrarrápida. Diseñado para juegos de alta velocidad, reduce el desenfoque de movimiento y mejora la precisión visual. Su diseño moderno y marcos delgados encaja en cualquier setup profesional o gamer."
  },

  silla: {
    nombre: "Silla Gamer Ergonómica",
    imagen: "src/img/silla.png",
    precio: 149.99,
    descripcion:
      "Silla ergonómica con soporte lumbar ajustable y materiales acolchados. Proporciona postura cómoda por largas horas. Su diseño gamer mejora cualquier setup.",
    descripcionLarga:
      "Esta silla gamer está diseñada para ofrecer soporte prolongado gracias a su ergonomía avanzada. Incluye soporte lumbar ajustable, reposabrazos cómodos y espuma de alta densidad que reduce la fatiga. Su estructura robusta garantiza estabilidad incluso en sesiones largas de trabajo o gaming."
  },

  mouse: {
    nombre: "Mouse Óptico RGB",
    imagen: "src/img/mouse.png",
    precio: 9.99,
    descripcion:
      "Mouse ligero con sensor óptico preciso y efectos RGB dinámicos. Ideal para uso diario. Su diseño cómodo se adapta a cualquier estilo de agarre.",
    descripcionLarga:
      "Este mouse presenta un sensor óptico de alta precisión ideal para tareas cotidianas y videojuegos. Su iluminación RGB personalizable añade estilo al setup, mientras que su estructura ligera ofrece un control cómodo. Su diseño ambidiestro lo hace adecuado para distintos usuarios."
  },

  microfono: {
    nombre: "Micrófono Profesional",
    imagen: "src/img/microfono.png",
    precio: 79.99,
    descripcion:
      "Micrófono condensador con filtro antipop y calidad profesional. Ideal para streaming, grabaciones y videollamadas. Ofrece sonido claro y limpio.",
    descripcionLarga:
      "Este micrófono de condensador captura audio con alta fidelidad, eliminando ruidos externos y mejorando la claridad. Incluye soporte ajustable, filtro antipop y conexión universal. Perfecto para creadores de contenido, músicos y streamers que buscan calidad profesional sin complicaciones."
  },

  webcam: {
    nombre: "Webcam Full HD",
    imagen: "src/img/webcam.png",
    precio: 69.99,
    descripcion:
      "Cámara web 1080p con autoenfoque rápido y micrófono integrado. Ofrece videollamadas nítidas y fluidas. Ideal para trabajo remoto y streaming.",
    descripcionLarga:
      "Esta webcam Full HD proporciona imágenes claras en 1080p con un sistema de autoenfoque inteligente que mantiene la nitidez incluso en movimiento. Su micrófono integrado capta la voz con gran precisión. Ideal para videollamadas, clases virtuales y transmisiones."
  },

  // ----- PRODUCTOS DE VER MÁS -----
  cpu1: {
    nombre: "CPU Gamer RGB Ryzen 7",
    imagen:
      "https://tse2.mm.bing.net/th/id/OIP.ievsSF6kj-aDkxG7YrXbSAHaIN",
    precio: 2800000,
    descripcion:
      "CPU de alto rendimiento con procesador Ryzen 7 y sistema RGB. Ideal para gaming exigente y multitarea pesada. Refrigeración optimizada para largas sesiones.",
    descripcionLarga:
      "Esta CPU gamer incorpora un potente Ryzen 7 que ofrece gran velocidad en tareas multitarea y videojuegos AAA. Su diseño con iluminación RGB brinda estilo, mientras que su sistema de refrigeración mantiene temperaturas estables. Perfecto para usuarios que buscan desempeño profesional sin compromisos."
  },

  gpu4070: {
    nombre: "Tarjeta Gráfica RTX 4070",
    imagen:
      "https://tse4.mm.bing.net/th/id/OIP.7_4U5njeNJaRUQv7j70qswHaFc",
    precio: 3200000,
    descripcion:
      "GPU NVIDIA RTX 4070 ideal para gamers y creadores. Permite jugar a 1440p con ray tracing fluido. Rendimiento eficiente y silencioso.",
    descripcionLarga:
      "La RTX 4070 ofrece potencia gráfica de nueva generación, brindando compatibilidad con ray tracing y DLSS para una experiencia visual impresionante. Su eficiencia energética y sistema de enfriamiento avanzado garantizan un rendimiento estable. Ideal para gaming competitivo y creación de contenido profesional."
  },

  asusTUF: {
    nombre: "Placa Madre ASUS TUF B550",
    imagen:
      "https://images.tcdn.com.br/img/img_prod/374123/15558_2_20161017161515.jpg",
    precio: 950000,
    descripcion:
      "Placa madre ASUS TUF con compatibilidad Ryzen y durabilidad militar. Ofrece gran estabilidad y conectividad moderna. Ideal para PCs de alto rendimiento.",
    descripcionLarga:
      "La ASUS TUF B550 está diseñada para ofrecer máxima estabilidad gracias a sus componentes de grado militar. Compatible con procesadores Ryzen, cuenta con ranuras PCIe de alta velocidad y conectividad avanzada. Su diseño robusto garantiza durabilidad y rendimiento sostenido."
  },

  ram16: {
    nombre: "Memoria RAM Corsair 16GB DDR4",
    imagen:
      "https://tse4.mm.bing.net/th/id/OIP.ROK_eorYE7ayi_CdTDaqiQHaEn",
    precio: 420000,
    descripcion:
      "Módulo de 16GB DDR4 con disipador Corsair para mayor rendimiento. Ideal para gaming, edición y multitarea. Estabilidad garantizada.",
    descripcionLarga:
      "Esta memoria RAM Corsair ofrece velocidades avanzadas que mejoran la fluidez en videojuegos, programas de diseño y edición. Su disipador integrado mantiene temperaturas estables incluso bajo carga. Ideal para usuarios que requieren rapidez y eficiencia."
  },

  ssd1tb: {
    nombre: "SSD NVMe 1TB Kingston Fury",
    imagen:
      "https://tse2.mm.bing.net/th/id/OIP.vFgIjT8kaR7QJiJJPmTPFwHaHa",
    precio: 380000,
    descripcion:
      "SSD NVMe ultrarrápido que reduce tiempos de carga y mejora el rendimiento general. Ideal para juegos pesados y aplicaciones profesionales.",
    descripcionLarga:
      "El Kingston Fury NVMe de 1TB ofrece velocidades de lectura y escritura excepcionales, mejorando el arranque del sistema y carga de juegos. Su tecnología de disipación interna evita sobrecalentamientos. Perfecto para configuraciones gamer y profesionales."
  },

  gabineteRGB: {
    nombre: "Gabinete Gamer RGB Tempered Glass",
    imagen:
      "https://cdn.dooca.store/205/products/gabinete-gamer-lian-li-pc-o11d-special-edition-galax-hof-full-tower-lateral-em-vidro-branco-prata-pc-o11-dynamic-white-hof-1593030194-gg_1080x1080.jpg",
    precio: 460000,
    descripcion:
      "Gabinete premium con vidrio templado y diseño RGB. Excelente ventilación para mantener componentes frescos. Espacioso y elegante.",
    descripcionLarga:
      "Este gabinete con paneles de vidrio templado resalta la estética de cualquier setup gamer. Su sistema de ventilación optimizado ofrece flujo de aire eficiente para mantener temperaturas ideales. Con amplio espacio interno, permite una gestión de cables limpia y ordenada."
  },

  fuente750: {
    nombre: "Fuente de Poder 750W 80+ Bronze",
    imagen:
      "https://maxxicomp.com/4514-large_default/fuente-de-poder-gamer-gamemax-vp-700-rgb-modular-80p-bronze.jpg",
    precio: 350000,
    descripcion:
      "Fuente de 750W certificada 80+ Bronze con excelente eficiencia. Silenciosa y segura para equipos gaming y de trabajo.",
    descripcionLarga:
      "Esta fuente de poder ofrece energía estable y eficiente gracias a su certificación 80+ Bronze. Su diseño silencioso y protección contra sobrecargas prolongan la vida útil de los componentes. Ideal para PCs con tarjetas gráficas potentes."
  },

  monitorCurvo: {
    nombre: 'Monitor Curvo 27" 165Hz',
    imagen:
      "https://tse4.mm.bing.net/th/id/OIP.0s1cI1QbBHRG6TcTVNkqjgHaHa",
    precio: 1400000,
    descripcion:
      "Monitor curvo con 165Hz y diseño envolvente. Imágenes fluidas y colores vibrantes. Ideal para gaming inmersivo.",
    descripcionLarga:
      "Este monitor curvo de 27 pulgadas ofrece una experiencia visual envolvente con 165Hz, perfectos para juegos rápidos. Su curvatura ergonomica reduce la fatiga visual y su panel de alta calidad mejora el contraste. Ideal para gamers que buscan inmersión total."
  },

  tecladoRD: {
    nombre: "Teclado Mecánico RGB Redragon",
    imagen:
      "https://th.bing.com/th/id/R.6cf977475a8ff8082de6672db482e9d5?rik=Lul%2fBUT%2fPRuFOA&pid=ImgRaw&r=0",
    precio: 270000,
    descripcion:
      "Teclado Redragon con switches rojos lineales y RGB completo. Alto rendimiento y durabilidad. Ideal para jugadores exigentes.",
    descripcionLarga:
      "El Redragon RGB ofrece una escritura suave y silenciosa gracias a sus switches rojos. Su iluminación completamente personalizable permite adaptarlo a cualquier setup. Construido con materiales resistentes, es ideal para sesiones largas y exigentes."
  },

  mouseG502: {
    nombre: "Mouse Gamer Logitech G502 HERO",
    imagen:
      "https://tse1.mm.bing.net/th/id/OIP.Eh8WOBuqDVozVnwrDGn5JQHaHa",
    precio: 230000,
    descripcion:
      "Mouse gamer con 11 botones programables y sensor HERO de 25K DPI. Precisión extrema para juegos competitivos.",
    descripcionLarga:
      "El Logitech G502 HERO cuenta con uno de los sensores más precisos del mercado, ofreciendo personalización total de peso, botones y sensibilidad. Ideal para jugadores que requieren control absoluto. Su diseño ergonómico garantiza comodidad incluso tras horas de uso."
  },

  hyperx: {
    nombre: "Audífonos Gamer HyperX Cloud II",
    imagen:
      "https://tse2.mm.bing.net/th/id/OIP.ZoararaOiJuOLAK7w_FUngHaHa",
    precio: 420000,
    descripcion:
      "Audífonos HyperX con sonido envolvente 7.1 y comodidad superior. Ideales para largas sesiones de juego.",
    descripcionLarga:
      "Los HyperX Cloud II destacan por su sonido envolvente 7.1 que ofrece inmersión total en juegos y películas. Su diseño acolchado y ligero reduce la fatiga, mientras que su micrófono desmontable garantiza comunicación clara. Perfectos para gamers competitivos."
  },

  refrigeracion: {
    nombre: "Refrigeración Líquida ML360",
    imagen:
      "https://www.winp.es/wp-content/uploads/2023/03/Mars-Gaming-ML360W-mejores-refrigeraciones-liquidas-1030x579.png",
    precio: 850000,
    descripcion:
      "Sistema de refrigeración líquida triple ventilador con gran capacidad térmica. Ideal para procesadores exigentes.",
    descripcionLarga:
      "La ML360 mantiene tu CPU a bajas temperaturas incluso en cargas extremas gracias a su triple ventilador. Su diseño moderno con iluminación RGB mejora el aspecto del setup. Recomendada para equipos de alto rendimiento y overclocking."
  }
};


// ---------- CARGAR DETALLE ----------
if (productos[id]) {
  const p = productos[id];

  document.getElementById("producto-nombre").textContent = p.nombre;
  document.getElementById("producto-imagen").src = p.imagen;
  document.getElementById("producto-precio").textContent = "$" + Number(p.precio).toLocaleString();

  document.getElementById("producto-descripcion").textContent = p.descripcion;
  document.getElementById("producto-descripcion-sec").textContent = p.descripcionLarga;


  // Botón para añadir al carrito
  document.getElementById("adcarrito").addEventListener("click", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(p);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("🛒 Producto añadido al carrito con éxito!");
  });
} else {
  document.body.innerHTML =
    "<h1 style='color:white; text-align:center;'>Producto no encontrado</h1>";
}

// --- CONTROL DEL BOTÓN VOLVER SEGÚN ORIGEN ---
const volverBtn = document.getElementById("volverBtn");

// Lista de IDs que pertenecen a VER MÁS
const productosVerMas = [
  "cpu1", "gpu4070", "asusTUF", "ram16", "ssd1tb", "gabineteRGB",
  "fuente750", "monitorCurvo", "tecladoRD", "mouseG502", "hyperx", "refrigeracion"
];

if (productosVerMas.includes(id)) {
  volverBtn.onclick = () => (window.location.href = "ver_mas.html");
} else {
  volverBtn.onclick = () => (window.location.href = "index.html#productos");
}
