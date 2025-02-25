(function() {
    function addButton() {
        let navButton = document.querySelector('.geofs-ui-bottom button[data-toggle-panel=".geofs-map-list"]'); // Select the "Nav" button
        if (!navButton) {
            setTimeout(addButton, 500);
            return;
        }

        // Prevent adding multiple buttons
        if (document.getElementById("myAddonButton")) return;

        // Create the button
        let myButton = document.createElement("button");
        myButton.id = "myAddonButton";
        myButton.innerText = "My Addon";
        myButton.className = "mdl-button mdl-js-button"; // Match GeoFS button style
        myButton.style.padding = "8px";
        myButton.style.marginLeft = "5px";
        myButton.style.cursor = "pointer";
        myButton.style.border = "1px solid white";
        myButton.style.background = "rgba(0, 0, 0, 0.6)";
        myButton.style.color = "white";
        myButton.style.borderRadius = "5px";

        // Add click event
        myButton.onclick = function() {
            alert("Addon button clicked!"); // Replace with your function
        };

        // Insert the button right after the Nav button
        navButton.parentNode.insertBefore(myButton, navButton.nextSibling);
    }

    addButton();
})();
