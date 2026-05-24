"use client";
import { useState } from "react";

const fmt  = (v) => v.toLocaleString("pt-BR", { style:"currency", currency:"BRL" });
const fmtN = (v, d=2) => v.toLocaleString("pt-BR", { minimumFractionDigits:d, maximumFractionDigits:d });

/* ── Talharia Design System ──────────────────────────────── */
const COBRE      = "#C98244";
const TERRACOTA  = "#B56B3A";
const SOLAR      = "#E8A855";
const REVENDA_C  = "#B56B3A";
const CUSTOM_C   = "#C98244";
const LEVA_C     = "#A0522D";
const EMB_C      = "#8B6348";
const MO_C       = "#9E8A75";
const URG_C      = "#C44B2A";
const BG         = "#0D0C0A";
const BG2        = "#1A1E2E";
const PERGAMINHO = "#F2EAD8";
const GRAY_MED   = "#6B6460";
const GRAY_CLR   = "#B8B0A8";
const BORDER     = "rgba(201,130,68,0.15)";
const MONO       = "'Montserrat',sans-serif";
const SANS       = "'Inter',sans-serif";

function MI({ name, size=18, color, style={} }) {
  return <span className="material-icons" style={{ fontSize:size, color:color||"inherit", lineHeight:1, verticalAlign:"middle", ...style }}>{name}</span>;
}

/* ── componentes base ─────────────────────────────────────── */
function Toggle({ value, onChange, label, color }) {
  const c = color || COBRE;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
      <div onClick={() => onChange(!value)} style={{ width:42, height:24, borderRadius:100, background:value?c:BG2, border:`1px solid ${value?c:BORDER}`, cursor:"pointer", position:"relative", transition:"all .25s", flexShrink:0 }}>
        <div style={{ position:"absolute", top:3, left:value?21:3, width:16, height:16, background:PERGAMINHO, borderRadius:"50%", transition:"left .25s" }} />
      </div>
      <span style={{ fontSize:13, color:value?GRAY_CLR:GRAY_MED, fontFamily:SANS }}>{label}</span>
    </div>
  );
}

function Field({ label, hint, value, onChange, unit, step=1, min=0, highlight }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6, flexWrap:"wrap", gap:4 }}>
        <div>
          <span style={{ fontSize:13, color:GRAY_CLR, fontWeight:500, fontFamily:SANS }}>{label}</span>
          {hint && <span style={{ fontSize:11, color:GRAY_MED, marginLeft:6, fontFamily:SANS }}>{hint}</span>}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <input type="number" min={min} step={step} value={value}
            onChange={e => onChange(parseFloat(e.target.value)||0)}
            style={{ width:88, padding:"8px 10px", background:highlight?`${highlight}15`:"rgba(242,234,216,.04)", border:`1px solid ${highlight?highlight+"50":BORDER}`, borderRadius:10, color:highlight||PERGAMINHO, fontSize:14, fontFamily:MONO, fontWeight:600, textAlign:"right", outline:"none", WebkitAppearance:"none" }}
          />
          {unit && <span style={{ fontSize:11, color:GRAY_MED, minWidth:40, fontFamily:SANS }}>{unit}</span>}
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, children, accent }) {
  const c = accent || COBRE;
  return (
    <div style={{ background:`rgba(26,30,46,0.6)`, border:`1px solid ${c}20`, borderRadius:16, padding:"18px 18px", marginBottom:12 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, paddingBottom:12, borderBottom:`1px solid ${BORDER}` }}>
        <MI name={icon} size={18} color={c} />
        <span style={{ fontFamily:MONO, fontWeight:700, fontSize:10, letterSpacing:2, color:c, textTransform:"uppercase" }}>{title}</span>
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
        <span style={{ fontSize:12, color:GRAY_MED, fontFamily:SANS }}>{label}</span>
        <span style={{ fontSize:12, fontFamily:MONO, fontWeight:600, color:GRAY_CLR }}>{pct.toFixed(1)}% · {fmt(value)}</span>
      </div>
      <div style={{ height:5, background:BG2, borderRadius:10, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:10, transition:"width .4s ease" }} />
      </div>
    </div>
  );
}

function InfoBox({ color, children }) {
  return (
    <div style={{ background:`${color}10`, border:`1px solid ${color}25`, borderRadius:10, padding:"10px 14px", fontSize:12, color:GRAY_CLR, lineHeight:1.6, marginTop:4, fontFamily:SANS }}>
      {children}
    </div>
  );
}

