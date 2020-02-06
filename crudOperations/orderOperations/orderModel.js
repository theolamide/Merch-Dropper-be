const db = require("../../databaseOperations/db-config");

module.exports = {
  insert,
  find,
  findById,
  findBySPId,
  findByOrderToken,
  updateByOrderId,
  updateByOrderToken,
  updateBySpOrderID,
  removeByOrderId,
  removeByOrderToken,
  removeBySpOrderID
};

function insert(order) {
  return db("orders")
    .insert(order, "orderID")
    .then(orders => {
      const [orderID] = orders;
      return findById(orderID);
    });
}

function find() {
  return db("orders").select(
    "store_name",
    "username",
    "status",
    "total",
    "subtotal",
    "tax",
    "fees",
    "shipping",
    "orderToken",
    "spOrderID",
    "mode",
    "createdAt"
  );
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function findById(orderID) {
  return db("orders")
    .where("orderID", orderID)
    .select(
      "store_name",
      "username",
      "status",
      "total",
      "subtotal",
      "tax",
      "fees",
      "shipping",
      "orderToken",
      "spOrderID",
      "mode",
      "createdAt"
    )
    .first();
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function findBySPId(spOrderID) {
  return db("orders")
    .where("spOrderID", spOrderID)
    .select(
      "store_name",
      "username",
      "status",
      "total",
      "subtotal",
      "tax",
      "fees",
      "shipping",
      "orderToken",
      "spOrderID",
      "mode",
      "createdAt"
    )
    .first();
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function findByOrderToken(orderToken) {
  return db("orders")
    .where("orderToken", orderToken)
    .select(
      "store_name",
      "username",
      "status",
      "total",
      "subtotal",
      "tax",
      "fees",
      "shipping",
      "orderToken",
      "spOrderID",
      "mode",
      "createdAt"
    )
    .first();
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function updateByOrderId(orderID, changes) {
  return db("orders")
    .where("orderID", orderID)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(orderID);
      } else {
        return null;
      }
    });
}

function updateByOrderToken(orderToken, changes) {
  return db("orders")
    .where("orderToken", orderToken)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findByOrderToken(orderToken);
      } else {
        return null;
      }
    });
}

function updateBySpOrderID(spOrderID, changes) {
  return db("orders")
    .where("spOrderID", spOrderID)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findByOrderToken(spOrderID);
      } else {
        return null;
      }
    });
}

function removeByOrderId(orderID) {
  return db("orders")
    .where("orderID", orderID)
    .del();
}

function removeByOrderToken(orderToken) {
  return db("orders")
    .where("orderToken", orderToken)
    .del();
}

function removeBySpOrderID(spOrderID) {
  return db("orders")
    .where("spOrderID", spOrderID)
    .del();
}