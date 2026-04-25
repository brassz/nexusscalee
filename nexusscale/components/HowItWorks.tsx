'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, CalendarCheck, BrainCircuit, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Cadastro de Profissionais',
    description: 'Importe sua equipe em segundos. Cadastre médicos, especialidades, CRM e disponibilidades. O sistema já organiza tudo automaticamente.',
    detail: 'Integração com sistemas HR existentes via API',
    color: '#6C3BFF',
    glow: 'rgba(108,59,255,0.35)',
    border: 'rgba(108,59,255,0.3)',
    bg: 'rgba(108,59,255,0.1)',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'Criação de Plantões',
    description: 'Monte escalas completas com poucos cliques. A IA detecta conflitos, avisa sobreposições e sugere distribuições ideais em tempo real.',
    detail: 'Detecção automática de conflitos e sobreposições',
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.3)',
    border: 'rgba(124,58,237,0.3)',
    bg: 'rgba(124,58,237,0.08)',
  },
  {
    number: '03',
    icon: BrainCircuit,
    title: 'Gestão Automatizada',
    description: 'Confirmações por WhatsApp, SMS e email. Substituições automáticas, relatórios em PDF e painel ao vivo. Zero trabalho manual.',
    detail: 'Notificações multi-canal e relatórios automáticos',
    color: '#4F46E5',
    glow: 'rgba(79,70,229,0.3)',
    border: 'rgba(79,70,229,0.3)',
    bg: 'rgba(79,70,229,0.08)',
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.94, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ flex: 1, minWidth: 280, position: 'relative' }}
    >
      {/* Connector arrow (not on last) */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', right: -20, top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10, transformOrigin: 'left',
            display: 'flex', alignItems: 'center',
          }}
          className="hidden lg:flex"
        >
          <div style={{
            width: 28, height: 28,
            background: 'rgba(108,59,255,0.15)',
            border: '1px solid rgba(108,59,255,0.3)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ArrowRight size={12} color="#8B5CF6" />
          </div>
        </motion.div>
      )}

      {/* Card */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          background: step.bg,
          border: `1px solid ${step.border}`,
          borderRadius: 22,
          padding: '36px 32px',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          transition: 'box-shadow 0.4s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 24px 64px ${step.glow}, 0 0 0 1px ${step.border}`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Big step number watermark */}
        <div style={{
          position: 'absolute', bottom: -24, right: 12,
          fontSize: 130, fontWeight: 900, lineHeight: 1,
          color: step.color, opacity: 0.055,
          userSelect: 'none', pointerEvents: 'none',
          fontFamily: 'system-ui',
        }}>
          {step.number}
        </div>

        {/* Top glow line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
          opacity: 0.7,
        }} />

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{
            width: 60, height: 60,
            background: `linear-gradient(135deg, ${step.color}, ${step.color}bb)`,
            borderRadius: 17,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28,
            boxShadow: `0 8px 28px ${step.glow}`,
          }}
        >
          <Icon size={28} color="white" />
        </motion.div>

        {/* Step label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          background: `${step.color}22`,
          border: `1px solid ${step.color}44`,
          borderRadius: 100, padding: '4px 12px',
          fontSize: 11, fontWeight: 700, letterSpacing: '1.5px',
          color: step.color === '#4F46E5' ? '#a5b4fc' : '#c4b5fd',
          textTransform: 'uppercase', marginBottom: 16,
        }}>
          Passo {step.number}
        </div>

        <h3 style={{
          fontSize: 21, fontWeight: 700, color: '#f0eeff',
          marginBottom: 14, letterSpacing: '-0.4px', lineHeight: 1.2,
        }}>
          {step.title}
        </h3>

        <p style={{
          fontSize: 15, lineHeight: 1.7,
          color: 'rgba(240,238,255,0.58)',
          marginBottom: 20,
        }}>
          {step.description}
        </p>

        {/* Detail chip */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 100, padding: '5px 12px',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: step.color, boxShadow: `0 0 8px ${step.color}` }} />
          <span style={{ fontSize: 12, color: 'rgba(240,238,255,0.45)', fontWeight: 500 }}>{step.detail}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="how-it-works"
      className="section-base"
      style={{ position: 'relative', padding: '120px 24px' }}
    >
      <div className="section-divider" />

      {/* Background ambient */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 900, height: 500,
        background: 'radial-gradient(ellipse, rgba(108,59,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 20 }}
          >
            <span className="section-label">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6C3BFF', display: 'inline-block', boxShadow: '0 0 8px #6C3BFF' }} />
              Simples por design
            </span>
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 20 }}
          >
            Do zero à gestão completa
            <br />em 3 passos
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 18, color: 'rgba(240,238,255,0.54)',
              maxWidth: 500, margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Configure em menos de 48 horas. Sem treinamento complexo, sem migração dolorosa.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            marginTop: 64,
            background: 'rgba(108,59,255,0.07)',
            border: '1px solid rgba(108,59,255,0.2)',
            borderRadius: 18,
            padding: '24px 32px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#f0eeff', marginBottom: 4 }}>
              Pronto para começar?
            </div>
            <div style={{ fontSize: 14, color: 'rgba(240,238,255,0.5)' }}>
              Implementação assistida inclusa em todos os planos.
            </div>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 26px', fontSize: 14, fontWeight: 700,
              borderRadius: 11, textDecoration: 'none',
              background: 'linear-gradient(135deg, #6C3BFF, #4F46E5)',
              color: 'white',
              border: '1px solid rgba(167,139,250,0.3)',
              boxShadow: '0 6px 28px rgba(108,59,255,0.4)',
              cursor: 'pointer',
            }}
          >
            Começar agora
            <ArrowRight size={15} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
