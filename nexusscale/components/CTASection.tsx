'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Sparkles, CheckCircle, Mail, MessageCircle } from 'lucide-react'

const perks = [
  'Implementação assistida grátis',
  'Sem contrato de fidelidade',
  'Suporte dedicado via WhatsApp',
  'Dados 100% no Brasil (LGPD)',
]

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" style={{ position: 'relative', padding: '120px 24px' }}>
      <div className="section-divider" />

      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(108,59,255,0.16) 0%, rgba(79,70,229,0.1) 60%, rgba(99,102,241,0.08) 100%)',
            border: '1px solid rgba(108,59,255,0.3)',
            borderRadius: 32,
            padding: 'clamp(48px, 8vw, 88px)',
            textAlign: 'center',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Grid inside */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              linear-gradient(rgba(108,59,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108,59,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            borderRadius: 32,
          }} />

          {/* Glow blob */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 700, height: 350,
            background: 'radial-gradient(ellipse, rgba(108,59,255,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Corner orbs */}
          {[
            { x: '-8%', y: '-25%', size: 250 },
            { x: '85%', y: '55%', size: 200 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', left: orb.x, top: orb.y,
                width: orb.size, height: orb.size,
                background: 'radial-gradient(circle, rgba(108,59,255,0.5) 0%, transparent 70%)',
                filter: 'blur(30px)', borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Top border accent */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)',
            borderRadius: 2,
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 36 }}
            >
              <span className="section-label" style={{ padding: '8px 20px', fontSize: 12 }}>
                <Sparkles size={13} />
                Comece hoje — é gratuito por 14 dias
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(30px, 6vw, 62px)',
                fontWeight: 900, lineHeight: 1.04,
                letterSpacing: '-2.5px', marginBottom: 22,
              }}
            >
              <span style={{
                background: 'linear-gradient(160deg, #FFFFFF 0%, #EDE9FE 40%, #C4B5FD 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Transforme sua gestão
              </span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #8B5CF6, #6C3BFF, #4F46E5)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                de plantões hoje
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                fontSize: 18, color: 'rgba(240,238,255,0.58)',
                maxWidth: 500, margin: '0 auto 40px',
                lineHeight: 1.65,
              }}
            >
              Agende uma demonstração gratuita com um especialista e veja sua operação transformada em menos de 48 horas.
            </motion.p>

            {/* Perks */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.44 }}
              style={{
                display: 'flex', flexWrap: 'wrap', gap: 14,
                justifyContent: 'center', marginBottom: 44,
              }}
            >
              {perks.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle size={15} color="#10b981" strokeWidth={2.5} />
                  <span style={{ fontSize: 14, color: 'rgba(240,238,255,0.6)', fontWeight: 500 }}>{p}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.52 }}
              style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '17px 38px', fontSize: 16, fontWeight: 700,
                  borderRadius: 14, cursor: 'pointer',
                  background: 'linear-gradient(135deg, #6C3BFF, #4F46E5)',
                  color: 'white',
                  border: '1px solid rgba(167,139,250,0.4)',
                  boxShadow: '0 14px 56px rgba(108,59,255,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
                  letterSpacing: '0.1px',
                }}
              >
                Agendar Demonstração Gratuita
                <ArrowRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '17px 32px', fontSize: 15, fontWeight: 600,
                  borderRadius: 14, cursor: 'pointer',
                  background: 'rgba(255,255,255,0.055)',
                  color: 'rgba(240,238,255,0.85)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <MessageCircle size={17} />
                Falar no WhatsApp
              </motion.button>
            </motion.div>

            {/* Social proof mini */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              style={{
                marginTop: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              }}
            >
              <div style={{ display: 'flex' }}>
                {['#6C3BFF', '#7C3AED', '#4F46E5', '#6366F1'].map((c, i) => (
                  <div key={i} style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${c}, ${c}99)`,
                    border: '2px solid rgba(4,4,10,0.8)',
                    marginLeft: i > 0 ? -10 : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, color: 'white',
                  }}>
                    {['RS', 'FG', 'CM', 'PA'][i]}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(240,238,255,0.45)' }}>
                <span style={{ color: 'rgba(240,238,255,0.75)', fontWeight: 600 }}>200+ gestores</span>
                {' '}já transformaram suas operações
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
