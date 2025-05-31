//1. Basic Operations

// Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1940 } });

// Find books by a specific author
db.books.find({ author: "George Orwell" });

// Update the price of a specific book
db.books.updateOne({ title: "Animal Farm" }, { $set: { price: 8.99 } });

// Delete a book by its title
db.books.deleteOne({ title: "Animal Farm" });

//2. Advanced Queries

// Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 1950 } });

// Projection: only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sorting by price ascending
db.books.find().sort({ price: 1 });

// Sorting by price descending
db.books.find().sort({ price: -1 });

// Pagination: 5 books per page
db.books.find().skip(0).limit(5);

// 3. Aggregation Pipeline

// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 },
]);

// Group books by decade
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] },
      count: 1,
    },
  },
]);

// 5. Indexing

// Create index on title
db.books.createIndex({ title: 1 });

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Use explain to analyze performance
db.books.find({ title: "Brave New World" }).explain("executionStats");
