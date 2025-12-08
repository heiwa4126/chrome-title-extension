export function showNotification(message: string) {
	chrome.notifications.create({
		type: "basic",
		iconUrl: chrome.runtime.getURL("public/icon-128.png"),
		title: "ページタイトル",
		message,
	});
}

// documentが使える環境で直接クリップボードにコピー
export async function copyToClipboard0(message: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(message);
	} catch {
		// fallback: execCommand
		const textarea = document.createElement("textarea");
		textarea.value = message;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
	}
}

export function copyToClipboard1(message: string) {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (!tabs[0] || !tabs[0].id) return;
		chrome.tabs.sendMessage(tabs[0].id, { type: "copyToClipboard", message });
	});
}
