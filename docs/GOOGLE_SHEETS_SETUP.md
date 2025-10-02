# Google Sheets Integration Setup

## Current Status
✅ GitHub Secret `WAIVER_SCRIPT_URL` is configured  
✅ Jekyll environment plugin is set up  
✅ GitHub Actions workflow passes the secret  
⚠️ Need to complete Google Apps Script setup  

## What You Need to Do

### 1. Set up your Google Spreadsheet ID
In your Google Apps Script (where you have the WAIVER_SCRIPT_URL), you need to:

1. Open your Google Spreadsheet
2. Copy the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
3. In your Google Apps Script, replace `YOUR_ACTUAL_SPREADSHEET_ID_HERE` with this ID

Example:
```javascript
// If your Google Sheets URL is:
// https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
// Then your Spreadsheet ID is:
const WAIVER_SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
```

### 2. Test the Setup

**For Production (GitHub Pages):**
- The form will automatically use your GitHub secret `WAIVER_SCRIPT_URL`
- Data will be sent to your Google Spreadsheet
- Confirmation emails will be sent

**For Local Development:**
- The form will show "TEST MODE" message since no URL is configured locally
- This is normal and expected behavior

### 3. Verify it's Working

1. **Test your Google Apps Script directly:**
   - Visit your script URL in a browser
   - You should see: "Google Apps Script is working!"

2. **Test the form submission:**
   - Fill out the form on your live website
   - Check if data appears in your Google Spreadsheet
   - Check if confirmation email is sent

## Files Configured

- ✅ `assets/js/config.js` - Uses GitHub secret in production
- ✅ `_plugins/environment.rb` - Loads environment variables  
- ✅ `.github/workflows/jekyll.yml` - Passes secret to build
- ✅ `docs/waiver-script.js` - Google Apps Script code
- ✅ `javascript/waiver-form.js` - Form submission logic

## Troubleshooting

If the form still shows "TEST MODE" on your live site:
1. Check that your GitHub secret `WAIVER_SCRIPT_URL` is set correctly
2. Make sure your site is deployed from the main branch
3. Verify the GitHub Actions build completed successfully

If data isn't reaching Google Sheets:
1. Check your Google Apps Script has the correct Spreadsheet ID
2. Verify your script is deployed as a Web App with "Anyone" access
3. Check the browser console for any error messages
