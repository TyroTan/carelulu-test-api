const {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = require("graphql");

const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} = require("graphql-iso-date");

const { Note, sequelize } = require("../db/models");

const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    id: { type: GraphQLString },
    note: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime }
  })
});

const ResponseType = new GraphQLObjectType({
  name: "Response",
  fields: () => ({
    success: { type: GraphQLBoolean }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    notes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(NoteType))),
      async resolve() {
        return Note.findAll({
          order: sequelize.literal('"createdAt" DESC')
        });
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addNote: {
      type: NoteType,
      args: {
        note: { type: GraphQLString }
      },
      async resolve(parentVal, { note }) {
        const u = await Note.create({
          note
        });

        return u;
      }
    },
    removeNote: {
      type: ResponseType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parentVal, { id }) {
        const n = await Note.destroy({
          where: { id: id }
        });

        return { success: !!n };
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation
});

module.exports = schema;
