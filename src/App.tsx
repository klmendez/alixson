import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowDown, ArrowRight, Facebook, Instagram, Mail, MapPin, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import hero from '../IMG_0702.webp'
import about from '../alixson-retrato-limpio.webp'
import malvie from '../4fb01938-7425-4704-8c18-64fec0f7fc8b.webp'
import flower from '../fbd8f09c-3701-44e5-85d3-25ab68c825a0.webp'
import runway1 from '../_DSC6407.webp'
import runway2 from '../_DSC7125.webp'
import runway3 from '../_DSC7641.webp'
import stairs1 from '../_DSC8056A.webp'
import stairs2 from '../_DSC8057A.webp'
import editorial from '../_DSC9588-Mejorado-NR.webp'
import portraitRed from '../IMG_0703.webp'
import whiteLook from '../IMG_1641.webp'
import sagitario1 from '../IMG_6287.webp'
import sagitario2 from '../IMG_6288.webp'
import outdoor1 from '../IMG_6293.webp'
import outdoor2 from '../IMG_6312.webp'
import beauty from '../IMG_9541.webp'
import studio from '../IMG_9544.webp'
import malvieFull from '../d5f89e67-5aa9-4b44-b793-1899da25080b.webp'
import conceptual from '../28.webp'
import darkPortrait from '../14.webp'
import monoAzulProfile from './assets/photographers/mono-azul.webp'
import juanPabloProfile from './assets/photographers/juan-pablo-idrobo.webp'
import sebastianProfile from './assets/photographers/sebastian-cadavid.webp'
import haroldProfile from './assets/photographers/harold-vanegas.webp'
import maraProfile from './assets/photographers/mara-fritz.webp'

type Category = 'Todos' | 'Editorial' | 'Fashion' | 'Beauty' | 'Lifestyle' | 'Runway' | 'UGC'
type GalleryItem = { src: string; category: Exclude<Category, 'Todos'>; title: string; note: string; slug: string; description: string; position?: string; related?: string[] }

const gallery: GalleryItem[] = [
  { src: editorial, category: 'Editorial', title: 'Nocturne', note: 'Producción editorial', slug: 'nocturne', description: 'Una exploración visual de fuerza y quietud construida desde el retrato, el contraste y una dirección de arte minimalista.' },
  { src: flower, category: 'Beauty', title: 'Florecer', note: 'Beauty portrait', slug: 'florecer', description: 'Retrato de belleza inspirado en la feminidad orgánica, donde las flores enmarcan la mirada y se convierten en parte del lenguaje visual.' },
  { src: malvie, category: 'Fashion', title: 'WARMI', note: 'MALVIE Magazine', slug: 'warmi-malvie', description: 'Editorial publicada en MALVIE Magazine que celebra la fuerza, la identidad y la esencia femenina mediante moda, color y simbolismo.' },
  { src: conceptual, category: 'Editorial', title: 'Silencio', note: 'Conceptual series', slug: 'silencio', description: 'Una serie conceptual de carácter íntimo, creada alrededor de la expresión corporal, la pausa y el poder narrativo de una imagen contenida.' },
  { src: darkPortrait, category: 'Beauty', title: 'After Dark', note: 'Portrait study', slug: 'after-dark', description: 'Estudio de retrato en clave baja que utiliza sombras profundas y una paleta contenida para destacar gesto, textura y presencia.' },
  { src: sagitario1, category: 'UGC', title: 'Color Story', note: 'Sagitario Shop', slug: 'sagitario-color-story', description: 'Colaboración de moda y contenido para Sagitario Shop, enfocada en mostrar la personalidad de la prenda desde una mirada fresca y cercana.' },
  { src: stairs1, category: 'Lifestyle', title: 'In Motion', note: 'Lifestyle session', slug: 'in-motion', description: 'Sesión lifestyle en locación que combina movimiento, luz natural y una actitud espontánea para construir imágenes vivas y auténticas.', position: '50% 28%' },
  { src: runway2, category: 'Runway', title: 'Runway', note: 'Fashion show', slug: 'runway', description: 'Registro de pasarela donde el movimiento, la presencia escénica y la interpretación de la prenda son los protagonistas.' },
  { src: portraitRed, category: 'Fashion', title: 'Crimson', note: 'Fashion portrait', slug: 'crimson', description: 'Retrato de moda de atmósfera intensa, construido a partir de una paleta monocromática y una puesta en escena elegante.' },
  { src: whiteLook, category: 'Fashion', title: 'White Light', note: 'Fashion editorial', slug: 'white-light', description: 'Una historia de moda limpia y luminosa, construida desde la silueta, la expresión y la fuerza del blanco.' },
  { src: sagitario2, category: 'UGC', title: 'Everyday Color', note: 'Sagitario Shop', slug: 'everyday-color', description: 'Contenido de moda para Sagitario Shop, pensado para mostrar prendas y actitud de una forma cercana y espontánea.' },
  { src: outdoor1, category: 'Lifestyle', title: 'Open Air', note: 'Lifestyle content', slug: 'open-air', description: 'Una sesión al aire libre que conecta movimiento, luz natural y una energía cotidiana.' },
  { src: outdoor2, category: 'Lifestyle', title: 'Soft Motion', note: 'Lifestyle session', slug: 'soft-motion', description: 'Retratos lifestyle de atmósfera suave, enfocados en gesto, movimiento y naturalidad.' },
  { src: beauty, category: 'Beauty', title: 'Clean Beauty', note: 'Beauty portrait', slug: 'clean-beauty', description: 'Retrato de belleza de lenguaje limpio y directo, donde la piel, la mirada y la luz son protagonistas.' },
  { src: studio, category: 'Editorial', title: 'Studio Notes', note: 'Studio editorial', slug: 'studio-notes', description: 'Una exploración editorial en estudio que combina dirección precisa, presencia y composición.' },
  { src: runway1, category: 'Runway', title: 'The Walk', note: 'Fashion show', slug: 'the-walk', description: 'La energía de la pasarela capturada en movimiento, con foco en actitud, silueta y presencia escénica.' },
  { src: runway3, category: 'Runway', title: 'Final Look', note: 'Fashion show', slug: 'final-look', description: 'Un registro de pasarela centrado en la interpretación de la prenda y la fuerza del instante.' },
  { src: stairs2, category: 'Lifestyle', title: 'Between Steps', note: 'Lifestyle session', slug: 'between-steps', description: 'Una historia espontánea construida entre arquitectura, movimiento y luz natural.' },
  { src: malvieFull, category: 'Editorial', title: 'Warmi Frames', note: 'MALVIE Magazine', slug: 'warmi-frames', description: 'Una selección adicional de la producción WARMI, publicada en MALVIE Magazine.' },
]

