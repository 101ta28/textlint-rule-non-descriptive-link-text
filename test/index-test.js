import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();

// テスト実行: textlint-rule-non-descriptive-link-text
tester.run("textlint-rule-non-descriptive-link-text", rule, {
  valid: [
    {
      text: "これは問題のない通常のテキストです。",
      options: { language: "ja" }, // 日本語
    },
    {
      text: "Visite [Google](https://google.com) para más información.",
      options: { language: "es", allows: ["más información"] }, // スペイン語
    },
    {
      text: "여기를 눌러 더 많은 정보를 확인하세요.",
      options: { language: "ko" }, // 韓国語
    },
  ],
  invalid: [
    {
      text: "クリックして[ここをクリック](https://example.com)してください。",
      options: { language: "ja" }, // 日本語
      errors: [
        {
          message:
            '説明的ではないリンクテキストは避けてください: "ここをクリック"',
          line: 1,
          column: 7, // "ここをクリック" の開始位置
        },
      ],
    },
    {
      text: "Haga clic [aquí](https://example.com) para más detalles.",
      options: { language: "es" }, // スペイン語
      errors: [
        {
          message: 'Evite usar texto de enlace no descriptivo: "aquí"',
          line: 1,
          column: 11, // "aquí" の開始位置
        },
      ],
    },
    {
      text: "[여기를 클릭](https://example.com)하여 정보를 확인하세요.",
      options: { language: "ko" }, // 韓国語
      errors: [
        {
          message: '설명 없는 링크 텍스트를 사용하지 마세요: "여기를 클릭"',
          line: 1,
          column: 1, // "여기를 클릭" の開始位置
        },
      ],
    },
  ],
});
