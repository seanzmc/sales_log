# Attributions and Third-Party Resources

Sales Log Pro is built using various third-party technologies, platforms, and resources. This document acknowledges and provides attribution for these components.

---

## Platform and Runtime Environment

### Google Apps Script

- **Purpose**: Core platform and runtime environment for Sales Log Pro
- **Provider**: Google LLC
- **License**: Apache License 2.0
- **Website**: <https://developers.google.com/apps-script>
- **Usage**: Provides the scripting environment, APIs, and execution infrastructure for all Sales Log Pro functionality

**Description**: Google Apps Script is a JavaScript-based development platform that makes it fast and easy to create business applications that integrate with Google Workspace. Sales Log Pro is built entirely on this platform, utilizing its APIs for Sheets, Properties Service, Cache Service, and UI components.

**License Terms**: Used in accordance with the Apache License 2.0 and Google's Terms of Service for Google Apps Script.

---

## Google Workspace APIs

### Google Sheets API (Apps Script Service)

- **Purpose**: Spreadsheet data management and manipulation
- **Provider**: Google LLC
- **License**: Subject to Google APIs Terms of Service
- **Documentation**: <https://developers.google.com/apps-script/reference/spreadsheet>
- **Usage**: All sheet creation, reading, writing, and formatting operations

**Key Features Used**:

- Spreadsheet and sheet management
- Range operations (reading/writing data)
- Formatting and styling
- Data validation
- Sheet protection

### Properties Service

- **Purpose**: Persistent key-value storage for configuration data
- **Provider**: Google LLC
- **License**: Subject to Google APIs Terms of Service
- **Documentation**: <https://developers.google.com/apps-script/reference/properties>
- **Usage**: Stores user configuration, settings, and preferences

### Cache Service

- **Purpose**: Temporary data caching for performance optimization
- **Provider**: Google LLC
- **License**: Subject to Google APIs Terms of Service
- **Documentation**: <https://developers.google.com/apps-script/reference/cache>
- **Usage**: Caches configuration data and computed values to improve response times

### HTML Service

- **Purpose**: Generates user interface components (sidebars, dialogs)
- **Provider**: Google LLC
- **License**: Subject to Google APIs Terms of Service
- **Documentation**: <https://developers.google.com/apps-script/reference/html>
- **Usage**: Creates Settings sidebar and configuration interfaces

### Lock Service

- **Purpose**: Prevents concurrent modification conflicts
- **Provider**: Google LLC
- **License**: Subject to Google APIs Terms of Service
- **Documentation**: <https://developers.google.com/apps-script/reference/lock>
- **Usage**: Ensures atomic configuration updates and data integrity

---

## Fonts and Typography

### Roboto Font Family

- **Purpose**: User interface typography
- **Designer**: Christian Robertson (Google)
- **License**: Apache License 2.0
- **Source**: Google Fonts
- **Website**: <https://fonts.google.com/specimen/Roboto>
- **Usage**: Primary font for Settings sidebar and UI components

**Variants Used**:

- Roboto Regular (400)
- Roboto Medium (500)
- Roboto Bold (700)

**License Information**: The Roboto font is licensed under the Apache License 2.0, allowing for commercial use, modification, and distribution. Full license text available at: <http://www.apache.org/licenses/LICENSE-2.0>

---

## JavaScript Standards and ECMAScript

### ECMAScript (JavaScript)

- **Purpose**: Programming language for all application logic
- **Standard**: ECMA-262 (ECMAScript Language Specification)
- **License**: Open standard maintained by Ecma International
- **Usage**: Core programming language for Sales Log Pro

**Compatibility**: Sales Log Pro uses ECMAScript features supported by the Google Apps Script V8 runtime.

---

## Development Tools and Resources

### Node.js and npm (Development Only)

- **Purpose**: Development dependency management (optional)
- **License**: MIT License (Node.js), Artistic License 2.0 (npm)
- **Website**: <https://nodejs.org/>
- **Usage**: Optional tooling for local development and clasp integration

**Note**: Not required for end-user deployment or operation.

### @google/clasp (Development Only)

- **Purpose**: Command-line tool for Apps Script development
- **Provider**: Google LLC
- **License**: Apache License 2.0
- **Repository**: <https://github.com/google/clasp>
- **Usage**: Development deployment automation (optional)

**Note**: Development tool only, not included in production distribution.

---

## Documentation and Markdown

### Markdown

- **Purpose**: Documentation formatting
- **Specification**: CommonMark
- **License**: Open standard
- **Usage**: All documentation files (README.md, SUPPORT.md, etc.)

