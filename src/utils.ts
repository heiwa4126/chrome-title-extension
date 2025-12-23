// content script経由でalert(自前ダイアログ)を表示する
export function showAlertViaContentScript(text: string, tabId?: number) {
	if (tabId) {
		chrome.tabs.sendMessage(tabId, { type: "showAlert", text });
	} else {
		// popupやcontent scriptから自身のタブで呼ぶ場合
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0]?.id) {
				chrome.tabs.sendMessage(tabs[0].id, { type: "showAlert", text });
			}
		});
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
