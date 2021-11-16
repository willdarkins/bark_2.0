const express = require('express');
const exphbs = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



app.get('/', function (req, res) {
    res.render('main');
});



app.listen(PORT, () =>{
    console.log(`API server now on port ${PORT}!`);
});