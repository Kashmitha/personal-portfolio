# Kashmitha portfolio — project status and AI handoff

**Last updated: 21 October 2026. Read this entire file before editing the project.**

This is the single authoritative project document. Keep the status, decisions, commands, and change log here. Do not create competing status, architecture, or deployment Markdown files unless Kashmitha requests them. Inspect the actual files before making changes; if they differ from this document, explain the discrepancy and update this file. Do not blindly replace or redesign approved work.

## Owner instructions — apply in every future chat

- Kashmitha owns and performs DevOps work and writes the related scripts. AI should explain the steps and provide suggested commands or scripts in the conversation for him to review and run himself.
- Do not execute DevOps, Docker, infrastructure provisioning, CI/CD, deployment, domain, or GitHub publication commands. Do not add related files, workflows, or scripts to this repository unless explicitly requested.
- From 21 October 2026, the owner wants every completed code change committed and pushed to GitHub. Provide review, commit, and push commands for him to run; do not execute publication commands. Include README updates in each related commit.
- The owner selected Formspree for contact delivery, supplying `https://formspree.io/f/mzedlggg`. This public endpoint is wired into the frontend. On 21 October 2026 the owner confirmed that a local form submission reached the configured main inbox, including when the visitor entered dummy details. Visitor email ownership is not verified. Destination email, spam settings and quotas are managed by the owner in Formspree. No secret/API key belongs in frontend code. Formspree's free plan listed 50 submissions/month when checked on 21 October 2026. Production submission and reply behavior remain unverified.
- Build and browser-test commands are provided below for Kashmitha to run. Record actual owner-provided results, and distinguish each run from subsequent unverified edits.
- Preserve the approved folder-template UI, its components, both themes, photo placement, and mobile behavior. Scope future edits to the actual request.
- This phase is frontend only. Keep the future backend separate under `api/`. Do not invent a working backend, message delivery service, credentials, career claims, or live deployment.
- After each change, update this README: what changed, affected paths, validation actually performed, what remains unverified, and the next step. Record new decisions here so the next AI has the same context.

## Current scope and design

**Social sharing:** `web/public/social-preview.png` is a visually inspected 1200×630 PNG (about 121 KiB), matching the dark grid/folder palette and showing the owner, DevOps focus and category counts 5/2/3. `web/index.html` declares Open Graph and large-image card text, alt text and image dimensions. The Vite HTML transform adds image URLs to the initial HTML, so crawlers do not need to run React. No remote fonts, images, tracking or dependencies were introduced for the preview.

The public domain is still undecided. When it is known, the owner should set the **public, nonsecret `VITE_SITE_URL`** to the real HTTPS portfolio URL before the production build. `web/vite.config.ts` uses that one setting for absolute Open Graph/card image URLs, `og:url` and the canonical link. Without the setting, local preview uses `/social-preview.png` and omits canonical/`og:url`; this is preparation, not verified live social sharing. Credentials, query strings, fragments and non-HTTPS URLs are rejected. The setting can come from the owner's shell/hosting environment or ignored local `.env` files in `web/`; no environment file or hosting configuration was added. After publishing, check the served initial HTML, image URL and actual LinkedIn/message preview. Specification reference: https://ogp.me/ .

**Current work experience:** the owner confirms Associate DevOps Engineer at Port City BPO, September 2026–Present. The public LinkedIn experience listing identifies Colombo District, Western Province, Sri Lanka. A compact Experience panel within About, below the three role cards, displays those facts using the existing timeline component. Role/dates are owner-supplied; public LinkedIn did not expose those details. Do not infer employment type, duties, achievements or employer technology stack from portfolio projects.

A recruiter-facing personal portfolio for Kashmitha, based in Sri Lanka. DevOps and Cloud is the primary discipline, followed by full-stack development with .NET/C# and Unity game development. A `.dev` domain is planned; domain ownership and public hosting have not been confirmed. Local Git history includes the contact integration, ten-project catalog and distinct previews through `77fc21c`; the expanded About/LinkedIn changes described below await owner review and commit. Remote publication was not independently checked.

The About section uses the owner's three supplied biography paragraphs plus a short Unity sentence. Three compact bordered role cards sit side by side in one desktop row, ordered DevOps & Cloud, Full-stack .NET and Unity. DevOps stays first with a lime top border. Biography text is 17px, role headings 16px, and role descriptions/skills 15px. Reduced card padding and paragraph spacing shorten the section; cards stack at 700px and below. The owner's LinkedIn link appears in both About and Contact. No phone number was supplied or added. Keep the About biography free of the phrase/claim "final-year undergraduate" as requested. Existing final-year project descriptions still describe that project context.

