'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Clock, TrendingDown, LayoutGrid, Building2, ArrowUpRight } from 'lucide-react'

function useCountUp(end: number, duration: number = 2200, start: boolean = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(easeOutQuart(progress) * end))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [start, end, duration])
  return count
}

const benefits = [
  {
    icon: Clock,
    metricEnd: 70,
    metricSuffix: '%',
    metricLabel: 'de redução no tempo de gestão',
    title: 'Economia de Tempo',
    description: 'Gestores relatam economizar em média 6 horas por semana que antes eram gastas montando e ajustando escalas manualmente em planilhas.',
    color: '#6C3BFF',
    gradientBg: 'linear-gradient(135deg, rgba(108,59,255,0.13) 0%, rgba(108,59,255,0.04) 100%)',
    border: 'rgba(108,59,255,0.22)',
    highlight: 'rgba(108,59,255,0.5)',
  },
  {
    icon: TrendingDown,
    metricEnd: 98,
    metricSuffix: '%',
    metricLabel: 'de conflitos de escala eliminados',
    title: 'Redução de Erros',
    description: 'Alertas em tempo real identificam duplas escalas, horários inadequados e falhas de cobertura antes mesmo de você salvar.',
    color: '#10b981',
    gradientBg: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.03) 100%)',
    border: 'rgba(16,185,129,0.2)',
    highlight: 'rgba(16,185,129,0.5)',
  },
  {
    icon: LayoutGrid,
    metricEnd: 100,
    metricSuffix: '%',
    metricLabel: 'dos dados centralizados e acessíveis',
    title: 'Organização Total',
    description: 'Todos os plantões, profissionais, documentos e relatórios acessíveis de qualquer dispositivo, 24 horas por dia.',
    color: '#6366F1',
    gradientBg: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.03) 100%)',
    border: 'rgba(99,102,241,0.2)',
    highlight: 'rgba(99,102,241,0.5)',
  },
  {
    icon: Building2,
    metricEnd: 500,
    metricSuffix: '+',
    metricLabel: 'profissionais gerenciados ativamente',
    title: 'Escalabilidade',
    description: 'Da clínica com 5 médicos ao hospital com 500+ profissionais. A plataforma cresce com você sem aumento de complexidade.',
    color: '#f59e0b',
    gradientBg: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0.03) 100%)',
    border: 'rgba(245,158,11,0.2)',
    highlight: 'rgba(245,158,11,0.5)',
  },
]

function BenefitCard({ b, index }: { b: typeof benefits[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(b.metricEnd, 2000, isInView)
  const Icon = b.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.015 }}
      style={{
        flex: '1 1 calc(50% - 12px)',
        minWidth: 260,
        background: b.gradientBg,
        border: `1px solid ${b.border}`,
        borderRadius: 22,
        padding: '36px 32px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 24px 60px ${b.highlight.replace('0.5', '0.2')}, 0 0 0 1px ${b.border}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Decorative corner */}
      <div style={{
        position: 'absolute', bottom: -40, right: -40,
        width: 150, height: 150,
        background: `radial-gradient(circle, ${b.highlight.replace('0.5', '0.15')} 0%, transparent 70%)`,
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Metric + icon row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <motion.div
            style={{
              fontSize: 'clamp(52px, 6vw, 70px)',
              fontWeight: 900, lineHeight: 0.9,
              letterSpacing: '-3px',
              color: b.color,
              fontFamily: 'system-ui',
            }}
          >
            {count}{b.metricSuffix}
          </motion.div>
          <div style={{
            fontSize: 12, color: 'rgba(240,238,255,0.45)',
            fontWeight: 500, marginTop: 8, maxWidth: 200,
            lineHeight: 1.4,
          }}>
            {b.metricLabel}
          </div>
        </div>

        <div style={{
          width: 48, height: 48,
          background: `${b.color}1A`,
          border: `1px solid ${b.color}33`,
          borderRadius: 14, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={22} color={b.color} />
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: 1, marginBottom: 20,
        background: `linear-gradient(90deg, ${b.color}33, transparent)`,
      }} />

      {/* Text */}
      <h3 style={{
        fontSize: 18, fontWeight: 700, color: '#f0eeff',
        marginBottom: 10, letterSpacing: '-0.3px',
      }}>
        {b.title}
      </h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.68, color: 'rgba(240,238,255,0.54)' }}>
        {b.description}
      </p>

      {/* Learn more */}
      <motion.div
        whileHover={{ x: 4 }}
        style={{
          marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 13, fontWeight: 600, color: b.color, cursor: 'pointer',
        }}
      >
        Saiba mais <ArrowUpRight size={14} />
      </motion.div>
    </motion.div>
  )
}

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="benefits" style={{ position: 'relative', padding: '120px 24px' }}>
      <div className="section-divider" />

      {/* Ambient left */}
      <div style={{
        position: 'absolute', top: '30%', left: 0,
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(108,59,255,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 20 }}
          >
            <span className="section-label">
              <TrendingDown size={12} />
              Resultados reais
            </span>
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            style={{ marginBottom: 18 }}
          >
            Números que aparecem
            <br />no dia a dia da sua equipe
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 17, color: 'rgba(240,238,255,0.54)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}
          >
            Não prometemos milagres. Mostramos dados reais de clientes que usam a plataforma há pelo menos 90 dias.
          </motion.p>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {benefits.map((b, i) => (
            <BenefitCard key={i} b={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
