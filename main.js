function getKey(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

let downloadlink = "";

let song_hash = $(".tabs:not(:last-child), .message:not(:last-child), .level:not(:last-child), .breadcrumb:not(:last-child), .highlight:not(:last-child), .block:not(:last-child), .title:not(:last-child), .subtitle:not(:last-child), .table-container:not(:last-child), .table:not(:last-child), .progress:not(:last-child), .notification:not(:last-child), .content:not(:last-child), .box:not(:last-child) > b").text();
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
                width: auto; 
                text-align: center;
                display: block;
                margin: auto;
                border-style: none;
            }
            
            .saberSaverButton:hover {
                color: #eeeeee; 
            }
            
            .tooltip {
                position: relative;
                display: inline-block;
            }
            
            /* Tooltip text */
            .tooltip .tooltiptext {
                visibility: hidden;
                width: 120px;
                bottom: -120%;
                left: 50%;
                margin-left: -60px;
                background-color: black;
                color: #fff;
                text-align: center;
                padding: 5px 0;
                border-radius: 6px;
                 
                /* Position the tooltip text - see examples below! */
                position: absolute;
                z-index: 1;
            }

            /* Show the tooltip text when you mouse over the tooltip container */
            .tooltip:hover .tooltiptext {
                visibility: visible;
            }
        </style>
        <hr style="margin: 0.1rem 0 0.5rem;">
        <a href="beatsaver://${key}" class="button tooltip saberSaverButton">  Install  
              <span class="tooltiptext">Tooltip text</span>
        </a>
    `);
});

// console.log(key);
