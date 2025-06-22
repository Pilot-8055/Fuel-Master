(function() {
    if (document.getElementById('geofs-addon-button')) return;
    
    let underConstruction = true; // Set to false when releasing the addon

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
        <style>p{font-size: 16px;}</style>
        <div id="tabs-container" style="display: flex; justify-content: space-around;">
            <button id="details-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2; border-top-left-radius: 15px;"><span style="font-size: 16px; font-weight: 400;">Details</span></button>
            <button id="planner-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;"><span style="font-size: 16px; font-weight: 400;">Planner</span></button>
            <button id="refuel-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;"><span style="font-size: 16px; font-weight: 400;">Refuel</span></button>
            <button id="instructions-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;"><span style="font-size: 16px; font-weight: 400;">Instructions</span></button>
            <button id="more-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;"><span style="font-size: 16px; font-weight: 400;">More</span></button>
            <button id="debug-tab-btn" class="tab-button" style="display: none; width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2;"><span style="font-size: 16px; font-weight: 400;">debug</span></button>
            <button id="close-addon-btn" style="width: 240px; height: 50px; cursor: pointer; background: #f55; color: white; border: none; border: none; border-bottom: 7px solid #d44; border-top-right-radius: 15px;"><span style="font-size: 16px; font-weight: 400;"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m252-176-74-76 227-228-227-230 74-76 229 230 227-230 74 76-227 230 227 228-74 76-227-230-229 230Z"/></svg></span></button>
        </div>

	 <div style="padding: 10px 40px;">
            <div id="details-tab" style="text-align: center; ">
                <h1 style="font-family:'Poppins','Segoe UI',sans-serif;font-size:48px;font-weight:700;letter-spacing:3px;text-align:center;background:linear-gradient(90deg,#6ec6ff,#3949ab);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-top:10px;text-shadow:1px 1px 4px rgba(0,0,0,0.2);">FUEL MASTER</h1>
                <div style="text-align: left;">
                    <img id="aircraft-image" align="right" style="width: 200px; height: auto; border-radius: 10px; padding: 40px;">
                    <h3 id="aircraft-name"></h3>
                    <div id="fuel-section" style="display: none;">	
                        <h4>FUELING DETAILS</h4>
                        <h6>Maximum Fuel Capacity: <span id="max-fuel"></span> kg</h6>
                        <h6>Fuel Onboard: <span id="fuel-onboard"></span> kg</h6>
                        <h6>Estimated Flight Time: <span id="flight-time"></span> minutes</h6>
                    </div>
                </div>
            <button id="toggle-mini-box-btn" style="position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%); width: 620px; padding: 10px; cursor: pointer; background: linear-gradient(90deg, #0f9b0f, #0d6f0d); color: white; border: none; border-radius: 8px;">Pin Status Bar</button>
            </div>
	
            <div id="planner-tab" style="display: none;">
                <h3>Fuel Planner</h3>
                <div style="height:100px; margin-bottom: 20px; width: 98%; background-color: #ddd; border: 5px solid #ccc; border-radius: 100px;"><img id="aircraft-image1" align="right" style="margin-right: 80px; padding: 5px; width: auto; height: 92px; max-height: 92px; border-radius: 10px;"><h4 id="aircraft-name1" style="padding: 12px; margin-left: 40px;"></h4></div>
                <input type="number" placeholder="Enter Estimated Flight Distance (NM):" id="flight-distance" style="width: 97%; height: 20px; border: 1px solid black; border-radius: 20px; padding: 1% 1.5%;">
                <input type="number" placeholder="Enter Approximate Cruise Speed (KTS):" id="cruise-speed" style="width: 97%; height: 20px; border: 1px solid black; border-radius: 20px; padding: 1% 1.5%; margin-top: 2%;">
                <button id="calculate-fuel-btn" style="width: 100%; padding: 10px; cursor: pointer; background: linear-gradient(90deg, #7ed6df, #22a6b3); color: white; border: none; border-radius: 8px; margin: 2% 0; font-size: 15px; font-weight: 450px;">Calculate</button>
                <p style="font-size: 16px; font-weight: 400;">Required Fuel: <span id="required-fuel">N/A</span> kg</p>
            </div>
        
            <div id="refuel-tab" style="display: none;">
                <h3>Refuel</h3>
                <div style="height:100px; margin-bottom: 20px; width: 98%; background-color: #ddd; border: 5px solid #ccc; border-radius: 100px;"><img id="aircraft-image2" align="right" style="margin-right: 80px; padding: 5px; width: auto; height: 92px; max-height: 92px; border-radius: 10px;"><h4 id="aircraft-name2" style="padding: 12px; margin-left: 40px;"></h4></div>
                <p style="font-size: 16px; font-weight: 400;">Current Fuel: <span id="current-fuel">0</span> kg</p>
                <input type="number" placeholder="Add Fuel (KGs):" id="add-fuel" style="width: 97%; height: 20px; border: 1px solid black; border-radius: 20px; padding: 1.5% 1.5%;">
                <button id="refuel-btn" style="width: 100%; padding: 10px; cursor: pointer; background: linear-gradient(90deg, #7ed6df, #22a6b3); color: black; border: none; border-radius: 8px; margin: 2% 0; font-size: 15px; font-weight: 450px;">Refuel</button>
                <p style="display: none; color: red; font-size: 16px; font-weight: 400;" id="refuel-error"></p>
           </div>

           <div id="instructions-tab" style="display: none; width: 100%; max-height: 430px; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; font-weight: 300;">
           <h4>Fuel Master – User Guide</h6>

           <h6>Welcome to <strong>Fuel Master</strong> – your trusted fuel management co-pilot during flights. This guide will help you get started:</h6>

           <ol style="line-height: 1.8; font-size: 16px;">
               <li><strong>Plan Your Flight:</strong> Choose your departure and destination airports. Decide your cruise altitude and speed.</li>
               <li><strong>Enter Total Distance:</strong> Input the total distance (in nautical miles) in the Fuel Planner tab.</li>
               <li><strong>Enter Cruise Speed:</strong> Provide your estimated cruise speed in knots.</li>
               <li><strong>Calculate Required Fuel:</strong> Click the <em>“Calculate Fuel”</em> button to get the estimated fuel required based on distance and speed.</li>
               <li>You may use other external fuel calculators for more complex profiles (As per your convenience).</li>
               <li><strong>Check Fuel Onboard:</strong> Review the amount of fuel currently onboard (displayed in the Status Bar).</li>
               <li><strong>Refuel:</strong> Subtract your current fuel from the required fuel and use the <em>“Refuel”</em> field to add the difference.</li>
               <li><strong>Monitor Status:</strong> Use the Status Bar to track your fuel in real-time during flight.</li>
               <li><strong>Pin Status Bar (Optional):</strong> Use the Pin Status Bar button to keep the small fuel display visible even when the Addon is closed.</li>
           </ol>

           <h4>How is Fuel Calculated?</h4>

           <p style="line-height: 1.6;">
               The Fuel Master estimates fuel based on standard aviation planning principles. Here's how each component contributes:
           </p>

           <ul style="font-size: 16px; padding-left: 20px;">
               <li><strong>Taxi Fuel:</strong> Fuel used during ground movements before takeoff. Generally of 15 mins. It also contains the Fuel consumed by the APU.</li>
               <li><strong>Trip Fuel:</strong> The fuel required for your route. It includes the Fuel for the Climb, Cruise, and Decent for the Flight.<br>
               <li><strong>Reserve Fuel:</strong> It is the Fuel priorly filled in Aorcrafts required in case of avoidance or Emergency. It is sub-divided into 3 categories: COntengency Fuel, Alternate Fuel, FInal Reserve Fuel.</li>
               <li><strong>Contingency Fuel:</strong> This Fuel is required if the flight time increases due to weather conditions or any other reason. It is generally 5% of trip fuel to cover any unexpected changes.</li>
               <li><strong>Alternate Fuel:</strong> This Fuel is required if the flight needs to be diverted to a nearby airport due to any reason.</li>
               <li><strong>Final Reserve Fuel:</strong> This Fuel is the Final reserve for an aircraft to land as soon as possible. it is generally for 30 mins.</li>
               <li><strong>Additional or Extra Fuel:</strong> This Fuel is needed if in case no other alternate Airport is available to land. Then the Aircraft must hold till its sequence arrives for the Destination Airport. Example: an Island. It is generally for 2 hours.</li>
           </ul>

           <h5 align="center" style="font-style: italic; color: #555;">Fly Smart, Fly Safe</h5>
           </div>

           <div id="more-tab" style="display: none; width: 100%; max-height: 430px; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; font-weight: 300;">

           <h4>Change-Log / Updates</h4>
           <p>All the Updates, Changes, and Notifications to the community will be listed here. Stay tuned for future updates.</p>
           <ul style="font-size: 16px; padding-left: 20px;">
               <li>v1 - Launch of Fuel Master.<br> Integrated support for major airliners: Boeing 777-300ER, Airbus A350, Boeing 737-700, Airbus A380</li>
           </ul>

           <h4>Disclaimer</h4>
           <p style="font-size: 16px; padding-left: 20px;">
               Hey there, Pilot! Before you take off with Fuel Master, here are a few things to keep in mind:
               <ul style="font-size: 16px; padding-left: 20px; line-height: 1.6;">
               <li>This addon is not affiliated with GeoFS. It’s a community-made tool created independently for better in-game fuel realism and planning.</li>
               <li>All fuel values and estimates are based on simulation logic. They aim to enhance realism in the game, but curently do not match real-world aviation standards.</li>
               <li>Some aircraft may not be supported. Currently, this addon is optimized for common aircrafts.</li>
               <li>It’s still a work in progress. Expect improvements, updates, and maybe a few bugs here and there — Feedbacks and Positive Comments is always welcome!</li>
               <li>Use of this addon should only be for enhancing the realism of the game.</li>
               <li>This addon is for personal use only. Please don’t copy, redistribute, or claim it as your own.</li>
               <li>Fly fair, share kindly, and enjoy the skies. This is all about community and passion for flight — Let’s keep it respectful and fun!</li>
           </ul></p>

           <!--<div style="width: 100%; height: 250px; background-image: url('https://static.vecteezy.com/system/resources/thumbnails/002/153/126/small_2x/geometric-gold-and-black-background-free-vector.jpg'); background-size: cover; background-position: center; border-radius: 15px; margin: 60px 0; display: flex; justify-content: center; align-items: center;">
               <div style="background: rgba(255, 255, 255, 0.99); padding: 50px 30px; border-radius: 5px; box-shadow: 0 0 25px rgba(0,0,0,0.3); text-align: center;">
                   <h2 style="font-family: sans-serif; font-size: 45px; color: #A67B00; margin: 0;">PREMIUM CONTENT</h2>
                   <p style="font-size: 20px; margin-top: 10px; color: #A67B00;">Coming Soon...</p>
               </div>
           </div>-->

           <h4>Aircrafts Supported</h4>
           <table style="width: 100%; border-collapse: collapse; font-size: 15px; margin-top: 10px;" cellpadding=8px Border=1px bordercolor=black>
             <thead><tr><th>Aircraft</th><th>Engines</th><th>Max Fuel Capacity (kg)</th><th>Avg. Take-off Speed</th><th>Avg. Landing Speed</th></tr></thead>
             <tbody>
               <tr><td>Boeing 737-700</td><td>2 × CFM56-7B</td><td>20,800kgs</td><td>145 KTS</td><td>135 KTS</td></tr>
               <tr><td>Boeing 777-300ER</td><td>2 × GE90-115B</td><td>144,800kgs</td><td>160 KTS</td><td>145 KTS</td></tr>
               <tr><td>Airbus A350</td><td>2 × RR Trent XWB</td><td>112,800kgs</td><td>155 KTS</td><td>145 KTS</td></tr>
               <tr><td>Airbus A380</td><td>4 × RR Trent 900</td><td>256,000kgs</td><td>165 KTS</td><td>150 KTS</td></tr>
             </tbody>
           </table>

           <h4>Other Details</h4>

           <h5>Known Limitations</h5>
           <ul style="line-height: 1.8; font-size: 16px;">
           <li><strong>No Altitude-Based Fuel Variation: </strong>Fuel consumption remains constant regardless of your flight level. Currently, the system does not simulate increased efficiency at higher altitudes.</li>
           </ul>

           <h5>Upcoming Features</h5>
           <ul style="line-height: 1.8; font-size: 16px;">
           <li><strong>Advanced Fuel Modeling with Altitude and Air Speed Tracks: </strong>A more dynamic fuel system is in development. Future versions will adjust fuel burn rates in real-time based on your current altitude and airspeed—mimicking real-world aerodynamic efficiency and engine performance. Expect smarter planning and even closer-to-reality simulation soon!</li><br>
           <li><strong>Fuel Dumping Capability: </strong>A fuel dumping feature is planned to simulate emergency procedures. This will enable pilots to jettison excess fuel in a controlled manner, similar to operations in real-world aviation.</li>
           </ul>

           <h4>From the Addon and its Creator</h4>
           <p align="justify" style="font-size: 16px; padding-left: 20px;">
           Built out of sheer passion for aviation and a vision to enhance players' experience, this addon is a carefully engineered blend of function, design, and creativity. <br><strong>Fuel Master</strong> is more than just a tool — it’s a co-pilot for every virtual aviator. 
           This addon is the proud creation of Pilot 8055. With a deep love for simulation realism and a sharp eye for detail, It has been engineered to empower every pilot, from casual flyers to serious simmers, with smart fuel management features.
           This add-on was born from a desire to bring realism, control, and clever automation to the skies of GeoFS. Whether you're soaring through high altitudes or performing slick landings, Fuel Master helps you:
           <ul style="line-height: 1.8; font-size: 16px;">
           <li>Calculate fuel needs with realistic logic,</li>
           <li>Adjust for throttle efficiency,</li>
           <li>Stay aware with an elegant Status Bar,</li>
           <li>And control it all from a smart, tabbed interface.</li>
           </ul></p><p style="font-size: 16px; padding-left: 20px;">
           This isn't just another add-on.<br>This is <strong>Fuel Master</strong> — a creation of ambition, curiosity, and a love for flight.<br><br>
           <span style="font-style:italic;">Crafted with care, coded with precision — and flown with style.<br>
           Made with passion just for you.</span><br><br>
           Welcome aboard, Captain.<br>
           <span style="font-style: italic;">— Pilot 8055</span>
           </p>
 
           <h4>Other Features</h4>
              <p style="font-size: 16px; padding-left: 20px;"><strong>WARNING:</strong> This action completely removes this Addon as a part of the game. Every edit made by this addon to the game will be undone. All your progress will be lost. Atlast, this addon will not be a part of the game.</p>
              <button id="remove-addon-btn" style="width: 100%; padding: 10px; cursor: pointer; background: red; color: white; border: none; border-radius: 8px; margin: 20px 0;">Remove Addon</button>
           </div>

           <div id="debug-tab" style="display: none;">
               <h6 id="aircraft-details">Aircraft: Unknown</h6>
               <h6 id="flight-status">Status: Unknown</h6>
               <h6 id="throttle-info">Throttle: Unknown</h6>
               <h6>Burn Per Second: <span id="burnPerSec"></span> Per Sec</h6>
               <h6>Set Fuel: <input type="number" id="set-fuel" style="width: 80px;"></h6><br>
               <button id="set-fuel-btn">Set Fuel</button><br><br>
               <button id="remove-debug-btn">Turn off Developer Mode</button>
           </div>
       </div>
    `;
    addonUI.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 700px; height: 500px; background: rgba(255, 255, 255, 0.9); color: black; padding: 0; border-radius: 15px; display: none; z-index: 1000; box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);";

    let constructionOverlay = document.createElement("div");
    constructionOverlay.id = "construction-overlay";
    constructionOverlay.innerHTML = `
        <div style="text-align: center; padding: 40px; margin: 50px 0">
            <h3 style="margin-bottom: 20px;">This Project is Under Development</h3>
            <p>If you are a developer, then Sign-in.</p>
            <input type="password" id="dev-code-input" placeholder="Enter ID" style="width: 97%; height: 20px; border: 1px solid black; border-radius: 20px; padding: 1.5% 1.5%;"><br>
            <button id="unlock-dev-btn" style="width: 100%; padding: 10px; cursor: pointer; background: linear-gradient(90deg, #7ed6df, #22a6b3); color: white; border: none; border-radius: 8px; margin: 2% 0; font-size: 15px; font-weight: 450px;">Enter</button>
            <p id="login-error" style="color: red; display: none;">If you are a developer, then Sign-in.</p>
            <button id="remove-addon-btn2" style="width: 100%; padding: 10px; cursor: pointer; background: red; color: white; border: none; border-radius: 8px; margin: 10px 0;">Remove</button>
        </div>
    `;
    constructionOverlay.style = `position: absolute; top: 0;  left: 0;  width: 100%;  height: 100%;  background: #fff;  color: black;  z-index: 2000;  border-radius: 15px;  display: none;`;

    addonUI.appendChild(constructionOverlay);

    // Mini Box UI
    let miniBox = document.createElement('div');
    miniBox.id = 'fuel-mini-box';
    miniBox.innerHTML = `
        <div id="mini-box-content"><div style="display: flex;"><div style="padding: 7px 20px">
            <span><strong>Fuel:</strong> <span id="mini-fuel-onboard">N/A</span> kg</span>
            <span style="margin-left: 20px;"><strong>Estimated Flight Time:</strong> <span id="mini-flight-time">N/A</span> minutes</span>
            </div>
            <div id="status-color" style="padding: 7px 20px; background-color: #afb; font-size: 15px; font-weight: 400; font-style: italic; border-radius: 10px;">
                Have a Great Flight
            </div>
        </div></div>
    `;
    miniBox.style.cssText = `position: fixed; bottom: 42px; left: 50%; transform: translateX(-50%); background: rgba(255, 255, 255, 0.87); color: black; border-radius: 10px;  z-index: 999; box-shadow: 0 0 10px rgba(0,0,0,0.5); display: none; white-space: nowrap;`;

    document.body.appendChild(miniBox);
    document.body.appendChild(addonUI);


    // Initialised Global Variables
    let maxFuel;
    let throttlePercent;
    let isOnGround;
    let aircraftName;
    let fuelOnBoard = 16000;
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
    document.getElementById('close-addon-btn').onclick = toggleAddonUI;
    document.getElementById('remove-addon-btn').onclick = function() {
        engineKillActive = false;
        document.getElementById('geofs-addon-button')?.remove();
        document.getElementById('geofs-addon-ui')?.remove();
        document.getElementById('fuel-mini-box')?.remove();
        document.getElementById('construction-overlay')?.remove();

    if (engineKillFrameID) {
        cancelAnimationFrame(engineKillFrameID);
        engineKillFrameID = null;
        engineKillActive = false;
    }

        clearInterval(updateInterval);
    };
    document.getElementById('set-fuel-btn').onclick = () => setFuel(document.getElementById('set-fuel').value);
    document.getElementById('remove-debug-btn').onclick = () => removeDebug();

    document.getElementById('remove-addon-btn2').onclick = function() {
        engineKillActive = false;
        document.getElementById('geofs-addon-button')?.remove();
        document.getElementById('geofs-addon-ui')?.remove();
        document.getElementById('fuel-mini-box')?.remove();
        document.getElementById('construction-overlay')?.remove();

    if (engineKillFrameID) {
        cancelAnimationFrame(engineKillFrameID);
        engineKillFrameID = null;
        engineKillActive = false;
    }

        clearInterval(updateInterval);
    };

    document.addEventListener("click", function () {
        let unlockBtn = document.getElementById('unlock-dev-btn');
        if (unlockBtn) {
            unlockBtn.onclick = () => {
                let enteredCode = document.getElementById('dev-code-input').value;
                if (enteredCode === 'a1@b2') {
                    underConstruction = false;
                    constructionOverlay.style.display = 'none';
                    document.getElementById('login-error').style.display = 'none';
                    showTab('details');
                    miniBox.style.display = addonUI.style.display;

                } else {
                    document.getElementById('login-error').innerText = 'Invalid Developer ID';
                    document.getElementById('login-error').style.display = 'block';
                }
            };
        }
    });

    function setFuel(Fuel) {
        fuelOnBoard = Number(Fuel) || 0;
    }

    function removeDebug() {
        document.getElementById('debug-tab-btn').style.display = 'none';
        showTab('details');
    }

    function toggleAddonUI() {
        addonUI.style.display = addonUI.style.display === 'none' ? 'block' : 'none';
        document.getElementById('login-error').style.display = 'none';

        if (underConstruction) {
            constructionOverlay.style.display = addonUI.style.display;
        } else {
            showTab('details');
        }

        if (!miniBoxPinned && !underConstruction) {
            miniBox.style.display = addonUI.style.display;
        }
    }
    
    function showTab(tab) {
        document.getElementById('refuel-error').style.display = 'none';
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

        let taxiFuel = Number(500);

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
        if (fuel === '-2412.09') {
            document.getElementById('debug-tab-btn').style.display = 'block';
            return;
        }

        if (fuel <= 0) {
            document.getElementById('refuel-error').innerHTML = 'Invalid Fuel Amount.';
            document.getElementById('refuel-error').style.display = 'block';
            document.getElementById('refuel-error').style.color = 'red';
            return;
        }

        reqFuel = Number(fuel) || 0;
        fuelOnBoard = Number(fuelOnBoard) || 0;
        let expFuel = reqFuel + fuelOnBoard;
        expFuelPercent = Number(expFuel) || 0;
        if (expFuel < maxFuel) {
            if (isOnGround == true) {
                fuelOnBoard = expFuel;
                document.getElementById('refuel-error').innerHTML = fuel + ' kg of Fuel filled successfully. Total Fuel: ' + expFuel.toFixed(2);
                document.getElementById('refuel-error').style.display = 'block';
                document.getElementById('refuel-error').style.color = 'black';
            } else {
                document.getElementById('refuel-error').innerHTML = 'The Aircraft needs to land before Refulling.';
                document.getElementById('refuel-error').style.display = 'block';
                document.getElementById('refuel-error').style.color = 'red';
            }
        } else {
            document.getElementById('refuel-error').innerHTML = 'Fuel Amount Exceeds Maximum Fuel Limit.';
            document.getElementById('refuel-error').style.display = 'block';
            document.getElementById('refuel-error').style.color = 'red';
	 }
    }

let engineKillActive = false;
let engineKillFrameID = null;

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

            engineKillFrameID = requestAnimationFrame(killEngines);
        } else {
            engineKillActive = false;
            engineKillFrameID = null;
        }
    }

    killEngines();
}

    function updateAircraftDetails() {
        if (underConstruction) return; // Skip update if under development

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
            "Airbus A380": { maxFuel: 256000, burnPerSec: 9.6, image: "https://www.geo-fs.com/images/planes/a380.png" }
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
            document.getElementById('flight-time').innerText = 'N/A';
            document.getElementById('fuel-onboard').innerText = fuelOnBoard;
            document.getElementById('mini-fuel-onboard').innerText = 'N/A';
            document.getElementById('mini-flight-time').innerText = 'N/A';
        }
    }

    let updateInterval = setInterval(updateAircraftDetails, 1000);
})();