// Una sola portada por sesión en el home; al abrirla se revela la serie completa.
const portfolioProjects: GalleryItem[] = [
  { ...gallery.find(item => item.slug === 'warmi-malvie')!, title: 'WARMI', related: [malvie, malvieFull, conceptual, darkPortrait] },
  gallery.find(item => item.slug === 'florecer')!,
  gallery.find(item => item.slug === 'nocturne')!,
  { ...gallery.find(item => item.slug === 'runway')!, title: 'Pasarela', related: [runway2, runway1, runway3] },
  { ...gallery.find(item => item.slug === 'in-motion')!, related: [stairs1, stairs2] },
  { ...gallery.find(item => item.slug === 'sagitario-color-story')!, title: 'Sagitario', related: [sagitario1, sagitario2] },
  { ...gallery.find(item => item.slug === 'open-air')!, related: [outdoor1, outdoor2] },
  { ...gallery.find(item => item.slug === 'crimson')!, related: [portraitRed, hero] },
  gallery.find(item => item.slug === 'white-light')!,
  { ...gallery.find(item => item.slug === 'clean-beauty')!, related: [beauty, studio] },
]

const services = [
  ['01', 'Modelaje', 'Sesiones, campañas, catálogos, eventos y pasarela.'],
  ['02', 'UGC Creator', 'Contenido natural y estratégico para marcas y redes.'],
  ['03', 'Brand Content', 'Imágenes que traducen la esencia de un producto.'],
  ['04', 'Fashion & Beauty', 'Moda, accesorios, belleza, maquillaje y lifestyle.'],
  ['05', 'Editorial', 'Producciones conceptuales y proyectos creativos.'],
  ['06', 'Reels & Short-form', 'Contenido vertical para campañas digitales.'],
]

const serviceDetails = [
  { for: 'Marcas, diseñadores, editoriales y producciones de moda.', includes: ['Dirección de poses y expresión', 'Sesión en estudio o locación', 'Campañas, catálogos y eventos'] },
  { for: 'Marcas que buscan contenido cercano y creíble para redes.', includes: ['Concepto adaptado a la marca', 'Grabación vertical', 'Contenido listo para publicar'] },
  { for: 'Productos que necesitan una identidad visual coherente.', includes: ['Interpretación del concepto', 'Fotografía y video de producto', 'Piezas para campaña digital'] },
  { for: 'Propuestas de moda, accesorios, maquillaje y cuidado personal.', includes: ['Modelaje fashion y beauty', 'Contenido editorial o comercial', 'Adaptación a diferentes estilos'] },
  { for: 'Equipos creativos que quieren construir una historia visual.', includes: ['Desarrollo de narrativa', 'Interpretación de personaje', 'Producciones conceptuales'] },
  { for: 'Marcas que necesitan comunicar rápido y con intención.', includes: ['Videos verticales dinámicos', 'Contenido para Reels y campañas', 'Entrega optimizada para redes'] },
]

const plans = [
  { label: 'Inicio', title: 'Mini UGC', price: '$150.000', detail: 'Para probar una idea y ponerla en movimiento.', items: ['1 video vertical de 10–15 segundos', 'Guía creativa para grabación', 'Edición lista para redes', '1 ronda de ajustes'] },
  { label: 'Esencial', title: 'Una pieza UGC', price: '$250.000', detail: 'Contenido puntual con una dirección clara y natural.', items: ['1 video vertical de 15–30 segundos', 'Concepto y grabación', 'Edición lista para redes', '1 ronda de ajustes'] },
  { label: 'Conexión', title: 'Pack de contenido', price: '$500.000', detail: 'Una pequeña colección para darle continuidad a tu marca.', items: ['2 videos verticales', '3 fotografías editadas', 'Concepto creativo', '2 rondas de ajustes'] },
  { label: 'Campaña', title: 'Pack de campaña', price: '$1.000.000', detail: 'Una propuesta completa para comunicar una campaña.', items: ['3 videos verticales', '5 fotografías editadas', 'Guion y concepto creativo', '2 rondas de ajustes'] },
  { label: 'Presencia', title: 'Contenido mensual', price: '$1.500.000', detail: 'Contenido constante para sostener tu presencia digital.', items: ['6 videos verticales', '10 fotografías editadas', 'Planeación mensual', 'Entrega organizada por campaña'] },
  { label: 'A medida', title: 'Plan personalizado', price: '$1.800.000', detail: 'Una propuesta construida alrededor de tus objetivos y alcance.', items: ['Estrategia y concepto a medida', 'Videos y fotografías según campaña', 'Producción coordinada', 'Seguimiento y ajustes personalizados'] },
]

const photographers = [
  { name: 'Mara Fritz / Fritz Archive', handle: '@fritzarchive_', project: 'WARMI — MALVIE Magazine · FIGGI Magazine', image: maraProfile },
  { name: 'Harold Vanegas', handle: '@harold_vanegas', project: 'Producción creativa — Orito, Putumayo', image: haroldProfile },
  { name: 'Juan Pablo Idrobo', handle: '@juanpabloidrobo_', project: 'Sagitario Shop — moda y contenido', image: juanPabloProfile },
  { name: 'Sebastián Cadavid', handle: '@sebastiancadavidphoto', project: 'MUSAS', image: sebastianProfile },
  { name: 'Mono Azul Fotografía', handle: '@unmonoazul', project: 'Sesión fotográfica editorial', image: monoAzulProfile },
  { name: 'Edw Cxm', handle: '@edw.cxm', project: 'Sesión fotográfica — abril 2026', image: 'https://unavatar.io/instagram/edw.cxm' },
]

