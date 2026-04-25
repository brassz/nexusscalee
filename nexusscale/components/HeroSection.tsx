'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Play, ChevronDown, Check } from 'lucide-react'

/* ── Split headline word by word ────────────────────────────── */
function SplitWords({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block', marginRight: '0.27em', ...style }}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

/* ── ECG path (heartbeat line) ───────────────────────────────── */
function EcgLine({ style }: { style?: React.CSSProperties }) {
  // Realistic ECG: flat → P wave → flat → QRS spike → flat → T wave → flat
  const path = "M0,50 L60,50 L70,48 L80,52 L90,50 L100,50 L108,50 L112,20 L116,80 L120,10 L124,60 L128,50 L140,50 L152,46 L160,54 L168,50 L220,50"

  return (
    <svg
      viewBox="0 0 220 100"
      preserveAspectRatio="none"
      style={{ display: 'block', ...style }}
    >
      <defs>
        <linearGradient id="ecg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(108,59,255,0)" />
          <stop offset="30%" stopColor="rgba(108,59,255,0.7)" />
          <stop offset="70%" stopColor="rgba(139,92,246,0.9)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0)" />
        </linearGradient>
        <filter id="ecg-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke="url(#ecg-grad)"
        strokeWidth="1.8"
        filter="url(#ecg-glow)"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.45, 0.75, 1] }}
      />
    </svg>
  )
}

/* ── Medical cross SVG ───────────────────────────────────────── */
function MedCross({ size = 20, opacity = 0.12, color = 'rgba(108,59,255,1)' }: { size?: number; opacity?: number; color?: string }) {
  const t = size * 0.3
  const w = size
  return (
    <svg width={w} height={w} viewBox="0 0 20 20" style={{ opacity }}>
      <rect x="8" y="1" width="4" height="18" rx="1.5" fill={color} />
      <rect x="1" y="8" width="18" height="4" rx="1.5" fill={color} />
    </svg>
  )
}

/* ── DNA helix dot row ───────────────────────────────────────── */
function DnaStrand({ x, top }: { x: string; top: string }) {
  const dots = Array.from({ length: 9 }, (_, i) => i)
  return (
    <div style={{
      position: 'absolute', left: x, top,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
      pointerEvents: 'none',
    }}>
      {dots.map((i) => {
        const offset = Math.sin(i * 0.75) * 14
        return (
          <div key={i} style={{ position: 'relative', width: 40, height: 4, display: 'flex', alignItems: 'center' }}>
            <div style={{
              position: 'absolute', left: 0,
              width: 4, height: 4, borderRadius: '50%',
              background: 'rgba(108,59,255,0.45)',
              transform: `translateX(${offset + 18}px)`,
              boxShadow: '0 0 4px rgba(108,59,255,0.5)',
            }} />
            <div style={{
              position: 'absolute', right: 0,
              width: 4, height: 4, borderRadius: '50%',
              background: 'rgba(99,102,241,0.35)',
              transform: `translateX(${-offset - 18}px)`,
              boxShadow: '0 0 4px rgba(99,102,241,0.5)',
            }} />
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)',
              width: 26, height: 1,
              background: 'linear-gradient(90deg, rgba(108,59,255,0.2), rgba(99,102,241,0.2))',
            }} />
          </div>
        )
      })}
    </div>
  )
}

const PARTICLES = [
  { l: '8%',  t: '72%', s: 2.5, d: 8,  delay: 0   },
  { l: '17%', t: '55%', s: 1.5, d: 11, delay: 1.5 },
  { l: '27%', t: '80%', s: 2,   d: 9,  delay: 3   },
  { l: '38%', t: '60%', s: 1,   d: 13, delay: 0.8 },
  { l: '50%', t: '90%', s: 2,   d: 7,  delay: 2.2 },
  { l: '61%', t: '65%', s: 1.5, d: 10, delay: 4   },
  { l: '72%', t: '75%', s: 2.5, d: 8,  delay: 1   },
  { l: '83%', t: '50%', s: 1,   d: 12, delay: 2.8 },
  { l: '91%', t: '82%', s: 2,   d: 9,  delay: 0.5 },
]

