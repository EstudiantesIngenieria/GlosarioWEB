import {
  db,
  addDoc,
  collection,
  getDocs,
  signOut,
  auth,
  onAuthStateChanged,
} from "../firebase/credentials.js";

async function crearPost(uid, titulo, descripcion, imagenLink, videoLink) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      try {
        var hoy = new Date();
        var fecha =
          hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();

        const docRef = addDoc(collection(db, "palabras"), {
          uid: uid,
          autor: user.email,
          titulo: titulo,
          descripcion: descripcion,
          imagenLink: imagenLink,
          videoLink: videoLink,
          fecha: fecha,
        });
        alert('Publicado Correctamente')
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert('inicie sesion');
    }
  });
}

async function showPosts() {
  let finalHTMLPosts
  const querySnapshot = await getDocs(collection(db, "palabras"));
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data().autor} => ${doc.data().titulo}`);
    let frontHTML
    frontHTML = `
    <div class="showPost${doc.data().titulo.split(" ").join("")}">
      <h4 id="tituloPost" class="titulosPosts">${doc.data().titulo}</h4>
      <p id="descripcionPost" class="descripcionPosts">${doc.data().descripcion}</p>
      <img src="${doc.data().imagenLink}" alt="Imagen Post ${doc.data().titulo}" id="img${doc.data().titulo}" class="imagenesPosts">
      <a href="${doc.data().videoLink}" target="blank" class="videosPosts" id="video${doc.data().titulo}">Ver video</a>
      <h2 class="autorPosts" id="autorDe${doc.data().titulo}">Autor: ${doc.data().autor}</h2>
      <h2 id="fechaDe${doc.data().titulo}" class="fechaPosts">Fecha Publicacion ${doc.data().fecha}</h2>
      <div>
        <input id="nombreContacto" type="button" value="Editar" />
        <input id="nombreContacto" type="button" value="Eliminar" />
      </div> 
    </div>
    `
    finalHTMLPosts = finalHTMLPosts + frontHTML 
  });
  return finalHTMLPosts
}

export { crearPost, showPosts };
