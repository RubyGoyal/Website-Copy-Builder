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
