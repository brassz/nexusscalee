'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Brain, Users, Bell, FileText, LayoutDashboard, Shield, Zap, LineChart, ArrowRight, Check } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Agenda Inteligente com IA',
    subtitle: 'Motor preditivo de escalas',
    description: 'IA que detecta conflitos automaticamente, sugere horários ideais e redistribui plantões em caso de cancelamento.',
    backDetail: [
      'Detecção de conflitos em tempo real',
      'Sugestão de substituição automática',
      'Otimização por especialidade médica',
      'Alertas antes do turno iniciar',
    ],
    gradient: 'linear-gradient(135deg, #6C3BFF 0%, #4F46E5 100%)',
    gradientBack: 'linear-gradient(160deg, #3b1d8c 0%, #1e1554 100%)',
    glow: 'rgba(108,59,255,0.5)',
    tag: 'IA Avançada',
  },
  {
    icon: Users,
    title: 'Gestão de Profissionais',
    subtitle: 'Perfis e disponibilidade',
    description: 'Perfis detalhados com especialidades, disponibilidade, CRM e histórico de plantões centralizados.',
    backDetail: [
      'CRM e registros profissionais',
      'Calendário de disponibilidade',
      'Histórico completo de plantões',
      'Grupos e departamentos',
    ],
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6C3BFF 100%)',
    gradientBack: 'linear-gradient(160deg, #3d1a7a 0%, #261060 100%)',
    glow: 'rgba(124,58,237,0.45)',
    tag: 'Centralizado',
  },
  {
    icon: Bell,
    title: 'Notificações Multi-canal',
    subtitle: 'WhatsApp, SMS e email',
    description: 'Confirmações, lembretes e alertas de troca sem qualquer intervenção manual. Envio automático.',
    backDetail: [
      'WhatsApp com confirmação rápida',
      'SMS para números sem internet',
      'Email com escala em anexo',
      'Push no app mobile',
    ],
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    gradientBack: 'linear-gradient(160deg, #252082 0%, #161550 100%)',
    glow: 'rgba(99,102,241,0.45)',
    tag: 'Automático',
  },
  {
    icon: FileText,
    title: 'Relatórios e PDF',
    subtitle: 'Exportação instantânea',
    description: 'Escalas prontas para impressão e auditoria. Relatórios de horas, frequência e custos com um clique.',
    backDetail: [
      'PDF com escala formatada',
      'Exportação Excel e CSV',
      'Horas por médico/mês',
      'Histórico de auditoria',
    ],
    gradient: 'linear-gradient(135deg, #5B21B6 0%, #6C3BFF 100%)',
    gradientBack: 'linear-gradient(160deg, #2d1169 0%, #1a0a44 100%)',
    glow: 'rgba(91,33,182,0.45)',
    tag: 'PDF e Excel',
  },
  {
    icon: LayoutDashboard,
    title: 'Painel Administrativo',
    subtitle: 'KPIs em tempo real',
    description: 'Visão da semana/mês, alertas de ausências e métricas de cobertura em um painel centralizado.',
    backDetail: [
      'Dashboard em tempo real',
      'Alertas de cobertura crítica',
      'Métricas de presença',
      'Filtros por setor/data',
    ],
    gradient: 'linear-gradient(135deg, #4338CA 0%, #4F46E5 100%)',
    gradientBack: 'linear-gradient(160deg, #1e1870 0%, #130f45 100%)',
    glow: 'rgba(67,56,202,0.45)',
    tag: 'Tempo real',
  },
  {
    icon: Shield,
    title: 'Segurança e LGPD',
    subtitle: 'Conformidade total',
    description: 'Criptografia ponta-a-ponta, controle de acesso por função e conformidade com LGPD e CFM.',
    backDetail: [
      'Criptografia end-to-end',
      'Controle de acesso por perfil',
      'Logs de auditoria completos',
      'Dados hospedados no Brasil',
    ],
    gradient: 'linear-gradient(135deg, #6C3BFF 0%, #6366F1 100%)',
    gradientBack: 'linear-gradient(160deg, #2e1780 0%, #1a0f50 100%)',
    glow: 'rgba(108,59,255,0.35)',
    tag: 'LGPD Ready',
  },
]

function FlipCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [flipped, setFlipped] = useState(false)
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{
        perspective: 1000,
        cursor: 'pointer',
        height: 260,
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%', height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Front face ─────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'rgba(255,255,255,0.027)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 20,
          padding: '28px 26px',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease',
          boxShadow: flipped ? `0 28px 60px ${feature.glow}` : 'none',
        }}>
          {/* Top gradient line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${feature.glow}, transparent)`,
          }} />

          {/* Corner glow */}
          <div style={{
            position: 'absolute', top: -20, right: -20,
            width: 100, height: 100,
            background: `radial-gradient(circle, ${feature.glow} 0%, transparent 70%)`,
            opacity: 0.4, borderRadius: '50%', pointerEvents: 'none',
          }} />

          {/* Icon */}
          <div style={{
            width: 50, height: 50,
            background: feature.gradient,
            borderRadius: 14, marginBottom: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 6px 20px ${feature.glow}`,
            flexShrink: 0,
          }}>
            <Icon size={23} color="white" />
          </div>

          {/* Tag */}
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(108,59,255,0.12)',
            border: '1px solid rgba(108,59,255,0.25)',
            borderRadius: 100, padding: '3px 10px',
            fontSize: 10, fontWeight: 700, color: '#c4b5fd',
            letterSpacing: '0.4px', marginBottom: 12, alignSelf: 'flex-start',
          }}>
            {feature.tag}
          </div>

          <h3 style={{
            fontSize: 17, fontWeight: 700, color: '#f0eeff',
            marginBottom: 8, letterSpacing: '-0.3px', lineHeight: 1.25,
          }}>
            {feature.title}
          </h3>

          <p style={{
            fontSize: 13.5, lineHeight: 1.65,
            color: 'rgba(240,238,255,0.5)', flex: 1,
          }}>
            {feature.description}
          </p>

          {/* Hover hint */}
          <div style={{
            marginTop: 14, display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 11, color: 'rgba(108,59,255,0.7)', fontWeight: 600,
            opacity: flipped ? 0 : 1, transition: 'opacity 0.2s',
          }}>
            <ArrowRight size={11} /> Passe o mouse para ver detalhes
          </div>
        </div>

        {/* ── Back face ──────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: feature.gradientBack,
          border: `1px solid ${feature.glow.replace('0.', '0.35')}`,
          borderRadius: 20,
          padding: '28px 26px',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: `0 28px 60px ${feature.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}>
          {/* Glow blob */}
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 160, height: 160,
            background: `radial-gradient(circle, ${feature.glow} 0%, transparent 70%)`,
            opacity: 0.5, borderRadius: '50%', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -20, left: -20,
            width: 100, height: 100,
            background: `radial-gradient(circle, ${feature.glow} 0%, transparent 70%)`,
            opacity: 0.3, borderRadius: '50%', pointerEvents: 'none',
          }} />

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22, position: 'relative' }}>
            <div style={{
              width: 38, height: 38,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 11,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon size={18} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>
                {feature.title}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>
                {feature.subtitle}
              </div>
            </div>
          </div>

          {/* Detail list */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, position: 'relative', flex: 1 }}>
            {feature.backDetail.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={flipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  <Check size={10} color="white" strokeWidth={3} />
                </div>
                <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.78)', fontWeight: 500, lineHeight: 1.4 }}>
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Bottom accent */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" style={{ position: 'relative', padding: '120px 24px' }}>
      <div className="section-divider" />

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
              <LineChart size={12} /> Funcionalidades
            </span>
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            style={{ marginBottom: 18 }}
          >
            Cada feature foi desenhada
            <br />para eliminar o trabalho manual
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 17, color: 'rgba(240,238,255,0.54)', maxWidth: 520, margin: '0 auto 12px', lineHeight: 1.65 }}
          >
            Passe o mouse em cada card para ver os detalhes de cada funcionalidade.
          </motion.p>

          {/* Hint icon row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                width: i === 2 || i === 3 ? 20 : 6,
                height: 6, borderRadius: 3,
                background: i === 2 || i === 3
                  ? 'linear-gradient(90deg,#6C3BFF,#8B5CF6)'
                  : 'rgba(108,59,255,0.25)',
                transition: 'width 0.3s',
              }} />
            ))}
          </motion.div>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {features.map((feature, i) => (
            <FlipCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
