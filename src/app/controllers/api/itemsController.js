const fetch = require('node-fetch');

const Utils = require('../utils');

class ItemsController {

  list(req, res) {
    const query = req.query.q
    try {
      fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + query)
        .then(response => response.json())
        .then(data => {
          const items = data.results.slice(0, 4).map(item => (
            Utils.itemObject(item, false, "https://http2.mlstatic.com/D_NQ_NP_" + item.thumbnail_id + "-O.webp")
          ))

          res.status(200).json({
            "author": {
              "name": "",
              "lastname": ""
            },
            "categories": [],
            "items": items
          })  
        })
    } catch(error) {
        console.log(error);
  }}

  get(req, res) {
    const id = req.params.id
    try {
      fetch("https://api.mercadolibre.com/items/" + id)
        .then(response => response.json())
        .then(item => {
          fetch("https://api.mercadolibre.com/items/" + id + "/description")
          .then(response => response.json())
          .then(data => {
            const description = data.plain_text
            res.status(200).json({
              "author": {
                "name": "",
                "lastname": ""
              },
              "categories": [],
              "item": Utils.itemObject(item, true, item.pictures ? item.pictures[0] : "", description)
            })  
          })
        })
    } catch(error) {
        console.log(error);
  }}

}

module.exports = new ItemsController();