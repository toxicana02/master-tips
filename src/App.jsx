import { useState } from 'react'
import './App.css'

// ========== BADILISHA HAPA TU - TILL NA MAWASILIANO ==========
const CONFIG = {
  TILL_NUMBER: "123456", // <-- WEKA TILL NUMBER YAKO HAPA, mfano "5551234"
  JINA_LA_TILL: "MASTER TIPS", // <-- JINA LILILO KWENYE TILL YAKO
  WHATSAPP: "255712345678", // <-- WEKA NAMBA YAKO YA WHATSAPP
}

// ========== BADILISHA BEI HAPA - KILA MKEKA BEI YAKE ==========
const MIKEKA = [
  { id: 1, title: 'MKEKA WA LEO - ODDS 5.20 🔥', price: 5000, tag: 'HOT', color: '#00aa00', teams: 'Man City vs Arsenal - Over 1.5 | Real Madrid vs Barca - GG | Simba vs Yanga - Home Win | Chelsea vs Liverpool - Over 1.5', win: '98%', time: 'Leo 16:00' },
  { id: 2, title: 'MKEKA SAFE - ODDS 2.10 ✅', price: 3000, tag: 'SAFE', color: '#0066ff', teams: 'Bayern vs Dortmund - Over 1.5 | PSG vs Marseille - Home Win | Man Utd vs Tottenham - Over 1.5', win: '99%', time: 'Leo 18:30' },
  { id: 3, title: 'MKEKA ODDS KUBWA - 12.50 💰', price: 5000, tag: 'BIG ODDS', color: '#cc00ff', teams: 'Mechi 5 - Beti 1000/= Ushinde 12,500/= | Over 2.5 x3 + GG x2', win: '85%', time: 'Leo 20:45' },
  { id: 4, title: 'MKEKA WA KESHO - EARLY 🕐', price: 3000, tag: 'KESHO', color: '#ff6600', teams: 'Juventus vs Inter - GG | Ajax vs PSV - Over 2.5 | Al Ahly vs Zamalek - Over 1.5', win: '96%', time: 'Kesho 15:00' },
]

