(function() {
    // Wait for the UI to be ready
    function addButton() {
        let bottomUI = document.getElementById("geofs-ui-bottom"); // GeoFS bottom UI container
        if (!bottomUI) {
            setTimeout(addButton, 500);
            return;
        }

        // Create the button
        let myButton = document.createElement("button");
        myButton.innerText = "My Addon";
        myButton.style.padding = "8px";
        myButton.style.margin = "5px";
        myButton.style.cursor = "pointer";
        myButton.style.border = "1px solid white";
        myButton.style.background = "rgba(0, 0, 0, 0.6)";
        myButton.style.color = "white";
        myButton.style.borderRadius = "5px";

        // Add functionality when clicked
        myButton.onclick = function() {
            alert("Addon button clicked!"); // Replace with your function
        };

        // Append the button to the bottom UI
        bottomUI.appendChild(myButton);
    }

    addButton();
})();
