const {dialog} = require('electron').remote
const fs = require('fs');
const inky = require('./inky');

exports.openHtmlTemplate = function (editor) {
  dialog.showOpenDialog({ properties: ['openFile']}, function(filepath) {
    if (filepath) {
      var content = fs.readFileSync(filepath[0], 'utf8');

      editor.setValue(content);
    }
  });
}

exports.saveHtmlTemplate = function (editor) {
  dialog.showSaveDialog(function(filepath) {
    if (filepath) {
      fs.writeFileSync(filepath, editor.getValue())
    }
  });
}

exports.transformHtml = function(elems) {
  for(var i = 0; i < elems.length; i++) {
    inky.runInky(elems[i]);
  }
}
