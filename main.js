function getKey(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

let downloadlink = "";

let song_hash = $("div.has-shadow > b").text();
console.log(song_hash);
song_hash = /[a-fA-F0-9]{40}/.exec(song_hash);

var key = JSON.parse(getKey(`https://beatsaver.com/api/maps/by-hash/${song_hash}`)).key

$(function () {
    // $(".columns:not(.is-desktop) > .column").last().append(`<a href="beatsaver://${key}" class="button" style="background-image: linear-gradient(to left,#fa152d,#9c49c7 54%,#137bf6); color: white; font-weight: bold; width: fit-content; text-align: center; display: block; margin: auto;"> Download! </a>`);
    $(".column .is-one-quarter").append(`
        <style>
            .saberSaverButton {
                background-image: linear-gradient(to left,#fa152d,#9c49c7 54%,#137bf6); 
                color: white; 
                font-weight: 600; 
                width: fit-content; 
                text-align: center;
                display: block;
                margin: auto;
                border-style: none;
                padding: 9.75px;
                padding-top: 6px;
            }
            
            .saberSaverButton:hover {
                color: #eeeeee; 
            }
                        
            /* Tooltip container */
            .tooltip {
                position: relative;
                border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
                font-size: small;
            }
            
            /* Tooltip text */
            .tooltip .tooltiptext {
                visibility: hidden;
                width: 120px;
                height: fit-content;
                background-color: #555;
                color: #fff;
                text-align: center;
                padding: 5px 0;
                border-radius: 6px;
            
                /* Position the tooltip text */
                position: absolute;
                z-index: 1;
                bottom: 125%;
                left: 50%;
                margin-left: -60px;
            
                /* Fade in tooltip */
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            /* Tooltip arrow */
            .tooltip .tooltiptext::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
            }
            
            /* Show the tooltip text when you mouse over the tooltip container */
            .tooltip:hover .tooltiptext {
                visibility: visible;
                opacity: 1;
            }

            
        </style>
        <div style="width: 64px">
            <hr style="margin: 0.1rem 0 0.5rem;">
            <a href="beatsaver://${key}" class="button tooltip saberSaverButton"><img src="https://bsaber.com/wp-content/themes/beastsaber-wp-theme/assets/svg/ico-cloud-download.svg">
                  <span class="tooltiptext">One click install! <br> Must be enabled <br> in Mod Assistant.</span>
            </a>
        </div>
    `);
});

