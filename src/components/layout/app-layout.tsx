import { cn } from '@/lib/utils';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import type * as React from 'react';
import { AuthGateProvider } from '@/components/auth/auth-gate-provider';
import { AddCreditsDialog } from '@/components/billing/add-credits-dialog';
import { GlobalBillingGateDialog } from '@/components/billing/billing-gate-dialog';
import { WelcomeCreditsProvider } from '@/components/billing/welcome-credits-dialog';
import { AppSidebar } from './app-sidebar';
import { Breadcrumbs } from './breadcrumbs';
import { ComplianceRestrictionBanner } from './compliance-restriction-banner';
import { InvalidApiKeyBanner } from './invalid-api-key-banner';

interface AppLayoutProps extends React.HTMLAttributes<HTMLElement> {}

export const AppLayout: React.FC<AppLayoutProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <AuthGateProvider>
      <WelcomeCreditsProvider>
        <TooltipProvider>
          <SidebarProvider className="h-svh">
            <AppSidebar />
            <AddCreditsDialog />
            <GlobalBillingGateDialog />
            <SidebarInset className="relative min-w-0 min-h-0 bg-background overflow-hidden">
              {/* Studio ambient backdrop glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
              >
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] rounded-full bg-gradient-to-b from-cyan-500/[0.08] via-purple-600/[0.05] to-transparent blur-3xl opacity-80" />
                <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[500px] rounded-full bg-indigo-600/[0.04] blur-3xl" />
              </div>

              <header className="relative z-10 flex h-12 shrink-0 items-center gap-2 border-b border-white/[0.06] bg-zinc-950/40 backdrop-blur-md px-4">
                <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] rounded-lg transition-colors" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-vertical:h-4 data-vertical:self-auto bg-white/[0.08]"
                />
                <div className="min-w-0 flex-1">
                  <Breadcrumbs />
                </div>
              </header>
              <ComplianceRestrictionBanner />
              <InvalidApiKeyBanner />
              <div
                className={cn(
                  'relative z-10 flex flex-col flex-1 min-w-0 min-h-0 overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable]',
                  className
                )}
                {...props}
              >
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </WelcomeCreditsProvider>
    </AuthGateProvider>
  );
};
