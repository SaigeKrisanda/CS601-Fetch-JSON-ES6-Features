/**
CS 601 - Assignment 5
JavaScript that performs:
-event on mouse-click
i. Create a fetch request to return a promise
ii. Resolve the promise using the Response class
iii. Check the status code of the response
iv. Process the returned JSON data using JavaScript
*/

// Wait for the DOM content 
document.addEventListener("DOMContentLoaded", () => {

  // Get the button element 
  const button = document.getElementById("fetch-button");

  // Add event listener
  button.addEventListener("click", () => {

    // Send a fetch request and return a promise
    fetch("degrees.json")
      .then((response) => {

        // Check if the response was successful
        return response.ok ? response.json() : Promise.reject(new Error("Request failed with status code " + response.status));
      })
      .then((data) => {

        // Process the returned JSON data by calling the createTable function
        createTable(data.schools);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  // Creating schools table 
  function createTable(schools) {

    // Create a new table element
    const table = document.createElement("table");

    // Create the table header
    let headerRow = table.insertRow();

    Object.keys(schools[0]).forEach((key) => {
      let th = document.createElement("th");
      th.textContent = key.toUpperCase();
      headerRow.appendChild(th);
    });

    // Create table rows for each school object
    schools.forEach((school) => {
      let row = table.insertRow();

      // Iterate over the values of each school object to create table cells
      Object.values(school).forEach((value) => {
        let cell = row.insertCell();

        // Set the text content to the corresponding value
        cell.textContent = value;
      });
    });

    let tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
  }
});
