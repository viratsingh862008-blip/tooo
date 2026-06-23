```react
import React, { useState, useEffect, useRef, useCallback, useMemo, memo, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  Crown, 
  Award,
  Check,
  Camera,
  QrCode,
  Target,
  MonitorSmartphone,
  Play,
  Instagram,
  Github,
  Cpu,
  Sparkles,
  Box,
  Layers,
  Code2,
  ArrowRight,
  Facebook,
  Twitter,
  Dribbble,
  Youtube,
  Linkedin
} from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// --- DATA CONSTANTS ---
const INTEGRATED_FEATURES = [
  { 
    title: "Brand-Oriented Strategies", 
    icon: Camera, 
    points: ["Custom-tailored incentive loops", "Turn foot traffic into ambassadors", "Organic, high-trust marketing", "Zero-cost acquisition frameworks", "Viral referral ecosystems"],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    title: "Google Profile Boost", 
    icon: QrCode, 
    points: ["Strategic reputation management", "Proprietary review funnels", "Dominate local search rankings", "Automated feedback loops", "Protect online image"],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    title: "Hyperlocal Campaigns", 
    icon: Target, 
    points: ["Geo-fenced targeting strategies", "High-intent buyer reach", "A/B tested performance optimization", "Occasion-specific creatives", "Localized trend hacking"],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    title: "Comprehensive Presence", 
    icon: MonitorSmartphone, 
    points: ["End-to-end social management", "Consistent, premium aesthetics", "Omnichannel brand alignment", "Community engagement protocols", "High-converting social funnels"],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    title: "Scalable Tech Systems", 
    icon: Github, 
    points: ["High-converting landing pages", "Real-time analytics integration", "Automated CRM pipelines", "Custom AI-driven dashboards", "Frictionless checkout flows"],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop'
  },
];

const FOUNDERS_DATA = [
  {
    name: "Aryan",
    tags: ["UI/UX Designer", "Web Developer", "Tech Architect"],
    description: "As the primary Tech Architect and Lead Magnet, Aryan is the driving force behind our software development. He engineers complex, high-performing web infrastructures and devises proprietary marketing algorithms designed for exponential scaling. His ability to fuse cutting-edge code with aggressive growth tactics creates seamless digital ecosystems that reliably capture and convert audiences.",
    avatarUrl: "https://www.image2url.com/r2/default/images/1782069562359-1fd84d1f-e374-47c9-8206-d11d9b69a814.png", 
    handle: "aryan",
    iconType: "code",
    theme: { pixel: "#38bdf8", bgDefault: "#082f49", bgActive: "#020617", border: "rgba(56, 189, 248, 0.3)", contrast: "#020617" },
    imageStyle: { objectPosition: "42% center" },
    links: [ 
      { icon: Instagram, url: "https://www.instagram.com/aryan.ps5?igsh=ZzJ0d203cHFpNzU3" }, 
      { icon: Github, url: "https://github.com/viratsingh862008-blip" },
      { icon: Linkedin, url: "https://www.linkedin.com/in/aryan-singh-0000a1390?utm_source=share_via&utm_content=profile&utm_medium=member_android" } 
    ]
  },
  {
    name: "Ayush",
    tags: ["Business Analyst", "Cinematography", "Management"],
    description: "Serving as our Creative Head, Ayush is a true Photo/Video Expert who elevates our visual storytelling to cinematic heights. He intricately weaves Data Analysis into his creative process, ensuring that every frame not only looks breathtaking but strategically engages the target demographic. His direction guarantees that our clients' digital identities are both striking and undeniably authoritative.",
    avatarUrl: "https://www.image2url.com/r2/default/images/1782096612763-5f054a3b-c722-4b3b-b919-772a340b29a3.png", 
    handle: "ayush",
    iconType: "camera",
    theme: { pixel: "#c084fc", bgDefault: "#3b0764", bgActive: "#170c1e", border: "rgba(192, 132, 252, 0.3)", contrast: "#170c1e" },
    links: [ { icon: Instagram, url: "https://www.instagram.com/ayu5h.singh?igsh=amdtZ2E5amJyN2Rz" } ]
  },
  {
    name: "Rudransh",
    tags: ["Data Analyst", "Growth Strategist", "Market Research"],
    description: "A masterful Data Analyst and Growth Strategist, Rudransh architects the operational excellence of our campaigns. Through rigorous Market Research, he maps out high-conversion client acquisition frameworks and constructs scalable growth models. His analytical precision ensures that every decision is backed by hard data, leading to optimized, reliable, and explosive brand growth.",
    avatarUrl: "https://www.image2url.com/r2/default/images/1782035817505-0ae992db-1d6e-4951-87e5-6d24ee362fda.jpg",
    handle: "rudransh",
    iconType: "chart",
    theme: { pixel: "#34d399", bgDefault: "#064e3b", bgActive: "#021a0f", border: "rgba(52, 211, 153, 0.3)", contrast: "#021a0f" },
    links: [ { icon: Instagram, url: "https://www.instagram.com/toshiro_yuna?igsh=N3F5YmZ6b3I0aGs3" } ]
  }
];

// Base Data for Tech Stack
const baseTechStack = [
  { icon: Sparkles, title: "OpenAI", color: "#00ffff" },     // Aqua Blue
  { icon: Cpu, title: "Anthropic", color: "#ff003c" },         // Stunning Red
  { icon: Code2, title: "React", color: "#00d8ff" },          // Neon Blue
  { icon: Layers, title: "Tailwind CSS", color: "#38bdf8" }, // Sky Blue
  { icon: Box, title: "Framer Motion", color: "#bb00ff" },   // Deep Purple
  { icon: Github, title: "GitHub", color: "#ffffff" },         // White
  { svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 1L24 22H0L12 1Z"/></svg>, title: "Vercel", color: "#ffcc00" }, // Gold Yellow
];

// Clean supportive glow nodes replacing the laggy animated border
const TECH_LOGOS = baseTechStack.map((tech) => {
  const Icon = tech.icon;
  return {
    title: tech.title,
    node: (
      <div className="py-2 px-2">
        <div 
          className="flex items-center gap-3 bg-[#0a0a0a] px-6 py-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 group"
          style={{
  border: '1px solid ' + tech.color + '50',
  boxShadow: '0 0 12px ' + tech.color + '30',
}}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 25px ${tech.color}80`;
            e.currentTarget.style.borderColor = tech.color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 12px ${tech.color}30`;
            e.currentTarget.style.borderColor = `${tech.color}50`;
          }}
        >
          {Icon ? <Icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ color: tech.color }} /> : <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ color: tech.color }}>{tech.svg}</span>}
          <span className="text-[#E1E0CC] font-bold text-sm tracking-widest uppercase">{tech.title}</span>
        </div>
      </div>
    )
  };
});

const NAV_ITEMS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Team", href: "#founders" },
  { label: "Inquire", href: "#inquire" },
];

// --- STYLES INJECTION ---
const StyleInjector = memo(() => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium');
    @import url('https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg');
    
    :root {
      --font-heading: 'HelveticaNowDisplay-Medium', 'Helvetica Neue', Arial, sans-serif;
      --font-body: 'HelveticaNowDisplayW01-Rg', 'Helvetica Neue', Arial, sans-serif;
      --card-radius: 30px;
    }
    
    body {
      font-family: var(--font-body);
      background-color: #000;
      color: #fff;
      overflow-x: hidden;
    }

    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee { display: flex; width: max-content; animation: marquee 40s linear infinite; }

    /* --- ROTATING TEXT CSS --- */
    .text-rotate { display: flex; flex-wrap: wrap; white-space: pre-wrap; position: relative; }
    .text-rotate-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    .text-rotate-word { display: inline-flex; }
    .text-rotate-lines { display: flex; flex-direction: column; width: 100%; }
    .text-rotate-element { display: inline-block; }
    .text-rotate-space { white-space: pre; }

    /* --- GOOEY NAV CSS --- */
    .gooey-nav-container { position: relative; }
    .gooey-nav-container nav { display: flex; position: relative; transform: translate3d(0, 0, 0.01px); }
    .gooey-nav-container nav ul { display: flex; gap: 2em; list-style: none; padding: 0 1em; margin: 0; position: relative; z-index: 3; color: rgba(225, 224, 204, 0.7); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; text-shadow: 0 1px 1px hsl(205deg 30% 10% / 0.2); }
    .gooey-nav-container nav ul li { border-radius: 100vw; position: relative; transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease; box-shadow: 0 0 0.5px 1.5px transparent; color: inherit; }
    .gooey-nav-container nav ul li a { display: inline-block; padding: 0.6em 1em; text-decoration: none; color: inherit; cursor: pointer; }
    .gooey-nav-container nav ul li:focus-within:has(:focus-visible) { box-shadow: 0 0 0.5px 1.5px white; }
    .gooey-nav-container nav ul li::after { content: ''; position: absolute; inset: 0; border-radius: 10px; background: #DEDBC8; opacity: 0; transform: scale(0); transition: all 0.3s ease; z-index: -1; }
    .gooey-nav-container nav ul li.active { color: black; text-shadow: none; }
    .gooey-nav-container nav ul li.active::after { opacity: 1; transform: scale(1); }
    .gooey-nav-container .effect { position: absolute; left: 0; top: 0; width: 0; height: 0; opacity: 1; pointer-events: none; display: grid; place-items: center; z-index: 1; }
    .gooey-nav-container .effect.text { color: rgba(225, 224, 204, 0.7); transition: color 0.3s ease; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
    .gooey-nav-container .effect.text.active { color: black; }
    .gooey-nav-container .effect.filter { filter: blur(7px) contrast(100) blur(0); mix-blend-mode: lighten; }
    .gooey-nav-container .effect.filter::before { content: ''; position: absolute; inset: -75px; z-index: -2; background: transparent; }
    .gooey-nav-container .effect.filter::after { content: ''; position: absolute; inset: 0; background: #DEDBC8; transform: scale(0); opacity: 0; z-index: -1; border-radius: 100vw; }
    .gooey-nav-container .effect.active::after { animation: pill 0.3s ease both; }
    @keyframes pill { to { transform: scale(1); opacity: 1; } }
    .particle, .point { display: block; opacity: 0; width: 20px; height: 20px; border-radius: 100%; transform-origin: center; }
    .particle { --time: 5s; position: absolute; top: calc(50% - 8px); left: calc(50% - 8px); animation: particle calc(var(--time)) ease 1 -350ms; }
    .point { background: var(--color); opacity: 1; animation: point calc(var(--time)) ease 1 -350ms; }
    @keyframes particle {
      0% { transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y))); opacity: 1; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
      70% { transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2)); opacity: 1; animation-timing-function: ease; }
      85% { transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y))); opacity: 1; }
      100% { transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)); opacity: 1; }
    }
    @keyframes point {
      0% { transform: scale(0); opacity: 0; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
      25% { transform: scale(calc(var(--scale) * 0.25)); }
      38% { opacity: 1; }
      65% { transform: scale(var(--scale)); opacity: 1; animation-timing-function: ease; }
      85% { transform: scale(var(--scale)); opacity: 1; }
      100% { transform: scale(0); opacity: 0; }
    }
    .preserve-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }

    /* --- PIXEL TRANSITION CSS --- */
    .pixelated-image-card { position: relative; overflow: hidden; }
    .pixelated-image-card__default, .pixelated-image-card__active, .pixelated-image-card__pixels { width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
    .pixelated-image-card__active { z-index: 2; display: none; }
    .pixelated-image-card__pixels { pointer-events: none; position: absolute; z-index: 3; top: 0; left: 0; width: 100%; height: 100%; }
    .pixelated-image-card__pixel { display: none; position: absolute; }

    /* --- LOGO LOOP CSS --- */
    .logoloop { position: relative; --logoloop-gap: 32px; --logoloop-logoHeight: 28px; --logoloop-fadeColorAuto: #000; }
    .logoloop--vertical { height: 100%; display: inline-block; }
    .logoloop--scale-hover { padding-top: calc(var(--logoloop-logoHeight) * 0.1); padding-bottom: calc(var(--logoloop-logoHeight) * 0.1); }
    .logoloop__track { display: flex; width: max-content; will-change: transform; user-select: none; position: relative; z-index: 0; }
    .logoloop__list { display: flex; align-items: center; margin: 0; padding: 0; list-style: none; }
    .logoloop__item { flex: 0 0 auto; margin-right: var(--logoloop-gap); font-size: var(--logoloop-logoHeight); line-height: 1; }
    .logoloop__node { display: inline-flex; align-items: center; }
    .logoloop--scale-hover .logoloop__item { overflow: visible; }
    .logoloop--scale-hover .logoloop__item:hover .logoloop__node { transform: scale(1.1); transform-origin: center center; }
    .logoloop--scale-hover .logoloop__node { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .logoloop__link { display: inline-flex; align-items: center; text-decoration: none; border-radius: 4px; transition: opacity 0.2s ease; }
    .logoloop__link:hover { opacity: 0.8; }
    .logoloop--fade::before, .logoloop--fade::after {
      content: ''; position: absolute; top: 0; bottom: 0; width: clamp(24px, 8%, 120px); pointer-events: none; z-index: 10;
    }
    .logoloop--fade::before { left: 0; background: linear-gradient(to right, var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%, rgba(0, 0, 0, 0) 100%); }
    .logoloop--fade::after { right: 0; background: linear-gradient(to left, var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%, rgba(0, 0, 0, 0) 100%); }
  `}} />
));

