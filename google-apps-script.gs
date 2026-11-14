const SPREADSHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Visit Requests';
const HEADERS = [
  'CreatedAt',
  'Name',
  'PhoneNumber',
  'Address',
  'AddressType',
  'PreferredVisitTime',
  'LocationMap',
  'Landmark'
];

function doPost(event) {
  const lock = LockService.getScriptLock();
  let lockAcquired = false;

  try {
    lock.waitLock(10000);
    lockAcquired = true;

    const visit = JSON.parse(event.postData.contents);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      new Date(),
      visit.name || '',
      visit.phone || '',
      visit.address || '',
      visit.addressType || '',
      visit.preferredVisitTime || '',
      visit.locationMap || '',
      visit.landmark || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error(error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Unable to save visit request.' }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (lockAcquired) {
      lock.releaseLock();
    }
  }
}