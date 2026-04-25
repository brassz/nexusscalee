import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import DashboardPreview from '@/components/DashboardPreview'
import Benefits from '@/components/Benefits'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: '#04040A', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Features />
      <DashboardPreview />
      <Benefits />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
