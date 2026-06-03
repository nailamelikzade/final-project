// document.addEventListener("DOMContentLoaded", () => {
    const gradPhoto = document.querySelector(".grad-photo");
    const travelPhoto = document.querySelector(".travel-photo");
    
    // Brauzerin render prosesini gözləmək üçün kiçik bir timeout (gecikmə) qoyuruq
    setTimeout(() => {
        gradPhoto.classList.add("active");
        travelPhoto.classList.add("active");
    }, 100);
// });
