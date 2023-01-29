// Button Functionalities here
const titleButton = document.getElementById("search-by-title-button");
titleButton.addEventListener("click", getData);
const yearButton = document.getElementById("movieYear");
yearButton.addEventListener("keyup", getData);
// Onload Function to trigger local storage changes
window.onload = function () {
  let localData = localStorage.getItem("localData");
  if (localData) {
    let movieDetail = document.getElementById("movieData");
    movieDetail.innerHTML = localData;
  }
  sessionStorage.clear();
};
// Onbeforeunload function to unload
window.onbeforeunload = function () {
  let movieDetail = document.getElementById("movieData").innerHTML;
  localStorage.setItem("localData", movieDetail);
};
// Async functionalities
async function getData() {
  let movieDetail = document.getElementById("movieData");
  // console.log(movieDetail);
  movieDetail.innerHTML = "";
  let name = document.getElementById("movieTitle").value;
  let year = document.getElementById("movieYear").value;
  // console.log(movieTitle.value);
  // console.log(movieYear.value);
  if (!name) {
    return;
  }
  const x = await fetch(`http://www.omdbapi.com/?s=${name}&apikey=9bc84dba`);
  const data = await x.json();
  // console.log(data);
  let searchData = await data["Search"];
  // console.log(searchData);
  if (year) {
    searchData = searchData.filter((m) => year <= m["Year"]);
  }
  searchData.forEach((element) => {
    movieDetail.insertAdjacentHTML(
      "afterbegin",
      `<img class="imageSize" src=${element["Poster"]}> <br>` +
        " Title: " +
        element["Title"] +
        "<br> Year: " +
        element["Year"] +
        "<br><br>"
    );
  });
}
