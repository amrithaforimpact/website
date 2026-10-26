// Fills the "Writing" section from posts.json.
// posts.json will later be refreshed automatically from Substack once a day.
(function () {
  var box = document.getElementById("posts");
  if (!box) return;

  function esc(s) {
    return String(s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render(posts) {
    if (!posts || !posts.length) return;
    box.innerHTML = posts.slice(0, 3).map(function (p) {
      var img = p.image
        ? '<img class="card-img" src="' + esc(p.image) + '" alt="" loading="lazy">'
        : '<div class="ph">Cover image from Substack</div>';
      return '<a class="card" href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
        img +
        '<span class="post-meta">' + esc(p.date) + '</span>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.summary) + '</p>' +
        '</a>';
    }).join("");
  }

  fetch("posts.json", { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(render)
    .catch(function () { /* keep the placeholder cards already on the page */ });
})();
