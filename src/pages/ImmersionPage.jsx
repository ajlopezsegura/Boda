import PageTransition from '../components/layout/PageTransition'
export default function ImmersionPage() {
  return (
    <PageTransition>
      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <p className="label-luxury" style={{ color: 'var(--color-accent)', opacity: 0.4 }}>PRÓXIMAMENTE</p>
      </div>
    </PageTransition>
  )
}
