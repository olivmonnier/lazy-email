const {dialog} = require('electron').remote
const fs = require('fs');
const inky = require('./inky');
const nunjucks = require('nunjucks');
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
        fs.writeFileSync(filepath, editor.getValue())
      }
    });
  }
}

exports.transformHtml = function(elemString) {
  const htmlString = nunjucks.renderString(elemString);
  const elems = $(htmlString);

  for(var i = 0; i < elems.length; i++) {
    inky.runInky(elems[i]);
  }
}
