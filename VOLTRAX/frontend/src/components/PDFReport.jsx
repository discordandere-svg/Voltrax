import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

function fmt(n, d = 0) {
  if (n === undefined || n === null || isNaN(n)) return '—'
  const fixed = Number(n).toFixed(d)
  const [int, dec] = fixed.split('.')
  const intFmt = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return d > 0 ? `${intFmt},${dec}` : intFmt
}

const EUR   = '\u20AC'
const DASH  = '\u2013'
const TIMES = '\u00D7'
const MIN   = '\u2212'
const DOT   = '\u00B7'

const G       = '#22a55d'
const DARK    = '#0D2B1A'
const G_LIGHT = '#EAF9F1'
const G_BDR   = '#BBF7D0'
const TEXT    = '#1A2330'
const MID     = '#5A6478'
const LIGHT   = '#9CA3AF'
const XLGHT   = '#CBD5E1'
const BDR     = '#E5E7EB'
const BDR2    = '#F1F5F9'
const WHITE   = '#FFFFFF'
const RED     = '#DC2626'
const AMBER   = '#D97706'

// A4 = 595 pt wide. Margins 40pt each side → content = 515 pt.
// Each situGrid column in a 4-col row: (515 − 3×8) / 4 = 122.75 → use 122
const COL4 = 122

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: WHITE, color: TEXT },

  accentBar: { height: 4, backgroundColor: G },

  // ── Header ──────────────────────────────────────────────────────────────
  hdr: {
    backgroundColor: DARK, paddingHorizontal: 40, paddingVertical: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  hdrLogo:   { fontSize: 22, fontFamily: 'Helvetica-Bold', color: WHITE, letterSpacing: 0.5 },
  hdrAccent: { color: G },
  hdrSub:    { fontSize: 7.5, color: 'rgba(255,255,255,0.32)', marginTop: 5 },
  hdrRight:  { alignItems: 'flex-end' },
  hdrLabel:  { fontSize: 6.5, color: 'rgba(255,255,255,0.36)', letterSpacing: 1.8, marginBottom: 6 },
  hdrDate:   { fontSize: 11, fontFamily: 'Helvetica-Bold', color: WHITE },

  // ── Hero ─────────────────────────────────────────────────────────────────
  hero:        { backgroundColor: DARK, paddingHorizontal: 40, paddingTop: 8, paddingBottom: 28 },
  heroDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 20 },
  heroEye:     { fontSize: 7, color: 'rgba(255,255,255,0.32)', letterSpacing: 2.2, marginBottom: 8 },
  heroAmt:     { fontSize: 42, fontFamily: 'Helvetica-Bold', color: WHITE, letterSpacing: -1.5, lineHeight: 1, marginBottom: 5 },
  heroSub:     { fontSize: 8.5, color: 'rgba(255,255,255,0.26)', marginBottom: 4 },
  heroBadge:   {
    alignSelf: 'flex-start', marginBottom: 18,
    backgroundColor: 'rgba(34,165,93,0.18)',
    borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10,
    borderWidth: 1, borderColor: 'rgba(34,165,93,0.35)',
  },
  heroBadgeTxt: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: G, letterSpacing: 0.6 },
  heroBoxRow:   { flexDirection: 'row', gap: 8 },
  heroBox:      { flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 9, paddingVertical: 13, paddingHorizontal: 12 },
  heroBoxLbl:   { fontSize: 6.5, color: 'rgba(255,255,255,0.30)', marginBottom: 5 },
  heroBoxVal:   { fontSize: 13, fontFamily: 'Helvetica-Bold', color: WHITE },

  // ── Body ─────────────────────────────────────────────────────────────────
  body: { paddingHorizontal: 40, paddingTop: 22, paddingBottom: 54 },

  eye: { fontSize: 6.5, fontFamily: 'Helvetica-Bold', color: XLGHT, letterSpacing: 2.2, marginBottom: 10 },

  // ── Situation grid — explicit 4-col rows ──────────────────────────────────
  situRow:  { flexDirection: 'row', gap: 8, marginBottom: 8 },
  situItem: {
    width: COL4, backgroundColor: '#F8FAFC',
    borderRadius: 8, padding: 11,
    borderWidth: 1, borderColor: BDR,
  },
  situLbl:  { fontSize: 6.5, color: LIGHT, marginBottom: 4 },
  situVal:  { fontSize: 13, fontFamily: 'Helvetica-Bold', color: TEXT, marginBottom: 2 },
  situUnit: { fontSize: 7, color: MID },

  // ── Two-column row ────────────────────────────────────────────────────────
  twoCol: { flexDirection: 'row', gap: 12 },

  // ── Cards ─────────────────────────────────────────────────────────────────
  card: {
    flex: 1, borderRadius: 11,
    borderWidth: 1, borderColor: BDR,
    padding: 16,
  },
  cardGreen: {
    flex: 1, borderRadius: 11,
    borderWidth: 1, borderColor: G_BDR,
    backgroundColor: G_LIGHT, padding: 16,
  },
  cardEye:       { fontSize: 6.5, fontFamily: 'Helvetica-Bold', color: LIGHT, letterSpacing: 1.3, marginBottom: 4 },
  cardEyeGreen:  { fontSize: 6.5, fontFamily: 'Helvetica-Bold', color: G,     letterSpacing: 1.3, marginBottom: 4 },
  cardTitle:     { fontSize: 11.5, fontFamily: 'Helvetica-Bold', color: TEXT, marginBottom: 13 },
  cardTitleDark: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', color: DARK, marginBottom: 13 },

  // ── Data rows ─────────────────────────────────────────────────────────────
  dr: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: BDR2,
  },
  drG: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#D1FAE5',
  },
  drLeft:  { flex: 1, paddingRight: 8 },
  drLbl:   { fontSize: 8.5, color: MID },
  drSub:   { fontSize: 6.5, color: LIGHT, marginTop: 2 },
  drVal:   { fontSize: 9, fontFamily: 'Helvetica-Bold', color: TEXT },
  drValG:  { fontSize: 9, fontFamily: 'Helvetica-Bold', color: G },
  drValR:  { fontSize: 9, fontFamily: 'Helvetica-Bold', color: RED },

  // ── Financial table (page 2) ──────────────────────────────────────────────
  tr: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: BDR2,
  },
  trLeft:  { flex: 1, paddingRight: 12 },
  trLbl:   { fontSize: 9.5, color: MID },
  trLblB:  { fontSize: 10, fontFamily: 'Helvetica-Bold', color: TEXT },
  trSub:   { fontSize: 7, color: LIGHT, marginTop: 2 },
  trVal:   { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: TEXT,  textAlign: 'right' },
  trValG:  { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: G,    textAlign: 'right' },
  trValR:  { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: RED,  textAlign: 'right' },

  // ── Total row ─────────────────────────────────────────────────────────────
  totRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 13, paddingBottom: 7,
    borderTopWidth: 2, borderTopColor: G, marginTop: 3,
  },
  totLbl: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: DARK },
  totSub: { fontSize: 7.5, color: LIGHT, marginTop: 4 },
  totVal: { fontSize: 17, fontFamily: 'Helvetica-Bold', color: G },

  // ── ROI boxes ─────────────────────────────────────────────────────────────
  roiRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  roiBox: { flex: 1, backgroundColor: G_LIGHT, borderRadius: 9, paddingVertical: 11, paddingHorizontal: 12 },
  roiLbl: { fontSize: 7, color: G, marginBottom: 4 },
  roiVal: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: DARK },

  // ── Bullet list ───────────────────────────────────────────────────────────
  bRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 7 },
  bDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: G, marginTop: 3.5 },
  bTxt: { fontSize: 8.5, color: MID, flex: 1, lineHeight: 1.5 },

  // ── Contact bar ───────────────────────────────────────────────────────────
  cBar: {
    backgroundColor: DARK, borderRadius: 11,
    paddingVertical: 16, paddingHorizontal: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 16,
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    borderTopWidth: 1, borderTopColor: BDR,
    paddingHorizontal: 40, paddingVertical: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: WHITE,
  },
  fTxt:   { fontSize: 7, color: LIGHT },
  fBrand: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: MID },
})

