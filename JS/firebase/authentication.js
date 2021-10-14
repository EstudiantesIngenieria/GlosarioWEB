import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
  signOut,
} from "../firebase/credentials.js";

//funcion que nos ayuda para crear usuarios nuevos con correo
function registroCorreo(email, password, nombre, apellido, url) {
  if (password.length >= 8 || email == "" || nombre == "" || apellido == "") {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const nombres = `${nombre} ${apellido}`;
        updateProfiles(nombres, url);
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, " ", errorMessage);
      });
  } else {
    alert("las contrase;a tiene que ser mas de 8 caracteres");
  }
}
//actualiza la foto y el nombre
function updateProfiles(name, url) {
  updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: url,
  })
    .then(() => {
      console.log("Actualizado");
    })
    .catch((error) => {
      console.log("ERROR AL ACTUALIZAR");
    });
}

function accesoCorreo(email, password) {
  console.log(auth.currentUser);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const img = document.getElementById("avatar");
      img.src = user.photoURL;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Codifo error : ", errorCode);
      console.log("mensaje error: ", errorMessage);
    });
}

function accesoGmail() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const img = document.getElementById("avatar");
      img.src = user.photoURL;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function verifica() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const img = document.getElementById("avatar");
      img.src = user.photoURL;
      $('#btnInicioSesion').hide();
      $('#btnCerrarSesion').show();
      
    } else {
      console.log('si entro2')
      $('#btnCerrarSesion').hide();
    }
  });
}

function singouts() {
  signOut(auth)
    .then(() => {
      $("#btnInicioSesion").show();
      $('#btnCerrarSesion').hide();
      const img = document.getElementById("avatar");
      img.src = "/GlosarioWEB/imagenes/usuario.png";
    })
    .catch((error) => {
      // An error happened.
    });
}

function accesFaccebook() {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log("entro fb");
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const img = document.getElementById("avatar");
      img.src = user.photoURL;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
}


export { registroCorreo, accesoCorreo, accesoGmail, accesFaccebook, singouts, verifica};
