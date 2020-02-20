const router = require("express").Router();
const Orders = require("../orderOperations/orderModel");
const order = require("../helperVariables/orderHelpers");
// const restricted = require("../../globalMiddleware/restrictedMiddleware");

// @desc     Post an order
// @route    POST /api/orders
// @access   Private
router.post("/", async (req, res) => {
  try {
    let data = req.body;

    if (data) {
      const spResponse = await Orders.orderMaker(data.spInfo);

      if (spResponse) {
        let order = {
          userID: data.orderInfo.userID,
          storeID: data.orderInfo.storeID,
          status: spResponse.status,
          total: spResponse.total,
          subtotal: spResponse.subtotal,
          tax: spResponse.tax,
          fees: spResponse.fees,
          shipping: spResponse.shipping,
          orderToken: spResponse.orderToken,
          spOrderID: spResponse.orderId,
          mode: spResponse.mode,
          orderedAt: spResponse.orderedAt
        };

        Orders.insert(order);
        res.status(201).json({
          message:
            "You have successfully added this Quote to our DB, spResponse is from SP!",
          order,
          spResponse
        });
      }
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to add this quote, its not you.. its me"
    });
  }
});

// @desc     Get all orders
// @route    GET /api/orders
// @access   Private
router.get("/", async (req, res) => {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Unable to get orders, its not you.. its me" });
  }
});

// @desc     Get an order by orderID
// @route    GET /api/orders/:orderID
// @access   Private
router.get("/:orderID", async (req, res) => {
  try {
    const order = await Orders.findById(req.params.orderID);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this order id, its not you.. its me"
    });
  }
});

// @desc     Get an order by Scalable Press orderID
// @route    GET /api/orders/sporderid/:spOrderID
// @access   Private
router.get("/sporderid/:spOrderID", async (req, res) => {
  try {
    const order = await Orders.findBySPId(req.params.spOrderID);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this order id, its not you.. its me"
    });
  }
});

// @desc     Get an order by Scalable Press order token
// @route    GET /api/orders/ordertoken/:orderToken
// @access   Private
router.get("/ordertoken/:orderToken", async (req, res) => {
  try {
    const order = await Orders.findByOrderToken(req.params.orderToken);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this order id, its not you.. its me"
    });
  }
});

// @desc     Edit an order by orderID
// @route    PUT /api/orders/:orderID
// @access   Private
router.put("/:orderID", async (req, res) => {
  try {
    const order = await Orders.updateByOrderId(req.params.orderID, req.body);
    // console.log(order);
    if (order) {
      res.status(200).json({ order, message: "Order info has been updated!" });
    } else {
      res.status(404).json({ message: "That order could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this order, its not you.. its me"
    });
  }
});

// @desc     Edit an order by order token
// @route    PUT /api/orders/ordertoken/:orderToken
// @access   Private
router.put("/ordertoken/:orderToken", async (req, res) => {
  try {
    const order = await Orders.updateByOrderToken(
      req.params.orderToken,
      req.body
    );
    if (order) {
      res.status(200).json({ order, message: "Order info has been updated!" });
    } else {
      res.status(404).json({ message: "That order could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this order, its not you.. its me"
    });
  }
});

// @desc     Edit an order by Scalable press order ID
// @route    PUT /api/orders/sporderid/:spOrderID
// @access   Private
router.put("/sporderid/:spOrderID", async (req, res) => {
  try {
    const order = await Orders.updateBySpOrderID(
      req.params.spOrderID,
      req.body
    );
    if (order) {
      res.status(200).json({ order, message: "Order info has been updated!" });
    } else {
      res.status(404).json({ message: "That order could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this order, its not you.. its me"
    });
  }
});

// @desc     Delete an order by orderID
// @route    DELETE /api/orders/:orderID
// @access   Private
router.delete("/:orderID", async (req, res) => {
  try {
    const count = await Orders.removeByOrderId(req.params.orderID);
    if (count > 0) {
      res.status(200).json({ message: "this Order has been deleted!" });
    } else {
      res.status(404).json({ message: "Could not find that order ID" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting Order, its not you.. its me"
    });
  }
});

// @desc     Delete an order by	orderToken
// @route    DELETE /api/orders/ordertoken/:orderToken
// @access   Private
router.delete("/ordertoken/:orderToken", async (req, res) => {
  try {
    const count = await Orders.removeByOrderToken(req.params.orderToken);
    if (count > 0) {
      res.status(200).json({ message: "this Order has been deleted!" });
    } else {
      res.status(404).json({ message: "Could not find that order token" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting Order, its not you.. its me"
    });
  }
});

// @desc     Delete an order by Scalable press order ID
// @route    DELETE /api/stores/sporderid/:spOrderID
// @access   Private
router.delete("/sporderid/:spOrderID", async (req, res) => {
  try {
    const count = await Orders.removeBySpOrderID(req.params.spOrderID);
    if (count > 0) {
      res.status(200).json({ message: "this Order has been deleted!" });
    } else {
      res
        .status(404)
        .json({ message: "Could not find that Scalable press order ID" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting Order, its not you.. its me"
    });
  }
});

// Export router
module.exports = router;
