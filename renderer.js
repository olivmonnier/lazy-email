// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const events = require('./src/events');
const file = require('./src/file');
const CodeMirror = require('codemirror');
require('codemirror/mode/htmlmixed/htmlmixed');
const initVal =
`{% extends "views/layout.html" %}
{% block body %}
  <container>
    <row>
      {% for i in range(0, 2) %}
        <columns>
          <h1>Hello World</h1>
        </columns>
      {% endfor %}
    </row>
  </container>
{% endblock %}`;

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
