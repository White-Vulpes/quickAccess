document.addEventListener("DOMContentLoaded", function () {
  const tagInput = document.getElementById("tagInput");
  const textInput = document.getElementById("textInput");
  const tagList = document.getElementById("tagList");
  const addTagBtn = document.getElementById("addTagBtn");

  chrome.storage.sync.get(null, function (items) {
    for (let key in items) {
      const tagItem = document.createElement("li");
      tagItem.textContent = `${key}: ${items[key]}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function () {
        chrome.storage.sync.remove(key, function () {
          console.log("Removed " + key);
          tagList.removeChild(tagItem);
        });
      });

      tagItem.appendChild(removeButton);
      tagList.appendChild(tagItem);
    }
  });

  addTagBtn.addEventListener("click", function () {
    const tag = document.createElement("li");
    tag.textContent = `${tagInput.value}: ${textInput.value}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      chrome.storage.sync.remove(tagInput.value, function () {
        console.log("Removed " + tagInput.value);
        tagList.removeChild(tag);
      });
    });
    tag.appendChild(removeButton);
    tagList.appendChild(tag);

    let obj = {};
    obj[tagInput.value] = textInput.value;
    chrome.storage.sync.set(obj, function () {
      console.log("Value is set to " + textInput.value);
    });

    tagInput.value = "";
    textInput.value = "";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".my-input-class");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.previousElementSibling.classList.add("active");
    });
    input.addEventListener("blur", function () {
      if (this.value === "") {
        this.previousElementSibling.classList.remove("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById("theme-toggle");
  themeToggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
  });
});
