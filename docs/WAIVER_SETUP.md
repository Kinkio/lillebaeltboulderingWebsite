# 🔒 Ansvarsfraskrivelse Setup

Simple setup guide for the liability waiver form.

## 🚀 Setup Steps

### Step 1: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet: "Lillebælt Bouldering - Liability Waivers"
3. Copy the spreadsheet ID from the URL

### Step 2: Setup Google Apps Script
1. In your spreadsheet: **Extensions** → **Apps Script**
2. Replace default code with the waiver script code
3. Replace `'YOUR_WAIVER_SPREADSHEET_ID'` with your spreadsheet ID
4. **Deploy** → **New deployment** → **Web app**
5. Set permissions: Execute as "Me", Access "Anyone"
6. Copy the Web App URL

### Step 3: Add GitHub Secret
1. Go to: `https://github.com/Kinkio/lillebaeltboulderingWebsite/settings/secrets/actions`
2. Click "New repository secret"
3. Name: `WAIVER_SCRIPT_URL`
4. Value: Your Web App URL
5. Save

### Step 4: Test
1. Push changes to trigger deployment
2. Visit your site and test the waiver form
3. Check that submissions appear in your Google Spreadsheet

## 📋 Form Features

- **Personal Information**: Name, birth date, contact details
- **Health Information**: Medical conditions and allergies
- **Legal Consents**: Risk acknowledgment, liability waiver, safety commitments
- **Digital Signature**: Name matching validation
- **Age Verification**: Automatic warning for under-18 participants
- **Email Confirmations**: Automatic emails to participant and administrators

## 🛡️ Security

- HTTPS encrypted submissions
- IP address logging for audit trail
- Digital signature validation
- Secure Google Apps Script processing
