import { GuideCard } from "./site";

export type GuideSection = { heading: string; body: string[] };
export type GuideFull = GuideCard & {
  intro: string[];
  steps: { title: string; detail: string }[];
  waterdrop: { title: string; detail: string }[];
  tips: string[];
  faqs: { q: string; a: string }[];
  sections: GuideSection[];
};

export const GUIDE_CONTENT: Record<string, GuideFull> = {
  "how-to-get-water-out-of-iphone-speaker": {
    slug: "how-to-get-water-out-of-iphone-speaker",
    title: "How to Get Water Out of iPhone Speaker (60-Second Fix)",
    shortTitle: "Water in iPhone speaker",
    description:
      "iPhone speaker muffled after water? Skip the rice. Do this 60-second water eject routine with max volume, speaker-down position, and WaterDrop frequencies to push droplets out.",
    keyword: "how to get water out of iphone speaker",
    readMinutes: 6,
    emoji: "💧",
    intro: [
      "If your iPhone speaker sounds muffled, underwater, or crackly after a splash, swim, rain, shower steam, or sink drop — water is almost certainly trapped in the speaker mesh. Don't panic, and definitely don't put it in rice.",
      "The fastest fix is sound: specific low-frequency tones vibrate the speaker diaphragm hard enough to shake droplets out of the grille. Apple Watch does this automatically with Water Lock. iPhone doesn't — so you do it with an app. Here's the exact 60-second routine that works.",
    ],
    steps: [
      { title: "Power check + wipe (30 seconds)", detail: "If the phone was submerged, unplug everything. Wipe the outside with a lint-free cloth. Tap the phone gently against your hand with the speaker facing DOWN to dump bulk water. Do NOT charge until the port is dry." },
      { title: "Set up for ejection", detail: "Disconnect Bluetooth headphones/AirPods so sound comes from the phone speakers. Turn volume to 100%. Remove a bulky waterproof case if it covers the speaker. Lay the phone speaker-down on a cloth, slightly tilted." },
      { title: "Run the water-eject tone 60 seconds", detail: "Play an alternating low-frequency sweep (around 100–300Hz with bursts). You should feel strong vibration. Watch the grille — tiny droplets will creep out. Stop, wipe, and repeat 2–3 times." },
      { title: "Test and dry", detail: "Play music or a voice memo. If highs are back, you're done — leave the phone in airflow for an hour. If still dull, repeat once more and let it air-dry. Persistent distortion after drying = possible hardware damage, see Apple support." },
    ],
    waterdrop: [
      { title: "Open WaterDrop → pick Speaker mode", detail: "WaterDrop has separate programs for main speaker, earpiece, and AirPods — pick the one that sounds bad. The free program is enough for most splashes." },
      { title: "Hit run at max volume, speaker down", detail: "The app plays tested alternating frequencies with vibration assist — stronger and more effective than a single YouTube tone. One run is ~60 seconds." },
      { title: "Verify with a sound test + dB meter", detail: "Go to Sound Tests, play the same tone before/after, and check the free decibel meter. Seeing the number come back up proves the fix instead of guessing." },
    ],
    tips: [
      "Max volume matters — half volume gives half the vibration.",
      "Never use a hair dryer (heat kills seals) or poke the mesh with a toothpick.",
      "Rice is a myth — starch dust gets INTO the speaker. Airflow + sound is faster.",
      "Repeat beats duration: three 60-second runs with wipes beat one 5-minute blast.",
    ],
    faqs: [
      { q: "How long does it take to get water out of an iPhone speaker?", a: "Light splashes clear in 1–2 sixty-second runs. A full dunk can take 3–5 runs plus an hour of air-drying. If it's still muffled after drying overnight, the mesh may be clogged with minerals — try a dust-cleaning cycle." },
      { q: "Will playing loud sounds damage my iPhone speaker?", a: "No. Ejection tones stay within the speaker's normal operating range. They're the same loudness as max-volume music, just tuned to vibrate more. Don't run them for 30 minutes straight — short bursts are the point." },
      { q: "Should I use rice to dry my iPhone?", a: "No — Apple explicitly says not to. Rice dust and starch get into ports and speakers. Use a lint-free cloth, airflow or a cool fan, and sound ejection." },
    ],
    sections: [
      { heading: "Why your iPhone sounds underwater", body: ["The speaker grille is a super-fine mesh. Water's surface tension makes it cling there and weigh down the diaphragm, killing treble and volume. That's why voices sound like they're in a tunnel. Vibration breaks that tension and flings droplets out — which is why you literally see water appear on the grille during ejection."] },
      { heading: "What NOT to do", body: ["Don't charge while the port is wet (you'll get the liquid-detection alert). Don't use compressed air — it drives water deeper. Don't seal it in a bag; airflow dries faster. And don't wait days hoping it fixes itself: mineral deposits from pool or tap water get harder to shake out over time."] },
    ],
  },

  "how-to-get-water-out-of-airpods": {
    slug: "how-to-get-water-out-of-airpods",
    title: "How to Get Water Out of AirPods: Water Eject Fix That Works (2026)",
    shortTitle: "Water in AirPods fix",
    description:
      "Water in your AirPods? Squeaky, muffled, or one side quiet after rain, sweat, or a full wash cycle? The exact water-eject routine owners used to save $250 replacements — Pro, 3rd/4th gen & Max.",
    keyword: "how to get water out of airpods",
    readMinutes: 9,
    emoji: "🎧",
    intro: [
      "That sinking feeling: your AirPods went for a swim — rain, sweat, the sink, or a full washing-machine cycle — and now they squeal, sound muffled, or one side went nearly silent. Take a breath: wet AirPods are the single most common 5-star story behind WaterDrop, and most of those buds lived.",
      "Here's why an app can fix what rice can't. AirPods drivers are tiny, so water clings to the acoustic mesh by surface tension and throws the whole acoustic chamber off — that's the squeak, the tinniness, the vanished bass. Fine-speaker ejection frequencies vibrate that mesh at just the right rate to walk droplets back out, without overdriving the little driver the way a blunt iPhone-speaker tone would.",
      "This guide covers every wet-AirPods scenario — washed, rained on, sweaty, or dropped in water — for AirPods Pro (1st & 2nd gen), AirPods 3rd/4th gen, and AirPods Max. Follow it in order. Most people hear improvement before they finish, and the full save usually lands by the next morning.",
    ],
    steps: [
      { title: "Stop, disconnect, shake (first 2 minutes)", detail: "Pause your audio and take the buds out. Don't crank the volume to 'test' them — a waterlogged driver pushed hard is the one thing that can turn a rescue into a replacement. Hold each bud driver-side down and shake gently, then pat dry." },
      { title: "Dry the mesh, vents, and charging contacts", detail: "With a lint-free cloth, wipe the speaker mesh, the little mic vents, and the silver charging contacts. If the case got wet too, leave it open and upside down — and keep the buds OUT of it for now. No heat, no hair dryer, ever." },
      { title: "Run the AirPods water-eject program", detail: "Connect the buds, set phone volume to max, and run a fine-speaker / AirPods ejection mode — NOT the main iPhone speaker tone. Do 3–5 short cycles, wiping the mesh between runs. Soaked AirPods Pro have needed up to an hour total across cycles in real reviews." },
      { title: "The overnight dry that actually saves them", detail: "This is the step everyone skips and the step that matters most. Leave the buds OUT of the case overnight in a dry, airy room. Silica gel packets beat rice (no starch dust in the mesh). Don't charge them overnight — wet pins corrode." },
      { title: "Morning check: the 3-song test", detail: "Play the same three tracks you know by heart — one bassy, one vocal, one bright — and compare left vs. right. Test a call and toggle ANC. Squeal gone and bass back? You won. Still dull on one side? Run one more eject session before concluding anything." },
    ],
    waterdrop: [
      { title: "Pick the AirPods program — this is the whole ballgame", detail: "WaterDrop has a dedicated fine-speaker frequency for AirPods, and reviewers say other eject apps failed where this mode worked. An iPhone main-speaker tone is too coarse for tiny AirPods drivers." },
      { title: "Run connected, at max phone volume, in short cycles", detail: "Wear or hold the buds connected, phone volume at 100%, and let each cycle play fully. Wipe the mesh between runs — you'll often see the moisture you're pulling out." },
      { title: "Prove each bud with left/right sound tests", detail: "Use the 15+ in-app sound tests to compare buds directly instead of guessing. If one bud clearly lags after drying overnight plus several runs, give it a focused session — our one-quiet-AirPod walkthrough covers exactly that." },
    ],
    tips: [
      "Squealing near your ear = water on the mesh plus feedback-mic resonance. Don't enable ANC to 'test it' — run ejection first.",
      "Never charge wet AirPods. Dry the contacts fully or you'll corrode the charging pins.",
      "Silica gel beats rice for overnight drying — rice dust settles straight into the mesh.",
      "Detergent, pool, and sweat residue need extra cycles. Minerals and salts stick even after the water's gone — a second session after full drying finishes the job.",
      "AirPods Max: same idea, moderate volume, longer air time. Pop the ear cushions off so the cups can breathe — they trap moisture.",
      "Gym sweat counts as water damage over time. Wipe buds down after workouts; a monthly 60-second maintenance eject keeps gym pairs clear.",
    ],
    faqs: [
      { q: "Can water-damaged AirPods be saved?", a: "Often yes — if they still power on and connect, the problem is usually water in the acoustic mesh, which ejection tones can clear. No power, no pairing, or a persistent red/amber case light after 24 hours of drying points to board damage instead." },
      { q: "How do I eject water from AirPods, exactly?", a: "Connect the buds, max out phone volume, and play a fine-speaker water-eject program for 3–5 short cycles, wiping the mesh between runs. Then dry them outside the case overnight. The Siri Water Eject shortcut can help in a pinch, but its single coarse tone isn't tuned for tiny AirPods drivers." },
      { q: "How long should I run water eject on AirPods?", a: "Start with 3 cycles and listen. Light rain or sweat often clears in one session. A full wash cycle has needed up to an hour total across cycles plus overnight drying in real user reviews. Short bursts with rests beat one endless blast." },
      { q: "Why is one AirPod louder than the other after water?", a: "Water rarely hits both buds evenly — one mesh stays wetter and sounds muffled. First check Settings > Accessibility > Audio Balance is centered, then run a focused eject session on the quiet bud." },
      { q: "Are AirPods waterproof?", a: "No. AirPods Pro and 3rd/4th gen are sweat- and water-RESISTANT (IPX4: splashes and sweat, not swims or washes), the case isn't rated at all, and resistance fades with age and wear. Treat every soaking as a rescue mission." },
      { q: "Why do my AirPods squeal after getting wet?", a: "Water on the driver mesh changes airflow and makes the driver plus feedback mic resonate — that high-pitched squeal. Ejecting the water restores normal acoustics, which is why the squeal usually vanishes mid-session." },
    ],
    sections: [
      { heading: "The $250 save: what actually worked", body: ["Reviewer Devikamohan put AirPods through the washer by mistake — afterward the sound was noisy and high-pitched. Silica gel: failed. A day in rice: failed. Two other water-eject apps: failed. Then WaterDrop's AirPods mode worked like a charm, she wrote, and saved a $250 replacement. NikiD81 had the same arc — washed AirPods squealing at her ears, one run of the AirPods program, back to normal. HANNNAHHH's AirPods Pro sat in water for hours: about an hour of the program plus drying outside the case overnight, good as new. The pattern across every save is identical: fine-speaker mode, several cycles, overnight dry."] },
      { heading: "AirPods Pro vs AirPods 3rd/4th gen vs AirPods Max", body: ["AirPods Pro (1st & 2nd gen): the most wash-survival stories, but also the most sensitive — the vent system and ANC feedback mics clog easily, so expect squealing and run extra cycles with ANC off. AirPods 3rd/4th gen: simpler acoustics, same routine, usually fewer cycles. AirPods Max: the cups hold water like bowls — remove the cushions, air them overnight, run ejection at moderate (not max) volume, and give them 48 hours before judging. Note: Max condensation issues are a separate known quirk; this routine handles accident water, not chronic condensation."] },
      { heading: "Your 24-hour rescue timeline", body: ["Hours 0–1: shake, wipe, and run 3–5 eject cycles with wipes between. Overnight: buds OUT of the case in a dry room (silica nearby if you have it). Morning: the 3-song test plus a call. Still dull? One more eject session, then a second full dry day. Past 48 hours with zero improvement — especially no charging or pairing — that's when you book Apple Support instead of running more tones."] },
      { heading: "When to give up and call Apple", body: ["A bud that won't charge, won't pair, or rattles and distorts at LOW volume even after 48 hours bone-dry plus ejection sessions is telling you the driver or board is hurt — sound can't fix hardware. Same for a case light stuck red/amber. Walk in with your timeline written down; Geniuses genuinely use it to distinguish accident damage from defects."] },
    ],
  },

  "can-airpods-survive-washing-machine": {
    slug: "can-airpods-survive-washing-machine",
    title: "Can AirPods Survive the Washing Machine? Honest Odds + Rescue Plan",
    shortTitle: "Washed AirPods survival",
    description:
      "Just washed your AirPods? Don't panic — many survive. Realistic survival odds by model, the dryer mistake that kills them, and the rescue plan that saved $250 AirPods Pro.",
    keyword: "can airpods survive washing machine",
    readMinutes: 6,
    emoji: "🌀",
    intro: [
      "You opened the washer and there they are, tumbling among the socks. Your stomach drops — but here's the honest truth before you spiral: washed AirPods survive far more often than the internet wants you to believe. Full wash cycles are behind a huge share of WaterDrop's 5-star reviews, including a $250 save.",
      "Why do they live? They're small with tight seams, they spend most of the cycle powered idle rather than actively driving current, and plain wash water is relatively clean. The thing that actually kills washed AirPods is almost always what happens NEXT — especially the dryer. Here's your triage, in order.",
    ],
    steps: [
      { title: "Triage in 60 seconds: no charge, no dryer", detail: "Fish out both buds AND the case. Do NOT drop them on the charger 'to see if they work' — wet pins plus current equals corrosion. And whatever you do, keep them out of the dryer: heat melts internal adhesives, cooks the tiny batteries, and bakes detergent minerals permanently into the mesh. Air-dry only." },
      { title: "Shake, wipe, and separate everything", detail: "Shake each bud driver-down, pat the mesh and contacts dry with a lint-free cloth, and leave the case open and upside down. Buds stay OUT of the case until everything is bone dry — a wet case will just re-soak them and corrode the pins." },
      { title: "Run AirPods water-eject cycles", detail: "Connect the buds, phone volume to max, and run a fine-speaker AirPods ejection program for 3–5 cycles, wiping the mesh between runs. Detergent water leaves residue that plain water doesn't, so expect to need more cycles than a rain soaking." },
      { title: "Overnight dry, morning verdict", detail: "Dry room, buds out of the case, overnight minimum. In the morning run the same test track as before the wash. Sound back? You joined the survivors' club. One side still off? That bud gets a focused session — then 48 hours decides it." },
    ],
    waterdrop: [
      { title: "Use the AirPods program, not the speaker blast", detail: "Tiny drivers need the fine-speaker frequency. Reviewers who survived washes credit this specific mode after generic eject tones did nothing." },
      { title: "Budget extra cycles for detergent", detail: "Wash water isn't just water — detergent and softener coat the mesh. Plan on two sessions: one now, one after the overnight dry." },
      { title: "Check each bud with left/right tests", detail: "Washes hit buds unevenly. The 15+ sound tests let you score left vs. right separately so the quiet one gets the attention." },
    ],
    tips: [
      "The dryer is the #1 killer of washed AirPods — heat damage is permanent, water damage usually isn't.",
      "Check the case separately: rinse-free, dried open for 48 hours. A dead case with live buds is still a win (cases are cheaper than buds).",
      "AirPods Pro survive washes most often in user reports — better seals — but their ANC mics need the longest drying.",
      "Take a photo of the case light status now. If you end up at Apple, that timeline helps.",
    ],
    faqs: [
      { q: "What are the odds my AirPods survive the washing machine?", a: "No official numbers exist, but user reports skew surprisingly positive when the buds skip the dryer: many come back fully with ejection plus overnight drying. Odds drop hard with dryer heat, a hot wash, or days of delay before drying." },
      { q: "My AirPods went through the dryer too — is there any hope?", a: "Less, but not zero. Let them cool fully, then run the same rescue: dry, eject cycles, 48 hours of air. Heat-plus-water is the worst combo, so be honest with yourself if there's rattling or no charging after two dry days." },
      { q: "The case went through the wash as well. Now what?", a: "Dry it open and upside down for at least 48 hours and don't charge it until then. Corroded pins are the usual case-killer. Test it with the buds only after everything is fully dry." },
    ],
    sections: [
      { heading: "Why the dryer is the real killer", body: ["Water alone rarely destroys electronics that are powered off — it's water PLUS energy. A dryer adds sustained heat that softens adhesives, stresses the coin-cell batteries, and fuses detergent minerals into the acoustic mesh while driving moisture deeper into seams. Every 'my AirPods died in the wash' story that ends badly seems to involve heat. Cold wash plus fast air-drying is a rescue; hot dryer is a funeral."] },
      { heading: "What to realistically expect tomorrow", body: ["Best case (most common): muffled or squeaky tonight, clearly better after eject cycles, fully normal by tomorrow. Middle case: one bud lags — focused sessions plus a second dry day usually close the gap. Worst case: silent bud, no charging light, no pairing after 48 dry hours — that's hardware, and no tone will fix it. You'll know which camp you're in by day two."] },
    ],
  },

  "airpods-one-side-quiet-after-water": {
    slug: "airpods-one-side-quiet-after-water",
    title: "One AirPod Quieter Than the Other After Water? Fix It",
    shortTitle: "One AirPod quiet",
    description:
      "Left AirPod whisper-quiet after getting wet while the right is fine? Why water hits one bud harder, how to check balance vs. blockage, and the per-bud eject routine that evens them out.",
    keyword: "one airpod quieter than the other after water",
    readMinutes: 5,
    emoji: "🔉",
    intro: [
      "Classic post-soak symptom: the right bud sounds fine, the left sounds like it's playing from inside a pillow. Don't assume it's dead — water almost never hits both buds evenly. Whichever mesh was facing down (or took the splash) stays wetter, and a wetter mesh is a quieter bud.",
      "Before touching any fix, spend 60 seconds ruling out settings, because iOS balance quirks fake this exact symptom. Then we'll even the buds out with a focused per-bud routine.",
    ],
    steps: [
      { title: "Rule out settings first (60 seconds)", detail: "Go to Settings > Accessibility > Audio/Visual: Balance must be centered, Mono Audio OFF. Then forget and re-pair the AirPods in Bluetooth settings — a glitched pairing after water exposure is weirdly common. Still uneven? It's the bud, not the phone." },
      { title: "Confirm which bud is actually wet", detail: "Play the same familiar track, then physically swap the buds ear-to-ear. If the quietness follows the bud, that mesh is waterlogged. If it follows the ear, check that ear (wax happens) — and clean wax off the mesh first, since wax locks water in." },
      { title: "Run a focused session on the quiet bud", detail: "Connect both buds, max phone volume, and run the AirPods water-eject program — then run extra cycles wearing only the quiet bud so all the acoustic energy goes where it's needed. Wipe its mesh between every run." },
      { title: "Even-out check with a left/right test", detail: "Use a stereo left/right test track at identical volume. Buds within a hair of each other? Done. Quiet bud still lagging after drying overnight plus focused runs? Give it one more full dry day before calling it." },
    ],
    waterdrop: [
      { title: "AirPods mode, with the quiet bud solo", detail: "Run the general rescue with both buds first, then extra cycles with only the quiet bud connected — focused vibration on the mesh that needs it." },
      { title: "Score them with stereo tests", detail: "The in-app sound tests include balance checks, so you're measuring the gap instead of vibes-guessing whether it's 'better'." },
      { title: "Loop back to the full routine if needed", detail: "An uneven pair usually means an uneven drying job. Our main get-water-out-of-AirPods guide has the full 24-hour timeline — this page is the specialist visit." },
    ],
    tips: [
      "Earwax plus water is the combo that fakes a dead bud. Gently clean wax off the mesh BEFORE ejecting — wax seals water in.",
      "Don't just crank the volume to compensate. You'll retrain your ears and risk the healthy bud — fix the quiet one instead.",
      "Check forMono Audio and balance after every iOS update. Updates have been known to flip them.",
      "Sweat-soaked gym pairs go uneven first. Mark which side fades and rotate your maintenance sessions toward it.",
    ],
    faqs: [
      { q: "Why is it always the left AirPod that's quiet?", a: "It isn't, really — it's whichever bud was mesh-down in the water, took the splash, or sits in the sweatier ear. Left gets blamed because people notice asymmetry, not sides." },
      { q: "Balance is centered but one side is still quiet. Now what?", a: "That's confirmation it's physical blockage, not settings. Focused eject cycles on the quiet bud plus a full overnight dry close most of these gaps." },
      { q: "How long until both buds sound even again?", a: "Most even out within the first session plus overnight drying. If the gap hasn't budged after two dry days and repeated focused runs, that bud likely has driver damage." },
    ],
    sections: [
      { heading: "Wax + water: the combo that fakes a dead bud", body: ["On its own, a little wax just dulls sound slightly. Add water and the wax becomes a waterproof seal over the mesh — ejection tones can't push through it, so the bud stays silent no matter how many cycles you run. A gentle wax cleaning first, then ejection, has 'revived' countless supposedly dead buds. Always de-wax before diagnosing."] },
      { heading: "When the quiet bud is actually dead", body: ["Zero sound (not quiet — zero) after 48 hours fully dry plus focused eject sessions, or a bud that won't charge or pair at all, means electronics, not moisture. No tone fixes that. Apple battery/damage service for a single bud is far cheaper than a new pair — ask specifically about single-bud replacement."] },
    ],
  },

  "airpods-crackling-static-after-water": {
    slug: "airpods-crackling-static-after-water",
    title: "AirPods Crackling or Static After Getting Wet? Causes + Fix",
    shortTitle: "AirPods crackling",
    description:
      "AirPods crackling, popping, or static after water exposure? What that distortion means for the driver and ANC mics, settings to calm it down, and the drying + eject fix.",
    keyword: "airpods crackling after water",
    readMinutes: 6,
    emoji: "⚡",
    intro: [
      "Your AirPods survived the splash — but now there's crackling, popping, or a bed of static under everything. Annoying, but genuinely good news: moisture crackle is one of the most fixable wet-AirPods symptoms, because it means the driver is alive and moving. Dead drivers don't crackle; they stay silent.",
      "The distortion comes from two places: the main driver fighting water tension on the mesh, and the ANC microphones hearing moisture turbulence and feeding it back into your ears. We'll calm both down, dry them out, and re-enable features one by one.",
    ],
    steps: [
      { title: "Calm it down: tame the settings first", detail: "Turn OFF Noise Cancellation and Transparency (use plain Off mode), disable Spatial Audio, and drop volume a couple of notches. ANC on wet mics amplifies moisture noise into a roar — this alone often cuts the crackle in half and tells you the mics are the main culprit." },
      { title: "Dry thoroughly, then eject", detail: "Wipe the mesh and mic vents, keep buds out of the case, and give them real air time — ANC mics dry slower than drivers. Then run the AirPods water-eject program for several cycles at max phone volume, wiping between runs." },
      { title: "Re-enable features one by one", detail: "Test plain stereo first. Clean? Turn on Transparency and listen. Still clean? Try ANC, then Spatial Audio last. Whichever feature reintroduces the crackle tells you which mic array is still damp — give it another dry day." },
      { title: "Update firmware once dry", detail: "With buds charged, in the case, near your iPhone on Wi-Fi for 30 minutes — firmware updates install automatically and have historically patched ANC crackle behavior. Never update mid-rescue on wet buds; dry first." },
    ],
    waterdrop: [
      { title: "AirPods-mode cycles for driver crackle", detail: "The fine-speaker sweep shakes mesh water loose — the most common crackle source. Several short cycles with wipes beat one long blast." },
      { title: "Voice-range tests for mic-side static", detail: "If calls and Transparency hiss but music is clean, the mic vents are the wet part. Run voice-range sound tests to track that specific path improving." },
      { title: "Full sweeps to confirm the driver", detail: "A smooth bass-to-treble sweep with no dropouts or rattles is your all-clear that the driver itself is healthy." },
    ],
    tips: [
      "Static only on calls = mic vent moisture. Music uses the driver; calls lean on the mics — different wet parts, different dry times.",
      "Crackle that worsens with ANC but vanishes in Off mode = damp feedback mics. Patience (48h) fixes more of these than anything.",
      "Keep firmware current — Apple has tuned ANC behavior via updates before.",
      "Chronic sweat exposure corrodes mic meshes over months. Gym pairs deserve post-workout wipes, not just post-soak rescues.",
    ],
    faqs: [
      { q: "Is crackling a blown driver or just water?", a: "The low-volume test decides: moisture crackle fades as buds dry and often disappears at low volume; a blown driver rattles and distorts even quietly, even bone dry. If it's improving day over day, it's water." },
      { q: "Why does Noise Cancellation make wet AirPods sound worse?", a: "ANC listens through external and internal mics and inverts what it hears. Wet mics hear turbulence, so ANC diligently amplifies moisture noise into your ears. It resolves as the mics dry — Off mode in the meantime." },
      { q: "How long do AirPods take to stop crackling?", a: "Driver crackle often clears in one eject-plus-dry cycle. Mic-related ANC crackle is slower — plan on 24–48 hours of real air drying. Still crackling identically after three dry days? That's hardware." },
    ],
    sections: [
      { heading: "Why ANC turns moisture into noise", body: ["Transparency and Noise Cancellation pipe the outside world through the mics in real time. Dry mics hear the world; damp mics hear water turbulence against the vent mesh — gurgles, pops, rushing. The system can't tell turbulence from traffic, so it serves it up faithfully. This is why wet AirPods can sound dramatically worse in ANC than in Off mode, and why isolating features one by one is diagnostic, not just comfort."] },
      { heading: "The low-volume test: wet vs. blown", body: ["Play a clean vocal track at 20% volume in a quiet room. Moisture issues mostly vanish down here — there's too little energy to excite the water. A damaged driver still buzzes, rattles, or cuts out even whisper-quiet. Pass the low-volume test and your job is drying, not shopping."] },
    ],
  },

  "dropped-iphone-in-water-speaker-muffled": {
    slug: "dropped-iphone-in-water-speaker-muffled",
    title: "Dropped iPhone in Water? Fix Muffled Speaker Fast",
    shortTitle: "Dropped iPhone in water",
    description:
      "Dropped your iPhone in the pool, sink, or toilet and the speaker sounds underwater? Emergency checklist: what to do in the first 5 minutes plus the water-eject cycle that restores clarity.",
    keyword: "dropped iphone in water speaker muffled",
    readMinutes: 6,
    emoji: "🆘",
    intro: [
      "Pool, toilet, sink, bath, ocean — doesn't matter. Your iPhone survived, but now calls sound like you're in a fish tank. That's water in the speaker and possibly the earpiece and mic.",
      "You have a golden 5-minute window before minerals start sticking. Do this emergency routine in order — it takes longer to read than to do.",
    ],
    steps: [
      { title: "Rescue: out, off-ish, out of case", detail: "Fish it out. If it was a long dunk, power it off. Remove the case immediately — cases trap water against speakers and ports. Hold speaker-side down and shake gently." },
      { title: "Dry the outside in 60 seconds", detail: "Lint-free cloth everywhere, especially speaker slots, Lightning/USB-C port, and earpiece slit. Tap gently against your hand, port down. If toilet/ocean: rinse briefly with clean tap water FIRST (yes, really — sewage/salt corrodes worse than fresh water), then wipe." },
      { title: "No charge, no heat, get airflow", detail: "Do NOT plug in until the liquid alert clears and the port is bone dry (can take hours). No hair dryer. Point a cool fan at it or leave in a breezy room." },
      { title: "Eject + test", detail: "Once stable, run 2–3 water-eject cycles at max volume, speaker down, wiping between runs. Test with music + a voice memo (checks speaker AND mic). Leave to air-dry." },
    ],
    waterdrop: [
      { title: "Run Speaker mode first, then Earpiece", detail: "A dunk hits every opening. Run the main-speaker program 2×, then the earpiece-speaker program 1–2× — calls use the earpiece, music uses the bottom speaker." },
      { title: "Use the dB meter as your proof", detail: "Muffled = measurably quieter. Check the free decibel meter from the same distance before/after. Numbers back up = fixed. Still 6dB+ down after drying = repeat tomorrow or check for damage." },
      { title: "Finish with sound tests", detail: "Run the 15+ sound tests to check bass, treble, and voice range. Pool chlorine and salt leave residue — a second cleaning session after full drying often finishes the job." },
    ],
    tips: [
      "IP68 means survived, not unaffected — water still sits in the mesh.",
      "Salt/chlorine water: always follow with ejection + drying, residue muffles for days.",
      "Liquid-detection alert? Wait. Forcing a charge fries ports.",
      "Toilet drop: clean the exterior with an alcohol wipe AFTER it dries, not before ejection.",
    ],
    faqs: [
      { q: "My iPhone speaker is muffled after dropping in water — will it fix itself?", a: "Sometimes, after hours of drying. But ejection is 10× faster and prevents mineral bonding. If it's still muffled after 24h dry + ejection cycles, the mesh may be clogged or the driver damaged." },
      { q: "Can I use a hair dryer to dry my iPhone?", a: "No. Heat damages water-resistant seals and pushes moisture deeper. Cool airflow + speaker-down draining + ejection tones is the safe combo." },
      { q: "What if the mic doesn't work after water?", a: "Record a voice memo and a video (different mics). If playback is faint/muffled, run ejection with mic-area down and let it dry longer. Mics clear slower than speakers." },
    ],
    sections: [
      { heading: "Pool vs toilet vs ocean: does liquid type matter?", body: ["Yes. Fresh tap water dries cleanest. Pool chlorine and ocean salt leave conductive residue that keeps sound dull and corrodes contacts — these need MORE ejection cycles and longer drying. Toilet/sink water adds soap and grime that coat the mesh; a second cleaning pass after full drying usually clears it."] },
      { heading: "When it's more than the speaker", body: ["Screen flicker, won't charge, Face ID fails, or no power = board-level water damage. Ejection only fixes acoustic mesh water. Back up immediately and see Apple. Don't keep running tones on a dying phone."] },
    ],
  },

  "water-eject-shortcut-vs-app": {
    slug: "water-eject-shortcut-vs-app",
    title: "Water Eject Shortcut vs. WaterDrop App: Which Actually Works?",
    shortTitle: "Shortcut vs app",
    description:
      "Siri Water Eject shortcut not working or sounds weak? Comparison of the free 165Hz shortcut vs. the WaterDrop app — AirPods mode, alternating frequencies, meter + tests.",
    keyword: "water eject shortcut vs app",
    readMinutes: 5,
    emoji: "⚡",
    intro: [
      "You searched for the Water Eject shortcut — the free iOS Shortcut that plays a ~165Hz tone and promises to shake water out. It works… sometimes. For light splashes on the main speaker, it's fine.",
      "But if Siri says 'I can't find that', the tone sounds weak, your AirPods are the problem, or the muffle keeps coming back — here's the honest comparison and when to upgrade to a dedicated app.",
    ],
    steps: [
      { title: "Try the shortcut correctly first", detail: "Install from a trusted iCloud link, set volume to 100%, disconnect Bluetooth, run Begin (15 sec) or Touch (manual). Speaker down. If you see droplets, great — wipe and repeat." },
      { title: "Know its limits", detail: "One fixed frequency, one speaker, no measurement, no AirPods/earpiece tuning. Many copies floating online ask for website access or fail on newer iOS. No before/after test." },
      { title: "Upgrade when: AirPods, earpiece, dust, or repeat muffle", detail: "That's exactly what apps are for: alternating sweeps that hit more resonances, dedicated fine-speaker and earpiece programs, vibration assist, and tests that prove improvement." },
    ],
    waterdrop: [
      { title: "Alternating frequencies, not one tone", detail: "WaterDrop cycles low + high patterns so water stuck at different mesh depths gets shaken loose — users report fixing cases where the single-tone shortcut did nothing." },
      { title: "AirPods + earpiece modes included", detail: "The shortcut can't target tiny AirPods drivers or the call earpiece. WaterDrop has programs for each — the #1 reason its reviews mention AirPods saves." },
      { title: "Meter + 15 tests = proof", detail: "Run a sound test before/after and watch the dB meter. No more 'does it sound better or am I imagining it?'" },
    ],
    tips: [
      "Shortcut asking to 'connect to a website'? Deny it — that's analytics, not ejection.",
      "'Hey Siri, water eject' only works if the shortcut is actually installed.",
      "If the shortcut plays through AirPods instead of the phone, disconnect Bluetooth and retry.",
      "Keep the shortcut for emergencies; keep the app for real fixes + maintenance.",
    ],
    faqs: [
      { q: "Is the Water Eject shortcut safe?", a: "The original community shortcut is just a sound — safe. But copycat links exist. Only install from links you trust, deny website-access prompts, and never pay for a 'shortcut' — real apps live on the App Store." },
      { q: "Why is my Water Eject shortcut so quiet?", a: "Volume capped, Bluetooth routing sound to earbuds, or Low Power / Silent mode interfering. Max the volume, disconnect Bluetooth, turn off Silent, and re-run. If still weak, the app's boosted sweep is louder and more consistent." },
      { q: "Do I need both?", a: "No. If the shortcut fixed you in one run, you're done. If not — AirPods involved, earpiece quiet, dust, or muffle returns — get the app. It's free to try." },
    ],
    sections: [
      { heading: "Head-to-head: shortcut vs WaterDrop", body: ["Shortcut: free, instant, one 165Hz tone, main speaker only, no tests, no AirPods mode, setup fiddly, copycats risky. WaterDrop: free program included, alternating sweep + vibration, Speaker + Earpiece + AirPods modes, dust cleaning, free dB meter, 15+ tests, one-tap, App Store vetted, no data collected. For a quick splash, either works. For anything stubborn, the app wins."] },
      { heading: "What about fixmyspeakers.com and YouTube tones?", body: ["Browser tools play a fixed tone through the webpage — same single-frequency limit, plus you must keep the tab open with screen on. YouTube 'water removal' videos are uncalibrated and often compressed. A native app holds the tone steady at max output with vibration — measurably stronger."] },
    ],
  },

  "how-to-clean-iphone-speaker-dust": {
    slug: "how-to-clean-iphone-speaker-dust",
    title: "How to Clean iPhone Speaker Dust & Lint (Fix Low Volume)",
    shortTitle: "Clean speaker dust",
    description:
      "iPhone volume low but no water? It's usually dust and pocket lint. Safe dust-cleaning routine with sound vibration — no toothpicks, no compressed air damage.",
    keyword: "how to clean iphone speaker dust",
    readMinutes: 5,
    emoji: "🧹",
    intro: [
      "No water accident, but your iPhone keeps getting quieter? At max volume music sounds thin, calls are hard to hear, and the speaker looks… fuzzy? That's pocket lint, dust, makeup, and skin oil packed into the grille.",
      "The internet will tell you to jam in a toothpick or blast compressed air. Both can kill the mesh. Sound-vibration cleaning does it safely from the inside out. Here's how.",
    ],
    steps: [
      { title: "Inspect + dry brush", detail: "In bright light, check the bottom speaker slots and earpiece slit. Use a clean, dry soft-bristle brush (or new soft toothbrush) with light outward strokes. No liquids, no sharp tools." },
      { title: "Vibration cleaning cycle", detail: "Max volume, speaker down. Run a dust/vibration cleaning sweep 1–2 minutes — the rapid air pulses loosen packed lint that brushes can't reach. Wipe the grille after." },
      { title: "Test the difference", detail: "Play the same song snippet at the same volume before/after. Check voice clarity on a call. Low-end back + treble crisp = done. Still dull on one side? One slot may be fully impacted — repeat tomorrow." },
    ],
    waterdrop: [
      { title: "Run the dust program", detail: "WaterDrop's frequencies aren't just for water — the vibration modes shake loose lint and grit from the inside, where brushes can't reach." },
      { title: "Confirm with speaker tests", detail: "The 15+ sound tests sweep bass through treble so you hear exactly which range was blocked. Re-test monthly as maintenance." },
      { title: "Make it a habit", detail: "Pocket-carriers: one 60-second maintenance run a month keeps volume from slowly dying. Way cheaper than a speaker replacement." },
    ],
    tips: [
      "Never use needles, SIM pins, or toothpicks — one poke tears the mesh permanently.",
      "Compressed air drives dust DEEPER and can rupture seals. Avoid it.",
      "Sticky tack / putty works for surface lint but not impacted grime — pair it with vibration.",
      "A 'volume low after screen protector install' is usually a covered earpiece — check alignment first.",
    ],
    faqs: [
      { q: "Why is my iPhone speaker suddenly quiet with no water damage?", a: "99% of the time: clogged grille. Lint + oil builds invisibly for months until one day highs vanish. Cleaning restores it instantly — no repair needed." },
      { q: "Can I clean my iPhone speaker with alcohol?", a: "A barely-damp lint-free cloth on the OUTSIDE only. Never drip liquid into the slots — you'll trade dust for water damage." },
      { q: "How often should I clean my iPhone speaker?", a: "Pocket/bag carriers: quick brush monthly + 60-second vibration clean. Construction, beach, gym-goers: bi-weekly. Takes a minute." },
    ],
    sections: [
      { heading: "Signs it's dust, not damage", body: ["Gradual volume loss over weeks, muffled highs but bass okay, visible lint in slots, one side quieter, better after brushing. Sudden total silence, rattling, or distortion at LOW volume = possible blown driver — cleaning won't fix that."] },
      { heading: "The maintenance minute", body: ["Brush 20 seconds, vibration run 60 seconds, sound test 20 seconds. Done. Put a monthly reminder on. Speakers are like teeth — a minute of prevention beats a painful repair."] },
    ],
  },

  "iphone-earpiece-low-volume": {
    slug: "iphone-earpiece-low-volume",
    title: "iPhone Earpiece Low Volume During Calls? Fix It",
    shortTitle: "Earpiece low volume",
    description:
      "Can't hear calls unless on speaker? The earpiece mesh clogs fast. Diagnose in 30 seconds and run the WaterDrop earpiece program + sound tests to restore call clarity.",
    keyword: "iphone earpiece low volume during calls",
    readMinutes: 5,
    emoji: "📞",
    intro: [
      "Speakerphone is loud, but holding the phone to your ear you can barely hear? That's the classic clogged-earpiece pattern. The earpiece slit is tiny, right where skin oil, makeup, and pocket lint collect.",
      "Before you book a repair, run this 30-second diagnosis + earpiece cleaning. Most 'quiet earpiece' cases are a 2-minute fix.",
    ],
    steps: [
      { title: "30-second diagnosis", detail: "Call voicemail. Toggle speakerphone: loud on speaker + quiet on earpiece = clogged earpiece mesh (good news). Quiet on BOTH = volume limit, Bluetooth routing, or iOS issue — check Settings > Sounds and disconnect Bluetooth first." },
      { title: "Clean the slit safely", detail: "Dry soft brush outward across the earpiece slit. Check for screen-protector overlap covering it — misaligned protectors mute calls constantly." },
      { title: "Run earpiece frequencies", detail: "Max call volume, run an earpiece-specific sweep (higher, focused pattern — NOT the big bottom-speaker blast). Retest the same voicemail at the same volume." },
    ],
    waterdrop: [
      { title: "Use Earpiece mode — added in v1.1.3", detail: "WaterDrop added a dedicated earpiece program because the main-speaker tone is wrong for the tiny call speaker. Pick Earpiece, run 1–2 cycles." },
      { title: "Voice-range sound tests", detail: "Run the voice/midrange tests to check call clarity specifically — music bass tests won't tell you about call audio." },
      { title: "dB check for proof", detail: "Hold the meter the same distance during the same test tone before/after. A 3–6dB jump = clearly audible fix." },
    ],
    tips: [
      "Check Settings > Accessibility > Audio/Visual > Phone Noise Cancellation — try toggling it.",
      "Makeup wearers: the earpiece clogs 3× faster. Weekly brush.",
      "After swimming with the phone, run BOTH speaker and earpiece programs — water hits both.",
      "Still quiet after cleaning + no blockage visible? Try Settings > General > Reset > Reset All Settings (keeps data) — rare audio-routing bugs live there.",
    ],
    faqs: [
      { q: "Why can I hear on speaker but not earpiece?", a: "Different speakers. Speakerphone uses the loud bottom speaker; calls to your ear use the tiny earpiece. The earpiece mesh clogs first because it's small and pressed to your skin." },
      { q: "Will water eject fix my earpiece?", a: "If the cause is water or dust in the mesh — yes, with an earpiece-specific frequency. If the earpiece is dead silent (zero sound), that's hardware — see Apple." },
      { q: "Is my earpiece broken or just dirty?", a: "Dirty: gradual fade, muffled but present, visible grime, better after cleaning. Broken: sudden silence, crackling at all volumes, no change after cleaning." },
    ],
    sections: [
      { heading: "The screen-protector trap", body: ["A huge share of 'earpiece low volume' reports trace to a slightly shifted tempered-glass protector covering half the slit. Look closely — if the cutout doesn't perfectly clear the earpiece, reseat or replace the protector before anything else."] },
      { heading: "Call settings that fake a hardware fault", body: ["Bluetooth still connected to car/AirPods routes call audio away. Silent unknown callers, Hearing-aid compatibility toggles, and volume limits also mimic earpiece failure. Disconnect Bluetooth and max the IN-CALL volume (buttons only adjust call volume DURING a call) before concluding it's clogged."] },
    ],
  },

  "decibel-meter-speaker-test": {
    slug: "decibel-meter-speaker-test",
    title: "Decibel Meter & Speaker Test: Prove Your Speaker Is Fixed",
    shortTitle: "Test your speaker",
    description:
      "How to use a decibel meter and 15+ sound tests to check before/after speaker cleaning — verify the water eject worked instead of guessing.",
    keyword: "decibel meter speaker test",
    readMinutes: 5,
    emoji: "📊",
    intro: [
      "You ran water eject. It 'sounds better'… or does it? Ears lie — especially when you WANT the fix to work. That's why WaterDrop bundles a free decibel meter and 15+ sound tests.",
      "This guide shows the 3-minute before/after protocol that proves improvement with numbers, not vibes.",
    ],
    steps: [
      { title: "Baseline: same tone, same distance", detail: "Quiet room. Phone on a table, meter device 30cm away. Play test tone #1 at 80% volume, note the dB reading + how it sounds (tinny? rattly? dull?). Screenshot it." },
      { title: "Clean", detail: "Run the appropriate water-eject or dust program (speaker / earpiece / AirPods). Wipe, rest 1 minute." },
      { title: "Re-test identically", detail: "Same tone, same volume, same 30cm distance. Compare numbers. +3dB = noticeably louder (double the acoustic power). Clearer highs on the sweep = mesh unblocked. Repeat across bass/mid/treble tests." },
    ],
    waterdrop: [
      { title: "Free dB meter included (v1.3.1+)", detail: "Apple's App Store notes confirm: decibel metering is now a free feature — no paywall to verify your fix. Great visual design, per the listing." },
      { title: "15+ sound tests built in", detail: "Sine sweeps, bass, treble, voice range, left/right balance — run the full battery after any water or dust event instead of hunting YouTube test videos." },
      { title: "Troubleshoot like a tech", detail: "Rattle only on bass = loose debris/case. Dead treble = clogged mesh. One side quiet = single-slot blockage. The tests isolate it in seconds." },
    ],
    tips: [
      "Test in the SAME room position — moving 10cm changes dB readings a lot.",
      "Use identical volume both times or the numbers mean nothing.",
      "Normal chat ~60dB, max-volume phone speaker ~85–95dB at 30cm. Way below that = still blocked.",
      "dB meters measure loudness, not clarity — pair numbers with a treble sweep listen.",
    ],
    faqs: [
      { q: "What dB should my iPhone speaker hit?", a: "Roughly 85–95dB at 30cm on max volume for a clean modern iPhone (varies by model and tone). What matters is YOUR before/after delta, not the absolute number — same setup, same tone." },
      { q: "Are phone decibel meters accurate?", a: "Good enough for before/after comparisons (±2–3dB). They're not calibrated lab gear, but they reliably show whether cleaning made you louder. Keep distance and environment identical." },
      { q: "Which test tone finds water damage?", a: "A slow sine sweep from low to high. Water-blocked mesh kills highs first — you'll hear dropouts or dullness in the upper third. After ejection, the sweep should sound smooth throughout." },
    ],
    sections: [
      { heading: "The 3-minute proof protocol", body: ["Pick one voice-range tone + one full sweep. Record dB for each before cleaning. Run ejection. Re-record. Log: dB before → after, plus one-line notes ('treble back', 'left slot still dull'). Two cycles of this beats ten random blasts — you stop when numbers plateau."] },
      { heading: "Beyond water: use tests as early warning", body: ["Run the battery monthly. Slowly falling treble dB = dust building up — clean before it becomes 'suddenly quiet'. Catching it early is a 60-second job; late-stage impaction takes multiple sessions."] },
    ],
  },
};
