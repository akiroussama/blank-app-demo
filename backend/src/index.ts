import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const SECRET = "VIEL_ARE_THE_BEST";
const users = [
	{
		id: 1,
		username: "admin",
		password: bcrypt.hashSync("admin", 10),
	},
];
// add graphql login mutation for jwt token
const typeDefs = `#graphql
  type User {
    id: ID
	username: String
	password: String
  }
	    # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		users: [User]
		books: [Book]
	}
	type Mutation {
		login(username: String!, password: String!): String
	}
`;

const books = [
	{
		id: 1,
		title: "The Awakening",
		author: "Kate Chopin",
	},
	{
		id: 2,
		title: "City of Glass",
		author: "Paul Auster",
	},
	{
		id: 3,
		title: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
	},
	// add other books data here
];

const resolvers = {
	Query: {
		users: () => users,
		books: () => books,
	},
	Mutation: {
		login: async (parent, { username, password }, context, info) => {
			const user = users.find((u) => u.username === username);
			if (!user) {
				throw new Error("User not found");
			}
			const valid = await bcrypt.compare(password, user.password);
			if (!valid) {
				throw new Error("Incorrect password");
			}
			return jwt.sign({ userId: user.id }, SECRET);
		},
	},
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
