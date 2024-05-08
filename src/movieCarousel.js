import { fetch_MovieData } from './movieFetchfile.js';

const container = document.querySelector(".container");
const carouselSlide = document.querySelector("div.carousel-sections");
const prevBtn = document.querySelector("div.prev-arrow");
const nextBtn = document.querySelector("div.next-arrow");

prevBtn.onclick = prev;
nextBtn.onclick = next;

let movieArr = await fetch_MovieData(1);
let currentIndex = 0;
let slides = [];


const render = () => {
    let offset = 0;

    slides.map((item, index) => {
        if (index < currentIndex) {
            offset += item.offsetWidth;
        }
    });

    carouselSlide.style.transform = `translateX(-${offset}px)`;

    const carouselSection = document.querySelectorAll(".carousel-section");
    const currentOverview = document.querySelectorAll(".overview");
        
    let itemStatus = [];

    carouselSection.forEach((item) => {
        item.addEventListener('mouseover', (event) => {
            event.preventDefault();
            let currentItem = event.target.parentNode;
            if (currentItem.classList.contains("active") == false) {
                currentItem.classList.add("active");
                let currentOverview = document.getElementsByClassName('overview') && document.getElementById(currentItem.id);
                if (currentOverview.classList.contains("hide") == true) currentOverview.classList.remove("hide");
            }
        });

        item.addEventListener('mouseout', (event) => {
            event.preventDefault();
            let currentItem = event.target.parentNode;
            if (currentItem.classList.contains("active") == true) {
                currentItem.classList.remove("active");
                let currentOverview = document.getElementsByClassName('overview') && document.getElementById(currentItem.id);
                if(currentOverview.classList.contains("hide") == false) currentOverview.classList.add("hide");
            }
        });
    });
}

const carouselItemInfo = (title, num) => {
    let findItem = document.getElementsByClassName('carousel-section') && document.getElementById(num);
    // let overview = document.createElement("div");
    // overview.classList.add("overview", "hide");
    // overview.setAttribute("id", `info__${num}`);
    // overview.innerHTML =
    //     `<span class='title'>${title}</span>
    //     <p class='description'>${description}</p>`;

    findItem.innerHTML = `<span class='overview hide' id=${num}>${title}</span>`;
}

const createCarouselItem = async () => {
        
    await movieArr.map((item, index) => {
        let carouselItem = document.createElement("div");
        carouselItem.classList.add('carousel-section');
        carouselItem.setAttribute("id", `${index + 1}`);
        let posterImg = document.createElement("img");
        posterImg.classList.add('poster');
        posterImg.setAttribute("src", `https://image.tmdb.org/t/p/w500${item.poster_path}`);
        carouselSlide.appendChild(carouselItem);
        carouselItem.appendChild(posterImg);

        carouselItemInfo(item.title, index + 1);
    });
}



const prev = () => {
    if (currentIndex < 0) return;
    currentIndex -= 1;
    render();
}

const next = () => {
    if (currentIndex === slides.length - 1) return;
    currentIndex += 1;
    render();
}

const goto = (newIndex) => {
    if (newIndex < 0 || newIndex > slides.length - 1) return;
    currentIndex = newIndex;
    render();
}

const init = () => {
    createCarouselItem();
    carouselItemInfo();
    render();
}

init();