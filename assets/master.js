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
