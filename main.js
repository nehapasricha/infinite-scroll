const divContent = document.getElementById("divContent");
const listEnd = document.getElementById("listEnd");
let itemCount = 0;
let appending = false;

window.addEventListener("DOMContentLoaded", load);

function load() {
  addItems();
}

function addItems() {
  appending = true;
  for (let i = 0; i < 20; i++) {
    let item = generateDataBlock(`This is item no ${itemCount}`);
    divContent.appendChild(item);
    itemCount++;
  }
  appending = false;
}

function generateDataBlock(message) {
  let item = document.createElement("div");
  item.setAttribute("class", "item");
  item.textContent = message;
  return item;
}

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

let callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.target.id === "listEnd") {
      if (entry.isIntersecting && !appending) {
        appending = true;
        setTimeout(addItems(), 20000);
      }
    }
  });
};

let observer = new IntersectionObserver(callback, options);

observer.observe(listEnd);
