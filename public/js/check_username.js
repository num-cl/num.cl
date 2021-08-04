let database = firebase.database();
let url_example = document.getElementById('url_example');
let email_input = document.getElementById('user_email');
let username_input = document.getElementById('username');

if (localStorage) {
  localStorage.removeItem("firebase:previous_websocket_failure");
}

const enable_submit = () => {
  document.getElementById("submit").disabled = false;
}

const disable_submit = () => {
  document.getElementById("submit").disabled = true;
}

const get_db_reference = (username) => {
  let reference = `/user/by_username/${encode(username)}`;
  return firebase.database().ref(reference).once('value');
}

const record_exists_and_email_is_not = (snap, email) => {
  return snap.exists() && snap.val() !== email;
}

const update_url_description = (username_input) => {
  username = username_input.value.toLowerCase();

  if(username=='') {
    enable_submit();
    url_example.innerHTML = 'URL personalizada (opcional)'
  } else {
    get_db_reference(username).then(function(snap) {
      if (record_exists_and_email_is_not(snap, email_input.value.toLowerCase())) {
        disable_submit();
        url_example.innerHTML = '<span class="error">La url ya está tomada, prueba una distinta.</span>'
      } else {
        enable_submit();
        url_example.innerHTML = "Tu num será: num.cl/" + username;
      }
    });
  }
}

// main
username_input.onkeyup = function(){
  update_url_description(username_input);
}
