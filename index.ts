import express, { Express } from "express";
import dotenv from "dotenv";
import { connect as connectDatabase } from "./config/database";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import path from "path";
import bodyParser from "body-parser";
import methodOverride from "method-override";
dotenv.config();
connectDatabase();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;
app.use(methodOverride("_method"));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));
// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE
app.use(express.static(`${__dirname}/public`));
// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// Routes
clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
