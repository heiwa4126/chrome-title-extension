// 右クリックメニューからページタイトルを取得する
import { copyTextViaContentScript, showAlertViaContentScript } from "./utils.js";

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "copy-page-title",
		title: "Copy Page Title",
		contexts: ["all"],
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "copy-page-title" && tab && tab.id) {
		chrome.tabs.sendMessage(tab.id, "getPageTitle", (response) => {
			let message: string;
			if (response && typeof response.title === "string") {
				message = response.title;
			} else {
				message = "(タイトルを取得できませんでした)";
			}
			// showNotification(message);
			showAlertViaContentScript(message, tab.id);
			copyTextViaContentScript(message);
		});
	}
});
