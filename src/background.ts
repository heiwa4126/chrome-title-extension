// 右クリックメニュー・アイコンクリック共通処理
import { copyTextViaContentScript, showAlertViaContentScript } from "./utils.js";

function handleGetPageTitle(tabId?: number) {
	if (!tabId) return;
	chrome.tabs.sendMessage(tabId, "getPageTitle", (response) => {
		const message =
			response && typeof response.title === "string"
				? response.title
				: "(タイトルを取得できませんでした)";
		showAlertViaContentScript(message, tabId);
		copyTextViaContentScript(message);
	});
}

const CONTEXT_MENU_ID = "copy-page-title";

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: CONTEXT_MENU_ID,
		title: "Copy Page Title",
		contexts: ["all"],
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === CONTEXT_MENU_ID && tab && tab.id) {
		handleGetPageTitle(tab.id);
	}
});

chrome.action.onClicked.addListener((tab) => {
	if (tab.id) {
		handleGetPageTitle(tab.id);
	}
});
