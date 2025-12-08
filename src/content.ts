function setupGetPageTitle() {
	chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
		if (message === "getPageTitle") {
			sendResponse({ title: document.title });
		}
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", setupGetPageTitle);
} else {
	setupGetPageTitle();
}
