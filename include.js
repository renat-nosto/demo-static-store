document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
    .nosto_product span {
      display: block;
        margin-left: 1em;
    }
    .nosto_product span:before {
        content: attr(class)' : ';
    }
       .nosto_element {
        display: inline-block;
      }
  </style>
`,
);

//history.pushState("", "", location.href + "?variant=x")
if (location.origin === "https://renat-nosto.github.io") {
  document.write(`<scr` + `ipt src="https://connect.staging.nosto.com/include/qvuhs4m3?"></scr` + `ipt>`);
} else {
  const merchant = location.search.includes("other") ? "renat2" : "renat";
  document.write(`<scr` + `ipt src="https://my.dev.nos.to/include/${merchant}"></scr` + `ipt>`);
}

setTimeout(() => {
  Array.from(document.querySelectorAll(".image_url")).forEach((e) => {
    e.insertAdjacentHTML("afterend", `<img src="${e.textContent}" style="max-width: 300px; max-height: 300px">`);
  });
}, 10);
