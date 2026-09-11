export const SITE_URL = "https://waterdrop-speaker-cleaner.com";
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/water-eject-airpods-waterdrop/id6449911513";

export const APP_META = {
  name: "WaterDrop — Water Eject & Speaker Cleaner",
  rating: "4.3",
  ratingCount: "97",
  price: "Free",
};

export type GuideCard = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keyword: string;
  readMinutes: number;
  emoji: string;
};

export const GUIDES: GuideCard[] = [
  {
    slug: "how-to-get-water-out-of-airpods",
    title: "How to Get Water Out of AirPods: Water Eject Fix That Works (2026)",
    shortTitle: "Water in AirPods fix",
    description:
      "Water in your AirPods? Squeaky, muffled, or one side quiet after rain, sweat, or a full wash cycle? The exact water-eject routine owners used to save $250 replacements — Pro, 3rd/4th gen & Max.",
    keyword: "how to get water out of airpods",
    readMinutes: 9,
    emoji: "🎧",
  },
  {
    slug: "can-airpods-survive-washing-machine",
    title: "Can AirPods Survive the Washing Machine? Honest Odds + Rescue Plan",
    shortTitle: "Washed AirPods survival",
    description:
      "Just washed your AirPods? Don't panic — many survive. Realistic survival odds by model, the dryer mistake that kills them, and the rescue plan that saved $250 AirPods Pro.",
    keyword: "can airpods survive washing machine",
    readMinutes: 6,
    emoji: "🌀",
  },
  {
    slug: "airpods-one-side-quiet-after-water",
    title: "One AirPod Quieter Than the Other After Water? Fix It",
    shortTitle: "One AirPod quiet",
    description:
      "Left AirPod whisper-quiet after getting wet while the right is fine? Why water hits one bud harder, how to check balance vs. blockage, and the per-bud eject routine that evens them out.",
    keyword: "one airpod quieter than the other after water",
    readMinutes: 5,
    emoji: "🔉",
  },
  {
    slug: "airpods-crackling-static-after-water",
    title: "AirPods Crackling or Static After Getting Wet? Causes + Fix",
    shortTitle: "AirPods crackling",
    description:
      "AirPods crackling, popping, or static after water exposure? What that distortion means for the driver and ANC mics, settings to calm it down, and the drying + eject fix.",
    keyword: "airpods crackling after water",
    readMinutes: 6,
    emoji: "⚡",
  },
  {
    slug: "how-to-get-water-out-of-iphone-speaker",
    title: "How to Get Water Out of iPhone Speaker (60-Second Fix)",
    shortTitle: "Water in iPhone speaker",
    description:
      "iPhone speaker muffled after water? Skip the rice. Do this 60-second water eject routine with max volume, speaker-down position, and WaterDrop frequencies to push droplets out.",
    keyword: "how to get water out of iphone speaker",
    readMinutes: 6,
    emoji: "💧",
  },
  {
    slug: "dropped-iphone-in-water-speaker-muffled",
    title: "Dropped iPhone in Water? Fix Muffled Speaker Fast",
    shortTitle: "Dropped iPhone in water",
    description:
      "Dropped your iPhone in the pool, sink, or toilet and the speaker sounds underwater? Emergency checklist: what to do in the first 5 minutes plus the water-eject cycle that restores clarity.",
    keyword: "dropped iphone in water speaker muffled",
    readMinutes: 6,
    emoji: "🆘",
  },
  {
    slug: "water-eject-shortcut-vs-app",
    title: "Water Eject Shortcut vs. WaterDrop App: Which Actually Works?",
    shortTitle: "Shortcut vs app",
    description:
      "Siri Water Eject shortcut not working or sounds weak? Comparison of the free 165Hz shortcut vs. the WaterDrop app — AirPods mode, alternating frequencies, meter + tests.",
    keyword: "water eject shortcut vs app",
    readMinutes: 5,
    emoji: "📲",
  },
  {
    slug: "how-to-clean-iphone-speaker-dust",
    title: "How to Clean iPhone Speaker Dust & Lint (Fix Low Volume)",
    shortTitle: "Clean speaker dust",
    description:
      "iPhone volume low but no water? It's usually dust and pocket lint. Safe dust-cleaning routine with sound vibration — no toothpicks, no compressed air damage.",
    keyword: "how to clean iphone speaker dust",
    readMinutes: 5,
    emoji: "🧹",
  },
  {
    slug: "iphone-earpiece-low-volume",
    title: "iPhone Earpiece Low Volume During Calls? Fix It",
    shortTitle: "Earpiece low volume",
    description:
      "Can't hear calls unless on speaker? The earpiece mesh clogs fast. Diagnose in 30 seconds and run the WaterDrop earpiece program + sound tests to restore call clarity.",
    keyword: "iphone earpiece low volume during calls",
    readMinutes: 5,
    emoji: "📞",
  },
  {
    slug: "decibel-meter-speaker-test",
    title: "Decibel Meter & Speaker Test: Prove Your Speaker Is Fixed",
    shortTitle: "Test your speaker",
    description:
      "How to use a decibel meter and 15+ sound tests to check before/after speaker cleaning — verify the water eject worked instead of guessing.",
    keyword: "decibel meter speaker test",
    readMinutes: 5,
    emoji: "📊",
  },
];

