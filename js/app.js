const listaCursos = document.querySelector('#lista-cursos');
const tabla = document.querySelector('#lista-carrito tbody');

let carrito = [];

function getCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
       const item = {}
       item.id = e.target.getAttribute('data-id');
       const padre = e.target.parentElement;
       item.name = padre.querySelector('h4').innerText;
       item.price = padre.querySelector('p span').innerText;
       item.image = padre.parentElement.querySelector('img').src;
       item.cantity = 1;
       addItem(item);
        //   LLenar la tabla 
       showTable(); 
       

    }
}
function addItem(item){
    // Verificar si el objeto existe en carrito
    if(carrito.some(itemCarrito => item.id === itemCarrito.id  )){
        carrito.forEach(itemCarrito => {
            if (itemCarrito.id === item.id){
                itemCarrito.cantity++;
            }
        });
        
   } else{
       carrito.push(item); 
   }
}
// Modifica la función showTable para agregar el total a pagar
function showTable(){
    // Limpiar tabla
    tabla.innerHTML = ''
    // Iterar carrito para insertar
    carrito.forEach(item => {
        tabla.appendChild(createRow(item));
    });
    // Calcular el total a pagar
    const total = carrito.reduce((acc, item) => acc + (parseFloat(item.price) * item.cantity), 0);
    // Crear fila para mostrar el total
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td colspan="3">Total a pagar:</td><td>${total}</td>`;
    tabla.appendChild(totalRow);
}

// Modifica la función createRow para agregar botones de - y + para modificar la cantidad
function createRow(item){
    const row = document.createElement('tr');
    let rowHtml = ``;
    rowHtml += `<td><img src="${ item.image }" width="100px" ></td>`;
    rowHtml += `<td>${ item.name }</td>`;
    rowHtml += `<td>${ item.price }</td>`;
    rowHtml += `<td><button class="btn-minus" data-id="${item.id}">-</button>${ item.cantity }<button class="btn-plus" data-id="${item.id}">+</button></td>`;
    const button = document.createElement('button');
    button.setAttribute('data-id', item.id);
    button.classList.add('btn');
    button.innerHTML = 'X';
    const td = document.createElement('td');
    td.appendChild(button);
    row.innerHTML = rowHtml;
    row.appendChild(td);
    return row;
}

// Agrega eventos para los botones de - y +
tabla.addEventListener('click', function(e){
    if(e.target.classList.contains('btn-minus')){
        const id = e.target.getAttribute('data-id');
        // Buscar el item en el carrito
        const item = carrito.find(itemCarrito => itemCarrito.id === id);
        // Restar 1 a la cantidad
        if(item.cantity > 1){
            item.cantity--;
        }
        showTable();
    } else if(e.target.classList.contains('btn-plus')){
        const id = e.target.getAttribute('data-id');
        // Buscar el item en el carrito
        const item = carrito.find(itemCarrito => itemCarrito.id === id);
        // Sumar 1 a la cantidad
        item.cantity++;
        showTable();
    }
});
function btnDelItem(e){
    if(e.target.classList.contains('btn')){
        const id = e.target.getAttribute('data-id');
        // Eliminar carrito
        carrito = carrito.filter(itemCarrito => itemCarrito.id !==id);
        showTable();
    }
}

listaCursos.addEventListener('click',getCurso);
tabla.addEventListener('click',btnDelItem);