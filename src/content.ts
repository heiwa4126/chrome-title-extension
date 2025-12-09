function setupChromeExtensionHandler() {
	chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
		if (message === "getPageTitle") {
			sendResponse({ title: document.title });
			return;
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
			return;
		}
		if (
			typeof message === "object" &&
			message.type === "showAlert" &&
			typeof message.text === "string"
		) {
			window.alert(message.text);
			sendResponse({ result: "shown" });
			return;
		}
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", setupChromeExtensionHandler);
} else {
	setupChromeExtensionHandler();
}
