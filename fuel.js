fetch('https://raw.githubusercontent.com/Pilot-8055/Fuel-Master/refs/heads/main/custom-styles.css')
  .then(response => response.text())
  .then(css => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  })
  .catch(error => console.error('Error loading CSS:', error));

document.querySelector('.geofs-ui-top').innerHTML = `

<!-- Wind Indicator-->
            <div class="geofs-wind-container"></div>

            <!-- Radio box -->
            <div class="geofs-radio-controls">
                <div class="geofs-radio-control geofs-nav-frequency">
                    <span class="geofs-radio-label">
                        <button class="geofs-radio-select on" name="NAV1MODE" onclick="geofs.nav.setNAVMode('NAV', 'NAV1');">NAV</button>
                        <button class="geofs-radio-select" name="GPSMODE" onclick="geofs.nav.setNAVMode('GPS', 'GPS');">GPS</button>
                    </span>
                    <input class="geofs-radio-display" name="NAVFrequency"><button class="geofs-radio-ident" data-unit="NAV1">ident</button>
                </div>
                <div class="geofs-radio-control geofs-radio-OBS">
                    <span class="geofs-radio-label">OBS</span><input class="geofs-radio-display" name="radioOBS">
                </div>
                <div class="geofs-radio-control">
                    <span class="geofs-radio-label">DME</span><input class="geofs-radio-display" name="dme"><span class="geofs-radio-unit">NM</span>
                    <input class="geofs-radio-display" name="groundSpeed"><span class="geofs-radio-unit">KTS</span>
                    <input class="geofs-radio-display" name="timeToStation"><span class="geofs-radio-unit">MIN</span>
                </div>
                <div class="geofs-radio-control geofs-adf-frequency">
                    <span class="geofs-radio-label">ADF</span><input class="geofs-radio-display" name="ADFFrequency"><button class="geofs-radio-ident" data-unit="ADF">ident</button>
                </div>
            </div>
            <div class="control-pad geofs-radio-pad" title="Open radio navigation controls">
                <div class="control-pad-label transp-pad">RADIO</div>
            </div>

            <!-- Fuel Master Controls -->
            <div class="geofs-fuel-pad">FUEL MASTER</div>

            <!-- Control Pads -->
            <div class="geofs-pads-container"></div>
`;
