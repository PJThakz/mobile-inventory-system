/**
 * Universal Xports - inventory API (Google Apps Script)
 *
 * Changes from the old version:
 *  - optional access key (so only the website can read the data)
 *  - returns the time the sheet was last edited, for the "Prices updated" line
 *  - ignores empty rows and empty header columns
 *
 * Optional: to require a key, go to Project Settings > Script Properties,
 * add a property named API_KEY with any long random value, and put the same
 * value in SHEET_API_KEY on the website (.env.local and Vercel).
 * No API_KEY property = no check, same as before.
 *
 * After pasting this in: Deploy > Manage deployments > pencil icon >
 * Version: New version > Deploy. The URL stays the same.
 */

function doGet(e) {
  var expectedKey = PropertiesService.getScriptProperties().getProperty("API_KEY");

  if (expectedKey && (!e || !e.parameter || e.parameter.key !== expectedKey)) {
    return respond_({ error: "unauthorized" });
  }

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  return respond_({
    inventory: readSheet_(spreadsheet.getSheetByName("Inventory")),
    updates: readSheet_(spreadsheet.getSheetByName("Updates")),
    lastUpdated: getLastUpdated_(spreadsheet),
  });
}

function readSheet_(sheet) {
  if (!sheet) return [];

  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  var headers = values.shift().map(function (h) {
    return String(h).trim();
  });

  return values
    .filter(function (row) {
      return row.some(function (cell) {
        return cell !== "" && cell !== null;
      });
    })
    .map(function (row) {
      var obj = {};
      headers.forEach(function (header, i) {
        if (header) obj[header] = row[i];
      });
      return obj;
    });
}

function getLastUpdated_(spreadsheet) {
  try {
    return DriveApp.getFileById(spreadsheet.getId()).getLastUpdated().toISOString();
  } catch (err) {
    return null;
  }
}

function respond_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
