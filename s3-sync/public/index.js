function send(event) {
  var username = document.getElementById("geosync-username").value;
  var password = document.getElementById("geosync-password").value;

  event.preventDefault()
  var xhr = new XMLHttpRequest()
  xhr.ontimeout = function () {
    console.error("The request timed out.")
  }
  xhr.onload = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // TODO: render the output from our s3 sync
        console.log("success!")
      } else {
        // TODO: render an unauthorized message
        console.error(xhr.statusText);
      }
    }
  }
  xhr.open("POST", '/')
  xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
  xhr.send(null)
}


