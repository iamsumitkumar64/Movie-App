// // const popularApi = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
// const searchApi = 'https://api.themoviedb.org/3/search/movie';
const popularApi = 'https://online-movie-database.p.rapidapi.com/title/v2/get-popular?first=40&country=US&language=en-US';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-rapidapi-key': '9509987347msh5920d332a81283ep115dd0jsn70b716b8b1fa',
    'x-rapidapi-host': 'online-movie-database.p.rapidapi.com'
  }
};

let apiUrl;
async function movie(searchName) {
  try {
    if (searchName === '') {
      apiUrl = popularApi;
    } else {
      apiUrl = `https://online-movie-database.p.rapidapi.com/v2/search?searchTerm=${searchName}&first=40&country=US&language=en-US`;
      // apiUrl=`https://online-movie-database.p.rapidapi.com/v2/search?searchTerm=${searchName}&first=40`;
    }
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    console.log('API Response:', data);
    show(data);
  } catch (error) {
    document.getElementById("box").innerHTML = "An error occurred while fetching data.";
    console.error('Fetch error:', error);
  }
}

function getinput() {
  const searchName = document.getElementById('sear_opt').value.trim();
  movie(searchName);
}

let show = (data) => {
  console.log('function received:', data);
  const box = document.getElementById("box");
  if (!box) {
    console.error('Box element not found');
    return;
  }
  box.innerHTML = "";

  if (apiUrl == popularApi) {
    const movie = data.data?.movies?.edges;
    const tv = data.data?.tv?.edges;
    if (!movie.length && !tv.length) {
      box.innerHTML = "No results found";
      return;
    }
    if (movie.length) {
      let titleMovies = document.createElement("p");
      titleMovies.textContent = "Popular Movies";
      titleMovies.className = 'title';
      box.appendChild(titleMovies);
      create(movie);
    }

    if (tv.length) {
      let titleTV = document.createElement("p");
      titleTV.textContent = "Popular TV Series";
      titleTV.className = 'title';
      box.appendChild(titleTV);
      create(tv);
    }
  }
  else {
    const search = data.data?.mainSearch?.edges;
    // if (search.length) {
      let titlesearch = document.createElement("p");
      titlesearch.textContent = "As You Browsed";
      titlesearch.className = 'title';
      box.appendChild(titlesearch);
      create(search);
    // }
  }
}

function create(results) {
  let div = document.createElement("div");
  div.setAttribute("style", "display:flex;flex-wrap:wrap; justify-content:space-around;");
  results.forEach(edge => {
    let element;
    if (apiUrl == popularApi) {
      element = edge.node;
    }
    else {
      element =edge.node.entity;
    }
    let search_img = document.createElement("img");
    search_img.src = element.primaryImage?.url || 'https://via.placeholder.com/300x450';
    search_img.loading = "lazy";
    search_img.setAttribute("style", "border: 2px solid #4A90E2; width: 21vmax; height: auto; border-radius: 1vmax;");

    let search_div = document.createElement("div");
    search_div.id = "movie";
    search_div.setAttribute("style", "width: 21vmax; height: auto; border: 2px solid #4A90E2; display: flex; flex-direction: column; align-items: center; margin: 1vmax; border-radius: 1vmax; background-color: #333; position: relative;");

    search_div.appendChild(search_img);

    let title = document.createElement("p");
    title.textContent = element.titleText?.text || 'No Title';
    title.setAttribute("style", "font-weight: bold; font-size: 1.8vmax; color: #FFD700;");

    let year = document.createElement("p");
    year.textContent = `Year: ${element.releaseYear?.year || 'N/A'}`;
    year.setAttribute("style", "font-size: 1.4vmax; font-weight: bold; color: #EAEAEA;");

    let rate = document.createElement("p");
    rate.textContent = `Rating: ${element.ratingsSummary?.aggregateRating || 'N/A'}`;
    rate.setAttribute("style", "font-size: 1.4vmax; font-weight: bold; color: #EAEAEA;");

    let adult = document.createElement("p");
    adult.textContent = `Type: ${element.contentType?.displayableProperty?.value?.plainText || 'N/A'}`;
    adult.setAttribute("style", "font-size: 1.4vmax; font-weight: bold; color: #EAEAEA;");

    let overview = document.createElement("p");
    overview.textContent = element.plot?.plotText?.plainText || 'No description available';
    overview.id = "overview";
    overview.setAttribute("style", "font-size: 1.5vmax; font-weight: bold; position: absolute; bottom: 0; left: 0; overflow: scroll; color:rgb(255, 255, 255);");

    search_div.appendChild(title);
    search_div.appendChild(adult);
    search_div.appendChild(year);
    search_div.appendChild(rate);
    search_div.appendChild(overview);

    div.appendChild(search_div);
  });
  box.appendChild(div);
}

document.addEventListener('DOMContentLoaded', () => {
  getinput();
  //document.getElementById('sear_opt').addEventListener("input", getinput);
});
