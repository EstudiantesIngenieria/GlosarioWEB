import { db, collection, getDocs } from "../firebase/credentials.js";

const formulario = document.querySelector("#inputValid");
const resultado = document.querySelector(".posts");

let arreglo = [];
async function obtener_palabras() {
  const querySnapshot = await getDocs(collection(db, "palabras"));
  querySnapshot.forEach((doc) => {
    const wordId = doc.data();
    //console.log(wordId)
    let joinObject = Object.assign(wordId, {id: doc.id})
    arreglo.push(joinObject);
    console.log(arreglo);
  });
}
obtener_palabras();

const filtrar = () => {
  $('.post').remove();

  const textoIngresado = formulario.value.toLowerCase();

  arreglo.forEach((obj) => {
    let nombre = obj.descripcion.toLowerCase() + ". " + obj.titulo.toLowerCase()+ ". " + obj.autor.toLowerCase();
    console.log(nombre)
    if (nombre.indexOf(textoIngresado) !== -1) {
      let html = obtenerPostTemplate(
        obj.id,
        obj.autor,
        obj.titulo,
        obj.descripcion,
        obj.videoLink,
        obj.imagenLink,
        obj.fechaCreacion
      );
      $('.posts').append(html);
    }
  });
  if (resultado.innerHTML === ' ') {
    resultado.innerHTML += `
    <h1>NO HAY RESULTADOS</h1>
    `;
  }
};

$("#logobuscar").click(function (e) {
  e.preventDefault();
  filtrar();
});

$("#inputValid").keyup(function (e) {
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
      e.preventDefault();
      filtrar();
    }
});

function obtenerPostTemplate(
  id,
  autor,
  titulo,
  descripcion,
  videoLink,
  imagenLink,
  fecha
) {
  if (imagenLink) {
    return `<article class="post">
          <div class="post-titulo">
              <h5 id="${id}">${titulo}</h5>
          </div>
          

          
          
          <div class="post-descripcion">
              <textarea class = "txt_area_post" readonly="readonly">
               ${descripcion}
            </textarea>
          </div>
          <div class="post-footer container">
              <div class="row">
                  <div class="col m6">
                      Fecha: ${fecha}
                  </div>
                  <div class="col m6">
                      Autor: ${autor}
                  </div>
                  <div>
                    <input class="edit-btn-post" type="button" value="Editar" />
                    <input class="delete-btn-post" type="button" value="Eliminar" />
                  </div>        
              </div>
          </div>
      </article>`;
  }
  
  return `<article class="post">
              <div class="post-titulo">
                  <h5>${titulo}</h5>
              </div>
              


              <div class="post-descripcion" >
                  <textarea class = "txt_area_post" readonly="readonly">
               ${descripcion}
            </textarea>
              </div>
              <div class="post-footer container">
                  <div class="row">
                      <div class="col m6">
                          Fecha: ${fecha}
                      </div>
                      <div class="col m6">
                          Autor: ${autor}
                      </div>
                      <div class="input-btn">
                        <input class="edit-btn-post" id="nombreContacto" type="button" value="Editar" sytle="justify-items: center" />
                        <input class="delete-btn-post" id="nombreContacto" type="button" value="Eliminar" />
                      </div>          
                  </div>
              </div>
          </article>`;
}
export{arreglo}
