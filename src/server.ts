import app from "./app.js";
import config from "./config/index.js";

app.listen(config.port, () => {
  console.log("is this running", config.database_url);
  console.log(`server is running of port: ${config.port}`);
});
