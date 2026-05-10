import { Mail, Phone } from "lucide-react";
import { IconGithub, IconLinkedin } from "@/components/icons/brand";
import { profile, type SocialIcon } from "@/content/profile";

type IconCmp = React.ComponentType<{ size?: number; className?: string }>;

const iconMap: Record<SocialIcon, IconCmp> = {
  Github: IconGithub,
  Linkedin: IconLinkedin,
  Mail: Mail as unknown as IconCmp,
  Phone: Phone as unknown as IconCmp,
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-white/5 print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} {profile.name}. Built with Next.js, R3F & a lot of late-night coffee.
          </p>
          <div className="flex items-center gap-2">
            {profile.socials.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground hover:text-cyan hover:border-cyan/40 transition-all hover:-translate-y-0.5"
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
