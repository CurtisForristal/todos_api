var express = require("express");
    app = express();
    port = process.env.PORT || 27017;

var todoRoutes = require("./routes/todos");



app.get("/", function(req, res) {
    res.send("HI THERE FROM EXPRESS!!!");
});



app.use("/api/todos", todoRoutes);

// START SERVER
app.listen(port, function() {
    console.log("Server Started");
});