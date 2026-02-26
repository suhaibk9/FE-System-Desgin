const typeDefs = `
  type Book {
    id: String!
    title: String!
    publishedYear: Int
    author:  [Author]!
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
    book(id: String): Book
    author(id: String): Author
    booksByAuthor(authorId: String): [Book]
    authorsByBook(bookId: String): [Author]
  }

  type Mutation {
    addBook(title: String, publishedYear: String, author: String): Book
    addAuthor(name: String): Author
  }
`;
export { typeDefs };
