'use strict';

const validator = require('validator');
const moment = require('moment');
const TextModel = require('../models/text');
const errorHandler = require('./errors.controller');

exports.timeline = function (req, res) {

  TextModel.find({
    date: {
      $gte: moment(req.params.month, 'MM.YYYY').startOf('month').utc().toISOString(),
      $lte: moment(req.params.month, 'MM.YYYY').endOf('month').utc().toISOString()
    }
  })
    .sort('-date')
    .select('words date')
    .lean()
    .exec(function (err, timeline) {
      if (err) return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });

      timeline.forEach(function(tl, i, arr) {
        arr[i].date = moment(tl.date).format('DD.MM.YYYY');
      });

      res.status(200).send(timeline);
    });

};

//todo: implement encryption

exports.create = function (req, res) {
  TextModel.update({
      date: moment(req.body.date, 'DD.MM.YYYY').utc(),
      user: req.user
    }, {
      $set: {
        text: req.body.text,
        words: req.body.text.trim().split(/[\s,.;]+/).filter(el => el !== '').length,
        date: moment(req.body.date, 'DD.MM.YYYY').utc()
      }
    }, {
      upsert: true
    },
    function (err, numaffected) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(numaffected);
      }
    })
};

//todo: implement decryption

exports.read = function (req, res) {

  TextModel.find({
    date: moment(req.params.date, 'DD.MM.YYYY')
  }, function (err, text) {
      if (err) return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });

      res.status(200).send(text);
    });

};
