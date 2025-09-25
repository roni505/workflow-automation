import express from "express";
import addWorkflow from "./routes/add-workflow";
import signUp from "./routes/signup";
import login from "./routes/login";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/api/v0", signUp);
app.use("/api/v0", login);
app.use("/api/v0", addWorkflow);

app.listen(PORT, () => {
  console.log(`Server is listing in PORT ${PORT}`);
});
