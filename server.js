const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(__dirname + '/dist/user-dashboard-frontend'));
app.listen(process.env.PORT || 8080);
//PathLocationStrategy
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/dist/user-dashboard-frontend/index.html'));

});
console.log("console listening!!!", process.env.PORT || 8080);
