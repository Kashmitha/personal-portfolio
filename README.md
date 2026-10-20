# Kashmitha portfolio — project status and AI handoff

**Last updated: 21 October 2026. Read this entire file before editing the project.**

This is the single authoritative project document. Keep the status, decisions, commands, and change log here. Do not create competing status, architecture, or deployment Markdown files unless Kashmitha requests them. Inspect the actual files before making changes; if they differ from this document, explain the discrepancy and update this file. Do not blindly replace or redesign approved work.

## Owner instructions — apply in every future chat

- Kashmitha owns and performs DevOps work and writes the related scripts. AI should explain the steps and provide suggested commands or scripts in the conversation for him to review and run himself.
- Do not execute DevOps, Docker, infrastructure provisioning, CI/CD, deployment, domain, or GitHub publication commands. Do not add related files, workflows, or scripts to this repository unless explicitly requested.
- From 21 October 2026, the owner wants every completed code change committed and pushed to GitHub. Provide review, commit, and push commands for him to run; do not execute publication commands. Include README updates in each related commit.
- Build and browser-test commands are provided below for Kashmitha to run. Record actual owner-provided results, and distinguish each run from subsequent unverified edits.
- Preserve the approved folder-template UI, its components, both themes, photo placement, and mobile behavior. Scope future edits to the actual request.
- This phase is frontend only. Keep the future backend separate under `api/`. Do not invent a working backend, message delivery service, credentials, career claims, or live deployment.
- After each change, update this README: what changed, affected paths, validation actually performed, what remains unverified, and the next step. Record new decisions here so the next AI has the same context.

## Current scope and design

A recruiter-facing personal portfolio for Kashmitha, based in Sri Lanka. DevOps is the primary discipline, followed by full-stack development with .NET/C# and Unity game development. A `.dev` domain is planned; no domain ownership or public hosting is configured. The site is not yet published to GitHub by this work.

The first generic portfolio layout was rejected. The current design is adapted directly from the **Folder Tab Portfolio Template source pasted by the owner**. Its stacked sheets, folder shapes, overlapping category deck, animated SVG outline lettering, chapter accordions, floating page navigator, project viewer, and workflow tabs are intentional and approved. Do not revert to the first layout or substitute an unrelated template.

The owner approved the second design but rejected the subsequent static rainbow wordmark. **Current requirement: the entire PORTFOLIO title must have one uniform color at any instant, smoothly changing over time like keyboard backlighting.** It starts in the original lime, then cycles through matching teal, sky blue, violet, and back to lime over 16 seconds. A soft SVG halo follows the same stroke color. There is no spatial gradient or per-letter rainbow. Hollow lettering and the original draw-on animation are preserved. Only the cover wordmark cycles; light mode uses darker colors, and reduced-motion preferences stop the cycle at lime. No new dependency was added.

The floating navigation is enlarged while preserving its IBM Plex Mono typography and folder styling. Desktop labels are 12px with 44px-high buttons. On mobile, all six labels are visible in a three-column, two-row layout rather than a clipped scrolling row. Small-screen labels use 10px (9px below 370px); the page counter and theme toggle remain available. Mobile sheet scroll offsets account for the taller navigation.

Gaming styling includes graphite/navy sheets, a technical grid, lime accents, violet/teal/orange folders, small player/system labels, and portrait identity-card framing. The photo appears on the cover and About sheet. Both dark and light themes are supported and persisted locally.

## Repository layout

```text
personal-portfolio/
  README.md                         This single status, guide, and AI handoff
  .gitignore                        Excludes local dependencies, build/test output, secrets
  web/                              Entire runnable frontend
    package.json                    Frontend scripts and dependency declarations
    package-lock.json               Dependency lockfile; keep it in Git
    index.html                      Document title, metadata, favicon, initial theme
    vite.config.ts                  Vite + React configuration
    tsconfig.json                   Strict TypeScript configuration
    playwright.config.ts            Desktop/mobile browser-test configuration
    .prettierrc.json                 Formatting rules
    .prettierignore                  Formatting exclusions
    public/
      portrait.png                  Owner's enhanced professional portrait
      favicon.svg                   Local favicon
    src/
      main.tsx                      React entry point
      App.tsx                       Content props, category/chapter/workflow data, contact draft
      data/portfolio.ts             Profile, six curated repositories, project details
      components/
        FolderPortfolio.tsx         Adapted original template and its interaction logic
        ProjectVisual.tsx           Illustrative project previews
      template.css                  Original folder layout/mechanics
      styles.css                    Gaming styling, themes, responsive overrides
      project-visual.css            CSS project illustrations
    tests/portfolio.spec.ts         Frontend behavior and responsive browser tests
    node_modules/                   Local dependency cache only; ignored by Git
  api/
    .gitkeep                        Tracks the reserved backend directory; no API exists yet
```

