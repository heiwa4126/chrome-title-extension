function setupGetPageTitle() {
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
			if (navigator.clipboard) {
				navigator.clipboard.writeText(message.message);
			} else {
				const textarea = document.createElement("textarea");
				textarea.value = message.message;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			}
		}
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", setupGetPageTitle);
} else {
	setupGetPageTitle();
}
