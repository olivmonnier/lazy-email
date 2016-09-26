const cheerio = require('cheerio');
const Inky = require('inky/lib/inky');
let inky;

function setupInky (opts, cb) {
  opts = opts || {};
  opts.cheerio = Inky.mergeCheerioOpts(opts.cheerio);
  if (typeof inky === 'undefined') {
    inky = new Inky(opts);
  }

// This transform function takes in an element and calls a callback.
  function transform(html, callback) {
    var convertedHtml = inky.releaseTheKraken(html, opts.cheerio);
    callback(null, convertedHtml);
  }

  cb(transform);
}

exports.setupInky = setupInky;

exports.runInky = function(opts, elem) {
  if(typeof(elem) === 'undefined') {
    elem = opts;
    opts = {};
  }
  setupInky(opts, function(transform) {
    transform(elem.outerHTML, function(err, html) {
      if(err === null) {
        document.getElementById('htmlrender').contentWindow.document.querySelector('center').innerHTML = html;
      }
    });
  });
}
