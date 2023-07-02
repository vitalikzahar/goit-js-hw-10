import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
const error = document.querySelector('.error');
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader')
 

select.addEventListener('change', getCatData);

function getCatData(event) {
   loader.style.display = 'none';
    const catId = event.target.value;
       fetchCatByBreed(catId).then((data) => {
        const img = data.url;
        const description = data.breeds[0].description;
        const name = data.breeds[0].name;
        const temperament = data.breeds[0].temperament;
        catInfo.innerHTML = 
            `<img src="${img}" alt="cat foto" width=300  />
        <div class="info">
            <h1 class="name">${name}</h1>
            <p>${description}</p>
            <p><span class="temperament">Temperament: </span>${temperament}</p>
        </div>`

        console.log(description)
        console.log(name)
        console.log(temperament)
        console.log(img)
    }).catch(() => {
    error.style.display = 'block';
})
}



fetchBreeds().then(cats => {
    cats.map(cat => {
        const option = `<option value = "${cat.id}">${cat.name}</option>`
        select.insertAdjacentHTML("beforeend", option);
   })
}).catch(() => {
    error.style.display = 'block';
})