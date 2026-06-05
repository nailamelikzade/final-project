const API_URL = "http://127.0.0.1:8000/api/universities";
let universities = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchUniversities();
    setupEventListeners();
    checkUrlParameters();

    const forecastCard = document.querySelector(".first");
    if (forecastCard) {
        forecastCard.addEventListener("click", () => {
            window.location.href = "./prediction.html";
        });
    }

    const applyCard = document.querySelector("#mainApplyCard");
    if (applyCard) {
        applyCard.addEventListener("click", () => {
            window.location.href = "./apply.html";
        });
    }

    const letterCard = document.querySelector(".letter");
    if (letterCard) {
        letterCard.addEventListener("click", () => {
            window.location.href = "./letter.html";
        });
    }

    const europeLink = document.querySelector(".europe");
    if (europeLink) {
        europeLink.addEventListener("click", () => {
            window.location.href = "./europe.html";
        });
    }

    const americaLink = document.querySelector(".america");
    if (americaLink) {
        americaLink.addEventListener("click", () => {
            window.location.href = "./america.html";
        });
    }
    const consultationLink = document.querySelector(".consultation");
    if (consultationLink) {
        consultationLink.addEventListener("click", (e) => {
            e.stopPropagation();
            window.location.href = "./consultation.html";
        })
    }

    const uk=document.getElementById("uk");
    if (uk) {
        uk.addEventListener("click",(e)=>{
            e.stopPropagation();
            window.location.href="./uk.html";
        })
    }

    const italia=document.getElementById("italia");
    if (italia) {
        italia.addEventListener("click",(e)=>{
            e.stopPropagation();
            window.location.href="./italia.html";
        })
    }
    
    const germany=document.getElementById("germany");
    if (germany) {
        germany.addEventListener("click",(e)=>{
            e.stopPropagation();
            window.location.href="./germany.html";
        })
    }

    const france=document.getElementById("france");
    if (france) {
        france.addEventListener("click",(e)=>{
            e.stopPropagation();
            window.location.href="./france.html"
        })
    }

    const sweden=document.getElementById("sweden");
    if (sweden) {
        sweden.addEventListener("click",(e)=>{
            e.stopPropagation();
            window.location.href="./sweden.html";
        })
    }

    const switzerland=document.getElementById("switzerland");
    if (switzerland) {
        switzerland.addEventListener("click",(e)=>{
            e.stopPropagation();
            window.location.href="./switzerland.html";
        })
    }

    const norway=document.getElementById("norway");
    if (norway) {
        norway.addEventListener("click",(e)=>{
            e.stopPropagation();
            window.location.href="./norway.html";
        })
    }

    const poland=document.getElementById("poland");
    if (poland) {
        poland.addEventListener("click",(e)=>{
            e.stopPropagation();
            window.location.href="./poland.html";
        })
    }

    const asia=document.querySelector(".asia");
    if (asia) {
        asia.addEventListener('click',(e)=>{
            e.stopPropagation();
            window.location.href="./asia.html";
        })
    }

    const southKorea=document.getElementById("south-korea");
    if (southKorea) {
        southKorea.addEventListener('click',(e)=>{
            e.stopPropagation();
            window.location.href="./south-korea.html";
        })
    }

    const japan=document.getElementById("japan");
    if (japan) {
        japan.addEventListener('click',(e)=>{
            e.stopPropagation();
            window.location.href="./japan.html";
        })
    }

    const china=document.getElementById("china");
    if (china) {
        china.addEventListener('click',(e)=>{
            e.stopPropagation();
            window.location.href="./china.html";
        })
    }

    const singapur=document.getElementById("singapur");
    if (singapur) {
        singapur.addEventListener('click',(e)=>{
            e.stopPropagation();
            window.location.href="./singapore.html";
        })
     }

     const about=document.getElementById("about");
        if(about){
            about.addEventListener("click",(e)=>{
                e.stopPropagation();
                window.location.href="./about.html";
            })
        }

    const contact=document.getElementById("contact");
    if(contact){
        contact.addEventListener("click",(e)=>{
            e.stopPropagation();
            window.location.href="./contact.html";
        })
    }
});


async function fetchUniversities() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error("Server cavab vermədi");

        const data = await response.json();

        if (Array.isArray(data)) {
            universities = data;
        } else if (data.universities && Array.isArray(data.universities)) {
            universities = data.universities;
        } else {
            const foundArray = Object.values(data).find(val => Array.isArray(val));
            if (foundArray) universities = foundArray;
        }
        console.log("Universitetlər uğurla yükləndi:", universities);
    } catch (error) {
        console.error("API-dən data çəkilə bilmədi, ehtiyat (mock) data yüklənir:", error);

        universities = [
            {
                name: "Technical University of Munich",
                city: "Munich",
                country: "Germany",
                tuition_usd_per_year: 0,
                language: "English",
                ielts_min: 6.5,
                gpa_min: 3.0,
                deadline: "15 İyul",
                website: "https://www.tum.de",
                scholarship_available: true,
                fields: ["Engineering", "Computer Science", "IT"]
            },
            {
                name: "MIT",
                city: "Cambridge",
                country: "USA",
                tuition_usd_per_year: 55000,
                language: "English",
                ielts_min: 7.5,
                gpa_min: 3.8,
                deadline: "1 Yanvar",
                website: "https://www.mit.edu",
                scholarship_available: true,
                fields: ["Computer Science", "Engineering", "Business"]
            },
            {
                name: "Sapienza University of Rome",
                city: "Rome",
                country: "Italy",
                tuition_usd_per_year: 1200,
                language: "English",
                ielts_min: 6.0,
                gpa_min: 2.5,
                deadline: "30 Aprel",
                website: "https://www.uniroma1.it",
                scholarship_available: true,
                fields: ["Medicine", "Computer Science", "Economics"]
            }
        ];
    }
}

