import {
    db,
    collection,
    addDoc,
    deleteDoc, 
    updateDoc, 
    doc, 
    arrayUnion,
    auth
} from "../firebase/credentials.js";

import {
    uploadImg,
    getImgDownloadURL
} from "../cloudStorage/uploadCloud.js";

//function for add new doc in Firestore
async function insertWord(author, title, desc, imgLink, vidLink, file){
    let imgURL = imgLink;
    //If there's a file to upload calls the function from uploadCloud.js
    if (imgLink!= null){
        let promise = await uploadImg(imgLink, file);
        imgURL = await getImgDownloadURL(imgLink);
    }
    //check if there is an user signed in
    let signedIn = auth.currentUser;
    //if auth.currentUser is not null, then use addDoc with parameters
    if (signedIn) {
        let today = new Date();   
        const docRef = await addDoc(collection(db, "palabras"), {
            autor: author,
            titulo: title,
            descripcion: desc,
            imagenLink: imgURL,
            videoLink: vidLink,
            fechacreacion: today
        });
        alert("Document written with ID: " + docRef.id);
    } else {
        alert('ERROR, Inicie sesión');
    }
};

async function deleteWord(id){
    await deleteDoc(doc(db, "palabras", id));
}

async function editWord(id, editor, title, desc, imgLink, vidLink){
    var today = new Date();
    await updateDoc(doc(db, "Glosario", id), {
        titulo: title,
        descripcion: desc,
        imagenLink: imgLink,
        videoLink: vidLink,
        fechacreacion: today,
        editores: arrayUnion({
            editor: editor,
            fechadicion: today
        })
    });
    
}

export {
    insertWord, deleteWord
}