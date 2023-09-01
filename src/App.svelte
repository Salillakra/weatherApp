<script>
  import { onMount } from "svelte";
  import Weather from "./Weather.svelte";
  import CurrenWeather from "./CurrenWeather.svelte";
  import Loading from "./Loading.svelte";

  const context = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  // Loading animation
  let LoadingAnimation = false;

  let WeatherData = {};
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
        errorMessage = "Error fetching weather data.";
      }
    } catch (error) {
      LoadingAnimation = false; //shopping the animation
      console.error(error);
      errorMessage = "An error occurred.";
    }
  };
  onMount(() => {
    const defaultCity = "New York";
    getWeather({ target: { seachbar: { value: defaultCity } } });
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
  <button
    type="submit"
    class="flex rounded hover:bg-pink-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
  >
    <span class="material-symbols-outlined scale-150"> search </span>
  </button>
</form>

<!-- header -->
<CurrenWeather data={WeatherData} />

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
          {dayAfterTomorrow} {monthAfterTomorrow}
        {/if}
      </h1>
      <div>
        <Weather hourlyForecast={day.hour} />
      </div>
    </div>
  {/each}
{/if}

<style>
</style>
