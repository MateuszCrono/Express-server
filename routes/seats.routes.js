const express = require('express');
const uniqid = require('uniqid');
const confirmation = { message: 'OK'};
const router = express.Router()
const db = require('./../db')

router.route('/seats').get((req, res) => {
  res.json(db.seats)
});

router.route('/seats/:id').get((req, res) => { 
  res.json(db.seats.find((testimony) => {
   return +req.params.id === testimony.id 
}))
});

router.route('/seats/random').get((req, res) => {
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };
  res.json(db.seats[getRandomNumber(db.seats.length)]);
});

router.route('/seats').post((req, res) => {
  db.seats.push({
    id: uniqid(),
    author: req.body.author,
    text: req.body.text,
  });
  res.json(confirmation);
});

router.route('/seats/:id').put((req, res) => {
  const updatedSeat = ({
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  });
  const seatUpdate = db.find(seat => seat.id == req.params.id);
  const index = db.seats.indexOf(seatUpdate);
  db[index] = updatedSeat;
  res.json(confirmation);
});

router.route('/seats/:id').delete((req, res) => {
  const deletedSeat = db.seats.find(seat => seat.id == req.params.id);
  const index = db.seats.indexOf(deletedSeat);
  db.splice(index, 1);
  res.json(confirmation);
});

module.exports = router ;