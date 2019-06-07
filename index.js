const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const graphqlHTTP = require('koa-graphql');
const MyGraphQLSchema = require('./graphqlHTTP/schema');

const app = new Koa();
const router = new Router();

router.all('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.use(router.routes()).use(router.allowedMethods());

console.log("listnen to 4000");
app.listen(4000);
