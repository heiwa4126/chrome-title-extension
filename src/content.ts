function setChromeExtensionHandler() {
	chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
		if (message === "getPageTitle") {
			// typeof message === "string" は不要
			// -- DOMからタイトル取得
			sendResponse({ title: document.title });
			return;
		}
		if (
			typeof message === "object" &&
			message.type === "copyToClipboard" &&
			typeof message.message === "string"
		) {
			// -- クリップボードにコピー
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
			// -- カスタムダイアログ表示
			showCustomDialog(message.text);
			sendResponse({ result: "shown" });
			return;
		}
	});

	// カスタムダイアログをページ上に表示する
	function showCustomDialog(text: string) {
		// 既存ダイアログがあれば削除
		const old = document.getElementById("chrome-title-ext-dialog");
		if (old) old.remove();

		const dialog = document.createElement("div");
		dialog.id = "chrome-title-ext-dialog";
		dialog.style.position = "fixed";
		dialog.style.left = "0";
		dialog.style.top = "0";
		dialog.style.width = "100vw";
		dialog.style.height = "100vh";
		dialog.style.background = "rgba(0,0,0,0.2)";
		dialog.style.zIndex = "999999";
		dialog.style.display = "flex";
		dialog.style.alignItems = "center";
		dialog.style.justifyContent = "center";

		const box = document.createElement("div");
		box.style.background = "#fff";
		box.style.borderRadius = "8px";
		box.style.boxShadow = "0 2px 16px rgba(0,0,0,0.2)";
		box.style.padding = "24px 32px";
		box.style.minWidth = "320px";
		box.style.maxWidth = "90vw";
		box.style.display = "flex";
		box.style.flexDirection = "column";
		box.style.alignItems = "center";

		// アイコン
		const icon = document.createElement("img");
		icon.src = chrome.runtime.getURL("public/icon-128.png");
		// background.tsのcrxUrl関数は使えないので注意! 間違ったURLが帰る
		icon.alt = "拡張アイコン";
		icon.style.width = "48px";
		icon.style.height = "48px";
		icon.style.marginBottom = "12px";
		box.appendChild(icon);

		// タイトル
		const title = document.createElement("div");
		title.textContent = "Copy Page Title 拡張からのメッセージ";
		title.style.fontWeight = "bold";
		title.style.fontSize = "1.1em";
		title.style.marginBottom = "8px";
		box.appendChild(title);

		// メッセージ本文
		const msg = document.createElement("div");
		msg.textContent = text;
		msg.style.marginBottom = "16px";
		msg.style.wordBreak = "break-all";
		box.appendChild(msg);

		// 閉じるボタン
		const btn = document.createElement("button");
		btn.textContent = "閉じる";
		btn.style.padding = "6px 18px";
		btn.style.fontSize = "1em";
		btn.style.borderRadius = "4px";
		btn.style.border = "1px solid #888";
		btn.style.background = "#f5f5f5";
		btn.style.cursor = "pointer";
		btn.addEventListener("click", () => {
			dialog.remove();
		});
		box.appendChild(btn);

		dialog.appendChild(box);
		document.body.appendChild(dialog);
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", setChromeExtensionHandler);
} else {
	setChromeExtensionHandler();
}
