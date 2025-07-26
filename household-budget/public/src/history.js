import {createHTMLShoppingHistoryBar} from "./components/shopping-history-bar.js";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./styles/shopping-history-bar.css";
document.head.appendChild(link);


const historySection = document.createElement("section");
historySection.className = "history-section";

document.body.appendChild(historySection);



export function loadHistoryData(openHistoryButton) {
    const handleLoadHistoryData = async () => {

    }

    openHistoryButton.addEventListener("click", handleLoadHistoryData() );
}

async function fetchHistoryData(page = 0, size = 25, field = "date") {
    const url = `http://localhost:8080/history-data?page=${page}&size=${size}&field=${field}`;
    try {
        const response = await fetch(url, {
            method: "GET",
        });

        return await response.json();
    } catch (error) {
        console.log(error.message);
        return null;
    }
}






