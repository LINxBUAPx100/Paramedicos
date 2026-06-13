// Mapas anatómicos y fisiológicos en SVG, dibujados a mano para fines educativos.
// Cada diagrama se registra por clave y se puede insertar en cualquier tema
// mediante un bloque { tipo: 'diagrama', clave: '...', titulo, descripcion }.

const txt = { fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, fill: 'var(--texto)' }
const txtSm = { ...txt, fontSize: 10.5, fill: 'var(--texto-2)' }
const lbl = { ...txt, fontSize: 11.5, fontWeight: 600 }

// ---------- Célula y organelos ----------
function Celula() {
  return (
    <svg viewBox="0 0 460 320" role="img" aria-label="Célula y organelos">
      <ellipse cx="230" cy="160" rx="205" ry="140" fill="#bae6fd" opacity="0.35" stroke="#0ea5e9" strokeWidth="3" />
      <ellipse cx="170" cy="150" rx="55" ry="45" fill="#a5b4fc" opacity="0.6" stroke="#6366f1" strokeWidth="2" />
      <circle cx="170" cy="150" r="14" fill="#4f46e5" />
      <ellipse cx="300" cy="110" rx="40" ry="20" fill="#fca5a5" stroke="#ef4444" strokeWidth="2" />
      <path d="M285 110 q15 -10 30 0 q-15 10 -30 0" fill="#ef4444" opacity="0.5" />
      <ellipse cx="310" cy="200" rx="38" ry="22" fill="#fcd34d" stroke="#f59e0b" strokeWidth="2" />
      <path d="M285 200 h50 M288 192 h44 M288 208 h44" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
      <circle cx="120" cy="230" r="13" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
      <circle cx="230" cy="250" r="11" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
      <text x="170" y="153" textAnchor="middle" style={{ ...lbl, fontSize: 10, fill: '#1e1b4b' }}>Núcleo</text>
      <text x="300" y="80" textAnchor="middle" style={lbl}>Mitocondria</text>
      <text x="310" y="237" textAnchor="middle" style={lbl}>R. endoplásmico</text>
      <text x="120" y="262" textAnchor="middle" style={txtSm}>Lisosoma</text>
      <text x="230" y="300" textAnchor="middle" style={txtSm}>Membrana plasmática</text>
    </svg>
  )
}

// ---------- Membrana y bomba Na/K ----------
function BombaNaK() {
  return (
    <svg viewBox="0 0 460 260" role="img" aria-label="Bomba sodio potasio">
      <rect x="0" y="110" width="460" height="40" fill="#fde68a" opacity="0.5" />
      <line x1="0" y1="110" x2="460" y2="110" stroke="#f59e0b" strokeWidth="2" />
      <line x1="0" y1="150" x2="460" y2="150" stroke="#f59e0b" strokeWidth="2" />
      <text x="10" y="30" style={lbl}>Exterior (alto Na⁺)</text>
      <text x="10" y="235" style={lbl}>Interior (alto K⁺)</text>
      <rect x="200" y="95" width="60" height="70" rx="10" fill="#93c5fd" stroke="#2563eb" strokeWidth="2" />
      <text x="230" y="135" textAnchor="middle" style={{ ...txtSm, fontSize: 9 }}>ATPasa</text>
      {/* Na hacia afuera */}
      <circle cx="230" cy="70" r="13" fill="#ef4444" /><text x="230" y="74" textAnchor="middle" style={{ fill: '#fff', fontSize: 10, fontWeight: 700 }}>Na</text>
      <text x="270" y="62" style={txtSm}>3 Na⁺ ↑ salen</text>
      {/* K hacia adentro */}
      <circle cx="230" cy="195" r="13" fill="#8b5cf6" /><text x="230" y="199" textAnchor="middle" style={{ fill: '#fff', fontSize: 10, fontWeight: 700 }}>K</text>
      <text x="270" y="200" style={txtSm}>2 K⁺ ↓ entran</text>
      <text x="120" y="135" textAnchor="middle" style={{ ...lbl, fill: '#16a34a' }}>ATP</text>
      <path d="M150 130 l40 0" stroke="#16a34a" strokeWidth="2" markerEnd="url(#fl)" />
      <defs><marker id="fl" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#16a34a" /></marker></defs>
    </svg>
  )
}

