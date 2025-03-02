(function() {
    if (document.getElementById('geofs-addon-button')) return;
    
    let button = document.createElement('button');
    button.id = 'geofs-addon-button';
    button.className = 'mdl-button mdl-js-button geofs-f-standard-ui';
    button.innerText = 'FUEL MASTER';
    button.style.marginLeft = '10px';
    button.onclick = toggleAddonUI;
    
    document.querySelector('.geofs-ui-bottom').appendChild(button);
    
    // Create the addon UI using HTML structure
    let addonUI = document.createElement('div');
    addonUI.id = 'geofs-addon-ui';
    addonUI.innerHTML = `
        <!-- <button id="close-addon-btn" style="height: 30px; width: 30px; position: absolute; top: 10px; right: 10px; padding: 5px; cursor: pointer; background: #ff5555; color: white; border: none; border-radius: 50%;">X</button> -->

        <div id="tabs-container" style="display: flex; justify-content: space-around;">
            <button id="details-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2; border-top-left-radius: 15px;">Details</button>
            <button id="planner-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;">Planner</button>
            <button id="refuel-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;">Refuel</button>
            <button id="instructions-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;">Instructions</button>
            <button id="more-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;">More</button>
            <button id="debug-tab-btn" class="tab-button" style="display: block; width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;">debug</button>
	    <button id="close-addon-btn" style="width: 240px; height: 50px; cursor: pointer; background: #f55; color: white; border: none; border-top-right-radius: 15px;">X</button>
        </div>

	 <div style="padding: 40px;">
	        <div id="details-tab">
                <div>
                <img id="aircraft-image" align="right" style="width: 200px; height: auto; border-radius: 10px; padding: 40px;">
                    <h3 id="aircraft-name"></h3>
                    <div id="fuel-section" style="display: none;">	
                        <h4>FUELING DETAILS</h4>
                        <h6>Maximum Fuel Capacity: <span id="max-fuel"></span> kg</h6>
                        <h6>Fuel Onboard: <span id="fuel-onboard"></span> kg</h6>
                        <h6>Estimated Flight Time: <span id="flight-time"></span> minutes</h6>
                    </div>
                </div>
	        </div>
	
        <div id="planner-tab" style="display: none;">
            <h3>Fuel Planner</h3>
	    <div style="height:100px; margin-bottom: 20px; width: 98%; background-color: #ddd; border: 5px solid #ccc; border-radius: 100px;"><img id="aircraft-image1" align="right" style="margin-right: 80px; padding: 5px; width: auto; height: 92px; max-height: 92px; border-radius: 10px;"><h4 id="aircraft-name1" style="padding: 12px; margin-left: 40px;"></h4></div>
            <h6>Enter estimated flight distance (NM): <input type="number" id="flight-distance" style="width: 80px;"></h6>
            <h6>Required Fuel: <span id="required-fuel">N/A</span> kg</h6>
            <button id="calculate-fuel-btn">Calculate</button>
        </div>
        
        <div id="refuel-tab" style="display: none;">
            <h3>Refuel</h3>
	    <div style="height:100px; margin-bottom: 20px; width: 98%; background-color: #ddd; border: 5px solid #ccc; border-radius: 100px;"><img id="aircraft-image2" align="right" style="margin-right: 80px; padding: 5px; width: auto; height: 92px; max-height: 92px; border-radius: 10px;"><h4 id="aircraft-name2" style="padding: 12px; margin-left: 40px;"></h4></div>
            <h6>Current Fuel: <span id="current-fuel">0</span> kg</h6>
            <h6>Add Fuel (kg): <input type="number" id="add-fuel" style="width: 80px;"></h6>
            <button id="refuel-btn">Refuel</button>
        </div>
	        <div id="instructions-tab" style="display: none;">Instructions will go here</div>
	        <div id="more-tab" style="display: none;">
	            <button id="remove-addon-btn" style="width: 100%; padding: 10px; cursor: pointer; background: red; color: white; border: none; border-radius: 5px;">Remove Addon</button>
                </div>
	
	        <div id="debug-tab" style="display: none;">
	            <p id="aircraft-details">Aircraft: Unknown</p>
	            <p id="flight-status">Status: Unknown</p>
	            <p id="throttle-info">Throttle: Unknown</p>
	        </div>

	 </div>
    `;
    addonUI.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 700px; height: 500px; background: rgba(255, 255, 255, 0.9); color: black; padding: 0; border-radius: 15px; display: none; z-index: 1000; box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);";
    document.body.appendChild(addonUI);
	
	// Initialised Global Variables
    let maxFuel;
    let fuelOnBoard;
    let burnRate;
    let throttlePercent;
    let isOnGround;
    let aircraftName;

    document.getElementById('details-tab-btn').onclick = () => showTab('details');
    document.getElementById('planner-tab-btn').onclick = () => showTab('planner');
    document.getElementById('refuel-tab-btn').onclick = () => showTab('refuel');
    document.getElementById('instructions-tab-btn').onclick = () => showTab('instructions');
    document.getElementById('more-tab-btn').onclick = () => showTab('more');
    document.getElementById('debug-tab-btn').onclick = () => showTab('debug');
    document.getElementById('remove-addon-btn').onclick = function() {
        document.getElementById('geofs-addon-button')?.remove();
        document.getElementById('geofs-addon-ui')?.remove();
        clearInterval(updateInterval);
    };
    document.getElementById('close-addon-btn').onclick = toggleAddonUI;
    
    function toggleAddonUI() {
        addonUI.style.display = addonUI.style.display === 'none' ? 'block' : 'none';
        if (addonUI.style.display === 'block') showTab('details');
    }
    
    function showTab(tab) {
        document.getElementById('details-tab').style.display = 'none';
        document.getElementById('planner-tab').style.display = 'none';
        document.getElementById('refuel-tab').style.display = 'none';
        document.getElementById('instructions-tab').style.display = 'none';
        document.getElementById('more-tab').style.display = 'none';
        document.getElementById('debug-tab').style.display = 'none';
        document.getElementById(tab + '-tab').style.display = 'block';
        
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.style.background = '#ccc';
            btn.style.borderBottom = '7px solid #aaa';
        });
        let activeTab = document.getElementById(tab + '-tab-btn');
        activeTab.style.background = '#fff';
        activeTab.style.borderBottom = '7px solid #2f2';
    }
    
    document.addEventListener('keydown', function(event) {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            event.stopPropagation();
        }
    }, true);

    function calculateFuel() {
        
    }

    function addFuel(fuel) {
        let reqFuel = fuel;
        let expFuel = reqFuel + fuelOnBoard;
        if (expFuel <= maxFuel) {
            if (isOnGround <= 'true') {
                 fuelOnBoard = expFuel;
            } else {
                 // Needs to land on Ground First.
            }
        } else {
            // Fuel exceeds the Max limit.
	 }
    }
    
    function updateAircraftDetails() {
        let aircraftDetailsElem = document.getElementById('aircraft-details');
        let flightStatusElem = document.getElementById('flight-status');
        let throttleInfoElem = document.getElementById('throttle-info');

        aircraftName = geofs?.aircraft?.instance?.aircraftRecord?.name || geofs?.aircraft?.instance?.definition?.name || `ID: ${geofs?.aircraft?.instance?.id || 'Unknown Model'}`;
        isOnGround = geofs.aircraft.instance.isOnGround || geofs.aircraft.instance.groundContact || geofs.aircraft.instance.rigidBody?.isOnGround || false;
        let engineData = geofs.aircraft.instance.engine;

        throttlePercent = engineData ? (engineData.rpm / 100).toFixed(2) + "%" : "Unknown";

        aircraftDetailsElem.innerText = 'Aircraft: ' + aircraftName;
        flightStatusElem.innerText = 'Status: ' + (isOnGround ? 'On Ground' : 'Flying') + ', ' + isOnGround;
        throttleInfoElem.innerText = 'Throttle: ' + throttlePercent;


        let fuelOnboard = 0;
        let imagePlaceholder = "https://raw.githubusercontent.com/Pilot-8055/Fuel-Master/ca5e1601f56cd953a5af7e8f59b028d40242e5f5/icon.png";

        let aircraftData = {
            "Boeing 777-300ER": { maxFuel: 145538, image: "https://www.geo-fs.com/images/planes/777-300.png" },
            "Boeing 737-700": { maxFuel: 26020, image: "https://www.geo-fs.com/images/planes/737-700.png" },
            "Airbus A350": { maxFuel: 141000, image: "https://www.geo-fs.com/images/planes/a350.png" },
            "Airbus A380": { maxFuel: 320000, image: "https://www.geo-fs.com/images/planes/a380.png" }
        };

        let details = aircraftData[aircraftName] || { maxFuel: "N/A", image: imagePlaceholder };
        document.getElementById('aircraft-name').innerText = aircraftName;
	document.getElementById('aircraft-name1').innerText = aircraftName;
	document.getElementById('aircraft-name2').innerText = aircraftName;
        document.getElementById('aircraft-image').src = details.image;
	document.getElementById('aircraft-image1').src = details.image;
	document.getElementById('aircraft-image2').src = details.image;
        
        let fuelSectionElem = document.getElementById('fuel-section');
        if (aircraftData[aircraftName]) {
            fuelSectionElem.style.display = "block";
            document.getElementById('max-fuel').innerText = details.maxFuel;
            document.getElementById('fuel-onboard').innerText = fuelOnboard.toFixed(2);
            maxFuel = details.maxFuel;
        } else {
            fuelSectionElem.style.display = "none";
            document.getElementById('aircraft-name').innerText = 'Aircraft Type not Supported';
	    document.getElementById('aircraft-name1').innerText = 'Aircraft Type not Supported';
	    document.getElementById('aircraft-name2').innerText = 'Aircraft Type not Supported';
            maxfuel = 0;
        }
    }

    let updateInterval = setInterval(updateAircraftDetails, 1000);
})();
