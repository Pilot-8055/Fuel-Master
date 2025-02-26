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
        <button id="close-addon-btn" style="position: absolute; top: 10px; right: 10px; padding: 5px; cursor: pointer; background: #ff5555; color: white; border: none; border-radius: 5px;">X</button>
        <div id="tabs-container" style="display: flex; justify-content: space-around;">
            <button id="info-tab-btn" style="padding: 10px; margin: 5px; cursor: pointer; background: #555; color: white; border: none; border-radius: 5px;">Info</button>
            <button id="settings-tab-btn" style="padding: 10px; margin: 5px; cursor: pointer; background: #555; color: white; border: none; border-radius: 5px;">Settings</button>
        </div>
        <div id="info-tab">
            <p id="aircraft-info">Aircraft: Unknown</p>
            <p id="flight-status">Status: Unknown</p>
        </div>
        <div id="settings-tab" style="display: none;">Settings will go here</div>
        <button id="remove-addon-btn" style="position: absolute; bottom: 10px; right: 10px; padding: 10px; cursor: pointer; background: red; color: white; border: none; border-radius: 5px;">Remove Addon</button>
    `;
    addonUI.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 700px; height: 500px; background: rgba(0, 0, 0, 0.9); color: white; padding: 20px; border-radius: 15px; display: none; z-index: 1000; box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);";
    document.body.appendChild(addonUI);
    
    document.getElementById('info-tab-btn').onclick = () => showTab('info');
    document.getElementById('settings-tab-btn').onclick = () => showTab('settings');
    document.getElementById('remove-addon-btn').onclick = function() {
        document.getElementById('geofs-addon-button')?.remove();
        document.getElementById('geofs-addon-ui')?.remove();
        clearInterval(updateInterval);
    };
    document.getElementById('close-addon-btn').onclick = toggleAddonUI;
    
    function toggleAddonUI() {
        addonUI.style.display = addonUI.style.display === 'none' ? 'block' : 'none';
        if (addonUI.style.display === 'block') showTab('info');
    }
    
    function showTab(tab) {
        document.getElementById('info-tab').style.display = 'none';
        document.getElementById('settings-tab').style.display = 'none';
        document.getElementById(tab + '-tab').style.display = 'block';
    }
    
    document.addEventListener('keydown', function(event) {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            event.stopPropagation();
        }
    }, true);
    
    function updateAircraftInfo() {
        let aircraftInfoElem = document.getElementById('aircraft-info');
        let flightStatusElem = document.getElementById('flight-status');
        if (!aircraftInfoElem || !flightStatusElem) return;
        
        let aircraftName = geofs?.aircraft?.instance?.aircraftRecord?.name || geofs?.aircraft?.instance?.definition?.name || `ID: ${geofs?.aircraft?.instance?.id || 'Unknown Model'}`;
        let isOnGround = geofs.aircraft.instance.isOnGround || geofs.aircraft.instance.groundContact || geofs.aircraft.instance.rigidBody?.isOnGround || false;
        
        aircraftInfoElem.innerText = 'Aircraft: ' + aircraftName;
        flightStatusElem.innerText = 'Status: ' + (isOnGround ? 'On Ground' : 'Flying');
    }
    let updateInterval = setInterval(updateAircraftInfo, 1000);
})();
