'use strict'

const Co = require('co');
const Assert = require('../utils/assert.js');

module.exports = {
  findOne: function (poetId, cb) {
    Poetry.findOne({id: poetId}).populate('poet').then(function (poetry){
      if (!poetry) {poetry = {}};
      cb(poetry);
    }).catch(function (err){
      throw new Error(err.message);
    });
  },

  count: function (cb){
    Co(function* () {
      let count = yield Poetry.count();
      cb(count);
    }).catch(err => {
      sails.log.error(err.message);
    });
  },

  randOne: function(cb){
    (function _lookupPoetryRandId(afterLookup){
      const sql = "SELECT t1.id FROM `poetries` AS t1 JOIN (SELECT ROUND(RAND() * (SELECT MAX(id) FROM `poetries`)) AS id) AS t2 WHERE t1.id >= t2.id ORDER BY t1.id ASC LIMIT 1";
      Poetry.query(sql, function (err, result){
        if (err) {
          throw new Error(err.message);
          return;
        }
        afterLookup(result[0].id);
      });
    })(function (id){
      PoetryService.findOne(id, cb);
    });
  }
}