There is no root `package.json` or monorepo orchestration. Run frontend commands with `npm --prefix web ...` from the repository root, or change into `web/` first. All frontend configs and relative asset paths moved together. `api/` has no framework, dependencies, database, endpoints, or server process. A future ASP.NET Core/C# API can be added when requested, after deciding the actual backend requirements.

## Technology in use

- React 19, TypeScript, Vite, and the React Vite plugin.
- Semantic HTML, custom responsive CSS, SVG lettering and filters, Lucide React icons.
- DM Sans, Space Grotesk, and IBM Plex Mono from Google Fonts with fallback fonts.
- Playwright tests for desktop and emulated mobile viewports.
- Prettier for source formatting.
- Node.js 24 was used previously. Node.js 22.12+ is the documented minimum.

Dependency versions are recorded in `web/package.json` and resolved in `web/package-lock.json`. Vite was last built as version 8.3.4. Some tooling declarations still use `latest`; use the lockfile with `npm ci` and do not silently upgrade dependencies. There are no backend or DevOps dependencies configured.

## Features and data behavior

- Six sheets: Cover, Contents, About, Work, Process, and Contact.
- Three overlapping cover folders filter and navigate to the matching projects.
- Work category tabs support mouse, touch, and arrow/Home/End keyboard navigation.
- Project detail viewer supports previous/next projects, arrow keys, Escape, focus trapping/restoration, background isolation with `inert`, and body scroll locking.
- Contents folders expand as accordions and navigate to their target chapter.
- Workflow folder tabs: Understand, Build, Automate, Observe.
- Floating navigation follows the visible sheet and updates its indicator on resizing. On mobile it uses two rows so all six labels are visible; the active button has its own highlight instead of the desktop sliding indicator.
- Photo tilt applies to mouse input and respects reduced-motion preferences. CSS motion also respects reduced motion.
- The footer clock uses `Asia/Colombo`.
- Contact links point to the owner's real GitHub profile and repositories. There is no fabricated email address, resume, or LinkedIn link.
- A contact message draft is saved in the visitor's browser and can be copied. It is never submitted or sent.
- Browser storage keys: `portfolio-theme` and `portfolio-draft`. No backend, cookies, analytics, authentication, or external API calls are required to render the site. Google Fonts is the only external page asset service currently used.

## Real projects and content limits

The repository links belong to `https://github.com/Kashmitha`:

| Category | Project | Repository |
| --- | --- | --- |
| DevOps & Cloud | Azure AKS platform | `devops-project-4` |
| DevOps & Cloud | GemOps AWS observability | `gemops-project` |
| Full-stack .NET | TaskFlow task management | `dockerized-taskflow-project` |
| Full-stack .NET | Care Point healthcare system | `Care-Point-Project` |
| Unity & Games | Meteor Blast | `Meteor-Blast` |
| Unity & Games | 2D game / Unity experiments | `My-New-2D-Game` |

AKS, GemOps, and TaskFlow descriptions were checked against public READMEs earlier in this chat. Game and Care Point descriptions are deliberately limited where documentation was unavailable. Preview graphics are illustrative concepts, not screenshots or evidence of undocumented features. Do not invent employers, experience dates, testimonials, availability dates, or performance metrics.

The portrait is now Kashmitha Madushan's supplied photo, enhanced with the built-in image generation tool: natural skin tones, graphite/navy studio background, subtle teal halo and lime shoulder lighting. The 1254×1254 PNG is saved at `web/public/portrait.png` and shared by the Cover and About placements. Grayscale filters were removed so both placements show the edited colors. Alt text identifies the owner. The original uploaded photo remains outside the repository in the owner's Downloads folder. The displayed profile name and document metadata now use **Kashmitha Madushan**; the GitHub handle and signature remain Kashmitha. `profile.email` is empty; populating it enables the template's email action. `resume` and `linkedin` are reserved data fields without UI yet.

