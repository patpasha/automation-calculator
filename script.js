function calculate() {
    const taskTime = parseFloat(document.getElementById('taskTime').value);
    const frequency = parseFloat(document.getElementById('frequency').value);
    const automationTime = parseFloat(document.getElementById('automationTime').value);

    if (!taskTime || !frequency || !automationTime) {
        alert('Veuillez remplir tous les champs');
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

    if (daysToBreakEven < 365) {
        resultText.innerHTML = `
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                <span class="text-green-600 font-bold text-xl">✨ L'automatisation est recommandée! ✨</span>
            </div>
            <div class="space-y-3">
                <p><span class="font-medium">Économie quotidienne :</span> ${formattedDailySavings} minutes par jour</p>
                <p><span class="font-medium">Temps d'automatisation :</span> ${formattedAutomationTime} minutes (${automationTime} heures)</p>
                <p><span class="font-medium">Rentabilité :</span> <span class="font-bold">${daysToBreakEven} jours</span></p>
                <p><span class="font-medium">Économie annuelle :</span> <span class="font-bold">${yearlyDaysSaved} jours, ${yearlyHoursSaved} heures et ${yearlyMinutesRemaining} minutes</span> de travail</p>
            </div>
        `;
    } else {
        resultText.innerHTML = `
            <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <span class="text-yellow-600 font-bold text-xl">⚠️ L'automatisation n'est peut-être pas la meilleure option</span>
            </div>
            <div class="space-y-3">
                <p><span class="font-medium">Temps de rentabilité :</span> <span class="font-bold">${daysToBreakEven} jours</span> (plus d'un an)</p>
                <p><span class="font-medium">Économie quotidienne :</span> ${formattedDailySavings} minutes par jour</p>
                <p><span class="font-medium">Temps d'automatisation :</span> ${formattedAutomationTime} minutes (${automationTime} heures)</p>
                <p class="text-gray-600">Considérez d'autres options d'optimisation ou une automatisation partielle.</p>
            </div>
        `;
    }

    // Calcul de la date de rentabilité
    const today = new Date();
    const breakEvenDateObj = new Date(today.getTime() + (daysToBreakEven * 24 * 60 * 60 * 1000));
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = breakEvenDateObj.toLocaleDateString('fr-FR', options);
    
    breakEvenDate.innerHTML = `
        <div class="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <span class="font-medium">Date de rentabilité :</span> ${formattedDate}
        </div>
    `;
}
