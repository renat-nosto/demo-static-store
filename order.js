// make a nosto order graphql request
async function sendOrder() {
  const api = await new Promise(nostojs)
  const cid = api.visit.getCustomerId()
  let params = new URLSearchParams(location.search)
  let email = params.get("email") || "example@nosto.com"
  let number = params.get("number") || (Math.random() * 10000) | 0 + ""
  let product = params.get("product") || "1"
  const order = {
    "customer": {
      "firstName": "Renat",
      "lastName": "Nostovich",
      "email": "renat@nosto.com",
      "marketingPermission": false
    },

    "order": {
      "number": "0001",
      "orderStatus": "paid",
      "paymentProvider": "klarna",
      "ref": "0001",
      "purchasedItems": [
        {
          "name": "Product 1",
          "productId": "1",
          "skuId": "1-1",
          "priceCurrencyCode": "EUR",
          "unitPrice": 100,
          "quantity": 1,
        }
      ]
    }
  }
  fetch("https://my.dev.nos.to/v1/graphql", {
    "headers": {
      "content-type": "application/json",
    },
    "body": JSON.stringify({
      operationName: "Order",
      query: "mutation Order($params:InputOrderParams!, $cid:String!){\n" +
        "  placeOrder(by:BY_CID, id: $cid, params:$params) {\n" +
        "    id\n" +
        "  }\n" +
        "}",
      variables: {
        "params": order,
        cid
      }
    }),
    "method": "POST",
  })

}