import express from "express";
import addWorkflow from "./routes/add-workflow";
import signUp from "./routes/signup";
import login from "./routes/login";
import cors from "cors";
import addCrdentails from "./routes/add-credentials";
import getCredentials from "./routes/get-credentials";
import executeWorflow from "./routes/execute-workflow";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/api/v0", signUp);
app.use("/api/v0", login);
app.use("/api/v0", addWorkflow);
app.use("/api/v0", addCrdentails);
app.use("/api/v0", getCredentials);
app.use("/api/v0", executeWorflow);

app.listen(PORT, () => {
  console.log(`Server is listing in PORT ${PORT}`);
});
