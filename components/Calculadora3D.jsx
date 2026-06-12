"use client";
import { useState } from "react";

const fmt  = (v) => v.toLocaleString("pt-BR", { style:"currency", currency:"BRL" });
const fmtN = (v, d = 2) => v.toLocaleString("pt-BR", { minimumFractionDigits:d, maximumFractionDigits:d });

/* ── Design System Talharia ───────────────────────────────────── */
const COPPER   = "#C98244";   // cobre — acento principal
const TERRA    = "#B56B3A";   // terracota — acento secundário
const TERRA_D  = "#AB5330";   // terracota profunda
const COPPER_L = "#D17D59";   // cobre claro
const BLUE     = "#6D7CFF";   // azul dashboard (contraste)
const SUCCESS  = "#31B976";   // verde positivo
const DANGER   = "#FF5252";   // vermelho crítico
const BG       = "#0D0C0A";   // negro sagrado
const PERG     = "#F2EAD8";   // pergaminho
const BORDER   = "rgba(201,130,68,0.18)";

/* mapeamento semântico para as abas */
const ACCENT  = COPPER;   // aba Custo
const ACCENT2 = BLUE;     // consumíveis / gráfico secundário
const SOLAR   = COPPER;   // energia solar
const REVENDA = TERRA;    // aba Revenda
const CUSTOM  = COPPER_L; // aba Personalizado

const CARD_BASE = {
  background: "linear-gradient(180deg, rgba(26,30,46,0.86) 0%, rgba(13,12,10,0.94) 100%)",
  border: `1px solid ${BORDER}`,
  borderRadius: 20,
  boxShadow: "0 20px 60px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.04)",
};

/* ── Componentes base ─────────────────────────────────────────── */
function Toggle({ value, onChange, label, color }) {
  const c = color || COPPER;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
      <div
        onClick={() => onChange(!value)}
        style={{
          width:42, height:24, borderRadius:100,
          background: value ? c : "rgba(26,30,46,0.80)",
          border: `1px solid ${value ? c+"80" : "rgba(201,130,68,0.14)"}`,
          cursor:"pointer", position:"relative", transition:"all .25s", flexShrink:0,
        }}
      >
        <div style={{
          position:"absolute", top:3, left: value ? 21 : 3,
          width:16, height:16, background:"#fff", borderRadius:"50%", transition:"left .25s",
        }} />
      </div>
      <span style={{ fontSize:13, color: value ? PERG : "rgba(242,234,216,0.40)", fontFamily:"'Inter',sans-serif" }}>
        {label}
      </span>
    </div>
  );
}

function Field({ label, hint, value, onChange, unit, step=1, min=0, highlight }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6, flexWrap:"wrap", gap:4 }}>
        <div>
          <span style={{ fontSize:13, color:"rgba(242,234,216,0.72)", fontWeight:500, fontFamily:"'Inter',sans-serif" }}>{label}</span>
          {hint && <span style={{ fontSize:11, color:"rgba(242,234,216,0.28)", marginLeft:6, fontFamily:"'Inter',sans-serif" }}>{hint}</span>}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <input
            type="number" min={min} step={step} value={value}
            onChange={e => onChange(parseFloat(e.target.value) || 0)}
            style={{
              width:88, padding:"8px 12px",
              background: highlight ? `${highlight}12` : "rgba(242,234,216,0.045)",
              border: `1px solid ${highlight ? highlight+"44" : "rgba(242,234,216,0.12)"}`,
              borderRadius:12,
              color: highlight || PERG,
              fontSize:14, fontFamily:"'Inter',sans-serif",
              fontVariantNumeric:"tabular-nums",
              textAlign:"right", outline:"none", WebkitAppearance:"none",
              transition:"border-color .2s",
            }}
          />
          {unit && <span style={{ fontSize:11, color:"rgba(242,234,216,0.28)", minWidth:40, fontFamily:"'Inter',sans-serif" }}>{unit}</span>}
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, children, accent }) {
  const a = accent || COPPER;
  return (
    <div style={{
      ...CARD_BASE,
      border: `1px solid ${a}28`,
      padding:"20px 22px",
      marginBottom:12,
    }}>
      <div style={{
        display:"flex", alignItems:"center", gap:10, marginBottom:18,
        paddingBottom:14, borderBottom:"1px solid rgba(242,234,216,0.07)",
      }}>
        <div style={{
          width:34, height:34, borderRadius:10,
          display:"flex", alignItems:"center", justifyContent:"center",
          background: `${a}14`,
          border: `1px solid ${a}28`,
          fontSize:16, flexShrink:0,
        }}>
          {icon}
        </div>
        <span style={{
          fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:700,
          letterSpacing:1.5, color:a, textTransform:"uppercase",
        }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function Bar({ label, value, total, color }) {
  const pct = total > 0 ? Math.min(100, (value / total) * 100) : 0;
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <span style={{ fontSize:12, color:"rgba(242,234,216,0.45)", fontFamily:"'Inter',sans-serif" }}>{label}</span>
        <span style={{ fontSize:12, color:"rgba(242,234,216,0.65)", fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>
          {pct.toFixed(1)}% · {fmt(value)}
        </span>
      </div>
      <div style={{ height:5, background:"rgba(242,234,216,0.06)", borderRadius:10, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:10, transition:"width .4s ease" }} />
      </div>
    </div>
  );
}

function InfoBox({ color, children }) {
  const c = color || COPPER;
  return (
    <div style={{
      background:`${c}0C`, border:`1px solid ${c}1E`,
      borderRadius:12, padding:"10px 14px",
      fontSize:12, color:"rgba(242,234,216,0.52)", lineHeight:1.6,
      marginTop:4, fontFamily:"'Inter',sans-serif",
    }}>
      {children}
    </div>
  );
}

function TabBtn({ active, onClick, children, color }) {
  const c = color || COPPER;
  return (
    <button
      onClick={onClick}
      style={{
        flex:1, padding:"11px 8px",
        border: active ? `1px solid ${c}30` : "1px solid transparent",
        cursor:"pointer", borderRadius:12,
        background: active ? `linear-gradient(135deg, ${c}22, ${c}0E)` : "transparent",
        color: active ? c : "rgba(242,234,216,0.32)",
        fontFamily:"'Jost',sans-serif",
        fontSize:10, letterSpacing:1.8, textTransform:"uppercase",
        fontWeight: active ? 700 : 500,
        outline:"none", transition:"all .2s",
        borderBottom: active ? `2px solid ${c}` : "2px solid transparent",
      }}
    >
      {children}
    </button>
  );
}

/* ── ABA REVENDA ──────────────────────────────────────────────── */
function TabelaRevenda({ custoBase, custoSetup }) {
  const [mVar, setMVar] = useState(40);
  const [mRev, setMRev] = useState(25);
  const [mAta, setMAta] = useState(15);
  const [bulk, setBulk] = useState(10);

  const faixas = [
    { label:"Varejo",  qtd:1,   icon:"🛍️", margem:mVar,  color:COPPER },
    { label:"Varejo",  qtd:5,   icon:"🛍️", margem:mVar,  color:COPPER },
    { label:"Revenda", qtd:10,  icon:"🏪", margem:mRev,  color:COPPER_L },
    { label:"Revenda", qtd:25,  icon:"🏪", margem:mRev,  color:COPPER_L },
    { label:"Atacado", qtd:50,  icon:"📦", margem:mAta,  color:TERRA },
    { label:"Atacado", qtd:100, icon:"📦", margem:mAta,  color:TERRA },
  ];

  const calcUn = (qtd) => {
    const desc = qtd >= 50 ? bulk/100 : qtd >= 10 ? (bulk/100)*0.5 : 0;
    return custoBase*(1-desc) + custoSetup/qtd;
  };
  const base1 = calcUn(1);

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
        {[
          { label:"Margem Varejo",  value:mVar, set:setMVar, color:COPPER },
          { label:"Margem Revenda", value:mRev, set:setMRev, color:COPPER_L },
          { label:"Margem Atacado", value:mAta, set:setMAta, color:TERRA },
        ].map(m => (
          <div key={m.label} style={{
            background:`${m.color}0E`, border:`1px solid ${m.color}28`,
            borderRadius:14, padding:"14px 10px", textAlign:"center",
          }}>
            <div style={{ fontSize:9, color:m.color, marginBottom:8, fontFamily:"'Jost',sans-serif", letterSpacing:1.5, textTransform:"uppercase", fontWeight:600 }}>
              {m.label}
            </div>
            <input
              type="number" min={0} step={5} value={m.value}
              onChange={e => m.set(parseFloat(e.target.value)||0)}
              style={{
                width:"100%", padding:"6px 4px", background:"transparent",
                border:`1px solid ${m.color}28`, borderRadius:10,
                color:m.color, fontFamily:"'Inter',sans-serif",
                fontSize:20, fontWeight:700, textAlign:"center",
                outline:"none", WebkitAppearance:"none",
              }}
            />
            <div style={{ fontSize:10, color:"rgba(242,234,216,0.30)", marginTop:4, fontFamily:"'Inter',sans-serif" }}>%</div>
          </div>
        ))}
      </div>

      <Field label="Desconto bulk (filamento)" hint="ao comprar mais kg" value={bulk} onChange={setBulk} unit="%" step={1} />

      <div style={{ borderRadius:16, overflow:"hidden", border:`1px solid rgba(201,130,68,0.14)` }}>
        <div style={{
          display:"grid", gridTemplateColumns:"80px 1fr 1fr 1fr 1fr",
          background:"rgba(201,130,68,0.06)", padding:"10px 16px", gap:8,
          borderBottom:`1px solid rgba(201,130,68,0.10)`,
        }}>
          {["Lote","Custo/un","Preço/un","Receita","Lucro"].map(h => (
            <span key={h} style={{ fontSize:10, color:"rgba(242,234,216,0.35)", fontFamily:"'Jost',sans-serif", letterSpacing:1.2, textTransform:"uppercase", fontWeight:600 }}>{h}</span>
          ))}
        </div>
        {faixas.map((f, i) => {
          const cu   = calcUn(f.qtd);
          const pu   = cu*(1+f.margem/100);
          const eco  = ((base1-cu)/base1*100);
          const isBest = f.qtd === 25;
          return (
            <div key={i} style={{
              display:"grid", gridTemplateColumns:"80px 1fr 1fr 1fr 1fr",
              padding:"14px 16px", gap:8, alignItems:"center",
              borderTop:`1px solid rgba(242,234,216,0.05)`,
              background: isBest ? `${f.color}08` : "transparent",
              position:"relative",
            }}>
              {isBest && (
                <div style={{
                  position:"absolute", top:-1, right:12,
                  background:`linear-gradient(135deg, ${TERRA_D}, ${COPPER})`,
                  color:"#fff", fontSize:9, fontWeight:700,
                  padding:"2px 10px", borderRadius:"0 0 8px 8px",
                  fontFamily:"'Jost',sans-serif", letterSpacing:1.5,
                }}>
                  TOP
                </div>
              )}
              <div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:16, fontWeight:700, color:f.color }}>{f.qtd}x</div>
                <div style={{ fontSize:10, color:"rgba(242,234,216,0.35)", marginTop:2, fontFamily:"'Inter',sans-serif" }}>{f.icon} {f.label}</div>
                {eco > 0.5 && <div style={{ fontSize:9, color:f.color, marginTop:2 }}>-{fmtN(eco,1)}%</div>}
              </div>
              <div><span style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:"rgba(242,234,216,0.50)", fontVariantNumeric:"tabular-nums" }}>{fmt(cu)}</span></div>
              <div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:PERG, fontWeight:600, fontVariantNumeric:"tabular-nums" }}>{fmt(pu)}</div>
                <div style={{ fontSize:10, color:"rgba(242,234,216,0.30)", marginTop:2 }}>{f.margem}%</div>
              </div>
              <div><span style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:f.color, fontVariantNumeric:"tabular-nums" }}>{fmt(pu*f.qtd)}</span></div>
              <div><span style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:SUCCESS, fontVariantNumeric:"tabular-nums" }}>{fmt((pu-cu)*f.qtd)}</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── ABA PERSONALIZAÇÃO ───────────────────────────────────────── */
