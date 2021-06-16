let weather = {
  apiKey: "ace09aeb04fecc8dc14b2d0825d35a26",
  fetchWeather: function (city) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (city) {
    const { name } = city;
    const { icon, description } = city.weather[0];
    const { temp, humidity } = city.main;
    const { speed } = city.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + " celcius";
    document.querySelector(".weather").classList.remove("loading");
    
  },
  search: function () {
    this.fetchWeather(document.querySelector(".box").value);
  },
};

document.querySelector(".locate button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".box")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Hyderabad");