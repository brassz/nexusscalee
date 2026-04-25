'use client'

import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Como Funciona', href: '#how-it-works' },
  { label: 'Funcionalidades', href: '#features' },
  { label: 'Benefícios', href: '#benefits' },
  { label: 'Depoimentos', href: '#testimonials' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 50))
    return unsub
  }, [scrollY])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'background 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease',
          background: scrolled ? 'rgba(4, 4, 10, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(28px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(1.5)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 72,
        }}>
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', cursor: 'pointer' }}
          >
            {/* Troca automaticamente para a logo assim que o arquivo existir */}
            <Image
              src="/logo.png"
              alt="NexusScale"
              width={140}
              height={40}
              style={{ objectFit: 'contain', height: 40, width: 'auto' }}
              onError={(e) => {
                // Se a logo não existir ainda, esconde a imagem e mostra o texto
                const target = e.currentTarget as HTMLImageElement
                target.style.display = 'none'
                const fallback = target.nextElementSibling as HTMLElement | null
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            {/* Fallback texto — visível só se /public/logo.png não existir */}
            <span style={{
              display: 'none',
              alignItems: 'center',
              fontSize: 21, fontWeight: 800, letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #fff 30%, #c4b5fd 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Nexus<span style={{ fontWeight: 400 }}>Scale</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden md:flex">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.3, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveLink(link.href)}
                onMouseLeave={() => setActiveLink(null)}
                style={{
                  position: 'relative',
                  color: 'rgba(240,238,255,0.6)',
                  textDecoration: 'none',
                  fontSize: 14, fontWeight: 500,
                  padding: '8px 15px', borderRadius: 10,
                  transition: 'color 0.2s ease',
                  display: 'inline-block',
                }}
              >
                <motion.span
                  animate={{ color: activeLink === link.href ? '#e0d7ff' : 'rgba(240,238,255,0.6)' }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.span>

                {/* Hover background */}
                <AnimatePresence>
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="nav-hover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(108,59,255,0.12)',
                        borderRadius: 10,
                        zIndex: -1,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Underline accent */}
                <AnimatePresence>
                  {activeLink === link.href && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        position: 'absolute', bottom: 4, left: 15, right: 15,
                        height: 1.5, borderRadius: 1,
                        background: 'linear-gradient(90deg, #6C3BFF, #8B5CF6)',
                        transformOrigin: 'left',
                        boxShadow: '0 0 8px rgba(108,59,255,0.6)',
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="hidden md:flex">
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              whileHover={{ color: '#c4b5fd' }}
              style={{
                fontSize: 14, fontWeight: 500,
                color: 'rgba(240,238,255,0.55)',
                textDecoration: 'none', padding: '8px 12px',
                transition: 'color 0.2s',
              }}
            >
              Entrar
            </motion.a>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 22px', fontSize: 14, fontWeight: 700,
                borderRadius: 11, cursor: 'pointer', textDecoration: 'none',
                background: 'linear-gradient(135deg, #6C3BFF, #4F46E5)',
                color: 'white',
                border: '1px solid rgba(167,139,250,0.3)',
                boxShadow: '0 4px 20px rgba(108,59,255,0.4)',
              }}
            >
              Solicitar Demo
              <ArrowRight size={14} />
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(108,59,255,0.12)',
              border: '1px solid rgba(108,59,255,0.25)',
              borderRadius: 10, padding: '8px',
              cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 99,
              background: 'rgba(4,4,10,0.96)', backdropFilter: 'blur(28px)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              padding: '20px 24px 28px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: 'flex', alignItems: 'center',
                  padding: '14px 0', color: 'rgba(240,238,255,0.7)',
                  textDecoration: 'none', fontSize: 15, fontWeight: 500,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                marginTop: 20, padding: '14px',
                background: 'linear-gradient(135deg, #6C3BFF, #4F46E5)',
                color: 'white', borderRadius: 12, fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Solicitar Demonstração
              <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
