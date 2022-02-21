console.log(1)
new MutationObserver(ev => ev.some(e => Array.from(e.addedNodes).some(node => node.nodeName === "BODY") && perform())).observe(document.querySelector("html"), {
     childList:true,
})

function perform() {
  console.log("have body")
  let iframe = document.body.appendChild(document.createElement("iframe"))
  iframe.contentWindow
}
console.log(document.body)