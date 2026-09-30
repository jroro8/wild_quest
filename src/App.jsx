import { useEffect, useRef, useState } from 'react';
import {
  DEFAULT_STATE, SSYRA_BOOKS, XP_PER_LEVEL, DRIBBLE_UP_ID, GUITAR_ID, RARITY, RANKS, SANCTUARY, STATUS_COLOR, dailyQuestion,
  todayStr, yesterdayStr, levelFromXp, xpInLevel, countQuestDays, getRank, getUnlockedRanks,
} from './data.js';
import { useGameState } from './sync.js';
import { importBackup } from './migrate.js';
import { RangerAvatar } from './avatar.jsx';
import {
  Zap, BookOpen, Flame, Star, Lock, Target, Gift, Settings, Plus, Trash2, Check, ChevronRight, Award,
  Shield, Sparkles, Tent, Compass, Flask, Backpack, PawPrint, Leaf, Cloud, CloudOff,
} from './icons.jsx';

// ---------- palette ----------
const C = {
  bg: '#07140E', panel: '#0E2418', text: '#E8F5E9', muted: '#A9BFAE',
  leaf: '#7BD389', sun: '#F4B942', teal: '#4FD1C5', clay: '#FF8A5B', berry: '#B794F4', red: '#FF6B6B',
};
const CUR = 'EC'; // Eco Coins

// =====================================================
// APP SHELL: lock screen -> game
// =====================================================
export default function App() {
  const game = useGameState();
  if (game.phase === 'loading') return <Splash text="HEADING INTO THE WILD..." />;
  if (game.phase === 'error') return <Splash text="CAN'T REACH BASE CAMP" sub="Check your internet connection and refresh the page." />;
  if (game.phase === 'locked') return <LockScreen onUnlock={game.unlock} error={game.lockError} />;
  return <Game {...game} />;
}

function Splash({ text, sub }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24, textAlign: 'center', background: `radial-gradient(ellipse at top, #16392A 0%, ${C.bg} 70%)` }}>
      <PawPrint size={40} color={C.sun} />
      <div className="display" style={{ color: C.leaf, letterSpacing: 4, fontSize: 18 }}>{text}</div>
      {sub && <div style={{ color: C.muted, fontSize: 14 }}>{sub}</div>}
    </div>
  );
}

function LockScreen({ onUnlock, error }) {
  const [pass, setPass] = useState('');
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: `radial-gradient(ellipse at top, #16392A 0%, ${C.bg} 70%)`, position: 'relative', overflow: 'hidden' }}>
      <Fireflies /><TreeLine />
      <form onSubmit={e => { e.preventDefault(); if (pass.trim()) onUnlock(pass); }} className="scale-in" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 360, background: 'rgba(14,36,24,0.92)', border: `2px solid ${C.leaf}`, padding: 22, textAlign: 'center' }}>
        <RangerAvatar rankId="cub" size={70} animated />
        <div className="display" style={{ fontSize: 26, color: C.sun, marginTop: 8 }}>WILD QUEST</div>
        <div style={{ color: C.muted, fontSize: 14, margin: '6px 0 16px' }}>Enter the family passcode to open your ranger log on this device.</div>
        <input autoFocus type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Passcode" aria-label="Family passcode" style={{ ...inputStyle, textAlign: 'center', fontSize: 18 }} />
        {error && <div style={{ color: C.red, fontSize: 13, marginTop: 8 }}>{error}</div>}
        <button type="submit" className="display" style={{ ...btn(C.leaf), width: '100%', marginTop: 12, padding: 14, fontSize: 16 }}>ENTER BASE CAMP</button>
      </form>
    </div>
  );
}

