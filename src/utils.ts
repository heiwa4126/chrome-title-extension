export function showNotification(message: string) {
	chrome.notifications.create({
		type: "basic",
		iconUrl: chrome.runtime.getURL("public/icon-128.png"),
		title: "ページタイトル",
		message,
	});
}

/**
 * 現在のdocument環境でクリップボードにテキストをコピーする。
 * popupやcontent scriptなど、documentが使える場所で利用。
 * @param message コピーするテキスト
 */
export async function copyTextInDocument(message: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(message);
	} catch (err) {
		console.error("クリップボードへのコピーに失敗しました", err);
	}
}

/**
 * アクティブなタブのcontent scriptにメッセージを送り、
 * そのページ上でクリップボードにテキストをコピーさせる。
 * backgroundやpopupなど、documentが使えない場所で利用。
 * @param message コピーするテキスト
 */
export function copyTextViaContentScript(message: string) {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (!tabs[0] || !tabs[0].id) return;
		chrome.tabs.sendMessage(tabs[0].id, { type: "copyToClipboard", message });
	});
}
