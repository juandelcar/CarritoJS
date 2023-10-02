const listaCursos = document.querySelector('#lista-cursos');

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
       // Verificar si el objeto existe en carrito
       if(carrito.some(itemCarrito => item.id === itemCarrito.id  )){
          carrito = carrito.map(itemCarrito => {
            if (itemCarrito.id === item.id){
                itemCarrito.cantity++;
                return itemCarrito;
            } else {
                return itemCarrito;
            }
          })
       } else{
           carrito.push(item); 
       }
       console.log(carrito);

    }
}

listaCursos.addEventListener('click',getCurso);