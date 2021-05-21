//COUNTRY INFO
const buttonCountry = document.querySelector(".btn-country");
const inputCountry = document.querySelector("#country");
const countryInfo = document.querySelector(".country__info");

const setMap = (center) => {
  document.getElementById("map").style.height = "450px";
  mapboxgl.accessToken =
    "pk.eyJ1IjoidG9tcGEyMjEyIiwiYSI6ImNrb2xrMzY5cTA0MGQyb2w2Ymp4aW9mZ3AifQ.wBq_3JRpAKD27psu9_TUWg";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 5,
  });
};

buttonCountry.addEventListener("click", (e) => {
  e.preventDefault();

  const url = `https://restcountries.eu/rest/v2/name/${inputCountry.value}`;

  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      const country = data.map((item) => {
        return {
          name: item.name,
          flag: item.flag,
          capital: item.capital,
          subRegion: item.subregion,
          population: item.population,
          language: item.languages,
          currency: [item.currencies[0].name, item.currencies[0].symbol],
          latlng: item.latlng,
        };
      });

      return renderCountry(country);
    })
    .catch((error) => {
      countryInfo.innerHTML = `
        <p>Oops. Something went wrong</p>
        <p>Check country name.</p>
        <p>Country name entered: ${inputCountry.value}</p>
        `;
      inputCountry.value = "";
    });
});

function renderCountry(country) {
  setMap([country[0].latlng[1], country[0].latlng[0]]);
  country = country.map((item) => {
    return `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Flag</th>
                    <th>Capital</th>
                    <th>Currency</th>
                    <th>Population</th>
                    <th>Language</th>
                    <th>Region</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${item.name}</td>
                    <td><img src="${item.flag}" alt="" class="table__img"></td>
                    <td>${item.capital}</td>
                    <td>${item.currency[0]} <span> (${item.currency[1]})</span></td>
                    <td>${item.population}</td>
                    <td>${item.language[0].name}</td>
                    <td>${item.subRegion}</td>
                </tr>
            </tbody>
        </table>
        `;
  });

  countryInfo.innerHTML = country.join("");
  inputCountry.value = "";
}

//NATIONALITY API
const buttonName = document.querySelector(".btn-name");
const nationality = document.querySelector(".nationality__guess");
const inputName = document.querySelector("#name");

buttonName.addEventListener("click", (e) => {
  e.preventDefault();

  const url = `https://api.nationalize.io?name=${inputName.value}`;

  async function getAPI() {
    const response = await fetch(url);
    const countries = await response.json();

    return countries.country;
  }

  getAPI().then((data) => renderNationality(data));
});

function renderNationality(countries) {
  countries = countries.map((country) => {
    percentage = Math.floor(country.probability * 100);
    return `
        <div class="guess">
            <p class="paragraph">${country.country_id}  ${percentage}%</p>
        </div>
        `;
  });

  nationality.innerHTML =
    `<p class="paragraph">Name: ${inputName.value}</p>` + countries.join("");
  inputName.value = "";
}

//MEMES API
// const memes = document.querySelector(".meme-cont");

// fetch("https://api.imgflip.com/get_memes")
// .then(data => {
//     return data.json();
// }).then(data => {
//     return data.data.memes;
// }).then(data => {
//     return render(data);
// }).catch(error => {
//     console.log(error);
// });

// function render(items) {

//     items = items.map(item => {
//         return `
//         <figure class="meme">
//                 <img class="meme__img" src="${item.url}" alt="${item.name}">
//                 <figcaption class="meme__title">${item.name}</figcaption>
//         </figure>
//         `;
//     });

//     memes.innerHTML = items.join('');
// };
