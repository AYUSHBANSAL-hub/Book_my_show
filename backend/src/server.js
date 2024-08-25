const app = require("./index");
const connect = require("./config/db");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.listen(6000, async () => {
  await connect();
  console.log("Listening on the port 6000");
});
