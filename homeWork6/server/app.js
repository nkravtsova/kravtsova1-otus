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

mongoose.connection.on('open', err => {
	if (err) {
		console.log(err);
	} else {
		console.log('Graphql server started at localhost '+ port);
		app.listen(port);
	}
})
