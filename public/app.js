console.log(
  "Welcome to All-in-One server boilerplate, https://github.com/FabienGreard/All-In-One"
);
const container = document.querySelector(".routes"),
  linkContainer = document.querySelector(".route-link-container"),
  links = document.querySelectorAll(".route-link"),
  jump = 9;
let pageContainer, pages;
const createPagination = (a, b) => {
    container.insertAdjacentHTML(
      "beforeend",
      `<ul class="route-page-container"></ul>`
    ),
      (pageContainer = document.querySelector(".route-page-container"));
    for (let c = 0; c < Math.ceil(a / b); c++) {
      const d = c * b,
        e = c * b + b;
      pageContainer.insertAdjacentHTML(
        "beforeend",
        `<li class="route-page" onclick="display(${d},${e})">${c + 1}</li>`
      );
    }
    pages = document.querySelectorAll(".route-page");
  },
  display = (a, b) => {
    linkContainer.innerHTML = "";
    for (let c = a; c < b; c++) links[c] && linkContainer.append(links[c]);
    setActive(a / jump);
  },
  setActive = a => {
    for (const [b, c] of pages.entries())
      b === a ? c.classList.add("active") : c.classList.remove("active");
  };
createPagination(links.length, jump), display(0, jump);
