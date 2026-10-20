import { products } from "./admin.js";

export default function handler(req, res) {
  const url = new URL(
    req.url,
    `https://${req.headers.host || "localhost"}`
  );

  if (url.pathname === "/api/products") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json(
      products.map(({ id, title, description, price, category }) => ({
        id, title, description, price, category
      }))
    );
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description"
content="Discover premium digital downloads, templates, ebooks and AI tools.">
<title>Smart Digital AI Store</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial,sans-serif;background:#f8fafc;color:#172033}
header{padding:22px 6%;background:#111827;color:white}
nav{display:flex;justify-content:space-between;align-items:center;gap:16px}
nav a{color:white;text-decoration:none}
.hero{text-align:center;padding:65px 20px;background:#e0e7ff}
.hero h1{font-size:clamp(30px,5vw,52px);margin:0 0 15px}
.hero p{color:#475569}
main{max-width:1100px;margin:auto;padding:30px 20px}
.controls{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:25px}
input,select{padding:12px;border:1px solid #cbd5e1;border-radius:8px;background:white}
input{flex:1;min-width:180px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
.card{background:white;border:1px solid #e2e8f0;border-radius:14px;padding:20px}
.card h3{margin-top:8px}
.price{font-size:22px;font-weight:bold}
button,.buy{display:inline-block;border:0;border-radius:8px;background:#4f46e5;color:white;padding:12px 16px;text-decoration:none;cursor:pointer}
footer{text-align:center;padding:30px;background:#111827;color:white}
small{color:#64748b}
</style>
</head>
<body>
<header>
<nav>
<strong>Smart Digital AI Store</strong>
<a href="#products">Explore Products</a>
</nav>
</header>

<section class="hero">
<h1>Digital Products. Unlimited Possibilities.</h1>
<p>Discover ebooks, creative templates, AI prompts and digital downloads.</p>
<a class="buy" href="#products">Explore Store</a>
</section>

<main id="products">
<h2>Explore Digital Products</h2>
<div class="controls">
<input id="search" placeholder="Search products..." aria-label="Search products">
<select id="category" aria-label="Filter by category">
<option value="">All categories</option>
<option value="Ebooks">Ebooks</option>
<option value="Templates">Templates</option>
<option value="AI Prompts">AI Prompts</option>
<option value="Graphics">Graphics</option>
<option value="Courses">Courses</option>
</select>
</div>
<div id="grid" class="grid">Loading products...</div>
<p><small>Instant digital access after verified payment.</small></p>
</main>

<footer>
<p>Smart Digital AI Store</p>
<p>Digital products only. No physical shipping.</p>
<a href="mailto:support@example.com" style="color:white">Contact Support</a>
</footer>

<script>
let products = [];

async function loadProducts() {
  const grid = document.getElementById("grid");

  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("Products unavailable");

    products = await response.json();
    render();
  } catch {
    grid.textContent = "Products are temporarily unavailable.";
  }
}

function render() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category").value;

  const filtered = products.filter(p =>
    (p.title + " " + p.description).toLowerCase().includes(search) &&
    (!category || p.category === category)
  );

  const grid = document.getElementById("grid");
  grid.replaceChildren();

  if (!filtered.length) {
    grid.textContent = "No products found.";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";

    const categoryEl = document.createElement("small");
    categoryEl.textContent = p.category;

    const title = document.createElement("h3");
    title.textContent = p.title;

    const description = document.createElement("p");
    description.textContent = p.description;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = "$" + Number(p.price).toFixed(2) + " USD";

    const link = document.createElement("a");
    link.className = "buy";
    link.textContent = "Buy Now";
    link.href = "/api/admin";
    link.setAttribute("aria-label", "Checkout setup required");

    card.append(categoryEl, title, description, price, link);
    grid.append(card);
  });
}

document.getElementById("search").addEventListener("input", render);
document.getElementById("category").addEventListener("change", render);
loadProducts();
</script>
</body>
</html>`;

  return res.status(200).send(html);
      }