// ---------- Corazón y coronarias ----------
function Corazon() {
  return (
    <svg viewBox="0 0 420 360" role="img" aria-label="Anatomía del corazón">
      <path d="M210 330 C120 250 60 200 60 130 C60 80 100 55 140 55 C170 55 195 75 210 100 C225 75 250 55 280 55 C320 55 360 80 360 130 C360 200 300 250 210 330 Z"
        fill="#fecaca" stroke="#dc2626" strokeWidth="3" />
      {/* septum */}
      <path d="M210 100 L210 300" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
      {/* coronarias */}
      <path d="M205 105 C180 130 175 180 170 230" stroke="#b91c1c" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M215 105 C250 120 270 140 285 165" stroke="#7f1d1d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M285 165 C300 200 290 240 270 270" stroke="#7f1d1d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <text x="120" y="40" style={lbl}>Cavidades</text>
      <text x="140" y="150" textAnchor="middle" style={txtSm}>VD</text>
      <text x="285" y="150" textAnchor="middle" style={txtSm}>VI</text>
      <text x="140" y="100" textAnchor="middle" style={txtSm}>AD</text>
      <text x="285" y="100" textAnchor="middle" style={txtSm}>AI</text>
      <text x="120" y="245" style={{ ...txtSm, fill: '#b91c1c' }}>DA (anterior)</text>
      <text x="300" y="160" style={{ ...txtSm, fill: '#7f1d1d' }}>CD</text>
      <text x="285" y="285" style={{ ...txtSm, fill: '#7f1d1d' }}>descendente post.</text>
    </svg>
  )
}

// ---------- Sistema de conducción cardíaca ----------
function Conduccion() {
  return (
    <svg viewBox="0 0 380 340" role="img" aria-label="Sistema de conducción cardíaca">
      <path d="M190 310 C110 240 60 195 60 130 C60 85 95 62 132 62 C160 62 180 80 190 100 C200 80 220 62 248 62 C285 62 320 85 320 130 C320 195 270 240 190 310 Z"
        fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
      <circle cx="150" cy="95" r="10" fill="#f59e0b" /><text x="150" y="80" textAnchor="middle" style={{ ...txtSm, fontWeight: 700 }}>Nodo SA</text>
      <circle cx="180" cy="150" r="9" fill="#ef4444" /><text x="208" y="150" style={{ ...txtSm, fontWeight: 700 }}>Nodo AV</text>
      <path d="M180 159 L185 200" stroke="#7c3aed" strokeWidth="3" />
      <text x="205" y="195" style={txtSm}>Haz de His</text>
      <path d="M185 200 L150 270 M185 200 L225 270" stroke="#7c3aed" strokeWidth="3" />
      <text x="120" y="288" style={txtSm}>Ramas</text>
      <path d="M150 270 q-10 15 -20 10 M225 270 q10 15 20 10" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      <text x="240" y="300" style={{ ...txtSm, fill: '#16a34a' }}>Purkinje</text>
      <path d="M150 95 q15 25 30 45" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" fill="none" />
    </svg>
  )
}

