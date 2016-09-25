const {dialog} = require('electron').remote
const fs = require('fs');
const inky = require('./inky');
let FILE_OPEN = null;

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

exports.transformHtml = function(elems) {
  for(var i = 0; i < elems.length; i++) {
    inky.runInky(elems[i]);
  }
}
