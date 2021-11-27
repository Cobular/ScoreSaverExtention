function xhrError() {
  console.error(this.statusText);
}

function loadFile(url, callback /*, opt_arg1, opt_arg2, ... */) {
  let xhr = new XMLHttpRequest();
  xhr.onload = callback;
  xhr.onerror = xhrError;
  xhr.open("GET", url, true);
  xhr.send(null);
}


function showButton() {
  let key = JSON.parse(this.responseText).id
  console.log(key)

  let downloadButtonElement = document.createElement('div');

  const imageUrl = chrome.runtime.getURL('download-icon.svg');

  downloadButtonElement.innerHTML = `
<script async defer data-website-id="3f56052c-27bd-4235-a8f4-ad333331b91c" data-host-url="https://umami.cobular.com/">
// My custom analytics package. This is a more privacy preserving option than Google analytics, it's open source here: https://umami.is/! 
!function(){"use strict";var t=function(t,e,n){var a=t[e];return function(){for(var e=[],i=arguments.length;i--;)e[i]=arguments[i];return n.apply(null,e),a.apply(t,e)}},e=function(){var t=window.doNotTrack,e=window.navigator,n=window.external,a=t||e.doNotTrack||e.msDoNotTrack||n&&"function"==typeof n.msTrackingProtectionEnabled&&n.msTrackingProtectionEnabled();return!0===a||1===a||"yes"===a||"1"===a};!function(n){var a=n.screen,i=a.width,r=a.height,o=n.navigator.language,c=n.location,s=c.hostname,u=c.pathname,l=c.search,d=n.localStorage,f=n.sessionStorage,v=n.document,p=n.history,m=v.querySelector("script[data-website-id]");if(m){var h,g=function(t){return m&&m.getAttribute(t)},w=g("data-website-id"),y=g("data-host-url"),S="false"!==g("data-auto-track"),E=g("data-do-not-track"),k=g("data-cache"),b=g("data-domains"),T=d.getItem("umami.disabled")||E&&e()||b&&!b.split(",").map((function(t){return t.trim()})).includes(s),N=y?(h=y)&&h.length>1&&h.endsWith("/")?h.slice(0,-1):h:m.src.split("/").slice(0,-1).join("/"),j=i+"x"+r,q=[],I=""+u+l,L=v.referrer,O=function(t,e,n){if(!T){var a="umami.cache",i={website:n,hostname:s,screen:j,language:o,cache:k&&f.getItem(a)};e&&Object.keys(e).forEach((function(t){i[t]=e[t]})),function(t,e,n){var a=new XMLHttpRequest;a.open("POST",t,!0),a.setRequestHeader("Content-Type","application/json"),a.onreadystatechange=function(){4===a.readyState&&n&&n(a.response)},a.send(JSON.stringify(e))}(N+"/api/collect",{type:t,payload:i},(function(t){return k&&f.setItem(a,t)}))}},P=function(t,e,n){return void 0===t&&(t=I),void 0===e&&(e=L),void 0===n&&(n=w),O("pageview",{url:t,referrer:e},n)},x=function(t,e,n,a){return void 0===e&&(e="custom"),void 0===n&&(n=I),void 0===a&&(a=w),O("event",{event_type:e,event_value:t,url:n},a)},A=function(){v.querySelectorAll("[class*='umami--']").forEach((function(t){t.className.split(" ").forEach((function(e){if(/^umami--([a-z]+)--([\\w]+[\\w-]*)$/.test(e)){var n=e.split("--"),a=n[1],i=n[2],r=function(){return x(i,a)};q.push([t,a,r]),t.addEventListener(a,r,!0)}}))}))},H=function(){q.forEach((function(t){var e=t[0],n=t[1],a=t[2];e&&e.removeEventListener(n,a,!0)})),q.length=0},R=function(t,e,n){if(n){H(),L=I;var a=n.toString();(I="http"===a.substring(0,4)?"/"+a.split("/").splice(3).join("/"):a)!==L&&P(I,L),setTimeout(A,300)}};if(!n.umami){var _=function(t){return x(t)};_.trackView=P,_.trackEvent=x,_.addEvents=A,_.removeEvents=H,n.umami=_}S&&!T&&(p.pushState=t(p,"pushState",R),p.replaceState=t(p,"replaceState",R),P(I,L),A())}}(window)}();
</script>

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
    /*border-bottom: 1px dotted black; !* If you want dots under the hoverable text *!*/
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

.scoreSaverExtension-parent {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.scoreSaverExtension-img {
    vertical-align: middle;
}

.scoreSaverExtension-p {
 vertical-align: middle;
 display: inline;
}
</style>
<div class="scoreSaverExtension-parent">
  <a href="beatsaver://${key}" class="button tooltip saberSaverButton umami--click--download-button-${key}">
    <p class="scoreSaverExtension-p">One Click Install</p>
    &ensp;
    <img class="scoreSaverExtension-img" src="${imageUrl}" alt="Download Button" title="Download Button">
    <span class="tooltiptext">${chrome.i18n.getMessage("button_text")}</span>
  </a>
</div>
    `;

  // Prep the card
  let card = document
    .querySelector(".column > .card.map-card")
    .cloneNode(true)
  let card_inner = card.firstChild
  while (card_inner.firstChild) {
    card_inner.removeChild(card_inner.firstChild);
  }

  card_inner.appendChild(downloadButtonElement)

  // If this exists, just fail out since we don't need to do extra work
  if (document.querySelector(".column > .card.map-card").children.length >= 2) {
    return
  }

  document.querySelector(".column > .card.map-card").append(card)
}

// Hacky bullshit this needs to be better
let injection_lock = false
setInterval(function () {
  const url = new URL(window.location)
  if (url.pathname.startsWith("/leaderboard/")) {
    // Is a leaderboard page, should inject the content
    // Have we already injected?
    if (!(document.querySelector(".column > .card.map-card").children.length >= 2)) {
      let hash_element = document.querySelector("div.content > strong")
      if (hash_element !== undefined && hash_element !== null) {
        console.log("injection happening")
        if (!injection_lock) {
          injection_lock = true
          let song_hash = hash_element.textContent;
          loadFile(`https://api.beatsaver.com/maps/hash/${song_hash}`, showButton)
          injection_lock = false
        }
      }
    }
  }
}, 100)



