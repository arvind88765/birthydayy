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
  ])
  const nextId = useRef(4)

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
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Caveat:wght@500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
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

        .andi-letter { padding: 64px 12vw 120px; }
        .andi-imgSlot-float { width: 200px; }
        .andi-body-text { font-size: 1.45rem; }
        .andi-dropcap { font-size: 5.2rem; }
        .andi-title { font-size: clamp(2.2rem, 6vw, 3.4rem); }

        @media (max-width: 900px) {
          .andi-letter { padding: 54px 8vw 130px; }
          .andi-imgSlot-float { width: 150px; }
        }
        @media (max-width: 640px) {
          .andi-letter { padding: 44px 6vw 150px; }
          .andi-imgSlot-float { width: 42vw; max-width: 190px; }
          .andi-body-text { font-size: 1.15rem; line-height: 1.8; }
          .andi-dropcap { font-size: 3.6rem; }
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
        <h1
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(2rem, 7vw, 3.6rem)',
            fontWeight: 700,
            margin: '0 0 14px 0',
            letterSpacing: '0.04em',
            textShadow: '0 0 24px rgba(246,242,231,0.35), 0 0 2px rgba(246,242,231,0.6)',
            minHeight: '1.2em',
          }}
        >
          {typed}
          <span style={{ animation: 'andi-blink 1s step-end infinite' }}>|</span>
        </h1>
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(1.3rem, 4vw, 1.9rem)',
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
            fontFamily: "'Caveat', cursive",
            fontWeight: 700,
            fontSize: '1.4rem',
            padding: '16px 38px',
            borderRadius: 50,
            border: '1px solid rgba(246,242,231,0.5)',
            background: 'rgba(246,242,231,0.06)',
            color: '#f6f2e7',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            transition: 'background 0.3s, transform 0.15s, box-shadow 0.3s',
          }}
        >
          click me ✦
        </button>
        <div style={{ marginTop: 14, fontSize: '0.75rem', color: '#8b8474', letterSpacing: '0.05em' }}>
          (go on, tap it)
        </div>
      </div>

      {/* Full-screen letter — no card, no backdrop, the letter IS the screen */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5,
            overflowY: 'auto',
            background:
              "radial-gradient(ellipse at 15% 0%, rgba(255,255,255,0.35), transparent 45%), radial-gradient(ellipse at 100% 100%, rgba(120,90,40,0.18), transparent 50%), linear-gradient(175deg, #f3e7c9 0%, #ecdcb3 45%, #e2cd9c 100%)",
            color: '#2b1c10',
            animation: unroll ? 'andi-reveal 1s cubic-bezier(.6,0,.2,1) forwards' : 'none',
            clipPath: unroll ? undefined : 'inset(0 0 100% 0)',
          }}
        >
          {/* inset double-rule frame, letter-style */}
          <div
            style={{
              position: 'fixed',
              inset: 14,
              border: '1px solid rgba(43,28,16,0.35)',
              pointerEvents: 'none',
              zIndex: 6,
            }}
          />
          <div
            style={{
              position: 'fixed',
              inset: 20,
              border: '1px solid rgba(43,28,16,0.18)',
              pointerEvents: 'none',
              zIndex: 6,
            }}
          />

          {/* wax-seal close button */}
          <button
            onClick={closeNote}
            aria-label="close"
            style={{
              position: 'fixed',
              top: 30,
              right: 30,
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #8a3b2e, #5c2018)',
              border: '2px solid rgba(43,28,16,0.4)',
              color: '#f1e4c3',
              fontSize: '1.2rem',
              fontFamily: "'Cinzel Decorative', serif",
              cursor: 'pointer',
              zIndex: 20,
              boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
            }}
          >
            ✕
          </button>

          <div className="andi-letter" style={{ position: 'relative', zIndex: 7, maxWidth: 860, margin: '0 auto' }}>
            <div
              style={{
                textAlign: 'center',
                animation: unroll ? 'andi-riseIn 0.9s ease 0.35s both' : 'none',
                opacity: unroll ? undefined : 0,
              }}
            >
              <div style={{ fontSize: '1.6rem', letterSpacing: '0.3em', opacity: 0.5, marginBottom: 6 }}>✦ ✦ ✦</div>
              <h2 className="andi-title" style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, margin: '0 0 10px 0' }}>
                for andi
              </h2>
              <div style={{ width: 160, height: 1, background: 'linear-gradient(90deg, transparent, #8a6a2f, transparent)', margin: '0 auto 50px' }} />
            </div>

            {/* letter body with drop cap + floated polaroid photos */}
            <div
              style={{
                overflow: 'hidden',
                animation: unroll ? 'andi-riseIn 0.9s ease 0.55s both' : 'none',
                opacity: unroll ? undefined : 0,
              }}
            >
              {slots[0] && <Polaroid slot={slots[0]} onFile={(f) => handleFile(slots[0].id, f)} float="left" mr={26} mb={10} />}

              <p className="andi-body-text" style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.9, margin: 0 }}>
                <span
                  className="andi-dropcap"
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    float: 'left',
                    lineHeight: 0.8,
                    padding: '8px 10px 0 0',
                    color: '#8a3b2e',
                  }}
                >
                  H
                </span>
                <span contentEditable suppressContentEditableWarning spellCheck={false} style={{ outline: 'none' }}>
                  {`ey andi,\n\nJust a little corner of the internet made for you.`}
                </span>
              </p>

              {slots[1] && <Polaroid slot={slots[1]} onFile={(f) => handleFile(slots[1].id, f)} float="right" ml={26} mt={30} mb={10} />}

              <p
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                className="andi-body-text"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  lineHeight: 1.9,
                  outline: 'none',
                  marginTop: 30,
                }}
              >
                {`Click any picture to drop in your own photo, and click anywhere in this text to rewrite it exactly how you want it to read.`}
              </p>

              {slots[2] && <Polaroid slot={slots[2]} onFile={(f) => handleFile(slots[2].id, f)} float="left" round mr={26} mt={30} mb={10} />}

              <p
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                className="andi-body-text"
                style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.9, outline: 'none', marginTop: 30 }}
              >
                {`Here's to you — happy birthday, and here's a small smtg from my side.`}
              </p>
            </div>

            {slots.slice(3).length > 0 && (
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', margin: '36px 0', justifyContent: 'center', clear: 'both' }}>
                {slots.slice(3).map((slot) => (
                  <Polaroid key={slot.id} slot={slot} onFile={(f) => handleFile(slot.id, f)} />
                ))}
              </div>
            )}

            <div
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              style={{
                fontFamily: "'Caveat', cursive",
                fontWeight: 700,
                clear: 'both',
                marginTop: 50,
                textAlign: 'right',
                fontSize: '2rem',
                opacity: 0.85,
                outline: 'none',
                animation: unroll ? 'andi-riseIn 0.9s ease 0.75s both' : 'none',
              }}
            >
              — with love
            </div>
          </div>

          <div
            style={{
              position: 'fixed',
              bottom: 26,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
              flexWrap: 'wrap',
              zIndex: 20,
              background: 'rgba(241,228,195,0.85)',
              backdropFilter: 'blur(6px)',
              padding: '10px 16px',
              borderRadius: 30,
              border: '1px solid rgba(43,28,16,0.25)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            }}
          >
            <button onClick={addSlot} style={toolbarBtn}>+ photo</button>
            <button onClick={burstConfetti} style={toolbarBtn}>✦ burst</button>
            <button onClick={replay} style={toolbarBtn}>↺ replay</button>
            <button onClick={() => setHearts((h) => !h)} style={toolbarBtn}>
              {hearts ? '♥ hearts on' : '♡ hearts off'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Polaroid({ slot, onFile, float, round, mr = 0, ml = 0, mt = 0, mb = 0 }) {
  return (
    <label
      className="andi-imgSlot andi-imgSlot-float"
      style={{
        display: 'block',
        float: float || undefined,
        marginRight: mr,
        marginLeft: ml,
        marginTop: mt,
        marginBottom: mb,
        background: '#fdfaf2',
        padding: round ? 10 : '10px 10px 26px 10px',
        borderRadius: round ? '50%' : 3,
        boxShadow: '0 10px 22px rgba(0,0,0,0.28)',
        transform: `rotate(${slot.rot}deg)`,
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.2s',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: round ? '50%' : 2,
          background: slot.img ? `url(${slot.img}) center/cover` : 'repeating-linear-gradient(45deg, #e7ddc4, #e7ddc4 8px, #ddd0ae 8px, #ddd0ae 16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Caveat', cursive",
          color: 'rgba(43,28,16,0.5)',
          fontSize: '1.1rem',
        }}
      >
        {!slot.img && <span>+ photo</span>}
      </div>
      <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files[0])} style={fileInputStyle} />
    </label>
  )
}

const toolbarBtn = {
  fontFamily: "'Caveat', cursive",
  fontWeight: 700,
  fontSize: '1.05rem',
  padding: '8px 18px',
  borderRadius: 20,
  border: '1px solid rgba(43,28,16,0.4)',
  background: 'rgba(255,255,255,0.25)',
  color: '#2b1c10',
  cursor: 'pointer',
  letterSpacing: '0.03em',
}

const fileInputStyle = { position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }
