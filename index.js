const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k9m84.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db('doctor_portal').collection('services');
    const bookingCollection = client.db('doctor_portal').collection('bookings');

    app.get('/service', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    /**
           * API Naming convention
           * app.get('/booking') // get all bookings in this collection. or get more than one or by filter
           * app.get('/booking/:id') // get a spacific booking
           * app.get('/booking) // add a new booking
           * app.get('/booking)
           * app.get('/booking)
           */

    app.post('/booking', async(req, res) =>{
      const booking = req.body;
      const query = {treatment: booking.treatment, date: booking.date, patient: booking.patient}
      const exists = await bookingCollection.findOne(query);
      if(exists){
        return res.send({success: false, booking: exists})
      }
      const result = await bookingCollection.insertOne(booking);
      return res.send({success: true, result});
    })

  }
  finally {

  }

}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello From doctor Uncle !')
});

app.listen(port, () => {
  console.log(`Doctors app listening on port ${port}`)
});