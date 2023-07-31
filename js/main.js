//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)


function getFetch() {
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + choice + '&appid=e9dd92430c41fa069cd1d9606f663ad5'
  
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('h1').innerText = data.name
      document.querySelector('h2').innerText = data.weather[0].description
      document.querySelector('h3').innerText = data.main.temp
      document.querySelector('img').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`

      nextFiveDays(data.coord.lat, data.coord.lon);
    }
  )
    .catch(err => {
      console.log(`error ${err}`)
    }
  );
}
function getFetchOnLoad(){
  let lat = 0, long = 0;
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat, long)
  })
  const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e9dd92430c41fa069cd1d9606f663ad5`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data)
        // document.querySelector('h1').innerText = data.name
        // document.querySelector('h2').innerText = data.weather[0].description
        // document.querySelector('h3').innerText = data.main.temp
        // document.querySelector('img').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`

        document.getElementById('city').innerText = data.name;
        document.getElementById('Current').innerText = data.weather[0].main;
        document.getElementById('weatherDescription').innerText = data.weather[0].description;
        document.getElementById('temp').innerText = data.main.temp;
        document.getElementById('tempMin').innerText = data.main.temp_min;
        document.getElementById('tempMax').innerText = data.main.temp_max;

        document.getElementById('img').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        
        document.getElementById('wind').innerText = data.wind.speed;
        document.getElementById('humidity').innerText = data.main.humidity;
        document.getElementById('pressure').innerText = data.main.pressure;
        // document.getElementById('clouds').innerText = data.clouds.all;
        document.getElementById('sunrise').innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US')
        document.getElementById('sunset').innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US')

        nextFiveDays(lat, long);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


function nextFiveDays(lat, long) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=c54bf3918a2805b5d4c8e4b592e3ee76`;

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data);
      let date = new Date();
      // let backgroundColor = {"clouds":'#4DB0D3' ,"clear":'#F5D547', "rain":'#4DB0D3', "snowy":'#BCE1EF',"partly cloudy":'#BCE1EF', "thunderstorm":'#BCE1EF', "mist":'#BCE1EF', "drizzle":'#BCE1EF'};

      const bc = {
        'clear': 'linear-gradient(135deg, #ffcc00, #ffff66)', // Yellow to Light Yellow
        'partlycloudy': 'linear-gradient(135deg, #b3ccff, #99ccff)', // Light Blue to Sky Blue
        'clouds': 'linear-gradient(135deg, #808080, #b3b3b3)', // Gray to Light Gray
        'overcast': 'linear-gradient(135deg, #666666, #999999)', // Dark Gray to Gray
        'rain': 'linear-gradient(135deg, #3366cc, #6699cc)', // Blue to Light Blue
        'drizzle': 'linear-gradient(135deg, #99ccff, #b3d9ff)', // Light Blue to Pale Blue
        'showers': 'linear-gradient(135deg, #003399, #3366cc)', // Dark Blue to Blue
        'thunderstorm': 'linear-gradient(135deg, #330066, #993399)', // Dark Purple to Purple
        'snow': 'linear-gradient(135deg, #ffffff, #e6e6e6)', // White to Light Gray
        'sleet': 'linear-gradient(135deg, #66a3e0, #99ccff)', // Light Blue to Light Sky Blue
        'hail': 'linear-gradient(135deg, #b3d9ff, #e6f0ff)', // Light Blue to Very Light Blue
        'fog': 'linear-gradient(135deg, #cccccc, #d9d9d9)', // Light Gray to Pale Gray
      };
      
      for (let i = 0; i < 5; i++) {
        date.setDate(date.getDate() + 1);
        document.getElementById(`date${i + 1}`).innerText = date.toDateString();
        document.getElementById(`line${i + 1}`).style.backgroundImage = bc[data.list[i].weather[0].main.toLowerCase().replace(/\s/g, '')];
        console.log(data.list[i].weather[0].main.toLowerCase().replace(/\s/g, ''));
        document.getElementById(`day${i + 1}`).innerText = data.list[i].weather[0].main;
        document.getElementById(`temp${i + 1}`).innerText = data.list[i].main.temp;
        document.getElementById(`img${i + 1}`).src = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
      }
    })
  
}

getFetchOnLoad();

const slider = document.querySelector('.gallery');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});