function TabBtn({ active, onClick, children, color, icon }) {
  const c = color || COBRE;
  return (
    <button onClick={onClick} style={{ flex:1, padding:"11px 6px", border:"none", cursor:"pointer", borderRadius:12, background:active?`${c}18`:"transparent", color:active?c:GRAY_MED, fontFamily:MONO, fontWeight:700, fontSize:9, letterSpacing:1.5, textTransform:"uppercase", outline:"none", transition:"all .2s", borderBottom:active?`2px solid ${c}`:"2px solid transparent", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
      {icon && <MI name={icon} size={14} color={active?c:GRAY_MED} />}
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
    { label:"Varejo",  qtd:1,   icon:"shopping_bag", margem:mVar, color:COBRE },
    { label:"Varejo",  qtd:5,   icon:"shopping_bag", margem:mVar, color:COBRE },
    { label:"Revenda", qtd:10,  icon:"store",        margem:mRev, color:TERRACOTA },
    { label:"Revenda", qtd:25,  icon:"store",        margem:mRev, color:TERRACOTA },
    { label:"Atacado", qtd:50,  icon:"inventory_2",  margem:mAta, color:REVENDA_C },
    { label:"Atacado", qtd:100, icon:"inventory_2",  margem:mAta, color:REVENDA_C },
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
          { label:"Margem Varejo",  value:mVar, set:setMVar, color:COBRE },
          { label:"Margem Revenda", value:mRev, set:setMRev, color:TERRACOTA },
          { label:"Margem Atacado", value:mAta, set:setMAta, color:REVENDA_C },
        ].map(m => (
          <div key={m.label} style={{ background:`${m.color}10`, border:`1px solid ${m.color}25`, borderRadius:12, padding:"12px 10px", textAlign:"center" }}>
            <div style={{ fontSize:9, color:m.color, marginBottom:8, fontFamily:MONO, fontWeight:700, letterSpacing:1 }}>{m.label}</div>
            <input type="number" min={0} step={5} value={m.value} onChange={e => m.set(parseFloat(e.target.value)||0)}
              style={{ width:"100%", padding:"6px 4px", background:"transparent", border:`1px solid ${m.color}30`, borderRadius:8, color:m.color, fontFamily:MONO, fontWeight:700, fontSize:18, textAlign:"center", outline:"none", WebkitAppearance:"none" }}
            />
            <div style={{ fontSize:10, color:GRAY_MED, marginTop:4, fontFamily:SANS }}>%</div>
          </div>
        ))}
      </div>
      <Field label="Desconto bulk (filamento)" hint="ao comprar mais kg" value={bulk} onChange={setBulk} unit="%" step={1} />
      <div style={{ borderRadius:14, overflow:"hidden", border:`1px solid ${BORDER}` }}>
        <div style={{ display:"grid", gridTemplateColumns:"80px 1fr 1fr 1fr 1fr", background:"rgba(26,30,46,0.8)", padding:"10px 14px", gap:8 }}>
          {["Lote","Custo/un","Preço/un","Receita","Lucro"].map(h => (
            <span key={h} style={{ fontSize:10, color:GRAY_MED, fontFamily:MONO, fontWeight:700, letterSpacing:1 }}>{h}</span>
          ))}
        </div>
        {faixas.map((f,i) => {
          const cu = calcUn(f.qtd);
          const pu = cu*(1+f.margem/100);
          const eco = ((base1-cu)/base1*100);
          const isBest = f.qtd === 25;
          return (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"80px 1fr 1fr 1fr 1fr", padding:"12px 14px", gap:8, alignItems:"center", borderTop:`1px solid ${BORDER}`, background:isBest?`${f.color}08`:"transparent", position:"relative" }}>
              {isBest && <div style={{ position:"absolute", top:-1, right:10, background:f.color, color:BG, fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:"0 0 6px 6px", fontFamily:MONO }}>TOP</div>}
              <div>
                <div style={{ fontFamily:MONO, fontWeight:700, fontSize:15, color:f.color }}>{f.qtd}x</div>
                <div style={{ fontSize:10, color:GRAY_MED, display:"flex", alignItems:"center", gap:3, fontFamily:SANS }}><MI name={f.icon} size={12} color={GRAY_MED} /> {f.label}</div>
                {eco > 0.5 && <div style={{ fontSize:9, color:f.color, fontFamily:MONO }}>-{fmtN(eco,1)}%</div>}
              </div>
              <div><div style={{ fontFamily:MONO, fontWeight:600, fontSize:13, color:GRAY_MED }}>{fmt(cu)}</div></div>
              <div><div style={{ fontFamily:MONO, fontWeight:700, fontSize:14, color:PERGAMINHO }}>{fmt(pu)}</div><div style={{ fontSize:10, color:GRAY_MED, fontFamily:SANS }}>{f.margem}%</div></div>
              <div><div style={{ fontFamily:MONO, fontWeight:600, fontSize:13, color:f.color }}>{fmt(pu*f.qtd)}</div></div>
              <div><div style={{ fontFamily:MONO, fontWeight:600, fontSize:13, color:COBRE }}>{fmt((pu-cu)*f.qtd)}</div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── ABA PERSONALIZAÇÃO ───────────────────────────────────── */
function AbaPersonalizacao({ custoBase, margemBase }) {
  const [modelagem, setModelagem]       = useState(false);
  const [hModelagem, setHModelagem]     = useState(1.5);
  const [valorHModelo, setValorHModelo] = useState(80);
  const [numRevisoes, setNumRevisoes]   = useState(2);
  const [valorRevisao, setValorRevisao] = useState(20);
  const [usaArquivo, setUsaArquivo]     = useState(false);
  const [licenca, setLicenca]           = useState(35);
  const [posProc, setPosProc]           = useState(false);
  const [tipoPos, setTipoPos]           = useState({ lixamento:false, pintura:false, verniz:false, montagem:false });
  const [hPosProc, setHPosProc]         = useState(0.5);
  const [valorHPos, setValorHPos]       = useState(50);
  const [materialPos, setMaterialPos]   = useState(8);
  const [embPremium, setEmbPremium]     = useState(false);
  const [custoEmbP, setCustoEmbP]       = useState(12);
  const [complexidade, setComplexidade] = useState(15);
  const [urgencia, setUrgencia]         = useState(false);
  const [percUrgencia, setPercUrgencia] = useState(30);
  const [margemCustom, setMargemCustom] = useState(margemBase + 40);
  const [nomeCliente, setNomeCliente]   = useState("");
  const [nomeProduto, setNomeProduto]   = useState("");

  const cModelagem    = modelagem ? hModelagem * valorHModelo + numRevisoes * valorRevisao : 0;
  const cArquivo      = usaArquivo ? licenca : 0;
  const cPosProc      = posProc ? hPosProc * valorHPos + materialPos : 0;
  const cEmbP         = embPremium ? custoEmbP : 0;
  const cComplexidade = custoBase * (complexidade / 100);
  const subtotal      = custoBase + cModelagem + cArquivo + cPosProc + cEmbP + cComplexidade;
  const cUrgencia     = urgencia ? subtotal * (percUrgencia / 100) : 0;
  const totalCustom   = subtotal + cUrgencia;
  const vMargem       = totalCustom * (margemCustom / 100);
  const precoFinal    = totalCustom + vMargem;
  const adicional     = precoFinal - (custoBase * (1 + margemBase / 100));

  const tiposPos = [
    { key:"lixamento", label:"Lixamento", icon:"handyman" },
    { key:"pintura",   label:"Pintura",   icon:"palette" },
    { key:"verniz",    label:"Verniz",    icon:"auto_awesome" },
    { key:"montagem",  label:"Montagem",  icon:"build" },
  ];

  const bars2 = [
    { label:"Custo base impressão",   value:custoBase,      color:COBRE },
    { label:"Modelagem / design",     value:cModelagem,     color:CUSTOM_C },
    { label:"Licença de arquivo",     value:cArquivo,       color:LEVA_C },
    { label:"Pós-processamento",      value:cPosProc,       color:TERRACOTA },
    { label:"Embalagem premium",      value:cEmbP,          color:EMB_C },
    { label:"Complexidade (+suporte)",value:cComplexidade,  color:SOLAR },
    ...(urgencia ? [{ label:"Taxa urgência", value:cUrgencia, color:URG_C }] : []),
  ].filter(b => b.value > 0);

  return (
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      <div style={{ background:`${CUSTOM_C}08`, border:`1px solid ${CUSTOM_C}25`, borderRadius:14, padding:"16px 18px", marginBottom:16 }}>
        <div style={{ fontFamily:MONO, fontWeight:700, fontSize:9, color:CUSTOM_C, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Identificação do pedido personalizado</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[
            { label:"Nome do cliente", value:nomeCliente, set:setNomeCliente, placeholder:"Ex: João Silva" },
            { label:"Nome / descrição da peça", value:nomeProduto, set:setNomeProduto, placeholder:"Ex: Crucifixo com base" },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize:12, color:GRAY_MED, marginBottom:6, fontFamily:SANS }}>{f.label}</div>
              <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                style={{ width:"100%", padding:"8px 12px", background:"rgba(242,234,216,.04)", border:`1px solid ${BORDER}`, borderRadius:10, color:GRAY_CLR, fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:SANS }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid-main" style={{ display:"grid", gridTemplateColumns:"1fr", gap:0 }}>
        <div>
          <div style={{ background:`${CUSTOM_C}06`, border:`1px solid ${CUSTOM_C}20`, borderRadius:12, padding:"12px 16px", marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:12, color:GRAY_MED, fontFamily:SANS }}>Custo base (aba Custo & Preço)</div>
              <div style={{ fontSize:18, fontWeight:700, color:GRAY_CLR, fontFamily:MONO }}>{fmt(custoBase)}</div>
            </div>
            <div style={{ fontSize:11, color:GRAY_MED, textAlign:"right", fontFamily:SANS }}>
              <div>Peça padrão: {fmt(custoBase*(1+margemBase/100))}</div>
              <div style={{ color:GRAY_MED }}>margem base: {margemBase}%</div>
            </div>
          </div>

          <Card title="Modelagem & Design 3D" icon="palette" accent={CUSTOM_C}>
            <Toggle value={modelagem} onChange={setModelagem} label="Incluir modelagem / adaptação" color={CUSTOM_C} />
            {modelagem && (
              <>
                <Field label="Horas de modelagem" value={hModelagem} onChange={setHModelagem} unit="h" step={0.25} highlight={CUSTOM_C} />
                <Field label="Valor hora de modelagem" value={valorHModelo} onChange={setValorHModelo} unit="R$/h" step={10} highlight={CUSTOM_C} />
                <Field label="Nº de revisões inclusas" hint="rodadas de ajuste" value={numRevisoes} onChange={setNumRevisoes} unit="x" step={1} />
                <Field label="Valor por revisão extra" value={valorRevisao} onChange={setValorRevisao} unit="R$/x" step={5} />
                <InfoBox color={CUSTOM_C}>Defina quantas revisões estão inclusas no preço. Acima disso, cobre à parte — isso protege seu tempo e educa o cliente.</InfoBox>
              </>
            )}
          </Card>

          <Card title="Licença de Arquivo 3D" icon="folder" accent={LEVA_C}>
            <Toggle value={usaArquivo} onChange={setUsaArquivo} label="Comprei arquivo de terceiro" color={LEVA_C} />
            {usaArquivo && (
              <>
                <Field label="Custo da licença" hint="valor pago pelo arquivo" value={licenca} onChange={setLicenca} unit="R$" step={5} highlight={LEVA_C} />
                <InfoBox color={LEVA_C}>Sempre repasse 100% do custo da licença ao cliente — é um insumo direto do pedido.</InfoBox>
              </>
            )}
          </Card>

          <Card title="Complexidade de Impressão" icon="settings" accent={SOLAR}>
            <Field label="Acréscimo por complexidade" hint="suporte extra, geometria difícil" value={complexidade} onChange={setComplexidade} unit="%" step={5} highlight={SOLAR} />
            <InfoBox color={SOLAR}>Peças personalizadas costumam ter mais suporte e material desperdiçado. 10–20% é uma faixa saudável.</InfoBox>
          </Card>

          <Card title="Pós-processamento & Acabamento" icon="auto_awesome" accent={TERRACOTA}>
            <Toggle value={posProc} onChange={setPosProc} label="Inclui acabamento especial" color={TERRACOTA} />
            {posProc && (
              <>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:12, color:GRAY_MED, marginBottom:10, fontFamily:SANS }}>Tipo de acabamento:</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {tiposPos.map(t => (
                      <div key={t.key} onClick={() => setTipoPos(p => ({ ...p, [t.key]:!p[t.key] }))}
                        style={{ padding:"8px 12px", borderRadius:10, cursor:"pointer", border:`1px solid ${tipoPos[t.key]?TERRACOTA+"60":BORDER}`, background:tipoPos[t.key]?`${TERRACOTA}10`:"transparent", display:"flex", alignItems:"center", gap:8, fontSize:13, color:tipoPos[t.key]?TERRACOTA:GRAY_MED, transition:"all .2s", fontFamily:SANS }}>
                        <MI name={t.icon} size={16} color={tipoPos[t.key]?TERRACOTA:GRAY_MED} />{t.label}
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

          <Card title="Embalagem Premium Personalizada" icon="card_giftcard" accent={EMB_C}>
            <Toggle value={embPremium} onChange={setEmbPremium} label="Embalagem especial para presente/cliente" color={EMB_C} />
            {embPremium && (
              <>
                <Field label="Custo da embalagem premium" hint="caixa, laço, papel, tag…" value={custoEmbP} onChange={setCustoEmbP} unit="R$" step={1} highlight={EMB_C} />
                <InfoBox color={EMB_C}>Embalagem premium justifica um preço percebido muito maior — invista nisso para clientes de presente.</InfoBox>
              </>
            )}
          </Card>

          <Card title="Taxa de Urgência" icon="bolt" accent={URG_C}>
            <Toggle value={urgencia} onChange={setUrgencia} label="Pedido urgente / prazo reduzido" color={URG_C} />
            {urgencia && (
              <>
                <Field label="Adicional de urgência" value={percUrgencia} onChange={setPercUrgencia} unit="%" step={5} highlight={URG_C} />
                <InfoBox color={URG_C}>Urgência tem valor. 20–50% é prática comum. Isso cobre reorganização de fila e estresse operacional.</InfoBox>
              </>
            )}
          </Card>

          <Card title="Margem de Personalização" icon="diamond" accent={CUSTOM_C}>
            <Field label="Margem para pedido personalizado" value={margemCustom} onChange={setMargemCustom} unit="%" step={5} highlight={CUSTOM_C} />
            <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderTop:`1px solid ${BORDER}`, marginTop:8 }}>
              <span style={{ fontSize:12, color:GRAY_MED, fontFamily:SANS }}>Margem base (padrão)</span>
              <span style={{ fontFamily:MONO, fontWeight:600, fontSize:12, color:GRAY_MED }}>{margemBase}%</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0" }}>
              <span style={{ fontSize:12, color:CUSTOM_C, fontFamily:SANS }}>Prêmio da personalização</span>
              <span style={{ fontFamily:MONO, fontWeight:700, fontSize:12, color:CUSTOM_C }}>+{margemCustom - margemBase}%</span>
            </div>
            <InfoBox color={CUSTOM_C}>Personalização é exclusividade. Uma margem 30–50% maior que o padrão é justa e esperada pelo mercado premium.</InfoBox>
          </Card>
        </div>

        <div className="sticky-col">
          <div style={{ background:`linear-gradient(160deg, ${CUSTOM_C}10, rgba(13,12,10,.95))`, border:`1px solid ${CUSTOM_C}30`, borderRadius:20, padding:"22px 20px" }}>
            <div style={{ fontFamily:MONO, fontWeight:700, fontSize:9, letterSpacing:3, color:CUSTOM_C, textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
              <MI name="diamond" size={14} color={CUSTOM_C} /> Orçamento Personalizado
            </div>

            {(nomeCliente || nomeProduto) && (
              <div style={{ background:`${CUSTOM_C}10`, borderRadius:10, padding:"10px 14px", marginBottom:16 }}>
                {nomeCliente && <div style={{ fontSize:13, color:GRAY_CLR, fontFamily:SANS, display:"flex", alignItems:"center", gap:6 }}><MI name="person" size={14} color={GRAY_MED} />{nomeCliente}</div>}
                {nomeProduto && <div style={{ fontSize:12, color:GRAY_MED, marginTop:4, fontFamily:SANS, display:"flex", alignItems:"center", gap:6 }}><MI name="inventory_2" size={13} color={GRAY_MED} />{nomeProduto}</div>}
              </div>
            )}

            {[
              { l:"Custo base impressão",    v:custoBase,      show:true },
              { l:"Modelagem & design",      v:cModelagem,     show:modelagem && cModelagem > 0 },
              { l:"Licença de arquivo",      v:cArquivo,       show:usaArquivo },
              { l:"Pós-processamento",       v:cPosProc,       show:posProc },
              { l:"Embalagem premium",       v:cEmbP,          show:embPremium },
              { l:"Complexidade (+suporte)", v:cComplexidade,  show:complexidade > 0 },
              { l:"Taxa de urgência",        v:cUrgencia,      show:urgencia },
            ].filter(r => r.show).map(r => (
              <div key={r.l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${BORDER}` }}>
                <span style={{ fontSize:13, color:GRAY_CLR, fontFamily:SANS }}>{r.l}</span>
                <span style={{ fontFamily:MONO, fontWeight:600, fontSize:13, color:PERGAMINHO }}>{fmt(r.v)}</span>
              </div>
            ))}

            <div style={{ marginTop:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${BORDER}` }}>
                <span style={{ fontWeight:700, fontFamily:SANS, color:PERGAMINHO }}>Custo total personalizado</span>
                <span style={{ fontFamily:MONO, fontWeight:700, fontSize:15 }}>{fmt(totalCustom)}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0" }}>
                <span style={{ fontSize:13, color:GRAY_MED, fontFamily:SANS }}>Margem ({margemCustom}%)</span>
                <span style={{ fontFamily:MONO, fontWeight:600, fontSize:13, color:GRAY_MED }}>+ {fmt(vMargem)}</span>
              </div>
            </div>

            <div style={{ marginTop:8, background:`linear-gradient(135deg, ${CUSTOM_C}20, ${CUSTOM_C}08)`, border:`1px solid ${CUSTOM_C}50`, borderRadius:14, padding:"18px 16px", textAlign:"center" }}>
              <div style={{ fontSize:10, letterSpacing:3, color:CUSTOM_C, fontFamily:MONO, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>Preço Final Personalizado</div>
              <div style={{ fontSize:38, fontWeight:700, letterSpacing:-1, color:PERGAMINHO, fontFamily:MONO }}>{fmt(precoFinal)}</div>
              <div style={{ fontSize:11, color:GRAY_MED, marginTop:4, fontFamily:SANS }}>por peça única</div>
            </div>

            <div style={{ marginTop:14, background:"rgba(255,255,255,.02)", borderRadius:12, padding:"12px 14px" }}>
              <div style={{ fontSize:10, color:GRAY_MED, fontFamily:MONO, fontWeight:700, letterSpacing:1, marginBottom:10 }}>vs peça padrão</div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:12, color:GRAY_MED, fontFamily:SANS }}>Peça padrão ({margemBase}% margem)</span>
                <span style={{ fontFamily:MONO, fontWeight:600, fontSize:12, color:GRAY_MED }}>{fmt(custoBase*(1+margemBase/100))}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:13, color:CUSTOM_C, fontWeight:600, fontFamily:SANS }}>Valor adicional cobrado</span>
                <span style={{ fontFamily:MONO, fontWeight:700, fontSize:14, color:CUSTOM_C }}>+ {fmt(adicional)}</span>
              </div>
            </div>

            <div style={{ marginTop:20 }}>
              <div style={{ fontSize:10, letterSpacing:2, color:GRAY_MED, fontFamily:MONO, fontWeight:700, textTransform:"uppercase", marginBottom:14 }}>Composição</div>
              {bars2.map(b => <Bar key={b.label} {...b} total={totalCustom} />)}
            </div>

            <div style={{ marginTop:20, background:`${CUSTOM_C}08`, border:`1px solid ${CUSTOM_C}20`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:10, color:CUSTOM_C, fontFamily:MONO, fontWeight:700, letterSpacing:1, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}><MI name="assignment" size={14} color={CUSTOM_C} /> RESUMO DO ORÇAMENTO</div>
              {[
                { l:"Peça base",       v:fmt(custoBase) },
                { l:"Serviços extra",  v:fmt(totalCustom-custoBase) },
                { l:"Margem aplicada", v:`${margemCustom}%` },
                { l:"Preço final",     v:fmt(precoFinal), destaque:true },
              ].map(c => (
                <div key={c.l} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${CUSTOM_C}15` }}>
                  <span style={{ fontSize:12, color:c.destaque?PERGAMINHO:GRAY_MED, fontWeight:c.destaque?700:400, fontFamily:SANS }}>{c.l}</span>
                  <span style={{ fontFamily:MONO, fontWeight:c.destaque?700:600, fontSize:12, color:c.destaque?CUSTOM_C:GRAY_MED }}>{c.v}</span>
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

  const horasEfetivas    = usaLeva ? horasLeva / pecasLeva : horas;
  const divisorLeva      = usaLeva ? pecasLeva : 1;
  const kwhEfetivo       = usaSolar ? (kwhSolar*percSolar/100)+(kwhRede*(1-percSolar/100)) : kwhRede;
  const energiaKwh       = usaLeva ? (watts/1000)*horasLeva : (watts/1000)*horas;
  const cEnergia         = (energiaKwh*kwhEfetivo) / divisorLeva;
  const cEnergiaSemSolar = (energiaKwh*kwhRede) / divisorLeva;
  const economiaSolar    = cEnergiaSemSolar - cEnergia;
  const gramasEfetivas   = gramas*(1+falha/100);
  const cFilamento       = (gramasEfetivas/1000)*precoKg;
  const cDeprec          = ((precoImp/vidaUtil)*(usaLeva ? horasLeva : horas)) / divisorLeva;
  const cConsumivel      = ((precoBico/vidaBico)*(usaLeva ? horasLeva : horas) + precoPlaca/vidaPlaca) / divisorLeva;
  const cEmb             = usaEmb ? precoEmb+freteEmb : 0;
  const minAtivo         = minPreparo + minInicio + minMonitor + minPos;
  const cMO              = usaMO ? (valorHora*(minAtivo/60)) / divisorLeva : 0;
  const custoSetup       = usaMO ? (valorHora*((minPreparo+minInicio)/60)) / divisorLeva : 0;
  const total            = cFilamento+cEnergia+cDeprec+cConsumivel+cEmb+cMO;
  const totalSemSolar    = cFilamento+cEnergiaSemSolar+cDeprec+cConsumivel+cEmb+cMO;
  const precoVenda       = total*(1+margem/100);

  const bars = [
    { label:"Filamento PLA", value:cFilamento, color:COBRE },
    { label:"Energia",       value:cEnergia,   color:usaSolar ? SOLAR : "#E8C060" },
    { label:"Depreciação",   value:cDeprec,    color:LEVA_C },
    { label:"Consumíveis",   value:cConsumivel,color:TERRACOTA },
    ...(usaEmb ? [{ label:"Embalagem",   value:cEmb, color:EMB_C }] : []),
    ...(usaMO  ? [{ label:"Mão de obra", value:cMO,  color:MO_C }] : []),
  ];

  return (
    <div style={{ minHeight:"100vh", background:BG, backgroundImage:`radial-gradient(ellipse 100% 40% at 50% 0%, ${COBRE}0A 0%, transparent 60%)`, fontFamily:SANS, color:PERGAMINHO, padding:"24px 16px 80px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>{`
        @media(min-width:720px){ .grid-main{grid-template-columns:1fr 1fr!important;gap:20px!important;align-items:start!important;} .sticky-col{position:sticky!important;top:24px!important;} }
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        input[type=number]{-moz-appearance:textfield;}
        input[type=text]{font-family:'Inter',sans-serif;}
        ::placeholder{color:#6B6460!important;}
      `}</style>

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${COBRE}15`, border:`1px solid ${COBRE}30`, borderRadius:100, padding:"4px 14px", marginBottom:12 }}>
          <MI name="precision_manufacturing" size={13} color={COBRE} />
          <span style={{ fontSize:9, letterSpacing:3, color:COBRE, fontFamily:MONO, fontWeight:700, textTransform:"uppercase" }}>Bambu Lab A1 Combo · PLA · Goiânia-GO</span>
        </div>
        <h1 style={{ fontSize:26, fontWeight:700, margin:0, letterSpacing:-0.5, lineHeight:1.2, fontFamily:MONO }}>
          Calculadora de Custos<br /><span style={{ color:COBRE }}>Impressão 3D</span>
        </h1>
        <p style={{ color:GRAY_MED, fontSize:12, marginTop:8, fontFamily:SANS }}>Equatorial Goiás R$0,78/kWh · Reajuste out/2025</p>
      </div>

      {/* Abas */}
      <div style={{ maxWidth:860, margin:"0 auto 20px", display:"flex", background:"rgba(26,30,46,0.5)", border:`1px solid ${BORDER}`, borderRadius:14, padding:4, gap:2 }}>
        <TabBtn active={aba==="custo"}   onClick={() => setAba("custo")}   color={COBRE}     icon="calculate">Custo</TabBtn>
        <TabBtn active={aba==="revenda"} onClick={() => setAba("revenda")} color={REVENDA_C} icon="storefront">Revenda</TabBtn>
        <TabBtn active={aba==="custom"}  onClick={() => setAba("custom")}  color={CUSTOM_C}  icon="diamond">Personalizado</TabBtn>
      </div>

      {/* ABA CUSTO */}
      {aba === "custo" && (
        <div className="grid-main" style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr", gap:0 }}>
          <div>
            <Card title="Modo de Impressão" icon="print" accent={usaLeva ? LEVA_C : GRAY_MED}>
              <Toggle value={usaLeva} onChange={setUsaLeva} label="Impressão em leva (múltiplas peças juntas)" color={LEVA_C} />
              {usaLeva ? (
                <>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"4px 0 14px" }}>
                    <div>
                      <div style={{ fontSize:12, color:GRAY_CLR, marginBottom:6, fontFamily:SANS }}>Peças na leva</div>
                      <input type="number" min={1} step={1} value={pecasLeva}
                        onChange={e => setPecasLeva(Math.max(1, parseFloat(e.target.value)||1))}
                        style={{ width:"100%", padding:"10px 12px", background:`${LEVA_C}10`, border:`1px solid ${LEVA_C}40`, borderRadius:10, color:LEVA_C, fontFamily:MONO, fontWeight:700, fontSize:22, textAlign:"center", outline:"none", WebkitAppearance:"none" }}
                      />
                      <div style={{ fontSize:10, color:GRAY_MED, marginTop:4, textAlign:"center", fontFamily:SANS }}>peças simultâneas</div>
                    </div>
                    <div>
                      <div style={{ fontSize:12, color:GRAY_CLR, marginBottom:6, fontFamily:SANS }}>Tempo total da leva</div>
                      <input type="number" min={0.25} step={0.25} value={horasLeva}
                        onChange={e => setHorasLeva(parseFloat(e.target.value)||1)}
                        style={{ width:"100%", padding:"10px 12px", background:`${LEVA_C}10`, border:`1px solid ${LEVA_C}40`, borderRadius:10, color:LEVA_C, fontFamily:MONO, fontWeight:700, fontSize:22, textAlign:"center", outline:"none", WebkitAppearance:"none" }}
                      />
                      <div style={{ fontSize:10, color:GRAY_MED, marginTop:4, textAlign:"center", fontFamily:SANS }}>horas no total</div>
                    </div>
                  </div>
                  <div style={{ background:`${LEVA_C}08`, border:`1px solid ${LEVA_C}20`, borderRadius:10, padding:"10px 14px" }}>
                    <div style={{ fontSize:10, color:LEVA_C, fontFamily:MONO, fontWeight:700, letterSpacing:1, marginBottom:8 }}>COMO OS CUSTOS SÃO DIVIDIDOS</div>
                    {[
                      { icon:"straighten", label:"Filamento",   tipo:"individual",    desc:`cada peça usa ${fmtN(gramasEfetivas,1)}g` },
                      { icon:"bolt",       label:"Energia",     tipo:"compartilhado", desc:`${horasLeva}h ÷ ${pecasLeva} peças` },
                      { icon:"print",      label:"Depreciação", tipo:"compartilhado", desc:`${horasLeva}h ÷ ${pecasLeva} peças` },
                      { icon:"build",      label:"Consumíveis", tipo:"compartilhado", desc:`rateado por peça` },
                      { icon:"person",     label:"Mão de obra", tipo:"compartilhado", desc:`setup ÷ ${pecasLeva} peças` },
                    ].map(r => (
                      <div key={r.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderBottom:`1px solid ${LEVA_C}10` }}>
                        <span style={{ fontSize:12, color:GRAY_MED, display:"flex", alignItems:"center", gap:6, fontFamily:SANS }}><MI name={r.icon} size={14} color={GRAY_MED} />{r.label}</span>
                        <div style={{ textAlign:"right" }}>
                          <span style={{ fontSize:10, fontFamily:MONO, fontWeight:700, color:r.tipo==="individual"?COBRE:LEVA_C, background:r.tipo==="individual"?`${COBRE}15`:`${LEVA_C}15`, padding:"2px 8px", borderRadius:100 }}>{r.tipo}</span>
                          <div style={{ fontSize:10, color:GRAY_MED, marginTop:2, fontFamily:SANS }}>{r.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <Field label="Tempo de impressão" hint="peça única" value={horas} onChange={setHoras} unit="h" step={0.25} />
                  <InfoBox color={GRAY_MED}>Imprime várias peças ao mesmo tempo? Ative o Modo Leva acima para dividir os custos corretamente.</InfoBox>
                </>
              )}
            </Card>

            <Card title="Filamento PLA" icon="straighten" accent={COBRE}>
              <Field label="Peso por peça" hint="(g cada)" value={gramas} onChange={setGramas} unit="g" step={0.5} />
              <Field label="Preço do filamento" value={precoKg} onChange={setPrecoKg} unit="R$/kg" step={5} />
              <Field label="Taxa de falha / reimpressão" value={falha} onChange={setFalha} unit="%" step={1} />
              <InfoBox color={COBRE}>
                <span style={{ color:COBRE }}>
                  {usaLeva
                    ? `${pecasLeva} peças × ${fmtN(gramasEfetivas,1)}g = ${fmtN(gramasEfetivas*pecasLeva,1)}g total · ${fmt(cFilamento)} por peça`
                    : `Consumo real: ${fmtN(gramasEfetivas,1)}g · ${fmt(cFilamento)}`
                  }
                </span>
              </InfoBox>
            </Card>

            <Card title="Energia Elétrica" icon={usaSolar ? "wb_sunny" : "bolt"} accent={usaSolar ? SOLAR : "#E8C060"}>
              {!usaLeva && <Field label="Tempo de impressão" value={horas} onChange={setHoras} unit="h" step={0.25} />}
              {usaLeva && (
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", background:`${LEVA_C}08`, borderRadius:8, marginBottom:14 }}>
                  <span style={{ fontSize:12, color:GRAY_MED, fontFamily:SANS }}>Tempo da leva (definido acima)</span>
                  <span style={{ fontFamily:MONO, fontWeight:700, fontSize:14, color:LEVA_C }}>{horasLeva}h ÷ {pecasLeva} = {fmtN(horasLeva/pecasLeva,2)}h/peça</span>
                </div>
              )}
              <Field label="Consumo da impressora" hint="A1 Combo ≈ 350W" value={watts} onChange={setWatts} unit="W" step={10} />
              <div style={{ margin:"14px 0 12px", paddingTop:14, borderTop:`1px solid ${BORDER}` }}>
                <Toggle value={usaSolar} onChange={setUsaSolar} label="Tenho energia solar em casa" color={SOLAR} />
              </div>
              {!usaSolar
                ? <><Field label="Tarifa Equatorial Goiás" hint="com ICMS" value={kwhRede} onChange={setKwhRede} unit="R$/kWh" step={0.01} /><InfoBox color="#E8C060">Bandeira verde. Vermelha P2 acrescente ~R$0,09/kWh</InfoBox></>
                : <div style={{ marginTop:4 }}>
                    <div style={{ background:`${SOLAR}18`, border:`1px solid ${SOLAR}35`, borderRadius:14, padding:"14px 16px", marginBottom:14 }}>
                      <div style={{ fontSize:10, letterSpacing:2, color:SOLAR, fontFamily:MONO, fontWeight:700, textTransform:"uppercase", marginBottom:8, display:"flex", alignItems:"center", gap:6 }}><MI name="wb_sunny" size={14} color={SOLAR} />Modo Solar</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div><div style={{ fontSize:22, fontWeight:700, fontFamily:MONO }}>{fmt(kwhEfetivo)}<span style={{ fontSize:13, color:GRAY_MED }}>/kWh</span></div><div style={{ fontSize:11, color:GRAY_MED, fontFamily:SANS }}>tarifa efetiva</div></div>
                        <div style={{ textAlign:"right" }}><div style={{ fontSize:14, color:SOLAR, fontFamily:MONO, fontWeight:700 }}>- {fmt(economiaSolar)}</div><div style={{ fontSize:10, color:GRAY_MED, fontFamily:SANS }}>por peça</div></div>
                      </div>
                    </div>
                    <Field label="Custo kWh solar" value={kwhSolar} onChange={setKwhSolar} unit="R$/kWh" step={0.01} highlight={SOLAR} />
                    <Field label="% gerado pelo solar" value={percSolar} onChange={setPercSolar} unit="%" step={5} highlight={SOLAR} />
                    <Field label="Tarifa rede (backup)" value={kwhRede} onChange={setKwhRede} unit="R$/kWh" step={0.01} />
                  </div>
              }
            </Card>

            <Card title="Depreciação" icon="print" accent={LEVA_C}>
              <Field label="Valor da impressora" value={precoImp} onChange={setPrecoImp} unit="R$" step={100} />
              <Field label="Vida útil estimada" hint="horas" value={vidaUtil} onChange={setVidaUtil} unit="h" step={100} />
            </Card>

            <Card title="Consumíveis" icon="build" accent={TERRACOTA}>
              <Field label="Preço do bico" value={precoBico} onChange={setPrecoBico} unit="R$" step={1} />
              <Field label="Vida útil do bico" hint="horas" value={vidaBico} onChange={setVidaBico} unit="h" step={25} />
              <Field label="Preço da placa" value={precoPlaca} onChange={setPrecoPlaca} unit="R$" step={5} />
              <Field label="Vida útil da placa" hint="impressões" value={vidaPlaca} onChange={setVidaPlaca} unit="x" step={10} />
            </Card>

            <Card title="Embalagem" icon="inventory_2" accent={EMB_C}>
              <Toggle value={usaEmb} onChange={setUsaEmb} label="Incluir embalagem" color={EMB_C} />
              {usaEmb && <><Field label="Custo da embalagem" value={precoEmb} onChange={setPrecoEmb} unit="R$/un" step={0.5} /><Field label="Frete da embalagem" hint="rateio/un" value={freteEmb} onChange={setFreteEmb} unit="R$/un" step={0.5} /></>}
            </Card>

            <Card title="Mão de Obra (tempo ativo real)" icon="person" accent={MO_C}>
              <Toggle value={usaMO} onChange={setUsaMO} label="Incluir mão de obra" color={MO_C} />
              {usaMO && (
                <>
                  <Field label="Valor hora do seu trabalho" value={valorHora} onChange={setValorHora} unit="R$/h" step={5} />
                  <div style={{ background:`${MO_C}06`, border:`1px solid ${MO_C}15`, borderRadius:12, padding:"12px 14px", marginBottom:14 }}>
                    <div style={{ fontSize:10, color:MO_C, fontFamily:MONO, fontWeight:700, letterSpacing:1, marginBottom:12 }}>ETAPAS DE TRABALHO ATIVO</div>
                    {[
                      { label:"Preparo do arquivo", hint:"fatiamento, suportes, posição", icon:"computer",    value:minPreparo, set:setMinPreparo },
                      { label:"Início da impressão", hint:"ligar, carregar, 1ª camada",  icon:"play_arrow",  value:minInicio,  set:setMinInicio },
                      { label:"Monitoramento",       hint:"checada durante impressão",   icon:"visibility",  value:minMonitor, set:setMinMonitor },
                      { label:"Pós-impressão",       hint:"retirar, suportes, qualidade",icon:"content_cut", value:minPos,     set:setMinPos },
                    ].map(e => (
                      <div key={e.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                        <div>
                          <div style={{ fontSize:13, color:GRAY_CLR, fontFamily:SANS, display:"flex", alignItems:"center", gap:6 }}><MI name={e.icon} size={14} color={MO_C} />{e.label}</div>
                          <div style={{ fontSize:11, color:GRAY_MED, fontFamily:SANS, paddingLeft:20 }}>{e.hint}</div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <input type="number" min={0} step={1} value={e.value}
                            onChange={ev => e.set(parseFloat(ev.target.value)||0)}
                            style={{ width:60, padding:"7px 8px", background:"rgba(242,234,216,.04)", border:`1px solid ${BORDER}`, borderRadius:8, color:MO_C, fontFamily:MONO, fontWeight:700, fontSize:13, textAlign:"right", outline:"none", WebkitAppearance:"none" }}
                          />
                          <span style={{ fontSize:11, color:GRAY_MED, minWidth:24, fontFamily:SANS }}>min</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ borderTop:`1px solid ${MO_C}15`, paddingTop:10, marginTop:4, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:12, color:MO_C, fontFamily:SANS }}>Total tempo ativo</span>
                      <span style={{ fontFamily:MONO, fontWeight:700, fontSize:13, color:MO_C }}>{minAtivo} min · {fmt(cMO)}</span>
                    </div>
                  </div>
                  <InfoBox color={MO_C}>A máquina trabalha sozinha durante a impressão. Seu tempo real cobrado é só o que você está ativamente envolvido — preparo, início, monitoramento e acabamento.</InfoBox>
                </>
              )}
            </Card>

            <Card title="Margem de Lucro" icon="trending_up" accent={COBRE}>
              <Field label="Margem desejada" value={margem} onChange={setMargem} unit="%" step={5} />
            </Card>
          </div>

          {/* resultado */}
          <div className="sticky-col">
            <div style={{ background:`linear-gradient(160deg,${COBRE}06,${TERRACOTA}04,rgba(13,12,10,.9))`, border:`1px solid ${COBRE}25`, borderRadius:20, padding:"22px 20px" }}>
              <div style={{ fontFamily:MONO, fontWeight:700, fontSize:9, letterSpacing:3, color:COBRE, textTransform:"uppercase", marginBottom:usaLeva?10:20, display:"flex", alignItems:"center", gap:6 }}>
                <MI name="bar_chart" size={14} color={COBRE} /> Resultado por peça
              </div>
              {usaLeva && (
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:`${LEVA_C}10`, border:`1px solid ${LEVA_C}25`, borderRadius:10, marginBottom:16 }}>
                  <MI name="print" size={16} color={LEVA_C} />
                  <div>
                    <div style={{ fontSize:11, color:LEVA_C, fontWeight:600, fontFamily:SANS }}>Modo Leva · {pecasLeva} peças · {horasLeva}h</div>
                    <div style={{ fontSize:10, color:GRAY_MED, fontFamily:SANS }}>Custos compartilhados divididos por {pecasLeva}</div>
                  </div>
                </div>
              )}
              {[
                { l:"Filamento PLA",                          v:cFilamento,  sub:`${fmtN(gramasEfetivas,1)}g · individual` },
                { l:usaSolar?"Energia (solar)":"Energia",     v:cEnergia,    sub:usaLeva?`${horasLeva}h ÷ ${pecasLeva} peças`:`${fmt(kwhEfetivo)}/kWh`, solar:usaSolar },
                { l:"Depreciação",                            v:cDeprec,     sub:usaLeva?`${horasLeva}h ÷ ${pecasLeva} peças`:`${horas}h` },
                { l:"Consumíveis",                            v:cConsumivel, sub:usaLeva?`rateado ÷ ${pecasLeva}`:"Bico + placa" },
                ...(usaEmb ? [{ l:"Embalagem", v:cEmb, sub:"por unidade" }] : []),
                ...(usaMO  ? [{ l:"Mão de obra",v:cMO, sub:usaLeva?`${minAtivo}min ÷ ${pecasLeva}`:`${minAtivo} min ativos` }] : []),
              ].map(r => (
                <div key={r.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${BORDER}` }}>
                  <div><div style={{ fontSize:13, color:GRAY_CLR, fontFamily:SANS }}>{r.l}</div><div style={{ fontSize:10, color:r.solar?SOLAR+"99":GRAY_MED, fontFamily:SANS }}>{r.sub}</div></div>
                  <span style={{ fontFamily:MONO, fontWeight:600, fontSize:13, color:r.solar?SOLAR:PERGAMINHO }}>{fmt(r.v)}</span>
                </div>
              ))}
              {usaSolar && economiaSolar > 0 && (
                <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 10px", margin:"8px 0", background:`${SOLAR}12`, borderRadius:8, border:`1px dashed ${SOLAR}30` }}>
                  <span style={{ fontSize:12, color:SOLAR, fontFamily:SANS, display:"flex", alignItems:"center", gap:6 }}><MI name="wb_sunny" size={14} color={SOLAR} />Economia solar</span>
                  <span style={{ fontFamily:MONO, fontWeight:700, fontSize:13, color:SOLAR }}>- {fmt(economiaSolar)}</span>
                </div>
              )}
              <div style={{ marginTop:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${BORDER}` }}>
                  <span style={{ fontWeight:700, fontFamily:SANS, color:PERGAMINHO }}>Custo total</span>
                  <span style={{ fontFamily:MONO, fontWeight:700, fontSize:16 }}>{fmt(total)}</span>
                </div>
                {usaSolar && <div style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${BORDER}` }}>
                  <span style={{ fontSize:11, color:GRAY_MED, fontFamily:SANS }}>Sem solar</span>
                  <span style={{ fontFamily:MONO, fontWeight:600, fontSize:11, color:GRAY_MED, textDecoration:"line-through" }}>{fmt(totalSemSolar)}</span>
                </div>}
                <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0" }}>
                  <span style={{ fontSize:13, color:GRAY_MED, fontFamily:SANS }}>Margem ({margem}%)</span>
                  <span style={{ fontFamily:MONO, fontWeight:600, fontSize:13, color:GRAY_MED }}>+ {fmt(total*margem/100)}</span>
                </div>
              </div>
              <div style={{ marginTop:8, background:`linear-gradient(135deg,${COBRE}18,${TERRACOTA}10)`, border:`1px solid ${COBRE}45`, borderRadius:14, padding:"18px 16px", textAlign:"center" }}>
                <div style={{ fontSize:10, letterSpacing:3, color:COBRE, fontFamily:MONO, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>Preço Mínimo de Venda</div>
                <div style={{ fontSize:38, fontWeight:700, letterSpacing:-1, fontFamily:MONO }}>{fmt(precoVenda)}</div>
                <div style={{ fontSize:11, color:GRAY_MED, marginTop:4, fontFamily:SANS }}>por peça · venda unitária</div>
              </div>
              <div style={{ marginTop:24 }}>
                <div style={{ fontSize:10, letterSpacing:2, color:GRAY_MED, fontFamily:MONO, fontWeight:700, textTransform:"uppercase", marginBottom:14 }}>Composição</div>
                {bars.map(b => <Bar key={b.label} {...b} total={total} />)}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:20 }}>
                {(usaLeva ? [
                  { l:"Custo por peça",         v:fmt(total) },
                  { l:`Total leva (${pecasLeva}x)`,  v:fmt(total*pecasLeva) },
                  { l:`Receita leva (${pecasLeva}x)`,v:fmt(precoVenda*pecasLeva) },
                  { l:`Lucro leva (${pecasLeva}x)`,  v:fmt((precoVenda-total)*pecasLeva) },
                ] : [
                  { l:"Por grama",    v:fmt(total/Math.max(gramas,.01)) },
                  { l:"Por hora",     v:fmt(total/Math.max(horas,.01)) },
                  { l:"10 peças/mês", v:fmt(precoVenda*10) },
                  { l:"50 peças/mês", v:fmt(precoVenda*50) },
                ]).map(c => (
                  <div key={c.l} style={{ background:"rgba(242,234,216,.03)", border:`1px solid ${BORDER}`, borderRadius:10, padding:"10px 12px" }}>
                    <div style={{ fontSize:10, color:GRAY_MED, marginBottom:4, fontFamily:SANS }}>{c.l}</div>
                    <div style={{ fontFamily:MONO, fontWeight:700, fontSize:12, color:GRAY_CLR }}>{c.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10 }}>
                <button onClick={() => setAba("revenda")} style={{ padding:"11px", background:`${REVENDA_C}15`, border:`1px solid ${REVENDA_C}40`, borderRadius:12, color:REVENDA_C, fontFamily:MONO, fontWeight:700, fontSize:9, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><MI name="storefront" size={14} color={REVENDA_C} />Revenda</button>
                <button onClick={() => setAba("custom")}  style={{ padding:"11px", background:`${CUSTOM_C}15`,  border:`1px solid ${CUSTOM_C}40`,  borderRadius:12, color:CUSTOM_C,  fontFamily:MONO, fontWeight:700, fontSize:9, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><MI name="diamond" size={14} color={CUSTOM_C} />Personalizado</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA REVENDA */}
      {aba === "revenda" && (
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ background:`${REVENDA_C}08`, border:`1px solid ${REVENDA_C}25`, borderRadius:14, padding:"14px 18px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
            <div style={{ fontFamily:MONO, fontWeight:700, fontSize:9, color:REVENDA_C, letterSpacing:2, textTransform:"uppercase" }}>Base: custo unitário</div>
            <div style={{ display:"flex", gap:20 }}>
              {[{ l:"Custo",v:fmt(total)},{ l:"Varejo (1x)",v:fmt(precoVenda)},{ l:"Margem",v:`${margem}%`}].map(c => (
                <div key={c.l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:10, color:GRAY_MED, fontFamily:SANS }}>{c.l}</div>
                  <div style={{ fontFamily:MONO, fontWeight:700, fontSize:13, color:GRAY_CLR }}>{c.v}</div>
                </div>
              ))}
            </div>
          </div>
          <Card title="Simulador de Revenda em Lote" icon="storefront" accent={REVENDA_C}>
            <TabelaRevenda custoBase={total} custoSetup={custoSetup} />
          </Card>
        </div>
      )}

      {/* ABA PERSONALIZADO */}
      {aba === "custom" && <AbaPersonalizacao custoBase={total} margemBase={margem} />}
    </div>
  );
}
