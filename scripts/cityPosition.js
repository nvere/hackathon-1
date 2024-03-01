
// export async function getCityPosition(cityName) {
//     try {
//         const response = await axios.get(`https://api-ninjas.com/v1/geocoding?city= + ${cityName}`, {
//             headers: {
//                 "Access-Control-Allow-Origin": true,
//                 "Access-Control-Allow-Methods": true,
//                 'Access-Control-Allow-Headers': true,
//                 'Access-Control-Allow-Credentials': true,
//                 'X-Api-Key': 'WmUv+Yncl91PIEEgr6Kxmw==x6IbwnBLgPIaNARE'

//             }
//         });
//         console.log(response);
        
//         const latitude = response.data.latitude;
//         const longitude = response.data.longitude;

//         console.log('City position:', latitude, longitude);
//         return { latitude, longitude };
//     } catch (error) {
//         console.error('Error fetching city position:', error);
//         return null;
//     }
// }

export function getCityPosition(cityName) {
    // Fetch the cities.json file
    fetch('../assets/cities.json')
      .then(response => response.json())
      .then(cities => {
        // Find the city with the matching name
        const city = cities.find(city => city.name === cityName);
  
        // If the city was found, return the latitude and longitude
        if (city) {
            console.log(city.lat, city.lng);
            
          return { latitude: city.lat, longitude: city.lng };
        }
  
        // If the city was not found, throw an error
        else {
          throw new Error(`City not found: ${cityName}`);
        }
      })
      .catch(error => console.error(error));
  }

console.log('City Position:');
getCityPosition("Kelowna");

// getCityPosition("New York");
// getCityPosition("New York");
