// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var CodeMirror = require('codemirror');
require('codemirror/mode/htmlmixed/htmlmixed');

var initVal = '<container>\n\t<row>\n\t\t<columns>\n\t\t\t<h1>Hello World</h1>\n\t\t</columns>\n\t</row>\n</container>';
var editor = CodeMirror(document.getElementById('editor'), {
  mode: 'htmlmixed',
  lineNumbers: true,
  autofocus: true,
  tabSize: 2,
  value: initVal
});

var cheerio = require('cheerio');
var Inky = require('inky/lib/inky');

var inky;

window.setupInky = function(opts, cb) {
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

if(typeof(window) !== 'undefined') {
  window.runInky = function(opts, elem) {
    if(typeof(elem) === 'undefined') {
      elem = opts;
      opts = {};
    }
    window.setupInky(opts, function(transform) {
      transform(elem.outerHTML, function(err, html) {
        if(err === null) {
          document.getElementById('htmlrender').contentWindow.document.body.innerHTML = html;
        } else {
          console.log(err);
        }
      });
    });
  }

  editor.on('change', function() {
    var elems = $(editor.getValue());
    transformHtml(elems);
  });

  setTimeout(function() {
    transformHtml($(initVal));
  }, 800);
}
function transformHtml(elems) {

  for(var i = 0; i < elems.length; i++) {
    window.runInky(elems[i]);
  }
}
