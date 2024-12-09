# textlint-rule-non-descriptive-link-text

This rule checks for non-descriptive link texts that do not provide sufficient context about the linked content. Using generic text like &#34;click here&#34; or &#34;read more&#34; can harm accessibility and SEO. Replace such link texts with more descriptive ones to enhance user experience and improve content discoverability.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-non-descriptive-link-text

## Usage

Via `.textlintrc.json`(Recommended)

```json
{
    "rules": {
        "non-descriptive-link-text": true
    }
}
```

Via CLI

```
textlint --rule non-descriptive-link-text README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

MIT © Imai Tatsuya
