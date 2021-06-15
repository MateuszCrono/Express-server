const express = require('express');
const app = express();
const cors = require('cors')
var uniqid = require('uniqid');
const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Vlad Tepes', text: 'This is hard.' },
];
const confirmation = { message: 'OK'};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
  res.json(db)
});

app.get('/testimonials/:id', (req, res) => {
  console 
  res.json(db.find((testimony) => {
   return +req.params.id === testimony.id 
}))

});

app.get('/testimonials/random', (req, res) => {
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };
  res.json(db[getRandomNumber(db.length)]);
});

app.post('/testimonials', (req, res) => {
  db.push({
    id: uniqid(),
    author: req.body.author,
    text: req.body.text,
  });
  res.json(confirmation);
});

app.put('/testimonials/:id', (req, res) => {
  const updatedTestimony = ({
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  });
  const TestimonyUpdate = db.find(testimony => testimony.id == req.params.id);
  const index = db.indexOf(TestimonyUpdate);
  db[index] = updatedTestimony;
  res.json(confirmation);
});

app.delete('/testimonials/:id', (req, res) => {
  const deletedTestimony = db.find(testimony => testimony.id == req.params.id);
  const index = db.indexOf(deletedTestimony);
  db.splice(index, 1);
  res.json(confirmation);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });

