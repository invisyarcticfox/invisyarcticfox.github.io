// LIGHTMODE TOGGLE //
// https://www.youtube.com/watch?v=wodWDIdV9BY

let LightMode = localStorage.getItem("lightmode");
const lightModeToggle = document.querySelector("#lm-toggle");

const enableLightMode = () => {
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "true");
};
const disableLightMode = () => {
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", "false");
};

if (LightMode === "true") {
  enableLightMode();
}

lightModeToggle.addEventListener("click", () => {
  LightMode = localStorage.getItem("lightmode");
  if (LightMode !== "true") {
    enableLightMode();
    console.log(true);
  } else {
    disableLightMode();
    console.log(false)
  }
})


// URL PARAMETER //
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
    $('.nsfw').show();
  }
  // Check if the URL parmeter is empty or not defined, display default content
  else {
    $('.nsfw').remove();
  }
});


// https://thespotforpardot.com/2016/03/03/how-to-display-dynamic-content-on-a-page-using-url-parameters/