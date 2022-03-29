const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// const mediaMutations = {
//   createMedia: (_root, { input }) => {
//     const id = require('crypto').randomBytes(10).toString('hex');
//     const newMedia = { ...input };
//     newMedia.id = id;
//     items.mediaItem.push(newMedia);
//     return newMedia;
//   },
//   updateMedia: (_root, { id, input }) => {
//     const index = items.mediaItem.findIndex((p) => p.id === id);
//     const oldMedia = items.mediaItem[index];
//     const newMedia = { ...oldMedia, ...input };
//     items.mediaItem[index] = newMedia;
//     return newMedia;
//   },
//   deleteMedia: (_root, { id }) => {
//     const index = items.mediaItem.findIndex((p) => p.id === id);
//     items.mediaItem.splice(index, 1);
//     return index;
//   },
// };

// const mediaFields = `
//   title: String!
//   price: Int!
//   pictureUrl: String
//   accessUrl: String
//   purchased: Boolean
// `;

// const mediaTypes = `
//   type MediaItem {
//     _id: ID,
//     ${mediaFields}
//   }
//   input MediaInput {
//     ${mediaFields}
//   }
// `;

// const typeDefs = gql`
//   ${mediaTypes}

//   schema {
//     query: QueryRoot
//   }

//   # type MediaItem {
//   #   id: ID!
//   #   title: String!
//   #   price: Int!
//   #   pictureUrl: String
//   #   accessUrl: String
//   #   purchased: Boolean
//   # }
//   type QueryRoot {
//     items: [MediaItem!]!
//   }
//   type Mutation {
//     createmedia(input: MediaInput): MediaItem
//     updatemedia(id: ID, input: MediaInput): MediaItem
//     deletemedia(id: ID): Int
//   }
// `;

// const items = {
//   mediaItem: [
//     {
//       id: 'F2TDEZ5Dcg17VZ3BnehTHFuDMC3DZdKXqQeu25ispuQH',
//       title: 'media 1',
//       price: 20000000,
//       pictureUrl: null,
//       accessUrl: '/play/F2TDEZ5Dcg17VZ3BnehTHFuDMC3DZdKXqQeu25ispuQH',
//       purchased: null,
//     },
//     {
//       id: '3uNtP9qos8ZrdiiokEGXVjPuXBKKA2hzL1bVwa6WpcDW',
//       title: 'media 0',
//       price: 20000000,
//       pictureUrl: null,
//       accessUrl: '/play/3uNtP9qos8ZrdiiokEGXVjPuXBKKA2hzL1bVwa6WpcDW',
//       purchased: null,
//     },
//     {
//       id: 'CF6jWibpzfyPy3xDxqzSxokBotzMjeKg76xsoftwYbjM',
//       title: 'media 2',
//       price: 20000000,
//       pictureUrl: null,
//       accessUrl: '/play/CF6jWibpzfyPy3xDxqzSxokBotzMjeKg76xsoftwYbjM',
//       purchased: null,
//     },
//   ],
// };

// // Resolvers define the technique for fetching the types defined in the
// // schema. This resolver retrieves books from the "books" array above.
// const resolvers = {
//   QueryRoot: {
//     items: () => items,
//   },
//   Mutation: {
//     ...mediaMutations,
//   },
// };

const data = {
  nfts: [
    {
      _id: 'sad87da79',
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '01/01/2016',
    },
    {
      _id: 'da789ad1',
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013',
    },
    {
      _id: 'sadcxv9',
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011',
    },
  ],
};

const nftQueries = {
  nft: (_root, { id }) => {
    const nft = data.nfts.find((nft) => {
      return nft._id === id;
    });
    return nft;
  },
  nfts: () => {
    return data.nfts;
  },
};

const nftMutations = {
  createNft: (_root, { input }) => {
    const _id = require('crypto').randomBytes(10).toString('hex');
    const newNft = { ...input };
    newNft._id = _id;
    data.nfts.push(newNft);
    return newNft;
  },
  updateNft: (_root, { id, input }) => {
    const index = data.nfts.findIndex((p) => p._id === id);
    const oldNft = data.nfts[index];
    const newNft = { ...oldNft, ...input };
    data.nfts[index] = newNft;
    return newNft;
  },
  deleteNft: (_root, { id }) => {
    const index = data.nfts.findIndex((p) => p._id === id);
    data.nfts.splice(index, 1);
    return index;
  },
};

const nftFields = `
  title: String
  company: String
  companyWebsite: String
  location: String
  jobTitle: String
  description: String
  startDate: String
  endDate: String
`;

const nftTypes = `type Nft {
    _id: ID,
    ${nftFields}
  }
  input NftInput {
    ${nftFields}
  }
`;

const typeDefs = gql`
  ${nftTypes}
  type Query {
    hello: String
    nft(id: ID): Nft
    nfts: [Nft]
  }
  type Mutation {
    createNft(input: NftInput): Nft
    updateNft(id: ID, input: NftInput): Nft
    deleteNft(id: ID): Int
  }
`;

const resolvers = {
  Query: {
    ...nftQueries,
  },
  Mutation: { ...nftMutations },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
