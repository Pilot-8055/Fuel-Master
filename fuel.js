(function() {
    function addButton() {
        let bottomUI = document.querySelector(".geofs-ui-bottom"); // Select the bottom UI container
        if (!bottomUI) {
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
        myButton.style.margin = "5px";
        myButton.style.cursor = "pointer";
        myButton.style.border = "1px solid white";
        myButton.style.background = "rgba(0, 0, 0, 0.6)";
        myButton.style.color = "white";
        myButton.style.borderRadius = "5px";

        // Add click event
        myButton.onclick = function() {
            alert("Addon button clicked!"); // Replace with your function
        };

        // Append the button to the bottom UI
        bottomUI.appendChild(myButton);
    }

    addButton();
})();
