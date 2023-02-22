// Unsplash API 
// keep keys confidental
// https://unsplash.com/documentation#get-a-random-photo 

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById('loader');

let ready = false; 
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const apiKey = "";
const count = 10;

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// check if all images were loaded 
function imageLoaded(){
    console.log("loaded image");
    imagesLoaded++;
    if (imagesLoad == totalImages) {
        ready = true;
        console.log('read = ', ready);
    }
}

//Helper function 

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and photos than add to DOM 
function displayPhotos(){
    totalImages = photosArray.length;
    console.log(totalImages);

    photosArray.forEach((photo => {
        //create <a> elemnt to link to unsplah
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        
        //create <img> for photo 
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.url.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });


        //Put <img> inside <a> , then put both into container elements 
        item.appendChild(img);
        imageContainer.appendChild(item);
    }));
}
// Event listener - check when each is finished loaded
img.addEventListener('load', imageLoad);

//Get photos from Unsplash 
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos(); 
    } catch (err) {
        //catch err here
    }
}


// On Load 
getPhotos();


//scroll event interesting 
//check if scrolling near bottom of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false; 
        getPhotos();
    }
})
