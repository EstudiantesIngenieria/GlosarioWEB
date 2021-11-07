import { db, collection, getDocs } from "../firebase/credentials.js";
import { historys, renderHistorys } from "../historial/useHistory.js";
const formulario = document.querySelector("#inputValid");
const resultado = document.querySelector(".posts");

var arrayTest = [];
var indice = []
async function obtener_palabras() {
  $(".post").remove();
  const querySnapshot = await getDocs(collection(db, "palabras"));
  querySnapshot.forEach((doc) => {
    const wordId = doc.data();
    let joinObject = Object.assign(wordId, {id: doc.id})
    arrayTest.push(joinObject);
    const textoIngresado = formulario.value.toLowerCase();
    let nombre =
    joinObject.descripcion.toLowerCase() + ". " + wordId.titulo.toLowerCase();

    // if (nombre.indexOf(textoIngresado) !== -1) {
    //   let html = obtenerPostTemplate(
    //     joinObject.id,
    //     joinObject.autor,
    //     joinObject.titulo,
    //     joinObject.descripcion,
    //     joinObject.fechacreacion
    //   );
    //   $(".posts").append(html);
    // }
  });
  arrayTest.sort((a,b)=> (a.titulo > b.titulo ? 1 : -1))
  arrayTest.forEach((obj) => {
    let html = obtenerPostTemplate(
      obj.id,
      obj.autor,
      obj.titulo,
      obj.descripcion,
      obj.fechacreacion
    );
    $(".posts").append(html);
  })
  indice = [...arrayTest]
  arrayTest = [];
}
obtener_palabras();

//indice######################################################
document.getElementById("ALabel").addEventListener("click", searchA);
document.getElementById("BLabel").addEventListener("click", searchB);
document.getElementById("CLabel").addEventListener("click", searchC);
document.getElementById("DLabel").addEventListener("click", searchD);
document.getElementById("ELabel").addEventListener("click", searchE);
document.getElementById("FLabel").addEventListener("click", searchF);
document.getElementById("GLabel").addEventListener("click", searchG);
document.getElementById("HLabel").addEventListener("click", searchH);
document.getElementById("ILabel").addEventListener("click", searchI);
document.getElementById("JLabel").addEventListener("click", searchJ);
document.getElementById("KLabel").addEventListener("click", searchK);
document.getElementById("LLabel").addEventListener("click", searchL);
document.getElementById("MLabel").addEventListener("click", searchM);
document.getElementById("NLabel").addEventListener("click", searchN);
document.getElementById("OLabel").addEventListener("click", searchO);
document.getElementById("PLabel").addEventListener("click", searchP);
document.getElementById("QLabel").addEventListener("click", searchQ);
document.getElementById("RLabel").addEventListener("click", searchR);
document.getElementById("SLabel").addEventListener("click", searchS);
document.getElementById("TLabel").addEventListener("click", searchT);
document.getElementById("ULabel").addEventListener("click", searchU);
document.getElementById("VLabel").addEventListener("click", searchV);
document.getElementById("WLabel").addEventListener("click", searchW);
document.getElementById("XLabel").addEventListener("click", searchX);
document.getElementById("YLabel").addEventListener("click", searchY);
document.getElementById("ZLabel").addEventListener("click", searchZ);
document.getElementById("Clear").addEventListener("click", Clear);
function searchA(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'a')
  })
}
function searchB(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'b')
  })
}
function searchC(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'c')
  })
}
function searchD(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'd')
  })
}
function searchE(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'e')
  })
}
function searchF(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'f')
  })
}
function searchG(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'g')
  })
}
function searchH(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'h')
  })
}
function searchI(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'i')
  })
}
function searchJ(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'j')
  })
}
function searchK(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'k')
  })
}
function searchL(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'l')
  })
}
function searchM(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'm')
  })
}
function searchN(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'n')
  })
}
function searchO(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'o')
  })
}
function searchP(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'p')
  })
}
function searchQ(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'q')
  })
}
function searchR(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'r')
  })
}
function searchS(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 's')
  })
}
function searchT(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 't')
  })
}
function searchU(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'u')
  })
}
function searchV(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'v')
  })
}
function searchW(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'w')
  })
}
function searchX(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'x')
  })
}
function searchY(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'y')
  })
}
function searchZ(){
  $(".post").remove();
  indice.forEach((obj) => {
    grafica(obj, 'z')
  })
}
function grafica(obj, letra){
  if(obj.titulo.toLowerCase().charAt(0) == letra){
    let html = obtenerPostTemplate(
      obj.id,
      obj.autor,
      obj.titulo,
      obj.descripcion,
      obj.fechacreacion
    );
    $(".posts").append(html)
  }
}
function Clear(){
  obtener_palabras()
}
const d = document.createElement('div')



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


//? Funcion hostory
$('#btnHistory').click(function (e) { 
  e.preventDefault();
  let arr = historys(indice);
  renderHistorys(arr);
  console.log(arr)
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