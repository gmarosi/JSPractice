const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageArr = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg",];
/* Declaring the alternative text for each image file */
const altArr = ["eye", "rock", "flowers", "tomb", "butterfly",];

/* Looping through images */
for(let i = 0; i < imageArr.length; i++) {
    path = `./images/${imageArr[i]}`;
    const newImage = document.createElement('img');
    newImage.setAttribute('src', path);
    newImage.setAttribute('alt', altArr[i]);
    thumbBar.appendChild(newImage);
}

thumbBar.addEventListener("click", (e) => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
});

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", (e) => {
    if(e.target.getAttribute("class") === "dark") {
        e.target.setAttribute("class", "light");
        e.target.innerText = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    }
    else if(e.target.getAttribute("class") === "light") {
        e.target.setAttribute("class", "dark");
        e.target.innerText = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
});
