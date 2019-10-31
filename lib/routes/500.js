'use strict';

/**
 * Note that there's nothing special about this middleware on it's own.
 * It will only "fire" if you define it last in the chain in your server
 * and if someone requests a route that has not been defined.  In that case,
 * this will run and send a proper 404 header and message.
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  const random = Math.floor(Math.random() * 2 + 1);
  req.valid = true;
  if (random % 2 !== 0) {
    req.valid = false;
    console.log('Major error!');
    res.status(500);
    res.send('500: Server Error');
    res.end();
  }
};