Portrait edit prompt (built-in tool): preserve facial identity, expression, hairstyle, beard, pose, navy suit and white shirt; improve photographic lighting and color grading; use a graphite/navy background with a subtle teal halo and restrained lime shoulder edge light; retain natural skin texture and centered framing; no text, props, logos or exaggerated neon.

## Commands for the owner to run

Run these from the repository root in PowerShell. These are frontend commands only; no DevOps steps are required.

```powershell
# Install exactly the locked frontend dependencies when needed.
npm --prefix web ci

# Start the frontend and open the URL Vite prints (normally http://localhost:5173).
npm --prefix web run dev
```

Use another terminal for checks while the development server is running:

```powershell
npm --prefix web run typecheck
npm --prefix web run build
npm --prefix web run format:check
```

Browser checks on this Windows machine can use installed Microsoft Edge:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm --prefix web test -- --workers=2
```

On a machine without Edge, install the Playwright Chromium browser yourself from `web/`, then run the tests with the browser override cleared:

```powershell
Push-Location web
npx playwright install chromium
Remove-Item Env:PLAYWRIGHT_CHANNEL -ErrorAction SilentlyContinue
npm test
Pop-Location
```

`npm --prefix web run format` formats frontend source. `npm --prefix web run preview` serves the latest built `web/dist/`; run the build first. Playwright can start the development server automatically if port 5173 is free. Stop a manually started Vite server with Ctrl+C.

Do not use the old Docker preview as evidence of this version. A container serving the previous design at port 8080 was started in the earlier phase and was last known healthy. Its current runtime state has not been inspected or changed during this refactor. DevOps source files were removed, and the owner should manage any existing containers separately. The current supported review path is the frontend Vite server.

## Validation status — be precise

**21 October 2026 — Owner-run validation and assertion fix:** the owner's pasted terminal output confirms `npm --prefix web run build` passed (TypeScript plus Vite 8.3.4). Formatting failed for `web/src/styles.css`. Edge Playwright completed with **6 passed, 4 failed**; all four failures stopped at an outdated assertion expecting the previous portrait's 1000px natural width, while the new image loaded at 1254px. This does not verify the remaining steps in those tests, including layout and project details. Updated both image assertions in `web/tests/portfolio.spec.ts` to poll for a positive natural width, which still rejects broken/unloaded images without requiring a particular asset size. Made the cover heading assertion match the full name exactly. Applied local Prettier to the stylesheet and test file. Build/browser tests after these edits remain unrun; manual portrait/name, animation and narrow-screen review remains pending. The earlier pending-build statements below describe historical status before this owner-run validation.

**21 October 2026 — New PC and portrait/name update:** owner reports Node.js installed and the locked dependency installation completed. The Vite start command was provided, but successful page loading has not been confirmed. Source inspection confirmed the enhanced PNG reference, matching 1254×1254 intrinsic dimensions, meaningful alt text, full name, removal of both grayscale filters, and a viewport width limit for the longer masthead name. Generated portrait visually inspected. No fresh typecheck, build, formatting or browser tests were run. Check the longer name and portrait crop in both themes at desktop, 390px and 320px. Git is available locally, but read-only inspection reports that this folder is not yet a Git repository; no initialization, commit, remote or push was executed.

**Before this latest refactor:** the folder redesign passed the TypeScript/production build, formatting, and 10 desktop/mobile Playwright checks using Microsoft Edge. Layout checks included a 320px viewport. Its old Docker image built and reported healthy. Earlier downloaded Chromium could not launch on this Windows environment, so Edge was used successfully.

**Latest refactor:** source inspection and workspace file checks confirmed the `web/`/`api/` structure, removal of generated DevOps files, and the new cover-only SVG gradient/glow implementation. Source/config/public assets/lockfile moved together. Local dependencies were moved into `web/node_modules/`; generated build/test outputs were removed.

**Latest UI correction:** replaced the rejected SVG gradient with a CSS animation on the outer stroke group, giving every letter the same changing color and keeping the inner stroke untouched. Retained the SVG halo. Enlarged desktop navigation, changed mobile navigation to two rows, and adjusted mobile anchor offsets. Source inspection confirmed the gradient definition/reference is removed and reduced-motion stops the cycle. The owner's screenshots show that the app rendered after the move, but they are not fresh automated validation.

**Remaining verification:** the owner-run TypeScript/production build passed after the move and portrait/name changes. Formatting and browser tests need rerunning after the assertion/formatting fix above. The 16-second color cycle and glow in both themes, portrait/name appearance, mobile clipping, and all navigation labels at 320px still need visual review. The previous 10 passing checks must not be represented as fresh results for this revision. No Docker or deployment commands were executed.

## What to inspect and check for each type of change

| Change | Main files | Checks the owner should run or review |
| --- | --- | --- |
| Profile, repositories, project copy | `web/src/data/portfolio.ts` | Verify factual accuracy and links; open project details; build |
| Categories, chapters, skills, workflow, contact copy | `web/src/App.tsx` | Check all tabs/accordions/links and draft behavior; browser tests |
| Portrait replacement | `web/public/portrait.png`, alt text in `web/src/App.tsx` | Cover/About crop on PC/mobile, image loading, meaningful alt text |
| Gaming colors, spacing, responsiveness | `web/src/styles.css` | Both themes at 320px, 390px, tablet and desktop; browser tests |
| Folder geometry/base mechanics | `web/src/template.css` | Folder overlap, tabs, floating nav, modal on small screens; browser tests |
| Wordmark backlight/glow | `StrokeText` in `web/src/components/FolderPortfolio.tsx`, `wordmark-backlight` keyframes and palette in `web/src/styles.css` | Observe a full 16-second loop; keep all letters the same color at each instant; preserve outline/draw effect; inspect both themes and reduced motion |
| Template interaction logic | `web/src/components/FolderPortfolio.tsx` | Typecheck/build; keyboard, focus, modal, category and navigation tests |
| Project illustrations | `web/src/components/ProjectVisual.tsx`, `web/src/project-visual.css` | Check all six previews at card/modal sizes; keep concept labels |
| Dependencies/config | `web/package.json`, lockfile and frontend configs | Explain why, preserve lockfile, run install/build/tests deliberately |
| Backend | `api/` | Agree scope first; document actual endpoints and configuration when implemented |
| DevOps/CI/CD/hosting | None at this stage | Provide instructions to the owner; do not implement or execute without a new explicit request |

For every change, preserve the template author's attribution. Add a dated change-log entry below and revise validation status. Do not mark unrun checks as passed. Keep changes minimal and reviewable.

## Removed in the latest cleanup

- `Dockerfile`, `compose.yaml`, `.dockerignore`.
- `infra/nginx.conf` and its directory.
- `.github/workflows/ci.yml`, `.github/workflows/deploy-pages.yml`, and empty parent directories.
- `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`; necessary current context is consolidated here.
- Empty `scripts/`, old `dist/`, `test-results/`, and `tsconfig.tsbuildinfo`.
- Unused `src/components/Dialog.tsx` from the first design.

Real DevOps **portfolio project content** remains intentionally: those are the owner's work and the main subject of the website. Only generated infrastructure/automation files for hosting this portfolio were removed.

## Template attribution

Folder shapes, SVG lettering/signature, page structure, and original interactions are adapted from **Folder Tab Portfolio Template**, by Kedhareswer Naidu (@kedhareswer), supplied as source by the owner. Original source and usage notice remain at the end of `web/src/components/FolderPortfolio.tsx`:

`https://github.com/Kedhareswer/21stdev-my-components/blob/f8a5636d294cdf059f1d44b6acab1f70aaa2c915/components/folder-tab-portfolio-template/folder-tab-portfolio-template.tsx`

