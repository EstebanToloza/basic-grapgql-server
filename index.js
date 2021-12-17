import {gql} from 'apollo-server';

const personas = [
    {
        name: "Esteban",
        phone: "561582652",
        street: "Rosario",
        id: "15165"
    },
    {
        name: "Juan",
        phone: "5345",
        street: "Buenos Aires",
        id: "53534"
    },
    {
        name: "Mateo",
        phone: "54534565",
        street: "Salta",
        id: "156152"
    }
]

const typeDefs = gql`
    type Person {
        name: String!
        phone: String!
        street: String!
        id: String!
    }
`