import { doc, getApps } from "../firebase/credentials.js";
import {
  accesoCorreo,
  registroCorreo,
  accesoGmail,
  singouts,
  verificaSesion,
  verificationLogin,
} from "../firebase/authentication.js";
import { crearPost, showPosts } from "../publicaciones/publicacion.js";
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
  if (!validation) {
    insertWord(postTitle, postDesc);
    alert('Aún no registrado');
  } else {
    alert('¡Esta palabra ya existe!');
  }
});

$('#btnRegistroEditPost').click(function (e) {
  e.preventDefault();
  //get the value from the title input
  const postTitle = document.getElementById("tituloEditPost").value;
  //get the value from the description input
  const postDesc = document.getElementById("descripcionEditPost").value;
  //get the value from the video link input
  // const postVidLink = document.getElementById("linkVideoEditPost").value;

  //Verificacion de campos
  if (postTitle.length < 1 || postDesc.length < 1) {
    alert("Los campos del titulo y la descripcion no pueden quedar vacios!");
  } else {
    editWord(idEdit, postTitle, postDesc, null, null);
    idEdit = "";
  }

});

$(document).on('click', '.delete-btn-post', async function (e) {
  if (window.confirm("¿Está seguro que desea eliminar este documento?")) {
    await deleteWord(this.id);
  }
});

$(document).on('click', '.btn-pop', async function (e) {
  $('#popup-2').toggleClass('active');
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

$("#btnInicioEmail").click(function (e) {
  let email = document.getElementById("emailSesion").value
  let pass = document.getElementById("passwordSesion").value
  accesoCorreo(email, pass);
});

//!esta es la funcion para verificar el formulario de registro email
$("#btnRegistroEmail").click(function (e) {
  let email = document.getElementById("emailContactoReg").value
  let pass = document.getElementById("passwordReg").value
  let nombre = document.getElementById("nombreContactoReg").value
  let photo = "https://firebasestorage.googleapis.com/v0/b/proyecto-gloasario.appspot.com/o/Imagenes%2Flego_smiley_calm_preview.png?alt=media&token=214e3d01-706f-4500-aa93-0dc6f567384e"
  if (nombre == ""){
    alert("Debe ingresar un nombre!");
  }else if (verificationLogin(pass, email) == true) {
    registroCorreo(email, pass, nombre, photo);
  } else if (verificationLogin(pass, email) == 'email') {
    alert("Cualquier dirección de correo elecrónico que contenga caracteres Unicode.");
  } else if (verificationLogin(pass, email) == 'pass') {
    alert("La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.");
  }
});

$("#btnInicioSesion").click(function (e) {

  //login
  //accesoCorreo("fernando@gmail.com", "12345678");
  // registroCorreo(
  //   "pepito3@gmail.com",
  //   "12345678",
  //   "Gustavo",
  //   "Tavo",
  //   
  //  );
  // accesoGmail();
});
