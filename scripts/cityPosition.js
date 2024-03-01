let options = {
    method: 'GET',
    url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
    params: {
        address: 'Denver Colorado'
    },
    headers: {
        'X-RapidAPI-Key': 'c9778a9535mshe39df3d0fa8ac57p104e5ejsn99e4077e9a6c',
        'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
    }
};

export async function getCityPosition(address) {
    try {
        options.params.address = address;
        const response = await axios.request(options);
        return { lat: response.data.Results[0].latitude, lng: response.data.Results[0].longitude };
    } catch (error) {
        try {
            getCityFromJSON(address);
        } catch (error) {
            console.error(error);
        }
    }
}

export function getCityFromJSON(cityName) {
    fetch('../assets/cities.json')
        .then(response => response.json())
        .then(cities => {
            const city = cities.find(city => city.name === cityName);

            if (city) {
                console.log(city.lat, city.lng);

                return { lat: city.lat, lng: city.lng };
            }

            else {
                throw new Error(`City not found: ${cityName}`);
            }
        })
        .catch(error => console.error(error));
}

