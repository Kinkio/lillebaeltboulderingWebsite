/**
 * Google Apps Script for Lillebælt Bouldering Liability Waiver Form
 * 
 * Setup Instructions:
 * 1. Create a new Google Spreadsheet for waivers
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this script
 * 4. Replace 'YOUR_WAIVER_SPREADSHEET_ID' with your spreadsheet ID
 * 5. Save and deploy as a Web App
 * 6. Copy the Web App URL and add to GitHub Secrets as WAIVER_SCRIPT_URL
 */

// Replace with your actual Google Spreadsheet ID (not the script URL!)
// This should be the long ID from your Google Sheets URL: 
// https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit
const WAIVER_SPREADSHEET_ID = '1_i61aT_8negN2Via9UU-4lwfLAG7-sWEcCRw28K4sCY';
const WAIVER_SHEET_NAME = 'Ansvarsfraskrivelse';

function doGet() {
  return ContentService
    .createTextOutput('Google Apps Script is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const spreadsheet = SpreadsheetApp.openById(WAIVER_SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(WAIVER_SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(WAIVER_SHEET_NAME);
      
      const headers = [
        'Timestamp',
        'Fulde Navn',
        'Fødselsdato',
        'Email', 
        'Telefon',
        'Adresse',
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#3d414c');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }
    
    // Prepare row data
    const rowData = [
      data.timestamp || new Date().toLocaleString('da-DK'),
      data.fullName || '',
      data.birthDate || '',
      data.email || '',
      data.phone || '',
      data.address || '',
    ];
    
    sheet.appendRow(rowData);
    sheet.autoResizeColumns(1, rowData.length);
    
    // Send confirmation email
    if (data.email) {
      sendWaiverConfirmationEmail(data);
    }
    
    // Send admin notification
    sendAdminNotification(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Waiver submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
  } catch (error) {
    console.error('Error processing waiver submission:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Error processing waiver: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendWaiverConfirmationEmail(data) {
  try {
    const subject = 'Bekræftelse af ansvarsfraskrivelse - Lillebælt Bouldering';
    const body = `
Hej ${data.fullName},

Tak for at udfylde vores ansvarsfraskrivelse!

Vi har modtaget og gemt følgende oplysninger:
- Navn: ${data.fullName}
- Email: ${data.email}
- Telefon: ${data.phone}

Din ansvarsfraskrivelse er nu registreret i vores system.

Hvis du har spørgsmål, er du velkommen til at kontakte os på lillebaeltbouldering@gmail.com

Klatr sikkert!
Lillebælt Bouldering Team
    `;
    
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body
    });
    
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

function sendAdminNotification(data) {
  try {
    const adminEmail = 'lillebaeltbouldering@gmail.com'; // Replace with actual admin email
    
    const subject = 'Ny ansvarsfraskrivelse modtaget - ' + data.fullName;
    const body = `
Ny ansvarsfraskrivelse:

Deltager: ${data.fullName}
Email: ${data.email}
Telefon: ${data.phone}
Fødselsdato: ${data.birthDate}

Alle samtykker: ${data.riskAcknowledgment === 'Ja' && data.liabilityWaiver === 'Ja' ? 'Ja' : 'NEJ - TJEK MANUELT'}

Helbredsproblemer: ${data.medicalConditions || 'Ingen angivet'}
Allergier: ${data.allergies || 'Ingen angivet'}
    `;
    
    MailApp.sendEmail({
      to: adminEmail,
      subject: subject,
      body: body
    });
    
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
}
