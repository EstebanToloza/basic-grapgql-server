import { ApolloServer, gql } from 'apollo-server';
import {v1 as uuid} from "uuid";

const persons = [ //dummy data
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

// Un esquema es una colección de definiciones de tipos (de ahí "typeDefs") que juntas definen 
// la "forma" de las consultas que se ejecutan a tu información.
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
//en el schema no sólo definimos los datos que vamos a consultar, también se definen las 
// peticiones que podemos realizar (type Query, Mutation, etc)

const resolvers = { 
    // Los resolvers son funciones que se ejecutan cada vez que se hace una petición, 
    // y se conectan al Schema para entender la estructura de datos y luego se conectan a la fuente de datos 
    // para poder devolverle al cliente los datos que está solicitando. 
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson:(root, args) => { 
            // acá recibimos dos parámetros para nuestra petición, "root" y "args" (de "argumentos", 
            // los argumenos definidos en el schema)
            const {name} = args; //en args tenemos "name, phone, street, city"
            console.log(root)
            return persons.find(person => person.name === name)
        },
    },
    Mutation: {
        addPerson: (root, args) => {
            const person = {...args, id: uuid()}
            persons.push(person)
            return person
        }
    },
    Person: { 
        // resolver más complejo para el address en Person. La forma de "consultar" con la información
        // no necesariamente se verá igual a como se realiza la consulta. GraphQl nos permite "modelar" 
        // cómo traemos la data 
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
  console.log(`🚀  Server corriendo en ${url}`);
});

