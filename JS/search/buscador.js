import { db, collection, getDocs } from "../firebase/credentials.js";

const formulario = document.querySelector("#inputValid");
const resultado = document.querySelector("#resultado");
let arreglo = [];
async function obtener_palabras() {
  const querySnapshot = await getDocs(collection(db, "palabras"));
  querySnapshot.forEach((doc) => {
    const wordId = doc.data();
    //console.log(wordId)
    arreglo.push(wordId);
  });
}
obtener_palabras();

const filtrar = () => {
  resultado.innerHTML = "";

  const textoIngresado = formulario.value.toLowerCase();

  arreglo.forEach((obj) => {
    let nombre = obj.descripcion.toLowerCase() +' '+obj.autor.toLowerCase() ;
    if (nombre.indexOf(textoIngresado) !== -1) {
      resultado.innerHTML += `
      <li>${obj.autor}, ${obj.descripcion}</li>
                   
                `;
    }
  });
  if (resultado.innerHTML === "") {
    resultado.innerHTML += `
    <li>Palabra no encontrada</li>
    `;
  }
};

$("#logobuscar").click(function (e) {
  e.preventDefault();
  filtrar();
});
$("#inputValid").keyup(function (e) {
  filtrar();
});
