"use client";
import { useState } from "react";

const fmt = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const fmtN = (v, d = 2) => v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });

const ACCENT  = "#4ade80";
const ACCENT2 = "#22d3ee";
const SOLAR   = "#fbbf24";
const REVENDA = "#f472b6";
const CUSTOM  = "#a78bfa";
const BG      = "#0d0f14";
const BORDER  = "rgba(255,255,255,0.08)";

/* ── componentes base ─────────────────────────────────────── */
function Toggle({ value, onChange, label, color }) {
  const c = color || ACCENT;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
      <div onClick={() => onChange(!value)} style={{ width:42, height:24, borderRadius:100, background: value ? c : "#1e2330", border:`1px solid ${value ? c : BORDER}`, cursor:"pointer", position:"relative", transition:"all .25s", flexShrink:0 }}>
        <div style={{ position:"absolute", top:3, left: value ? 21 : 3, width:16, height:16, background:"#fff", borderRadius:"50%", transition:"left .25s" }} />
      </div>
      <span style={{ fontSize:13, color: value ? "#ddd" : "#555" }}>{label}</span>
    </div>
  );
}

function Field({ label, hint, value, onChange, unit, step=1, min=0, highlight }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6, flexWrap:"wrap", gap:4 }}>
        <div>
          <span style={{ fontSize:13, color:"#ccc", fontWeight:500 }}>{label}</span>
          {hint && <span style={{ fontSize:11, color:"#444", marginLeft:6 }}>{hint}</span>}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <input type="number" min={min} step={step} value={value}
            onChange={e => onChange(parseFloat(e.target.value)||0)}
            style={{ width:88, padding:"8px 10px", background: highlight ? `${highlight}15` : "rgba(255,255,255,.05)", border:`1px solid ${highlight ? highlight+"50" : BORDER}`, borderRadius:10, color: highlight||"#fff", fontSize:14, fontFamily:"'Space Mono',monospace", textAlign:"right", outline:"none", WebkitAppearance:"none" }}
          />
          {unit && <span style={{ fontSize:11, color:"#444", minWidth:40 }}>{unit}</span>}
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, children, accent }) {
  return (
    <div style={{ background:"rgba(255,255,255,.04)", border:`1px solid ${accent ? accent+"30" : BORDER}`, borderRadius:16, padding:"18px 18px", marginBottom:12 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, paddingBottom:12, borderBottom:`1px solid ${BORDER}` }}>
        <span style={{ fontSize:18 }}>{icon}</span>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:2, color:accent||"#666", textTransform:"uppercase" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Bar({ label, value, total, color }) {
  const pct = total > 0 ? Math.min(100,(value/total)*100) : 0;
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ fontSize:12, color:"#666" }}>{label}</span>
        <span style={{ fontSize:12, fontFamily:"'Space Mono',monospace", color:"#888" }}>{pct.toFixed(1)}% · {fmt(value)}</span>
      </div>
      <div style={{ height:6, background:"#1a1e2a", borderRadius:10, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:10, transition:"width .4s ease" }} />
      </div>
    </div>
  );
}

function InfoBox({ color, children }) {
  return (
    <div style={{ background:`${color}10`, border:`1px solid ${color}25`, borderRadius:10, padding:"10px 14px", fontSize:12, color:"#999", lineHeight:1.5, marginTop:4 }}>
      {children}
    </div>
  );
}

function TabBtn({ active, onClick, children, color }) {
  const c = color || ACCENT;
  return (
    <button onClick={onClick} style={{ flex:1, padding:"11px 6px", border:"none", cursor:"pointer", borderRadius:12, background: active ? `${c}18` : "transparent", color: active ? c : "#555", fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:1.5, textTransform:"uppercase", fontWeight: active ? 700 : 400, outline:"none", transition:"all .2s", borderBottom: active ? `2px solid ${c}` : "2px solid transparent" }}>
      {children}
    </button>
  );
}

