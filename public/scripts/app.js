var reloj = "analog";

var date = new Date;
/* Actual time */
var second = date.getSeconds() * 6;
var minute = date.getMinutes() * 6;
var hour = date.getHours() * 30;


/* Hour, minutes and seconds indicators */
var seconds_indicator = document.getElementById("seconds_ind");
var minutes_indicator = document.getElementById("minutes_ind");
var hour_indicator = document.getElementById("hours_ind");

function addActivityItem(){
  var selector = document.getElementById("selector");
  reloj = selector.options[selector.selectedIndex].value;
  setClockView();
  refreshPage();
}

function changeTime() {
  second = second + 6;
  if (second >= 360) {
    second = second - 360;
    minute = minute + 6;
  }
  if (minute >= 360) {
    minute = minute - 360;
    hour = hour + 30;
  }
  if (hour >= 360) {
    hour = hour - 360;
  }
  refreshPage();
}

function refreshPage() {
  if (reloj === "analog") {
    seconds_indicator.style.transform = "rotate(" + second + "deg)";
    minutes_indicator.style.transform = "rotate(" + minute + "deg)";
    hour_indicator.style.transform = "rotate(" + hour + "deg)";

  } else {
    var hours = Math.round(hour / 30);
    var mins = Math.round(minute / 6);
    var seconds = Math.round(second / 6);

    var actualTime = "" + hours + " : " + mins + " : " + seconds;
    document.getElementById("digital-clock").innerHTML = actualTime;
  }
}


function setClockView() {
  if (reloj === "analog") {
    document.getElementById("digital-clock").style.display = 'none';
    document.getElementById("analog-clock").style.display = 'inline-block';
  } else {
    document.getElementById("analog-clock").style.display = 'none';
    document.getElementById("digital-clock").style.display = 'inline-block';
  }
}

function start() {
  document.getElementById("selector").addEventListener("change", addActivityItem, false);
}

setClockView();
window.addEventListener("load", start, false);
window.setInterval(changeTime, 1500);
