(function() {
    function createUI() {
        let bottomUI = document.querySelector(".geofs-ui-bottom"); // Select the bottom UI container
        if (!bottomUI) {
            setTimeout(createUI, 500);
            return;
        }

        // Prevent adding multiple elements
        if (document.getElementById("myAddonButton")) return;

        // Create the main button to toggle the UI box
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

        // Create the UI box
        let uiBox = document.createElement("div");
        uiBox.id = "myAddonUI";
        uiBox.style.position = "absolute";
        uiBox.style.top = "20%";
        uiBox.style.left = "50%";
        uiBox.style.transform = "translate(-50%, -50%)";
        uiBox.style.width = "300px";
        uiBox.style.background = "rgba(0, 0, 0, 0.8)";
        uiBox.style.color = "white";
        uiBox.style.padding = "15px";
        uiBox.style.border = "2px solid white";
        uiBox.style.borderRadius = "8px";
        uiBox.style.display = "none"; // Hidden by default
        uiBox.style.zIndex = "1000";

        // Add a label
        let label = document.createElement("label");
        label.innerText = "Enter a value:";
        uiBox.appendChild(label);

        // Add a text input
        let input = document.createElement("input");
        input.type = "text";
        input.style.width = "100%";
        input.style.margin = "10px 0";
        input.style.padding = "5px";
        uiBox.appendChild(input);

        // Add a submit button
        let submitButton = document.createElement("button");
        submitButton.innerText = "Submit";
        submitButton.style.width = "100%";
        submitButton.style.padding = "8px";
        submitButton.style.background = "white";
        submitButton.style.color = "black";
        submitButton.style.border = "none";
        submitButton.style.cursor = "pointer";

        // Action when clicking submit
        submitButton.onclick = function() {
            alert("You entered: " + input.value);
        };

        uiBox.appendChild(submitButton);

        // Add toggle functionality
        myButton.onclick = function() {
            uiBox.style.display = (uiBox.style.display === "none") ? "block" : "none";
        };

        // Append elements to the document
        bottomUI.appendChild(myButton);
        document.body.appendChild(uiBox);
    }

    createUI();
})();
