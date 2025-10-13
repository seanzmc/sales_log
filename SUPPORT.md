# Sales Log Pro - Support

## Support Overview

Sales Log Pro provides professional support to licensed customers. This document outlines available support resources, how to get help, and troubleshooting guidance.

---

## Support Eligibility

**Support is provided exclusively to licensed customers** with active, valid licenses.

Before requesting support, please verify:

- You have a current Sales Log Pro license
- Your license has not expired
- You have your license key or customer ID available

---

## Support Channels

### Email Support

**Primary support channel for licensed customers**

- **Response Time**: 1-2 business days for initial response
- **Hours**: Monday-Friday, 9 AM - 5 PM EST
- **Contact**: Use the support email provided with your license documentation

### Documentation

**Self-service resources available 24/7**

- **README.md**: Comprehensive product documentation
- **QUICKSTART.md**: Quick installation and setup guide
- **docs/ Directory**: Detailed technical documentation
  - API reference
  - User guides
  - Troubleshooting guides
  - Architecture documentation

### Knowledge Base

Check documentation first for common issues:

- Installation and setup procedures
- Configuration options and settings
- Common error messages and solutions
- Best practices for daily operations

---

## Getting Help

### Before Contacting Support

1. **Review Documentation**: Check [README.md](README.md) and relevant guides
2. **Check Troubleshooting Section**: See common issues below
3. **Gather Information**: Collect details about your issue (see below)
4. **Try Simple Solutions**: Refresh the page, clear cache, re-run the operation

### What to Include in Support Requests

To receive the fastest, most effective support, include:

#### Required Information

- **License Information**: Customer ID or license key
- **Sales Log Pro Version**: Found in Settings → About (if accessible)
- **Issue Description**: Clear explanation of the problem
- **Steps to Reproduce**: Numbered list showing how to recreate the issue
- **Expected vs Actual Behavior**: What should happen vs what does happen

#### Helpful Additional Information

- **Error Messages**: Complete text of any error messages
- **Screenshots**: Visual evidence of the issue
- **Recent Changes**: Any recent configuration changes or updates
- **Browser/Environment**: Browser version, Google Sheets version
- **Impact**: How this affects your daily operations
- **Urgency**: Critical / High / Medium / Low

### Support Request Template

```
Subject: [Brief description of issue]

License ID: [Your customer ID or license key]
Version: [Sales Log Pro version]

Description:
[Detailed explanation of the problem]

Steps to Reproduce:
1. [First step]
2. [Second step]
3. [Result/Error]

Expected Behavior:
[What should happen]

Actual Behavior:
[What actually happens]

Error Messages:
[Complete error text, if any]

Impact:
[How this affects your operations]

Screenshots:
[Attach relevant screenshots]
```

---

## Response Time Expectations

### Support Request Priority Levels

**Critical (Response within 4-8 business hours)**

- System completely non-functional
- Data loss or corruption
- Security vulnerability
- Blocks all daily operations

**High (Response within 1 business day)**

- Major feature not working
- Significant functionality impaired
- Affects multiple users
- Workaround exists but inconvenient

**Medium (Response within 2 business days)**

- Minor feature not working
- Cosmetic issues affecting usability
- Affects single user
- Workaround available

**Low (Response within 3-5 business days)**

- Feature requests
- Enhancement suggestions
- Questions about usage
- Documentation clarifications

_Note: Response times are for initial acknowledgment. Resolution time varies based on complexity._

---

## Self-Help Resources

### Troubleshooting Checklist

Before contacting support, try these common solutions:

#### General Issues

- [ ] **Refresh the page**: Close and reopen the Google Sheet
- [ ] **Clear cache**: Clear browser cache and cookies
- [ ] **Check permissions**: Verify you have edit access to the sheet
- [ ] **Wait for sync**: Allow 10-15 seconds for menu to appear after opening
- [ ] **Re-authorize**: Run any function from Apps Script to re-authorize if needed

#### Installation Issues

- [ ] **Verify all files copied**: Check that all source files are in Apps Script
- [ ] **File naming**: Ensure file extensions are correct (.gs for code, .html for HTML)
- [ ] **Save project**: Click Save icon in Apps Script editor
- [ ] **Authorization**: Complete the authorization flow when prompted
- [ ] **Run setup wizard**: Sales Log → Run Setup Wizard

#### Processing Issues

- [ ] **Check salesperson names**: Verify names match Settings configuration
- [ ] **Stock number format**: Ensure stock numbers are consistent
- [ ] **Date format**: Verify dates are in correct format (MM/DD/YYYY)
- [ ] **Required fields**: Ensure all required fields have data
- [ ] **Sheet name**: Verify you're working in the TODAY sheet

#### Configuration Issues

- [ ] **Settings accessible**: Confirm Settings sidebar opens (Sales Log → Settings)
- [ ] **Changes saved**: Click Save after making configuration changes
- [ ] **Valid data**: Ensure settings meet validation requirements
- [ ] **Reload sheet**: Refresh sheet after configuration changes

#### Performance Issues

- [ ] **Sheet size**: Large sheets (>1000 rows) may process slowly
- [ ] **Archive old data**: Use Archive Current Month to reduce sheet size
- [ ] **Browser memory**: Close unnecessary tabs to free up memory
- [ ] **Clear cache**: Clear Apps Script cache by re-running setup

