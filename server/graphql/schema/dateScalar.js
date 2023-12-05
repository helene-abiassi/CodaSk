import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",

  // ? Convert value in DB to a JSON file to be passed to frontend
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime();
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object'");
  },

  // ? Converts received data in JSON to pass it back to DB
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value);
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },

  // ? When incoming query is a hardcoded string value
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export default dateScalar;
