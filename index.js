const express = require('express');
const path = require('path');

const app = express();

const HOST = process.env.HOST || 'localhost'; // Replace 'localhost' with your domain in the .env file or directly
const PORT = process.env.PORT || 3000;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cruzjonathanx:Uussd0vtusuZ.@cluster0.mxosx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(scores) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await insertScore(client, scores)
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


async function createUserInitial(user) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await createUser(client, user)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


async function insertScore(client, studentScore){
  const result = await client.db("student_scores").collection("calculator_practicum").insertOne(studentScore);

  console.log(`result is with id : ${result.insertedId}`)
}

async function createUser(client, user){
  const result = await client.db("hsct_io").collection("auth_user").insertOne(user);

  console.log(`result is with id : ${result.insertedId}`)
}

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'hsct-io-designs')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// Default route for the server
app.post('/submit-score', (req, res) => {
  console.log(res)
  const { first_name, last_name, score } = req.body;

  // Validate the input
  if (!first_name || !last_name || typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid input data' });
  }

  // Simulating saving data (e.g., to a database)
  const newData = { first_name : first_name, last_name : last_name, score : score };
  run(newData).catch(console.dir);
  console.log('Data received:', newData);

  // Responding with a success message
  res.status(201).json({
      message: 'Data submitted successfully!',
      data: newData,
  });
});

app.post('/create-user', (req, res) => {
  console.log(res)
  const { first_name, last_name, dob, school_email, password } = req.body;

  // Validate the input
  if (!first_name || !last_name || !dob || !school_email || !password) {
      return res.status(400).json({ error: 'Invalid input data' });
  }

  // Simulating saving data (e.g., to a database)
  const newData = { first_name : first_name, last_name : last_name, dob : dob, school_email : school_email, password : password };
  createUserInitial(newData).catch(console.dir);
  console.log('Data received:', newData);

  // Responding with a success message
  res.status(201).json({
      message: 'Data submitted successfully!',
      data: newData,
  });
});


app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'hsct-io-designs','pages', 'contact-us.html'));
  });

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'hsct-io-designs','pages', 'login-page.html'));
  });

  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'hsct-io-designs','pages', 'register-page.html'));
  });

  app.get('/grader', (req, res) => {
    res.sendFile(path.join(__dirname, 'hsct-io-designs', 'pages', 'grader.html'));
  });


  
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'hsct-io-designs','pages', 'error.html'));
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });