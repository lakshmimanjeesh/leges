/* ================================
   SAFE ELEMENT SELECTION
================================ */

const scenarioBox = document.getElementById('scenario');
const charCount = document.getElementById('char-count');
const grid = document.getElementById("grid");


/* ================================
   SCENARIO PAGE LOGIC
================================ */

if (scenarioBox) {

/* Character Counter */
scenarioBox.addEventListener('input', () => {
    charCount.innerText = `${scenarioBox.value.length} characters`;
});


/* Suggestion Autofill */
window.fillSuggestion = function(text) {
    scenarioBox.value = `Issue regarding ${text.toLowerCase()}: `;
    charCount.innerText = `${scenarioBox.value.length} characters`;
    scenarioBox.focus();
}


/* Clear Button */
window.clearAll = function() {
    scenarioBox.value = '';
    charCount.innerText = '0 characters';
}


/* Category Detection */
function detectCategory(text){

text = text.toLowerCase()

if(text.includes("fraud") || text.includes("hack") || text.includes("online"))
return "Cybercrime"

if(text.includes("salary") || text.includes("job") || text.includes("termination"))
return "Employment Law"

if(text.includes("divorce") || text.includes("custody"))
return "Divorce Law"

if(text.includes("product") || text.includes("refund"))
return "Consumer Law"

if(text.includes("land") || text.includes("rent") || text.includes("property"))
return "Property Law"

if(text.includes("police") || text.includes("arrest") || text.includes("crime"))
return "Criminal Law"

return "Cybercrime"
}


/* Analyze Button */
window.startAnalysis = function(){

const input = scenarioBox.value.trim()

if(!input){
alert("Please describe your situation first.")
return
}

const btnText = document.getElementById('btn-text')
const spinner = document.getElementById('spinner')

btnText.innerText = "Analyzing..."
spinner.classList.remove("hidden")

setTimeout(()=>{

const category = detectCategory(input)

window.location.href =
"lawyers.html?category=" + encodeURIComponent(category)

},1500)

}

}



/* ================================
   LAWYERS PAGE LOGIC
================================ */

if (grid) {

const params = new URLSearchParams(window.location.search)
const category = params.get("category")

const badge = document.querySelector(".badge")

if(badge && category){
badge.innerText = "Category: " + category
}

fetch("lawyers.json")
.then(res => res.json())
.then(data => {

let filtered = data.filter(l =>
l.field.toLowerCase() === category.toLowerCase()
)

render(filtered)

})


function render(list){

grid.innerHTML = ""

if(list.length === 0){
grid.innerHTML =
`<p class="text-center col-span-3 text-gray-400">
No lawyers found for this case
</p>`
return
}

list.forEach(l=>{

grid.innerHTML += `

<div class="bg-white p-6 rounded-2xl shadow hover:shadow-2xl transition transform hover:-translate-y-2">

<h2 class="font-bold text-lg">${l.name}</h2>

<p class="text-indigo-600">${l.field}</p>

<p class="text-sm mt-2">Experience: ${l.experience} years</p>
<p class="text-sm">Successful Cases: ${l.success}</p>
<p class="text-sm">Total Cases: ${l.total}</p>
<p class="text-sm">Rating ⭐ ${l.rating}</p>
<p class="text-sm">City: ${l.city}</p>
<p class="text-sm">Fee ₹${l.fee}</p>

<div class="bg-green-100 text-green-700 inline-block px-2 py-1 rounded mt-2">
${l.match}% Match
</div>

<details class="mt-3">
<summary class="cursor-pointer text-indigo-600">View Bio</summary>
<p class="text-sm mt-1">${l.bio}</p>
</details>

<button class="bg-indigo-600 text-white w-full py-2 rounded mt-4 hover:bg-indigo-700">
Connect Now
</button>

</div>

`
})

}

}