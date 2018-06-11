var url_example = document.getElementById('url_example');
var tentative_url = document.getElementById('username');
tentative_url.onkeyup = function(){
  url = tentative_url.value.toLowerCase()
  if(url=='') {
    url_example.innerHTML = 'URL personalizada (opcional)'
  } else {
    url_example.innerHTML = "Tu num será: num.cl/" + url;
  }
}
