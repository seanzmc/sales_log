# Contributing to Sales Log Pro

## Commercial Software Notice

**Sales Log Pro is a commercial software product.** This repository contains proprietary code that is licensed to customers for their business use. Unlike open-source projects, this software is not accepting public contributions or pull requests.

## Support Model

### For Licensed Customers

Support and feature development for Sales Log Pro is provided exclusively to licensed customers. If you have purchased a license for this software, you have access to:

- **Technical Support**: Assistance with installation, configuration, and troubleshooting
- **Bug Reports**: Priority handling of reported issues
- **Feature Requests**: Input on future development priorities
- **Updates**: Access to new versions and improvements

### Support Channels

Licensed customers can access support through:

- **Email Support**: Contact your account representative or use the support email provided with your license
- **Documentation**: Comprehensive documentation available in the [docs/](docs/) directory and [README.md](README.md)
- **Priority Response**: Support requests from licensed customers receive priority handling

### Response Times

We strive to provide timely support to our customers:

- **Critical Issues**: Response within 1 business day
- **General Support**: Response within 2 business days
- **Feature Requests**: Acknowledgment within 3 business days

_Response times are for initial acknowledgment. Resolution time varies based on issue complexity._

---

## Reporting Issues

### For Licensed Customers

If you encounter a bug or issue with Sales Log Pro:

1. **Verify Your License**: Ensure you have an active, valid license
2. **Check Documentation**: Review [README.md](README.md) and [SUPPORT.md](SUPPORT.md) for solutions
3. **Gather Information**: Collect the following before reporting:
   - Sales Log Pro version (check Settings → About)
   - Google Apps Script environment details
   - Steps to reproduce the issue
   - Error messages or screenshots
   - Impact on your business operations
4. **Contact Support**: Use your designated support channel with the gathered information

### What to Include in Bug Reports

A complete bug report should contain:

- **Title**: Brief, descriptive summary of the issue
- **Description**: Detailed explanation of the problem
- **Steps to Reproduce**: Numbered list of actions that cause the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: Visual evidence if applicable
- **Impact**: How this affects your daily operations
- **Workaround**: Any temporary solution you've found (if applicable)

**Example:**

```txt
Title: Process Daily fails with "undefined" error when stock number is blank

Description:
When processing daily sales, the system shows an error if any stock
number field is left blank.

Steps to Reproduce:
1. Enter a sale in TODAY sheet
2. Leave the Stock Number field empty
3. Click Sales Log → Process Daily
4. Error appears: "Cannot read property 'toString' of undefined"

Expected Behavior:
System should either accept blank stock numbers or provide a clear
validation message

Actual Behavior:
Script fails with technical error message

Impact:
Blocks daily processing for all sales, preventing end-of-day reports

Screenshots:
[Screenshot of error message]
```

---

## Feature Requests

### Requesting New Features

We welcome feature suggestions from licensed customers. Your input helps shape the product roadmap.

**How to Submit Feature Requests:**

1. **Check Existing Features**: Review current documentation to ensure the feature doesn't already exist
2. **Describe the Need**: Explain the business problem you're trying to solve
3. **Provide Context**: Include your use case and how often you'd use this feature
4. **Contact Support**: Submit via your designated support channel

### Feature Request Format

- **Feature Name**: Brief title for the feature
- **Business Need**: What problem does this solve?
- **Use Case**: Describe how you would use this feature
- **Current Workaround**: How do you handle this currently?
- **Frequency**: How often would you use this feature?
- **Priority**: Low / Medium / High (from your perspective)

**Example:**

```code
Feature Name: Export to CSV

Business Need:
Need to export monthly sales data to external accounting software

Use Case:
At month-end, export the archived month sheet to CSV format for
import into QuickBooks

Current Workaround:
Manually copy/paste data, then reformat in Excel before importing

Frequency:
Once per month, every month

Priority:
High - Currently requires 30 minutes of manual work monthly
```

### Feature Evaluation

Feature requests are evaluated based on:

- **Customer Demand**: How many customers would benefit
- **Business Impact**: Value provided to daily operations
- **Technical Feasibility**: Implementation complexity and compatibility
- **Roadmap Alignment**: Fit with planned development direction

---

## Code of Conduct

### Professional Standards

While this is commercial software, we maintain high professional standards in all interactions:

- **Respect**: Treat all support staff and fellow customers with courtesy
- **Clarity**: Provide clear, accurate information in all communications
- **Responsiveness**: Reply to support inquiries in a timely manner
- **Confidentiality**: Do not share proprietary information or license keys

### Unacceptable Behavior

The following behaviors are not tolerated:

- Harassment or abusive language toward support staff
- Sharing license keys or attempting to circumvent licensing
- Reverse engineering or unauthorized modification of code
- Redistribution of software without authorization
- Submitting false or misleading bug reports

### Enforcement

Violations of professional standards may result in:

- Warning and request for corrective action
- Temporary suspension of support services
- Termination of license (in severe cases)

---

## Development and Maintenance

### Internal Development

Sales Log Pro is developed and maintained by a dedicated team. Development priorities are based on:

1. **Critical Bug Fixes**: Issues affecting core functionality
2. **Security Updates**: Patches for security vulnerabilities
3. **Customer Feature Requests**: Enhancements requested by licensed customers
4. **Performance Improvements**: Optimizations for better user experience
5. **New Features**: Strategic additions to product capabilities

### Release Cycle

- **Major Releases**: Significant new features (quarterly)
- **Minor Releases**: Feature enhancements and improvements (monthly)
- **Patch Releases**: Bug fixes and critical updates (as needed)

Customers are notified of all releases via their registered support email.

---

## Licensing and Intellectual Property

### Copyright

Sales Log Pro is proprietary software. All rights reserved.

- **Copyright**: © 2025 This is Sean LLC
- **License**: Commercial use only, pursuant to individual license agreements
- **Restrictions**: No unauthorized copying, modification, or distribution

### Third-Party Components

This software uses third-party libraries and services subject to their respective licenses. See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for details.

---

## Questions?

For any questions about this policy or Sales Log Pro in general:

- **Licensed Customers**: Contact your support representative
- **Prospective Customers**: Contact sales for licensing information
- **General Inquiries**: Refer to [README.md](README.md) for product information

---

**Thank you for choosing Sales Log Pro.** We're committed to providing excellent software and support to help your sales team succeed.
