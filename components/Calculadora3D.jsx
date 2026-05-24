"use client";
import { useState } from "react";

/* ── formatação ──────────────────────────────────────────────── */
const R$ = (v) => v.toLocaleString("pt-BR", { style:"currency", currency:"BRL" });
const N  = (v, d=2) => v.toLocaleString("pt-BR", { minimumFractionDigits:d, maximumFractionDigits:d });

/* ── design tokens (8px grid) ────────────────────────────────── */
const C = {
  cobre:      "#C98244",
  terra:      "#B56B3A",
  negro:      "#0D0C0A",
  noturno:    "#1A1E2E",
  perg:       "#F2EAD8",
  cinzaClr:   "#B8B0A8",
  cinzaMed:   "#6B6460",
  cinzaEsc:   "#3A3632",
  solar:      "#E8A855",
  leva:       "#A0522D",
  emb:        "#8B7355",
  mo:         "#9E8A75",
  urg:        "#C44B2A",
  brd:        "rgba(201,130,68,0.12)",
  brd2:       "rgba(201,130,68,0.24)",
  glass:      "rgba(26,30,46,0.7)",
};
/* 8px scale: 4 8 16 24 32 40 48 64 */
const sp = (n) => `${n * 8}px`;

/* ── base atoms ──────────────────────────────────────────────── */
function Icon({ n, s=20, c, style={} }) {
  return (
    <span className="material-icons"
      style={{ fontSize:s, color:c||"inherit", lineHeight:1, verticalAlign:"middle", userSelect:"none", ...style }}>
      {n}
    </span>
  );
}

function Toggle({ on, set, label, color=C.cobre }) {
  return (
    <label style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer", userSelect:"none", marginBottom:16 }}>
      <span onClick={()=>set(!on)} style={{ width:44, height:24, borderRadius:100, background:on?color:C.cinzaEsc, border:`1px solid ${on?color:C.brd}`, position:"relative", flexShrink:0, transition:"all .2s", display:"block" }}>
        <span style={{ position:"absolute", top:3, left:on?22:3, width:16, height:16, borderRadius:"50%", background:C.perg, transition:"left .2s", display:"block" }} />
      </span>
      <span style={{ fontSize:14, color:on?C.cinzaClr:C.cinzaMed, lineHeight:1.4 }}>{label}</span>
    </label>
  );
}

function Field({ label, hint, value, onChange, unit, step=1, min=0, color }) {
  const ac = color || C.brd;
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6, gap:8, flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:6, flexWrap:"wrap" }}>
          <span style={{ fontSize:14, color:C.cinzaClr, fontWeight:500 }}>{label}</span>
          {hint && <span style={{ fontSize:12, color:C.cinzaMed }}>{hint}</span>}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <input type="number" min={min} step={step} value={value}
            onChange={e => onChange(parseFloat(e.target.value)||0)}
            style={{ width:96, padding:"8px 12px", background:color?`${color}12`:"rgba(242,234,216,0.04)", border:`1px solid ${color?color+"40":C.brd}`, borderRadius:8, color:color||C.perg, fontSize:16, fontWeight:600, textAlign:"right", outline:"none", WebkitAppearance:"none", fontFamily:"inherit" }}
          />
          {unit && <span style={{ fontSize:12, color:C.cinzaMed, minWidth:36 }}>{unit}</span>}
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, accent=C.cobre, children, noBorder }) {
  return (
    <div style={{ background:C.glass, border:noBorder?"none":`1px solid ${accent}18`, borderRadius:16, padding:"24px", marginBottom:16, backdropFilter:"blur(8px)" }}>
      {(title||icon) && (
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, paddingBottom:16, borderBottom:`1px solid ${C.brd}` }}>
          {icon && <Icon n={icon} s={16} c={accent} />}
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:accent, textTransform:"uppercase" }}>{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function Bar({ label, value, total, color }) {
  const pct = total > 0 ? Math.min(100,(value/total)*100) : 0;
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ fontSize:12, color:C.cinzaMed }}>{label}</span>
        <span style={{ fontSize:12, color:C.cinzaClr, fontWeight:600 }}>{pct.toFixed(0)}% · {R$(value)}</span>
      </div>
      <div style={{ height:4, background:"rgba(242,234,216,0.06)", borderRadius:4 }}>
        <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:4, transition:"width .4s ease" }} />
      </div>
    </div>
  );
}

function Pill({ children, color=C.cobre }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"2px 10px", borderRadius:100, background:`${color}18`, border:`1px solid ${color}35`, fontSize:11, fontWeight:700, color, letterSpacing:"0.06em" }}>
      {children}
    </span>
  );
}

function InfoBox({ color=C.cobre, children }) {
  return (
    <div style={{ background:`${color}0C`, border:`1px solid ${color}22`, borderRadius:8, padding:"12px 16px", fontSize:13, color:C.cinzaClr, lineHeight:1.6, marginTop:4, display:"flex", gap:10, alignItems:"flex-start" }}>
      <Icon n="lightbulb" s={16} c={color} style={{ flexShrink:0, marginTop:1 }} />
      <span>{children}</span>
    </div>
  );
}