// =====================================================
// GAME
// =====================================================
function Game({ state, setState, mode, sync, notice, clearNotice, setupMissing, forgetDevice, saveNow }) {
  const [tab, setTab] = useState('base');
  const [toast, setToast] = useState(null);
  const [levelUp, setLevelUp] = useState(null);
  const [sideFx, setSideFx] = useState(null);
  const [guide, setGuide] = useState(null); // animal whose field guide page is open
  const prevLevel = useRef(levelFromXp(state.player.xp));
  const toastTimer = useRef(null);
  const earned = useRef(false);      // true only when XP came from a tap on this device
  const delayLevelFx = useRef(0);    // wait for a side-quest celebration to finish first

  useEffect(() => {
    const lvl = levelFromXp(state.player.xp);
    // Imports, HQ edits and syncs from other devices change levels silently.
    if (lvl > prevLevel.current && earned.current) {
      const wait = delayLevelFx.current;
      setTimeout(() => {
        setLevelUp(lvl);
        setTimeout(() => setLevelUp(null), 3200);
      }, wait);
    }
    earned.current = false;
    delayLevelFx.current = 0;
    prevLevel.current = lvl;
  }, [state.player.xp]);

  useEffect(() => { if (notice) { showToast('🔄 SYNCED FROM ANOTHER DEVICE', 'info'); clearNotice(); } }, [notice]); // eslint-disable-line

  const showToast = (msg, kind = 'win') => {
    clearTimeout(toastTimer.current);
    setToast({ msg, kind, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  };

  const withStreak = (player) => {
    const today = todayStr();
    let { streak, lastCheckIn } = player;
    if (lastCheckIn !== today) {
      streak = lastCheckIn === yesterdayStr() ? streak + 1 : 1;
      lastCheckIn = today;
    }
    return { ...player, streak, lastCheckIn, bestStreak: Math.max(player.bestStreak, streak) };
  };

  const addRewards = (xp, credits) => { earned.current = true; setState(s => ({
    ...s, player: withStreak({ ...s.player, xp: s.player.xp + xp, credits: s.player.credits + credits }),
  })); };

  const toggleQuest = (questId) => {
    const day = todayStr();
    const quest = state.config.quests.find(q => q.id === questId);
    if (!quest) return;
    const wasDone = (state.logs.daily[day]?.quests || []).includes(questId);

    if (wasDone) {
      setState(s => {
        const logs = structuredClone(s.logs);
        logs.daily[day].quests = logs.daily[day].quests.filter(id => id !== questId);
        return { ...s, logs, player: { ...s.player, xp: Math.max(0, s.player.xp - quest.xp), credits: Math.max(0, s.player.credits - quest.credits) } };
      });
      return;
    }

    let side = null;
    if (questId === DRIBBLE_UP_ID && !state.player.dribbleUpCelebrated
        && countQuestDays(state.logs, DRIBBLE_UP_ID) + 1 >= state.config.dribbleUp.goal) side = 'dribble';
    if (questId === GUITAR_ID && !state.player.guitarCelebrated
        && countQuestDays(state.logs, GUITAR_ID) + 1 >= state.config.guitarPractice.goal) side = 'guitar';

    earned.current = true;
    if (side) delayLevelFx.current = 4100;
    setState(s => {
      const logs = structuredClone(s.logs);
      if (!logs.daily[day]) logs.daily[day] = { quests: [] };
      if (!logs.daily[day].quests) logs.daily[day].quests = [];
      logs.daily[day].quests.push(questId);
      let xp = quest.xp, cr = quest.credits;
      const player = { ...s.player };
      if (side === 'dribble') { xp += s.config.dribbleUp.rewardXp; cr += s.config.dribbleUp.rewardCredits; player.dribbleUpCelebrated = true; }
      if (side === 'guitar')  { xp += s.config.guitarPractice.rewardXp; cr += s.config.guitarPractice.rewardCredits; player.guitarCelebrated = true; }
      return { ...s, logs, player: withStreak({ ...player, xp: player.xp + xp, credits: player.credits + cr }) };
    });

    if (side) {
      setSideFx(side);
      setTimeout(() => setSideFx(null), 4000);
      showToast(side === 'dribble' ? '🏀 60-DAY CHAMPION!' : '🎸 30-DAY VIRTUOSO!', 'big');
    } else {
      showToast(`+${quest.xp} XP  +${quest.credits} ${CUR}`);
    }
  };

  const toggleBook = (bookId) => {
    const { xpPerBook: xpPer, creditsPerBook: crPer, allFifteenBonusXp, allFifteenBonusCredits } = state.config.ssyra;
    if (state.logs.ssyra[bookId]) {
      setState(s => {
        const logs = structuredClone(s.logs);
        delete logs.ssyra[bookId];
        return { ...s, logs, player: { ...s.player, xp: Math.max(0, s.player.xp - xpPer), credits: Math.max(0, s.player.credits - crPer), booksFinished: Math.max(0, s.player.booksFinished - 1) } };
      });
      return;
    }
    const allDone = Object.keys(state.logs.ssyra).length + 1 === SSYRA_BOOKS.length;
    setState(s => {
      const logs = structuredClone(s.logs);
      logs.ssyra[bookId] = todayStr();
      return { ...s, logs, player: { ...s.player, booksFinished: s.player.booksFinished + 1 } };
    });
    if (allDone) {
      addRewards(xpPer + allFifteenBonusXp, crPer + allFifteenBonusCredits);
      showToast('📚 SSYRA CHAMPION — ALL 15!', 'big');
    } else {
      addRewards(xpPer, crPer);
      showToast(`📖 BOOK LOGGED  +${xpPer} XP  +${crPer} ${CUR}`, 'big');
    }
  };

  const logMath = ({ topic, pages }) => {
    const day = todayStr();
    const xp = pages * state.config.rates.mathXpPerPage;
    const cr = pages * state.config.rates.mathVbPerPage;
    setState(s => {
      const logs = structuredClone(s.logs);
      if (!logs.daily[day]) logs.daily[day] = { quests: [] };
      if (!logs.daily[day].math) logs.daily[day].math = [];
      logs.daily[day].math.push({ topic, pages, xp, cr });
      return { ...s, logs, player: { ...s.player, totalMathPages: s.player.totalMathPages + pages } };
    });
    addRewards(xp, cr);
    showToast(`+${xp} XP  +${cr} ${CUR}`);
  };

  const claimReward = (rewardId) => {
    const r = state.config.rewards.find(x => x.id === rewardId);
    if (!r) return;
    if (state.player.credits < r.cost) { showToast('NOT ENOUGH ECO COINS', 'fail'); return; }
    setState(s => ({
      ...s,
      player: { ...s.player, credits: s.player.credits - r.cost },
      logs: { ...s.logs, claimed: [...s.logs.claimed, { rewardId: r.id, name: r.name, cost: r.cost, rarity: r.rarity, date: todayStr() }] },
    }));
    showToast(`🎁 ${r.name.toUpperCase()} CLAIMED!`, 'big');
  };

  const answerQuiz = (pick) => {
    const day = todayStr();
    if (state.logs.quiz[day]) return;
    const q = dailyQuestion(day, levelFromXp(state.player.xp));
    const correct = pick === q.answer;
    setState(s => ({ ...s, logs: { ...s.logs, quiz: { ...s.logs.quiz, [day]: { qid: q.qid, pick, correct } } } }));
    if (correct) {
      addRewards(state.config.quiz.xp, state.config.quiz.credits);
      showToast(`🧠 CORRECT!  +${state.config.quiz.xp} XP  +${state.config.quiz.credits} ${CUR}`, 'big');
    } else {
      showToast('NOT QUITE — READ WHY BELOW', 'info');
    }
  };

  const equipRank = (rankId) => {
    const rank = getRank(rankId);
    if (rank.unlockLevel > levelFromXp(state.player.xp)) { showToast(`UNLOCKS AT LEVEL ${rank.unlockLevel}`, 'fail'); return; }
    setState(s => ({ ...s, player: { ...s.player, equippedRank: rankId } }));
    showToast(`🎖️ ${rank.name} EQUIPPED`, 'big');
  };

  return (
    <div style={{ minHeight: '100vh', background: `radial-gradient(ellipse at top, #16392A 0%, #0B1F15 45%, ${C.bg} 100%)`, color: C.text, paddingBottom: 90, position: 'relative', overflowX: 'hidden' }}>
      <Fireflies />
      <TreeLine />
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <TopHUD player={state.player} mode={mode} sync={sync} />
        <TabBar tab={tab} setTab={setTab} />
      </div>
      {mode === 'local' && <LocalBanner missing={setupMissing} />}
      <main style={{ padding: '0 14px', maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {tab === 'base'     && <BaseTab state={state} setTab={setTab} answerQuiz={answerQuiz} openGuide={setGuide} />}
        {tab === 'missions' && <MissionsTab state={state} toggleQuest={toggleQuest} />}
        {tab === 'books'    && <BooksTab state={state} toggleBook={toggleBook} />}
        {tab === 'lab'      && <LabTab state={state} onLog={logMath} />}
        {tab === 'ranger'   && <RangerTab state={state} equipRank={equipRank} openGuide={setGuide} />}
        {tab === 'depot'    && <DepotTab state={state} claim={claimReward} />}
        {tab === 'hq'       && <HQTab state={state} setState={setState} mode={mode} sync={sync} forgetDevice={forgetDevice} saveNow={saveNow} showToast={showToast} />}
      </main>
      {guide && <FieldGuidePage animal={guide} onClose={() => setGuide(null)} />}
      {toast && <Toast key={toast.id} toast={toast} />}
      {levelUp && <LevelUpOverlay level={levelUp} />}
      {sideFx === 'dribble' && <SideQuestOverlay days={state.config.dribbleUp.goal} title="CHAMPION" line="🏀 DRIBBLE UP MASTERED 🏀" prize={state.config.dribbleUp.prize} color={C.clay} />}
      {sideFx === 'guitar' && <SideQuestOverlay days={state.config.guitarPractice.goal} title="VIRTUOSO" line="🎸 GUITAR MASTERED 🎸" prize={state.config.guitarPractice.prize} color={C.berry} />}
    </div>
  );
}

// =====================================================
// BACKGROUND
// =====================================================
function Fireflies() {
  const flies = useRef(null);
  if (!flies.current) {
    flies.current = Array.from({ length: 26 }, () => ({
      x: Math.random() * 100, y: 30 + Math.random() * 65, s: Math.random() * 2.5 + 2,
      d: Math.random() * 6, t: 5 + Math.random() * 5,
    }));
  }
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {flies.current.map((f, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${f.x}%`, top: `${f.y}%`, width: f.s, height: f.s, borderRadius: '50%',
          background: '#FFF3B0', boxShadow: `0 0 ${f.s * 4}px ${f.s}px rgba(244,185,66,0.45)`,
          animation: `drift ${f.t}s ${f.d}s infinite ease-in-out`, opacity: 0,
        }} />
      ))}
    </div>
  );
}

function TreeLine() {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 60" preserveAspectRatio="none" style={{ position: 'fixed', left: 0, right: 0, bottom: 0, width: '100%', height: 70, zIndex: 1, pointerEvents: 'none', opacity: 0.9 }}>
      <path fill="#0A1A12" d="M0 60 L0 40 L10 22 L20 40 L28 28 L36 40 L48 14 L60 40 L70 30 L80 42 L92 18 L104 42 L116 32 L126 44 L140 20 L154 44 L166 34 L178 46 L190 24 L204 46 L216 36 L228 44 L242 16 L256 44 L268 34 L280 46 L292 26 L306 46 L318 36 L330 44 L344 18 L358 44 L370 32 L382 44 L392 28 L400 40 L400 60 Z" />
      <path fill="#050E09" d="M0 60 L0 50 L18 36 L34 52 L52 40 L70 54 L90 42 L112 55 L134 44 L156 56 L180 46 L204 56 L228 44 L252 55 L276 42 L300 54 L324 44 L348 55 L372 42 L400 52 L400 60 Z" />
    </svg>
  );
}

function LocalBanner({ missing }) {
  return (
    <div style={{ maxWidth: 720, margin: '10px auto 0', padding: '0 14px', position: 'relative', zIndex: 2 }}>
      <div style={{ padding: 10, background: 'rgba(244,185,66,0.12)', border: `1px dashed ${C.sun}`, fontSize: 12, color: C.sun, display: 'flex', gap: 8, alignItems: 'center' }}>
        <CloudOff size={16} color={C.sun} />
        <span>
          {missing
            ? `Cloud save isn't set up yet (missing ${missing.join(' and ')} in Vercel). Progress is only saved in this browser for now.`
            : 'Running without the cloud API. Progress is only saved in this browser.'}
        </span>
      </div>
    </div>
  );
}

// =====================================================
// TOP HUD
// =====================================================
function CoinIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill={C.sun} stroke="#C98F1C" strokeWidth="1.5" />
      <path d="M8 15.5c0-4 3-7 8-7-0.5 4.5-3 7.5-8 7Z" fill="#3B5E2B" />
      <path d="M8 15.5 L12 11.5" stroke={C.sun} strokeWidth="1" />
    </svg>
  );
}

function SyncDot({ mode, sync }) {
  if (mode === 'local') return <CloudOff size={16} color={C.sun} />;
  const map = { saved: [C.leaf, 'Saved'], saving: [C.teal, 'Saving…'], offline: [C.sun, 'Offline — will retry'], error: [C.red, 'Save failed — will retry'] };
  const [color, label] = map[sync] || map.saved;
  return <span title={label} aria-label={label} style={{ display: 'inline-flex' }}>{sync === 'offline' || sync === 'error' ? <CloudOff size={16} color={color} /> : <Cloud size={16} color={color} />}</span>;
}

function TopHUD({ player, mode, sync }) {
  const lvl = levelFromXp(player.xp);
  const xpIn = xpInLevel(player.xp);
  const pct = (xpIn / XP_PER_LEVEL) * 100;
  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(7,20,14,0.98), rgba(7,20,14,0.9))', backdropFilter: 'blur(8px)', borderBottom: `2px solid ${C.leaf}`, padding: '12px 14px 12px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 60, height: 60, flexShrink: 0, borderRadius: '50%', background: `linear-gradient(135deg, ${C.sun}, #D98E1E)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(244,185,66,0.45)' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: C.bg, border: `2px solid ${C.sun}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="display" style={{ fontSize: 8, color: C.sun, letterSpacing: 1.5 }}>LEVEL</div>
            <div className="display" style={{ fontSize: 22, color: '#fff', lineHeight: 1 }}>{lvl}</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div className="display" style={{ fontSize: 14, color: C.leaf, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{player.name}</div>
            {player.streak > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'rgba(255,138,91,0.18)', padding: '1px 7px', borderRadius: 4, border: `1px solid ${C.clay}` }}>
                <Flame size={12} color={C.clay} />
                <span className="display" style={{ fontSize: 11, color: C.clay }}>{player.streak}</span>
              </div>
            )}
            <span style={{ marginLeft: 'auto' }}><SyncDot mode={mode} sync={sync} /></span>
          </div>
          <div style={{ position: 'relative', height: 14, background: '#0B1F15', border: `1px solid ${C.leaf}`, borderRadius: 7, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: `linear-gradient(90deg, ${C.leaf}, ${C.sun})`, transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)' }} />
            <div className="shimmer" style={{ position: 'absolute', inset: 0, width: `${pct}%` }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, textShadow: '0 1px 2px #000' }}>{xpIn} / {XP_PER_LEVEL} XP</div>
          </div>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(244,185,66,0.14)', padding: '6px 10px', border: `1.5px solid ${C.sun}`, borderRadius: 6 }}>
          <CoinIcon />
          <span className="display" style={{ color: C.sun, fontSize: 16 }}>{player.credits.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// TABS
// =====================================================
const TABS = [
  { id: 'base',     label: 'BASE',     icon: Tent },
  { id: 'missions', label: 'MISSIONS', icon: Compass },
  { id: 'books',    label: 'BOOKS',    icon: BookOpen },
  { id: 'lab',      label: 'LAB',      icon: Flask },
  { id: 'ranger',   label: 'RANGER',   icon: PawPrint },
  { id: 'depot',    label: 'DEPOT',    icon: Backpack },
  { id: 'hq',       label: 'HQ',       icon: Settings },
];

function TabBar({ tab, setTab }) {
  return (
    <nav style={{ background: 'rgba(7,20,14,0.95)', backdropFilter: 'blur(6px)', borderBottom: '1px solid rgba(123,211,137,0.3)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${TABS.length}, 1fr)`, gap: 3, padding: '8px 6px' }}>
        {TABS.map(t => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} aria-current={active ? 'page' : undefined} className="display" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '6px 1px', cursor: 'pointer', borderRadius: 6,
              background: active ? `linear-gradient(135deg, ${C.leaf}, ${C.sun})` : 'rgba(255,255,255,0.05)',
              border: active ? 'none' : '1px solid rgba(123,211,137,0.3)',
              color: active ? C.bg : C.text, fontSize: 9.5, minWidth: 0, transition: 'all 0.2s',
            }}>
              <Icon size={15} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// =====================================================
// BASE CAMP (dashboard)
// =====================================================
function BaseTab({ state, setTab, answerQuiz, openGuide }) {
  const todayLog = state.logs.daily[todayStr()] || { quests: [] };
  const questsDone = (todayLog.quests || []).length;
  const booksDone = Object.keys(state.logs.ssyra).length;
  const rank = getRank(state.player.equippedRank);
  const rar = RARITY[rank.rarity];
  const lvl = levelFromXp(state.player.xp);
  const rescued = SANCTUARY.filter(a => a.level <= lvl);
  const latest = rescued[rescued.length - 1];
  const next = SANCTUARY.find(a => a.level > lvl);

  const dribbleCount = countQuestDays(state.logs, DRIBBLE_UP_ID);
  const guitarCount = countQuestDays(state.logs, GUITAR_ID);

  return (
    <div className="slide-up" style={{ paddingTop: 16 }}>
      <button onClick={() => setTab('ranger')} style={{
        width: '100%', cursor: 'pointer', marginBottom: 16, borderRadius: 10,
        background: `linear-gradient(135deg, ${rar.color}35 0%, transparent 60%)`,
        border: `2px solid ${rar.color}`, boxShadow: `0 0 22px ${rar.glow}`,
        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', textAlign: 'left', color: '#fff',
      }}>
        <RangerAvatar rankId={rank.id} size={78} animated />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="display" style={{ fontSize: 10, color: rar.color, letterSpacing: 1.5 }}>{rar.label} · RANK</div>
          <div className="display" style={{ fontSize: 17, color: '#fff', lineHeight: 1.1, marginTop: 2 }}>{rank.name}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
            <PawPrint size={12} /> {rescued.length} / {SANCTUARY.length} species protected
          </div>
          {next && <div style={{ fontSize: 12, color: C.teal, marginTop: 2 }}>Next: {next.emoji} {next.name} at level {next.level}</div>}
        </div>
        <ChevronRight size={18} color={rar.color} />
      </button>

      <div className="display" style={{ fontSize: 12, color: C.sun, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Star size={14} color={C.sun} /> ACTIVE EXPEDITIONS
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <SideQuestCard emoji="🎸" title={`${state.config.guitarPractice.goal}-DAY GUITAR`} prize={state.config.guitarPractice.prize} count={guitarCount} goal={state.config.guitarPractice.goal} color={C.berry} />
        <SideQuestCard emoji="🏀" title={`${state.config.dribbleUp.goal}-DAY DRIBBLE`} prize={state.config.dribbleUp.prize} count={dribbleCount} goal={state.config.dribbleUp.goal} color={C.clay} />
      </div>

      <QuizCard state={state} answerQuiz={answerQuiz} openGuide={openGuide} />

      <SectionHeader icon={Compass} title="FIELD BRIEFING" sub={new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <StatCard onClick={() => setTab('missions')} icon={Compass} label="MISSIONS" value={`${questsDone}/${state.config.quests.length}`} accent={C.teal} />
        <StatCard onClick={() => setTab('books')} icon={BookOpen} label="SSYRA" value={`${booksDone}/${SSYRA_BOOKS.length}`} accent={C.leaf} />
      </div>

      <div style={{ ...card(C.clay), background: 'linear-gradient(135deg, rgba(255,138,91,0.2), rgba(244,185,66,0.1))', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="display" style={{ fontSize: 12, color: C.clay }}>TRAIL STREAK</div>
            <div className="display" style={{ fontSize: 34, color: '#fff', lineHeight: 1 }}>{state.player.streak} <span style={{ fontSize: 14, color: C.clay }}>DAYS</span></div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>BEST: {state.player.bestStreak}</div>
          </div>
          <Flame size={54} color={C.clay} style={{ filter: `drop-shadow(0 0 12px ${C.clay})` }} />
        </div>
      </div>

      {latest && (
        <button onClick={() => openGuide(latest)} style={{ ...card(STATUS_COLOR(latest.status)), width: '100%', background: 'rgba(255,255,255,0.03)', color: C.text, textAlign: 'left', cursor: 'pointer', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 42 }} aria-hidden="true">{latest.emoji}</div>
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontSize: 11, color: STATUS_COLOR(latest.status) }}>NEWEST IN YOUR SANCTUARY</div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>{latest.name} <i style={{ fontWeight: 600, color: C.muted }}>{latest.sci}</i></div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.4 }}>{latest.facts[0]}</div>
            <div className="display" style={{ fontSize: 10, color: C.teal, marginTop: 4 }}>OPEN FIELD GUIDE →</div>
          </div>
        </button>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
        <CareerCard label="TOTAL XP" value={state.player.xp.toLocaleString()} />
        <CareerCard label="BOOKS DONE" value={state.player.booksFinished} />
        <CareerCard label="MATH PAGES" value={state.player.totalMathPages} />
      </div>

      <SectionHeader icon={Sparkles} title="QUICK TRAILS" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <QuickAction onClick={() => setTab('missions')} color={C.teal} label="DAILY MISSIONS" icon={Compass} />
        <QuickAction onClick={() => setTab('books')} color={C.leaf} label="SSYRA BOOKS" icon={BookOpen} />
        <QuickAction onClick={() => setTab('lab')} color={C.berry} label="LOG MATH" icon={Flask} />
        <QuickAction onClick={() => setTab('depot')} color={C.sun} label="SUPPLY DEPOT" icon={Backpack} />
      </div>
    </div>
  );
}

function SideQuestCard({ emoji, title, prize, count, goal, color }) {
  const done = count >= goal;
  const pct = Math.min(100, (count / goal) * 100);
  const c = done ? C.sun : color;
  return (
    <div style={{ padding: 12, borderRadius: 10, background: `linear-gradient(135deg, ${c}22, transparent 80%)`, border: `2px solid ${c}`, boxShadow: done ? `0 0 16px ${C.sun}55` : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 16 }} aria-hidden="true">{emoji}</span>
        <span className="display" style={{ fontSize: 10, color: c }}>{title}</span>
      </div>
      <div style={{ fontSize: 12, color: '#fff', fontWeight: 800, marginBottom: 4, minHeight: 16 }}>🎁 {prize}</div>
      <div className="display" style={{ fontSize: 22, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
        {count}<span style={{ fontSize: 12, color: C.muted }}> / {goal}</span>
      </div>
      <div style={{ height: 8, background: '#0B1F15', border: `1px solid ${c}`, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${done ? C.sun : color})`, transition: 'width 0.6s' }} />
      </div>
      {done && <div className="display" style={{ fontSize: 9, color: C.sun, marginTop: 4 }}>🏆 UNLOCKED!</div>}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent, onClick }) {
  return (
    <button onClick={onClick} style={{ ...card(accent), background: 'rgba(255,255,255,0.04)', cursor: 'pointer', textAlign: 'left', color: '#fff' }}>
      <Icon size={20} color={accent} style={{ marginBottom: 6 }} />
      <div className="display" style={{ fontSize: 11, color: accent }}>{label}</div>
      <div className="display" style={{ fontSize: 24, color: '#fff', lineHeight: 1, marginTop: 2 }}>{value}</div>
    </button>
  );
}

function CareerCard({ label, value }) {
  return (
    <div style={{ background: 'rgba(123,211,137,0.07)', border: '1px solid rgba(123,211,137,0.3)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
      <div className="display" style={{ fontSize: 9.5, color: C.leaf }}>{label}</div>
      <div className="display" style={{ fontSize: 19, color: '#fff', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, color, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: 14, borderRadius: 10, cursor: 'pointer', color: '#fff', background: `linear-gradient(135deg, ${color}30, transparent)`, border: `1.5px solid ${color}`, display: 'flex', alignItems: 'center', gap: 10 }}>
      <Icon size={20} color={color} />
      <span className="display" style={{ fontSize: 12.5, textAlign: 'left' }}>{label}</span>
      <ChevronRight size={16} color={color} style={{ marginLeft: 'auto', flexShrink: 0 }} />
    </button>
  );
}

function SectionHeader({ icon: Icon, title, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, marginTop: 4 }}>
      <Icon size={22} color={C.leaf} />
      <div>
        <h2 className="display" style={{ fontSize: 18, color: '#fff', margin: 0 }}>{title}</h2>
        {sub && <div style={{ fontSize: 12, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8 }}>{sub}</div>}
      </div>
    </div>
  );
}

// =====================================================
// MISSIONS (daily quests)
// =====================================================
function MissionsTab({ state, toggleQuest }) {
  const todayLog = state.logs.daily[todayStr()] || { quests: [] };
  const done = todayLog.quests || [];
  return (
    <div className="slide-up" style={{ paddingTop: 16 }}>
      <SectionHeader icon={Compass} title="DAILY MISSIONS" sub={`Every ranger trains daily · Earn XP & Eco Coins`} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {state.config.quests.map(q => {
          const isDone = done.includes(q.id);
          const isDribble = q.id === DRIBBLE_UP_ID, isGuitar = q.id === GUITAR_ID;
          return (
            <button key={q.id} onClick={() => toggleQuest(q.id)} aria-pressed={isDone} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: 14, cursor: 'pointer', borderRadius: 10, color: '#fff', textAlign: 'left',
              background: isDone ? 'linear-gradient(90deg, rgba(123,211,137,0.22), transparent)' : 'rgba(255,255,255,0.04)',
              border: isDone ? `2px solid ${C.leaf}` : `1.5px solid ${isDribble || isGuitar ? 'rgba(255,138,91,0.6)' : 'rgba(79,209,197,0.4)'}`,
            }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: isDone ? C.leaf : 'transparent', border: `2px solid ${isDone ? C.leaf : C.teal}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isDone && <Check size={16} color={C.bg} strokeWidth={3} />}
              </div>
              <div style={{ fontSize: 24, flexShrink: 0 }} aria-hidden="true">{q.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, textDecoration: isDone ? 'line-through' : 'none', opacity: isDone ? 0.65 : 1 }}>{q.name}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                  <Pill color={C.teal} text={`+${q.xp} XP`} />
                  <Pill color={C.sun} text={`+${q.credits} ${CUR}`} />
                  {isDribble && <Pill color={C.clay} text={`${state.config.dribbleUp.goal}-DAY EXPEDITION`} />}
                  {isGuitar && <Pill color={C.berry} text={`${state.config.guitarPractice.goal}-DAY EXPEDITION`} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <Tip>Missions reset every day. Tap a finished mission to undo it. Dribble Up and Guitar days count toward their expeditions.</Tip>
    </div>
  );
}

function Pill({ color, text }) {
  return <span className="display" style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: `${color}25`, border: `1px solid ${color}`, color }}>{text}</span>;
}

function Tip({ children }) {
  return <div style={{ marginTop: 18, padding: 12, borderRadius: 8, background: 'rgba(123,211,137,0.06)', border: `1px dashed ${C.leaf}`, fontSize: 13, color: C.muted }}>🌿 {children}</div>;
}

// =====================================================
// BOOKS (SSYRA)
// =====================================================
function BooksTab({ state, toggleBook }) {
  const done = Object.keys(state.logs.ssyra).length;
  const total = SSYRA_BOOKS.length;
  const pct = (done / total) * 100;
  const allDone = done >= total;
  const c = allDone ? C.sun : C.leaf;
  return (
    <div className="slide-up" style={{ paddingTop: 16 }}>
      <SectionHeader icon={BookOpen} title="FIELD LIBRARY" sub={`SSYRA 2026–2027 Reading Challenge · ${done} / ${total}`} />
      <div style={{ ...card(c), marginBottom: 16, background: allDone ? 'linear-gradient(135deg, rgba(244,185,66,0.2), rgba(255,138,91,0.1))' : 'rgba(123,211,137,0.08)' }}>
        <div className="display" style={{ fontSize: 13, color: c, marginBottom: 8 }}>{allDone ? '🏆 SSYRA CHAMPION' : 'READING PROGRESS'}</div>
        <div style={{ height: 16, background: '#0B1F15', border: `1px solid ${c}`, borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: allDone ? `linear-gradient(90deg, ${C.clay}, ${C.sun})` : `linear-gradient(90deg, ${C.leaf}, ${C.teal})`, transition: 'width 0.6s' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, textShadow: '0 1px 2px #000' }}>{Math.round(pct)}%</div>
        </div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>
          {allDone
            ? `All 15 books complete! Champion bonus: +${state.config.ssyra.allFifteenBonusXp} XP, +${state.config.ssyra.allFifteenBonusCredits} ${CUR}`
            : `+${state.config.ssyra.xpPerBook} XP + ${state.config.ssyra.creditsPerBook} ${CUR} per book · Bonus for all 15!`}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {SSYRA_BOOKS.map((book, i) => {
          const doneDate = state.logs.ssyra[book.id];
          return (
            <div key={book.id} style={{ padding: 12, borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 10, background: doneDate ? 'linear-gradient(90deg, rgba(123,211,137,0.15), transparent)' : 'rgba(255,255,255,0.04)', border: doneDate ? `2px solid ${C.leaf}` : '1.5px solid rgba(79,209,197,0.3)' }}>
              <button onClick={() => toggleBook(book.id)} aria-label={doneDate ? `Mark ${book.title} not finished` : `Mark ${book.title} finished`} style={{ width: 34, height: 34, flexShrink: 0, marginTop: 2, borderRadius: 6, cursor: 'pointer', background: doneDate ? C.leaf : 'transparent', border: `2px solid ${doneDate ? C.leaf : C.teal}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {doneDate ? <Check size={18} color={C.bg} strokeWidth={3} /> : <span style={{ fontSize: 13, color: C.teal, fontWeight: 800 }}>{i + 1}</span>}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: doneDate ? C.leaf : '#fff' }}>{doneDate && '📖 '}{book.title}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>by {book.author}</div>
                <div style={{ fontSize: 13, color: '#CFE3D3', marginTop: 6, lineHeight: 1.4 }}>{book.blurb}</div>
                {doneDate && <div style={{ fontSize: 11, color: C.leaf, marginTop: 6, fontWeight: 800, letterSpacing: 1 }}>✓ FINISHED {doneDate}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =====================================================
// LAB (math)
// =====================================================
function LabTab({ state, onLog }) {
  const [topic, setTopic] = useState('');
  const [pages, setPages] = useState('');
  const mathToday = (state.logs.daily[todayStr()] || {}).math || [];
  const submit = (e) => {
    e.preventDefault();
    const p = parseInt(pages, 10);
    if (!p || p <= 0) return;
    onLog({ topic: topic.trim() || 'Practice', pages: p });
    setTopic(''); setPages('');
  };
  return (
    <div className="slide-up" style={{ paddingTop: 16 }}>
      <SectionHeader icon={Flask} title="RESEARCH LAB" sub={`${state.config.rates.mathXpPerPage} XP per math page · Scientists count everything`} />
      <form onSubmit={submit} style={{ ...card(C.berry), background: 'rgba(183,148,244,0.08)', marginBottom: 16 }}>
        <Field label="🎯 TOPIC (optional)"><input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Multiplication, fractions, etc." style={inputStyle} /></Field>
        <Field label="📄 PAGES COMPLETED"><input type="number" inputMode="numeric" min="1" value={pages} onChange={e => setPages(e.target.value)} placeholder="1" style={inputStyle} /></Field>
        <button type="submit" disabled={!pages} className="display" style={{ width: '100%', marginTop: 6, padding: 14, borderRadius: 8, cursor: pages ? 'pointer' : 'not-allowed', background: pages ? `linear-gradient(135deg, ${C.berry}, ${C.teal})` : '#0B1F15', color: '#fff', border: 'none', fontSize: 15, opacity: pages ? 1 : 0.5 }}>🔬 LOG FIELD DATA</button>
      </form>
      {mathToday.length > 0 && (
        <>
          <div className="display" style={{ fontSize: 13, color: C.berry, marginBottom: 8 }}>TODAY'S DATA</div>
          {mathToday.map((m, i) => (
            <div key={i} style={{ background: 'rgba(183,148,244,0.06)', border: '1px solid rgba(183,148,244,0.4)', borderRadius: 8, padding: 10, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Target size={16} color={C.berry} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{m.topic}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{m.pages} {m.pages === 1 ? 'page' : 'pages'}</div>
              </div>
              <Pill color={C.teal} text={`+${m.xp}`} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: 6, background: 'rgba(0,0,0,0.35)', border: '1.5px solid rgba(123,211,137,0.4)', color: C.text, fontSize: 15, boxSizing: 'border-box' };
const card = (color) => ({ padding: 14, borderRadius: 10, border: `2px solid ${color}` });
const btn = (bg, fg = C.bg) => ({ padding: '10px 14px', cursor: 'pointer', background: bg, color: fg, border: 'none', borderRadius: 6, fontSize: 13, letterSpacing: 1 });

function Field({ label, children }) {
  return (
    <label style={{ display: 'block', marginBottom: 10 }}>
      <div className="display" style={{ fontSize: 11, color: C.leaf, marginBottom: 4 }}>{label}</div>
      {children}
    </label>
  );
}

// =====================================================
// RANGER (ranks + sanctuary)
// =====================================================
function RangerTab({ state, equipRank, openGuide }) {
  const lvl = levelFromXp(state.player.xp);
  const equipped = state.player.equippedRank;
  const rank = getRank(equipped);
  const rar = RARITY[rank.rarity];
  const unlockedCount = getUnlockedRanks(lvl).length;
  const rescued = SANCTUARY.filter(a => a.level <= lvl).length;
  return (
    <div className="slide-up" style={{ paddingTop: 16 }}>
      <SectionHeader icon={Shield} title="RANGER CORPS" sub={`${unlockedCount} / ${RANKS.length} ranks unlocked · Level ${lvl}`} />
      <div style={{ ...card(rar.color), background: `linear-gradient(135deg, ${rar.color}30, transparent 70%)`, boxShadow: `0 0 28px ${rar.glow}`, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
        <RangerAvatar rankId={rank.id} size={100} animated />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="display" style={{ fontSize: 11, color: rar.color }}>EQUIPPED · {rar.label}</div>
          <div className="display" style={{ fontSize: 20, color: '#fff', marginTop: 2 }}>{rank.name}</div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>🎖️ {state.player.name}</div>
        </div>
      </div>

      <div className="display" style={{ fontSize: 13, color: C.leaf, marginBottom: 10 }}>RANK COLLECTION</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {RANKS.map(rk => {
          const r = RARITY[rk.rarity];
          const unlocked = rk.unlockLevel <= lvl;
          const isEq = equipped === rk.id;
          return (
            <button key={rk.id} onClick={() => equipRank(rk.id)} disabled={!unlocked} style={{
              position: 'relative', cursor: unlocked ? 'pointer' : 'not-allowed', padding: 12, borderRadius: 10, color: '#fff', textAlign: 'center',
              background: unlocked ? `linear-gradient(180deg, ${r.color}20, transparent 70%)` : 'rgba(0,0,0,0.35)',
              border: isEq ? `2.5px solid ${r.color}` : `1.5px solid ${unlocked ? r.color : 'rgba(255,255,255,0.15)'}`,
              boxShadow: isEq ? `0 0 18px ${r.glow}` : 'none', opacity: unlocked ? 1 : 0.55,
            }}>
              {isEq && <div className="display" style={{ position: 'absolute', top: 6, right: 6, fontSize: 9, padding: '2px 6px', borderRadius: 4, background: r.color, color: C.bg }}>EQUIPPED</div>}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <div style={{ filter: unlocked ? 'none' : 'grayscale(1) brightness(0.5)' }}><RangerAvatar rankId={rk.id} size={66} /></div>
                {!unlocked && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={28} color="#fff" /></div>}
              </div>
              <div className="display" style={{ fontSize: 9, color: r.color }}>{r.label}</div>
              <div className="display" style={{ fontSize: 11.5, color: '#fff', marginTop: 2, lineHeight: 1.15 }}>{rk.name}</div>
              <div style={{ fontSize: 11, color: unlocked ? C.muted : C.sun, marginTop: 4 }}>{unlocked ? `LVL ${rk.unlockLevel}` : `🔒 LVL ${rk.unlockLevel}`}</div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 24 }}>
        <SectionHeader icon={PawPrint} title="FIELD GUIDE" sub={`${rescued} / ${SANCTUARY.length} species unlocked · a new one every level · tap to open`} />
        <QuizStats state={state} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
          {SANCTUARY.map(a => {
            const open = a.level <= lvl;
            const sc = STATUS_COLOR(a.status);
            return (
              <button key={a.id} onClick={() => open && openGuide(a)} disabled={!open} aria-label={open ? `Open field guide: ${a.name}` : `Locked until level ${a.level}`} style={{ padding: 12, borderRadius: 10, color: C.text, textAlign: 'left', cursor: open ? 'pointer' : 'default', background: open ? `linear-gradient(180deg, ${sc}1f, transparent 80%)` : 'rgba(0,0,0,0.35)', border: `1.5px solid ${open ? sc : 'rgba(255,255,255,0.12)'}` }}>
                <div style={{ fontSize: 36, textAlign: 'center', filter: open ? 'none' : 'grayscale(1) brightness(0.35)' }} aria-hidden="true">{a.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 13.5, textAlign: 'center', marginTop: 4 }}>{open ? a.name : '???'}</div>
                {open ? (
                  <>
                    <div className="display" style={{ fontSize: 9.5, color: sc, textAlign: 'center', marginTop: 2 }}>{a.status.toUpperCase()}</div>
                    <div style={{ fontSize: 11, color: C.muted, textAlign: 'center', fontStyle: 'italic' }}>{a.sci}</div>
                    <div className="display" style={{ fontSize: 10, color: C.teal, textAlign: 'center', marginTop: 6 }}>OPEN FILE →</div>
                  </>
                ) : (
                  <div style={{ fontSize: 12, color: C.sun, textAlign: 'center', marginTop: 4 }}>🔒 Reach level {a.level}</div>
                )}
              </button>
            );
          })}
        </div>
        <Tip>Statuses come from the IUCN Red List (Least Concern → Vulnerable → Endangered → Critically Endangered). The Florida panther's status is from the U.S. endangered species list. Population numbers are the latest published estimates (2025–2026) and change as scientists count again.</Tip>
      </div>
    </div>
  );
}

// =====================================================
// DAILY FIELD QUIZ + FIELD GUIDE PAGE
// =====================================================
function QuizCard({ state, answerQuiz, openGuide }) {
  const day = todayStr();
  const saved = state.logs.quiz[day];
  const q = dailyQuestion(day, levelFromXp(state.player.xp), saved?.qid);
  const unlocked = q.animal.level <= levelFromXp(state.player.xp);
  return (
    <div style={{ ...card(C.teal), background: 'linear-gradient(135deg, rgba(79,209,197,0.16), rgba(183,148,244,0.1))', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 22 }} aria-hidden="true">🧠</span>
        <div className="display" style={{ fontSize: 13, color: C.teal, flex: 1 }}>DAILY FIELD QUIZ</div>
        <Pill color={C.sun} text={`+${state.config.quiz.xp} XP · +${state.config.quiz.credits} ${CUR}`} />
      </div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{q.animal.emoji} {unlocked ? q.animal.name : 'Mystery species'}</div>
      <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.35, marginBottom: 10 }}>{q.q}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer;
          const isPick = saved && saved.pick === i;
          const bg = !saved ? 'rgba(255,255,255,0.06)' : isAnswer ? 'rgba(123,211,137,0.25)' : isPick ? 'rgba(255,107,107,0.22)' : 'rgba(255,255,255,0.03)';
          const bd = !saved ? 'rgba(79,209,197,0.5)' : isAnswer ? C.leaf : isPick ? C.red : 'rgba(255,255,255,0.1)';
          return (
            <button key={i} onClick={() => answerQuiz(i)} disabled={!!saved} style={{ padding: '11px 12px', borderRadius: 8, textAlign: 'left', cursor: saved ? 'default' : 'pointer', background: bg, border: `1.5px solid ${bd}`, color: C.text, fontSize: 14.5, fontWeight: 700, display: 'flex', gap: 8 }}>
              <span style={{ color: C.teal }}>{'ABC'[i]}.</span><span style={{ flex: 1 }}>{opt}</span>
              {saved && isAnswer && <span aria-label="correct">✅</span>}
              {saved && isPick && !isAnswer && <span aria-label="your answer">❌</span>}
            </button>
          );
        })}
      </div>
      {saved && (
        <div className="scale-in" style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.45 }}>
          <b style={{ color: saved.correct ? C.leaf : C.sun }}>{saved.correct ? 'Correct! ' : 'Good try! '}</b>{q.why}
          {unlocked && <button onClick={() => openGuide(q.animal)} style={{ display: 'block', marginTop: 6, background: 'none', border: 'none', padding: 0, color: C.teal, cursor: 'pointer', fontWeight: 800, fontSize: 13 }}>Read the {q.animal.name} file →</button>}
          <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>A new question unlocks tomorrow.</div>
        </div>
      )}
    </div>
  );
}

function QuizStats({ state }) {
  const all = Object.values(state.logs.quiz || {});
  if (!all.length) return null;
  const right = all.filter(x => x.correct).length;
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <CareerCard label="QUIZZES" value={all.length} />
      <CareerCard label="CORRECT" value={right} />
      <CareerCard label="ACCURACY" value={`${Math.round((right / all.length) * 100)}%`} />
    </div>
  );
}

function FieldGuidePage({ animal: a, onClose }) {
  const sc = STATUS_COLOR(a.status);
  const ref = useRef(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    ref.current?.focus();
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  const Section = ({ icon, title, children }) => (
    <div style={{ marginTop: 14 }}>
      <div className="display" style={{ fontSize: 12, color: C.sun, marginBottom: 4 }}>{icon} {title}</div>
      <div style={{ fontSize: 14, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
  const Stat = ({ label, value }) => (
    <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(123,211,137,0.25)', borderRadius: 8, padding: '8px 10px' }}>
      <div className="display" style={{ fontSize: 9.5, color: C.leaf }}>{label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.35, marginTop: 2 }}>{value}</div>
    </div>
  );
  return (
    <div role="dialog" aria-modal="true" aria-label={`${a.name} field guide`} onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(3,10,7,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div ref={ref} tabIndex={-1} className="slide-up" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 640, maxHeight: '92vh', overflowY: 'auto', background: '#0E2418', borderTop: `3px solid ${sc}`, borderRadius: '16px 16px 0 0', padding: '16px 16px 28px', outline: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ fontSize: 54, lineHeight: 1 }} aria-hidden="true">{a.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="display" style={{ fontSize: 10, color: C.teal }}>FIELD FILE #{String(a.level).padStart(2, '0')}</div>
            <h2 className="display" style={{ fontSize: 22, margin: '2px 0 0', color: '#fff', lineHeight: 1.1 }}>{a.name}</h2>
            <div style={{ fontStyle: 'italic', color: C.muted, fontSize: 14 }}>{a.sci}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{a.group}</div>
          </div>
          <button onClick={onClose} aria-label="Close field guide" style={{ ...btn('rgba(255,255,255,0.08)', '#fff'), padding: '6px 10px', fontSize: 16 }}>✕</button>
        </div>
        <div style={{ display: 'inline-block', marginTop: 10, padding: '4px 10px', borderRadius: 999, background: `${sc}25`, border: `1.5px solid ${sc}`, color: sc, fontWeight: 800, fontSize: 12 }}>
          {a.status.toUpperCase()}
        </div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>📊 {a.population}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
          <Stat label="RANGE" value={a.range} />
          <Stat label="HABITAT" value={a.habitat} />
          <Stat label="DIET" value={a.diet} />
          <Stat label="SIZE" value={a.size} />
        </div>

        <Section icon="⚡" title="SURVIVAL ADAPTATIONS">
          <ul style={{ margin: 0, paddingLeft: 18 }}>{a.adaptations.map((x, i) => <li key={i} style={{ marginBottom: 4 }}>{x}</li>)}</ul>
        </Section>
        <Section icon="🌿" title="ROLE IN THE ECOSYSTEM">{a.ecology}</Section>
        <Section icon="⚠️" title="THREATS">{a.threats}</Section>
        <Section icon="🛡️" title="WHAT'S HELPING">{a.helping}</Section>
        <Section icon="🔬" title="EXPERT FACTS">
          <ul style={{ margin: 0, paddingLeft: 18 }}>{a.facts.map((x, i) => <li key={i} style={{ marginBottom: 4 }}>{x}</li>)}</ul>
        </Section>
      </div>
    </div>
  );
}

// =====================================================
// SUPPLY DEPOT (rewards)
// =====================================================
function DepotTab({ state, claim }) {
  return (
    <div className="slide-up" style={{ paddingTop: 16 }}>
      <SectionHeader icon={Backpack} title="SUPPLY DEPOT" sub={`You have ${state.player.credits.toLocaleString()} Eco Coins`} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {state.config.rewards.map(r => {
          const rar = RARITY[r.rarity] || RARITY.common;
          const can = state.player.credits >= r.cost;
          return (
            <div key={r.id} style={{ ...card(rar.color), background: `linear-gradient(135deg, ${rar.color}25, transparent 80%)`, boxShadow: can ? `0 0 18px ${rar.glow}` : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: '50%', background: rar.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Gift size={22} color={C.bg} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="display" style={{ fontSize: 10, color: rar.color }}>{rar.label}</div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{r.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}><CoinIcon size={13} /><span className="display" style={{ fontSize: 14, color: C.sun }}>{r.cost.toLocaleString()}</span></div>
              </div>
              <button onClick={() => claim(r.id)} disabled={!can} aria-label={can ? `Claim ${r.name}` : `${r.name} locked`} className="display" style={{ ...btn(can ? rar.color : 'rgba(255,255,255,0.1)', can ? C.bg : '#777'), cursor: can ? 'pointer' : 'not-allowed', flexShrink: 0 }}>
                {can ? 'CLAIM' : <Lock size={14} />}
              </button>
            </div>
          );
        })}
      </div>
      {state.logs.claimed.length > 0 && (
        <>
          <div className="display" style={{ fontSize: 13, color: C.leaf, marginTop: 24, marginBottom: 8 }}>✓ CLAIMED REWARDS</div>
          {state.logs.claimed.slice().reverse().map((c, i) => {
            const rar = RARITY[c.rarity] || RARITY.common;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${rar.color}`, marginBottom: 4 }}>
                <Award size={14} color={rar.color} />
                <span style={{ fontSize: 14 }}>{c.name}</span>
                <span style={{ fontSize: 11, color: C.muted, marginLeft: 'auto' }}>{c.date}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

// =====================================================
// HQ (parent controls)
// =====================================================
function HQTab(props) {
  const [section, setSection] = useState('player');
  const sections = [['player', 'PLAYER'], ['missions', 'MISSIONS'], ['rewards', 'REWARDS'], ['rates', 'RATES'], ['backup', 'BACKUP'], ['device', 'SYNC'], ['reset', 'RESET']];
  return (
    <div className="slide-up" style={{ paddingTop: 16 }}>
      <SectionHeader icon={Settings} title="RANGER HQ" sub="Parent controls" />
      <div style={{ display: 'flex', gap: 4, marginBottom: 14, overflowX: 'auto', paddingBottom: 4 }}>
        {sections.map(([id, label]) => (
          <button key={id} onClick={() => setSection(id)} className="display" style={{ padding: '7px 11px', flexShrink: 0, cursor: 'pointer', borderRadius: 6, background: section === id ? C.leaf : 'rgba(255,255,255,0.06)', color: section === id ? C.bg : '#fff', border: 'none', fontSize: 12 }}>{label}</button>
        ))}
      </div>
      {section === 'player' && <HQPlayer {...props} />}
      {section === 'missions' && <HQList type="quests" {...props} />}
      {section === 'rewards' && <HQList type="rewards" {...props} />}
      {section === 'rates' && <HQRates {...props} />}
      {section === 'backup' && <HQBackup {...props} />}
      {section === 'device' && <HQDevice {...props} />}
      {section === 'reset' && <HQReset {...props} />}
    </div>
  );
}

function HQPlayer({ state, setState }) {
  const update = (field, value) => setState(s => ({ ...s, player: { ...s.player, [field]: value } }));
  return (
    <div style={{ ...card(C.leaf), background: 'rgba(123,211,137,0.06)' }}>
      <Field label="RANGER NAME"><input value={state.player.name} onChange={e => update('name', e.target.value.slice(0, 20))} style={inputStyle} maxLength={20} /></Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Field label="MANUAL XP ADJUST"><input type="number" value={state.player.xp} onChange={e => update('xp', Math.max(0, parseInt(e.target.value) || 0))} style={inputStyle} /></Field>
        <Field label="MANUAL ECO COINS"><input type="number" value={state.player.credits} onChange={e => update('credits', Math.max(0, parseInt(e.target.value) || 0))} style={inputStyle} /></Field>
      </div>
      <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>Use these only to fix mistakes. Earned XP and coins update automatically.</div>
    </div>
  );
}

function HQList({ type, state, setState }) {
  const list = state.config[type];
  const updateItem = (id, field, value) => setState(s => ({ ...s, config: { ...s.config, [type]: s.config[type].map(it => (it.id === id ? { ...it, [field]: value } : it)) } }));
  const removeItem = (id) => setState(s => ({ ...s, config: { ...s.config, [type]: s.config[type].filter(it => it.id !== id) } }));
  const addItem = () => {
    const id = `${type[0]}_${Date.now()}`;
    const item = type === 'quests' ? { id, name: 'New Mission', xp: 25, credits: 10, emoji: '🌱' } : { id, name: 'New Reward', cost: 500, rarity: 'uncommon' };
    setState(s => ({ ...s, config: { ...s.config, [type]: [...s.config[type], item] } }));
  };
  return (
    <div>
      {list.map(item => (
        <div key={item.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(123,211,137,0.3)', borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <Field label="NAME"><input value={item.name} onChange={e => updateItem(item.id, 'name', e.target.value)} style={inputStyle} /></Field>
          <div style={{ display: 'grid', gridTemplateColumns: type === 'rewards' ? '1fr 1fr' : '1fr 1fr 1fr', gap: 8 }}>
            {type === 'quests' ? (
              <>
                <Field label="EMOJI"><input value={item.emoji} onChange={e => updateItem(item.id, 'emoji', e.target.value.slice(0, 4))} style={inputStyle} /></Field>
                <Field label="XP"><input type="number" value={item.xp} onChange={e => updateItem(item.id, 'xp', parseInt(e.target.value) || 0)} style={inputStyle} /></Field>
                <Field label="COINS"><input type="number" value={item.credits} onChange={e => updateItem(item.id, 'credits', parseInt(e.target.value) || 0)} style={inputStyle} /></Field>
              </>
            ) : (
              <>
                <Field label="COIN COST"><input type="number" value={item.cost} onChange={e => updateItem(item.id, 'cost', parseInt(e.target.value) || 0)} style={inputStyle} /></Field>
                <Field label="RARITY">
                  <select value={item.rarity} onChange={e => updateItem(item.id, 'rarity', e.target.value)} style={inputStyle}>
                    {Object.keys(RARITY).map(r => <option key={r} value={r}>{RARITY[r].label}</option>)}
                  </select>
                </Field>
              </>
            )}
          </div>
          {item.id === DRIBBLE_UP_ID && <div style={{ fontSize: 11, color: C.clay, marginTop: 4, fontStyle: 'italic' }}>⚠️ Removing this breaks the Dribble expedition.</div>}
          {item.id === GUITAR_ID && <div style={{ fontSize: 11, color: C.berry, marginTop: 4, fontStyle: 'italic' }}>⚠️ Removing this breaks the Guitar expedition.</div>}
          <button onClick={() => removeItem(item.id)} className="display" style={{ marginTop: 6, padding: '6px 10px', cursor: 'pointer', borderRadius: 6, background: 'rgba(255,107,107,0.15)', color: C.red, border: `1px solid ${C.red}`, fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Trash2 size={12} /> REMOVE
          </button>
        </div>
      ))}
      <button onClick={addItem} className="display" style={{ width: '100%', padding: 12, marginTop: 4, cursor: 'pointer', borderRadius: 8, background: 'rgba(123,211,137,0.15)', color: C.leaf, border: `1.5px dashed ${C.leaf}`, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Plus size={14} /> ADD {type === 'quests' ? 'MISSION' : 'REWARD'}
      </button>
    </div>
  );
}

function HQRates({ state, setState }) {
  const update = (path, value) => setState(s => {
    const c = structuredClone(s.config);
    const parts = path.split('.');
    let obj = c;
    for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
    obj[parts[parts.length - 1]] = value;
    return { ...s, config: c };
  });
  const n = (path, fallback = 0) => (e) => update(path, parseInt(e.target.value) || fallback);
  const { rates: r, ssyra, dribbleUp: dr, guitarPractice: gt } = state.config;
  const H = ({ color, children }) => <div className="display" style={{ fontSize: 13, color, margin: '14px 0 8px' }}>{children}</div>;
  return (
    <div style={{ ...card(C.leaf), background: 'rgba(123,211,137,0.06)' }}>
      <H color={C.teal}>🧠 DAILY FIELD QUIZ</H>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Field label="XP / CORRECT"><input type="number" value={state.config.quiz.xp} onChange={n('quiz.xp')} style={inputStyle} /></Field>
        <Field label="COINS / CORRECT"><input type="number" value={state.config.quiz.credits} onChange={n('quiz.credits')} style={inputStyle} /></Field>
      </div>
      <H color={C.berry}>RESEARCH LAB (MATH)</H>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Field label="XP / PAGE"><input type="number" value={r.mathXpPerPage} onChange={n('rates.mathXpPerPage')} style={inputStyle} /></Field>
        <Field label="COINS / PAGE"><input type="number" value={r.mathVbPerPage} onChange={n('rates.mathVbPerPage')} style={inputStyle} /></Field>
      </div>
      <H color={C.leaf}>FIELD LIBRARY (SSYRA)</H>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Field label="XP / BOOK"><input type="number" value={ssyra.xpPerBook} onChange={n('ssyra.xpPerBook')} style={inputStyle} /></Field>
        <Field label="COINS / BOOK"><input type="number" value={ssyra.creditsPerBook} onChange={n('ssyra.creditsPerBook')} style={inputStyle} /></Field>
        <Field label="ALL 15 BONUS XP"><input type="number" value={ssyra.allFifteenBonusXp} onChange={n('ssyra.allFifteenBonusXp')} style={inputStyle} /></Field>
        <Field label="ALL 15 BONUS COINS"><input type="number" value={ssyra.allFifteenBonusCredits} onChange={n('ssyra.allFifteenBonusCredits')} style={inputStyle} /></Field>
      </div>
      <H color={C.clay}>🏀 DRIBBLE EXPEDITION</H>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <Field label="GOAL DAYS"><input type="number" value={dr.goal} onChange={n('dribbleUp.goal', 60)} style={inputStyle} /></Field>
        <Field label="REWARD XP"><input type="number" value={dr.rewardXp} onChange={n('dribbleUp.rewardXp')} style={inputStyle} /></Field>
        <Field label="REWARD COINS"><input type="number" value={dr.rewardCredits} onChange={n('dribbleUp.rewardCredits')} style={inputStyle} /></Field>
      </div>
      <Field label="🎁 PRIZE NAME"><input value={dr.prize || ''} onChange={e => update('dribbleUp.prize', e.target.value)} style={inputStyle} /></Field>
      <button onClick={() => setState(s => ({ ...s, player: { ...s.player, dribbleUpCelebrated: false } }))} className="display" style={{ ...btn('rgba(255,138,91,0.15)', C.clay), border: `1px solid ${C.clay}`, fontSize: 11 }}>RESET DRIBBLE CELEBRATION</button>
      <H color={C.berry}>🎸 GUITAR EXPEDITION</H>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <Field label="GOAL DAYS"><input type="number" value={gt.goal} onChange={n('guitarPractice.goal', 30)} style={inputStyle} /></Field>
        <Field label="REWARD XP"><input type="number" value={gt.rewardXp} onChange={n('guitarPractice.rewardXp')} style={inputStyle} /></Field>
        <Field label="REWARD COINS"><input type="number" value={gt.rewardCredits} onChange={n('guitarPractice.rewardCredits')} style={inputStyle} /></Field>
      </div>
      <Field label="🎁 PRIZE NAME"><input value={gt.prize || ''} onChange={e => update('guitarPractice.prize', e.target.value)} style={inputStyle} /></Field>
      <button onClick={() => setState(s => ({ ...s, player: { ...s.player, guitarCelebrated: false } }))} className="display" style={{ ...btn('rgba(183,148,244,0.15)', C.berry), border: `1px solid ${C.berry}`, fontSize: 11 }}>RESET GUITAR CELEBRATION</button>
    </div>
  );
}

function HQBackup({ state, setState, showToast }) {
  const [pending, setPending] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wild_quest_${(state.player.name || 'ranger').replace(/\s+/g, '_')}_${todayStr()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    showToast('✓ BACKUP DOWNLOADED');
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError(null);
    file.text().then(text => {
      try { setPending(importBackup(text)); }
      catch (err) { setError(err.message); }
    }, () => setError('Could not read that file.'));
  };

  const confirmImport = () => {
    setState(pending.state);
    setPending(null);
    showToast(`✓ ${pending.source.toUpperCase()} PROGRESS RESTORED`, 'big');
  };

  const s = pending?.summary;
  return (
    <div>
      <div style={{ ...card(C.teal), background: 'rgba(79,209,197,0.08)', marginBottom: 12 }}>
        <div className="display" style={{ fontSize: 14, color: C.teal, marginBottom: 6 }}>📤 IMPORT A BACKUP</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 10, lineHeight: 1.5 }}>
          Works with <b style={{ color: '#fff' }}>Jedi Quest</b> backups and Wild Quest backups. To move his Jedi progress: open Jedi Quest on his device → HQ → BACKUP → DOWNLOAD BACKUP, then choose that file here. XP, coins, streak, daily history, SSYRA books, side-quest days, claimed rewards and your custom missions all carry over. His Jedi rank becomes the matching Ranger rank.
        </div>
        <input ref={fileRef} type="file" accept=".json,application/json" onChange={handleFile} style={{ display: 'none' }} />
        <button onClick={() => fileRef.current?.click()} className="display" style={btn(C.teal)}>CHOOSE FILE…</button>
        {error && <div style={{ marginTop: 10, padding: 10, borderRadius: 6, background: 'rgba(255,107,107,0.15)', border: `1px solid ${C.red}`, color: C.red, fontSize: 13 }}>⚠️ {error}</div>}
        {pending && (
          <div className="scale-in" style={{ marginTop: 12, ...card(C.sun), background: 'rgba(244,185,66,0.1)' }}>
            <div className="display" style={{ fontSize: 13, color: C.sun, marginBottom: 8 }}>{pending.source.toUpperCase()} BACKUP FOUND</div>
            <div style={{ fontSize: 14, display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
              <div>👤 Name: <strong>{s.name}</strong></div>
              <div>⚡ XP: <strong>{s.xp.toLocaleString()}</strong> (Level {levelFromXp(s.xp)}) → rank <strong>{getRank(s.rank).name}</strong></div>
              <div>🪙 Coins: <strong>{s.credits.toLocaleString()}</strong></div>
              <div>📚 SSYRA books: <strong>{s.books}</strong> / 15</div>
              <div>📅 Days of history: <strong>{s.days}</strong> · Rewards claimed: <strong>{s.claimed}</strong></div>
            </div>
            <div style={{ fontSize: 12, color: C.sun, marginBottom: 10 }}>⚠️ This replaces the current Wild Quest progress on every device.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={confirmImport} className="display" style={btn(C.sun)}>YES, RESTORE</button>
              <button onClick={() => setPending(null)} className="display" style={{ ...btn('transparent', '#fff'), border: '1px solid #fff' }}>CANCEL</button>
            </div>
          </div>
        )}
      </div>
      <div style={{ ...card(C.leaf), background: 'rgba(123,211,137,0.08)' }}>
        <div className="display" style={{ fontSize: 14, color: C.leaf, marginBottom: 6 }}>📥 DOWNLOAD A BACKUP</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>Progress is saved to the cloud automatically. A file backup now and then is still a good safety net.</div>
        <button onClick={exportData} className="display" style={btn(C.leaf)}>DOWNLOAD BACKUP</button>
      </div>
    </div>
  );
}

function HQDevice({ mode, sync, forgetDevice, saveNow }) {
  const [confirm, setConfirm] = useState(false);
  const label = mode === 'local' ? 'This browser only (cloud not set up)'
    : { saved: 'All progress saved to the cloud', saving: 'Saving…', offline: 'Offline — changes will upload when back online', error: "Couldn't save — retrying automatically" }[sync];
  return (
    <div style={{ ...card(C.teal), background: 'rgba(79,209,197,0.06)' }}>
      <div className="display" style={{ fontSize: 14, color: C.teal, marginBottom: 8 }}>☁️ CLOUD SYNC</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, marginBottom: 10 }}><SyncDot mode={mode} sync={sync} /> {label}</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.5 }}>Open the same web address on any phone, tablet or computer and enter the family passcode — the same progress shows up everywhere.</div>
      {mode === 'cloud' && <button onClick={saveNow} className="display" style={{ ...btn(C.teal), marginRight: 8, marginBottom: 8 }}>SYNC NOW</button>}
      {!confirm
        ? <button onClick={() => setConfirm(true)} className="display" style={{ ...btn('transparent', '#fff'), border: '1px solid rgba(255,255,255,0.5)' }}>SIGN OUT THIS DEVICE</button>
        : <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 13, color: C.sun, marginBottom: 8 }}>This device will ask for the passcode again. Cloud progress is not affected.</div>
            <button onClick={forgetDevice} className="display" style={{ ...btn(C.sun), marginRight: 8 }}>SIGN OUT</button>
            <button onClick={() => setConfirm(false)} className="display" style={{ ...btn('transparent', '#fff'), border: '1px solid #fff' }}>CANCEL</button>
          </div>}
    </div>
  );
}

function HQReset({ setState }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div style={{ ...card(C.red), background: 'rgba(255,107,107,0.08)' }}>
      <div className="display" style={{ fontSize: 14, color: C.red, marginBottom: 8 }}>⚠️ DANGER ZONE</div>
      <div style={{ fontSize: 14, color: C.muted, marginBottom: 12 }}>Reset wipes all XP, coins, SSYRA progress, expedition counters and settings on every device. Download a backup first.</div>
      {!confirm ? (
        <button onClick={() => setConfirm(true)} className="display" style={btn(C.red, '#fff')}>RESET EVERYTHING</button>
      ) : (
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => { setState(structuredClone(DEFAULT_STATE)); setConfirm(false); }} className="display" style={btn(C.red, '#fff')}>YES, WIPE IT</button>
          <button onClick={() => setConfirm(false)} className="display" style={{ ...btn('transparent', '#fff'), border: '1px solid #fff' }}>CANCEL</button>
        </div>
      )}
    </div>
  );
}

// =====================================================
// TOAST + OVERLAYS
// =====================================================
function Toast({ toast }) {
  const colors = {
    win:  [C.leaf, C.bg],
    big:  [`linear-gradient(135deg, ${C.sun}, ${C.clay})`, C.bg],
    info: [C.teal, C.bg],
    fail: [C.red, '#fff'],
  };
  const [bg, fg] = colors[toast.kind] || colors.win;
  return (
    <div role="status" style={{ position: 'fixed', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 100, pointerEvents: 'none', padding: '0 16px' }}>
      <div className="scale-in display" style={{ padding: '12px 20px', borderRadius: 8, background: bg, color: fg, fontSize: 15, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', textAlign: 'center' }}>{toast.msg}</div>
    </div>
  );
}

function PawBurst() {
  const paws = useRef(Array.from({ length: 12 }, (_, i) => ({ x: 8 + Math.random() * 84, y: 10 + Math.random() * 80, r: `${Math.round(Math.random() * 60 - 30)}deg`, d: i * 0.08 })));
  return paws.current.map((p, i) => (
    <div key={i} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, '--r': p.r, animation: `paw-pop 1.6s ${p.d}s both` }}>
      <PawPrint size={28} color={C.sun} />
    </div>
  ));
}

function LevelUpOverlay({ level }) {
  const animal = SANCTUARY.find(a => a.level === level);
  const rank = RANKS.find(r => r.unlockLevel === level);
  return (
    <div aria-live="assertive" style={{ position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, rgba(22,57,42,0.94), rgba(7,20,14,0.9) 70%)' }}>
      <PawBurst />
      <div className="scale-in" style={{ textAlign: 'center', position: 'relative', padding: 16 }}>
        <div className="display" style={{ fontSize: 16, color: C.sun, letterSpacing: 4 }}>NEW TERRITORY</div>
        <div className="display" style={{ fontSize: 64, color: '#fff', lineHeight: 1.05, textShadow: `0 0 30px ${C.sun}, 0 0 60px ${C.leaf}` }}>LEVEL {level}</div>
        {animal && <div className="display" style={{ fontSize: 17, color: C.leaf, marginTop: 10 }}>{animal.emoji} {animal.name.toUpperCase()} JOINED YOUR SANCTUARY</div>}
        {rank && <div className="display" style={{ fontSize: 15, color: C.teal, marginTop: 6 }}>🎖️ {rank.name} RANK UNLOCKED</div>}
      </div>
    </div>
  );
}

function SideQuestOverlay({ days, title, line, prize, color }) {
  return (
    <div aria-live="assertive" style={{ position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(circle at center, ${color}40, rgba(7,20,14,0.92) 65%)`, backgroundColor: 'rgba(7,20,14,0.6)' }}>
      <PawBurst />
      <div className="scale-in" style={{ textAlign: 'center', position: 'relative', padding: 16 }}>
        <div className="display" style={{ fontSize: 20, color, letterSpacing: 3 }}>{days}-DAY</div>
        <div className="display" style={{ fontSize: 56, color: '#fff', lineHeight: 1.05, textShadow: `0 0 30px ${color}, 0 0 60px ${C.sun}` }}>{title}</div>
        <div className="display" style={{ fontSize: 15, color, marginTop: 8 }}>{line}</div>
        {prize && <div className="display" style={{ fontSize: 17, color: '#fff', marginTop: 12, background: `${color}40`, padding: '8px 16px', border: `2px solid ${color}`, borderRadius: 8 }}>🎁 {prize.toUpperCase()}</div>}
      </div>
    </div>
  );
}
