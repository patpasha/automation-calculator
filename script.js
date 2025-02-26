// Variables globales
let currentLanguage = 'fr';

// Dictionnaire de traductions
const translations = {
    fr: {
        // Header
        title: "Calculateur d'Automatisation",
        subtitle: "Découvrez si l'automatisation d'une tâche répétitive est rentable pour vous.",
        
        // Form labels
        taskTimeLabel: "Temps par tâche manuelle",
        taskTimeDescription: "Le temps moyen nécessaire pour effectuer la tâche une seule fois :",
        taskTimeItems: [
            "Inclure la préparation nécessaire",
            "Inclure la saisie des données",
            "Inclure les vérifications",
            "Inclure les corrections éventuelles"
        ],
        taskTimeUnit: "minutes",
        taskTimeTooltip: "Temps total pour effectuer la tâche une fois, incluant préparation et vérification",
        
        frequencyLabel: "Fréquence d'exécution",
        frequencyDescription: "À quelle fréquence effectuez-vous cette tâche ?",
        frequencyItems: [
            "Nombre moyen d'exécutions par jour",
            "Pour une tâche hebdomadaire : divisez par 5 (jours ouvrés)",
            "Pour une tâche mensuelle : divisez par 20 (jours ouvrés)",
            "Exemple : 2 fois par semaine = 0.4 fois par jour"
        ],
        frequencyUnit: "fois par jour",
        frequencyTooltip: "Fréquence moyenne par jour ouvré. Utilisez des décimales pour les tâches hebdomadaires ou mensuelles",
        
        automationTimeLabel: "Temps de développement estimé",
        automationTimeDescription: "Le temps total que vous pensez nécessaire pour :",
        automationTimeItems: [
            "Apprendre les outils nécessaires",
            "Développer la solution",
            "Tester et déboguer",
            "Documenter et maintenir"
        ],
        automationTimeUnit: "heures",
        automationTimeTooltip: "Incluez tout le temps nécessaire : apprentissage, développement, tests et documentation",
        
        // Button
        calculateButton: "Calculer la rentabilité",
        
        // Results
        resultTitle: "Résultat",
        recommendedTitle: "✨ L'automatisation est recommandée! ✨",
        notRecommendedTitle: "⚠️ L'automatisation n'est peut-être pas la meilleure option",
        dailySavingsLabel: "Économie quotidienne :",
        automationTimeResultLabel: "Temps d'automatisation :",
        breakEvenLabel: "Rentabilité :",
        yearlySavingsLabel: "Économie annuelle :",
        breakEvenDateLabel: "Date de rentabilité :",
        daysUnit: "jours",
        hoursUnit: "heures",
        minutesUnit: "minutes",
        perDay: "par jour",
        moreThanYear: "(plus d'un an)",
        considerOtherOptions: "Considérez d'autres options d'optimisation ou une automatisation partielle.",
        ofWork: "de travail",
        and: "et",
        
        // Footer
        footerText: "Conçu pour vous aider à prendre des décisions éclairées sur l'automatisation de vos tâches.",
        copyright: " 2025 Calculateur d'Automatisation",
        
        // Alerts
        fillAllFields: "Veuillez remplir tous les champs"
    },
    en: {
        // Header
        title: "Automation Calculator",
        subtitle: "Find out if automating a repetitive task is worth your time.",
        
        // Form labels
        taskTimeLabel: "Time per manual task",
        taskTimeDescription: "The average time needed to perform the task once:",
        taskTimeItems: [
            "Include necessary preparation",
            "Include data entry",
            "Include verifications",
            "Include potential corrections"
        ],
        taskTimeUnit: "minutes",
        taskTimeTooltip: "Total time to perform the task once, including preparation and verification",
        
        frequencyLabel: "Execution frequency",
        frequencyDescription: "How often do you perform this task?",
        frequencyItems: [
            "Average number of executions per day",
            "For a weekly task: divide by 5 (working days)",
            "For a monthly task: divide by 20 (working days)",
            "Example: 2 times per week = 0.4 times per day"
        ],
        frequencyUnit: "times per day",
        frequencyTooltip: "Average frequency per working day. Use decimals for weekly or monthly tasks",
        
        automationTimeLabel: "Estimated development time",
        automationTimeDescription: "The total time you think necessary for:",
        automationTimeItems: [
            "Learning the necessary tools",
            "Developing the solution",
            "Testing and debugging",
            "Documenting and maintaining"
        ],
        automationTimeUnit: "hours",
        automationTimeTooltip: "Include all necessary time: learning, development, testing and documentation",
        
        // Button
        calculateButton: "Calculate ROI",
        
        // Results
        resultTitle: "Result",
        recommendedTitle: "✨ Automation is recommended! ✨",
        notRecommendedTitle: "⚠️ Automation might not be the best option",
        dailySavingsLabel: "Daily savings:",
        automationTimeResultLabel: "Automation time:",
        breakEvenLabel: "Break-even point:",
        yearlySavingsLabel: "Yearly savings:",
        breakEvenDateLabel: "Break-even date:",
        daysUnit: "days",
        hoursUnit: "hours",
        minutesUnit: "minutes",
        perDay: "per day",
        moreThanYear: "(more than a year)",
        considerOtherOptions: "Consider other optimization options or partial automation.",
        ofWork: "of work",
        and: "and",
        
        // Footer
        footerText: "Designed to help you make informed decisions about automating your tasks.",
        copyright: " 2025 Automation Calculator",
        
        // Alerts
        fillAllFields: "Please fill in all fields"
    }
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la langue
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        document.getElementById('languageSelector').value = currentLanguage;
    }
    
    // Appliquer les traductions
    applyTranslations();
    
    // Ajouter l'écouteur d'événement pour le changement de langue
    document.getElementById('languageSelector').addEventListener('change', function(e) {
        currentLanguage = e.target.value;
        localStorage.setItem('language', currentLanguage);
        document.getElementById('htmlRoot').setAttribute('lang', currentLanguage);
        applyTranslations();
    });
});

