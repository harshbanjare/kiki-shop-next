import { shades } from "./shades";

export interface VideoGallery {
  thumbnail: string;
  videoId: string;
  title: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  images: Record<string, string[]>;
  shades: typeof shades;
  details: {
    description: string;
    ingredients: string;
    howToUse: string[];
  };
  sampleUrl: string;
  videos?: VideoGallery[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "UNAPOLOGETIC Lasting Finish Foundation",
    description:
      "Long Days, Late Nights, Fresh Finish: Unapologetic Foundation",
    shortDescription:
      "12 shades of lightweight, 16-hour wear with SPF protection, moisture-lock, and sweat-resistant technology—crafted to celebrate every dusky skin tone.",
    price: 799,
    originalPrice: 1199,
    images: {
      Feisty: [
        "/assets/Foundation/Feisty/Copy of Copy of Productpage-Foundation-6.png",
        "/assets/Foundation/Feisty/Copy of Productpage-Foundation-2.jpg",
        "/assets/Foundation/Feisty/Copy of Productpage-Foundation-3.jpg",
        "/assets/Foundation/Feisty/Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Feisty/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],

      Fierce: [
        "/assets/Foundation/Fierce/Copy of Copy of Productpage-Foundation-7..png",
        "/assets/Foundation/Fierce/Copy of Productpage-Foundation-2.jpg",
        "/assets/Foundation/Fierce/Copy of Productpage-Foundation-3.jpg",
        "/assets/Foundation/Fierce/Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Fierce/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],

      Mystique: [
        "/assets/Foundation/Mystique/Copy of Copy of Productpage-Foundation-9.png",
        "/assets/Foundation/Fierce/Copy of Productpage-Foundation-2.jpg",
        "/assets/Foundation/Mystique/Copy of Productpage-Foundation-3.jpg",
        "/assets/Foundation/Mystique/Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Mystique/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],
      Fearless: [
        "/assets/Foundation/Fearless/Copy of Copy of Productpage-Foundation-5.png",
        "/assets/Foundation/Fearless/Copy of Productpage-Foundation-2.jpg",
        "/assets/Foundation/Fearless/Copy of Productpage-Foundation-3.jpg",
        "/assets/Foundation/Fearless/Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Fearless/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],

      Electric: [
        "/assets/Foundation/Electric/Copy of Copy of Productpage-Foundation-2.png",
        "/assets/Foundation/Electric/Copy of Productpage-Foundation-2.jpg",
        "/assets/Foundation/Electric/Copy of Productpage-Foundation-3.jpg",
        "/assets/Foundation/Electric/Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Electric/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],
      Majestic: [
        "/assets/Foundation/Majestic/Copy of Copy of Productpage-Foundation-8.png",
        "/assets/Foundation/Majestic/Copy of Productpage-Foundation-2.jpg",
        "/assets/Foundation/Majestic/Copy of Productpage-Foundation-3.jpg",
        "/assets/Foundation/Majestic/Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Majestic/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],
      Celestial: [
        "/assets/Foundation/Celestial/Copy of Copy of Productpage-Foundation-1.png",
        "/assets/Foundation/Celestial/Copy of Productpage-Foundation-2.jpg",
        "/assets/Foundation/Celestial/Copy of Productpage-Foundation-3.jpg",
        "/assets/Foundation/Celestial/Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Celestial/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],
      Stellar: [
        "/assets/Foundation/Stellar/Copy of Copy of Productpage-Foundation-11.png",
        "/assets/Foundation/Stellar/Productpage-Foundation-2.jpg",
        "/assets/Foundation/Stellar/Productpage-Foundation-3.jpg",
        "/assets/Foundation/Stellar/Productpage-Foundation-4.png",
        "/assets/Foundation/Stellar/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],
      Unstoppable: [
        "/assets/Foundation/Unstoppable/Copy of Copy of Productpage-Foundation-12.png",
        "/assets/Foundation/Unstoppable/Productpage-Foundation-2.jpg",
        "/assets/Foundation/Unstoppable/Productpage-Foundation-3.jpg",
        "/assets/Foundation/Unstoppable/Productpage-Foundation-4.png",
        "/assets/Foundation/Unstoppable/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],
      Empress: [
        "/assets/Foundation/Empress/Copy of Copy of Productpage-Foundation-3.png",
        "/assets/Foundation/Empress/Copy of Productpage-Foundation-2.jpg",
        "/assets/Foundation/Empress/Copy of Productpage-Foundation-3.jpg",
        "/assets/Foundation/Empress/Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Empress/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],
      Savage: [
        "/assets/Foundation/Savage/Copy of Copy of Productpage-Foundation-10.png",
        "/assets/Foundation/Fierce/Copy of Productpage-Foundation-2.jpg",
        "/assets/Foundation/Savage/Copy of Productpage-Foundation-3.jpg",
        "/assets/Foundation/Savage/Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Savage/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],
      Enigma: [
        "/assets/Foundation/Enigma/Copy of Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Fierce/Copy of Productpage-Foundation-2.jpg",
        "/assets/Foundation/Enigma/Copy of Productpage-Foundation-3.jpg",
        "/assets/Foundation/Enigma/Copy of Productpage-Foundation-4.png",
        "/assets/Foundation/Enigma/Before-After.png",
        "/assets/videos/Foundation-Video.mp4",
      ],
    },
    shades: shades,
    details: {
      description: `
                <div class="space-y-8">
                  <h2 class="text-xl font-bold">Long Days, Late Nights, Fresh Finish: Unapologetic Foundation</h2>
                  
                  <div>
                    <h3 class="text-lg font-semibold mb-3">Straight Up:</h3>
                    <p>
                      Embrace confidence with Unapologetic, the foundation crafted for dusky skin with 12 perfectly matched shades. 
                      Enjoy up to 16 hours of breathable, lightweight coverage with added sun protection, moisturizing care, and 
                      sweat resistance. From a natural glow to a buildable flawless finish, Unapologetic ensures your skin stays 
                      fresh, radiant, and unapologetically you.
                    </p>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold mb-3">The Lowdown:</h3>
                    <ul class="list-disc pl-5 space-y-2">
                      <li>Longwear, shine-free, soft matte finish</li>
                      <li>Light as air and undetectable on skin so you always look like you</li>
                      <li>All day comfortable wear</li>
                      <li>Medium to Full Buildable Coverage</li>
                      <li>Instantly smooths and diffuses the look of pores</li>
                      <li>Perfect for all skin types</li>
                      <li>Non Comedogenic</li>
                      <li>Engineered with advanced 16-hour breathable wear, SPF protection, sweat-resistant polymers, and moisture-lock technology to maintain a natural, hydrated finish under all conditions.</li>
                      <li>Available in 12 shades</li>
                    </ul>
                  </div>

                  <p class="italic">
                    Whether you're embracing a subtle everyday glow or building up for a night out, this foundation has you covered. 
                    Unapologetic is more than just makeup—it's a celebration of your skin, empowering you to shine unapologetically.
                  </p>
                  
                
                  

                </div>
            `,
      ingredients: `
                <div class="space-y-6">
                    <h3 class="text-lg font-semibold">Nature's Finest For Your Skin</h3>
                    
                    <p class="text-gray-600">
                        Our products are formulated using raw, food grade, organic, wildcrafted, and natural ingredients. 
                        We are also in constant pursuit of new technologies to set the bar even higher to provide even 
                        greater efficacy, innovation, and overall wellness.
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                            <div class="aspect-square rounded-lg overflow-hidden mb-4">
                                <img 
                                    src="/assets/p1-ing1.webp" 
                                    alt="Hyaluronic Acid" 
                                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span class="block text-center font-medium text-gray-800">Hyaluronic Acid</span>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                            <div class="aspect-square rounded-lg overflow-hidden mb-4">
                                <img 
                                    src="/assets/p1-ing2.jpg" 
                                    alt="Pomegranate Seed Oil" 
                                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span class="block text-center font-medium text-gray-800">Pomegranate Seed Oil</span>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                            <div class="aspect-square rounded-lg overflow-hidden mb-4">
                                <img 
                                    src="/assets/p1-ing3.png" 
                                    alt="Avocado Butter" 
                                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span class="block text-center font-medium text-gray-800">Avocado Butter</span>
                        </div>
                    </div>

                    <div class="mt-4">
                        <button 
                            class="text-sm text-gray-600 underline cursor-pointer hover:text-gray-800"
                            onclick="document.getElementById('ingredientsList').classList.toggle('hidden')"
                        >
                            View Full Ingredients List
                        </button>
                        
                        <div id="ingredientsList" class="hidden mt-2 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                            AQUA/WATER/EAU, DIMETHICONE, TALC, PEG-10 DIMETHICONE, TRIMETHYLSILOXYSILICATE, 
                            POLYPROPYLENE, ISODODECANE, CETYL PEG/PPG-10/1 DIMETHICONE, NYLON-12, 
                            HDI/TRIMETHYLOL HEXYLLACTONE CROSSPOLYMER, PHENOXYETHANOL, SODIUM CHLORIDE, 
                            HYDROGEN DIMETHICONE, GLYCERIN, MAGNESIUM SULFATE, SODIUM DEHYDROACETATE, 
                            DISTEARDIMONIUM HECTORITE, ALUMINUM HYDROXIDE, METHICONE, BENZOIC ACID, 
                            DEHYDROACETIC ACID, PROPYLENE CARBONATE, ETHYLHEXYLGLYCERIN, PARFUM/FRAGRANCE, 
                            SILICA, BIOSACCHARIDE GUM-4, PENTAERYTHRITYL TETRA-DI-T-BUTYL HYDROXYHYDROCINNAMATE, 
                            ANANAS SATIVUS (PINEAPPLE) FRUIT EXTRACT, CARICA PAPAYA (PAPAYA) FRUIT EXTRACT, 
                            PAULLINIA CUPANA SEED EXTRACT, POTASSIUM SORBATE, TOCOPHEROL, SORBIC ACID. 
                            MAY CONTAIN/PEUT CONTENIR (+/-): TITANIUM DIOXIDE (CI 77891), 
                            IRON OXIDES (CI 77491, CI 77492, CI 77499).
                        </div>
                    </div>
                </div>
            `,
      howToUse: [
        "Ace a lumi-matte base in 3 simple steps",
        "Step 1: Moisturize well and use a Dewy Primer",
        "Step 2: Take a few drops of the KiKi Unapologetic Lasting Finish Foundation and dot it all over your face and neck.",
        "Step 3: Blend this lightweight yet buildable to full coverage foundation using your fingertips, brush or a beauty blender for a luminous matte look.",
      ],
    },
    sampleUrl: "/sample/foundation.mp4",
    videos: [
      {
        videoId: "thR-EIv748A",
        thumbnail: "https://i.ytimg.com/vi/thR-EIv748A/maxresdefault.jpg",
        title:
          "How to Apply Foundation for Perfect Coverage | Professional Makeup Tutorial",
      },
      {
        videoId: "L7loJHLdQSI",
        thumbnail: "https://i.ytimg.com/vi/L7loJHLdQSI/maxresdefault.jpg",
        title: "Natural Everyday Foundation Routine | Makeup Tips & Tricks",
      },
      {
        videoId: "L3mcbH2jPRk",
        thumbnail: "https://i.ytimg.com/vi/L3mcbH2jPRk/maxresdefault.jpg",
        title: "Foundation Tips for Beginners | Step by Step Tutorial",
      },
    ],
  },
  {
    id: 2,
    name: "Fade and Flaunt Unfiltered Concealer",
    description:
      "INSTANT PHOTO-SOFT COVERAGE FOR ALL. LONGWEAR, LIGHT AS AIR, CREASE PROOF.",
    shortDescription:
      "Whether you're covering up last night's stories or today's dark circles, this buildable concealer is your secret weapon for a natural, unfiltered look that lasts all day.",
    price: 699,
    originalPrice: 799,
    images: {
      Feisty: [
        "/assets/Concealer/Feisty/Copy of Copy of Productpage-Concealer-6.png",
        "/assets/Concealer/Feisty/Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Feisty/Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Feisty/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],

      Fierce: [
        "/assets/Concealer/Fierce/Copy of Copy of Productpage-Concealer-7.png",
        "/assets/Concealer/Fierce/Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Fierce/Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Fierce/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
      Mystique: [
        "/assets/Concealer/Mystique/Copy of Copy of Productpage-Concealer-9.png",
        "/assets/Concealer/Mystique/Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Mystique/Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Mystique/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
      Fearless: [
        "/assets/Concealer/Fearless/Copy of Copy of Productpage-Concealer-5.png",
        "/assets/Concealer/Fearless/Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Fearless/Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Fearless/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
      Electric: [
        "/assets/Concealer/Electric/Copy of Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Electric/Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Electric/Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Electric/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
      Majestic: [
        "/assets/Concealer/Majestic/Copy of Copy of Productpage-Concealer-8.png",
        "/assets/Concealer/Majestic/Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Majestic/Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Majestic/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
      Celestial: [
        "/assets/Concealer/Celestial/Copy of Copy of Productpage-Concealer-1.png",
        "/assets/Concealer/Celestial/Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Celestial/Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Celestial/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
      Stellar: [
        "/assets/Concealer/Stellar/Copy of Copy of Productpage-Concealer-11.png",
        "/assets/Concealer/Stellar/2.png",
        "/assets/Concealer/Stellar/3.png",
        "/assets/Concealer/Stellar/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
      Unstoppable: [
        "/assets/Concealer/Unstoppable/Copy of Copy of Productpage-Concealer-12.png",
        "/assets/Concealer/Unstoppable/2.png",
        "/assets/Concealer/Unstoppable/3.png",
        "/assets/Concealer/Unstoppable/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
      Empress: [
        "/assets/Concealer/Empress/Copy of Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Empress/Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Empress/Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Empress/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
      Savage: [
        "/assets/Concealer/Savage/Copy of Copy of Productpage-Concealer-10.png",
        "/assets/Concealer/Savage/Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Savage/Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Savage/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
      Enigma: [
        "/assets/Concealer/Enigma/Copy of Copy of Productpage-Concealer-4.png",
        "/assets/Concealer/Enigma/Copy of Productpage-Concealer-2.png",
        "/assets/Concealer/Enigma/Copy of Productpage-Concealer-3.png",
        "/assets/Concealer/Enigma/Before-After.png",
        "/assets/videos/Concealer-Video.mp4",
      ],
    },
    shades: shades,
    details: {
      description: `
                <div class="space-y-6">
                    <h2 class="text-xl font-bold">INSTANT PHOTO-SOFT COVERAGE FOR ALL. LONGWEAR, LIGHT AS AIR, CREASE PROOF.</h2>
                    
                    <div>
                        <h3 class="text-lg font-semibold mb-3">Straight Up:</h3>
                        <div class="space-y-4">
                            <p class="text-gray-600">
                                Whether you're covering up last night's stories or today's dark circles, Fade and Flaunt Unfiltered 
                                Concealer has you covered—literally. This buildable, medium-to-full coverage concealer is your secret 
                                weapon for brightening under-eyes, blurring blemishes, and vanishing dark spots. Lightweight yet 
                                powerful, it's designed to give you that natural, unfiltered look while staying true to your skin.
                            </p>
                            
                            <p class="text-gray-600">
                                Our creamy, breathable formula blends seamlessly, offering a smooth, soft-matte finish that lasts all 
                                day—no creasing, no caking, no compromises. Sweat-resistant and long-wearing, Fade and Flaunt keeps 
                                up with your wildest nights and busiest days, leaving you looking fresh no matter how late you stay out.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold mb-3">The Lowdown:</h3>
                        <ul class="list-disc pl-5 space-y-2">
                            <li class="text-gray-600">
                                Easily buildable formula that blurs blemishes, brightens under-eyes, and fades dark spots while 
                                staying true to your skin.
                            </li>
                            <li class="text-gray-600">
                                Creamy texture blends seamlessly, offering a natural, unfiltered look without creasing or caking.
                            </li>
                            <li class="text-gray-600">
                                Keeps you looking fresh and flawless from sunrise to last call—no touch-ups needed.
                            </li>
                            <li class="text-gray-600">
                                Effortlessly spot-conceal, contour, or highlight with a flexible applicator that puts you in control.
                            </li>
                            <li class="text-gray-600">
                                Vegan, cruelty-free, and paraben-free—because you deserve coverage that's as kind as it is effective.
                            </li>
                        </ul>
                    </div>

                  
                </div>
            `,
      ingredients: `
                <div class="space-y-6">
                    <h3 class="text-lg font-semibold">Nature's Finest For Your Skin</h3>
                    
                    <p class="text-gray-600">
                        Our products are formulated using raw, food grade, organic, wildcrafted, and natural ingredients. 
                        We are also in constant pursuit of new technologies to set the bar even higher to provide even 
                        greater efficacy, innovation, and overall wellness.
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                            <div class="aspect-square rounded-lg overflow-hidden mb-4">
                                <img 
                                    src="/assets/p2-ing1.jpg" 
                                    alt="Sweet Almond Oil" 
                                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span class="block text-center font-medium text-gray-800">Sweet Almond Oil</span>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                            <div class="aspect-square rounded-lg overflow-hidden mb-4">
                                <img 
                                    src="/assets/p2-ing2.avif" 
                                    alt="Liquorice" 
                                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span class="block text-center font-medium text-gray-800">Liquorice</span>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                            <div class="aspect-square rounded-lg overflow-hidden mb-4">
                                <img 
                                    src="/assets/p2-ing3.jpg" 
                                    alt="Cica" 
                                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span class="block text-center font-medium text-gray-800">Cica</span>
                        </div>
                    </div>

                    <div class="mt-4">
                        <button 
                            class="text-sm text-gray-600 underline cursor-pointer hover:text-gray-800"
                            onclick="document.getElementById('ingredientsList').classList.toggle('hidden')"
                        >
                            See Full Ingredients
                        </button>
                        
                        <div id="ingredientsList" class="hidden mt-2 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                            AQUA/WATER/EAU, HYDROGENATED DIDECENE, HYDROGENATED POLYISOBUTENE, TRIMETHYLSILOXYSILICATE, 
                            CETYL PEG/PPG-10/1 DIMETHICONE, GLYCERIN, NYLON-12, DIMETHICONE, DISTEARDIMONIUM HECTORITE, 
                            ACRYLATES/POLYTRIMETHYLSILOXYMETHACRYLATE COPOLYMER, METHICONE, SODIUM CHLORIDE, 
                            POLYMETHYLSILSESQUIOXANE, HYDROGENATED STYRENE/ISOPRENE COPOLYMER, HYDROXYACETOPHENONE, 
                            LAURYL PEG-8 DIMETHICONE, HDI/TRIMETHYLOL HEXYLLACTONE CROSSPOLYMER, 1,2-HEXANEDIOL, 
                            CAPRYLYL GLYCOL, TOCOPHERYL ACETATE, TRISODIUM ETHYLENEDIAMINE DISUCCINATE, TALC, 
                            LAUROYL LYSINE, COMBRETUM FRUTICOSUM FLOWER NECTAR, ALCOHOL, BUTYLENE GLYCOL, 
                            PENTAERYTHRITYL TETRA-DI-T-BUTYL HYDROXYHYDROCINNAMATE, CENTELLA ASIATICA LEAF EXTRACT, 
                            CAMELLIA SINENSIS LEAF EXTRACT. MAY CONTAIN/PEUT CONTENIR (+/-): TITANIUM DIOXIDE (CI 77891), 
                            IRON OXIDES (CI 77491, CI 77492, CI 77499).
                        </div>
                    </div>
                </div>
            `,
      howToUse: [
        "Perfect your concealer application in two simple steps",
        "Step 1: Using the tapered tip, swipe from inner corners diagonally to just beyond under eyes to disguise dark circles or dot onto small imperfections and gently tap to blend.",
        "Step 2: Layer over Corrector to disguise stubborn dark circles. Swipe the central reservoir side on redness or any unevenness, then use a finger to seamlessly blend out",
      ],
    },
    sampleUrl: "/sample/concealer.mp4",
    videos: [
      {
        videoId: "thR-EIv748A",
        thumbnail: "https://i.ytimg.com/vi/thR-EIv748A/maxresdefault.jpg",
        title:
          "How to Apply Foundation for Perfect Coverage | Professional Makeup Tutorial",
      },
      {
        videoId: "L7loJHLdQSI",
        thumbnail: "https://i.ytimg.com/vi/L7loJHLdQSI/maxresdefault.jpg",
        title: "Natural Everyday Foundation Routine | Makeup Tips & Tricks",
      },
      {
        videoId: "L3mcbH2jPRk",
        thumbnail: "https://i.ytimg.com/vi/L3mcbH2jPRk/maxresdefault.jpg",
        title: "Foundation Tips for Beginners | Step by Step Tutorial",
      },
    ],
  },
];
