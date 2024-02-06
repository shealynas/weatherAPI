// let widget = document.createElement("h2");
// widget.innerHTML = "banana";

// const apiUrl =
//   "http://api.weatherapi.com/v1/marine.json?key=649beca451754e47bba44229242401&q=96766&days=7";

// fetch(apiUrl)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     let myDays = data.forecast.forecastday;

//     // myDays.forEach((thing) => {
//     //   console.log(thing.date);
//     //   console.log(thing.day.maxtemp);
//     // });
//     for (i = 0; i < myDays.length; i++) {
//       for (x = 0; x < 4; x++) {
//         console.log(myDays[i].day.tides[0].tide[x]);
//       }
//     }
//     // Handle the JSON response data here
//     // console.log(myDays);
//   })
//   .catch((error) => {
//     // Handle errors here
//     console.error("Fetch error:", error);
//   });

// function fetchWeather() {
//   // Get the user input from the input field
//   const location = document.getElementById("locationInput").value;

//   // Check if the user provided a location
//   if (location) {
//     // Construct the API URL with the user-provided location
//     const apiUrl = `http://api.weatherapi.com/v1/marine.json?key=649beca451754e47bba44229242401&q=${encodeURIComponent(
//       location
//     )}&days=7`;

//     // Make the fetch request
//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         let myDays = data.forecast.forecastday;
//         for (i = 0; i < myDays.length; i++) {
//           for (x = 0; x < 4; x++) {
//             console.log(myDays[i].day.tides[0].tide[x]);
//           }
//         }
//         // Handle the JSON response data here
//         displayWeatherData(data);
//       })
//       .catch((error) => {
//         // Handle errors here
//         console.error("Fetch error:", error);
//       });
//   } else {
//     // Handle the case where the user did not provide a location
//     console.log("No location provided.");
//   }
// }

// function displayWeatherData(data) {
//   // Display the weather data in the designated div
//   const weatherDataDiv = document.getElementById("weatherData");
//   weatherDataDiv.innerHTML = JSON.stringify(data, null, 2);
// }

function fetchWeather() {
  // Get the user input from the input field
  const location = document.getElementById("locationInput").value;

  // Check if the user provided a location
  if (location) {
    // Construct the API URL with the user-provided location
    const apiUrl = `http://api.weatherapi.com/v1/marine.json?key=649beca451754e47bba44229242401&q=${encodeURIComponent(
      location
    )}&days=7`;

    // Make the fetch request
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the JSON response data here
        displayWeatherData(data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Fetch error:", error);
      });
  } else {
    // Handle the case where the user did not provide a location
    console.log("No location provided.");
  }
}

function displayWeatherData(data) {
  // Display the weather data in the designated div
  const weatherDataDiv = document.getElementById("weatherData");

  // Clear previous content
  weatherDataDiv.innerHTML = "";

  // Check if forecast data is available
  if (data.forecast && data.forecast.forecastday) {
    let forecastDays = data.forecast.forecastday;

    for (let i = 0; i < forecastDays.length; i++) {
      const day = forecastDays[i].day;

      // Check if tide data is available
      if (day.tides && day.tides.length > 0) {
        const tides = day.tides[0].tide;

        // Create a container for each day
        const dayContainer = document.createElement("div");

        // Use forecastDays[i].date instead of day.date

        const dateTitle = forecastDays[i].date
          ? formatDate(forecastDays[i].date)
          : "Unknown Date";
        dayContainer.innerHTML = `<h3>${dateTitle}</h3>`;

        // Display tide information for each day
        for (let x = 0; x < Math.min(tides.length, 4); x++) {
          const tideInfo = tides[x];

          // Check if tideInfo is available and has necessary properties
          if (
            tideInfo &&
            tideInfo.tide_time &&
            tideInfo.tide_height_mt &&
            tideInfo.tide_type
          ) {
            const tideElement = document.createElement("p");
            tideElement.textContent = `Tide ${x + 1}: ${
              tideInfo.tide_type
            } at ${tideInfo.tide_time}, Height: ${
              tideInfo.tide_height_mt
            } meters`;

            // Append tideElement to dayContainer
            dayContainer.appendChild(tideElement);
          } else {
            dayContainer.innerHTML += `<p>Tide ${
              x + 1
            }: Not available or missing required properties</p>`;
          }
        }

        // Append dayContainer to weatherDataDiv
        weatherDataDiv.appendChild(dayContainer);
      } else {
        // Use forecastDays[i].date instead of day.date
        weatherDataDiv.innerHTML += `<p>No tide data available for ${
          forecastDays[i].date ? forecastDays[i].date : "Unknown Date"
        }</p>`;
      }
    }
  } else {
    weatherDataDiv.innerHTML = "<p>No forecast data available</p>";
  }
}

function formatDate(inputDate) {
  // Parse the input date
  const parsedDate = new Date(inputDate);

  // Get the month, day, and year components
  const month = parsedDate.toLocaleString("en-US", { month: "long" });
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  // Construct the formatted date
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}
