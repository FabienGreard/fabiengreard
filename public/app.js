'use strict';
var _slicedToArray = (function() {
  function f(g, h) {
    var j = [],
      k = !0,
      l = !1,
      m = void 0;
    try {
      for (
        var o, n = g[Symbol.iterator]();
        !(k = (o = n.next()).done) && (j.push(o.value), !(h && j.length === h));
        k = !0
      );
    } catch (p) {
      (l = !0), (m = p);
    } finally {
      try {
        !k && n['return'] && n['return']();
      } finally {
        if (l) throw m;
      }
    }
    return j;
  }
  return function(g, h) {
    if (Array.isArray(g)) return g;
    if (Symbol.iterator in Object(g)) return f(g, h);
    throw new TypeError('Invalid attempt to destructure non-iterable instance');
  };
})();
console.log(
  'Welcome to FabienGreard website, https://github.com/FabienGreard/fabiengreard'
);
var container = document.querySelector('.routes'),
  linkContainer = document.querySelector('.route-link-container'),
  links = document.querySelectorAll('.route-link'),
  jump = 9,
  pageContainer,
  pages,
  createPagination = function(f, g) {
    container.insertAdjacentHTML(
      'beforeend',
      '<ul class="route-page-container"></ul>'
    ),
      (pageContainer = document.querySelector('.route-page-container'));
    for (var h = 0; h < Math.ceil(f / g); h++) {
      var j = h * g,
        k = h * g + g;
      pageContainer.insertAdjacentHTML(
        'beforeend',
        '<li class="route-page" onclick="display(' +
          j +
          ',' +
          k +
          ')">' +
          (h + 1) +
          '</li>'
      );
    }
    pages = document.querySelectorAll('.route-page');
  },
  display = function(f, g) {
    linkContainer.innerHTML = '';
    for (var h = f; h < g; h++) links[h] && linkContainer.append(links[h]);
    setActive(f / jump);
  },
  setActive = function(f) {
    var _iteratorNormalCompletion = !0,
      _didIteratorError = !1,
      _iteratorError = void 0;
    try {
      for (
        var h, g = pages.entries()[Symbol.iterator]();
        !(_iteratorNormalCompletion = (h = g.next()).done);
        _iteratorNormalCompletion = !0
      ) {
        var _step$value = _slicedToArray(h.value, 2),
          j = _step$value[0],
          k = _step$value[1];
        j === f ? k.classList.add('active') : k.classList.remove('active');
      }
    } catch (j) {
      (_didIteratorError = !0), (_iteratorError = j);
    } finally {
      try {
        !_iteratorNormalCompletion && g.return && g.return();
      } finally {
        if (_didIteratorError) throw _iteratorError;
      }
    }
  };
createPagination(links.length, jump), display(0, jump);
