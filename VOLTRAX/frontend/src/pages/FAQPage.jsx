import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronDown, Battery, Cpu, Euro, Wrench, Car, Shield } from 'lucide-react'
import Nav from '../components/Nav.jsx'
import { useLanguage } from '../context/LanguageContext'

const ease = [0.22, 1, 0.36, 1]

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay, duration: 0.55, ease }}
      className={className}>
      {children}
    </motion.div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="font-semibold text-[#131A20] text-sm group-hover:text-[#22a55d] transition-colors leading-snug">
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-[#131A20]/35" />
        </motion.div>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="pb-5"
        >
          <p className="text-sm text-[#131A20]/60 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const { lang } = useLanguage()
  const nl = lang === 'nl'
  const [active, setActive] = useState(0)

  const tabs = nl ? [
    { label: 'Thuisbatterij', icon: <Battery className="w-4 h-4" /> },
    { label: 'HYXiPower & app', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Warmtefonds', icon: <Euro className="w-4 h-4" /> },
    { label: 'Kosten & terugverdienen', icon: <Shield className="w-4 h-4" /> },
    { label: 'Installatie & service', icon: <Wrench className="w-4 h-4" /> },
    { label: 'Laadpaal & integraties', icon: <Car className="w-4 h-4" /> },
  ] : [
    { label: 'Home battery', icon: <Battery className="w-4 h-4" /> },
    { label: 'HYXiPower & app', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Heat Fund', icon: <Euro className="w-4 h-4" /> },
    { label: 'Costs & payback', icon: <Shield className="w-4 h-4" /> },
    { label: 'Installation & service', icon: <Wrench className="w-4 h-4" /> },
    { label: 'EV charger & integrations', icon: <Car className="w-4 h-4" /> },
  ]

  const sections = nl ? [
    [
      { q: 'Wat doet een thuisbatterij precies?', a: 'Een thuisbatterij slaat de stroom op die uw zonnepanelen overdag opwekken. Die stroom gebruikt u in de avond of nacht, in plaats van dure stroom van het net te kopen.' },
      { q: 'Heb ik zonnepanelen nodig om een batterij te nemen?', a: 'Nee, dat is niet verplicht. Zonder zonnepanelen laadt de batterij op bij lage nachttarieven en levert u die stroom in de avond terug, zodat u minder voor stroom betaalt.' },
      { q: 'Hoeveel kWh heb ik nodig?', a: 'Dat hangt af van uw dagelijks verbruik en het aantal zonnepanelen. Voor een gemiddeld gezin is een systeem van 9,3 of 18,6 kWh al een grote stap. Onze calculator geeft u een persoonlijk advies.' },
      { q: 'Hoe lang gaat een thuisbatterij mee?', a: 'De HYXiPower-batterij gebruikt LFP-celtechnologie, die bekend staat om een lange levensduur en veel laadcycli in vergelijking met oudere batterijchemieën. Vraag ons naar de actuele garantievoorwaarden.' },
      { q: 'Is een thuisbatterij veilig in huis?', a: 'Ja. HYXiPower gebruikt LFP-technologie (lithium-ijzerfosfaat), een batterijchemie die bekendstaat om zijn thermische stabiliteit. Vraag ons naar de specifieke veiligheidsdocumentatie van uw systeem.' },
      { q: 'Kan de batterij als noodstroom dienen bij een stroomstoring?', a: 'De HYXiPower All-in-One ESS kan met de juiste configuratie noodstroom leveren bij een stroomstoring. Onze installateur bespreekt de mogelijkheden voor uw situatie.' },
      { q: 'Maakt de batterij veel geluid?', a: 'De HYXiPower is ontworpen voor gebruik binnenshuis en werkt geruisarm. Vraag ons naar de exacte geluidsspecificaties voor uw configuratie.' },
      { q: 'Kan ik de batterij ook buiten installeren?', a: 'Afhankelijk van de configuratie is installatie binnen of buiten mogelijk. Onze installateur adviseert u over de geschikte plek: garage, bijkeuken of technische ruimte.' },
      { q: 'Wat is LFP-technologie?', a: 'LFP staat voor lithium-ijzerfosfaat. Dit is de modernste en veiligste batterijchemie, vrij van kobalt. LFP-batterijen zijn thermisch stabiel en gaan langer mee dan oudere typen.' },
      { q: 'Kan ik de batterij later uitbreiden?', a: 'Ja. Het HYXiPower-systeem is modulair opgebouwd. U kunt later extra modules bijplaatsen zonder dat u een nieuwe omvormer nodig heeft, tot maximaal 111,3 kWh.' },
      { q: 'Wat is een hybride omvormer?', a: 'Een hybride omvormer regelt zowel uw zonnepanelen als de batterij. SolarFast levert dit altijd inclusief bij een nieuw systeem, zonder extra kosten.' },
      { q: 'Wat als de zon dagenlang niet schijnt?', a: 'Dan laadt de batterij op bij goedkope nachttarieven van het net. U betaalt dan wat meer dan met zonnestroom, maar nog altijd minder dan bij duur avondtarief.' },
      { q: 'Hoe weet ik wanneer de batterij vol of leeg is?', a: 'Via de gratis HYXiPower Cloud-app ziet u op elk moment de status van uw batterij, uw zonneopwekking en uw verbruik, altijd up to date op uw telefoon.' },
    ],
    [
      { q: 'Wat is HYXiPower?', a: 'HYXiPower is de fabrikant van de All-in-One thuisbatterij die SolarFast levert: een meterloos, modulair systeem met LiFePO4-cellen, universele omvormercompatibiliteit en millisecondesnelle noodstroom.' },
      { q: 'Waarom kiest SolarFast voor HYXiPower?', a: 'HYXiPower combineert LFP-celtechnologie met een slim EMS en realtime app-monitoring. SolarFast is HYXiPower partner en levert, installeert en ondersteunt het systeem.' },
      { q: 'Wat is de HYXiPower Cloud-app?', a: 'HYXiPower Cloud is de gratis app waarmee u uw systeem beheert. U ziet realtime uw zonneopwekking, batterijstatus, verbruik en besparingen op uw smartphone.' },
      { q: 'Kost de HYXiPower Cloud-app geld?', a: 'Nee, de app is permanent gratis. Geen abonnement, geen licentiekosten, nooit. U betaalt eenmalig voor het systeem en alle monitoring en updates zijn voor altijd inbegrepen.' },
      { q: 'Wat is het EMS en wat doet het?', a: 'Het EMS (Energy Management System) is de slimme software in de batterij. Het beslist automatisch wanneer de batterij laadt, ontlaadt of handelt op de energiemarkt, op basis van actuele tarieven en uw verbruik.' },
      { q: 'Kan het EMS handelen bij negatieve energietarieven?', a: 'Ja. Als de energieprijs negatief is, laadt de batterij gratis of wordt u zelfs betaald om te laden. Het EMS doet dit volledig automatisch, ook midden in de nacht.' },
      { q: 'Welke capaciteiten heeft de All-in-One ESS-reeks?', a: 'De All-in-One ESS is beschikbaar van 9,3 kWh tot 111,3 kWh in stappen van 9,3 kWh. Voor de meeste huishoudens is een systeem van 9,3 of 18,6 kWh de beste keuze.' },
      { q: 'Werkt HYXiPower met mijn bestaande zonnepanelen?', a: 'Ja. HYXiPower is compatibel met vrijwel alle zonnepanelen en omvormers op de markt. Onze installateur controleert dit altijd tijdens het adviesgesprek.' },
      { q: 'Heeft HYXiPower ook een noodstroomfunctie?', a: 'Ja. U kunt de back-upfunctie inschakelen zodat uw huis doorgaat op batterijstroom bij een stroomstoring. U stelt zelf in welke groepen op back-up gaan.' },
      { q: 'Wordt het systeem automatisch bijgewerkt?', a: 'Ja. HYXiPower stuurt automatisch OTA-updates naar uw systeem. Uw batterij wordt dus steeds slimmer zonder dat u iets hoeft te doen.' },
      { q: 'Kan ik het systeem bedienen via mijn telefoon?', a: 'Ja. Via de HYXiPower Cloud-app heeft u volledige controle: laadschema\'s instellen, meldingen ontvangen en verbruik analyseren, overal ter wereld.' },
      { q: 'Hoe werkt de koppeling met de slimme meter?', a: 'De HYXiPower sluit direct aan op uw P1-poort van de slimme meter. Zo leest het systeem uw verbruik realtime uit en optimaliseert het automatisch uw energiestroom.' },
      { q: 'Zijn de HYXiPower-systemen gecertificeerd?', a: 'Vraag ons naar de actuele certificeringsdocumentatie van uw specifieke systeem. Wij delen deze graag tijdens het adviesgesprek.' },
    ],
    [
      { q: 'Wat is het Nationaal Warmtefonds?', a: 'Het Nationaal Warmtefonds is een door de overheid ondersteund fonds dat goedkope leningen verstrekt voor energiebesparende maatregelen. Voor inkomens tot €60.000 is de rente 0%.' },
      { q: 'Hoeveel kan ik lenen voor een thuisbatterij?', a: 'U kunt tot €8.500 lenen specifiek voor een thuisbatterij. Combineert u dit met andere maatregelen zoals zonnepanelen of een warmtepomp, dan kunt u in totaal tot €25.000 lenen.' },
      { q: 'Hoe werkt de 0% rente?', a: 'Heeft u een inkomen tot €60.000 bruto per jaar? Dan betaalt u 0% rente over uw lening. Heeft u een hoger inkomen, dan geldt een laag marktconform tarief.' },
      { q: 'Wie komt in aanmerking voor een Warmtefondslenening?', a: 'Eigenaar-bewoners van een koopwoning in Nederland. U heeft geen uitstekende kredietwaardigheid nodig: het Warmtefonds kijkt ook naar de woning, niet alleen naar uw inkomen.' },
      { q: 'Hoe lang duurt de aanvraag?', a: 'Met onze begeleiding duurt de aanvraag gemiddeld 5 tot 10 werkdagen. SolarFast regelt alle communicatie met het fonds. U hoeft zelf niets te doen.' },
      { q: 'Regelt SolarFast de aanvraag voor mij?', a: 'Ja, volledig. Als officieel Warmtefonds-partner verzorgen wij de hele aanvraag van A tot Z. U tekent alleen de documenten die wij voor u klaarzetten.' },
      { q: 'Kan ik subsidie combineren met een Warmtefondslenening?', a: 'Ja. U kunt de Warmtefondslenening combineren met subsidies zoals de ISDE. SolarFast adviseert u gratis over alle regelingen die voor u beschikbaar zijn.' },
      { q: 'Wat als ik mijn woning verkoop?', a: 'Als u uw woning verkoopt, betaalt u het openstaande deel van de lening af uit de verkoopopbrengst. De batterij zelf verhoogt doorgaans ook de waarde van uw woning.' },
      { q: 'Kan ik ook lenen als ik geen zonnepanelen heb?', a: 'Een thuisbatterij komt alleen in aanmerking voor een Warmtefondslenening als u al zonnepanelen heeft of deze tegelijkertijd laat installeren. Zonder zonnepanelen (nu of gelijktijdig) kwalificeert een batterij op zichzelf niet voor deze lening.' },
      { q: 'Wat zijn de maandelijkse kosten bij een lening van €8.000?', a: 'Bij een looptijd van 10 jaar en 0% rente betaalt u circa €67 per maand. Uw gemiddelde maandelijkse besparing op energie ligt doorgaans boven dit bedrag.' },
      { q: 'Kan ik de lening eerder aflossen?', a: 'Ja, u kunt de lening altijd boetevrij vervroegd aflossen. Er zijn geen extra kosten verbonden aan vroeger aflossen.' },
      { q: 'Moet ik een eigen bijdrage betalen?', a: 'Nee. Als de lening uw investering volledig dekt, betaalt u niets vooraf. U begint direct met besparen terwijl de lening loopt.' },
    ],
    [
      { q: 'Wat kost een thuisbatterij gemiddeld?', a: 'Een instapsysteem van 9,3 kWh kost inclusief installatie en BTW doorgaans €7.500 tot €9.000. Grotere systemen schalen mee in prijs en besparing.' },
      { q: 'Wanneer verdient de batterij zichzelf terug?', a: 'Voor de meeste huishoudens is de terugverdientijd 5 tot 8 jaar. Onze calculator berekent dit nauwkeurig op basis van uw verbruik en energieprijzen.' },
      { q: 'Hoeveel bespaar ik gemiddeld per jaar?', a: 'Een gemiddeld gezin bespaart tussen €1.200 en €2.000 per jaar. Het exacte bedrag hangt af van uw verbruik, uw zonnepanelen en of u een dynamisch tarief heeft.' },
      { q: 'Is een thuisbatterij een goede investering?', a: 'Ja. Met de huidige energieprijzen en een terugverdientijd van gemiddeld 6 jaar bespaart u in 10 jaar al duizenden euro\'s. Bovendien stijgt de waarde van uw woning.' },
      { q: 'Zijn er BTW-voordelen bij een thuisbatterij?', a: 'Thuisbatterijen zijn vrijgesteld van BTW als ze samen met zonnepanelen worden geïnstalleerd of uitsluitend op zonnestroom worden geladen. Vraag ons naar de actuele voorwaarden.' },
      { q: 'Welke subsidies zijn beschikbaar?', a: 'U kunt profiteren van de ISDE-subsidie bij combinatie met een warmtepomp of zonneboiler, en van het Nationaal Warmtefonds voor een goedkope lening. SolarFast adviseert u gratis.' },
      { q: 'Wat is allemaal inbegrepen in de prijs?', a: 'Onze all-in prijs bevat altijd de batterij, hybride omvormer, installatie door eigen monteurs, BTW en fabrieksgarantie. Geen verborgen kosten, nooit.' },
      { q: 'Zijn er maandelijkse kosten na de installatie?', a: 'Nee. De HYXiPower Cloud-app is permanent gratis. Er zijn geen abonnementen, licentiekosten of onderhoudskosten. U betaalt eenmalig en dat is het.' },
      { q: 'Wat kost een reparatie buiten de garantie?', a: 'Als er iets stuk gaat buiten de garantieperiode, brengen wij een eerlijke reparatieprijs in rekening. U heeft altijd een vast aanspreekpunt, nooit een callcenter.' },
      { q: 'Wat als de energieprijzen in de toekomst zakken?', a: 'Ook bij lagere energieprijzen bespaart een batterij u geld, omdat u goedkope nachtstroom opslaat en dure piekstroom vermijdt. De besparing is lager, maar de investering blijft rendabel.' },
      { q: 'Kan ik een gratis offerte op maat aanvragen?', a: 'Ja, altijd. Gebruik onze calculator voor een directe schatting, of plan een gratis adviesgesprek voor een offerte op maat. Volledig vrijblijvend.' },
      { q: 'Betaal ik meer voor een grotere batterij?', a: 'Ja, de prijs is afhankelijk van de capaciteit. Grotere systemen besparen ook meer. In onze calculator ziet u direct welk systeem de beste verhouding heeft voor uw situatie.' },
    ],
    [
      { q: 'Hoe lang duurt de installatie?', a: 'Een standaard installatie duurt gemiddeld een halve dag. Grotere systemen of complexere aansluitingen kunnen een volledige dag in beslag nemen.' },
      { q: 'Wie installeert het systeem?', a: 'Onze eigen gecertificeerde monteurs doen de installatie. We werken nooit met onderaannemers, zodat we kwaliteit kunnen garanderen en persoonlijk aanspreekbaar blijven.' },
      { q: 'Heb ik een vergunning nodig voor een thuisbatterij?', a: 'In de meeste gevallen niet. Voor installaties binnen de woning of op eigen terrein is doorgaans geen vergunning nodig. Onze installateur controleert dit altijd vooraf.' },
      { q: 'Welke omvormer is compatibel met HYXiPower?', a: 'HYXiPower werkt met vrijwel alle gangbare omvormers. Als u al een omvormer heeft, kijken wij of die compatibel is. De hybride omvormer is altijd inbegrepen bij een nieuw systeem.' },
      { q: 'Kan ik mijn bestaande omvormer behouden?', a: 'Dat hangt af van het type en de leeftijd van uw huidige omvormer. Onze installateur bekijkt dit tijdens het adviesgesprek en adviseert u eerlijk.' },
      { q: 'Hoeveel ruimte heb ik nodig voor de batterij?', a: 'Een module van 9,3 kWh heeft een footprint van circa 60 x 25 cm bij een hoogte van 70 cm. Dat past in de meeste meterkasten, garages of bijkeukens.' },
      { q: 'Wat moet ik zelf regelen voor de installatie?', a: 'Vrijwel niets. Wij plannen de afspraak, leveren alle materialen en regelen ook de eventuele Warmtefondsaanvraag. U hoeft alleen maar thuis te zijn.' },
      { q: 'Werkt het systeem in elk type woning?', a: 'Ja, in verreweg de meeste woningen. Of het nu een rijwoning, vrijstaande woning of appartement is: onze installateur beoordeelt dit en zoekt altijd een passende oplossing.' },
      { q: 'Hoe lang is de garantie?', a: 'U krijgt fabrieksgarantie van HYXiPower op de batterijcellen, de omvormer en de software. Vraag ons naar de actuele garantietermijn voor uw configuratie.' },
      { q: 'Wat dekt de garantie precies?', a: 'De garantie dekt defecten aan de batterijcellen, de omvormer en het EMS-systeem. Normale slijtage en schade door verkeerd gebruik vallen buiten de garantie.' },
      { q: 'Wat als er iets stuk gaat?', a: 'U belt ons gewoon. Wij monitoren uw systeem op afstand en signaleren problemen vaak al voordat u ze merkt. Bij een storing regelen wij de reparatie snel.' },
      { q: 'Is er periodiek onderhoud nodig?', a: 'Nee. Een HYXiPower-batterij heeft geen periodiek onderhoud nodig. Wij monitoren het systeem via de cloud en handelen als er iets is.' },
      { q: 'Is de garantie overdraagbaar bij verkoop van de woning?', a: 'Vraag ons naar de voorwaarden rond garantieoverdracht bij verkoop van uw woning.' },
    ],
    [
      { q: 'Kan ik de batterij combineren met een laadpaal?', a: 'Ja. U kunt uw elektrische auto opladen met de opgeslagen zonnestroom uit de batterij. HYXiPower integreert via de API met de meeste gangbare laadpalen.' },
      { q: 'Kan ik mijn EV opladen met gratis zonnestroom?', a: 'Ja. Het EMS stuurt overdag de overtollige zonnestroom naar de batterij en laadt daarna uw auto op. Zo rijdt u op gratis eigen stroom.' },
      { q: 'Werkt het systeem samen met een warmtepomp?', a: 'Ja. Het EMS kan uw warmtepomp aansturen op momenten dat de batterij vol is of de zonnestroom piekt. Zo verwarmt u uw huis op eigen stroom.' },
      { q: 'Integreert HYXiPower met de slimme meter?', a: 'Ja. Via de P1-poort leest het systeem uw verbruik realtime uit. Zo weet de batterij altijd wat er nodig is en optimaliseert het volledig automatisch.' },
      { q: 'Werkt het systeem ook met een dynamisch energietarief?', a: 'Ja. Het EMS is speciaal ontworpen voor dynamische tarieven zoals EPEX Spot. Het laadt automatisch bij als de prijs laag is en levert terug als de prijs hoog is.' },
      { q: 'Kan ik ook profiteren zonder zonnepanelen?', a: 'Ja. Zonder zonnepanelen laadt de batterij op bij goedkope nachttarieven en levert die stroom op dure momenten. De besparing is kleiner, maar zeker nog de moeite waard.' },
      { q: 'Werkt het met Home Assistant of Homey?', a: 'HYXiPower heeft een open API waarmee integratie met domoticasystemen als Home Assistant en Homey mogelijk is. Dit is een optie voor gevorderde gebruikers.' },
      { q: 'Werkt HYXiPower met alle energieleveranciers?', a: 'Ja. HYXiPower werkt met alle Nederlandse energieleveranciers. Voor de EPEX Spot koppeling heeft u een leverancier nodig die dynamische tarieven aanbiedt.' },
      { q: 'Kan ik meerdere apparaten automatisch aansturen via het EMS?', a: 'Ja. Via de API en slimme meter kunt u meerdere apparaten koppelen, zoals de laadpaal, warmtepomp en boiler. Het EMS coördineert dat alles automatisch.' },
      { q: 'Wat als ik van energieleverancier wissel?', a: 'Uw batterij werkt gewoon door als u van leverancier wisselt. Alleen de EPEX Spot-koppeling vereist een leverancier met dynamische tarieven, wat eenvoudig te vinden is.' },
      { q: 'Kan ik stroom terugleveren aan het net via de batterij?', a: 'Ja. Als de energieprijzen hoog zijn, kan het EMS besluiten om stroom terug te leveren aan het net. Dit gebeurt automatisch op basis van de actuele marktprijzen.' },
    ],
  ] : [
    [
      { q: 'What does a home battery do exactly?', a: 'A home battery stores the electricity your solar panels generate during the day. You then use that power in the evening or at night instead of buying expensive grid electricity.' },
      { q: 'Do I need solar panels to get a battery?', a: 'No, it is not required. Without solar panels the battery charges at cheap night tariffs and delivers that power during the expensive evening hours.' },
      { q: 'How many kWh do I need?', a: 'It depends on your daily consumption and the number of solar panels. For an average household, a system of 9.3 or 18.6 kWh already makes a big difference. Our calculator gives you a personal recommendation.' },
      { q: 'How long does a home battery last?', a: 'The HYXiPower battery uses LFP cell technology, known for a long lifespan and high cycle count compared to older battery chemistries. Ask us about the current warranty terms.' },
      { q: 'Is a home battery safe indoors?', a: 'Yes. HYXiPower uses LFP technology (lithium iron phosphate), a chemistry known for its thermal stability. Ask us for the specific safety documentation for your system.' },
      { q: 'Can the battery serve as emergency power during an outage?', a: 'The HYXiPower All-in-One ESS can, with the correct configuration, supply emergency power during an outage. Our installer discusses the options for your situation.' },
      { q: 'Does the battery make a lot of noise?', a: 'The HYXiPower is designed for indoor use and operates quietly. Ask us for the exact acoustic specifications for your configuration.' },
      { q: 'Can the battery be installed outdoors?', a: 'Depending on the configuration, indoor or outdoor installation is possible. Our installer advises on the right location: garage, utility room or technical space.' },
      { q: 'What is LFP technology?', a: 'LFP stands for lithium iron phosphate. This is the most modern and safest battery chemistry, free of cobalt. LFP batteries are thermally stable and last longer than older types.' },
      { q: 'Can I expand the battery later?', a: 'Yes. The HYXiPower system is modular. You can add extra modules later without needing a new inverter, up to a maximum of 111.3 kWh.' },
      { q: 'What is a hybrid inverter?', a: 'A hybrid inverter manages both your solar panels and the battery. SolarFast always includes this with a new system at no extra cost.' },
      { q: 'What if the sun does not shine for several days?', a: 'Then the battery charges at cheap night tariffs from the grid. You pay a little more than with solar power, but still less than at expensive peak rates.' },
      { q: 'How do I know when the battery is full or empty?', a: 'Via the free HYXiPower Cloud app you can see the status of your battery, solar generation and consumption at any time, always up to date on your phone.' },
    ],
    [
      { q: 'What is HYXiPower?', a: 'HYXiPower is the manufacturer of the All-in-One home battery that SolarFast supplies: a meterless, modular system with LiFePO4 cells, universal inverter compatibility and millisecond backup power.' },
      { q: 'Why does SolarFast choose HYXiPower?', a: 'HYXiPower combines LFP cell technology with a smart EMS and real-time app monitoring. SolarFast is a HYXiPower partner and supplies, installs and supports the system.' },
      { q: 'What is the HYXiPower Cloud app?', a: 'HYXiPower Cloud is the free app you use to manage your system. It shows your solar generation, battery status, consumption and savings in real time on your smartphone.' },
      { q: 'Does the HYXiPower Cloud app cost money?', a: 'No, the app is permanently free. No subscription, no licence fees, ever. You pay once for the system and all monitoring and updates are included forever.' },
      { q: 'What is the EMS and what does it do?', a: 'The EMS (Energy Management System) is the smart software in the battery. It automatically decides when the battery charges, discharges or trades on the energy market, based on current tariffs and your consumption.' },
      { q: 'Can the EMS trade at negative energy tariffs?', a: 'Yes. When the energy price is negative, the battery charges for free or you are even paid to charge. The EMS does this fully automatically, even in the middle of the night.' },
      { q: 'What capacities does the All-in-One ESS series offer?', a: 'The All-in-One ESS is available from 9.3 kWh to 111.3 kWh in steps of 9.3 kWh. For most households, a system of 9.3 or 18.6 kWh is the best choice.' },
      { q: 'Does HYXiPower work with my existing solar panels?', a: 'Yes. HYXiPower is compatible with virtually all solar panels and inverters on the market. Our installer always checks this during the consultation.' },
      { q: 'Does HYXiPower have an emergency power function?', a: 'Yes. You can enable the back-up function so your home continues on battery power during a grid outage. You choose which circuits are backed up.' },
      { q: 'Is the system updated automatically?', a: 'Yes. HYXiPower sends OTA updates to your system automatically. Your battery gets smarter over time without you needing to do anything.' },
      { q: 'Can I control the system via my phone?', a: 'Yes. Via the HYXiPower Cloud app you have full control: set charging schedules, receive alerts and analyse your consumption from anywhere in the world.' },
      { q: 'How does the smart meter integration work?', a: 'The HYXiPower connects directly to the P1 port of your smart meter. This allows the system to read your consumption in real time and optimise your energy flow automatically.' },
      { q: 'Are HYXiPower systems certified?', a: 'Ask us for the current certification documentation for your specific system. We are happy to share this during the consultation.' },
    ],
    [
      { q: 'What is the National Warmtefonds (Heat Fund)?', a: 'The National Warmtefonds is a government-backed fund that provides low-cost loans for energy-saving measures. For incomes up to €60,000 the interest rate is 0%.' },
      { q: 'How much can I borrow for a home battery?', a: 'You can borrow up to €8,500 specifically for a home battery. Combined with other measures such as solar panels or a heat pump, you can borrow up to €25,000 in total.' },
      { q: 'How does the 0% interest work?', a: 'Do you have an income up to €60,000 gross per year? Then you pay 0% interest on your loan. With a higher income, a low market rate applies.' },
      { q: 'Who is eligible for a Warmtefonds loan?', a: 'Owner-occupiers of their own home in the Netherlands. You do not need excellent credit: the Warmtefonds mainly looks at the property, not just your income.' },
      { q: 'How long does the application take?', a: 'With our guidance, the application takes an average of 5 to 10 working days. SolarFast handles all communication with the fund. You do not have to do anything yourself.' },
      { q: 'Does SolarFast arrange the application for me?', a: 'Yes, completely. As an official Warmtefonds partner we handle the entire application from A to Z. You only need to sign the documents we prepare for you.' },
      { q: 'Can I combine subsidies with a Warmtefonds loan?', a: 'Yes. You can combine the Warmtefonds loan with subsidies such as ISDE. We advise you on all schemes available to you, free of charge.' },
      { q: 'What if I sell my home?', a: 'When you sell your home, you repay the outstanding part of the loan from the sale proceeds. The battery itself generally also increases the value of your home.' },
      { q: 'Can I apply for a loan without solar panels?', a: 'A home battery only qualifies for a Warmtefonds loan if you already have solar panels or install them at the same time. Without solar panels (now or simultaneously), a battery alone does not qualify for this loan.' },
      { q: 'What are the monthly costs for an €8,000 loan?', a: 'With a 10-year term at 0% interest you pay approximately €67 per month. Your average monthly energy savings are typically higher than this amount.' },
      { q: 'Can I repay the loan early?', a: 'Yes, you can always repay the loan early without any penalty. There are no extra costs for early repayment.' },
      { q: 'Do I need to pay anything upfront?', a: 'No. If the loan covers your full investment, you pay nothing upfront. You start saving immediately while the loan runs.' },
    ],
    [
      { q: 'What does a home battery cost on average?', a: 'A starter system of 9.3 kWh including installation and VAT typically costs around €7,500 to €9,000. Larger systems scale with capacity and savings.' },
      { q: 'When does the battery pay itself back?', a: 'For most households the payback period is 5 to 8 years. Our calculator calculates this accurately based on your consumption and energy prices.' },
      { q: 'How much do I save on average per year?', a: 'An average household saves between €1,200 and €2,000 per year. The exact amount depends on your consumption, solar panels and whether you have a dynamic tariff.' },
      { q: 'Is a home battery a good investment?', a: 'Yes. With current energy prices and an average payback period of 6 years, you will have saved thousands of euros within 10 years. The value of your home also increases.' },
      { q: 'Are there VAT benefits for a home battery?', a: 'Home batteries are VAT-exempt when installed together with solar panels or when charged exclusively from solar power. Ask us about the current conditions.' },
      { q: 'What subsidies are available?', a: 'You can benefit from the ISDE subsidy in combination with a heat pump or solar boiler, and the National Warmtefonds for a cheap loan. SolarFast advises you for free on what applies to you.' },
      { q: 'What is included in the price?', a: 'Our all-in price always includes the battery, hybrid inverter, installation by our own technicians, VAT and factory warranty. No hidden costs, ever.' },
      { q: 'Are there monthly costs after installation?', a: 'No. The HYXiPower Cloud app is permanently free. There are no subscriptions, licence fees or maintenance costs. You pay once and that is it.' },
      { q: 'What does a repair cost outside the warranty?', a: 'If something breaks outside the warranty period, we charge a fair repair price. You always deal with a fixed point of contact, never a call centre.' },
      { q: 'What if energy prices drop in the future?', a: 'Even at lower energy prices a battery saves you money, because you store cheap night power and avoid expensive peak power. The savings are smaller, but the investment remains worthwhile.' },
      { q: 'Can I request a free personalised quote?', a: 'Yes, always. Use our calculator for an instant estimate or schedule a free consultation for a tailored quote. Completely free of obligation.' },
      { q: 'Do I pay more for a larger battery?', a: 'Yes, the price depends on capacity. But larger systems also save more. In our calculator you can see immediately which system offers the best ratio for your situation.' },
    ],
    [
      { q: 'How long does the installation take?', a: 'A standard installation takes an average of half a day. Larger systems or more complex connections can take a full day.' },
      { q: 'Who installs the system?', a: 'Our own certified technicians carry out the installation. We never use subcontractors, so we can guarantee quality and remain personally accountable.' },
      { q: 'Do I need a permit for a home battery?', a: 'In most cases, no. For installations inside the home or on your own property, no permit is usually required. Our installer checks this in advance.' },
      { q: 'Which inverter is compatible with HYXiPower?', a: 'HYXiPower works with virtually all common inverters. If you already have one, we check whether it is compatible. The hybrid inverter is always included with a new system.' },
      { q: 'Can I keep my existing inverter?', a: 'That depends on the type and age of your current inverter. Our installer assesses this during the consultation and advises you honestly.' },
      { q: 'How much space do I need for the battery?', a: 'A 9.3 kWh module has a footprint of approximately 60 x 25 cm at a height of 70 cm. It fits in most meter cupboards, garages or utility rooms.' },
      { q: 'What do I need to arrange myself before the installation?', a: 'Virtually nothing. We plan the appointment, supply all materials and also arrange the Warmtefonds application if needed. You just need to be home.' },
      { q: 'Does the system work in any type of home?', a: 'Yes, in the vast majority of homes. Whether it is a terraced house, detached home or flat: our installer assesses this and always finds a suitable solution.' },
      { q: 'How long is the warranty?', a: 'You receive a factory warranty from HYXiPower on the battery cells, inverter and software. Ask us about the current warranty term for your configuration.' },
      { q: 'What does the warranty cover exactly?', a: 'The warranty covers defects in the battery cells, inverter and EMS system. Normal wear and damage from misuse fall outside the warranty.' },
      { q: 'What if something breaks down?', a: 'Just call us. We monitor your system remotely and often detect problems before you notice them. In case of a fault, we arrange the repair quickly.' },
      { q: 'Is periodic maintenance required?', a: 'No. An HYXiPower battery requires no periodic maintenance. We monitor the system via the cloud and act if anything comes up.' },
      { q: 'Is the warranty transferable when selling the home?', a: 'Ask us about the terms for transferring the warranty when you sell your home.' },
    ],
    [
      { q: 'Can I combine the battery with an EV charger?', a: 'Yes. You can charge your electric car with the stored solar power from the battery. HYXiPower integrates via API with most common EV chargers.' },
      { q: 'Can I charge my EV with free solar power?', a: 'Yes. The EMS directs surplus solar power to the battery during the day and then charges your car. This way you drive on free solar power.' },
      { q: 'Does the system work with a heat pump?', a: 'Yes. The EMS can control your heat pump at times when the battery is full or solar production peaks. This way you heat your home on your own power.' },
      { q: 'Does HYXiPower integrate with the smart meter?', a: 'Yes. Via the P1 port the system reads your consumption in real time. The battery always knows what is needed and optimises fully automatically.' },
      { q: 'Does the system work with a dynamic energy tariff?', a: 'Yes. The EMS is specifically designed for dynamic tariffs such as EPEX Spot. It automatically charges when the price is low and feeds back when the price is high.' },
      { q: 'Can I also benefit without solar panels?', a: 'Yes. Without solar panels the battery charges at cheap night tariffs and delivers power during expensive moments. The savings are smaller, but definitely still worthwhile.' },
      { q: 'Does it work with Home Assistant or Homey?', a: 'HYXiPower has an open API that allows integration with home automation systems such as Home Assistant and Homey. This is an option for advanced users.' },
      { q: 'Does HYXiPower work with all energy suppliers?', a: 'Yes. HYXiPower works with all Dutch energy suppliers. For the EPEX Spot connection you need a supplier that offers dynamic tariffs.' },
      { q: 'Can I control multiple devices automatically via the EMS?', a: 'Yes. Via the API and smart meter you can connect multiple devices such as the EV charger, heat pump and boiler. The EMS coordinates them all automatically.' },
      { q: 'What if I switch energy supplier?', a: 'Your battery continues to work normally when you switch supplier. Only the EPEX Spot connection requires a supplier with dynamic tariffs, which is easy to find on the market.' },
      { q: 'Can I feed power back to the grid via the battery?', a: 'Yes. When energy prices are high, the EMS can decide to feed power back to the grid. This is done automatically based on current market prices.' },
    ],
  ]

  return (
    <div className="min-h-screen bg-white text-[#131A20] font-['Plus_Jakarta_Sans']">
      <Nav />

      <section className="pt-32 pb-16 bg-[#F9F7F4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            {nl ? 'Veelgestelde vragen' : 'Frequently asked questions'}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
            className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            {nl ? 'Alles wat u wil weten' : 'Everything you need to know'}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
            className="text-[#131A20]/55 text-lg leading-relaxed max-w-2xl mx-auto">
            {nl
              ? 'Duidelijke antwoorden op uw vragen over thuisbatterijen, HYXiPower, financiering, installatie en meer. Geen jargon.'
              : 'Clear answers to your questions about home batteries, HYXiPower, financing, installation and more. No jargon.'}
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    active === i
                      ? 'bg-[#22a55d] text-white shadow-lg shadow-green-500/20'
                      : 'bg-[#F9F7F4] text-[#131A20]/60 hover:text-[#131A20] hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="bg-[#F9F7F4] rounded-3xl px-7 py-2">
              {sections[active].map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </motion.div>

          <Reveal className="mt-12">
            <div className="bg-[#EEF6F1] rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#22a55d]/15">
              <div>
                <div className="font-extrabold text-[#131A20] text-lg mb-1">
                  {nl ? 'Staat uw vraag er niet bij?' : "Can't find your question?"}
                </div>
                <p className="text-[#131A20]/55 text-sm">
                  {nl
                    ? 'Neem direct contact op. Wij reageren binnen 24 uur, volledig vrijblijvend.'
                    : 'Get in touch directly. We respond within 24 hours, no obligation.'}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <a href="mailto:info@solarfast.nl"
                  className="inline-flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-6 py-3 rounded-full text-sm transition-all">
                  {nl ? 'Stuur een e-mail' : 'Send an email'}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
