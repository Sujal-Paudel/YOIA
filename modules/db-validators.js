const Items = require("../models/items");

function getDataOfItems(array) {
  return new Promise((resolve, reject) => {
    const itemsIdArray = array.map((e) => e._id);

    Items.find({
      $and: [{ _id: { $in: itemsIdArray } }, { published: true }],
    })
      .then((result) => {
        console.log(result.length);
        resolve(
          result.reduce((obj, item, i) => {
            return [
              ...obj,
              {
                itemCode: item.itemCode,
                itemName: item.itemName,
                quantity: array.find((e) => e.itemCode === item.itemCode)
                  .quantity,
                rate: item.rate,
              },
            ];
          }, [])
        );
      })
      .catch((e) => {
        reject(e);
      });
  });
}

module.exports = {
  getDataOfItems,
};
