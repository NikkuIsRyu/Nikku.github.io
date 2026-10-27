import katex from 'katex';

/**
 * Renders a pure LaTeX formula into HTML using KaTeX.
 * If the formula starts and ends with $ or $$, they are trimmed.
 */
export function renderFormula(formula: string, displayMode = false): string {
  if (!formula) return '';
  let cleaned = formula.trim();
  if (cleaned.startsWith('$$') && cleaned.endsWith('$$')) {
    cleaned = cleaned.slice(2, -2).trim();
    displayMode = true;
  } else if (cleaned.startsWith('$') && cleaned.endsWith('$')) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  try {
    return katex.renderToString(cleaned, {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml'
    });
  } catch (err) {
    console.error('KaTeX render error:', err);
    return cleaned;
  }
}

/**
 * Parses mixed text containing inline ($...$) or block ($$...$$) LaTeX math
 * and basic markdown (**bold**, *italic*), converting math to KaTeX HTML.
 */
export function renderMathInText(text: string): string {
  if (!text) return '';

  // 1. Display math $$...$$
  let res = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    return renderFormula(math, true);
  });

  // 2. Inline math $...$
  res = res.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    return renderFormula(math, false);
  });

  // 3. Simple Markdown bold: **text**
  res = res.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');

  // 4. Simple Markdown italic: *text*
  res = res.replace(/\*([^*]+?)\*/g, '<em>$1</em>');

  return res;
}
