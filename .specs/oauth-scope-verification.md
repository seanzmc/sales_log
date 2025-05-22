# Verifying and Updating OAuth Scopes for Apps Script

1. In the Apps Script Editor:
   * Click ⚙️ **Project Settings**.
   * Enable **Show "appsscript.json" manifest**.

2. Open **appsscript.json** in the file list.

3. Locate or add the **oauthScopes** field, for example:
   "oauthScopes": [
     "https://www.googleapis.com/auth/script.projects",
     "https://www.googleapis.com/auth/script.scriptapp",
     "https://www.googleapis.com/auth/spreadsheets.currentonly",
     "https://www.googleapis.com/auth/drive"
   ]

4. Ensure the necessary scopes are listed; add any missing ones.

5. Save the manifest.

6. Redeploy the script:
   * Click **Deploy ▶️ Manage deployments**.
   * Select your deployment and click **Edit**.
   * Click **Deploy** to update.

7. Reauthorize the script:
   * In the editor, click **Run ▶️ any function**.
   * Follow the authorization prompts.

After these steps, rerun `clasp run runAllTests` to verify tests pass.