/* ── ABA REVENDA ──────────────────────────────────────────── */
function TabelaRevenda({ custoBase, custoSetup }) {
  const [mVar, setMVar] = useState(40);
  const [mRev, setMRev] = useState(25);
  const [mAta, setMAta] = useState(15);
  const [bulk, setBulk] = useState(10);

  const faixas = [
    { label:"Varejo",  qtd:1,   icon:"🛍️", margem:mVar,  color:ACCENT },
    { label:"Varejo",  qtd:5,   icon:"🛍️", margem:mVar,  color:ACCENT },
    { label:"Revenda", qtd:10,  icon:"🏪", margem:mRev,  color:ACCENT2 },
    { label:"Revenda", qtd:25,  icon:"🏪", margem:mRev,  color:ACCENT2 },
    { label:"Atacado", qtd:50,  icon:"📦", margem:mAta,  color:REVENDA },
    { label:"Atacado", qtd:100, icon:"📦", margem:mAta,  color:REVENDA },
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
          { label:"Margem Varejo",  value:mVar, set:setMVar, color:ACCENT },
          { label:"Margem Revenda", value:mRev, set:setMRev, color:ACCENT2 },
          { label:"Margem Atacado", value:mAta, set:setMAta, color:REVENDA },
        ].map(m => (
          <div key={m.label} style={{ background:`${m.color}10`, border:`1px solid ${m.color}25`, borderRadius:12, padding:"12px 10px", textAlign:"center" }}>
            <div style={{ fontSize:9, color:m.color, marginBottom:8, fontFamily:"'Space Mono',monospace", letterSpacing:1 }}>{m.label}</div>
            <input type="number" min={0} step={5} value={m.value} onChange={e => m.set(parseFloat(e.target.value)||0)}
              style={{ width:"100%", padding:"6px 4px", background:"transparent", border:`1px solid ${m.color}30`, borderRadius:8, color:m.color, fontFamily:"'Space Mono',monospace", fontSize:18, fontWeight:700, textAlign:"center", outline:"none", WebkitAppearance:"none" }}
            />
            <div style={{ fontSize:10, color:"#444", marginTop:4 }}>%</div>
          </div>
        ))}
      </div>
      <Field label="Desconto bulk (filamento)" hint="ao comprar mais kg" value={bulk} onChange={setBulk} unit="%" step={1} />
      <div style={{ borderRadius:14, overflow:"hidden", border:`1px solid ${BORDER}` }}>
        <div style={{ display:"grid", gridTemplateColumns:"80px 1fr 1fr 1fr 1fr", background:"rgba(255,255,255,.04)", padding:"10px 14px", gap:8 }}>
          {["Lote","Custo/un","Preço/un","Receita","Lucro"].map(h => (
            <span key={h} style={{ fontSize:10, color:"#444", fontFamily:"'Space Mono',monospace", letterSpacing:1 }}>{h}</span>
          ))}
        </div>
        {faixas.map((f,i) => {
          const cu = calcUn(f.qtd);
          const pu = cu*(1+f.margem/100);
          const eco = ((base1-cu)/base1*100);
          const isBest = f.qtd === 25;
          return (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"80px 1fr 1fr 1fr 1fr", padding:"12px 14px", gap:8, alignItems:"center", borderTop:`1px solid ${BORDER}`, background: isBest ? `${f.color}08` : "transparent", position:"relative" }}>
              {isBest && <div style={{ position:"absolute", top:-1, right:10, background:f.color, color:"#000", fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:"0 0 6px 6px", fontFamily:"'Space Mono',monospace" }}>TOP</div>}
              <div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:15, fontWeight:700, color:f.color }}>{f.qtd}x</div>
                <div style={{ fontSize:10, color:"#444" }}>{f.icon} {f.label}</div>
                {eco > 0.5 && <div style={{ fontSize:9, color:f.color }}>-{fmtN(eco,1)}%</div>}
              </div>
              <div><div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#888" }}>{fmt(cu)}</div></div>
              <div><div style={{ fontFamily:"'Space Mono',monospace", fontSize:14, color:"#fff", fontWeight:600 }}>{fmt(pu)}</div><div style={{ fontSize:10, color:"#444" }}>{f.margem}%</div></div>
              <div><div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:f.color }}>{fmt(pu*f.qtd)}</div></div>
              <div><div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:ACCENT }}>{fmt((pu-cu)*f.qtd)}</div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── ABA PERSONALIZAÇÃO ───────────────────────────────────── */
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

  // cálculos
  const cModelagem   = modelagem ? hModelagem * valorHModelo + numRevisoes * valorRevisao : 0;
  const cArquivo     = usaArquivo ? licenca : 0;
  const cPosProc     = posProc ? hPosProc * valorHPos + materialPos : 0;
  const cEmbP        = embPremium ? custoEmbP : 0;
  const cComplexidade = custoBase * (complexidade / 100);
  const subtotal     = custoBase + cModelagem + cArquivo + cPosProc + cEmbP + cComplexidade;
  const cUrgencia    = urgencia ? subtotal * (percUrgencia / 100) : 0;
  const totalCustom  = subtotal + cUrgencia;
  const vMargem      = totalCustom * (margemCustom / 100);
  const precoFinal   = totalCustom + vMargem;
  const adicional    = precoFinal - (custoBase * (1 + margemBase / 100));

  const tiposPos = [
    { key:"lixamento", label:"Lixamento", icon:"🪚" },
    { key:"pintura",   label:"Pintura",   icon:"🎨" },
    { key:"verniz",    label:"Verniz",    icon:"✨" },
    { key:"montagem",  label:"Montagem",  icon:"🔧" },
  ];

  const bars2 = [
    { label:"Custo base impressão",  value:custoBase,      color:ACCENT },
    { label:"Modelagem / design",    value:cModelagem,     color:CUSTOM },
    { label:"Licença de arquivo",    value:cArquivo,       color:"#fb923c" },
    { label:"Pós-processamento",     value:cPosProc,       color:ACCENT2 },
    { label:"Embalagem premium",     value:cEmbP,          color:"#e879f9" },
    { label:"Complexidade (+suporte)",value:cComplexidade, color:SOLAR },
    ...(urgencia ? [{ label:"Taxa urgência", value:cUrgencia, color:"#f87171" }] : []),
  ].filter(b => b.value > 0);

  return (
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      {/* banner identidade */}
      <div style={{ background:`${CUSTOM}08`, border:`1px solid ${CUSTOM}25`, borderRadius:14, padding:"16px 18px", marginBottom:16 }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:CUSTOM, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Identificação do pedido personalizado</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[
            { label:"Nome do cliente", value:nomeCliente, set:setNomeCliente, placeholder:"Ex: João Silva" },
            { label:"Nome / descrição da peça", value:nomeProduto, set:setNomeProduto, placeholder:"Ex: Chaveiro com logo" },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize:12, color:"#555", marginBottom:6 }}>{f.label}</div>
              <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                style={{ width:"100%", padding:"8px 12px", background:"rgba(255,255,255,.05)", border:`1px solid ${BORDER}`, borderRadius:10, color:"#ccc", fontSize:13, outline:"none", boxSizing:"border-box" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid-main" style={{ display:"grid", gridTemplateColumns:"1fr", gap:0 }}>
        <div>
          {/* base */}
          <div style={{ background:`${CUSTOM}06`, border:`1px solid ${CUSTOM}20`, borderRadius:12, padding:"12px 16px", marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:12, color:"#555" }}>Custo base (aba Custo & Preço)</div>
              <div style={{ fontSize:18, fontWeight:700, color:"#ccc", fontFamily:"'Space Mono',monospace" }}>{fmt(custoBase)}</div>
            </div>
            <div style={{ fontSize:11, color:"#444", textAlign:"right" }}>
              <div>Peça padrão: {fmt(custoBase*(1+margemBase/100))}</div>
              <div style={{ color:"#333" }}>margem base: {margemBase}%</div>
            </div>
          </div>

          {/* modelagem */}
          <Card title="Modelagem & Design 3D" icon="🎨" accent={CUSTOM}>
            <Toggle value={modelagem} onChange={setModelagem} label="Incluir modelagem / adaptação" color={CUSTOM} />
            {modelagem && (
              <>
                <Field label="Horas de modelagem" value={hModelagem} onChange={setHModelagem} unit="h" step={0.25} highlight={CUSTOM} />
                <Field label="Valor hora de modelagem" value={valorHModelo} onChange={setValorHModelo} unit="R$/h" step={10} highlight={CUSTOM} />
                <Field label="Nº de revisões inclusas" hint="rodadas de ajuste" value={numRevisoes} onChange={setNumRevisoes} unit="x" step={1} />
                <Field label="Valor por revisão extra" value={valorRevisao} onChange={setValorRevisao} unit="R$/x" step={5} />
                <InfoBox color={CUSTOM}>
                  💡 Defina quantas revisões estão inclusas no preço. Acima disso, cobre à parte — isso protege seu tempo e educa o cliente.
                </InfoBox>
              </>
            )}
          </Card>

          {/* arquivo */}
          <Card title="Licença de Arquivo 3D" icon="📁" accent="#fb923c">
            <Toggle value={usaArquivo} onChange={setUsaArquivo} label="Comprei arquivo de terceiro" color="#fb923c" />
            {usaArquivo && (
              <>
                <Field label="Custo da licença" hint="valor pago pelo arquivo" value={licenca} onChange={setLicenca} unit="R$" step={5} highlight="#fb923c" />
                <InfoBox color="#fb923c">📁 Sempre repasse 100% do custo da licença ao cliente — é um insumo direto do pedido.</InfoBox>
              </>
            )}
          </Card>

          {/* complexidade */}
          <Card title="Complexidade de Impressão" icon="⚙️" accent={SOLAR}>
            <Field label="Acréscimo por complexidade" hint="suporte extra, geometria difícil" value={complexidade} onChange={setComplexidade} unit="%" step={5} highlight={SOLAR} />
            <InfoBox color={SOLAR}>
              ⚙️ Peças personalizadas costumam ter mais suporte e material desperdiçado. 10–20% é uma faixa saudável.
            </InfoBox>
          </Card>

          {/* pós-processamento */}
          <Card title="Pós-processamento & Acabamento" icon="✨" accent={ACCENT2}>
            <Toggle value={posProc} onChange={setPosProc} label="Inclui acabamento especial" color={ACCENT2} />
            {posProc && (
              <>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:12, color:"#666", marginBottom:10 }}>Tipo de acabamento:</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {tiposPos.map(t => (
                      <div key={t.key} onClick={() => setTipoPos(p => ({ ...p, [t.key]:!p[t.key] }))}
                        style={{ padding:"8px 12px", borderRadius:10, cursor:"pointer", border:`1px solid ${tipoPos[t.key] ? ACCENT2+"60" : BORDER}`, background: tipoPos[t.key] ? `${ACCENT2}10` : "transparent", display:"flex", alignItems:"center", gap:8, fontSize:13, color: tipoPos[t.key] ? ACCENT2 : "#555", transition:"all .2s" }}>
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

          {/* embalagem premium */}
          <Card title="Embalagem Premium Personalizada" icon="🎁" accent="#e879f9">
            <Toggle value={embPremium} onChange={setEmbPremium} label="Embalagem especial para presente/cliente" color="#e879f9" />
            {embPremium && (
              <>
                <Field label="Custo da embalagem premium" hint="caixa, laço, papel, tag…" value={custoEmbP} onChange={setCustoEmbP} unit="R$" step={1} highlight="#e879f9" />
                <InfoBox color="#e879f9">🎁 Embalagem premium justifica um preço percebido muito maior — invista nisso para clientes de presente.</InfoBox>
              </>
            )}
          </Card>

          {/* urgência */}
          <Card title="Taxa de Urgência" icon="⚡" accent="#f87171">
            <Toggle value={urgencia} onChange={setUrgencia} label="Pedido urgente / prazo reduzido" color="#f87171" />
            {urgencia && (
              <>
                <Field label="Adicional de urgência" value={percUrgencia} onChange={setPercUrgencia} unit="%" step={5} highlight="#f87171" />
                <InfoBox color="#f87171">⚡ Urgência tem valor. 20–50% é prática comum. Isso cobre reorganização de fila e estresse operacional.</InfoBox>
              </>
            )}
          </Card>

          {/* margem personalização */}
          <Card title="Margem de Personalização" icon="💎" accent={CUSTOM}>
            <Field label="Margem para pedido personalizado" value={margemCustom} onChange={setMargemCustom} unit="%" step={5} highlight={CUSTOM} />
            <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderTop:`1px solid ${BORDER}`, marginTop:8 }}>
              <span style={{ fontSize:12, color:"#444" }}>Margem base (padrão)</span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#444" }}>{margemBase}%</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0" }}>
              <span style={{ fontSize:12, color:CUSTOM }}>Prêmio da personalização</span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:CUSTOM }}>+{margemCustom - margemBase}%</span>
            </div>
            <InfoBox color={CUSTOM}>💎 Personalização é exclusividade. Uma margem 30–50% maior que o padrão é justa e esperada pelo mercado premium.</InfoBox>
          </Card>
        </div>

        {/* painel resultado personalização */}
        <div className="sticky-col">
          <div style={{ background:`linear-gradient(160deg, ${CUSTOM}10, rgba(13,15,20,.95))`, border:`1px solid ${CUSTOM}30`, borderRadius:20, padding:"22px 20px" }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:3, color:CUSTOM, textTransform:"uppercase", marginBottom:16 }}>
              💎 Orçamento Personalizado
            </div>

            {(nomeCliente || nomeProduto) && (
              <div style={{ background:`${CUSTOM}10`, borderRadius:10, padding:"10px 14px", marginBottom:16 }}>
                {nomeCliente && <div style={{ fontSize:13, color:"#ccc" }}>👤 {nomeCliente}</div>}
                {nomeProduto && <div style={{ fontSize:12, color:"#666", marginTop:2 }}>📦 {nomeProduto}</div>}
              </div>
            )}

            {/* linhas de custo */}
            {[
              { l:"Custo base impressão",   v:custoBase,       show:true },
              { l:"Modelagem & design",     v:cModelagem,      show:modelagem && cModelagem > 0 },
              { l:"Licença de arquivo",     v:cArquivo,        show:usaArquivo },
              { l:"Pós-processamento",      v:cPosProc,        show:posProc },
              { l:"Embalagem premium",      v:cEmbP,           show:embPremium },
              { l:"Complexidade (+suporte)",v:cComplexidade,   show:complexidade > 0 },
              { l:"Taxa de urgência",       v:cUrgencia,       show:urgencia },
            ].filter(r => r.show).map(r => (
              <div key={r.l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${BORDER}` }}>
                <span style={{ fontSize:13, color:"#bbb" }}>{r.l}</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#ddd" }}>{fmt(r.v)}</span>
              </div>
            ))}

            <div style={{ marginTop:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${BORDER}` }}>
                <span style={{ fontWeight:700 }}>Custo total personalizado</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:15, fontWeight:700 }}>{fmt(totalCustom)}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0" }}>
                <span style={{ fontSize:13, color:"#555" }}>Margem ({margemCustom}%)</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#555" }}>+ {fmt(vMargem)}</span>
              </div>
            </div>

            {/* preço final */}
            <div style={{ marginTop:8, background:`linear-gradient(135deg, ${CUSTOM}20, ${CUSTOM}08)`, border:`1px solid ${CUSTOM}50`, borderRadius:14, padding:"18px 16px", textAlign:"center" }}>
              <div style={{ fontSize:10, letterSpacing:3, color:CUSTOM, fontFamily:"'Space Mono',monospace", textTransform:"uppercase", marginBottom:6 }}>Preço Final Personalizado</div>
              <div style={{ fontSize:38, fontWeight:700, letterSpacing:-1, color:"#fff" }}>{fmt(precoFinal)}</div>
              <div style={{ fontSize:11, color:"#555", marginTop:4 }}>por peça única</div>
            </div>

            {/* vs padrão */}
            <div style={{ marginTop:14, background:"rgba(255,255,255,.02)", borderRadius:12, padding:"12px 14px" }}>
              <div style={{ fontSize:10, color:"#444", fontFamily:"'Space Mono',monospace", letterSpacing:1, marginBottom:10 }}>vs peça padrão</div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:12, color:"#555" }}>Peça padrão ({margemBase}% margem)</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#555" }}>{fmt(custoBase*(1+margemBase/100))}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:13, color:CUSTOM, fontWeight:600 }}>Valor adicional cobrado</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:14, color:CUSTOM, fontWeight:700 }}>+ {fmt(adicional)}</span>
              </div>
            </div>

            {/* breakdown */}
            <div style={{ marginTop:20 }}>
              <div style={{ fontSize:10, letterSpacing:2, color:"#444", fontFamily:"'Space Mono',monospace", textTransform:"uppercase", marginBottom:14 }}>Composição</div>
              {bars2.map(b => <Bar key={b.label} {...b} total={totalCustom} />)}
            </div>

            {/* mini resumo orçamento */}
            <div style={{ marginTop:20, background:`${CUSTOM}08`, border:`1px solid ${CUSTOM}20`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:10, color:CUSTOM, fontFamily:"'Space Mono',monospace", letterSpacing:1, marginBottom:12 }}>📋 RESUMO DO ORÇAMENTO</div>
              {[
                { l:"Peça base",      v:fmt(custoBase) },
                { l:"Serviços extra", v:fmt(totalCustom-custoBase) },
                { l:"Margem aplicada",v:`${margemCustom}%` },
                { l:"Preço final",    v:fmt(precoFinal), destaque:true },
              ].map(c => (
                <div key={c.l} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${CUSTOM}15` }}>
                  <span style={{ fontSize:12, color: c.destaque ? "#fff" : "#555", fontWeight: c.destaque ? 700 : 400 }}>{c.l}</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color: c.destaque ? CUSTOM : "#666", fontWeight: c.destaque ? 700 : 400 }}>{c.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── APP PRINCIPAL ────────────────────────────────────────── */
export default function Calc3D() {
  const [aba, setAba] = useState("custo");
  const [usaLeva, setUsaLeva]         = useState(false);
  const [pecasLeva, setPecasLeva]     = useState(4);
  const [horasLeva, setHorasLeva]     = useState(8);
  const [gramas, setGramas]           = useState(50);
  const [precoKg, setPrecoKg]         = useState(120);
  const [falha, setFalha]             = useState(10);
  const [horas, setHoras]             = useState(3);
  const [watts, setWatts]             = useState(350);
  const [usaSolar, setUsaSolar]       = useState(false);
  const [kwhRede, setKwhRede]         = useState(0.78);
  const [kwhSolar, setKwhSolar]       = useState(0.15);
  const [percSolar, setPercSolar]     = useState(80);
  const [precoImp, setPrecoImp]       = useState(4500);
  const [vidaUtil, setVidaUtil]       = useState(5000);
  const [precoBico, setPrecoBico]     = useState(28);
  const [vidaBico, setVidaBico]       = useState(500);
  const [precoPlaca, setPrecoPlaca]   = useState(90);
  const [vidaPlaca, setVidaPlaca]     = useState(300);
  const [usaEmb, setUsaEmb]           = useState(false);
  const [precoEmb, setPrecoEmb]       = useState(3.5);
  const [freteEmb, setFreteEmb]       = useState(0);
  const [usaMO, setUsaMO]             = useState(false);
  const [valorHora, setValorHora]     = useState(50);
  const [minPreparo, setMinPreparo]   = useState(15);
  const [minInicio, setMinInicio]     = useState(8);
  const [minMonitor, setMinMonitor]   = useState(5);
  const [minPos, setMinPos]           = useState(15);
  const [margem, setMargem]           = useState(40);

  // modo leva: custos compartilhados divididos pelas peças da leva
  const horasEfetivas     = usaLeva ? horasLeva / pecasLeva : horas;
  const divisorLeva       = usaLeva ? pecasLeva : 1;
  const kwhEfetivo        = usaSolar ? (kwhSolar*percSolar/100)+(kwhRede*(1-percSolar/100)) : kwhRede;
  const energiaKwh        = usaLeva ? (watts/1000)*horasLeva : (watts/1000)*horas;
  const cEnergia          = (energiaKwh*kwhEfetivo) / divisorLeva;
  const cEnergiaSemSolar  = (energiaKwh*kwhRede) / divisorLeva;
  const economiaSolar     = cEnergiaSemSolar - cEnergia;
  const gramasEfetivas    = gramas*(1+falha/100);
  const cFilamento        = (gramasEfetivas/1000)*precoKg;
  const cDeprec           = ((precoImp/vidaUtil)*(usaLeva ? horasLeva : horas)) / divisorLeva;
  const cConsumivel       = ((precoBico/vidaBico)*(usaLeva ? horasLeva : horas) + precoPlaca/vidaPlaca) / divisorLeva;
  const cEmb              = usaEmb ? precoEmb+freteEmb : 0;
  const minAtivo          = minPreparo + minInicio + minMonitor + minPos;
  const cMO               = usaMO ? (valorHora*(minAtivo/60)) / divisorLeva : 0;
  const custoSetup        = usaMO ? (valorHora*((minPreparo+minInicio)/60)) / divisorLeva : 0;
  const total            = cFilamento+cEnergia+cDeprec+cConsumivel+cEmb+cMO;
  const totalSemSolar    = cFilamento+cEnergiaSemSolar+cDeprec+cConsumivel+cEmb+cMO;
  const precoVenda       = total*(1+margem/100);

  const bars = [
    { label:"Filamento PLA", value:cFilamento, color:ACCENT },
    { label:"Energia",       value:cEnergia,   color:usaSolar ? SOLAR : "#facc15" },
    { label:"Depreciação",   value:cDeprec,    color:"#f97316" },
    { label:"Consumíveis",   value:cConsumivel,color:ACCENT2 },
    ...(usaEmb ? [{ label:"Embalagem",  value:cEmb, color:"#e879f9" }] : []),
    ...(usaMO  ? [{ label:"Mão de obra",value:cMO,  color:"#818cf8" }] : []),
  ];

  return (
    <div style={{ minHeight:"100vh", background:BG, backgroundImage:`radial-gradient(ellipse 100% 40% at 50% 0%, rgba(74,222,128,.07) 0%, transparent 60%)`, fontFamily:"'DM Sans',sans-serif", color:"#fff", padding:"24px 16px 80px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        @media(min-width:720px){ .grid-main{grid-template-columns:1fr 1fr!important;gap:20px!important;align-items:start!important;} .sticky-col{position:sticky!important;top:24px!important;} }
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        input[type=number]{-moz-appearance:textfield;}
        input[type=text]{font-family:'DM Sans',sans-serif;}
      `}</style>

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${ACCENT}15`, border:`1px solid ${ACCENT}30`, borderRadius:100, padding:"4px 14px", marginBottom:12 }}>
          <span style={{ fontSize:9, letterSpacing:3, color:ACCENT, fontFamily:"'Space Mono',monospace", textTransform:"uppercase" }}>Bambu Lab A1 Combo · PLA · Goiânia-GO</span>
        </div>
        <h1 style={{ fontSize:26, fontWeight:700, margin:0, letterSpacing:-0.5, lineHeight:1.2 }}>
          Calculadora de Custos<br /><span style={{ color:ACCENT }}>Impressão 3D</span>
        </h1>
        <p style={{ color:"#444", fontSize:12, marginTop:8 }}>Equatorial Goiás R$0,78/kWh · Reajuste out/2025</p>
      </div>

      {/* Abas */}
      <div style={{ maxWidth:860, margin:"0 auto 20px", display:"flex", background:"rgba(255,255,255,.03)", border:`1px solid ${BORDER}`, borderRadius:14, padding:4, gap:2 }}>
        <TabBtn active={aba==="custo"}    onClick={() => setAba("custo")}    color={ACCENT}>⚙️ Custo</TabBtn>
        <TabBtn active={aba==="revenda"}  onClick={() => setAba("revenda")}  color={REVENDA}>📦 Revenda</TabBtn>
        <TabBtn active={aba==="custom"}   onClick={() => setAba("custom")}   color={CUSTOM}>💎 Personalizado</TabBtn>
      </div>

      {/* ABA CUSTO */}
      {aba === "custo" && (
        <div className="grid-main" style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr", gap:0 }}>
          <div>
            {/* MODO LEVA */}
            <Card title="Modo de Impressão" icon="🖨️" accent={usaLeva ? "#f97316" : "#555"}>
              <Toggle value={usaLeva} onChange={setUsaLeva} label="Impressão em leva (múltiplas peças juntas)" color="#f97316" />
              {usaLeva ? (
                <>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"4px 0 14px" }}>
                    <div>
                      <div style={{ fontSize:12, color:"#888", marginBottom:6 }}>Peças na leva</div>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <input type="number" min={1} step={1} value={pecasLeva}
                          onChange={e => setPecasLeva(Math.max(1, parseFloat(e.target.value)||1))}
                          style={{ width:"100%", padding:"10px 12px", background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.4)", borderRadius:10, color:"#f97316", fontFamily:"'Space Mono',monospace", fontSize:22, fontWeight:700, textAlign:"center", outline:"none", WebkitAppearance:"none" }}
                        />
                      </div>
                      <div style={{ fontSize:10, color:"#444", marginTop:4, textAlign:"center" }}>peças simultâneas</div>
                    </div>
                    <div>
                      <div style={{ fontSize:12, color:"#888", marginBottom:6 }}>Tempo total da leva</div>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <input type="number" min={0.25} step={0.25} value={horasLeva}
                          onChange={e => setHorasLeva(parseFloat(e.target.value)||1)}
                          style={{ width:"100%", padding:"10px 12px", background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.4)", borderRadius:10, color:"#f97316", fontFamily:"'Space Mono',monospace", fontSize:22, fontWeight:700, textAlign:"center", outline:"none", WebkitAppearance:"none" }}
                        />
                      </div>
                      <div style={{ fontSize:10, color:"#444", marginTop:4, textAlign:"center" }}>horas no total</div>
                    </div>
                  </div>
                  <div style={{ background:"rgba(249,115,22,.08)", border:"1px solid rgba(249,115,22,.2)", borderRadius:10, padding:"10px 14px" }}>
                    <div style={{ fontSize:10, color:"#f97316", fontFamily:"'Space Mono',monospace", letterSpacing:1, marginBottom:8 }}>COMO OS CUSTOS SÃO DIVIDIDOS</div>
                    {[
                      { icon:"🧵", label:"Filamento",    tipo:"individual", desc:`cada peça usa ${fmtN(gramasEfetivas,1)}g` },
                      { icon:"⚡", label:"Energia",      tipo:"compartilhado", desc:`${horasLeva}h ÷ ${pecasLeva} peças` },
                      { icon:"🖨️", label:"Depreciação",  tipo:"compartilhado", desc:`${horasLeva}h ÷ ${pecasLeva} peças` },
                      { icon:"🔩", label:"Consumíveis",  tipo:"compartilhado", desc:`rateado por peça` },
                      { icon:"👤", label:"Mão de obra",  tipo:"compartilhado", desc:`setup ÷ ${pecasLeva} peças` },
                    ].map(r => (
                      <div key={r.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderBottom:"1px solid rgba(249,115,22,.1)" }}>
                        <span style={{ fontSize:12, color:"#777" }}>{r.icon} {r.label}</span>
                        <div style={{ textAlign:"right" }}>
                          <span style={{ fontSize:10, fontFamily:"'Space Mono',monospace", color: r.tipo==="individual" ? ACCENT : "#f97316", background: r.tipo==="individual" ? `${ACCENT}15` : "rgba(249,115,22,.15)", padding:"2px 8px", borderRadius:100 }}>{r.tipo}</span>
                          <div style={{ fontSize:10, color:"#444", marginTop:2 }}>{r.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <Field label="Tempo de impressão" hint="peça única" value={horas} onChange={setHoras} unit="h" step={0.25} />
                  <InfoBox color="#555">💡 Imprime várias peças ao mesmo tempo? Ative o Modo Leva acima para dividir os custos corretamente.</InfoBox>
                </>
              )}
            </Card>

            <Card title="Filamento PLA" icon="🧵" accent={ACCENT}>
              <Field label="Peso por peça" hint="(g cada)" value={gramas} onChange={setGramas} unit="g" step={0.5} />
              <Field label="Preço do filamento" value={precoKg} onChange={setPrecoKg} unit="R$/kg" step={5} />
              <Field label="Taxa de falha / reimpressão" value={falha} onChange={setFalha} unit="%" step={1} />
              <InfoBox color={ACCENT}>
                <span style={{ color:ACCENT }}>
                  {usaLeva
                    ? `${pecasLeva} peças × ${fmtN(gramasEfetivas,1)}g = ${fmtN(gramasEfetivas*pecasLeva,1)}g total · ${fmt(cFilamento)} por peça`
                    : `Consumo real: ${fmtN(gramasEfetivas,1)}g · ${fmt(cFilamento)}`
                  }
                </span>
              </InfoBox>
            </Card>
            <Card title="Energia Elétrica" icon={usaSolar ? "☀️" : "⚡"} accent={usaSolar ? SOLAR : "#facc15"}>
              {!usaLeva && <Field label="Tempo de impressão" value={horas} onChange={setHoras} unit="h" step={0.25} />}
              {usaLeva && (
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", background:"rgba(249,115,22,.08)", borderRadius:8, marginBottom:14 }}>
                  <span style={{ fontSize:12, color:"#666" }}>Tempo da leva (definido acima)</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:14, color:"#f97316" }}>{horasLeva}h ÷ {pecasLeva} = {fmtN(horasLeva/pecasLeva,2)}h/peça</span>
                </div>
              )}
              <Field label="Consumo da impressora" hint="A1 Combo ≈ 350W" value={watts} onChange={setWatts} unit="W" step={10} />
              <div style={{ margin:"14px 0 12px", paddingTop:14, borderTop:`1px solid ${BORDER}` }}>
                <Toggle value={usaSolar} onChange={setUsaSolar} label="Tenho energia solar em casa ☀️" color={SOLAR} />
              </div>
              {!usaSolar
                ? <><Field label="Tarifa Equatorial Goiás" hint="com ICMS" value={kwhRede} onChange={setKwhRede} unit="R$/kWh" step={0.01} /><InfoBox color="#facc15">💡 Bandeira verde. Vermelha P2 acrescente ~R$0,09/kWh</InfoBox></>
                : <div style={{ marginTop:4 }}>
                    <div style={{ background:`${SOLAR}18`, border:`1px solid ${SOLAR}35`, borderRadius:14, padding:"14px 16px", marginBottom:14 }}>
                      <div style={{ fontSize:10, letterSpacing:2, color:SOLAR, fontFamily:"'Space Mono',monospace", textTransform:"uppercase", marginBottom:8 }}>☀️ Modo Solar</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div><div style={{ fontSize:22, fontWeight:700 }}>{fmt(kwhEfetivo)}<span style={{ fontSize:13, color:"#888" }}>/kWh</span></div><div style={{ fontSize:11, color:"#666" }}>tarifa efetiva</div></div>
                        <div style={{ textAlign:"right" }}><div style={{ fontSize:14, color:SOLAR }}>- {fmt(economiaSolar)}</div><div style={{ fontSize:10, color:"#555" }}>por peça</div></div>
                      </div>
                    </div>
                    <Field label="Custo kWh solar" value={kwhSolar} onChange={setKwhSolar} unit="R$/kWh" step={0.01} highlight={SOLAR} />
                    <Field label="% gerado pelo solar" value={percSolar} onChange={setPercSolar} unit="%" step={5} highlight={SOLAR} />
                    <Field label="Tarifa rede (backup)" value={kwhRede} onChange={setKwhRede} unit="R$/kWh" step={0.01} />
                  </div>
              }
            </Card>
            <Card title="Depreciação" icon="🖨️" accent="#f97316">
              <Field label="Valor da impressora" value={precoImp} onChange={setPrecoImp} unit="R$" step={100} />
              <Field label="Vida útil estimada" hint="horas" value={vidaUtil} onChange={setVidaUtil} unit="h" step={100} />
            </Card>
            <Card title="Consumíveis" icon="🔩" accent={ACCENT2}>
              <Field label="Preço do bico" value={precoBico} onChange={setPrecoBico} unit="R$" step={1} />
              <Field label="Vida útil do bico" hint="horas" value={vidaBico} onChange={setVidaBico} unit="h" step={25} />
              <Field label="Preço da placa" value={precoPlaca} onChange={setPrecoPlaca} unit="R$" step={5} />
              <Field label="Vida útil da placa" hint="impressões" value={vidaPlaca} onChange={setVidaPlaca} unit="x" step={10} />
            </Card>
            <Card title="Embalagem" icon="📦" accent="#e879f9">
              <Toggle value={usaEmb} onChange={setUsaEmb} label="Incluir embalagem" color="#e879f9" />
              {usaEmb && <><Field label="Custo da embalagem" value={precoEmb} onChange={setPrecoEmb} unit="R$/un" step={0.5} /><Field label="Frete da embalagem" hint="rateio/un" value={freteEmb} onChange={setFreteEmb} unit="R$/un" step={0.5} /></>}
            </Card>
            <Card title="Mão de Obra (tempo ativo real)" icon="👤" accent="#818cf8">
              <Toggle value={usaMO} onChange={setUsaMO} label="Incluir mão de obra" color="#818cf8" />
              {usaMO && (
                <>
                  <Field label="Valor hora do seu trabalho" value={valorHora} onChange={setValorHora} unit="R$/h" step={5} />
                  <div style={{ background:"rgba(129,140,248,.06)", border:"1px solid rgba(129,140,248,.15)", borderRadius:12, padding:"12px 14px", marginBottom:14 }}>
                    <div style={{ fontSize:10, color:"#818cf8", fontFamily:"'Space Mono',monospace", letterSpacing:1, marginBottom:12 }}>ETAPAS DE TRABALHO ATIVO</div>
                    {[
                      { label:"🖥️ Preparo do arquivo", hint:"fatiamento, suportes, posição", value:minPreparo, set:setMinPreparo },
                      { label:"▶️ Início da impressão", hint:"ligar, carregar, 1ª camada", value:minInicio, set:setMinInicio },
                      { label:"👁️ Monitoramento", hint:"checada durante impressão", value:minMonitor, set:setMinMonitor },
                      { label:"✂️ Pós-impressão", hint:"retirar, suportes, qualidade", value:minPos, set:setMinPos },
                    ].map(e => (
                      <div key={e.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                        <div>
                          <div style={{ fontSize:13, color:"#ccc" }}>{e.label}</div>
                          <div style={{ fontSize:11, color:"#444" }}>{e.hint}</div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <input type="number" min={0} step={1} value={e.value}
                            onChange={ev => e.set(parseFloat(ev.target.value)||0)}
                            style={{ width:60, padding:"7px 8px", background:"rgba(255,255,255,.05)", border:`1px solid ${BORDER}`, borderRadius:8, color:"#818cf8", fontFamily:"'Space Mono',monospace", fontSize:13, textAlign:"right", outline:"none", WebkitAppearance:"none" }}
                          />
                          <span style={{ fontSize:11, color:"#444", minWidth:24 }}>min</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ borderTop:`1px solid rgba(129,140,248,.15)`, paddingTop:10, marginTop:4, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:12, color:"#818cf8" }}>Total tempo ativo</span>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#818cf8", fontWeight:700 }}>{minAtivo} min · {fmt(cMO)}</span>
                    </div>
                  </div>
                  <InfoBox color="#818cf8">
                    💡 A máquina trabalha sozinha durante a impressão. Seu tempo real cobrado é só o que você está <em>ativamente</em> envolvido — preparo, início, monitoramento e acabamento.
                  </InfoBox>
                </>
              )}
            </Card>
            <Card title="Margem de Lucro" icon="📈" accent={ACCENT}>
              <Field label="Margem desejada" value={margem} onChange={setMargem} unit="%" step={5} />
            </Card>
          </div>

          {/* resultado */}
          <div className="sticky-col">
            <div style={{ background:"linear-gradient(160deg,rgba(74,222,128,.06),rgba(34,211,238,.04),rgba(13,15,20,.9))", border:"1px solid rgba(74,222,128,.2)", borderRadius:20, padding:"22px 20px" }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:3, color:ACCENT, textTransform:"uppercase", marginBottom: usaLeva ? 10 : 20 }}>📊 Resultado por peça</div>
              {usaLeva && (
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.25)", borderRadius:10, marginBottom:16 }}>
                  <span style={{ fontSize:16 }}>🖨️</span>
                  <div>
                    <div style={{ fontSize:11, color:"#f97316", fontWeight:600 }}>Modo Leva · {pecasLeva} peças · {horasLeva}h</div>
                    <div style={{ fontSize:10, color:"#664" }}>Custos compartilhados divididos por {pecasLeva}</div>
                  </div>
                </div>
              )}
              {[
                { l:"Filamento PLA",                         v:cFilamento,   sub:`${fmtN(gramasEfetivas,1)}g · individual` },
                { l: usaSolar ? "Energia ☀️" : "Energia ⚡", v:cEnergia,    sub: usaLeva ? `${horasLeva}h ÷ ${pecasLeva} peças` : `${fmt(kwhEfetivo)}/kWh`, solar:usaSolar },
                { l:"Depreciação",                           v:cDeprec,      sub: usaLeva ? `${horasLeva}h ÷ ${pecasLeva} peças` : `${horas}h` },
                { l:"Consumíveis",                           v:cConsumivel,  sub: usaLeva ? `rateado ÷ ${pecasLeva}` : "Bico + placa" },
                ...(usaEmb ? [{ l:"Embalagem", v:cEmb, sub:"por unidade" }] : []),
                ...(usaMO  ? [{ l:"Mão de obra",v:cMO, sub: usaLeva ? `${minAtivo}min ÷ ${pecasLeva}` : `${minAtivo} min ativos` }] : []),
              ].map(r => (
                <div key={r.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${BORDER}` }}>
                  <div><div style={{ fontSize:13, color:"#bbb" }}>{r.l}</div><div style={{ fontSize:10, color: r.solar ? SOLAR+"99" : "#444" }}>{r.sub}</div></div>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color: r.solar ? SOLAR : "#ddd" }}>{fmt(r.v)}</span>
                </div>
              ))}
              {usaSolar && economiaSolar > 0 && (
                <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 10px", margin:"8px 0", background:`${SOLAR}12`, borderRadius:8, border:`1px dashed ${SOLAR}30` }}>
                  <span style={{ fontSize:12, color:SOLAR }}>☀️ Economia solar</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:SOLAR }}>- {fmt(economiaSolar)}</span>
                </div>
              )}
              <div style={{ marginTop:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${BORDER}` }}>
                  <span style={{ fontWeight:700 }}>Custo total</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:16, fontWeight:700 }}>{fmt(total)}</span>
                </div>
                {usaSolar && <div style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${BORDER}` }}>
                  <span style={{ fontSize:11, color:"#333" }}>Sem solar</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#333", textDecoration:"line-through" }}>{fmt(totalSemSolar)}</span>
                </div>}
                <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0" }}>
                  <span style={{ fontSize:13, color:"#555" }}>Margem ({margem}%)</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#555" }}>+ {fmt(total*margem/100)}</span>
                </div>
              </div>
              <div style={{ marginTop:8, background:`linear-gradient(135deg,${ACCENT}15,${ACCENT2}10)`, border:`1px solid ${ACCENT}40`, borderRadius:14, padding:"18px 16px", textAlign:"center" }}>
                <div style={{ fontSize:10, letterSpacing:3, color:ACCENT, fontFamily:"'Space Mono',monospace", textTransform:"uppercase", marginBottom:6 }}>Preço Mínimo de Venda</div>
                <div style={{ fontSize:38, fontWeight:700, letterSpacing:-1 }}>{fmt(precoVenda)}</div>
                <div style={{ fontSize:11, color:"#444", marginTop:4 }}>por peça · venda unitária</div>
              </div>
              <div style={{ marginTop:24 }}>
                <div style={{ fontSize:10, letterSpacing:2, color:"#444", fontFamily:"'Space Mono',monospace", textTransform:"uppercase", marginBottom:14 }}>Composição</div>
                {bars.map(b => <Bar key={b.label} {...b} total={total} />)}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:20 }}>
                {(usaLeva ? [
                  { l:"Custo por peça",        v:fmt(total) },
                  { l:`Total leva (${pecasLeva}x)`, v:fmt(total*pecasLeva) },
                  { l:`Receita leva (${pecasLeva}x)`,v:fmt(precoVenda*pecasLeva) },
                  { l:`Lucro leva (${pecasLeva}x)`,  v:fmt((precoVenda-total)*pecasLeva) },
                ] : [
                  { l:"Por grama",    v:fmt(total/Math.max(gramas,.01)) },
                  { l:"Por hora",     v:fmt(total/Math.max(horas,.01)) },
                  { l:"10 peças/mês", v:fmt(precoVenda*10) },
                  { l:"50 peças/mês", v:fmt(precoVenda*50) },
                ]).map(c => (
                  <div key={c.l} style={{ background:"rgba(255,255,255,.03)", border:`1px solid ${BORDER}`, borderRadius:10, padding:"10px 12px" }}>
                    <div style={{ fontSize:10, color:"#444", marginBottom:4 }}>{c.l}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#ccc" }}>{c.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10 }}>
                <button onClick={() => setAba("revenda")} style={{ padding:"11px", background:`${REVENDA}15`, border:`1px solid ${REVENDA}40`, borderRadius:12, color:REVENDA, fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", cursor:"pointer" }}>📦 Revenda →</button>
                <button onClick={() => setAba("custom")}  style={{ padding:"11px", background:`${CUSTOM}15`,  border:`1px solid ${CUSTOM}40`,  borderRadius:12, color:CUSTOM,  fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", cursor:"pointer" }}>💎 Personalizado →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA REVENDA */}
      {aba === "revenda" && (
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ background:`${REVENDA}08`, border:`1px solid ${REVENDA}25`, borderRadius:14, padding:"14px 18px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:REVENDA, letterSpacing:2, textTransform:"uppercase" }}>Base: custo unitário</div>
            <div style={{ display:"flex", gap:20 }}>
              {[{ l:"Custo",v:fmt(total)},{ l:"Varejo (1x)",v:fmt(precoVenda)},{ l:"Margem",v:`${margem}%`}].map(c => (
                <div key={c.l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:10, color:"#444" }}>{c.l}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#ccc" }}>{c.v}</div>
                </div>
              ))}
            </div>
          </div>
          <Card title="Simulador de Revenda em Lote" icon="📦" accent={REVENDA}>
            <TabelaRevenda custoBase={total} custoSetup={custoSetup} />
          </Card>
        </div>
      )}

      {/* ABA PERSONALIZADO */}
      {aba === "custom" && <AbaPersonalizacao custoBase={total} margemBase={margem} />}
    </div>
  );
}