Content source: the public [LinkedIn profile](https://www.linkedin.com/in/kashmitha-madushan-362822339/) exposed project/activity/skills information through search, but the About excerpt was truncated and direct retrieval failed. The expanded copy combines those visible DevOps project details with the existing repository-backed catalog; it is not a complete scrape or quotation of LinkedIn's About text. No job tenure, employers, graduation status or production performance claims were added.

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
      App.tsx                       Content props, category/chapter/workflow data, contact form
      data/portfolio.ts             Profile, ten curated repositories, project details
      components/
        FolderPortfolio.tsx         Adapted original template and its interaction logic
        ContactForm.tsx             Formspree submission, feedback, local message draft
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
- Contents folders expand as accordions and navigate to their target chapter. Each chapter has a persistent palette identity: violet Player Profile, teal Project Archive, orange Build Sequence and gold Next Chapter. Closed bodies are tinted; opening retains that chapter's own color. Folder geometry, labels and behavior remain unchanged.
- Workflow folder tabs: Understand, Build, Automate, Observe.
- Floating navigation follows the visible sheet and updates its indicator on resizing. On mobile it uses two rows so all six labels are visible; the active button has its own highlight instead of the desktop sliding indicator.
- Photo tilt applies to mouse input and respects reduced-motion preferences. CSS motion also respects reduced motion.
- The footer clock uses `Asia/Colombo`.
- Contact links point to the owner's real GitHub profile, repositories and supplied LinkedIn profile. There is no fabricated email address or resume.
- Contact has required name, reply email and message fields. Clicking **Send message** posts JSON to the owner's Formspree endpoint with `Accept: application/json`. No custom backend or SMS integration exists. The old Copy message / Connect on GitHub actions inside the message card were replaced by sending; GitHub links elsewhere remain.
- The message draft is kept in `portfolio-draft` across reloads; name/email are not written to local storage by the app. Acceptance by Formspree clears the fields and saved draft. Errors, quota rejection, connection failures and the 20-second timeout preserve the draft. Inputs are disabled while sending, and a synchronous guard prevents duplicate in-flight submissions. A successful HTTP response confirms submission acceptance, not inbox delivery.
- Browser storage keys: `portfolio-theme` and `portfolio-draft`. No custom backend, analytics or authentication is required to render the site. Google Fonts loads page assets; sending explicitly shares the visitor's name, email and message with Formspree. The form includes a privacy explanation and accessible status feedback. Recipient setup and spam filtering must be checked by the owner in the Formspree dashboard.

## Real projects and content limits

The repository links belong to `https://github.com/Kashmitha`:

| Category | Project | Repository |
| --- | --- | --- |
| DevOps & Cloud | GemOps AWS observability — main DevOps project | `gemops-project` |
| DevOps & Cloud | Azure infrastructure with Terraform | `devops-project-2-azure-terraform` |
| DevOps & Cloud | Azure configuration with Ansible | `devops-project-3` |
| DevOps & Cloud | Azure AKS platform | `devops-project-4` |
| DevOps & Cloud | Docker multi-service app with Jenkins | `project-1-dockerized-multi-service` |
| Full-stack .NET | Care Point healthcare system — largest full-stack project | `Care-Point-Project` |
| Full-stack .NET | TaskFlow task management — second full-stack project | `dockerized-taskflow-project` |
| Unity & Games | Meteor Blast | `Meteor-Blast` |
| Unity & Games | 2D game / Unity experiments | `My-New-2D-Game` |
| Unity & Games | Final-year Unity 2D game — source inspected | `MyFinalYearProject` |

The catalog has **10 projects: 5 DevOps, 2 full-stack and 3 games**. GemOps appears first overall and carries the owner's main-project label; Care Point leads the full-stack category and is labeled as the owner's largest full-stack project. Existing game entries remain intact. Every detail viewer links to its dedicated repository under the owner's GitHub profile.

On 21 October 2026, project descriptions were checked against the public READMEs for [GemOps](https://github.com/Kashmitha/gemops-project), [Azure Terraform](https://github.com/Kashmitha/devops-project-2-azure-terraform), [Ansible](https://github.com/Kashmitha/devops-project-3), [AKS](https://github.com/Kashmitha/devops-project-4), [Docker/Jenkins](https://github.com/Kashmitha/project-1-dockerized-multi-service) and [TaskFlow](https://github.com/Kashmitha/dockerized-taskflow-project). Care Point has no root README, so its React/ASP.NET Core/EF Core/SQL Server stack, appointments, prescriptions, authentication and role-related copy were informed by its source tree, project/package manifests, controllers and authentication service. Public Unity source trees were also inspected for the two retained games. These are source/documentation checks, not evidence of deployed systems or runtime validation of those projects.

**Final-year repository verified after visibility change:** [MyFinalYearProject](https://github.com/Kashmitha/MyFinalYearProject) now returns public metadata/source via GitHub's API. There is no root README. Inspected `ProjectSettings/ProjectVersion.txt` (Unity 2022.3.43f1), `Packages/manifest.json`, `Assets/Scripts/PlayerMovement.cs` and the file tree containing `Assets/Scenes/Level1.unity`, 2D assets and Joystick Pack files. The movement script implements Rigidbody2D horizontal movement, facing-direction changes, grounded Space-key jumping and Animator run/grounded/jump parameters. The portfolio copy now reflects those facts and the owner's final-year context. Touch-input integration, full gameplay completion and executable behavior were not verified. This supersedes the earlier 404 limitation; the dedicated repository link is unchanged.

**Project previews:** ten distinct code-native concept illustrations, each matched to its project: GemOps metrics/dashboard (teal), Terraform network/compute/state map (azure), Ansible role terminal (warm gold), AKS delivery workflow (lime), Docker/Jenkins connected service containers (coral), Care Point healthcare composition (blue/teal), TaskFlow task board (ivory/olive), Meteor Blast space scene (navy), 2D game landscape (violet), and final-year movement/level study (copper). The final-year level concept is separate from the existing 2D-game artwork. These are illustrations, not gameplay/application screenshots or measured infrastructure status. No remote project scripts were executed. Do not invent employers, experience dates, testimonials, availability dates, or performance metrics.

The portrait is now Kashmitha Madushan's supplied photo, enhanced with the built-in image generation tool: natural skin tones, graphite/navy studio background, subtle teal halo and lime shoulder lighting. The 1254×1254 PNG is saved at `web/public/portrait.png` and shared by the Cover and About placements. Grayscale filters were removed so both placements show the edited colors. Alt text identifies the owner. The original uploaded photo remains outside the repository in the owner's Downloads folder. The displayed profile name and document metadata now use **Kashmitha Madushan**; the GitHub handle and signature remain Kashmitha. `profile.email` is empty; populating it enables the template's email action. `resume` is reserved without UI; `linkedin` now supplies the real About/Contact links.

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

**21 October 2026 — Social preview and metadata (latest):** generated and visually inspected the 1200×630 social PNG. Targeted direct Node assertions passed for the Vite metadata transform with no configured URL, a temporary example HTTPS origin, generated absolute image/canonical/page URLs, and invalid URL rejection. Example URL was used only in the test process and was not saved. Targeted Prettier and Git whitespace checks passed. Production build/full formatting/browser tests remain owner-run after these changes; live crawler behavior cannot be confirmed until the owner publishes with the actual `VITE_SITE_URL`. This run performed no installation, build, hosting or Git publication actions.

**21 October 2026 — Owner build passed; shell/browser setup follow-up (latest):** owner supplied terminal output from Command Prompt confirming a successful TypeScript/Vite production build (Vite 8.3.4). Full formatting initially flagged 11 files. AI ran the installed `npm --prefix web run format`, then `npm --prefix web run format:check`; the full check now passes. All 16 browser cases stopped at launch because the default Playwright Chromium headless shell was absent: the PowerShell `$env:PLAYWRIGHT_CHANNEL` assignment had failed in Command Prompt, so Edge was not selected. No portfolio browser assertions ran. In Command Prompt use `set "PLAYWRIGHT_CHANNEL=msedge"`, then `npm --prefix web test -- --workers=2` from the root with Edge installed. PowerShell commands in other sections require an actual PowerShell terminal. Browser rerun and visual review remain pending; the successful build predates formatting-only changes. The pasted output contains no commit or push result.

**21 October 2026 — Expanded About and LinkedIn (current):** added four biography paragraphs using visible public LinkedIn project information and the existing curated catalog, without a final-year undergraduate claim. Added three semantic role headings, descriptive bordered cards with DevOps & Cloud first, larger text and responsive stacking. LinkedIn appears in About and Contact; no phone number was added. Extended the existing chapter/workflow browser case to check biography, role headings and both LinkedIn URLs; the expected total remains 16 desktop/mobile cases. Targeted Prettier and Git whitespace checks passed. Build, full formatting, browser suite and visual review remain owner-run. Owner now confirms local Formspree inbox receipt; production delivery and reply behavior remain unverified. Older validation entries below are historical.

**21 October 2026 — Distinct previews and chapter colors (current):** replaced the repeated DevOps diagram compositions with separate Terraform, Ansible and Docker/Jenkins layouts, kept AKS's own delivery workflow, and gave the final-year game its own movement/level illustration. Added explicit chapter tones in App/FolderChapter so opening a chapter no longer always selects purple; adjusted inactive tints and gold text/button contrast. Updated final-year project copy from newly public source. Extended existing browser tests to check chapter tone persistence and verified final-year copy; the expected suite remains **16 cases**. Targeted Prettier checks passed for seven changed frontend files, and `git diff --check` passed before this README/contrast follow-up. No build or browser tests have been run for this revision. Both themes, narrow-screen artwork composition, all four active chapter colors and actual contrast still need owner visual review. Earlier passing reports apply to preceding revisions only; no dependencies or DevOps/publication commands executed.

**Catalog checks actually performed by AI:** targeted Prettier check passed for all five changed frontend files; `git diff --check` passed. Source inspection confirmed ten distinct repository entries with category counts 5/2/3, featured labels and supported preview variants. These checks do not replace owner-run TypeScript/build/browser validation.

**21 October 2026 — Ten-project catalog (current):** expanded from six to ten projects, reordered the category leads, added owner-requested featured labels, and extended the existing concept previews for Terraform, Ansible, Docker/Jenkins and the final-year game. Updated game/DevOps count assertions and added a browser case checking all ten dedicated repository URLs plus the category leads. The suite now contains **16 expected desktop/mobile cases**; it has not been run for this revision. Source and formatting checks are recorded below; build, complete frontend formatting, browser interactions, card/modal layout in both themes at 320px/390px and new preview appearance remain owner-run checks. The owner-reported passing 14-case suite below predates these catalog edits. The final-year source URL still needs owner confirmation after a public HTTP 404. No dependencies, backend, hosting, publication or DevOps execution changed.

**21 October 2026 — Contact tests passed (latest owner report):** owner reports all tests passed following Formspree integration, in response to the requested build/format/14-case Edge validation step. No detailed output or timing was supplied for this run, so the report confirms passing tests without independently establishing individual build/format results. Earlier detailed build/format/10-case results apply to the preceding revision. Live inbox delivery and reply behavior remain unconfirmed. Local inspection shows the contact component, App/styles/tests and README are awaiting commit on `main`. AI has not executed commit/push/deployment commands. Next: owner reviews and commits/pushes this change, verifies one real email, then proceeds to hosting preparation.

**21 October 2026 — Formspree integration (current):** connected the owner-supplied public endpoint in the new `web/src/components/ContactForm.tsx`; added required fields, feedback, duplicate protection, timeout and draft handling; kept the existing folder/theme styling. Source inspection and targeted Prettier checks passed for the four changed/new frontend files. Owner-run build, full formatting check and updated Playwright suite remain pending. Tests now cover validation/no send, draft persistence, mocked acceptance/payload/pending state, rejected submissions, network failures and quota errors, alongside existing portfolio behavior: **14 desktop/mobile cases are expected, not yet run**. Tests intercept the endpoint and do not send real messages. Live submission, actual inbox receipt, reply behavior, spam controls and narrow-screen visual review remain unverified. No dependencies installed or upgraded, no custom API created, and no Git publication commands executed.

**21 October 2026 — Successful owner rerun (before contact integration):** the owner provided fresh output showing the complete frontend formatting check passed and **all 10 desktop/mobile Edge Playwright tests passed in 27.3 seconds** after the portrait assertion fixes. The earlier owner-run production build (including TypeScript) also passed; no application logic changed during the assertion/formatting fix. This supersedes the earlier 6-pass/4-fail run below. Manual review of the portrait crop, full name, the complete 16-second backlight loop, glow and reduced motion remains unconfirmed. Read-only Git inspection found an existing `Initial commit` (`7f33f03`), a clean working tree before the validation README update, and origin pointing to `https://github.com/Kashmitha/personal-portfolio.git`. The owner subsequently reported committing/pushing the validation record; no Git publication commands were executed by AI.

**21 October 2026 — Owner-run validation and assertion fix:** the owner's pasted terminal output confirms `npm --prefix web run build` passed (TypeScript plus Vite 8.3.4). Formatting failed for `web/src/styles.css`. Edge Playwright completed with **6 passed, 4 failed**; all four failures stopped at an outdated assertion expecting the previous portrait's 1000px natural width, while the new image loaded at 1254px. This does not verify the remaining steps in those tests, including layout and project details. Updated both image assertions in `web/tests/portfolio.spec.ts` to poll for a positive natural width, which still rejects broken/unloaded images without requiring a particular asset size. Made the cover heading assertion match the full name exactly. Applied local Prettier to the stylesheet and test file. Build/browser tests after these edits remain unrun; manual portrait/name, animation and narrow-screen review remains pending. The earlier pending-build statements below describe historical status before this owner-run validation.

**21 October 2026 — New PC and portrait/name update:** owner reports Node.js installed and the locked dependency installation completed. The Vite start command was provided, but successful page loading has not been confirmed. Source inspection confirmed the enhanced PNG reference, matching 1254×1254 intrinsic dimensions, meaningful alt text, full name, removal of both grayscale filters, and a viewport width limit for the longer masthead name. Generated portrait visually inspected. No fresh typecheck, build, formatting or browser tests were run. Check the longer name and portrait crop in both themes at desktop, 390px and 320px. Git is available locally, but read-only inspection reports that this folder is not yet a Git repository; no initialization, commit, remote or push was executed.

**Before this latest refactor:** the folder redesign passed the TypeScript/production build, formatting, and 10 desktop/mobile Playwright checks using Microsoft Edge. Layout checks included a 320px viewport. Its old Docker image built and reported healthy. Earlier downloaded Chromium could not launch on this Windows environment, so Edge was used successfully.

**Latest refactor:** source inspection and workspace file checks confirmed the `web/`/`api/` structure, removal of generated DevOps files, and the new cover-only SVG gradient/glow implementation. Source/config/public assets/lockfile moved together. Local dependencies were moved into `web/node_modules/`; generated build/test outputs were removed.

**Latest UI correction:** replaced the rejected SVG gradient with a CSS animation on the outer stroke group, giving every letter the same changing color and keeping the inner stroke untouched. Retained the SVG halo. Enlarged desktop navigation, changed mobile navigation to two rows, and adjusted mobile anchor offsets. Source inspection confirmed the gradient definition/reference is removed and reduced-motion stops the cycle. The owner's screenshots show that the app rendered after the move, but they are not fresh automated validation.

**Remaining verification:** run build, full formatting and the 16-case Edge suite after the distinct-preview/chapter-color update. Prior contact-integration tests passed by owner report; they do not validate this revision. Final-year public source is now accessible and checked. Inspect all ten previews/cards/detail viewers, four active chapter colors, counts 5/2/3 and mobile layout in both themes. Actual Formspree inbox delivery and reply behavior still require an owner-sent test. Manual review of the 16-second color cycle/glow, reduced motion and portrait/name appearance remains unconfirmed. No Docker or deployment commands were executed.

## What to inspect and check for each type of change

| Change | Main files | Checks the owner should run or review |
| --- | --- | --- |
| Profile, repositories, project copy | `web/src/data/portfolio.ts` | Verify factual accuracy and links; open project details; build |
| Categories, chapters, skills, workflow | `web/src/App.tsx` | Check all tabs/accordions/links; browser tests |
| Contact delivery | `web/src/components/ContactForm.tsx`, `web/src/styles.css`, `web/tests/portfolio.spec.ts` | Mocked validation/submission/failure tests, both themes/mobile; owner verifies real inbox receipt and reply address |
| Portrait replacement | `web/public/portrait.png`, alt text in `web/src/App.tsx` | Cover/About crop on PC/mobile, image loading, meaningful alt text |
| Gaming colors, spacing, responsiveness | `web/src/styles.css` | Both themes at 320px, 390px, tablet and desktop; browser tests |
| Folder geometry/base mechanics | `web/src/template.css` | Folder overlap, tabs, floating nav, modal on small screens; browser tests |
| Wordmark backlight/glow | `StrokeText` in `web/src/components/FolderPortfolio.tsx`, `wordmark-backlight` keyframes and palette in `web/src/styles.css` | Observe a full 16-second loop; keep all letters the same color at each instant; preserve outline/draw effect; inspect both themes and reduced motion |
| Template interaction logic | `web/src/components/FolderPortfolio.tsx` | Typecheck/build; keyboard, focus, modal, category and navigation tests |
| Project illustrations | `web/src/components/ProjectVisual.tsx`, `web/src/project-visual.css` | Check all ten previews at card/modal sizes; keep concept labels |
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

- **21 October 2026 — Social-sharing preview:** added `web/public/social-preview.png`; added descriptive Open Graph and large-image social metadata to `web/index.html`; extended `web/vite.config.ts` to emit public image URLs and optional canonical/`og:url` from the owner's future `VITE_SITE_URL`. Updated this README. The PNG was created with local drawing tools and visually inspected; metadata config assertions, targeted formatting and Git whitespace checks passed. No domain was invented, and no dependency/hosting/publication changes were made. Owner must run build/browser checks, then choose/configure the actual public URL and validate live previews.

- **21 October 2026 — Footer readability:** enlarged footer discipline text to 16px, copyright/tagline to 12px, clock to 13px and Back to cover to 14px with a 44px minimum target. Added spacing, a subtle separator and stronger theme-aware text contrast; responsive wrapping accommodates mobile. Changed `web/src/styles.css` and this README. Formatting and Git whitespace checks passed; visual/browser/build checks remain owner-run.

- **21 October 2026 — Social brand marks:** added local filled GitHub and LinkedIn SVG marks via `web/src/components/SocialLogo.tsx`, selected by URL hostname. Replaced About contact initials, added marks to Contact social cards, every project Source code link and the GemOps field-notes link. Text link labels remain available to assistive technology; SVGs are decorative and require no remote fetch or new dependency. Updated App, FolderPortfolio, styles and this README. Formatting and Git whitespace checks passed; browser/build/visual checks remain owner-run.

- **21 October 2026 — Current Experience panel:** populated the existing About timeline with the owner's confirmed Associate DevOps Engineer role at Port City BPO (September 2026–Present). Added location from the public LinkedIn experience listing: Colombo District, Western Province, Sri Lanka. Added a semantic Experience heading and compact themed styling with readable dates/title/location and no blurred dates or extra navigation row. Changed `web/src/data/portfolio.ts`, `web/src/App.tsx`, `web/src/components/FolderPortfolio.tsx`, `web/src/styles.css` and this README. Targeted formatting and Git whitespace checks passed; build/browser/visual checks remain owner-run. Source: https://lk.linkedin.com/in/kashmitha-madushan-362822339 . No invented role duties or employer stack; no publication actions executed.

- **21 October 2026 — Formatting and Command Prompt correction:** formatted the 11 files flagged by the owner's full check using installed Prettier; no behavior or dependency changes. Affected `.prettierrc.json`, `index.html`, `package.json`, `playwright.config.ts`, `src/components/ContactForm.tsx`, `src/components/ProjectVisual.tsx`, `src/main.tsx`, `src/project-visual.css`, `src/template.css`, `tsconfig.json` and `vite.config.ts` under `web/`, plus this README. Full formatting check passed. Recorded owner-confirmed production build and 16 browser launch failures caused by absent Chromium after a failed PowerShell environment assignment in Command Prompt. Provided CMD syntax for selecting Edge; rerun remains owner-managed. No commit, push, browser installation or deployment executed.

- **21 October 2026 — About skill bullets and portrait companion:** explicitly restored visible disc markers on role-card skill lists. Added a compact field-notes panel below the About portrait with a three-step Define / Deliver / Understand workflow and a real GemOps repository link. The panel uses the existing theme palette, readable text and a keyboard-focusable link; only the portrait retains mouse tilt. Changed `web/src/App.tsx`, `web/src/components/FolderPortfolio.tsx`, `web/src/styles.css`, `web/tests/portfolio.spec.ts` (scoped role-heading assertion) and this README. Targeted formatting and Git whitespace checks passed; build/browser/visual checks remain owner-run.

- **21 October 2026 — Compact role row:** changed `web/src/styles.css` so all three About role cards share one desktop row, removing the full-width first card. Reduced card padding, gaps, heading/list sizes and biography paragraph spacing while retaining readable 17px biography text and mobile stacking. Updated this README. Targeted Prettier and Git whitespace checks passed; desktop/mobile visual review and build/browser validation remain owner-run.

- **21 October 2026 — Shorter owner-written biography:** replaced the expanded About prose with the owner's three supplied paragraphs and one short Unity/C# sentence. GemOps is emphasized in bold; About content now accepts React nodes for semantic emphasis. Changed `web/src/App.tsx`, `web/src/components/FolderPortfolio.tsx` and this README. Readable typography, role cards and LinkedIn links are retained. Targeted formatting and Git whitespace checks passed; build/browser checks remain owner-run.

- **21 October 2026 — Readable About and LinkedIn:** updated `web/src/App.tsx`, `web/src/data/portfolio.ts`, `web/src/components/FolderPortfolio.tsx`, `web/src/styles.css`, `web/tests/portfolio.spec.ts` and this README. Added separate About copy, three readable role cards, primary DevOps & Cloud emphasis and the owner's LinkedIn in About/Contact. Preserved cover copy, folder design, portrait and ten-project catalog. Public LinkedIn About text was truncated; copy uses visible project information and existing source-backed content. Recorded owner-confirmed local contact delivery. Targeted formatting/source checks performed; runtime and visual checks await owner commands. No dependencies or DevOps/publication commands executed.

- **21 October 2026 — Unique preview compositions, chapter palette and final-year source:** owner made `MyFinalYearProject` public; verified Unity version/manifests/movement script and updated its copy. Replaced reused DevOps workflow compositions with Azure topology, Ansible terminal and Docker/Jenkins service diagrams, plus a separate copper final-year level study. Added explicit violet/teal/orange/gold chapter tones, inactive tints and gold contrast adjustments. Changed `web/src/App.tsx`, `web/src/data/portfolio.ts`, `web/src/components/FolderPortfolio.tsx`, `web/src/components/ProjectVisual.tsx`, `web/src/styles.css`, `web/src/project-visual.css`, `web/tests/portfolio.spec.ts` and this README. Existing browser cases extended (16 expected total). Formatting/source checks performed; build/browser/visual checks remain owner-run. No dependencies, hosting or publication actions executed.
- **21 October 2026 — Expanded curated projects:** added Azure Terraform, Azure Ansible, Docker/Jenkins and the owner-described final-year game; retained GemOps, AKS, Care Point, TaskFlow and both existing Unity games. Catalog now has 5 DevOps / 2 full-stack / 3 games. GemOps is the lead/main DevOps entry; Care Point is the lead/largest full-stack entry. Researched public project READMEs and selected Care Point/Unity source, with a documented public 404 for the supplied final-year repository. Extended concept previews using existing CSS geometry and icons; reused the existing card subtitle slot for featured labels. Updated category counts and added repository-link/ordering browser coverage (16 expected cases total). Changed `web/src/data/portfolio.ts`, `web/src/App.tsx`, `web/src/components/ProjectVisual.tsx`, `web/src/project-visual.css`, `web/tests/portfolio.spec.ts` and this README. No dependencies or DevOps/publication commands executed. Build/browser checks remain owner-run.
- **21 October 2026 — Contact test report and deployment assessment:** owner reports all tests passed and requests Git push instructions and assessment of databases, features and `.dev` hosting. README updated with that report and remaining live-email/visual checks. Current feature set requires no custom database or backend: project content is versioned in frontend source, preferences/drafts are browser-local, and Formspree handles contact submissions. Proposed next phase after committing and verifying real email: static hosting preview, final domain-specific metadata, then `.dev` DNS/HTTPS and production smoke checks. Hosting is not configured; AI performed no publication or deployment actions.
- **21 October 2026 — Formspree contact integration:** owner supplied endpoint `https://formspree.io/f/mzedlggg`. Added `web/src/components/ContactForm.tsx`, replaced the local-only draft component in `web/src/App.tsx`, extended existing styles for labeled inputs and pending state, updated/expanded `web/tests/portfolio.spec.ts` with mocked contact coverage, and revised this README. Name/email/message POST, required fields, status feedback, duplicate protection, a 20-second timeout and failure-safe message draft handling implemented. No custom backend, dependencies or publication commands added. Targeted formatting passed; build/full formatting/browser checks and live delivery remain pending.
- **21 October 2026 — Contact delivery request:** owner reports Git checkpoint/push done and requests email or SMS delivery for contact messages. Inspected the existing local-only draft and researched official provider documentation. Recommended email via Formspree's free tier for the simplest setup without a custom backend; no account, endpoint, recipient, sending integration or live-delivery test has been configured. README only updated; no application code changed. Provider reference: https://formspree.io/plans.
- **21 October 2026 — Validation complete and Git state recorded:** owner confirms full formatting check and all 10 Edge desktop/mobile tests passed (27.3s), following the previously passing production build. Updated this README only to record actual results, remaining manual visual checks, and read-only confirmation of an existing initial commit and GitHub origin. Next: owner commits this validation record and verifies/pushes the branch; no repeat initialization needed. Backend scope remains undecided.
- **21 October 2026 — Validation follow-up:** recorded the owner's passing production build, stylesheet formatting failure, and 6/10 passing Edge tests. Replaced two obsolete fixed-width portrait assertions with loaded-image checks, updated the heading expectation to the full name, and formatted `web/src/styles.css` and `web/tests/portfolio.spec.ts` with installed Prettier. A targeted Prettier check passed for both changed files; the complete frontend formatting check and browser rerun remain pending. Changed those two files and this README. Owner must rerun formatting and browser checks before committing/pushing; no publication commands executed.
- **21 October 2026 — Owner portrait, full name and GitHub workflow:** replaced the placeholder with the owner's enhanced navy/teal/lime portrait, removed grayscale styling in both placements, updated profile name/metadata to Kashmitha Madushan, and constrained the masthead SVG width for narrow screens. Changed `web/public/portrait.png`, removed `web/public/portrait.jpg`, updated `web/src/data/portfolio.ts`, `web/src/App.tsx`, `web/src/styles.css`, `web/index.html`, and this README. Source and generated portrait inspected; build/format/browser validation remains owner-run. Recorded the owner's request to commit and push each completed code change; GitHub publication remains owner-run.
- **20 October 2026 — Initial phase:** built a React/TypeScript portfolio with curated public GitHub projects and placeholder portrait. Initial generic layout was rejected.
- **20 October 2026 — Approved redesign:** integrated the owner's actual folder-template source, adapted six sheets and three role folders, added gaming styling, photo identity card, light/dark themes and accessible interactions. Build/format and 10 Edge desktop/mobile checks passed before the next refactor.
- **20 October 2026 — Current handoff:** preserved approved UI, added rainbow/glow SVG outline to the cover wordmark, moved frontend to `web/`, reserved empty `api/`, removed generated DevOps and obsolete files, and consolidated project knowledge into this README. Owner will run verification commands. Future DevOps execution belongs to the owner.
- **20 October 2026 — Backlight correction and navigation sizing:** owner rejected the static rainbow. Removed its SVG gradient and added one synchronized, 16-second lime/teal/blue/violet stroke-color loop with glow and reduced-motion fallback. Enlarged desktop tabs and made mobile tabs a fully visible two-row layout. Fonts and overall design preserved. Changed `web/src/components/FolderPortfolio.tsx`, `web/src/styles.css`, and this README; source inspected, build/browser checks left for the owner.

## Next chat / next action

Start a new chat with: **“Read README.md completely, inspect the current files, and continue from the recorded status. Preserve the approved folder UI. I perform DevOps myself; provide commands for me to run.”**

Next: owner runs build, full formatting and the 16-case Edge suite; inspects all ten distinct previews/details, four chapter colors when opened/closed, counts 5/2/3 and featured ordering in both themes at 320px/390px/desktop. Final-year source/link is now verified. Then review/stage the seven changed frontend files plus this README, commit and push `main`. Real contact email delivery/reply still needs an owner test. After content approval, proceed to owner-managed static hosting preview and `.dev` domain setup, followed by production contact smoke checks. Cloudflare Pages is a suggested option, not a chosen/configured provider. Its frontend project root would be `web`, build script `npm run build` and output directory `dist` relative to `web`; retain locked dependencies and Node 24. Domain registration/renewal is separate from hosting; `.dev` requires HTTPS. Final canonical/share metadata should use the actual chosen domain. Current features require no custom database or API.

## Owner-run GitHub setup and repeat workflow

All terminal commands below run in **PowerShell at `C:\Users\DEVOPS kashmitha\Desktop\templates\New\personal-portfolio`**. These are instructions only; AI has not executed initialization, commit, remote setup or publication. This checkout is already initialized: use step 3 for validation and step 6 for subsequent changes; initial setup steps are historical guidance.

1. On GitHub, create an empty repository under your account, for example `personal-portfolio`. Choose visibility yourself. Do not initialize it with a README, `.gitignore` or license because local project files already exist. Copy its HTTPS URL.
2. Configure your local commit identity, substituting an email verified by GitHub or your exact GitHub-provided noreply address from Settings → Emails:

```powershell
Set-Location 'C:\Users\DEVOPS kashmitha\Desktop\templates\New\personal-portfolio'
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
