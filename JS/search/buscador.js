import { db, collection, getDocs } from "../firebase/credentials.js";

const formulario = document.querySelector("#inputValid");
const resultado = document.querySelector(".posts");

async function obtener_palabras() {
  $(".post").remove();
  const querySnapshot = await getDocs(collection(db, "palabras"));
  querySnapshot.forEach((doc) => {
    const wordId = doc.data();
    let joinObject = Object.assign(wordId, {id: doc.id})
    const textoIngresado = formulario.value.toLowerCase();
    let nombre =
    joinObject.descripcion.toLowerCase() + ". " + wordId.titulo.toLowerCase();
    if (nombre.indexOf(textoIngresado) !== -1) {
      let html = obtenerPostTemplate(
        joinObject.id,
        joinObject.autor,
        joinObject.titulo,
        joinObject.descripcion,
        joinObject.fechacreacion
      );
      console.log('FECHA -> ', joinObject.fechacreacion)
      $(".posts").append(html);
    }
  });
}
obtener_palabras();


$("#logobuscar").click(function (e) {
  e.preventDefault();
  obtener_palabras();
});

$("#inputValid").keyup(function (e) {
  // Number 13 is the "Enter" key on the keyboard
  if (e.keyCode === 13) {
    e.preventDefault();
    obtener_palabras();
  }
});

$("#btnTodoPost").click(function (e) {
  $(".post").remove();
  obtener_palabras();
});

function obtenerPostTemplate(
  id,
  autor,
  titulo,
  descripcion,
  fecha
) {
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
                  <div class="datos-post" class="col m6">
                      Fecha: ${fecha}
                  </div>
                  <div class="datos-post" class="col m6">
                      Autor: ${autor}
                  </div>
                  <div class="buttons">
                    <input id="${id}" class="btn-sec btn-pop" type="button" value="Editar" />
                    <input id="${id}" class= "btn-sec delete-btn-post" type="submit" value="Eliminar" />
                  </div>        
              </div>
          </div>
      </article>`;
}
export { obtener_palabras };