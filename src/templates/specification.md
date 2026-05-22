---
title: 📐 Product Specification
description: Comprehensive document containing inline tables, code samples, blockquotes, and headers.
---
# Product Specification: Shared Clipboard API Sync

## 1. Executive Summary
This document outlines the software requirements for building a highly resilient clipboard rendering engine to support semantic copy-paste integrations.

## 2. Goals & Focus
Our core focus is delivering seamless parsing across multiple target applications:
- Clean copy compatibility with **Google Docs**
- Format preservation in **Microsoft Word**
- Simple fallback options for **Raw Markdown**

## 3. Data Processing Schema
Here is a comparison of formatting properties carried across various engines:

| Feature / Engine | Class Attributes | Inline CSS Styles | Standard HTML Tags |
| :--- | :---: | :---: | :---: |
| Default HTML Parsers | Yes | Yes | Yes |
| **MarkRich Cleaner** | **Stripped** | **Stripped** | **Preserved (Semantic)** |

## 4. Code Sample & Implementation
The core function uses regular expressions to purge attributes before executing clipboard writes:

```javascript
function sanitizeHtml(rawHtmlString) {
  // Remove style, class, id, and custom data attributes
  return rawHtmlString.replace(/\s*(class|style|id|data-[a-z0-9-]+)="[^"]*"/gi, '');
}
```

## 5. Implementation Roadmap
- [x] Phase 1: Client-Side Engine Prototype
- [x] Phase 2: HTML Output Validation Tests
- [ ] Phase 3: Integration with Remote Storage