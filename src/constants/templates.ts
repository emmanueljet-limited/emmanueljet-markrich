export const DEFAULT_MARKDOWN = `# Welcome to MarkRich!

Try editing this document to see how clean the rendering output is. You can create different markdown objects like:

## 1. Structured Tables
Here is an example structure ready for document reviews:

| Department | Lead | Objective | Status |
| :--- | :--- | :--- | :--- |
| Operations | Alex Carter | Launch server instance upgrade | **In Progress** |
| Frontend | Chloe Patel | Migrate styling components | **Completed** |

---

## 2. Lists & Visual Formatting
- Unordered lists paste natively matching the document's destination markers.
- Multi-level structures:
  - This nested item works natively as well.
- **Bold text** and *italic phrases* carry formatting cleanly.

> **Note on Styling:** Standard rich text copy engines often copy complex inline attributes, such as background colors, margins, or Google-incompatible tag attributes. MarkRich solves this by stripping absolute layout specs.
`;