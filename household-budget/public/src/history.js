import {createHTMLShoppingHistoryBar} from "./components/shopping-history-bar.js";

const historySection = document.createElement("section");
historySection.className = "history-section";

document.body.appendChild(historySection);
loadHistoryData();
loadMoreData();

function loadMoreData() {
    let lastScrollY = window.scrollY;
    let page = 1;
    let isLast = false;

    const handleLoadDataOnScrollToBottom = async () => {
        const currentScrollY = window.scrollY;
        const scrolledTo = window.scrollY + window.innerHeight;
        const isReachBottom = scrolledTo + 0.5 >= document.documentElement.scrollHeight;

        if (isReachBottom && currentScrollY > lastScrollY && !isLast) {
            const historyData = await fetchHistoryData(page);
            isLast = historyData.last;
            const arr = historyData.content
            console.log(arr);

            arr.forEach(({formId, date, buyerName, totalSum}) => {
                historySection.appendChild(createHTMLShoppingHistoryBar(formId, date, buyerName, totalSum));
                console.log("history: " + formId);
            })
            page++;
        }
        lastScrollY = currentScrollY;
    }

    document.addEventListener("scroll", handleLoadDataOnScrollToBottom)
}

function loadHistoryData() {
    const handleLoadHistoryData = async () => {
        const historyData = await fetchHistoryData();
        const arr = historyData.content
        arr.forEach(({formId, date, buyerName, totalSum}) => {
            historySection.appendChild(createHTMLShoppingHistoryBar(formId, date, buyerName, totalSum));
        })
    }

    document.addEventListener("DOMContentLoaded", handleLoadHistoryData);
}

async function fetchHistoryData(page = 0, size = 25, field = "date") {
    const url = `http://localhost:8080/form/history-data?page=${page}&size=${size}&field=${field}`;
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
