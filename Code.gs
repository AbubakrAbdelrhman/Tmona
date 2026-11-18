/**
 * MEDLOG Google Sheets receiver
 *
 * Setup:
 * 1. Create a new project at https://script.google.com/
 * 2. Paste this file into Code.gs.
 * 3. Run setupMedlog() once and authorize access.
 * 4. Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone (only if permitted by your organization's policy).
 * 5. Copy the Web app URL ending in /exec into GAS_WEB_APP_URL in app.js.
 *
 * PRIVACY: This starter is intended only for de-identified educational records.
 * A public Apps Script endpoint can be called by anyone who obtains its URL.
 * Do not store identifiable patient information or sensitive records without
 * appropriate institutional approval, access controls and security review.
 */

const SHEET_NAMES = {
  initial: "Initial Assessments",
  followup: "Follow-ups",
  outcome: "Final Outcomes"
};

function setupMedlog() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty("MEDLOG_SPREADSHEET_ID");
  let ss;
  if (id) {
    ss = SpreadsheetApp.openById(id);
  } else {
    ss = SpreadsheetApp.create("MEDLOG – DLOC Clinical Case Registry");
    id = ss.getId();
    props.setProperty("MEDLOG_SPREADSHEET_ID", id);
  }

  Object.keys(SHEET_NAMES).forEach(key => {
    const name = SHEET_NAMES[key];
    let sheet = ss.getSheetByName(name);
    if (!sheet) sheet = ss.insertSheet(name);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Case ID", "Record Type", "Data JSON"]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#10233f").setFontColor("#ffffff");
      sheet.setColumnWidths(1, 3, 180);
      sheet.setColumnWidth(4, 520);
    }
  });

  // Remove the default empty Sheet1 if other tabs exist.
  const defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && ss.getSheets().length > 1 && defaultSheet.getLastRow() === 0) {
    ss.deleteSheet(defaultSheet);
  }

  Logger.log("MEDLOG spreadsheet: " + ss.getUrl());
  return ss.getUrl();
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOutput({ok:false, error:"Missing request body"});
    }

    const payload = JSON.parse(e.postData.contents);
    const allowed = ["initial", "followup", "outcome"];
    if (!allowed.includes(payload.recordType) || !payload.data || typeof payload.data !== "object") {
      return jsonOutput({ok:false, error:"Invalid payload"});
    }

    const caseId = String(payload.data.caseId || "").trim();
    if (!caseId) return jsonOutput({ok:false, error:"Case ID is required"});

    const ssId = PropertiesService.getScriptProperties().getProperty("MEDLOG_SPREADSHEET_ID");
    if (!ssId) return jsonOutput({ok:false, error:"Run setupMedlog() first"});

    const ss = SpreadsheetApp.openById(ssId);
    const sheet = ss.getSheetByName(SHEET_NAMES[payload.recordType]);
    if (!sheet) return jsonOutput({ok:false, error:"Destination sheet not found"});

    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      sheet.appendRow([
        new Date(),
        caseId,
        payload.recordType,
        JSON.stringify(payload.data)
      ]);
    } finally {
      lock.releaseLock();
    }

    return jsonOutput({ok:true, caseId:caseId});
  } catch (err) {
    return jsonOutput({ok:false, error:String(err)});
  }
}

function doGet() {
  return jsonOutput({ok:true, service:"MEDLOG receiver", message:"Endpoint is running."});
}

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
