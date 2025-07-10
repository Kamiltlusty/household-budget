const header = document.createElement("header");
header.className = "top-bar"
header.innerHTML = `
    <div class="shopping-menu">
        <button class="add-btn">
            <input class="plus" type="image" alt="plus" src="src/assets/plus24Green.png"/>
        </button>
        <button class="save-btn">
            <input class="save" type="image" alt="save" src="src/assets/save24.png"/>
        </button>
        <button class="close-btn">
            <input class="close" type="image" alt="close" src="src/assets/close24.png"/>
        </button>
    </div>
    `
document.body.appendChild(header);

Date.prototype.myMonth = function () {
    const months = [
        "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
        "Lipiec", "Sierpień", "Wrześień", "Październik", "Listopad", "Grudzień"
    ];
    return months[this.getMonth()];
};

const shops = [
    "Lidl", "Biedronka", "Żabka", "Auchan", "Carrefour"
];

function shop(snum) {
    return shops[snum];
}

const currentDate = new Date();
const dateTime = currentDate.getDate() + " " + currentDate.myMonth() + " " + currentDate.getFullYear();

const section = document.createElement("section")
section.className = "middle-bar"
section.innerHTML = `
    <div class="shopping-form">
    <h2 class="shopping-date">${dateTime}</h2>
    <h2 class="buyer">Kupujący: <input class="buyer-text-field" type="text" placeholder="Imię"></h2>    
    <section class="shops"></section>    
    </div>
    `
document.body.appendChild(section);

const shopsSection = document.querySelector(".shops");
printShopsWithCheckboxes();

function printShopsWithCheckboxes() {
    for (i = 0; i < shops.length; i++) {
        const cb = document.createElement("input");
        cb.className = "checkbox"
        cb.value = i;
        cb.type = "checkbox";
        const text = document.createElement("span");
        text.innerText = shop(i);
        shopsSection.appendChild(cb);
        shopsSection.appendChild(text);
    }
}

const checkboxes = document.querySelectorAll(".checkbox")
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", function (event) {
        let el = event.target.value;
        checkboxes.forEach(cb => {
            if (cb.value !== el) {
                cb.checked = false;
            }
        })
    });
})
