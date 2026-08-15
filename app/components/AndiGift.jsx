'use client'

import { useEffect, useRef, useState } from 'react'

const STAR_COUNT = 140
const DOT_COUNT = 200

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function AndiGift() {
  const skyRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [unroll, setUnroll] = useState(false)
  const [slots, setSlots] = useState([
    { id: 1, img: null, rot: -4 },
    { id: 2, img: null, rot: 3 },
    { id: 3, img: null, rot: -2 },
    { id: 4, img: null, rot: 4 },
  ])
  const nextId = useRef(5)

  // build starfield once
  useEffect(() => {
    const sky = skyRef.current
    if (!sky || sky.childElementCount > 0) return
    for (let i = 0; i < STAR_COUNT; i++) {
      const s = document.createElement('div')
      const big = Math.random() < 0.15
      const size = big ? rand(1.6, 4) : rand(0.6, 2)
      s.style.position = 'absolute'
      s.style.left = rand(0, 100) + '%'
      s.style.top = rand(0, 100) + '%'
      s.style.width = size + 'px'
      s.style.height = size + 'px'
      s.style.borderRadius = '50%'
      s.style.background = '#f6f2e7'
      s.style.animation = `andi-twinkle ${rand(2, 5)}s ease-in-out infinite`
      s.style.animationDelay = rand(0, 4) + 's'
      s.style.setProperty('--minop', rand(0.15, 0.45))
      sky.appendChild(s)
    }
    for (let i = 0; i < DOT_COUNT; i++) {
      const d = document.createElement('div')
      d.style.position = 'absolute'
      d.style.left = rand(0, 100) + '%'
      d.style.top = rand(0, 100) + '%'
      d.style.width = '2px'
      d.style.height = '2px'
      d.style.borderRadius = '50%'
      d.style.background = 'rgba(246,242,231,0.5)'
      sky.appendChild(d)
    }
  }, [])

  // shooting stars, on a loop
  useEffect(() => {
    const sky = skyRef.current
    if (!sky) return
    let cancelled = false
    function fireShootingStar() {
      if (cancelled) return
      const star = document.createElement('div')
      const startX = rand(10, 70)
      const startY = rand(0, 30)
      star.style.position = 'absolute'
      star.style.left = startX + '%'
      star.style.top = startY + '%'
      star.style.width = '2px'
      star.style.height = '2px'
      star.style.borderRadius = '50%'
      star.style.background = '#ffffff'
      star.style.boxShadow = '0 0 6px 2px rgba(255,255,255,0.8)'
      sky.appendChild(star)
      const dx = rand(160, 260)
      const dy = rand(90, 150)
      star.animate(
        [
          { transform: 'translate(0,0)', opacity: 1, width: '2px' },
          { transform: `translate(${dx}px, ${dy}px)`, opacity: 0, width: '90px' },
        ],
        { duration: 1000, easing: 'ease-out' }
      )
      setTimeout(() => star.remove(), 1050)
      setTimeout(fireShootingStar, rand(3500, 8000))
    }
    const t = setTimeout(fireShootingStar, rand(1500, 3000))
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [])

  // cursor sparkle trail
  useEffect(() => {
    function onMove(e) {
      if (Math.random() > 0.75) return
      const s = document.createElement('div')
      s.style.position = 'fixed'
      s.style.left = e.clientX + 'px'
      s.style.top = e.clientY + 'px'
      s.style.width = '3px'
      s.style.height = '3px'
      s.style.borderRadius = '50%'
      s.style.background = '#f6f2e7'
      s.style.boxShadow = '0 0 6px 2px rgba(246,242,231,0.6)'
      s.style.pointerEvents = 'none'
      s.style.zIndex = 50
      document.body.appendChild(s)
      s.animate(
        [
          { transform: 'translate(0,0) scale(1)', opacity: 0.9 },
          { transform: `translate(${rand(-10, 10)}px, ${rand(10, 26)}px) scale(0.2)`, opacity: 0 },
        ],
        { duration: 700, easing: 'ease-out' }
      )
      setTimeout(() => s.remove(), 720)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const [hearts, setHearts] = useState(false)
  useEffect(() => {
    if (!hearts) return
    let cancelled = false
    function drop() {
      if (cancelled) return
      const h = document.createElement('div')
      h.textContent = '♥'
      h.style.position = 'fixed'
      h.style.left = rand(5, 95) + '%'
      h.style.top = '-30px'
      h.style.color = ['#d9b872', '#e39aa0', '#f6f2e7'][Math.floor(Math.random() * 3)]
      h.style.fontSize = rand(14, 26) + 'px'
      h.style.zIndex = 55
      h.style.pointerEvents = 'none'
      document.body.appendChild(h)
      const anim = h.animate(
        [
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${window.innerHeight + 60}px) rotate(${rand(-40, 40)}deg)`, opacity: 0.2 },
        ],
        { duration: rand(4000, 7000), easing: 'linear' }
      )
      anim.onfinish = () => h.remove()
      setTimeout(drop, rand(300, 700))
    }
    drop()
    return () => {
      cancelled = true
    }
  }, [hearts])

  const [typed, setTyped] = useState('')
  const fullTitle = 'hello andi'
  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      i++
      setTyped(fullTitle.slice(0, i))
      if (i >= fullTitle.length) clearInterval(iv)
    }, 110)
    return () => clearInterval(iv)
  }, [])

  function burstConfetti() {
    const colors = ['#f6f2e7', '#d9b872', '#e3d3a6', '#ffffff']
    for (let i = 0; i < 26; i++) {
      const b = document.createElement('div')
      b.style.position = 'fixed'
      b.style.left = '50%'
      b.style.top = '38%'
      b.style.width = '8px'
      b.style.height = '8px'
      b.style.borderRadius = '50%'
      b.style.zIndex = 60
      b.style.pointerEvents = 'none'
      b.style.background = colors[Math.floor(Math.random() * colors.length)]
      document.body.appendChild(b)
      const angle = Math.random() * Math.PI * 2
      const dist = rand(120, 340)
      const dx = Math.cos(angle) * dist
      const dy = Math.sin(angle) * dist - 60
      b.animate(
        [
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px) scale(0.3)`, opacity: 0 },
        ],
        { duration: rand(900, 1400), easing: 'cubic-bezier(.2,.7,.3,1)' }
      )
      setTimeout(() => b.remove(), 1600)
    }
  }

  function openNote() {
    setOpen(true)
    setTimeout(() => setUnroll(true), 480)
    setTimeout(burstConfetti, 480)
  }

  function closeNote() {
    setUnroll(false)
    setOpen(false)
  }

  function replay() {
    setUnroll(false)
    requestAnimationFrame(() => setTimeout(() => setUnroll(true), 30))
  }

  function handleFile(id, file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setSlots((prev) =>
        prev.map((s) => (s.id === id ? { ...s, img: e.target.result } : s))
      )
    }
    reader.readAsDataURL(file)
  }

  function addSlot() {
    setSlots((prev) => [
      ...prev,
      { id: nextId.current++, img: null, rot: rand(-6, 6) },
    ])
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#05060c', overflow: 'hidden', fontFamily: 'Georgia, serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Cinzel+Decorative:wght@400;700&family=Caveat:wght@500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        @keyframes andi-twinkle {
          0%,100% { opacity: var(--minop); transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes andi-blink {
          0%,50% { opacity: 1; }
          51%,100% { opacity: 0; }
        }
        @keyframes andi-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes andi-wobble {
          0%,100% { transform: rotate(0deg); }
          92% { transform: rotate(0deg); }
          94% { transform: rotate(-4deg); }
          96% { transform: rotate(4deg); }
          98% { transform: rotate(-2deg); }
        }
        @keyframes andi-unroll {
          0% { transform: scaleY(0.05); opacity: 0.4; }
          60% { opacity: 1; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes andi-reveal {
          0% { clip-path: inset(0 0 100% 0); }
          100% { clip-path: inset(0 0 0% 0); }
        }
        @keyframes andi-riseIn {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .andi-btn { animation: andi-fadein 1.2s ease forwards, andi-wobble 3.2s ease-in-out infinite; animation-delay: 0.2s, 1.8s; }
        .andi-btn:hover { background: rgba(246,242,231,0.14) !important; box-shadow: 0 0 30px rgba(246,242,231,0.25); }
        .andi-btn:active { transform: scale(0.92) rotate(-3deg); }
        .andi-imgSlot:hover { transform: scale(1.06) !important; }

        /* ===== DESKTOP (default, >900px): wide canvas, text wraps around floated photos ===== */
        .andi-letter { padding: 90px 10vw 140px; max-width: 900px; }
        .andi-imgSlot-float { width: 230px; }
        .andi-body-text { font-size: 1.55rem; text-align: left; font-family: 'VT323', monospace; color: #2b2140; }
        .andi-dropcap { font-size: 4.4rem; }
        .andi-title { font-size: clamp(1.4rem, 2.6vw, 2.1rem); }

        .andi-float-left { margin: 6px 34px 20px 0; float: left; }
        .andi-float-right { margin: 6px 0 20px 34px; float: right; }
        .andi-header { text-align: left; }
        .andi-header-rule { margin-left: 0; }

        /* ===== TABLET (≤900px) ===== */
        @media (max-width: 900px) {
          .andi-letter { padding: 60px 7vw 130px; max-width: 640px; }
          .andi-imgSlot-float { width: 160px; }
          .andi-body-text { font-size: 1.35rem; }
          .andi-dropcap { font-size: 3.6rem; }
          .andi-float-left { margin: 4px 22px 16px 0; }
          .andi-float-right { margin: 4px 0 16px 22px; }
        }

        /* ===== MOBILE (≤640px): smaller floats so text still wraps around them, like the sketch ===== */
        @media (max-width: 640px) {
          .andi-letter { padding: 44px 7vw 160px; max-width: 100%; }
          .andi-imgSlot-float { width: 42vw; max-width: 165px; }
          .andi-body-text { font-size: 1.2rem; line-height: 1.6; text-align: left; }
          .andi-dropcap { font-size: 2.6rem; float: none; display: block; margin: 0 0 4px; }
          .andi-title { font-size: clamp(1.1rem, 6vw, 1.5rem); }
          .andi-float-left { margin: 4px 14px 14px 0; }
          .andi-float-right { margin: 4px 0 14px 14px; }
          .andi-header { text-align: center; }
          .andi-header-stars { }
          .andi-header-rule { margin: 0 auto; }
          .andi-celebrate-gif { width: 64px !important; }
        }

        /* ===== floating toolbar: solid on mobile, never wraps ===== */
        .andi-toolbar {
          position: fixed;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: nowrap;
          max-width: calc(100vw - 24px);
          overflow-x: auto;
          z-index: 20;
          background: #f1e4c3;
          padding: 8px 10px;
          border-radius: 30px;
          border: 1px solid rgba(43,28,16,0.25);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .andi-toolbar-btn {
          font-family: 'Caveat', cursive;
          font-weight: 700;
          font-size: 1.05rem;
          padding: 8px 18px;
          border-radius: 20px;
          border: 1px solid rgba(43,28,16,0.4);
          background: rgba(255,255,255,0.35);
          color: #2b1c10;
          cursor: pointer;
          letter-spacing: 0.03em;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .andi-toolbar-btn:active { transform: scale(0.94); }

        /* ===== pixel-art letter, retro game dialogue box style ===== */
        .andi-stage {
          background:
            repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 4px),
            radial-gradient(ellipse at 50% 0%, #241a3d 0%, transparent 60%),
            linear-gradient(160deg, #140f24 0%, #0c0918 55%, #08060f 100%);
          image-rendering: pixelated;
        }
        .andi-desk-scrap {
          position: fixed;
          pointer-events: none;
          z-index: 1;
          opacity: 0.5;
          background: repeating-linear-gradient(90deg, #ffd257 0px, #ffd257 6px, transparent 6px, transparent 12px);
          box-shadow: 0 0 0 4px #241a3d;
        }
        .andi-desk-scrap-1 { width: 40px; height: 40px; top: 40px; left: 40px; transform: rotate(0deg); }
        .andi-desk-scrap-2 { width: 28px; height: 28px; bottom: 60px; right: 60px; transform: rotate(0deg); background: repeating-linear-gradient(90deg, #6ee7ff 0px, #6ee7ff 5px, transparent 5px, transparent 10px); }

        .andi-paper {
          position: relative;
          z-index: 7;
          max-width: 900px;
          margin: 70px auto 90px;
          background: #fdf3e0;
          image-rendering: pixelated;
          box-shadow:
            0 0 0 4px #2b2140,
            0 0 0 8px #fdf3e0,
            0 0 0 12px #2b2140,
            10px 10px 0 12px rgba(0,0,0,0.35);
          clip-path: polygon(
            0 18px, 18px 18px, 18px 0,
            calc(100% - 18px) 0, calc(100% - 18px) 18px, 100% 18px,
            100% calc(100% - 18px), calc(100% - 18px) calc(100% - 18px), calc(100% - 18px) 100%,
            18px 100%, 18px calc(100% - 18px), 0 calc(100% - 18px)
          );
        }
        .andi-stain { display: none; }
        @media (max-width: 640px) {
          .andi-paper { margin: 40px 8px 60px; }
        }
        @media (max-width: 640px) {
          .andi-toolbar { bottom: 12px; gap: 6px; padding: 7px 8px; }
          .andi-toolbar-btn { font-size: 0.85rem; padding: 6px 11px; }
        }
      `}</style>

      <div
        ref={skyRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% -10%, #10131f 0%, #05060c 60%)',
          zIndex: 0,
        }}
      />

      {/* Landing */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: open ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 24,
          color: '#f6f2e7',
        }}
      >
        <img
          src="/cake.gif"
          alt="birthday cake"
          style={{
            width: 'clamp(110px, 20vw, 160px)',
            marginBottom: 18,
            filter: 'drop-shadow(0 0 24px rgba(246,242,231,0.35))',
            animation: 'andi-fadein 1s ease forwards',
          }}
        />
        <h1
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(1.1rem, 5vw, 2rem)',
            fontWeight: 400,
            margin: '0 0 18px 0',
            letterSpacing: '0.02em',
            textShadow: '3px 3px 0 #ff6b81',
            minHeight: '1.2em',
            lineHeight: 1.6,
          }}
        >
          {typed}
          <span style={{ animation: 'andi-blink 1s step-end infinite' }}>|</span>
        </h1>
        <p
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 'clamp(1.3rem, 4vw, 1.7rem)',
            letterSpacing: '0.02em',
            color: '#c9c3b4',
            margin: '0 0 60px 0',
            animation: 'andi-fadein 1.4s ease forwards',
            animationDelay: '0.3s',
          }}
        >
          a small smtg from my side
        </p>

        <button
          className="andi-btn"
          onClick={openNote}
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontWeight: 400,
            fontSize: '0.85rem',
            padding: '18px 30px',
            borderRadius: 0,
            border: 'none',
            background: '#ff6b81',
            color: '#fdf3e0',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            boxShadow: '0 0 0 3px #2b2140, 0 0 0 6px #fdf3e0, 0 0 0 9px #2b2140, 6px 6px 0 9px rgba(0,0,0,0.4)',
            transition: 'transform 0.1s',
          }}
        >
          click me
        </button>
        <div style={{ marginTop: 20, fontSize: '0.7rem', fontFamily: "'VT323', monospace", color: '#8b8474', letterSpacing: '0.05em' }}>
          (go on, tap it)
        </div>
      </div>

      {/* Full-screen letter — no card, no backdrop, the letter IS the screen */}
      {open && (
        <div
          className="andi-stage"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5,
            overflowY: 'auto',
            overflowX: 'hidden',
            color: '#3a2a1a',
            animation: unroll ? 'andi-reveal 1s cubic-bezier(.6,0,.2,1) forwards' : 'none',
            clipPath: unroll ? undefined : 'inset(0 0 100% 0)',
          }}
        >
          {/* faded newsprint-style scraps behind the letter, like paper on a desk */}
          <div className="andi-desk-scrap andi-desk-scrap-1" />
          <div className="andi-desk-scrap andi-desk-scrap-2" />

          {/* pixel close button */}
          <button
            onClick={closeNote}
            aria-label="close"
            style={{
              position: 'fixed',
              top: 22,
              right: 22,
              width: 40,
              height: 40,
              borderRadius: 0,
              background: '#ff6b81',
              border: 'none',
              boxShadow: '0 0 0 3px #2b2140, 0 0 0 6px #fdf3e0, 0 0 0 9px #2b2140',
              color: '#fdf3e0',
              fontSize: '1.1rem',
              fontFamily: "'Press Start 2P', monospace",
              cursor: 'pointer',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            X
          </button>

          <div className="andi-paper">
            {/* ink stains + rose-water splotches, purely decorative */}
            <div className="andi-stain andi-stain-1" />
            <div className="andi-stain andi-stain-2" />
            <div className="andi-stain andi-stain-3" />

            <div className="andi-letter" style={{ position: 'relative', zIndex: 7 }}>
            <div
              style={{
                animation: unroll ? 'andi-riseIn 0.9s ease 0.35s both' : 'none',
                opacity: unroll ? undefined : 0,
              }}
              className="andi-header"
            >
              <div className="andi-header-stars" style={{ fontSize: '1.6rem', letterSpacing: '0.3em', opacity: 0.5, marginBottom: 6, color: '#2b2140' }}>✦ ✦ ✦</div>
              <img
                src="/celebrate.gif"
                alt="celebrating penguin"
                className="andi-celebrate-gif"
                style={{ width: 90, marginBottom: 10, imageRendering: 'pixelated' }}
              />
              <h2 className="andi-title" style={{ fontFamily: "'Press Start 2P', monospace", fontWeight: 400, margin: '0 0 16px 0', color: '#2b2140', textShadow: '3px 3px 0 #ffd257' }}>
                for andi
              </h2>
              <div className="andi-header-rule" style={{ width: 160, height: 6, background: 'repeating-linear-gradient(90deg, #2b2140 0px, #2b2140 8px, transparent 8px, transparent 16px)', margin: '0 0 50px' }} />
            </div>

            {/* letter body — one continuous flow of text, photos floated inline so text wraps around them */}
            <div
              className="andi-flow"
              style={{
                fontFamily: "'VT323', monospace",
                lineHeight: 1.5,
                animation: unroll ? 'andi-riseIn 0.9s ease 0.55s both' : 'none',
                opacity: unroll ? undefined : 0,
              }}
            >
              <span
                className="andi-dropcap"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  float: 'left',
                  lineHeight: 0.8,
                  padding: '10px 14px 6px 0',
                  color: '#ff6b81',
                }}
              >
                H
              </span>

              {slots[0] && <Polaroid slot={slots[0]} onFile={(f) => handleFile(slots[0].id, f)} floatSide="right" />}

              <p
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                className="andi-body-text"
                style={{ margin: '0 0 22px 0', outline: 'none' }}
              >
                {`ey andi, Just a little corner of the internet made for you. I wanted to put together something that felt a bit more personal than a text message, something you could actually sit with for a minute instead of scrolling past in half a second.`}
              </p>

              {slots[1] && <Polaroid slot={slots[1]} onFile={(f) => handleFile(slots[1].id, f)} round floatSide="left" />}

              <p
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                className="andi-body-text"
                style={{ fontStyle: 'italic', margin: '0 0 22px 0', outline: 'none' }}
              >
                {`Click any picture to drop in your own photo, and click anywhere in this text to rewrite it exactly how you want it to read. Swap in the little memories that actually mean something — a photo from that one trip, an inside joke, whatever makes this feel like yours instead of a template.`}
              </p>

              {slots[2] && <Polaroid slot={slots[2]} onFile={(f) => handleFile(slots[2].id, f)} round floatSide="right" />}

              <p
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                className="andi-body-text"
                style={{ margin: '0 0 22px 0', outline: 'none' }}
              >
                {`Here's to you — happy birthday, and here's a small smtg from my side. I hope this year treats you gently and gives you exactly the kind of moments worth remembering, the ones you'll want to look back on and smile about later.`}
              </p>

              {slots[3] && <Polaroid slot={slots[3]} onFile={(f) => handleFile(slots[3].id, f)} floatSide="left" />}

              <p
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                className="andi-body-text"
                style={{ margin: '0 0 22px 0', outline: 'none' }}
              >
                {`Anyway, that's enough rambling from me. Just know that this little page exists somewhere on the internet, made with you in mind, and it'll still be here whenever you feel like coming back to it.`}
              </p>

              <div style={{ clear: 'both' }} />
            </div>

            {slots.slice(3).length > 0 && (
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', margin: '20px 0 36px', justifyContent: 'center' }}>
                {slots.slice(3).map((slot) => (
                  <Polaroid key={slot.id} slot={slot} onFile={(f) => handleFile(slot.id, f)} />
                ))}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, marginTop: 50, clear: 'both' }}>
              <img
                src="/cat-love.gif"
                alt="party cat"
                style={{
                  width: 64,
                  transform: 'rotate(-6deg)',
                  animation: unroll ? 'andi-riseIn 0.9s ease 0.75s both' : 'none',
                }}
              />
              <div
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                style={{
                  fontFamily: "'VT323', monospace",
                  fontWeight: 700,
                  textAlign: 'right',
                  fontSize: '2.2rem',
                  color: '#2b2140',
                  opacity: 0.9,
                  outline: 'none',
                  animation: unroll ? 'andi-riseIn 0.9s ease 0.75s both' : 'none',
                }}
              >
                — with love
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Polaroid({ slot, onFile, round, floatSide }) {
  return (
    <label
      className={`andi-imgSlot andi-imgSlot-float ${floatSide === 'left' ? 'andi-float-left' : floatSide === 'right' ? 'andi-float-right' : ''}`}
      style={{
        display: 'block',
        background: '#fdf3e0',
        padding: 8,
        borderRadius: 0,
        boxShadow: `0 0 0 4px #2b2140, 0 0 0 8px ${round ? '#6ee7ff' : '#ffd257'}, 6px 6px 0 8px rgba(0,0,0,0.3)`,
        transform: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.15s',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: 0,
          background: slot.img ? `url(${slot.img}) center/cover` : 'repeating-linear-gradient(45deg, #ecd9b0, #ecd9b0 8px, #ddc48a 8px, #ddc48a 16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'VT323', monospace",
          color: 'rgba(43,28,16,0.6)',
          fontSize: '1.3rem',
          imageRendering: slot.img ? 'auto' : 'pixelated',
        }}
      >
        {!slot.img && <span>+ photo</span>}
      </div>
      <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files[0])} style={fileInputStyle} />
    </label>
  )
}

const fileInputStyle = { position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }
