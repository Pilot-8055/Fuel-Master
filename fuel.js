// Create a button in the bottom UI to toggle the addon
(function() {
    if (document.getElementById('geofs-addon-button')) return;
    
    let button = document.createElement('button');
    button.id = 'geofs-addon-button';
    button.className = 'mdl-button mdl-js-button geofs-f-standard-ui';
    button.innerText = 'Addon';
    button.style.marginLeft = '10px';
    button.onclick = toggleAddonUI;
    
    document.querySelector('.geofs-ui-bottom').appendChild(button);
    
    // Create the addon UI
    let addonUI = document.createElement('div');
    addonUI.id = 'geofs-addon-ui';
    addonUI.style.position = 'fixed';
    addonUI.style.top = '50%';
    addonUI.style.left = '50%';
    addonUI.style.transform = 'translate(-50%, -50%)';
    addonUI.style.width = '400px';
    addonUI.style.height = '300px';
    addonUI.style.background = 'rgba(0, 0, 0, 0.8)';
    addonUI.style.color = 'white';
    addonUI.style.padding = '10px';
    addonUI.style.borderRadius = '10px';
    addonUI.style.display = 'none';
    addonUI.style.zIndex = '1000';
    
    // Create tab buttons
    let tabsContainer = document.createElement('div');
    tabsContainer.style.display = 'flex';
    tabsContainer.style.justifyContent = 'space-around';
    
    let infoTab = document.createElement('button');
    infoTab.innerText = 'Info';
    infoTab.onclick = () => showTab('info');
    
    let settingsTab = document.createElement('button');
    settingsTab.innerText = 'Settings';
    settingsTab.onclick = () => showTab('settings');
    
    tabsContainer.appendChild(infoTab);
    tabsContainer.appendChild(settingsTab);
    addonUI.appendChild(tabsContainer);
    
    // Create tab contents
    let infoContent = document.createElement('div');
    infoContent.id = 'info-tab';
    infoContent.style.display = 'none';
    
    let aircraftInfo = document.createElement('p');
    aircraftInfo.id = 'aircraft-info';
    aircraftInfo.innerText = 'Aircraft: Unknown';
    
    let flightStatus = document.createElement('p');
    flightStatus.id = 'flight-status';
    flightStatus.innerText = 'Status: Unknown';
    
    infoContent.appendChild(aircraftInfo);
    infoContent.appendChild(flightStatus);
    
    let settingsContent = document.createElement('div');
    settingsContent.id = 'settings-tab';
    settingsContent.style.display = 'none';
    settingsContent.innerText = 'Settings will go here';
    
    addonUI.appendChild(infoContent);
    addonUI.appendChild(settingsContent);
    document.body.appendChild(addonUI);
    
    function toggleAddonUI() {
        addonUI.style.display = addonUI.style.display === 'none' ? 'block' : 'none';
    }
    
    function showTab(tab) {
        document.getElementById('info-tab').style.display = 'none';
        document.getElementById('settings-tab').style.display = 'none';
        document.getElementById(tab + '-tab').style.display = 'block';
    }
    
    // Prevent keypresses inside textboxes from triggering GeoFS shortcuts
    document.addEventListener('keydown', function(event) {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            event.stopPropagation();
        }
    }, true);
    
    // Update aircraft info periodically
    function updateAircraftInfo() {
        if (geofs.aircraft && geofs.aircraft.instance) {
            document.getElementById('aircraft-info').innerText = 'Aircraft: ' + geofs.aircraft.instance.name;
            document.getElementById('flight-status').innerText = 'Status: ' + (geofs.aircraft.instance.isOnGround ? 'On Ground' : 'Flying');
        }
    }
    setInterval(updateAircraftInfo, 1000);
})();
