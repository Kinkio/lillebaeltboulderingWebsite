/**
 * Google Apps Script for Lillebælt Bouldering Event Registration Form
 * 
 * Setup Instructions:
 * 1. Create a new Google Spreadsheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this script
 * 4. Save and deploy as a Web App
 * 5. Copy the Web App URL and update it in form-handler.js
 */

// Replace 'YOUR_SPREADSHEET_ID' with your actual Google Spreadsheet ID
const GOOGLE_SCRIPT_URL = window.LillebaeltConfig?.GOOGLE_SCRIPT_URL
const SHEET_NAME = 'Lillebælt Bouldering - ansvarsfraskrivelse';

function doPost(e) {
  try {
    // Parse the JSON data from the form
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      
      // Add headers
      const headers = [
        'Timestamp',
        'Fulde Navn',
        'Email', 
        'Telefon',
        'Event Type',
        'Vilkår Accepteret'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#3d414c');
      headerRange.setFontColor('#ffffff');
    }
    
    // Prepare row data
    const rowData = [
      data.timestamp || new Date().toLocaleString('da-DK'),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.event || '',
      data.experience || '',
      data.dietary || '',
      data.emergency_contact || '',
      data.comments || '',
      data.newsletter === 'yes' ? 'Ja' : 'Nej',
      data.terms ? 'Ja' : 'Nej'
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length);
    
    // Send confirmation email (optional)
    if (data.email) {
      sendConfirmationEmail(data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Registration submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Error processing submission: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(data) {
  try {
    const subject = 'Bekræftelse af tilmelding - Lillebælt Bouldering';
    const body = `
Hej ${data.name},

Tak for din tilmelding til ${data.event}!

Vi har modtaget følgende information:
- Event: ${data.event}
- Erfaring: ${data.experience}
- Email: ${data.email}
- Telefon: ${data.phone || 'Ikke angivet'}

Vi kontakter dig snart med flere detaljer om eventet.

Hvis du har spørgsmål, er du velkommen til at kontakte os på lillebaeltbouldering@gmail.com

Venlig hilsen,
Lillebælt Bouldering Team

---
Dette er en automatisk bekræftelse. Svar ikke på denne email.
    `;
    
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body
    });
    
    console.log('Confirmation email sent to:', data.email);
    
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

// Test function for debugging
function testFunction() {
  const testData = {
    timestamp: new Date().toLocaleString('da-DK'),
    name: 'Test Bruger',
    email: 'test@example.com',
    phone: '12345678',
    terms: true
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  console.log('Test result:', result.getContent());
}
