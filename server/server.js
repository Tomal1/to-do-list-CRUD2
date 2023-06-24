const express = require("express");

const PORT = process.env.PORT || 3001;;

const app = express();

app.get("/", (req, res) => {
    res.json("hello");
  });

app.listen(PORT, () =>{
    console.log(`listning to port ${PORT}`);
});