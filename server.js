const dotenv = require('dotenv');
const mongoose = require('mongoose');


process.on('uncaughtException', err=>{console.log(err.name, err.message);
  console.log(err.name, err.messge)
  console.log('uncaught Exception! shuting down..')
  process.exit(1);
  });


dotenv.config({path:'./config.env'})
const app = require('./app');
//Databse connection
const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: 'true',
  useCreateIndex: 'true',
  useFileAndModify: 'false'
}).then(()=>{console.log("DB connection successfull!!")});


// creating model//

// const tourSchema = new mongoose.Schema({
//   name:{ 
//     type: String,
//     required: [true, 'The name must not be empty'],
//     unique: true
//   },
//   rating: {
//     type: Number,
//     default: 4.5
//   },
//   price:{
//     type: String,
//     required: [true, 'The price must not be empty']
//   }
// })
// const Tour = mongoose.model('Tour', tourSchema)


/* creating object document from model*/

// const testTour = new Tour({
//   name: "The Forest talk",
//   rating:4.7,
//   price: 497
// });

// testTour.save().then(doc=>{
//   console.log(doc)
// }).catch(err=>{
//   console.log('ERROR',err)
// });

// console.log(process.env)

//server creation
const port = 8000;
app.listen(port, ()=>{
    console.log("the app is running at port 8000");
})


process.on('unhandledRejection', err=>{
  console.log(err.name, err.message);
  console.log('unhandled Rejection! shuting down..')
  server.close(()=>{process.exit(1);
  });
});

//uncaught exception 
// console.log(x)


