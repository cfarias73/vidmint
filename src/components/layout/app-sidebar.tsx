import { GitHubIcon } from '@/components/icons/github-icon';
import { XIcon } from '@/components/icons/x-icon';
import { YouTubeIcon } from '@/components/icons/youtube-icon';
import {
  OpenStoryIcon,
  OpenStoryLogo,
} from '@/components/icons/openstory-logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { FeedbackDialog } from '@/components/feedback/feedback-dialog';
import { useLowBalanceWarning } from '@/hooks/use-low-balance-warning';
import { MODELS_ENABLED } from '@/lib/flags';
import { SITE_CONFIG } from '@/lib/marketing/constants';
import { usePostHog } from '@posthog/react';
import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  BadgeDollarSign,
  Boxes,
  Clapperboard,
  Film,
  Images,
  LifeBuoy,
  Mail,
  MapPin,
  Palette,
  Plus,
  Sparkles,
  Users,
  Video,
} from 'lucide-react';
import { CreditBalancePill } from './credit-balance-pill';
import { UserSidebarFooter } from './user-sidebar-footer';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/sequences', label: 'Sequences', icon: Video },
  { to: '/images', label: 'Images', icon: Images },
  { to: '/videos', label: 'Videos', icon: Film },
  ...(MODELS_ENABLED
    ? [{ to: '/models', label: 'Models', icon: Boxes } as const]
    : []),
  { to: '/styles', label: 'Styles', icon: Palette },
  { to: '/talent', label: 'Talent', icon: Users },
  { to: '/locations', label: 'Locations', icon: MapPin },
  { to: '/gallery', label: 'Gallery', icon: Clapperboard },
] as const;

export function AppSidebar() {
  useLowBalanceWarning();

  const { isMobile, setOpenMobile } = useSidebar();
  const posthog = usePostHog();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [pathname, isMobile, setOpenMobile]);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/[0.07] bg-zinc-950/95 backdrop-blur-xl"
    >
      <SidebarHeader className="border-b border-white/[0.06] px-3 py-3.5">
        <Link
          to="/"
          className="flex h-9 items-center px-1.5 transition-transform duration-150 hover:opacity-90 active:scale-98 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <OpenStoryLogo
            size="md"
            className="group-data-[collapsible=icon]:hidden"
          />
          <OpenStoryIcon
            size="md"
            className="hidden group-data-[collapsible=icon]:block"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        {/* Action button */}
        <div className="mb-2">
          <Link
            to="/"
            onClick={() =>
              posthog.capture('make_another_clicked', {
                surface: 'sidebar',
              })
            }
            className={cn(
              'group relative flex items-center justify-center gap-2.5 w-full py-2.5 px-3 rounded-xl font-medium text-sm transition-all duration-200',
              'bg-gradient-to-r from-cyan-500/15 via-blue-600/15 to-purple-600/20',
              'hover:from-cyan-500/25 hover:via-blue-600/25 hover:to-purple-600/30',
              'text-cyan-300 hover:text-white',
              'border border-cyan-500/30 hover:border-cyan-400/50',
              'shadow-[0_0_15px_rgba(0,223,229,0.08)] hover:shadow-[0_0_20px_rgba(0,223,229,0.2)]',
              'group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:size-9'
            )}
          >
            <Plus className="size-4 text-cyan-400 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-90" />
            <span className="group-data-[collapsible=icon]:hidden font-semibold">
              New sequence
            </span>
          </Link>
        </div>

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    asChild
                    tooltip={label}
                    className={cn(
                      'h-9 px-3 rounded-xl text-zinc-400 font-medium transition-all duration-150',
                      'hover:bg-white/[0.06] hover:text-zinc-100',
                      'data-[active=true]:bg-gradient-to-r data-[active=true]:from-cyan-500/15 data-[active=true]:to-transparent data-[active=true]:text-cyan-300 data-[active=true]:font-semibold data-[active=true]:border-l-2 data-[active=true]:border-cyan-400'
                    )}
                  >
                    <Link
                      to={to}
                      activeProps={{ 'data-active': 'true' }}
                      activeOptions={{ exact: false }}
                      className="flex items-center gap-3"
                    >
                      <Icon className="size-4 shrink-0 transition-colors group-hover:text-zinc-100 group-data-[active=true]:text-cyan-400" />
                      <span className="text-[13.5px]">{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/[0.06] p-2 space-y-1">
        <SidebarMenu className="gap-0.5">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Guide"
              className="h-8 px-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] rounded-lg text-xs"
            >
              <Link to="/docs">
                <LifeBuoy className="size-3.5" />
                <span>Guide</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Pricing"
              className="h-8 px-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] rounded-lg text-xs"
            >
              <Link to="/pricing">
                <BadgeDollarSign className="size-3.5" />
                <span>Pricing</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Feedback"
              onClick={() => setFeedbackOpen(true)}
              className="h-8 px-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] rounded-lg text-xs"
            >
              <Mail className="size-3.5" />
              <span>Feedback</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="my-1 bg-white/[0.06]" />
        {/* Quiet status chip — not a nav peer of Sequences/Gallery (#1090). */}
        <CreditBalancePill />
        <SidebarMenu>
          <UserSidebarFooter />
        </SidebarMenu>
      </SidebarFooter>
      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </Sidebar>
  );
}
