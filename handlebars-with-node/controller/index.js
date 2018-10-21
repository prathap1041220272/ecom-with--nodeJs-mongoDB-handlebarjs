'use strict';
const catlog = require('./catlog');
module.exports = app => {
    app.use('/api/catlog', catlog);
};