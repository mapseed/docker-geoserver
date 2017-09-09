/* globals $ */
function send(event) {
  var username = document.getElementById("geosync-username").value;
  var password = document.getElementById("geosync-password").value;

  event.preventDefault()
  var xhr = new XMLHttpRequest()
  xhr.ontimeout = function () {
    console.error("The request timed out.")
  }
  xhr.responseType = 'arraybuffer'
  xhr.onload = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 ||
          xhr.status === 401 ||
          xhr.status === 500) {
        var dataView = new DataView(this.response);
        var decoder = new TextDecoder('utf8');
        var decodedString = decoder.decode(dataView)
        $(".geosync-results__shell").html(decodedString)

        $("#geosync-results").css('display', 'block')
      }
    }
  }
  xhr.open("POST", '/')
  xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
  xhr.send(null)
}


