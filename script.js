//Función para que el boton del inicio nos lleve al Top
function scrollToElement(onclick) {
  var Top = document.querySelector(onclick);
  Top.scrollIntoView({ behavior: 'smooth' });
}

// Document has been loaded

$(document).ready(function() {
  // Helper Function to Extract Access Token for URL
  const getUrlParameter = (sParam) => {
    let sPageURL = window.location.search.substring(1),////substring will take everything after the https link and split the #/&
      sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
      sParameterName,
      i;
    let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
    sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  };

  // Get Access Token
  const accessToken = getUrlParameter('access_token');

  // AUTHORIZE with Spotify (if needed)
  // *************** REPLACE THESE VALUES! *************************
  let client_id = '247bec6ebb784ad2b63aaf2f9a6f2c15';
  // Use the following site to convert your regular url to the encoded version:
  // https://www.url-encode-decode.com/
  let redirect_uri = 'https://proyecto-x.melany-paola-ba.repl.co/'; // GitHub Pages URL or whatever your public url to this app is
  // *************** END *************************

  const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
  // Don't authorize if we have an access token already
  if (accessToken == null || accessToken == "" || accessToken == undefined) {
    window.location.replace(redirect);
  }

  // CHICAS AQUI EMPIEZO A CONSUMIR LA API CON LO QUE APRENDIMOS(AJAX)

  $("#btn-buscar").click(function() {

    var cancion = $("#buscador").val()
    let search_query = encodeURI(cancion);
    console.log(cancion)
    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${cancion}&type=track`, //reemplazar song por palabra a buscar

      type: 'GET',

      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: function(data) {

        let num_of_tracks = data.tracks.items.length;
        let count = 0;
        // Max number of songs is 12
        const max_songs = 12;
        while (count < max_songs && count < num_of_tracks) {

          console.log(data.tracks.items[count])

          var id = data.tracks.items[count].id
          var spotifyPlayerDiv = $(".spotify-player");
          var iframe = $("<iframe></iframe>")
          iframe.attr("src", `https://open.spotify.com/embed/track/${id}`)
          iframe.attr("allow", "encrypted-media");
          iframe.attr("frameborder", "0")
          iframe.attr("allowtransparency", "true")
          spotifyPlayerDiv.append(iframe);
          count++;
        }
      }
    }); // End of Spotify ajax call
  });
  //aqui
})