// Fonction pour appliquer les traductions
function applyTranslations() {
    // Traduction des éléments avec data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key.includes('.')) {
            // Gestion des clés imbriquées comme "taskTimeItems.0"
            const parts = key.split('.');
            const mainKey = parts[0];
            const subKey = parseInt(parts[1]);
            if (translations[currentLanguage][mainKey] && translations[currentLanguage][mainKey][subKey] !== undefined) {
                el.textContent = translations[currentLanguage][mainKey][subKey];
            }
        } else if (translations[currentLanguage][key]) {
            el.textContent = translations[currentLanguage][key];
        }
    });
    
    // Traduction des attributs
    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(el => {
        const attrData = el.getAttribute('data-i18n-attr').split(':');
        if (attrData.length === 2) {
            const attr = attrData[0];
            const key = attrData[1];
            if (translations[currentLanguage][key]) {
                el.setAttribute(attr, translations[currentLanguage][key]);
            }
        }
    });
    
    // Mettre à jour le titre de la page
    document.title = translations[currentLanguage].title;
}

function calculate() {
    const taskTime = parseFloat(document.getElementById('taskTime').value);
    const frequency = parseFloat(document.getElementById('frequency').value);
    const automationTime = parseFloat(document.getElementById('automationTime').value);

    if (!taskTime || !frequency || !automationTime) {
        alert(translations[currentLanguage].fillAllFields);
        return;
    }

    // Conversion en minutes
    const automationTimeMinutes = automationTime * 60;
    const dailySavings = taskTime * frequency;
    const daysToBreakEven = Math.ceil(automationTimeMinutes / dailySavings);

    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    const breakEvenDate = document.getElementById('breakEvenDate');
    
    resultDiv.classList.remove('hidden');

    // Formatage des nombres pour l'affichage
    const formattedDailySavings = dailySavings.toFixed(1);
    const formattedAutomationTime = automationTimeMinutes.toFixed(0);
    
    // Calcul du temps économisé par an (en jours et heures)
    const yearlyMinutesSaved = dailySavings * 260; // 260 jours ouvrés par an
    const yearlyDaysSaved = Math.floor(yearlyMinutesSaved / (60 * 8)); // 8 heures par jour
    const yearlyHoursSaved = Math.floor((yearlyMinutesSaved % (60 * 8)) / 60);
    const yearlyMinutesRemaining = Math.floor(yearlyMinutesSaved % 60);

    const t = translations[currentLanguage]; // Raccourci pour les traductions

    if (daysToBreakEven < 365) {
        resultText.innerHTML = `
            <div class="p-2 bg-green-50 border border-green-200 rounded-lg mb-2">
                <span class="text-green-600 font-bold text-base">${t.recommendedTitle}</span>
            </div>
            <div class="space-y-2">
                <p><span class="font-medium">${t.dailySavingsLabel}</span> ${formattedDailySavings} ${t.minutesUnit} ${t.perDay}</p>
                <p><span class="font-medium">${t.automationTimeResultLabel}</span> ${formattedAutomationTime} ${t.minutesUnit} (${automationTime} ${t.hoursUnit})</p>
                <p><span class="font-medium">${t.breakEvenLabel}</span> <span class="font-bold">${daysToBreakEven} ${t.daysUnit}</span></p>
                <p><span class="font-medium">${t.yearlySavingsLabel}</span> <span class="font-bold">${yearlyDaysSaved} ${t.daysUnit}, ${yearlyHoursSaved} ${t.hoursUnit} ${t.and} ${yearlyMinutesRemaining} ${t.minutesUnit}</span> ${t.ofWork}</p>
            </div>
        `;
    } else {
        resultText.innerHTML = `
            <div class="p-2 bg-yellow-50 border border-yellow-200 rounded-lg mb-2">
                <span class="text-yellow-600 font-bold text-base">${t.notRecommendedTitle}</span>
            </div>
            <div class="space-y-2">
                <p><span class="font-medium">${t.breakEvenLabel}</span> <span class="font-bold">${daysToBreakEven} ${t.daysUnit}</span> ${t.moreThanYear}</p>
                <p><span class="font-medium">${t.dailySavingsLabel}</span> ${formattedDailySavings} ${t.minutesUnit} ${t.perDay}</p>
                <p><span class="font-medium">${t.automationTimeResultLabel}</span> ${formattedAutomationTime} ${t.minutesUnit} (${automationTime} ${t.hoursUnit})</p>
                <p class="text-gray-600 text-xs">${t.considerOtherOptions}</p>
            </div>
        `;
    }

    // Calcul de la date de rentabilité
    const today = new Date();
    const breakEvenDateObj = new Date(today.getTime() + (daysToBreakEven * 24 * 60 * 60 * 1000));
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = breakEvenDateObj.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', options);
    
    breakEvenDate.innerHTML = `
        <div class="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
            <span class="font-medium">${t.breakEvenDateLabel}</span> ${formattedDate}
        </div>
    `;
}
