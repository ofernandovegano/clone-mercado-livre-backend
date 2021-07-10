class Utils {

  itemObject(item, isGet, picture, description = null ){
    const result = {
      "id": item.id,
      "title": item.title,
      "price": {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: (item.price % 1).toFixed(2).substring(2)
      },
      "picture": picture,
      "condition": item.condition,
      "free_shipping": item.shipping.free_shipping
    }

    if(isGet){
      result.sold_quantity = item.sold_quantity
      result.description = description
    } else {
      result.address = item.address.state_name
    }
    return result
  }
}

module.exports = new Utils();