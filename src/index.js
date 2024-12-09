/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ allows?: string[], language?: string }>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
export default function (context, options = {}) {
  const { Syntax, RuleError, report, locator } = context;
  const allows = options.allows ?? [];
  const language = options.language ?? "en"; // デフォルト言語を英語に設定

  // 言語別のBLOCKLIST
  const BLOCKLISTS = {
    en: [
      "click here",
      "click this",
      "go",
      "here",
      "information",
      "learn more",
      "more",
      "more info",
      "more information",
      "right here",
      "read more",
      "see more",
      "start",
      "this",
    ],
    ja: [
      "ここをクリック",
      "こちらをクリック",
      "リンク",
      "続きを読む",
      "続く",
      "全文表示",
    ],
    es: [
      "click aquí",
      "click aqui",
      "clicka aquí",
      "clicka aqui",
      "pincha aquí",
      "pincha aqui",
      "aquí",
      "aqui",
      "más",
      "mas",
      "más información",
      "más informacion",
      "mas información",
      "mas informacion",
      "este",
      "enlace",
      "este enlace",
      "empezar",
    ],
    pt: [
      "clique aqui",
      "ir",
      "mais informação",
      "mais informações",
      "mais",
      "veja mais",
    ],
    ko: [
      "여기",
      "여기를 클릭",
      "클릭",
      "링크",
      "자세히",
      "자세히 보기",
      "계속",
      "이동",
      "전체 보기",
    ],
    sv: ["här", "klicka här", "läs mer", "mer", "mer info", "mer information"],
    ta: [
      "அடுத்த பக்கம்",
      "மறுபக்கம்",
      "முந்தைய பக்கம்",
      "முன்பக்கம்",
      "மேலும் அறிக",
      "மேலும் தகவலுக்கு",
      "மேலும் தரவுகளுக்கு",
      "தயவுசெய்து இங்கே அழுத்தவும்",
      "இங்கே கிளிக் செய்யவும்",
    ],
    fa: [
      "اطلاعات بیشتر",
      "اطلاعات",
      "این",
      "اینجا بزنید",
      "اینجا کلیک کنید",
      "اینجا",
      "برو",
      "بیشتر بخوانید",
      "بیشتر بدانید",
      "بیشتر",
      "شروع",
    ],
  };

  // BLOCKLISTの言語選択
  const BLOCKLIST = new Set(BLOCKLISTS[language] || []);

  // エラーメッセージの多言語対応
  const ERROR_MESSAGES = {
    en: 'Avoid using non-descriptive link text: "%s"',
    ja: '説明的ではないリンクテキストは避けてください: "%s"',
    es: 'Evite usar texto de enlace no descriptivo: "%s"',
    pt: 'Evite usar texto de link não descritivo: "%s"',
    ko: '설명 없는 링크 텍스트를 사용하지 마세요: "%s"',
    sv: 'Undvik att använda icke-beskrivande länkar: "%s"',
    ta: 'விபரமற்ற இணைப்பு உரைகளை தவிர்க்கவும்: "%s"',
    fa: 'از متن لینک غیرتوصیفی استفاده نکنید: "%s"',
  };

  const getErrorMessage = (text) =>
    ERROR_MESSAGES[language]?.replace("%s", text) ||
    `Avoid using non-descriptive link text: "${text}"`;

  return {
    [Syntax.Link](node) {
      const linkText = node.children?.[0]?.value ?? "";
      checkBlocklist(node, linkText);
    },
  };

  /**
   * BLOCKLISTに基づいてエラーをチェックするヘルパー関数
   * @param {*} node
   * @param {string} text
   */
  function checkBlocklist(node, text) {
    if (allows.some((allow) => text === allow)) {
      return;
    }

    if (BLOCKLIST.has(text)) {
      const index = 0;
      const matchRange = [index, index + text.length];
      const ruleError = new RuleError(getErrorMessage(text), {
        padding: locator.range(matchRange),
      });
      report(node, ruleError);
    }
  }
}
