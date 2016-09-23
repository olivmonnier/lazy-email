// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {dialog} = require('electron').remote
const CodeMirror = require('codemirror');
require('codemirror/mode/htmlmixed/htmlmixed');

const initVal = '<container>\n\t<row>\n\t\t<columns>\n\t\t\t<h1>Hello World</h1>\n\t\t</columns>\n\t</row>\n</container>';
const editor = CodeMirror(document.getElementById('editor'), {
  mode: 'htmlmixed',
  lineNumbers: true,
  autofocus: true,
  tabSize: 2,
  value: initVal
});

const fs = require('fs');
const cheerio = require('cheerio');
const Inky = require('inky/lib/inky');
let inky;

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

  $(document).on('click', '.btn-export', function() {
    saveHtmlPage();
  });

  $(document).on('click', '.btn-open', function() {
    openHtmlPage();
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

function openHtmlPage() {
  dialog.showOpenDialog({ properties: ['openFile']}, function(filepath) {
    var content = fs.readFileSync(filepath[0], 'utf8');

    editor.setValue(content);
  });
}

function saveHtmlPage() {
  dialog.showSaveDialog(function(filepath) {
    fs.writeFileSync(filepath, editor.getValue())
  });
}
