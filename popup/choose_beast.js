function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const hidePage = `body > :not(.beastify-image) {
    display:none;
    }`;

function listenForClicks() {
    
document.addEventListener("click", (e) => {


/**
* Given the name of a beast, get the URL to the corresponding image.
*/
function beastNameToURL(beastName) {
    switch (beastName) {
        case "Bored":
            browser.storage.local.get(data => {
                if (data.boredHosts) {
                   boredHosts = data.boredHosts;
                }
              });
            console.log(boredHosts);
            return boredHosts[getRandomInt(boredHosts.length)] ;
        case "Options":
            return browser.runtime.getURL("options/options.html");

    }

}



function beastify() {
let url = beastNameToURL(e.target.textContent);
console.log(url)
browser.tabs.create({
    url: url,
});
}


function reportError(error) {
console.error(`Could not beastify: ${error}`);
}

/**
* Get the active tab,
* then call "beastify()" or "reset()" as appropriate.
*/
if (e.target.classList) {
browser.tabs.query({active: true, currentWindow: true})
.then(beastify)
.catch(reportError);
}

});
}

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) {
document.querySelector("#popup-content").classList.add("hidden");
document.querySelector("#error-content").classList.remove("hidden");
console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add a click handler.
* If we couldn't inject the script, handle the error.
*/
browser.tabs.executeScript({file: "/content_scripts/beastify.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

