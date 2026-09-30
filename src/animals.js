// =====================================================
// FIELD GUIDE: 30 species, one unlocks at every level.
// Status = IUCN Red List category unless noted. Population numbers are the
// latest published estimates as of 2025–2026 and will change over time.
// Each species has 2 quiz questions for the Daily Field Quiz (a = correct index).
// =====================================================

export const SANCTUARY = [
  {
    id: 'loggerhead', level: 1, emoji: '🐢', name: 'Loggerhead Sea Turtle', sci: 'Caretta caretta',
    group: 'Reptile · Cheloniidae (hard-shelled sea turtles)', status: 'Vulnerable',
    range: 'Temperate and tropical oceans worldwide', habitat: 'Open ocean, reefs and bays; nests on sandy beaches',
    diet: 'Crabs, whelks, conchs and other hard-shelled prey', size: 'Shell about 3 ft; usually 175–350 lb',
    population: 'About 90% of U.S. loggerhead nesting happens in Florida.',
    adaptations: [
      'Huge head and jaw muscles crush shells that other turtles can\'t open.',
      'Hatchlings read Earth\'s magnetic field like a map, and adult females return to nest near the beach where they hatched.',
    ],
    ecology: 'Crunching shellfish recycles nutrients, and their shells carry dozens of hitchhiking species (barnacles, algae, crabs).',
    threats: 'Getting caught in fishing gear, beach lights that confuse hatchlings, plastic pollution, and nesting beaches lost to development.',
    helping: 'Turtle Excluder Devices (TEDs) let turtles escape shrimp nets; "lights out" rules on nesting beaches; volunteer nest patrols.',
    facts: [
      'Sex is set by sand temperature: warmer nests produce mostly females. Rising temperatures are tipping some beaches toward almost all females.',
      'Young loggerheads ride the North Atlantic Gyre for years — the "lost years" — before settling near the coast.',
    ],
    quiz: [
      { q: 'What decides whether a loggerhead hatchling is male or female?', o: ['Sand temperature during incubation', 'The order the eggs were laid', 'The mother\'s age'], a: 0, why: 'Warmer sand makes mostly females; cooler sand makes mostly males.' },
      { q: 'What device lets sea turtles escape shrimp-trawling nets?', o: ['A TED (Turtle Excluder Device)', 'A pinger', 'A drift buoy'], a: 0, why: 'TEDs are escape hatches built into trawl nets.' },
    ],
  },
  {
    id: 'baldeagle', level: 2, emoji: '🦅', name: 'Bald Eagle', sci: 'Haliaeetus leucocephalus',
    group: 'Bird · Accipitridae (hawks & eagles)', status: 'Least Concern',
    range: 'North America, from Alaska to northern Mexico', habitat: 'Near lakes, rivers and coasts with tall trees',
    diet: 'Mostly fish; also waterbirds and carrion — and food stolen from ospreys', size: 'Wingspan 6–7.5 ft; females are larger than males',
    population: 'Removed from the U.S. endangered list in 2007 after one of the biggest comebacks in American conservation.',
    adaptations: [
      'Eyesight several times sharper than a human\'s for spotting fish from high above.',
      'Rough, spiky pads on the feet (spicules) grip slippery fish.',
    ],
    ecology: 'As top predators and scavengers, they clean up dead fish and keep waterbird populations healthy.',
    threats: 'Historically DDT poisoning and shooting; today lead poisoning, power lines and habitat loss.',
    helping: 'The U.S. banned DDT in 1972, and the Bald and Golden Eagle Protection Act still protects them today.',
    facts: [
      'DDT made eggshells so thin that they cracked under the parents\' weight.',
      'The largest bird nest ever recorded was a bald eagle nest in St. Petersburg, Florida — about 9.5 ft wide, 20 ft deep and roughly 2 tons.',
      'Young eagles are mottled brown and don\'t get the white head until about age 4–5.',
    ],
    quiz: [
      { q: 'Which pesticide nearly wiped out bald eagles by thinning their eggshells?', o: ['DDT', 'Roundup', 'Neem oil'], a: 0, why: 'DDT built up in fish and made eggshells thin and fragile.' },
      { q: 'In what year were bald eagles removed from the U.S. endangered species list?', o: ['2007', '1972', '1995'], a: 0, why: 'They were delisted in 2007; 1972 was the year DDT was banned.' },
    ],
  },
  {
    id: 'alligator', level: 3, emoji: '🐊', name: 'American Alligator', sci: 'Alligator mississippiensis',
    group: 'Reptile · Alligatoridae', status: 'Least Concern',
    range: 'Southeastern U.S., from North Carolina to Texas', habitat: 'Freshwater swamps, marshes, lakes and rivers',
    diet: 'Fish, turtles, birds, mammals — almost anything it can catch', size: 'Males often 11–15 ft; up to about 1,000 lb',
    population: 'Listed as endangered in 1967 and declared fully recovered in 1987.',
    adaptations: [
      'A see-through third eyelid (nictitating membrane) protects the eyes underwater.',
      'In freezing weather they can poke their snouts through ice to keep breathing — the "icing response".',
    ],
    ecology: 'A keystone species: in droughts they dig "gator holes" that hold water for fish, birds and other animals.',
    threats: 'Habitat loss and conflict with people as Florida grows.',
    helping: 'Hunting limits and legal protection let them recover; they\'re a classic Endangered Species Act success story.',
    facts: [
      'Nest temperature decides sex: hotter nests produce mostly males, cooler nests mostly females.',
      'Mothers build nests from rotting plants that heat the eggs like compost, then carry hatchlings to the water in their mouths.',
      'They replace teeth throughout life — possibly 2,000 or more over a lifetime.',
    ],
    quiz: [
      { q: 'Why are alligators called a keystone species in the Everglades?', o: ['Their "gator holes" hold water for other animals during droughts', 'They pollinate swamp flowers', 'They eat every invasive python'], a: 0, why: 'Gator holes become lifeboats for fish, turtles and birds in the dry season.' },
      { q: 'What do alligators do to survive when the water freezes?', o: ['Stick their snouts up through the ice to breathe', 'Migrate south', 'Burrow into sand dunes'], a: 0, why: 'The "icing response" keeps their nostrils above the ice while their bodies slow down.' },
    ],
  },
  {
    id: 'humpback', level: 4, emoji: '🐋', name: 'Humpback Whale', sci: 'Megaptera novaeangliae',
    group: 'Mammal · Balaenopteridae (rorqual whales)', status: 'Least Concern',
    range: 'All major oceans', habitat: 'Cold feeding grounds in summer, warm tropical breeding waters in winter',
    diet: 'Krill and small schooling fish', size: 'Up to about 50 ft and 40 tons',
    population: 'Recovered strongly after the international whaling moratorium took effect in 1986.',
    adaptations: [
      'Flippers can be one-third of the body length — "Megaptera" means "big wing".',
      'Bumps on the flipper edges (tubercles) improve lift; engineers copied them for wind turbine blades.',
    ],
    ecology: '"Whale pump": their poop brings iron and nitrogen to the surface, feeding the plankton that make much of Earth\'s oxygen.',
    threats: 'Ship strikes, entanglement in fishing gear, and ocean noise.',
    helping: 'The 1986 commercial whaling moratorium, ship speed limits, and teams that cut entangled whales free.',
    facts: [
      'Groups blow spiraling curtains of bubbles to trap fish, then lunge up through the middle — bubble-net feeding.',
      'Only males sing, and new songs can spread across whole ocean basins, like a hit song passing between whale populations.',
      'The black-and-white pattern under each tail fluke is unique, so scientists identify individuals from photos.',
    ],
    quiz: [
      { q: 'What does "Megaptera," the humpback\'s genus name, mean?', o: ['Big wing', 'Giant mouth', 'Deep singer'], a: 0, why: 'It refers to their enormous flippers.' },
      { q: 'Which humpback whales sing the famous complex songs?', o: ['Males', 'Females', 'Calves'], a: 0, why: 'Only males sing, mostly on the breeding grounds.' },
    ],
  },
  {
    id: 'manatee', level: 5, emoji: '🌊', name: 'Florida Manatee', sci: 'Trichechus manatus latirostris',
    group: 'Mammal · Trichechidae (order Sirenia)', status: 'Vulnerable',
    range: 'Florida and the southeastern U.S. coast', habitat: 'Shallow rivers, springs, bays and coastal waters',
    diet: 'Seagrass and other water plants — up to about 10% of body weight a day', size: 'About 10 ft; often 800–1,200 lb',
    population: 'The U.S. downlisted it from endangered to threatened in 2017. (IUCN status is for the West Indian manatee.)',
    adaptations: [
      '"Marching molars": new teeth form at the back of the jaw and move forward as worn ones fall out.',
      'Heavy, dense bones work like a diver\'s weight belt so they can hover at the bottom.',
    ],
    ecology: 'Grazing trims seagrass beds, and their droppings recycle nutrients through the ecosystem.',
    threats: 'Boat strikes (most adults carry propeller scars), seagrass die-offs from pollution, and cold stress.',
    helping: 'Slow-speed boating zones, warm-water refuges, rescue and rehab programs, and seagrass restoration.',
    facts: [
      'Their closest living relatives are elephants.',
      'Manatees can\'t handle water below about 68°F, so in winter they crowd into warm springs and even power plant outflows.',
      'In 2021 more than 1,100 Florida manatees died, many starving after seagrass collapsed in the Indian River Lagoon.',
    ],
    quiz: [
      { q: 'What are the manatee\'s closest living relatives?', o: ['Elephants', 'Seals', 'Dolphins'], a: 0, why: 'Manatees and elephants share a common ancestor; both belong to a group called Afrotheria.' },
      { q: 'Why do Florida manatees crowd into springs in winter?', o: ['They can\'t survive long in water colder than about 68°F', 'To give birth', 'To eat fish'], a: 0, why: 'Cold stress can kill manatees, and springs stay about 72°F year-round.' },
    ],
  },
  {
    id: 'seaotter', level: 6, emoji: '🦦', name: 'Sea Otter', sci: 'Enhydra lutris',
    group: 'Mammal · Mustelidae (weasel family)', status: 'Endangered',
    range: 'North Pacific: Russia, Alaska, British Columbia and California', habitat: 'Kelp forests and rocky coasts',
    diet: 'Sea urchins, crabs, clams and snails', size: 'About 4 ft; up to about 100 lb',
    population: 'Hunted down to roughly 1,000–2,000 animals by 1911; now tens of thousands.',
    adaptations: [
      'The densest fur of any animal — up to about a million hairs per square inch — instead of blubber.',
      'They eat about a quarter of their body weight every day to fuel a very fast metabolism.',
    ],
    ecology: 'A keystone species: by eating urchins they keep kelp forests from being mowed down, and kelp forests store carbon and shelter fish.',
    threats: 'Oil spills (oiled fur stops insulating), shark bites, disease, and entanglement.',
    helping: 'The 1911 Fur Seal Treaty ended commercial hunting; reintroductions, and marine protected areas.',
    facts: [
      'They use rocks as tools to smash shells, and often keep a favorite rock in a loose skin pouch under their forearm.',
      'Resting otters wrap themselves in kelp or hold paws so they don\'t drift apart.',
    ],
    quiz: [
      { q: 'How do sea otters stay warm in cold water without blubber?', o: ['Super-dense fur that traps air', 'A layer of fat', 'Special warm blood'], a: 0, why: 'Their fur traps a layer of air against the skin.' },
      { q: 'Why are sea otters important to kelp forests?', o: ['They eat urchins that would destroy the kelp', 'They plant kelp seeds', 'They clean the water with their fur'], a: 0, why: 'Without otters, urchin populations explode and create "urchin barrens".' },
    ],
  },
  {
    id: 'koala', level: 7, emoji: '🐨', name: 'Koala', sci: 'Phascolarctos cinereus',
    group: 'Mammal (marsupial) · Phascolarctidae', status: 'Vulnerable',
    range: 'Eastern and southeastern Australia', habitat: 'Eucalyptus forests and woodlands',
    diet: 'Eucalyptus leaves (toxic to most animals)', size: 'About 2–3 ft; 9–30 lb',
    population: 'Listed as Endangered under Australian law in Queensland, New South Wales and the ACT since 2022.',
    adaptations: [
      'A very long caecum (about 6 ft) full of gut bacteria that break down tough, toxic eucalyptus.',
      'They sleep up to about 20 hours a day to save energy on their low-nutrient diet.',
    ],
    ecology: 'Browsing shapes the eucalyptus canopy; koalas are an "umbrella species" — protecting their forests protects many others.',
    threats: 'Land clearing, bushfires (the 2019–20 fires were devastating), chlamydia disease, dogs and cars.',
    helping: 'Wildlife hospitals, koala-safe road crossings, chlamydia vaccine trials, and replanting habitat corridors.',
    facts: [
      'Koala fingerprints are so similar to human ones that they\'re hard to tell apart even under a microscope.',
      'Joeys eat "pap", a special soft poop from their mother, to pick up the gut bacteria needed to digest eucalyptus.',
      'Koalas are marsupials, not bears.',
    ],
    quiz: [
      { q: 'What does a koala joey eat to get the gut bacteria for digesting eucalyptus?', o: ['Pap, a special poop from its mother', 'Bark', 'Milk only, until age 2'], a: 0, why: 'Pap passes the right microbes from mother to joey.' },
      { q: 'Why do koalas sleep up to 20 hours a day?', o: ['Their low-energy leaf diet gives them little fuel', 'They are nocturnal hunters', 'Eucalyptus makes them drowsy'], a: 0, why: 'Eucalyptus is low in nutrients and hard to digest, so they save energy. The "drugged by eucalyptus" idea is a myth.' },
    ],
  },
  {
    id: 'panther', level: 8, emoji: '🐆', name: 'Florida Panther', sci: 'Puma concolor coryi',
    group: 'Mammal · Felidae (a population of puma)', status: 'Endangered (U.S. list)',
    range: 'Southwest Florida', habitat: 'Pine flatwoods, swamps and hardwood hammocks',
    diet: 'White-tailed deer, feral hogs, raccoons and armadillos', size: 'Males about 7 ft nose to tail; 100–160 lb',
    population: 'About 120–230 adults (FWC estimate) — up from perhaps 20–30 in the 1970s–80s.',
    adaptations: [
      'Powerful back legs for ambush leaps.',
      'Males patrol huge territories of about 200 square miles.',
    ],
    ecology: 'The top predator of the Everglades region, keeping deer and hog numbers in balance.',
    threats: 'Cars (the leading known cause of death), habitat loss to development, and fights between males for territory.',
    helping: 'Wildlife underpasses on highways like I-75, land conservation, and genetic rescue.',
    facts: [
      'In 1995, eight female pumas from Texas were brought in to fix inbreeding problems like kinked tails, cowlicks and heart defects. This "genetic rescue" worked.',
      'Pumas can\'t roar — they purr, chirp and scream instead.',
    ],
    quiz: [
      { q: 'What was the 1995 "genetic rescue" of the Florida panther?', o: ['Bringing in 8 female pumas from Texas', 'Cloning a panther', 'Moving panthers to Georgia'], a: 0, why: 'New genes reduced inbreeding defects and helped the population grow.' },
      { q: 'What is the leading known cause of death for Florida panthers?', o: ['Vehicle collisions', 'Alligators', 'Hurricanes'], a: 0, why: 'That\'s why highway underpasses are so important.' },
    ],
  },
  {
    id: 'giantpanda', level: 9, emoji: '🐼', name: 'Giant Panda', sci: 'Ailuropoda melanoleuca',
    group: 'Mammal · Ursidae (bears)', status: 'Vulnerable',
    range: 'Mountains of central China (Sichuan, Shaanxi, Gansu)', habitat: 'Cool, wet bamboo forests',
    diet: 'About 99% bamboo', size: 'About 4–5 ft long; 150–275 lb',
    population: 'About 1,864 in the wild (China\'s 2014 national survey). Moved from Endangered to Vulnerable in 2016.',
    adaptations: [
      'A "pseudo-thumb" — an enlarged wrist bone — for gripping bamboo stalks.',
      'Strong jaws and wide molars crush tough bamboo.',
    ],
    ecology: 'An umbrella species: protecting panda forests protects golden snub-nosed monkeys, takins and many other species.',
    threats: 'Habitat broken into small patches by roads and farms; bamboo die-offs.',
    helping: 'A network of reserves, the Giant Panda National Park (2021), and bamboo corridors linking forest patches.',
    facts: [
      'Pandas have a carnivore\'s short gut, so they digest only a small part of their bamboo and must eat roughly 12–38 kg a day.',
      'A newborn panda weighs about 100 g — roughly 1/900 of its mother\'s weight.',
    ],
    quiz: [
      { q: 'What is the giant panda\'s "pseudo-thumb" made from?', o: ['An enlarged wrist bone', 'An extra finger', 'A hardened claw'], a: 0, why: 'It\'s a modified wrist bone called the radial sesamoid.' },
      { q: 'Why does a panda eat so much bamboo each day?', o: ['Its carnivore-style gut digests only a small part of it', 'Bamboo is full of protein', 'It stores fat for hibernation'], a: 0, why: 'Pandas lack the long, complex gut that plant-eaters usually have.' },
    ],
  },
  {
    id: 'redpanda', level: 10, emoji: '🎋', name: 'Red Panda', sci: 'Ailurus fulgens',
    group: 'Mammal · Ailuridae (the only living member of its family)', status: 'Endangered',
    range: 'Eastern Himalayas: Nepal, India, Bhutan, Myanmar, China', habitat: 'Cool mountain forests with bamboo understory',
    diet: 'Mostly bamboo leaves, plus fruit, acorns and eggs', size: 'Cat-sized: about 2 ft plus an 18-inch tail',
    population: 'Declining; exact numbers are uncertain.',
    adaptations: [
      'Fur on the soles of their feet for grip and warmth on snowy branches.',
      'They can drop their metabolism to save energy in the cold.',
    ],
    ecology: 'An indicator species: healthy red panda numbers signal a healthy Himalayan forest.',
    threats: 'Deforestation, herding dogs that spread disease, and illegal pet trade.',
    helping: 'Community "forest guardians" in Nepal, and protecting forest corridors.',
    facts: [
      'Red pandas were named "panda" first — described in 1825, over 40 years before the giant panda.',
      'They are not closely related to giant pandas, yet both evolved a "false thumb" for bamboo — a classic case of convergent evolution.',
    ],
    quiz: [
      { q: 'Red and giant pandas both have a "false thumb" but aren\'t close relatives. What is that called?', o: ['Convergent evolution', 'Hybridization', 'Mimicry'], a: 0, why: 'Unrelated species evolved the same solution to the same problem: gripping bamboo.' },
      { q: 'Which animal was the original "panda"?', o: ['The red panda', 'The giant panda', 'The raccoon'], a: 0, why: 'The red panda was described in 1825; the giant panda wasn\'t described until 1869.' },
    ],
  },
  {
    id: 'polarbear', level: 11, emoji: '🐻‍❄️', name: 'Polar Bear', sci: 'Ursus maritimus',
    group: 'Mammal · Ursidae (bears)', status: 'Vulnerable',
    range: 'Arctic: Canada, Alaska, Greenland, Norway, Russia', habitat: 'Sea ice and Arctic coasts',
    diet: 'Mostly ringed and bearded seals', size: 'Males 8–10 ft; 775–1,500 lb',
    population: 'Roughly 26,000 in about 19 subpopulations.',
    adaptations: [
      'Black skin under fur that is actually transparent — it looks white because it scatters light.',
      'Huge paws spread their weight on thin ice and work as paddles.',
    ],
    ecology: 'The Arctic\'s top predator; their leftovers feed Arctic foxes, ravens and gulls.',
    threats: 'Shrinking sea ice from climate change leaves less time to hunt seals.',
    helping: 'An international agreement among the five polar bear nations (1973), and cutting greenhouse gas emissions.',
    facts: [
      'In the U.S. they are legally classified as marine mammals.',
      'One tracked female swam 687 km (427 miles) over 9 days straight.',
      'They are the largest land carnivore on Earth.',
    ],
    quiz: [
      { q: 'What color is a polar bear\'s skin?', o: ['Black', 'White', 'Pink'], a: 0, why: 'Black skin absorbs heat; the see-through fur only looks white.' },
      { q: 'Why is shrinking sea ice so dangerous for polar bears?', o: ['They hunt seals from the ice', 'They sleep only on ice', 'Ice keeps their fur clean'], a: 0, why: 'Less ice means fewer weeks to hunt and build up fat.' },
    ],
  },
  {
    id: 'snowleopard', level: 12, emoji: '🐆', name: 'Snow Leopard', sci: 'Panthera uncia',
    group: 'Mammal · Felidae (big cats)', status: 'Vulnerable',
    range: '12 countries across the mountains of Central and South Asia', habitat: 'Steep, rocky slopes, often above 10,000 ft',
    diet: 'Blue sheep, ibex, marmots — sometimes livestock', size: 'About 3–4 ft plus a 3-ft tail; 60–120 lb',
    population: 'Moved from Endangered to Vulnerable in 2017; still hard to count.',
    adaptations: [
      'A thick tail nearly as long as its body for balance, which it also wraps around its face like a scarf.',
      'Wide, furry paws act like snowshoes; a short, broad nose warms the cold air it breathes.',
    ],
    ecology: 'The top predator of the high mountains, and a sign of healthy mountain ecosystems that supply water to millions of people.',
    threats: 'Retaliation killings after livestock attacks, poaching, and loss of wild prey.',
    helping: 'Livestock insurance, predator-proof corrals, and herders trained as camera-trap researchers.',
    facts: [
      'Unlike most big cats in its genus, the snow leopard can\'t roar.',
      'It\'s nicknamed the "ghost of the mountains" because it is so rarely seen.',
    ],
    quiz: [
      { q: 'How does the snow leopard use its long, thick tail?', o: ['For balance and as a warm wrap', 'To swat prey', 'To signal danger'], a: 0, why: 'It balances on cliffs and wraps its tail around its face when resting.' },
      { q: 'What helps farmers live alongside snow leopards?', o: ['Livestock insurance and predator-proof corrals', 'Bounties', 'Moving to cities'], a: 0, why: 'When farmers don\'t lose money, they don\'t retaliate against the cats.' },
    ],
  },
  {
    id: 'cheetah', level: 13, emoji: '🐆', name: 'Cheetah', sci: 'Acinonyx jubatus',
    group: 'Mammal · Felidae', status: 'Vulnerable',
    range: 'Mainly eastern and southern Africa; a tiny population in Iran', habitat: 'Open grasslands and savannas',
    diet: 'Gazelles, impalas and other small antelope', size: 'About 4 ft plus a 2.5-ft tail; 75–140 lb',
    population: 'About 7,000 adults.',
    adaptations: [
      'Top speed around 60–70 mph, powered by a flexible spine and long legs.',
      'Claws that don\'t fully retract grip the ground like cleats; the tail acts like a rudder for sharp turns.',
    ],
    ecology: 'A daytime hunter that helps control antelope numbers.',
    threats: 'Habitat loss, conflict with farmers, and cubs taken for the illegal pet trade.',
    helping: 'Livestock guardian dogs (like Anatolian shepherds) given to farmers in Namibia so they don\'t shoot cheetahs.',
    facts: [
      'Cheetahs are so genetically similar to each other that skin grafts between unrelated cheetahs can be accepted — a sign of a severe population bottleneck thousands of years ago.',
      'They can\'t roar; they chirp, purr and yelp.',
      'The black "tear lines" may reduce glare from the sun.',
    ],
    quiz: [
      { q: 'Why do cheetahs have such low genetic diversity?', o: ['Their population crashed to very few animals thousands of years ago', 'They were bred in zoos', 'They only live in one country'], a: 0, why: 'A population bottleneck left today\'s cheetahs closely related.' },
      { q: 'What has helped Namibian farmers stop shooting cheetahs?', o: ['Livestock guardian dogs', 'Electric fences around every farm', 'Moving cheetahs to zoos'], a: 0, why: 'The dogs protect herds, so cheetahs stay away.' },
    ],
  },
  {
    id: 'bluewhale', level: 14, emoji: '🐳', name: 'Blue Whale', sci: 'Balaenoptera musculus',
    group: 'Mammal · Balaenopteridae (rorqual whales)', status: 'Endangered',
    range: 'All oceans except the Arctic', habitat: 'Open ocean; feeds in cold, krill-rich waters',
    diet: 'Krill — several tons a day', size: 'Up to about 100 ft and 150+ tons',
    population: 'Recovering slowly after about 360,000 were killed in the Southern Hemisphere during the 20th century.',
    adaptations: [
      'Throat pleats expand like an accordion to gulp a mouthful of water bigger than its own body.',
      'Baleen plates strain out tiny krill.',
    ],
    ecology: 'Whale poop fertilizes the ocean surface, boosting plankton that feeds the whole food web.',
    threats: 'Ship strikes, ocean noise, and changes in krill from warming oceans.',
    helping: 'Hunting has been banned since 1966; shipping lanes are being moved or slowed in whale hotspots.',
    facts: [
      'It\'s the largest animal known to have ever lived — bigger than any dinosaur.',
      'Its calls are among the loudest sounds made by any animal and can travel hundreds of miles underwater.',
      'A blue whale heart weighs about 400 lb.',
    ],
    quiz: [
      { q: 'What is the largest animal known to have ever lived?', o: ['Blue whale', 'Argentinosaurus', 'Megalodon'], a: 0, why: 'Blue whales outweigh even the biggest dinosaurs.' },
      { q: 'What do blue whales eat?', o: ['Tiny krill', 'Giant squid', 'Seals'], a: 0, why: 'The biggest animal eats some of the smallest, filtering them with baleen.' },
    ],
  },
  {
    id: 'elephant', level: 15, emoji: '🐘', name: 'African Savanna Elephant', sci: 'Loxodonta africana',
    group: 'Mammal · Elephantidae (order Proboscidea)', status: 'Endangered',
    range: 'Sub-Saharan Africa', habitat: 'Savannas, grasslands and woodlands',
    diet: 'Grass, leaves, bark and fruit — up to about 300 lb a day', size: 'Up to about 13 ft at the shoulder and 6+ tons',
    population: 'Split from the African forest elephant in 2021; the forest elephant is Critically Endangered.',
    adaptations: [
      'A trunk with tens of thousands of muscle bundles that can pluck a single blade of grass or lift a log.',
      'They sense low rumbles (infrasound) through their feet from miles away.',
    ],
    ecology: 'Ecosystem engineers: they dig water holes, spread seeds, and knock down trees to keep savannas open.',
    threats: 'Ivory poaching, habitat loss, and conflict with farmers.',
    helping: 'Anti-poaching rangers, ivory trade bans, and beehive fences — elephants avoid bees, so the fences protect crops.',
    facts: [
      'Tusks are actually giant incisor teeth.',
      'In Mozambique, heavy poaching during a civil war led to far more elephants being born without tusks — evolution happening in a few decades.',
      'Herds are led by the oldest female, the matriarch, whose memory of water sources can save the herd in droughts.',
    ],
    quiz: [
      { q: 'Elephant tusks are actually what?', o: ['Enlarged incisor teeth', 'Horns', 'Hardened lips'], a: 0, why: 'Tusks are incisors that keep growing through life.' },
      { q: 'How do beehive fences help elephants and farmers?', o: ['Elephants avoid bees, so they stay out of crops', 'The honey feeds the elephants', 'Bees chase away poachers'], a: 0, why: 'Farmers protect crops and earn money from honey, and elephants aren\'t harmed.' },
    ],
  },
  {
    id: 'okapi', level: 16, emoji: '🦒', name: 'Okapi', sci: 'Okapia johnstoni',
    group: 'Mammal · Giraffidae (giraffe family)', status: 'Endangered',
    range: 'Only the Democratic Republic of the Congo', habitat: 'Dense rainforest',
    diet: 'Leaves, buds, fruit and fungi — including some plants toxic to people', size: 'About 5 ft at the shoulder; 450–700 lb',
    population: 'Declining; hard to count in dense forest.',
    adaptations: [
      'A long, grasping tongue that can reach its own eyes and ears to clean them.',
      'Striped hindquarters help it blend into shadows and may help calves follow their mothers.',
    ],
    ecology: 'Browses the forest understory and spreads seeds.',
    threats: 'Habitat loss from logging and mining, poaching, and armed conflict.',
    helping: 'The Okapi Wildlife Reserve, a UNESCO World Heritage Site, and rangers who protect it at great risk.',
    facts: [
      'Despite its zebra-like stripes, its closest living relative is the giraffe.',
      'Western scientists only learned of it in 1901, earning it the nickname "African unicorn".',
      'Okapis may communicate with infrasound too low for humans to hear.',
    ],
    quiz: [
      { q: 'What is the okapi\'s closest living relative?', o: ['Giraffe', 'Zebra', 'Horse'], a: 0, why: 'The stripes fool people, but the okapi belongs to the giraffe family.' },
      { q: 'What can an okapi do with its long tongue?', o: ['Clean its own eyes and ears', 'Catch flying insects', 'Swim faster'], a: 0, why: 'Its tongue is long and flexible enough to groom its face.' },
    ],
  },
  {
    id: 'tiger', level: 17, emoji: '🐅', name: 'Tiger', sci: 'Panthera tigris',
    group: 'Mammal · Felidae (big cats)', status: 'Endangered',
    range: 'Scattered across South, Southeast and East Asia and the Russian Far East', habitat: 'Forests, mangroves, grasslands and snowy taiga',
    diet: 'Deer, wild pigs, buffalo', size: 'Largest cat: males up to about 10 ft and 500+ lb',
    population: 'About 5,574 in the wild (2022 estimate); about three-quarters live in India.',
    adaptations: [
      'Stripes break up its outline in tall grass — and the skin under the fur is striped too.',
      'A strong swimmer that often cools off in rivers and lakes.',
    ],
    ecology: 'An apex predator; protecting tiger reserves protects entire forests and watersheds.',
    threats: 'Poaching for skins and bones, loss of prey, habitat loss, and conflict with people.',
    helping: 'The "TX2" goal to double wild tigers, India\'s Project Tiger reserves, and camera-trap surveys.',
    facts: [
      'Every tiger\'s stripe pattern is unique, so camera traps can identify and count individuals.',
      'Tiger numbers are rising in India, Nepal, Russia and Bhutan thanks to protection.',
    ],
    quiz: [
      { q: 'Which country is home to about three-quarters of the world\'s wild tigers?', o: ['India', 'China', 'Indonesia'], a: 0, why: 'India\'s reserve network holds most of the world\'s wild tigers.' },
      { q: 'How do researchers tell individual tigers apart on camera traps?', o: ['Each stripe pattern is unique', 'By their eye color', 'By GPS collars only'], a: 0, why: 'Stripes work like fingerprints.' },
    ],
  },
  {
    id: 'gorilla', level: 18, emoji: '🦍', name: 'Mountain Gorilla', sci: 'Gorilla beringei beringei',
    group: 'Mammal · Hominidae (great apes)', status: 'Endangered',
    range: 'Virunga Mountains (Rwanda, Uganda, DRC) and Bwindi (Uganda)', habitat: 'Misty montane forests up to about 13,000 ft',
    diet: 'Leaves, stems, shoots, and some fruit and insects', size: 'Silverbacks about 5.5 ft standing, up to about 440 lb',
    population: 'Just over 1,000 — one of the few great apes whose numbers are increasing. Improved from Critically Endangered in 2018.',
    adaptations: [
      'Longer, thicker fur than other gorillas for cold mountain nights.',
      'They build a fresh leafy nest to sleep in every night.',
    ],
    ecology: 'Seed dispersers and "gardeners" of the forest, opening gaps where new plants grow.',
    threats: 'Human diseases (they can catch our colds), snares set for other animals, and habitat loss.',
    helping: 'Ranger patrols, "Gorilla Doctors" field vets, and tourism permits that fund protection and local jobs.',
    facts: [
      'Dian Fossey studied mountain gorillas in Rwanda for nearly 20 years and fought poachers to protect them.',
      'A group is led by a dominant adult male called a silverback, named for the silver saddle of hair on his back.',
    ],
    quiz: [
      { q: 'Why must tourists wear masks near mountain gorillas?', o: ['Gorillas can catch human illnesses', 'The gorillas dislike human smells', 'It\'s tradition'], a: 0, why: 'A human cold can be deadly to a gorilla.' },
      { q: 'What makes mountain gorillas unusual among great apes?', o: ['Their numbers are increasing', 'They can swim', 'They live alone'], a: 0, why: 'Intense protection has helped them grow to just over 1,000.' },
    ],
  },
  {
    id: 'whoopingcrane', level: 19, emoji: '🪶', name: 'Whooping Crane', sci: 'Grus americana',
    group: 'Bird · Gruidae (cranes)', status: 'Endangered',
    range: 'Breeds in Wood Buffalo National Park, Canada; winters on the Texas coast', habitat: 'Wetlands, marshes and coastal bays',
    diet: 'Blue crabs, clams, frogs and berries', size: 'About 5 ft tall — the tallest bird in North America',
    population: 'Down to about 15 birds in the wild migratory flock in 1941; about 540 wintered on the Texas coast in 2025–26.',
    adaptations: [
      'A windpipe about 5 ft long, coiled inside the breastbone, makes their loud, trumpeting "whoop".',
      'Long legs for wading and a sharp bill for spearing crabs.',
    ],
    ecology: 'A flagship for wetland protection along the entire Central Flyway.',
    threats: 'Power line collisions, wetland loss, drought and illegal shooting.',
    helping: 'Captive breeding, and (from 2001–2015) pilots in ultralight aircraft who taught young cranes a new migration route.',
    facts: [
      'Pairs perform leaping, wing-flapping courtship dances.',
      'Every wild migratory whooping crane today descends from that tiny 1941 flock.',
    ],
    quiz: [
      { q: 'How did people teach captive-raised whooping cranes to migrate?', o: ['By leading them with ultralight aircraft', 'By trucking them', 'With recorded calls from speakers'], a: 0, why: 'Young cranes followed the ultralights, learning the route from Wisconsin to Florida.' },
      { q: 'About how many whooping cranes were left in the wild migratory flock in 1941?', o: ['About 15', 'About 150', 'About 1,500'], a: 0, why: 'Around 15 birds in that flock — one of conservation\'s narrowest escapes.' },
    ],
  },
  {
    id: 'hawksbill', level: 20, emoji: '🐢', name: 'Hawksbill Sea Turtle', sci: 'Eretmochelys imbricata',
    group: 'Reptile · Cheloniidae', status: 'Critically Endangered',
    range: 'Tropical oceans worldwide', habitat: 'Coral reefs',
    diet: 'Mostly sponges — including some that are toxic to other animals', size: 'Shell about 2.5–3 ft; 100–150 lb',
    population: 'Declined steeply over the last century from the tortoiseshell trade.',
    adaptations: [
      'A narrow, pointed, hawk-like beak reaches into reef cracks for sponges.',
      'Overlapping shell plates ("imbricata" means overlapping) with a jagged back edge.',
    ],
    ecology: 'By eating sponges, they give slow-growing corals room to thrive.',
    threats: 'Illegal tortoiseshell trade, loss of coral reefs, beach development, and bycatch.',
    helping: 'An international trade ban since 1977 (CITES), nest protection, and reef conservation.',
    facts: [
      'In 2015, a hawksbill was filmed glowing red and green under blue light — the first biofluorescent reptile ever recorded.',
      'Their beautiful shells were once made into combs and jewelry sold as "tortoiseshell".',
    ],
    quiz: [
      { q: 'What surprising discovery was made about hawksbills in 2015?', o: ['They are biofluorescent', 'They can breathe underwater', 'They migrate to the Arctic'], a: 0, why: 'A diver filmed one glowing red and green under blue light.' },
      { q: 'What do hawksbills mainly eat?', o: ['Sponges', 'Jellyfish', 'Seagrass'], a: 0, why: 'Few animals can eat sponges; hawksbills specialize in them.' },
    ],
  },
  {
    id: 'pangolin', level: 21, emoji: '🛡️', name: 'Sunda Pangolin', sci: 'Manis javanica',
    group: 'Mammal · Manidae (order Pholidota)', status: 'Critically Endangered',
    range: 'Southeast Asia', habitat: 'Forests, plantations and gardens',
    diet: 'Ants and termites', size: 'About 1.5–2 ft plus a long tail; 4–22 lb',
    population: 'Unknown, but falling fast; pangolins are thought to be the most trafficked mammals in the world.',
    adaptations: [
      'The only mammals covered in scales — made of keratin, like your fingernails.',
      'No teeth: a sticky tongue gathers insects, and swallowed pebbles plus spines in the stomach grind them up.',
    ],
    ecology: 'Natural pest control, eating huge numbers of ants and termites; their digging also aerates soil.',
    threats: 'Poaching for meat and for scales used in traditional medicine.',
    helping: 'All eight pangolin species got the highest international trade protection in 2016; rescue centers and anti-trafficking work.',
    facts: [
      'The name "pangolin" comes from a Malay word meaning "one who rolls up" — they curl into an armored ball.',
      'Their closest living relatives are carnivores like cats and dogs, not anteaters or armadillos.',
    ],
    quiz: [
      { q: 'What are pangolin scales made of?', o: ['Keratin, like fingernails', 'Bone', 'Chitin, like insect shells'], a: 0, why: 'Keratin — which is also why the scales have no real medicinal value.' },
      { q: 'How do pangolins grind food without teeth?', o: ['With swallowed stones and spines in the stomach', 'By chewing with their gums', 'They don\'t need to — they dissolve it in saliva'], a: 0, why: 'Their stomach works a bit like a bird\'s gizzard.' },
    ],
  },
  {
    id: 'orangutan', level: 22, emoji: '🦧', name: 'Sumatran Orangutan', sci: 'Pongo abelii',
    group: 'Mammal · Hominidae (great apes)', status: 'Critically Endangered',
    range: 'Northern Sumatra, Indonesia', habitat: 'Tropical rainforests and peat swamps',
    diet: 'Mostly fruit (especially figs), plus leaves, bark and insects', size: 'Males up to about 4.5 ft tall and 200 lb, with arms spanning 7+ ft',
    population: 'There are three orangutan species; the Tapanuli orangutan, described in 2017, is the rarest great ape (under 800).',
    adaptations: [
      'Hook-shaped hands and feet for spending almost their whole lives in trees.',
      'Big brains: they use sticks as tools, and different populations have different tool "cultures".',
    ],
    ecology: 'Important seed dispersers for many rainforest trees.',
    threats: 'Forests cleared for palm oil and paper plantations, fires, and illegal pet trade.',
    helping: 'Protected forests, rescue and rehabilitation centers, and certified sustainable palm oil.',
    facts: [
      'Mothers raise one baby at a time for about 8 years — the longest gap between births of any land mammal.',
      '"Orangutan" comes from Malay words meaning "person of the forest".',
    ],
    quiz: [
      { q: 'Which great ape species was only described by scientists in 2017?', o: ['Tapanuli orangutan', 'Bonobo', 'Cross River gorilla'], a: 0, why: 'It lives in a small area of northern Sumatra, with fewer than 800 left.' },
      { q: 'What does "orangutan" mean?', o: ['Person of the forest', 'Red ape', 'Tree climber'], a: 0, why: 'From the Malay words "orang" (person) and "hutan" (forest).' },
    ],
  },
  {
    id: 'blackrhino', level: 23, emoji: '🦏', name: 'Black Rhino', sci: 'Diceros bicornis',
    group: 'Mammal · Rhinocerotidae', status: 'Critically Endangered',
    range: 'Eastern and southern Africa', habitat: 'Bushland and savanna',
    diet: 'Browses leaves, twigs and shrubs', size: 'About 5 ft at the shoulder; up to about 3,000 lb',
    population: 'About 6,788 (2025) — up from roughly 2,400 in the mid-1990s.',
    adaptations: [
      'A hooked, grasping upper lip for plucking leaves and twigs. (White rhinos have a wide, square lip for grazing grass.)',
      'Keen hearing and smell make up for poor eyesight.',
    ],
    ecology: 'Browsing shapes bushland, and their dung feeds dung beetles and other insects.',
    threats: 'Poaching for horn, plus drought and habitat loss.',
    helping: 'Armed ranger teams, sniffer dogs, moving rhinos to safer reserves, and sometimes removing horns so poachers have no reason to kill them.',
    facts: [
      'Rhino horn is made of keratin, the same material as your hair and nails.',
      'Black and white rhinos are both gray; the easiest way to tell them apart is the shape of their lips.',
    ],
    quiz: [
      { q: 'What\'s the best way to tell a black rhino from a white rhino?', o: ['Lip shape: hooked vs. wide and square', 'Skin color', 'Number of toes'], a: 0, why: 'Black rhinos browse with a hooked lip; white rhinos graze with a wide one.' },
      { q: 'What is rhino horn made of?', o: ['Keratin', 'Ivory', 'Bone'], a: 0, why: 'The same protein as hair and fingernails.' },
    ],
  },
  {
    id: 'condor', level: 24, emoji: '🪶', name: 'California Condor', sci: 'Gymnogyps californianus',
    group: 'Bird · Cathartidae (New World vultures)', status: 'Critically Endangered',
    range: 'California, Arizona, Utah, Baja California and the Pacific Northwest', habitat: 'Rocky canyons, cliffs and open country',
    diet: 'Carrion (dead animals)', size: 'Wingspan up to about 9.5 ft — the largest of any North American land bird',
    population: 'Only 27 existed in 1987, when every last wild condor was captured to save the species. By the end of 2025: 607, with 392 flying free.',
    adaptations: [
      'Can soar for hours on rising warm air, traveling more than 100 miles a day with barely a flap.',
      'A bald head stays clean while feeding inside carcasses.',
    ],
    ecology: 'Nature\'s clean-up crew — eating carcasses helps stop the spread of disease.',
    threats: 'Lead poisoning from bullet fragments in carcasses is the biggest threat; also swallowing trash.',
    helping: 'Captive breeding at zoos, releases into the wild, and hunters switching to lead-free ammunition.',
    facts: [
      'Condors cool off on hot days by pooping on their own legs (it\'s called urohydrosis).',
      'Every condor in the wild wears a numbered wing tag so biologists can track it.',
    ],
    quiz: [
      { q: 'What is the biggest threat to California condors today?', o: ['Lead poisoning from bullet fragments', 'Wind turbines', 'Predators'], a: 0, why: 'Condors eat carcasses that may contain lead fragments.' },
      { q: 'What happened to the condor in 1987?', o: ['The last wild condors were captured for breeding', 'It was declared extinct', 'It was named state bird'], a: 0, why: 'All 27 remaining condors lived in captivity until releases began in 1992.' },
    ],
  },
  {
    id: 'axolotl', level: 25, emoji: '🦎', name: 'Axolotl', sci: 'Ambystoma mexicanum',
    group: 'Amphibian · Ambystomatidae (mole salamanders)', status: 'Critically Endangered',
    range: 'Only Lake Xochimilco\'s canals near Mexico City', habitat: 'Cool, high-altitude freshwater canals',
    diet: 'Worms, insect larvae, small fish and crustaceans', size: 'About 9–12 inches',
    population: 'Very few left in the wild, though thousands live in labs and as pets.',
    adaptations: [
      'Keeps its larval features, like feathery external gills, its whole life (neoteny).',
      'Can regrow lost limbs, parts of the spinal cord, heart and even brain without scarring.',
    ],
    ecology: 'A top predator in its canal ecosystem and an indicator of water quality.',
    threats: 'Water pollution, urban growth, and invasive carp and tilapia that eat axolotl eggs and young.',
    helping: 'Farmers restoring traditional "chinampa" floating gardens as clean-water refuges.',
    facts: [
      'The name comes from Nahuatl (the Aztec language) and is linked to Xolotl, the Aztec god of fire and lightning.',
      'Scientists study axolotl regeneration for clues to healing human injuries.',
    ],
    quiz: [
      { q: 'What is neoteny, as seen in axolotls?', o: ['Keeping juvenile features as an adult', 'Changing color with mood', 'Living in salt water'], a: 0, why: 'Axolotls keep their larval gills and stay aquatic their whole lives.' },
      { q: 'Where do wild axolotls live?', o: ['Lake Xochimilco near Mexico City', 'The Amazon River', 'Florida springs'], a: 0, why: 'Their entire wild range is one canal system.' },
    ],
  },
  {
    id: 'amurleopard', level: 26, emoji: '🐆', name: 'Amur Leopard', sci: 'Panthera pardus orientalis',
    group: 'Mammal · Felidae (a leopard subspecies)', status: 'Critically Endangered',
    range: 'Russian Far East and northeastern China', habitat: 'Snowy temperate forests',
    diet: 'Roe deer, sika deer, badgers and hares', size: 'About 4 ft plus a 3-ft tail; 70–110 lb',
    population: 'Only about 30 in the early 2000s; now over 100.',
    adaptations: [
      'The winter coat can grow nearly 3 inches long, and it turns paler to blend with snow.',
      'Long legs help it walk through deep snow.',
    ],
    ecology: 'A top predator in one of the most northern leopard habitats on Earth.',
    threats: 'Poaching, loss of prey, forest fires, and very low genetic diversity.',
    helping: 'Russia\'s Land of the Leopard National Park (2012) and cross-border camera-trap monitoring with China.',
    facts: [
      'It\'s often called the world\'s rarest big cat subspecies.',
      'Each leopard\'s rosette pattern is unique, so camera traps can count individuals.',
    ],
    quiz: [
      { q: 'How did Amur leopard numbers change after Land of the Leopard National Park was created?', o: ['They more than tripled', 'They stayed the same', 'They went extinct in Russia'], a: 0, why: 'From about 30 to over 100.' },
      { q: 'How does the Amur leopard\'s coat change in winter?', o: ['It grows much longer and paler', 'It turns black', 'It sheds completely'], a: 0, why: 'A longer, lighter coat keeps it warm and camouflaged in snow.' },
    ],
  },
  {
    id: 'phileagle', level: 27, emoji: '🦅', name: 'Philippine Eagle', sci: 'Pithecophaga jefferyi',
    group: 'Bird · Accipitridae', status: 'Critically Endangered',
    range: 'Only the Philippines (Luzon, Samar, Leyte, Mindanao)', habitat: 'Old-growth rainforest',
    diet: 'Flying lemurs (colugos), palm civets, monkeys, snakes and birds', size: 'About 3 ft tall; wingspan about 6.5 ft',
    population: 'Only about 400 breeding pairs.',
    adaptations: [
      'Short, broad wings for flying fast through dense forest.',
      'A shaggy crest of feathers, like a lion\'s mane, and a huge arched beak.',
    ],
    ecology: 'The top predator of the Philippine rainforest.',
    threats: 'Deforestation and illegal shooting.',
    helping: 'The Philippine Eagle Foundation\'s breeding and release work, and forest protection with Indigenous communities.',
    facts: [
      'It\'s the national bird of the Philippines.',
      'Its scientific name means "monkey-eater", but its main prey is actually the colugo (flying lemur).',
      'A pair raises just one chick every two years.',
    ],
    quiz: [
      { q: 'What is the Philippine eagle\'s most common prey?', o: ['Colugos (flying lemurs)', 'Monkeys', 'Fish'], a: 0, why: 'Despite the name "monkey-eater", colugos top the menu.' },
      { q: 'How often does a Philippine eagle pair raise a chick?', o: ['One chick every two years', 'Three chicks a year', 'Two chicks a year'], a: 0, why: 'This very slow breeding makes every eagle precious.' },
    ],
  },
  {
    id: 'kakapo', level: 28, emoji: '🦜', name: 'Kākāpō', sci: 'Strigops habroptilus',
    group: 'Bird · Strigopidae (New Zealand parrots)', status: 'Critically Endangered',
    range: 'Predator-free islands of New Zealand', habitat: 'Forest and scrubland',
    diet: 'Plants, seeds and especially rimu tree fruit', size: 'Up to about 2 ft long and 9 lb — the world\'s heaviest parrot',
    population: 'Down to 51 birds in 1995. About 236 adults in 2026, plus a record-breaking crop of new chicks.',
    adaptations: [
      'It can\'t fly, but it climbs trees and "parachutes" down with its wings.',
      'Nocturnal, with a strong sense of smell — unusual for a bird.',
    ],
    ecology: 'Once widespread across New Zealand, where birds filled the roles mammals play elsewhere.',
    threats: 'Introduced predators like stoats, cats and rats; very low genetic diversity.',
    helping: 'Every single kākāpō is named, tracked and health-checked; they live on predator-free islands.',
    facts: [
      'They breed only in years when rimu trees produce a big fruit crop — about every 2–4 years.',
      'Males "boom" at night from bowl-shaped pits, making low sounds that can carry for miles.',
      'Kākāpō have a musty, sweet smell, which sadly makes them easy for predators to find.',
    ],
    quiz: [
      { q: 'What triggers kākāpō breeding seasons?', o: ['Big fruit crops on rimu trees', 'Full moons', 'Heavy rains'], a: 0, why: 'They breed only in rimu "mast" years.' },
      { q: 'How do male kākāpō attract mates?', o: ['By "booming" from pits in the ground', 'By bright dancing flights', 'By building nests'], a: 0, why: 'Low booms carry across the island at night.' },
    ],
  },
  {
    id: 'sumatranrhino', level: 29, emoji: '🦏', name: 'Sumatran Rhino', sci: 'Dicerorhinus sumatrensis',
    group: 'Mammal · Rhinocerotidae', status: 'Critically Endangered',
    range: 'Sumatra and Indonesian Borneo', habitat: 'Dense tropical rainforest',
    diet: 'Leaves, twigs, fruit', size: 'The smallest rhino: about 4.5 ft at the shoulder; up to about 2,000 lb',
    population: 'Only about 34–47 left (2025 estimate).',
    adaptations: [
      'A coat of reddish-brown hair — the hairiest living rhino.',
      'The most vocal rhino, "talking" with squeaks, whistles and long, eerie calls.',
    ],
    ecology: 'Browses and spreads seeds through the rainforest.',
    threats: 'Tiny, scattered populations that struggle to find mates, plus poaching and habitat loss.',
    helping: 'The Sumatran Rhino Sanctuary in Way Kambas National Park breeds them; sniffer dogs search for hidden wild populations.',
    facts: [
      'It\'s the closest living relative of the extinct woolly rhinoceros.',
      'Malaysia\'s last Sumatran rhino died in 2019.',
    ],
    quiz: [
      { q: 'The Sumatran rhino is the closest living relative of which extinct animal?', o: ['Woolly rhinoceros', 'Mammoth', 'Giant ground sloth'], a: 0, why: 'Both belong to an ancient, hairy rhino lineage.' },
      { q: 'About how many Sumatran rhinos are left?', o: ['Fewer than 50', 'About 500', 'About 5,000'], a: 0, why: 'The 2025 estimate is 34–47.' },
    ],
  },
  {
    id: 'vaquita', level: 30, emoji: '🐬', name: 'Vaquita', sci: 'Phocoena sinus',
    group: 'Mammal · Phocoenidae (porpoises)', status: 'Critically Endangered',
    range: 'Only the northern Gulf of California, Mexico', habitat: 'Shallow, murky coastal waters',
    diet: 'Small fish and squid', size: 'About 5 ft — the smallest porpoise',
    population: 'The rarest marine mammal on Earth: the 2025 survey saw about 7–10, including calves.',
    adaptations: [
      'Dark rings around the eyes and dark lip patches.',
      'Shy and quiet, avoiding boats — which is why it wasn\'t described until 1958.',
    ],
    ecology: 'A small predator in the Gulf of California food web.',
    threats: 'Drowning in illegal gillnets set for totoaba, a fish whose swim bladder is smuggled and sold for high prices.',
    helping: 'A "zero tolerance" no-net area, Mexican navy and Sea Shepherd patrols, removing ghost nets, and safer fishing gear.',
    facts: [
      '"Vaquita" means "little cow" in Spanish.',
      'A vaquita named Frida was seen with calves in 2023, 2024 and 2025 — proof they are still breeding.',
    ],
    quiz: [
      { q: 'Why do vaquitas die in gillnets?', o: ['The nets are set illegally for totoaba fish', 'Fishermen hunt vaquitas for meat', 'The nets are used to catch shrimp only'], a: 0, why: 'Totoaba swim bladders are smuggled for high prices, and vaquitas get tangled as bycatch.' },
      { q: 'What does "vaquita" mean in Spanish?', o: ['Little cow', 'Little whale', 'Sea ghost'], a: 0, why: 'A cute name for the world\'s smallest porpoise.' },
    ],
  },
];

export const STATUS_COLOR = (status) => {
  if (status.startsWith('Critically')) return '#FF6B6B';
  if (status.startsWith('Endangered')) return '#FF8A5B';
  if (status.startsWith('Vulnerable')) return '#F4B942';
  return '#7BD389';
};

// ---------- Daily Field Quiz ----------
// Same question on every device for a given day: chosen by a hash of the date,
// from species he has unlocked (all 30 once he's high enough).
const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
export function dailyQuestion(day, level, qid = null) {
  const pool = [];
  SANCTUARY.filter(a => qid || a.level <= Math.max(level, 3)).forEach(a => a.quiz.forEach((q, i) => pool.push({ ...q, animal: a, qid: `${a.id}_${i}` })));
  // Once answered, the saved question id keeps the same question on screen even if he levels up later that day.
  const q = (qid && pool.find(x => x.qid === qid)) || pool[hash(day) % pool.length];
  // Shuffle the options the same way each day so the answer isn't always first.
  let seed = hash(day + '|opts');
  const rand = () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const order = [0, 1, 2];
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  return { ...q, options: order.map(i => q.o[i]), answer: order.indexOf(q.a) };
}
