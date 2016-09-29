const fileSystem = require('./file');
const CodeMirror = require('codemirror');
const Config = require('electron-config');
const config = new Config();

module.exports = function(editor) {
  $(document).on('show.bs.modal', '#modal-settings', function() {
    $('#input-template-path').val(TEMPLATES_PATH);
  });

  $(document).on('click', '#modal-settings .btn-primary', function() {
    TEMPLATES_PATH = $('#input-template-path').val();
    config.set('templatePath', TEMPLATES_PATH);
    $('#modal-settings').modal('hide');
    fileSystem.changeTemplatePath();
    CodeMirror.signal(editor, 'change');
  });

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