The supplied usage notice permits viewing, copying and adapting unless a folder says otherwise, with attribution appreciated. Retain that notice. Personal content, gaming styling, portrait composition, project illustrations, and the color-cycling wordmark are customizations.

## Change log

- **21 October 2026 — Validation follow-up:** recorded the owner's passing production build, stylesheet formatting failure, and 6/10 passing Edge tests. Replaced two obsolete fixed-width portrait assertions with loaded-image checks, updated the heading expectation to the full name, and formatted `web/src/styles.css` and `web/tests/portfolio.spec.ts` with installed Prettier. A targeted Prettier check passed for both changed files; the complete frontend formatting check and browser rerun remain pending. Changed those two files and this README. Owner must rerun formatting and browser checks before committing/pushing; no publication commands executed.
- **21 October 2026 — Owner portrait, full name and GitHub workflow:** replaced the placeholder with the owner's enhanced navy/teal/lime portrait, removed grayscale styling in both placements, updated profile name/metadata to Kashmitha Madushan, and constrained the masthead SVG width for narrow screens. Changed `web/public/portrait.png`, removed `web/public/portrait.jpg`, updated `web/src/data/portfolio.ts`, `web/src/App.tsx`, `web/src/styles.css`, `web/index.html`, and this README. Source and generated portrait inspected; build/format/browser validation remains owner-run. Recorded the owner's request to commit and push each completed code change; GitHub publication remains owner-run.
- **20 October 2026 — Initial phase:** built a React/TypeScript portfolio with curated public GitHub projects and placeholder portrait. Initial generic layout was rejected.
- **20 October 2026 — Approved redesign:** integrated the owner's actual folder-template source, adapted six sheets and three role folders, added gaming styling, photo identity card, light/dark themes and accessible interactions. Build/format and 10 Edge desktop/mobile checks passed before the next refactor.
- **20 October 2026 — Current handoff:** preserved approved UI, added rainbow/glow SVG outline to the cover wordmark, moved frontend to `web/`, reserved empty `api/`, removed generated DevOps and obsolete files, and consolidated project knowledge into this README. Owner will run verification commands. Future DevOps execution belongs to the owner.
- **20 October 2026 — Backlight correction and navigation sizing:** owner rejected the static rainbow. Removed its SVG gradient and added one synchronized, 16-second lime/teal/blue/violet stroke-color loop with glow and reduced-motion fallback. Enlarged desktop tabs and made mobile tabs a fully visible two-row layout. Fonts and overall design preserved. Changed `web/src/components/FolderPortfolio.tsx`, `web/src/styles.css`, and this README; source inspected, build/browser checks left for the owner.

