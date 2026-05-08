'use client';

export function PrintBar() {
  return (
    <div
      className="devis-no-print"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 12,
      }}
    >
      <span style={{ color: 'rgba(245,245,245,0.55)' }}>
        Astuce — pour générer le PDF :{' '}
        <strong style={{ color: '#E8C677' }}>⌘P</strong> puis <em>Enregistrer au format PDF</em>.
      </span>
      <button
        onClick={() => window.print()}
        style={{
          background: '#E8C677',
          color: '#0A0A0A',
          padding: '8px 16px',
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Imprimer / PDF
      </button>
    </div>
  );
}
