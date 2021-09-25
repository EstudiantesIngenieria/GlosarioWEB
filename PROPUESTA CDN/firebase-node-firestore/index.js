// imports
const firebaseConfig = {
//config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

let edit_status = false;
let id_;

const word_add = document.getElementById('word-add');
const words_container = document.getElementById('words-container');
const words_enter = document.getElementById('words-enter');

async function agregar_palabra(author, title, defi, ex1, ex2){
    var today = new Date();   
    try {
        const docRef = await addDoc(collection(db, "Glosario"), {
          autor: author,
          palabra: title,
          definicion: defi,
          ejemplo1: ex1,
          ejemplo2: ex2,
          fechacreacion: today
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

async function obtener_palabras(){
    const querySnapshot = await getDocs(collection(db, "Glosario"));
    words_container.innerHTML = '';
    querySnapshot.forEach((doc) => {
        //Aqui puedo recuperar datos con doc.data.author
        const wordd = doc.data();
        wordd.id = doc.id;

        words_container.innerHTML += `<div class="card card-body mt-2 border-primary">
            <h4>${wordd.palabra}</h4>
            <p><b>Creado por: </b>${wordd.autor}</p>
            <p><b>Definicion: </b>${wordd.definicion}</p>
            <p><b>Ejemplo 1: </b>${wordd.ejemplo1}</p>
            <p><b>Ejemplo 2: </b>${wordd.ejemplo2}</p>
            <p><b>En la fecha: </b>${wordd.fechacreacion.toDate()}</p>
            <div>
                <button class="btn btn-info btn-edit" data-id="${wordd.id}">Editar</button>
                <button class="btn btn-warning btn-delete" data-id="${wordd.id}">Eliminar</button>
            </div>
        </div>`
        const btnsDelete = document.querySelectorAll('.btn-delete')
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log(e.target.dataset.id);
                eliminar_palabra(e.target.dataset.id);
                obtener_palabras();
            })
        })
        const btnsEdit = document.querySelectorAll('.btn-edit')
        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async(e) => {
                edit_status = true;

                obtener_palabra(e.target.dataset.id)
                word_add['btn-add-word'].innerText =  "Actualizar";
                // editar_palabra(e.target.dataset.id)
                // obtener_palabras();
            })
        })
    });
}

async function obtener_palabra(id){
    const docRef = doc(db, "Glosario", id);
    const docSnap = await getDoc(docRef);
    word_add['word-author'].placeholder =  "Ingrese el editor";
    word_add['word-title'].value = docSnap.data().palabra;
    word_add['word-def'].value = docSnap.data().definicion;
    word_add['word-ex1'].value = docSnap.data().ejemplo1;
    word_add['word-ex2'].value = docSnap.data().ejemplo2;
    id_ = docSnap.id;
}

async function eliminar_palabra(id){
    await deleteDoc(doc(db, "Glosario", id));
    obtener_palabras();
}

async function editar_palabra(id, editor, title, defi, ex1, ex2){
    var today = new Date();
    await updateDoc(doc(db, "Glosario", id), {
        palabra: title,
        definicion: defi,
        ejemplo1: ex1,
        ejemplo2: ex2,
        editores: arrayUnion({
            editor: editor,
            fechadicion: today
        })
    });
    
}

window.addEventListener('DOMContentLoaded', async(e) => {
    obtener_palabras();
})

word_add.addEventListener('submit', async(e) => {
    e.preventDefault();
    word_add['word-author'].placeholder =  "Ingrese el autor";
    const author = word_add['word-author'];
    const title = word_add['word-title'];
    const defi = word_add['word-def'];
    const ex1 = word_add['word-ex1'];
    const ex2 = word_add['word-ex2'];
    if (!edit_status){
        agregar_palabra(author.value, title.value, defi.value, ex1.value, ex2.value);
    } else {
        editar_palabra(id_, author.value, title.value, defi.value, ex1.value, ex2.value);
        edit_status = false;
        word_add['btn-add-word'].innerText =  "Guardar";
    }
    
    obtener_palabras();
    word_add.reset();
    author.focus();

})