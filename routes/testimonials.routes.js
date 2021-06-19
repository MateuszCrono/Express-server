const express = require('express');
const uniqid = require('uniqid');
const confirmation = { message: 'OK'};
const router = express.Router()
const db = require('./../db')


router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials)
});

router.route('/testimonials/:id').get((req, res) => { 
  res.json(db.testimonials.find((testimony) => {
   return +req.params.id === testimony.id 
}))
});

router.route('/testimonials/random').get((req, res) => {
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };
  res.json(db.testimonials[getRandomNumber(db.testimonials.length)]);
});

router.route('/testimonials').post((req, res) => {
  db.testimonials.push({
    id: uniqid(),
    author: req.body.author,
    text: req.body.text,
  });
  res.json(confirmation);
});

router.route('/testimonials/:id').put((req, res) => {
  const updatedTestimony = ({
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  });
  const TestimonyUpdate = db.find(testimony => testimony.id == req.params.id);
  const index = db.testimonials.indexOf(TestimonyUpdate);
  db[index] = updatedTestimony;
  res.json(confirmation);
});

router.route('/testimonials/:id').delete((req, res) => {
  const deletedTestimony = db.testimonials.find(testimony => testimony.id == req.params.id);
  const index = db.testimonials.indexOf(deletedTestimony);
  db.splice(index, 1);
  res.json(confirmation);
});

module.exports = router ;