function App() {
  const [selected, setSelected] = useState(null)
  const [phone, setPhone] = useState('')
  const [network, setNetwork] = useState('M-PESA')
  const [step, setStep] = useState('list') // list | pay | waiting | verify | unlocked
  const [txCode, setTxCode] = useState('')
  const [count, setCount] = useState(60)

  const startPay = (mkeka) => { setSelected(mkeka); setStep('pay'); window.scrollTo(0,0) }

  const sendSTK = () => {
    if (!phone || phone.length < 10) { alert('Weka namba sahihi, mfano 0712345678'); return }
    setStep('waiting')
    setCount(60)
    // Countdown ya kusubiri mtu alipe
    let c = 60
    const timer = setInterval(() => {
      c -= 1; setCount(c)
      if (c <= 0) { clearInterval(timer); setStep('verify') }
    }, 1000)
  }

  const verifyPayment = () => {
    if (!txCode || txCode.length < 5) { alert('Weka Code ya Muamala uliyotumiwa na M-Pesa, mfano QK123456'); return }
    // Hapa ndipo ukiwa na M-Pesa API ya kweli, mfumo unathibitisha Code hapa
    setStep('unlocked')
    window.scrollTo(0,0)
  }

  // ============ UKURASA WA MKEKA UMEFUNGUKA - UKURASA HUO HUO ============
  if (step === 'unlocked' && selected) {
    return (
      <div className="paid-bg">
        <div style={{ padding: '20px 15px' }}>
          <div className="logo-box"><span className="logo-green">⚽ MASTER</span> <span className="logo-orange">TIPS</span></div>
          <h1 style={{ fontSize: '32px', margin: '15px 0 5px' }}>✅ MALIPO YAMETHIBITISHWA!</h1>
          <p>Asante {phone} - Mkeka wako umefunguka hapa hapa 👇</p>
          <p style={{ background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '6px 15px', borderRadius: '20px', fontSize: '13px' }}>Muamala: {txCode} • Till: {CONFIG.TILL_NUMBER}</p>
        </div>
        <div className="mkeka-box">
          <span style={{ background: selected.color, color: 'white', padding: '6px 18px', borderRadius: '20px', fontWeight: 'bold' }}>{selected.tag} • WIN {selected.win}</span>
          <h2 style={{ fontSize: '26px', margin: '15px 0 5px' }}>{selected.title}</h2>
          <p style={{ color: '#888' }}>⏰ {selected.time}</p>
          <div style={{ background: '#f0fff0', padding: '20px', borderRadius: '15px', textAlign: 'left', fontSize: '17px', lineHeight: '1.8', border: '2px solid #00aa00' }}>
            <b>⚽ MECHI ZA MKEKA:</b><br/>{selected.teams}
            <hr/>
            <b>💰 ULILIPA:</b> Tsh {selected.price.toLocaleString()}/= kwa Till {CONFIG.TILL_NUMBER} ({CONFIG.JINA_LA_TILL})<br/>
            <b>📋 JINSI YA KUBETI:</b> Beti mechi zote kama Single Ticket. Usi-split.<br/>
            <b>⚠️ USHAURI:</b> Beti pesa unayoweza kupoteza. 18+
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
            <a href={`https://wa.me/${CONFIG.WHATSAPP}`} className="whatsapp-btn">💬 Uliza WhatsApp</a>
            <button onClick={() => { setStep('list'); setSelected(null); setTxCode(''); setPhone('') }} style={{ background: '#111', color: 'white', padding: '15px 25px', borderRadius: '30px', border: 'none', fontWeight: 'bold' }}>🏠 Rudi Home</button>
          </div>
        </div>
      </div>
    )
  }

  // ============ UKURASA WA KULIPA - KAMA WA CONNECTIONTAMU ============
  if (step === 'pay' || step === 'waiting' || step === 'verify') {
    return (
      <div className="master-bg">
        <div style={{ padding: '20px 15px 0' }}>
          <button onClick={() => setStep('list')} style={{ background: 'white', border: 'none', padding: '8px 18px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>⬅ Rudi</button>
          <div style={{ marginTop: '15px' }} className="logo-box"><span className="logo-green">⚽ MASTER</span> <span className="logo-orange">TIPS</span></div>
        </div>

        <div className="pay-card">
          <div className="pay-card-img-wrap">
            <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600" className="pay-card-img" />
            <div className="badge-live">⚽ {selected.tag}</div>
            <div className="badge-win">⭐ WIN {selected.win}</div>
          </div>
          <div className="pay-card-body">
            <h2 className="pay-title">{selected.title}</h2>
            <p className="pay-desc">⏰ {selected.time}</p>
            <p className="price">Tsh {selected.price.toLocaleString()}/= <span className="price-old">10,000/=</span></p>

            {/* HATUA 1 - CHAGUA MTANDAO */}
            {step === 'pay' && (
              <>
                <p style={{ textAlign: 'left', fontWeight: 'bold', margin: '15px 0 8px' }}>1. Chagua Mtandao:</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['M-PESA', 'TIGO PESA', 'AIRTEL MONEY', 'HALOPESA'].map((n) => (
                    <button key={n} onClick={() => setNetwork(n)} style={{ background: network === n ? '#00aa00' : '#eee', color: network === n ? 'white' : 'black', border: 'none', padding: '10px 14px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>{n}</button>
                  ))}
                </div>

                <p style={{ textAlign: 'left', fontWeight: 'bold', margin: '15px 0 5px' }}>2. Weka Namba yako ya {network}:</p>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0712 345 678" className="phone-input" />

                <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '12px', marginTop: '15px', textAlign: 'left', fontSize: '14px', lineHeight: '1.6' }}>
                  <b>Utatumiwa ombi la kulipa:</b><br/>
                  📱 Namba: <b>{phone || '0712...'}</b><br/>
                  💰 Kiasi: <b>Tsh {selected.price.toLocaleString()}/=</b><br/>
                  🏦 Till: <b>{CONFIG.TILL_NUMBER} - {CONFIG.JINA_LA_TILL}</b><br/>
                  📶 Mtandao: <b>{network}</b>
                </div>

                <button onClick={sendSTK} className="pay-btn">💰 LIPA SASA - {network}</button>
                <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>Utapokea ujumbe kwenye simu yako kuweka PIN na kuthibitisha malipo.</p>
              </>
            )}

            {/* HATUA 2 - SUBIRI ALIPE */}
            {step === 'waiting' && (
              <div style={{ padding: '10px 0' }}>
                <div style={{ fontSize: '50px' }}>📲</div>
                <h3>Angalia Simu Yako!</h3>
                <p style={{ color: '#555' }}>Tumekutumia ombi la kulipa <b>Tsh {selected.price.toLocaleString()}/=</b> kwenda Till <b>{CONFIG.TILL_NUMBER}</b> kupitia <b>{network}</b>.</p>
                <p style={{ fontSize: '20px', fontWeight: '900', color: '#00aa00' }}>⏳ Inasubiri... {count} sekunde</p>
                <p style={{ fontSize: '14px' }}>1. Fungua simu yako<br/>2. Weka PIN yako ya {network}<br/>3. Bonyeza Thibitisha</p>
                <button onClick={() => setStep('verify')} style={{ background: '#111', color: 'white', border: 'none', padding: '13px 25px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>NIMESHA LIPA - Ingiza Code ➡️</button>
              </div>
            )}

            {/* HATUA 3 - WEKA CODE YA MUAMALA */}
            {step === 'verify' && (
              <div style={{ padding: '10px 0' }}>
                <h3>✅ Umesh alipa? Ingiza Code</h3>
                <p style={{ color: '#555', fontSize: '14px' }}>Umetumiwa SMS na {network} yenye Code ya Muamala, mfano <b>QK7AB123CD</b>. Iweke hapa chini ili mkeka ufunguke:</p>
                <input value={txCode} onChange={(e) => setTxCode(e.target.value.toUpperCase())} placeholder="mfano: QK7AB123CD" className="phone-input" style={{ textTransform: 'uppercase' }} />
                <button onClick={verifyPayment} className="pay-btn">🔓 THIBITISHA & FUNGUA MKEKA</button>
                <button onClick={() => setStep('pay')} style={{ background: 'none', border: 'none', color: '#888', textDecoration: 'underline', marginTop: '12px', cursor: 'pointer' }}>Sikupata ombi? Jaribu tena</button>
              </div>
            )}
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Malipo salama kupitia Till {CONFIG.TILL_NUMBER} - {CONFIG.JINA_LA_TILL}</p>
      </div>
    )
  }

  // ============ HOME ============
  return (
    <div className="master-bg">
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '6px 18px', borderRadius: '25px' }}><span style={{ fontWeight: '900', color: '#00aa00', fontSize: '20px' }}>⚽ MASTER</span> <span style={{ fontWeight: '900', color: '#ff9900', fontSize: '20px' }}>TIPS</span></div>
        <a href={`https://wa.me/${CONFIG.WHATSAPP}`} style={{ background: '#25D366', color: 'white', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold' }}>WhatsApp</a>
      </nav>

      <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '0 15px' }}>
        <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '25px', display: 'block' }} />
        <div style={{ position: 'absolute', inset: '0 15px 0 15px', background: 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,30,0,0.85))', borderRadius: '25px' }}></div>
        <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', padding: '0 20px' }}>
          <h1 className="main-title"><span className="title-yellow">MKEKA WA</span><br/><span className="title-white">FOOTBALL LEO ⚽</span></h1>
          <p className="subtitle">🔥 Lipa kwa Till {CONFIG.TILL_NUMBER} - Mkeka Unafunguka Hapa Hapa</p>
          <a href="#mikeka" style={{ background: '#ffcc00', color: 'black', padding: '14px 30px', borderRadius: '30px', fontWeight: '900', fontSize: '18px', display: 'inline-block' }}>ONA MIKEKA 👇</a>
        </div>
      </div>

      <div className="stats">
        <div className="stat">👥 1,200+ Wamelipa</div>
        <div className="stat">⭐ 4.9 / 5 Stars</div>
        <div className="stat">🏆 Win Rate 98%</div>
        <div className="stat">⚡ Papo Hapo</div>
      </div>

      <div id="mikeka" style={{ maxWidth: '900px', margin: '30px auto 0', padding: '0 15px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900' }}>🔥 MIKEKA YA <span style={{ color: '#ffcc00' }}>LEO</span></h2>
        <p style={{ color: '#ccffcc' }}>Chagua mkeka, lipa kwa Till {CONFIG.TILL_NUMBER}, unafunguka mara moja hapa hapa!</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {MIKEKA.map((m) => (
            <div key={m.id} style={{ background: 'white', color: 'black', borderRadius: '20px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderLeft: `8px solid ${m.color}` }}>
              <div style={{ textAlign: 'left', flex: 1, minWidth: '220px' }}>
                <span style={{ background: m.color, color: 'white', padding: '4px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>{m.tag} • WIN {m.win}</span>
                <h3 style={{ margin: '8px 0 4px', fontSize: '20px' }}>{m.title}</h3>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>⏰ {m.time}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '24px', fontWeight: '900', color: m.color, margin: '0' }}>Tsh {m.price.toLocaleString()}/=</p>
                <button onClick={() => startPay(m)} style={{ background: m.color, color: 'white', border: 'none', padding: '12px 25px', borderRadius: '25px', fontWeight: '900', fontSize: '16px', marginTop: '8px', cursor: 'pointer' }}>LIPA & FUNGUA 🔓</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '35px auto 0', padding: '0 15px' }}>
        <h2 style={{ fontSize: '28px' }}>JINSI INAVYOFANYA KAZI</h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '15px' }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '18px', borderRadius: '15px', width: '200px' }}><b style={{ fontSize: '30px' }}>1️⃣</b><br/><b>Chagua Mkeka</b><br/>Chagua unaoutaka</div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '18px', borderRadius: '15px', width: '200px' }}><b style={{ fontSize: '30px' }}>2️⃣</b><br/><b>Lipa Till {CONFIG.TILL_NUMBER}</b><br/>Weka PIN kwenye simu</div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '18px', borderRadius: '15px', width: '200px' }}><b style={{ fontSize: '30px' }}>3️⃣</b><br/><b>Mkeka Unafunguka</b><br/>Hapa hapa, papo hapo</div>
        </div>
      </div>

      <div style={{ marginTop: '35px', padding: '25px 15px', background: 'rgba(0,0,0,0.4)' }}>
        <h3>⚽ MASTER TIPS</h3>
        <p>📍 Dar es Salaam, Tanzania<br/>🏦 Till: {CONFIG.TILL_NUMBER} - {CONFIG.JINA_LA_TILL}<br/>📞 {CONFIG.WHATSAPP}</p>
        <a href={`https://wa.me/${CONFIG.WHATSAPP}`} className="whatsapp-btn">💬 WhatsApp Sasa</a>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '15px' }}>© 2026 MASTER TIPS - Kamari ni hatari. Beti kwa uangalifu. 18+</p>
      </div>
    </div>
  )
}
export default App