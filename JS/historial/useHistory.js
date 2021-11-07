//fuction 
function historys(arr) {
    console.log(arr);
    let arr2 = [];
    arr.forEach((obj) => {
        if (typeof obj.editores !== 'undefined') {
            let unir = {
                id: obj.id,
                titulo: obj.titulo,
                editores: obj.editores
            };
            arr2.push(unir);
        }
    });
    return arr2;
}
function renderHistorys(
    arr,
) {
    $('.post').remove();
    arr.forEach((obj) => {
        let arr2 = obj.editores;

        let html = 
            `<article class="post">
            <div class="post-titulo">
                <h5 id="${obj.id}">${obj.titulo}</h5>
            </div>
            <div class="post-descripcion">
                <textarea class = "txt_resgistro" readonly="readonly">
                 ${arr2.map((obj2) => {
                    return ('\nRegistro: '+ obj2.editor + '  ' + obj2.fechaedicion);
                 })}
              </textarea>
            </div>
        </article>`;
        $(".posts").append(html);
    })
}

export { historys, renderHistorys }