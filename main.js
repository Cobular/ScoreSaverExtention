function getKey(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

let downloadlink = "";

let song_hash = $(".tabs:not(:last-child), .message:not(:last-child), .level:not(:last-child), .breadcrumb:not(:last-child), .highlight:not(:last-child), .block:not(:last-child), .title:not(:last-child), .subtitle:not(:last-child), .table-container:not(:last-child), .table:not(:last-child), .progress:not(:last-child), .notification:not(:last-child), .content:not(:last-child), .box:not(:last-child) > b").text();
song_hash = /[a-fA-F0-9]{40}/.exec(song_hash);

var key = JSON.parse(getKey(`https://beatsaver.com/api/maps/by-hash/${song_hash}`)).key

$(function () {
    $(".columns:not(.is-desktop) ").append(`<a href="beatsaver://${key}"> penis </a>`);
});

// console.log(key);
