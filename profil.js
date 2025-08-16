//loading
let dots = ["●", "●●", "●●●"];
let index = 0;
function animasiLoading(){
    document.getElementById("dots").textContent = dots[index];
    index = (index + 1) % dots.length;
}
let dotsInterval = setInterval (animasiLoading, 500);


let loadedCount = 0;
let totalImages = 0;

function checkAllImagesLoaded() {
    if (loadedCount === totalImages) {
        clearInterval(dotsInterval);
        document.getElementById("loading-screen").classList.add("hidden");
        document.getElementById("content").classList.add("visible");
    }
}


//for JSON
const parameter = new URLSearchParams(window.location.search);
const charID = parameter.get("id");

fetch("data-karakter.json")
    .then(res => res.json())
    .then(data => {
        const karakter = data.find (k => k.id === charID);
   

        if(!karakter){
            document.body.innerHTML = "<h1>Karakter tidak ditemukan</h1>";
            return;
        }

        document.getElementById("title-page").textContent = karakter.title;
        document.getElementById("char-name").textContent = karakter.nama;
        document.getElementById("anime-name").textContent = karakter.anime;
        document.getElementById("banner-img").src = karakter.mainBanner;
        document.getElementById("banner-img").alt = `Foto ${karakter.nama}`;

        document.getElementById("name-jepang").textContent = karakter.namaJepang;
        document.getElementById("nama").textContent = karakter.namaBiodata;
        document.getElementById("pekerjaan").textContent = karakter.pekerjaan;
        document.getElementById("umur").textContent = karakter.umur;
        document.getElementById("bintang").textContent = karakter.bintang;
        document.getElementById("tinggi").textContent = karakter.tinggi;
        document.getElementById("bb").textContent = karakter.bb;
        document.getElementById("story-text").textContent = karakter.story;
        document.getElementById("main-photo").src = karakter.fotoCenter;
        document.getElementById("main-photo-two").src = karakter.fotoCenterTwo;

        const container = document.getElementById("image-container");
            karakter.slideshow.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = `Foto ${karakter.nama}`;
                img.classList.add("side-bar-photo");
                img.loading = "lazy";
                container.appendChild(img);
                
        });
        const allImages = document.querySelectorAll("img");
        totalImages = allImages.length;

            allImages.forEach(img => {
                img.addEventListener("load", () => {
                    loadedCount++;
                    checkAllImagesLoaded();
                });
                img.addEventListener("error", () => {
                    loadedCount++;
                    checkAllImagesLoaded();
                });
            });

        initSlideshow();
    })
    .catch(err => {
        console.error("Gagal memuat gambar: ", err);
        document.body.innerHTML = "<h1>Terjadi kesalahan memuat data</h1>";

    });

    function initSlideshow(){
        const container = document.getElementById('image-container');
        const images = container.querySelectorAll('.side-bar-photo');
        let currentIndex = 0;
        let direction = 1;

        function scrolltoImage(index){
            if (index >= 0 && index <images.length){
                const image = images[index];
                container.scrollLeft = image.offsetLeft - container.offsetLeft;
                currentIndex = index;
            
            }
        }

        document.getElementById('scroll-left').addEventListener('click', () => {
            scrolltoImage(currentIndex - 1);   
        }
        );

        document.getElementById('scroll-right').addEventListener('click', () => {
            scrolltoImage(currentIndex + 1);
        }
        );

        setInterval(() =>{
            if (currentIndex + direction >= images.length || currentIndex + direction < 0){
                direction *= -1;
            }
            scrolltoImage(currentIndex + direction);
        }, 4000);

    }

    