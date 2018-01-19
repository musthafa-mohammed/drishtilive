function onSearch() {
  var input = document.getElementById("input_id").value;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/live?name="+input, true);
  xhttp.send();
  window.open("http://localhost:3000/live?name="+input,"_self")

}

alert("Turn on your GPS for better results!");
/* Open */
function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

/* Close */
function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}
