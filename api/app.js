const express = require('express');
const app = express();
const mongoose = require('mongoose');
const QRCode = require('qrcode');

const port = 5432;


mongoose.connect('mongodb://localhost/shoefy',{useNewUrlParser: true, useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: 'Password is required'
  }
});
const shoeSchema = new mongoose.Schema({
  shoeSize: Number,
  row: Number,
  column: Number,
  currentlyPresent: { type:Boolean, default: true }
})
const bookingSchema = new mongoose.Schema({
  email: { 
    type: String,
    trim: true,
    lowercase: true,
  },
  shoeSizes: [Number],
  startTime: Number,
  endTime: Number,
  qr: String
});
  
const Shoe = mongoose.model('Shoe',shoeSchema);
const Booking = mongoose.model('Booking',bookingSchema);

const responses = { 
  email: {
    status: 400,
    description: 'invalid email address'
  },
  server: {
    status: 500,
    description: 'api server machine broke'
  },
  notFound: {
    status: 404,
    description: 'not found'
  },
  ok: {
    status: 200,
    description: 'request successful'
  }
}

app.use(function(req,res,next){
  res.contentType='application/json';
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  resp={ 'nosey-parker': true };
  return res.json(resp);
});

app.post('/booking', (req,res) => {
  var e = req.body.email;
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e))){
    res.status(400);
    res.json(errors.mail);
  }

  var b = new Booking({
    email: e, 
    shoeSizes : req.body.shoeSizes,
    startTime : req.body.startTime,
    endTime : req.body.endTime
  })
  b.save(err=>{
      if(err){
        res.status(500);
        res.json(err);
      } else {
        console.log(b._id);
        QRCode.toString(b._id.toString(), {type:'svg'},(e,u)=>{
        b.qr = u;
        console.log(u);
        b.save(err=>{
          if(err){
            res.status(500);
            res.json(err);
          } else {
            res.status(200);
            res.json(b);
          }
        });
      });
    }
    });
});

app.post('/shoe',(req,res)=>{
  var s = new Shoe({
    shoeSize : req.body.shoeSize,
    row : req.body.row,
    column:req.body.column
  });
  s.save(err=>{
    if(err){
      res.status(500);
      res.json(responses.server);
    } else {
      res.status(200);
      res.json(responses.ok);
    }

  });
});

app.delete('/shoe/:row/:column',(req,res)=>{
  Shoe.findOneAndDelete({row:req.params.row,column:req.params.column},err=>{
    if(err){
      res.status(404);
      res.json(responses.notFound);
    } else {
      res.status(200);
      res.json(responses.ok);
    }
  });
});

app.get('/shoe/:row/:column',(req,res)=>{
  Shoe.findOne({row: req.params.row, column: req.params.column},(err,shoe)=>{
    if(shoe){
      res.status(200);
      res.json(shoe);
    } else {
      res.status(404);
      res.json(responses.notFound);
    }
  });
});

app.get('/shoes/:size',(req,res)=>{
  Shoe.find({shoeSize:req.params.size},(err,shoes)=>{
    if(err){
      res.status(500);
      res.json(responses.sever);
    } else if (shoes.length==0){
      res.status(404);
      res.json(responses.notFound);
    } else {
      res.status(200);
      res.json(shoes); 
    }
  });
});

app.patch('/shoe/:row/:column',(req,res)=>{
  s = Shoe.findOne({row:req.params.row,column:req.params.column},err=>{
    if(err){
      res.status(404);
      res.json(responses.server);
    }
  });
  if(!s){
    res.status(404);
    res.json(responses.notFound);
  }
  if (!!req.body.column && !!req.body.row){
    s.column = req.body.column;
    s.row = req.body.row;
  }
  if(req.body.currentlyPresent){
    s.currentlyPresent = req.body.currentlyPresent;
  };
  s.save(err=>{
    if(err){
      res.status(500);
      res.json(responses.server);
    } else { 
      res.status(200);
      res.json(responses.ok);
    } 

  });
});
app.patch('/booking/:id',(req,res)=>{
  Booking.findById(req.params.id,(err,b)=>{
    if(err){
      res.status(500);
      res.json(responses.server);
    } else if(!result){
      res.status(404);
      res.json(responses.notFound);
    } else {
      if(req.body.email)
        b.email=req.body.email;
      if(req.body.shoeSizes)
        b.shoeSizes=req.body.shoeSizes;
      if(req.body.startTime)
        b.startTime=req.body.startTime;
      if(req.body.endTime)
        b.endTime=req.body.endTime;
      b.save(err=>{
        if(err){
          res.status(500);
          res.json(responses.server);
        } else {
          res.status(200);
          res.json(responses.ok);
        }
      });

    }
  })
});
app.delete('/booking/:id',(req,res)=>{
  Booking.findByIdAndDelete(req.params.id,(err,del)=>{
    if(err){  
      res.status(500);
      res.json(responses.server);
    } else if (!del){
      res.status(404);
      res.json(responses.notFound);
    } else {           
      res.status(200);
      res.json(responses.ok);
    }                  
  });                  
});

app.get('/bookings/:email',(req,res)=>{
  Booking.find({email:req.params.email},(err,b)=>{
    if(b.length>0){
      res.status(200);
      res.json(b);
    } else {
      res.status(404);
      res.json(responses.notFound);
    }
  });
});

app.get('/booking/:id',(req,res)=>{
  Booking.findById(req.params.id,(err,b)=>{
    if(!b){
      res.status(404);
      res.json(responses.notFound);
    } else{
      res.status(200);
      res.json(b);
    }
  });
});

app.get('/shoe/:shoeSize/available/:startTime/:endTime',async (req,res)=>{
  nAvailable = await Shoe.countDocuments({shoeSize:req.params.shoeSize});
  Booking.find({
    $or: [
      { 
          $and: [
            { startTime: {$gte : req.params.startTime} },
            { startTime: {$lte : req.params.endTime} }
          ]
        }, 
      { 
          $and: [
            { endTime: {$gte : req.params.startTime} },
            { endTime: { $lte : req.params.endTime} }
          ]
        }
    ]
  }, (err,bookings)=>{
    if(err){
      console.log(err);
      console.log('hi');
      res.status(500);
      res.json(err);
    }
    bookings.forEach(function(b){
      nAvailable -= b.shoeSizes.filter(s=>s==req.params.shoeSize).length;
    });
    res.status(200);
    res.json({ status: 200, availableShoes: nAvailable});
  }); 
  
      
});

  


app.listen(port, ()=>
  console.log(`API listening on port ${port}!`),
);

