// async function API() {
//     const jason = await fetch('https://proyecto-gloasario-default-rtdb.firebaseio.com/Glosario/glosario.json')
//     const res = await jason.json()
//     // const resultados = await res.
//     // res.forEach(ress => console.log(ress.id))
//     console.log(res)

// }

//OTRA MANERA DE HACER LA CONSULTA
let requestURL = "https://proyecto-gloasario-default-rtdb.firebaseio.com/Hero.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "text";
request.send();

request.onload = function () {
  const textoGlosario = request.response;
  console.log(textoGlosario);
  const superHeroes = JSON.parse(textoGlosario);
};

function populateHeader(jsonObj) {
    myH1.textContent = jsonObj['squadName'];
    header.appendChild(myH1);

    const myPara = document.createElement('p');
    myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    header.appendChild(myPara);
  }