export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-grid" />
      {/* Purple/blue blob — top-left area per user decision */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] blob-purple"
        style={{
          filter: 'blur(60px)',
          animation: 'blob-drift 25s ease-in-out infinite',
        }}
      />
      {/* Teal/cyan blob — bottom-right area per user decision */}
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] blob-cyan"
        style={{
          filter: 'blur(60px)',
          animation: 'blob-drift 30s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
}
