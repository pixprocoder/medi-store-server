import app from "./app";
import config from "./config";

app.listen(config.port, () => {
  console.log("is this running", config.database_url);
  console.log(`server is running of port: ${config.port}`);
});
