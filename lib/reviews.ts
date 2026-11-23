export const RATING_VALUE = "4.3";
export const RATING_COUNT = "100";

export type Review = {
  name: string;
  title: string;
  quote: string;
  date: string;
  developerResponse?: string;
};

/**
 * Quoted verbatim from the App Store listing
 * (https://apps.apple.com/us/app/water-eject-airpods-waterdrop/id6449911513),
 * most recent first. Only line breaks added for readability where the
 * original review used them.
 */
export const REVIEWS: Review[] = [
  {
    name: "HANNNAHHH",
    title: "Lifesaver for my AirPods",
    quote:
      "Thank you so much, I was so skeptical but this worked after my AirPods Pro were in water for hours. I let the app play for about an hour and let them dry outside of the case overnight and they are as good as new today. ♥️🙏🏻♥️",
    date: "Feb 1, 2026",
  },
  {
    name: "NikiD81",
    title: "Works like a charm!",
    quote:
      "Like a couple others, I accidentally washed my AirPods. They were squealing every time I’d put them close to my ears. So I downloaded this app, and ran the water eject for the AirPods just one time, and it worked! The AirPods are back to normal.",
    date: "05/30/2025",
    developerResponse:
      "Thank you very much, I'm glad your AirPods are well-off and better now!",
  },
  {
    name: "Jaybakonit",
    title: "Perfect",
    quote:
      "This actually works really good i dropped my AirPods in water like everyone else here and works perfectly fine after this app",
    date: "12/10/2025",
  },
  {
    name: "Devikamohan",
    title: "This app saved my AirPods and saved me 250 dollars",
    quote:
      "I put my AirPods on washer by mistake and the voice was noisy and high pitched after that.\n\nI tried silica gel and putting in rice for a day.\n\nIt didn’t really help.\n\nWas still squeaky.\n\nI tried a couple other water eject apps too that also didn’t help much.\n\nBut I used this app and it had the AirPods option.\n\nWorked like a charm.\n\nMy AirPods are back to normal now. I love this.",
    date: "08/16/2024",
  },
  {
    name: "Marrie Nova",
    title: "Game changer",
    quote:
      "I got my AirPods wet after a run on a rainy day. This app was the perfect solution.\n\nIt quickly and effectively removed the water from my AirPods with just a few taps.\n\nSimply a lifesaver - love it.",
    date: "03/12/2025",
  },
  {
    name: "Itravel2much",
    title: "Great app!",
    quote:
      "My Airpods are a lot better, dropped them in water and the sound was weird. The app did help glad about it!",
    date: "03/12/2025",
  },
];
