// location.js
export const location = async () => {

    
  const api_key = import.meta.env.VITE_GEOLOCATION_KEY;

  return new Promise(async (resolve, reject) => {
    try {
      async function SuccessfulCallback(position) {
        const { latitude, longitude } = await position.coords;
        let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${api_key}`;
        const request = await fetch(url);
        const response = await request.json();

        // Check if there are results in the response
        if (response.results && response.results.length > 0) {
          // Extract the formatted address from the response
          const formattedAddress = response.results[0].formatted;

          // Check if the formatted address is available
          if (formattedAddress) {
            resolve(formattedAddress);
          } else {
            reject("Formatted address not found in the response.");
          }
        } else {
          reject("No results found in the response.");
        }
      }

      function ErrorCallback(error) {
        reject(error);
      }

      navigator.geolocation.getCurrentPosition(
        SuccessfulCallback,
        ErrorCallback
      );
    } catch (error) {
      reject(error);
    }
  });
};
