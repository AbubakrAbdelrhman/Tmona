# MEDLOG – DLOC Clinical Case Journal

A mobile-friendly static website for recording de-identified DLOC clinical learning records. The frontend is hosted on GitHub Pages; Google Apps Script receives submissions and stores them in Google Sheets.

## Included files

- `index.html` – site structure and welcome / gift experience
- `styles.css` – responsive navy, white and cyan visual design
- `app.js` – interactive multi-step forms and submission logic
- `Code.gs` – Google Apps Script endpoint and spreadsheet setup

## 1. Create the Google Sheets backend

1. Sign in to the Google account that should own the spreadsheet.
2. Open https://script.google.com/ and create a new project.
3. Replace the contents of `Code.gs` with the provided `Code.gs`.
4. Save the project.
5. Select `setupMedlog` and click **Run**.
6. Approve the requested Google permissions.
7. Open **Execution log** to find the created spreadsheet URL. The script creates three tabs:
   - Initial Assessments
   - Follow-ups
   - Final Outcomes

## 2. Deploy the Apps Script web app

1. In Apps Script, click **Deploy → New deployment**.
2. Select type **Web app**.
3. Set **Execute as** to your account.
4. Choose an access setting only after considering your institution's privacy and security requirements.
5. Deploy and copy the URL ending in `/exec`.

Important: A publicly accessible endpoint can be called by anyone who obtains its URL. This starter does not implement user authentication. Do not use it for identifiable patient information or sensitive clinical records without institutional approval and a proper security review. For real patient data, use an approved clinical system with access controls, audit logging, retention rules and appropriate legal safeguards.

## 3. Connect the website to Google Sheets

Open `app.js` and replace:

`PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`

with the deployed Apps Script URL, for example:

`https://script.google.com/macros/s/DEPLOYMENT_ID/exec`

Save the file.

The static website submits JSON using a no-cors request to avoid a browser preflight. The browser cannot read the Apps Script response, so the confirmation screen asks the user to verify the new row in Google Sheets. If you deploy a more advanced backend later, replace this submission method with an authenticated API that returns a verifiable response.

## 4. Publish on GitHub Pages

1. Create a new GitHub repository, for example `medlog-dloc`.
2. Upload `index.html`, `styles.css`, `app.js` and `README.md`.
3. Open repository **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish the site. Open the URL shown in the Pages settings.

## 5. Personalize the gift

Edit the welcome message in `index.html`. You can change:
- `MEDLOG` to a name of your choice.
- The welcome heading and dedication.
- The footer text.
- Colours and typography in `styles.css`.

## Current functionality

- Welcome / gift landing page.
- Initial DLOC assessment.
- Follow-up / reassessment linked by Case ID.
- Final outcome / disposition.
- Multi-step mobile-friendly form.
- Data saved to separate Google Sheets tabs.

## Important clinical and privacy limitations

- This is a starter clinical learning log, not a hospital electronic medical record.
- Never delay ABCDE assessment, resuscitation or treatment to complete the form.
- Do not enter names, hospital numbers, contact details, exact addresses or other identifiers.
- Do not assume a public GitHub Pages site or public Apps Script deployment is suitable for patient information.
- The form does not independently validate clinical decisions or calculate a GCS total.
- Follow local hospital policy and applicable data protection requirements.
