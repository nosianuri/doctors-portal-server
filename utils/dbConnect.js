function dbConnect() {
    // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k9m84.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    console.log("DB connected!");
}

module.exports = dbConnect;