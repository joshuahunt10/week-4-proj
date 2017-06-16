//current progress: Can search for Thrice and click the Thrice word and it shows a song of theirs.
// TODO: be able to pass in a parameter to artistSongs. This will make it dynamic.  Also make the div clear so only the songs show.


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
        <div class="band-art">
          <img src="${bandAvatar}">
        </div>
        <div class="band-name">
          <p class="band-name-p">${bandName}</p>
        </div>
      `

{/* <p><a class="band-name-link" href = "https://api.soundcloud.com/users/${bandID}/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=${userSearch}">${bandName}</p></a> */}


      document.querySelector('.search-results').textContent = "";
      document.querySelector('.search-results').insertAdjacentHTML('afterbegin', htmlForm);

      document.querySelector('.band-name').addEventListener('click', artistSongs)
      // document.querySelector('.player').insertAdjacentHTML('afterbegin', htmlAudio);

    })

}

// document.querySelector('.band-name-link').addEventListener('click', function artistSongs(){
//   console.log('event listener added')
// })

function artistSongs(){
  // document.querySelector('.search-results').textContent = "Searching for... " + userSearch;
  fetch('https://api.soundcloud.com/users/211099306/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=thrice', {
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
      <div class="band-art">
        <img src="${albumArt}">
      </div>
      <div class="band-name">
        <p>${songTitle}</p>
      </div>
      `

      document.querySelector('.search-results').insertAdjacentHTML('afterbegin', htmlSongs);

  })
}

document.querySelector('.search-form').addEventListener('submit', function(event){
  event.preventDefault();
  let searchContent = document.querySelector('#search-input').value
  console.log(searchContent);
  findArtist(searchContent)
})
