import { Link } from 'react-router-dom'
import '../styles/footer.css'

/* ── ICONS ── */
const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
)

const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
)

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l.88-.88a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

/* ── DATA ── */
const SERVICES = [
  'Extensions & Structural Works', 'Commercial Fit-Outs', 'Shopfront Installation',
  'Roofing & External Works', 'Bathrooms & Wet Rooms', 'Plumbing & Gas',
  'Electrical Works', 'Plastering & Decorating', 'Tiling & Flooring',
]

const NAV_LINKS = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/projects', 'Projects'],
  ['/contact', 'Contact'],
]

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="container footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              {/* Real Stravion logo */}
              <img src="/logo.jpeg" alt="Stravion Construction Group" className="footer-logo-img" />
              <div>
                <p className="footer-logo-name">STRAVION</p>
                <p className="footer-logo-sub">Construction Group</p>
              </div>
            </div>
            <p className="footer-tagline">
              Luxury Construction.<br />Built To Impress.
            </p>
            <p className="footer-desc">
              Delivering high-end residential, commercial, and structural construction projects across the United Kingdom.
            </p>
            <div className="footer-socials">
              <a href="https://wa.me/447706938064" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-link social-wa">
                <IconWhatsApp />
              </a>
              <a href="mailto:info@stravion.co.uk" aria-label="Email" className="social-link social-em">
                <IconEmail />
              </a>
              <a href="https://www.stravion.co.uk" target="_blank" rel="noopener noreferrer" aria-label="Website" className="social-link social-web">
                <IconGlobe />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links">
              {SERVICES.map(s => (
                <li key={s}><Link to="/contact">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {NAV_LINKS.map(([to, label]) => (
                <li key={label}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon"><IconPin /></span>
                <span>18 Babingley Drive, Leicester, LE4 0HG</span>
              </li>
              <li>
                <span className="contact-icon"><IconPhone /></span>
                <a href="tel:07706938064">07706 938064</a>
              </li>
              <li>
                <span className="contact-icon"><IconEmail /></span>
                <a href="mailto:info@stravion.co.uk">info@stravion.co.uk</a>
              </li>
              <li>
                <span className="contact-icon"><IconGlobe /></span>
                <a href="https://www.stravion.co.uk" target="_blank" rel="noopener noreferrer">www.stravion.co.uk</a>
              </li>
            </ul>

            <div className="footer-cta-block">
              <p className="footer-cta-label">Ready to start your project?</p>
              <a
                href="https://wa.me/447706938064?text=Hi Stravion! I'd like a free quote."
                target="_blank" rel="noopener noreferrer"
                className="btn-gold"
                style={{ fontSize: '10px', padding: '14px 28px' }}
              >
                <span>Get A Free Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">© {new Date().getFullYear()} STRAVION Construction Group. All rights reserved.</p>
          <p className="footer-reg">Registered in England &amp; Wales · info@stravion.co.uk</p>
          <a
            href="https://saud-portfolio-eight.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-madeby"
          >
            Made by <span className="footer-madeby-name">saud.co</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
