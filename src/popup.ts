import { copyTextInDocument, showAlertViaContentScript } from "./utils.js";

function updatePageTitle() {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (!tabs[0] || !tabs[0].id) return;
		chrome.tabs.sendMessage(tabs[0].id, "getPageTitle", (response) => {
			let message: string;
			if (response && typeof response.title === "string") {
				message = response.title;
			} else {
				message = "(タイトルを取得できませんでした)";
			}
			const el = document.getElementById("page-title");
			if (el) {
				el.textContent = message;
			}
			// showNotification(message);
			showAlertViaContentScript(message);
			copyTextInDocument(message);
		});
	});
}

document.addEventListener("DOMContentLoaded", updatePageTitle);
