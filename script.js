// Keep the page useful without JavaScript or third-party mapping services.
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
