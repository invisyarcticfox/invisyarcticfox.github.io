// Parse the URL parameter
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Give the parameter a variable name
var dynamicContent = getParameterByName('nsfw');
$(document).ready(function () {
  // Check if the URL parameter is true
  if (dynamicContent == 'true') {
    $('.dynamic-content').show();
    $('#back.second').hide();
    $('#back.third').show();
    document.title = "shamshitty - (NSFW) sona art";
  }
  // Check if the URL parmeter is empty or not defined, display default content
  else {
    $('.default-content').show();
  }
});


// https://thespotforpardot.com/2016/03/03/how-to-display-dynamic-content-on-a-page-using-url-parameters/