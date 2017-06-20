function findArtist(userSearch) {
  document.querySelector('.search-results').textContent = "Searching for... " + userSearch;
  fetch(`https://api.soundcloud.com/users/${token}&q=` + userSearch, {}).then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log(json);
    document.querySelector('.search-results').textContent = "";
    console.log('the json length is ' + json.length);
    for (let i = 0; i < 10; i++) {
      let bandAvatar = json[i].avatar_url
      let bandName = json[i].username;
      const bandID = json[i].id;

      let htmlForm = `
          <div class="band-wrapper">
            <div class="band-art">
              <img src="${bandAvatar}">
            </div>
            <div class="band-name" id="${bandID}">
              <p class="band-name-p">${bandName}</p>
            </div>
          </div>
        `
      document.querySelector('.search-results').insertAdjacentHTML('beforeend', htmlForm);
    }
    let bands = document.querySelectorAll('.band-wrapper')
    console.log(bands);
    let bandID = document.querySelectorAll('.band-name')
    console.log(bandID);
    for (let i = 0; i < bands.length; i++) {
      let bandNum = bandID[i].id;
      console.log(bandNum)
      bands[i].addEventListener('click', function() {
        console.log(bandNum);
        artistSongs(bandNum);
      })
    }
  })
}

function artistSongs(bandID, searchName) {
  document.querySelector('.search-results').textContent = "Fetching songs for..." + searchName;
  fetch('https://api.soundcloud.com/users/' + bandID + '/tracks/' + token, {}).then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log(json);
    document.querySelector('.search-results').textContent = ""
    for (let i = 0; i < 20; i++) {
      let albumArt = json[i].artwork_url;
      let songTitle = json[i].title;
      var songLink = json[i].stream_url;
      let bandName = json[i].user.username;

      let htmlSongs = `
          <div class='band-wrapper' id="${songLink}">
            <div class="band-art">
              <img src="${albumArt}">
            </div>
            <div class="band-name" id="${bandName}">
              <p class="song-title">${songTitle}</p>
            </div>
          </div>
        `

      document.querySelector('.search-results').insertAdjacentHTML('beforeend', htmlSongs);
    }

    var bandWrapper = document.querySelectorAll('.band-wrapper');
    var songTitles = document.querySelectorAll('.song-title');
    console.log('selecting the songTitle which is ' + songTitles);
    var bandNames = document.querySelectorAll('.band-name');
    console.log('selecting the bandName which is ' + bandNames);

    for (var i = 0; i < bandWrapper.length; i++) {
      let bandSong = bandWrapper[i].id;
      let songTitle = songTitles[i].textContent;
      let bandName = bandNames[i].id;
      console.log(bandSong);
      bandWrapper[i].addEventListener('click', function() {
        audioPlay(bandSong, songTitle, bandName);
      });
    }

    function audioPlay(songLink, song, name) {
      let htmlAudio = `
        <audio controls="true" class="player" src='${songLink}${token}' autoplay="true">
        </audio>
        <p class="audio-p">${song} <br> ${name}</p>
        `
      document.querySelector('.player').textContent = " ";
      document.querySelector('.player').insertAdjacentHTML('afterbegin', htmlAudio);
    }

  })
}

document.querySelector('.reset-button').addEventListener('click', resetButton)

function resetButton() {
  document.querySelector('.search-results').textContent = ""
}

document.querySelector('.search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  let searchContent = document.querySelector('#search-input').value
  findArtist(searchContent)
})