type PageData = { eyebrow:string; title:string; italic:string; intro:string; hero:string; hero2:string; images:string[]; sectionTitle:string; body:string; label:string; facts:string[] }
const pages: Record<string, PageData> = {
  'sobre-mi': { eyebrow:'Conoce a Alixson', title:'Disciplina y', italic:'autenticidad', intro:'Modelo y creadora de contenido. Una historia construida con intención, constancia y una mirada propia.', hero:about, hero2:beauty, images:[beauty,studio,darkPortrait,portraitRed], sectionTitle:'Más que una imagen', body:'Mi trabajo se desarrolla entre la moda, la fotografía editorial y la creación de contenido. Cada proyecto es una oportunidad para interpretar una idea, explorar nuevas formas de expresión y construir conexiones reales.', label:'Perfil · Vol. 01', facts:['Popayán, Colombia','Modelo & Content Creator','Status Agencia de Modelos','Fashion · Beauty · UGC'] },
  'portafolio': { eyebrow:'Selección visual', title:'Historias en', italic:'diferentes formas', intro:'Una selección curada de editoriales, moda, belleza, lifestyle y contenido para marcas.', hero:flower, hero2:editorial, images:[editorial,flower,malvie,conceptual,darkPortrait,sagitario1,stairs1,runway2,portraitRed,whiteLook,sagitario2,outdoor1,outdoor2,beauty,studio,runway1,runway3,stairs2,malvieFull], sectionTitle:'Una mirada versátil', body:'El portafolio reúne trabajos que muestran diferentes facetas, atmósferas y lenguajes. Desde producciones conceptuales hasta imágenes pensadas para conectar una marca con su comunidad.', label:'Portfolio · Issue 02', facts:['Editorial','Fashion','Beauty','Lifestyle · Runway · UGC'] },
  'proyectos': { eyebrow:'Trabajo seleccionado', title:'Proyectos con', italic:'una historia', intro:'Editoriales, colaboraciones y producciones creadas junto a marcas y equipos creativos.', hero:malvieFull, hero2:malvie, images:[malvie,malvieFull,sagitario1,sagitario2,editorial,conceptual,runway2], sectionTitle:'Crear en colaboración', body:'Detrás de cada resultado existe un proceso: concepto, dirección, styling, producción y confianza. Aquí viven los proyectos que han ayudado a construir una trayectoria visual coherente.', label:'Selected Works · 03', facts:['MALVIE Magazine','Sagitario Shop','Fritz Archive','Producción creativa'] },
  'servicios': { eyebrow:'Servicios creativos', title:'Contenido que', italic:'conecta', intro:'Modelaje y creación de contenido para marcas, emprendimientos, agencias y proyectos creativos.', hero:studio, hero2:runway1, images:[whiteLook,beauty,runway1,runway3], sectionTitle:'Una solución para cada idea', body:'Desde una campaña de moda hasta contenido vertical para redes, cada servicio se adapta al lenguaje, los objetivos y la personalidad de la marca.', label:'Services · Chapter 04', facts:['Campañas','Catálogos','Eventos y pasarela','Contenido digital'] },
  'ugc': { eyebrow:'UGC & Content', title:'Contenido real para', italic:'marcas reales', intro:'Piezas naturales, estéticas y estratégicas preparadas para redes sociales y campañas digitales.', hero:outdoor1, hero2:sagitario2, images:[sagitario2,outdoor2,whiteLook,stairs2], sectionTitle:'Natural también es estratégico', body:'Creo videos y fotografías que se sienten cercanos sin perder dirección visual: unboxing, fashion try-on, beauty, lifestyle, testimoniales, voice-over y reels.', label:'Content Journal · 05', facts:['Unboxing','Fashion try-on','Beauty · Skincare','Reels · Voice-over'] },
  'contacto': { eyebrow:'Hablemos', title:'Tu idea puede ser', italic:'el próximo proyecto', intro:'Campañas, colaboraciones, producciones editoriales, modelaje y contenido UGC.', hero:darkPortrait, hero2:portraitRed, images:[portraitRed,flower,malvie], sectionTitle:'Construyamos algo increíble', body:'Cuéntame sobre tu marca, proyecto o idea. Podemos encontrar el formato, el tono y la propuesta visual que mejor conecten con tu audiencia.', label:'Open Call · 06', facts:['Modelaje','UGC','Campañas','Editorial'] },
}

const reveal = { initial: { opacity: 0, y: 45 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: false, margin: '-80px' }, transition: { duration: .9, ease: [0.22, 1, 0.36, 1] as const } }

function Brand() { return <a className="brand" href="/">ALIXSON <span>VALENTINA</span></a> }

function TypewriterWord({ text, delay = 0 }: { text:string; delay?:number }) {
  return <span className="typewriter-word" aria-label={text}>{Array.from(text).map((letter,index)=><motion.span aria-hidden="true" key={`${letter}-${index}`} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} transition={{duration:.18,delay:delay+index*.16,ease:[.22,1,.36,1]}}>{letter}</motion.span>)}</span>
}

const navItems = [['Inicio','inicio'],['Sobre mí','sobre-mi'],['Fotógrafos','fotografos'],['Portafolio','portafolio'],['Proyectos','proyectos'],['Servicios','servicios'],['Planes','planes'],['UGC','ugc'],['Contacto','contacto']]
function SiteHeader({ internal = false }: { internal?: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(() => window.location.pathname.replace(/^\/+|\/+$/g, '') || 'inicio')
  useEffect(()=>{ const update=()=>{const heroSection=document.querySelector<HTMLElement>('.hero,.content-hero,.project-page-hero');setScrolled(window.scrollY>(heroSection?.offsetHeight||80)-78)}; update(); window.addEventListener('scroll',update,{passive:true}); window.addEventListener('resize',update); return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update)} },[])
  useEffect(()=>{ if(!open) return; const previous=document.body.style.overflow; document.body.style.overflow='hidden'; return()=>{document.body.style.overflow=previous} },[open])
  useEffect(()=>{
    if (internal) return
    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * .38
      const sections = navItems.map(([,id])=>document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section))
      const current = sections.reduce((selected,section)=>section.offsetTop<=marker?section:selected,sections[0])
      if (current) setActiveSection(current.id)
    }
    updateActive()
    window.addEventListener('scroll',updateActive,{passive:true})
    window.addEventListener('resize',updateActive)
    return()=>{window.removeEventListener('scroll',updateActive);window.removeEventListener('resize',updateActive)}
  },[internal])
  const href = (id:string) => `/#${id}`
  return <><header className={`header ${scrolled?'header-scrolled':''}`}><a className="brand" href={href('inicio')}>ALIXSON <span>VALENTINA</span></a><nav>{navItems.map(([label,id])=><a className={activeSection===id?'active':''} aria-current={activeSection===id?'page':undefined} key={id} href={href(id)}>{label}</a>)}</nav><button className="menu-btn" onClick={()=>setOpen(true)} aria-label="Abrir menú"><Menu size={20}/></button></header>
    <AnimatePresence>{open&&<motion.div className="mobile-menu" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.6,ease:[.76,0,.24,1]}}><button onClick={()=>setOpen(false)} aria-label="Cerrar menú"><X/></button><a className="brand" href={href('inicio')}>ALIXSON <span>VALENTINA</span></a><div>{navItems.map(([label,id],i)=><motion.a className={activeSection===id?'active':''} aria-current={activeSection===id?'page':undefined} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:.1+i*.06}} key={id} onClick={()=>setOpen(false)} href={href(id)}>{label}<small>0{i+1}</small></motion.a>)}</div></motion.div>}</AnimatePresence></>
}

