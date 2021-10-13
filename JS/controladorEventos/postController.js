import { getApps } from "../firebase/credentials.js";
import {
  accesoCorreo,
  registroCorreo,
  accesoGmail,
  singouts,
  accesFaccebook,
  verifica,
} from "../firebase/authentication.js";
import { crearPost, showPosts} from "../publicaciones/publicacion.js";
import { insertWord, deleteWord } from "../publicaciones/crud.js"
import { uploadImg } from "../cloudStorage/uploadCloud.js"
import { arreglo } from "../search/buscador.js"

$(document).ready(function () {
  verifica();
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
  document.getElementById("popup-1").classList.toggle("active");
  
});
//close popup button
$('.close-btn').click(function (e) { 
  e.preventDefault();
  $('#popup-1').toggleClass('active');
});


$("#btnTodoPost").click(function (e) {
  let final
  e.preventDefault()
  console.log("ya entre")
  const $sectionPosts = document.getElementById("posts")
  showPosts().then(value => $sectionPosts.innerHTML= value.replace('undefined', ''))
  showPosts().then(val => console.log(val.replace('undefined', '')))
});

//Submit new post when btnRegistroPost is clicked
$('#btnRegistroPost').click(function (e) { 
  e.preventDefault();
  //get the file that's gonna be uploaded
  const inpFile = document.getElementById("btnUploadFile");
  const file = inpFile.files[0];
  //get the value from the title input
  const postTitle = document.getElementById("tituloNewPost").value;
  //get the value from the description input
  const postDesc = document.getElementById("descripcionNewPost").value;
  //get the value from the video link input
  const postVidLink = document.getElementById("linkVideoNewPost").value;
  //check if user selected a file
  if (typeof file !== "undefined") {
    //call the uploadImg function and insertWord function
    insertWord('Author', postTitle, postDesc, file.name, postVidLink, file);
  } else {
    //only call the insertWord function
    insertWord('Author', postTitle, postDesc, null, postVidLink, null);
  }
});

$('#delete-btn-post').click(function(e) {
  e.preventDefault();
  console.log("Funcionando");
  // deleteWord(e.target.id);
});

$("#btnMisPost").click(function (e) { 
  e.preventDefault();
  // crearPost('1', 'Acta de constitución', 'Documento en el que se encuentra de forma resumida los datos y componentes clave de la fase de iniciación del proyecto como lo pueden ser el Alcance, Objetivos o Stakeholders.', null, null)
});

$("#btnInicioSesion").click(function (e) {
  e.preventDefault();
  accesoCorreo("pepito2@gmail.com", "12345678");
  // registroCorreo(
  //   "pepito3@gmail.com",
  //   "12345678",
  //   "Gustavo",
  //   "Tavo",
  //   "https://images.unsplash.com/photo-1633121919063-471d6534a2e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80"
  // );
  
  //  accesFaccebook();
});
