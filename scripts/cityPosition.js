export async function getCityPosition(cityName) {
    try {
        const response = await axios.get(`https://api-ninjas.com/v1/geocoding?city= + ${cityName}`, {
            headers: {
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Methods": true,
                'Access-Control-Allow-Headers': true,
                'Access-Control-Allow-Credentials': true,
                'X-Api-Key': 'WmUv+Yncl91PIEEgr6Kxmw==x6IbwnBLgPIaNARE'

            }
        });
        console.log(response);
        
        const latitude = response.data.latitude;
        const longitude = response.data.longitude;

        console.log('City position:', latitude, longitude);
        return { latitude, longitude };
    } catch (error) {
        console.error('Error fetching city position:', error);
        return null;
    }
}

//getCityPosition("New York");
