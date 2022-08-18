import express from 'express';
import { graphqlHTTP } from 'express-graphql';//).graphqlHTTP;

import jsonGraphqlExpress from 'json-graphql-server';//).graphqlHTTP;
//import schema from '../service/service.js';

const app = express();
const port = 3000;

const data ={
	users: [
		{
			id: 0,
			name: "fd",
			age: 20
		},
		{
			id: 1,
			name: "gfdf",
			age: 22
		},
		{
			id: 2,
			name: "dfhdt",
			age: 20
		},
	]
}
app.use('/graphql', jsonGraphqlExpress(data));
app.listen(port, () => {
	console.log('start')
})

/*mongoose.connection.on('open', err => {
	if (err) {
		console.log(err);
	} else {
		console.log('Graphql server started at localhost '+ port);
		app.listen(port);
	}
})*/
