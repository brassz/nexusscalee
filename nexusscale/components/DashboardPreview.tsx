'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { CheckCircle, Clock, AlertTriangle, User, Calendar, Activity, Bell, TrendingUp, Search } from 'lucide-react'

const doctors = [
  { time: '06:00', name: 'Dr. Carlos Mendes', specialty: 'Cardiologia', status: 'confirmed', avatar: 'CM', color: '#6C3BFF' },
  { time: '07:30', name: 'Dra. Ana Lima', specialty: 'Pediatria', status: 'confirmed', avatar: 'AL', color: '#7C3AED' },
  { time: '12:00', name: 'Dr. Pedro Alves', specialty: 'Clínica Geral', status: 'pending', avatar: 'PA', color: '#4F46E5' },
  { time: '14:00', name: 'Dra. Sofia Ramos', specialty: 'Neurologia', status: 'confirmed', avatar: 'SR', color: '#6366F1' },
  { time: '18:00', name: 'Dr. João Costa', specialty: 'Emergência', status: 'alert', avatar: 'JC', color: '#5B21B6' },
]

const kpis = [
  { label: 'Plantões', value: '24', icon: Calendar, color: '#6C3BFF', bg: 'rgba(108,59,255,0.12)', border: 'rgba(108,59,255,0.2)' },
  { label: 'Confirmados', value: '21', icon: CheckCircle, color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
  { label: 'Pendentes', value: '3', icon: Clock, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  { label: 'Equipe', value: '48', icon: User, color: '#6366F1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)' },
]

const weekData = [18, 22, 20, 24, 19, 12, 8]
const weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
const maxW = Math.max(...weekData)

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string; border: string; label: string }> = {
    confirmed: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.22)', label: 'Confirmado' },
    pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.22)', label: 'Pendente' },
    alert: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.22)', label: 'Atenção' },
  }
  const cfg = map[status] ?? { color: '#6b7280', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.22)', label: status }
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: '3px 9px',
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
      borderRadius: 100, whiteSpace: 'nowrap',
    }}>{cfg.label}</span>
  )
}

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hoverRow, setHoverRow] = useState<number | null>(null)

  return (
    <section style={{ position: 'relative', padding: '120px 24px' }}>
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
            <span className="section-label"><Activity size={12} /> Preview do Sistema</span>
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            style={{ marginBottom: 18 }}
          >
            Uma interface que sua equipe
            <br />vai amar usar
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 17, color: 'rgba(240,238,255,0.54)', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}
          >
            Limpo, rápido e intuitivo. Painel desenhado para gestores que precisam de clareza.
          </motion.p>
        </div>

        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 56, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(8,5,18,0.92)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24, overflow: 'hidden',
            boxShadow: '0 48px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(108,59,255,0.09)',
          }}
        >
          {/* Title bar */}
          <div style={{
            background: 'rgba(255,255,255,0.022)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '12px 20px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#ef4444','#f59e0b','#10b981'].map((c,i) => (
                <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              maxWidth: 280,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 6, padding: '5px 12px',
              display: 'flex', alignItems: 'center', gap: 7, flex: 1,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
              <span style={{ fontSize: 12, color: 'rgba(240,238,255,0.3)' }}>app.nexusscale.com.br</span>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>Sistema online</span>
            </div>
          </div>

          <div style={{ display: 'flex', minHeight: 400 }}>
            {/* Sidebar */}
            <div style={{
              width: 188, flexShrink: 0,
              background: 'rgba(255,255,255,0.013)',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              padding: '18px 12px',
              display: 'flex', flexDirection: 'column', gap: 3,
            }}>
              {[
                { icon: Activity, label: 'Dashboard', active: true },
                { icon: Calendar, label: 'Agenda', active: false },
                { icon: User, label: 'Profissionais', active: false },
                { icon: TrendingUp, label: 'Relatórios', active: false },
                { icon: Bell, label: 'Notificações', active: false, badge: 2 },
              ].map(({ icon: Icon, label, active, badge }, i) => (
                <div key={i} style={{
                  padding: '9px 11px', borderRadius: 8,
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: active ? 'rgba(108,59,255,0.18)' : 'transparent',
                  color: active ? '#c4b5fd' : 'rgba(240,238,255,0.38)',
                  fontSize: 13, fontWeight: active ? 600 : 400,
                }}>
                  <Icon size={14} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {badge && (
                    <span style={{
                      width: 16, height: 16, borderRadius: '50%',
                      background: '#ef4444', color: 'white',
                      fontSize: 9, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{badge}</span>
                  )}
                </div>
              ))}

              <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 11px' }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#6C3BFF,#4F46E5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 700, color: 'white',
                  }}>AD</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(240,238,255,0.65)' }}>Admin</div>
                    <div style={{ fontSize: 10, color: 'rgba(240,238,255,0.28)' }}>Gestor</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main */}
            <div style={{ flex: 1, padding: '20px', overflow: 'hidden' }}>
              {/* KPIs */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
                gap: 11, marginBottom: 18,
              }}>
                {kpis.map((kpi, i) => {
                  const Icon = kpi.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.07 }}
                      style={{
                        background: kpi.bg, border: `1px solid ${kpi.border}`,
                        borderRadius: 12, padding: '13px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 10, color: 'rgba(240,238,255,0.42)', fontWeight: 500 }}>{kpi.label}</span>
                        <Icon size={13} color={kpi.color} />
                      </div>
                      <div style={{ fontSize: 26, fontWeight: 800, color: kpi.color, lineHeight: 1, letterSpacing: '-0.5px' }}>
                        {kpi.value}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                {/* Table */}
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.018)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 14, overflow: 'hidden',
                }}>
                  <div style={{
                    padding: '11px 15px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#f0eeff' }}>Plantões de Hoje</span>
                    <span style={{ fontSize: 11, color: '#6C3BFF', fontWeight: 600 }}>Ver todos →</span>
                  </div>

                  {doctors.map((doc, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.06 }}
                      onMouseEnter={() => setHoverRow(i)}
                      onMouseLeave={() => setHoverRow(null)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 15px',
                        borderBottom: i < doctors.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        background: hoverRow === i ? 'rgba(108,59,255,0.07)' : 'transparent',
                        transition: 'background 0.15s',
                        cursor: 'default',
                      }}
                    >
                      <span style={{ fontSize: 11, color: 'rgba(240,238,255,0.32)', fontWeight: 600, minWidth: 38 }}>
                        {doc.time}
                      </span>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        background: `linear-gradient(135deg,${doc.color},${doc.color}99)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, fontWeight: 700, color: 'white',
                      }}>{doc.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#f0eeff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {doc.name}
                        </div>
                        <div style={{ fontSize: 10, color: 'rgba(240,238,255,0.33)' }}>{doc.specialty}</div>
                      </div>
                      <StatusBadge status={doc.status} />
                    </motion.div>
                  ))}
                </div>

                {/* Mini bar chart */}
                <div style={{
                  width: 150, flexShrink: 0,
                  background: 'rgba(255,255,255,0.018)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 14, padding: '14px',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#f0eeff', marginBottom: 4 }}>Semana</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#6C3BFF', letterSpacing: '-0.5px', marginBottom: 2 }}>123</div>
                  <div style={{ fontSize: 10, color: '#10b981', fontWeight: 600, marginBottom: 'auto' }}>↑ +12%</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 52, marginTop: 12 }}>
                    {weekData.map((val, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={isInView ? { height: `${(val / maxW) * 40}px` } : {}}
                          transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            width: '100%', borderRadius: '3px 3px 0 0',
                            background: i === 3
                              ? 'linear-gradient(180deg,#6C3BFF,#4F46E5)'
                              : 'rgba(108,59,255,0.22)',
                            boxShadow: i === 3 ? '0 0 8px rgba(108,59,255,0.5)' : 'none',
                          }}
                        />
                        <span style={{ fontSize: 7, color: 'rgba(240,238,255,0.28)', fontWeight: 600 }}>{weekDays[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
