//current progress: Can search for Thrice and click the Thrice word and it shows a song of theirs.


const token = '?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f';

function findArtist(userSearch){
  document.querySelector('.search-results').textContent = "Searching for... " + userSearch;
  fetch('https://api.soundcloud.com/users/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=' + userSearch, {
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      console.log(json);
      let bandAvatar = json[0].avatar_url
      let bandName = json[0].username;
      let bandID = json[0].id;

      let htmlForm = `
        <div class="band-wrapper"
          <div class="band-art">
            <img src="${bandAvatar}">
          </div>
          <div class="band-name">
            <p class="band-name-p">${bandName}</p>
          </div>
        </div>
      `

      document.querySelector('.search-results').textContent = "";
      document.querySelector('.search-results').insertAdjacentHTML('afterbegin', htmlForm);

      document.querySelector('.band-wrapper').addEventListener('click', function(){
        artistSongs(bandID, bandName)
      })
    })
}

function artistSongs(bandID, searchName){
  document.querySelector('.search-results').textContent = "Fetching songs for..." + searchName;
  fetch('https://api.soundcloud.com/users/' + bandID +'/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=' + searchName, {
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      console.log(json);

      let albumArt = json[0].artwork_url;
      let songTitle = json[0].title;
      let songLink = json[0].stream_url;

      let htmlSongs = `
        <div class='band-wrapper'
          <div class="band-art">
            <img src="${albumArt}">
          </div>
          <div class="band-name">
            <p>${songTitle}</p>
          </div>
        </div>
      `
      document.querySelector('.search-results').textContent = ""
      document.querySelector('.search-results').insertAdjacentHTML('afterbegin', htmlSongs);
  })
}

document.querySelector('.reset-button').addEventListener('click', resetButton)

function resetButton(){
  document.querySelector('.search-results').textContent = ""
}

document.querySelector('.search-form').addEventListener('submit', function(event){
  event.preventDefault();
  let searchContent = document.querySelector('#search-input').value
  console.log(searchContent);
  findArtist(searchContent)
})
