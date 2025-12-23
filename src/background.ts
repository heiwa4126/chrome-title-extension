// 右クリックメニュー・アイコンクリック共通処理
import { copyTextViaContentScript, showAlertViaContentScript } from "./utils.js";

const CONTEXT_MENU_ID = "copy-page-title";

// 拡張機能アイコンの見栄え切り替え（有効:通常, 無効:グレー）
const ICON_NORMAL = {
	16: chrome.runtime.getURL("public/icon-16.png"),
	32: chrome.runtime.getURL("public/icon-32.png"),
	48: chrome.runtime.getURL("public/icon-48.png"),
	128: chrome.runtime.getURL("public/icon-128.png"),
};
const ICON_GRAY = {
	16: chrome.runtime.getURL("public/icon-128x.png"),
	32: chrome.runtime.getURL("public/icon-128x.png"),
	48: chrome.runtime.getURL("public/icon-128x.png"),
	128: chrome.runtime.getURL("public/icon-128x.png"),
};

// URLが有効かどうかを判定
function isValidUrl(url?: string): boolean {
	return url?.startsWith("http://localhost:3000/test1") ?? false;
}

function updateActionIcon(tabId: number, url?: string) {
	if (!url) {
		console.log(`[updateActionIcon] urlなし tabId=${tabId}`, tabId);
		return;
	}
	console.log(`[updateActionIcon] url=${url} tabId=${tabId}`);
	const isEnabled = isValidUrl(url);

	// アイコンの切り替え
	if (isEnabled) {
		chrome.action.setIcon({ tabId, path: ICON_NORMAL });
	} else {
		chrome.action.setIcon({ tabId, path: ICON_GRAY });
	}

	// コンテキストメニューの表示/非表示切り替え
	chrome.contextMenus.update(CONTEXT_MENU_ID, {
		visible: isEnabled,
	});
}

// タブ切り替え時にもアイコンを更新
chrome.tabs.onActivated.addListener(async (activeInfo) => {
	try {
		const tab = await chrome.tabs.get(activeInfo.tabId);
		updateActionIcon(activeInfo.tabId, tab.url);
	} catch (error) {
		console.error(`[onActivated] エラー: ${error}`);
	}
});

// タブ更新時にもアイコンを更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete" || changeInfo.url) {
		updateActionIcon(tabId, tab.url);
	}
});

// 右クリックメニュー作成
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: CONTEXT_MENU_ID,
		title: "Copy Page Title",
		contexts: ["all"],
	});
});

// 右クリックメニュー選択時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === CONTEXT_MENU_ID && tab && tab.id) {
		handleGetPageTitle(tab.id);
	}
});

// 拡張機能アイコンクリック時の処理
chrome.action.onClicked.addListener((tab) => {
	if (tab.id) {
		handleGetPageTitle(tab.id);
	}
});

// ページタイトル取得・表示・コピー処理
async function handleGetPageTitle(tabId?: number) {
	if (!tabId) return;

	// URLチェック
	try {
		const tab = await chrome.tabs.get(tabId);
		if (!isValidUrl(tab.url)) {
			console.log(`[handleGetPageTitle] 無効なURL: ${tab.url}`);
			return;
		}
	} catch (error) {
		console.error(`[handleGetPageTitle] タブ取得エラー: ${error}`);
		return;
	}

	chrome.tabs.sendMessage(tabId, "getPageTitle", (response) => {
		const message =
			response && typeof response.title === "string"
				? response.title
				: "(タイトルを取得できませんでした)";
		showAlertViaContentScript(message, tabId);
		copyTextViaContentScript(message);
	});
}