// ---------- Onda del ECG ----------
function ECG() {
  return (
    <svg viewBox="0 0 460 240" role="img" aria-label="Onda electrocardiográfica">
      <rect x="0" y="0" width="460" height="240" fill="#fff5f5" opacity="0.4" />
      {Array.from({ length: 23 }).map((_, i) => <line key={'v' + i} x1={i * 20} y1="0" x2={i * 20} y2="240" stroke="#fecaca" strokeWidth="0.7" />)}
      {Array.from({ length: 12 }).map((_, i) => <line key={'h' + i} x1="0" y1={i * 20} x2="460" y2={i * 20} stroke="#fecaca" strokeWidth="0.7" />)}
      <path d="M10 140 L70 140 Q90 100 110 140 L140 140 L150 140 L160 60 L170 200 L180 120 L200 140 L240 140 Q275 80 310 140 L460 140"
        fill="none" stroke="#dc2626" strokeWidth="2.5" />
      <text x="95" y="92" textAnchor="middle" style={lbl}>P</text>
      <text x="160" y="52" textAnchor="middle" style={lbl}>R</text>
      <text x="150" y="158" style={txtSm}>Q</text>
      <text x="178" y="218" style={txtSm}>S</text>
      <text x="285" y="72" textAnchor="middle" style={lbl}>T</text>
      <text x="120" y="232" style={{ ...txtSm, fill: '#b91c1c' }}>PR</text>
      <text x="175" y="232" style={{ ...txtSm, fill: '#b91c1c' }}>QRS</text>
    </svg>
  )
}

// ---------- Circulación mayor y menor ----------
function Circulacion() {
  return (
    <svg viewBox="0 0 440 320" role="img" aria-label="Circulación mayor y menor">
      <rect x="180" y="130" width="80" height="70" rx="8" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
      <text x="220" y="170" textAnchor="middle" style={{ ...txtSm, fontWeight: 700 }}>Corazón</text>
      <rect x="160" y="20" width="120" height="45" rx="8" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
      <text x="220" y="47" textAnchor="middle" style={txtSm}>Pulmones</text>
      <rect x="160" y="260" width="120" height="45" rx="8" fill="#fca5a5" stroke="#dc2626" strokeWidth="2" />
      <text x="220" y="287" textAnchor="middle" style={txtSm}>Cuerpo / tejidos</text>
      {/* menor */}
      <path d="M195 130 L195 65" stroke="#2563eb" strokeWidth="4" markerEnd="url(#a1)" />
      <path d="M245 65 L245 130" stroke="#dc2626" strokeWidth="4" markerEnd="url(#a2)" />
      <text x="70" y="100" style={{ ...txtSm, fill: '#2563eb' }}>Circulación menor</text>
      {/* mayor */}
      <path d="M245 200 L245 260" stroke="#dc2626" strokeWidth="4" markerEnd="url(#a2)" />
      <path d="M195 260 L195 200" stroke="#2563eb" strokeWidth="4" markerEnd="url(#a1)" />
      <text x="290" y="235" style={{ ...txtSm, fill: '#dc2626' }}>Circulación mayor</text>
      <text x="300" y="120" style={{ ...txtSm, fill: '#dc2626' }}>O₂ ←</text>
      <text x="90" y="240" style={{ ...txtSm, fill: '#2563eb' }}>→ CO₂</text>
      <defs>
        <marker id="a1" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="#2563eb" /></marker>
        <marker id="a2" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="#dc2626" /></marker>
      </defs>
    </svg>
  )
}

