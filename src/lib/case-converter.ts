/**
 * Text Case Converter — all conversion logic.
 * Splits input into word tokens, then reassembles in the target case.
 */

/**
 * Tokenize input into words by splitting on:
 * - spaces, underscores, hyphens, dots, slashes
 * - camelCase / PascalCase boundaries (e.g., "myVarName" → ["my", "Var", "Name"])
 * - Transitions between letters and digits
 */
export function tokenize(input: string): string[] {
  if (!input.trim()) return [];

  // Step 1: insert a separator at camelCase boundaries and letter↔digit transitions
  const expanded = input
    // ABCDef → ABC Def  (sequence of uppercase followed by uppercase+lowercase)
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1\0$2")
    // abcDef → abc Def  (lowercase followed by uppercase)
    .replace(/([a-z\d])([A-Z])/g, "$1\0$2")
    // abc123 → abc 123  (letter followed by digit)
    .replace(/([a-zA-Z])(\d)/g, "$1\0$2")
    // 123abc → 123 abc  (digit followed by letter)
    .replace(/(\d)([a-zA-Z])/g, "$1\0$2");

  // Step 2: split on separators (space, underscore, hyphen, dot, slash, null char)
  return expanded
    .split(/[\s_\-./\0]+/)
    .filter((w) => w.length > 0);
}

// --- Converters ---

export function toCamelCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return "";
  return words
    .map((w, i) =>
      i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join("");
}

export function toPascalCase(input: string): string {
  return tokenize(input)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

export function toSnakeCase(input: string): string {
  return tokenize(input)
    .map((w) => w.toLowerCase())
    .join("_");
}

export function toScreamingSnakeCase(input: string): string {
  return tokenize(input)
    .map((w) => w.toUpperCase())
    .join("_");
}

export function toKebabCase(input: string): string {
  return tokenize(input)
    .map((w) => w.toLowerCase())
    .join("-");
}

export function toScreamingKebabCase(input: string): string {
  return tokenize(input)
    .map((w) => w.toUpperCase())
    .join("-");
}

export function toDotCase(input: string): string {
  return tokenize(input)
    .map((w) => w.toLowerCase())
    .join(".");
}

export function toPathCase(input: string): string {
  return tokenize(input)
    .map((w) => w.toLowerCase())
    .join("/");
}

export function toTitleCase(input: string): string {
  return tokenize(input)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function toSentenceCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return "";
  return words
    .map((w, i) =>
      i === 0
        ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        : w.toLowerCase()
    )
    .join(" ");
}

export function toUpperCase(input: string): string {
  return tokenize(input)
    .map((w) => w.toUpperCase())
    .join(" ");
}

export function toLowerCase(input: string): string {
  return tokenize(input)
    .map((w) => w.toLowerCase())
    .join(" ");
}

export function toConstantCase(input: string): string {
  // Alias for SCREAMING_SNAKE_CASE (common in many languages for constants)
  return toScreamingSnakeCase(input);
}

export function toTrainCase(input: string): string {
  // Train-Case (like kebab but each word capitalized)
  return tokenize(input)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("-");
}

export function toFlatCase(input: string): string {
  return tokenize(input)
    .map((w) => w.toLowerCase())
    .join("");
}

export function toCobolCase(input: string): string {
  // COBOL-CASE (same as SCREAMING-KEBAB-CASE)
  return toScreamingKebabCase(input);
}

// --- Registry ---

export interface CaseFormat {
  id: string;
  name: string;
  example: string;
  convert: (input: string) => string;
  description: string;
}

export const caseFormats: CaseFormat[] = [
  { id: "camel", name: "camelCase", example: "myVariableName", convert: toCamelCase, description: "JavaScript, TypeScript, Java variables" },
  { id: "pascal", name: "PascalCase", example: "MyVariableName", convert: toPascalCase, description: "C#, React components, TypeScript types" },
  { id: "snake", name: "snake_case", example: "my_variable_name", convert: toSnakeCase, description: "Python, Ruby, Rust, database columns" },
  { id: "screaming_snake", name: "SCREAMING_SNAKE_CASE", example: "MY_VARIABLE_NAME", convert: toScreamingSnakeCase, description: "Constants in most languages" },
  { id: "kebab", name: "kebab-case", example: "my-variable-name", convert: toKebabCase, description: "CSS classes, URLs, CLI flags" },
  { id: "screaming_kebab", name: "SCREAMING-KEBAB-CASE", example: "MY-VARIABLE-NAME", convert: toScreamingKebabCase, description: "COBOL, HTTP headers" },
  { id: "dot", name: "dot.case", example: "my.variable.name", convert: toDotCase, description: "Java packages, object properties" },
  { id: "path", name: "path/case", example: "my/variable/name", convert: toPathCase, description: "File paths, URL segments" },
  { id: "train", name: "Train-Case", example: "My-Variable-Name", convert: toTrainCase, description: "HTTP headers, some config files" },
  { id: "flat", name: "flatcase", example: "myvariablename", convert: toFlatCase, description: "Package names, hashtags" },
  { id: "title", name: "Title Case", example: "My Variable Name", convert: toTitleCase, description: "Headings, titles, proper nouns" },
  { id: "sentence", name: "Sentence case", example: "My variable name", convert: toSentenceCase, description: "Natural language sentences" },
  { id: "upper", name: "UPPER CASE", example: "MY VARIABLE NAME", convert: toUpperCase, description: "Emphasis, acronyms" },
  { id: "lower", name: "lower case", example: "my variable name", convert: toLowerCase, description: "Normalization, search indexing" },
];
