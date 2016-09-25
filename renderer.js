// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const events = require('./src/events');
const file = require('./src/file');
const CodeMirror = require('codemirror');
require('codemirror/mode/htmlmixed/htmlmixed');

const initVal = '<container>\n\t<row>\n\t\t{% for i in range(0, 2) %}\n\t\t\t<columns>\n\t\t\t\t<h1>Hello World</h1>\n\t\t\t</columns>\n\t\t{% endfor %}\n\t</row>\n</container>';
const editor = CodeMirror(document.getElementById('editor'), {
  mode: 'htmlmixed',
  lineNumbers: true,
  autofocus: true,
  tabSize: 2,
  value: initVal
});

if(typeof(window) !== 'undefined') {
  events(editor);

  setTimeout(function() {
    file.transformHtml(initVal);
  }, 800);
}
