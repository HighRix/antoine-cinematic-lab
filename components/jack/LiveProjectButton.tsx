'use client';

export function LiveProjectButton() {
  return (
    <button
      className="rounded-full border-2 font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors cursor-pointer"
      style={{ borderColor: '#D7E2EA', color: '#D7E2EA' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(215, 226, 234, 0.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      Live Project
    </button>
  );
}
