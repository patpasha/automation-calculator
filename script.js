// Variables globales
let currentLanguage = 'fr';

// Dictionnaire de traductions
const translations = {
    fr: {
        title: "Calculateur d'Automatisation",
        description: "Cet outil vous aide à déterminer si l'automatisation d'une tâche vaut l'investissement en temps.",
        taskTimeLabel: "Temps par tâche manuelle",
        taskTimeDescription: "Le temps moyen nécessaire pour effectuer la tâche une seule fois :",
        frequencyLabel: "Fréquence d'exécution",
        frequencyDescription: "Combien de fois effectuez-vous cette tâche :",
        perDay: "par jour",
        perWeek: "par semaine",
        perMonth: "par mois",
        automationTimeLabel: "Temps d'automatisation",
        automationTimeDescription: "Le temps nécessaire pour automatiser cette tâche :",
        hourlyRateLabel: "Taux horaire",
        hourlyRateDescription: "Votre taux horaire pour calculer les économies monétaires :",
        calculateButton: "Calculer",
        resetButton: "Réinitialiser",
        resultTitle: "Résultat",
        recommendedTitle: "Automatisation Recommandée",
        notRecommendedTitle: "Automatisation Non Recommandée",
        dailySavingsLabel: "Économie quotidienne :",
        automationTimeResultLabel: "Temps d'automatisation :",
        breakEvenLabel: "Seuil de rentabilité :",
        breakEvenDateLabel: "Date de rentabilité :",
        yearlySavingsLabel: "Économie annuelle :",
        minutesUnit: "minutes",
        secondsUnit: "secondes",
        hoursUnit: "heures",
        daysUnit: "jours",
        and: "et",
        ofWork: "de travail",
        moreThanYear: "(plus d'un an)",
        considerOtherOptions: "Envisagez d'autres options ou de simplifier la tâche avant d'automatiser.",
        fillAllFields: "Veuillez remplir tous les champs.",
        taskTimeInput: "0",
        frequencyInput: "10",
        automationTimeInput: "2",
        hourlyRateInput: "25€",
        moneySavingsLabel: "Économies monétaires :",
        monthlySavingsLabel: "Par mois :",
        yearlySavingsMoneyLabel: "Par an :",
        currencyUnit: "€"
    },
    en: {
        title: "Automation Calculator",
        description: "This tool helps you determine if automating a task is worth the time investment.",
        taskTimeLabel: "Time per manual task",
        taskTimeDescription: "The average time needed to perform the task once:",
        frequencyLabel: "Execution frequency",
        frequencyDescription: "How often do you perform this task:",
        perDay: "per day",
        perWeek: "per week",
        perMonth: "per month",
        automationTimeLabel: "Automation time",
        automationTimeDescription: "The time needed to automate this task:",
        hourlyRateLabel: "Hourly rate",
        hourlyRateDescription: "Your hourly rate to calculate monetary savings:",
        calculateButton: "Calculate",
        resetButton: "Reset",
        resultTitle: "Result",
        recommendedTitle: "Automation Recommended",
        notRecommendedTitle: "Automation Not Recommended",
        dailySavingsLabel: "Daily savings:",
        automationTimeResultLabel: "Automation time:",
        breakEvenLabel: "Break-even point:",
        breakEvenDateLabel: "Break-even date:",
        yearlySavingsLabel: "Yearly savings:",
        minutesUnit: "minutes",
        secondsUnit: "seconds",
        hoursUnit: "hours",
        daysUnit: "days",
        and: "and",
        ofWork: "of work",
        moreThanYear: "(more than a year)",
        considerOtherOptions: "Consider other options or simplifying the task before automating.",
        fillAllFields: "Please fill in all fields.",
        taskTimeInput: "0",
        frequencyInput: "10",
        automationTimeInput: "2",
        hourlyRateInput: "$25",
        moneySavingsLabel: "Monetary savings:",
        monthlySavingsLabel: "Per month:",
        yearlySavingsMoneyLabel: "Per year:",
        currencyUnit: "$"
    }
};

// Éléments du DOM
let taskTimeMinutesInput;
let taskTimeSecondsInput;
let frequencyInput;
let frequencyUnitSelect;
let automationTimeHoursInput;
let automationTimeMinutesInput;
let hourlyRateInput;
let calculateBtn;
let resetBtn;
let resultDiv;
let resultText;
let breakEvenDate;
let languageSwitch;

// Fonction pour formater la monnaie selon la langue
function formatMoney(amount) {
    const currency = currentLanguage === 'fr' ? '€' : '$';
    return amount.toFixed(2) + ' ' + currency;
}

