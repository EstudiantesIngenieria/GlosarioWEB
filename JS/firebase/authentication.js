import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "../firebase/credentials.js";

//funcion que nos ayuda para crear usuarios nuevos con correo
function registroCorreo(email, password, nombre, url) {
  //Verificacion de campos
  if (email.length < 1 || password.length < 8 || nombre.length < 1 ) {
    alert("Campos no validos");
    return;
  }

  if (password.length >= 8 || email == "" || nombre == "" ) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const nombres = `${nombre}`;
        updateProfiles(nombres, url);
        const user = userCredential.user

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use') {
          alert('El correo electronico ya existe.  ' + errorMessage)
        }
      });
  } else {
    alert("las contrase;a tiene que ser maximo de 8 caracteres");
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


//logearse con correo
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
      console.log("Codido error : ", errorCode);
      console.log("mensaje error: ", errorMessage);
      if (errorCode === "auth/wrong-password") {
        //alert("Contraseña incorrecta");
        Swal.fire({
          icon: 'error',
          
          text: 'Contraseña incorrecta',
          
        })
      } else if(errorCode === "auth/user-not-found") {
        //alert("Usuario no encontrado");
        Swal.fire({
          icon: 'info',
          
          text: 'Usuario no encontrado',
          
        })
      }
    });
}
//iniciar sesion con google
function accesoGmail() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const {displayName, email, photoURL} = result.user;
      const img = document.getElementById("avatar");
      img.src = photoURL;
      alert('Bienvenido ' + displayName);
      console.log(photoURL)

    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log('error code: ' + errorCode + ' message: ' + errorMessage)
      // ...
    });
}

function verificaSesion(isEdit) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const img = document.getElementById("avatar");
      img.src = user.photoURL;
      $('#btnInicioSesion').hide();
      $('#btnCerrarSesion').show();
      if (isEdit) {
        var userA = Object.assign({}, user);
        console.log(userA);
        return userA;
      }
    } else {
      console.log('si entro2')
      $('#btnCerrarSesion').hide();
    }
  });
}
//cerrar sesion 
function singouts() {
  signOut(auth)
    .then(() => {
      $("#btnInicioSesion").show();
      $('#btnCerrarSesion').hide();
      const img = document.getElementById("avatar");
      img.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-gloasario.appspot.com/o/Imagenes%2Fusuario.png?alt=media&token=81827144-7920-4066-ba2b-3743b968555e";
    })
    .catch((error) => {
      // An error happened.
    });
}


$('.logo-google').click(function (e) { 
  e.preventDefault();
  accesoGmail();
});

/*
La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
Puede tener otros símbolos.


Cualquier dirección de correo elecrónico que contenga caracteres Unicode
*/

function verificationLogin(cadena, cadenaEmail) {
  let regExEmail = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
  let regexPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  if(!regExEmail.test(cadenaEmail) || cadenaEmail == ""){
    return 'email';
  }else if (!regexPass.test(cadena) || cadena == "") {
    return 'pass';
  }else{
    return true;
  }
}

export { registroCorreo, accesoCorreo, accesoGmail, singouts, verificaSesion, verificationLogin };
