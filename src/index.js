// write your code here

function handleNewRamenForm(e) {
  // prevent default refresh behavior
  e.preventDefault();

  // access user form inputs
  const nameValue = document.querySelector("#new-name").value;
  const restaurantValue = document.querySelector("#new-restaurant").value;
  const imageValue = document.querySelector("#new-image").value;
  const ratingValue = document.querySelector("#new-rating").value;
  const commentValue = document.querySelector("#new-comment").value;

  //   append imageValue to ramen-menu/div
  document.querySelector("#ramen-menu").append(imageValue);

  //   clear form values upon submission
  e.target.reset();

  console.log({
    name: nameValue,
    restaurant: restaurantValue,
    image: imageValue,
    rating: ratingValue,
    comment: commentValue,
  });
}
function displayRamenInfo(ramen) {
  // manipulate dom
  document.querySelector(".detail-image").src = ramen.image;
  document.querySelector(".name").innerHTML = ramen.name;
  document.querySelector(".restaurant").innerHTML = ramen.restaurant;
  document.querySelector("#rating-display").innerHTML = ramen.rating;
  document.querySelector("#comment-display").innerHTML = ramen.comment;
}

function displayAllRamens(data) {
  // grab div to display images
  const ramenMenu = document.querySelector("#ramen-menu");

  //   iterate data/ramens
  data.forEach((ramen) => {
    // create img for each ramen
    const imgRamen = document.createElement("img");

    // manipulate dom
    imgRamen.src = ramen.image;
    ramenMenu.appendChild(imgRamen);

    // clicking a ramen image
    imgRamen.addEventListener("click", (e) => {
      displayRamenInfo(ramen);
    });
  });
}

function fetchRamens() {
  // fetch API - all
  fetch("http://localhost:3000/ramens")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // invoke upon receiving data
      displayAllRamens(data);
    })
    .catch((err) => {
      // fetch error
      console.log(err.message);
    });
}
function handleDOMContentLoaded(e) {
  // grab form
  const newRamenForm = document.querySelector("#new-ramen");

  //   invoke
  fetchRamens();

  //   creating new ramen
  newRamenForm.addEventListener("submit", (e) => {
    handleNewRamenForm(e);
  });
}

// wait HTML to load first
document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
