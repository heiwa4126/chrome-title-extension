// 右クリックメニューからページタイトルを取得する
import { copyToClipboard1, showNotification } from "./utils.js";

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "get-title",
		title: "get title",
		contexts: ["all"],
	});
});

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
			copyToClipboard1(message);
		});
	}
});
