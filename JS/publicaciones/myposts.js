import { auth } from "../firebase/credentials.js";

//fuction 
function myPosts(arr) {
    let arr2 = [];
    arr.forEach((obj) => {
        if (obj.autor == auth.currentUser.email) {
            let unir = {
                id: obj.id,
                titulo: obj.titulo,
                descripcion: obj.descripcion,
                fecha: obj.fechacreacion,
                autor: obj.autor
            };
            arr2.push(unir);
        }
    });
    return arr2;
}


function renderMyPosts(
    array
  ) {
    $('.indice').hide();
    $('.container-category').hide();
    $('.post').remove();
    if (array.length == 0) {
        let html = `<h3 class="post">No has realizado ninguna publicación </h3>`
        $(".posts").append(html);
    } else {
        array.forEach((obj) => {
            let html = `<article class="post">
                <div class="post-titulo">
                    <h5 id="${obj.id}">${obj.titulo}</h5>
                </div>
                <div class="post-descripcion">
                    <textarea class = "txt_area_post" readonly="readonly">
                     ${obj.descripcion}
                  </textarea>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="datos-post" class="col m6">
                            Fecha: ${obj.fecha}
                        </div>
                        <div class="datos-post" class="col m6">
                            Autor: ${obj.autor}
                        </div>
                        <div class="buttons">
                          <input id="${obj.id}" class="btn-sec btn-pop" type="button" value="Editar" />
                          <input id="${obj.id}" class= "btn-sec delete-btn-post" type="submit" value="Eliminar" />
                        </div>        
                    </div>
                </div>
            </article>`;
            $(".posts").append(html);
        })
    }
  }
export { myPosts, renderMyPosts }