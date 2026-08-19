import { useState } from 'react';
import { creamMuted, goldFaint } from '../themes';

export default function Navbar({ onManage, onBook }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-[rgba(12,9,5,0.88)] to-transparent backdrop-blur-[4px]">
      <div className="flex items-center justify-between px-4 sm:px-10 py-4">

        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <path d="M14 2L26 22H2Z" fill="none" stroke="rgba(200,136,42,.9)" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="3.5" fill="rgba(200,136,42,.18)" stroke="rgba(200,136,42,.55)" strokeWidth="1" />
          </svg>
          <span className="font-serif text-[1.05rem] text-[rgba(240,216,144,.95)] tracking-[.05em]">
            5S Dining
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7 text-sm text-[rgba(240,216,144,.85)]">
          {['Menu', 'Chi nhánh', 'Về chúng tôi', 'Liên hệ'].map(i => (
            <a key={i} href="#" className="transition-colors hover:text-amber-300">{i}</a>
          ))}
          <button onClick={onManage} className="transition-colors hover:text-amber-300">Tra cứu</button>
        </div>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button onClick={onBook} className="btn-primary px-4 sm:px-5 py-2 rounded-full text-sm min-h-[36px]">
            Đặt bàn
          </button>

          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden flex flex-col items-center justify-center gap-1 w-9 h-9 text-[rgba(200,136,42,.7)]"
          >
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[rgba(12,9,5,.97)] ${menuOpen ? 'max-h-52 border-t border-[rgba(200,136,42,.3)]' : 'max-h-0'}`}
      >
        <div className="px-5 py-4 space-y-4">
          {['Menu', 'Chi nhánh', 'Về chúng tôi', 'Liên hệ', 'Tra cứu đặt bàn'].map(i => (
            <button
              key={i}
              onClick={() => {
                setMenuOpen(false);
                if (i === 'Tra cứu đặt bàn' && onManage) onManage();
              }}
              className="block w-full text-left text-sm text-[rgba(240,216,144,.85)] min-h-[36px]"
            >
              {i}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}