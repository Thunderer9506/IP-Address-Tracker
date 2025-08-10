document.getElementById("ip_search").addEventListener("click",function(){
  let ip = document.getElementById("ip_searchTab").value
  let apiUrl = "https://geo.ipify.org/api/v2/country,city?apiKey={your api key}&ipAddress=" + ip
  getdata(apiUrl)
})

function getMap(lat,lng){
  let map = L.map('map').setView([lat, lng], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
  let marker = L.marker([lat, lng]).addTo(map)
}

function info(ip,loc,time,isp){
  document.querySelector(".ip h1").innerText = ip
  document.querySelector(".location h1").innerText = loc
  document.querySelector(".timezone h1").innerText = time
  document.querySelector(".isp h1").innerText = isp
}

function getdata(url){
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    info(data.ip,
      data.location.city +","+ data.location.region+","+data.location.country,
      data.location.timezone,
      data.isp)
    getMap(data.location.lat,data.location.lng)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
