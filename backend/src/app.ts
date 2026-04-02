import express from "express";
import profileRouter from "./features/profile/profile.router";
import { validateAuthorization } from "./middleware/auth.middleware";
import appRouter from "./features/apps/apps.router";
import appUsersRouter from "./features/app_users/app-users.router";
import channelRouter from "./features/channels/channel.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/profile", validateAuthorization, profileRouter);
app.use("/api/apps", validateAuthorization, appRouter);
app.use("/api/app-users", validateAuthorization, appUsersRouter);
app.use("/api/channels", validateAuthorization, channelRouter);

export default app;
