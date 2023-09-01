<script>
  import { onMount } from "svelte";
  import Weather from "./Weather.svelte";

  const context = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  let WeatherData = {};
  let errorMessage = "";

  const getWeather = async (event) => {
    try {
      event.preventDefault();
      let city = event.target.seachbar.value.trim();
      if (city === "") {
        errorMessage = "Please enter a city.";
        return;
      }

      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`,
        context
      );

      if (response.ok) {
        WeatherData = await response.json();
        errorMessage = "";
      } else {
        errorMessage = "Error fetching weather data.";
      }
    } catch (error) {
      console.error(error);
      errorMessage = "An error occurred.";
    }
  };

  onMount(() => {});

  // Get the current date
  const currentDate = new Date();

  // Add 2 days to the current date
  currentDate.setDate(currentDate.getDate() + 2);

  // Get the day and month from the updated date
  const DayAfterTommorow = currentDate.getDate();
  const DayAfterTommorowMonth = currentDate.toLocaleString("default", {
    month: "long",
  });
</script>

<form on:submit={getWeather}>
  <input
    type="text"
    name="seachbar"
    placeholder="Enter your city"
    class="w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-500"
  />
  <button
    type="submit"
    class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
  >
    Get Weather
  </button>
</form>

{#if errorMessage}
  <p class="text-red-500">{errorMessage}</p>
{/if}

{#if WeatherData.forecast}
  {#each WeatherData.forecast.forecastday as day, i}
    <div class="p-5 my-10">
      <h1 class="text-4xl">
        {#if i === 0}
          Today
        {:else if i === 1}
          Tomorrow
        {:else if i === 2}
          {DayAfterTommorow} {DayAfterTommorowMonth}
        {/if}
      </h1>
      <div>
        <Weather hourlyForecast={day.hour} />
      </div>
    </div>
  {/each}
{/if}
