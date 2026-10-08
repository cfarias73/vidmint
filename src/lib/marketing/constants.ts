const APP_NAME = import.meta.env.VITE_APP_NAME || 'Vidmint';
const APP_URL = import.meta.env.VITE_APP_URL || 'https://vidmint.com';
const VITE_R2_PUBLIC_ASSETS_DOMAIN =
  import.meta.env.VITE_R2_PUBLIC_ASSETS_DOMAIN || 'assets.vidmint.com';

const APP_DOMAIN = (() => {
  try {
    return new URL(APP_URL).hostname;
  } catch {
    return 'vidmint.com';
  }
})();

export const CONTACT_EMAIL = `support@${APP_DOMAIN}`;
export const PRIVACY_EMAIL = `privacy@${APP_DOMAIN}`;
export const FOUNDER_EMAIL = `team@${APP_DOMAIN}`;

export const SITE_CONFIG = {
  name: APP_NAME,
  description:
    'Create cinematic AI films and video sequences with consistent characters, custom environments, and dynamic motion.',
  /** Logged-out homepage heading. */
  tagline: 'Direct Your Vision With Generative AI',
  /** Logged-out homepage subtitle — what the product does. */
  taglineSub:
    'Create multi-scene AI films with consistent characters, realistic motion, and synchronized sound.',
  url: APP_URL,
  contactEmail: CONTACT_EMAIL,
  privacyEmail: PRIVACY_EMAIL,
  ogImage: `${APP_URL}/og.jpg`,
  ctaText: 'Get Started',
  ctaHref: '/',
  githubHref: '#',
  xHref: 'https://x.com/vidmint',
  youtubeHref: 'https://youtube.com/@vidmint',
};

export const TOP_TIER_FEATURES = [
  {
    title: 'From Idea to Finished Video',
    description:
      'Describe what you want in a line or paste a full script. Vidmint breaks it into scenes, generates shots, and scores the music — a multi-scene film with consistent characters.',
    image: `https://${VITE_R2_PUBLIC_ASSETS_DOMAIN}/images/marketing/14-fantasy-dragon.webp`,
  },
  {
    title: 'Cast Your Own Talent & Locations',
    description:
      'Define your characters and environments once — age, wardrobe, lighting, architecture. Vidmint maintains consistency across every shot in every sequence.',
    images: [
      `https://${VITE_R2_PUBLIC_ASSETS_DOMAIN}/images/marketing/08-fashion-editorial.webp`,
      `https://${VITE_R2_PUBLIC_ASSETS_DOMAIN}/images/marketing/05-corporate-team.webp`,
    ],
  },
  {
    title: 'Get The Shot You Want',
    description:
      'Generate variations of any shot — different angles, lighting, compositions — and iterate the whole film until it’s exactly right.',
    image: `https://${VITE_R2_PUBLIC_ASSETS_DOMAIN}/images/marketing/02-product-sneaker.webp`,
  },
  {
    title: 'Take Your Work Anywhere',
    description:
      'Download individual shots, export full sequences, and get the prompts behind every generation. Use it seamlessly in any professional video editor.',
    image: `https://${VITE_R2_PUBLIC_ASSETS_DOMAIN}/images/marketing/12-travel-adventure.webp`,
  },
  {
    title: 'State of the Art AI Models',
    description:
      'Access the leading image and video models (Google Veo, Grok Imagine, FLUX.2, Kling, Seedance) directly from a unified interface.',
    image: `https://${VITE_R2_PUBLIC_ASSETS_DOMAIN}/images/marketing/01-product-cosmetics.webp`,
  },
  {
    title: 'Music & Audio Scoring',
    description:
      'Generate synchronized background music tracks and sound effects matched to the emotional tone of your sequence.',
    image: `https://${VITE_R2_PUBLIC_ASSETS_DOMAIN}/images/marketing/09-music-video.webp`,
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Describe Your Concept',
    description:
      'Start with a single logline or a full screenplay. Vidmint analyzes the story, maps scenes, and identifies characters and locations automatically.',
  },
  {
    number: '02',
    title: 'Define Visual Continuity',
    description:
      'Set your visual style, cast your talent sheets, and establish recurring location blueprints for total continuity.',
  },
  {
    number: '03',
    title: 'Generate & Animate',
    description:
      'Render keyframes and transform them into fluid video with camera direction, physics, and model selection per shot.',
  },
  {
    number: '04',
    title: 'Assemble & Export',
    description:
      'Review your multi-scene timeline, add synchronized music, and export master MP4 videos in high resolution.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'What is Vidmint?',
    answer:
      'Vidmint is a professional AI-native film and video production platform. Enter a premise or a full script, and Vidmint automatically builds a multi-scene film with consistent characters, locations, camera controls, cinematic motion, and synchronized audio.',
  },
  {
    question: 'Do I need to write a full script?',
    answer:
      'No. You can start with a single line and Vidmint’s AI will expand it into a structured multi-scene screenplay with detailed visual prompts, characters, and shot directions. You can also paste in your own complete script.',
  },
  {
    question: 'How does character and location consistency work?',
    answer:
      'Vidmint generates Character and Location Bibles for your project. These visual blueprints guide the generative image and video models to maintain consistent faces, wardrobe, lighting, and environments across every angle in your sequence.',
  },
  {
    question: 'What AI models does Vidmint support?',
    answer:
      'Vidmint integrates top-tier vision, video, and reasoning models including Google Veo 3.1, Grok Imagine Video 1.5, MiniMax H3, Kling v3 Pro, LTX 2.3, FLUX.2 Max, and advanced reasoning engines. You can switch models per shot or use our recommended tiers.',
  },
  {
    question: 'Can I bring my own API keys (BYOK)?',
    answer:
      'Yes. Vidmint allows you to connect your own API keys directly (such as Fal.ai and OpenRouter) with encrypted storage, giving you full control over usage and billing directly with providers.',
  },
  {
    question: 'How do I export my video sequences?',
    answer:
      'You can export entire stitched video sequences in MP4 format, download individual scene shots, extract audio tracks, or export generation prompts to use in your preferred editing software (Premiere Pro, DaVinci Resolve, Final Cut).',
  },
  {
    question: 'How do I get started?',
    answer:
      'Sign in with your email address to access the studio. Create a new sequence, describe your concept, define your visual look, and generate your first video in minutes.',
  },
] as const;

export const OPEN_FAIR_BENEFITS = [
  {
    title: 'Character Consistency',
    description:
      'Generate character sheets and maintain facial and wardrobe continuity across every scene in your project.',
  },
  {
    title: 'Bring Your Own Keys',
    description:
      'Connect your own API keys for direct provider billing and zero markup on model compute.',
  },
  {
    title: 'Multi-Model Freedom',
    description:
      'Choose the best AI model for every shot — combine photoreal vision models with high-motion video engines.',
  },
  {
    title: 'Export Everything',
    description:
      'Full sequence exports, individual high-res camera shots, audio stems, and underlying prompts.',
  },
] as const;
