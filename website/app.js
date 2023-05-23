// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=52c95c60f07f9e2fa854b1d4b614497a&units=imperial";

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
document.getElementById("generate").addEventListener("click", performAction);

async function performAction() {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  const response = await fetch(`${baseURL}${zip}${apiKey}`);
  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(response.status, response.statusText, errorMessage);
    alert("Unable to retrieve weather data.");
    return;
  }
  const data = await response.json();
  await postDataApi("/addWeatherData", {
    temp: data.main.temp,
    date: newDate,
    userResponse: feelings,
  }).then(updateUI());
}

// Async POST
/* Function to POST data */
// Async POST
const postDataApi = async (url = "", data = {}) => {
  console.log("post weather data: ", data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */

// appropriately handle the error

/* Function to update UI */
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const alldata = await request.json();
    console.log("updateUI: ", alldata);
    document.getElementById("date").innerHTML = `Date: ${alldata.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${alldata.temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `Feelings: ${alldata.userResponse}`;
  } catch (error) {
    console.log("error", error);
  }
};
