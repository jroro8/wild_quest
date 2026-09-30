// =====================================================
// GAME DATA + RULES
// Quest IDs, book IDs and the state shape deliberately match Jedi Quest,
// so a Jedi Quest backup file imports with every day, book and reward intact.
// =====================================================

export const XP_PER_LEVEL = 500;
export const DRIBBLE_UP_ID = 'q_dribble';
export const GUITAR_ID = 'q_guitar';

export const SSYRA_BOOKS = [
  { id: 'b1',  title: 'The Bug Bandits',                  author: 'Jenni L. Walsh',                blurb: "Liberty tries to save her father's insectarium from a bug-stealing thief." },
  { id: 'b2',  title: 'Curveball',                        author: 'Pablo Cartaya',                 blurb: 'A knee injury sidelines Elena from sports — she finds joy in live-action role playing.' },
  { id: 'b3',  title: 'Forever Ripley',                   author: 'McCall Hoyle',                  blurb: 'A German Shepherd fulfills her handler\'s last wish: "take care of my girls."' },
  { id: 'b4',  title: 'Growing Home',                     author: 'Beth Ferry',                    blurb: 'A magical goldfish tank holds a family secret in this friendship tale.' },
  { id: 'b5',  title: 'The House at the Edge of Magic',   author: 'Amy Sparkes',                   blurb: 'An orphan pickpocket steals a tiny house that grows into a cursed mansion.' },
  { id: 'b6',  title: 'J vs. K',                          author: 'Kwame Alexander & Jerry Craft', blurb: 'Two rival 5th graders enter a storytelling competition — words vs. art.' },
  { id: 'b7',  title: 'The Last Resort',                  author: 'Erin Entrada Kelly',            blurb: "Lila can see ghosts after a near-death experience at Grandpa Clem's inn." },
  { id: 'b8',  title: 'The Lion of Lark-Hayes Manor',     author: 'Aubrey Hartman',                blurb: 'Poppy trades her books for a flying lion cub — but the deal is a trap.' },
  { id: 'b9',  title: 'Misfit Mansion',                   author: 'Kay Davault',                   blurb: 'Iris and her monster friends are trapped in a foster home of horrors.' },
  { id: 'b10', title: 'Punycorn',                         author: 'Andi Watson',                   blurb: "The clumsiest unicorn must save the kingdom from Sir Ogre's army." },
  { id: 'b11', title: 'Queen of the Sea',                 author: 'Reese Eschmann',                blurb: 'Six weeks aboard a cruise ship with a pet bearded dragon.' },
  { id: 'b12', title: 'Reasons to Look at the Night Sky', author: 'Danielle Daniel',               blurb: 'Luna dreams of NASA space camp until a substitute teacher shakes her world.' },
  { id: 'b13', title: 'The Sherlock Society',             author: 'James Ponti',                   blurb: "Miami kids launch a detective agency and hunt Al Capone's buried treasure." },
  { id: 'b14', title: 'Swimming with Spies',              author: 'Chrystyna Lucyk-Berger',        blurb: 'Sofiya must save her dolphins from the Russian military in wartime Crimea.' },
  { id: 'b15', title: 'Wrath of the Rain God',            author: 'Karla Arenas Valenti',          blurb: 'Twins Martín and Emma face otherworldly adventures on a move to Chicago.' },
];

export const DEFAULT_STATE = {
  app: 'wild-quest',
  player: {
    name: 'RANGER', xp: 0, credits: 0, streak: 0, bestStreak: 0,
    lastCheckIn: null, totalReadingMinutes: 0, totalMathPages: 0,
    booksFinished: 0, equippedRank: 'cub',
    dribbleUpCelebrated: false,
    guitarCelebrated: false,
  },
  config: {
    quests: [
      { id: DRIBBLE_UP_ID, name: 'Dribble Up',           xp: 40, credits: 10, emoji: '⛹️' },
      { id: GUITAR_ID,     name: 'Guitar',               xp: 40, credits: 10, emoji: '🎸' },
      { id: 'q_read',      name: 'Read',                 xp: 30, credits: 8,  emoji: '📖' },
      { id: 'q_dog',       name: 'Train Luke Skywalker', xp: 20, credits: 6,  emoji: '🐕' },
      { id: 'q_duo',       name: 'DuoLingo',             xp: 30, credits: 8,  emoji: '🦉' },
      { id: 'q_chess',     name: 'Chess',                xp: 30, credits: 8,  emoji: '♟️' },
    ],
    rewards: [
      { id: 'r1', name: '🎬 Family Movie Night',     cost: 500,  rarity: 'common' },
      { id: 'r2', name: '🥤 Slurpee run',            cost: 1500, rarity: 'uncommon' },
      { id: 'r3', name: '🍩 Donut shop trip',        cost: 1500, rarity: 'uncommon' },
      { id: 'r4', name: '🌮 Taco Shop dinner',       cost: 2500, rarity: 'rare' },
      { id: 'r5', name: "🥪 Jersey Mike's dinner",   cost: 2500, rarity: 'rare' },
      { id: 'r6', name: "🍔 Hornski's dinner",       cost: 4500, rarity: 'legendary' },
      { id: 'r7', name: '🕹️ Arcade Trip',            cost: 6000, rarity: 'mythic' },
    ],
    ssyra: { creditsPerBook: 150, xpPerBook: 300, allFifteenBonusXp: 2000, allFifteenBonusCredits: 1000 },
    dribbleUp: { goal: 60, rewardXp: 1500, rewardCredits: 1000, prize: 'Mini Christmas Tree' },
    guitarPractice: { goal: 30, rewardXp: 750, rewardCredits: 500, prize: 'Order 66' },
    rates: { mathXpPerPage: 50, mathVbPerPage: 15 },
  },
  logs: {
    daily: {},    // 'YYYY-MM-DD': { quests: [], math: [] }
    ssyra: {},    // bookId: dateStr
    claimed: [],  // [{ rewardId, name, cost, rarity, date }]
  },
};

