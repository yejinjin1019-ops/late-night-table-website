import { useState, useEffect, useRef, ReactNode } from 'react'

type MenuPageSection = 'lunch-specials' | 'lunch-dinner-menu' | 'drinks'

interface Dish {
  name: string
  description: string
  price: string
  img?: string
  tag?: string
  featured?: boolean
}

interface FoodCategory {
  id: string
  title: string
  items: Dish[]
}

interface Drink {
  name: string
  description: string
  img: string
  price?: string
  glassPrice?: string
  bottlePrice?: string
  tag?: string
}

interface DrinkCategory {
  id: string
  title: string
  items: Drink[]
}

const IMG = 'https://image.kpos-dev.com/latenighttable/imgdata'

const foodCategories: FoodCategory[] = [
  {
    id: 'small-plates',
    title: 'Small Plates',
    items: [
      { name: 'Fried Chicken Soft Bone', description: 'Crunchy fried soft-bone chicken, tossed in-house.', price: '$19', img: `${IMG}/3022060200197.jpg` },
      { name: 'Corn Ribs', description: 'Roasted corn ribs with a smoky butter glaze.', price: '$18', img: `${IMG}/3222091500215.jpg` },
      { name: 'Prosciutto Melon', description: 'Chilled rockmelon wrapped in prosciutto.', price: '$16', img: '/photos/prosciutto-melon.jpg' },
      { name: 'DIY Rice Balls', description: 'Build-your-own seasoned rice balls at the table.', price: '$9', img: `${IMG}/3022060200227.jpg` },
    ],
  },
  {
    id: 'sharing-dishes',
    title: 'Sharing Dishes',
    items: [
      { name: 'Tulip Chicken Feet', description: 'Bubbling chicken feet in a fiery gochujang broth.', price: '$39', img: `${IMG}/3225062500016.jpg`, tag: 'Very Spicy' },
      { name: 'Spicy Large Intestine Tteokbokki', description: 'Chewy rice cakes and grilled intestine in spicy broth.', price: '$47', img: `${IMG}/3022060200043.jpg`, tag: 'Very Spicy' },
      { name: 'Beef Tendon Pot', description: 'Slow-braised beef tendon in a rich, savoury broth.', price: '$42', img: '/photos/beef-tendon-pot.jpg' },
      { name: 'Spicy Fishcake Pot', description: 'Housemade fishcakes simmered in a spicy broth.', price: '$39', img: `${IMG}/3022060200074.jpg` },
      { name: 'Fishcake Pot', description: 'Housemade fishcakes in a light, savoury broth.', price: '$36', img: '/photos/fishcake-pot.jpg' },
    ],
  },
  {
    id: 'mains',
    title: 'Mains',
    items: [
      { name: 'Grilled Pork Jowl with Fried Rice', description: 'Charcoal-grilled pork jowl over garlic fried rice.', price: '$59', img: '/photos/grilled-pork-jowl-fried-rice.jpg', tag: 'New', featured: true },
      { name: 'Late Night Table 5Hap', description: 'Five ingredients, one shared plate.', price: '$68', img: '/photos/5hap.jpg', tag: 'Popular', featured: true },
      { name: 'Seasoned Grilled Large Intestines', description: 'Grilled large intestine in a bold house marinade.', price: '$49' },
      { name: 'Plain Grilled Large Intestines', description: 'Grilled large intestine, simply seasoned.', price: '$49', img: `${IMG}/3226042800171.jpg` },
      { name: 'Beef Tartare Cockle Bibimbap', description: 'Beef tartare and cockles over seasoned rice.', price: '$44', img: `${IMG}/3223110100850.jpg` },
      { name: 'Cockles & Bibimbap', description: 'Fresh cockles served with seasoned rice.', price: '$45', img: `${IMG}/3223051700744.jpg` },
      { name: 'Gambas', description: 'Garlic prawns, sizzling in olive oil.', price: '$31', img: `${IMG}/3022060200081.jpg` },
      { name: 'Signature Spicy Chicken', description: 'Our signature fried chicken, tossed fiery hot.', price: '$37', img: `${IMG}/3022060200128.jpg`, tag: 'Very Spicy' },
      { name: 'Sweet & Spicy Chicken', description: 'Fried chicken glazed sweet and spicy.', price: '$37', img: `${IMG}/3022060200135.jpg` },
      { name: 'Garlic Soy Chicken', description: 'Fried chicken tossed in a garlic soy glaze.', price: '$37', img: `${IMG}/3022060200159.jpg` },
    ],
  },
  {
    id: 'rice-noodles',
    title: 'Rice & Noodles',
    items: [
      { name: 'Uni Oil Pasta', description: 'Pasta tossed in silky sea urchin oil.', price: '$32', img: '/photos/uni-oil-pasta.jpg', tag: 'Popular', featured: true },
      { name: 'Galbi Risotto', description: 'Our house signature — creamy risotto with braised short rib.', price: '$36', img: '/photos/galbi-risotto.jpg', tag: 'Signature', featured: true },
      { name: 'Truffle Chapaghetti', description: 'Korean black bean noodles finished with truffle.', price: '$32', img: '/photos/truffle-chapaghetti.jpg' },
      { name: 'Clam Pasta', description: 'Pasta steamed with clams and soju.', price: '$32', img: '/photos/clam-pasta.jpg' },
      { name: 'Prawn Cream Pasta', description: 'Baked pasta in a rich prawn cream sauce.', price: '$34', img: `${IMG}/3022060200104.jpg` },
      { name: 'Horumon Don', description: 'Grilled beef offal over steamed rice.', price: '$23' },
      { name: 'Pork Katsu Meal', description: 'Crumbed pork cutlet with rice and sides.', price: '$21', img: `${IMG}/3022060200173.jpg` },
      { name: 'Unagi (Eel) Don', description: 'Grilled eel, glazed and served over rice.', price: '$27', img: `${IMG}/3225050901313.jpg` },
    ],
  },
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { name: 'Potato Chips', description: 'House-cut potato chips, crisp and salted.', price: '$9', img: `${IMG}/3022060200241.jpg` },
      { name: 'Truffle Fries', description: 'Crispy fries finished with truffle.', price: '$11', img: `${IMG}/3022060200258.jpg` },
      { name: 'Rice', description: 'Steamed rice.', price: '$4', img: `${IMG}/3022060300118.jpg` },
      { name: 'Add Udon', description: 'Add udon noodles to your pot.', price: '$7', img: `${IMG}/3022060200234.jpg` },
      { name: 'Add Ramen', description: 'Add ramen noodles to your pot.', price: '$6', img: `${IMG}/3222091000203.jpg` },
    ],
  },
]

const drinkCategories: DrinkCategory[] = [
  {
    id: 'makgeolli',
    title: 'Makgeolli',
    items: [
      { name: 'Milk Tea Rice Wine', description: 'Creamy milk tea-infused makgeolli.', price: '$16', img: `${IMG}/3226042800140.jpg`, tag: 'New' },
      { name: 'Jipyeong Original Rice Wine 750ml', description: 'Classic Korean rice wine, lightly sparkling.', price: '$14', img: `${IMG}/3225011501217.jpg`, tag: 'Popular' },
      { name: 'Kooksoondang Original Rice Wine 750ml', description: 'Traditional Korean rice wine.', price: '$13', img: `${IMG}/3224092501086.jpg` },
      { name: 'Chestnut Rice Wine 750mL', description: 'Rice wine infused with roasted chestnut.', price: '$15', img: `${IMG}/3022060300088.jpg` },
      { name: 'Honeycomb (1pc)', description: 'Add a piece of honeycomb to your rice wine.', price: '$6', img: '/photos/honeycomb.jpg' },
    ],
  },
  {
    id: 'soju',
    title: 'Soju',
    items: [
      { name: 'Tokki Soju White (23%)', description: 'Small-batch, gently distilled soju.', price: '$37', img: `${IMG}/3224052200998.jpg`, tag: 'Sold Out' },
      { name: 'Tokki Soju Black (40%)', description: 'Bold, small-batch soju at full strength.', price: '$49', img: `${IMG}/3224052201001.jpg` },
      { name: 'Bokbunja', description: 'Korean black raspberry wine, sweet and rich.', price: '$24', img: '/photos/bokbunja.jpg' },
      { name: 'Jinro', description: 'Classic Korean soju.', price: '$18', img: '/photos/jinro.jpg' },
      { name: 'Chumchurum', description: 'Classic Korean soju.', price: '$18', img: '/photos/chumchurum.jpg' },
      { name: 'Chamisul', description: 'Classic Korean soju.', price: '$18', img: '/photos/chamisul.jpg' },
      { name: 'Saero Soju', description: 'Classic Korean soju.', price: '$18', img: '/photos/saero.jpg' },
      { name: 'Flavoured Soju', description: "Ask your server for tonight's flavour.", price: '$17', img: '/photos/soonhari-peach.jpg' },
      { name: 'Starfall Chungha', description: 'Sparkling rice wine, light and fruity.', price: '$15', img: '/photos/chungha.jpg' },
    ],
  },
  {
    id: 'beer',
    title: 'Beer',
    items: [
      { name: 'Asahi Dry (Tap)', description: 'Crisp Japanese lager, on tap.', price: '$11', img: '/photos/asahi.jpg' },
      { name: 'Cass', description: 'Light Korean lager.', price: '$6', img: '/photos/cass.jpg' },
      { name: 'Terra', description: 'Clean, refreshing Korean lager.', price: '$6', img: '/photos/terra.jpg' },
    ],
  },
  {
    id: 'wine',
    title: 'Wine',
    items: [
      {
        name: 'Sweet Semillon Verdelho',
        description: 'A light, fruity white wine.',
        glassPrice: '$12',
        bottlePrice: '$48',
        img: '/photos/semillon-verdelho.jpg',
      },
      {
        name: 'Sweet Shiraz',
        description: 'A smooth, easy-drinking red wine.',
        glassPrice: '$13',
        bottlePrice: '$50',
        img: '/photos/sweet-shiraz.jpg',
      },
      {
        name: 'Delinquente Wines',
        description: 'Natural wine from South Australia.',
        bottlePrice: '$54',
        img: '/photos/delinquente-wine.jpg',
      },
    ],
  },
]

const menuNavItems: { id: MenuPageSection; label: string }[] = [
  { id: 'lunch-specials', label: 'Lunch Specials' },
  { id: 'lunch-dinner-menu', label: 'Lunch & Dinner Menu' },
  { id: 'drinks', label: 'Drinks' },
]

const menuPreviewDishes: Dish[] = [
  { name: 'Late Night Table 5Hap', description: 'Five ingredients, one shared plate.', price: '$68', img: '/photos/5hap.jpg', tag: 'Popular' },
  { name: 'Galbi Risotto', description: 'Our house signature — creamy risotto with braised short rib.', price: '$36', img: '/photos/galbi-risotto.jpg', tag: 'Signature' },
  { name: 'Uni Oil Pasta', description: 'Pasta tossed in silky sea urchin oil.', price: '$32', img: '/photos/uni-oil-pasta.jpg' },
]

function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const ACCENT = '#C9A15A'
const LABEL = '#8C8C8C'
const IVORY = '#F5F0E8'
const CHARCOAL = '#141210'
const BURGUNDY = '#5C1F1F'
const SERIF = "'Fraunces', Georgia, serif"
const SANS = "'Inter', system-ui, sans-serif"
const RESTAURANT_ADDRESS = '5 George Street, North Strathfield NSW 2137'
const RESTAURANT_PHONE_DISPLAY = '0450 506 200'
const RESTAURANT_PHONE_TEL = '+61450506200'

function DishCard({ item, delay = 0 }: { item: Dish; delay?: number }) {
  const soldOut = item.tag === 'Sold Out'
  return (
    <FadeIn delay={delay} className={`lnt-menu-card${item.featured ? ' lnt-menu-card-featured' : ''}`}>
      <div className="lnt-menu-card-inner" style={{ opacity: soldOut ? 0.4 : 1 }}>
        <div className="lnt-menu-card-img">
          {item.img ? (
            <img src={item.img} alt={item.name} loading="lazy" />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#221e19',
              }}
            >
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)' }}>
                Photo Coming Soon
              </span>
            </div>
          )}
          {item.tag && (
            <span
              style={{
                position: 'absolute',
                top: '0.85rem',
                left: '0.85rem',
                fontSize: '0.58rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: item.tag === 'Very Spicy' ? IVORY : ACCENT,
                backgroundColor: item.tag === 'Very Spicy' ? 'rgba(92,31,31,0.75)' : 'rgba(20,18,16,0.55)',
                border: item.tag === 'Very Spicy' ? `1px solid ${BURGUNDY}` : '1px solid rgba(245,240,232,0.4)',
                padding: '0.25rem 0.55rem',
              }}
            >
              {item.tag}
            </span>
          )}
        </div>
        <div style={{ padding: '1.1rem 0.15rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
            <span
              style={{
                fontFamily: SERIF,
                fontSize: item.featured ? '1.4rem' : '1.05rem',
                fontWeight: 400,
                color: IVORY,
                lineHeight: 1.25,
              }}
            >
              {item.name}
            </span>
            <span style={{ fontFamily: SANS, fontSize: '0.82rem', color: LABEL, fontWeight: 400, flexShrink: 0 }}>
              {item.price}
            </span>
          </div>
          <p
            style={{
              fontFamily: SANS,
              fontSize: '0.8rem',
              color: 'rgba(245,240,232,0.45)',
              lineHeight: 1.6,
              margin: '0.4rem 0 0',
              fontWeight: 300,
            }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </FadeIn>
  )
}

function DrinkCard({ item, delay = 0 }: { item: Drink; delay?: number }) {
  const soldOut = item.tag === 'Sold Out'
  return (
    <FadeIn delay={delay} className="lnt-drink-card">
      <div className="lnt-menu-card-inner" style={{ opacity: soldOut ? 0.4 : 1 }}>
        <div className="lnt-drink-card-img">
          <img src={item.img} alt={item.name} loading="lazy" />
          {item.tag && (
            <span
              style={{
                position: 'absolute',
                top: '0.85rem',
                left: '0.85rem',
                fontSize: '0.58rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: ACCENT,
                backgroundColor: 'rgba(20,18,16,0.55)',
                border: '1px solid rgba(245,240,232,0.4)',
                padding: '0.25rem 0.55rem',
              }}
            >
              {item.tag}
            </span>
          )}
        </div>
        <div style={{ padding: '1rem 0.15rem 0' }}>
          <span style={{ fontFamily: SERIF, fontSize: '1rem', fontWeight: 400, color: IVORY, lineHeight: 1.25 }}>
            {item.name}
          </span>
          <p
            style={{
              fontFamily: SANS,
              fontSize: '0.78rem',
              color: 'rgba(245,240,232,0.45)',
              lineHeight: 1.6,
              margin: '0.35rem 0 0.55rem',
              fontWeight: 300,
            }}
          >
            {item.description}
          </p>
          {item.price && (
            <span style={{ fontFamily: SANS, fontSize: '0.82rem', color: LABEL, fontWeight: 400 }}>{item.price}</span>
          )}
          {(item.glassPrice || item.bottlePrice) && (
            <div style={{ display: 'flex', gap: '1.25rem', fontFamily: SANS, fontSize: '0.78rem', color: LABEL }}>
              {item.glassPrice && (
                <span>
                  Glass <span style={{ color: IVORY }}>{item.glassPrice}</span>
                </span>
              )}
              {item.bottlePrice && (
                <span>
                  Bottle <span style={{ color: IVORY }}>{item.bottlePrice}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  )
}

type Page = 'home' | 'menu'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false)
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false)
  const [activeMenuSection, setActiveMenuSection] = useState<MenuPageSection>('lunch-dinner-menu')
  const [page, setPage] = useState<Page>(() =>
    typeof window !== 'undefined' && window.location.pathname.startsWith('/menu') ? 'menu' : 'home',
  )
  const pendingScrollRef = useRef<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onPop = () => setPage(window.location.pathname.startsWith('/menu') ? 'menu' : 'home')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (pendingScrollRef.current) {
      const id = pendingScrollRef.current
      pendingScrollRef.current = null
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [page])

  useEffect(() => {
    if (page !== 'menu') return
    const sections = menuNavItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveMenuSection(entry.target.id as MenuPageSection)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [page])

  const closeNav = () => {
    setMobileOpen(false)
    setMobileMenuExpanded(false)
    setMenuDropdownOpen(false)
  }

  const goTo = (target: Page, scrollId?: string) => {
    pendingScrollRef.current = scrollId ?? null
    window.history.pushState({}, '', target === 'menu' ? '/menu' : '/')
    setPage(target)
    closeNav()
  }

  const scrollTo = (id: string) => {
    if (page !== 'home') {
      goTo('home', id)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      closeNav()
    }
  }

  const scrollWithinMenu = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ backgroundColor: CHARCOAL, color: IVORY, fontFamily: SANS }}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
      </svg>
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header
        className="lnt-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.45s ease, border-color 0.45s ease, backdrop-filter 0.45s ease',
          backgroundColor: scrolled ? 'rgba(20,18,16,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? `1px solid rgba(140,140,140,0.18)` : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1340px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          <button
            onClick={() => scrollTo('hero')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span
              style={{
                fontFamily: SERIF,
                fontSize: '1rem',
                letterSpacing: '0.22em',
                color: IVORY,
                fontWeight: 400,
                textTransform: 'uppercase',
              }}
            >
              Late Night Table
            </span>
          </button>

          <nav className="lnt-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <div
              className="lnt-menu-dropdown-wrap"
              onMouseEnter={() => setMenuDropdownOpen(true)}
              onMouseLeave={() => setMenuDropdownOpen(false)}
              style={{ position: 'relative' }}
            >
              <button
                onClick={() => goTo('menu')}
                className="lnt-nav-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: IVORY,
                  fontFamily: SANS,
                  fontWeight: 400,
                  opacity: 0.65,
                  transition: 'opacity 0.2s',
                  padding: 0,
                }}
              >
                Menu
              </button>
              {menuDropdownOpen && (
                <div className="lnt-menu-dropdown">
                  {menuNavItems.map((item) => (
                    <button key={item.id} onClick={() => goTo('menu', item.id)} className="lnt-menu-dropdown-item">
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {(['about', 'contact'] as const).map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="lnt-nav-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: IVORY,
                  fontFamily: SANS,
                  fontWeight: 400,
                  opacity: 0.65,
                  transition: 'opacity 0.2s',
                  padding: 0,
                }}
              >
                {s === 'about' ? 'About Us' : 'Contact'}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="lnt-reserve-btn"
              style={{
                background: 'none',
                border: `1px solid ${ACCENT}`,
                cursor: 'pointer',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: ACCENT,
                fontFamily: SANS,
                fontWeight: 500,
                padding: '0.55rem 1.3rem',
                transition: 'background 0.25s, color 0.25s',
              }}
            >
              Reserve a Table
            </button>
          </nav>

          <button
            className="lnt-hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: '6px',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1px',
                  backgroundColor: IVORY,
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </button>
        </div>

        {mobileOpen && (
          <div
            style={{
              backgroundColor: 'rgba(20,18,16,0.98)',
              borderTop: `1px solid rgba(140,140,140,0.15)`,
              padding: '1.5rem 2rem 2rem',
            }}
          >
            <div style={{ borderBottom: `1px solid rgba(140,140,140,0.12)` }}>
              <button
                onClick={() => setMobileMenuExpanded((v) => !v)}
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  letterSpacing: '0.08em',
                  fontFamily: SERIF,
                  fontWeight: 300,
                  color: IVORY,
                  padding: '0.9rem 0',
                }}
              >
                Menu
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    transition: 'transform 0.25s',
                    transform: mobileMenuExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ⌄
                </span>
              </button>
              {mobileMenuExpanded && (
                <div style={{ paddingBottom: '0.75rem' }}>
                  {menuNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => goTo('menu', item.id)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        letterSpacing: '0.05em',
                        fontFamily: SANS,
                        fontWeight: 300,
                        color: 'rgba(245,240,232,0.65)',
                        padding: '0.6rem 0 0.6rem 1rem',
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {(['about', 'contact'] as const).map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  letterSpacing: '0.08em',
                  fontFamily: SERIF,
                  fontWeight: 300,
                  color: IVORY,
                  padding: '0.9rem 0',
                  borderBottom: `1px solid rgba(140,140,140,0.12)`,
                }}
              >
                {s === 'about' ? 'About Us' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              style={{
                marginTop: '1.25rem',
                background: 'none',
                border: `1px solid ${ACCENT}`,
                cursor: 'pointer',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: ACCENT,
                fontFamily: SANS,
                padding: '0.85rem 1.5rem',
                display: 'block',
                width: '100%',
              }}
            >
              Reserve a Table
            </button>
          </div>
        )}
      </header>

      {page === 'home' && (
      <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '640px',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=1920&h=1080&fit=crop&auto=format"
          alt="Late Night Table — dimly lit bar interior with warm pendant lights"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(0.35) saturate(1.2) contrast(1.05) brightness(1.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(20,18,16,0.85) 0%, rgba(20,18,16,0.4) 45%, rgba(20,18,16,0.08) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(20,18,16,0.8) 0%, rgba(20,18,16,0.45) 38%, rgba(20,18,16,0) 72%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: '1340px',
            margin: '0 auto',
            padding: '0 2rem 7rem',
            width: '100%',
          }}
        >
          <div style={{ maxWidth: '700px' }}>
            <p
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: LABEL,
                marginBottom: '1.75rem',
                fontFamily: SANS,
                fontWeight: 400,
              }}
            >
              North Strathfield, Sydney &nbsp;·&nbsp; 야식탁
            </p>
            <h1
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(3.2rem, 7.5vw, 6.5rem)',
                fontWeight: 300,
                lineHeight: 1.03,
                letterSpacing: '-0.015em',
                color: IVORY,
                marginBottom: '1.75rem',
                textTransform: 'uppercase',
                textShadow: '0 3px 24px rgba(20,18,16,0.75)',
              }}
            >
              After Dark,
              <br />
              <em style={{ fontStyle: 'italic', color: ACCENT }}>At the Table.</em>
            </h1>
            <p
              style={{
                fontFamily: SANS,
                fontWeight: 300,
                fontSize: '1rem',
                lineHeight: 1.75,
                color: 'rgba(245,240,232,0.65)',
                maxWidth: '500px',
                marginBottom: '2.75rem',
              }}
            >
              Korean flavours, good company, and nights made to linger.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => goTo('menu')}
                className="lnt-btn-gold"
                style={{
                  backgroundColor: ACCENT,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: CHARCOAL,
                  fontFamily: SANS,
                  fontWeight: 600,
                  padding: '0.9rem 2.25rem',
                  transition: 'background 0.2s',
                }}
              >
                View Menu
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="lnt-btn-outline"
                style={{
                  background: 'none',
                  border: `1px solid rgba(245,240,232,0.35)`,
                  cursor: 'pointer',
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: IVORY,
                  fontFamily: SANS,
                  fontWeight: 400,
                  padding: '0.9rem 2.25rem',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>
      </section>
      </>
      )}

      {/* ── MENU ───────────────────────────────────────────── */}
      {page === 'menu' && (
      <section id="menu" style={{ backgroundColor: CHARCOAL }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '9rem 2rem 4rem' }}>
          <FadeIn>
            <p
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: LABEL,
                marginBottom: '0.7rem',
                fontFamily: SANS,
              }}
            >
              Our Offering
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 300,
                color: IVORY,
                marginBottom: '1.5rem',
                letterSpacing: '-0.015em',
                lineHeight: 1.1,
              }}
            >
              Menu
            </h2>
            <p
              style={{
                fontFamily: SANS,
                fontWeight: 300,
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: 'rgba(245,240,232,0.5)',
                maxWidth: '560px',
              }}
            >
              Korean anju and Western technique, built for a table that runs late. Browse lunch specials, our
              full lunch and dinner menu, and the drinks list below.
            </p>
          </FadeIn>
        </div>

        <div className="lnt-menu-subnav">
          <div className="lnt-menu-subnav-inner">
            {menuNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollWithinMenu(item.id)}
                className="lnt-menu-subnav-btn"
                style={{
                  color: activeMenuSection === item.id ? ACCENT : 'rgba(245,240,232,0.4)',
                  borderBottom: activeMenuSection === item.id ? `1px solid ${ACCENT}` : '1px solid transparent',
                  fontWeight: activeMenuSection === item.id ? 500 : 300,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 01. Lunch Specials */}
        <div id="lunch-specials" style={{ maxWidth: '1340px', margin: '0 auto', padding: '6rem 2rem' }}>
          <FadeIn>
            <p
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: LABEL,
                marginBottom: '1rem',
                fontFamily: SANS,
              }}
            >
              01. Lunch Specials
            </p>
            <div
              style={{
                border: '1px solid rgba(140,140,140,0.25)',
                padding: '4.5rem 2rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontSize: '1.4rem',
                  fontWeight: 300,
                  color: 'rgba(245,240,232,0.65)',
                  marginBottom: '0.75rem',
                }}
              >
                Coming Soon
              </p>
              <p style={{ fontFamily: SANS, fontSize: '0.85rem', color: 'rgba(245,240,232,0.4)', fontWeight: 300 }}>
                Our lunch specials are being finalised and will be added here shortly.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* 02. Lunch & Dinner Menu */}
        <div id="lunch-dinner-menu" style={{ maxWidth: '1340px', margin: '0 auto', padding: '2rem 2rem 6rem' }}>
          <FadeIn>
            <p
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: LABEL,
                marginBottom: '3rem',
                fontFamily: SANS,
              }}
            >
              02. Lunch &amp; Dinner Menu
            </p>
          </FadeIn>

          {foodCategories.map((category) => (
            <div key={category.id} style={{ marginBottom: '5rem' }}>
              <FadeIn>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                    fontWeight: 300,
                    color: IVORY,
                    marginBottom: '2rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {category.title}
                </h3>
              </FadeIn>
              <div className="lnt-food-grid">
                {category.items.map((item, ii) => (
                  <DishCard key={item.name} item={item} delay={(ii % 4) * 60} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 03. Drinks */}
        <div id="drinks" style={{ maxWidth: '1340px', margin: '0 auto', padding: '2rem 2rem 8rem' }}>
          <FadeIn>
            <p
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: LABEL,
                marginBottom: '3rem',
                fontFamily: SANS,
              }}
            >
              03. Drinks
            </p>
          </FadeIn>

          {drinkCategories.map((category) => (
            <div key={category.id} style={{ marginBottom: '4.5rem' }}>
              <FadeIn>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                    fontWeight: 300,
                    color: IVORY,
                    marginBottom: '2rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {category.title}
                </h3>
              </FadeIn>
              <div className="lnt-drink-grid">
                {category.items.map((item, ii) => (
                  <DrinkCard key={item.name} item={item} delay={(ii % 4) * 60} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {page === 'home' && (
      <>
      {/* ── MENU PREVIEW ───────────────────────────────────── */}
      <section id="menu-preview" style={{ padding: '9rem 0 7rem', backgroundColor: CHARCOAL }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <p
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: LABEL,
                marginBottom: '0.7rem',
                fontFamily: SANS,
              }}
            >
              Our Offering
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 300,
                color: IVORY,
                marginBottom: '3.5rem',
                letterSpacing: '-0.015em',
                lineHeight: 1.1,
              }}
            >
              Menu
            </h2>
          </FadeIn>
          <div className="lnt-food-grid">
            {menuPreviewDishes.map((item, ii) => (
              <DishCard key={item.name} item={item} delay={ii * 60} />
            ))}
            <FadeIn delay={menuPreviewDishes.length * 60} className="lnt-menu-teaser-more">
              <button onClick={() => goTo('menu')} className="lnt-menu-teaser-more-btn">
                <div className="lnt-menu-teaser-more-img">
                  <span>&rarr;</span>
                </div>
                <div style={{ padding: '1.1rem 0.15rem 0' }}>
                  <span style={{ fontFamily: SERIF, fontSize: '1.05rem', fontWeight: 400, color: IVORY }}>
                    View Full Menu
                  </span>
                </div>
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────── */}
      <section
        id="about"
        style={{ padding: '9rem 0', backgroundColor: '#121212' }}
      >
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="lnt-about-grid">
            <FadeIn>
              <div style={{ position: 'relative' }}>
                <img
                  src="/photos/about-dining.jpg"
                  alt="Moody, candlelit dining room"
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-1.75rem',
                    right: '-1.75rem',
                    width: '48%',
                    aspectRatio: '1',
                    overflow: 'hidden',
                    border: `4px solid #121212`,
                  }}
                >
                  <img
                    src="/photos/about-bar-detail.jpg"
                    alt="Wine glasses over a warmly lit bar counter"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <div style={{ paddingTop: '1rem' }}>
                <p
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: LABEL,
                    marginBottom: '0.7rem',
                    fontFamily: SANS,
                  }}
                >
                  Our Story
                </p>
                <h2
                  style={{
                    fontFamily: SERIF,
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 300,
                    color: IVORY,
                    marginBottom: '2.25rem',
                    lineHeight: 1.12,
                    letterSpacing: '-0.015em',
                  }}
                >
                  Korean Comfort Meets
                  <br />
                  <em style={{ color: ACCENT, fontStyle: 'italic' }}>Western Plates</em>
                </h2>
                <div
                  style={{
                    fontFamily: SANS,
                    fontWeight: 300,
                    fontSize: '0.92rem',
                    lineHeight: 1.9,
                    color: 'rgba(245,240,232,0.6)',
                  }}
                >
                  <p style={{ marginBottom: '1.3rem' }}>
                    야식탁, Late Night Table, is a Korean-Western fusion anju bar in North Strathfield built for
                    the hours when everywhere else is closing up. Bubbling pots of tteokbokki and grilled large
                    intestine share the table with truffle pasta and risotto — the kind of menu that only makes
                    sense after dark.
                  </p>
                  <p style={{ marginBottom: '1.3rem' }}>
                    We pair Korean pantry staples — gochujang, doenjang, perilla — with pasta, risotto, and other
                    Western techniques, then pour it all with soju, makgeolli, highballs, and beer on tap. Come for
                    the signature Galbi Risotto, stay for however long the night runs.
                  </p>
                  <p>
                    Open Tuesday to Sunday, closed Mondays. Walk in any night for a table, a pot, and a round of
                    soju.
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                    marginTop: '3.25rem',
                    paddingTop: '2.25rem',
                    borderTop: `1px solid rgba(140,140,140,0.2)`,
                  }}
                >
                  {[
                    { label: 'Cuisine', value: 'K-Fusion' },
                    { label: 'Signature', value: 'Galbi Risotto' },
                    { label: 'Open Until', value: 'Midnight' },
                  ].map((s) => (
                    <div key={s.label}>
                      <p
                        style={{
                          fontFamily: SERIF,
                          fontSize: '1.5rem',
                          fontWeight: 400,
                          color: ACCENT,
                          marginBottom: '0.3rem',
                          lineHeight: 1,
                        }}
                      >
                        {s.value}
                      </p>
                      <p
                        style={{
                          fontFamily: SANS,
                          fontSize: '0.6rem',
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color: 'rgba(245,240,232,0.35)',
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '9rem 0', backgroundColor: CHARCOAL }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <p
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: LABEL,
                marginBottom: '0.7rem',
                fontFamily: SANS,
              }}
            >
              Find Us
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 300,
                color: IVORY,
                marginBottom: '4.5rem',
                letterSpacing: '-0.015em',
                lineHeight: 1.1,
              }}
            >
              Reserve &amp; Contact
            </h2>
          </FadeIn>

          <div className="lnt-contact-grid">
            {/* INFO */}
            <FadeIn>
              <div>
                <div style={{ marginBottom: '3.25rem' }}>
                  {[
                    { label: 'Address', value: RESTAURANT_ADDRESS },
                    { label: 'Phone', value: RESTAURANT_PHONE_DISPLAY },
                  ].map((info) => (
                    <div
                      key={info.label}
                      style={{
                        display: 'flex',
                        gap: '1.5rem',
                        marginBottom: '1.6rem',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.58rem',
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color: LABEL,
                          fontFamily: SANS,
                          paddingTop: '2px',
                          minWidth: '52px',
                        }}
                      >
                        {info.label}
                      </span>
                      <span
                        style={{
                          fontFamily: SANS,
                          fontSize: '0.88rem',
                          color: 'rgba(245,240,232,0.62)',
                          fontWeight: 300,
                          lineHeight: 1.5,
                        }}
                      >
                        {info.value}
                      </span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontSize: '0.58rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: LABEL,
                        fontFamily: SANS,
                        paddingTop: '2px',
                        minWidth: '52px',
                      }}
                    >
                      Hours
                    </span>
                    <div style={{ flex: 1 }}>
                      {[
                        { day: 'Monday', time: 'Closed', late: false },
                        { day: 'Tue – Sat', time: '11 am – Midnight', late: true },
                        { day: 'Sunday', time: '11 am – 11 pm', late: false },
                      ].map((h) => (
                        <div
                          key={h.day}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '1.5rem',
                            marginBottom: '0.45rem',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: SANS,
                              fontSize: '0.82rem',
                              color: 'rgba(245,240,232,0.45)',
                              fontWeight: 300,
                            }}
                          >
                            {h.day}
                          </span>
                          <span
                            style={{
                              fontFamily: SANS,
                              fontSize: '0.82rem',
                              color: h.late ? ACCENT : 'rgba(245,240,232,0.45)',
                              fontWeight: h.late ? 400 : 300,
                            }}
                          >
                            {h.time}
                            {h.late && (
                              <span
                                style={{
                                  marginLeft: '0.5rem',
                                  fontSize: '0.6rem',
                                  letterSpacing: '0.1em',
                                  textTransform: 'uppercase',
                                  color: ACCENT,
                                  backgroundColor: 'transparent',
                                  border: '1px solid rgba(245,240,232,0.4)',
                                  padding: '0.15rem 0.45rem',
                                }}
                              >
                                Open Late
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div
                  style={{
                    position: 'relative',
                    height: '200px',
                    backgroundColor: '#221e19',
                    overflow: 'hidden',
                    border: `1px solid rgba(140,140,140,0.14)`,
                    marginBottom: '0.85rem',
                  }}
                >
                  <iframe
                    title="Late Night Table location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(RESTAURANT_ADDRESS)}&output=embed`}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 0,
                      filter: 'saturate(1.15) brightness(0.95) contrast(1.05)',
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT_ADDRESS)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lnt-social-link"
                  style={{
                    display: 'inline-block',
                    textDecoration: 'none',
                    color: 'rgba(245,240,232,0.45)',
                    fontFamily: SANS,
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '2rem',
                    transition: 'color 0.2s',
                  }}
                >
                  Get Directions →
                </a>

                {/* Social */}
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {[
                    {
                      label: '@late.night.table',
                      href: 'https://www.instagram.com/late.night.table/',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="url(#instagram-gradient)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      ),
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lnt-social-link"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        color: 'rgba(245,240,232,0.45)',
                        fontFamily: SANS,
                        fontSize: '0.8rem',
                        fontWeight: 300,
                        transition: 'color 0.2s',
                      }}
                    >
                      {s.icon}
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* CALL / TEXT TO RESERVE */}
            <FadeIn delay={160}>
              <div
                style={{
                  border: `1px solid rgba(140,140,140,0.25)`,
                  padding: '3.5rem 2.5rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    color: IVORY,
                    marginBottom: '0.9rem',
                  }}
                >
                  Reserve a Table
                </h3>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: '0.88rem',
                    color: 'rgba(245,240,232,0.55)',
                    fontWeight: 300,
                    lineHeight: 1.75,
                    marginBottom: '2.5rem',
                  }}
                >
                  We don&apos;t take bookings online — call or text us and we&apos;ll sort out your table.
                </p>

                <a
                  href={`tel:${RESTAURANT_PHONE_TEL}`}
                  className="lnt-btn-gold"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: ACCENT,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.68rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: CHARCOAL,
                    fontFamily: SANS,
                    fontWeight: 600,
                    padding: '1rem 2rem',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                    marginBottom: '1rem',
                  }}
                >
                  Call {RESTAURANT_PHONE_DISPLAY}
                </a>

                <a
                  href={`sms:${RESTAURANT_PHONE_TEL}`}
                  className="lnt-btn-outline"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'none',
                    border: `1px solid rgba(245,240,232,0.35)`,
                    cursor: 'pointer',
                    fontSize: '0.68rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: IVORY,
                    fontFamily: SANS,
                    fontWeight: 400,
                    padding: '1rem 2rem',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  Text Us
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      </>
      )}

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: '#17130f',
          borderTop: `1px solid rgba(140,140,140,0.22)`,
          padding: '4.5rem 0 2rem',
        }}
      >
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="lnt-footer-grid" style={{ marginBottom: '3.5rem' }}>
            <div>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: '0.95rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: IVORY,
                  fontWeight: 400,
                  marginBottom: '1rem',
                }}
              >
                Late Night Table
              </p>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: '0.8rem',
                  color: 'rgba(245,240,232,0.35)',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  maxWidth: '280px',
                }}
              >
                야식탁 — Korean-Western fusion anju bar in North Strathfield. Open Tuesday to Sunday until late.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: '0.58rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: LABEL,
                  fontFamily: SANS,
                  marginBottom: '1.1rem',
                }}
              >
                Navigate
              </p>
              {(['menu', 'about', 'contact'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => (s === 'menu' ? goTo('menu') : scrollTo(s))}
                  className="lnt-footer-link"
                  style={{
                    display: 'block',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: SANS,
                    fontSize: '0.8rem',
                    color: 'rgba(245,240,232,0.38)',
                    fontWeight: 300,
                    padding: '0.3rem 0',
                    transition: 'color 0.2s',
                    textAlign: 'left',
                  }}
                >
                  {s === 'about' ? 'About Us' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div>
              <p
                style={{
                  fontSize: '0.58rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: LABEL,
                  fontFamily: SANS,
                  marginBottom: '1.1rem',
                }}
              >
                Connect
              </p>
              <a
                href="https://www.instagram.com/late.night.table/"
                target="_blank"
                rel="noopener noreferrer"
                className="lnt-social-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  textDecoration: 'none',
                  color: 'rgba(245,240,232,0.38)',
                  fontFamily: SANS,
                  fontSize: '0.8rem',
                  fontWeight: 300,
                  transition: 'color 0.2s',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="url(#instagram-gradient)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid rgba(245,240,232,0.06)`,
              paddingTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <p style={{ fontFamily: SANS, fontSize: '0.68rem', color: 'rgba(245,240,232,0.2)', fontWeight: 300 }}>
              © 2026 Late Night Table. All rights reserved.
            </p>
            <p style={{ fontFamily: SANS, fontSize: '0.68rem', color: 'rgba(245,240,232,0.2)', fontWeight: 300 }}>
              {RESTAURANT_ADDRESS}
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background-color: rgba(140,140,140,0.28); color: #F5F0E8; }
        ::-webkit-scrollbar { width: 0; background: transparent; }

        .lnt-btn-gold:hover { background-color: #ddbd86 !important; }
        .lnt-btn-outline:hover { border-color: ${ACCENT} !important; color: ${ACCENT} !important; }
        .lnt-reserve-btn:hover { background-color: ${ACCENT} !important; color: ${CHARCOAL} !important; }
        .lnt-nav-link:hover { opacity: 1 !important; }
        .lnt-social-link:hover { color: ${ACCENT} !important; }
        .lnt-footer-link:hover { color: ${ACCENT} !important; }
        .lnt-input:focus { border-color: rgba(140,140,140,0.45) !important; box-shadow: 0 0 0 1px rgba(140,140,140,0.12); }
        input::placeholder, textarea::placeholder { color: rgba(245,240,232,0.2) !important; }

        .lnt-menu-dropdown {
          position: absolute;
          top: calc(100% + 1.25rem);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(20,18,16,0.98);
          border: 1px solid rgba(140,140,140,0.22);
          padding: 0.6rem 0;
          min-width: 210px;
          display: flex;
          flex-direction: column;
          z-index: 50;
        }
        .lnt-menu-dropdown-item {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: ${SANS};
          color: rgba(245,240,232,0.6);
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.7rem 1.5rem;
          transition: color 0.2s, background-color 0.2s;
          white-space: nowrap;
        }
        .lnt-menu-dropdown-item:hover { color: ${ACCENT}; background-color: rgba(245,240,232,0.06); }

        .lnt-menu-subnav {
          position: sticky;
          top: 72px;
          z-index: 40;
          background: rgba(20,18,16,0.96);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(140,140,140,0.18);
          border-bottom: 1px solid rgba(140,140,140,0.18);
        }
        .lnt-menu-subnav-inner {
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          gap: 2.5rem;
          overflow-x: auto;
        }
        .lnt-menu-subnav-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: ${SANS};
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 1rem 0;
          white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
        }

        .lnt-menu-card, .lnt-drink-card { cursor: pointer; }

        .lnt-menu-card-img, .lnt-drink-card-img {
          position: relative;
          overflow: hidden;
          background-color: #221e19;
        }
        .lnt-menu-card-img { aspect-ratio: 1 / 1; }
        .lnt-menu-card-featured .lnt-menu-card-img { aspect-ratio: 16 / 11; }
        .lnt-drink-card-img { aspect-ratio: 3 / 4; }

        .lnt-menu-card-img img, .lnt-drink-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.55s ease;
        }
        .lnt-menu-card:hover .lnt-menu-card-img img,
        .lnt-drink-card:hover .lnt-drink-card-img img {
          transform: scale(1.06);
        }

        .lnt-food-grid, .lnt-drink-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem 2rem;
        }
        .lnt-menu-card-featured { grid-column: span 2; }

        .lnt-menu-teaser-more-btn {
          display: flex;
          flex-direction: column;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align: left;
        }
        .lnt-menu-teaser-more-img {
          aspect-ratio: 1 / 1;
          border: 1px solid rgba(245,240,232,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.25s, border-color 0.25s;
        }
        .lnt-menu-teaser-more-img span {
          font-size: 2rem;
          color: ${ACCENT};
          transition: transform 0.25s;
          display: inline-block;
        }
        .lnt-menu-teaser-more-btn:hover .lnt-menu-teaser-more-img {
          background-color: rgba(245,240,232,0.06);
          border-color: ${ACCENT};
        }
        .lnt-menu-teaser-more-btn:hover .lnt-menu-teaser-more-img span {
          transform: translateX(4px);
        }

        .lnt-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        .lnt-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
        }

        .lnt-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4rem;
        }

        @media (max-width: 960px) {
          .lnt-nav-desktop { display: none !important; }
          .lnt-hamburger { display: flex !important; }

          .lnt-food-grid, .lnt-drink-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 1.5rem;
          }

          .lnt-about-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .lnt-contact-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .lnt-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 600px) {
          .lnt-food-grid, .lnt-drink-grid {
            grid-template-columns: 1fr;
          }
          .lnt-menu-card-featured { grid-column: span 1; }
          .lnt-menu-card-featured .lnt-menu-card-img { aspect-ratio: 4 / 3; }

          .lnt-footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  )
}
