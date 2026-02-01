const API = "https://github.com/Aryan-Mohite/transformers-data/blob/main/transformers.json?raw=true";

let all = [], filtered = [];
let page = 1;
const perPage = 6;

fetch(API)
  .then(res => res.json())
  .then(data => {
    all = data;
    apply();
  });

function apply() {
  const q = search.value.toLowerCase();
  const faction = document.getElementById("faction").value;

  filtered = all.filter(c =>
    c.name.toLowerCase().includes(q) &&
    (faction === "all" || c.faction === faction)
  );

  sort.value === "az"
    ? filtered.sort((a,b)=>a.name.localeCompare(b.name))
    : filtered.sort((a,b)=>b.name.localeCompare(a.name));

  page = 1;
  render();
}

function render() {
  cards.innerHTML = "";

  const slice = filtered.slice((page-1)*perPage, page*perPage);

  slice.forEach(c => {
    const div = document.createElement("div");
    div.className = `card ${c.faction.toLowerCase()}`;
    div.style.backgroundImage = `url(${c.image})`;

    div.innerHTML = `
      <div class="card-content">
        <h3>${c.name}</h3>
        <p><b>Faction:</b> ${c.faction}</p>
        <p><b>Alt Mode:</b> ${c.altMode}</p>
        <p><b>Role:</b> ${c.role}</p>
        <p><b>Weapon:</b> ${c.weapon}</p>
        <p>${c.description}</p>
      </div>
    `;
    cards.appendChild(div);
  });

  document.getElementById("page").textContent =
    `Page ${page}/${Math.ceil(filtered.length/perPage)}`;
}

search.oninput = apply;
sort.onchange = apply;
faction.onchange = apply;

next.onclick = () => {
  if (page * perPage < filtered.length) {
    page++;
    render();
  }
};

prev.onclick = () => {
  if (page > 1) {
    page--;
    render();
  }
};
