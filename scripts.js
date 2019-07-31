// ----- core url functions ------

function encode(raw) {
  return encodeURIComponent(btoa(raw));
}

function decode(encoded) {
  var parts = decodeURIComponent(encoded);
  return atob(parts.split('\n'));
}

function buildURL(encoded) {
  return "http://latentflip.com/loupe/?code="+encoded+"!!!";
}


// ----- handlers ------

function open_in_loupe_handler() {
  var code = editor.getValue();
  var url = buildURL(encode(code));
  window.open(url, '_blank');
}
var open_in_button = document.getElementById("open-in-loupe");
open_in_button.addEventListener("click", open_in_loupe_handler);

function gen_permalink_handler() {
  var code = editor.getValue();
  var url = buildURL(encode(code));
  var perma_display = document.getElementById("display-permalink");
  perma_display.value = url;
  copy_to_clipboard(url); 
  alert('copied permalink');
}
var gen_permalink_button = document.getElementById("gen-permalink");
gen_permalink_button.addEventListener("click", gen_permalink_handler);

function copy_snippet_handler() {
  var code = editor.getValue();
  copy_to_clipboard(code); 
  alert('snippet is copied');
}
var copy_snippet_button = document.getElementById("copy-snippet");
copy_snippet_button.addEventListener("click", copy_snippet_handler);

function encode_snippet_handler() {
  var code = editor.getValue();
  var encoded = encode(code)+"!!!";
  var encoded_display = document.getElementById("display-encoded");
  encoded_display.value = encoded;
  copy_to_clipboard(encoded); 
  alert('copied encoded code, paste into a loupe url to load it');
}
var encode_snippet_button = document.getElementById("encode-snippet");
encode_snippet_button.addEventListener("click", encode_snippet_handler);


// ----- copy-pasting functions ------

function copy_it() {
  var code = editor.getValue();
  copy_to_clipboard(code); 
  alert("copied snippet");
};

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copy_to_clipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    // console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    // console.error('Async: Could not copy text: ', err);
    fallbackCopyTextToClipboard(text);
  });

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      // console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
    window.scrollTo(0, 0);
  };

};

