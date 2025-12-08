function setupChromeExtensionHandler() {
	chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
		if (message === "getPageTitle") {
			sendResponse({ title: document.title });
		}
		if (
			typeof message === "object" &&
			message.type === "copyToClipboard" &&
			typeof message.message === "string"
		) {
			// クリップボードにコピー
			try {
				navigator.clipboard.writeText(message.message);
			} catch (err) {
				console.error("クリップボードへのコピーに失敗しました", err);
			}
		}
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", setupChromeExtensionHandler);
} else {
	setupChromeExtensionHandler();
}
