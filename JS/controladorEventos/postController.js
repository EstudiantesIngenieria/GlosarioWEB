import { getApps } from "../firebase/credentials.js";
import {
  accesoCorreo,
  registroCorreo,
  accesoGmail,
  singouts,
  accesFaccebook,
  verifica,
} from "../firebase/authentication.js";
import { crearPost } from "../publicaciones/publicacion.js";


$(document).ready(function () {
  verifica();
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





$("#btnMisPost").click(function (e) { 
  e.preventDefault();
  crearPost('1', 'Acta de constitución', 'Documento en el que se encuentra de forma resumida los datos y componentes clave de la fase de iniciación del proyecto como lo pueden ser el Alcance, Objetivos o Stakeholders.', null, null)
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
