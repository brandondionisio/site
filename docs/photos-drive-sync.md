# Photo of the Day – Google Drive sync

Sync photos from a Google Drive folder to your site.

## Setup (one time)

1. **Google Cloud Console**
   - Enable **Google Drive API**: APIs & Services → Library → search “Google Drive API” → Enable.
   - In **Credentials** → your OAuth 2.0 Client → **Authorized redirect URIs** add:
     - `http://localhost:3333/callback`

2. **`.env`** (in project root; already in `.gitignore`)

   ```env
   GCP_CLIENT_ID=your_client_id
   GCP_CLIENT_SECRET=your_client_secret
   DRIVE_FOLDER_ID=your_folder_id
   ```

   Get **DRIVE_FOLDER_ID** from the folder URL in Drive:  
   `https://drive.google.com/drive/folders/THIS_PART_IS_THE_FOLDER_ID`

3. **Drive folder**
   - Create a folder (e.g. “Photo of the Day”) and put one image per day.
   - Name files by date so the script can use them: `YYYY-MM-DD.jpg` (e.g. `2026-03-07.jpg`).  
   - Optional: add a short description after the date for `alt` text, e.g. `2026-03-07 Sunset at the pier.jpg`.

## Run sync

**First time** (no refresh token yet):

```bash
npm run photos:sync
```

- A browser window opens; sign in with the Google account that has access to the folder.
- The script saves `GCP_REFRESH_TOKEN` to your `.env`.
- If it says “run again”, run:

```bash
npm run photos:sync
```

**Later** (when you add or change photos in the folder):

```bash
npm run photos:sync
```

- Lists images in the folder, downloads them to `public/photos/`, and updates `src/data/dailyPhotos.json`.
- Rebuild or run `npm run dev` to see changes.

## Automatic sync (GitHub Actions)

To have photos sync automatically when you upload to Drive:

1. **Add repository secrets**  
   In your GitHub repo: **Settings → Secrets and variables → Actions**. Create:
   - `GCP_CLIENT_ID`
   - `GCP_CLIENT_SECRET`
   - `GCP_REFRESH_TOKEN`
   - `DRIVE_FOLDER_ID`  
   Use the same values as in your local `.env` (get the refresh token by running `npm run photos:sync` once locally and copying from `.env`).

2. **Workflow**  
   The workflow in `.github/workflows/sync-photos.yml` runs **every hour**, runs the sync, then commits and pushes any changes to `src/data/dailyPhotos.json` and `public/photos/`. If your site is deployed from this repo (e.g. Vercel/Netlify), the push triggers a new deploy.

3. **Manual run**  
   In the repo: **Actions → Sync photos from Drive → Run workflow**.

## What the script does

- Lists image files (JPEG, PNG, HEIC) in the Drive folder.
- Derives the date from the filename (`YYYY-MM-DD`) or the file’s creation date.
- Downloads each file to `public/photos/`; converts HEIC to JPEG.
- Writes `src/data/dailyPhotos.json` with `date`, `src`, and optional `alt`.
- The site uses this data when it exists; otherwise it falls back to the demo photos.