function SiteFooter() { return <footer><Brand/><p>Model · Content Creator · UGC</p><div className="footer-meta"><span>Popayán, Colombia</span><i>Flow, don’t force.</i></div><small>© 2026 Alixson Valentina. Todos los derechos reservados.</small><a className="footer-credit" href="https://www.instagram.com/by_akora/" target="_blank" rel="noreferrer" aria-label="Instagram de Akora 212">Portafolio elaborado por <strong>Akora 212</strong></a></footer> }
function WhatsAppIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.1a9.9 9.9 0 0 0-8.55 14.9L2 22l5.15-1.35A9.9 9.9 0 1 0 12 2.1Zm0 1.8a8.1 8.1 0 0 1 6.45 13.02l-.38.49.3 1.77-1.7-.45-.52.3A8.1 8.1 0 1 1 12 3.9Z"/><path fill="currentColor" d="M9.18 7.3c-.2-.45-.42-.46-.62-.47h-.53c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.9 3.05 4.7 4.15 2.32.91 2.8.73 3.3.68.5-.05 1.6-.66 1.83-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.53-.32-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48l-.84-2.08Z"/></svg> }
function TikTokIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.6 5.82a4.85 4.85 0 0 1-1.2-3.18h-3.2v12.8a2.7 2.7 0 1 1-2.7-2.7c.28 0 .55.04.8.12V9.6a5.94 5.94 0 1 0 5.1 5.84V8.95a8.04 8.04 0 0 0 4.7 1.5V7.24a4.86 4.86 0 0 1-3.5-1.42Z"/></svg> }
function SocialLinks() { return <nav className="social" aria-label="Redes sociales"><a href="https://www.instagram.com/alixs_morann/" target="_blank" rel="noreferrer"><Instagram/> Instagram · @alixs_morann</a><a href="https://www.facebook.com/profile.php?id=100006127425463" target="_blank" rel="noreferrer"><Facebook/> Facebook</a><a href="https://www.tiktok.com/@axsvall" target="_blank" rel="noreferrer"><TikTokIcon/> TikTok · @axsvall</a><a href="https://api.whatsapp.com/send?phone=573204399635&text=Hola%20Alixson%2C%20vi%20tu%20portafolio" target="_blank" rel="noreferrer"><WhatsAppIcon/> WhatsApp</a><a href="mailto:contacto@alixsonvalentina.com"><Mail/> Email</a></nav> }
function WhatsAppBubble() { return <a className="whatsapp-float" href="https://api.whatsapp.com/send?phone=573204399635&text=Hola%20Alixson%2C%20vi%20tu%20portafolio%20y%20quisiera%20hablar%20sobre%20un%20proyecto" target="_blank" rel="noreferrer" aria-label="Escríbele a Alixson por WhatsApp"><WhatsAppIcon/><span>Escríbeme</span></a> }

