const boredHostsTextArea = document.querySelector("#bored-hosts");

function storeSettings() {
  let boredHosts = boredHostsTextArea.value.split("\n");
  browser.storage.local.set({
    boredHosts
  });
}

function updateUI(restoredSettings) {
  boredHostsTextArea.value = restoredSettings.boredHosts.join("\n");
}

function onError(e) {
  console.error(e);
}


browser.storage.local.get().then(updateUI, onError);


boredHostsTextArea.addEventListener("change", storeSettings);
