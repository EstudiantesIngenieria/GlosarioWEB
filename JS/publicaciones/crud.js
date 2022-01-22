import {
    db,
    collection,
    addDoc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    arrayUnion,
    auth,
    query,
    where
} from "../firebase/credentials.js";

import {
    uploadImg,
    getImgDownloadURL
} from "../cloudStorage/uploadCloud.js";

import {
    obtener_palabras
} from "../search/buscador.js"


//function for add new doc in Firestore
async function insertWord(title, desc) {
    // let imgURL = imgLink;
    //If there's a file to upload calls the function from uploadCloud.js
    //    if (imgLink!= null){
    //        let promise = await uploadImg(imgLink, file);
    //        imgURL = await getImgDownloadURL(imgLink);
    //    }

    //Verificacion de campos
    if (title.length < 1 || desc.length < 1) {
        alert("Los campos del titulo y la descripcion no pueden quedar vacios!");
        return;
    }

    //check if there is an user signed in
    let signedIn = auth.currentUser;
    //if auth.currentUser is not null, then use addDoc with parameters
    if (signedIn) {
        let today = new Date();
        var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
        const docRef = await addDoc(collection(db, "palabras"), {
            autor: auth.currentUser.email,
            titulo: title,
            descripcion: desc,
            // imagenLink: imgURL,
            // videoLink: vidLink,
            fechacreacion: date
        });
        alert("Inserción de post de manera exitosa!");
    } else {
        alert('ERROR, Inicie sesión');
    }
};

async function deleteWord(id) {
    //check if there is an user signed in
    let signedIn = auth.currentUser;
    //if auth.currentUser is not null, then use addDoc with parameters
    if (signedIn) {
        await deleteDoc(doc(db, "palabras", id));
        alert("¡Se ha eliminado el post de manera exitosa!");
        obtener_palabras(true);
    } else {
        alert('ERROR, Inicie sesión');
    }
}

async function editWord(id, title, desc, imgLink, vidLink) {
    //check if there is an user signed in
    let signedIn = auth.currentUser;
    var editorSt = "Anónimo"
    //if auth.currentUser is not null, then use addDoc with parameters
    if (signedIn) {
        editorSt = auth.currentUser.email;
    } 
    let today = new Date();
        var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
        await updateDoc(doc(db, "palabras", id), {
            titulo: title,
            descripcion: desc,
            // videoLink: vidLink,
            editores: arrayUnion({
                editor: editorSt,
                fechaedicion: date,
                fecha: today
            })
        });
        alert("Se ha editado el post de manera exitosa!");
};

async function getWord(id) {
    const docRef = doc(db, "palabras", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

async function getWord2(word) {
    var flag = false;
    const querySnapshot = await getDocs(collection(db, "palabras"));
    querySnapshot.forEach((doc) => {
        const wordId = doc.data().titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (wordId == word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
            console.log(wordId);
            flag = true;
        }
    });
    return flag;
};

export {
    insertWord, deleteWord, editWord, getWord, getWord2
}