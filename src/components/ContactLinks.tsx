import { ArrowUpRightIcon } from "./Icons";

const links = [
  { label: "Email", href: "mailto:m.rosengyn@gmail.com", external: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/maryrose-nguyen/", external: true },
  { label: "Resume", href: "https://drive.google.com/file/d/1-vjlVkLz03dQ7yPIHvvD7FoIH0TIRWdN/view?usp=sharing", external: true },
];

export default function ContactLinks() {
  return (
    <ul className="flex items-center gap-space-4">
      {links.map((link) => {
        const content = (
          <>
            <span className="type-caption uppercase">{link.label}</span>
            <span className="relative size-[9px]">
              <ArrowUpRightIcon className="absolute inset-[-8.33%] size-[116.66%] max-w-none" />
            </span>
          </>
        );
        return (
          <li key={link.label}>
            {link.href ? (
              <a
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-space-1 text-surface-150 transition-colors hover:text-primary-300"
              >
                {content}
              </a>
            ) : (
              <span aria-disabled="true" className="flex items-center gap-space-1 text-surface-150">
                {content}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
