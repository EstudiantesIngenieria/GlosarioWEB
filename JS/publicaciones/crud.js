import {
    db,
    collection,
    addDoc,
    getDoc,
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
async function insertWord(title, desc, imgLink, vidLink, file){
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
        var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
        const docRef = await addDoc(collection(db, "palabras"), {
            autor: auth.currentUser.email,
            titulo: title,
            descripcion: desc,
            imagenLink: imgURL,
            videoLink: vidLink,
            fechacreacion: date
        });
        alert("Document written with ID: " + docRef.id);
    } else {
        alert('ERROR, Inicie sesión');
    }
};

async function deleteWord(id){
    //check if there is an user signed in
    let signedIn = auth.currentUser;
    //if auth.currentUser is not null, then use addDoc with parameters
    if (signedIn) {
        await deleteDoc(doc(db, "palabras", id));
        alert("The document with ID: " + id + "has been erased");
    } else {
        alert('ERROR, Inicie sesión');
    }
}

async function editWord(id, title, desc, imgLink, vidLink){
    //check if there is an user signed in
    let signedIn = auth.currentUser;
    //if auth.currentUser is not null, then use addDoc with parameters
    if (signedIn) {
        let today = new Date();   
        var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
        await updateDoc(doc(db, "palabras", id), {
            titulo: title,
            descripcion: desc,
            videoLink: vidLink,
            editores: arrayUnion({
                editor: auth.currentUser.email,
                fechadicion: date
            })
        });
    } else {
        alert('ERROR, Inicie sesión');
    }
    
};

async function getWord(id){
    const docRef = doc(db, "palabras", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

export {
    insertWord, deleteWord, getWord
}