---

## Common Issues and Solutions

### "Salesperson not found" Error

**Cause**: Name entered doesn't match configuration

**Solutions**:

1. Check exact spelling in Settings → Salespeople
2. Use configured aliases for variations
3. Add new salesperson if missing
4. Ensure no extra spaces in name entry

### Menu Doesn't Appear

**Cause**: Script not loaded or permissions issue

**Solutions**:

1. Refresh the spreadsheet page
2. Wait 10-15 seconds for menu to load
3. Open Apps Script editor and verify all files saved
4. Re-run authorization (Extensions → Apps Script → Run → onOpen)

### Setup Wizard Fails

**Cause**: Permissions or sheet structure issue

**Solutions**:

1. Verify you have edit permissions on the sheet
2. Ensure no sheets named TODAY, SALESPEOPLE, or LEADERBOARD exist
3. Check Apps Script execution log for specific errors
4. Try running setup wizard again

### Duplicate Stock Number Not Detected

**Cause**: Stock number format inconsistency

**Solutions**:

1. Use consistent format for all stock numbers (e.g., no leading zeros)
2. Ensure stock numbers are text or numbers, not formulas
3. Re-run Process Daily after correcting format
4. Check for extra spaces before/after stock numbers

### Settings Changes Not Applied

**Cause**: Cache or sync issue

**Solutions**:

1. Click Save button in Settings sidebar
2. Close and reopen the Settings sidebar
3. Refresh the spreadsheet
4. Clear cache by re-running a script function

### Slow Processing

**Cause**: Large dataset or first-time cache build

**Solutions**:

1. First run takes longer (15-30 seconds) due to cache building
2. Archive old months to reduce active data size
3. Close other browser tabs to free memory
4. Consider processing in smaller batches if >500 rows

---

## Technical Support

### For Advanced Issues

If basic troubleshooting doesn't resolve your issue:

1. **Check Execution Log**:

   - Open Apps Script editor
   - View → Executions
   - Review recent execution logs for errors

2. **Enable Detailed Logging**:

   - Some functions log additional details
   - Check Apps Script → View → Logs

3. **Review Error Stack Traces**:
   - Full error messages often indicate the root cause
   - Include stack trace when contacting support

### System Requirements

**Supported:**

- Google Workspace (all editions)
- Personal Gmail accounts with Google Sheets
- Modern web browsers (Chrome, Firefox, Safari, Edge)
- Mobile access via Google Sheets app (limited functionality)

**Not Supported:**

- Offline mode (requires Google Apps Script server)
- Third-party sheet applications
- Legacy Google Sheets (old version)

---

## Feature Requests and Enhancements

### Suggesting Improvements

We value customer feedback on product improvements.

**How to Submit**:

1. Use support email with subject: "Feature Request: [Brief Description]"
2. Include:
   - Description of desired feature
   - Business use case
   - Current workaround (if any)
   - Expected frequency of use
   - Priority level (from your perspective)

**Evaluation Process**:

- Feature requests are logged and reviewed quarterly
- Decisions based on customer demand, technical feasibility, and roadmap alignment
- High-demand features are prioritized for development

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed feature request guidelines.

---

## License Verification

### Required for Support

Support requests require valid license verification:

- **License Key**: Provided at time of purchase
- **Customer ID**: Associated with your purchase
- **Registered Email**: Email used for license purchase

### License Issues

**Lost License Key**:

- Contact support with purchase information
- Provide registered email address
- Include approximate purchase date

**Expired License**:

- Contact sales for renewal options
- Support available during renewal process

**Multiple Installations**:

- License terms specify number of allowed installations
- Contact sales for additional licenses

---

## Emergency Support

### Critical Issues

For critical, business-stopping issues:

1. **Mark as Critical**: Use "CRITICAL" in email subject line
2. **Include Impact**: Describe business impact clearly
3. **Provide Details**: Complete information for faster resolution
4. **Be Available**: Respond quickly to support follow-up questions

**Critical Issue Definition**:

- Complete system failure
- Data loss or corruption
- Security breach
- Total inability to process daily sales

### Business Hours

- **Standard Support**: Monday-Friday, 9 AM - 5 PM EST
- **Critical Issues**: Escalated for fastest possible response
- **After Hours**: Limited emergency support for critical issues only

---

## Additional Resources

### Training and Onboarding

- **Documentation**: Comprehensive guides in docs/ directory
- **Quick Start**: See [QUICKSTART.md](QUICKSTART.md) for fast setup
- **Best Practices**: README.md includes usage guidelines

### Community

While Sales Log Pro doesn't have a public community forum, licensed customers can:

- Share tips via support channel
- Request peer connections for large deployments
- Access customer success stories and case studies

---

## Contact Information

**Licensed Customers**:

- Use the support email provided with your license documentation
- Include your license key or customer ID in all communications

**Prospective Customers**:

- For sales inquiries, licensing information, or product demonstrations
- Refer to product documentation for general information

**General Inquiries**:

- See [README.md](README.md) for product overview
- See [CONTRIBUTING.md](CONTRIBUTING.md) for development policies

---

## Feedback

We continually improve our support based on customer feedback.

**Help us serve you better**:

- Rate your support experience
- Suggest documentation improvements
- Report unclear or missing information

**Thank you for choosing Sales Log Pro!**

We're committed to your success with our software.
