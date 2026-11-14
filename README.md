`RubyGoyal/Website-Copy-Builder`

**New `README.md`**:
```markdown
# Embee Software Page Builder (Website Copy Builder)

Guided B2B landing page copy, SEO handover pack, and design-direction builder for Embee Software cloud, cybersecurity, and enterprise solution pages.

## Problem & Product Approach

Enterprise solution pages often stall between product marketing, SEO, and web design because messaging, metadata, and layout specs live in disconnected documents. Website Copy Builder turns structured solution inputs into a complete page copy and SEO handover package.

## Key Capabilities

- **Structured Solution Messaging**: Guides page sections (hero value proposition, proof points, capabilities, and conversion CTAs) from consistent inputs.
- **SEO Handover Pack**: Produces page metadata, heading structure, and keyword alignment alongside body copy.
- **Server-Side Gemini Execution**: Runs `@google/genai` via the Express backend (`server.ts`) with environment-variable key management.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide Icons
- **Backend**: Express (`server.ts`), `@google/genai`

## Run Locally

1. Copy `.env.example` to `.env` and add `GEMINI_API_KEY`.
2. Install and start the full-stack server:

```bash
npm install
npm run dev
