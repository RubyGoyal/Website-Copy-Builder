import { PillarData, SeoAuditScore } from '../types';

export function generateSemanticHtml(
  copy: string,
  seoNotes: string,
  pillar: PillarData,
  audience: string
): string {
  const slug = pillar.p.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const h1Match = copy.match(/^#\s+(.+)$/m);
  const h1Text = h1Match ? h1Match[1].replace(/[*_]/g, '') : pillar.p;

  // Extract JSON-LD blocks if present
  const jsonLdBlocks: string[] = [];
  const matches = [...seoNotes.matchAll(/```(?:json)?\s*([\s\S]*?)\s*```/g)];
  matches.forEach(m => {
    try {
      const parsed = JSON.parse(m[1]);
      jsonLdBlocks.push(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore
    }
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pillar.p} Services in India | Embee Software</title>
  <meta name="description" content="Architect, modernize, and govern your ${pillar.p.toLowerCase()} workloads with Embee Software. Microsoft Frontier Partner with 17 specializations and DPDP Act 2023 compliance.">
  <link rel="canonical" href="https://www.embee.co.in/solutions/${slug}">
  <!-- Tailwind CSS CDN for instant styling -->
  <script src="https://cdn.tailwindcss.com"></script>
  ${jsonLdBlocks.map(json => `<script type="application/ld+json">\n${json}\n</script>`).join('\n  ')}
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">
  <header class="bg-white border-b border-slate-200 py-4 px-6 max-w-7xl mx-auto flex items-center justify-between">
    <div class="font-bold text-xl text-blue-900">Embee Software</div>
    <div class="text-xs text-slate-500 font-semibold uppercase">Making IT Easier</div>
  </header>

  <nav class="max-w-7xl mx-auto px-6 py-2 text-xs text-slate-500">
    <span>Home</span> &gt; <span>What we do</span> &gt; <span>${pillar.g}</span> &gt; <span class="font-bold text-slate-700">${pillar.p}</span>
  </nav>

  <main class="max-w-4xl mx-auto px-6 py-10">
    <div class="prose prose-slate max-w-none">
      <div class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-4">
        ${pillar.g} · DPDP Act 2023 Compliant
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">${h1Text}</h1>
      
      <div class="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 space-y-4">
${copy.replace(/^#\s+.+$/m, '').trim()}
      </div>
    </div>
  </main>

  <footer class="bg-slate-900 text-slate-400 py-8 px-6 text-center text-xs border-t border-slate-800">
    <p>© ${new Date().getFullYear()} Embee Software Pvt Ltd. Microsoft Frontier Partner · SAP Gold Partner.</p>
  </footer>
</body>
</html>`;
}

export function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Converts markdown text into cleanly styled HTML suitable for Word (.doc) documents.
 * Preserves true H1, H2, H3 heading tags, formatted tables, bullet/numbered lists,
 * blockquotes, code blocks, bold/italics, and horizontal dividers.
 */
export function markdownToWordHtml(markdown: string): string {
  if (!markdown) return '';

  const lines = markdown.split(/\r?\n/);
  let html = '';
  let inCodeBlock = false;
  let codeBlockContent = '';
  let inTable = false;
  let tableRows: string[][] = [];
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;
  let blockquoteContent: string[] = [];

  const closeList = () => {
    if (inUl) {
      html += '</ul>\n';
      inUl = false;
    }
    if (inOl) {
      html += '</ol>\n';
      inOl = false;
    }
  };

  const closeBlockquote = () => {
    if (inBlockquote && blockquoteContent.length > 0) {
      html += `<blockquote style="border-left: 3pt solid #0284c7; background-color: #f8fafc; padding: 8pt 12pt; margin: 10pt 0; color: #334155; font-style: italic;">${blockquoteContent.join('<br>') }</blockquote>\n`;
      inBlockquote = false;
      blockquoteContent = [];
    }
  };

  const closeTable = () => {
    if (inTable && tableRows.length > 0) {
      html += '<table style="border-collapse: collapse; width: 100%; margin: 14pt 0; font-size: 10pt; font-family: \'Segoe UI\', Calibri, Arial, sans-serif;">\n';
      const headerRow = tableRows[0];
      html += '<thead><tr style="background-color: #f1f5f9;">\n';
      headerRow.forEach(cell => {
        html += `<th style="border: 1px solid #cbd5e1; padding: 7pt 10pt; font-weight: bold; color: #0f172a; text-align: left; background-color: #f1f5f9;">${formatInline(cell)}</th>\n`;
      });
      html += '</tr></thead>\n<tbody>\n';
      for (let r = 1; r < tableRows.length; r++) {
        const row = tableRows[r];
        const isEven = r % 2 === 0;
        html += `<tr style="${isEven ? 'background-color: #f8fafc;' : 'background-color: #ffffff;'}">\n`;
        row.forEach(cell => {
          html += `<td style="border: 1px solid #cbd5e1; padding: 7pt 10pt; color: #334155; vertical-align: top;">${formatInline(cell)}</td>\n`;
        });
        html += '</tr>\n';
      }
      html += '</tbody></table>\n';
      inTable = false;
      tableRows = [];
    }
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/__([^_]+)__/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/_([^_]+)_/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background-color: #f1f5f9; font-family: Consolas, \'Courier New\', monospace; padding: 1pt 4pt; font-size: 9.5pt; color: #0f172a; border: 1px solid #e2e8f0;">$1</code>');
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        html += `<pre style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3pt solid #64748b; padding: 10pt; font-family: Consolas, \'Courier New\', monospace; font-size: 9.5pt; color: #1e293b; white-space: pre-wrap; margin: 10pt 0;"><code>${codeBlockContent}</code></pre>\n`;
        inCodeBlock = false;
        codeBlockContent = '';
      } else {
        closeList();
        closeBlockquote();
        closeTable();
        inCodeBlock = true;
        codeBlockContent = '';
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent += line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '\n';
      continue;
    }

    // Horizontal Rule
    if (/^(---|\*\*\*|___)$/.test(trimmed)) {
      closeList();
      closeBlockquote();
      closeTable();
      html += '<hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 18pt 0;" />\n';
      continue;
    }

    // Markdown Table Row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      closeList();
      closeBlockquote();
      // Skip separator row
      if (/^\|(\s*:?-+:?\s*\|)+$/.test(trimmed)) {
        continue;
      }
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map(c => c.trim());
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      closeTable();
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      closeList();
      closeTable();
      inBlockquote = true;
      const bqText = trimmed.replace(/^>\s?/, '');
      blockquoteContent.push(formatInline(bqText));
      continue;
    } else if (inBlockquote) {
      closeBlockquote();
    }

    // Headings
    const h1Match = trimmed.match(/^#\s+(.+)$/);
    if (h1Match) {
      closeList();
      closeBlockquote();
      closeTable();
      html += `<h1 style="font-size: 20pt; color: #0f172a; font-weight: 800; margin-top: 20pt; margin-bottom: 8pt; border-bottom: 2pt solid #0284c7; padding-bottom: 4pt; page-break-after: avoid; font-family: 'Segoe UI', Calibri, Arial, sans-serif;">${formatInline(h1Match[1])}</h1>\n`;
      continue;
    }

    const h2Match = trimmed.match(/^##\s+(.+)$/);
    if (h2Match) {
      closeList();
      closeBlockquote();
      closeTable();
      html += `<h2 style="font-size: 14pt; color: #0369a1; font-weight: 700; margin-top: 18pt; margin-bottom: 6pt; page-break-after: avoid; font-family: 'Segoe UI', Calibri, Arial, sans-serif;">${formatInline(h2Match[1])}</h2>\n`;
      continue;
    }

    const h3Match = trimmed.match(/^###\s+(.+)$/);
    if (h3Match) {
      closeList();
      closeBlockquote();
      closeTable();
      html += `<h3 style="font-size: 12pt; color: #1e293b; font-weight: 700; margin-top: 14pt; margin-bottom: 4pt; page-break-after: avoid; font-family: 'Segoe UI', Calibri, Arial, sans-serif;">${formatInline(h3Match[1])}</h3>\n`;
      continue;
    }

    const h4Match = trimmed.match(/^####\s+(.+)$/);
    if (h4Match) {
      closeList();
      closeBlockquote();
      closeTable();
      html += `<h4 style="font-size: 11pt; color: #475569; font-weight: 700; margin-top: 10pt; margin-bottom: 3pt; page-break-after: avoid; font-family: 'Segoe UI', Calibri, Arial, sans-serif;">${formatInline(h4Match[1])}</h4>\n`;
      continue;
    }

    // Unordered list
    const ulMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      closeBlockquote();
      closeTable();
      if (inOl) closeList();
      if (!inUl) {
        html += '<ul style="margin: 4pt 0 8pt 0; padding-left: 20pt; font-family: \'Segoe UI\', Calibri, Arial, sans-serif;">\n';
        inUl = true;
      }
      html += `<li style="margin-bottom: 4pt; line-height: 1.5; color: #334155;">${formatInline(ulMatch[1])}</li>\n`;
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      closeBlockquote();
      closeTable();
      if (inUl) closeList();
      if (!inOl) {
        html += '<ol style="margin: 4pt 0 8pt 0; padding-left: 20pt; font-family: \'Segoe UI\', Calibri, Arial, sans-serif;">\n';
        inOl = true;
      }
      html += `<li style="margin-bottom: 4pt; line-height: 1.5; color: #334155;">${formatInline(olMatch[1])}</li>\n`;
      continue;
    }

    // Blank line
    if (trimmed.length === 0) {
      closeList();
      closeBlockquote();
      closeTable();
      continue;
    }

    // Regular paragraph
    closeList();
    closeBlockquote();
    closeTable();
    html += `<p style="margin: 0 0 8pt 0; line-height: 1.55; color: #334155; font-family: 'Segoe UI', Calibri, Arial, sans-serif;">${formatInline(trimmed)}</p>\n`;
  }

  closeList();
  closeBlockquote();
  closeTable();

  return html;
}

/**
 * Builds the Word-compliant HTML document envelope with Microsoft Word XML metadata,
 * corporate styling, headers, and footer.
 */
export function buildWordDocumentEnvelope(
  title: string,
  bodyHtml: string,
  docMeta?: {
    pillar?: string;
    group?: string;
    type?: string;
    date?: string;
  }
): string {
  const currentDate = docMeta?.date || new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: A4;
      margin: 1.0in 1.0in 1.0in 1.0in;
      mso-page-orientation: portrait;
      mso-header-margin: 0.5in;
      mso-footer-margin: 0.5in;
    }
    body {
      font-family: 'Segoe UI', Calibri, Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.55;
      color: #1e293b;
      margin: 0;
      padding: 0;
    }
    .embee-header-box {
      border-bottom: 2pt solid #0047ba;
      padding-bottom: 12pt;
      margin-bottom: 20pt;
    }
    .embee-logo {
      font-size: 18pt;
      font-weight: 900;
      color: #0047ba;
      letter-spacing: -0.5pt;
    }
    .embee-tagline {
      font-size: 9.5pt;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1.5pt;
      margin-top: 2pt;
    }
    .doc-badge {
      display: inline-block;
      background-color: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
      padding: 3pt 8pt;
      font-size: 9pt;
      font-weight: bold;
      border-radius: 4pt;
      margin-bottom: 8pt;
    }
    .page-break {
      page-break-before: always;
      mso-break-type: section-break;
    }
  </style>
</head>
<body>
  <div class="embee-header-box">
    <table style="width: 100%; border: none; border-collapse: collapse;">
      <tr>
        <td style="border: none; padding: 0; vertical-align: top;">
          <div class="embee-logo">Embee Software</div>
          <div class="embee-tagline">Making IT Easier · Microsoft Frontier Partner</div>
        </td>
        <td style="border: none; padding: 0; text-align: right; vertical-align: top; font-size: 9pt; color: #64748b;">
          <div><strong>Date:</strong> ${currentDate}</div>
          ${docMeta?.group ? `<div><strong>Group:</strong> ${docMeta.group}</div>` : ''}
          ${docMeta?.type ? `<div><strong>Document:</strong> ${docMeta.type}</div>` : ''}
        </td>
      </tr>
    </table>
  </div>

  ${bodyHtml}

  <div style="margin-top: 30pt; padding-top: 12pt; border-top: 1px solid #e2e8f0; font-size: 9pt; color: #64748b; text-align: center;">
    © ${new Date().getFullYear()} Embee Software Pvt Ltd. All rights reserved. Microsoft Frontier Partner (17 Specializations) · SAP Gold Partner.
  </div>
</body>
</html>`;
}

/**
 * Downloads a single deliverable (Landing Copy, SEO Handover, or Designer Notes) as a Word (.doc) document.
 */
export function downloadWordDoc(
  filename: string,
  title: string,
  markdown: string,
  meta?: { pillar?: string; group?: string; type?: string }
): void {
  const bodyHtml = markdownToWordHtml(markdown);
  const fullHtml = buildWordDocumentEnvelope(title, bodyHtml, meta);
  const blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.doc') ? filename : `${filename}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads all 3 deliverables (Landing Page Copy, SEO Handover Pack, Designer Notes) into a single master Word (.doc) document.
 */
export function downloadAllWordDoc(
  filename: string,
  pillarName: string,
  groupName: string,
  landingCopy: string,
  seoNotes: string,
  designerNotes: string
): void {
  const copyHtml = markdownToWordHtml(landingCopy);
  const seoHtml = markdownToWordHtml(seoNotes);
  const designHtml = markdownToWordHtml(designerNotes);

  const combinedBodyHtml = `
    <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 14pt; margin-bottom: 24pt;">
      <h1 style="font-size: 24pt; color: #0f172a; margin: 0 0 6pt 0;">${pillarName}</h1>
      <p style="font-size: 11pt; color: #475569; margin: 0 0 10pt 0;">Complete 3-Deliverable Production Handover Pack for Embee Software Marketing &amp; Engineering Teams</p>
      <table style="width: 100%; border: none; font-size: 9.5pt; color: #334155;">
        <tr>
          <td style="border: none; padding: 2pt 0;"><strong>1. Production Landing Page Copy:</strong> Dedicated Single-Page Production Copy</td>
        </tr>
        <tr>
          <td style="border: none; padding: 2pt 0;"><strong>2. Developer &amp; SEO Handover Pack:</strong> Meta Tags, 3x JSON-LD Schemas, Header Tags, Link Architecture</td>
        </tr>
        <tr>
          <td style="border: none; padding: 2pt 0;"><strong>3. In-House Designer Direction:</strong> Visual Hierarchy, Color Palette, Component Layouts</td>
        </tr>
      </table>
    </div>

    <div>
      <div class="doc-badge">Deliverable 1 of 3: Production Landing Page Copy</div>
      ${copyHtml}
    </div>

    <div class="page-break" style="page-break-before: always; mso-break-type: section-break; margin-top: 30pt; padding-top: 20pt; border-top: 2pt dashed #0284c7;">
      <div class="doc-badge" style="background-color: #f0fdf4; color: #166534; border-color: #bbf7d0;">Deliverable 2 of 3: Developer &amp; SEO Handover Pack</div>
      <h1 style="font-size: 20pt; color: #0f172a; border-bottom: 2pt solid #0284c7; padding-bottom: 4pt;">Developer &amp; SEO Handover Pack</h1>
      ${seoHtml}
    </div>

    <div class="page-break" style="page-break-before: always; mso-break-type: section-break; margin-top: 30pt; padding-top: 20pt; border-top: 2pt dashed #7c3aed;">
      <div class="doc-badge" style="background-color: #faf5ff; color: #7e22ce; border-color: #e9d5ff;">Deliverable 3 of 3: In-House Designer Direction</div>
      <h1 style="font-size: 20pt; color: #0f172a; border-bottom: 2pt solid #7c3aed; padding-bottom: 4pt;">In-House Designer Direction Notes</h1>
      ${designHtml}
    </div>
  `;

  const fullHtml = buildWordDocumentEnvelope(
    `${pillarName} - Complete Handover Pack`,
    combinedBodyHtml,
    {
      pillar: pillarName,
      group: groupName,
      type: 'Complete Handover Pack (Copy + SEO + Design)'
    }
  );

  const blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.doc') ? filename : `${filename}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
