import { mergeState, JEDI_RANK_MAP, RANKS, SSYRA_BOOKS } from './data.js';

// Accepts either a Jedi Quest backup file or a Wild Quest backup file and
// returns { state, source, summary }, or throws with a friendly message.
export function importBackup(raw) {
  let data;
  try { data = typeof raw === 'string' ? JSON.parse(raw) : raw; }
  catch { throw new Error("That file isn't a readable backup (not valid JSON)."); }

  if (!data || typeof data !== 'object' || !data.player || !data.config || !data.logs) {
    throw new Error('Invalid save file — missing player, config or logs.');
  }

  const isWild = data.app === 'wild-quest';
  const source = isWild ? 'Wild Quest' : 'Jedi Quest';
  const copy = JSON.parse(JSON.stringify(data));

  if (!isWild) {
    // Jedi -> Ranger rank swap. Everything else keeps the same shape and IDs.
    const old = copy.player.equippedRank;
    copy.player.equippedRank = JEDI_RANK_MAP[old] || (RANKS.some(r => r.id === old) ? old : 'cub');
    // Retheme only the untouched default reward name.
    if (Array.isArray(copy.config.rewards)) {
      copy.config.rewards = copy.config.rewards.map(r =>
        r.id === 'r1' && r.name === '🎬 Family Holo-Night' ? { ...r, name: '🎬 Family Movie Night' } : r);
    }
  }

  // Sanitise numbers so a hand-edited file can't break the app.
  const num = (v) => (Number.isFinite(Number(v)) ? Math.max(0, Math.round(Number(v))) : 0);
  ['xp', 'credits', 'streak', 'bestStreak', 'totalMathPages', 'booksFinished', 'totalReadingMinutes']
    .forEach(k => { if (k in copy.player) copy.player[k] = num(copy.player[k]); });

  const state = mergeState(copy);
  const validBooks = new Set(SSYRA_BOOKS.map(b => b.id));
  const books = Object.keys(state.logs.ssyra).filter(id => validBooks.has(id)).length;

  return {
    state,
    source,
    summary: {
      name: state.player.name,
      xp: state.player.xp,
      credits: state.player.credits,
      books,
      days: Object.keys(state.logs.daily).length,
      claimed: state.logs.claimed.length,
      rank: state.player.equippedRank,
    },
  };
}