// Deep-merge a saved/imported state over the defaults so new fields always exist.
export const mergeState = (parsed = {}) => {
  const c = parsed.config || {};
  return {
    ...DEFAULT_STATE, ...parsed,
    app: 'wild-quest',
    player: { ...DEFAULT_STATE.player, ...(parsed.player || {}) },
    config: {
      ...DEFAULT_STATE.config, ...c,
      rates: { ...DEFAULT_STATE.config.rates, ...(c.rates || {}) },
      ssyra: { ...DEFAULT_STATE.config.ssyra, ...(c.ssyra || {}) },
      dribbleUp: { ...DEFAULT_STATE.config.dribbleUp, ...(c.dribbleUp || {}) },
      guitarPractice: { ...DEFAULT_STATE.config.guitarPractice, ...(c.guitarPractice || {}) },
    },
    logs: {
      daily: { ...((parsed.logs || {}).daily || {}) },
      ssyra: { ...((parsed.logs || {}).ssyra || {}) },
      claimed: [...((parsed.logs || {}).claimed || [])],
    },
  };
};

const fmtDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const todayStr = () => fmtDate(new Date());
export const yesterdayStr = () => { const d = new Date(); d.setDate(d.getDate() - 1); return fmtDate(d); };
export const levelFromXp = (xp) => Math.floor(xp / XP_PER_LEVEL) + 1;
export const xpInLevel = (xp) => xp % XP_PER_LEVEL;

export const countQuestDays = (logs, questId) =>
  Object.values(logs.daily || {}).filter(day => (day.quests || []).includes(questId)).length;

export const RARITY = {
  common:    { label: 'COMMON',    color: '#A8B5A2', glow: 'rgba(168,181,162,0.4)' },
  uncommon:  { label: 'UNCOMMON',  color: '#7BD389', glow: 'rgba(123,211,137,0.5)' },
  rare:      { label: 'RARE',      color: '#4FD1C5', glow: 'rgba(79,209,197,0.6)' },
  epic:      { label: 'EPIC',      color: '#B794F4', glow: 'rgba(183,148,244,0.6)' },
  legendary: { label: 'LEGENDARY', color: '#F4B942', glow: 'rgba(244,185,66,0.7)' },
  mythic:    { label: 'MYTHIC',    color: '#FF8A5B', glow: 'rgba(255,138,91,0.8)' },
};

// ---------- RANGER RANKS (same unlock levels as the Jedi ranks) ----------
export const RANKS = [
  { id: 'cub',        name: 'RANGER CUB',          rarity: 'common',    unlockLevel: 1,  palette: { shirt: '#C9B48A', hat: '#8A6E45', band: '#5C4A2E', scarf: '#7BD389', badge: '#A8B5A2', gear: null } },
  { id: 'junior',     name: 'JUNIOR RANGER',       rarity: 'common',    unlockLevel: 3,  palette: { shirt: '#BFA979', hat: '#7A5F3A', band: '#3F5A36', scarf: '#4FD1C5', badge: '#C0C0C0', gear: null } },
  { id: 'scout',      name: 'TRAIL SCOUT',         rarity: 'uncommon',  unlockLevel: 5,  palette: { shirt: '#9DAF7A', hat: '#6B5530', band: '#2F4A2A', scarf: '#F4B942', badge: '#C0C0C0', gear: 'binoculars' } },
  { id: 'tracker',    name: 'WILDLIFE TRACKER',    rarity: 'rare',      unlockLevel: 8,  palette: { shirt: '#7E9A6A', hat: '#5A4526', band: '#8C3B2E', scarf: '#FF8A5B', badge: '#F4B942', gear: 'binoculars' } },
  { id: 'ranger',     name: 'FIELD RANGER',        rarity: 'rare',      unlockLevel: 12, palette: { shirt: '#5F7F55', hat: '#4A3A20', band: '#1E3A2A', scarf: '#4FD1C5', badge: '#F4B942', gear: 'radio' } },
  { id: 'warden',     name: 'GAME WARDEN',         rarity: 'epic',      unlockLevel: 16, palette: { shirt: '#3F6B5A', hat: '#2E3B2E', band: '#B794F4', scarf: '#B794F4', badge: '#E6F4EA', gear: 'radio' } },
  { id: 'chief',      name: 'CHIEF RANGER',        rarity: 'legendary', unlockLevel: 22, palette: { shirt: '#E8DCC0', hat: '#6B4F2A', band: '#F4B942', scarf: '#F4B942', badge: '#F4B942', gear: 'eagle' } },
  { id: 'guardian',   name: 'GUARDIAN OF THE WILD',rarity: 'mythic',    unlockLevel: 30, palette: { shirt: '#F6F1E1', hat: '#F4B942', band: '#FF8A5B', scarf: '#FF8A5B', badge: '#FFE08A', gear: 'eagle' } },
];
// Jedi rank id -> ranger rank id (same position, same unlock level)
export const JEDI_RANK_MAP = {
  youngling: 'cub', initiate: 'junior', padawan: 'scout', senior: 'tracker',
  knight: 'ranger', guardian: 'warden', master: 'chief', grandmaster: 'guardian',
};
export const getRank = (id) => RANKS.find(r => r.id === id) || RANKS[0];
export const getUnlockedRanks = (level) => RANKS.filter(r => r.unlockLevel <= level);