function AbaPersonalizacao({ custoBase, margemBase }) {
  const [modelagem, setModelagem]         = useState(false);
  const [hModelagem, setHModelagem]       = useState(1.5);
  const [valorHModelo, setValorHModelo]   = useState(80);
  const [numRevisoes, setNumRevisoes]     = useState(2);
  const [valorRevisao, setValorRevisao]   = useState(20);
  const [usaArquivo, setUsaArquivo]       = useState(false);
  const [licenca, setLicenca]             = useState(35);
  const [posProc, setPosProc]             = useState(false);
  const [tipoPos, setTipoPos]             = useState({ lixamento:false, pintura:false, verniz:false, montagem:false });
  const [hPosProc, setHPosProc]           = useState(0.5);
  const [valorHPos, setValorHPos]         = useState(50);
  const [materialPos, setMaterialPos]     = useState(8);
  const [embPremium, setEmbPremium]       = useState(false);
  const [custoEmbP, setCustoEmbP]         = useState(12);
  const [complexidade, setComplexidade]   = useState(15);
  const [urgencia, setUrgencia]           = useState(false);
  const [percUrgencia, setPercUrgencia]   = useState(30);
  const [margemCustom, setMargemCustom]   = useState(margemBase + 40);
  const [nomeCliente, setNomeCliente]     = useState("");
  const [nomeProduto, setNomeProduto]     = useState("");

  const cModelagem    = modelagem ? hModelagem*valorHModelo + numRevisoes*valorRevisao : 0;
  const cArquivo      = usaArquivo ? licenca : 0;
  const cPosProc      = posProc ? hPosProc*valorHPos + materialPos : 0;
  const cEmbP         = embPremium ? custoEmbP : 0;
  const cComplexidade = custoBase * (complexidade/100);
  const subtotal      = custoBase + cModelagem + cArquivo + cPosProc + cEmbP + cComplexidade;
  const cUrgencia     = urgencia ? subtotal*(percUrgencia/100) : 0;
  const totalCustom   = subtotal + cUrgencia;
  const vMargem       = totalCustom*(margemCustom/100);
  const precoFinal    = totalCustom + vMargem;
  const adicional     = precoFinal - (custoBase*(1+margemBase/100));

  const tiposPos = [
    { key:"lixamento", label:"Lixamento", icon:"🪚" },
    { key:"pintura",   label:"Pintura",   icon:"🎨" },
    { key:"verniz",    label:"Verniz",    icon:"✨" },
    { key:"montagem",  label:"Montagem",  icon:"🔧" },
  ];

  const bars2 = [
    { label:"Custo base impressão",   value:custoBase,      color:COPPER },
    { label:"Modelagem / design",     value:cModelagem,     color:COPPER_L },
    { label:"Licença de arquivo",     value:cArquivo,       color:TERRA },
    { label:"Pós-processamento",      value:cPosProc,       color:BLUE },
    { label:"Embalagem premium",      value:cEmbP,          color:TERRA_D },
    { label:"Complexidade (+suporte)",value:cComplexidade,  color:"#7F8CFF" },
    ...(urgencia ? [{ label:"Taxa urgência", value:cUrgencia, color:DANGER }] : []),
  ].filter(b => b.value > 0);

  const inputText = {
    width:"100%", padding:"10px 14px",
    background:"rgba(242,234,216,0.045)",
    border:"1px solid rgba(242,234,216,0.12)",
    borderRadius:12, color:PERG, fontSize:13,
    fontFamily:"'Inter',sans-serif", outline:"none", boxSizing:"border-box",
    transition:"border-color .2s",
  };

  return (
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      {/* Identificação do pedido */}
      <div style={{
        ...CARD_BASE,
        border:`1px solid ${COPPER_L}28`,
        padding:"18px 20px", marginBottom:12,
      }}>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:COPPER_L, letterSpacing:2, textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>
          Identificação do Pedido Personalizado
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            { label:"Nome do cliente", value:nomeCliente, set:setNomeCliente, placeholder:"Ex: João Silva" },
            { label:"Nome / descrição da peça", value:nomeProduto, set:setNomeProduto, placeholder:"Ex: Crucifixo com base" },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize:12, color:"rgba(242,234,216,0.45)", marginBottom:6, fontFamily:"'Inter',sans-serif" }}>{f.label}</div>
              <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                style={{ ...inputText, color:PERG }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid-main" style={{ display:"grid", gridTemplateColumns:"1fr", gap:0 }}>
        <div>
          {/* Custo base */}
          <div style={{
            ...CARD_BASE,
            border:`1px solid ${COPPER_L}20`,
            padding:"14px 18px", marginBottom:12,
            display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <div>
              <div style={{ fontSize:12, color:"rgba(242,234,216,0.40)", fontFamily:"'Inter',sans-serif" }}>Custo base (aba Custo &amp; Preço)</div>
              <div style={{ fontSize:20, fontWeight:700, color:PERG, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums", marginTop:4 }}>{fmt(custoBase)}</div>
            </div>
            <div style={{ fontSize:11, color:"rgba(242,234,216,0.35)", textAlign:"right", fontFamily:"'Inter',sans-serif" }}>
              <div>Peça padrão: {fmt(custoBase*(1+margemBase/100))}</div>
              <div style={{ color:"rgba(242,234,216,0.25)", marginTop:2 }}>margem base: {margemBase}%</div>
            </div>
          </div>

          <Card title="Modelagem & Design 3D" icon="🎨" accent={COPPER_L}>
            <Toggle value={modelagem} onChange={setModelagem} label="Incluir modelagem / adaptação" color={COPPER_L} />
            {modelagem && (
              <>
                <Field label="Horas de modelagem" value={hModelagem} onChange={setHModelagem} unit="h" step={0.25} highlight={COPPER_L} />
                <Field label="Valor hora de modelagem" value={valorHModelo} onChange={setValorHModelo} unit="R$/h" step={10} highlight={COPPER_L} />
                <Field label="Nº de revisões inclusas" hint="rodadas de ajuste" value={numRevisoes} onChange={setNumRevisoes} unit="x" step={1} />
                <Field label="Valor por revisão extra" value={valorRevisao} onChange={setValorRevisao} unit="R$/x" step={5} />
                <InfoBox color={COPPER_L}>💡 Defina quantas revisões estão inclusas no preço. Acima disso, cobre à parte — isso protege seu tempo e educa o cliente.</InfoBox>
              </>
            )}
          </Card>

          <Card title="Licença de Arquivo 3D" icon="📁" accent={TERRA}>
            <Toggle value={usaArquivo} onChange={setUsaArquivo} label="Comprei arquivo de terceiro" color={TERRA} />
            {usaArquivo && (
              <>
                <Field label="Custo da licença" hint="valor pago pelo arquivo" value={licenca} onChange={setLicenca} unit="R$" step={5} highlight={TERRA} />
                <InfoBox color={TERRA}>📁 Sempre repasse 100% do custo da licença ao cliente — é um insumo direto do pedido.</InfoBox>
              </>
            )}
          </Card>

          <Card title="Complexidade de Impressão" icon="⚙️" accent={COPPER}>
            <Field label="Acréscimo por complexidade" hint="suporte extra, geometria difícil" value={complexidade} onChange={setComplexidade} unit="%" step={5} highlight={COPPER} />
            <InfoBox color={COPPER}>⚙️ Peças personalizadas costumam ter mais suporte e material desperdiçado. 10–20% é uma faixa saudável.</InfoBox>
          </Card>

          <Card title="Pós-processamento & Acabamento" icon="✨" accent={BLUE}>
            <Toggle value={posProc} onChange={setPosProc} label="Inclui acabamento especial" color={BLUE} />
            {posProc && (
              <>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:12, color:"rgba(242,234,216,0.45)", marginBottom:10, fontFamily:"'Inter',sans-serif" }}>Tipo de acabamento:</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {tiposPos.map(t => (
                      <div key={t.key}
                        onClick={() => setTipoPos(p => ({ ...p, [t.key]:!p[t.key] }))}
                        style={{
                          padding:"10px 14px", borderRadius:12, cursor:"pointer",
                          border:`1px solid ${tipoPos[t.key] ? BLUE+"50" : "rgba(242,234,216,0.08)"}`,
                          background: tipoPos[t.key] ? `${BLUE}12` : "transparent",
                          display:"flex", alignItems:"center", gap:8,
                          fontSize:13, color: tipoPos[t.key] ? BLUE : "rgba(242,234,216,0.40)",
                          transition:"all .2s", fontFamily:"'Inter',sans-serif",
                        }}
                      >
                        <span>{t.icon}</span>{t.label}
                      </div>
                    ))}
                  </div>
                </div>
                <Field label="Horas de acabamento" value={hPosProc} onChange={setHPosProc} unit="h" step={0.25} />
                <Field label="Valor hora acabamento" value={valorHPos} onChange={setValorHPos} unit="R$/h" step={5} />
                <Field label="Material de acabamento" hint="tinta, lixa, verniz…" value={materialPos} onChange={setMaterialPos} unit="R$" step={1} />
              </>
            )}
          </Card>

          <Card title="Embalagem Premium Personalizada" icon="🎁" accent={TERRA_D}>
            <Toggle value={embPremium} onChange={setEmbPremium} label="Embalagem especial para presente/cliente" color={TERRA_D} />
            {embPremium && (
              <>
                <Field label="Custo da embalagem premium" hint="caixa, laço, papel, tag…" value={custoEmbP} onChange={setCustoEmbP} unit="R$" step={1} highlight={TERRA_D} />
                <InfoBox color={TERRA_D}>🎁 Embalagem premium justifica um preço percebido muito maior — invista nisso para clientes de presente.</InfoBox>
              </>
            )}
          </Card>

          <Card title="Taxa de Urgência" icon="⚡" accent={DANGER}>
            <Toggle value={urgencia} onChange={setUrgencia} label="Pedido urgente / prazo reduzido" color={DANGER} />
            {urgencia && (
              <>
                <Field label="Adicional de urgência" value={percUrgencia} onChange={setPercUrgencia} unit="%" step={5} highlight={DANGER} />
                <InfoBox color={DANGER}>⚡ Urgência tem valor. 20–50% é prática comum. Isso cobre reorganização de fila e estresse operacional.</InfoBox>
              </>
            )}
          </Card>

          <Card title="Margem de Personalização" icon="💎" accent={COPPER}>
            <Field label="Margem para pedido personalizado" value={margemCustom} onChange={setMargemCustom} unit="%" step={5} highlight={COPPER} />
            <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderTop:"1px solid rgba(242,234,216,0.07)", marginTop:8 }}>
              <span style={{ fontSize:12, color:"rgba(242,234,216,0.35)", fontFamily:"'Inter',sans-serif" }}>Margem base (padrão)</span>
              <span style={{ fontSize:12, color:"rgba(242,234,216,0.35)", fontFamily:"'Inter',sans-serif" }}>{margemBase}%</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0" }}>
              <span style={{ fontSize:12, color:COPPER, fontFamily:"'Inter',sans-serif" }}>Prêmio da personalização</span>
              <span style={{ fontSize:12, color:COPPER, fontFamily:"'Inter',sans-serif" }}>+{margemCustom - margemBase}%</span>
            </div>
            <InfoBox color={COPPER}>💎 Personalização é exclusividade. Uma margem 30–50% maior que o padrão é justa e esperada pelo mercado premium.</InfoBox>
          </Card>
        </div>

        {/* Painel resultado personalização */}
        <div className="sticky-col">
          <div style={{
            ...CARD_BASE,
            border:`1px solid ${COPPER}30`,
            boxShadow:`0 28px 80px rgba(0,0,0,0.42), 0 0 32px rgba(201,130,68,0.10)`,
            padding:"24px 22px",
          }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:2.5, color:COPPER, textTransform:"uppercase", fontWeight:700, marginBottom:18 }}>
              💎 Orçamento Personalizado
            </div>

            {(nomeCliente || nomeProduto) && (
              <div style={{
                background:`${COPPER}0C`, borderRadius:12, padding:"12px 14px",
                marginBottom:16, border:`1px solid ${COPPER}18`,
              }}>
                {nomeCliente  && <div style={{ fontSize:13, color:PERG, fontFamily:"'Inter',sans-serif" }}>👤 {nomeCliente}</div>}
                {nomeProduto  && <div style={{ fontSize:12, color:"rgba(242,234,216,0.45)", marginTop:3, fontFamily:"'Inter',sans-serif" }}>📦 {nomeProduto}</div>}
              </div>
            )}

            {[
              { l:"Custo base impressão",    v:custoBase,       show:true },
              { l:"Modelagem & design",      v:cModelagem,      show:modelagem && cModelagem > 0 },
              { l:"Licença de arquivo",      v:cArquivo,        show:usaArquivo },
              { l:"Pós-processamento",       v:cPosProc,        show:posProc },
              { l:"Embalagem premium",       v:cEmbP,           show:embPremium },
              { l:"Complexidade (+suporte)", v:cComplexidade,   show:complexidade > 0 },
              { l:"Taxa de urgência",        v:cUrgencia,       show:urgencia },
            ].filter(r => r.show).map(r => (
              <div key={r.l} style={{
                display:"flex", justifyContent:"space-between",
                padding:"9px 0", borderBottom:"1px solid rgba(242,234,216,0.06)",
              }}>
                <span style={{ fontSize:13, color:"rgba(242,234,216,0.60)", fontFamily:"'Inter',sans-serif" }}>{r.l}</span>
                <span style={{ fontSize:13, color:PERG, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>{fmt(r.v)}</span>
              </div>
            ))}

            <div style={{ marginTop:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid rgba(242,234,216,0.08)" }}>
                <span style={{ fontWeight:700, color:PERG, fontFamily:"'Inter',sans-serif" }}>Custo total personalizado</span>
                <span style={{ fontSize:15, fontWeight:700, color:PERG, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>{fmt(totalCustom)}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0" }}>
                <span style={{ fontSize:13, color:"rgba(242,234,216,0.35)", fontFamily:"'Inter',sans-serif" }}>Margem ({margemCustom}%)</span>
                <span style={{ fontSize:13, color:"rgba(242,234,216,0.35)", fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>+ {fmt(vMargem)}</span>
              </div>
            </div>

            {/* Preço final */}
            <div style={{
              marginTop:10,
              background:`linear-gradient(135deg, ${TERRA_D}, ${COPPER}, ${COPPER_L})`,
              borderRadius:16, padding:"20px 18px", textAlign:"center",
              boxShadow:`0 14px 32px rgba(181,107,58,0.28)`,
            }}>
              <div style={{ fontSize:10, letterSpacing:2.5, color:"rgba(255,255,255,0.70)", fontFamily:"'Jost',sans-serif", textTransform:"uppercase", marginBottom:8, fontWeight:700 }}>
                Preço Final Personalizado
              </div>
              <div style={{ fontSize:40, fontWeight:700, letterSpacing:-1, color:"#fff", fontFamily:"'Jost',sans-serif", fontVariantNumeric:"tabular-nums" }}>
                {fmt(precoFinal)}
              </div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.55)", marginTop:6, fontFamily:"'Inter',sans-serif" }}>por peça única</div>
            </div>

            {/* vs padrão */}
            <div style={{ marginTop:16, background:"rgba(242,234,216,0.03)", borderRadius:14, padding:"14px 16px", border:"1px solid rgba(242,234,216,0.06)" }}>
              <div style={{ fontSize:10, color:"rgba(242,234,216,0.28)", fontFamily:"'Jost',sans-serif", letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>vs peça padrão</div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontSize:12, color:"rgba(242,234,216,0.40)", fontFamily:"'Inter',sans-serif" }}>Peça padrão ({margemBase}% margem)</span>
                <span style={{ fontSize:12, color:"rgba(242,234,216,0.40)", fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>{fmt(custoBase*(1+margemBase/100))}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:13, color:COPPER, fontWeight:600, fontFamily:"'Inter',sans-serif" }}>Valor adicional cobrado</span>
                <span style={{ fontSize:14, color:COPPER, fontWeight:700, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>+ {fmt(adicional)}</span>
              </div>
            </div>

            {/* Composição */}
            <div style={{ marginTop:22 }}>
              <div style={{ fontSize:10, letterSpacing:2, color:"rgba(242,234,216,0.28)", fontFamily:"'Jost',sans-serif", textTransform:"uppercase", marginBottom:14, fontWeight:700 }}>Composição</div>
              {bars2.map(b => <Bar key={b.label} {...b} total={totalCustom} />)}
            </div>

            {/* Resumo */}
            <div style={{ marginTop:20, background:`${COPPER}0A`, border:`1px solid ${COPPER}1E`, borderRadius:14, padding:"16px 16px" }}>
              <div style={{ fontSize:10, color:COPPER, fontFamily:"'Jost',sans-serif", letterSpacing:1.5, textTransform:"uppercase", marginBottom:14, fontWeight:700 }}>📋 Resumo do Orçamento</div>
              {[
                { l:"Peça base",       v:fmt(custoBase) },
                { l:"Serviços extra",  v:fmt(totalCustom-custoBase) },
                { l:"Margem aplicada", v:`${margemCustom}%` },
                { l:"Preço final",     v:fmt(precoFinal), destaque:true },
              ].map(c => (
                <div key={c.l} style={{
                  display:"flex", justifyContent:"space-between",
                  padding:"6px 0", borderBottom:`1px solid ${COPPER}12`,
                }}>
                  <span style={{ fontSize:12, color: c.destaque ? PERG : "rgba(242,234,216,0.40)", fontWeight: c.destaque ? 700 : 400, fontFamily:"'Inter',sans-serif" }}>{c.l}</span>
                  <span style={{ fontSize:12, color: c.destaque ? COPPER : "rgba(242,234,216,0.40)", fontWeight: c.destaque ? 700 : 400, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>{c.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── APP PRINCIPAL ────────────────────────────────────────────── */
export default function Calc3D() {
  const [aba, setAba]               = useState("custo");
  const [usaLeva, setUsaLeva]       = useState(false);
  const [pecasLeva, setPecasLeva]   = useState(4);
  const [horasLeva, setHorasLeva]   = useState(8);
  const [gramas, setGramas]         = useState(50);
  const [precoKg, setPrecoKg]       = useState(120);
  const [falha, setFalha]           = useState(10);
  const [usaMulticolor, setUsaMulticolor] = useState(false);
  const [numCores, setNumCores]     = useState(3);
  const [purgaTotal, setPurgaTotal] = useState(20);
  const [horas, setHoras]           = useState(3);
  const [watts, setWatts]           = useState(350);
  const [usaSolar, setUsaSolar]     = useState(false);
  const [kwhRede, setKwhRede]       = useState(0.78);
  const [kwhSolar, setKwhSolar]     = useState(0.15);
  const [percSolar, setPercSolar]   = useState(80);
  const [precoImp, setPrecoImp]     = useState(4500);
  const [vidaUtil, setVidaUtil]     = useState(5000);
  const [precoBico, setPrecoBico]   = useState(28);
  const [vidaBico, setVidaBico]     = useState(500);
  const [precoPlaca, setPrecoPlaca] = useState(90);
  const [vidaPlaca, setVidaPlaca]   = useState(300);
  const [usaEmb, setUsaEmb]         = useState(false);
  const [precoEmb, setPrecoEmb]     = useState(3.5);
  const [freteEmb, setFreteEmb]     = useState(0);
  const [usaMO, setUsaMO]           = useState(false);
  const [valorHora, setValorHora]   = useState(50);
  const [minPreparo, setMinPreparo] = useState(15);
  const [minInicio, setMinInicio]   = useState(8);
  const [minMonitor, setMinMonitor] = useState(5);
  const [minPos, setMinPos]         = useState(15);
  const [margem, setMargem]         = useState(40);

  const horasEfetivas    = usaLeva ? horasLeva / pecasLeva : horas;
  const divisorLeva      = usaLeva ? pecasLeva : 1;
  const kwhEfetivo       = usaSolar ? (kwhSolar*percSolar/100)+(kwhRede*(1-percSolar/100)) : kwhRede;
  const energiaKwh       = usaLeva ? (watts/1000)*horasLeva : (watts/1000)*horas;
  const cEnergia         = (energiaKwh*kwhEfetivo) / divisorLeva;
  const cEnergiaSemSolar = (energiaKwh*kwhRede) / divisorLeva;
  const economiaSolar    = cEnergiaSemSolar - cEnergia;
  const gramasEfetivas   = gramas*(1+falha/100);
  const cFilamento       = (gramasEfetivas/1000)*precoKg;
  const cPurga           = usaMulticolor ? (purgaTotal/1000)*precoKg : 0;
  const cDeprec          = ((precoImp/vidaUtil)*(usaLeva ? horasLeva : horas)) / divisorLeva;
  const cConsumivel      = ((precoBico/vidaBico)*(usaLeva ? horasLeva : horas) + precoPlaca/vidaPlaca) / divisorLeva;
  const cEmb             = usaEmb ? precoEmb+freteEmb : 0;
  const minAtivo         = minPreparo + minInicio + minMonitor + minPos;
  const cMO              = usaMO ? (valorHora*(minAtivo/60)) / divisorLeva : 0;
  const custoSetup       = usaMO ? (valorHora*((minPreparo+minInicio)/60)) / divisorLeva : 0;
  const total            = cFilamento+cPurga+cEnergia+cDeprec+cConsumivel+cEmb+cMO;
  const totalSemSolar    = cFilamento+cPurga+cEnergiaSemSolar+cDeprec+cConsumivel+cEmb+cMO;
  const precoVenda       = total*(1+margem/100);

  const bars = [
    { label:"Filamento PLA", value:cFilamento,  color:COPPER },
    ...(usaMulticolor ? [{ label:`Purga AMS (${numCores} cores)`, value:cPurga, color:"#E8A87C" }] : []),
    { label:"Energia",       value:cEnergia,    color: usaSolar ? COPPER_L : TERRA },
    { label:"Depreciação",   value:cDeprec,     color:TERRA_D },
    { label:"Consumíveis",   value:cConsumivel, color:BLUE },
    ...(usaEmb ? [{ label:"Embalagem",   value:cEmb, color:"#7F8CFF" }] : []),
    ...(usaMO  ? [{ label:"Mão de obra", value:cMO,  color:"#A78BFA" }] : []),
  ];

  return (
    <div style={{
      minHeight:"100vh", background:BG,
      backgroundImage:`
        radial-gradient(circle at top right, rgba(201,130,68,0.10), transparent 32%),
        radial-gradient(circle at bottom left, rgba(26,30,46,0.70), transparent 42%)
      `,
      fontFamily:"'Inter',sans-serif", color:PERG,
      padding:"32px 16px 80px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @media(min-width:720px){
          .grid-main { grid-template-columns:1fr 1fr !important; gap:20px !important; align-items:start !important; }
          .sticky-col { position:sticky !important; top:24px !important; }
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
        input[type=number] { -moz-appearance:textfield; }
        input::placeholder { color: rgba(242,234,216,0.28); }
        input:focus { border-color: rgba(201,130,68,0.52) !important; box-shadow: 0 0 0 3px rgba(201,130,68,0.09); }
      `}</style>

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:36 }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:"rgba(201,130,68,0.10)",
          border:`1px solid rgba(201,130,68,0.22)`,
          borderRadius:100, padding:"5px 16px", marginBottom:18,
        }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:COPPER, display:"inline-block", flexShrink:0 }} />
          <span style={{ fontSize:10, letterSpacing:2.5, color:COPPER, fontFamily:"'Jost',sans-serif", textTransform:"uppercase", fontWeight:700 }}>
            Bambu Lab A1 Combo · AMS Lite · Goiânia — GO
          </span>
        </div>
        <h1 style={{ fontSize:30, fontWeight:700, margin:0, letterSpacing:-0.5, lineHeight:1.2, color:PERG, fontFamily:"'Jost',sans-serif" }}>
          Calculadora de Custos<br />
          <span style={{ color:COPPER }}>Impressão 3D</span>
        </h1>
        <p style={{ color:"rgba(242,234,216,0.36)", fontSize:13, marginTop:10, fontFamily:"'Inter',sans-serif" }}>
          Equatorial Goiás · R$0,78/kWh · Reajuste out/2025
        </p>
      </div>

      {/* Abas */}
      <div style={{
        maxWidth:860, margin:"0 auto 20px",
        display:"flex",
        ...CARD_BASE,
        padding:5, gap:4,
      }}>
        <TabBtn active={aba==="custo"}   onClick={() => setAba("custo")}   color={COPPER}>⚙️ Custo</TabBtn>
        <TabBtn active={aba==="revenda"} onClick={() => setAba("revenda")} color={TERRA}>📦 Revenda</TabBtn>
        <TabBtn active={aba==="custom"}  onClick={() => setAba("custom")}  color={COPPER_L}>💎 Personalizado</TabBtn>
      </div>

      {/* ── ABA CUSTO ─────────────────────────────────────────── */}
      {aba === "custo" && (
        <div className="grid-main" style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr", gap:0 }}>
          <div>
            {/* MODO LEVA */}
            <Card title="Modo de Impressão" icon="🖨️" accent={usaLeva ? COPPER_L : "rgba(201,130,68,0.30)"}>
              <Toggle value={usaLeva} onChange={setUsaLeva} label="Impressão em leva (múltiplas peças juntas)" color={COPPER_L} />
              {usaLeva ? (
                <>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, margin:"4px 0 16px" }}>
                    {[
                      { label:"Peças na leva", value:pecasLeva, set:(v) => setPecasLeva(Math.max(1,v)), sub:"peças simultâneas", color:COPPER_L },
                      { label:"Tempo total da leva", value:horasLeva, set:setHorasLeva, sub:"horas no total", step:0.25, color:COPPER },
                    ].map(f => (
                      <div key={f.label}>
                        <div style={{ fontSize:12, color:"rgba(242,234,216,0.45)", marginBottom:8, fontFamily:"'Inter',sans-serif" }}>{f.label}</div>
                        <input type="number" min={1} step={f.step||1} value={f.value}
                          onChange={e => f.set(parseFloat(e.target.value)||1)}
                          style={{
                            width:"100%", padding:"12px 14px",
                            background:`${f.color}10`,
                            border:`1px solid ${f.color}30`,
                            borderRadius:14, color:f.color,
                            fontFamily:"'Inter',sans-serif", fontSize:24, fontWeight:700,
                            textAlign:"center", outline:"none", WebkitAppearance:"none",
                          }}
                        />
                        <div style={{ fontSize:10, color:"rgba(242,234,216,0.28)", marginTop:5, textAlign:"center", fontFamily:"'Inter',sans-serif" }}>{f.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    background:`${COPPER_L}08`,
                    border:`1px solid ${COPPER_L}18`,
                    borderRadius:12, padding:"12px 14px",
                  }}>
                    <div style={{ fontSize:10, color:COPPER_L, fontFamily:"'Jost',sans-serif", letterSpacing:1.5, textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>
                      Como os custos são divididos
                    </div>
                    {[
                      { icon:"🧵", label:"Filamento",   tipo:"individual",    desc:`cada peça usa ${fmtN(gramasEfetivas,1)}g` },
                      { icon:"⚡", label:"Energia",     tipo:"compartilhado", desc:`${horasLeva}h ÷ ${pecasLeva} peças` },
                      { icon:"🖨️", label:"Depreciação", tipo:"compartilhado", desc:`${horasLeva}h ÷ ${pecasLeva} peças` },
                      { icon:"🔩", label:"Consumíveis", tipo:"compartilhado", desc:`rateado por peça` },
                      { icon:"👤", label:"Mão de obra", tipo:"compartilhado", desc:`setup ÷ ${pecasLeva} peças` },
                    ].map(r => (
                      <div key={r.label} style={{
                        display:"flex", justifyContent:"space-between", alignItems:"center",
                        padding:"6px 0", borderBottom:`1px solid ${COPPER_L}10`,
                      }}>
                        <span style={{ fontSize:12, color:"rgba(242,234,216,0.50)", fontFamily:"'Inter',sans-serif" }}>{r.icon} {r.label}</span>
                        <div style={{ textAlign:"right" }}>
                          <span style={{
                            fontSize:10, fontFamily:"'Jost',sans-serif", fontWeight:600,
                            color: r.tipo==="individual" ? SUCCESS : COPPER_L,
                            background: r.tipo==="individual" ? `${SUCCESS}14` : `${COPPER_L}14`,
                            padding:"2px 10px", borderRadius:100, letterSpacing:1,
                          }}>
                            {r.tipo}
                          </span>
                          <div style={{ fontSize:10, color:"rgba(242,234,216,0.28)", marginTop:3, fontFamily:"'Inter',sans-serif" }}>{r.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <Field label="Tempo de impressão" hint="peça única" value={horas} onChange={setHoras} unit="h" step={0.25} />
                  <InfoBox color={COPPER}>💡 Imprime várias peças ao mesmo tempo? Ative o Modo Leva acima para dividir os custos corretamente.</InfoBox>
                </>
              )}
            </Card>

            <Card title="Filamento" icon="🧵" accent={COPPER}>
              <Field label="Peso por peça" hint="(g cada)" value={gramas} onChange={setGramas} unit="g" step={0.5} />
              <Field label="Preço do filamento" value={precoKg} onChange={setPrecoKg} unit="R$/kg" step={5} />
              <Field label="Taxa de falha / reimpressão" value={falha} onChange={setFalha} unit="%" step={1} />
              <InfoBox color={COPPER}>
                <span style={{ color:COPPER }}>
                  {usaLeva
                    ? `${pecasLeva} peças × ${fmtN(gramasEfetivas,1)}g = ${fmtN(gramasEfetivas*pecasLeva,1)}g total · ${fmt(cFilamento)} por peça`
                    : `Consumo real: ${fmtN(gramasEfetivas,1)}g · ${fmt(cFilamento)}`
                  }
                </span>
              </InfoBox>

              {/* Multicolor AMS Lite */}
              <div style={{ marginTop:18, paddingTop:16, borderTop:"1px solid rgba(242,234,216,0.07)" }}>
                <Toggle value={usaMulticolor} onChange={setUsaMulticolor} label="Impressão multicolor (AMS Lite)" color="#E8A87C" />
                {usaMulticolor && (
                  <div style={{
                    background:"rgba(232,168,124,0.06)", border:"1px solid rgba(232,168,124,0.20)",
                    borderRadius:14, padding:"14px 16px", marginTop:4,
                  }}>
                    <div style={{ fontSize:10, color:"#E8A87C", fontFamily:"'Jost',sans-serif", letterSpacing:1.5, textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>
                      🎨 AMS Lite — Purga de Troca
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
                      <div>
                        <div style={{ fontSize:12, color:"rgba(242,234,216,0.45)", marginBottom:8, fontFamily:"'Inter',sans-serif" }}>Nº de cores</div>
                        <input type="number" min={2} max={4} step={1} value={numCores}
                          onChange={e => setNumCores(Math.min(4, Math.max(2, parseInt(e.target.value)||2)))}
                          style={{
                            width:"100%", padding:"10px 14px",
                            background:"rgba(232,168,124,0.10)", border:"1px solid rgba(232,168,124,0.30)",
                            borderRadius:12, color:"#E8A87C",
                            fontFamily:"'Inter',sans-serif", fontSize:22, fontWeight:700,
                            textAlign:"center", outline:"none", WebkitAppearance:"none",
                          }}
                        />
                        <div style={{ fontSize:10, color:"rgba(242,234,216,0.28)", marginTop:4, textAlign:"center", fontFamily:"'Inter',sans-serif" }}>máx 4 (AMS Lite)</div>
                      </div>
                      <div>
                        <div style={{ fontSize:12, color:"rgba(242,234,216,0.45)", marginBottom:8, fontFamily:"'Inter',sans-serif" }}>Purga total</div>
                        <input type="number" min={0} step={1} value={purgaTotal}
                          onChange={e => setPurgaTotal(parseFloat(e.target.value)||0)}
                          style={{
                            width:"100%", padding:"10px 14px",
                            background:"rgba(232,168,124,0.10)", border:"1px solid rgba(232,168,124,0.30)",
                            borderRadius:12, color:"#E8A87C",
                            fontFamily:"'Inter',sans-serif", fontSize:22, fontWeight:700,
                            textAlign:"center", outline:"none", WebkitAppearance:"none",
                          }}
                        />
                        <div style={{ fontSize:10, color:"rgba(242,234,216,0.28)", marginTop:4, textAlign:"center", fontFamily:"'Inter',sans-serif" }}>gramas desperdiçadas</div>
                      </div>
                    </div>
                    <div style={{
                      display:"flex", justifyContent:"space-between", alignItems:"center",
                      padding:"10px 12px", background:"rgba(232,168,124,0.08)", borderRadius:10,
                      marginBottom:10,
                    }}>
                      <span style={{ fontSize:12, color:"rgba(242,234,216,0.50)", fontFamily:"'Inter',sans-serif" }}>Custo da purga</span>
                      <span style={{ fontSize:14, color:"#E8A87C", fontWeight:700, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>{fmt(cPurga)}</span>
                    </div>
                    <div style={{ fontSize:11, color:"rgba(242,234,216,0.35)", lineHeight:1.6, fontFamily:"'Inter',sans-serif" }}>
                      💡 Veja a purga estimada no <strong style={{ color:"rgba(242,234,216,0.55)" }}>Bambu Studio</strong> após fatiamento — fica no resumo de material. Peças de 3 cores costumam desperdiçar 15–30g.
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card title="Energia Elétrica" icon={usaSolar ? "☀️" : "⚡"} accent={usaSolar ? COPPER : TERRA}>
              {!usaLeva && <Field label="Tempo de impressão" value={horas} onChange={setHoras} unit="h" step={0.25} />}
              {usaLeva && (
                <div style={{
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"10px 14px", background:`${COPPER_L}0A`,
                  border:`1px solid ${COPPER_L}18`, borderRadius:10, marginBottom:14,
                }}>
                  <span style={{ fontSize:12, color:"rgba(242,234,216,0.45)", fontFamily:"'Inter',sans-serif" }}>Tempo da leva (definido acima)</span>
                  <span style={{ fontSize:14, color:COPPER_L, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>
                    {horasLeva}h ÷ {pecasLeva} = {fmtN(horasLeva/pecasLeva,2)}h/peça
                  </span>
                </div>
              )}
              <Field label="Consumo da impressora" hint="A1 Combo ≈ 350W médio" value={watts} onChange={setWatts} unit="W" step={10} />
              <div style={{ margin:"14px 0 12px", paddingTop:14, borderTop:"1px solid rgba(242,234,216,0.07)" }}>
                <Toggle value={usaSolar} onChange={setUsaSolar} label="Tenho energia solar em casa ☀️" color={COPPER} />
              </div>
              {!usaSolar ? (
                <>
                  <Field label="Tarifa Equatorial Goiás" hint="com ICMS" value={kwhRede} onChange={setKwhRede} unit="R$/kWh" step={0.01} />
                  <InfoBox color={TERRA}>💡 Bandeira verde. Vermelha P2 acrescente ~R$0,09/kWh</InfoBox>
                </>
              ) : (
                <div style={{ marginTop:4 }}>
                  <div style={{
                    background:`${COPPER}12`,
                    border:`1px solid ${COPPER}28`,
                    borderRadius:14, padding:"16px 18px", marginBottom:14,
                  }}>
                    <div style={{ fontSize:10, letterSpacing:2, color:COPPER, fontFamily:"'Jost',sans-serif", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>☀️ Modo Solar</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontSize:24, fontWeight:700, color:PERG, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>
                          {fmt(kwhEfetivo)}<span style={{ fontSize:13, color:"rgba(242,234,216,0.40)" }}>/kWh</span>
                        </div>
                        <div style={{ fontSize:11, color:"rgba(242,234,216,0.35)", marginTop:3, fontFamily:"'Inter',sans-serif" }}>tarifa efetiva</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:15, color:SUCCESS, fontWeight:600, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>- {fmt(economiaSolar)}</div>
                        <div style={{ fontSize:10, color:"rgba(242,234,216,0.35)", marginTop:3, fontFamily:"'Inter',sans-serif" }}>por peça</div>
                      </div>
                    </div>
                  </div>
                  <Field label="Custo kWh solar" value={kwhSolar} onChange={setKwhSolar} unit="R$/kWh" step={0.01} highlight={COPPER} />
                  <Field label="% gerado pelo solar" value={percSolar} onChange={setPercSolar} unit="%" step={5} highlight={COPPER} />
                  <Field label="Tarifa rede (backup)" value={kwhRede} onChange={setKwhRede} unit="R$/kWh" step={0.01} />
                </div>
              )}
            </Card>

            <Card title="Depreciação" icon="🖨️" accent={TERRA_D}>
              <Field label="Valor da impressora" value={precoImp} onChange={setPrecoImp} unit="R$" step={100} />
              <Field label="Vida útil estimada" hint="horas" value={vidaUtil} onChange={setVidaUtil} unit="h" step={100} />
            </Card>

            <Card title="Consumíveis" icon="🔩" accent={BLUE}>
              <Field label="Preço do bico" value={precoBico} onChange={setPrecoBico} unit="R$" step={1} />
              <Field label="Vida útil do bico" hint="horas" value={vidaBico} onChange={setVidaBico} unit="h" step={25} />
              <Field label="Preço da placa" value={precoPlaca} onChange={setPrecoPlaca} unit="R$" step={5} />
              <Field label="Vida útil da placa" hint="impressões" value={vidaPlaca} onChange={setVidaPlaca} unit="x" step={10} />
            </Card>

            <Card title="Embalagem" icon="📦" accent={TERRA}>
              <Toggle value={usaEmb} onChange={setUsaEmb} label="Incluir embalagem" color={TERRA} />
              {usaEmb && (
                <>
                  <Field label="Custo da embalagem" value={precoEmb} onChange={setPrecoEmb} unit="R$/un" step={0.5} />
                  <Field label="Frete da embalagem" hint="rateio/un" value={freteEmb} onChange={setFreteEmb} unit="R$/un" step={0.5} />
                </>
              )}
            </Card>

            <Card title="Mão de Obra (tempo ativo real)" icon="👤" accent="#7F8CFF">
              <Toggle value={usaMO} onChange={setUsaMO} label="Incluir mão de obra" color="#7F8CFF" />
              {usaMO && (
                <>
                  <Field label="Valor hora do seu trabalho" value={valorHora} onChange={setValorHora} unit="R$/h" step={5} />
                  <div style={{
                    background:"rgba(127,140,255,0.06)",
                    border:"1px solid rgba(127,140,255,0.14)",
                    borderRadius:14, padding:"14px 16px", marginBottom:14,
                  }}>
                    <div style={{ fontSize:10, color:"#7F8CFF", fontFamily:"'Jost',sans-serif", letterSpacing:1.5, textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>
                      Etapas de trabalho ativo
                    </div>
                    {[
                      { label:"🖥️ Preparo do arquivo", hint:"fatiamento, suportes, posição", value:minPreparo, set:setMinPreparo },
                      { label:"▶️ Início da impressão", hint:"ligar, carregar, 1ª camada",   value:minInicio,  set:setMinInicio },
                      { label:"👁️ Monitoramento",       hint:"checada durante impressão",    value:minMonitor, set:setMinMonitor },
                      { label:"✂️ Pós-impressão",       hint:"retirar, suportes, qualidade", value:minPos,     set:setMinPos },
                    ].map(e => (
                      <div key={e.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                        <div>
                          <div style={{ fontSize:13, color:"rgba(242,234,216,0.72)", fontFamily:"'Inter',sans-serif" }}>{e.label}</div>
                          <div style={{ fontSize:11, color:"rgba(242,234,216,0.28)", marginTop:2, fontFamily:"'Inter',sans-serif" }}>{e.hint}</div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <input type="number" min={0} step={1} value={e.value}
                            onChange={ev => e.set(parseFloat(ev.target.value)||0)}
                            style={{
                              width:64, padding:"8px 10px",
                              background:"rgba(242,234,216,0.04)",
                              border:"1px solid rgba(127,140,255,0.22)",
                              borderRadius:10, color:"#7F8CFF",
                              fontFamily:"'Inter',sans-serif", fontSize:14,
                              textAlign:"right", outline:"none", WebkitAppearance:"none",
                            }}
                          />
                          <span style={{ fontSize:11, color:"rgba(242,234,216,0.28)", minWidth:24, fontFamily:"'Inter',sans-serif" }}>min</span>
                        </div>
                      </div>
                    ))}
                    <div style={{
                      borderTop:"1px solid rgba(127,140,255,0.12)", paddingTop:12, marginTop:4,
                      display:"flex", justifyContent:"space-between", alignItems:"center",
                    }}>
                      <span style={{ fontSize:12, color:"#7F8CFF", fontFamily:"'Inter',sans-serif" }}>Total tempo ativo</span>
                      <span style={{ fontSize:13, color:"#7F8CFF", fontWeight:700, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>
                        {minAtivo} min · {fmt(cMO)}
                      </span>
                    </div>
                  </div>
                  <InfoBox color="#7F8CFF">
                    💡 A máquina trabalha sozinha durante a impressão. Seu tempo real cobrado é só o que você está <em>ativamente</em> envolvido — preparo, início, monitoramento e acabamento.
                  </InfoBox>
                </>
              )}
            </Card>

            <Card title="Margem de Lucro" icon="📈" accent={COPPER}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
                {[
                  { label:"Varejo",  mult:8, pct:700, color:COPPER },
                  { label:"Revenda", mult:4, pct:300, color:COPPER_L },
                  { label:"Atacado", mult:3, pct:200, color:TERRA },
                ].map(p => {
                  const ativo = margem === p.pct;
                  return (
                    <div key={p.label}
                      onClick={() => setMargem(p.pct)}
                      style={{
                        background: ativo ? `${p.color}20` : `${p.color}08`,
                        border: `1px solid ${ativo ? p.color+"60" : p.color+"20"}`,
                        borderRadius:14, padding:"12px 8px", textAlign:"center",
                        cursor:"pointer", transition:"all .2s",
                        boxShadow: ativo ? `0 0 0 2px ${p.color}30` : "none",
                      }}
                    >
                      <div style={{ fontSize:9, color:p.color, fontFamily:"'Jost',sans-serif", letterSpacing:1.5, textTransform:"uppercase", fontWeight:700, marginBottom:6 }}>
                        {p.label}
                      </div>
                      <div style={{ fontSize:22, fontWeight:700, color: ativo ? p.color : PERG, fontFamily:"'Jost',sans-serif", lineHeight:1 }}>
                        {p.mult}×
                      </div>
                      <div style={{ fontSize:10, color:"rgba(242,234,216,0.35)", marginTop:4, fontFamily:"'Inter',sans-serif" }}>
                        {p.pct}% markup
                      </div>
                    </div>
                  );
                })}
              </div>
              <Field label="Markup personalizado" value={margem} onChange={setMargem} unit="%" step={5} />
              <InfoBox color={COPPER}>
                💡 <strong style={{color:COPPER}}>8× varejo</strong> = preço final 8x o custo. Clique num preset ou ajuste manualmente abaixo.
              </InfoBox>
            </Card>
          </div>

          {/* Painel resultado */}
          <div className="sticky-col">
            <div style={{
              ...CARD_BASE,
              border:`1px solid ${COPPER}30`,
              boxShadow:`0 28px 80px rgba(0,0,0,0.42), 0 0 32px rgba(201,130,68,0.10)`,
              padding:"24px 22px",
            }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:2.5, color:COPPER, textTransform:"uppercase", fontWeight:700, marginBottom: usaLeva ? 12 : 22 }}>
                📊 Resultado por Peça
              </div>

              {usaLeva && (
                <div style={{
                  display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
                  background:`${COPPER_L}0E`, border:`1px solid ${COPPER_L}24`,
                  borderRadius:12, marginBottom:18,
                }}>
                  <span style={{ fontSize:18 }}>🖨️</span>
                  <div>
                    <div style={{ fontSize:12, color:COPPER_L, fontWeight:600, fontFamily:"'Jost',sans-serif" }}>Modo Leva · {pecasLeva} peças · {horasLeva}h</div>
                    <div style={{ fontSize:11, color:"rgba(242,234,216,0.35)", marginTop:2, fontFamily:"'Inter',sans-serif" }}>Custos compartilhados divididos por {pecasLeva}</div>
                  </div>
                </div>
              )}

              {[
                { l:"Filamento PLA",                          v:cFilamento,  sub:`${fmtN(gramasEfetivas,1)}g · individual` },
                ...(usaMulticolor ? [{ l:`Purga AMS (${numCores} cores)`, v:cPurga, sub:`${purgaTotal}g desperdiçados` }] : []),
                { l: usaSolar ? "Energia ☀️" : "Energia ⚡", v:cEnergia,   sub: usaLeva ? `${horasLeva}h ÷ ${pecasLeva} peças` : `${fmt(kwhEfetivo)}/kWh`, solar:usaSolar },
                { l:"Depreciação",                            v:cDeprec,     sub: usaLeva ? `${horasLeva}h ÷ ${pecasLeva} peças` : `${horas}h` },
                { l:"Consumíveis",                            v:cConsumivel, sub: usaLeva ? `rateado ÷ ${pecasLeva}` : "Bico + placa" },
                ...(usaEmb ? [{ l:"Embalagem",   v:cEmb, sub:"por unidade" }] : []),
                ...(usaMO  ? [{ l:"Mão de obra", v:cMO,  sub: usaLeva ? `${minAtivo}min ÷ ${pecasLeva}` : `${minAtivo} min ativos` }] : []),
              ].map(r => (
                <div key={r.l} style={{
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"10px 0", borderBottom:"1px solid rgba(242,234,216,0.06)",
                }}>
                  <div>
                    <div style={{ fontSize:13, color:"rgba(242,234,216,0.70)", fontFamily:"'Inter',sans-serif" }}>{r.l}</div>
                    <div style={{ fontSize:10, color: r.solar ? COPPER+"90" : "rgba(242,234,216,0.30)", marginTop:2, fontFamily:"'Inter',sans-serif" }}>{r.sub}</div>
                  </div>
                  <span style={{ fontSize:14, color: r.solar ? COPPER : PERG, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>{fmt(r.v)}</span>
                </div>
              ))}

              {usaSolar && economiaSolar > 0 && (
                <div style={{
                  display:"flex", justifyContent:"space-between", padding:"9px 12px",
                  margin:"10px 0", background:`${SUCCESS}0C`,
                  borderRadius:10, border:`1px dashed ${SUCCESS}28`,
                }}>
                  <span style={{ fontSize:12, color:SUCCESS, fontFamily:"'Inter',sans-serif" }}>☀️ Economia solar</span>
                  <span style={{ fontSize:13, color:SUCCESS, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>- {fmt(economiaSolar)}</span>
                </div>
              )}

              <div style={{ marginTop:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid rgba(242,234,216,0.08)" }}>
                  <span style={{ fontWeight:700, color:PERG, fontFamily:"'Inter',sans-serif" }}>Custo total</span>
                  <span style={{ fontSize:17, fontWeight:700, color:PERG, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>{fmt(total)}</span>
                </div>
                {usaSolar && (
                  <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid rgba(242,234,216,0.06)" }}>
                    <span style={{ fontSize:11, color:"rgba(242,234,216,0.25)", fontFamily:"'Inter',sans-serif" }}>Sem solar</span>
                    <span style={{ fontSize:11, color:"rgba(242,234,216,0.25)", textDecoration:"line-through", fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>{fmt(totalSemSolar)}</span>
                  </div>
                )}
                <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0" }}>
                  <span style={{ fontSize:13, color:"rgba(242,234,216,0.35)", fontFamily:"'Inter',sans-serif" }}>Margem ({margem}%)</span>
                  <span style={{ fontSize:13, color:"rgba(242,234,216,0.35)", fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>+ {fmt(total*margem/100)}</span>
                </div>
              </div>

              {/* Preço mínimo de venda */}
              <div style={{
                marginTop:10,
                background:`linear-gradient(135deg, ${TERRA_D}, ${COPPER}, ${COPPER_L})`,
                borderRadius:16, padding:"20px 18px", textAlign:"center",
                boxShadow:`0 14px 32px rgba(181,107,58,0.28)`,
              }}>
                <div style={{ fontSize:10, letterSpacing:2.5, color:"rgba(255,255,255,0.65)", fontFamily:"'Jost',sans-serif", textTransform:"uppercase", marginBottom:8, fontWeight:700 }}>
                  Preço Mínimo de Venda
                </div>
                <div style={{ fontSize:42, fontWeight:700, letterSpacing:-1, color:"#fff", fontFamily:"'Jost',sans-serif", fontVariantNumeric:"tabular-nums" }}>
                  {fmt(precoVenda)}
                </div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.50)", marginTop:6, fontFamily:"'Inter',sans-serif" }}>por peça · venda unitária</div>
              </div>

              {/* Composição */}
              <div style={{ marginTop:24 }}>
                <div style={{ fontSize:10, letterSpacing:2, color:"rgba(242,234,216,0.28)", fontFamily:"'Jost',sans-serif", textTransform:"uppercase", marginBottom:14, fontWeight:700 }}>
                  Composição
                </div>
                {bars.map(b => <Bar key={b.label} {...b} total={total} />)}
              </div>

              {/* Mini métricas */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:20 }}>
                {(usaLeva ? [
                  { l:"Custo por peça",          v:fmt(total) },
                  { l:`Total leva (${pecasLeva}x)`,  v:fmt(total*pecasLeva) },
                  { l:`Receita leva (${pecasLeva}x)`, v:fmt(precoVenda*pecasLeva) },
                  { l:`Lucro leva (${pecasLeva}x)`,   v:fmt((precoVenda-total)*pecasLeva) },
                ] : [
                  { l:"Por grama",    v:fmt(total/Math.max(gramas,.01)) },
                  { l:"Por hora",     v:fmt(total/Math.max(horas,.01)) },
                  { l:"10 peças/mês", v:fmt(precoVenda*10) },
                  { l:"50 peças/mês", v:fmt(precoVenda*50) },
                ]).map(c => (
                  <div key={c.l} style={{
                    background:"rgba(242,234,216,0.03)",
                    border:`1px solid ${BORDER}`,
                    borderRadius:12, padding:"12px 14px",
                  }}>
                    <div style={{ fontSize:10, color:"rgba(242,234,216,0.30)", marginBottom:5, fontFamily:"'Inter',sans-serif" }}>{c.l}</div>
                    <div style={{ fontSize:13, color:PERG, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums" }}>{c.v}</div>
                  </div>
                ))}
              </div>

              {/* Botões de navegação */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:12 }}>
                <button
                  onClick={() => setAba("revenda")}
                  style={{
                    padding:"12px", cursor:"pointer",
                    background:`${TERRA}14`, border:`1px solid ${TERRA}30`,
                    borderRadius:14, color:TERRA,
                    fontFamily:"'Jost',sans-serif", fontSize:10,
                    letterSpacing:1.5, textTransform:"uppercase", fontWeight:700,
                    transition:"all .2s",
                  }}
                >
                  📦 Revenda →
                </button>
                <button
                  onClick={() => setAba("custom")}
                  style={{
                    padding:"12px", cursor:"pointer",
                    background:`${COPPER_L}14`, border:`1px solid ${COPPER_L}30`,
                    borderRadius:14, color:COPPER_L,
                    fontFamily:"'Jost',sans-serif", fontSize:10,
                    letterSpacing:1.5, textTransform:"uppercase", fontWeight:700,
                    transition:"all .2s",
                  }}
                >
                  💎 Personalizado →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ABA REVENDA ───────────────────────────────────────── */}
      {aba === "revenda" && (
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{
            ...CARD_BASE,
            border:`1px solid ${TERRA}20`,
            padding:"14px 20px", marginBottom:16,
            display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10,
          }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:TERRA, letterSpacing:2, textTransform:"uppercase", fontWeight:700 }}>
              Base: custo unitário
            </div>
            <div style={{ display:"flex", gap:24 }}>
              {[
                { l:"Custo",       v:fmt(total) },
                { l:"Varejo (1x)", v:fmt(precoVenda) },
                { l:"Margem",      v:`${margem}%` },
              ].map(c => (
                <div key={c.l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:10, color:"rgba(242,234,216,0.35)", fontFamily:"'Inter',sans-serif" }}>{c.l}</div>
                  <div style={{ fontSize:14, color:PERG, fontFamily:"'Inter',sans-serif", fontVariantNumeric:"tabular-nums", marginTop:2 }}>{c.v}</div>
                </div>
              ))}
            </div>
          </div>
          <Card title="Simulador de Revenda em Lote" icon="📦" accent={TERRA}>
            <TabelaRevenda custoBase={total} custoSetup={custoSetup} />
          </Card>
        </div>
      )}

      {/* ── ABA PERSONALIZADO ─────────────────────────────────── */}
      {aba === "custom" && <AbaPersonalizacao custoBase={total} margemBase={margem} />}
    </div>
  );
}
