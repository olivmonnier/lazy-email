const fileSystem = require('./file');

module.exports = function(editor) {
  $(document).on('click', '.btn-export', function() {
    fileSystem.saveHtmlTemplate(editor);
  });

  $(document).on('click', '.btn-open', function() {
    fileSystem.openHtmlTemplate(editor);
  });

  editor.on('change', function() {
    fileSystem.transformHtml(editor.getValue());
  });
}