// --- HOOKS ---
const useIntersectionObserver = ({ once = true, margin = "0px" } = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setIsInView(false);
      }
    }, { rootMargin: margin });

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [margin, once]);

  return [ref, isInView];
};

// --- ROTATING TEXT COMPONENT ---
const RotatingText = forwardRef((props, ref) => {
  const {
    texts, transition = { type: 'spring', damping: 25, stiffness: 300 }, initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 }, exit = { y: '-120%', opacity: 0 }, animatePresenceMode = 'wait',
    animatePresenceInitial = false, rotationInterval = 2000, staggerDuration = 0, staggerFrom = 'first',
    loop = true, auto = true, splitBy = 'characters', onNext, mainClassName, splitLevelClassName, elementLevelClassName, ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = text => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), segment => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === 'characters') {
      const words = currentText.split(' ');
      return words.map((word, i) => ({ characters: splitIntoCharacters(word), needsSpace: i !== words.length - 1 }));
    }
    if (splitBy === 'words') { return currentText.split(' ').map((word, i, arr) => ({ characters: [word], needsSpace: i !== arr.length - 1 })); }
    if (splitBy === 'lines') { return currentText.split('\n').map((line, i, arr) => ({ characters: [line], needsSpace: i !== arr.length - 1 })); }
    return currentText.split(splitBy).map((part, i, arr) => ({ characters: [part], needsSpace: i !== arr.length - 1 }));
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback((index, totalChars) => {
    const total = totalChars;
    if (staggerFrom === 'first') return index * staggerDuration;
    if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
    if (staggerFrom === 'center') { const center = Math.floor(total / 2); return Math.abs(center - index) * staggerDuration; }
    if (staggerFrom === 'random') { const randomIndex = Math.floor(Math.random() * total); return Math.abs(randomIndex - index) * staggerDuration; }
    return Math.abs(staggerFrom - index) * staggerDuration;
  }, [staggerFrom, staggerDuration]);

  const handleIndexChange = useCallback(newIndex => { setCurrentTextIndex(newIndex); if (onNext) onNext(newIndex); }, [onNext]);
  const next = useCallback(() => { const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1; if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex); }, [currentTextIndex, texts.length, loop, handleIndexChange]);
  const previous = useCallback(() => { const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1; if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex); }, [currentTextIndex, texts.length, loop, handleIndexChange]);
  const jumpTo = useCallback(index => { const validIndex = Math.max(0, Math.min(index, texts.length - 1)); if (validIndex !== currentTextIndex) handleIndexChange(validIndex); }, [texts.length, currentTextIndex, handleIndexChange]);
  const reset = useCallback(() => { if (currentTextIndex !== 0) handleIndexChange(0); }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span className={cn('text-rotate', mainClassName)} {...rest} layout transition={transition}>
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span key={currentTextIndex} className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate')} layout aria-hidden="true">
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);
            return (
              <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span key={charIndex} initial={initial} animate={animate} exit={exit} transition={{ ...transition, delay: getStaggerDelay(previousCharsCount + charIndex, array.reduce((sum, word) => sum + word.characters.length, 0)) }} className={cn('text-rotate-element', elementLevelClassName)}>
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});
RotatingText.displayName = 'RotatingText';

