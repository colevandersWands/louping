// ----- core url functions ------

function loupe_encode(raw) {
  return encodeURIComponent(btoa(raw));
}

function loupe_decode(encoded) {
  var parts = decodeURIComponent(encoded);
  return atob(parts.split('\n'));
}

function build_loupe_URL(encoded) {
  return "http://latentflip.com/loupe/?code="+encoded+"!!!";
}

function louping_encode(string_challenge) {
  var encoded = encodeURIComponent(string_challenge);
  var sanitized = encoded.replace(/\(/g, '%28').replace(/\)/g, '%29');
  var de_tabbed = sanitized.replace(/%09/g, '%20%20');
  return de_tabbed
};
// sanitization from:  https://github.com/pgbovine/OnlinePythonTutor/blob/0dcdacc7ff5be504dd6a47236ebc69dc0069f991/v5-unity/js/opt-frontend.ts#L62
function louping_decode(coded_challenge) {
  var decoded = decodeURIComponent(coded_challenge);
  var desanitized = decoded.replace(/\%28/g, '(').replace(/\%29/g, ')');
  return desanitized;
};

function build_louping_URL(encoded) {
  return "http://janke-learning.github.io/louping/?code="+encoded;
}

function read_query(entry) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var snippet_encoded = url.searchParams.get(entry);
  return snippet_encoded;
};

// ----- handlers ------

function open_in_loupe_handler() {
  var code = editor.getValue();
  var url = build_loupe_URL(loupe_encode(code));
  window.open(url, '_blank');
}
var open_in_button = document.getElementById("open-in-loupe");
open_in_button.addEventListener("click", open_in_loupe_handler);

function gen_loupe_permalink_handler() {
  var code = editor.getValue();
  var url = build_loupe_URL(loupe_encode(code));
  var perma_display = document.getElementById("display-loupe-permalink");
  perma_display.value = url;
  copy_to_clipboard(url); 
  alert('copied permalink');
}
var gen_loupe_permalink_button = document.getElementById("gen-loupe-permalink");
gen_loupe_permalink_button.addEventListener("click", gen_loupe_permalink_handler);

function gen_louping_permalink_handler() {
  var code = editor.getValue();
  var url = build_louping_URL(louping_encode(code));
  var perma_display = document.getElementById("display-louping-permalink");
  perma_display.value = url;
  copy_to_clipboard(url); 
  alert('copied permalink');
}
var gen_louping_permalink_button = document.getElementById("gen-louping-permalink");
gen_louping_permalink_button.addEventListener("click", gen_louping_permalink_handler);


function copy_snippet_handler() {
  var code = editor.getValue();
  copy_to_clipboard(code); 
  alert('snippet is copied. you can paste it in the console or in Loupe');
}
var copy_snippet_button = document.getElementById("copy-snippet");
copy_snippet_button.addEventListener("click", copy_snippet_handler);

function loupe_encode_snippet_handler() {
  var code = editor.getValue();
  var encoded = "?code="+loupe_encode(code)+"!!!";
  var encoded_display = document.getElementById("display-encoded");
  encoded_display.value = encoded;
  copy_to_clipboard(encoded); 
  alert('copied encoded code, paste into a loupe url to load it');
}
var loupe_encode_snippet_button = document.getElementById("loupe-encode-snippet");
loupe_encode_snippet_button.addEventListener("click", loupe_encode_snippet_handler);


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

