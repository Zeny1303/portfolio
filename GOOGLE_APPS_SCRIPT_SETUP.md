# Google Apps Script + Google Sheets + Google Drive Contact Backend Setup Guide

This guide details how to set up your Google Sheet, Google Drive folder, and Google Apps Script Web App to handle portfolio contact form submissions (text, voice, and text+voice).

---

## 1. Google Sheet Setup

1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name the spreadsheet: **Portfolio Contacts**
3. In Row 1, add these exact column headers:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **Timestamp** | **Name** | **Email** | **Message** | **Voice URL** | **Submission Type** |

---

## 2. Google Apps Script Code (`Code.gs`)

1. In your Google Sheet, click **Extensions** → **Apps Script**.
2. Replace all existing code in `Code.gs` with the following complete code:

```javascript
function doPost(e) {
  try {
    var data = {};
    
    // Parse incoming JSON payload
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 1. Anti-Spam Check (Honeypot field)
    if (data.honeypot && String(data.honeypot).trim() !== "") {
      return responseJSON({ success: false, message: "Spam detected." });
    }

    // 2. Input Validation
    var name = data.name ? String(data.name).trim() : "";
    var email = data.email ? String(data.email).trim() : "";
    var message = data.message ? String(data.message).trim() : "";
    var voiceBase64 = data.voiceBase64 || "";
    var voiceMimeType = data.voiceMimeType || "audio/webm";
    var voiceFilename = data.voiceFilename || ("voice-message-" + Date.now() + ".webm");

    if (!name || name.length > 100) {
      return responseJSON({ success: false, message: "Name is required (max 100 characters)." });
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 254 || !emailRegex.test(email)) {
      return responseJSON({ success: false, message: "Please provide a valid email address." });
    }

    if (!message && !voiceBase64) {
      return responseJSON({ success: false, message: "Either a text message or a voice recording is required." });
    }

    if (message.length > 5000) {
      return responseJSON({ success: false, message: "Message is too long (max 5000 characters)." });
    }

    // 3. Process Voice Recording (Google Drive Integration)
    var voiceUrl = "";
    var submissionType = "text";

    if (voiceBase64) {
      submissionType = message ? "voice+text" : "voice";

      // Validate max 5 MB size (5 MB binary ≈ 6,700,000 base64 chars)
      if (voiceBase64.length > 7000000) {
        return responseJSON({ success: false, message: "Voice recording is too large (maximum allowed size is 5 MB)." });
      }

      // Decode Base64 string to audio Blob
      var decodedBytes = Utilities.base64Decode(voiceBase64);
      var blob = Utilities.newBlob(decodedBytes, voiceMimeType, voiceFilename);

      // Get or create dedicated Google Drive folder
      var FOLDER_NAME = "Portfolio Contact Voice Messages";
      var folders = DriveApp.getFoldersByName(FOLDER_NAME);
      var folder;
      if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = DriveApp.createFolder(FOLDER_NAME);
      }

      // Save audio file to Drive
      var file = folder.createFile(blob);
      voiceUrl = file.getUrl();
    }

    // 4. Append Record to Google Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Message", "Voice URL", "Submission Type"]);
    }

    var timestamp = new Date().toISOString();
    sheet.appendRow([timestamp, name, email, message, voiceUrl, submissionType]);

    return responseJSON({
      success: true,
      message: "Message received successfully",
      voiceUrl: voiceUrl
    });

  } catch (err) {
    return responseJSON({
      success: false,
      message: "Error processing submission: " + err.toString()
    });
  }
}

function responseJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Save the script (Click the 💾 icon or press `Ctrl + S`).

---

## 3. Deploy Web App

1. In Apps Script editor, click **Deploy** (top right) → **New deployment**.
2. Click the gear icon ⚙️ next to *Select type* → Choose **Web app**.
3. Configure deployment settings:
   - **Description**: `Portfolio Contact Web App`
   - **Execute as**: **Me** (`your-email@gmail.com`)
   - **Who has access**: **Anyone** *(Crucial so visitors can submit anonymously)*
4. Click **Deploy**.
5. Grant permissions if prompted (Click *Review Permissions* → Select Google Account → Click *Advanced* → Click *Go to Project (unsafe)* → Click *Allow*).
6. Copy the **Web App URL** generated (starts with `https://script.google.com/macros/s/.../exec`).

---

## 4. Frontend Environment Variable Configuration

### **Local Development (.env)**
In `sneha-portfolio/.env`, add:
```env
VITE_GOOGLE_SHEET_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### **Production (Vercel)**
1. Go to your **Vercel Dashboard** → Select **portfolio** project → **Settings** → **Environment Variables**.
2. Add a new variable:
   - **Key**: `VITE_GOOGLE_SHEET_WEB_APP_URL`
   - **Value**: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
3. Go to **Deployments** tab in Vercel → Click `...` next to top deployment → Select **Redeploy**.

---

## 5. Verification Checklist

- [x] **Text-only submission**: Inserts new row with timestamp, name, email, message, empty Voice URL, and `text` submission type.
- [x] **Voice-only submission**: Creates WebM/MP4 file in Google Drive folder `Portfolio Contact Voice Messages`, inserts row with Drive URL and `voice` submission type.
- [x] **Voice + Text submission**: Saves file to Drive, inserts full row with Drive URL and `voice+text` submission type.
- [x] **5 MB Size Limit**: Enforced on both frontend and Apps Script.
- [x] **Old Node.js Backend**: Untouched as fallback if `VITE_GOOGLE_SHEET_WEB_APP_URL` is omitted.
