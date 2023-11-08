#!/usr/bin/env node

const len = 80
const offset = 10
const ids = Array.from({length: len}).map((_, i) => i + offset)
const merchant = "renat"
const es_index = "product_1697128655086"
//
// console.log(process.argv)
//
// // const [merchant, es_index] = process.argv.slice(2)
//
// let r = (i) => fetch(`http://localhost:9200/${es_index}/_doc/${merchant}_${i}?routing=${merchant}`, {
//   method: "PUT",
//   headers: {"Content-Type": "application/json"},
//   body: JSON.stringify(product(i))
// }).then(r => r.json()).then(console.log)
//
const fs = require("fs")

ids.forEach(async id => {
  let doc = await fetch(`http://localhost:9200/${es_index}/_doc/${merchant}_${id}?routing=${merchant}`)
  let {_source} = await doc.json()
  fs.writeFileSync(`./${id}.html`, `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product ${id}</title>
</head>
<body>
<script src="include.js"></script>
<div class="nosto_page_type">product</div>
<div class="nosto_product">
  <span class="url">https://renat-nosto.github.io/demo-static-store/${id}.html</span>
  <span class="product_id">${id}</span>
  <span class="name">${_source.name}</span>
  <span class="image_url">${_source.imageUrl}</span>
  <span class="price">${_source.price}</span>
  <span class="price_currency_code">EUR</span>
  <span class="availability">InStock</span>
  ${_source.category.map(c => `<span class="category">${c}</span>`).join("")}
  <span class="description">${_source.description}</span>
  <span class="list_price">${_source.listPrice}</span>
  <span class="brand">${_source.brand}</span>
</div>
</body>
</html>
`)

})