---

## Terms of Service and Legal

### Google APIs Terms of Service

Sales Log Pro uses Google's APIs and services, which are governed by:

- **Google APIs Terms of Service**: <https://developers.google.com/terms>
- **Google Workspace Terms of Service**: <https://workspace.google.com/terms>
- **Apps Script Terms**: <https://script.google.com/home/terms>

**Compliance**: Sales Log Pro is designed and implemented in full compliance with these terms of service.

### Google Cloud Platform

- **Infrastructure**: Google Apps Script runs on Google Cloud Platform infrastructure
- **Terms**: Subject to Google Cloud Platform Terms of Service
- **Privacy**: Google Cloud Platform Privacy Notice applies to infrastructure operations

---

## Open Source Licenses

### Apache License 2.0

Several components used by Sales Log Pro are licensed under the Apache License 2.0:

- Google Apps Script platform
- Roboto font family
- @google/clasp (development tool)

**License Summary**: Permits commercial use, modification, distribution, and patent use. Requires preservation of copyright and license notices.

**Full License Text**: <http://www.apache.org/licenses/LICENSE-2.0>

**Key Terms**:

- Commercial use permitted
- Modification permitted
- Distribution permitted
- Patent use permitted
- License and copyright notice required
- State changes required

---

## No Additional Dependencies

Sales Log Pro is designed with minimal external dependencies:

- **No third-party JavaScript libraries**: Uses native JavaScript and Apps Script APIs only
- **No external API calls**: All functionality runs within Google Apps Script environment
- **No npm runtime dependencies**: Pure Apps Script implementation
- **Self-contained**: Does not require external services or data sources

This design ensures:

- Maximum reliability and uptime
- No external security vulnerabilities
- Simplified deployment and maintenance
- Compliance with Google Workspace security requirements

---

## Attribution Requirements

### For Sales Log Pro Users

When using Sales Log Pro, please note:

1. **Google Platform Attribution**: Sales Log Pro runs on Google Apps Script and Google Sheets
2. **Google Branding**: Google, Google Sheets, Google Apps Script, and related marks are trademarks of Google LLC
3. **Font Attribution**: UI uses Roboto font, designed by Christian Robertson for Google

### For Sales Log Pro Modifications

If you modify Sales Log Pro under your license agreement:

1. Preserve existing attribution notices
2. Maintain links to original component sources
3. Document any changes to third-party component usage
4. Comply with all upstream license requirements

---

## Data Privacy and Security

### Google's Data Handling

Data processed by Sales Log Pro is subject to:

- **Google Workspace Privacy Notice**: How Google handles Workspace data
- **Google Cloud Privacy Notice**: Infrastructure data handling
- **Apps Script Data Access**: Limited to necessary Sheets operations

### No External Data Transmission

Sales Log Pro does not:

- Transmit data to external servers
- Use third-party analytics services
- Make external API calls
- Store data outside Google's infrastructure

All data remains within your Google Workspace environment.

---

## Updates and Changes

This attribution document is current as of the release date of this version of Sales Log Pro.

**Updates**:

- New third-party components will be documented in future releases
- License changes will be noted in CHANGELOG.md
- Deprecated components will be listed with removal version

**Version Control**: This document is version-controlled alongside the software codebase.

---

## Questions and Clarifications

### For Attribution Questions

If you have questions about:

- License compliance
- Third-party component usage
- Attribution requirements
- Intellectual property rights

Please contact support (licensed customers only) or refer to:

- [LICENSE](LICENSE) - Sales Log Pro license terms
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development and IP policies

---

## Acknowledgments

### Special Thanks

Sales Log Pro development team acknowledges:

- **Google LLC**: For providing the Apps Script platform and comprehensive APIs
- **Google Fonts**: For the Roboto font family and typography resources
- **Open Source Community**: For maintaining standards and best practices
- **Licensed Customers**: For feedback that drives continuous improvement

---

## License Compliance Statement

Sales Log Pro is committed to full compliance with all applicable licenses and terms of service for third-party components.

**Compliance Measures**:

- Regular license review and updates
- Adherence to attribution requirements
- Respect for intellectual property rights
- Transparent documentation of dependencies

**Verification**: All third-party component usage has been reviewed and approved for commercial use in accordance with respective licenses.

---

**Last Updated**: October 2025
**Sales Log Pro Version**: 8.0.0
**Document Version**: 1.1

For the most current version of this document, please refer to the latest release of Sales Log Pro.