// Fonction pour appliquer les traductions
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            el.textContent = translations[currentLanguage][key];
        }
    });
    
    // Mettre à jour les options du sélecteur de fréquence
    const frequencyOptions = frequencyUnitSelect.querySelectorAll('option');
    frequencyOptions.forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            option.textContent = translations[currentLanguage][key];
        }
    });
    
    // Mettre à jour les placeholders des champs de saisie
    taskTimeMinutesInput.placeholder = translations[currentLanguage].taskTimeInput;
    taskTimeSecondsInput.placeholder = translations[currentLanguage].taskTimeInput;
    frequencyInput.placeholder = translations[currentLanguage].frequencyInput;
    automationTimeHoursInput.placeholder = translations[currentLanguage].automationTimeInput;
    automationTimeMinutesInput.placeholder = translations[currentLanguage].automationTimeInput;
    hourlyRateInput.placeholder = currentLanguage === 'fr' ? "25€" : "$25";
    
    // Mettre à jour le titre de la page
    document.title = translations[currentLanguage].title;
}

// Fonction pour calculer le ROI
function calculateROI() {
    // Récupérer les valeurs du formulaire
    const taskTimeMinutes = parseFloat(taskTimeMinutesInput.value) || 0;
    const taskTimeSeconds = parseFloat(taskTimeSecondsInput.value) || 0;
    const taskTimeInMinutes = taskTimeMinutes + (taskTimeSeconds / 60);
    
    const frequency = parseFloat(frequencyInput.value) || 0;
    const frequencyUnit = frequencyUnitSelect.value;
    
    // Convertir la fréquence en base quotidienne
    let dailyFrequency = frequency;
    if (frequencyUnit === 'weekly') {
        dailyFrequency = frequency / 5; // 5 jours ouvrés par semaine
    } else if (frequencyUnit === 'monthly') {
        dailyFrequency = frequency / 20; // 20 jours ouvrés par mois
    }
    
    const automationTimeHours = parseFloat(automationTimeHoursInput.value) || 0;
    const automationTimeMinutes = parseFloat(automationTimeMinutesInput.value) || 0;
    const automationTime = automationTimeHours + (automationTimeMinutes / 60);
    
    const hourlyRate = parseFloat(hourlyRateInput.value) || 0;

    if (!taskTimeInMinutes || !frequency || !automationTime || !hourlyRate) {
        alert(translations[currentLanguage].fillAllFields);
        return;
    }
    
    // Conversion en minutes
    const automationTimeInMinutes = automationTime * 60;
    const dailySavings = taskTimeInMinutes * dailyFrequency;
    const daysToBreakEven = Math.ceil(automationTimeInMinutes / dailySavings);

    resultDiv.classList.remove('hidden');
    
    // Calcul des économies annuelles en jours/heures/minutes
    const yearlyMinutesSaved = dailySavings * 260; // 260 jours ouvrés par an
    const yearlyDaysSaved = Math.floor(yearlyMinutesSaved / (60 * 8)); // 8 heures par jour
    const yearlyHoursSaved = Math.floor((yearlyMinutesSaved - (yearlyDaysSaved * 60 * 8)) / 60);
    const yearlyMinutesRemaining = Math.round(yearlyMinutesSaved - (yearlyDaysSaved * 60 * 8) - (yearlyHoursSaved * 60));
    
    // Formatage des valeurs pour l'affichage
    const formattedDailySavings = dailySavings.toFixed(1);
    const formattedAutomationTime = automationTimeInMinutes.toFixed(0);
    
    // Calcul des économies monétaires
    const dailyMoneySavings = (dailySavings / 60) * hourlyRate;
    const monthlyMoneySavings = dailyMoneySavings * 20; // 20 jours ouvrés par mois
    const yearlyMoneySavings = dailyMoneySavings * 260; // 260 jours ouvrés par an
    
    // Formatage des valeurs monétaires
    const formattedDailyMoneySavings = formatMoney(dailyMoneySavings);
    const formattedMonthlyMoneySavings = formatMoney(monthlyMoneySavings);
    const formattedYearlyMoneySavings = formatMoney(yearlyMoneySavings);

    const t = translations[currentLanguage]; // Raccourci pour les traductions
    
    // Déterminer si l'automatisation est recommandée (seuil de rentabilité < 1 an)
    const isRecommended = daysToBreakEven <= 260;
    
    // Construire le texte de résultat
    let resultHTML = `<h3 class="text-lg font-bold ${isRecommended ? 'text-green-600' : 'text-red-600'}">${isRecommended ? t.recommendedTitle : t.notRecommendedTitle}</h3>`;
    
    resultHTML += `<p class="mt-2"><strong>${t.dailySavingsLabel}</strong> ${formattedDailySavings} ${t.minutesUnit}</p>`;
    resultHTML += `<p><strong>${t.automationTimeResultLabel}</strong> ${formattedAutomationTime} ${t.minutesUnit}</p>`;
    resultHTML += `<p><strong>${t.breakEvenLabel}</strong> ${daysToBreakEven} ${t.daysUnit}</p>`;
    
    // Économies annuelles
    resultHTML += `<p class="mt-2"><strong>${t.yearlySavingsLabel}</strong> `;
    if (yearlyDaysSaved > 0) {
        resultHTML += `${yearlyDaysSaved} ${t.daysUnit} `;
    }
    if (yearlyHoursSaved > 0) {
        resultHTML += `${yearlyHoursSaved} ${t.hoursUnit} `;
    }
    if (yearlyMinutesRemaining > 0 || (yearlyDaysSaved === 0 && yearlyHoursSaved === 0)) {
        resultHTML += `${yearlyMinutesRemaining} ${t.minutesUnit} `;
    }
    resultHTML += `${t.ofWork}</p>`;
    
    resultText.innerHTML = resultHTML;
    
    // Afficher la date de rentabilité
    const today = new Date();
    if (daysToBreakEven > 365) {
        breakEvenDate.innerHTML = `<p><strong>${t.breakEvenDateLabel}</strong> ${t.moreThanYear}</p>`;
        if (!isRecommended) {
            breakEvenDate.innerHTML += `<p class="text-red-600">${t.considerOtherOptions}</p>`;
        }
    } else {
        const breakEvenDateObj = new Date(today);
        breakEvenDateObj.setDate(today.getDate() + daysToBreakEven);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        breakEvenDate.innerHTML = `<p><strong>${t.breakEvenDateLabel}</strong> ${breakEvenDateObj.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', options)}</p>`;
    }
    
    // Afficher les économies monétaires
    const moneySavings = document.getElementById('moneySavings');
    let moneySavingsHTML = `<h3 class="text-lg font-bold mt-3">${t.moneySavingsLabel}</h3>`;
    moneySavingsHTML += `<p class="mt-1">${t.dailySavingsLabel} ${formattedDailyMoneySavings}</p>`;
    moneySavingsHTML += `<p>${t.monthlySavingsLabel} ${formattedMonthlyMoneySavings}</p>`;
    moneySavingsHTML += `<p>${t.yearlySavingsMoneyLabel} ${formattedYearlyMoneySavings}</p>`;
    moneySavings.innerHTML = moneySavingsHTML;
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments du DOM
    taskTimeMinutesInput = document.getElementById('taskTimeMinutes');
    taskTimeSecondsInput = document.getElementById('taskTimeSeconds');
    frequencyInput = document.getElementById('frequency');
    frequencyUnitSelect = document.getElementById('frequencyUnit');
    automationTimeHoursInput = document.getElementById('automationTimeHours');
    automationTimeMinutesInput = document.getElementById('automationTimeMinutes');
    hourlyRateInput = document.getElementById('hourlyRate');
    calculateBtn = document.getElementById('calculateBtn');
    resetBtn = document.getElementById('resetBtn');
    resultDiv = document.getElementById('result');
    resultText = document.getElementById('resultText');
    breakEvenDate = document.getElementById('breakEvenDate');
    languageSwitch = document.getElementById('languageSwitch');
    
    // Charger la langue préférée
    loadLanguagePreference();
    
    // Ajouter les écouteurs d'événements
    calculateBtn.addEventListener('click', calculateROI);
    resetBtn.addEventListener('click', resetForm);
    languageSwitch.addEventListener('change', toggleLanguage);
});

// Fonction pour charger la préférence de langue
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        languageSwitch.value = currentLanguage;
    }
    document.documentElement.setAttribute('lang', currentLanguage);
    applyTranslations();
}

// Fonction pour basculer entre les langues
function toggleLanguage() {
    currentLanguage = languageSwitch.value;
    localStorage.setItem('language', currentLanguage);
    document.documentElement.setAttribute('lang', currentLanguage);
    applyTranslations();
    
    // Si des résultats sont affichés, recalculer pour mettre à jour les textes
    if (!resultDiv.classList.contains('hidden')) {
        calculateROI();
    } else {
        // Réinitialiser les sections de résultats
        resultText.innerHTML = '';
        breakEvenDate.innerHTML = '';
        document.getElementById('moneySavings').innerHTML = '';
    }
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    taskTimeMinutesInput.value = '';
    taskTimeSecondsInput.value = '';
    frequencyInput.value = '';
    frequencyUnitSelect.value = 'daily';
    automationTimeHoursInput.value = '';
    automationTimeMinutesInput.value = '';
    hourlyRateInput.value = '';
    resultDiv.classList.add('hidden');
}
