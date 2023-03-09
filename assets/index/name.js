var messageArray = ["Lucas."];
var textPosition = 0;
var speed = 100;

  typewriter = () => {
    document.querySelector(".name").innerHTML = messageArray[0].substring(0, textPosition) + '<span class="blinker">|</span>';
    if(textPosition++ != messageArray[0].length)setTimeout(typewriter, speed);
  }

window.addEventListener("load", typewriter);
