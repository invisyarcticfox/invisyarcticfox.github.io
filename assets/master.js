var messageArray = ["Lucas."];
var textPosition = 0;
var speed = 100;

    typewriter = () => {
        document.querySelector("#name").innerHTML = messageArray[0].substring(0, textPosition) + '<span class="blinker">|</span>';
        if(textPosition++ != messageArray[0].length)setTimeout(typewriter, speed);
    }

window.addEventListener("load", typewriter);

//

function copy() {
    var copyText = document.getElementById("copy").innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = copyText;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
}
