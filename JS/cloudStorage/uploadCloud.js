import {
   strg,
   ref,
   uploadBytes,
   getDownloadURL,
   auth,
} from "../firebase/credentials.js";

//function for upload img in Cloud Storage
async function uploadImg(reference, file){
    //check if there is an user signed in
    let signedIn = auth.currentUser;
    //if auth.currentUser is not null, then upload the file obj with uploadBytes in Imagenes/
    if (!signedIn) {
        const usersCollection = ref(strg, `Imagenes/${reference}`);
        await uploadBytes(usersCollection, file);
        alert('Image uploaded succesfuly');
    } else {
        alert('ERROR, Inicie sesión');
    }
};

async function getImgDownloadURL(reference){
    let downloadURL;
    await getDownloadURL(ref(strg, `Imagenes/${reference}`)).then(function(url) {
         downloadURL = url;
    })
    return downloadURL;
};

export {
    uploadImg,
    getImgDownloadURL
}