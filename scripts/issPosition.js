

function getISSPosition() {
  setInterval(async () => {
    try {
      const response = await axios.get('http://api.open-notify.org/iss-now.json');
      const {latitude, longitude} =  response.data.iss_position;
      console.log('ISS position:', latitude, longitude);
      test(latitude,longitude)

      return {latitude, longitude};
    } catch (error) {
      console.error('Error retrieving ISS position:', error.message);
    }
  }, 5000);
}

//getISSPosition();
