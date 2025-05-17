## Unix Timestamp Converter

This Logseq plugin converts unix timestamps to human-readable dates in both your local timezone and UTC.

### How to Use

1. Select a unix timestamp in Logseq (e.g., 1677685200)
2. A popup will appear showing:
   - The original timestamp
   - The date in your local timezone
   - The date in UTC

### API

[![npm version](https://badge.fury.io/js/%40logseq%2Flibs.svg)](https://badge.fury.io/js/%40logseq%2Flibs)

##### Logseq.App

- `onInputSelectionEnd: IUserHook<{ caret: any; end: number; point: { x: number; y: number }; start: number; text: string }, IUserOffHook>`

### Running the Plugin

> 🏷 Minimal version of App [0.4.6](https://github.com/logseq/logseq/releases/tag/0.4.6) !

- `npm install && npm run build` in terminal to install dependencies.
- `Load unpacked plugin` in Logseq Desktop client.

### License

MIT
