import express from "express";
import cors from "cors";
import users from "./routes/users";
import quiz from "./routes/quiz";

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/quiz", quiz);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