// --- LOGO LOOP LOGIC ---
const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };
const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const useResizeObserver = (callback, elements, dependencies) => {
  const savedCallback = useRef(callback);
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleResize = () => {
      if (savedCallback.current) savedCallback.current();
    };

    if (!window.ResizeObserver) {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map(ref => {
      if (!ref?.current) return null;
      const observer = new ResizeObserver(handleResize);
      observer.observe(ref.current);
      return observer;
    });

    handleResize();

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies); 
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
    }

    const animate = timestamp => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;
      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;
        const transformValue = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

const LogoLoop = memo(
  ({
    logos, speed = 120, direction = 'left', width = '100%', logoHeight = 28,
    gap = 32, pauseOnHover, hoverSpeed, fadeOut = false, fadeOutColor,
    scaleOnHover = false, renderItem, ariaLabel = 'Partner logos', className, style
  }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);
    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === 'up' || direction === 'down';

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier;
      if (isVertical) {
        directionMultiplier = direction === 'up' ? 1 : -1;
      } else {
        directionMultiplier = direction === 'left' ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;
      
      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`) {
            containerRef.current.style.height = `${targetHeight}px`;
          }
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight));
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.min(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded), 30));
        } else {
          setCopyCount(ANIMATION_CONFIG.MIN_COPIES);
        }
      } else {
        if (sequenceWidth > 0) {
          setSeqWidth(Math.ceil(sequenceWidth));
          const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.min(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded), 30));
        } else {
          setCopyCount(ANIMATION_CONFIG.MIN_COPIES);
        }
      }
    }, [isVertical]);

    const refsArray = useMemo(() => [containerRef, seqRef], []);
    const depsArray = useMemo(() => [gap, logoHeight, isVertical, logos?.length], [gap, logoHeight, isVertical, logos?.length]);
    
    useResizeObserver(updateDimensions, refsArray, depsArray);
    useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
      }),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClassName = useMemo(
      () =>
        [
          'logoloop',
          isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
          fadeOut && 'logoloop--fade',
          scaleOnHover && 'logoloop--scale-hover',
          className
        ].filter(Boolean).join(' '),
      [isVertical, fadeOut, scaleOnHover, className]
    );

    const handleMouseEnter = useCallback(() => { if (effectiveHoverSpeed !== undefined) setIsHovered(true); }, [effectiveHoverSpeed]);
    const handleMouseLeave = useCallback(() => { if (effectiveHoverSpeed !== undefined) setIsHovered(false); }, [effectiveHoverSpeed]);

    const renderLogoItem = useCallback(
      (item, key) => {
        if (!item) return null;
        if (renderItem) return <li className="logoloop__item" key={key} role="listitem">{renderItem(item, key)}</li>;
        
        const isNodeItem = 'node' in item;
        const content = isNodeItem ? (
          <span className="logoloop__node cursor-pointer" aria-hidden={!!item.href && !item.ariaLabel}>{item.node}</span>
        ) : (
          <img src={item.src} alt={item.alt ?? ''} title={item.title} loading="lazy" decoding="async" draggable={false} />
        );
        const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
        const itemContent = item.href ? (
          <a className="logoloop__link cursor-pointer" href={item.href} aria-label={itemAriaLabel || 'logo link'} target="_blank" rel="noreferrer noopener">
            {content}
          </a>
        ) : content;
        return <li className="logoloop__item" key={key} role="listitem">{itemContent}</li>;
      },
      [renderItem]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul className="logoloop__list" key={`copy-${copyIndex}`} role="list" aria-hidden={copyIndex > 0} ref={copyIndex === 0 ? seqRef : undefined}>
            {(logos || []).map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem]
    );

    const containerStyle = useMemo(
      () => ({
        width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : (toCssLength(width) ?? '100%'),
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style, isVertical]
    );

    return (
      <div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
        <div className="logoloop__track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {logoLists}
        </div>
      </div>
    );
  }
);
LogoLoop.displayName = 'LogoLoop';

// --- GOOEY NAV COMPONENT ---
const GooeyNav = ({ items = [], animationTime = 600, particleCount = 15, particleDistances = [90, 10], particleR = 100, timeVariance = 300, colors = [1, 2, 3, 1, 2, 3, 1, 4], controlledActiveIndex }) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(controlledActiveIndex ?? 0);

  useEffect(() => {
    if (controlledActiveIndex !== undefined && controlledActiveIndex !== activeIndex) setActiveIndex(controlledActiveIndex);
  }, [controlledActiveIndex, activeIndex]);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t, scale: 1 + noise(0.2), color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = element => {
    if (!element) return;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, particleDistances, particleR);
      element.classList.remove('active');

      setTimeout(() => {
        if (!Number.isFinite(t) || !element) return;
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => element.classList.add('active'));
        setTimeout(() => {
          try { if(element && element.contains(particle)) element.removeChild(particle); } catch { }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = element => {
    if (!containerRef.current || !filterRef.current || !textRef.current || !element) return;
    try {
      const containerRect = containerRef.current.getBoundingClientRect();
      const pos = element.getBoundingClientRect();
      const styles = { left: `${pos.x - containerRect.x}px`, top: `${pos.y - containerRect.y}px`, width: `${pos.width}px`, height: `${pos.height}px` };
      Object.assign(filterRef.current.style, styles);
      Object.assign(textRef.current.style, styles);
      if (element.innerText) textRef.current.innerText = element.innerText;
    } catch(e) { /* silent catch */ }
  };

  const handleClick = (e, index) => {
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(e.currentTarget);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current.removeChild(p));
    }

    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }

    if (filterRef.current) makeParticles(filterRef.current);
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActiveLi) updateEffectPosition(currentActiveLi);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {(items || []).map((item, index) => (
            <li key={index} className={activeIndex === index ? 'active' : ''}>
              <a href={item.href} onClick={e => handleClick(e, index)} className="cursor-pointer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

// --- CONTINUOUS 3D CAROUSEL COMPONENT ---
const Continuous3DCarousel = ({ items }) => {
  const carouselRef = useRef(null);
  const rotationRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const lastRotation = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const animateRotation = () => {
      try {
        if (!isDragging.current) {
          rotationRef.current = (rotationRef.current - 0.15) % 360;
          if (carouselRef.current) {
            carouselRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
          }
        }
      } catch (e) {}
      animationFrameId = requestAnimationFrame(animateRotation);
    };
    animationFrameId = requestAnimationFrame(animateRotation);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    lastRotation.current = rotationRef.current;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const deltaX = clientX - dragStartX.current;
    rotationRef.current = (lastRotation.current + deltaX * 0.3) % 360;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const radius = isMobile ? 220 : 360;
  const itemWidth = isMobile ? 240 : 300;
  const itemHeight = isMobile ? 340 : 440;

  if (!items || items.length === 0) return null;

  return (
    <div 
      className="relative w-full h-[600px] md:h-[700px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing" 
      style={{ perspective: '1200px' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <div
        ref={carouselRef}
        className="relative preserve-3d"
        style={{ width: itemWidth, height: itemHeight, transform: `rotateY(0deg)` }}
      >
        {items.map((item, i) => {
          if (!item) return null;
          const angle = (i / items.length) * 360;
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="absolute inset-0 preserve-3d backface-hidden"
              style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/10 bg-[#101010] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative group">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-end pointer-events-none">
                  {Icon && (
                    <div className="bg-white/10 w-fit p-2.5 rounded-xl mb-3 backdrop-blur-md border border-white/5">
                      <Icon className="w-5 h-5 text-[#DEDBC8]" />
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl text-[#E1E0CC] font-medium mb-3 tracking-tight leading-tight">{item.title}</h3>
                  <ul className="space-y-2">
                    {(item.points || []).map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#DEDBC8] mt-0.5 flex-shrink-0" />
                        <span className="text-[#E1E0CC]/90 text-xs md:text-sm leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- PIXEL TRANSITION COMPONENT ---
function PixelTransition({ firstContent, secondContent, gridSize = 7, pixelColor = 'currentColor', animationStepDuration = 0.3, once = false, aspectRatio = '100%', iconType = null, themeContrastColor = '#000', className = '', style = {} }) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const svgs = {
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
    chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`
  };

  useEffect(() => {
    setIsTouchDevice(
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || 
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) || 
      window.matchMedia?.('(pointer: coarse)')?.matches)
    );
  }, []);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;
    pixelGridEl.innerHTML = '';
    
    const safeGridSize = Math.min(gridSize, 20);

    for (let row = 0; row < safeGridSize; row++) {
      for (let col = 0; col < safeGridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        const size = 100 / safeGridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;

        const innerBlock = document.createElement('div');
        innerBlock.style.width = '100%';
        innerBlock.style.height = '100%';
        innerBlock.style.backgroundColor = pixelColor;
        innerBlock.style.transform = 'scale(0.85)';
        innerBlock.style.borderRadius = '15%'; 
        innerBlock.style.display = 'flex';
        innerBlock.style.alignItems = 'center';
        innerBlock.style.justifyContent = 'center';

        if (iconType && svgs[iconType]) {
           innerBlock.innerHTML = `<div style="color: ${themeContrastColor}; width: 50%; height: 50%;">${svgs[iconType]}</div>`;
        }

        pixel.appendChild(innerBlock);
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor, iconType, themeContrastColor]);

  useEffect(() => {
    return () => {
      if (delayedCallRef.current) clearTimeout(delayedCallRef.current);
    };
  }, []);

  const animatePixels = activate => {
    setIsActive(activate);
    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = Array.from(pixelGridEl.querySelectorAll('.pixelated-image-card__pixel'));
    if (!pixels.length) return;

    if (delayedCallRef.current) clearTimeout(delayedCallRef.current);
    pixels.forEach(p => {
      if (p.timeout1) clearTimeout(p.timeout1);
      if (p.timeout2) clearTimeout(p.timeout2);
    });

    const totalPixels = pixels.length;
    const staggerDuration = (animationStepDuration * 1000) / totalPixels;
    const shuffledPixels = [...pixels].sort(() => Math.random() - 0.5);

    shuffledPixels.forEach((pixel, index) => {
      pixel.style.display = 'none';
      const delayIn = index * staggerDuration;
      pixel.timeout1 = setTimeout(() => { pixel.style.display = 'block'; }, delayIn);
      const delayOut = (animationStepDuration * 1000) + (index * staggerDuration);
      pixel.timeout2 = setTimeout(() => { pixel.style.display = 'none'; }, delayOut);
    });

    delayedCallRef.current = setTimeout(() => {
      if (activeRef.current) {
        activeRef.current.style.display = activate ? 'block' : 'none';
        activeRef.current.style.pointerEvents = activate ? 'none' : '';
      }
    }, animationStepDuration * 1000);
  };

  const handleEnter = () => { if (!isActive) animatePixels(true); };
  const handleLeave = () => { if (!isActive && !once) animatePixels(false); };
  const handleClick = () => { if (!isActive) animatePixels(true); else if (isActive && !once) animatePixels(false); };

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
      onFocus={!isTouchDevice ? handleEnter : undefined}
      onBlur={!isTouchDevice ? handleLeave : undefined}
      tabIndex={0}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default" aria-hidden={isActive}>{firstContent}</div>
      <div className="pixelated-image-card__active" ref={activeRef} aria-hidden={!isActive}>{secondContent}</div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
}

