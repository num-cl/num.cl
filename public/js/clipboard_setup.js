var clipboard = new Clipboard('.copy_btn');

clipboard.on('success', function(e) {
  var original_text = e.trigger.innerHTML
  e.trigger.innerHTML = '¡COPIADO!';
  setTimeout(function() {
    e.trigger.innerHTML = original_text;
  }, 1000);
});
