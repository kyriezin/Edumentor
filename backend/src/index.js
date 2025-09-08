const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("🚀 EduMentor API rodando!"));
app.use("/api", router);

app.listen(3333, () => console.log("✅ Backend em http://localhost:3333"));