/* ── result line ─────────────────────────────────────────────── */
function ResultRow({ label, value, sub, accent, strike }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${C.brd}` }}>
      <div>
        <div style={{ fontSize:14, color:C.cinzaClr }}>{label}</div>
        {sub && <div style={{ fontSize:11, color:C.cinzaMed, marginTop:2 }}>{sub}</div>}
      </div>
      <span style={{ fontSize:15, fontWeight:600, color:accent||C.perg, textDecoration:strike?"line-through":"none" }}>{value}</span>
    </div>
  );
}

/* ── result panel ────────────────────────────────────────────── */
function PainelResultado({ total, totalSemSolar, precoVenda, margem, bars, usaSolar, economiaSolar, usaLeva, pecasLeva, horasLeva, onRevenda, onCustom }) {
  return (
    <div style={{ background:`linear-gradient(160deg, ${C.noturno}, ${C.negro} 80%)`, border:`1px solid ${C.brd2}`, borderRadius:20, padding:24, position:"sticky", top:24 }}>
      {/* mini header */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
        <Icon n="calculate" s={16} c={C.cobre} />
        <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:C.cobre, textTransform:"uppercase" }}>Resultado por peça</span>
      </div>

      {usaLeva && (
        <div style={{ display:"flex", gap:8, alignItems:"center", background:`${C.leva}14`, border:`1px solid ${C.leva}30`, borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
          <Icon n="print" s={16} c={C.leva} />
          <div>
            <div style={{ fontSize:13, color:C.leva, fontWeight:600 }}>Modo Leva · {pecasLeva}× · {horasLeva}h</div>
            <div style={{ fontSize:11, color:C.cinzaMed, marginTop:2 }}>Custos divididos por {pecasLeva} peças</div>
          </div>
        </div>
      )}

      {/* custo rows */}
      <div style={{ marginBottom:8 }}>
        {bars.map(b => (
          <ResultRow key={b.label} label={b.label} value={R$(b.v)} sub={b.sub} accent={b.solar?C.solar:undefined} />
        ))}
        {usaSolar && economiaSolar > 0 && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", margin:"8px 0", background:`${C.solar}10`, borderRadius:8, border:`1px dashed ${C.solar}35` }}>
            <span style={{ fontSize:13, color:C.solar, display:"flex", alignItems:"center", gap:6 }}><Icon n="wb_sunny" s={14} c={C.solar} />Economia solar</span>
            <span style={{ fontSize:14, fontWeight:700, color:C.solar }}>− {R$(economiaSolar)}</span>
          </div>
        )}
      </div>

      {/* subtotal */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderTop:`1px solid ${C.brd2}`, borderBottom:`1px solid ${C.brd}` }}>
        <span style={{ fontSize:15, fontWeight:700, color:C.perg }}>Custo total</span>
        <span style={{ fontSize:20, fontWeight:700, color:C.perg }}>{R$(total)}</span>
      </div>
      {usaSolar && (
        <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0 0" }}>
          <span style={{ fontSize:12, color:C.cinzaMed }}>Sem solar</span>
          <span style={{ fontSize:12, color:C.cinzaMed, textDecoration:"line-through" }}>{R$(totalSemSolar)}</span>
        </div>
      )}
      <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0 16px" }}>
        <span style={{ fontSize:13, color:C.cinzaMed }}>Margem ({margem}%)</span>
        <span style={{ fontSize:13, color:C.cinzaMed }}>+ {R$(total*margem/100)}</span>
      </div>

      {/* preço hero */}
      <div style={{ background:`linear-gradient(135deg, ${C.cobre}20, ${C.terra}10)`, border:`1px solid ${C.cobre}50`, borderRadius:16, padding:"24px 20px", textAlign:"center", marginBottom:24 }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em", color:C.cobre, textTransform:"uppercase", marginBottom:8 }}>Preço Mínimo de Venda</div>
        <div style={{ fontSize:40, fontWeight:700, color:C.perg, letterSpacing:"-0.02em", lineHeight:1 }}>{R$(precoVenda)}</div>
        <div style={{ fontSize:12, color:C.cinzaMed, marginTop:8 }}>por peça · venda unitária</div>
      </div>

      {/* composition bars */}
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:C.cinzaMed, textTransform:"uppercase", marginBottom:12 }}>Composição do custo</div>
        {bars.map(b => <Bar key={b.label} label={b.label} value={b.v} total={total} color={b.color} />)}
      </div>

      {/* métricas */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
        {[
          { l:"Por grama",    v: R$(total/Math.max(1,3)) },
          { l:"10 peças/mês", v: R$(precoVenda*10) },
          { l:"25 peças/mês", v: R$(precoVenda*25) },
          { l:"50 peças/mês", v: R$(precoVenda*50) },
        ].map(c => (
          <div key={c.l} style={{ background:"rgba(242,234,216,0.03)", border:`1px solid ${C.brd}`, borderRadius:12, padding:"12px 14px" }}>
            <div style={{ fontSize:11, color:C.cinzaMed, marginBottom:4 }}>{c.l}</div>
            <div style={{ fontSize:14, fontWeight:600, color:C.cinzaClr }}>{c.v}</div>
          </div>
        ))}
      </div>

      {/* navegar abas */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        <button onClick={onRevenda} style={{ padding:"12px 8px", background:`${C.terra}14`, border:`1px solid ${C.terra}35`, borderRadius:12, color:C.terra, fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
          <Icon n="storefront" s={14} c={C.terra} />Revenda
        </button>
        <button onClick={onCustom} style={{ padding:"12px 8px", background:`${C.cobre}14`, border:`1px solid ${C.cobre}35`, borderRadius:12, color:C.cobre, fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
          <Icon n="diamond" s={14} c={C.cobre} />Personalizado
        </button>
      </div>
    </div>
  );
}

/* ── ABA REVENDA ─────────────────────────────────────────────── */
function AbaRevenda({ total, precoVenda, margem, custoSetup }) {
  const [mVar, setMVar] = useState(40);
  const [mRev, setMRev] = useState(25);
  const [mAta, setMAta] = useState(15);
  const [bulk, setBulk] = useState(10);

  const faixas = [
    { label:"Varejo",  qtd:1,   icon:"shopping_bag", m:mVar, color:C.cobre },
    { label:"Varejo",  qtd:5,   icon:"shopping_bag", m:mVar, color:C.cobre },
    { label:"Revenda", qtd:10,  icon:"store",        m:mRev, color:C.terra },
    { label:"Revenda", qtd:25,  icon:"store",        m:mRev, color:C.terra },
    { label:"Atacado", qtd:50,  icon:"inventory_2",  m:mAta, color:C.leva },
    { label:"Atacado", qtd:100, icon:"inventory_2",  m:mAta, color:C.leva },
  ];
  const calcUn = (qtd) => {
    const d = qtd>=50 ? bulk/100 : qtd>=10 ? bulk/200 : 0;
    return total*(1-d) + custoSetup/qtd;
  };
  const base1 = calcUn(1);

  return (
    <div style={{ maxWidth:960, margin:"0 auto" }}>
      {/* banner base */}
      <div style={{ background:C.glass, border:`1px solid ${C.brd}`, borderRadius:16, padding:"16px 24px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:C.cinzaMed, textTransform:"uppercase" }}>Base de cálculo</div>
        <div style={{ display:"flex", gap:32, flexWrap:"wrap" }}>
          {[{l:"Custo",v:R$(total)},{l:"Preço varejo 1×",v:R$(precoVenda)},{l:"Margem atual",v:`${margem}%`}].map(c=>(
            <div key={c.l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:11, color:C.cinzaMed, marginBottom:4 }}>{c.l}</div>
              <div style={{ fontSize:16, fontWeight:700, color:C.cinzaClr }}>{c.v}</div>
            </div>
          ))}
        </div>
      </div>

      <Card title="Margens por canal" icon="tune" accent={C.terra}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
          {[
            {l:"Varejo",v:mVar,set:setMVar,color:C.cobre},
            {l:"Revenda",v:mRev,set:setMRev,color:C.terra},
            {l:"Atacado",v:mAta,set:setMAta,color:C.leva},
          ].map(m=>(
            <div key={m.l} style={{ background:`${m.color}0C`, border:`1px solid ${m.color}25`, borderRadius:12, padding:"16px", textAlign:"center" }}>
              <div style={{ fontSize:11, color:m.color, fontWeight:700, letterSpacing:"0.08em", marginBottom:12 }}>{m.l}</div>
              <input type="number" min={0} step={5} value={m.v} onChange={e=>m.set(parseFloat(e.target.value)||0)}
                style={{ width:"100%", padding:"8px 4px", background:"transparent", border:`1px solid ${m.color}35`, borderRadius:8, color:m.color, fontFamily:"inherit", fontSize:24, fontWeight:700, textAlign:"center", outline:"none", WebkitAppearance:"none" }} />
              <div style={{ fontSize:11, color:C.cinzaMed, marginTop:8 }}>%</div>
            </div>
          ))}
        </div>
        <Field label="Desconto bulk (filamento)" hint="ao comprar mais kg" value={bulk} onChange={setBulk} unit="%" step={1} />
      </Card>

      {/* tabela */}
      <div style={{ background:C.glass, border:`1px solid ${C.brd}`, borderRadius:16, overflow:"hidden" }}>
        {/* header */}
        <div style={{ display:"grid", gridTemplateColumns:"72px 1fr 1fr 1fr 1fr", background:"rgba(26,30,46,0.9)", padding:"12px 24px", gap:8, borderBottom:`1px solid ${C.brd}` }}>
          {["Lote","Custo/un","Preço/un","Receita","Lucro"].map(h=>(
            <span key={h} style={{ fontSize:11, fontWeight:700, color:C.cinzaMed, letterSpacing:"0.08em" }}>{h}</span>
          ))}
        </div>
        {faixas.map((f,i)=>{
          const cu=calcUn(f.qtd), pu=cu*(1+f.m/100);
          const eco=((base1-cu)/base1*100), isBest=f.qtd===25;
          return (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"72px 1fr 1fr 1fr 1fr", padding:"16px 24px", gap:8, alignItems:"center", borderTop:`1px solid ${C.brd}`, background:isBest?`${f.color}06`:"transparent", position:"relative" }}>
              {isBest && <div style={{ position:"absolute", top:0, right:16, background:f.color, color:C.negro, fontSize:9, fontWeight:700, padding:"3px 10px", borderRadius:"0 0 8px 8px", letterSpacing:"0.1em" }}>MELHOR</div>}
              <div>
                <div style={{ fontSize:18, fontWeight:700, color:f.color }}>{f.qtd}×</div>
                <div style={{ fontSize:11, color:C.cinzaMed, display:"flex", alignItems:"center", gap:4, marginTop:2 }}><Icon n={f.icon} s={12} c={C.cinzaMed}/>{f.label}</div>
                {eco>0.5&&<div style={{ fontSize:10, color:f.color, marginTop:2 }}>−{N(eco,1)}%</div>}
              </div>
              <div style={{ fontSize:14, fontWeight:600, color:C.cinzaMed }}>{R$(cu)}</div>
              <div>
                <div style={{ fontSize:16, fontWeight:700, color:C.perg }}>{R$(pu)}</div>
                <div style={{ fontSize:11, color:C.cinzaMed }}>{f.m}%</div>
              </div>
              <div style={{ fontSize:14, fontWeight:600, color:f.color }}>{R$(pu*f.qtd)}</div>
              <div style={{ fontSize:14, fontWeight:600, color:C.cobre }}>{R$((pu-cu)*f.qtd)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── ABA PERSONALIZADO ───────────────────────────────────────── */
function AbaPersonalizado({ custoBase, margemBase }) {
  const [modelagem,  setModelagem]  = useState(false);
  const [hMod,       setHMod]       = useState(1.5);
  const [vlHMod,     setVlHMod]     = useState(80);
  const [nRev,       setNRev]       = useState(2);
  const [vlRev,      setVlRev]      = useState(20);
  const [arquivo,    setArquivo]    = useState(false);
  const [licenca,    setLicenca]    = useState(35);
  const [posProc,    setPosProc]    = useState(false);
  const [tipoPos,    setTipoPos]    = useState({lixamento:false,pintura:false,verniz:false,montagem:false});
  const [hPos,       setHPos]       = useState(0.5);
  const [vlHPos,     setVlHPos]     = useState(50);
  const [matPos,     setMatPos]     = useState(8);
  const [embP,       setEmbP]       = useState(false);
  const [custoEmbP,  setCustoEmbP]  = useState(12);
  const [complex,    setComplex]    = useState(15);
  const [urgencia,   setUrgencia]   = useState(false);
  const [percUrg,    setPercUrg]    = useState(30);
  const [margem,     setMargem]     = useState(margemBase+40);
  const [cliente,    setCliente]    = useState("");
  const [produto,    setProduto]    = useState("");

  const cMod  = modelagem ? hMod*vlHMod + nRev*vlRev : 0;
  const cArq  = arquivo   ? licenca : 0;
  const cPos  = posProc   ? hPos*vlHPos + matPos : 0;
  const cEmb  = embP      ? custoEmbP : 0;
  const cCmx  = custoBase*(complex/100);
  const sub   = custoBase+cMod+cArq+cPos+cEmb+cCmx;
  const cUrg  = urgencia  ? sub*(percUrg/100) : 0;
  const tot   = sub+cUrg;
  const vMgm  = tot*(margem/100);
  const preco = tot+vMgm;
  const plus  = preco - custoBase*(1+margemBase/100);

  const tiposPos = [
    {key:"lixamento",label:"Lixamento",icon:"handyman"},
    {key:"pintura",  label:"Pintura",  icon:"palette"},
    {key:"verniz",   label:"Verniz",   icon:"auto_awesome"},
    {key:"montagem", label:"Montagem", icon:"build"},
  ];

  const bars = [
    {l:"Impressão base",  v:custoBase,color:C.cobre},
    {l:"Modelagem",       v:cMod,     color:C.terra},
    {l:"Arquivo/licença", v:cArq,     color:C.leva},
    {l:"Pós-proc.",       v:cPos,     color:C.mo},
    {l:"Embalagem",       v:cEmb,     color:C.emb},
    {l:"Complexidade",    v:cCmx,     color:C.solar},
    ...(urgencia?[{l:"Urgência",v:cUrg,color:C.urg}]:[]),
  ].filter(b=>b.v>0);

  return (
    <div style={{ maxWidth:960, margin:"0 auto" }}>
      <div style={{ display:"grid", gap:16 }} className="custom-grid">
        <div>
          {/* identificação */}
          <Card title="Identificação do pedido" icon="badge" accent={C.cobre}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[{l:"Nome do cliente",value:cliente,set:setCliente,ph:"Ex: Maria Silva"},{l:"Peça / descrição",value:produto,set:setProduto,ph:"Ex: Crucifixo São Bento"}].map(f=>(
                <div key={f.l}>
                  <div style={{ fontSize:13, color:C.cinzaMed, marginBottom:6 }}>{f.l}</div>
                  <input value={f.value} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                    style={{ width:"100%", padding:"10px 12px", background:"rgba(242,234,216,0.04)", border:`1px solid ${C.brd}`, borderRadius:8, color:C.cinzaClr, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }} />
                </div>
              ))}
            </div>
          </Card>

          {/* custo base ref */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:`${C.cobre}08`, border:`1px solid ${C.brd}`, borderRadius:12, padding:"12px 20px", marginBottom:16 }}>
            <div><div style={{ fontSize:12, color:C.cinzaMed }}>Custo base impressão</div><div style={{ fontSize:20, fontWeight:700, color:C.cinzaClr }}>{R$(custoBase)}</div></div>
            <div style={{ textAlign:"right" }}><div style={{ fontSize:12, color:C.cinzaMed }}>Peça padrão ({margemBase}%)</div><div style={{ fontSize:14, fontWeight:600, color:C.cinzaMed }}>{R$(custoBase*(1+margemBase/100))}</div></div>
          </div>

          <Card title="Modelagem & Design" icon="palette" accent={C.terra}>
            <Toggle on={modelagem} set={setModelagem} label="Incluir modelagem / adaptação 3D" color={C.terra} />
            {modelagem && (<>
              <Field label="Horas de modelagem" value={hMod} onChange={setHMod} unit="h" step={0.25} color={C.terra} />
              <Field label="Valor/hora modelagem" value={vlHMod} onChange={setVlHMod} unit="R$/h" step={10} color={C.terra} />
              <Field label="Revisões inclusas" hint="rodadas de ajuste" value={nRev} onChange={setNRev} unit="×" step={1} />
              <Field label="Custo por revisão extra" value={vlRev} onChange={setVlRev} unit="R$/×" step={5} />
              <InfoBox color={C.terra}>Deixe claro ao cliente quantas revisões estão incluídas. Acima disso, cobra à parte — protege seu tempo.</InfoBox>
            </>)}
          </Card>

          <Card title="Licença de Arquivo 3D" icon="folder" accent={C.leva}>
            <Toggle on={arquivo} set={setArquivo} label="Comprei arquivo de terceiro" color={C.leva} />
            {arquivo && (<>
              <Field label="Custo da licença" hint="valor pago" value={licenca} onChange={setLicenca} unit="R$" step={5} color={C.leva} />
              <InfoBox color={C.leva}>Repasse 100% do custo da licença — é insumo direto do pedido, não seu custo.</InfoBox>
            </>)}
          </Card>

          <Card title="Complexidade de Impressão" icon="settings" accent={C.solar}>
            <Field label="Acréscimo de complexidade" hint="suportes, geometria difícil" value={complex} onChange={setComplex} unit="%" step={5} color={C.solar} />
            <InfoBox color={C.solar}>Peças personalizadas têm mais suporte e desperdício. 10–20% é faixa saudável.</InfoBox>
          </Card>

          <Card title="Pós-processamento" icon="auto_awesome" accent={C.mo}>
            <Toggle on={posProc} set={setPosProc} label="Inclui acabamento especial" color={C.mo} />
            {posProc && (<>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, color:C.cinzaMed, marginBottom:10 }}>Tipos de acabamento:</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {tiposPos.map(t=>(
                    <button key={t.key} onClick={()=>setTipoPos(p=>({...p,[t.key]:!p[t.key]}))}
                      style={{ padding:"10px 14px", borderRadius:10, cursor:"pointer", border:`1px solid ${tipoPos[t.key]?C.mo+"60":C.brd}`, background:tipoPos[t.key]?`${C.mo}12`:"transparent", display:"flex", alignItems:"center", gap:8, fontSize:13, color:tipoPos[t.key]?C.mo:C.cinzaMed, fontFamily:"inherit" }}>
                      <Icon n={t.icon} s={15} c={tipoPos[t.key]?C.mo:C.cinzaMed} />{t.label}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="Horas de acabamento" value={hPos} onChange={setHPos} unit="h" step={0.25} />
              <Field label="Valor/hora acabamento" value={vlHPos} onChange={setVlHPos} unit="R$/h" step={5} />
              <Field label="Material de acabamento" hint="tinta, lixa, verniz…" value={matPos} onChange={setMatPos} unit="R$" step={1} />
            </>)}
          </Card>

          <Card title="Embalagem Premium" icon="card_giftcard" accent={C.emb}>
            <Toggle on={embP} set={setEmbP} label="Embalagem especial para presente" color={C.emb} />
            {embP && (<>
              <Field label="Custo da embalagem" hint="caixa, laço, tag…" value={custoEmbP} onChange={setCustoEmbP} unit="R$" step={1} color={C.emb} />
              <InfoBox color={C.emb}>Embalagem premium justifica um preço percebido muito maior. Invista nisso em pedidos de presente.</InfoBox>
            </>)}
          </Card>

          <Card title="Taxa de Urgência" icon="bolt" accent={C.urg}>
            <Toggle on={urgencia} set={setUrgencia} label="Pedido urgente / prazo reduzido" color={C.urg} />
            {urgencia && (<>
              <Field label="Adicional de urgência" value={percUrg} onChange={setPercUrg} unit="%" step={5} color={C.urg} />
              <InfoBox color={C.urg}>20–50% é prática comum. Cobre reorganização de fila e pressão operacional.</InfoBox>
            </>)}
          </Card>

          <Card title="Margem para Personalizado" icon="diamond" accent={C.cobre}>
            <Field label="Margem do pedido personalizado" value={margem} onChange={setMargem} unit="%" step={5} color={C.cobre} />
            <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderTop:`1px solid ${C.brd}`, marginTop:8 }}>
              <span style={{ fontSize:13, color:C.cinzaMed }}>Margem padrão</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.cinzaMed }}>{margemBase}%</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0" }}>
              <span style={{ fontSize:13, color:C.cobre }}>Prêmio da personalização</span>
              <span style={{ fontSize:13, fontWeight:700, color:C.cobre }}>+{margem-margemBase}%</span>
            </div>
            <InfoBox color={C.cobre}>Personalização é exclusividade. Margem 30–50% maior que o padrão é justa e esperada.</InfoBox>
          </Card>
        </div>

        {/* painel resultado */}
        <div className="sticky-col">
          <div style={{ background:`linear-gradient(160deg,${C.noturno},${C.negro} 80%)`, border:`1px solid ${C.brd2}`, borderRadius:20, padding:24, position:"sticky", top:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
              <Icon n="diamond" s={16} c={C.cobre} />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:C.cobre, textTransform:"uppercase" }}>Orçamento Personalizado</span>
            </div>

            {(cliente||produto) && (
              <div style={{ background:`${C.cobre}0C`, borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
                {cliente&&<div style={{ fontSize:14, color:C.cinzaClr, display:"flex", alignItems:"center", gap:8 }}><Icon n="person" s={14} c={C.cinzaMed}/>{cliente}</div>}
                {produto&&<div style={{ fontSize:13, color:C.cinzaMed, marginTop:4, display:"flex", alignItems:"center", gap:8 }}><Icon n="inventory_2" s={13} c={C.cinzaMed}/>{produto}</div>}
              </div>
            )}

            {/* linhas */}
            {[
              {l:"Impressão base",    v:custoBase, show:true},
              {l:"Modelagem & design",v:cMod,      show:modelagem&&cMod>0},
              {l:"Licença de arquivo",v:cArq,      show:arquivo},
              {l:"Pós-processamento", v:cPos,      show:posProc},
              {l:"Embalagem premium", v:cEmb,      show:embP},
              {l:"Complexidade",      v:cCmx,      show:complex>0},
              {l:"Taxa de urgência",  v:cUrg,      show:urgencia},
            ].filter(r=>r.show).map(r=>(
              <div key={r.l} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${C.brd}` }}>
                <span style={{ fontSize:14, color:C.cinzaClr }}>{r.l}</span>
                <span style={{ fontSize:14, fontWeight:600, color:C.perg }}>{R$(r.v)}</span>
              </div>
            ))}

            <div style={{ padding:"12px 0", borderTop:`1px solid ${C.brd2}`, display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
              <span style={{ fontSize:15, fontWeight:700, color:C.perg }}>Custo total</span>
              <span style={{ fontSize:20, fontWeight:700 }}>{R$(tot)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0 16px" }}>
              <span style={{ fontSize:13, color:C.cinzaMed }}>Margem ({margem}%)</span>
              <span style={{ fontSize:13, color:C.cinzaMed }}>+ {R$(vMgm)}</span>
            </div>

            {/* preço hero */}
            <div style={{ background:`linear-gradient(135deg,${C.cobre}22,${C.terra}12)`, border:`1px solid ${C.cobre}50`, borderRadius:16, padding:"24px 20px", textAlign:"center", marginBottom:24 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em", color:C.cobre, textTransform:"uppercase", marginBottom:8 }}>Preço Final Personalizado</div>
              <div style={{ fontSize:40, fontWeight:700, color:C.perg, letterSpacing:"-0.02em", lineHeight:1 }}>{R$(preco)}</div>
              <div style={{ fontSize:12, color:C.cinzaMed, marginTop:8 }}>por peça única</div>
            </div>

            {/* vs padrão */}
            <div style={{ background:"rgba(242,234,216,0.02)", borderRadius:12, padding:"16px", marginBottom:24 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", color:C.cinzaMed, marginBottom:12, textTransform:"uppercase" }}>Comparativo</div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontSize:13, color:C.cinzaMed }}>Peça padrão ({margemBase}%)</span>
                <span style={{ fontSize:13, fontWeight:600, color:C.cinzaMed }}>{R$(custoBase*(1+margemBase/100))}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:14, fontWeight:600, color:C.cobre }}>Valor adicional</span>
                <span style={{ fontSize:16, fontWeight:700, color:C.cobre }}>+{R$(plus)}</span>
              </div>
            </div>

            {/* bars */}
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:C.cinzaMed, textTransform:"uppercase", marginBottom:12 }}>Composição</div>
            {bars.map(b=><Bar key={b.l} label={b.l} value={b.v} total={tot} color={b.color}/>)}

            {/* resumo */}
            <div style={{ marginTop:24, background:`${C.cobre}08`, border:`1px solid ${C.brd}`, borderRadius:12, padding:"16px" }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.cobre, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}><Icon n="assignment" s={14} c={C.cobre}/>Resumo</div>
              {[{l:"Peça base",v:R$(custoBase)},{l:"Serviços extras",v:R$(tot-custoBase)},{l:"Margem",v:`${margem}%`},{l:"Preço final",v:R$(preco),d:true}].map(c=>(
                <div key={c.l} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.cobre}12` }}>
                  <span style={{ fontSize:13, color:c.d?C.perg:C.cinzaMed, fontWeight:c.d?700:400 }}>{c.l}</span>
                  <span style={{ fontSize:13, fontWeight:c.d?700:600, color:c.d?C.cobre:C.cinzaMed }}>{c.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── APP PRINCIPAL ───────────────────────────────────────────── */
export default function Calc3D() {
  const [aba,        setAba]       = useState("custo");
  const [usaLeva,    setUsaLeva]   = useState(false);
  const [pecasLeva,  setPecasLeva] = useState(4);
  const [horasLeva,  setHorasLeva] = useState(8);
  const [gramas,     setGramas]    = useState(50);
  const [precoKg,    setPrecoKg]   = useState(120);
  const [falha,      setFalha]     = useState(10);
  const [horas,      setHoras]     = useState(3);
  const [watts,      setWatts]     = useState(350);
  const [usaSolar,   setUsaSolar]  = useState(false);
  const [kwhRede,    setKwhRede]   = useState(0.78);
  const [kwhSolar,   setKwhSolar]  = useState(0.15);
  const [percSolar,  setPercSolar] = useState(80);
  const [precoImp,   setPrecoImp]  = useState(4500);
  const [vidaUtil,   setVidaUtil]  = useState(5000);
  const [precoBico,  setPrecoBico] = useState(28);
  const [vidaBico,   setVidaBico]  = useState(500);
  const [precoPlaca, setPrecoPlaca]= useState(90);
  const [vidaPlaca,  setVidaPlaca] = useState(300);
  const [usaEmb,     setUsaEmb]    = useState(false);
  const [precoEmb,   setPrecoEmb]  = useState(3.5);
  const [freteEmb,   setFreteEmb]  = useState(0);
  const [usaMO,      setUsaMO]     = useState(false);
  const [valorHora,  setValorHora] = useState(50);
  const [minPrep,    setMinPrep]   = useState(15);
  const [minIni,     setMinIni]    = useState(8);
  const [minMon,     setMinMon]    = useState(5);
  const [minPos,     setMinPos]    = useState(15);
  const [margem,     setMargem]    = useState(40);

  const div        = usaLeva ? pecasLeva : 1;
  const kwhEf      = usaSolar ? kwhSolar*percSolar/100 + kwhRede*(1-percSolar/100) : kwhRede;
  const eKwh       = (watts/1000)*(usaLeva?horasLeva:horas);
  const cEn        = (eKwh*kwhEf)/div;
  const cEnSemSol  = (eKwh*kwhRede)/div;
  const econSol    = cEnSemSol - cEn;
  const gEf        = gramas*(1+falha/100);
  const cFil       = (gEf/1000)*precoKg;
  const cDep       = ((precoImp/vidaUtil)*(usaLeva?horasLeva:horas))/div;
  const cCons      = ((precoBico/vidaBico)*(usaLeva?horasLeva:horas) + precoPlaca/vidaPlaca)/div;
  const cEmb       = usaEmb ? precoEmb+freteEmb : 0;
  const minAt      = minPrep+minIni+minMon+minPos;
  const cMO        = usaMO ? (valorHora*(minAt/60))/div : 0;
  const custoSetup = usaMO ? (valorHora*((minPrep+minIni)/60))/div : 0;
  const total      = cFil+cEn+cDep+cCons+cEmb+cMO;
  const totSemSol  = cFil+cEnSemSol+cDep+cCons+cEmb+cMO;
  const precoVenda = total*(1+margem/100);

  const barsResult = [
    {label:"Filamento PLA", v:cFil,  color:C.cobre,  sub:`${N(gEf,1)}g · individual`},
    {label:"Energia",       v:cEn,   color:usaSolar?C.solar:"#E8C060", solar:usaSolar, sub:usaSolar?`${N(kwhEf,3)}/kWh`:`${N(kwhRede,2)}/kWh`},
    {label:"Depreciação",   v:cDep,  color:C.leva,   sub:usaLeva?`${horasLeva}h ÷ ${pecasLeva}`:`${horas}h`},
    {label:"Consumíveis",   v:cCons, color:C.terra,  sub:"Bico + placa"},
    ...(usaEmb?[{label:"Embalagem",v:cEmb,color:C.emb,sub:"por unidade"}]:[]),
    ...(usaMO ?[{label:"Mão de obra",v:cMO,color:C.mo,sub:`${minAt} min ativos`}]:[]),
  ];

  const tabs = [
    {id:"custo",   label:"Custo & Preço", icon:"calculate"},
    {id:"revenda", label:"Revenda",       icon:"storefront"},
    {id:"custom",  label:"Personalizado", icon:"diamond"},
  ];

  return (
    <div style={{ minHeight:"100vh", background:C.negro, color:C.perg, fontFamily:"'Jost', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box;}
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        input[type=number]{-moz-appearance:textfield;}
        ::placeholder{color:${C.cinzaMed}!important;}

        /* 2-col layout desktop */
        @media(min-width:768px){
          .main-grid{display:grid!important;grid-template-columns:1fr 400px!important;gap:24px!important;align-items:start!important;}
          .custom-grid{display:grid!important;grid-template-columns:1fr 380px!important;gap:24px!important;align-items:start!important;}
          .sticky-col{position:sticky!important;top:24px!important;}
          .header-logo{height:40px!important;}
          .tab-label{display:inline!important;}
        }
        @media(max-width:767px){
          .header-logo{height:28px!important;}
          .tab-label{display:none!important;}
          .tab-bar button{padding:12px!important;}
        }
      `}</style>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header style={{ borderBottom:`1px solid ${C.brd}`, background:`${C.noturno}80`, backdropFilter:"blur(16px)", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1024, margin:"0 auto", padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:24 }}>
          <img src="/logo-light-horizontal.svg" alt="Talharia" className="header-logo" style={{ height:32 }} />
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:12, fontWeight:500, color:C.cinzaMed }}>Calculadora de Custos</div>
            <div style={{ fontSize:11, color:C.cinzaEsc, marginTop:2 }}>Impressão 3D · Goiânia-GO</div>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <div style={{ borderBottom:`1px solid ${C.brd}`, background:`linear-gradient(180deg, ${C.noturno}40 0%, transparent 100%)` }}>
        <div style={{ maxWidth:1024, margin:"0 auto", padding:"48px 24px 40px", textAlign:"center" }}>
          <Pill color={C.cobre}><Icon n="precision_manufacturing" s={11} c={C.cobre}/>Bambu Lab A1 Combo · PLA</Pill>
          <h1 style={{ fontSize:32, fontWeight:700, margin:"16px 0 8px", letterSpacing:"-0.02em", lineHeight:1.2 }}>
            Calculadora de Custos<br />
            <span style={{ color:C.cobre }}>Impressão 3D</span>
          </h1>
          <p style={{ fontSize:14, color:C.cinzaMed, margin:0 }}>
            Equatorial Goiás · R$0,78/kWh · Reajuste out/2025
          </p>
        </div>
      </div>

      {/* ── TABS ───────────────────────────────────────────── */}
      <div style={{ position:"sticky", top:65, zIndex:90, borderBottom:`1px solid ${C.brd}`, background:`${C.negro}E0`, backdropFilter:"blur(16px)" }}>
        <div style={{ maxWidth:1024, margin:"0 auto", padding:"0 24px" }}>
          <div className="tab-bar" style={{ display:"flex", gap:4 }}>
            {tabs.map(t => {
              const ac = t.id==="custo"?C.cobre : t.id==="revenda"?C.terra : C.cobre;
              return (
                <button key={t.id} onClick={()=>setAba(t.id)}
                  style={{ flex:1, maxWidth:200, padding:"14px 8px", border:"none", background:"transparent", color:aba===t.id?ac:C.cinzaMed, cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", borderBottom:aba===t.id?`2px solid ${ac}`:"2px solid transparent", display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all .2s" }}>
                  <Icon n={t.icon} s={16} c={aba===t.id?ac:C.cinzaMed} />
                  <span className="tab-label">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CONTEÚDO ───────────────────────────────────────── */}
      <main style={{ maxWidth:1024, margin:"0 auto", padding:"32px 24px 96px" }}>

        {/* ABA CUSTO */}
        {aba==="custo" && (
          <div className="main-grid" style={{ display:"grid", gridTemplateColumns:"1fr", gap:0 }}>
            {/* inputs col */}
            <div>
              {/* MODO IMPRESSÃO */}
              <Card title="Modo de Impressão" icon="print" accent={usaLeva?C.leva:C.cinzaMed}>
                <Toggle on={usaLeva} set={setUsaLeva} label="Impressão em leva — múltiplas peças juntas" color={C.leva} />
                {usaLeva ? (
                  <>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
                      {[
                        {l:"Peças na leva",val:pecasLeva,set:setPecasLeva,min:1,sub:"peças simultâneas"},
                        {l:"Tempo total",  val:horasLeva,set:setHorasLeva,min:0.25,step:0.25,sub:"horas totais"},
                      ].map(f=>(
                        <div key={f.l} style={{ background:`${C.leva}0C`, border:`1px solid ${C.leva}25`, borderRadius:12, padding:"16px", textAlign:"center" }}>
                          <div style={{ fontSize:12, color:C.cinzaMed, marginBottom:8 }}>{f.l}</div>
                          <input type="number" min={f.min||1} step={f.step||1} value={f.val}
                            onChange={e=>f.set(Math.max(f.min||0, parseFloat(e.target.value)||1))}
                            style={{ width:"100%", padding:"8px 4px", background:"transparent", border:`1px solid ${C.leva}35`, borderRadius:8, color:C.leva, fontFamily:"inherit", fontSize:28, fontWeight:700, textAlign:"center", outline:"none", WebkitAppearance:"none" }} />
                          <div style={{ fontSize:11, color:C.cinzaMed, marginTop:8 }}>{f.sub}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background:`${C.leva}08`, border:`1px solid ${C.leva}20`, borderRadius:12, padding:"16px" }}>
                      <div style={{ fontSize:11, fontWeight:700, color:C.leva, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Como os custos são divididos</div>
                      {[
                        {icon:"straighten",l:"Filamento",tipo:"individual",   desc:`cada peça usa ${N(gEf,1)}g`},
                        {icon:"bolt",      l:"Energia",  tipo:"compartilhado",desc:`${horasLeva}h ÷ ${pecasLeva} peças`},
                        {icon:"print",     l:"Depreciação",tipo:"compartilhado",desc:`${horasLeva}h ÷ ${pecasLeva} peças`},
                        {icon:"build",     l:"Consumíveis",tipo:"compartilhado",desc:"rateado por peça"},
                        {icon:"person",    l:"Mão de obra",tipo:"compartilhado",desc:`setup ÷ ${pecasLeva} peças`},
                      ].map(r=>(
                        <div key={r.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.leva}10` }}>
                          <span style={{ fontSize:13, color:C.cinzaMed, display:"flex", alignItems:"center", gap:8 }}><Icon n={r.icon} s={14} c={C.cinzaMed}/>{r.l}</span>
                          <div style={{ textAlign:"right" }}>
                            <Pill color={r.tipo==="individual"?C.cobre:C.leva}>{r.tipo}</Pill>
                            <div style={{ fontSize:11, color:C.cinzaMed, marginTop:4 }}>{r.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <Field label="Tempo de impressão" hint="peça única" value={horas} onChange={setHoras} unit="h" step={0.25} />
                    <InfoBox>Imprime várias peças juntas? Ative o Modo Leva para repartir os custos fixos corretamente.</InfoBox>
                  </>
                )}
              </Card>

              {/* FILAMENTO */}
              <Card title="Filamento PLA" icon="straighten" accent={C.cobre}>
                <Field label="Peso por peça" hint="gramas" value={gramas} onChange={setGramas} unit="g" step={0.5} />
                <Field label="Preço do filamento" value={precoKg} onChange={setPrecoKg} unit="R$/kg" step={5} />
                <Field label="Taxa de falha" hint="reimpressão" value={falha} onChange={setFalha} unit="%" step={1} />
                <InfoBox color={C.cobre}>
                  {usaLeva
                    ? `${pecasLeva}× × ${N(gEf,1)}g = ${N(gEf*pecasLeva,1)}g total · ${R$(cFil)} por peça`
                    : `Consumo real: ${N(gEf,1)}g · custo: ${R$(cFil)}`}
                </InfoBox>
              </Card>

              {/* ENERGIA */}
              <Card title="Energia Elétrica" icon={usaSolar?"wb_sunny":"bolt"} accent={usaSolar?C.solar:"#E8C060"}>
                {!usaLeva && <Field label="Tempo de impressão" value={horas} onChange={setHoras} unit="h" step={0.25} />}
                {usaLeva && (
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:`${C.leva}08`, borderRadius:8, padding:"10px 14px", marginBottom:16 }}>
                    <span style={{ fontSize:13, color:C.cinzaMed }}>Tempo da leva</span>
                    <span style={{ fontSize:15, fontWeight:700, color:C.leva }}>{horasLeva}h ÷ {pecasLeva} = {N(horasLeva/pecasLeva,2)}h/peça</span>
                  </div>
                )}
                <Field label="Consumo da impressora" hint="A1 Combo ≈ 350W" value={watts} onChange={setWatts} unit="W" step={10} />
                <div style={{ margin:"16px 0", paddingTop:16, borderTop:`1px solid ${C.brd}` }}>
                  <Toggle on={usaSolar} set={setUsaSolar} label="Tenho energia solar" color={C.solar} />
                </div>
                {!usaSolar ? (
                  <>
                    <Field label="Tarifa Equatorial Goiás" hint="com ICMS" value={kwhRede} onChange={setKwhRede} unit="R$/kWh" step={0.01} />
                    <InfoBox color="#E8C060">Bandeira verde. Em bandeira vermelha P2, acrescente ~R$0,09/kWh.</InfoBox>
                  </>
                ) : (
                  <>
                    <div style={{ background:`${C.solar}14`, border:`1px solid ${C.solar}30`, borderRadius:12, padding:"16px 20px", marginBottom:16 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:C.solar, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}><Icon n="wb_sunny" s={14} c={C.solar}/>Modo Solar Ativo</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                          <div style={{ fontSize:28, fontWeight:700 }}>{N(kwhEf,3)}<span style={{ fontSize:13, color:C.cinzaMed, fontWeight:400 }}>R$/kWh</span></div>
                          <div style={{ fontSize:12, color:C.cinzaMed }}>tarifa efetiva</div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:18, fontWeight:700, color:C.solar }}>−{R$(econSol)}</div>
                          <div style={{ fontSize:11, color:C.cinzaMed }}>economia por peça</div>
                        </div>
                      </div>
                    </div>
                    <Field label="Custo kWh solar" value={kwhSolar} onChange={setKwhSolar} unit="R$/kWh" step={0.01} color={C.solar} />
                    <Field label="% gerado pelo solar" value={percSolar} onChange={setPercSolar} unit="%" step={5} color={C.solar} />
                    <Field label="Tarifa rede (backup)" value={kwhRede} onChange={setKwhRede} unit="R$/kWh" step={0.01} />
                  </>
                )}
              </Card>

              {/* DEPRECIAÇÃO */}
              <Card title="Depreciação da Impressora" icon="print" accent={C.leva}>
                <Field label="Valor da impressora" value={precoImp} onChange={setPrecoImp} unit="R$" step={100} />
                <Field label="Vida útil estimada" hint="horas" value={vidaUtil} onChange={setVidaUtil} unit="h" step={100} />
              </Card>

              {/* CONSUMÍVEIS */}
              <Card title="Consumíveis" icon="build" accent={C.terra}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div>
                    <Field label="Preço do bico" value={precoBico} onChange={setPrecoBico} unit="R$" step={1} />
                    <Field label="Vida útil bico" hint="horas" value={vidaBico} onChange={setVidaBico} unit="h" step={25} />
                  </div>
                  <div>
                    <Field label="Preço da placa" value={precoPlaca} onChange={setPrecoPlaca} unit="R$" step={5} />
                    <Field label="Vida útil placa" hint="impressões" value={vidaPlaca} onChange={setVidaPlaca} unit="×" step={10} />
                  </div>
                </div>
              </Card>

              {/* EMBALAGEM */}
              <Card title="Embalagem" icon="inventory_2" accent={C.emb}>
                <Toggle on={usaEmb} set={setUsaEmb} label="Incluir embalagem no custo" color={C.emb} />
                {usaEmb && (
                  <>
                    <Field label="Custo da embalagem" value={precoEmb} onChange={setPrecoEmb} unit="R$/un" step={0.5} color={C.emb} />
                    <Field label="Frete da embalagem" hint="rateio/un" value={freteEmb} onChange={setFreteEmb} unit="R$/un" step={0.5} />
                  </>
                )}
              </Card>

              {/* MÃO DE OBRA */}
              <Card title="Mão de Obra" icon="person" accent={C.mo}>
                <Toggle on={usaMO} set={setUsaMO} label="Incluir mão de obra (tempo ativo real)" color={C.mo} />
                {usaMO && (
                  <>
                    <Field label="Valor/hora do seu trabalho" value={valorHora} onChange={setValorHora} unit="R$/h" step={5} color={C.mo} />
                    <div style={{ background:`${C.mo}08`, border:`1px solid ${C.mo}18`, borderRadius:12, padding:"16px", marginBottom:16 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:C.mo, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>Etapas de trabalho ativo</div>
                      {[
                        {l:"Preparo do arquivo", hint:"fatiamento, suportes",    icon:"computer",   v:minPrep, set:setMinPrep},
                        {l:"Início da impressão",hint:"ligar, carregar, 1ª camada",icon:"play_arrow",v:minIni, set:setMinIni},
                        {l:"Monitoramento",      hint:"checada durante impressão", icon:"visibility", v:minMon, set:setMinMon},
                        {l:"Pós-impressão",      hint:"retirar, suportes, QA",    icon:"content_cut",v:minPos, set:setMinPos},
                      ].map(e=>(
                        <div key={e.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                          <div>
                            <div style={{ fontSize:14, color:C.cinzaClr, display:"flex", alignItems:"center", gap:8 }}><Icon n={e.icon} s={14} c={C.mo}/>{e.l}</div>
                            <div style={{ fontSize:12, color:C.cinzaMed, paddingLeft:22 }}>{e.hint}</div>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <input type="number" min={0} step={1} value={e.v}
                              onChange={ev=>e.set(parseFloat(ev.target.value)||0)}
                              style={{ width:64, padding:"8px", background:"rgba(242,234,216,0.04)", border:`1px solid ${C.brd}`, borderRadius:8, color:C.mo, fontFamily:"inherit", fontWeight:700, fontSize:14, textAlign:"right", outline:"none", WebkitAppearance:"none" }} />
                            <span style={{ fontSize:12, color:C.cinzaMed, width:24 }}>min</span>
                          </div>
                        </div>
                      ))}
                      <div style={{ borderTop:`1px solid ${C.mo}18`, paddingTop:12, display:"flex", justifyContent:"space-between" }}>
                        <span style={{ fontSize:13, color:C.mo, fontWeight:600 }}>Total ativo</span>
                        <span style={{ fontSize:14, fontWeight:700, color:C.mo }}>{minAt} min · {R$(cMO)}</span>
                      </div>
                    </div>
                    <InfoBox color={C.mo}>A máquina trabalha sozinha durante a impressão. Só cobre o tempo em que você está ativamente envolvido.</InfoBox>
                  </>
                )}
              </Card>

              {/* MARGEM */}
              <Card title="Margem de Lucro" icon="trending_up" accent={C.cobre}>
                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <input type="range" min={0} max={200} step={5} value={margem}
                    onChange={e=>setMargem(parseInt(e.target.value))}
                    style={{ flex:1, accentColor:C.cobre, height:4 }} />
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <input type="number" min={0} step={5} value={margem}
                      onChange={e=>setMargem(parseFloat(e.target.value)||0)}
                      style={{ width:80, padding:"8px 12px", background:`${C.cobre}12`, border:`1px solid ${C.cobre}40`, borderRadius:8, color:C.cobre, fontFamily:"inherit", fontSize:20, fontWeight:700, textAlign:"right", outline:"none", WebkitAppearance:"none" }} />
                    <span style={{ fontSize:14, color:C.cinzaMed }}>%</span>
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:12, padding:"8px 0", borderTop:`1px solid ${C.brd}` }}>
                  <span style={{ fontSize:13, color:C.cinzaMed }}>Lucro por peça</span>
                  <span style={{ fontSize:15, fontWeight:700, color:C.cobre }}>{R$(total*margem/100)}</span>
                </div>
              </Card>
            </div>

            {/* resultado col */}
            <div className="sticky-col">
              <PainelResultado
                total={total} totalSemSolar={totSemSol} precoVenda={precoVenda}
                margem={margem} bars={barsResult} usaSolar={usaSolar}
                economiaSolar={econSol} usaLeva={usaLeva} pecasLeva={pecasLeva}
                horasLeva={horasLeva}
                onRevenda={()=>setAba("revenda")} onCustom={()=>setAba("custom")}
              />
            </div>
          </div>
        )}

        {/* ABA REVENDA */}
        {aba==="revenda" && (
          <AbaRevenda total={total} precoVenda={precoVenda} margem={margem} custoSetup={custoSetup} />
        )}

        {/* ABA PERSONALIZADO */}
        {aba==="custom" && (
          <AbaPersonalizado custoBase={total} margemBase={margem} />
        )}
      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer style={{ borderTop:`1px solid ${C.brd}`, padding:"24px", textAlign:"center" }}>
        <img src="/logo-light-horizontal.svg" alt="Talharia" style={{ height:24, marginBottom:8, opacity:0.5 }} />
        <div style={{ fontSize:12, color:C.cinzaEsc }}>Arte sacra impressa em 3D · Goiânia, GO</div>
      </footer>
    </div>
  );
}
