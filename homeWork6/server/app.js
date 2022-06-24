import express from 'express';
import { graphqlHTTP } from 'express-graphql';//).graphqlHTTP;
import schema from '../service/service.js';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/eCommerceShop', {useNewUrlParser: true, useUnifiedTopology: true });
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(err));
dbConnection.once('open', () => console.log('connect'));

app.listen(port, err => {
	err? console.log(er): console.log('Graphql server started at localhost '+ port);
});
