const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default;
let users_app = []

const doesExist = (username)=>{
    console.log(users_app)
    let userswithsamename = users.filter((user)=>{
      return users_app.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  


public_users.post("/register", (req,res) => {

    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        
        users_app.push({"username":username,"password":password});
        console.log(users_app)
        return res.status(200).json({message: "Customer successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "Customer already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register Customer."});
  });

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   //return res.status(300).json({message: "Yet to be implemented"});
//   res.send(JSON.stringify(books,null,4));
// });


const connectToURL = async(url)=>{
    const outcome = axios.get(url);
    let listOfBook = (await outcome).Books;
    listOfBook.forEach((Books)=>{
        res.send(JSON.stringify(books,null,4));
    });
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
    res.send(books[isbn])
 });
  
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   const author = req.params.author;

// var disp_op= (Object.values(books).filter(book => book.author === author));
// res.send(disp_op)
// });

const connectToURLauth = async(url)=>{
    const outcome = axios.get(url);
    let listOfauthor = (await outcome).Books.Author;
    listOfauthor.forEach((Books)=>{
        res.send(JSON.stringify(books,null,4));
    });
}

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   const title = req.params.title;

// var disp_op= (Object.values(books).filter(book => book.title === title));
// res.send(disp_op)});

const connectToURLTitle = async(url)=>{
    const outcome = axios.get(url);
    let listOfauthor = (await outcome).Books.title;
    listOfauthor.forEach((Books)=>{
        res.send(JSON.stringify(books,null,4));
    });
}

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

//  Put book review
public_users.put('/review/:isbn',function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    let book = books[isbn]
    if (book) { //Check is friend exists
        let review = req.body.review;

        if(review) {
            book["reviews"] = review
        }
        books[isbn]=book;
        res.send(`The review for the book with ISBN  ${isbn} has been updated.`);
    }
    else{
        res.send("Unable to find book!");
    }

      res.send(books[isbn].reviews)
  });

// DELETE request: Delete a friend by email id
public_users.delete("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let book = books[isbn]
    if (book) { //Check is friend exists
        delete books[isbn]
    }
    res.send(`The review for the book with ISBN  ${isbn} has been deleted.`);
  });  
  

module.exports.general = public_users;
module.exports.users_app = users;
