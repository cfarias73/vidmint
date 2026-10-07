import { BillingGateDialog } from '@/components/billing/billing-gate-dialog';
import { OpenStoryLogo } from '@/components/icons/openstory-logo';
import { PageContainer } from '@/components/layout/page-container';
import { PageIntro } from '@/components/typography/page-intro';
import { ScriptView } from '@/components/script/script-view';
import { Skeleton } from '@/components/ui/skeleton';
import { useBillingGate } from '@/hooks/use-billing-gate';
import { useSequence } from '@/hooks/use-sequences';
import { useStyles } from '@/hooks/use-styles';
import { useUser } from '@/hooks/use-user';
import { SITE_CONFIG } from '@/lib/marketing/constants';
import { AUTO_STYLE_ID } from '@/lib/style/auto-style';
import { briefForStyle } from '@/lib/style/brief-for-style';
import { styleSlug } from '@/lib/style/style-slug';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LandingShowcase } from '@/components/landing/landing-showcase';
import { LandingBentoFeatures } from '@/components/landing/landing-bento-features';
import { LandingHowItWorks } from '@/components/landing/landing-how-it-works';
import { LandingPricingPreview } from '@/components/landing/landing-pricing-preview';
import { LandingFooter } from '@/components/landing/landing-footer';

const BILLING_PROMPT_KEY = 'openstory:billing-prompt-dismissed';
const BILLING_PROMPT_EXPIRY_DAYS = 1;

function wasBillingPromptDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem(BILLING_PROMPT_KEY);
  if (!raw) return false;
  const expiry = Number(raw);
  if (Date.now() > expiry) {
    localStorage.removeItem(BILLING_PROMPT_KEY);
    return false;
  }
  return true;
}

function dismissBillingPrompt() {
  const expiry = Date.now() + BILLING_PROMPT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(BILLING_PROMPT_KEY, String(expiry));
}

type NewSequencePageProps = {
  style?: string;
  prefill?: 'style';
  from?: string;
  /**
   * Path used when the composer echoes its style pick into `?style=`.
   * Home lives at `/`; the logged-in alias is `/sequences/new`.
   */
  composerPath: '/' | '/sequences/new';
};

/**
 * Shared composer used by the root home (`/`) and the logged-in alias
 * (`/sequences/new`). Anonymous visitors get the marketing lead-in;
 * signed-in users get a full-height composer.
 */
