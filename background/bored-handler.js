// Initialize the list of blocked hosts
let boredHosts = ["https://www.zenpencils.com/", "https://www.brainpickings.org/surprise/","https://theoatmeal.com/feed/random","https://c.xkcd.com/random/comic/","https://www.boredpanda.com/","https://www.boredbutton.com/random"];

// Set the default list on installation.
browser.runtime.onInstalled.addListener(details => {
  browser.storage.local.set({
    boredHosts: boredHosts
  });
});

// Get the stored list
browser.storage.local.get(data => {
  if (data.boredHosts) {
    boredHosts = data.boredHosts;
  }
});

// Listen for changes in the blocked list
browser.storage.onChanged.addListener(changeData => {
  if (changeData.boredHosts.newValue!= ' '){
    boredHosts = changeData.boredHosts.newValue;
    boredHosts = boredHosts.filter(entry => /\S/.test(entry));
  }
  
  console.log(boredHosts);
});



