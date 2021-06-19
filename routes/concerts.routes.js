const express = require('express');
const uniqid = require('uniqid');
const confirmation = { message: 'OK'};
const router = express.Router()
const db = require('./../db')

router.route('/concerts').get((req, res) => {
  res.json(db.concerts)
});

router.route('/concerts/:id').get((req, res) => { 
  res.json(db.concerts.find((concert) => {
   return +req.params.id === concert.id 
}))
});

router.route('/concerts/random').get((req, res) => {
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };
  res.json(db.concerts[getRandomNumber(db.concerts.length)]);
});

router.route('/concerts').post((req, res) => {
  db.concerts.push({
    id: uniqid(),
    author: req.body.author,
    text: req.body.text,
  });
  res.json(confirmation);
});

router.route('/concerts/:id').put((req, res) => {
  const updatedConcert = ({
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  });
  const concertUpdate = db.concerts.find(concert => concert.id == req.params.id);
  const index = db.concerts.indexOf(concertUpdate);
  db[index] = updatedConcert;
  res.json(confirmation);
});

router.route('/concerts').delete((req, res) => {
  const deletedConcert = db.concerts.find(concert => concert.id == req.params.id);
  const index = db.concerts.indexOf(deletedConcert);
  db.splice(index, 1);
  res.json(confirmation);
});

module.exports = router ;