## Next chat / next action

Start a new chat with: **“Read README.md completely, inspect the current files, and continue from the recorded status. Preserve the approved folder UI. I perform DevOps myself; provide commands for me to run.”**

The next practical step is owner-run frontend validation and initial GitHub setup. Review the enhanced portrait in both placements and the full masthead name in both themes at desktop and 320px/390px. Watch a complete 16-second uniform PORTFOLIO color cycle, and check all six navigation labels. Run build, formatting and browser checks and record actual results here. Complete the GitHub steps below, then use the repeat workflow after each completed change. Real contact details, backend and hosting remain future work.

## Owner-run GitHub setup and repeat workflow

All terminal commands below run in **PowerShell at `E:\Projects\personal-portfolio`**. These are instructions only; AI has not executed initialization, commit, remote setup or publication.

1. On GitHub, create an empty repository under your account, for example `personal-portfolio`. Choose visibility yourself. Do not initialize it with a README, `.gitignore` or license because local project files already exist. Copy its HTTPS URL.
2. Configure your local commit identity, substituting an email verified by GitHub or your exact GitHub-provided noreply address from Settings → Emails:

```powershell
Set-Location 'E:\Projects\personal-portfolio'
git --version
git init -b main
git config user.name "Kashmitha Madushan"
git config user.email "YOUR_VERIFIED_OR_GITHUB_NOREPLY_EMAIL"
```

`git init` creates local version history; these identity settings apply only to this repository and do not authenticate your account. Run initialization once.

3. Validate the frontend before committing:

```powershell
npm --prefix web run build
npm --prefix web run format:check
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm --prefix web test -- --workers=2
```

The build includes TypeScript checking. Browser tests require Edge or the documented Playwright Chromium alternative. Review the latest UI manually too. If a check fails, resolve it and update validation status accurately before pushing.

4. Stage and inspect the initial snapshot:

```powershell
git status --short
git add README.md .gitignore web api
git diff --cached --stat
git diff --cached
git status --short
```

The existing `.gitignore` excludes dependencies, build/test output and environment files. Confirm only intended project files are staged, including the lockfile and portrait. Exit Git's diff pager with `q` when needed.

5. Commit, connect the empty repository, and push. Replace the URL placeholder with the exact URL copied from GitHub:

```powershell
git commit -m "Add portfolio with personal portrait and full name"
git remote add origin YOUR_REPOSITORY_HTTPS_URL
git remote -v
git push -u origin main
```

Complete Git Credential Manager's browser sign-in if prompted. If authentication fails, share the error without credentials. After a successful push, refresh the GitHub repository to verify the files. This publishes source code; it does not deploy the website.

6. After each subsequent completed change, update this README, run relevant validation, and repeat from the same root directory:

```powershell
git status --short
git diff
git add README.md web api .gitignore
git diff --cached --stat
git diff --cached
git commit -m "Describe the completed change"
git push
git status --short
```

Review the staged diff before committing. The final status should be empty when all intended changes have been committed. If Git rejects a push, stop and inspect the error; do not force-push.
