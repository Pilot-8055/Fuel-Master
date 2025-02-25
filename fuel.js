fetch('https://raw.githubusercontent.com/Pilot-8055/Fuel-Master/refs/heads/main/custom-syles.cs')
  .then(response => response.text())
  .then(css => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  })
  .catch(error => console.error('Error loading CSS:', error));

document.querySelector('.geofs-ui-right').innerHTML = `


        <!-- Mobile Options button-->
        <button class="mdl-button mdl-js-button mdl-button--icon geofs-f-standard-ui geofs-onlyForMobile" style="margin-left: 10px;" data-toggle-panel=".geofs-preference-list" titlenot="Open the settings/options panel" data-tooltip-classname="mdl-tooltip--top"><i class="material-icons">menu</i></button>

        <!-- Small screen menu -->
        <button id="small_screen_menu" class="mdl-button mdl-js-button mdl-button--icon geofs-smallScreenOnly">
            <i class="material-icons">more_vert</i>
        </button>

        <!-- Small Screen Menu -->
        <ul class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect geofs-smallScreenOnly" for="small_screen_menu">

            <li class="mdl-menu__item">
                <!-- Pause, mute, reset -->
                <div class="geofs-ui-bottom-box geofs-f-standard-ui">
                    <button class="geofs-button-pause mdl-button mdl-js-button mdl-button--icon" onclick="geofs.togglePause();" title="Pause/Unpause [P]"><i class="material-icons">pause_circle_outline</i></button>
                    <button class="geofs-button-mute mdl-button mdl-js-button mdl-button--icon" onclick="audio.toggleMute();" title="Mute/Unmute sound [S]"><i class="material-icons">volume_off</i></button>
                    <button class="geofs-button-visibility mdl-button mdl-js-button mdl-button--icon" onclick="geofs.visibilityCycle();" title="Cycle UI visibility [H]"><i class="material-icons">visibility</i></button>
                    <button class="mdl-button mdl-js-button mdl-button--icon" onclick="geofs.resetFlight();" title="Reset the flight [R]"><i class="material-icons">autorenew</i></button>
                    <button class="mdl-button mdl-js-button mdl-button--icon" data-tooltip-classname="mdl-tooltip--top" onclick="flight.recorder.enterPlayback();" title="Watch recorded flight [V]"><i class="material-icons">play_circle_outline</i></button>
                </div>
            </li>
            <li class="mdl-menu__item">
                <button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-hideForMobile" data-toggle-panel=".geofs-preference-list" title="Open the settings/options panel [O]"><i class="material-icons">settings</i> Options</button>
            </li>
            <li class="mdl-menu__item">
                <button class="mdl-button mdl-js-button geofs-f-standard-ui" data-toggle-panel=".geofs-map-list" title="Navigation charts [N]"><i class="material-icons">explore</i> Nav</button>
            </li>
            <li class="mdl-menu__item geofs-hideForApp">
                <button class="geofs-button-fullscreen mdl-button mdl-js-button geofs-f-standard-ui" onclick="ui.toggleFullscreen();" style="float: right;" data-tooltip-classname="mdl-tooltip--top" title="Toggle fullscreen">
                    <span class="material-icons geofs-fullscreenIconOpen">open_in_full</span>
                    <span class="material-icons geofs-fullscreenIconClose">close_fullscreen</span>
                    Fullscreen
                </button>
            </li>
        </ul>

        <!-- Full size menu -->
        <!-- Main panels toggle buttons -->
        <button class="mdl-button mdl-js-button geofs-f-standard-ui" data-toggle-panel=".geofs-aircraft-list">Aircraft</button>
        <button class="mdl-button mdl-js-button mdl-button--colored geofs-authenticated geofs-editor-role geofs-f-standard-ui geofs-bigScreenOnly" data-toggle-panel=".geofs-debug">Debug</button>
        
        <!-- Fuel Master Controls -->
        <div class="geofs-fuel-pad">FUEL MASTER</div>
            
        <button class="mdl-button mdl-js-button geofs-f-standard-ui" data-toggle-panel=".geofs-location-list">Location</button>

        <!--
            *
            *
            * Camera selector
            *
            *
        -->
        <button id="geofs-camera-selector" class="mdl-button mdl-js-button">Camera</button>

        <ul class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect" for="geofs-camera-selector">
            <li class="geofs-extra-views mdl-menu__item mdl-menu__item--full-bleed-divider">Extra views
                <ul class="mdl-menu geofs-extra-views-holder">
                    <!-- to be filled from aircraft definition -->
                </ul>
            </li>
            <li class="mdl-menu__item" data-camera="0">Follow cam</li>
            <li class="mdl-menu__item" data-camera="1">Cockpit cam</li>
            <li class="mdl-menu__item" data-camera="2">Cockpit-less cam</li>
            <li class="mdl-menu__item" data-camera="3">Chase cam</li>
            <li class="mdl-menu__item" data-camera="4">Free cam</li>
            <li class="mdl-menu__item mdl-menu__item--full-bleed-divider" data-camera="5">Fixed cam</li>
            <li class="mdl-menu__item" data-camera="-1">Reset</li>
        </ul>

        <!-- Options and map -->
        <button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-hideForMobile" data-toggle-panel=".geofs-preference-list" title="Open the settings/options panel [O]" data-tooltip-classname="mdl-tooltip--top">Options <i class="material-icons geofs-ui-bottom-icon">settings</i></button>
        <button class="mdl-button mdl-js-button geofs-f-standard-ui" data-toggle-panel=".geofs-map-list" title="Open the navigation panel [N]" data-tooltip-classname="mdl-tooltip--top">Nav <i class="material-icons geofs-ui-bottom-icon">explore</i></button>
<!--
        <button class="geofs-button-vr mdl-button mdl-js-button geofs-f-standard-ui geofs-editor-role" onclick="ui.vr.toggle();" data-tooltip-classname="mdl-tooltip--top" title="Toggle VR"><img src="/images/vr-icon.png"/></button>
-->

        <button class="geofs-button-fullscreen mdl-button mdl-js-button geofs-f-standard-ui geofs-hideForApp" onclick="ui.toggleFullscreen();" style="float: right;" data-tooltip-classname="mdl-tooltip--top" title="Toggle fullscreen">
            <span class="material-icons geofs-fullscreenIconOpen">open_in_full</span>
            <span class="material-icons geofs-fullscreenIconClose">close_fullscreen</span>
        </button>

        <!-- Pause, mute, reset, playback -->
        <div class="geofs-ui-bottom-box geofs-f-standard-ui">
            <button class="geofs-button-pause mdl-button mdl-js-button mdl-button--icon" data-tooltip-classname="mdl-tooltip--top" onclick="geofs.togglePause();" title="Pause/Unpause [P]"><i class="material-icons">pause_circle_outline</i></button>
            <button class="geofs-button-mute mdl-button mdl-js-button mdl-button--icon" data-tooltip-classname="mdl-tooltip--top" onclick="audio.toggleMute();" title="Mute/Unmute sound [S]"><i class="material-icons">volume_off</i></button>
            <button class="geofs-button-visibility mdl-button mdl-js-button mdl-button--icon" data-tooltip-classname="mdl-tooltip--top" onclick="geofs.visibilityCycle();" title="Cycle UI visibility [H]"><i class="material-icons">visibility</i></button>
            <button class="mdl-button mdl-js-button mdl-button--icon" data-tooltip-classname="mdl-tooltip--top" onclick="geofs.resetFlight();" title="Reset the flight [R]"><i class="material-icons">autorenew</i></button>
            <button class="mdl-button mdl-js-button mdl-button--icon" data-tooltip-classname="mdl-tooltip--top" onclick="flight.recorder.enterPlayback();" title="Watch recorded flight [V]"><i class="material-icons">play_circle_outline</i></button>
        </div>

        <button class="mdl-button mdl-js-button geofs-authenticated mdl-button--icon geofs-f-standard-ui" data-tooltip-classname="mdl-tooltip--top" data-toggle-panel=".geofs-player-list" title="List of online pilots"><i class="material-icons">group</i></button>

        <!-- Chat -->
        <div class="geofs-chat-input-section geofs-authenticated geofs-f-standard-ui geofs-bigScreenOnly geofs-hideForMobile">
            <button class="geofs-chat-button mdl-button mdl-js-button" data-tooltip-classname="mdl-tooltip--top" title="Type a chat message [T]">Talk <i class="icon-align-left"></i></button>
            <form class="geofs-chat-form">
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input geofs-chat-input geofs-stopKeyboardPropagation geofs-stopKeyupPropagation geofs-stopMousePropagation" size="30" maxlength="70" type="text" id="chatInput">
                    <label class="mdl-textfield__label" for="chatInput">Message...</label>
                </div>
                <button class="geofs-chat-send-button mdl-button mdl-js-button mdl-button--colored" type="submit">Send</button>
            </form>
        </div>

        <button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-hd-button geofs-onlyForApp"><i class="material-icons">hd</i></button>

        <button class="mdl-button mdl-js-button mdl-button--icon geofs-f-standard-ui geofs-orientationReset" data-tooltip-classname="mdl-tooltip--top" title="Reset orientation controls to neutral">
            <i class="material-icons">adjust</i>
        </button>

        <!--
            *
            *
            * Record player
            *
            *
        -->
        <div class="geofs-f-recordPlayer">

            <a class="mdl-button mdl-js-button geofs-screenshot" download="geofs.jpg" href="" onclick="geofs.api.takeCanvasScreenShot(this);" data-tooltip-classname="mdl-tooltip--top" title="Canvas Screenshot">
                <span class="material-icons">photo_camera</span>
            </a>

            <button class="mdl-button mdl-js-button" onclick="flight.recorder.exitPlayback();" data-tooltip-classname="mdl-tooltip--top" title="Exit record player">Exit player</button>

            <!-- Player controls -->
            <div class="geofs-ui-bottom-box">

                <label style="padding: 0px;" class="mdl-button mdl-js-button mdl-button--icon" data-tooltip-classname="mdl-tooltip--top" title="Open recorded flight (JSON)" for="flightfileupload"><i class="material-icons">folder_open</i></label>
                <a style="padding: 0px;" class="mdl-button mdl-js-button mdl-button--icon" data-tooltip-classname="mdl-tooltip--top" title="Save recorded flight" onclick="flight.recorder.download(this);"><i class="material-icons">save</i></a>
                <input type="file" id="flightfileupload" style="display: none;" onchange="flight.recorder.upload(this);">

                <!--<button class="mdl-button mdl-js-button mdl-button--icon" onclick="flight.recorder.setStep(0, 'set');" data-tooltip-classname="mdl-tooltip--top" title="Begining"><i class="material-icons">fast_rewind</i></button>-->
                <button class="mdl-button mdl-js-button mdl-button--icon" onclick="flight.recorder.startPlayback();" data-tooltip-classname="mdl-tooltip--top" title="Start playback"><i class="material-icons">play_arrow</i></button>
                <button class="geofs-button-pause mdl-button mdl-js-button mdl-button--icon" onclick="geofs.togglePause();" data-tooltip-classname="mdl-tooltip--top" title="Pause/Unpause playback [P]"><i class="material-icons">pause</i></button>
                <!--<button class="mdl-button mdl-js-button mdl-button--icon" onclick="flight.recorder.setStep(100000, 'set');" data-tooltip-classname="mdl-tooltip--top" title="End"><i class="material-icons">fast_forward</i></button>-->

            </div>

        </div>

        <!-- player slider -->
        <div class="geofs-f-recordPlayer geofs-slider-container">
            <div class="slider geofs-recordPlayer-slider" data-type="slider" value="0" data-min="0" data-precision="0" style="height: 10px;">
                <div class="slider-rail">
                    <div class="slider-selection">
                        <div class="slider-grippy"><input class="slider-input"></div>
                    </div>
                </div>
            </div>
        </div>
`;
