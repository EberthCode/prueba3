document.addEventListener("DOMContentLoaded", () => {
    class Producto {
        constructor(nombre, precio) {
            this.nombre = nombre;
            this.precio = precio;
        }
    }

    class Carrito {
        constructor() {
            this.productos = [];
        }

        agregar(producto) {
            this.productos.push(producto);
            this.actualizarVista(`${producto.nombre} ha sido agregado al carrito`);
        }

        eliminar(nombreProducto) {
            const index = this.productos.findIndex(prod => prod.nombre === nombreProducto);
            if (index !== -1) {
                const productoEliminado = this.productos[index];
                this.productos.splice(index, 1);
                this.actualizarVista(`${productoEliminado.nombre} ha sido eliminado del carrito`);
            } else {
                this.actualizarVista(`${nombreProducto} no se ha encontrado en el carrito`);
            }
        }

        calcular() {
            const subtotal1 = this.productos.reduce((acc, prod) => acc + prod.precio, 0);
            let descuento = 0;
            if (subtotal1 > 3000) {
                descuento = subtotal1 * 0.10; 
            }
            const subtotal2 = subtotal1 - descuento;
            const igv = subtotal2 * 0.18; 
            const total = subtotal2 + igv;

            this.mostrar(subtotal1, descuento, subtotal2, igv, total);
        }

        mostrar(subtotal1, descuento, subtotal2, igv, total) {
            const carritoDiv = document.getElementById('carrito');
            carritoDiv.innerHTML = "<h2>Productos en el carrito:</h2>";

            this.productos.forEach(prod => {
                carritoDiv.innerHTML += `- ${prod.nombre}: ${prod.precio} <br>`;
            });

            carritoDiv.innerHTML += `<p>Subtotal 1: ${subtotal1}</p>`;
            carritoDiv.innerHTML += `<p>Descuento: ${descuento}</p>`;
            carritoDiv.innerHTML += `<p>Subtotal 2: ${subtotal2}</p>`;
            carritoDiv.innerHTML += `<p>IGV (18%): ${igv}</p>`;
            carritoDiv.innerHTML += `<p>Total a Pagar: ${total}</p>`;
        }

        actualizarVista(mensaje) {
            const carritoDiv = document.getElementById('carrito');
            carritoDiv.innerHTML += `<p>${mensaje}</p>`;
        }
    }

    const carrito = new Carrito();

    const botonAgregar = document.getElementById('agregarProducto');
    botonAgregar.addEventListener('click', () => {
        const nombre = document.getElementById('nombreProducto').value;
        const precio = parseFloat(document.getElementById('precioProducto').value);

        if (nombre && !isNaN(precio) && precio > 0) {
            carrito.agregar(new Producto(nombre, precio));
            carrito.calcular();
            document.getElementById('nombreProducto').value = '';
            document.getElementById('precioProducto').value = '';
        } else {
            alert('Por favor, introduce un nombre válido y un precio positivo.');
        }
    });

    const botonEliminar = document.getElementById('eliminarProducto');
    botonEliminar.addEventListener('click', () => {
        const nombreEliminar = document.getElementById('nombreEliminar').value;

        if (nombreEliminar) {
            carrito.eliminar(nombreEliminar);
            carrito.calcular();
            document.getElementById('nombreEliminar').value = '';
        } else {
            alert('Por favor, introduce un nombre de producto para eliminar.');
        }
    });
});