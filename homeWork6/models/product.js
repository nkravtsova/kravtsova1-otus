import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	categoryId: { type: ObjectId, required: true },
	price: { 
		type: Number,
		requred: true,
		min: 0
	},
});

export default mongoose.model('Product', productSchema)