function PhotographersCarousel() {
  const [active, setActive] = useState(0)
  const [dragStart, setDragStart] = useState<number | null>(null)
  const move = (direction: number) => setActive(current => (current + direction + photographers.length) % photographers.length)
  useEffect(() => {
    const timer = window.setInterval(() => move(1), 5000)
    return () => window.clearInterval(timer)
  }, [])
  const distance = (index: number) => {
    let value = index - active
    if (value > photographers.length / 2) value -= photographers.length
    if (value < -photographers.length / 2) value += photographers.length
    return value
  }

  return <section id="fotografos" className="photographers" aria-labelledby="photographers-title">
    <motion.div className="photographers-heading" {...reveal}>
      <p className="eyebrow">Colaboraciones detrás de cámara</p>
      <h2 id="photographers-title">Fotógrafos con los que <i>he creado historias</i></h2>
    </motion.div>
    <div className="photographers-stage" onPointerDown={event=>setDragStart(event.clientX)} onPointerUp={event=>{if(dragStart!==null&&Math.abs(event.clientX-dragStart)>45) move(event.clientX<dragStart?1:-1);setDragStart(null)}} onPointerCancel={()=>setDragStart(null)}>
      {photographers.map((person,index)=>{const offset=distance(index); const visible=Math.abs(offset)<=2; return <a
        className={`photographer ${offset===0?'is-active':''}`}
        href={`https://www.instagram.com/${person.handle.slice(1)}/`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Ver el Instagram de ${person.name}`}
        aria-hidden={!visible}
        tabIndex={visible?0:-1}
        key={person.handle}
        style={{'--offset':offset} as React.CSSProperties}
        onClick={event=>{if(offset!==0){event.preventDefault();setActive(index)}}}
      >
        <span className="photographer-photo"><img src={person.image} alt="" loading="lazy" onError={event=>{event.currentTarget.style.display='none'}}/><span>{person.name.split(' ').map(word=>word[0]).slice(0,2).join('')}</span></span>
        <span className="photographer-copy"><strong>{person.name}</strong><em>{person.handle}</em></span>
      </a>})}
    </div>
    <div className="photographers-controls"><button onClick={()=>move(-1)} aria-label="Fotógrafo anterior">←</button><span>{String(active+1).padStart(2,'0')} / {String(photographers.length).padStart(2,'0')}</span><button onClick={()=>move(1)} aria-label="Fotógrafo siguiente">→</button></div>
    <p className="photographers-hint">Selecciona para centrar · abre Instagram desde el centro</p>
  </section>
}

function ProjectDetail({ item, onBack }: { item: GalleryItem; onBack: () => void }) {
  const series = item.related?.length ? item.related : [item.src]
  useEffect(()=>{ window.scrollTo({top:0,left:0,behavior:'instant'}) },[])
  return <motion.main className="detail-page" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.7}}>
    <SiteHeader internal/>
    <section className="project-page-hero"><motion.img initial={{scale:1.08}} animate={{scale:1}} transition={{duration:1.4,ease:[.22,1,.36,1]}} src={item.src} alt={item.title}/><div className="project-page-shade"/><motion.div className="project-page-title" initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{delay:.35,duration:.9}}><p>{item.category} — Proyecto</p><h1>{item.title}</h1><span>{item.note}</span></motion.div><button className="project-back" onClick={onBack}>← Volver al portafolio</button></section>
    <section className="detail-story"><motion.div {...reveal}><p className="eyebrow dark">La historia</p><h2>Una imagen con<br/><i>intención</i></h2></motion.div><motion.div className="detail-intro" {...reveal}><p>{item.description}</p><dl><div><dt>Talento</dt><dd>Alixson Valentina</dd></div><div><dt>Formato</dt><dd>{item.category}</dd></div><div><dt>Locación</dt><dd>Colombia</dd></div></dl><a className="button detail-cta" href="/contacto">Crear algo juntos <ArrowRight size={16}/></a></motion.div></section>
    {series.length > 1 && <section className="project-series" aria-label={`Serie fotográfica ${item.title}`}><div className="project-series-head"><p className="eyebrow dark">La serie completa</p><span>{String(series.length).padStart(2,'0')} imágenes</span></div><div>{series.map((src,index)=><motion.figure key={src} {...reveal} transition={{...reveal.transition,delay:(index%3)*.06}}><img src={src} alt={`${item.title} — imagen ${index+1}`} loading="lazy"/><figcaption>{String(index+1).padStart(2,'0')} / {String(series.length).padStart(2,'0')}</figcaption></motion.figure>)}</div></section>}
    <section className="detail-footer"><p>Flow, don’t force.</p><button onClick={onBack}>Explorar más proyectos <ArrowRight size={16}/></button></section><SiteFooter/><WhatsAppBubble/>
  </motion.main>
}

function ContentPage({ data, path }: { data: PageData; path:string }) {
  const [opened, setOpened] = useState<string | null>(null)
  const [flipped, setFlipped] = useState<string | null>(null)
  useEffect(()=>{ window.scrollTo({top:0,left:0,behavior:'instant'}) },[path])
  const openedInfo = gallery.find(g=>g.src===opened)
  const heroImage = path==='sobre-mi'?about:path==='portafolio'?runway1:path==='servicios'?runway3:path==='ugc'?outdoor2:path==='contacto'?outdoor1:data.hero
  const pageImages = data.images.filter(src=>src!==heroImage)
  return <><motion.div className={`content-page page-${path}`} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6}}><SiteHeader internal/>
    <section className="content-hero"><div className="content-hero-media"><motion.img initial={{scale:1.06}} animate={{scale:1}} transition={{duration:1.5,ease:[.22,1,.36,1]}} src={heroImage} alt={data.title}/></div><div className="content-hero-shade"/><div className="magazine-label">{data.label}</div><motion.div className="content-hero-copy" initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{delay:.3,duration:.9}}><p>{data.eyebrow}</p><h1>{data.title}<br/><i>{data.italic}</i></h1><span>{data.intro}</span></motion.div><div className="content-page-number">Alixson Valentina — {path.replace('-',' ')}</div></section>
    <section className="content-intro section"><motion.div {...reveal}><p className="eyebrow dark">La esencia</p><h2>{data.sectionTitle}</h2></motion.div><motion.div {...reveal}><p>{data.body}</p><a className="text-link" href="/contacto">Trabajemos juntos <ArrowRight size={16}/></a></motion.div></section>
    <section className="page-facts">{data.facts.map((fact,i)=><div key={fact}><span>0{i+1}</span><p>{fact}</p></div>)}</section>
    {path==='servicios'&&<section className="page-services section"><div className="service-grid">{services.map(s=><article key={s[1]}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><ArrowRight size={17}/></article>)}</div></section>}
    {path==='ugc'&&<section className="format-list section"><p className="eyebrow dark">Formatos disponibles</p><div>{['Unboxing','Product demo','Fashion try-on','Beauty / skincare','Lifestyle','Testimonial','Voice-over','Reels'].map((x,i)=><span key={x}>0{i+1} — {x}</span>)}</div></section>}
    <section className={`page-gallery ${pageImages.length>3?'page-gallery-wide':''} ${path==='proyectos'?'projects-gallery':''}`}>{pageImages.map((src,i)=>{const info=gallery.find(g=>g.src===src);return <motion.button className={path==='proyectos'&&flipped===src?'is-flipped':''} onClick={()=>path==='proyectos'&&setFlipped(flipped===src?null:src)} {...reveal} transition={{...reveal.transition,delay:(i%3)*.06}} key={src} aria-label={path==='proyectos'?`${flipped===src?'Cerrar':'Ver'} información del proyecto ${info?.title||i+1}`:undefined}>{path==='proyectos'?<div className="flip-inner"><div className="flip-front"><img src={src} alt={info?.title||`${data.title} ${i+1}`}/><span>Ver historia <ArrowRight size={15}/></span></div><div className="flip-back"><small>{info?.category||'Producción creativa'}</small><h3>{info?.title||'Selected Work'}</h3><em>{info?.note||'Editorial · Colombia'}</em><div className="rule"/><p>{info?.description||'Producción visual creada junto a un equipo creativo, explorando moda, expresión y narrativa.'}</p><dl><div><dt>Model</dt><dd>Alixson Valentina</dd></div><div><dt>Locación</dt><dd>Colombia</dd></div></dl><b>Volver a la imagen ↗</b></div></div>:<img src={src} alt={`${data.title} ${i+1}`}/>}</motion.button>})}</section>
    {path==='contacto'&&<section className="independent-contact section"><div><p className="eyebrow dark">Contacto directo</p><h2>Trabajemos<br/><i>juntos</i></h2><p>Popayán, Colombia</p><SocialLinks/></div><form action="https://formsubmit.co/alixsonpabon@unicauca.edu.co" method="POST"><input type="hidden" name="_subject" value="Nuevo mensaje desde el portafolio de Alixson"/><input type="hidden" name="_template" value="table"/><input className="form-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off"/><input required name="nombre" placeholder="Nombre"/><input required name="email" type="email" placeholder="Correo electrónico"/><input name="proyecto" placeholder="Marca / Proyecto"/><select name="tipo_de_colaboracion" defaultValue=""><option value="" disabled>Tipo de colaboración</option><option>Modelaje</option><option>UGC</option><option>Campaña</option><option>Editorial</option></select><textarea required name="mensaje" rows={5} placeholder="Cuéntame tu idea"/><button type="submit">Enviar mensaje <ArrowRight size={16}/></button></form></section>}
    <section className="page-cta"><p>¿Tienes una idea en mente?</p><a href="/contacto">Hagámosla realidad <ArrowRight/></a></section><SiteFooter/></motion.div>
    <AnimatePresence>{opened&&<motion.div className="project-sheet" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpened(null)}><motion.div initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:30,opacity:0}} onClick={e=>e.stopPropagation()}><button className="sheet-close" onClick={()=>setOpened(null)}><X/></button><img src={opened} alt={openedInfo?.title||'Proyecto de Alixson'}/><aside><p>{openedInfo?.category||'Producción creativa'}</p><h2>{openedInfo?.title||'Selected Work'}</h2><em>{openedInfo?.note||'Editorial · Colombia'}</em><div className="rule"/><p>{openedInfo?.description||'Una producción visual desarrollada junto a un equipo creativo, explorando moda, expresión y narrativa a través de la imagen.'}</p><dl><div><dt>Model</dt><dd>Alixson Valentina</dd></div><div><dt>Tipo</dt><dd>{openedInfo?.category||'Proyecto'}</dd></div><div><dt>Locación</dt><dd>Colombia</dd></div></dl><a href="/contacto">Crear un proyecto <ArrowRight/></a></aside></motion.div></motion.div>}</AnimatePresence>
  </>}

function App() {
  const [menu, setMenu] = useState(false)
  const [filter, setFilter] = useState<Category>('Todos')
  const [activePlan, setActivePlan] = useState(0)
  const [activeService, setActiveService] = useState(0)
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  const [routeSlug, setRouteSlug] = useState(() => window.location.pathname.startsWith('/proyecto/') ? decodeURIComponent(window.location.pathname.split('/').pop() || '') : '')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })
  const portfolioSpread = window.innerWidth <= 800 ? 0 : 90

  useEffect(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (navigation?.type !== 'reload') return
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    if (window.location.hash) window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}`)
    const goToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    goToTop()
    const frame = window.requestAnimationFrame(goToTop)
    const timer = window.setTimeout(goToTop, 80)
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(timer) }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setActivePlan(current => (current + 1) % plans.length), 7000)
    return () => window.clearInterval(timer)
  }, [])
  useEffect(() => {
    const timer = window.setInterval(() => setActiveService(current => (current + 1) % services.length), 5000)
    return () => window.clearInterval(timer)
  }, [])
  useEffect(() => { document.body.style.overflow = menu || selected ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [menu, selected])
  useEffect(() => { const pop = () => setRouteSlug(window.location.pathname.startsWith('/proyecto/') ? window.location.pathname.split('/').pop() || '' : ''); window.addEventListener('popstate', pop); return () => window.removeEventListener('popstate', pop) }, [])
  const visible = filter === 'Todos' ? portfolioProjects : portfolioProjects.filter(i => i.category === filter)
  const openProject = (item: GalleryItem) => { window.history.pushState({}, '', `/proyecto/${item.slug}`); setRouteSlug(item.slug); window.scrollTo(0,0) }
  const closeProject = () => { window.history.pushState({}, '', '/#portafolio'); setRouteSlug(''); setTimeout(()=>document.getElementById('portafolio')?.scrollIntoView(),0) }
  const detailItem = portfolioProjects.find(item => item.slug === routeSlug) || gallery.find(item => item.slug === routeSlug)
  const pagePath = window.location.pathname.replace(/^\/+|\/+$/g,'')

  if (detailItem) return <ProjectDetail item={detailItem} onBack={closeProject}/>
  if (pagePath && pages[pagePath]) return <ContentPage data={pages[pagePath]} path={pagePath}/>

  return <>
    <motion.div className="progress" style={{ scaleX }} />
    <SiteHeader />

    <main>
      <section id="inicio" className="hero">
        <motion.img className="hero-mobile-image" initial={{scale:1.12}} animate={{scale:1}} transition={{duration:1.8,ease:[.22,1,.36,1]}} src={hero} alt="Alixson Valentina" />
        <motion.img className="hero-desktop-image" initial={{scale:1.08}} animate={{scale:1}} transition={{duration:1.8,ease:[.22,1,.36,1]}} src={editorial} alt="Alixson Valentina en producción editorial" />
        <div className="hero-shade"/>
        <motion.div className="hero-copy" initial={{opacity:0,y:45}} animate={{opacity:1,y:0}} transition={{duration:1.2,delay:.3}}>
          <p className="eyebrow">Model · Content Creator · UGC</p>
          <h1><TypewriterWord text="ALIXSON"/><br/><em><TypewriterWord text="VALENTINA" delay={1.3}/></em></h1>
          <div className="hero-line"/>
          <p className="intro">Imagen, estilo y contenido<br/>para marcas con personalidad.</p>
          <div className="hero-meta"><MapPin size={13}/><span>Popayán, Colombia</span></div>
          <div className="hero-actions"><a className="button light" href="#portafolio">Ver portafolio <ArrowRight size={16}/></a><a className="hero-contact" href="#contacto">Trabajemos juntos</a></div>
        </motion.div>
        <div className="signature">Flow, don’t force.</div>
        <a className="scroll" href="#sobre-mi"><span>Descubre</span><ArrowDown size={15}/></a>
      </section>

      <section className="home-index">
        <div className="home-index-head"><p className="eyebrow dark">Explora el portafolio</p><h2>Una historia,<br/><i>muchas formas.</i></h2><p>Conoce cada faceta de Alixson a través de espacios independientes, creados para mirar con calma.</p></div>
        <a className="home-feature feature-about" href="/sobre-mi"><img src={about} alt="Sobre Alixson"/><div><span>01 — Perfil</span><h3>Sobre mí</h3><p>Disciplina, creatividad y autenticidad.</p><b>Conocer mi historia <ArrowRight size={17}/></b></div></a>
        <a className="home-feature feature-portfolio" href="/portafolio"><img src={flower} alt="Portafolio de Alixson"/><div><span>02 — Selección visual</span><h3>Portafolio</h3><p>Editorial, fashion, beauty y lifestyle.</p><b>Explorar imágenes <ArrowRight size={17}/></b></div></a>
        <a className="home-feature feature-projects" href="/proyectos"><img src={malvieFull} alt="Proyecto WARMI"/><div><span>03 — Producciones</span><h3>Proyectos</h3><p>Historias construidas con marcas y equipos creativos.</p><b>Ver proyectos <ArrowRight size={17}/></b></div></a>
        <div className="home-duo"><a href="/servicios"><img src={studio} alt="Servicios de modelaje"/><span>04</span><h3>Servicios</h3><p>Modelaje, campañas y contenido visual.</p><b>Descubrir servicios →</b></a><a href="/ugc"><img src={outdoor1} alt="Contenido UGC"/><span>05</span><h3>UGC & Content</h3><p>Contenido real para marcas reales.</p><b>Ver contenido UGC →</b></a></div>
        <a className="home-contact-card" href="/contacto"><span>06 — Contacto</span><h2>¿Creamos algo<br/><i>juntos?</i></h2><b>Cuéntame tu idea <ArrowRight/></b></a>
      </section>

      <section id="sobre-mi" className="about section home-detail">
        <motion.div className="about-photo" {...reveal}><img src={about} alt="Retrato de Alixson"/><span>01 — Sobre mí</span></motion.div>
        <motion.div className="about-copy" {...reveal} transition={{...reveal.transition,delay:.15}}>
          <p className="eyebrow dark">Una mirada personal</p><h2>Disciplina.<br/><i>Creatividad.</i><br/>Autenticidad.</h2>
          <div className="rule"/>
          <p>Soy Alixson Valentina, modelo y creadora de contenido radicada en Popayán, Colombia, actualmente representada por Status Agencia de Modelos.</p>
          <p>Mi trabajo vive entre la moda, la fotografía editorial y la creación de contenido: espacios donde puedo explorar conceptos y comunicar a través de la imagen.</p>
          <p>Me interesa crear imágenes con intención, adaptarme a distintas narrativas visuales y aportar una presencia auténtica a cada producción.</p>
          <div className="facts"><span>Popayán, Colombia</span><span>Modelo & Content Creator</span><span>Status Agencia de Modelos</span></div>
        </motion.div>
      </section>

      <PhotographersCarousel />

      <section className="quote home-detail"><motion.p {...reveal}>“Más que imágenes: <i>historias, intención y una forma propia de mirar.</i>”</motion.p></section>

      <section id="portafolio" className="portfolio section wide home-detail">
        <motion.div className="section-head" {...reveal}><div><p className="eyebrow dark">02 — Portafolio</p><h2>Historias en<br/><i>diferentes formas</i></h2></div><p>Una selección de editoriales, moda, belleza y contenido creado para conectar.</p></motion.div>
        <label className="mobile-filter"><span>Explorar categorías</span><select value={filter} onChange={event=>setFilter(event.target.value as Category)} aria-label="Seleccionar categoría del portafolio">{(['Todos','Editorial','Fashion','Beauty','Lifestyle','Runway','UGC'] as Category[]).map(category=><option key={category} value={category}>{category}</option>)}</select></label>
        <div className="filters">{(['Todos','Editorial','Fashion','Beauty','Lifestyle','Runway','UGC'] as Category[]).map(f=><button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div>
        <motion.div layout className="gallery"><AnimatePresence mode="popLayout">{visible.map((item,i)=><motion.button layout initial={{opacity:0,scale:.82,x:i%3===0?-portfolioSpread:i%3===2?portfolioSpread:0,y:70+(i%3)*22,rotate:i%2===0?-4:4}} whileInView={{opacity:1,scale:1,x:0,y:0,rotate:0}} viewport={{once:false,amount:.08}} exit={{opacity:0,scale:.88,y:25}} transition={{layout:{duration:.65,ease:[.22,1,.36,1]},duration:.85,delay:Math.min(i*.075,.65),ease:[.22,1,.36,1]}} className={`gallery-item item-${i%5}`} key={item.src} onClick={()=>openProject(item)} aria-label={`Abrir proyecto ${item.title}`}>
          <img src={item.src} alt={item.title} style={{objectPosition:item.position}}/><span className="image-overlay"><small>{item.category}</small><strong>{item.title}</strong><em>{item.note}</em></span>
        </motion.button>)}</AnimatePresence></motion.div>
      </section>

      <section id="proyectos" className="project home-detail">
        <div className="project-image"><img src={malvieFull} alt="WARMI para MALVIE Magazine"/></div>
        <motion.div className="project-copy" {...reveal}><p className="eyebrow">03 — Proyecto destacado</p><h2>WARMI</h2><h3>Published in<br/>MALVIE Magazine</h3><p>Una historia visual que celebra la fuerza, la identidad y la esencia femenina, construida junto a un equipo creativo de dirección de arte, fotografía, styling y producción.</p>
          <dl><div><dt>Art direction</dt><dd>Leyla DCA</dd></div><div><dt>Photography</dt><dd>Fritz Archive</dd></div><div><dt>Model</dt><dd>Alixson Valentina</dd></div><div><dt>Styling</dt><dd>María José Chaux</dd></div></dl>
          <a className="text-link" href="#contacto">Hablemos de tu proyecto <ArrowRight size={16}/></a></motion.div>
      </section>

      <section id="servicios" className="services section wide home-detail">
        <motion.div className="section-head services-head" {...reveal}><div><p className="eyebrow dark">04 — Servicios</p><h2>Contenido que <i>conecta</i></h2></div><p>Trabajo con marcas, agencias y proyectos creativos que buscan una imagen auténtica, estética y profesional.</p></motion.div>
        <div className="service-explorer">
          <div className="service-list">{services.map((s,i)=><button className={activeService===i?'is-active':''} key={s[1]} onClick={()=>setActiveService(i)} aria-pressed={activeService===i}><strong>{s[1]}</strong><ArrowRight size={16}/></button>)}</div>
          <AnimatePresence mode="wait"><motion.aside className="service-info" key={activeService} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.3}}>
            <span>Servicio {services[activeService][0]}</span><h3>{services[activeService][1]}</h3><p>{services[activeService][2]}</p><div className="service-for"><small>Ideal para</small><p>{serviceDetails[activeService].for}</p></div><small>Qué incluye</small><ul>{serviceDetails[activeService].includes.map(item=><li key={item}>{item}</li>)}</ul><a href={`https://api.whatsapp.com/send?phone=573204399635&text=Hola%20Alixson%2C%20quisiera%20consultar%20el%20servicio%20de%20${encodeURIComponent(services[activeService][1])}`} target="_blank" rel="noreferrer">Hablemos de este servicio <ArrowRight size={15}/></a>
          </motion.aside></AnimatePresence>
        </div>
      </section>

      <section id="planes" className="pricing section wide home-detail">
        <motion.div className="section-head" {...reveal}><div><p className="eyebrow dark">05 — Planes</p><h2>Elige cómo<br/><i>crear juntos</i></h2></div><p>Opciones base para marcas y emprendimientos. Cada propuesta puede adaptarse al alcance, la producción y los derechos de uso.</p></motion.div>
        <div className="pricing-accordion">
          <div className="pricing-progress" aria-label="Cambio automático de plan"><span key={activePlan}/></div>
          <div className="pricing-tabs" role="tablist" aria-label="Planes disponibles">
            {plans.map((plan, i) => <button key={plan.title} className={activePlan===i?'active':''} onClick={()=>setActivePlan(i)} role="tab" aria-selected={activePlan===i}><span>0{i+1}</span><b>{plan.title}</b><small>{plan.price}</small></button>)}
          </div>
          <motion.article className="pricing-detail" key={plans[activePlan].title} initial={{opacity:0,x:18}} animate={{opacity:1,x:0}} transition={{duration:.35}}>
            <div className="pricing-detail-top"><span>{plans[activePlan].label}</span><p className="price"><small>Desde</small> {plans[activePlan].price} <em>COP</em></p></div>
            <h3>{plans[activePlan].title}</h3><p className="pricing-detail-intro">{plans[activePlan].detail}</p>
            <ul>{plans[activePlan].items.map(item=><li key={item}>{item}</li>)}</ul>
            <a className="button pricing-cta" href={`https://api.whatsapp.com/send?phone=573204399635&text=Hola%20Alixson%2C%20me%20interesa%20el%20plan%20${encodeURIComponent(plans[activePlan].title)}`} target="_blank" rel="noreferrer">Consultar plan <ArrowRight size={16}/></a>
          </motion.article>
        </div><p className="pricing-note">Los precios son orientativos. Pauta publicitaria, exclusividad, desplazamientos, producción especial y derechos de uso extendidos se cotizan por separado.</p>
      </section>

      <section id="ugc" className="ugc home-detail">
        <div className="ugc-collage"><img src={whiteLook} alt="Fashion content"/><img src={sagitario2} alt="Brand content"/><img src={outdoor1} alt="Lifestyle content"/></div>
        <motion.div className="ugc-copy" {...reveal}><p className="eyebrow">05 — UGC & Content</p><h2>Contenido real<br/>para <i>marcas reales</i></h2><p>Creo contenido que combina una estética cuidada con una comunicación natural, listo para redes sociales, anuncios y campañas digitales.</p><div className="tags"><span>Unboxing</span><span>Fashion try-on</span><span>Beauty</span><span>Lifestyle</span><span>Testimonial</span><span>Reels</span></div><a href="#contacto" className="button light">Solicitar contenido UGC <ArrowRight size={16}/></a></motion.div>
      </section>

      <section className="home-reel photographers-reel"><div className="reel-copy"><p className="eyebrow">Modelaje en movimiento</p><h2>La imagen también<br/><i>cobra vida.</i></h2><p>Pasarela, expresión y movimiento en una pieza compartida desde Instagram.</p><a href="https://www.instagram.com/p/DLK9ubnO234/" target="_blank" rel="noreferrer">Ver en Instagram <ArrowRight size={17}/></a></div><div className="reel-frame"><iframe src="https://www.instagram.com/p/DLK9ubnO234/embed" title="Video de modelaje de Alixson en Instagram" loading="lazy" scrolling="no" tabIndex={-1} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/></div></section>

      <section id="contacto" className="contact section wide home-detail">
        <motion.div className="contact-title" {...reveal}><p className="eyebrow dark">06 — Contacto</p><h2>¿Tienes una<br/><i>idea en mente?</i></h2><p>Estoy abierta a campañas, colaboraciones, producciones editoriales, contenido UGC y proyectos creativos.</p><SocialLinks/></motion.div>
        <motion.form action="https://formsubmit.co/alixsonpabon@unicauca.edu.co" method="POST" {...reveal} transition={{...reveal.transition,delay:.1}}><input type="hidden" name="_subject" value="Nuevo mensaje desde el portafolio de Alixson"/><input type="hidden" name="_template" value="table"/><input className="form-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off"/><label>Nombre<input required name="nombre" placeholder="Tu nombre"/></label><label>Correo electrónico<input required name="email" type="email" placeholder="tu@email.com"/></label><label>Marca / Proyecto<input name="proyecto" placeholder="Cuéntame quién eres"/></label><label>Tipo de colaboración<select name="tipo_de_colaboracion" defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Modelaje</option><option>UGC</option><option>Campaña</option><option>Editorial</option><option>Contenido para redes</option><option>Otro</option></select></label><label className="full">Mensaje<textarea required name="mensaje" placeholder="Háblame de tu idea" rows={4}/></label><button className="submit" type="submit">Enviar mensaje <ArrowRight size={16}/></button></motion.form>
      </section>
    </main>

    <SiteFooter/>
    <WhatsAppBubble/>

    <AnimatePresence>{selected&&<motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><button aria-label="Cerrar"><X/></button><motion.img initial={{scale:.92}} animate={{scale:1}} exit={{scale:.94}} transition={{duration:.5}} src={selected.src} alt={selected.title}/><div><small>{selected.category}</small><h3>{selected.title}</h3><p>{selected.note}</p></div></motion.div>}</AnimatePresence>
  </>
}

export default App
