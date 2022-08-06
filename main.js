function xhrError() {
  console.error(this.statusText);
}

function loadBeatsaverAndInject(url, callback /*, opt_arg1, opt_arg2, ... */) {
  let xhr = new XMLHttpRequest();
  xhr.onload = callback;
  xhr.onerror = xhrError;
  xhr.open("GET", url, true);
  xhr.send(null);
}

/**
 * Check for a classname existing in a list of elements.
 * @param {HTMLCollection} elementArr
 * @param {string} className
 */
function checkForChildrenHaveClassname(elementArr, className) {
  for (const element of elementArr) {
    if (element.classList.contains(className)) return true
  }
  return false
}

function hasInjected() {
  return checkForChildrenHaveClassname(
    document.querySelector(".column > .card.map-card").children,
    "scoreSaverExtension",
  )
}

const innerHtml = (key) => `
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
    <img class="scoreSaverExtension-img" src="${chrome.runtime.getURL('download-icon.svg')}" alt="Download Button" title="Download Button">
    <span class="tooltiptext">${chrome.i18n.getMessage("button_text")}</span>
  </a>
</div>
`

function showButton() {
  let key = JSON.parse(this.responseText).id
  console.log(key)

  let downloadButtonElement = document.createElement('div');

  downloadButtonElement.innerHTML = innerHtml(key);

  // Prep the card
  let card = document
    .querySelector(".column > .card.map-card")
    .cloneNode(true)
  // Remove all inner elements in the card
  let card_inner = card.firstChild
  while (card_inner.firstChild) {
    card_inner.removeChild(card_inner.firstChild);
  }
  // Remove any other elements on the card's parent
  while (card.childNodes.length !== 1) {
    card.removeChild(card.lastChild)
  }

  // Add our garbage to the card
  card_inner.appendChild(downloadButtonElement)

  // If this exists, just fail out since we don't need to do extra work
  if (hasInjected()) return

  // Tag this so we can check for it later
  card.classList.add("scoreSaverExtension")

  // Metrics!
  fetch("https://umami.cobular.com/api/collect", {
    method: "POST",
    mode: "cors",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
        payload: {
          website: "3f56052c-27bd-4235-a8f4-ad333331b91c",
          url: (new URL(window.location)).pathname,
          referrer: window.document.referrer,
          hostname: window.location.hostname,
          language: window.navigator.language,
          screen: `${window.screen.width}x${window.screen.height}`,
        },
        type: "pageview"
      }
    )
  }).then(value => console.log(value)).catch(reason => console.error(reason))

  // Finally, add it do the document again.
  document.querySelector(".column > .card.map-card").append(card)
}

// Hacky bullshit this needs to be better
let injection_lock = false
setInterval(function () {
  const url = new URL(window.location)
  if (url.pathname.startsWith("/leaderboard/")) {
    // Is a leaderboard page, should inject the content
    // Have we already injected?
    if (!hasInjected()) {
      let hash_element = document.querySelector("div.content > strong")
      if (hash_element !== undefined && hash_element !== null) {
        console.log("injection happening")
        if (!injection_lock) {
          injection_lock = true
          let song_hash = hash_element.textContent.trim();
          loadBeatsaverAndInject(`https://api.beatsaver.com/maps/hash/${song_hash}`, showButton)
          injection_lock = false
        }
      }
    }
  }
}, 100)



