let carrito = [];

const carritoHeader = document.getElementById('mnm-carrito-header');
const carritoItems = document.getElementById('mnm-carrito-items');
const carritoTotal = document.getElementById('mnm-carrito-total');
const carritoClear = document.getElementById('mnm-carrito-clear');
const carritoSend = document.getElementById('mnm-carrito-send');

// Mostrar u ocultar carrito
carritoHeader.addEventListener('click', () => {
  const display = carritoItems.style.display === 'none' ? 'block' : 'none';
  carritoItems.style.display = display;
  carritoClear.style.display = display;
  carritoSend.style.display = display;
});

// Añadir producto al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

// Vaciar carrito
carritoClear.addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
});

// Actualizar interfaz del carrito
function actualizarCarrito() {
  carritoItems.innerHTML = '';
  let total = 0;
  carrito.forEach((item, i) => {
    total += item.precio;
    const div = document.createElement('div');
    div.innerHTML = `${item.nombre} - ${item.precio}€ `;
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.addEventListener('click', () => eliminarItem(i));
    div.appendChild(btn);
    carritoItems.appendChild(div);
  });
  carritoTotal.innerText = `Total: ${total}€`;
}

// Eliminar un item
function eliminarItem(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Enviar pedido a Formspree
carritoSend.addEventListener('click', () => {
  if(carrito.length === 0){
    alert("Tu carrito está vacío!");
    return;
  }

  const email = prompt("Introduce tu correo para enviar el pedido:");
  if(!email){
    alert("Necesitamos tu correo para enviar el pedido.");
    return;
  }

  const form = document.createElement('form');
  form.action = "https://formspree.io/f/xvgwlzzb"; // tu URL de Formspree
  form.method = "POST";

  carrito.forEach((item, i) => {
    const inputNombre = document.createElement('input');
    inputNombre.type = 'hidden';
    inputNombre.name = `Producto${i+1}_Nombre`;
    inputNombre.value = item.nombre;
    form.appendChild(inputNombre);

    const inputPrecio = document.createElement('input');
    inputPrecio.type = 'hidden';
    inputPrecio.name = `Producto${i+1}_Precio`;
    inputPrecio.value = item.precio;
    form.appendChild(inputPrecio);
  });

  const inputTotal = document.createElement('input');
  inputTotal.type = 'hidden';
  inputTotal.name = 'Total';
  inputTotal.value = carrito.reduce((acc, item) => acc + item.precio, 0);
  form.appendChild(inputTotal);

  const inputEmail = document.createElement('input');
  inputEmail.type = 'hidden';
  inputEmail.name = 'email';
  inputEmail.value = email;
  form.appendChild(inputEmail);

  document.body.appendChild(form);
  form.submit();
});

// Oculto al cargar
carritoItems.style.display = 'none';
carritoClear.style.display = 'none';
carritoSend.style.display = 'none';
