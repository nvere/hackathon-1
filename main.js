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


// // Add event listener to the button
// const button = document.querySelector('.button'); // Replace '.button' with the actual class name of your button
// button.addEventListener('click', onExploreButtonPush);

// // Function to be called when the button is clicked
// function onExploreButtonPush() {
//     // Call the onExploreButtonPush function from globe.js
//     onExploreButtonPush();
// }
