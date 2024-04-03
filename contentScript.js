// contentScript.js
chrome.storage.sync.get(null, function (items) {
  // Add a single event listener to the body
  document.body.addEventListener("input", function (event) {
    // Check if the event target is an input or textarea
    if (
      event.target.tagName.toLowerCase() === "input" ||
      event.target.tagName.toLowerCase() === "textarea"
    ) {
      const inputValue = event.target.value;
      for (let key in items) {
        const tagWithSlashes = "//" + key;
        if (inputValue.includes(tagWithSlashes)) {
          event.target.value = inputValue.replace(tagWithSlashes, items[key]);
        }
      }
    }
  });
});