// --- PROFILE CARD COMPONENT ---
const PixelProfileCard = ({ name, avatarUrl, handle, status = 'Online', links = [], tags = [], description, imageStyle = {}, iconType, theme = {} }) => {
  const [showSocials, setShowSocials] = useState(false);

  return (
    <div className="w-full max-w-[320px] flex flex-col items-center gap-4">
      <div className="text-center z-10 w-full">
        <h3 className="text-3xl text-[#E1E0CC] font-bold tracking-tight mb-2">{name}</h3>
      </div>
      <div className="w-full group">
        <PixelTransition
          firstContent={
            <div className="w-full h-full relative" style={{ backgroundColor: theme.bgDefault || '#101010' }}>
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={imageStyle} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </div>
          }
          secondContent={
            <div className="w-full h-full border flex items-center justify-center p-6 shadow-2xl" style={{ backgroundColor: theme.bgActive || '#0a0a0a', borderColor: theme.border || 'rgba(255,255,255,0.1)' }}>
              <p className="text-[#E1E0CC]/90 text-sm md:text-sm leading-relaxed text-left font-medium">{description}</p>
            </div>
          }
          gridSize={12}
          pixelColor={theme.pixel || "#DEDBC8"}
          iconType={iconType}
          themeContrastColor={theme.contrast || "#000"}
          animationStepDuration={0.4}
          className="w-full rounded-[var(--card-radius)] border shadow-xl cursor-pointer"
          style={{ borderColor: theme.border || 'rgba(255,255,255,0.1)' }}
          aspectRatio="133.33%"
        />
      </div>

      <div className="w-full flex items-center justify-between px-2 mt-2">
        <div className="flex flex-col items-start">
          <span className="text-[#E1E0CC] font-medium text-sm tracking-wide">@{handle}</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,113,0.6)]" />
            <span className="text-white/50 text-[11px] font-semibold uppercase tracking-wider">{status}</span>
          </div>
        </div>
        
        <div className="relative h-10 flex items-center justify-end z-20">
          {!showSocials ? (
            <button
              style={{ borderColor: theme.border || 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' }}
              className="hover:border-[#DEDBC8]/60 cursor-pointer border transition-all duration-300 rounded-xl px-5 h-full text-xs font-bold uppercase tracking-widest text-[#E1E0CC]"
              onClick={(e) => { e.stopPropagation(); setShowSocials(true); }}
            >
              Connect
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }}
              style={{ backgroundColor: theme.bgActive || '#1a1a1a', borderColor: theme.border || 'rgba(255,255,255,0.2)' }}
              className="flex items-center gap-2 border rounded-xl px-3 h-full shadow-lg"
            >
              {(links || []).map((link, idx) => {
                const Icon = link.icon;
                if (!Icon) return null;
                return (
                  <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="p-2 hover:bg-white/10 cursor-pointer rounded-lg transition-colors group" onClick={(e) => e.stopPropagation()}>
                    <Icon className="w-5 h-5 text-[#DEDBC8] group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
              <div className="w-[1px] h-5 bg-white/10 mx-1" />
              <button onClick={(e) => { e.stopPropagation(); setShowSocials(false); }} className="p-2 cursor-pointer text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="w-full flex flex-wrap gap-2 justify-start px-2 mt-4">
        {(tags || []).map((t, idx) => (
          <span key={idx} style={{ borderColor: theme.border || 'rgba(255,255,255,0.1)', backgroundColor: theme.bgDefault || 'rgba(255,255,255,0.05)', color: theme.pixel || '#DEDBC8' }} className="text-[11px] font-bold tracking-widest uppercase border px-3 py-1.5 rounded-lg shadow-sm cursor-default">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

const FounderCard = ({ founder, index }) => {
  const [ref, isInView] = useIntersectionObserver({ once: true });
  return (
    <motion.div 
      ref={ref} className="w-full"
      style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ease-out ${index * 150}ms` }}
    >
      <div className="flex justify-center w-full relative z-10"><PixelProfileCard {...founder} /></div>
    </motion.div>
  );
};

const NoiseOverlay = () => (
  <div 
    className="pointer-events-none absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
);

const WordsPullUp = ({ text = "", className = "", delayOffset = 0, symbol = "" }) => {
  const [ref, isInView] = useIntersectionObserver({ once: true, margin: "-50px" });
  const words = (text || "").split(" ");
  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] relative inline-block transition-all duration-700 ease-out" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(40px)', transitionDelay: `${(delayOffset * 1000) + (i * 80)}ms` }}>
          {word}
          {symbol && i === words.length - 1 && <span className="absolute top-[0.1em] -right-[0.6em] text-[0.4em] text-[#DEDBC8]/60 font-light">{symbol}</span>}
        </span>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let currentIdx = 0;
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      NAV_ITEMS.forEach((item, index) => {
        const elementId = item.href.substring(1);
        if (!elementId) return;
        const element = document.getElementById(elementId);
        if (element && element.offsetTop <= scrollPosition) currentIdx = index;
      });
      setActiveSection(currentIdx);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 lg:px-16 py-6 pointer-events-none">
        
        {/* EASYPZ logo standard without animation as requested */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 px-6 py-3 flex items-center pointer-events-auto shadow-xl shadow-white/5">
          <span className="text-[#E1E0CC] font-black tracking-widest uppercase text-xl" style={{ fontFamily: 'var(--font-heading)' }}>EASYPZ</span>
        </div>

        <div className="hidden md:flex items-center bg-black/40 backdrop-blur-md rounded-full border border-white/10 px-3 py-2 pointer-events-auto shadow-xl shadow-white/5">
          <GooeyNav items={NAV_ITEMS} particleCount={15} particleDistances={[90, 10]} particleR={100} controlledActiveIndex={activeSection} animationTime={600} timeVariance={300} colors={[1, 2, 3, 1, 2, 3, 1, 4]} />
        </div>
        
        <div className="hidden md:block pointer-events-auto shadow-xl shadow-white/5">
          <a href="#inquire" className="cursor-pointer group flex items-center gap-2 border border-white/20 hover:border-white/60 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full text-[#E1E0CC] text-xs tracking-widest uppercase transition-all hover:bg-white/10">
            Get In Touch <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
        
        <button onClick={() => setIsOpen(true)} className="cursor-pointer md:hidden bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl text-white pointer-events-auto shadow-xl shadow-white/5"><Menu className="w-6 h-6" /></button>
      </nav>
      <div className={`fixed inset-0 z-[110] bg-black/95 backdrop-blur-lg transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
          <span className="text-[#E1E0CC] font-black tracking-widest uppercase text-xl">EASYPZ</span>
          <button onClick={() => setIsOpen(false)} className="cursor-pointer text-white p-2"><X className="w-8 h-8" /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-[80vh] gap-8">
          {NAV_ITEMS.map((link, i) => (
            <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="cursor-pointer text-4xl font-black text-[#E1E0CC] uppercase tracking-tighter" style={{ transitionDelay: `${isOpen ? i * 80 + 100 : 0}ms`, transform: isOpen ? 'translateY(0)' : 'translateY(20px)', opacity: isOpen ? 1 : 0, transition: 'all 0.5s ease-out' }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full p-4 md:p-6 overflow-hidden bg-black">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#0a0a0a]">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90" style={{ objectPosition: 'center 20%' }} src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4" />
        <NoiseOverlay />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 lg:px-16 pb-12 lg:pb-20 z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-2 mb-6">
            <Crown className="w-4 h-4 text-[#DEDBC8]" />
            <span className="text-[#DEDBC8] text-xs sm:text-sm tracking-[0.3em] uppercase font-medium">World-Class Digital Collective</span>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-row items-baseline">
              {/* RESTORED ORIGINAL STAGGERED HERO TEXT */}
              <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-[20vw] lg:text-[14vw] font-black text-[#E1E0CC] leading-[0.8] tracking-tighter uppercase">EASY</motion.span>
              <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-[16vw] lg:text-[11vw] font-black text-[#E1E0CC] leading-[0.8] tracking-tighter uppercase translate-y-[1.5vw] lg:translate-y-[1vw] -ml-[0.5vw]">PZ</motion.span>
              <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[5vw] lg:text-[3vw] text-[#DEDBC8]/60 font-light ml-2 self-start -translate-y-[4vw] cursor-pointer hover:text-white hover:-translate-y-[5vw] hover:scale-110 hover:rotate-12 transition-all duration-300">©</motion.span>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8 pb-4">
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-[#E1E0CC]/70 text-sm md:text-base leading-relaxed">
                We build fierce digital identities that don't just turn heads—they lead. Transforming local physical shops into high-converting digital powerhouses through presence, growth hacks, and scalable tech.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-wrap items-center gap-6">
                <a href="#arsenal" className="cursor-pointer group bg-[#DEDBC8] hover:bg-white text-black px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-3 transition-colors">
                  Join The Lab <div className="bg-black text-white p-1.5 rounded-full group-hover:scale-110 transition-transform"><ArrowUpRight className="w-4 h-4" /></div>
                </a>
                <div className="hidden sm:flex items-center gap-3">
                  <Award className="w-8 h-8 text-[#DEDBC8]/50" />
                  <div className="flex flex-col"><span className="text-[#E1E0CC]/60 text-[10px] tracking-widest uppercase">Premium</span><span className="text-[#E1E0CC]/60 text-[10px] tracking-widest uppercase">Growth Studio</span></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const words = ["3D VISUALS", "BRANDING", "GROWTH HACKS", "AI DASHBOARDS", "WEB DESIGN", "META ADS", "LOCAL SEO"];
  return (
    <div className="bg-black py-12 overflow-hidden border-y border-white/5 relative flex items-center z-[20]">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-[21]" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-[21]" />
      <div className="animate-marquee gap-16 px-8 relative z-[20]">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <span key={i} className="text-[#DEDBC8]/80 text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(222,219,200,0.4)] whitespace-nowrap">{word}</span>
        ))}
      </div>
    </div>
  );
};

const PhilosophyQuote = () => {
  return (
    <section id="philosophy" className="bg-black py-32 px-6 relative flex flex-col items-center justify-center min-h-[70vh] z-[20] overflow-hidden">
      {/* PHILOSOPHY VIDEO BACKGROUND ADDED HERE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-90"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
      </div>
      <NoiseOverlay />
      
      <div className="max-w-5xl mx-auto text-center relative z-20">
        <span className="text-[#DEDBC8] text-xs uppercase tracking-widest mb-8 block">The Philosophy</span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-light text-[#E1E0CC] leading-[1.1] tracking-tight">
          <WordsPullUp text="We are EASYPZ," delayOffset={0} className="font-serif italic mr-4" />
          <WordsPullUp text="a collective of strategists and creators." delayOffset={0.2} /><br/>
          <WordsPullUp text="Built for pure vision." delayOffset={0.5} className="text-[#E1E0CC]/50" />
          <WordsPullUp text="Powered by art." delayOffset={0.7} className="font-serif italic text-[#DEDBC8] ml-4" />
        </h2>
      </div>
    </section>
  );
};

const ArsenalSection = () => {
  return (
    <section id="arsenal" className="bg-black py-32 relative z-[20] overflow-hidden">
      {/* ARSENAL VIDEO BACKGROUND ADDED HERE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-90"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_214311_24de0b75-7eaa-4f42-86d8-8c2014ca2851.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
      </div>
      <NoiseOverlay />
      
      <div className="max-w-screen-xl mx-auto px-6 relative z-20">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <WordsPullUp text="Studio-grade workflows" className="text-3xl md:text-6xl text-[#E1E0CC] font-medium block mb-2" />
          <WordsPullUp text="for visionary local businesses." className="text-3xl md:text-6xl text-[#E1E0CC]/50 font-serif italic block" delayOffset={0.3} />
        </div>
        
        {/* REVERTED TO ORIGINAL CONTINUOUS 3D CAROUSEL */}
        <Continuous3DCarousel items={INTEGRATED_FEATURES} />
      </div>
    </section>
  );
};

const Ecosystem = () => {
  return (
    <section id="ecosystem" className="bg-[#101010] py-32 px-6 rounded-t-[3rem] relative z-[25] mt-[-2rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none rounded-t-[3rem] overflow-hidden">
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-50"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260520_111942_8fc50f9e-4dfd-45c1-81bb-d93342a23d87.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/40 to-[#101010]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl text-[#E1E0CC] font-medium tracking-tight mb-16 text-center">
          The <span className="font-serif italic text-[#DEDBC8]">Ecosystem</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative rounded-[2rem] overflow-hidden h-[500px] group border border-white/5">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10 w-full">
              <MonitorSmartphone className="w-8 h-8 text-[#DEDBC8] mb-4" />
              <h3 className="text-3xl text-[#E1E0CC] font-medium mb-3">Premium Landing Pages</h3>
              <p className="text-[#E1E0CC]/70 text-sm max-w-md">Ultra-modern, glassmorphic digital portfolios meticulously designed to bridge offline trust with digital convenience.</p>
            </div>
          </div>
          <div className="relative rounded-[2rem] overflow-hidden h-[500px] group border border-white/5 bg-black">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_182501_0216c2be-1b2f-40d3-8716-0d4f42e73b44.mp4" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10 w-full">
              <Play className="w-8 h-8 text-[#DEDBC8] mb-4" />
              <h3 className="text-3xl text-[#E1E0CC] font-medium mb-3">Cinematic Production</h3>
              <p className="text-[#E1E0CC]/70 text-sm max-w-md">High-end photography and immersive storytelling reels that capture the soul of your business.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FoundersSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const targetTime = useRef(0);

  const handlePointerMove = (clientX) => {
    try {
      if (!sectionRef.current || !videoRef.current || typeof clientX !== 'number') return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const progress = x / rect.width;
      const duration = videoRef.current.duration;
      if (duration && Number.isFinite(duration)) targetTime.current = progress * duration;
    } catch(e) { /* silent */ }
  };

  useEffect(() => {
    let isSeeking = false;
    let animationFrameId;
    const updateVideo = () => {
      try {
        if (videoRef.current && !isSeeking && Number.isFinite(targetTime.current)) {
          const diff = Math.abs(videoRef.current.currentTime - targetTime.current);
          if (diff > 0.05) { 
            isSeeking = true;
            videoRef.current.currentTime = targetTime.current;
          }
        }
      } catch (e) { /* silent catch for video play state */ }
      animationFrameId = requestAnimationFrame(updateVideo);
    };
    const handleSeeked = () => { isSeeking = false; };
    const videoEl = videoRef.current;
    if (videoEl) videoEl.addEventListener('seeked', handleSeeked);
    updateVideo();
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoEl) videoEl.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  return (
    <section 
      id="founders" ref={sectionRef} 
      onMouseMove={(e) => handlePointerMove(e.clientX)} 
      onTouchMove={(e) => handlePointerMove(e.touches?.[0]?.clientX ?? 0)}
      style={{ touchAction: 'pan-y' }} className="relative bg-black pt-40 pb-32 border-t border-white/10 z-20 min-h-screen flex flex-col justify-center overflow-hidden cursor-ew-resize"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 w-full h-[100dvh]">
          <video ref={videoRef} muted playsInline preload="auto" className="w-full h-full object-cover opacity-100" style={{ objectPosition: 'center center' }} src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full pointer-events-auto cursor-default">
        <div className="mb-20 text-center pointer-events-none">
          <WordsPullUp text="The Executive Team" className="text-4xl md:text-6xl text-[#E1E0CC] font-medium tracking-tight block mb-4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 place-items-center mb-16">
          {FOUNDERS_DATA.map((founder, i) => <FounderCard key={i} founder={founder} index={i} />)}
        </div>
        
        {/* LOGO LOOP WITH NEW BACKGROUND VIDEO */}
        <div className="w-full mt-24 pt-20 pb-16 relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* New Background Video for Tech Stack */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <video 
              autoPlay loop muted playsInline 
              className="w-full h-full object-cover opacity-70"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
          </div>

          <div className="relative z-10 text-center">
            <span className="text-[#DEDBC8] text-xs uppercase tracking-widest font-bold mb-12 block drop-shadow-md">
              Powered By The Best Platform Technologies
            </span>
            <div 
              className="w-full h-[120px] relative overflow-hidden" 
              style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
            >
              {/* Removed fadeOut Color and handled fading via CSS Mask above so the video shines through seamlessly */}
              <LogoLoop logos={TECH_LOGOS} speed={70} direction="left" logoHeight={56} gap={20} hoverSpeed={20} fadeOut={false} ariaLabel="Technology partners" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- SERVICES SHOWCASE WITH ROTATING TEXT ---
const ServicesShowcase = () => {
  return (
    <section className="bg-[#0a0a0a] py-32 px-6 border-y border-white/5 relative z-[20] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-90"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
      </div>
      <NoiseOverlay />
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-8 relative z-20">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#E1E0CC] tracking-tighter uppercase flex flex-col lg:flex-row items-center justify-center gap-4 w-full">
          {/* UPDATED TEXT TO EASYPZ FOR */}
          <span className="flex-shrink-0">EASYPZ FOR</span>
          <RotatingText
            texts={[
              'LANDING PAGES', 
              'SOCIAL MEDIA', 
              '3D WEBSITES', 
              'META ADS', 
              'LOCAL SEO', 
              'GROWTH HACKS'
            ]}
            mainClassName="px-4 sm:px-6 bg-[#DEDBC8] text-black overflow-hidden py-1 sm:py-2 justify-center rounded-2xl md:rounded-3xl shadow-[0_0_30px_rgba(222,219,200,0.2)] whitespace-nowrap min-w-max"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </h2>
        <p className="text-[#E1E0CC]/60 text-lg md:text-xl font-serif italic max-w-2xl mt-4">
          Transforming standard offline businesses into high-converting digital powerhouses. We specialize in rapid growth frameworks and premium visual aesthetics.
        </p>
      </div>
    </section>
  );
};

const FooterCTA = () => {
  return (
    <footer id="inquire" className="bg-black pt-32 pb-12 px-6 text-center relative overflow-hidden z-[20]">
      {/* LUMINOUS EARTH VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-100"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
        />
        {/* Lighter overlay for vivid visibility */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
      </div>
      <NoiseOverlay />
      
      <div className="relative z-20 max-w-4xl mx-auto">
        <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.85] font-black text-[#E1E0CC] tracking-tighter uppercase mb-10 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          Disrupt. <br/><span className="text-transparent" style={{ WebkitTextStroke: '2px #DEDBC8' }}>Conquer.</span>
        </h2>
        <p className="text-[#E1E0CC] text-lg md:text-xl max-w-2xl mx-auto mb-12 font-serif italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Stop competing on price. Start competing on presence, convenience, and brand authority.
        </p>
        <div className="flex flex-col items-center gap-6">
          <a href="mailto:ieasypz@gmail.com" className="cursor-pointer inline-flex items-center gap-4 bg-[#DEDBC8] text-black px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors group shadow-[0_0_20px_rgba(222,219,200,0.1)]">
            Initiate Project <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a href="mailto:ieasypz@gmail.com" className="cursor-pointer text-[#E1E0CC] hover:text-[#DEDBC8] text-sm tracking-widest transition-colors font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">ieasypz@gmail.com</a>
        </div>
      </div>
      
      {/* PERFECTLY RESTORED ORIGINAL FOOTER ENDING WITHOUT NEXOVA */}
      <div className="relative z-20 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[#E1E0CC]/80 text-xs tracking-widest uppercase">
        <span>© {new Date().getFullYear()} EASYPZ DIGITAL</span>
        <span>Built with precision by Aryan 🐐</span>
      </div>
    </footer>
  );
};

// --- ERROR BOUNDARY ---
class SafeBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, errorInfo: error }; }
  componentDidCatch(error) { console.error("SafeBoundary caught an error:", error); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#DEDBC8' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Application Error</h2>
            <p style={{ marginBottom: '2rem' }}>{this.state.errorInfo?.message || "Unknown error"}</p>
            <button onClick={() => window.location.reload()} style={{ padding: '0.5rem 1.5rem', border: '1px solid #DEDBC8', borderRadius: '9999px', cursor: 'pointer' }}>Reload Page</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <SafeBoundary>
      <div className="relative min-h-screen font-sans selection:bg-[#DEDBC8] selection:text-black overflow-x-hidden bg-black">
        <StyleInjector />
        <Navbar />
        <Hero />
        <Marquee />
        <PhilosophyQuote />
        <ArsenalSection />
        <Ecosystem />
        <FoundersSection />
        <ServicesShowcase />
        <FooterCTA />
      </div>
    </SafeBoundary>
  );
}










```
