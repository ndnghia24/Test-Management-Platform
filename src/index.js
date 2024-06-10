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

