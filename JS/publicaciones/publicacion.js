
import {
  db,
  addDoc,
  collection,
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

export { crearPost };
