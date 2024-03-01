export async function getCityPosition(cityName) {
    try {
        const response = await axios.get(`https://api-ninjas.com/api/geocoding?city=${cityName}`, {
            headers: {
                'X-Api-Key': 'gE7RNizcLiKwi4WOqq4dBg==SMC9uOEnWVszSVYm'
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

getCityPosition("New York");