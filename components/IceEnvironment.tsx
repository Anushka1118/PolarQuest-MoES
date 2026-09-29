'use client';
import { useEffect, useRef, useCallback } from 'react';

export default function IceEnvironment() {
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = glowRef.current;
    if (!el) return;
    const x = (e.clientX / window.innerWidth)  * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    el.style.background =
      `radial-gradient(ellipse 45vw 38vw at ${x}% ${y}%, rgba(88,201,243,0.055) 0%, transparent 80%)`;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  return (
    <>
      <style>{`
        @keyframes aq-drift {
          0%,100% { transform:scale(1)    translate(0,0);   opacity:0.8; }
          40%      { transform:scale(1.06) translate(2%,2%); opacity:1.0; }
          70%      { transform:scale(0.96) translate(-1%,3%);opacity:0.6; }
        }
        @keyframes aq-drift2 {
          0%,100% { transform:scale(1)    translate(0,0);    opacity:0.6; }
          35%      { transform:scale(1.05) translate(-3%,-2%);opacity:0.9; }
          70%      { transform:scale(0.97) translate(2%,2%); opacity:0.5; }
        }
        @keyframes aq-sheen {
          0%   { transform:translateX(-130%) skewX(-18deg); opacity:0; }
          7%   { opacity:1; }
          93%  { opacity:1; }
          100% { transform:translateX(260%) skewX(-18deg); opacity:0; }
        }
        .aq-a { animation: aq-drift  24s ease-in-out infinite; }
        .aq-b { animation: aq-drift2 32s ease-in-out infinite; animation-delay:-12s; }
        .aq-c { animation: aq-drift  28s ease-in-out infinite; animation-delay:-8s; }
        .aq-sheen { animation: aq-sheen 20s cubic-bezier(0.4,0,0.6,1) infinite; animation-delay:5s; }
      `}</style>

      {/* Mouse glow */}
      <div ref={glowRef} aria-hidden="true"
        style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', mixBlendMode:'screen', transition:'background 0.10s ease' }} />

      {/* Ambient depth pools */}
      <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div className="aq-a" style={{ position:'absolute', top:'-18%', left:'-8%', width:'60vw', height:'60vw', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(189,229,255,0.11) 0%, rgba(88,201,243,0.05) 50%, transparent 72%)',
          filter:'blur(60px)' }} />
        <div className="aq-b" style={{ position:'absolute', bottom:'-15%', right:'-12%', width:'68vw', height:'55vw', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(47,160,198,0.09) 0%, transparent 68%)',
          filter:'blur(72px)' }} />
        <div className="aq-c" style={{ position:'absolute', top:'35%', right:'15%', width:'42vw', height:'32vw', borderRadius:'50%',
          background:'radial-gradient(ellipse, rgba(88,201,243,0.06) 0%, transparent 70%)',
          filter:'blur(52px)' }} />
      </div>

      {/* Prismatic sheen */}
      <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div className="aq-sheen" style={{ position:'absolute', top:0, left:0, width:'32%', height:'100%',
          background:'linear-gradient(90deg, transparent 0%, transparent 25%, rgba(255,255,255,0.13) 50%, rgba(189,229,255,0.06) 70%, transparent 100%)',
          filter:'blur(1px)' }} />
      </div>
    </>
  );
}