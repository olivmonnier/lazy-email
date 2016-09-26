const {dialog} = require('electron').remote
const fs = require('fs');
const inky = require('./inky');
const nunjucks = require('nunjucks');
const inlineCss = require('inline-css');
let FILE_OPEN = null;

nunjucks.configure({ autoescape: true });

exports.openHtmlTemplate = function (editor) {
  dialog.showOpenDialog({ properties: ['openFile']}, function(filepath) {
    if (filepath) {
      var content = fs.readFileSync(filepath[0], 'utf8');

      FILE_OPEN = filepath[0];
      editor.setValue(content);
    }
  });
}

exports.saveHtmlTemplate = function (editor) {
  if (FILE_OPEN) {
    fs.writeFileSync(FILE_OPEN, editor.getValue());
  } else {
    dialog.showSaveDialog(function(filepath) {
      if (filepath) {
        FILE_OPEN = filepath;
        fs.writeFileSync(filepath, editor.getValue());
      }
    });
  }
}

exports.transformHtml = function(elemString) {
  const htmlString = nunjucks.renderString(elemString);
  document.getElementById('htmlrender').contentWindow.document.querySelector('html').innerHTML = htmlString;
  const body = document.getElementById('htmlrender').contentWindow.document.body;
  const elems = $($(body).html());

  for(var i = 0; i < elems.length; i++) {
    if (elems[i] instanceof HTMLElement) {
      inky.runInky(elems[i]);
    }
  }
}

exports.exportToEmail = function(htmlString) {
  inlineCss(htmlString, {
    url: '/',
    removeStyleTags: false
  }).then(function(html) {
    dialog.showSaveDialog({
      filters: [
        {name: 'HTML', extensions: ['html']}
      ]
    }, function(filepath) {
      if (filepath) {
        fs.writeFileSync(filepath, html);
      }
    });
  });
}
