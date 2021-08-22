const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const currentDay = require(__dirname + '/module.js'); //My module

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded ({extended: true}));
app.use(express.static('public'));

//DATABASE mongoBD>mongoose
//Database connection
mongoose.connect('mongodb+srv://admin-mahadi:mongodb123@cluster0.tny2c.mongodb.net/atodolistDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const itemsSchema = {
  name: String
};

//mongoose model ('item' singular form and its the collection name of the database)
const Item = mongoose.model('item', itemsSchema);

const defaultItem = [new Item ({name: 'Write a Note and Click +'})];


app.get('/', (req, res) => {
  const _Day = currentDay.current_Day ();

  Item.find({}, function (err, foundItems){

    if (foundItems.length === 0) {
      Item.create(defaultItem, function (err){
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully created!');
        }
      });
      res.redirect ('/');
    } else {
      res.render('list', {kindOfDay: _Day, newListItems: foundItems});
    }
  });
});



app.post('/', (req, res) => {
  const itemName =  req.body.newItems;
  const item = new Item ({name: itemName});
  item.save();
  res.redirect ('/');
});


app.post ('/delete', function (req, res) {
  const checkedId = req.body.checkbox;
  Item.findByIdAndRemove(checkedId, function (err){
    if(!err) {
      console.log('success');
    }
    res.redirect ('/');
  });


});


app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening at http://localhost: 3000')
});
