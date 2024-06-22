const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 3000;
const expressHbs = require("express-handlebars");
const { createPagination }  = require("express-handlebars-paginate");
const projectRouter = require("./routes/projectRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const homeRouter = require("./routes/homeRouter");

dotenv.config();
app.use(express.static(path.dirname(__dirname) + "/public"));

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up view engine
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "project-layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      // Helper 'block'
      block: function (name, options) {
        if (!this._blocks) this._blocks = {};
        this._blocks[name] = options.fn(this);
        return null;
      },
      // Helper 'content'
      content: function (name) {
        return (this._blocks && this._blocks[name]) ? this._blocks[name] : null;
      },
      // Paginate
      paginate: createPagination,
      json: function (context) {
        return JSON.stringify(context);
      },
      eq: function (a, b) {
        return a === b;
      },
      formatClassName: function (name) {
        return name.replace(/ /g, "-").toLowerCase();
      },
      // Helper 'priority color'
      priorityColor: function(priority) {
        switch(priority) {
            case 'High':
                return 'color-red';
            case 'Medium':
                return 'color-deep-sea';
            case 'Low':
                return 'color-deep-green';
            default:
                return 'color-deep-violet';
        }
      },
      // Helper 'status color'
      statusColor: function(status) {
        switch(status) {
            case 'New':
                return 'color-green';
            case 'Open':
                return 'color-green';
            case 'Assigned':
                return 'color-blue';
            case 'Resolved':
                return 'color-deep-sea';
            case 'Retest':
                return 'color-brown';
            case 'Verified':
                return 'color-sea';
            case 'Reopened':
                return 'color-orange';
            case 'Closed':
                return 'color-red';
            case 'Deferred':
                return 'color-brown';
            case 'Rejected':
                return 'color-red';
            case 'Duplicate':
                return 'color-brown';
            default:
                return 'color-deep-violet';
        }
      },
      //helper to convert object to json
      json: function(context) {
        return JSON.stringify(context);
      },
      //helper for compare
      eq: function(a, b) {
        return a === b;
      },
      //helper for format datetime to DD/MM/YYYY
      formatDate: function(date) {
        return date.toLocaleDateString();
      },
    },
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");


app.get("/login", (req, res) => {
  res.render("login", { layout: false });
});


app.get("/", (req, res) => {
  res.redirect('/dashboard');
})

app.use("/home", homeRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/project", projectRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));