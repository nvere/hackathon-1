export async function getPeopleOnISS() {
    try {
        const response = await axios.get('http://api.open-notify.org/astros.json');
        const people = response.data.people.filter(person => person.craft === "ISS").map(person => person.name);
        return people;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// console.log('People on ISS:', getPeopleOnISS());
