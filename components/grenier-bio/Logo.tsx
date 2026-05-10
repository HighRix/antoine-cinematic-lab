type LogoProps = {
  className?: string;
  /** Set to true on dark backgrounds — wraps the logo in a light pill for contrast. */
  onDark?: boolean;
};

/**
 * Le Grenier Bio d'Emberbail — logo officiel.
 * Source : public/grenier-bio/logo.png (image fournie par les SCIÉ).
 *
 * Usage :
 *   <Logo className="w-10 h-10" />              // light background (Navbar, sections claires)
 *   <Logo className="w-10 h-10" onDark />       // dark background (Footer)
 */
export function Logo({ className, onDark = false }: LogoProps) {
  if (onDark) {
    return (
      <span className="inline-flex items-center justify-center bg-[#FAF7F0] rounded-full p-1.5">
        <img
          src="/grenier-bio/logo.png"
          alt="Le Grenier Bio d'Emberbail"
          className={className}
        />
      </span>
    );
  }

  return (
    <img
      src="/grenier-bio/logo.png"
      alt="Le Grenier Bio d'Emberbail"
      className={className}
    />
  );
}
