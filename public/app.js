console.log(
  'Welcome to All-in-One server boilerplate, https://github.com/FabienGreard/All-In-One'
);

/* pagination */

const container = document.querySelector('.routes');

const linkContainer = document.querySelector('.route-link-container');
const links = document.querySelectorAll('.route-link');

const jump = 9;

let pageContainer, pages;

const createPagination = (count, jump) => {
  container.insertAdjacentHTML(
    'beforeend',
    `<ul class="route-page-container"></ul>`
  );
  pageContainer = document.querySelector('.route-page-container');

  for (let i = 0; i < Math.ceil(count / jump); i++) {
    const from = i * jump,
      to = i * jump + jump;

    pageContainer.insertAdjacentHTML(
      'beforeend',
      `<li class="route-page" onclick="display(${from},${to})">${i + 1}</li>`
    );
  }

  pages = document.querySelectorAll('.route-page');
};

const display = (from, to) => {
  linkContainer.innerHTML = '';
  for (let i = from; i < to; i++) {
    links[i] && linkContainer.append(links[i]);
  }

  setActive(from / jump);
};

const setActive = _key => {
  for (const [key, el] of pages.entries()) {
    if (key === _key) el.classList.add('active');
    else el.classList.remove('active');
  }
};

createPagination(links.length, jump);
display(0, jump);
