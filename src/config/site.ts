export const siteConfig = {
  name: "Text Case Converter",
  title: "Text Case Converter — Instantly Convert Text Between camelCase, snake_case & More",
  description: "Free online text case converter. Transform text between camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, Title Case, sentence case, and 10+ more formats. 100% browser-based, no data leaves your device.",
  url: "https://text-case-converter.tools.jagodana.com",
  ogImage: "/opengraph-image",

  // Header
  headerIcon: "CaseSensitive",
  brandAccentColor: "#8b5cf6", // violet accent for OG image gradient

  // SEO
  keywords: [
    "text case converter",
    "camelCase converter",
    "snake_case converter",
    "kebab-case converter",
    "PascalCase converter",
    "text transformation tool",
    "case converter online",
    "string case converter",
    "variable naming converter",
    "SCREAMING_SNAKE_CASE",
    "title case converter",
    "sentence case converter",
  ],
  applicationCategory: "DeveloperApplication",

  // Theme
  themeColor: "#7c3aed", // violet-600

  // Branding
  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  socialProfiles: [
    "https://twitter.com/jagodana",
    "https://github.com/Jagodana-Studio-Private-Limited",
    "https://www.linkedin.com/company/jagodana",
  ],

  links: {
    github: "https://github.com/Jagodana-Studio-Private-Limited/text-case-converter",
    website: "https://jagodana.com",
  },

  footer: {
    about: "Text Case Converter is a free, privacy-first tool that transforms text between 12+ naming conventions used in programming, writing, and design. Built by Jagodana — no sign-up, no tracking, no data leaves your browser.",
    featuresTitle: "Features",
    features: [
      "12+ case formats (camelCase, snake_case, kebab-case, and more)",
      "One-click copy to clipboard",
      "Live preview as you type",
      "100% browser-based — your text never leaves your device",
    ],
  },

  hero: {
    badge: "Free Developer Tool",
    titleLine1: "Convert Text Between",
    titleGradient: "Any Case Format",
    subtitle: "Instantly transform text between camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, Title Case, and 7+ more formats. Perfect for developers, writers, and anyone who juggles naming conventions.",
  },

  featureCards: [
    {
      icon: "🔄",
      title: "12+ Case Formats",
      description: "From camelCase to SCREAMING_SNAKE_CASE, dotted.case to path/case — every convention you need.",
    },
    {
      icon: "⚡",
      title: "Instant Conversion",
      description: "Results update as you type. One-click copy any format to your clipboard.",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "100% client-side. Your text never leaves your browser — zero server requests.",
    },
  ],

  relatedTools: [
    {
      name: "JSON Formatter",
      url: "https://json-formatter.tools.jagodana.com",
      icon: "📋",
      description: "Format, validate, and beautify JSON data instantly.",
    },
    {
      name: "Regex Playground",
      url: "https://regex-playground.tools.jagodana.com",
      icon: "🧪",
      description: "Build, test & debug regular expressions in real-time.",
    },
    {
      name: "Diff Forge",
      url: "https://diff-forge.tools.jagodana.com",
      icon: "🔀",
      description: "Compare text and code side by side with syntax highlighting.",
    },
    {
      name: "Cron Expression Visualizer",
      url: "https://cron-expression-visualizer.tools.jagodana.com",
      icon: "⏰",
      description: "Build and visualize cron expressions with a human-readable preview.",
    },
    {
      name: "Color Palette Explorer",
      url: "https://color-palette-explorer.tools.jagodana.com",
      icon: "🎨",
      description: "Extract color palettes from any image.",
    },
    {
      name: "Fluid Type Scale",
      url: "https://fluid-type-scale.tools.jagodana.com",
      icon: "📐",
      description: "Generate responsive CSS typography with clamp().",
    },
  ],

  howToSteps: [
    { name: "Paste or type your text", text: "Enter any text into the input area — variable names, sentences, or entire paragraphs.", url: "" },
    { name: "See all conversions instantly", text: "All 12+ case formats are computed in real-time and displayed in a grid below.", url: "" },
    { name: "Copy the format you need", text: "Click the copy button next to any format to copy it to your clipboard instantly.", url: "" },
  ],
  howToTotalTime: "PT30S",

  faq: [
    {
      question: "What case formats does this tool support?",
      answer: "We support 12+ formats: camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case, SCREAMING-KEBAB-CASE, dot.case, path/case, Title Case, Sentence case, UPPER CASE, lower case, and more.",
    },
    {
      question: "Is my text sent to a server?",
      answer: "No. All conversions happen 100% in your browser using JavaScript. Your text never leaves your device — there are zero network requests involved in the conversion.",
    },
    {
      question: "Can I convert variable names between programming languages?",
      answer: "Yes! That's the primary use case. Convert between JavaScript's camelCase, Python's snake_case, CSS's kebab-case, constants' SCREAMING_SNAKE_CASE, and more — all in one place.",
    },
    {
      question: "Does it handle numbers and special characters?",
      answer: "Yes. The converter intelligently handles numbers within words (e.g., 'myVar2Name'), preserves meaningful separators, and strips special characters that don't belong in identifiers.",
    },
  ],

  pages: {
    "/": {
      title: "Text Case Converter — Instantly Convert Text Between camelCase, snake_case & More",
      description: "Free online text case converter. Transform text between camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, Title Case, sentence case, and 10+ more formats.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
