document.addEventListener("DOMContentLoaded", () => {
    // Səhifəyə haradan gəlindiyini yoxlayırıq (?type=consultation)
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('type');

    // Əgər konsultasiyadan gəlinibsə, menyunu keçib birbaşa qeydiyyatı açırıq
    if (formType === 'consultation') {
        // 1. Menyu bloku gizlədilir, birbaşa qeydiyyat bölməsi açılır
        const modalMenu = document.getElementById("modalMenu");
        const regSection = document.getElementById("registrationSection");

        if (modalMenu) modalMenu.style.display = "none";
        if (regSection) regSection.style.display = "block";

        // 2. Başlıqları Konsultasiyaya uyğun olaraq dəyişirik
        // Sənin HTML-də qeydiyyat bölməsinin içindəki h2 və ya h3 teqini hədəf alırıq
        const regTitle = document.querySelector("#registrationSection h2") || document.querySelector("#registrationSection h3");
        const submitBtn = document.querySelector("#applyForm button[type='submit']") || document.querySelector("#applyForm .submit-btn");

        if (regTitle) regTitle.innerText = "Konsultasiya üçün Qeydiyyat";
        if (submitBtn) submitBtn.innerText = "Konsultasiya Görüşünü Təsdiqlə";

        // 3. Konsultasiya zamanı "Geri qayıt" düyməsi menyuya yox, birbaşa index.html-ə getsin
        document.querySelectorAll(".back-to-menu-btn").forEach(btn => {
            // Mövcud funksiyanı silmək üçün yeni bir klik hadisəsi əlavə edirik
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                window.location.href = "./index.html";
            });
        });
    } else {
        // Əgər normal gəlinibsə (Universitet müraciəti), sənin köhnə düymə məntiqlərin işləyir
        document.querySelectorAll(".back-to-menu-btn").forEach(btn => {
            btn.addEventListener("click", backToMenu);
        });
    }

    // Səhifələrarası keçidləri idarə etmək (Köhnə kodların)
    const openRegBtn = document.getElementById("openRegistrationBtn");
    if (openRegBtn) {
        openRegBtn.addEventListener("click", () => showSection('registration'));
    }

    const openInfoBtn = document.getElementById("openInfoBtn");
    if (openInfoBtn) {
        openInfoBtn.addEventListener("click", () => showSection('info'));
    }

    const closePageBtn = document.getElementById("closePageBtn");
    if (closePageBtn) {
        closePageBtn.addEventListener("click", () => {
            window.location.href = "./index.html";
        });
    }

    // Form Submit olunduqda
    const applyForm = document.getElementById("applyForm");
    if (applyForm) {
        applyForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("applyName").value;
            const time = document.getElementById("applyTime").value;

            // Bildiriş mesajını da gəldiyi yerə görə fərdiləşdiririk
            if (urlParams.get('type') === 'consultation') {
                alert(`Hörmətli ${name}, konsultasiya müraciətiniz qəbul olundu. Saat ${time} üçün görüş təyin edildi!`);
            } else {
                alert(`Hörmətli ${name}, universitet müraciətiniz qəbul olundu. Saat ${time} üçün görüş təyin edildi!`);
            }

            window.location.href = "./index.html";
        });
    }
});

function showSection(type) {
    const modalMenu = document.getElementById("modalMenu");
    const regSection = document.getElementById("registrationSection");
    const infoSection = document.getElementById("infoSection");

    if (modalMenu) modalMenu.style.display = "none";

    if (type === 'registration' && regSection) {
        regSection.style.display = "block";
    } else if (infoSection) {
        infoSection.style.display = "block";
    }
}

function backToMenu() {
    const modalMenu = document.getElementById("modalMenu");
    const regSection = document.getElementById("registrationSection");
    const infoSection = document.getElementById("infoSection");

    if (regSection) regSection.style.display = "none";
    if (infoSection) infoSection.style.display = "none";
    if (modalMenu) modalMenu.style.display = "block";
}