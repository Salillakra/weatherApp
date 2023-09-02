<script>
  export let hourlyForecast;
</script>

<div class="bg-gray-100 p-4 w-full overflow-x-auto rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold mb-4">Hourly Weather Forecast</h2>

  <div class="flex space-x-4 overflow-x-auto pb-4">
    {#each hourlyForecast as hour}
      <div
        class=" w-44 sm:w-60 p-4 border cursor-pointer border-gray-400 rounded-md md:hover:shadow-neon
        hover:border-gray-800 transition duration-300 ease-in-out flex flex-col items-center justify-center"
      >
        <div class=" w-[inherit] text-center mb-2">
          <p class="text-lg font-semibold">{hour.time.slice(-5)}</p>
          <p class="text-gray-600">Temperature: {hour.temp_c} °C</p>
        </div>
        <div class="flex items-center justify-center w-[inherit] gap-4">
          <img
            class="w-12 h-12"
            src={hour.condition.icon}
            alt={hour.condition.text}
          />
          <p class="text-gray-600">{hour.condition.text}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  img {
    scale: 1.5;
  }
</style>
