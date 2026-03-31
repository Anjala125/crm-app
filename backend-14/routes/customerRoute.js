const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.get("/", auth, getCustomers);
router.post("/", auth, addCustomer);
router.put("/:id", auth, updateCustomer);
router.delete("/:id", auth, deleteCustomer);

module.exports = router;