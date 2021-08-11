const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { response } = require('express');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://yes_sir:8JhLb4aUrhPjuFje@cluster0.z2g8s.mongodb.net/nodeblogs?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'pages');


// middleware & static files (like css file)
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('css'))



app.get('./all-blogs', (req, res) => {
    Blog.find().then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('6111357fc4b9b62a6cfb1b87')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use(blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});