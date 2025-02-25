(function() {
    function createUI() {
        console.log("GeoFS Addon: Initializing...");

        // Wait for the GeoFS UI to load
        let bottomUI = document.querySelector(".geofs-ui-bottom");
        if (!bottomUI) {
            console.log("GeoFS Addon: Waiting for UI...");
            setTimeout(createUI, 500);
            return;
        }

        console.log("GeoFS Addon: UI Found, Injecting Addon...");

        // Prevent duplicate UI creation
        if (document.getElementById("myAddonButton")) {
            console.log("GeoFS Addon: Already loaded. Skipping re-injection.");
            return;
        }

        let uiVisible = false; // UI toggle state

        // Create the toggle button
        let myButton = document.createElement("button");
        myButton.id = "myAddonButton";
        myButton.innerText = "Toggle UI";
        myButton.className = "mdl-button mdl-js-button";
        myButton.style.padding = "8px";
        myButton.style.margin = "5px";
        myButton.style.cursor = "pointer";
        myButton.style.border = "1px solid white";
        myButton.style.background = "rgba(0, 0, 0, 0.6)";
        myButton.style.color = "white";
        myButton.style.borderRadius = "5px";

        console.log("GeoFS Addon: Button Created.");

        // Create the main UI container
        let uiBox = document.createElement("div");
        uiBox.id = "myAddonUI";
        uiBox.style.position = "fixed";
        uiBox.style.top = "50%";
        uiBox.style.left = "50%";
        uiBox.style.transform = "translate(-50%, -50%)";
        uiBox.style.width = "500px";
        uiBox.style.height = "350px";
        uiBox.style.background = "rgba(0, 0, 0, 0.9)";
        uiBox.style.color = "white";
        uiBox.style.padding = "15px";
        uiBox.style.border = "2px solid white";
        uiBox.style.borderRadius = "8px";
        uiBox.style.display = "none"; // Initially hidden
        uiBox.style.zIndex = "1000";

        console.log("GeoFS Addon: UI Box Created.");

        // Create the label and input field
        let label = document.createElement("label");
        label.innerText = "Enter a value:";
        uiBox.appendChild(label);

        let input = document.createElement("input");
        input.type = "text";
        input.style.width = "100%";
        input.style.margin = "10px 0";
        input.style.padding = "5px";
        input.onkeydown = function(event) {
            event.stopPropagation(); // Prevent game shortcuts
        };
        uiBox.appendChild(input);

        let submitButton = document.createElement("button");
        submitButton.innerText = "Submit";
        submitButton.style.width = "100%";
        submitButton.style.padding = "8px";
        submitButton.style.background = "white";
        submitButton.style.color = "black";
        submitButton.style.border = "none";
        submitButton.style.cursor = "pointer";
        submitButton.onclick = function() {
            alert("You entered: " + input.value);
        };
        uiBox.appendChild(submitButton);

        console.log("GeoFS Addon: Input and Submit Button Added.");

        // Function to toggle UI
        myButton.onclick = function() {
            uiVisible = !uiVisible;
            uiBox.style.display = uiVisible ? "block" : "none";
            console.log("GeoFS Addon: UI " + (uiVisible ? "Opened" : "Closed"));
        };

        // Append UI to the document
        bottomUI.appendChild(myButton);
        document.body.appendChild(uiBox);

        console.log("GeoFS Addon: UI Successfully Injected!");
    }

    createUI();
})();
