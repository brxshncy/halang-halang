import express from "express";

const orderRoutes = express.Router();

orderRoutes.route("/").post().get();

export default orderRoutes;
