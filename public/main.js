// http://www.omdbapi.com/?apikey=key&t=title

const movieList = document.getElementById("movies");
const button = document.getElementById("button");
const exit = document.getElementById("exit");
const favorite = document.getElementById("favorite")

button.onclick = function(){
  movieList.innerHTML = ""
  const key = "dfaeb3ef"
  let search = document.getElementById("input").value;
  fetch('http://www.omdbapi.com/?apikey=' + key + '&s=' + search)
    .then(response => response.json())
    .then(data => {
      results = data.Search
      for (var i = 0; i < results.length; i++) {
        // console.log(results[i])
        item = document.createElement('p')
        item.innerHTML = results[i].Title
        item.onmouseover = function() {
          this.style.color = "blue";
          this.style.cursor = "pointer"
        }
        item.onmouseout = function() {
          this.style.color = "black";
          this.style.cursor = "auto"
        }

        movieList.appendChild(item)

        item.onclick = function(e){
          let movieTitle = this.innerHTML
          fetch('http://www.omdbapi.com/?apikey=' + key + '&t=' + movieTitle)
          .then(response => response.json())
          .then(data => {
            results = data
            console.log(results)
            let detailsPoster = document.getElementById("movie-poster")
            detailsPoster.src = results.Poster

            let detailsTitle = document.getElementById("movie-title")
            detailsTitle.innerHTML = results.Title

            let detailsYear = document.getElementById("movie-year")
            detailsYear.innerHTML = results.Year

            let detailsPlot = document.getElementById("movie-plot")
            detailsPlot.innerHTML = results.Plot

            let oid = results.imdbID

            document.getElementById("movies").style.backgroundColor = "lightgray"
            document.getElementById("movie-details-section").style.display = "block";

            favorite.onclick = function(){
              fetch("http://localhost:4567/favorites?name=" + movieTitle + "&oid=" + oid, {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json',
                   },
              }).then((response) => response.text())
                .then((responseText) => {
                  console.log(responseText);
                })
            }
          });
        }
      }
    });
}


exit.onclick = function() {
  document.getElementById("movie-details-section").style.display = "none";
  document.getElementById("movies").style.backgroundColor = "white"

}







