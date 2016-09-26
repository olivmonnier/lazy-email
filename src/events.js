const fileSystem = require('./file');

module.exports = function(editor) {
  $(document).on('click', '.btn-open', function() {
    fileSystem.openHtmlTemplate(editor);
  });

  $(document).on('click', '.btn-save', function() {
    fileSystem.saveHtmlTemplate(editor);
  });

  $(document).on('click', '.btn-export', function() {
    const html = document.getElementById('htmlrender').contentWindow.document.documentElement.innerHTML;

    fileSystem.exportToEmail(html);
  });

  editor.on('change', function() {
    fileSystem.transformHtml(editor.getValue());
  });
}
