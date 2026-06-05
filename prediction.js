const API_URL = "http://127.0.0.1:8000/api/universities";
let universities = [];

document.addEventListener("DOMContentLoaded", async () => {
    await fetchUniversities();
    setupEventListeners();
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
    } catch (error) {
        console.error("API işləmir, mock data yüklənir:", error);
        universities = [
            {
                name: "Technical University of Munich",
                city: "Munich", country: "Germany",
                tuition_usd_per_year: 0, language: "English",
                ielts_min: 6.5, gpa_min: 3.0, deadline: "15 İyul",
                website: "https://www.tum.de",
                scholarship_available: true,
                fields: ["Engineering", "Computer Science", "IT"]
            },
            {
                name: "MIT",
                city: "Cambridge", country: "USA",
                tuition_usd_per_year: 55000, language: "English",
                ielts_min: 7.5, gpa_min: 3.8, deadline: "1 Yanvar",
                website: "https://www.mit.edu",
                scholarship_available: true,
                fields: ["Computer Science", "Engineering", "Business"]
            },
            {
                name: "Sapienza University of Rome",
                city: "Rome", country: "Italy",
                tuition_usd_per_year: 1200, language: "English",
                ielts_min: 6.0, gpa_min: 2.5, deadline: "30 Aprel",
                website: "https://www.uniroma1.it",
                scholarship_available: true,
                fields: ["Medicine", "Computer Science", "Economics"]
            },
            {
                name: "University of Warsaw",
                city: "Warsaw", country: "Poland",
                tuition_usd_per_year: 2000, language: "English",
                ielts_min: 6.0, gpa_min: 2.7, deadline: "30 İyun",
                website: "https://www.uw.edu.pl",
                scholarship_available: false,
                fields: ["Economics", "Law", "Computer Science"]
            },
            {
                name: "National University of Singapore",
                city: "Singapore", country: "Singapore",
                tuition_usd_per_year: 17000, language: "English",
                ielts_min: 6.5, gpa_min: 3.5, deadline: "1 Mart",
                website: "https://www.nus.edu.sg",
                scholarship_available: true,
                fields: ["Engineering", "Business", "Computer Science"]
            }
        ];
    }
}

function setupEventListeners() {
    const predictionForm = document.getElementById("predictionForm");
    if (predictionForm) {
        predictionForm.addEventListener("submit", handlePrediction);
    }

    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "./index.html";
        });
    }
}

function handlePrediction(event) {
    event.preventDefault();

    const userGpa    = parseFloat(document.getElementById('gpa').value);
    const userIelts  = parseFloat(document.getElementById('ielts').value);
    const maxBudget  = parseFloat(document.getElementById('budget').value);
    const selectedField = document.getElementById('field').value;

    const resultsGrid    = document.getElementById('resultsGrid');
    const resultsSection = document.getElementById('resultsSection');

    const filteredUnis = universities.filter(uni => {
        const gpaCheck    = userGpa   >= uni.gpa_min;
        const ieltsCheck  = userIelts >= uni.ielts_min;
        const budgetCheck = uni.tuition_usd_per_year <= maxBudget;
        const fieldCheck  = uni.fields.some(f =>
            f.toLowerCase().includes(selectedField.toLowerCase()) ||
            selectedField.toLowerCase().includes(f.toLowerCase())
        );
        return gpaCheck && ieltsCheck && budgetCheck && fieldCheck;
    });

    resultsGrid.innerHTML = '';

    if (filteredUnis.length === 0) {
        resultsGrid.innerHTML = `
            <p class="no-results">
                <i class="fa-solid fa-triangle-exclamation"></i>
                Daxil etdiyiniz kriteriyalara uyğun universitet tapılmadı.
            </p>`;
    } else {
        filteredUnis.forEach(uni => {
            const card = document.createElement('div');
            card.className = 'uni-card';
            card.innerHTML = `
                <div class="uni-info">
                    <h3>${uni.name}</h3>
                    <p><i class="fa-solid fa-location-dot"></i> ${uni.city}, ${uni.country} &nbsp;|&nbsp; <i class="fa-solid fa-wallet"></i> $${uni.tuition_usd_per_year}/il</p>
                    <p style="margin-top:5px"><i class="fa-solid fa-language"></i> Dil: ${uni.language} (IELTS min: ${uni.ielts_min}) | GPA min: ${uni.gpa_min}</p>
                    <p style="margin-top:5px"><i class="fa-solid fa-calendar-days"></i> Son Tarix: ${uni.deadline}</p>
                    <a href="${uni.website}" target="_blank" class="uni-link">
                        Vebsayta keçid <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
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