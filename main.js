let time = new Date();
let timeNow = time.toDateString();
let tH3 = document.querySelector(".time h3");
tH3.innerHTML = timeNow;

function getWeather() {
  const apiKey = "b459b438b53225e7ddf86771baee8e0d";
  let city = document.getElementById("input").value;

  if (!city) {
    alert("please enter a city");
    return;
  }

  const CWURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(CWURL)
    .then((response) => {
      if (!response.ok) {
        confirm("Enter a valid city");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      let deg = document.querySelector(".deg h4");
      const fell = 273.15;
      deg.innerHTML = `${(data.main.feels_like - fell).toFixed(0)}°C`;
      let maxMin = document.querySelector(".myData h3");
      maxMin.innerHTML = `${(data.main.temp_max - fell).toFixed(0)}° / ${(
        data.main.temp_min - fell
      ).toFixed(0)}°`;
      let Wind = document.querySelector(".myData span p");
      Wind.innerHTML = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
      let mapCity = document.querySelector(".mapCity p");
      let icon = document.createElement("i");
      icon.className = "fa-solid fa-location-dot";
      icon.id = "icona";
      mapCity.appendChild(icon);
      mapCity.innerHTML = `${data.name}, ${data.sys.country}${icon.outerHTML}`;

      let status = document.querySelector(".logo img");
      console.log(data.weather[0].main);
      if (data.weather[0].main == "Clouds") {
        status.src = "img//clouds.png";
      } else if (data.weather[0].main == "Clear") {
        status.src = "img//clear.png";
      } else if (data.weather[0].main == "Rain") {
        status.src = "img//rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        status.src = "img//drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        status.src = "img//mist.png";
      } else if (data.weather[0].main == "Snow") {
        status.src = "img//snow.png";
      } else if (data.weather[0].main == "Wind") {
        status.src = "img//wind.png";
      }
      status.style.display = "block";
    });

  fetch(forecastUrl)
    .then((response) => {
      if (!response.ok) {
        console.error("Ener Avalid city");
      } else {
        return response.json();
      }
    })
    .then((forcastUrl) => {
      let all = document.querySelector(".all");
      all.innerHTML = "";

      let urlList = forcastUrl.list.slice(1, 6);
      let toDay = new Date().getDay() + 1;
      let ic = document.querySelector(".myData span i");
      ic.style.display = "block";
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      for (let i = 0; i < Math.min(urlList.length, days.length); i++) {
        let Ex5day =
          days[(toDay + i) % 7] +
          ": " +
          (urlList[i].main.feels_like - 273.15).toFixed(0) +
          "°C";
        let allH4 = document.createElement("h4");
        all.appendChild(allH4);
        allH4.innerHTML = Ex5day;
      }
    });
}
