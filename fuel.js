(function() {
    function createUI() {
        let bottomUI = document.querySelector(".geofs-ui-bottom");
        if (!bottomUI) {
            setTimeout(createUI, 500);
            return;
        }

        // Prevent duplicate UI elements
        if (document.getElementById("myAddonButton")) return;

        // Toggle state variable
        let uiVisible = false;

        // Create the main toggle button
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
        uiBox.style.display = "none"; // Hidden by default
        uiBox.style.zIndex = "1000";

        // Create tab navigation
        let tabsContainer = document.createElement("div");
        tabsContainer.style.display = "flex";
        tabsContainer.style.justifyContent = "space-around";
        tabsContainer.style.borderBottom = "1px solid white";
        tabsContainer.style.paddingBottom = "5px";

        let tabs = ["Main", "Details", "Settings"];
        let tabContents = {};

        tabs.forEach((tabName, index) => {
            let tab = document.createElement("button");
            tab.innerText = tabName;
            tab.style.flex = "1";
            tab.style.padding = "10px";
            tab.style.background = index === 0 ? "white" : "transparent";
            tab.style.color = index === 0 ? "black" : "white";
            tab.style.border = "none";
            tab.style.cursor = "pointer";
            tab.style.outline = "none";

            tab.onclick = function() {
                // Hide all tab contents
                Object.values(tabContents).forEach(tabContent => {
                    tabContent.style.display = "none";
                });

                // Show selected tab content
                tabContents[tabName].style.display = "block";

                // Update tab button styles
                tabsContainer.querySelectorAll("button").forEach(btn => {
                    btn.style.background = "transparent";
                    btn.style.color = "white";
                });
                tab.style.background = "white";
                tab.style.color = "black";
            };

            tabsContainer.appendChild(tab);
        });

        uiBox.appendChild(tabsContainer);

        // Create tab content areas
        tabs.forEach((tabName, index) => {
            let tabContent = document.createElement("div");
            tabContent.style.display = index === 0 ? "block" : "none";
            tabContent.style.padding = "10px";

            // Add elements based on tab
            if (tabName === "Main") {
                let label = document.createElement("label");
                label.innerText = "Enter a value:";
                tabContent.appendChild(label);

                let input = document.createElement("input");
                input.type = "text";
                input.style.width = "100%";
                input.style.margin = "10px 0";
                input.style.padding = "5px";
                input.onkeydown = function(event) {
                    event.stopPropagation(); // Prevent game shortcuts
                };
                tabContent.appendChild(input);

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
                tabContent.appendChild(submitButton);
            } else if (tabName === "Details") {
                let aircraftInfo = document.createElement("p");
                aircraftInfo.innerText = "Selected Aircraft: Loading...";
                aircraftInfo.id = "aircraftInfo";
                tabContent.appendChild(aircraftInfo);

                let flightStatus = document.createElement("p");
                flightStatus.innerText = "Flight Status: Loading...";
                flightStatus.id = "flightStatus";
                tabContent.appendChild(flightStatus);
            }

            uiBox.appendChild(tabContent);
            tabContents[tabName] = tabContent;
        });

        // Function to update aircraft info and flight status
        function updateFlightDetails() {
            let aircraftInfo = document.getElementById("aircraftInfo");
            let flightStatus = document.getElementById("flightStatus");

            if (geofs.aircraft && geofs.aircraft.instance) {
                aircraftInfo.innerText = "Selected Aircraft: " + geofs.aircraft.instance.name;
                flightStatus.innerText = "Flight Status: " + (geofs.aircraft.instance.isOnGround ? "On Ground" : "Flying");
            }

            setTimeout(updateFlightDetails, 1000); // Update every second
        }

        updateFlightDetails(); // Start updating details

        // Close UI when clicking outside of it
        document.addEventListener("click", function(event) {
            if (uiVisible && !uiBox.contains(event.target) && event.target !== myButton) {
                uiBox.style.display = "none";
                uiVisible = false;
            }
        });

        // Toggle button function
        myButton.onclick = function() {
            uiVisible = !uiVisible;
            uiBox.style.display = uiVisible ? "block" : "none";
        };

        // Prevent keyboard shortcuts while typing
        document.addEventListener("keydown", function(event) {
            if (uiVisible && document.activeElement.tagName === "INPUT") {
                event.stopPropagation();
            }
        });

        // Append elements
        bottomUI.appendChild(myButton);
        document.body.appendChild(uiBox);
    }

    createUI();
})();
