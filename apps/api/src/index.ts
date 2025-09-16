import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("api/v0");
app.use("api/v0");
app.use("api/v0");

app.listen(PORT, () => {
  console.log(`Server is listing in PORT ${PORT}`);
});
