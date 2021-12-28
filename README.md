# GraphQl para dummies

¿Qué es graphQl? 
Es un lenguaje de consultas y manipulación de datos para APIs. Fue desarrollado por Facebook en 2015 y liberado publicamente en 2015. Es compatible con muchos lenguajes de programación.

¿Cuál es el beneficio de graphQl?
Te permite modelar las consultas a las APIs de manera que la data recibida sea "exactly what they need and nothing more" (https://graphql.org/). De esta manera evitamos tanto el "over fetching" como el "under fetching".

## Apollo server 
(https://www.apollographql.com/docs/apollo-server/)
Apollo Server es un servidor GraphQL que ayuda a un cliente GraphQL a conectarse y obtener datos. Apollo Server se ejecuta en Node.js. (https://ichi.pro/es/por-que-consideramos-apollo-para-nuestra-pila-graphql-92502833994724)

### GraphQl playground
GraphQL Playground is a graphical, interactive, in-browser GraphQL IDE, created by Prisma and based on GraphiQL. In development, Apollo Server enables GraphQL Playground on the same URL as the GraphQL server itself (e.g. http://localhost:4000/graphql ) and automatically serves the GUI to web browsers. (apollographql.com/docs/apollo-server/v2/testing/graphql-playground/).

Desde el playground con "crtl + space bar" podemos ver todos los resolvers disponibles para realizar una consulta.

Para diferentes maneras de realizar consultas ver index.js