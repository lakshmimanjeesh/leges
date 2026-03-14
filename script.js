const scenarioBox = document.getElementById('scenario');
const charCount = document.getElementById('char-count');

// Character counter logic
scenarioBox.addEventListener('input', () => {
    charCount.innerText = `${scenarioBox.value.length} characters`;
});

// Autofill chips
function fillSuggestion(text) {
    scenarioBox.value = `Issue regarding ${text.toLowerCase()}: `;
    charCount.innerText = `${scenarioBox.value.length} characters`;
    scenarioBox.focus();
}

// Clear button logic
function clearAll() {
    scenarioBox.value = '';
    charCount.innerText = '0 characters';
    document.getElementById('response-box').classList.add('hidden');
}

// Simulate AI Analysis
function startAnalysis() {
    const input = scenarioBox.value.trim();
    if (!input) {
        alert("Please describe your situation first.");
        return;
    }

    const btnText = document.getElementById('btn-text');
    const spinner = document.getElementById('spinner');
    const responseBox = document.getElementById('response-box');
    const responseText = document.getElementById('response-text');

    // UI State: Loading
    btnText.innerText = 'Analyzing...';
    spinner.classList.remove('hidden');
    responseBox.classList.add('hidden');

    // Fake API Delay
    setTimeout(() => {
        btnText.innerText = 'Analyze Situation';
        spinner.classList.add('hidden');
        
        responseBox.classList.remove('hidden');
        
        // Mock Response Logic
        if (input.toLowerCase().includes("fraud")) {
            responseText.innerText = "This appears to be a digital consumer dispute. Immediate Action: Contact your bank to freeze transactions and report the incident to the cybercrime cell.";
        } else {
            responseText.innerText = "Analysis Complete: This situation involves local civil regulations. Recommended Step: Document all interactions and seek a 15-minute consultation with a specialized attorney.";
        }
    }, 1800);
}