export function NewSequencePage({
  style: styleParam,
  prefill,
  from,
  composerPath,
}: NewSequencePageProps) {
  const navigate = useNavigate();
  // Copy mode (#1037): hand the composer the source sequence and it seeds its
  // script + every generation setting from it, and creates with
  // `sourceSequenceId`. `allowScriptEdit` re-enables the editor, which is
  // read-only when the composer shows an analysed sequence's derived script —
  // correct there (the canonical text lives in scene versions), wrong here
  // (this text is only the seed for a new analysis, nothing writes back).
  const { data: sourceSequence } = useSequence(from ?? '');
  // Session is prefetched in _app/route.tsx beforeLoad, so this is settled on
  // first render — no flash for signed-in users.
  const { data: user } = useUser();

  // Sample-style prefill (#956): the showcase/gallery "Try this style" links
  // carry `?style=<slug>` (the slug the style's assets live under) + `#compose`
  // (so the router scrolls to the composer). Derive the seed straight from the
  // param during render — no effect, no state to keep in sync. The brief is
  // resolved from the style here so the URL only needs the slug; settings
  // (models, aspect ratio) follow once the style is selected. Remounting the
  // composer (`key`) on a new seed lets the `initialScript`/`initialStyleId`
  // props re-seed it. A leftover `?style=` after login restores the draft
  // instead of that seed when the style matches (see ScriptView, #1384).
  const { data: styles } = useStyles();

  // The composer mirrors its style pick into `?style=` (see `handleStyleChange`
  // below). When that self-sync is what changed the URL, the composer must NOT
  // re-seed or remount — only a genuine external navigation (a fresh "Try" /
  // "Use this style" link, or the showcase) should. `lastSelfSyncRef` remembers
  // the slug we wrote; `seedRef` freezes the one-time seed across our own syncs
  // so picking a style never clears the script.
  const lastSelfSyncRef = useRef<string | null>(null);
  const seedRef = useRef<{ key: string; script?: string; styleId?: string }>({
    key: 'blank',
  });
  // Login remounts the composer (logged-out chrome → signed-in chrome). Drop
  // the frozen self-sync seed so the current URL is re-read — otherwise a
  // Shuffle after Try keeps the original Try seed and login restores the
  // wrong sample (#1384).
  const userId = user?.id ?? null;
  const prevUserIdRef = useRef(userId);
  if (prevUserIdRef.current !== userId) {
    prevUserIdRef.current = userId;
    lastSelfSyncRef.current = null;
    seedRef.current = { key: '' };
  }

  const seedStyle = styleParam
    ? styles?.find((s) => styleSlug(s.name) === styleParam)
    : undefined;
  // `prefill=style` ("Use this style", and the composer's own selection sync)
  // seeds ONLY the style; the default ("Try" / gallery) also seeds the style's
  // sample brief as the prompt.
  const styleOnly = prefill === 'style';
  let candidateScript: string | undefined;
  if (seedStyle && !styleOnly) {
    try {
      candidateScript = briefForStyle({
        name: seedStyle.name,
        category: seedStyle.category,
      });
    } catch {
      // Unmapped style — leave the composer blank rather than seed nothing.
      candidateScript = undefined;
    }
  }
  // Distinguish the two seed modes so switching between "Try" and "Use this
  // style" for the same style still re-seeds.
  // `?style=auto` seeds the Automatic tile (#1213) — no sample to prefill.
  const seedAuto = styleParam === AUTO_STYLE_ID;
  const candidateKey = seedStyle
    ? `seed:${seedStyle.id}:${styleOnly ? 'style' : 'full'}`
    : seedAuto
      ? `seed:${AUTO_STYLE_ID}`
      : 'blank';

  // Adopt the URL's seed unless this `?style=` is the composer echoing its own
  // pick back — then keep the frozen seed so the composer stays mounted and the
  // script is preserved.
  const isSelfSync =
    styleParam != null && styleParam === lastSelfSyncRef.current;
  if (!isSelfSync && candidateKey !== seedRef.current.key) {
    seedRef.current = {
      key: candidateKey,
      script: candidateScript,
      styleId: seedStyle?.id ?? (seedAuto ? AUTO_STYLE_ID : undefined),
    };
  }
  const {
    key: composerKey,
    script: seedScript,
    styleId: seedStyleId,
  } = seedRef.current;

  // Reflect the composer's style pick in the URL so `?style=` always matches the
  // current selection (shareable, restores on reload). `replace` keeps it out of
  // the history stack.
  const handleStyleChange = useCallback(
    (styleId: string) => {
      const selected = styles?.find((s) => s.id === styleId);
      if (!selected && styleId !== AUTO_STYLE_ID) return;
      const slug = selected ? styleSlug(selected.name) : AUTO_STYLE_ID;
      lastSelfSyncRef.current = slug;
      void navigate({
        to: composerPath,
        // Spread prev so future search keys are not clobbered on style pick.
        search: (prev) => ({
          ...prev,
          style: slug,
          prefill: 'style' as const,
        }),
        replace: true,
      });
    },
    [styles, navigate, composerPath]
  );

  const { needsBillingSetup, hasFalKey, stripeEnabled } = useBillingGate();
  const [billingOpen, setBillingOpen] = useState(false);

  // Clear billing return flag when user is back on this page
  useEffect(() => {
    localStorage.removeItem('openstory:billing-return');
  }, []);

  useEffect(() => {
    if (needsBillingSetup && !wasBillingPromptDismissed()) {
      setBillingOpen(true);
    }
  }, [needsBillingSetup]);

  const handleSuccess = useCallback(
    (sequenceIds: string[]) => {
      const [firstId] = sequenceIds;
      if (firstId) {
        // No explicit view: ScenesView forces the script view while the split
        // streams, then auto-reveals the canvas at the first preview (#1091).
        void navigate({
          to: '/sequences/$id/scenes',
          params: { id: firstId },
        });
      }
    },
    [navigate]
  );

  // Copy mode's Cancel goes back to the sequence you copied from, not to a
  // blank composer — you came from somewhere specific.
  const handleCancelCopy = useCallback(() => {
    if (!from) return;
    void navigate({ to: '/sequences/$id/scenes', params: { id: from } });
  }, [from, navigate]);

  const billingGate = (
    <BillingGateDialog
      open={billingOpen}
      onOpenChange={(open) => {
        setBillingOpen(open);
        if (!open) dismissBillingPrompt();
      }}
      hasFalKey={hasFalKey}
      stripeEnabled={stripeEnabled}
      context="onboarding"
    />
  );

  // Copy mode or explicit sequence create alias (/sequences/new): pure workspace cockpit
  if (from && !sourceSequence) {
    return (
      <div className="h-full">
        {billingGate}
        <PageContainer maxWidth="narrow" fullHeight>
          <Skeleton className="h-96 w-full" />
        </PageContainer>
      </div>
    );
  }

  // Pure workspace mode only when explicitly on `/sequences/new` with a copy source
  if (from) {
    return (
      <div className="h-full">
        {billingGate}
        <PageContainer
          maxWidth="narrow"
          padding="compact"
          fullHeight
          className="space-y-3 sm:space-y-4 short-h:space-y-2 py-3 sm:py-5"
        >
          <div className="flex shrink-0 flex-col items-center gap-1.5 sm:gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-0.5 text-[11px] font-semibold text-cyan-300 backdrop-blur-md shadow-[0_0_12px_rgba(0,223,229,0.1)]">
              <Sparkles className="size-3 text-cyan-400" />
              <span className="tracking-wide">Sequence Studio</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Duplicate & Remaster Sequence
              </h1>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <ScriptView
              key={`copy:${from}`}
              loading={false}
              onSuccess={handleSuccess}
              sequence={sourceSequence}
              allowScriptEdit={true}
              onCancel={handleCancelCopy}
            />
          </div>
        </PageContainer>
      </div>
    );
  }

  // World-Class Cinematic Landing Page: Hero + Live Studio Cockpit + Showreel + Bento Features + Workflow + Pricing + Footer
  return (
    <div className="min-h-full flex flex-col">
      {billingGate}
      <div className="w-full flex-1 flex flex-col justify-center py-6 sm:py-10">
        <PageContainer
          maxWidth="narrow"
          padding="none"
          className="space-y-6 px-4 sm:px-6"
        >
          <div className="flex shrink-0 flex-col items-center gap-3">
            {/* Subtle studio pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,223,229,0.15)]">
              <Sparkles className="size-3.5 text-cyan-400" />
              <span className="tracking-wide">
                Next-Gen Generative AI Cinema
              </span>
            </div>

            <OpenStoryLogo size="lg" className="h-8 sm:h-11" />

            <div className="flex flex-col items-center gap-2">
              <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                Turn Scripts into Complete Cinematic Films
              </h1>
              <p className="text-center text-sm sm:text-base text-zinc-400 text-pretty max-w-xl leading-relaxed">
                Consistent characters, synchronized multitrack audio, and
                multi-scene direction in one studio cockpit.
              </p>
            </div>
          </div>

          {/* `#compose` target */}
          <div id="compose" className="flex min-h-0 flex-col scroll-mt-4">
            <ScriptView
              key={composerKey}
              loading={false}
              onSuccess={handleSuccess}
              initialScript={seedScript}
              initialStyleId={seedStyleId}
              initialScriptIsSample={!!seedScript}
              onStyleChange={handleStyleChange}
            />
          </div>
        </PageContainer>
      </div>

      {/* Cinematic Showcase Showreel */}
      <LandingShowcase styles={styles} />

      {/* Bento Grid Core Capabilities */}
      <LandingBentoFeatures />

      {/* Director Workflow: How it works */}
      <LandingHowItWorks />

      {/* Transparent Pricing Plans */}
      <LandingPricingPreview />

      {/* Luxury Studio Footer */}
      <LandingFooter />
    </div>
  );
}
