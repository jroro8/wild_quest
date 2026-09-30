# 🐾 Wild Quest

A wildlife-ranger version of Jedi Quest. It has the same daily missions, SSYRA books, math log, expeditions, rewards and parent HQ, now with a conservation theme. Progress is saved in a database, so it works on any browser or device.

**What's new vs. Jedi Quest**
- **Ranger ranks**: eight ranks from Ranger Cub to Guardian of the Wild, at the same levels as the Jedi ranks.
- **Wildlife Sanctuary**: a new endangered or recovered species joins every 2 levels, with a real conservation fact and its IUCN status.
- **Cloud save**: type the family passcode once per device and progress follows him everywhere. It also keeps working offline and uploads when the connection returns.
- **Jedi Quest import**: HQ → Backup reads a Jedi Quest backup file directly.

---

## 1. Put it on GitHub

1. Create a new **empty** repository on GitHub, for example `wild-quest`.
2. In this folder, run:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/wild-quest.git
   git push -u origin main
   ```
   (The folder is already a git repo with a first commit.)

## 2. Deploy on Vercel

1. Go to vercel.com → **Add New… → Project** → import the `wild-quest` repo.
2. Vercel detects **Vite** automatically. Keep the defaults and click **Deploy**.

The site will load at this point, but it shows a yellow "cloud save isn't set up yet" banner until you finish step 3.

## 3. Add the database + passcode

1. In the Vercel project, open **Storage** → **Create Database** → choose **Neon (Postgres)** → pick the free plan → connect it to this project. This adds `DATABASE_URL` for you.
2. Open **Settings → Environment Variables** and add:
   - `APP_PASSCODE` = a family passcode he can remember.
3. Open **Deployments** → on the latest one click **⋯ → Redeploy**. Environment changes only apply after a redeploy.

The database table is created automatically on first use, so there is no SQL to run.

## 4. Move his Jedi Quest progress over

1. On the device he uses Jedi Quest on, open Jedi Quest → **HQ → BACKUP → DOWNLOAD BACKUP**.
   Jedi Quest saves in that one browser, so the backup has to come from that device.
2. Open your new Wild Quest site and enter the passcode.
3. Go to **HQ → BACKUP → CHOOSE FILE…** and pick the `jedi_quest_….json` file.
4. Check the preview (name, XP, coins, books) and tap **YES, RESTORE**.

The import carries over XP, level, coins, streak, every day of mission history (so the 60-day Dribble and 30-day Guitar counts continue), SSYRA books, math pages, claimed rewards, and your custom missions, rewards and prizes. His Jedi rank becomes the matching Ranger rank; for example, Jedi Knight becomes Field Ranger.

Jedi Quest itself is unchanged, and its HQ keeps working. You can re-export and re-import at any point before you switch him over.

---

## Everyday use
- **New device**: open the site and enter the passcode once.
- **Cloud icon** (top right): green means saved, yellow means offline and will retry.
- **HQ → SYNC**: sync status, a "Sync now" button, and "Sign out this device".
- **HQ → BACKUP → DOWNLOAD BACKUP**: an optional file backup for safekeeping.

## Local development
```bash
npm install
npm i -g vercel
vercel link && vercel env pull .env.local   # copies DATABASE_URL + APP_PASSCODE locally
vercel dev                                  # runs the site and the /api/state function
```
Plain `npm run dev` also works, but with no API it saves only in the browser.

## How it's built
- `src/`: a React app (Vite). `App.jsx` holds the screens, `data.js` the game rules, ranks and animals, `sync.js` the cloud save, and `migrate.js` the Jedi Quest import.
- `api/state.js`: a Vercel serverless function that reads and writes one JSON row in Postgres. Every save carries a version number, so two devices can't silently overwrite each other; the older one pulls the newer copy instead.
- The passcode is checked on the server and never stored in the code.
