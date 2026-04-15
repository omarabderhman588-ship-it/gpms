//what does this file do? It defines the main router for the application, currently including a test endpoint that responds with "pong" to a "ping" request.

import { Router } from "express";
import usersRouter from "../modules/users/users.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import teamsRouter from "../modules/teams/teams.routes.js";
import githubRouter from "../modules/github/github.routes.js";
const router = Router();

// قبل الـ Auth: خلينا نحط endpoints تجريبية
router.get("/ping", (req, res) => {
  res.json({ ok: true, message: "pong" });
});

router.use("/users", usersRouter);
router.use("/auth", authRoutes);
router.use("/teams", teamsRouter);
router.use("/github", githubRouter);
export default router;
