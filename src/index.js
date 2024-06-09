const express = require("express");
const app = express();
const port = 3000;
const expressHbs = require("express-handlebars");
const { createPagination } = require("express-handlebars-paginate");
const path = require("path");

app.use(express.static(path.dirname(__dirname) + "/public"));

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
      json: function (context) {
        return JSON.stringify(context);
      },
      eq: function (a, b) {
        return a === b;
      },
    },
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

// Read JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => res.redirect("/users"));
app.get("/", (req, res) => {
  res.redirect('/project');
})

app.use("/project", require("./routes/projectRouter"));


// Start app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

