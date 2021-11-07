import { doc, getApps } from "../firebase/credentials.js";
import {
  accesoCorreo,
  registroCorreo,
  accesoGmail,
  singouts,
  verificaSesion,
} from "../firebase/authentication.js";
import { crearPost, showPosts} from "../publicaciones/publicacion.js";
import { insertWord, deleteWord, editWord, getWord, getWord2 } from "../publicaciones/crud.js"
import { uploadImg } from "../cloudStorage/uploadCloud.js"
import { obtener_palabras } from "../search/buscador.js";

var idEdit;

$(document).ready(function () {
  verificaSesion();
});
//click cerrar sesion 
$('#btnCerrarSesion').click(function (e) { 
  e.preventDefault();
  singouts();
});


//popup
$(".overlay").click(function (e) { 
  e.preventDefault();
  $('#popup-1').toggleClass('active');
});
//open popup
$("#btnModalPost").click(function (e) {
  e.preventDefault();
  // singouts();
  console.log('modal open')
  $('#popup-1').toggleClass('active');
});
//close popup button
$('.close-btn').click(function (e) { 
  $('#popup-1').toggleClass('active');
  obtener_palabras();
});

$('.close-btn2').click(function (e) { 
  $('#popup-2').toggleClass('active');
  obtener_palabras();
});


// $("#btnTodoPost").click(function (e) {
//   let final
//   e.preventDefault()
//   const $sectionPosts = document.getElementById("posts")
//   showPosts().then(value => $sectionPosts.innerHTML= value.replace('undefined', ''))
//   showPosts().then(val => console.log(val.replace('undefined', '')))
// });

//Submit new post when btnRegistroPost is clicked
$('#btnRegistroPost').click(async function (e) { 
  e.preventDefault();
  //get the value from the title input
  const postTitle = document.getElementById("tituloNewPost").value;
  // //get the value from the description input
  const postDesc = document.getElementById("descripcionNewPost").value;
  // //check if user selected a file
  let validation = await getWord2(postTitle);
  if (!validation){
    insertWord(postTitle, postDesc);
    alert('Aún no registrado');
  } else {
    alert('¡Esta palabra ya existe!');
  }
});

$('#btnRegistroEditPost').click(function (e) { 
  e.preventDefault();
  console.log("funcionando boton editar");
  //get the value from the title input
  const postTitle = document.getElementById("tituloEditPost").value;
  //get the value from the description input
  const postDesc = document.getElementById("descripcionEditPost").value;
  //get the value from the video link input
  // const postVidLink = document.getElementById("linkVideoEditPost").value;
  editWord(idEdit, postTitle, postDesc, null, null);
  idEdit = "";
});

$(document).on('click', '.delete-btn-post', function(e) {
  console.log("Editar");
  deleteWord(this.id);
});

$(document).on('click', '.btn-sec', async function(e) {
  $('#popup-2').toggleClass('active');
  console.log("Editar");
  // document.getElementById("popup-2").classList.toggle("active");
  let promise = await getWord(this.id);
  document.getElementById("tituloEditPost").value = promise.titulo;
  const postDesc = document.getElementById("descripcionEditPost").value = promise.descripcion;
  idEdit = this.id;
});

$("#btnMisPost").click(function (e) { 
  e.preventDefault();
  // crearPost('1', 'Acta de constitución', 'Documento en el que se encuentra de forma resumida los datos y componentes clave de la fase de iniciación del proyecto como lo pueden ser el Alcance, Objetivos o Stakeholders.', null, null)
});

$("#btnInicioSesion").click(function (e) {
  //login
  accesoCorreo("fernando@gmail.com", "12345678");
  // registroCorreo(
  //   "pepito3@gmail.com",
  //   "12345678",
  //   "Gustavo",
  //   "Tavo",
  //   "https://images.unsplash.com/photo-1633121919063-471d6534a2e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80"
  //  );
  // accesoGmail();
});
