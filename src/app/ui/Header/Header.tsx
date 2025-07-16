import React, { useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import cls from './Header.module.scss';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={cls.root}>
      <div className={cls.container}>
        <div className={cls.content}>
          {/* Logo */}
          <a href="/" className={cls.logo}>
            <div>
              <img src="/div.png" alt="Logo"  className={cls.logoSvg} />
            </div>
            <span className={cls.logoText}>ResumeAI</span>
          </a>
      <div className={cls.navPar}>
          {/* Desktop Navigation */}
          <nav className={cls.nav}>
            <a href="/features" className={cls.navLink}>Features</a>
            <a href="/templates" className={cls.navLink}>Templates</a>
            <a href="/pricing" className={cls.navLink}>Pricing</a>
            <a href="/login" className={cls.navLink}>Login</a>
          </nav>

          {/* Desktop CTA */}
          <div className={cls.cta}>
            <button className={cls.ctaButton}>Sign Up Free</button>
          </div>
      </div>
          {/* Mobile Menu Toggle */}
          <div className={cls.mobileToggle}>
            <button 
              className={cls.mobileButton}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className={cls.mobileIcon} />
              ) : (
                <Menu className={cls.mobileIcon} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={cls.mobileMenu}>
            <nav className={cls.mobileNav}>
              <a href="/features" className={cls.mobileLink}>Features</a>
              <a href="/templates" className={cls.mobileLink}>Templates</a>
              <a href="/pricing" className={cls.mobileLink}>Pricing</a>
              <a href="/login" className={cls.mobileLink}>Login</a>
              <button className={cls.mobileCta}>Sign Up Free</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export { Header };