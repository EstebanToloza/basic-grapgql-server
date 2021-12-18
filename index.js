import { ApolloServer, gql } from 'apollo-server';
import {v1 as uuid} from "uuid";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

    type Address {
        street: String!
        city: String!
    }
    type Person {
        name: String!
        phone: String
        id: ID!
        address: Address!
    }
    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
    type Mutation{
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
    }
`;


const persons = [
    {
        name: "Esteban",
        phone: "561582652",
        street: "Santa Fe",
        city: "Rosario",
        id: "15165"
    },
    {
        name: "Juan",
        street: "Buenos Aires",
        city: "Rosario",
        id: "53534"
    },
    {
        name: "Mateo",
        phone: "54534565",
        street: "Salta",
        city: "Rosario",
        id: "156152"
    }
]

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson:(root, args) => {
            const {name} = args;
            return persons.find(person => person.name === name)
        }
    },
    Mutation: {
        addPerson: (root, args) => {
            const person = {...args, id: uuid()}
            persons.push(person)
            return person
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        },
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

