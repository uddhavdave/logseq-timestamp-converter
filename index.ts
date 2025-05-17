import "@logseq/libs";

// Declare logseq globally
declare const logseq: any;

/**
 * main entry
 */
async function main() {
  logseq.UI.showMsg("Timestamp Converter loaded");

  logseq.Editor.onInputSelectionEnd((e) => {
    const { x, y } = e.point;
    const text = e.text.trim();

    // Validate if selected text is a unix timestamp
    const timestamp = parseInt(text, 10);
    if (isNaN(timestamp) || timestamp.toString() !== text) {
      return; // Not a valid unix timestamp, do nothing
    }

    // Convert unix timestamp to dates based on digit length
    let date: Date;
    if (text.length <= 10) {
      // Seconds format (standard Unix timestamp)
      date = new Date(timestamp * 1000);
    } else if (text.length <= 13) {
      // Milliseconds format
      date = new Date(timestamp);
    } else {
      // Microseconds format
      date = new Date(timestamp / 1000); // Convert microseconds to milliseconds
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
      logseq.UI.showMsg("Invalid timestamp format", "error");
      return;
    }

    // Format dates
    const timestampFormatLabel = getTimestampFormatLabel(text.length);

    logseq.provideUI({
      key: "timestamp-converter-dialog",
      close: "outside",
      template: `
        <div style="padding: 12px; overflow: auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <div style="font-weight: bold; font-size: 0.9em;">Original Timestamp:</div>
              <div style="color: var(--ls-secondary-text-color); font-size: 0.8em;">${timestampFormatLabel}</div>
            </div>
            <div style="padding: 6px; background: var(--ls-secondary-background-color); border-radius: 4px; word-break: break-all; font-size: 0.9em;">
              ${text}
            </div>
          </div>
          
          <div style="margin-bottom: 12px;">
            <div style="font-weight: bold; margin-bottom: 4px; font-size: 0.9em;">Local Time:</div>
            <div style="padding: 6px; background: var(--ls-secondary-background-color); border-radius: 4px; word-break: break-word; font-size: 0.9em;">
              ${date.toLocaleString(undefined, {
                dateStyle: "full",
                timeStyle: "long",
              })}
            </div>
          </div>
          
          <div>
            <div style="font-weight: bold; margin-bottom: 4px; font-size: 0.9em;">UTC Time:</div>
            <div style="padding: 6px; background: var(--ls-secondary-background-color); border-radius: 4px; word-break: break-word; font-size: 0.9em;">
              ${date.toLocaleString(undefined, {
                dateStyle: "full",
                timeStyle: "long",
                timeZone: "UTC",
              })}
            </div>
          </div>
        </div>
      `,
      style: {
        left: x + "px",
        top: y + "px",
        width: "320px",
        backgroundColor: "var(--ls-primary-background-color)",
        color: "var(--ls-primary-text-color)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        borderRadius: "6px",
        padding: "0",
        margin: "0",
        overflow: "hidden",
      },
      attrs: {
        title: "Timestamp Converter",
      },
    });
  });
}

/**
 * Get a label for the timestamp format based on its length
 */
function getTimestampFormatLabel(digitLength: number): string {
  if (digitLength <= 10) return "seconds";
  if (digitLength <= 13) return "milliseconds";
  return "microseconds";
}

// bootstrap
logseq.ready(main).catch(console.error);
