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
            <button id="details-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2; border-top-left-radius: 15px;"><span style="font-size: 16px; font-weight: 400;">Details</span></button>
            <button id="planner-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;"><span style="font-size: 16px; font-weight: 400;">Planner</span></button>
            <button id="refuel-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;"><span style="font-size: 16px; font-weight: 400;">Refuel</span></button>
            <button id="instructions-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;"><span style="font-size: 16px; font-weight: 400;">Instructions</span></button>
            <button id="more-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;"><span style="font-size: 16px; font-weight: 400;">More</span></button>
            <button id="debug-tab-btn" class="tab-button" style="display: block; width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;"><span style="font-size: 16px; font-weight: 400;">debug</span></button>
	    <button id="close-addon-btn" style="width: 240px; height: 50px; cursor: pointer; background: #f55; color: white; border: none; border: none; border-bottom: 7px solid #d44; border-top-right-radius: 15px;"><span style="font-size: 16px; font-weight: 400;">X</span></button>
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
                <button id="toggle-mini-box-btn" style="position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%); width: 620px; padding: 10px; cursor: pointer; background: green; color: white; border: none; border-radius: 5px;">Pin Status Bar</button>
	        </div>
	
        <div id="planner-tab" style="display: none;">
            <h3>Fuel Planner</h3>
	    <div style="height:100px; margin-bottom: 20px; width: 98%; background-color: #ddd; border: 5px solid #ccc; border-radius: 100px;"><img id="aircraft-image1" align="right" style="margin-right: 80px; padding: 5px; width: auto; height: 92px; max-height: 92px; border-radius: 10px;"><h4 id="aircraft-name1" style="padding: 12px; margin-left: 40px;"></h4></div>
            <h6>Enter estimated Flight Distance (NM): <input type="number" id="flight-distance" style="width: 80px;"></h6>
            <h6>Enter approximate Cruise Speed (KTS): <input type="number" id="cruise-speed" style="width: 80px;"></h6>
            <h6>Required Fuel: <span id="required-fuel">N/A</span> kg</h6>
            <button id="calculate-fuel-btn">Calculate</button>
        </div>
        
        <div id="refuel-tab" style="display: none;">
            <h3>Refuel</h3>
	    <div style="height:100px; margin-bottom: 20px; width: 98%; background-color: #ddd; border: 5px solid #ccc; border-radius: 100px;"><img id="aircraft-image2" align="right" style="margin-right: 80px; padding: 5px; width: auto; height: 92px; max-height: 92px; border-radius: 10px;"><h4 id="aircraft-name2" style="padding: 12px; margin-left: 40px;"></h4></div>
            <h6>Current Fuel: <span id="current-fuel">0</span> kg</h6>
            Add Fuel (kg): <input type="number" id="add-fuel" style="width: 80px;">
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
	            <p>Burn Per Second: <span id="burnPerSec"></span> Per Sec</p>
	        </div>

	 </div>
    `;
    addonUI.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 700px; height: 500px; background: rgba(255, 255, 255, 0.9); color: black; padding: 0; border-radius: 15px; display: none; z-index: 1000; box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);";


    // Mini Box UI
    let miniBox = document.createElement('div');
    miniBox.id = 'fuel-mini-box';
    miniBox.innerHTML = `
        <div id="mini-box-content"><div style="display: flex;"><div style="padding: 7px 20px">
            <span><strong>Fuel:</strong> <span id="mini-fuel-onboard">N/A</span> kg</span>
            <span style="margin-left: 20px;"><strong>Estimated Flight Time:</strong> <span id="mini-flight-time">--</span> minutes</span>
            </div>
            <div id="status-color" style="padding: 7px 20px; background-color: #afb; font-size: 15px; font-weight: 400; font-style: italic; border-radius: 10px;">
                Have a Great Flight
            </div>
        </div></div>
    `;
    miniBox.style.cssText = `
        position: fixed;
        bottom: 42px; /* just above GeoFS bottom bar */
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.87);
        color: black;
        border-radius: 10px;
        z-index: 999;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        display: none;
        white-space: nowrap;
    `;

    document.body.appendChild(miniBox);

    document.body.appendChild(addonUI);
	
	// Initialised Global Variables
    let maxFuel;
    let throttlePercent;
    let isOnGround;
    let aircraftName;
    let fuelOnBoard = 100; //16000
    let throttleMultiplier = 1.3;
    let miniBoxPinned = false;
    let flightTime;

    document.getElementById('toggle-mini-box-btn').onclick = () => {
        miniBoxPinned = !miniBoxPinned;
        document.getElementById('toggle-mini-box-btn').innerText = miniBoxPinned ? 'Unpin Status Bar' : 'Pin Status Bar';

        // Determine if main UI is open
        const isMainUIOpen = addonUI.style.display !== 'none';

        // Show mini box if either pinned or main UI is open
        miniBox.style.display = (miniBoxPinned || isMainUIOpen) ? 'block' : 'none';
    };


    document.getElementById('details-tab-btn').onclick = () => showTab('details');
    document.getElementById('planner-tab-btn').onclick = () => showTab('planner');
    document.getElementById('refuel-tab-btn').onclick = () => showTab('refuel');
    document.getElementById('instructions-tab-btn').onclick = () => showTab('instructions');
    document.getElementById('more-tab-btn').onclick = () => showTab('more');
    document.getElementById('debug-tab-btn').onclick = () => showTab('debug');
    document.getElementById('calculate-fuel-btn').onclick = () => calculateFuel(document.getElementById('flight-distance').value, document.getElementById('cruise-speed').value, document.getElementById('burnPerSec').textContent);
    document.getElementById('refuel-btn').onclick = () => addFuel(document.getElementById('add-fuel').value);
    document.getElementById('remove-addon-btn').onclick = function() {
        document.getElementById('geofs-addon-button')?.remove();
        document.getElementById('geofs-addon-ui')?.remove();
        document.getElementById('fuel-mini-box')?.remove();
        clearInterval(updateInterval);
    };
    document.getElementById('close-addon-btn').onclick = toggleAddonUI;
    
    function toggleAddonUI() {
        addonUI.style.display = addonUI.style.display === 'none' ? 'block' : 'none';
        if (addonUI.style.display === 'block') {
            showTab('details');
        }
    
        // Hide mini box only if not pinned
        if (!miniBoxPinned) {
            miniBox.style.display = addonUI.style.display;
        }
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

    function calculateFuel(distanceNM, cruiseSpeedKTS, burnPerSec) {
    let distance = Number(distanceNM) || 0;
    let cruiseSpd = Number(cruiseSpeedKTS) || 0;
    let burnRate = Number(burnPerSec) || 0;

    let taxiFuel = Number(300);

    let tripTimeSec = Number((distance / cruiseSpd) * 3600) || 0;
    let tripFuel = Number(tripTimeSec * burnRate) || 0;

    let contingencyFuel = Number(0.05 * tripFuel) || 0;

    let alternateTimeSec = Number((200 / cruiseSpd) * 3600) || 0;
    let alternateFuel = Number(alternateTimeSec * burnRate) || 0;

    let reserveFuel = Number(1800 * burnRate) || 0;

    let extraFuel = Number(1000);

    let totalFuel = Number(taxiFuel + tripFuel + contingencyFuel + alternateFuel + reserveFuel + extraFuel); 
    totalFuel = Number(totalFuel.toFixed(2));       

        document.getElementById('required-fuel').innerText = totalFuel;
    }

    function addFuel(fuel) {
        reqFuel = Number(fuel) || 0;
        fuelOnBoard = Number(fuelOnBoard) || 0;
        let expFuel = reqFuel + fuelOnBoard;
        expFuelPercent = Number(expFuel) || 0;
        console.log(isOnGround);
        if (expFuel < maxFuel) {
            if (isOnGround == true) {
                 fuelOnBoard = expFuel;
                 console.log('FUEL FILLED SUCCESSFULLY :)');
            } else {
                 console.log('needs to land first');
            }
        } else {
            console.log('fuel exceeds max limit');
	 }
    }

    let engineKillActive = false;

    function startEngineKillLoop() {
        if (engineKillActive) return;
        engineKillActive = true;

        function killEngines() {
            if (fuelOnBoard <= 0) {
                geofs.aircraft.instance.engines.forEach(engine => {
                    engine.rpm = 0;
                    engine.currentThrust = 0;
                    engine.reverseThrust = 0;
                });
                geofs.animation.values.throttle = 0;

                requestAnimationFrame(killEngines);
            } else {
                // Stop forcing shutdown
                engineKillActive = false;

                console.log("Engines restored.");

                // Do NOT set them to undefined — let GeoFS control them
                // So we simply do nothing here.
            }
        }

        killEngines();
    }

    function updateAircraftDetails() {
        let aircraftDetailsElem = document.getElementById('aircraft-details');
        let flightStatusElem = document.getElementById('flight-status');
        let throttleInfoElem = document.getElementById('throttle-info');

        aircraftName = geofs?.aircraft?.instance?.aircraftRecord?.name || geofs?.aircraft?.instance?.definition?.name || `ID: ${geofs?.aircraft?.instance?.id || 'Unknown Model'}`;
        isOnGround = geofs.aircraft.instance.isOnGround || geofs.aircraft.instance.groundContact || geofs.aircraft.instance.rigidBody?.isOnGround || false;
        let engineData = geofs.aircraft.instance.engine;

        throttlePercent = engineData ? (engineData.rpm / 100).toFixed(2) : "Unknown";

        aircraftDetailsElem.innerText = 'Aircraft: ' + aircraftName;
        flightStatusElem.innerText = 'Status: ' + (isOnGround ? 'On Ground' : 'Flying') + ', ' + isOnGround;
        throttleInfoElem.innerText = 'Throttle: ' + throttlePercent + "%";

        let imagePlaceholder = "https://raw.githubusercontent.com/Pilot-8055/Fuel-Master/ca5e1601f56cd953a5af7e8f59b028d40242e5f5/icon.png";

        let aircraftData = {
            "Boeing 777-300ER": { maxFuel: 144800, burnPerSec: 5.1, image: "https://www.geo-fs.com/images/planes/777-300.png" },
            "Boeing 737-700": { maxFuel: 20800, burnPerSec: 1.9, image: "https://www.geo-fs.com/images/planes/737-700.png" },
            "Airbus A350": { maxFuel: 122800, burnPerSec: 4.5, image: "https://www.geo-fs.com/images/planes/a350.png" },
            "Airbus A380": { maxFuel: 320000, burnPerSec: 9.6, image: "https://www.geo-fs.com/images/planes/a380.png" }
        };

        let details = aircraftData[aircraftName] || { maxFuel: "N/A", burnPerSec: "N/A", image: imagePlaceholder };
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
            document.getElementById('burnPerSec').innerText = details.burnPerSec;
            maxFuel = details.maxFuel;

        
            // Ensure both throttle and burnPerSec are valid numbers
            throttlePercent = Number(throttlePercent) || 0;
            let burnPerSec = Number(details.burnPerSec) || 0;

            // Calculate fuel drained per second
            let fuelDrained = burnPerSec * (throttlePercent / 100) * throttleMultiplier;

            // Subtract from onboard fuel, keep it ≥ 0
            fuelOnBoard = Math.max(fuelOnBoard - fuelDrained, 0);

            flightTime = Number(fuelOnBoard / fuelDrained / 60) || 0;
            flightTime = flightTime.toFixed(0);
            document.getElementById('flight-time').innerText = flightTime;

            if (fuelOnBoard <= 0 && !engineKillActive) {
                startEngineKillLoop();
            }

            document.getElementById('current-fuel').innerText = fuelOnBoard.toFixed(2);
            document.getElementById('fuel-onboard').innerText = fuelOnBoard.toFixed(2);
            document.getElementById('mini-fuel-onboard').innerText = fuelOnBoard.toFixed(2);
            document.getElementById('mini-flight-time').innerText = flightTime;

            if (fuelOnBoard >= 12000) {
                document.getElementById('status-color').style.backgroundColor = '#afb';
                document.getElementById('status-color').innerText = 'Have a Great Flight';
            }

            if (fuelOnBoard < 12000 && fuelOnBoard>= 8000) {
                document.getElementById('status-color').style.backgroundColor = '#ff8';
                document.getElementById('status-color').innerText = 'Low on Fuel. Approach Landing';
            }

            if (fuelOnBoard < 8000 && fuelOnBoard>= 4000) {
                document.getElementById('status-color').style.backgroundColor = '#fc8';
                document.getElementById('status-color').innerText = 'Fuel too Low. Prepare for Emergency Landing';
            }

            if (fuelOnBoard < 4000 && fuelOnBoard>= 1000) {
                document.getElementById('status-color').style.backgroundColor = '#f88';
                document.getElementById('status-color').innerText = 'Reseves Emptying. Declare Emergency Landing';
            }

            if (fuelOnBoard < 1000 && fuelOnBoard>= 10) {
                document.getElementById('status-color').style.backgroundColor = '#f55';
                document.getElementById('status-color').innerText = 'MAYDAY ALERT. Land Immediately';
            }

            if (fuelOnBoard < 10) {
                document.getElementById('status-color').style.backgroundColor = '#bbb';
                document.getElementById('status-color').innerText = ' No Fuel. Engine Cutoff';
            }

        } else {
            fuelSectionElem.style.display = "none";
            document.getElementById('aircraft-name').innerText = 'Aircraft Type not Supported';
            document.getElementById('aircraft-name1').innerText = 'Aircraft Type not Supported';
            document.getElementById('aircraft-name2').innerText = 'Aircraft Type not Supported';
            maxfuel = 0;
            fuelOnBoard = 16000;
            document.getElementById('flight-time').innerText = 'Nul';
            document.getElementById('fuel-onboard').innerText = fuelOnBoard;
            document.getElementById('mini-fuel-onboard').innerText = 'Nul';
            document.getElementById('mini-flight-time').innerText = 'Nul';
        }
    }

    let updateInterval = setInterval(updateAircraftDetails, 1000);
})();
