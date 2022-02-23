/* Functions */
function include(file, type, pos) {
  var typ = type || 'js';
  var po = pos || 'head';
  if (typ == "js") {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    script.async = true;
    document.getElementsByTagName(po).item(0).appendChild(script);
  } else if(typ == "css") {
    var stylesheet = document.createElement('link');
    stylesheet.rel = "stylesheet";
    stylesheet.href = file;
    stylesheet.type = 'text/css';
    document.getElementsByTagName(po).item(0).appendChild(stylesheet);
  } else {
    throw new Error("Unkown mode provided.");
  };
};
function removefile(filename, filetype){
  var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
  var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
  var allsuspects=document.getElementsByTagName(targetelement)
  for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
    allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    console.log(`Removed: ${filename}`);
  };
};
function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
  };
};

/* Include required files */
window.addEventListener('DOMContentLoaded', (event) => {
  /* Include required syntax js files */
  include('./assets/internal/js/syntax/syntax-combined.js', 'js');
  include('./assets/internal/js/syntax/search-combined.js', 'js');
  include('./assets/internal/js/addon/css-lint.js', 'js');
  include('./assets/internal/js/addon/javascript-lint.js', 'js');
  include('./assets/internal/js/addon/json-lint.js', 'js');
  include('./assets/internal/js/addon/linting/csslint.js', 'js');
  include('./assets/internal/js/addon/linting/jshint.js', 'js');
  include('./assets/internal/js/addon/linting/jsonlist.js', 'js');
  include('./assets/internal/js/addon/linting/lint.js', 'js');
  include('./assets/internal/js/syntax/scrollbar.js', 'js');
  /* Include required syntax css */
  include('./assets/internal/css/codemirror.css', 'css');
  include('./assets/internal/css/lint.css', 'css');
  include('./assets/internal/css/highlight.css', 'css');
  include('./assets/internal/css/themes.css', 'css');
  //include('./assets/internal/js/syntax/syntax-combined.js', 'js');
  /* Cleanup */
  removefile('include-all.js', 'js');
});