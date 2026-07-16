import express from "express";

import {
  getCustomers,
  updateUserRole,
  deleteUser,
} from "../controllers/adminCustomerController.js";

import protect from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getCustomers);

router.put("/:id/role", updateUserRole);

router.delete("/:id", deleteUser);

export default router;
