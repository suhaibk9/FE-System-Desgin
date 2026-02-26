let authors = [
  { id: "1", name: "J.K. Rowling" },
  { id: "2", name: "George R.R. Martin" },
];

let books = [
  {
    id: "101",
    title: "Harry Potter and the Sorcerer's Stone",
    publishedYear: 1997,
    authorIds: ["1"],
  },
  {
    id: "102",
    title: "A Game of Thrones",
    publishedYear: 1996,
    authorIds: ["2"],
  },
];

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
    book: (_, { id }) => books.find((book) => book.id === id),
    author: (_, { id }) => authors.find((author) => author.id === id),
    booksByAuthor: (_, { authorId }) =>
      books.filter((book) => book.authorIds.includes(authorId)),
    authorsByBook: (_, { bookId }) => {
      const book = books.find((b) => b.id === bookId);
      if (book) {
        return authors.filter((a) => book.authorIds.includes(a.id));
      }
      return [];
    },
  },

  Mutation: {
    addBook: (_, { title, publishedYear, author }) => {
      const newBook = {
        id: String(books.length + 101),
        title,
        publishedYear: parseInt(publishedYear),
        authorIds: author ? [author] : [],
      };
      books.push(newBook);
      return newBook;
    },
    addAuthor: (_, { name }) => {
      const newAuthor = {
        id: String(authors.length + 1),
        name,
      };
      authors.push(newAuthor);
      return newAuthor;
    },
  },

  // Field definitions for relations
  Book: {
    author: (parent) => authors.filter((a) => parent.authorIds.includes(a.id)),
  },

  Author: {
    books: (parent) =>
      books.filter((book) => book.authorIds.includes(parent.id)),
  },
};

export { resolvers };
