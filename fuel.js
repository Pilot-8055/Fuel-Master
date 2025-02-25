(function() {
    function addButton() {
        let optionsButton = document.querySelector('.geofs-ui-bottom button[data-toggle-panel=".geofs-preference-list"]'); // Select the "Options" button
        if (!optionsButton) {
            setTimeout(addButton, 500);
            return;
        }

        if (document.getElementById("myAddonButton")) return;

        let myButton = document.createElement("button");
        myButton.id = "myAddonButton";
        myButton.innerText = "My Addon";
        myButton.className = "mdl-button mdl-js-button";
        myButton.style.padding = "8px";
        myButton.style.marginLeft = "5px";
        myButton.style.cursor = "pointer";
        myButton.style.border = "1px solid white";
        myButton.style.background = "rgba(0, 0, 0, 0.6)";
        myButton.style.color = "white";
        myButton.style.borderRadius = "5px";

        myButton.onclick = function() {
            alert("Addon button clicked!");
        };

        optionsButton.parentNode.insertBefore(myButton, optionsButton.nextSibling);
    }

    addButton();
})();