// ---------- SANCTUARY: one species joins every 2 levels ----------
// Status = IUCN Red List category unless noted.
export const SANCTUARY = [
  { id: 'a1',  emoji: '🐢', name: 'Loggerhead Sea Turtle', status: 'Vulnerable',             level: 1,  fact: 'Loggerheads nest on Florida beaches every summer. Lights off at night helps hatchlings find the ocean.' },
  { id: 'a2',  emoji: '🦅', name: 'Bald Eagle',            status: 'Recovered',              level: 3,  fact: 'Once nearly gone in the lower 48 states, bald eagles came back after DDT was banned and left the endangered list in 2007.' },
  { id: 'a3',  emoji: '🐋', name: 'Humpback Whale',        status: 'Least Concern',          level: 5,  fact: 'After whaling bans, humpbacks bounced back. They sing long songs that can travel for miles underwater.' },
  { id: 'a4',  emoji: '🦦', name: 'Sea Otter',             status: 'Endangered',             level: 7,  fact: 'Sea otters eat sea urchins, which protects kelp forests. They hold hands while sleeping so they don\'t drift apart.' },
  { id: 'a5',  emoji: '🐆', name: 'Florida Panther',       status: 'Endangered (U.S. list)', level: 9,  fact: 'Only a small population lives in southwest Florida. Wildlife crossings under highways help keep them safe.' },
  { id: 'a6',  emoji: '🐨', name: 'Koala',                 status: 'Vulnerable',             level: 11, fact: 'Koalas eat almost only eucalyptus leaves. Wildfires and land clearing have destroyed much of their forest.' },
  { id: 'a7',  emoji: '🐼', name: 'Giant Panda',           status: 'Vulnerable',             level: 13, fact: 'Protecting bamboo forests helped pandas move from Endangered to Vulnerable in 2016.' },
  { id: 'a8',  emoji: '🐻‍❄️', name: 'Polar Bear',           status: 'Vulnerable',             level: 15, fact: 'Polar bears hunt seals from sea ice. As the Arctic warms, the ice they depend on is shrinking.' },
  { id: 'a9',  emoji: '🐘', name: 'African Savanna Elephant', status: 'Endangered',          level: 17, fact: 'Elephants dig water holes and spread seeds, shaping the savanna for many other animals.' },
  { id: 'a10', emoji: '🐅', name: 'Tiger',                 status: 'Endangered',             level: 19, fact: 'Every tiger\'s stripe pattern is unique, like a fingerprint. Rangers use camera traps to count them.' },
  { id: 'a11', emoji: '🦍', name: 'Mountain Gorilla',      status: 'Endangered',             level: 21, fact: 'Mountain gorillas are one of the few great apes whose numbers are growing, thanks to ranger patrols.' },
  { id: 'a12', emoji: '🦧', name: 'Sumatran Orangutan',    status: 'Critically Endangered',  level: 23, fact: 'Orangutans build a fresh nest in the treetops almost every night.' },
  { id: 'a13', emoji: '🦏', name: 'Black Rhino',           status: 'Critically Endangered',  level: 25, fact: 'Black rhinos have a hooked lip for grabbing twigs. Anti-poaching rangers guard them day and night.' },
  { id: 'a14', emoji: '🦎', name: 'Axolotl',               status: 'Critically Endangered',  level: 27, fact: 'Axolotls can regrow legs and even parts of their heart. In the wild they live only near Mexico City.' },
  { id: 'a15', emoji: '🐬', name: 'Vaquita',               status: 'Critically Endangered',  level: 29, fact: 'The vaquita is the world\'s rarest marine mammal, found only in the northern Gulf of California.' },
];

export const STATUS_COLOR = (status) => {
  if (status.startsWith('Critically')) return '#FF6B6B';
  if (status.startsWith('Endangered')) return '#FF8A5B';
  if (status.startsWith('Vulnerable')) return '#F4B942';
  return '#7BD389';
};
