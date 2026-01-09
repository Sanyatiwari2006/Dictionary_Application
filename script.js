console.log("JS loaded");

const inputEl = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");

const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");
const infotextEl = document.getElementById("infotext");
const meaningcontainerEl = document.getElementById("meaning-container");

const phoneticEl = document.getElementById("phonetic");
const partofspeechEl = document.getElementById("partofspeech");
const exampleEl = document.getElementById("example");

async function fetchAPI(word) {
    try {
        infotextEl.innerText = "Searching...";
        meaningcontainerEl.style.display = "none";

        const res = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );

        if (!res.ok) throw new Error("Word not found");

        const data = await res.json();

        titleEl.innerText = data[0].word;
        meaningEl.innerText = data[0].meanings[0].definitions[0].definition;
        partofspeechEl.innerText =
            "Part of speech: " + data[0].meanings[0].partOfSpeech;
        phoneticEl.innerText = data[0].phonetic || "";

        exampleEl.innerText =
            data[0].meanings[0].definitions[0].example || "No example available";

        const phonetic = data[0].phonetics.find(p => p.audio);
        if (phonetic) {
            audioEl.src = phonetic.audio;
            audioEl.style.display = "block";
        } else {
            audioEl.style.display = "none";
        }

        infotextEl.innerText = "";
        meaningcontainerEl.style.display = "block";

    } catch (err) {
        infotextEl.innerText = "Word not found";
        console.error(err);
    }
}

searchBtn.addEventListener("click", () => {
    if (inputEl.value.trim()) {
        fetchAPI(inputEl.value.trim());
    }
});

inputEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && inputEl.value.trim()) {
        fetchAPI(inputEl.value.trim());
    }
});
