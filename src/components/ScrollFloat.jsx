import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  fontSize = ''
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    if (typeof children !== 'string' && !Array.isArray(children)) return null;

    const parts = Array.isArray(children) ? children : [{ text: children }];
    let globalIndex = 0;

    return parts.map((part, pIdx) => {
      if (part.br) return <br key={`br-${pIdx}`} className={part.className || ''} />;

      const text = typeof part === 'string' ? part : part.text;
      const colorClass = typeof part === 'object' ? part.className : '';

      return text.split('').map((char) => {
        const key = globalIndex++;
        return (
          <span 
            className={`char ${colorClass}`} 
            key={key} 
            style={{ fontSize: 'inherit' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      });
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');

    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`} style={{ fontSize }}>
      <span className={`scroll-float-text ${textClassName}`} style={{ fontSize: 'inherit' }}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
