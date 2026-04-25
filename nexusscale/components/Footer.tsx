'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Share2, Link2, AtSign, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const footerLinks = {
  Produto: ['Funcionalidades', 'Preços', 'Integrações', 'Segurança', 'Roadmap'],
  Empresa: ['Sobre nós', 'Blog', 'Carreiras', 'Imprensa', 'Parceiros'],
  Suporte: ['Central de Ajuda', 'Documentação', 'Status do Sistema', 'Contato', 'API Docs'],
  Legal: ['Privacidade', 'Termos de Uso', 'LGPD', 'Cookies', 'DPA'],
}

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative',
      paddingTop: 80,
    }}>
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '40%', maxWidth: 500, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(108,59,255,0.6), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px 60px' }}>
        <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap', marginBottom: 72 }}>
          {/* Brand column */}
          <div style={{ flex: '0 0 300px', minWidth: 220 }}>
            {/* Logo */}
            <div style={{ marginBottom: 20 }}>
              <Image
                src="/logo.png"
                alt="NexusScale"
                width={140}
                height={40}
                style={{ objectFit: 'contain', height: 40, width: 'auto' }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement
                  target.style.display = 'none'
                  const fallback = target.nextElementSibling as HTMLElement | null
                  if (fallback) fallback.style.display = 'block'
                }}
              />
              <span style={{
                display: 'none',
                fontSize: 21, fontWeight: 800, letterSpacing: '-0.5px',
                background: 'linear-gradient(135deg, #fff 30%, #c4b5fd 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Nexus<span style={{ fontWeight: 400 }}>Scale</span>
              </span>
            </div>

            <p style={{
              fontSize: 14, lineHeight: 1.72, color: 'rgba(240,238,255,0.43)',
              marginBottom: 28, maxWidth: 270,
            }}>
              A plataforma de agendamento inteligente que está transformando a gestão de plantões médicos no Brasil.
            </p>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 28 }}>
              {[
                { icon: Mail, text: 'contato@nexusscale.com.br' },
                { icon: Phone, text: '(11) 9 8765-4321' },
                { icon: MapPin, text: 'São Paulo, SP — Brasil' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <Icon size={13} color="rgba(139,92,246,0.6)" />
                  <span style={{ fontSize: 13, color: 'rgba(240,238,255,0.38)' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Newsletter mini */}
            <div style={{
              background: 'rgba(108,59,255,0.07)',
              border: '1px solid rgba(108,59,255,0.2)',
              borderRadius: 12, padding: '16px',
              marginBottom: 24,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(240,238,255,0.6)', marginBottom: 10 }}>
                Receba novidades por email
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8, padding: '8px 12px',
                    fontSize: 12, color: 'rgba(240,238,255,0.7)',
                    outline: 'none',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                    background: 'linear-gradient(135deg, #6C3BFF, #4F46E5)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <ArrowRight size={14} color="white" />
                </motion.button>
              </div>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[Share2, Link2, AtSign].map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: 'rgba(255,255,255,0.045)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(108,59,255,0.2)'
                    e.currentTarget.style.borderColor = 'rgba(108,59,255,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.045)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  <Icon size={15} color="rgba(240,238,255,0.45)" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 40,
          }}>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '1.5px',
                  color: 'rgba(240,238,255,0.35)', textTransform: 'uppercase',
                  marginBottom: 18,
                }}>
                  {title}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 4, color: '#c4b5fd' }}
                        style={{
                          fontSize: 13.5, color: 'rgba(240,238,255,0.45)',
                          textDecoration: 'none', fontWeight: 400,
                          display: 'inline-block', transition: 'color 0.2s',
                        }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 28,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
        }}>
          <span style={{ fontSize: 13, color: 'rgba(240,238,255,0.28)' }}>
            © {new Date().getFullYear()} NexusScale Tecnologia em Saúde LTDA. Todos os direitos reservados.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <span style={{ fontSize: 12, color: 'rgba(240,238,255,0.28)' }}>Todos os sistemas operacionais</span>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(240,238,255,0.2)' }}>v2.4.1</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