// ---------- Determinantes del gasto cardíaco ----------
function GastoCardiaco() {
  return (
    <svg viewBox="0 0 460 230" role="img" aria-label="Determinantes del gasto cardíaco">
      <rect x="170" y="20" width="120" height="40" rx="8" fill="#0f766e" />
      <text x="230" y="45" textAnchor="middle" style={{ fill: '#fff', fontSize: 12, fontWeight: 700 }}>Gasto cardíaco</text>
      <rect x="60" y="100" width="140" height="38" rx="8" fill="#5eead4" stroke="#0f766e" />
      <text x="130" y="124" textAnchor="middle" style={txtSm}>Frecuencia cardíaca</text>
      <rect x="260" y="100" width="140" height="38" rx="8" fill="#5eead4" stroke="#0f766e" />
      <text x="330" y="124" textAnchor="middle" style={txtSm}>Volumen sistólico</text>
      <path d="M210 60 L130 100" stroke="#0f766e" strokeWidth="2" />
      <path d="M250 60 L330 100" stroke="#0f766e" strokeWidth="2" />
      {['Precarga', 'Contractilidad', 'Poscarga'].map((t, i) => (
        <g key={t}>
          <rect x={230 + i * 0 + (i - 1) * 105} y="175" width="95" height="34" rx="7" fill="#ccfbf1" stroke="#14b8a6" />
          <text x={277 + (i - 1) * 105} y="196" textAnchor="middle" style={{ ...txtSm, fontSize: 10 }}>{t}</text>
          <path d={`M330 138 L${277 + (i - 1) * 105} 175`} stroke="#14b8a6" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  )
}

// ---------- Árbol respiratorio ----------
function Respiratorio() {
  return (
    <svg viewBox="0 0 360 360" role="img" aria-label="Árbol traqueobronquial y pulmones">
      <ellipse cx="105" cy="220" rx="70" ry="105" fill="#bfdbfe" opacity="0.6" stroke="#2563eb" strokeWidth="2" />
      <ellipse cx="255" cy="220" rx="70" ry="105" fill="#bfdbfe" opacity="0.6" stroke="#2563eb" strokeWidth="2" />
      <rect x="172" y="40" width="16" height="90" rx="6" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      <text x="200" y="70" style={txtSm}>Tráquea</text>
      <path d="M180 130 L120 175" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
      <path d="M180 130 L245 170" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
      <text x="180" y="150" textAnchor="middle" style={{ ...txtSm, fontWeight: 700 }}>Carina</text>
      <path d="M120 175 l-25 30 M120 175 l15 35 M245 170 l25 28 M245 170 l-12 35" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
      <text x="60" y="200" style={{ ...txtSm, fontSize: 9 }}>3 lóbulos</text>
      <text x="280" y="200" style={{ ...txtSm, fontSize: 9 }}>2 lóbulos</text>
      <circle cx="100" cy="250" r="5" fill="#1d4ed8" /><circle cx="115" cy="262" r="5" fill="#1d4ed8" /><circle cx="92" cy="268" r="4" fill="#1d4ed8" />
      <text x="105" y="300" textAnchor="middle" style={{ ...txtSm, fontSize: 9 }}>Alvéolos</text>
    </svg>
  )
}

// ---------- Curva de disociación de la oxihemoglobina ----------
function Oxihemoglobina() {
  return (
    <svg viewBox="0 0 440 280" role="img" aria-label="Curva de disociación de la oxihemoglobina">
      <line x1="60" y1="240" x2="420" y2="240" stroke="var(--texto-2)" strokeWidth="1.5" />
      <line x1="60" y1="240" x2="60" y2="20" stroke="var(--texto-2)" strokeWidth="1.5" />
      <text x="240" y="270" textAnchor="middle" style={txtSm}>pO₂ (mmHg)</text>
      <text x="20" y="130" textAnchor="middle" style={txtSm} transform="rotate(-90 20 130)">SaO₂ (%)</text>
      <path d="M60 235 C110 225 140 150 175 90 C210 55 280 42 410 38" fill="none" stroke="#16a34a" strokeWidth="3" />
      <path d="M60 238 C130 232 165 180 200 120 C240 75 300 55 410 48" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6 4" />
      <path d="M60 230 C95 210 120 120 150 70 C190 42 260 35 410 32" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 4" />
      <text x="320" y="30" style={{ ...txtSm, fill: '#2563eb' }}>← Izq: alcalosis, ↓Tª, ↓CO₂</text>
      <text x="300" y="70" style={{ ...txtSm, fill: '#dc2626' }}>Der → : acidosis, fiebre, ↑CO₂, 2,3-DPG</text>
      <line x1="150" y1="240" x2="150" y2="90" stroke="#94a3b8" strokeDasharray="3 3" />
      <text x="120" y="255" style={{ ...txtSm, fontSize: 9 }}>~60</text>
    </svg>
  )
}

// ---------- Nefrona ----------
function Nefrona() {
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Nefrona">
      <circle cx="90" cy="90" r="38" fill="#fca5a5" opacity="0.6" stroke="#dc2626" strokeWidth="2" />
      <circle cx="90" cy="90" r="18" fill="#dc2626" opacity="0.5" />
      <text x="90" y="40" textAnchor="middle" style={{ ...txtSm, fontWeight: 700 }}>Glomérulo</text>
      <text x="90" y="150" textAnchor="middle" style={{ ...txtSm, fontSize: 9 }}>Cápsula de Bowman</text>
      <path d="M128 90 C200 90 200 60 235 60" fill="none" stroke="#f59e0b" strokeWidth="6" />
      <text x="180" y="50" style={{ ...txtSm }}>Túbulo proximal</text>
      <path d="M235 60 C300 60 300 230 235 230" fill="none" stroke="#f59e0b" strokeWidth="6" />
      <text x="305" y="150" style={{ ...txtSm }}>Asa de Henle</text>
      <path d="M235 230 C180 230 200 180 130 180" fill="none" stroke="#f59e0b" strokeWidth="6" />
      <text x="150" y="210" style={{ ...txtSm }}>Túbulo distal</text>
      <path d="M130 180 C90 180 110 250 150 250 L260 250" fill="none" stroke="#7c3aed" strokeWidth="7" />
      <text x="200" y="275" style={{ ...txtSm, fill: '#7c3aed' }}>Túbulo colector → orina</text>
    </svg>
  )
}

// ---------- Neurona y sinapsis ----------
function Neurona() {
  return (
    <svg viewBox="0 0 460 240" role="img" aria-label="Neurona y sinapsis">
      <circle cx="90" cy="120" r="38" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2" />
      <circle cx="90" cy="120" r="14" fill="#7c3aed" opacity="0.5" />
      <path d="M62 95 l-30 -20 M60 145 l-32 22 M70 90 l-25 -30 M75 155 l-20 30" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
      <text x="60" y="55" style={{ ...txtSm }}>Dendritas</text>
      <text x="90" y="178" textAnchor="middle" style={{ ...txtSm }}>Soma</text>
      <line x1="128" y1="120" x2="320" y2="120" stroke="#7c3aed" strokeWidth="6" />
      <text x="200" y="110" style={{ ...txtSm }}>Axón</text>
      {[160, 210, 260].map((x) => <ellipse key={x} cx={x} cy="120" rx="14" ry="9" fill="#a78bfa" />)}
      <text x="210" y="148" textAnchor="middle" style={{ ...txtSm, fontSize: 9 }}>Vaina de mielina</text>
      <path d="M320 120 l25 -18 M320 120 l25 18 M320 120 l28 0" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
      <circle cx="360" cy="120" r="8" fill="#16a34a" />
      <text x="360" y="150" textAnchor="middle" style={{ ...txtSm, fontSize: 9, fill: '#16a34a' }}>Sinapsis</text>
    </svg>
  )
}

// ---------- Regiones del encéfalo ----------
function Encefalo() {
  return (
    <svg viewBox="0 0 400 320" role="img" aria-label="Regiones del encéfalo">
      <path d="M70 140 C70 70 150 40 220 50 C300 60 340 110 330 160 C325 190 300 200 280 205 L150 205 C100 205 70 190 70 140 Z"
        fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
      <text x="200" y="120" textAnchor="middle" style={{ ...lbl }}>Cerebro</text>
      <text x="200" y="138" textAnchor="middle" style={{ ...txtSm, fontSize: 9 }}>(funciones superiores)</text>
      <ellipse cx="300" cy="235" rx="45" ry="32" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
      <text x="300" y="240" textAnchor="middle" style={{ ...txtSm, fontSize: 10 }}>Cerebelo</text>
      <rect x="175" y="200" width="40" height="90" rx="12" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
      <text x="150" y="250" textAnchor="end" style={{ ...txtSm, fontSize: 10 }}>Tallo</text>
      <text x="150" y="263" textAnchor="end" style={{ ...txtSm, fontSize: 9 }}>cerebral</text>
      <text x="195" y="312" textAnchor="middle" style={{ ...txtSm, fontSize: 9 }}>→ médula</text>
      <ellipse cx="170" cy="160" rx="20" ry="14" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="150" y="185" style={{ ...txtSm, fontSize: 8.5 }}>Tálamo/hipotálamo</text>
    </svg>
  )
}

// ---------- Capas de la piel ----------
function Piel() {
  return (
    <svg viewBox="0 0 420 280" role="img" aria-label="Capas de la piel">
      <rect x="40" y="30" width="340" height="55" fill="#fde68a" stroke="#ca8a04" strokeWidth="1.5" />
      <rect x="40" y="85" width="340" height="90" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.5" />
      <rect x="40" y="175" width="340" height="75" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
      <text x="390" y="62" style={{ ...lbl }}>Epidermis</text>
      <text x="390" y="135" style={{ ...lbl }}>Dermis</text>
      <text x="390" y="215" style={{ ...lbl }}>Hipodermis</text>
      <text x="55" y="50" style={{ ...txtSm, fontSize: 9 }}>Estrato córneo (barrera)</text>
      <text x="55" y="120" style={{ ...txtSm, fontSize: 9 }}>Vasos, nervios, folículos</text>
      <text x="55" y="210" style={{ ...txtSm, fontSize: 9 }}>Tejido adiposo</text>
      <circle cx="150" cy="120" r="6" fill="#dc2626" /><circle cx="250" cy="140" r="5" fill="#2563eb" />
    </svg>
  )
}

// ---------- Tipos de shock ----------
function Shock() {
  const tipos = [
    ['Hipovolémico', '↓ Precarga\n(hemorragia)', '#ef4444'],
    ['Cardiogénico', '↓ Contractilidad\n(falla de bomba)', '#f59e0b'],
    ['Distributivo', '↓ RVS\n(sepsis/anafilaxia)', '#8b5cf6'],
    ['Obstructivo', 'Obstrucción\n(neumotórax)', '#0ea5e9'],
  ]
  return (
    <svg viewBox="0 0 460 220" role="img" aria-label="Tipos de shock">
      <text x="230" y="24" textAnchor="middle" style={{ ...lbl }}>Shock = hipoperfusión tisular</text>
      {tipos.map(([t, d, c], i) => (
        <g key={t}>
          <rect x={15 + i * 112} y="45" width="100" height="150" rx="10" fill={c} opacity="0.15" stroke={c} strokeWidth="2" />
          <text x={65 + i * 112} y="72" textAnchor="middle" style={{ ...txtSm, fontWeight: 700, fill: c }}>{t}</text>
          {d.split('\n').map((line, j) => (
            <text key={j} x={65 + i * 112} y={105 + j * 16} textAnchor="middle" style={{ ...txtSm, fontSize: 9 }}>{line}</text>
          ))}
        </g>
      ))}
    </svg>
  )
}

// ---------- Equilibrio ácido-base ----------
function AcidoBase() {
  return (
    <svg viewBox="0 0 460 220" role="img" aria-label="Equilibrio ácido-base">
      <line x1="40" y1="110" x2="420" y2="110" stroke="var(--texto-2)" strokeWidth="2" />
      <text x="230" y="135" textAnchor="middle" style={{ ...lbl }}>7.40</text>
      <text x="60" y="135" textAnchor="middle" style={{ ...txtSm, fill: '#dc2626' }}>Acidosis ↓7.35</text>
      <text x="400" y="135" textAnchor="middle" style={{ ...txtSm, fill: '#2563eb' }}>Alcalosis ↑7.45</text>
      <rect x="60" y="60" width="150" height="34" rx="7" fill="#fecaca" stroke="#dc2626" />
      <text x="135" y="82" textAnchor="middle" style={{ ...txtSm, fontSize: 10 }}>↑CO₂ resp / ↓HCO₃ metab</text>
      <rect x="250" y="60" width="150" height="34" rx="7" fill="#bfdbfe" stroke="#2563eb" />
      <text x="325" y="82" textAnchor="middle" style={{ ...txtSm, fontSize: 10 }}>↓CO₂ resp / ↑HCO₃ metab</text>
      <text x="230" y="180" textAnchor="middle" style={{ ...txtSm }}>pH = 6.1 + log([HCO₃⁻] / 0.03·pCO₂)</text>
    </svg>
  )
}

// ---------- Columna vertebral ----------
function Columna() {
  const seg = [['Cervical', 'C1-C7', '#0ea5e9', 7], ['Torácica', 'T1-T12', '#10b981', 12], ['Lumbar', 'L1-L5', '#f59e0b', 5], ['Sacro', 'S1-S5', '#8b5cf6', 5], ['Coxis', '', '#64748b', 1]]
  let y = 30
  return (
    <svg viewBox="0 0 360 360" role="img" aria-label="Columna vertebral">
      {seg.map(([n, r, c, num]) => {
        const startY = y
        const blocks = Array.from({ length: num }).map((_, i) => {
          const by = y; y += 16
          return <rect key={n + i} x="150" y={by} width="42" height="13" rx="3" fill={c} stroke="#1e293b" strokeWidth="0.8" />
        })
        return (
          <g key={n}>
            {blocks}
            <text x="210" y={startY + (num * 16) / 2} style={{ ...txtSm, fontWeight: 700, fill: c }}>{n}</text>
            <text x="210" y={startY + (num * 16) / 2 + 14} style={{ ...txtSm, fontSize: 9 }}>{r}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ---------- Glándulas endocrinas ----------
function Endocrino() {
  const g = [
    ['Hipófisis', 150, 45, '#8b5cf6'],
    ['Tiroides', 150, 105, '#0ea5e9'],
    ['Suprarrenales', 150, 175, '#f59e0b'],
    ['Páncreas', 150, 215, '#10b981'],
    ['Gónadas', 150, 270, '#ec4899'],
  ]
  return (
    <svg viewBox="0 0 360 320" role="img" aria-label="Glándulas endocrinas">
      <path d="M150 30 C120 30 110 70 115 120 C90 160 95 230 130 290 L170 290 C205 230 210 160 185 120 C190 70 180 30 150 30 Z"
        fill="#e2e8f0" opacity="0.5" stroke="#94a3b8" strokeWidth="1.5" />
      {g.map(([n, x, yy, c]) => (
        <g key={n}>
          <circle cx={x} cy={yy} r="9" fill={c} />
          <text x={x + 20} y={yy + 4} style={{ ...txtSm, fontWeight: 600 }}>{n}</text>
        </g>
      ))}
    </svg>
  )
}

// ---------- Tracto digestivo ----------
function Digestivo() {
  return (
    <svg viewBox="0 0 360 340" role="img" aria-label="Tracto digestivo">
      <path d="M150 30 L150 80" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
      <text x="170" y="55" style={{ ...txtSm }}>Esófago</text>
      <path d="M150 80 C110 90 110 140 160 135 C200 130 190 95 150 80 Z" fill="#fca5a5" stroke="#dc2626" strokeWidth="2" />
      <text x="60" y="115" style={{ ...txtSm }}>Estómago</text>
      <path d="M160 135 C220 150 210 200 150 200 C100 200 110 250 170 255 C230 260 220 300 150 305"
        fill="none" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />
      <text x="200" y="190" style={{ ...txtSm, fontSize: 10 }}>Int. delgado</text>
      <path d="M150 305 C90 305 80 230 100 200" fill="none" stroke="#a16207" strokeWidth="11" strokeLinecap="round" />
      <text x="55" y="270" style={{ ...txtSm, fontSize: 10 }}>Colon</text>
      <ellipse cx="210" cy="120" rx="28" ry="20" fill="#92400e" opacity="0.6" />
      <text x="210" y="124" textAnchor="middle" style={{ ...txtSm, fontSize: 9, fill: '#fff' }}>Hígado</text>
    </svg>
  )
}

// ---------- Cascada de la coagulación ----------
function Coagulacion() {
  return (
    <svg viewBox="0 0 460 240" role="img" aria-label="Cascada de la coagulación">
      <rect x="20" y="30" width="160" height="34" rx="7" fill="#bfdbfe" stroke="#2563eb" />
      <text x="100" y="52" textAnchor="middle" style={{ ...txtSm, fontSize: 10 }}>Vía intrínseca (TTPa)</text>
      <rect x="280" y="30" width="160" height="34" rx="7" fill="#fecaca" stroke="#dc2626" />
      <text x="360" y="52" textAnchor="middle" style={{ ...txtSm, fontSize: 10 }}>Vía extrínseca (TP/INR)</text>
      <path d="M100 64 L210 110 M360 64 L250 110" stroke="var(--texto-2)" strokeWidth="2" />
      <rect x="170" y="110" width="120" height="32" rx="7" fill="#ddd6fe" stroke="#7c3aed" />
      <text x="230" y="131" textAnchor="middle" style={{ ...txtSm, fontSize: 10 }}>Vía común (factor X)</text>
      <path d="M230 142 L230 168" stroke="var(--texto-2)" strokeWidth="2" markerEnd="url(#ac)" />
      <rect x="160" y="168" width="140" height="32" rx="7" fill="#bbf7d0" stroke="#16a34a" />
      <text x="230" y="189" textAnchor="middle" style={{ ...txtSm, fontSize: 10 }}>Trombina → Fibrina</text>
      <defs><marker id="ac" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="var(--texto-2)" /></marker></defs>
    </svg>
  )
}

export const diagramas = {
  celula: { comp: Celula, titulo: 'La célula y sus organelos' },
  bombanak: { comp: BombaNaK, titulo: 'Bomba Na⁺/K⁺ ATPasa' },
  corazon: { comp: Corazon, titulo: 'Anatomía del corazón y arterias coronarias' },
  conduccion: { comp: Conduccion, titulo: 'Sistema de conducción cardíaca' },
  ecg: { comp: ECG, titulo: 'Onda electrocardiográfica normal' },
  circulacion: { comp: Circulacion, titulo: 'Circulación mayor y menor' },
  gasto: { comp: GastoCardiaco, titulo: 'Determinantes del gasto cardíaco' },
  respiratorio: { comp: Respiratorio, titulo: 'Árbol traqueobronquial y pulmones' },
  oxihemoglobina: { comp: Oxihemoglobina, titulo: 'Curva de disociación de la oxihemoglobina' },
  nefrona: { comp: Nefrona, titulo: 'La nefrona' },
  neurona: { comp: Neurona, titulo: 'Neurona y sinapsis' },
  encefalo: { comp: Encefalo, titulo: 'Regiones del encéfalo' },
  piel: { comp: Piel, titulo: 'Capas de la piel' },
  shock: { comp: Shock, titulo: 'Clasificación del shock' },
  acidobase: { comp: AcidoBase, titulo: 'Equilibrio ácido-base' },
  columna: { comp: Columna, titulo: 'Columna vertebral' },
  endocrino: { comp: Endocrino, titulo: 'Glándulas endocrinas' },
  digestivo: { comp: Digestivo, titulo: 'Tracto digestivo' },
  coagulacion: { comp: Coagulacion, titulo: 'Cascada de la coagulación' },
}

// Renderiza un diagrama por su clave dentro de una tarjeta etiquetada.
export default function Diagrama({ clave, titulo, descripcion }) {
  const d = diagramas[clave]
  if (!d) return null
  const Comp = d.comp
  return (
    <figure className="diagrama">
      <div className="diagrama-lienzo">
        <Comp />
      </div>
      <figcaption className="diagrama-pie">
        <strong>{titulo || d.titulo}</strong>
        {descripcion && <span>{descripcion}</span>}
      </figcaption>
    </figure>
  )
}
