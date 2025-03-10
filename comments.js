//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require('./comments.json');

app.use(bodyParser.json());

//GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

//POST /comments
app.post('/comments', (req, res) => {
    const newComment = req.body;
    newComment.id = comments.length + 1;
    comments.push(newComment);
    fs.writeFileSync(commentsPath, JSON.stringify(comments));
    res.json(newComment);
});

//PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateComment = req.body;
    comments.forEach((comment) => {
        if (comment.id === id) {
            comment.name = updateComment.name;
            comment.email = updateComment.email;
            comment.body = updateComment.body;
        }
    });
    fs.writeFileSync(commentsPath, JSON.stringify(comments));
    res.json(updateComment);
});

//DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === id) {
            comments.splice(i, 1);
            break;
        }
    }
    fs.writeFileSync(commentsPath, JSON.stringify(comments));
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Server is running...');
});
