import express from "express";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/",  createContact);
contactRouter.get("/", protect, authorize("admin"), getContacts);

export default contactRouter;
