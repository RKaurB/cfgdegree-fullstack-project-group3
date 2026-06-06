//LgKQusAttpTgVzkV
//omanoma14_db_user


const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://omanoma14_db_user:LgKQusAttpTgVzkV@users.ep4bsqa.mongodb.net/?appName=Users";
class MongodbDatabase{
    #client;
    async constructor(user,password){
       // Replace the uri string with your connection string
      const uri = `mongodb+srv://${user}:${password}@users.ep4bsqa.mongodb.net/?appName=Users`;
      const client = new MongoClient(uri);
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Queries for a movie that has a title value of 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    await client.close();
  }
    }
}