function setupEventListeners() {
    const headerLogo = document.getElementById("headerLogo");
    if (headerLogo) {
        headerLogo.addEventListener("click", () => {
            window.location.href = "./index.html";
        });
    }

    const predictionForm = document.getElementById("predictionForm");
    if (predictionForm) {
        predictionForm.addEventListener("submit", handlePrediction);
    }

    const closeModalBtn = document.getElementById("closeModalBtn");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeApplyModal);
    }

    const openRegistrationBtn = document.getElementById("openRegistrationBtn");
    if (openRegistrationBtn) {
        openRegistrationBtn.addEventListener("click", () => showSection('registration'));
    }

    const openInfoBtn = document.getElementById("openInfoBtn");
    if (openInfoBtn) {
        openInfoBtn.addEventListener("click", () => showSection('info'));
    }

    const backButtons = document.querySelectorAll(".back-to-menu-btn");
    backButtons.forEach(btn => {
        btn.addEventListener("click", backToModalMenu);
    });

    const applyForm = document.getElementById("applyForm");
    if (applyForm) {
        applyForm.addEventListener("submit", handleApplySubmit);
    }
}

function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openModal') === 'true') {
        const applyModal = document.getElementById("applyModal");
        const modalMenu = document.getElementById("modalMenu");
        if (applyModal) applyModal.style.display = "flex";
        if (modalMenu) modalMenu.style.display = "block";
    }
}

function handlePrediction(event) {
    event.preventDefault();

    if (universities.length === 0) {
        alert("Universitet məlumatları hələ yüklənir, bir neçə saniyə gözləyin...");
        return;
    }

    const userGpa = parseFloat(document.getElementById('gpa').value);
    const userIelts = parseFloat(document.getElementById('ielts').value);
    const maxBudget = parseFloat(document.getElementById('budget').value);
    const selectedField = document.getElementById('field').value;

    const resultsGrid = document.getElementById('resultsGrid');
    const resultsSection = document.getElementById('resultsSection');

    const filteredUnis = universities.filter(uni => {
        const gpaCheck = userGpa >= uni.gpa_min;
        const ieltsCheck = userIelts >= uni.ielts_min;
        const budgetCheck = uni.tuition_usd_per_year <= maxBudget;
        const fieldCheck = uni.fields.some(f =>
            f.toLowerCase().includes(selectedField.toLowerCase()) ||
            selectedField.toLowerCase().includes(f.toLowerCase())
        );
        return gpaCheck && ieltsCheck && budgetCheck && fieldCheck;
    });

    resultsGrid.innerHTML = '';

    if (filteredUnis.length === 0) {
        resultsGrid.innerHTML = `<p class="no-results"><i class="fa-solid fa-triangle-exclamation"></i> Daxil etdiyiniz kriteriyalara uyğun universitet tapılmadı.</p>`;
    } else {
        filteredUnis.forEach(uni => {
            const card = document.createElement('div');
            card.className = 'uni-card';
            card.innerHTML = `
                <div class="uni-info">
                    <h3>${uni.name}</h3>
                    <p><i class="fa-solid fa-location-dot"></i> ${uni.city}, ${uni.country} | <i class="fa-solid fa-wallet"></i> $${uni.tuition_usd_per_year}/il</p>
                    <p style="margin-top: 5px;"><i class="fa-solid fa-language"></i> Dil: ${uni.language} (IELTS min: ${uni.ielts_min}) | GPA min: ${uni.gpa_min}</p>
                    <p style="margin-top: 5px;"><i class="fa-solid fa-calendar-days"></i> Son Tarix: ${uni.deadline}</p>
                    <a href="${uni.website}" target="_blank" class="uni-link">Vebsayta keçid <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>
                <div>
                    <span class="uni-badge">${uni.scholarship_available ? 'Təqaüd Var' : 'Təqaüdsüz'}</span>
                </div>
            `;
            resultsGrid.appendChild(card);
        });
    }

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function closeApplyModal() {
    const applyModal = document.getElementById("applyModal");
    if (applyModal) {
        applyModal.style.display = "none";
        backToModalMenu();
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }
}

function showSection(sectionType) {
    const modalMenu = document.getElementById("modalMenu");
    const regSection = document.getElementById("registrationSection");
    const infoSection = document.getElementById("infoSection");

    if (modalMenu) modalMenu.style.display = "none";
    if (sectionType === 'registration' && regSection) regSection.style.display = "block";
    else if (sectionType === 'info' && infoSection) infoSection.style.display = "block";
}

function backToModalMenu() {
    const regSection = document.getElementById("registrationSection");
    const infoSection = document.getElementById("infoSection");
    const modalMenu = document.getElementById("modalMenu");

    if (regSection) regSection.style.display = "none";
    if (infoSection) infoSection.style.display = "none";
    if (modalMenu) modalMenu.style.display = "block";
}

function handleApplySubmit(event) {
    event.preventDefault();
    const name = document.getElementById("applyName").value;
    const time = document.getElementById("applyTime").value;

    alert(`Hörmətli ${name}, qeydiyyatınız saat ${time} üçün uğurla tamamlandı!`);
    closeApplyModal();
    const applyForm = document.getElementById("applyForm");
    if (applyForm) applyForm.reset();
}