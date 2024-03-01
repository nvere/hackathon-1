// Import the onSubmit function from globe.js
import { onSubmit } from './globe.js';
import { onExploreButtonPush } from './globe.js';

// Function to query select an input field by class name and run the onSubmit function
let form = document.getElementById("nav__search");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    onExploreButtonPush();
    const city = event.target.elements.nav__city.value;
    onSubmit(city);
    form.reset();
});