const CROSSES = [
  { l: '4%',   t: '18%', size: 16, op: 0.10 },
  { l: '14%',  t: '68%', size: 22, op: 0.08 },
  { l: '88%',  t: '22%', size: 18, op: 0.09 },
  { l: '92%',  t: '72%', size: 14, op: 0.07 },
  { l: '76%',  t: '12%', size: 20, op: 0.08 },
  { l: '42%',  t: '88%', size: 12, op: 0.06 },
]

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg-base)',
      }}
    >
      {/* CSS keyframes */}
      <style>{`
        @keyframes rise { 0%,100%{transform:translateY(0);opacity:0} 20%{opacity:.6} 80%{opacity:.4} }
        .p{position:absolute;border-radius:50%;background:rgba(167,139,250,.75);pointer-events:none;animation:rise linear infinite;}
        @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:0.4} 100%{transform:scale(2.2);opacity:0} }
      `}</style>

      {/* ── Purple glow top ───────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          radial-gradient(ellipse 70% 55% at 50% -5%, rgba(108,59,255,0.42) 0%, transparent 65%),
          radial-gradient(ellipse 38% 38% at 18% 72%, rgba(79,70,229,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 30% 30% at 88% 58%, rgba(99,102,241,0.13) 0%, transparent 60%)
        `,
      }} />

      {/* ── Medical crosses (scattered) ───────────────────────── */}
      {CROSSES.map((c, i) => (
        <div key={i} style={{ position: 'absolute', left: c.l, top: c.t, pointerEvents: 'none', zIndex: 1 }}>
          <MedCross size={c.size} opacity={c.op} />
        </div>
      ))}

      {/* ── DNA strands left & right ──────────────────────────── */}
      <DnaStrand x="2%" top="15%" />
      <DnaStrand x="94%" top="25%" />

      {/* ── ECG line — bottom of hero ─────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 80, left: 0, right: 0,
        height: 80, pointerEvents: 'none', zIndex: 1,
        display: 'flex', alignItems: 'center',
      }}>
        {/* Repeat ECG across full width */}
        {[0, 1, 2, 3, 4].map((i) => (
          <EcgLine
            key={i}
            style={{ flex: 1, height: 80, opacity: 0.7 - i * 0.08 }}
          />
        ))}
      </div>

      {/* Faint horizontal rule around ECG area */}
      <div style={{
        position: 'absolute', bottom: 115, left: '5%', right: '5%',
        height: 1, pointerEvents: 'none', zIndex: 1,
        background: 'linear-gradient(90deg, transparent, rgba(108,59,255,0.15) 20%, rgba(108,59,255,0.15) 80%, transparent)',
      }} />

      {/* ── Pulse ring (heartbeat indicator) ─────────────────── */}
      <div style={{
        position: 'absolute', bottom: 118, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2, pointerEvents: 'none',
      }}>
        <div style={{ position: 'relative', width: 10, height: 10 }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: '#6C3BFF',
            boxShadow: '0 0 8px rgba(108,59,255,0.9)',
          }} />
          <motion.div
            animate={{ scale: [0.8, 2.4], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '1px solid rgba(108,59,255,0.6)',
            }}
          />
        </div>
      </div>

      {/* ── Floating particles ───────────────────────────────── */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="p" style={{
          left: p.l, top: p.t, width: p.s, height: p.s,
          animationDuration: `${p.d}s`, animationDelay: `${p.delay}s`, zIndex: 1,
        }} />
      ))}

      {/* ── Main content ─────────────────────────────────────── */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '120px 24px 120px', textAlign: 'center' }}>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(42px, 8vw, 86px)',
            fontWeight: 900, lineHeight: 1.0,
            letterSpacing: '-3px', marginBottom: 28,
          }}>
            <div>
              <SplitWords
                text="Automatize seus"
                delay={0.1}
                style={{
                  background: 'linear-gradient(160deg,#fff 0%,#ede9fe 40%,#c4b5fd 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}
              />
            </div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <motion.span
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg,#8B5CF6,#6C3BFF,#4F46E5)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}
              >
                plantões
              </motion.span>
              {' '}
              <motion.span
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(160deg,#fff 0%,#ede9fe 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}
              >
                com
              </motion.span>
            </div>
            <div>
              <motion.span
                initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block', position: 'relative',
                  background: 'linear-gradient(135deg,#8B5CF6,#6C3BFF,#4F46E5)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}
              >
                inteligência
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute', bottom: -6, left: 0, right: 0,
                    height: 4, borderRadius: 2, transformOrigin: 'left',
                    background: 'linear-gradient(90deg,#6C3BFF,#8B5CF6,#4F46E5)',
                    boxShadow: '0 0 14px rgba(108,59,255,0.9)',
                  }}
                />
              </motion.span>
            </div>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(16px, 2.2vw, 20px)',
              color: 'rgba(240,238,255,0.6)', lineHeight: 1.65,
              maxWidth: 590, margin: '0 auto 48px', fontWeight: 400,
            }}
          >
            Elimine conflitos de escala, automatize notificações e tenha{' '}
            <span style={{ color: '#c4b5fd', fontWeight: 600 }}>
              visibilidade total da sua equipe médica
            </span>{' '}
            em tempo real.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '15px 34px', fontSize: 15, fontWeight: 700,
                borderRadius: 14, textDecoration: 'none',
                background: 'linear-gradient(135deg,#6C3BFF,#4F46E5)',
                color: 'white',
                border: '1px solid rgba(167,139,250,0.35)',
                boxShadow: '0 8px 36px rgba(108,59,255,0.48), inset 0 1px 0 rgba(255,255,255,0.12)',
                cursor: 'pointer',
              }}
            >
              Solicitar Demonstração <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 11,
                padding: '15px 30px', fontSize: 15, fontWeight: 600,
                borderRadius: 14, textDecoration: 'none',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(240,238,255,0.88)',
                border: '1px solid rgba(255,255,255,0.11)',
                backdropFilter: 'blur(12px)', cursor: 'pointer',
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(108,59,255,0.25)',
                border: '1px solid rgba(108,59,255,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Play size={10} color="#c4b5fd" fill="#c4b5fd" style={{ marginLeft: 2 }} />
              </div>
              Ver como funciona
            </motion.a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.88 }}
            style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {['Sem contrato', 'Setup em 48h', 'Suporte dedicado', 'LGPD compliant'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Check size={13} color="#10b981" strokeWidth={3} />
                <span style={{ fontSize: 13, color: 'rgba(240,238,255,0.48)', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex',
          background: 'rgba(10,6,22,0.75)',
          border: '1px solid rgba(108,59,255,0.2)',
          borderRadius: 16, backdropFilter: 'blur(20px)',
          margin: '0 24px', maxWidth: 600, marginInline: 'auto',
          boxShadow: '0 20px 56px rgba(0,0,0,0.45)',
          overflow: 'hidden',
          marginBottom: 160,
        }}
      >
        {[
          { value: '98%', label: 'Conflitos eliminados', color: '#8B5CF6' },
          { value: '3x',  label: 'Mais rápido',          color: '#6C3BFF' },
          { value: '500+',label: 'Profissionais ativos', color: '#6366F1' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: '20px 16px', textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(108,59,255,0.14)' : 'none',
          }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: s.color, letterSpacing: '-1px', lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(240,238,255,0.38)', marginTop: 6, fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: 'rgba(240,238,255,0.26)', zIndex: 3,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' }}>scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
