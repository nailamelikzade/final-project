const API_URL = "https://final-project-e6ga.onrender.com/api/universities";
let universities = [];

// Səhifə yüklənəndə API-dan dataları çəkirik
document.addEventListener("DOMContentLoaded", async () => {
    await fetchUniversities();
    setupEventListeners();
});

// Serverdən məlumatları gətirən funksiya
async function fetchUniversities() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Server cavab vermədi");
        const data = await response.json();

        // API-dan gələn datanın strukturunu yoxlayırıq və massivi tapırıq
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
        // API-da problem olarsa layihənin çökməməsi üçün ehtiyat (mock) data
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

// Event Listener-ləri quraşdıran funksiya
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

// Proqnozlaşdırma düyməsi sıxılanda işləyən əsas məntiq
function handlePrediction(event) {
    event.preventDefault();
    console.log("Filtrlənən Universitetlər:", universities); 

    // İstifadəçinin formda daxil etdiyi dəyərlər
    const userGpa = parseFloat(document.getElementById('gpa').value);
    const userIelts = parseFloat(document.getElementById('ielts').value);
    const maxBudget = parseFloat(document.getElementById('budget').value);
    const selectedField = document.getElementById('field').value;

    const resultsGrid = document.getElementById('resultsGrid');
    const resultsSection = document.getElementById('resultsSection');

    // Filtrləmə prosesi
    const filteredUnis = universities.filter(uni => {
        // API-dən gələn fərqli açar sözləri və string-rəqəm tiplərini sığortalayırıq
        const uniGpa = parseFloat(uni.gpa_min || uni.gpa || 0);
        const uniIelts = parseFloat(uni.ielts_min || uni.ielts || 0);
        const uniTuition = parseFloat(uni.tuition_usd_per_year !== undefined ? uni.tuition_usd_per_year : (uni.tuition || 0));

        // Şərtlərin yoxlanılması
        const gpaCheck = userGpa >= uniGpa;
        const ieltsCheck = userIelts >= uniIelts;
        const budgetCheck = uniTuition <= maxBudget;

        // Əgər obyektdə fields sahəsi yoxdursa, xəta verməməsi üçün boş massiv təyin edirik
        const uniFields = uni.fields || [];
        
        // İxtisas uyğunluğunun hərfi-hərfə yoxlanılması (Böyük-kiçik və "İ" hərfi problemi həlli)
        const fieldCheck = uniFields.some(f => {
    const uniField = f.toLowerCase()
        .replace(/ı/g, 'i').replace(/İ/g, 'i')
        .replace(/ə/g, 'e').replace(/ş/g, 's')
        .replace(/ğ/g, 'g').replace(/ü/g, 'u')
        .replace(/ö/g, 'o').replace(/ç/g, 'c');
    
    const userField = selectedField.toLowerCase();

    const mapping = {
        'computer science': ['komputer', 'informatika', 'bilisim', 'computer', 'it'],
        'engineering':      ['muhendislik', 'texniki', 'engineering', 'politexnik'],
        'business':         ['biznes', 'menecment', 'iqtisadiyyat', 'mba', 'business'],
        'medicine':         ['tibb', 'medicine', 'biologiya', 'saglamliq']
    };

    const keywords = mapping[userField] || [userField];
    return keywords.some(kw => uniField.includes(kw));
});

        // Bütün şərtlər ödənməlidir
        return gpaCheck && ieltsCheck && budgetCheck && fieldCheck;
    });

    // Əvvəlki nəticələri təmizləyirik
    resultsGrid.innerHTML = '';

    // Ekrana çıxarma (Render) məntiqi
    if (filteredUnis.length === 0) {
        resultsGrid.innerHTML = `
            <p class="no-results">
                <i class="fa-solid fa-triangle-exclamation"></i>
                Daxil etdiyiniz kriteriyalara uyğun universitet tapılmadı.
            </p>`;
    } else {
        filteredUnis.forEach(uni => {
            // Datanın daxilindəki alternativ və ya boş qala biləcək sahələri nizamlayırıq
            const tuition = uni.tuition_usd_per_year !== undefined ? uni.tuition_usd_per_year : (uni.tuition || 0);
            const language = uni.language || "İngilis";
            const deadline = uni.deadline || "Məlum deyil";
            const website = uni.website || "#";
            const isScholarship = uni.scholarship_available || uni.scholarship || false;

            const card = document.createElement('div');
            card.className = 'uni-card';
            card.innerHTML = `
                <div class="uni-info">
                    <h3>${uni.name}</h3>
                    <p><i class="fa-solid fa-location-dot"></i> ${uni.city || ''}, ${uni.country || ''} &nbsp;|&nbsp; <i class="fa-solid fa-wallet"></i> $${tuition}/il</p>
                    <p style="margin-top:5px"><i class="fa-solid fa-language"></i> Dil: ${language} (IELTS min: ${uni.ielts_min || uni.ielts}) | GPA min: ${uni.gpa_min || uni.gpa}</p>
                    <p style="margin-top:5px"><i class="fa-solid fa-calendar-days"></i> Son Tarix: ${deadline}</p>
                    <a href="${website}" target="_blank" class="uni-link">
                        Vebsayta keçid <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
                <div>
                    <span class="uni-badge">${isScholarship ? 'Təqaüd Var' : 'Təqaüdsüz'}</span>
                </div>
            `;
            resultsGrid.appendChild(card);
        });
    }

    // Nəticələr hissəsini görünən edirik və səhifəni ora sürüşdürürük
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}