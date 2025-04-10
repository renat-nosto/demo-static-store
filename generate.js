#!/usr/bin/env node

const len = 80;
const offset = 10;
const ids = Array.from({ length: len }).map((_, i) => i + offset);
const merchant = "renat";
const es_index = "product_1697128655086";
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
import { writeFileSync } from "fs";

ids.forEach(async (id) => {
  let doc = await fetch(`http://localhost:9200/${es_index}/_doc/${merchant}_${id}?routing=${merchant}`);
  let { _source } = await doc.json();
  writeFileSync(
    `./${id}.html`,
    `
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
  <span class="selected_sku_id"></span>

  <span class="url">https://renat-nosto.github.io/demo-static-store/${id}.html</span>
  <span class="product_id">${id}</span>
  <span class="name">${_source.name}</span>
  <span class="image_url">https://renat-nosto.github.io/demo-static-store/1.jpg?${id}</span>
  <span class="price">${_source.price}</span>
  <span class="price_currency_code">EUR</span>
  <span class="availability">InStock</span>
  ${_source.category.map((c) => `<span class="category">${c}</span>`).join("")}
  <span class="description">${_source.description}</span>
  <span class="list_price">${_source.listPrice}</span>
  <span class="brand">${_source.brand}</span>
  ${_source.skus
    .map(
      (sku) => `<span class="nosto_sku">
        <span class="id">${sku.id}</span>
    <span class="name">${sku.name}</span>
    <span class="price">${sku.price}</span>
    <span class="list_price">${sku.list_price}</span>
    <span class="inventory_level">2</span>
    <span class="url">${sku.url}</span>
    <span class="image_url">${sku.imageUrl}</span>
    <span class="availability">InStock</span>
    <span class="custom_fields">
    ${Object.entries(sku.customFields)
      .map(([k, v]) => `<span class="${k}">${v}</span>`)
      .join("")}
    </span>
  </span>`,
    )
    .join("")}
</div>
<script >
  if(location.hash){
    document.querySelector(".selected_sku_id").textContent = location.hash.substring(1)
    }

</script>
</body>
</html>
`,
  );
});
