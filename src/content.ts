// ページ内の単語数をカウントし、推定読書時間（分）をwindowオブジェクトに格納
function estimateReadingTime(): number {
	const text = document.body.innerText || "";
	const words = text.trim().split(/\s+/).length;
	const wordsPerMinute = 200; // 一般的な読書速度
	return Math.ceil(words / wordsPerMinute);
}

function setupReadingTime() {
	(window as any).readingTime = estimateReadingTime();
	chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
		if (msg === "getReadingTime") {
			sendResponse({ readingTime: (window as any).readingTime });
		}
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", setupReadingTime);
} else {
	setupReadingTime();
}
