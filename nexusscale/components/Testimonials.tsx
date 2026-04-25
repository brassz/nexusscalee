'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Dr. Ricardo Santos',
    role: 'Diretor Médico',
    org: 'Hospital São Lucas — SP',
    text: 'Em menos de uma semana, zero conflitos de escala. Nossa equipe de 80 médicos está toda gerenciada pela plataforma e o tempo que economizamos nos deu capacidade de abrir mais horários.',
    avatar: 'RS', rating: 5, color: '#6C3BFF',
  },
  {
    name: 'Dra. Fernanda Gomes',
    role: 'Coordenadora de RH',
    org: 'Clínica BioSaúde — RJ',
    text: 'Implementamos em 2 dias, sem suporte de TI. Os relatórios mensais que levavam 3 horas agora são gerados em 8 segundos. Recomendo para qualquer gestora na saúde.',
    avatar: 'FG', rating: 5, color: '#7C3AED',
  },
  {
    name: 'Carlos Menezes',
    role: 'Administrador Geral',
    org: 'UPA Central — MG',
    text: 'Reduzimos ausências não comunicadas em 92% após ativar as notificações automáticas. A equipe adora receber confirmação pelo WhatsApp.',
    avatar: 'CM', rating: 5, color: '#4F46E5',
  },
  {
    name: 'Dra. Patrícia Andrade',
    role: 'Gestora Operacional',
    org: 'Grupo Saúde Plus — DF',
    text: 'O suporte é incrível e a plataforma é tão intuitiva que nossa equipe levou menos de 1 hora para se adaptar. Em 60 dias nosso NPS interno subiu 30 pontos.',
    avatar: 'PA', rating: 5, color: '#6366F1',
  },
  {
    name: 'Dr. Marcos Oliveira',
    role: 'Chefe de Plantão',
    org: 'Hospital Regional Norte — PA',
    text: 'Finalmente um software pensado para quem trabalha com plantões médicos de verdade. Os filtros por especialidade e a visão semanal são exatamente o que precisávamos.',
    avatar: 'MO', rating: 5, color: '#5B21B6',
  },
  {
    name: 'Ana Cristina Lopes',
    role: 'Diretora Administrativa',
    org: 'Rede MedVita — RS',
    text: 'Conseguimos integrar com nosso sistema de RH em 1 dia. O ROI foi visível no primeiro mês: menos horas extras desnecessárias e zero erros de pagamento.',
    avatar: 'AC', rating: 5, color: '#4338CA',
  },
]

const logos = [
  'Hospital São Lucas', 'BioSaúde', 'UPA Central',
  'Saúde Plus', 'MedVita', 'Hospital Regional',
  'Clínica Premium', 'SaúdeDF', 'MedGroup',
]

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div style={{
      width: 320, flexShrink: 0,
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 20, padding: '26px',
      position: 'relative', overflow: 'hidden',
      margin: '8px 0',
    }}>
      <div style={{ position: 'absolute', top: 18, right: 20, opacity: 0.06 }}>
        <Quote size={46} color={t.color} />
      </div>

      <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={12} color="#f59e0b" fill="#f59e0b" />
        ))}
      </div>

      <p style={{
        fontSize: 14, lineHeight: 1.7, color: 'rgba(240,238,255,0.7)',
        marginBottom: 22, fontStyle: 'italic',
      }}>
        "{t.text}"
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg,${t.color},${t.color}99)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: 'white',
          boxShadow: `0 4px 12px ${t.color}44`,
        }}>{t.avatar}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f0eeff' }}>{t.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(240,238,255,0.4)', marginTop: 1 }}>{t.role} · {t.org}</div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,${t.color},transparent)`,
        opacity: 0.5,
      }} />
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="testimonials" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
      <div className="section-divider" />

      {/* CSS-only marquee keyframes */}
      <style>{`
        @keyframes marquee-l { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes marquee-r { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        .marquee-l { animation: marquee-l 45s linear infinite; }
        .marquee-r { animation: marquee-r 50s linear infinite; }
        .marquee-wrap:hover .marquee-l,
        .marquee-wrap:hover .marquee-r { animation-play-state: paused; }
      `}</style>

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 20 }}
          >
            <span className="section-label">
              <Star size={12} fill="currentColor" /> Depoimentos
            </span>
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            style={{ marginBottom: 18 }}
          >
            Quem usa a plataforma
            <br />não volta para planilhas
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 17, color: 'rgba(240,238,255,0.54)', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}
          >
            Mais de 200 instituições de saúde em todo o Brasil confiam na NexusScale.
          </motion.p>
        </div>
      </div>

      {/* Row 1 — left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="marquee-wrap"
        style={{
          overflow: 'hidden', marginBottom: 16,
          maskImage: 'linear-gradient(90deg,transparent 0%,black 8%,black 92%,transparent 100%)',
        }}
      >
        <div className="marquee-l" style={{ display: 'flex', gap: 16, width: 'max-content' }}>
          {[...testimonials, ...testimonials].map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </motion.div>

      {/* Row 2 — right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="marquee-wrap"
        style={{
          overflow: 'hidden', marginBottom: 72,
          maskImage: 'linear-gradient(90deg,transparent 0%,black 8%,black 92%,transparent 100%)',
        }}
      >
        <div className="marquee-r" style={{ display: 'flex', gap: 16, width: 'max-content' }}>
          {[...testimonials, ...testimonials].map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </motion.div>

      {/* Logo strip */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '2.5px',
            color: 'rgba(240,238,255,0.28)', textTransform: 'uppercase',
            textAlign: 'center', marginBottom: 24,
          }}
        >
          Utilizado por instituições em todo o Brasil
        </motion.p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.72 + i * 0.045 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(108,59,255,0.4)' }}
              style={{
                background: 'rgba(255,255,255,0.027)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10, padding: '9px 18px',
                display: 'flex', alignItems: 'center', gap: 8,
                cursor: 'default', transition: 'all 0.25s ease',
              }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: 'linear-gradient(135deg,rgba(108,59,255,0.25),rgba(79,70,229,0.25))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, fontWeight: 800, color: '#c4b5fd',
              }}>
                {logo.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(240,238,255,0.36)', whiteSpace: 'nowrap' }}>
                {logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
