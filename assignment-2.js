// find selectedTitle
const sectionTitles = document.querySelectorAll(".section-title");
Array.from(sectionTitles).map((item) => {
  item.addEventListener("click", (e) => {
    const id = item.id;
    selectedSection(item, id);
  });
});

const showHideContent = (item) => {
  const div = item.parentElement.querySelector("div");
  if (div.style.display !== "none") {
    div.style.display = "none";
  } else {
    div.style.display = "block";
  }
};

const selectedSection = (item, id) => {
  switch (id) {
    case "section-1-title":
      showHideContent(item);
      getListOfAllCountries();
      break;
    case "section-2-title":
      showHideContent(item);
      break;
    case "section-3-title":
      showHideContent(item);
      break;
    case "section-4-title":
      showHideContent(item);
      break;
    case "section-5-title":
      showHideContent(item);
      break;
  }
};

// clear Data
const clearButtons = document.querySelectorAll(".clear");
Array.from(clearButtons).map((item) => {
  item.addEventListener("click", () => {
    const parent = item.parentElement;

    if (
      parent.id === "section3-div" ||
      parent.id === "section4-div" ||
      parent.id === "section5-div"
    ) {
      const dataContainer = parent.querySelector(".section-lists");
      const input = parent.querySelector("form input");
      dataContainer.innerHTML = "";
      input.value = "";
    } else {
      const dataContainer = parent.querySelector(".data-container");
      const input = parent.querySelector("form input");
      dataContainer.innerHTML = "";
      input.value = "";
    }
  });
});

// form1
const form1 = document.querySelector("#form1");
form1.addEventListener("submit", (e) => {
  e.preventDefault();
  const countryName = form1.querySelector("input").value;
  searchCountryByFullName(countryName, form1);
});

// form2
const form2 = document.querySelector("#form2");
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  const countryName = form2.querySelector("input").value;
  getBorderCountries(countryName, form2);
});
// form3
const form3 = document.querySelector("#form3");
form3.addEventListener("submit", (e) => {
  e.preventDefault();
  const langName = form3.querySelector("input").value;
  getCountriesBasedOnLanguage(langName, form3);
});
// form4
const form4 = document.querySelector("#form4");
form4.addEventListener("submit", (e) => {
  e.preventDefault();
  const numberOfPopulation = form4.querySelector("input").value;
  getCountriesByPopulation(numberOfPopulation, form4);
});

const baseURL = "https://restcountries.com/v3.1/all";
const fetchData = async (config) => {
  try {
    const result = await axios(config);
    return result.data;
  } catch (error) {
    throw new Error("404 Item Not Found");
  }
};

// Get list of all countries
const getListOfAllCountries = () => {
  fetchData("https://restcountries.com/v3.1/all")
    .then((res) =>
      res.map((item) => {
        let list = document.createElement("li");
        list.className = "section-list";
        let text = document.createTextNode(item.name.common);
        list.appendChild(text);

        document.querySelector("#section-lists1").appendChild(list);
      })
    )
    .catch((err) => console.log(err));
};

// Search for a country by full name, either international or native (such as Finland or Suomi)
const searchCountryByFullName = (countryName, form1) => {
  let dataContainer = form1.parentElement.querySelector(".data-container");
  dataContainer.innerHTML = "";
  fetchData(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((res) => {
      let text = document.createTextNode(JSON.stringify(res));
      dataContainer.classList.remove("warning");
      dataContainer.appendChild(text);
      form1.parentElement.appendChild(dataContainer);
    })
    .catch((err) => {
      dataContainer.innerHTML = err;
      dataContainer.classList.add("warning");
      form1.parentElement.appendChild(dataContainer);
    });
};

// Given a country name, find out what other countries it's bordering with
getBorderCountries = (countryName, form2) => {
  fetchData(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((res) =>
      res[0].borders.map((shortName) => {
        fetchData(`https://restcountries.com/v2/alpha/${shortName}`).then(
          (res) => {
            let list = document.createElement("li");
            list.className = "section-list";
            let text = document.createTextNode(res.name);
            list.appendChild(text);

            document.querySelector("#section-lists2").appendChild(list);
          }
        );
      })
    )
    .catch((err) => console.log(err));
};

// Given the code (2 characters) of a language, find out what countries are speaking it
const getCountriesBasedOnLanguage = (lang, form3) => {
  fetchData(`https://restcountries.com/v2/lang/${lang}`)
    .then((res) =>
      res.map((item) => {
        let list = document.createElement("li");
        list.className = "section-list";
        let text = document.createTextNode(item.name);
        list.appendChild(text);

        document.querySelector("#section-lists3").appendChild(list);
      })
    )
    .catch((err) => console.log(err));
};

// Given a population (in millions), find out what countries have more people than that
const getCountriesByPopulation = (numberOfPopulation, form4) => {
  fetchData(`https://restcountries.com/v2/all`)
    .then((res) =>
      res.filter((res) => {
        if (res.population > numberOfPopulation * 1000000) {
          let list = document.createElement("li");
          list.className = "section-list";
          let text = document.createTextNode(`${res.name} (${res.population})`);
          list.appendChild(text);

          document.querySelector("#section-lists4").appendChild(list);
        }
      })
    )
    .catch((err) => console.log(err));
};
