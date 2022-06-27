import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLSchema, GraphQLID, GraphQLNonNull } from 'graphql';
import Products from '../models/product.js';
import Categories from '../models/category.js';
import Users from '../models/user.js';

const ProductType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		id: { type: GraphQLID},
		name: { type: new GraphQLNonNull(GraphQLString) },
		description: { type: new GraphQLNonNull(GraphQLString) },
		categoryId: {
			type: CategoryType,
			resolve(parent, args){
				return Categories.findOne(parent.categoryId)
			}
		},
		price: { type: new GraphQLNonNull(GraphQLFloat) }
	}),
});

const CategoryType = new GraphQLObjectType({
	name: 'Category',
	fields: () => ({
		id: { type: GraphQLID},
		name: { type: new GraphQLNonNull(GraphQLString)},
	}),
});

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID},
		name: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: new GraphQLNonNull(GraphQLString) },
		is_active: { type: new GraphQLNonNull(GraphQLBoolean) }
	}),
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addProduct: {
			type: ProductType,
			args: {
				name: {type: GraphQLString},
				description: {type: GraphQLString},
				categoryId: {type: GraphQLID},
				price: { type: GraphQLFloat }
			},
			resolve(parent, args){
				const product = new Products({
					name: args.name,
					description: args.description,
					categoryId: args.categoryId,
					price: args.price,
				});
				return product.save();
			},
		},
		addCategory: {
			type: CategoryType,
			args: {
				name: {type: GraphQLString},
			},
			resolve(parent, args){
				const category = new Categories({
					name: args.name,
				});
				return category.save();
			},
		},
		addUser: {
			type: UserType,
			args: {
				name: {type: GraphQLString },
				email: {type: GraphQLString },
				is_active: { type: GraphQLBoolean }
			},
			resolve(parent, args){
				const user = new Users({
					name: args.name,
					email: args.email,
					is_active: args.is_active,
				});
				return user.save();
			},
		},
		
		deleteProduct: {
			type: ProductType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				const doc = Products({_id: args.id});
				doc.deleteOne();
			}
		},
		deleteCategory: {
			type: CategoryType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				const doc = Categories({_id: args.id});
				doc.deleteOne();
			}
		},
		deleteUser: {
			type: UserType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				const doc = Users({_id: args.id});
				doc.deleteOne();
			}
		},
		
		updateProduct: {
			type: ProductType,
			args: {
				id: {type: GraphQLID},
				name: {type: GraphQLString},
				description: {type: GraphQLString},
				categoryId: {type: GraphQLID},
				price: { type: GraphQLFloat }
			},
			resolve(parent, args){
				const doc = Products.findByIdAndUpdate(
					args.id,
					{$set: {name: args.name, description: args.description, categoryId: args.categoryId,  price: args.price }},
					{new: true}
				);
				return doc;

			},
		},
		updateCategory: {
			type: CategoryType,
			args: {
				id: {type: GraphQLID},
				name: {type: GraphQLString},
			},
			resolve(parent, args){
				const doc = Categoriers.findByIdAndUpdate(
					args.id,
					{$set: {name: args.name }},
					{new: true}
				);
				return doc;
			},
		},
		updateUser: {
			type: UserType,
			args: {
				id: {type: GraphQLID},
				name: {type: GraphQLString},
				email: {type: GraphQLString},
				is_active: {type: GraphQLBoolean},
			},
			resolve(parent, args){
				const doc = Users.findByIdAndUpdate(
					args.id,
					{$set: {name: args.name, email: args.email, is_active: args.is_active }},
					{new: true}
				);
				return doc;
			},
		},

	},
})

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		product: {
			type: ProductType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				return Products.findOne(args.id);
			}
		},
		category: {
			type: CategoryType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				return Categories.findOne(args.id);
			}
		},
		user: {
			type: UserType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				return Users.findOne(args.id);
			}
		},

		products: {
			type: new GraphQLList(ProductType),
			resolve(parent, args){
				return Products.find({});
			}
		},
		categories: {
			type: new GraphQLList(CategoryType),
			resolve(parent, args){
				return Categories.find({});
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args){
				return Users.find({});
			}
		},
	}
});

export default new GraphQLSchema({
	query: Query,
	mutation: Mutation,
})