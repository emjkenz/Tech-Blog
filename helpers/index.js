const Handlebars = require('handlebars');

// Get current year
const date = (d) => d.toLocaleDateString();

const time = (t) => t.toLocaleTimeString();

Handlebars.registerHelper('formatDate', date);
Handlebars.registerHelper('formatTime', time);

module.exports = Handlebars