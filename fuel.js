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
        <button id="close-addon-btn" style="height: 30px; width: 30px; position: absolute; top: 10px; right: 10px; padding: 5px; cursor: pointer; background: #ff5555; color: white; border: none; border-radius: 50%;">X</button>
        <div id="tabs-container" style="display: flex; justify-content: space-around;">
            <button id="details-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2; border-top-left-radius: 15px;">Details</button>
            <button id="debug-tab-btn" class="tab-button" style="width: 100%; height: 50px; cursor: pointer; background: #ddd; color: black; border: none; border-bottom: 7px solid #2f2; border-top-right-radius: 15px;">debug mode</button>
        </div><div style="padding: 20px;">
        <div id="details-tab">
            <p id="aircraft-details">Aircraft: Unknown</p>
            <p id="flight-status">Status: Unknown</p>
        </div>
        <div id="debug-tab" style="display: none;">debug will go here
            <button id="remove-addon-btn" style="position: absolute; bottom: 10px; right: 10px; padding: 10px; cursor: pointer; background: red; color: white; border: none; border-radius: 5px;">Remove Addon</button>
        </div></div>
    `;
    addonUI.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 700px; height: 500px; background: rgba(255, 255, 255, 0.9); color: black; padding: 0; border-radius: 15px; display: none; z-index: 1000; box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);";
    document.body.appendChild(addonUI);
    
    document.getElementById('details-tab-btn').onclick = () => showTab('details');
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
    
    function updateAircraftdetails() {
        let aircraftdetailsElem = document.getElementById('aircraft-details');
        let flightStatusElem = document.getElementById('flight-status');
        if (!aircraftdetailsElem || !flightStatusElem) return;
        
        let aircraftName = geofs?.aircraft?.instance?.aircraftRecord?.name || geofs?.aircraft?.instance?.definition?.name || `ID: ${geofs?.aircraft?.instance?.id || 'Unknown Model'}`;
        let isOnGround = geofs.aircraft.instance.isOnGround || geofs.aircraft.instance.groundContact || geofs.aircraft.instance.rigidBody?.isOnGround || false;
        
        aircraftdetailsElem.innerText = 'Aircraft: ' + aircraftName;
        flightStatusElem.innerText = 'Status: ' + (isOnGround ? 'On Ground' : 'Flying');
    }
    let updateInterval = setInterval(updateAircraftdetails, 1000);
})();
