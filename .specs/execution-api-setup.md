# Enabling the Apps Script Execution API and Deploying as API Executable

This document outlines the steps required to enable the Apps Script Execution API for your project and deploy your script as an API executable.

1. Identify or Create Your GCP Project
   * In the Apps Script editor, click the ⚙️ **Project Settings** icon.
   * Under **Google Cloud Platform (GCP) Project**, note the project number. If it reads “Default,” click **Change project** and link to a new or existing GCP project.

2. Enable the Apps Script API
   * Open the Cloud Console: https://console.cloud.google.com/apis/library
   * Select your script’s GCP project via the project selector at the top.
   * Search for **“Apps Script API”** (script.googleapis.com) and click **Enable**.
   * Alternatively, run in your terminal with gcloud:
     ```
     gcloud services enable script.googleapis.com --project YOUR_PROJECT_ID
     ```

3. Deploy as API Executable
   * In the Apps Script editor, click **Deploy ▶️ New deployment**.
   * Choose **“API executable”** as the deployment type.
   * Add a description (e.g. “v1 Testing”), then click **Deploy**.
   * Note the **Deployment ID** for any REST or clasp calls.

4. Grant OAuth Scopes & Reauthorize
   * Under **Deploy ▶️ Test deployments**, verify that OAuth scopes include:
     - `https://www.googleapis.com/auth/script.projects`
     - `https://www.googleapis.com/auth/script.scriptapp`
   * Save changes and re-authorize if prompted.

5. Rerun Your Tests
   * In your terminal (with clasp configured), execute:
     ```
     clasp run runAllTests --dev
     ```
   * Confirm that tests now pass against the deployed API executable.
