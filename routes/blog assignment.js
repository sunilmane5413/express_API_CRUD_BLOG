const express = require('express')
const app = express()
const mysql = require('mysql2')


// - APIs for Blogs Application
// - Save New Blog (at least 6-7 attributes of blog  like - id, title, description, creationDate, author, isDraft, isPublished, numberOfViews etc.)
// - View All Blogs
// - View All Published Blogs
// - View All Draft Blogs
// - View One Blog by sendig id
// - View All Blogs by Author name
// - Delete Blog by Id
// - Update Blog Title/Description
// - Update Blog from Draft mode to Published Mode

// const connection = mysql.createConnection({
//   host:'localhost',
//   port:3306,
//   user:'root',
//   password:'Pass@5413',
//   database:'blog'
// })

// connection.connect((error)=>{
//   if(error){
//     console.error(error)
//   }
//   else{
//     console.log('connected to the database "mydatabse" succesfully')
//   }
// })


  

// Save New Blog
app.post('/api/blogs', (req, res) => {
    const blog = {
      id: 1,
      title: req.body.title,
      description: req.body.description,
      creationDate: new Date(),
      author: req.body.author,
      isDraft: req.body.isDraft,
      isPublished: req.body.isPublished,
      numberOfViews: 0
    };
   
    res.json(blog);
  });
  
  // View All Blogs
  app.get('/api/blogs', (req, res) => {
    const blogs =  getAllBlogs()
    res.json(blogs);
  });
  
  // View All Published Blogs
  app.get('/api/blogs/published', (req, res) => {
    const blogs = getAllBlogs().filter(b => b.isPublished);
    res.send(blogs);
  });
  
  // View All Draft Blogs
  app.get('/api/blogs/drafts', (req, res) => {
    const blogs = getAllBlogs().filter(b => b.isDraft);
    res.send(blogs);
  });
  
  // View One Blog by Id
  app.get('/api/blogs/:id', (req, res) => {
    const blog = getBlogById(req.params.id);
    if (!blog) {
      res.status(404).send('Blog not found');
    } else {
      res.send(blog);
    }
  });
  
  // View All Blogs by Author
  app.get('/api/blogs/author/:author', (req, res) => {
    const blogs = getAllBlogs().filter(b => b.author === req.params.author);
    res.send(blogs);
  });
  
  // Delete Blog by Id
  app.delete('/api/blogs/:id', (req, res) => {
    const success = deleteBlogById(req.params.id);
    if (!success) {
      res.status(404).send('Blog not found');
    } else {
      res.send('Success');
    }
  });
  
  // Update Blog Title/Description
  app.patch('/api/blogs/:id', (req, res) => {
    const success = updateBlogById(req.params.id, req.body.title, req.body.description);
    if (!success) {
      res.status(404).send('Blog not found');
    } else {
      res.send('Success');
    }
  });
  
  // Update Blog from Draft to Published
  app.patch('/api/blogs/:id/publish', (req, res) => {
    const success = updateBlogStatus(req.params.id, true);
    if (!success) {
      res.status(404).send('Blog not found');
    } else {
      res.send('Success');
    }
  });

  module.exports = app