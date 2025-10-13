# 📊 Sales Log Pro

[![Version](https://img.shields.io/badge/version-8.1.0-blue.svg)](CHANGELOG.md)
[![Platform](https://img.shields.io/badge/platform-Google%20Apps%20Script-green.svg)](https://developers.google.com/apps-script)
[![License](https://img.shields.io/badge/license-Commercial-orange.svg)](LICENSE)

## _Professional Automotive Sales Tracking & Analytics for Google Sheets_

Transform your dealership's sales operations with **Sales Log Pro** — a production-ready, enterprise-grade sales management system that eliminates manual tracking errors, automates daily reporting, and delivers real-time performance insights. Built specifically for automotive dealerships, our battle-tested solution integrates seamlessly with your existing Google Sheets workflow.

### 🎯 Why Choose Sales Log Pro?

**Sales Log Pro** is the complete sales management solution that pays for itself from day one by eliminating errors, saving hours of manual work, and providing instant visibility into your team's performance.

✅ **Zero Learning Curve** — Works within your existing Google Sheets environment
✅ **10-Minute Setup** — One-click wizard creates everything automatically
✅ **No Code Editing** — User-friendly Settings UI for all configuration
✅ **Real-Time Analytics** — Live dashboards with automated reporting
✅ **Error Prevention** — Built-in validation catches mistakes instantly
✅ **Production-Ready** — Enterprise-grade locking prevents data corruption
✅ **Automated Month-End** — Archive and rollover in seconds, not hours

---

## ✨ Key Features

### 🚀 **One-Click Setup Wizard**

Complete installation in minutes with automated sheet creation, pre-configured formatting, and intelligent data structure setup.

### ⚙️ **Settings UI (No Code Required)**

Manage your entire configuration through an intuitive sidebar interface — salespeople, colors, thresholds, and date settings without touching code.

### 📊 **Real-Time Analytics Dashboard**

Comprehensive sales metrics automatically calculated and displayed: team totals, individual rankings, performance percentages, and 3-month rolling averages.

### 🔄 **Automated Month-End Rollover**

One-click month archiving with preserved analytics, automatic MTD reset, and recalculated rolling averages.

### 👥 **Salesperson Alias System**

Flexible name mapping handles nicknames, display codes, and full names — plus automatic split sales support (John/Jane = 0.5 each).

### 🔍 **Duplicate Detection**

Smart stock number validation highlights duplicates and cross-references deposit records to prevent entry errors.

### 🤝 **Split Sales Support**

Seamlessly handles shared sales with automatic fractional credit calculation and accurate performance tracking.

### 🏆 **Performance Leaderboards**

Live rankings with color-coded pace indicators, month-to-date totals, and rolling averages for instant performance visibility.

### 📈 **3-Month Rolling Averages**

Automatic calculation of historical performance trends from archived month data for accurate forecasting.

---

## ⚡ Quick Start

Get up and running in under 10 minutes with our streamlined setup process.

### Prerequisites

- Google Workspace account
- Google Sheets access
- Modern web browser (Chrome, Firefox, Safari, or Edge recommended)

### Installation Overview

1. **Create Your Spreadsheet** — Open Google Sheets and create a new spreadsheet
2. **Deploy the Code** — Copy scripts to Apps Script editor (Extensions → Apps Script)
3. **Run Setup Wizard** — Click Sales Tools → 🚀 Run Setup Wizard
4. **Configure Your Team** — Add salespeople via Settings sidebar (optional)
5. **Start Tracking** — Begin logging sales immediately

📖 **[Complete Setup Guide →](QUICKSTART.md)** — Full 10-minute installation walkthrough

---

## 📚 Documentation

| Document                                                             | Description                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------- |
| **[Quick Start Guide](QUICKSTART.md)**                               | Get started in 10 minutes with step-by-step installation |
| **[User Guide](docs/guides/USER_GUIDE.md)**                          | Complete guide to daily operations and features          |
| **[Deployment Guide](docs/guides/DEPLOYMENT_GUIDE.md)**              | Production deployment and best practices                 |
| **[API Reference](docs/api/API_REFERENCE.md)**                       | Developer documentation and function reference           |
| **[Troubleshooting Guide](docs/troubleshooting/TROUBLESHOOTING.md)** | Common issues and solutions                              |
| **[FAQ](docs/troubleshooting/FAQ.md)**                               | Frequently asked questions                               |
| **[Support](SUPPORT.md)**                                            | How to get help and report issues                        |

---

## 💻 System Requirements

### Required

- **Google Workspace Account** with Apps Script access
- **Google Sheets** with appropriate permissions
- **Modern Web Browser** for configuration interface

### Recommended

- **Chrome or Firefox** for optimal Settings UI experience
- **Editor permissions** for full functionality
- **Regular backups** via month archiving

---

## 📁 Project Structure

```bash
sales-log-pro/
├── src/                          # Source code files
│   ├── core_saleslogPro.js      # Main processing engine
│   ├── config_service.js        # Configuration management
│   ├── sales_analytics.js       # Analytics calculations
│   ├── setup_wizard.js          # Installation wizard
│   ├── config_sidebar.html      # Settings UI
│   └── *.html                   # UI components
├── docs/                         # Comprehensive documentation
│   ├── guides/                  # User and deployment guides
│   ├── api/                     # API reference documentation
│   └── troubleshooting/         # Help and FAQ
├── config/                       # Configuration examples
│   └── config.example           # Sample configuration
├── examples/                     # Sample data and workflows
│   ├── sample_sales_data.csv    # Example sales data
│   ├── sample_salespeople.csv   # Example team roster
│   └── SAMPLE_WORKFLOW.md       # Usage examples
├── .clasp.json                  # Apps Script deployment config
├── appsscript.json              # Apps Script manifest
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # License agreement
├── QUICKSTART.md               # Quick setup guide
├── SUPPORT.md                  # Support information
└── README.md                   # This file
```

---

## 🛟 Support & Licensing

### Getting Help

- **📖 Documentation** — Comprehensive guides available in [`/docs`](docs/)
- **❓ FAQ** — Common questions answered in [`FAQ.md`](docs/troubleshooting/FAQ.md)
- **🐛 Issues** — Report problems via our [support channels](SUPPORT.md)
- **💬 Community** — Connect with other users and get tips

### Licensing

**Sales Log Pro** is available as a commercial template product. See [`LICENSE`](LICENSE) for complete terms and conditions.

- ✅ Commercial use permitted under license terms
- ✅ Customization and modification allowed
- ✅ Redistribution subject to license agreement
- 📄 Review [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution policies

---

## 📋 Version Information

**Current Version:** 8.1.0
**Release Date:** October 2025
**Status:** Production-Ready

### What's New in 8.1.0

- 🔄 **Automatic Lock Retry** — Exponential backoff handles concurrent access gracefully
- 🛡️ **Robust Error Handling** — Non-fatal cache operations and graceful degradation
- 📊 **Smart Storage Management** — Automatic cleanup of old metadata prevents quota issues
- 🎯 **Enhanced Reliability** — Operations continue successfully even when auxiliary services fail
- 📝 **Comprehensive Logging** — Detailed diagnostics with severity levels for better monitoring

### What's New in 8.0.0

- ✨ **Easy Setup Wizard** — One-click installation with automated sheet creation
- ⚙️ **Settings Sidebar UI** — No-code configuration interface
- 📊 **Analytics Dashboard** — Comprehensive sales metrics and rankings
- 🔄 **Auto-Migration** — Seamless upgrade from legacy configurations
- 🎨 **Visual Customization** — All colors and thresholds configurable
- 📅 **Flexible Date Settings** — User-configurable business rules
- 🔐 **Enhanced Security** — Server-side validation and XSS prevention

📝 **[View Complete Changelog →](CHANGELOG.md)**

---

## 👨‍💻 Author & Credits

**Sales Log Pro** — Professional Automotive Sales Management System

Copyright © 2025 This is Sean LLC. All rights reserved.

### Acknowledgments

Built with Google Apps Script and leveraging the Google Sheets API. Special thanks to the automotive dealership community for valuable feedback and real-world testing.

📄 **[View Complete Attributions →](ATTRIBUTIONS.md)**

---

## 🚀 Get Started Today

Ready to transform your dealership's sales tracking? Install **Sales Log Pro** and experience the difference that professional automation makes.

1. **[Read the Quick Start Guide](QUICKSTART.md)** — 10-minute setup walkthrough
2. **[Review the User Guide](docs/guides/USER_GUIDE.md)** — Learn all features
3. **[Check System Requirements](#-system-requirements)** — Ensure compatibility
4. **[Get Support](SUPPORT.md)** — Help is available

---

**Sales Log Pro v8.1.0** — Transform Your Sales Tracking Today

[![Get Started](https://img.shields.io/badge/Get%20Started-Quick%20Start%20Guide-brightgreen?style=for-the-badge)](QUICKSTART.md)
[![Documentation](https://img.shields.io/badge/Read-Documentation-blue?style=for-the-badge)](docs/guides/USER_GUIDE.md)
[![Support](https://img.shields.io/badge/Get-Support-orange?style=for-the-badge)](SUPPORT.md)

---
