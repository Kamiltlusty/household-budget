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

Date.prototype.myMonth = function () {
    const months = [
        "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
        "Lipiec", "Sierpień", "Wrześień", "Październik", "Listopad", "Grudzień"
    ];
    return months[this.getMonth()];
};

const currentDate = new Date();
const dateTime = currentDate.getDate() + " " + currentDate.myMonth() + " " + currentDate.getFullYear();

const section = document.createElement("section")
section.className = "middle-bar"
section.innerHTML = `
    <div class="shopping-form">
    <h2>${dateTime}</h2>
    </div>
    `


document.body.appendChild(header);
document.body.appendChild(section);