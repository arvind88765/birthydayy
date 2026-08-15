'use client'

import { useEffect, useRef, useState } from 'react'

const STAR_COUNT = 140
const DOT_COUNT = 200

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function AndiGift() {
  const skyRef = useRef(null)
  const scrollElRef = useRef(null)
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
        .andi-btn { animation: andi-fadein 1.2s ease forwards, andi-wobble 3.2s ease-in-out infinite; animation-delay: 0.2s, 1.8s; }
        .andi-btn:hover { background: rgba(246,242,231,0.14) !important; box-shadow: 0 0 30px rgba(246,242,231,0.25); }
        .andi-btn:active { transform: scale(0.92) rotate(-3deg); }
        .andi-imgSlot:hover { transform: scale(1.04); }
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
            animation: 'andi-fadein 1.4s ease forwards',
          }}
        >
          hello andi
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

      {/* Scroll overlay */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            background: 'rgba(5,6,12,0.75)',
          }}
        >
          <button
            onClick={closeNote}
            aria-label="close"
            style={{
              position: 'absolute',
              top: 22,
              right: 26,
              background: 'none',
              border: 'none',
              color: '#f6f2e7',
              fontSize: '1.8rem',
              cursor: 'pointer',
              opacity: 0.7,
              zIndex: 20,
            }}
          >
            ✕
          </button>

          <div
            ref={scrollElRef}
            style={{
              position: 'relative',
              maxWidth: 640,
              width: '100%',
              maxHeight: '86vh',
              overflowY: 'auto',
              background:
                'radial-gradient(ellipse at top left, rgba(255,255,255,0.25), transparent 40%), linear-gradient(180deg, #f1e4c3 0%, #e3d3a6 100%)',
              borderRadius: 6,
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 0 60px rgba(120,90,40,0.25)',
              padding: '50px 44px 40px',
              color: '#2b1c10',
              transformOrigin: 'top center',
              animation: unroll ? 'andi-unroll 1.1s cubic-bezier(.4,0,.2,1) forwards' : 'none',
              transform: unroll ? undefined : 'scaleY(0.05)',
              opacity: unroll ? undefined : 0.4,
            }}
          >
            {['tl', 'tr', 'bl', 'br'].map((c) => (
              <div
                key={c}
                style={{
                  position: 'absolute',
                  width: 34,
                  height: 34,
                  border: '2px solid #d9b872',
                  opacity: 0.6,
                  top: c.includes('t') ? 14 : undefined,
                  bottom: c.includes('b') ? 14 : undefined,
                  left: c.includes('l') ? 14 : undefined,
                  right: c.includes('r') ? 14 : undefined,
                  borderRight: c.includes('r') ? '2px solid #d9b872' : 'none',
                  borderLeft: c.includes('l') ? '2px solid #d9b872' : 'none',
                  borderTop: c.includes('t') ? '2px solid #d9b872' : 'none',
                  borderBottom: c.includes('b') ? '2px solid #d9b872' : 'none',
                }}
              />
            ))}

            <h2
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: '1.7rem',
                fontWeight: 700,
                textAlign: 'center',
                margin: '0 0 6px 0',
              }}
            >
              for andi ✦
            </h2>
            <div style={{ width: 120, height: 1, background: '#2b1c10', opacity: 0.3, margin: '0 auto 26px' }} />

            {/* text with images floated inside it, like a scrapbook page */}
            <div style={{ overflow: 'hidden' }}>
              {slots[0] && (
                <label
                  className="andi-imgSlot"
                  style={{ ...floatSlotStyle(slots[0], 'left'), float: 'left', marginRight: 18 }}
                >
                  {!slots[0].img && <span style={{ padding: 6 }}>+ photo</span>}
                  <input type="file" accept="image/*" onChange={(e) => handleFile(slots[0].id, e.target.files[0])} style={fileInputStyle} />
                </label>
              )}

              <div
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.3rem',
                  lineHeight: 1.9,
                  textAlign: 'left',
                  outline: 'none',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {`Hey andi,\n\nJust a little corner of the internet made for you.`}
              </div>

              {slots[1] && (
                <label
                  className="andi-imgSlot"
                  style={{ ...floatSlotStyle(slots[1], 'right'), float: 'right', marginLeft: 18, marginTop: 20 }}
                >
                  {!slots[1].img && <span style={{ padding: 6 }}>+ photo</span>}
                  <input type="file" accept="image/*" onChange={(e) => handleFile(slots[1].id, e.target.files[0])} style={fileInputStyle} />
                </label>
              )}

              <div
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: '1.3rem',
                  lineHeight: 1.9,
                  textAlign: 'left',
                  outline: 'none',
                  whiteSpace: 'pre-wrap',
                  marginTop: 16,
                }}
              >
                {`Click any picture to drop in your own photo, and click anywhere in this text to rewrite it exactly how you want it to read.`}
              </div>

              {slots[2] && (
                <label
                  className="andi-imgSlot"
                  style={{ ...floatSlotStyle(slots[2], 'left'), float: 'left', borderRadius: '50%', marginRight: 18, marginTop: 20 }}
                >
                  {!slots[2].img && <span style={{ padding: 6 }}>+ photo</span>}
                  <input type="file" accept="image/*" onChange={(e) => handleFile(slots[2].id, e.target.files[0])} style={fileInputStyle} />
                </label>
              )}

              <div
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.3rem',
                  lineHeight: 1.9,
                  textAlign: 'left',
                  outline: 'none',
                  whiteSpace: 'pre-wrap',
                  marginTop: 16,
                }}
              >
                {`Here's to you — happy birthday, and here's a small smtg from my side.`}
              </div>
            </div>

            {slots.slice(3).length > 0 && (
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '22px 0', justifyContent: 'center', clear: 'both' }}>
                {slots.slice(3).map((slot) => (
                  <label key={slot.id} className="andi-imgSlot" style={floatSlotStyle(slot)}>
                    {!slot.img && <span style={{ padding: 6 }}>+ photo</span>}
                    <input type="file" accept="image/*" onChange={(e) => handleFile(slot.id, e.target.files[0])} style={fileInputStyle} />
                  </label>
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
                marginTop: 30,
                textAlign: 'right',
                fontSize: '1.7rem',
                opacity: 0.85,
                outline: 'none',
              }}
            >
              — with love
            </div>

            <div style={{ marginTop: 28, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={addSlot} style={toolbarBtn}>+ add photo slot</button>
              <button onClick={burstConfetti} style={toolbarBtn}>✦ burst</button>
              <button onClick={replay} style={toolbarBtn}>↺ replay</button>
            </div>
          </div>
        </div>
      )}
    </div>
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

function floatSlotStyle(slot) {
  return {
    width: 140,
    height: 140,
    border: '2px dashed rgba(43,28,16,0.35)',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: "'Caveat', cursive",
    fontSize: '0.95rem',
    color: 'rgba(43,28,16,0.55)',
    cursor: 'pointer',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: slot?.img ? `url(${slot.img})` : undefined,
    position: 'relative',
    transform: `rotate(${slot?.rot || 0}deg)`,
    boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
    overflow: 'hidden',
    transition: 'transform 0.2s',
  }
}

const fileInputStyle = { position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }
