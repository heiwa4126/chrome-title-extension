function updatePageTitle() {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (!tabs[0] || !tabs[0].id) return;
		chrome.tabs.sendMessage(tabs[0].id, "getPageTitle", (response) => {
			const el = document.getElementById("page-title");
			if (el && response && typeof response.title === "string") {
				el.textContent = `ページタイトル: ${response.title}`;
			} else if (el) {
				el.textContent = "(タイトルを取得できませんでした)";
			}
		});
	});
}

document.addEventListener("DOMContentLoaded", updatePageTitle);
