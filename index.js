import { ApolloServer, gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    type Person {
        name: String!
        phone: String!
        street: String!
        id: String
        address: String!
        check: String!
    }
    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
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
        phone: "5345",
        street: "Buenos Aires",
        city: "Rosario",
        // id: "53534"
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
    Person: {
        address: (root) => `${root.street}, ${root.city}`,
        check: () => "Esteban"
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

