// popupスクリプト: content scriptから読書時間を取得して表示
function updateReadingTime() {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (!tabs[0] || !tabs[0].id) return;
		chrome.tabs.sendMessage(tabs[0].id, "getReadingTime", (response) => {
			const el = document.getElementById("reading-time");
			if (el && response && typeof response.readingTime === "number") {
				el.textContent = `Estimated reading time: ${response.readingTime} min`;
			} else if (el) {
				el.textContent = "Could not estimate reading time.";
			}
		});
	});
}

document.addEventListener("DOMContentLoaded", updateReadingTime);
