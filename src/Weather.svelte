<script>
  export let hourlyForecast;
  console.log(hourlyForecast);
</script>

<div class="bg-gray-100 p-4 w-full overflow-x-auto rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold mb-4">Hourly Weather Forecast</h2>

  <div class="flex space-x-4 overflow-x-auto pb-4">
    {#each hourlyForecast as hour}
      <div
        class="w-72 p-4 border shadow-blue-500 cursor-pointer border-gray-300 rounded-md hover:shadow-2xl hover:scale-110 transition duration-300 ease-in-out"
      >
        <div class="text-center mb-2">
          <p class="text-lg font-semibold">{hour.time.slice(-5)}</p>
          <p class="text-gray-600">Temperature: {hour.temp_c} °C</p>
        </div>
        <div class="flex items-center justify-center">
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
