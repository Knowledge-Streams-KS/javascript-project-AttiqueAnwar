async function getData() {
  let movieDetail = document.getElementById("movieData");
  console.log(movieDetail);
  movieDetail.innerHTML = "";

  let name = document.getElementById("movieTitle").value;
  let year = document.getElementById("movieYear").value;
  // console.log(movieTitle.value);
  // console.log(movieYear.value);

  const x = await fetch(`http://www.omdbapi.com/?s=${name}&apikey=9bc84dba`);
  const data = await x.json();
  // console.log(data);
  let searchData = await data["Search"];
  // console.log(searchData);
  if (year) {
    searchData = searchData.filter((m) => year <= m["Year"]);
  }
  searchData.forEach((element) => {
    movieDetail.insertAdjacentHTML("afterbegin",`<img class="imageSize" src=${element['Poster']}> <br>` + " Title: " + element['Title'] + "<br> Year: "+ element["Year"] + '<br><br>');
  });
}
