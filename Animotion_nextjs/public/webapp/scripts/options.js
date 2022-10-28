function get_vision() {

    //var t = document.getElementById("give_vision");

    if (document.getElementById("return_vision").style.display == "none") {
      document.getElementById("return_vision").style.display = "block";
    } else {
      document.getElementById("return_vision").style.display = "none";
    }

    if (document.getElementById("record_vision").style.display == "none") {
        document.getElementById("record_vision").style.display = "block";
      } else {
        document.getElementById("record_vision").style.display = "none";
      }


    if (document.getElementById("preview_vision").style.display == "none") {
        document.getElementById("preview_vision").style.display = "block";
    } else {
        document.getElementById("preview_vision").style.display = "none";
    }

    if (document.getElementById("control_vision").style.display == "none") {
      document.getElementById("control_vision").style.display = "block";
    } else {
      document.getElementById("control_vision").style.display = "none";
    }

  }