export type Faq = {
  q: string;
  a: string;
  slug: string;
};

export const FAQS: Faq[] = [
  {
    q: "How do I get water out of my iPhone speaker fast?",
    a: "Turn volume to max, place the iPhone speaker-side down, and run a low-frequency water-eject tone for 60 seconds. Repeat 2–3 times, then let it air-dry. WaterDrop automates this with alternating frequencies plus vibration.",
    slug: "how-to-get-water-out-of-iphone-speaker",
  },
  {
    q: "I washed my AirPods — can an app really fix them?",
    a: "Yes, if there's no board-level damage. Users report fixing washed AirPods Pro by running the AirPods water-eject program, then drying outside the case overnight. The key is the fine-speaker frequency, not the standard iPhone tone.",
    slug: "how-to-get-water-out-of-airpods",
  },
  {
    q: "Can AirPods survive the washing machine?",
    a: "Surprisingly often, yes — if you skip the dryer and act fast. Shake them out, dry the contacts, run an AirPods water-eject program, then dry overnight outside the case. Heat from a dryer is what usually kills them, not the wash itself.",
    slug: "can-airpods-survive-washing-machine",
  },
  {
    q: "Why is one AirPod quieter than the other after water?",
    a: "Water rarely hits both buds evenly — one mesh stays wetter and sounds muffled. Check Settings > Accessibility > Audio Balance first, then run a per-bud water-eject cycle on the quiet side and compare with a left/right sound test.",
    slug: "airpods-one-side-quiet-after-water",
  },
  {
    q: "Why does my iPhone speaker sound muffled after water?",
    a: "Water clings to the speaker mesh and weighs down the diaphragm, so highs vanish and everything sounds underwater. Ejection tones shake droplets out of the mesh — muffled sound usually clears within a few cycles.",
    slug: "dropped-iphone-in-water-speaker-muffled",
  },
  {
    q: "Is the Siri Water Eject shortcut enough?",
    a: "The free shortcut plays a single ~165Hz tone and helps for light splashes. For AirPods, earpiece, heavy exposure, or dust, a dedicated app with alternating frequencies, intensity levels, and before/after tests works far better.",
    slug: "water-eject-shortcut-vs-app",
  },
  {
    q: "How do I clean dust out of my iPhone speaker safely?",
    a: "Never jam in toothpicks or blast compressed air. Use sound-vibration cleaning at max volume with the grille facing down, then wipe with a soft brush. Run a speaker test after to confirm volume is back.",
    slug: "how-to-clean-iphone-speaker-dust",
  },
  {
    q: "Why is my iPhone earpiece so quiet on calls?",
    a: "The earpiece slit traps skin oils, makeup, and lint. Run an earpiece-specific frequency, test with a voice-range tone, and check Call Audio Routing. If speakerphone is loud but earpiece isn't, it's a clogged mesh — not a dead speaker.",
    slug: "iphone-earpiece-low-volume",
  },
  {
    q: "How do I test if my speaker is actually fixed?",
    a: "Play the same test tone before and after cleaning at identical volume, and check the decibel meter reading from 30cm away. WaterDrop includes 15+ sound tests plus a free dB meter so you can prove improvement instead of guessing.",
    slug: "decibel-meter-speaker-test",
  },
  {
    q: "Will water eject damage my speakers?",
    a: "No — ejection tones stay within normal operating range and run for short bursts. It's far safer than rice dust, heat from a hair dryer, or poking the mesh. Stop if you hear rattling from a loose case or screen protector.",
    slug: "how-to-get-water-out-of-iphone-speaker",
  },
];
