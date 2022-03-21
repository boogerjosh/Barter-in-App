const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const url = "http://localhost:3000/users";
const redis = new Redis({
  port: 10199,
  host: "redis-10199.c98.us-east-1-4.ec2.cloud.redislabs.com",
  password: "8e7Ny2t28Zl9oYbsDXCpjwAmhFzuguxq",
});
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
const { finished } = require('stream/promises');

const typeDefs = gql`
scalar Upload
  type Item {
    id: ID
    title: String
    category: String
    description: String
    brand: String
    yearOfPurchase: String
    statusPost: String
    statusBarter: String
    userId: ID
    createdAt: String
    updatedAt: String
  }
  type status {
    status: String
    message: String
  }
  type RoomBarter {
    id: ID
    user1: ID
    user2: ID
    item1: ID
    item2: ID
    status1: Boolean
    status2: Boolean
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Query {
    getItems: [Item]
    getItemsHome: [Item]
    getItem(itemId: ID): Item
    getMyAds(access_token: String): [Item]
    getDataForBarter(access_token: String): [Item]
    getRoomBarter(access_token: String): [RoomBarter]
  }
  type Mutation {
    deleteItem(itemId: ID, access_token: String): status
    postRoomBarter(
      access_token: String
      user2: ID
      item1: ID
      item2: ID
    ): RoomBarter
    patchRoomBarter(access_token: String, roomId: ID): status
    singleUpload(file: Upload!): File
  }
`;

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    getItems: async () => {
      try {
        const cache = await redis.get("items");
        if (cache) return JSON.parse(cache);
        const { data } = await axios(`${url}/items`);
        await redis.set("items", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getItemsHome: async () => {
      try {
        const { data } = await axios(`${url}/items/homes`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getItem: async (_, args) => {
      try {
        const { data } = await axios(`${url}/items/${args.itemId}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getMyAds: async (_, args) => {
      try {
        const { data } = await axios(`${url}/myads`, {
          headers: {
            access_token: args.access_token,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getRoomBarter: async (_, args) => {
        try {
          const { data } = await axios(`${url}/roomBarter`, {
            headers: {
              access_token: args.access_token,
            },
          });
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    getDataForBarter: async (_, args) => {
      try {
        const { data } = await axios(`${url}/items-barters`, {
          headers: {
            access_token: args.access_token,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    singleUpload: async (parent, { args, file }) => {
      console.log(args)
      const { createReadStream, filename, mimetype, encoding } = await file;
      const base64 = createReadStream({ encoding: 'base64' });
      // console.log(base64)
      return { filename, mimetype, encoding };
    },
    deleteItem: async (_, args) => {
      try {
        const { data } = await axios({
          url: `${url}/items/${args.itemId}`,
          method: "delete",
          headers: {
            access_token: args.access_token,
          },
        });
        await redis.del("items");
        return { status: "success" };
      } catch (error) {
        console.log(error.response.data);
        return {
          status: "Fail to delete",
          message: error.response.data.message,
        };
      }
    },
    postRoomBarter: async (_, args) => {
      try {
        const { data } = await axios({
          url: `${url}/roomBarter`,
          method: "post",
          headers: {
            access_token: args.access_token,
          },
          data: { user2: args.user2, item1: args.item1, item2: args.item2 },
        });
        console.log(data);
        return data;
      } catch (error) {
        console.log(error.response.data);
        return {
          status: "Fail to create",
          message: error.response.data.message,
        };
      }
    },
    patchRoomBarter: async (_, args) => {
      try {
        const { data } = await axios({
          url: `${url}/roomBarter/${args.roomId}`,
          method: "patch",
          headers: {
            access_token: args.access_token,
          },
        });
        console.log(data);
        return { status: "success" };
      } catch (error) {
        console.log(error.response.data);
        return {
          status: "Fail to patch",
          message: error.response.data.message,
        };
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
