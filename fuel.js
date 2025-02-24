document.querySelector('.geofs-ui-top').innerHTML = `

   <div <div class="geofs-autopilot-bar">
                <div class="control-pad geofs-autopilot-pad" title="Toggle autopilot on/off">
                    <div class="control-pad-label transp-pad">FUEL MASTER</div>
                </div>

   <div class="control-pad geofs-control-status" title="Mouse controls on hold, press [M] to enable.">
                <div class="control-pad-label orange-pad">MOUSE OFF</div>
            </div>

            <div class="geofs-autopilot-bar">
                <div class="control-pad geofs-autopilot-pad" title="Toggle autopilot on/off">
                    <div class="control-pad-label transp-pad">AUTOPILOT</div>
                </div>
                <div class="geofs-autopilot-controls">
                    <div class="geofs-autopilot-control">
                        <a class="numberDown">-</a><input class="geofs-autopilot-speed geofs-autopilot-mach" min="0" step="0.01" decimals="2" data-method="setSpeed" maxlength="5" value="0"/><input class="numberValue geofs-autopilot-speed geofs-autopilot-knots" min="0" smallstep="5" stepthreshold="100" step="10" data-method="setSpeed" maxlength="4" value="0"/><a class="numberUp">+</a>
                        <span class="geofs-autopilot-switch geofs-speed-mode">
                            <a class="switchLeft green-pad" data-method="setSpeedMode" value="knots">KTS</a><a class="switchRight" data-method="setSpeedMode" value="mach">M.</a>
                        </span>
                    </div>
                    <div class="geofs-autopilot-control">
                        <a class="numberDown">-</a><input class="numberValue geofs-autopilot-course" min="0" max="359" data-loop="true" step="1" data-method="setCourse" maxlength="3" value="000"/><a class="numberUp">+</a>
                        <span class="geofs-autopilot-switch geofs-autopilot-mode">
                            <a class="switchLeft geofs-autopilot-HDG green-pad" data-method="setMode" value="HDG">HDG</a><a class="switchRight geofs-autopilot-NAV" data-method="setMode" value="NAV">NAV</a>
                        </span>
                    </div>
                    <div class="geofs-autopilot-control">
                        <a class="numberDown">-</a><input class="numberValue geofs-autopilot-altitude" min="0" max="100000" smallstep="100" stepthreshold="3000" step="500" data-method="setAltitude" maxlength="5" value="00000"/><a class="numberUp">+</a>
                        <span>ALTITUDE</span>
                    </div>
                    <div class="geofs-autopilot-control">
                        <a class="numberDown">-</a><input class="numberValue geofs-autopilot-verticalSpeed" min="-6000" max="6000" step="100" data-method="setVerticalSpeed" maxlength="5" value="00000"/><a class="numberUp">+</a>
                        <span>VERT SPEED</span>
                    </div>
                </div>
            </div>
`;
