import { createFileRoute } from '@tanstack/react-router';
import { FAQ_ITEMS, SITE_CONFIG } from '@/lib/marketing/constants';

const title = 'Frequently Asked Questions';
const description =
  'Common questions about Vidmint: what it is, workflows, AI model support, API keys, and getting started.';

// The FAQ lived on the old marketing homepage; `/` is now the product composer
// in the app shell, so this docs page is the crawlable home for the answers
// (#814). FAQ_ITEMS stays the single source of truth — llms.txt renders the
// same items, so the two surfaces can't drift.
export const Route = createFileRoute('/docs/faq')({
  head: () => ({
    meta: [
      { title: `${title} - Vidmint Docs` },
      { name: 'description', content: description },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: SITE_CONFIG.name,
          description: SITE_CONFIG.description,
          url: SITE_CONFIG.url,
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          isAccessibleForFree: true,
          license: `${SITE_CONFIG.githubHref}/blob/main/LICENSE`,
        }),
      },
    ],
  }),
  component: FaqArticle,
});

function FaqArticle() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Support & Help Center
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {title}
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl">{description}</p>
      </header>

      <div className="grid gap-4">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.question}
            className="p-6 rounded-2xl bg-zinc-900/60 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-200 shadow-sm hover:shadow-[0_0_20px_rgba(0,223,229,0.05)] space-y-2.5"
          >
            <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-cyan-400" />
              {item.question}
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed pl-4">
              {item.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Direct Contact Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-zinc-900/80 to-blue-950/30 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-semibold text-white">
            ¿Tienes alguna otra duda o consulta comercial?
          </h3>
          <p className="text-xs text-zinc-400">
            Nuestro equipo de soporte está disponible para asistirte con tu cuenta y configuraciones.
          </p>
        </div>
        <a
          href="/docs/support/contact-us"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold text-xs transition-colors shrink-0"
        >
          Contactar Soporte
        </a>
      </div>
    </article>
  );
}