function DR({ lbl, sub, val, g, r, style }) {
  return (
    <View style={style || s.dr}>
      <View style={s.drLeft}>
        <Text style={s.drLbl}>{lbl}</Text>
        {sub ? <Text style={s.drSub}>{sub}</Text> : null}
      </View>
      <Text style={g ? s.drValG : r ? s.drValR : s.drVal}>{val}</Text>
    </View>
  )
}

// Chunk an array into rows of n for explicit grid rendering
function chunkArray(arr, n) {
  const rows = []
  for (let i = 0; i < arr.length; i += n) rows.push(arr.slice(i, i + n))
  return rows
}

export function PDFReport({ results: rv, input }) {
  const price   = input?.battery_price || 9000
  const kWh     = input?.battery_kWh   || 18.6
  const kWhLbl  = `${String(kWh).replace('.', ',')} kWh`
  const mndLow  = Math.round(rv.total_annual_low  / 12)
  const mndHigh = Math.round(rv.total_annual_high / 12)
  const winst10_low  = Math.max(0, Math.round(rv.total_annual_low  * 10 * 0.86 - price))
  const winst10_high = Math.max(0, Math.round(rv.total_annual_high * 10 * 0.92 - price))
  const tk      = input?.terugleverkosten_value || 0
  const tkUnit  = input?.terugleverkosten_unit  || 'jaar'
  const tkJaar  = tkUnit === 'kWh' ? Math.round(tk * (rv.export_kwh_zonder || 0)) : Math.round(tk)
  const today   = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
  const isDynamic = rv.dynamic_contract === true

  // Situation tiles
  const situTiles = [
    { lbl: 'Zonne-opwek',            val: fmt(rv.pv_input),                unit: 'kWh/jaar' },
    { lbl: 'Jaarverbruik',           val: fmt(rv.v_input),                 unit: 'kWh/jaar' },
    { lbl: 'Teruglevering',          val: fmt(rv.t_input),                 unit: 'kWh/jaar' },
    { lbl: 'Inkoopprijs',            val: `${EUR} ${fmt(rv.pE_used, 2)}`,  unit: 'per kWh' },
    { lbl: 'Teruglevertarief',       val: `${EUR} ${fmt(rv.pT_used, 2)}`,  unit: 'per kWh' },
    { lbl: 'Gekozen capaciteit',     val: kWhLbl,                          unit: 'AlphaESS SMILE G3' },
    { lbl: 'Investering incl. inst.', val: `${EUR} ${fmt(price)}`,         unit: 'totaal' },
    ...(tkJaar > 0 ? [{ lbl: 'Terugleverkosten', val: `${EUR} ${fmt(tkJaar)}`, unit: 'per jaar' }] : []),
  ]
  const situRows = chunkArray(situTiles, 4)

  return (
    <Document
      title="VOLTRAX Persoonlijk Energierapport"
      author="VOLTRAX"
      subject="AlphaESS thuisbatterij berekening"
    >

      {/* ═══════════════════════════════════════════════════
          PAGINA 1 — Situatie & energieanalyse
      ═══════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <View style={s.accentBar} />

        {/* Header */}
        <View style={s.hdr}>
          <View>
            <Text style={s.hdrLogo}>VOLT<Text style={s.hdrAccent}>RAX</Text></Text>
            <Text style={s.hdrSub}>AlphaESS {DOT} Officieel partner Nederland</Text>
          </View>
          <View style={s.hdrRight}>
            <Text style={s.hdrLabel}>PERSOONLIJK ENERGIERAPPORT</Text>
            <Text style={s.hdrDate}>{today}</Text>
          </View>
        </View>

        {/* Hero */}
        <View style={s.hero}>
          <View style={s.heroDivider} />
          <Text style={s.heroEye}>GESCHAT JAARLIJKS VOORDEEL</Text>
          <Text style={s.heroAmt}>
            {EUR} {fmt(rv.total_annual_low)} {DASH} {EUR} {fmt(rv.total_annual_high)}
          </Text>
          <Text style={s.heroSub}>
            energiebesparing + slimme marktoptimalisatie via EPEX SPOT
          </Text>
          <View style={s.heroBadge}>
            <Text style={s.heroBadgeTxt}>
              {isDynamic ? 'Dynamisch contract (EPEX)' : 'Vast tarief contract'}
            </Text>
          </View>
          <View style={s.heroBoxRow}>
            {[
              { lbl: 'Per maand',        val: `${EUR} ${mndLow} ${DASH} ${mndHigh}` },
              { lbl: 'Terugverdientijd', val: `${fmt(rv.payback_low, 1)} ${DASH} ${fmt(rv.payback_high, 1)} jaar` },
              { lbl: 'Netto na 10 jaar', val: `+${EUR} ${fmt(winst10_low)} ${DASH} ${fmt(winst10_high)}` },
              { lbl: 'Per dag',          val: `${EUR} ${fmt(rv.total_daily_low, 2)} ${DASH} ${fmt(rv.total_daily_high, 2)}` },
            ].map((b, i) => (
              <View key={i} style={s.heroBox}>
                <Text style={s.heroBoxLbl}>{b.lbl}</Text>
                <Text style={s.heroBoxVal}>{b.val}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Body */}
        <View style={s.body}>

          {/* Uw situatie — explicit 4-col rows */}
          <Text style={s.eye}>UW SITUATIE</Text>
          {situRows.map((row, ri) => (
            <View key={ri} style={[s.situRow, ri === situRows.length - 1 ? { marginBottom: 22 } : {}]}>
              {row.map((item, ci) => (
                <View key={ci} style={s.situItem}>
                  <Text style={s.situLbl}>{item.lbl}</Text>
                  <Text style={s.situVal}>{item.val}</Text>
                  <Text style={s.situUnit}>{item.unit}</Text>
                </View>
              ))}
              {/* Fill empty cells in last row */}
              {row.length < 4 && Array.from({ length: 4 - row.length }).map((_, i) => (
                <View key={`empty-${i}`} style={{ width: COL4 }} />
              ))}
            </View>
          ))}

          {/* Energieanalyse */}
          <Text style={s.eye}>ENERGIEANALYSE: VOOR EN NA DE BATTERIJ</Text>
          <View style={s.twoCol}>

            {/* Zonder batterij */}
            <View style={s.card}>
              <Text style={s.cardEye}>HUIDIGE SITUATIE</Text>
              <Text style={s.cardTitle}>Zonder batterij</Text>
              <DR lbl="Zonne-opwek"           val={`${fmt(rv.pv_input)} kWh`}            sub="totale jaarlijkse opwek" />
              <DR lbl="Direct zelfverbruik"   val={`${fmt(rv.sc_direct_kwh)} kWh`}        sub={`${fmt(rv.sc_pct_zonder, 0)}% van uw verbruik`} />
              <DR lbl="Teruggeleverd aan net" val={`${fmt(rv.export_kwh_zonder)} kWh`}    sub="onbenut overschot" r />
              <DR lbl="Inkoop van net"        val={`${fmt(rv.grid_import_without)} kWh`}  sub="betaalt u vol tarief" r />
              {tkJaar > 0 && <DR lbl="Terugleverkosten" val={`${MIN}${EUR} ${fmt(tkJaar)}/jr`} sub="aan uw leverancier" r />}
            </View>

            {/* Met batterij */}
            <View style={s.cardGreen}>
              <Text style={s.cardEyeGreen}>MET ALPHAESS SMILE G3</Text>
              <Text style={s.cardTitleDark}>Met batterij</Text>
              <DR style={s.drG} lbl="Zonne-opwek"           val={`${fmt(rv.pv_input)} kWh`}                 sub="gelijk aan huidige situatie" />
              <DR style={s.drG} lbl="Totaal zelfverbruik"   val={`${fmt(rv.totalSelfConsumption)} kWh`}     sub={`${fmt(rv.sc_direct_kwh)} direct + ${fmt(rv.batterySelfConsumption)} batterij`} g />
              <DR style={s.drG} lbl="Nog teruggeleverd"     val={`${fmt(rv.export_kwh_with)} kWh`}          sub={`${fmt(rv.export_kwh_zonder - rv.export_kwh_with)} kWh zelf gebruikt i.p.v. teruggeleverd`} />
              <DR style={s.drG} lbl="Inkoop van net"        val={`${fmt(rv.grid_import_with)} kWh`}         sub={`${fmt(rv.grid_import_besparing_kwh)} kWh minder ingekocht door verbruik uit batterij`} g />
              <DR style={s.drG} lbl="Energiebesparing"      val={`+${EUR} ${fmt(rv.net_energy_saving_eur)}/jr`} sub="netto zelfverbruik, excl. EPEX" g />
              <DR style={s.drG} lbl="EMS marktoptimalisatie" val={`+${EUR} ${fmt(rv.smart_annual_low)}${DASH}${EUR}${fmt(rv.smart_annual_high)}/jr`} sub="EPEX SPOT dag-piek arbitrage" g />
            </View>
          </View>
        </View>

        {/* Footer P1 */}
        <View style={s.footer}>
          <Text style={s.fTxt}>www.voltrax.nl {DOT} info@voltrax.nl {DOT} Officieel AlphaESS partner</Text>
          <Text style={s.fBrand}>VOLT<Text style={s.hdrAccent}>RAX</Text>  {DOT}  Pagina 1 van 2</Text>
          <Text style={s.fTxt}>Indicatieve berekening {DASH} vrijblijvend</Text>
        </View>
      </Page>

      {/* ═══════════════════════════════════════════════════
          PAGINA 2 — Financieel overzicht
      ═══════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <View style={s.accentBar} />

        {/* Header */}
        <View style={[s.hdr, { paddingVertical: 16 }]}>
          <Text style={[s.hdrLogo, { fontSize: 18 }]}>VOLT<Text style={s.hdrAccent}>RAX</Text></Text>
          <View style={{ flexDirection: 'row', gap: 22, alignItems: 'center' }}>
            <Text style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.35)' }}>Financieel overzicht</Text>
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: 'rgba(255,255,255,0.65)' }}>{today}</Text>
          </View>
        </View>

        <View style={[s.body, { paddingTop: 22 }]}>
          <View style={[s.twoCol, { alignItems: 'flex-start' }]}>

            {/* LEFT — financial table */}
            <View style={[s.card, { flex: 58 }]}>
              <Text style={s.cardEye}>FINANCIEEL OVERZICHT</Text>
              <Text style={[s.cardTitle, { marginBottom: 10 }]}>Volledige berekening</Text>

              {[
                {
                  lbl: 'Stap 1 — Basis energiebesparing',
                  sub: `${fmt(rv.grid_import_besparing_kwh)} kWh vermeden inkoop ${MIN} gemiste exportopbrengst${rv.saved_terugleverkosten > 0 ? ` + ${EUR}${fmt(rv.saved_terugleverkosten)} TK` : ''}`,
                  val: `+${EUR} ${fmt(rv.net_energy_saving_eur)}`, col: 'g',
                },
                {
                  lbl: 'Stap 2 — EPEX marktarbitrage',
                  sub: rv.ems_cycli
                    ? `${fmt(rv.ems_cycli)} EPEX-cycli ${TIMES} ${kWhLbl} ${TIMES} ${EUR}${fmt(rv.spread_low, 2)}${DASH}${EUR}${fmt(rv.spread_high, 2)}/kWh`
                    : 'via EPEX SPOT optimalisatie',
                  val: `+${EUR} ${fmt(rv.ems_physics_low)} ${DASH} ${EUR} ${fmt(rv.ems_physics_high)}`, col: 'g',
                },
                {
                  lbl: 'Stap 3 — Energieprijsstijging',
                  sub: 'Informatieve prognose — niet in basislijn · CBS +5%/jr',
                  val: `${EUR} ${fmt(rv.escalation_eur_low)} ${DASH} ${EUR} ${fmt(rv.escalation_eur_high)}`,
                },
                {
                  lbl: 'Stap 4 — Salderingsbescherming',
                  sub: 'Informatieve prognose — niet in basislijn · afbouw 2027–2031',
                  val: `${EUR} ${fmt(rv.sald_protection_eur)}`,
                },
                ...((rv.garantie_bonus || 0) > 0 ? [{
                  lbl: 'Stap 5 — VOLTRAX Prestatiegarantie',
                  sub: 'Op basis van capaciteit en historisch AlphaESS systeemrendement',
                  val: `+${EUR} ${fmt(rv.garantie_bonus)}`, col: 'g',
                }] : []),
              ].map((row, i) => (
                <View key={i} style={s.tr}>
                  <View style={s.trLeft}>
                    <Text style={row.bold ? s.trLblB : s.trLbl}>{row.lbl}</Text>
                    {row.sub ? <Text style={s.trSub}>{row.sub}</Text> : null}
                  </View>
                  <Text style={
                    row.col === 'g' ? s.trValG :
                    row.col === 'r' ? s.trValR :
                    row.bold        ? { fontSize: 10, fontFamily: 'Helvetica-Bold', color: TEXT, textAlign: 'right' } :
                    s.trVal
                  }>{row.val}</Text>
                </View>
              ))}

              {/* Total */}
              <View style={s.totRow}>
                <View>
                  <Text style={s.totLbl}>Totaal jaarlijks voordeel</Text>
                  <Text style={s.totSub}>
                    AlphaESS {kWhLbl} {DASH} investering {EUR} {fmt(price)}
                  </Text>
                </View>
                <Text style={s.totVal}>
                  {EUR} {fmt(rv.total_annual_low)} {DASH} {fmt(rv.total_annual_high)}/jr
                </Text>
              </View>

              {/* ROI boxes */}
              <View style={s.roiRow}>
                {[
                  { lbl: 'Terugverdientijd',   val: `${fmt(rv.payback_low, 1)}${DASH}${fmt(rv.payback_high, 1)} jaar` },
                  { lbl: 'Netto na 10 jaar',   val: `+${EUR} ${fmt(winst10_low)} ${DASH} ${fmt(winst10_high)}` },
                  { lbl: 'Per maand voordeel', val: `${EUR} ${mndLow}${DASH}${mndHigh}` },
                ].map((b, i) => (
                  <View key={i} style={s.roiBox}>
                    <Text style={s.roiLbl}>{b.lbl}</Text>
                    <Text style={s.roiVal}>{b.val}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* RIGHT */}
            <View style={{ flex: 36, gap: 12 }}>

              {/* Key stats recap */}
              <View style={[s.card, { backgroundColor: DARK, borderColor: DARK }]}>
                <Text style={[s.cardEye, { color: 'rgba(255,255,255,0.35)' }]}>SAMENVATTING</Text>
                <Text style={[s.cardTitle, { color: WHITE, marginBottom: 14, fontSize: 10.5 }]}>
                  AlphaESS {kWhLbl}
                </Text>
                {[
                  { lbl: 'Contract', val: isDynamic ? 'Dynamisch (EPEX)' : 'Vast tarief' },
                  { lbl: 'Zelfverbruik nu', val: `${fmt(rv.sc_pct_zonder, 0)}%` },
                  { lbl: 'Zelfverbruik met batterij', val: `${fmt(rv.sc_pct_met, 0)}%` },
                  { lbl: 'Inkoop bespaard', val: `${fmt(rv.grid_import_besparing_kwh)} kWh/jr` },
                ].map((row, i) => (
                  <View key={i} style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    paddingVertical: 6,
                    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.07)',
                  }}>
                    <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.40)' }}>{row.lbl}</Text>
                    <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: WHITE }}>{row.val}</Text>
                  </View>
                ))}
              </View>

              {/* Warmtefonds */}
              <View style={[s.card, { backgroundColor: G_LIGHT, borderColor: G_BDR }]}>
                <Text style={s.cardEyeGreen}>NATIONAAL WARMTEFONDS</Text>
                <Text style={[s.cardTitle, { color: DARK, marginBottom: 12, fontSize: 10.5 }]}>0% rente mogelijk</Text>
                {[
                  `Lening tot ${EUR} 8.500 beschikbaar`,
                  `0% rente bij inkomen < ${EUR} 60.000`,
                  'Looptijd tot 120 maanden',
                  'VOLTRAX regelt de aanvraag',
                ].map((txt, i) => (
                  <View key={i} style={s.bRow}>
                    <View style={s.bDot} />
                    <Text style={s.bTxt}>{txt}</Text>
                  </View>
                ))}
              </View>

            </View>
          </View>

          {/* Contact bar */}
          <View style={s.cBar}>
            <View>
              <Text style={{ fontSize: 15, fontFamily: 'Helvetica-Bold', color: WHITE, marginBottom: 4 }}>
                VOLT<Text style={s.hdrAccent}>RAX</Text>
              </Text>
              <Text style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.35)' }}>
                Officieel AlphaESS partner Nederland
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: WHITE }}>info@voltrax.nl</Text>
              <Text style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>www.voltrax.nl</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: 'rgba(255,255,255,0.75)' }}>
                Offerte apart bijgevoegd
              </Text>
              <Text style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.30)', marginTop: 3 }}>
                AlphaESS boekje meegegeven {DOT} Vrijblijvend
              </Text>
            </View>
          </View>
        </View>

        {/* Footer P2 */}
        <View style={s.footer}>
          <Text style={s.fTxt}>
            Indicatieve berekening {DASH} EPEX SPOT 2023{DASH}2026 {DASH} LFP batterijmodel (95% eff.)
          </Text>
          <Text style={s.fBrand}>VOLT<Text style={s.hdrAccent}>RAX</Text>  {DOT}  Pagina 2 van 2</Text>
          <Text style={s.fTxt}>Werkelijke resultaten kunnen afwijken</Text>
        </View>
      </Page>

    </Document>
  )
}
