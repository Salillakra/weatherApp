<script>
  import { onMount } from "svelte";
  import Weather from "./Weather.svelte";
  import CurrenWeather from "./CurrenWeather.svelte";
  import Loading from "./Loading.svelte";
  // importing the location
  import { location } from "./utils/location.js";

  const context = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  // Loading animation
  let LoadingAnimation = false;

  let WeatherData = new Object();
  let errorMessage = "";

  const getWeather = async (event) => {
    LoadingAnimation = true;
    try {
      let city = event.target.seachbar.value.trim();
      if (city === "") {
        LoadingAnimation = false;
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

        LoadingAnimation = false; //shopping the animation
      } else {
        LoadingAnimation = false; //shopping the animation
        errorMessage =
          "An error occurred. Lord Indra Don't want you to see weather";
      }
    } catch (error) {
      LoadingAnimation = false; //shopping the animation
      console.error(error);
      errorMessage =
        "An error occurred. Lord Indra Don't want you to see weather";
    }
  };

  onMount(async () => {
    getWeather({ target: { seachbar: { value: "New York" } } });

    try {
      // Get the current location
      const currentLocation = await location();
      getWeather({ target: { seachbar: { value: currentLocation } } });
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  });

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 2);

  const dayAfterTomorrow = currentDate.getDate();
  const monthAfterTomorrow = currentDate.toLocaleString("default", {
    month: "long",
  });
</script>

{#if LoadingAnimation}
  <Loading />
{/if}

<!-- SearchBar -->
<form
  on:submit|preventDefault={getWeather}
  class="flex sm:w-[50%] items-center mx-2 sm:ml-auto space-x-3 my-4"
>
  <input
    type="text"
    name="seachbar"
    placeholder="Enter your city"
    class="w-full sm:w-56 border border-black px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500"
  />

  <button type="submit" class="material-symbols-outlined scale-150">
    search</button
  >
</form>

<!-- header -->
<CurrenWeather data={WeatherData} />

{#if errorMessage}
  <p class="text-red-500 text-center text-xl">{errorMessage}</p>
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
          {dayAfterTomorrow} {monthAfterTomorrow}
        {/if}
      </h1>
      <div>
        <Weather hourlyForecast={day.hour} />
      </div>
    </div>
  {/each}
{/if}

<!-- Footer -->
<footer class="text-center text-gray-600 text-sm py-2">
  <span class=""
    >&copy; {new Date().getFullYear()} Salil Lakra. All Rights Reserved.
  </span>
  <span class="italic">Skyscape</span> is licensed under the
  <a
    href="http://www.apache.org/licenses/LICENSE-2.0"
    target="_blank"
    rel="noopener noreferrer"
    class="text-blue-500 hover:underline">Apache License, Version 2.0</a
  >.
</footer>
