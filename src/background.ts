// 右クリックメニューからページタイトルを取得する
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "get-title",
		title: "get title",
		contexts: ["all"],
	});
});

export function showNotification(message: string) {
	chrome.notifications.create({
		type: "basic",
		iconUrl: chrome.runtime.getURL("public/icon-128.png"),
		title: "ページタイトル",
		message,
	});
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "get-title" && tab && tab.id) {
		chrome.tabs.sendMessage(tab.id, "getPageTitle", (response) => {
			let message: string;
			if (response && typeof response.title === "string") {
				message = `ページタイトル: ${response.title}`;
			} else {
				message = "(タイトルを取得できませんでした)";
			}
			showNotification(message);
		});
	}
});
