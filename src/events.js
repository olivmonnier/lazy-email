const fileSystem = require('./file');

module.exports = function(editor) {
  $(document).on('click', '.btn-export', function() {
    fileSystem.saveHtmlPage(editor);
  });

  $(document).on('click', '.btn-open', function() {
    fileSystem.openHtmlPage(editor);
  });

  editor.on('change', function() {
    var elems = $(editor.getValue());
    
    fileSystem.transformHtml(elems);
  });
}
