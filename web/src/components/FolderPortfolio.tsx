'use client';

// Folder Tab Portfolio Template — a whole designer portfolio built from file
// folders. A blue masthead tab, a sticky page counter, and seven "sheets" that
// read like the pages of a printed portfolio deck: a cover with a drawn-on
// wordmark and a fan of frosted category folders, a catalogue of chapters that
// open like filing tabs, an about page with an illustrated photo card and a
// timeline, a filterable work cabinet with a details sheet, a tabbed process
// folder, kind words on glass, and a contact stack.
//
// Nothing loads at runtime. The display type is a monoline stroke alphabet
// drawn in this file (with a pill-shaped "OO" ligature), the signature is
// generated from your name, and the photo, project covers and palm watermark
// are all SVG. Pass your own content through props; empty sections hide.
import * as React from 'react';
import { Gamepad2 } from 'lucide-react';
import ProjectVisual from './ProjectVisual';
import type { Project } from '../data/portfolio';
import '../template.css';

export type FolderTone = 'blue' | 'green' | 'orange' | 'yellow';
export type CoverKind = 'poster' | 'render' | 'page' | 'sale' | 'brand';

export type FolderCategory = {
  id: string;
  label: string;
  /** A second-language label, shown large inside the folder. */
  local?: string;
  tone: FolderTone;
  /** Which generated cover style its projects get. */
  kind?: CoverKind;
};

export type FolderProject = {
  title: string;
  local?: string;
  /** A category id. */
  category: string;
  year: string;
  summary: string;
  client?: string;
  role?: string;
  tools?: string[];
  /** Paragraphs for the details sheet. */
  body?: string[];
  href?: string;
  /** An image URL used instead of the generated cover. */
  image?: string;
  visual?: Project['visual'];
  /** A short word printed on the generated cover. */
  mark?: string;
};

export type FolderHighlight = {
  label: string;
  tone?: FolderTone;
  description?: string;
  lines: string[];
};
export type FolderTimelineItem = { from: string; to: string; title: string; place?: string };
export type FolderChapter = {
  title: string;
  tone?: FolderTone;
  local?: string;
  points?: string[];
  target?: FolderSectionId;
};
export type FolderStep = {
  title: string;
  local?: string;
  body: string;
  outputs?: string[];
  duration?: string;
};
export type FolderWord = { quote: string; name: string; role?: string; tone?: FolderTone };
export type FolderLink = { label: string; value: string; href?: string };
export type FolderSectionId =
  'cover' | 'contents' | 'about' | 'work' | 'process' | 'words' | 'contact';

export interface FolderTabPortfolioTemplateProps {
  /** Used in the greeting, the signature and alt text. */
  name?: string;
  /** Your name in a second script, shown after the greeting. */
  localName?: string;
  handle?: string;
  /** Text the generated signature is drawn from. Defaults to `name`'s first word. */
  signature?: string;
  years?: string;
  role?: string;
  /** Three short labels for every sheet's meta row. */
  disciplines?: string[];
  /** The masthead and cover wordmark. Letters, digits and basic punctuation. */
  word?: string;
  /** The outlined tag behind the wordmark, e.g. "#2026". */
  tag?: string;
  /** Big second-language title under the wordmark; odd parts are tinted. */
  subtitle?: string[];
  /** The three notes on the right of the masthead. */
  notes?: string[];
  blurb?: string;
  about?: React.ReactNode[];
  aboutAside?: React.ReactNode;
  greeting?: string;
  /** An image URL, your own node, or nothing for the illustrated photo. */
  photo?: string | React.ReactNode;
  highlights?: FolderHighlight[];
  timeline?: FolderTimelineItem[];
  categories?: FolderCategory[];
  projects?: FolderProject[];
  chapters?: FolderChapter[];
  steps?: FolderStep[];
  words?: FolderWord[];
  email?: string;
  contacts?: FolderLink[];
  /** IANA zone for the footer clock. */
  timeZone?: string;
  /** Override any folder colour. */
  colors?: Partial<Record<FolderTone, string>>;
  /** Join "OO" into one pill, as in PORTF◯◯LIO. */
  ligatures?: boolean;
  defaultTheme?: 'system' | 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
  /** Minimum height of the page. A definite length, so it survives any host layout. */
  height?: string;
  className?: string;
  contactContent?: React.ReactNode;
}

// #region type
// A monoline geometric alphabet, wide and round. Cap height is 100 units; each
// glyph is an SVG path drawn with a round-capped stroke, so the weight is a
// prop rather than a font file. Lower case is set in capitals.
type Glyph = { w: number; d: string };

const GLYPHS: Record<string, Glyph> = {
  A: { w: 120, d: 'M0 100 L60 0 L120 100 M22 64 H98' },
  B: { w: 99, d: 'M0 0 V100 M0 0 H68 A25 25 0 0 1 68 50 H0 M0 50 H74 A25 25 0 0 1 74 100 H0' },
  C: { w: 118, d: 'M109.5 17.9 A62 50 0 1 0 109.5 82.1' },
  D: { w: 104, d: 'M0 0 V100 M0 0 H52 A52 50 0 0 1 52 100 H0' },
  E: { w: 100, d: 'M100 0 H0 V100 H100 M0 50 H86' },
  F: { w: 100, d: 'M100 0 H0 V100 M0 50 H86' },
  G: { w: 124, d: 'M109.5 17.9 A62 50 0 1 0 124 50 H72' },
  H: { w: 110, d: 'M0 0 V100 M110 0 V100 M0 50 H110' },
  I: { w: 0, d: 'M0 0 V100' },
  J: { w: 90, d: 'M90 0 V58 A42 42 0 0 1 6 58' },
  K: { w: 108, d: 'M0 0 V100 M104 0 L0 60 M34 40 L108 100' },
  L: { w: 92, d: 'M0 0 V100 H92' },
  M: { w: 132, d: 'M0 100 V0 L66 70 L132 0 V100' },
  N: { w: 110, d: 'M0 100 V0 L110 100 V0' },
  O: { w: 124, d: 'M62 0 A62 50 0 1 1 62 100 A62 50 0 1 1 62 0' },
  P: { w: 97, d: 'M0 100 V0 H70 A27 27 0 0 1 70 54 H0' },
  Q: { w: 124, d: 'M62 0 A62 50 0 1 1 62 100 A62 50 0 1 1 62 0 M84 74 L124 104' },
  R: { w: 104, d: 'M0 100 V0 H70 A27 27 0 0 1 70 54 H0 M60 54 L104 100' },
  S: {
    w: 116,
    d: 'M112 18 C100 4 80 0 60 0 H52 C24 0 4 10 4 27 C4 44 22 50 56 50 H64 C98 50 116 58 116 74 C116 90 96 100 64 100 H54 C32 100 12 94 0 80',
  },
  T: { w: 116, d: 'M0 0 H116 M58 0 V100' },
  U: { w: 110, d: 'M0 0 V50 A55 50 0 0 0 110 50 V0' },
  V: { w: 120, d: 'M0 0 L60 100 L120 0' },
  W: { w: 160, d: 'M0 0 L40 100 L80 20 L120 100 L160 0' },
  X: { w: 112, d: 'M0 0 L112 100 M112 0 L0 100' },
  Y: { w: 116, d: 'M0 0 L58 52 L116 0 M58 52 V100' },
  Z: { w: 114, d: 'M4 0 H112 L0 100 H114' },
  '0': { w: 92, d: 'M46 0 A46 50 0 1 1 46 100 A46 50 0 1 1 46 0' },
  '1': { w: 44, d: 'M6 22 L44 0 V100' },
  '2': {
    w: 100,
    d: 'M2 26 C6 8 26 0 50 0 C78 0 98 10 98 28 C98 50 70 56 40 70 C16 81 2 90 0 100 H100',
  },
  '3': {
    w: 100,
    d: 'M4 10 C16 3 32 0 50 0 C78 0 96 10 96 26 C96 42 78 48 48 48 M48 48 C82 48 100 58 100 74 C100 92 80 100 50 100 C30 100 12 96 0 88',
  },
  '4': { w: 108, d: 'M78 100 V0 L0 70 H108' },
  '5': {
    w: 100,
    d: 'M96 0 H12 L6 46 C20 40 34 38 52 38 C82 38 100 50 100 69 C100 88 80 100 52 100 C30 100 12 96 0 88',
  },
  '6': {
    w: 102,
    d: 'M88 6 C76 2 64 0 52 0 C20 0 0 22 0 52 C0 80 22 100 52 100 C82 100 102 86 102 66 C102 46 82 34 54 34 C30 34 8 44 0 58',
  },
  '7': { w: 104, d: 'M0 0 H104 L40 100' },
  '8': {
    w: 100,
    d: 'M50 0 A44 23 0 1 1 50 46 A44 23 0 1 1 50 0 M50 46 A50 27 0 1 1 50 100 A50 27 0 1 1 50 46',
  },
  '9': {
    w: 102,
    d: 'M14 94 C26 98 38 100 50 100 C82 100 102 78 102 48 C102 20 80 0 50 0 C20 0 0 14 0 34 C0 54 20 66 48 66 C72 66 94 56 102 42',
  },
  '#': { w: 96, d: 'M34 6 L22 94 M78 6 L66 94 M6 34 H96 M0 66 H90' },
  '-': { w: 48, d: 'M0 56 H48' },
  '–': { w: 64, d: 'M0 56 H64' },
  '.': { w: 0, d: 'M0 99.5 L0 100' },
  ',': { w: 6, d: 'M6 96 L0 112' },
  ':': { w: 0, d: 'M0 44 L0 44.5 M0 99.5 L0 100' },
  "'": { w: 0, d: 'M0 0 V24' },
  '’': { w: 0, d: 'M0 0 V24' },
  '/': { w: 70, d: 'M70 -4 L0 104' },
  '+': { w: 76, d: 'M0 50 H76 M38 12 V88' },
  '(': { w: 32, d: 'M32 -8 Q-12 50 32 108' },
  ')': { w: 32, d: 'M0 -8 Q44 50 0 108' },
  '!': { w: 0, d: 'M0 0 V70 M0 99.5 V100' },
  '?': { w: 92, d: 'M0 24 C4 8 22 0 46 0 C74 0 92 10 92 28 C92 48 50 50 50 72 M50 99.5 V100' },
  '&': {
    w: 104,
    d: 'M100 100 L22 30 C10 18 18 0 42 0 C64 0 72 16 60 28 L14 62 C2 72 4 100 42 100 C66 100 84 88 98 66',
  },
};
const SPACE = 52;
const LIGATURES: Record<string, Glyph> = {
  OO: { w: 210, d: 'M50 0 H160 A50 50 0 0 1 160 100 H50 A50 50 0 0 1 50 0' },
};

type Placed = { ch: string; x: number; d: string };

// Lays a string out left to right. Unknown characters become a space, so a
// wordmark never throws on an accent or an emoji, it just leaves a gap.
function layoutText(
  text: string,
  tracking: number,
  ligatures: boolean,
): { items: Placed[]; width: number } {
  const chars = [...text.toUpperCase()];
  const items: Placed[] = [];
  let x = 0;
  for (let i = 0; i < chars.length; i++) {
    const pair = chars[i] + (chars[i + 1] ?? '');
    if (ligatures && LIGATURES[pair]) {
      items.push({ ch: pair, x, d: LIGATURES[pair].d });
      x += LIGATURES[pair].w + tracking;
      i++;
      continue;
    }
    const g = GLYPHS[chars[i]];
    if (!g) {
      x += SPACE;
      continue;
    }
    items.push({ ch: chars[i], x, d: g.d });
    x += g.w + tracking;
  }
  const width = Math.max(0, items.length ? x - tracking : 0);
  return { items, width };
}

// Each "M" starts its own <path>, so the draw-on dash runs per stroke.
function splitSubpaths(d: string): string[] {
  return d
    .split(/(?=M)/)
    .map((s) => s.trim())
    .filter(Boolean);
}
// #endregion type

// #region sign
// A seeded PRNG and a string hash, so generated art is stable per input.
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

// A handwritten-looking signature: one continuous stroke of loops, humps and
// descenders read off the letters of a name, finished with an underline swash.
// It is a scrawl, not lettering, which is what most signatures are anyway.
function signaturePath(text: string): { d: string; width: number } {
  const letters = [...text.replace(/[^A-Za-z]/g, '')].slice(0, 12);
  const rnd = rng(hashString(text || 'signature'));
  const base = 64;
  let x = 4;
  let d = 'M0 ' + (base + 6) + ' C1 ' + (base + 2) + ' 2 ' + base + ' ' + x + ' ' + base;
  const loop = (w: number, h: number) =>
    ' C' +
    r1(x + w * 0.95) +
    ' ' +
    r1(base - h * 0.5) +
    ' ' +
    r1(x + w * 0.9) +
    ' ' +
    r1(base - h) +
    ' ' +
    r1(x + w * 0.55) +
    ' ' +
    r1(base - h) +
    ' C' +
    r1(x + w * 0.15) +
    ' ' +
    r1(base - h) +
    ' ' +
    r1(x + w * 0.3) +
    ' ' +
    base +
    ' ' +
    r1(x + w) +
    ' ' +
    base;
  if (!letters.length) letters.push('s');
  letters.forEach((ch, i) => {
    const lower = ch.toLowerCase();
    const cap = ch !== lower || i === 0;
    let w = 16 + rnd() * 10;
    if (cap) {
      w += 12;
      d += loop(w, 52 + rnd() * 8);
    } else if (/[bdfhklt]/.test(lower)) d += loop(w, 42 + rnd() * 6);
    else if (/[gjpqyz]/.test(lower)) d += loop(w, -(30 + rnd() * 6));
    else if (rnd() < 0.55) {
      const k = 15 + rnd() * 6;
      d +=
        ' C' +
        r1(x + w * 0.1) +
        ' ' +
        r1(base - k) +
        ' ' +
        r1(x + w * 0.8) +
        ' ' +
        r1(base - k) +
        ' ' +
        r1(x + w) +
        ' ' +
        base;
    } else d += loop(w, 16 + rnd() * 5);
    x += w;
  });
  d +=
    ' C' +
    r1(x + 18) +
    ' ' +
    (base - 6) +
    ' ' +
    r1(x + 20) +
    ' ' +
    (base + 16) +
    ' ' +
    r1(x - 6) +
    ' ' +
    (base + 18) +
    ' C' +
    r1(x * 0.55) +
    ' ' +
    (base + 22) +
    ' ' +
    r1(x * 0.25) +
    ' ' +
    (base + 12) +
    ' 4 ' +
    (base + 20);
  return { d, width: r1(x + 24) };
}
// #endregion sign

// #region art
// One palm frond: a curved rib with leaflets fanned along it. Used as the faint
// watermark behind the cover and as the small icon by the greeting.
function frondPath(seed: number, size = 400): string {
  const rnd = rng(seed);
  const s = size / 400;
  const P = (t: number) => ({
    x: (1 - t) * (1 - t) * 40 + 2 * (1 - t) * t * 110 + t * t * 370,
    y: (1 - t) * (1 - t) * 390 + 2 * (1 - t) * t * 110 + t * t * 60,
  });
  let d = '';
  for (let t = 0.08; t < 0.97; t += 0.05) {
    const a = P(t);
    const b = P(t + 0.01);
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const tx = (b.x - a.x) / len;
    const ty = (b.y - a.y) / len;
    const L = (40 + 120 * Math.pow(Math.sin(Math.PI * t), 0.8)) * (0.9 + rnd() * 0.2);
    for (const side of [1, -1]) {
      const nx = -ty * side;
      const ny = tx * side;
      const qx = a.x + (nx * 0.72 + tx * 0.7) * L;
      const qy = a.y + (ny * 0.72 + ty * 0.7) * L;
      const wdt = 7 + 5 * Math.sin(Math.PI * t);
      const mx = (a.x + qx) / 2;
      const my = (a.y + qy) / 2;
      d +=
        'M' +
        r1(a.x * s) +
        ' ' +
        r1(a.y * s) +
        ' Q' +
        r1((mx + nx * wdt - tx * wdt) * s) +
        ' ' +
        r1((my + ny * wdt - ty * wdt) * s) +
        ' ' +
        r1(qx * s) +
        ' ' +
        r1(qy * s) +
        ' Q' +
        r1((mx - nx * wdt * 0.4 + tx * wdt) * s) +
        ' ' +
        r1((my - ny * wdt * 0.4 + ty * wdt) * s) +
        ' ' +
        r1(a.x * s) +
        ' ' +
        r1(a.y * s) +
        'Z';
    }
  }
  return d;
}

function initialsOf(text: string): string {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function pad2(n: number): string {
  return (n < 10 ? '0' : '') + n;
}

function markOf(p: { mark?: string; title: string }): string {
  return (p.mark || p.title.split(/\s+/)[0] || '').toUpperCase().slice(0, 6);
}
// #endregion art

const TONE_HEX: Record<FolderTone, string> = {
  blue: '#3a6cf4',
  green: '#3cc84a',
  orange: '#ff6a3d',
  yellow: '#f3e7a6',
};
const TONES: FolderTone[] = ['blue', 'green', 'orange', 'yellow'];

const SECTIONS: { id: FolderSectionId; label: string; page: string }[] = [
  { id: 'cover', label: 'Cover', page: 'Cover page' },
  { id: 'contents', label: 'Contents', page: 'Contents' },
  { id: 'about', label: 'About', page: 'About me' },
  { id: 'work', label: 'Work', page: 'Details page' },
  { id: 'process', label: 'Process', page: 'Process' },
  { id: 'words', label: 'Words', page: 'Evaluation' },
  { id: 'contact', label: 'Contact', page: 'Contact' },
];

type Theme = 'light' | 'dark';
type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

const useIsoLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/* ------------------------------------------------------------------ type */

function StrokeText({
  text,
  weight = 8,
  outline = 0,
  tracking = 26,
  ligatures = true,
  color = 'currentColor',
  inner = 'var(--ftp-sheet)',
  delay = 0,
  className,
  label,
  decorative,
  radiant = false,
}: {
  text: string;
  weight?: number;
  /** Width of the outline line, in glyph units. 0 draws a solid stroke. */
  outline?: number;
  tracking?: number;
  ligatures?: boolean;
  color?: string;
  /** Fill colour of the hollow inside an outlined stroke. */
  inner?: string;
  delay?: number;
  className?: string;
  label?: string;
  decorative?: boolean;
  /** Uniform color-cycling stroke and soft halo, used only by the cover wordmark. */
  radiant?: boolean;
}) {
  const radiantId = React.useId().replace(/:/g, '');
  const L = React.useMemo(
    () => layoutText(text, tracking + weight * 0.6, ligatures),
    [text, tracking, weight, ligatures],
  );
  const p = weight / 2 + 2;
  const vbW = r1(L.width + p * 2);
  const vbH = r1(124 + p * 2);
  const layers =
    outline > 0
      ? [
          { c: color, w: weight },
          { c: inner, w: Math.max(0.5, weight - outline * 2) },
        ]
      : [{ c: color, w: weight }];
  return (
    <svg
      className={'ftp-st' + (className ? ' ' + className : '')}
      viewBox={r1(-p) + ' ' + r1(-12 - p) + ' ' + vbW + ' ' + vbH}
      width={vbW}
      height={vbH}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : (label ?? text)}
      aria-hidden={decorative ? true : undefined}
      style={{ '--d': delay + 'ms' } as Vars}
    >
      {radiant && (
        <defs>
          <filter id={`${radiantId}-halo`} x="-20%" y="-80%" width="140%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      {layers.map((layer, li) => (
        <g
          key={li}
          fill="none"
          className={radiant && li === 0 ? 'ftp-radiant-stroke' : undefined}
          stroke={layer.c}
          filter={radiant && li === 0 ? `url(#${radiantId}-halo)` : undefined}
          strokeWidth={layer.w}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {L.items.map((g, i) => (
            <g key={i} transform={'translate(' + r1(g.x) + ' 0)'}>
              <g className="ftp-gl" style={{ '--i': i } as Vars}>
                {splitSubpaths(g.d).map((sp, j) => (
                  <path key={j} d={sp} pathLength={1} className="ftp-draw" />
                ))}
              </g>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

function Signature({
  text,
  className,
  delay = 0,
  weight = 3.2,
}: {
  text: string;
  className?: string;
  delay?: number;
  weight?: number;
}) {
  const sig = React.useMemo(() => signaturePath(text), [text]);
  const w = sig.width + 34;
  return (
    <svg
      className={'ftp-sig' + (className ? ' ' + className : '')}
      viewBox={'-30 -2 ' + w + ' 106'}
      width={w}
      height={106}
      aria-hidden="true"
      style={{ '--d': delay + 'ms' } as Vars}
    >
      <path
        d={sig.d}
        transform="skewX(-14)"
        fill="none"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="ftp-draw"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- folder */

function Folder({
  tone,
  tab,
  tabAt = 0.1,
  glass,
  as = 'div',
  className,
  bodyClass,
  style,
  children,
  ...rest
}: {
  tone: FolderTone | 'sheet';
  tab?: React.ReactNode;
  /** 0 is flush left, 1 flush right, anything between slides along the top. */
  tabAt?: number;
  glass?: boolean;
  as?: 'div' | 'button' | 'article' | 'li' | 'figure';
  className?: string;
  bodyClass?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'className'>) {
  const flush = tabAt <= 0 ? 'left' : tabAt >= 1 ? 'right' : undefined;
  const Tag = as as 'div';
  return (
    <Tag
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      className={'ftp-folder' + (className ? ' ' + className : '')}
      data-tone={tone}
      data-glass={glass ? 'true' : undefined}
      data-flush={flush}
      style={{ ...style, '--tx': Math.min(1, Math.max(0, tabAt)) } as Vars}
    >
      {tab != null && (
        <span className="ftp-tabshape ftp-ftab" data-tone={tone} data-flush={flush}>
          {tab}
        </span>
      )}
      <div className={'ftp-fbody' + (bodyClass ? ' ' + bodyClass : '')}>{children}</div>
    </Tag>
  );
}

type TabItem = { id: string; label: React.ReactNode; tone: FolderTone; count?: number };

// A row of folder tabs. The selected one drops onto the panel and grows its
// shoulders; the rest float just above it. Arrow keys, Home and End move.
function TabBar({
  items,
  active,
  onChange,
  label,
  idBase,
}: {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
  label: string;
  idBase: string;
}) {
  const refs = React.useRef([] as (HTMLButtonElement | null)[]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === 'ArrowRight') n = (i + 1) % items.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + items.length) % items.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = items.length - 1;
    if (n < 0) return;
    e.preventDefault();
    onChange(items[n].id);
    refs.current[n]?.focus();
  };
  return (
    <div className="ftp-tabbar" role="tablist" aria-label={label}>
      {items.map((it, i) => {
        const on = it.id === active;
        return (
          <button
            key={it.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={idBase + '-tab-' + it.id}
            aria-selected={on}
            aria-controls={idBase + '-panel'}
            tabIndex={on ? 0 : -1}
            className="ftp-tabshape ftp-tabbtn"
            data-tone={on ? it.tone : 'ghost'}
            data-on={on ? 'true' : 'false'}
            onClick={() => onChange(it.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {it.label}
            {it.count != null && <span className="ftp-tchip">{pad2(it.count)}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------- art */

function Arrow({
  size = 14,
  dir = 'right',
}: {
  size?: number;
  dir?: 'right' | 'down' | 'up' | 'left' | 'ne';
}) {
  const rot = { right: 0, down: 90, left: 180, up: -90, ne: -45 }[dir];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ transform: 'rotate(' + rot + 'deg)' }}
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PalmIcon({ size = 30 }: { size?: number }) {
  return <Gamepad2 size={size} strokeWidth={1.5} />;
}

export function Palm({ className }: { className?: string }) {
  const d = React.useMemo(() => frondPath(7), []);
  const d2 = React.useMemo(() => frondPath(19, 300), []);
  return (
    <svg className={className} viewBox="0 0 420 420" width={420} height={420} aria-hidden="true">
      <path d={d} fill="currentColor" />
      <g transform="translate(150 150) rotate(28 150 150)">
        <path d={d2} fill="currentColor" opacity=".7" />
      </g>
      <path
        d="M40 390 Q110 110 370 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// The illustrated "photo": a harbour skyline at dusk, a ferry, a rocky shore
// and someone looking out over it. Lit windows twinkle; the water shimmers.
function PhotoScene({ name, seed }: { name: string; seed: number }) {
  const id = React.useId().replace(/:/g, '');
  const scene = React.useMemo(() => {
    const rnd = rng(seed);
    const blds: { x: number; w: number; h: number; spire: boolean }[] = [];
    let x = -6;
    while (x < 306) {
      const w = 14 + rnd() * 26;
      const tall = rnd() < 0.18;
      blds.push({ x, w, h: tall ? 90 + rnd() * 40 : 26 + rnd() * 52, spire: tall && rnd() < 0.6 });
      x += w + (rnd() < 0.3 ? 2 : 0);
    }
    const wins: { x: number; y: number; on: boolean; dl: number }[] = [];
    for (const b of blds) {
      for (let wy = 196 - b.h + 6; wy < 190; wy += 7) {
        for (let wx = b.x + 3; wx < b.x + b.w - 4; wx += 6) {
          if (rnd() < 0.34) wins.push({ x: wx, y: wy, on: rnd() < 0.2, dl: rnd() * 3 });
        }
      }
    }
    const rocks = Array.from({ length: 14 }, () => ({
      x: rnd() * 300,
      y: 300 + rnd() * 56,
      rx: 4 + rnd() * 12,
      ry: 2 + rnd() * 5,
    }));
    return { blds, wins, rocks };
  }, [seed]);
  return (
    <svg
      viewBox="0 0 300 360"
      width={300}
      height={360}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={'Photo of ' + name}
    >
      <defs>
        <linearGradient id={id + '-sky'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b4a8f" />
          <stop offset=".42" stopColor="#6d8ed2" />
          <stop offset=".72" stopColor="#d9b4c9" />
          <stop offset="1" stopColor="#f5d2b0" />
        </linearGradient>
        <linearGradient id={id + '-sea'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6a7fb4" />
          <stop offset=".5" stopColor="#3a5288" />
          <stop offset="1" stopColor="#1f2f55" />
        </linearGradient>
        <linearGradient id={id + '-coat'} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#24252c" />
          <stop offset=".6" stopColor="#111217" />
          <stop offset="1" stopColor="#060608" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill={'url(#' + id + '-sky)'} />
      <circle cx="232" cy="172" r="16" fill="#ffe2c2" opacity=".7" />
      <g fill="#273863">
        {scene.blds.map((b, i) => (
          <g key={i}>
            <rect x={r1(b.x)} y={r1(196 - b.h)} width={r1(b.w)} height={r1(b.h)} />
            {b.spire && (
              <rect x={r1(b.x + b.w / 2 - 1)} y={r1(196 - b.h - 18)} width="2" height="18" />
            )}
          </g>
        ))}
      </g>
      <g>
        {scene.wins.map((w, i) => (
          <rect
            key={i}
            x={r1(w.x)}
            y={r1(w.y)}
            width="2.4"
            height="2.8"
            fill={i % 5 ? '#ffd68a' : '#a8dcff'}
            className={w.on ? 'ftp-twinkle' : undefined}
            style={w.on ? ({ '--dl': r1(w.dl) + 's' } as Vars) : undefined}
            opacity=".9"
          />
        ))}
      </g>
      <rect y="196" width="300" height="104" fill={'url(#' + id + '-sea)'} />
      <g fill="#273863" opacity=".35" transform="translate(0 392) scale(1 -1)">
        {scene.blds.map((b, i) => (
          <rect
            key={i}
            x={r1(b.x)}
            y={r1(196 - b.h * 0.6)}
            width={r1(b.w)}
            height={r1(b.h * 0.6)}
          />
        ))}
      </g>
      <g className="ftp-shimmer" stroke="#ffe0b0" strokeLinecap="round" opacity=".55">
        {[206, 214, 223, 233, 246, 262].map((y, i) => (
          <line
            key={y}
            x1={30 + ((i * 47) % 140)}
            x2={70 + ((i * 47) % 140) + i * 9}
            y1={y}
            y2={y}
            strokeWidth={1.2 + i * 0.2}
          />
        ))}
      </g>
      <g transform="translate(48 204)">
        <path d="M0 8 H58 L52 14 H6 Z" fill="#e9edf6" />
        <rect x="10" y="2" width="34" height="6" rx="1" fill="#f5f7fb" />
        <rect x="16" y="-3" width="16" height="5" rx="1" fill="#dfe6f3" />
        {[13, 19, 25, 31, 37].map((wx) => (
          <rect
            key={wx}
            x={wx}
            y="4"
            width="3"
            height="2"
            fill="#ffcf7a"
            className="ftp-twinkle"
            style={{ '--dl': wx / 20 + 's' } as Vars}
          />
        ))}
      </g>
      <path
        d="M0 296 C40 284 70 292 110 286 C160 278 200 290 240 282 C268 277 288 284 300 280 V360 H0Z"
        fill="#2a2522"
      />
      <g fill="#3b3430">
        {scene.rocks.map((r, i) => (
          <ellipse key={i} cx={r1(r.x)} cy={r1(r.y)} rx={r1(r.rx)} ry={r1(r.ry)} />
        ))}
      </g>
      <g>
        <path
          d="M142 360 C138 316 140 262 152 236 C160 218 178 210 196 212 C214 214 226 228 232 254 C238 284 240 326 238 360 Z"
          fill={'url(#' + id + '-coat)'}
        />
        <path
          d="M176 214 C180 224 186 230 194 232 C198 226 200 220 200 213 C192 210 184 210 176 214Z"
          fill="#0a0a0d"
        />
        <rect x="181" y="198" width="14" height="18" rx="5" fill="#d9b49a" />
        <ellipse cx="186" cy="184" rx="16" ry="19" fill="#e2bfa3" />
        <path
          d="M170 182 C166 160 182 152 198 157 C208 161 207 177 204 190 C200 182 196 176 188 172 C181 172 174 176 170 182Z"
          fill="#131315"
        />
        <path
          d="M171 186 C169 190 170 194 173 195"
          fill="none"
          stroke="#c99f84"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M156 262 C160 276 168 288 178 292"
          fill="none"
          stroke="#2c2d35"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="172"
          y="282"
          width="14"
          height="22"
          rx="3"
          fill="#d6393b"
          transform="rotate(-12 179 293)"
        />
      </g>
    </svg>
  );
}

// Generated project covers, five styles keyed by category. Stable per title.
function CoverArt({
  kind,
  seed,
  mark,
  colors,
}: {
  kind: CoverKind;
  seed: number;
  mark: string;
  colors: Record<FolderTone, string>;
}) {
  const id = React.useId().replace(/:/g, '');
  const rnd = rng(seed);
  const pick = (): string => colors[TONES[Math.floor(rnd() * TONES.length)]];
  const font = 'ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif';
  const common = {
    viewBox: '0 0 320 220',
    width: 320,
    height: 220,
    preserveAspectRatio: 'xMidYMid slice',
    'aria-hidden': true,
  } as const;

  if (kind === 'render') {
    const a = pick();
    const cx = 120 + rnd() * 80;
    return (
      <svg {...common}>
        <defs>
          <linearGradient id={id + '-bg'} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eef2ff" />
            <stop offset="1" stopColor={a} stopOpacity=".55" />
          </linearGradient>
          <radialGradient id={id + '-ball'} cx=".35" cy=".3" r=".75">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".35" stopColor={a} />
            <stop offset="1" stopColor="#1b2234" stopOpacity=".85" />
          </radialGradient>
          <linearGradient id={id + '-pill'} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
            <stop offset="1" stopColor={colors.blue} stopOpacity=".7" />
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill={'url(#' + id + '-bg)'} />
        <ellipse cx="160" cy="186" rx="150" ry="22" fill="#ffffff" opacity=".55" />
        <ellipse cx={r1(cx)} cy="182" rx="52" ry="9" fill="#1b2234" opacity=".18" />
        <circle cx={r1(cx)} cy="128" r="52" fill={'url(#' + id + '-ball)'} />
        <ellipse
          cx={r1(cx - 18)}
          cy="104"
          rx="16"
          ry="9"
          fill="#fff"
          opacity=".7"
          transform={'rotate(-30 ' + r1(cx - 18) + ' 104)'}
        />
        <rect
          x={r1(cx + 30)}
          y="62"
          width="96"
          height="34"
          rx="17"
          fill={'url(#' + id + '-pill)'}
          transform={'rotate(-24 ' + r1(cx + 78) + ' 79)'}
        />
        <g transform={'translate(' + r1(40 + rnd() * 30) + ' 132)'}>
          <path d="M0 14 L22 0 L44 14 L22 28Z" fill="#ffffff" />
          <path d="M0 14 L22 28 V54 L0 40Z" fill={colors.green} />
          <path d="M44 14 L22 28 V54 L44 40Z" fill={colors.green} opacity=".7" />
        </g>
        <text
          x="18"
          y="30"
          fontFamily={font}
          fontSize="11"
          fontWeight="700"
          letterSpacing="2"
          fill="#1b2234"
          opacity=".7"
        >
          {mark} · 3D
        </text>
      </svg>
    );
  }

  if (kind === 'page') {
    const a = pick();
    return (
      <svg {...common}>
        <rect width="320" height="220" fill="#eef1f6" />
        <circle cx="262" cy="40" r="70" fill={a} opacity=".22" />
        <g transform="translate(36 18)">
          <rect width="112" height="210" rx="16" fill="#ffffff" />
          <rect x="8" y="8" width="96" height="70" rx="10" fill={a} opacity=".9" />
          <circle cx="56" cy="46" r="20" fill="#ffffff" opacity=".9" />
          <text
            x="56"
            y="51"
            textAnchor="middle"
            fontFamily={font}
            fontSize="11"
            fontWeight="800"
            fill={a}
          >
            {mark.slice(0, 4)}
          </text>
          <rect x="10" y="88" width="64" height="7" rx="3.5" fill="#1b2234" />
          <rect x="10" y="100" width="88" height="5" rx="2.5" fill="#c6cad5" />
          <rect x="10" y="110" width="76" height="5" rx="2.5" fill="#c6cad5" />
          <rect x="10" y="124" width="42" height="34" rx="6" fill="#eef1f6" />
          <rect x="56" y="124" width="42" height="34" rx="6" fill="#eef1f6" />
          <rect x="10" y="168" width="92" height="18" rx="9" fill={a} />
        </g>
        <g transform="translate(170 64)">
          <rect width="118" height="40" rx="12" fill="#ffffff" />
          <text x="14" y="26" fontFamily={font} fontSize="16" fontWeight="800" fill="#1b2234">
            {'¥' + (59 + Math.floor(rnd() * 140))}
          </text>
          <rect x="74" y="12" width="32" height="16" rx="8" fill={colors.orange} />
          <rect x="0" y="54" width="92" height="30" rx="10" fill="#ffffff" opacity=".85" />
          <rect x="12" y="66" width="56" height="6" rx="3" fill="#c6cad5" />
          <rect x="0" y="96" width="110" height="30" rx="10" fill={a} opacity=".9" />
          <text
            x="14"
            y="116"
            fontFamily={font}
            fontSize="10"
            fontWeight="700"
            letterSpacing="1.5"
            fill="#ffffff"
          >
            DETAILS →
          </text>
        </g>
      </svg>
    );
  }

  if (kind === 'sale') {
    const confetti = Array.from({ length: 22 }, () => ({
      x: rnd() * 320,
      y: rnd() * 220,
      r: rnd() * 180,
      c: pick(),
    }));
    return (
      <svg {...common}>
        <rect width="320" height="220" fill={colors.yellow} />
        {confetti.map((c, i) => (
          <rect
            key={i}
            x={r1(c.x)}
            y={r1(c.y)}
            width="8"
            height="3.5"
            rx="1.5"
            fill={c.c}
            transform={'rotate(' + r1(c.r) + ' ' + r1(c.x) + ' ' + r1(c.y) + ')'}
          />
        ))}
        <polygon
          points={Array.from({ length: 24 }, (_, i) => {
            const ang = (i / 24) * Math.PI * 2;
            const rr = i % 2 ? 54 : 68;
            return r1(236 + Math.cos(ang) * rr) + ',' + r1(80 + Math.sin(ang) * rr);
          }).join(' ')}
          fill={colors.orange}
        />
        <text
          x="236"
          y="76"
          textAnchor="middle"
          fontFamily={font}
          fontSize="18"
          fontWeight="900"
          fill="#ffffff"
        >
          SALE
        </text>
        <text
          x="236"
          y="96"
          textAnchor="middle"
          fontFamily={font}
          fontSize="10"
          fontWeight="700"
          letterSpacing="2"
          fill="#ffffff"
        >
          TODAY
        </text>
        <text
          x="20"
          y="168"
          fontFamily={font}
          fontSize="78"
          fontWeight="900"
          letterSpacing="-3"
          fill="#1b2234"
        >
          {mark}
        </text>
        <text
          x="22"
          y="196"
          fontFamily={font}
          fontSize="12"
          fontWeight="700"
          letterSpacing="4"
          fill="#1b2234"
          opacity=".6"
        >
          LIMITED · OFF
        </text>
        <g transform="translate(24 30) rotate(-8)">
          <path d="M0 0 H74 L90 16 L74 32 H0Z" fill={colors.blue} />
          <circle cx="76" cy="16" r="4" fill={colors.yellow} />
          <text x="10" y="21" fontFamily={font} fontSize="12" fontWeight="800" fill="#ffffff">
            DEALS
          </text>
        </g>
      </svg>
    );
  }

  if (kind === 'brand') {
    const bg = pick();
    return (
      <svg {...common}>
        <rect width="320" height="220" fill={bg === colors.yellow ? colors.orange : bg} />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const gx = 34 + (i % 3) * 90;
          const gy = 46 + Math.floor(i / 3) * 92;
          const s = Math.floor(rnd() * 4);
          return (
            <g
              key={i}
              transform={'translate(' + gx + ' ' + gy + ')'}
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
            >
              {s === 0 && <circle cx="26" cy="26" r="22" />}
              {s === 1 && <rect x="4" y="4" width="44" height="44" rx="12" />}
              {s === 2 && <path d="M26 4 L48 46 H4Z" strokeLinejoin="round" />}
              {s === 3 && <path d="M4 26 C14 4 38 4 48 26 C38 48 14 48 4 26Z" />}
              {i === 4 && (
                <text
                  x="26"
                  y="33"
                  textAnchor="middle"
                  fontFamily={font}
                  fontSize="18"
                  fontWeight="900"
                  fill="#ffffff"
                  stroke="none"
                >
                  {mark.slice(0, 1)}
                </text>
              )}
            </g>
          );
        })}
        <text
          x="300"
          y="206"
          textAnchor="end"
          fontFamily={font}
          fontSize="11"
          fontWeight="700"
          letterSpacing="3"
          fill="#ffffff"
          opacity=".8"
        >
          {mark}
        </text>
      </svg>
    );
  }

  // poster
  const bg = pick();
  const fg = pick();
  const cx = 80 + rnd() * 160;
  const cy = 50 + rnd() * 70;
  return (
    <svg {...common}>
      <rect width="320" height="220" fill={bg === colors.yellow ? colors.blue : bg} />
      <circle
        cx={r1(cx)}
        cy={r1(cy)}
        r={r1(56 + rnd() * 30)}
        fill={fg === bg ? '#ffffff' : fg}
        opacity=".9"
      />
      <g stroke="#ffffff" strokeWidth="2" opacity=".28">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={-40 + i * 44} y1="220" x2={60 + i * 44} y2="0" />
        ))}
      </g>
      <g fill="#ffffff" opacity=".8">
        {Array.from({ length: 20 }, (_, i) => (
          <circle key={i} cx={252 + (i % 4) * 12} cy={128 + Math.floor(i / 4) * 12} r="2" />
        ))}
      </g>
      <text
        x="16"
        y="28"
        fontFamily={font}
        fontSize="10"
        fontWeight="700"
        letterSpacing="2.5"
        fill="#ffffff"
      >
        {'VOL.' + pad2(1 + Math.floor(rnd() * 12))}
      </text>
      <text
        x="14"
        y="200"
        fontFamily={font}
        fontSize="64"
        fontWeight="900"
        letterSpacing="-2"
        fill="#ffffff"
      >
        {mark}
      </text>
    </svg>
  );
}

function StepArt({ index }: { index: number }) {
  // Four tiny diagrams: a magnifier over dots, a ranked list, a grid with a
  // highlighted cell, and a stack of outgoing files.
  return (
    <svg
      className="ftp-step-art"
      viewBox="0 0 320 120"
      width={320}
      height={120}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {index % 4 === 0 && (
        <g>
          {Array.from({ length: 18 }, (_, i) => (
            <circle
              key={i}
              cx={20 + (i % 9) * 22}
              cy={30 + Math.floor(i / 9) * 40}
              r={i === 6 ? 6 : 3}
              fill={i === 6 ? 'currentColor' : 'none'}
            />
          ))}
          <circle cx="160" cy="44" r="30" />
          <path d="M182 66 L214 98" strokeWidth="5" />
        </g>
      )}
      {index % 4 === 1 && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <text
                x="10"
                y={22 + i * 28}
                fontSize="14"
                fontWeight="700"
                fill="currentColor"
                stroke="none"
              >
                {pad2(i + 1)}
              </text>
              <rect
                x="44"
                y={10 + i * 28}
                width={230 - i * 46}
                height="14"
                rx="7"
                fill={i === 0 ? 'currentColor' : 'none'}
              />
            </g>
          ))}
        </g>
      )}
      {index % 4 === 2 && (
        <g>
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x={10 + (i % 6) * 50}
              y={10 + Math.floor(i / 6) * 54}
              width="42"
              height="46"
              rx="8"
              fill={i === 3 || i === 8 ? 'currentColor' : 'none'}
            />
          ))}
        </g>
      )}
      {index % 4 === 3 && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={'translate(' + (20 + i * 30) + ' ' + (40 - i * 12) + ')'}>
              <path d="M0 14 H24 L34 4 H70 V76 H0Z" fill={i === 2 ? 'currentColor' : 'none'} />
            </g>
          ))}
          <path d="M190 58 H290 M262 34 L292 58 L262 82" strokeWidth="4" />
        </g>
      )}
    </svg>
  );
}

function ThemeIcon({ dark }: { dark: boolean }) {
  const id = React.useId().replace(/:/g, '') + '-moon';
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <mask id={id}>
        <rect width="24" height="24" fill="#fff" />
        <circle
          className="ftp-sun-moon"
          cx={dark ? 16 : 30}
          cy={dark ? 7 : -6}
          r="6.5"
          fill="#000"
        />
      </mask>
      <circle
        className="ftp-sun-core"
        cx="12"
        cy="12"
        r={dark ? 8 : 4.5}
        fill="currentColor"
        mask={'url(#' + id + ')'}
      />
      <g className="ftp-sun-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 1.5v2.2M12 20.3v2.2M1.5 12h2.2M20.3 12h2.2M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------- component */

const DECK_SLOTS = [
  { l: 0, w: 38, t: 8, tab: 0.16 },
  { l: 28, w: 34, t: 0, tab: 0.7 },
  { l: 57, w: 43, t: 14, tab: 0.12 },
  { l: 2, w: 41, t: 70, tab: 0.06 },
  { l: 24, w: 39, t: 92, tab: 0.5 },
  { l: 60, w: 40, t: 100, tab: 0.3 },
];

export default function FolderTabPortfolioTemplate({
  name = 'Kashmitha',
  localName = '',
  handle = '@Kashmitha',
  signature,
  years = '2025–2026',
  role = 'DevOps Engineer',
  disciplines = ['DevOps & Cloud', 'Full-stack .NET', 'Unity & Games'],
  word = 'Portfolio',
  tag = '#2026',
  subtitle = ['Engineer.', 'Build. Play.'],
  notes = ['CODE', 'DEPLOY', 'RESPAWN'],
  blurb = 'Building reliable infrastructure, thoughtful applications, and interactive worlds.',
  about = [],
  aboutAside,
  greeting = 'Hi, I am',
  photo,
  highlights = [],
  timeline = [],
  categories = [],
  projects = [],
  chapters = [],
  steps = [],
  words = [],
  email = '',
  contacts = [],
  timeZone = 'Asia/Colombo',
  colors,
  ligatures = true,
  defaultTheme = 'system',
  onThemeChange,
  height = '100svh',
  className,
  contactContent,
}: FolderTabPortfolioTemplateProps) {
  const uid = React.useId().replace(/:/g, '');
  const rootRef = React.useRef(null as HTMLDivElement | null);
  const sheetRefs = React.useRef({} as Partial<Record<FolderSectionId, HTMLElement | null>>);
  const linkRefs = React.useRef({} as Partial<Record<FolderSectionId, HTMLButtonElement | null>>);
  const listRef = React.useRef(null as HTMLDivElement | null);
  const lastFocus = React.useRef(null as HTMLElement | null);
  const closeRef = React.useRef(null as HTMLButtonElement | null);
  const photoRef = React.useRef(null as HTMLDivElement | null);

  const palette = React.useMemo(
    () => ({ ...TONE_HEX, ...colors }) as Record<FolderTone, string>,
    [colors],
  );
  const sig = signature ?? name.split(/\s+/)[0] ?? name;
  const firstName = name.split(/\s+/)[0] || name;

  const [theme, setTheme] = React.useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('portfolio-theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {}
    return defaultTheme === 'light' ? 'light' : 'dark';
  });
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {}
  }, [theme]);
  const [current, setCurrent] = React.useState<FolderSectionId>('cover');
  const [chapter, setChapter] = React.useState(0);
  const [filter, setFilter] = React.useState('all');
  const [step, setStep] = React.useState(0);
  const [tlOn, setTlOn] = React.useState(Math.max(0, timeline.length - 1));
  const [openProject, setOpenProject] = React.useState(null as number | null);
  const [toast, setToast] = React.useState(null as { id: number; text: string } | null);
  const [ind, setInd] = React.useState({ x: 0, w: 0 });
  const [clock, setClock] = React.useState(null as { time: string; day: boolean } | null);

  const catById = React.useMemo(() => {
    const m: Record<string, FolderCategory> = {};
    for (const c of categories) m[c.id] = c;
    return m;
  }, [categories]);
  const toneOf = (catId: string): FolderTone => catById[catId]?.tone ?? 'blue';
  const kindOf = (catId: string): CoverKind => catById[catId]?.kind ?? 'poster';
  const countOf = (catId: string) => projects.filter((p) => p.category === catId).length;

  const sections = React.useMemo(
    () =>
      SECTIONS.filter((s) => {
        if (s.id === 'contents') return chapters.length > 0;
        if (s.id === 'work') return projects.length > 0;
        if (s.id === 'process') return steps.length > 0;
        if (s.id === 'words') return words.length > 0;
        return true;
      }),
    [chapters.length, projects.length, steps.length, words.length],
  );
  const pageNo = (id: FolderSectionId) => sections.findIndex((s) => s.id === id) + 1;

  const shown = React.useMemo(
    () =>
      projects
        .map((p, i) => ({ p, i }))
        .filter(({ p }) => filter === 'all' || p.category === filter),
    [projects, filter],
  );

  // "system" follows the host: its .dark class first (shadcn), then the OS.
  React.useEffect(() => {
    if (defaultTheme !== 'system' || localStorage.getItem('portfolio-theme')) return;
    const dark =
      document.documentElement.classList.contains('dark') ||
      (typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(dark ? 'dark' : 'light');
  }, [defaultTheme]);

  const toggleTheme = React.useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      onThemeChange?.(next);
      return next;
    });
  }, [onThemeChange]);

  const say = React.useCallback((text: string) => setToast({ id: Date.now(), text }), []);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const copyEmail = React.useCallback(() => {
    const done = () => say('Copied ' + email);
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        if (document.execCommand('copy')) done();
        else say('Could not copy. Please select the email address.');
      } catch {
        say(email);
      }
      ta.remove();
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(email).then(done, fallback);
    else fallback();
  }, [email, say]);

  const goTo = React.useCallback((id: FolderSectionId) => {
    const el = sheetRefs.current[id];
    if (!el) return;
    const reduce =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, []);

  const openCategory = (catId: string) => {
    setFilter(catId);
    goTo('work');
  };

  // Which sheet is under the middle of the viewport drives the nav and counter.
  React.useEffect(() => {
    if (typeof IntersectionObserver !== 'function') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            setCurrent((e.target as HTMLElement).dataset.sheet as FolderSectionId);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const s of sections) {
      const el = sheetRefs.current[s.id];
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [sections]);

  // Lower sheets rise in once as they arrive. Without an observer they are simply shown.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.ftp-rv'));
    if (typeof IntersectionObserver !== 'function') {
      els.forEach((el) => (el.dataset.in = 'true'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = 'true';
            io.unobserve(e.target);
          }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  // The nav's blue pill slides to the current link, which scrolls into view on narrow screens.
  useIsoLayoutEffect(() => {
    const list = listRef.current;
    const update = () => {
      const el = linkRefs.current[current];
      if (!el) return;
      setInd({ x: el.offsetLeft, w: el.offsetWidth });
      if (list && list.scrollWidth > list.clientWidth)
        list.scrollTo({
          left: el.offsetLeft - list.clientWidth / 2 + el.offsetWidth / 2,
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
    };
    update();
    if (list && typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(update);
      observer.observe(list);
      return () => observer.disconnect();
    }
  }, [current, sections]);

  React.useEffect(() => {
    const tick = () => {
      try {
        const now = new Date();
        const time = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone,
        }).format(now);
        const h = Number(
          new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone }).format(
            now,
          ),
        );
        setClock({ time, day: h >= 7 && h < 19 });
      } catch {
        setClock(null);
      }
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, [timeZone]);

  // Details sheet: Esc closes, arrows page through what the filter shows.
  const openAt = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setOpenProject(i);
  };
  const closeProject = React.useCallback(() => {
    setOpenProject(null);
    requestAnimationFrame(() => lastFocus.current?.focus?.());
  }, []);
  const stepProject = React.useCallback(
    (dir: number) => {
      setOpenProject((cur) => {
        if (cur == null || !shown.length) return cur;
        const at = shown.findIndex((s) => s.i === cur);
        return shown[(at + dir + shown.length) % shown.length].i;
      });
    },
    [shown],
  );
  React.useEffect(() => {
    if (openProject == null) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const controls = rootRef.current
          ?.querySelector('[role="dialog"]')
          ?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
        if (controls?.length) {
          const first = controls[0],
            last = controls[controls.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      if (e.key === 'Escape') closeProject();
      else if (e.key === 'ArrowRight') stepProject(1);
      else if (e.key === 'ArrowLeft') stepProject(-1);
    };
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openProject, closeProject, stepProject]);

  const onPhotoMove = (e: React.PointerEvent) => {
    const el = photoRef.current;
    if (!el || e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', (px * 10).toFixed(2) + 'deg');
    el.style.setProperty('--rx', (-py * 10).toFixed(2) + 'deg');
  };
  const onPhotoLeave = () => {
    photoRef.current?.style.setProperty('--ry', '0deg');
    photoRef.current?.style.setProperty('--rx', '0deg');
  };

  const rootStyle = {
    minHeight: height,
    '--ftp-blue': palette.blue,
    '--ftp-green': palette.green,
    '--ftp-orange': palette.orange,
    '--ftp-yellow': palette.yellow,
  } as Vars;

  const sheetProps = (id: FolderSectionId) => ({
    id: uid + '-' + id,
    'data-sheet': id,
    ref: (el: HTMLElement | null) => {
      sheetRefs.current[id] = el;
    },
    'aria-labelledby': uid + '-' + id + '-h',
  });

  const meta = (id: FolderSectionId, bar?: boolean) => (
    <div className={'ftp-meta' + (bar ? ' ftp-meta-bar' : '')} aria-hidden="true">
      <span>{years}</span>
      {disciplines.slice(0, 3).map((d) => (
        <span key={d}>{d}</span>
      ))}
      <span data-on="true">{SECTIONS.find((s) => s.id === id)?.page}</span>
      <span>{pad2(pageNo(id)) + ' / ' + pad2(sections.length)}</span>
    </div>
  );

  const head = (
    id: FolderSectionId,
    tagText: string,
    wordText: string,
    opts: { local?: string; kicker?: string; withSig?: boolean } = {},
  ) => (
    <div className="ftp-head">
      <span className="ftp-plus" style={{ left: -18, top: -6 }} />
      <span className="ftp-plus" style={{ right: -18, top: -6 }} />
      <StrokeText
        text={tagText}
        className="ftp-head-tag"
        weight={9}
        outline={1.6}
        color="var(--ftp-faint)"
        decorative
      />
      <div className="ftp-head-row">
        <h2 id={uid + '-' + id + '-h'} style={{ minWidth: 0, flex: '1 1 auto' }}>
          <StrokeText
            text={wordText}
            className="ftp-head-word"
            weight={10}
            outline={2.2}
            color="var(--game-heading)"
            ligatures={ligatures}
          />
        </h2>
        {opts.local && (
          <span className="ftp-head-local" lang="en">
            {opts.local}
          </span>
        )}
      </div>
      {opts.withSig && <Signature text={sig} className="ftp-head-sig" delay={500} />}
      {opts.kicker && (
        <p className="ftp-kicker" style={{ marginTop: 14 }}>
          {opts.kicker}
        </p>
      )}
    </div>
  );

  const deck = categories.slice(0, DECK_SLOTS.length);
  const deckOrder = deck
    .map((c, i) => ({ c, i, slot: DECK_SLOTS[i] }))
    .sort((a, b) => a.slot.t - b.slot.t);
  const project = openProject != null ? projects[openProject] : null;
  const filterItems: TabItem[] = [
    { id: 'all', label: 'All', tone: 'blue', count: projects.length },
    ...categories
      .filter((c) => countOf(c.id) > 0)
      .map((c) => ({ id: c.id, label: c.label, tone: c.tone, count: countOf(c.id) })),
  ];
  const filterTone = filter === 'all' ? 'blue' : toneOf(filter);
  const quick = categories.slice(0, 3);
  const stepTone = (i: number): FolderTone => TONES[i % TONES.length];

  return (
    <div
      ref={rootRef}
      className={'ftp-root' + (className ? ' ' + className : '')}
      data-theme={theme}
      style={rootStyle}
    >
      <a className="skip-link" href={'#' + uid + '-cover'}>
        Skip to portfolio
      </a>

      {/* masthead */}
      <header className="ftp-mast" inert={openProject != null}>
        <div className="ftp-mast-strip" />
        <div className="ftp-mast-row">
          <div className="ftp-mast-tab">
            <StrokeText
              text={name}
              weight={17}
              tracking={20}
              color="#ffffff"
              ligatures={ligatures}
              label={word + ', ' + name}
            />
            <span className="ftp-reg" aria-hidden="true">
              [ DEV ]
            </span>
          </div>
          <div className="ftp-mast-notes">
            {notes.map((n, i) => (
              <React.Fragment key={n + i}>
                {i > 0 && <i aria-hidden="true" />}
                <span>{n}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* sticky nav */}
      <div className="ftp-navwrap" inert={openProject != null}>
        <nav className="ftp-nav" aria-label="Portfolio pages">
          <span className="ftp-count" aria-hidden="true">
            {pad2(pageNo(current))}
            <small>/{pad2(sections.length)}</small>
          </span>
          <div className="ftp-links" ref={listRef}>
            <span
              className="ftp-ind"
              style={{
                transform: 'translateX(' + ind.x + 'px)',
                width: ind.w,
                opacity: ind.w ? 1 : 0,
              }}
            />
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                ref={(el) => {
                  linkRefs.current[s.id] = el;
                }}
                className="ftp-link"
                aria-current={current === s.id ? 'true' : undefined}
                onClick={() => goTo(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="ftp-icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <ThemeIcon dark={theme === 'dark'} />
          </button>
        </nav>
      </div>

      <main className="ftp-wrap ftp-sheets" inert={openProject != null}>
        {/* cover */}
        <section className="ftp-sheet ftp-cover" {...sheetProps('cover')}>
          {meta('cover', true)}
          <div className="ftp-cover-top">
            <div className="game-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="ftp-plus" style={{ left: -14, top: 8 }} />
            <span className="ftp-plus" style={{ right: -14, top: 8 }} />
            <StrokeText
              text={tag}
              className="ftp-cover-tag"
              weight={8}
              outline={1.4}
              color="var(--ftp-muted)"
              decorative
            />
            <h1 id={uid + '-cover-h'} style={{ position: 'relative' }}>
              <StrokeText
                text={word}
                className="ftp-cover-word"
                radiant
                weight={9}
                outline={1.9}
                tracking={22}
                color="var(--game-accent)"
                ligatures={ligatures}
                delay={150}
                label={word + ' — ' + name}
              />
            </h1>
          </div>
          <div className="ftp-cover-mid">
            <div className="game-cover-copy">
              <div className="game-status">
                <span /> PLAYER ONE / SYSTEMS ONLINE
              </div>
              <div className="ftp-sub">
                {subtitle.map((text, i) => (
                  <span key={text}>{i % 2 ? <b>{text}</b> : text}</span>
                ))}
              </div>
              <p className="game-intro">
                Hi, I’m <strong>{name}</strong>. DevOps at heart.
                <br />
                Developer by craft. Gamer by nature.
              </p>
              <p className="ftp-blurb">{blurb}</p>
              <div className="game-cover-actions">
                <button type="button" className="ftp-pill" onClick={() => goTo('work')}>
                  Explore the projects{' '}
                  <span className="ftp-pill-arrow">
                    <Arrow dir="ne" />
                  </span>
                </button>
                <button className="game-about-link" onClick={() => goTo('about')}>
                  Meet the builder <Arrow dir="down" />
                </button>
              </div>
              <div className="ftp-qlinks">
                {quick.map((c) => (
                  <button key={c.id} className="ftp-qlink" onClick={() => openCategory(c.id)}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="game-cover-photo">
              <Folder
                tone="blue"
                tabAt={0.1}
                tab={
                  <>
                    IDENTITY_CARD <span className="ftp-tchip">01</span>
                  </>
                }
              >
                <div className="game-portrait-frame">
                  {typeof photo === 'string' ? (
                    <img src={photo} alt={name} width={600} height={720} fetchPriority="high" />
                  ) : (
                    photo
                  )}
                  <div className="game-photo-grid" />
                  <span className="game-photo-cross cross-one">+</span>
                  <span className="game-photo-cross cross-two">+</span>
                  <div className="game-photo-hud">
                    <span>CLASS / {role}</span>
                    <strong>
                      {name}
                      <span> // LK</span>
                    </strong>
                    <small>CODE. DEPLOY. RESPAWN.</small>
                  </div>
                </div>
                <div className="game-photo-footer">
                  <span>
                    <i /> IN BUILD MODE
                  </span>
                  <span>PROFILE_01</span>
                </div>
              </Folder>
            </div>
          </div>
          {deck.length > 0 && (
            <div className="ftp-deck" style={{ '--dhm': 54 * deck.length + 140 + 'px' } as Vars}>
              {deckOrder.map(({ c, i, slot }) => (
                <Folder
                  key={c.id}
                  as="button"
                  tone={c.tone}
                  glass={slot.t > 40}
                  tabAt={slot.tab}
                  className="ftp-dfold ftp-dfold-btn"
                  style={
                    {
                      '--l': slot.l,
                      '--w': slot.w,
                      '--t': slot.t + 'px',
                      '--mt': i * 54 + 'px',
                    } as Vars
                  }
                  tab={
                    <>
                      {c.label}
                      <span className="ftp-tchip">{pad2(countOf(c.id))}</span>
                      <Arrow size={11} />
                    </>
                  }
                  onClick={() => openCategory(c.id)}
                  aria-label={'Open ' + c.label + ', ' + countOf(c.id) + ' projects'}
                >
                  <span className="ftp-dl">
                    <span className="ftp-dl-local" lang="en">
                      {c.local || c.label}
                    </span>
                    <span className="ftp-dl-n">{pad2(i + 1)}</span>
                  </span>
                  <span className="ftp-dl-en" style={{ display: 'block' }}>
                    {c.label} · {countOf(c.id)} {countOf(c.id) === 1 ? 'work' : 'works'}
                  </span>
                  <span className="game-folder-mark" aria-hidden="true">
                    {['⌘', '</>', '+'][i]}
                  </span>
                </Folder>
              ))}
            </div>
          )}
        </section>

        {/* contents */}
        {chapters.length > 0 && (
          <section className="ftp-sheet ftp-rv" {...sheetProps('contents')}>
            {meta('contents')}
            {head('contents', '(' + pad2(chapters.length) + ')', 'Directory', {
              local: 'SELECT A CHAPTER',
              kicker:
                'Table of contents for ' +
                name +
                "'s " +
                years +
                ' portfolio. Open a folder to see what is inside.',
            })}
            <div className="ftp-band-list">
              {chapters.map((ch, i) => {
                const open = chapter === i;
                const slot = [0.62, 0.08, 0.84, 0.3, 0.7, 0.18][i % 6];
                return (
                  <Folder
                    key={ch.title + i}
                    tone={ch.tone ?? TONES[i % TONES.length]}
                    tabAt={slot}
                    className="ftp-band"
                    data-open={open ? 'true' : 'false'}
                    tab={
                      <>
                        {'FILE_' + pad2(i + 1)}
                        <Arrow size={12} />
                      </>
                    }
                  >
                    <button
                      type="button"
                      className="ftp-band-head"
                      aria-expanded={open}
                      aria-controls={uid + '-ch-' + i}
                      onClick={() => setChapter(open ? -1 : i)}
                    >
                      <span className="ftp-band-n">{pad2(i + 1)}</span>
                      <span style={{ minWidth: 0 }}>
                        <span className="ftp-band-t" style={{ display: 'block' }}>
                          {ch.title}
                        </span>
                        {open && ch.local && (
                          <span className="ftp-band-local" lang="en">
                            {ch.local}
                          </span>
                        )}
                      </span>
                      {open && ch.points && ch.points.length > 0 && (
                        <ul className="ftp-band-pts">
                          {ch.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </button>
                    <div className="ftp-band-fold" id={uid + '-ch-' + i} aria-hidden={!open}>
                      <div>
                        {ch.target && sections.some((s) => s.id === ch.target) && (
                          <div className="ftp-band-go">
                            <p>{'Chapter ' + pad2(i + 1) + ' · page ' + pad2(pageNo(ch.target))}</p>
                            <button
                              type="button"
                              className="ftp-go"
                              tabIndex={open ? 0 : -1}
                              onClick={() => goTo(ch.target as FolderSectionId)}
                            >
                              Open chapter <Arrow size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Folder>
                );
              })}
            </div>
          </section>
        )}

        {/* about */}
        <section className="ftp-sheet ftp-rv" {...sheetProps('about')}>
          {meta('about')}
          {head('about', '#' + firstName, 'About me', { withSig: true })}
          <div className="ftp-about">
            <div className="game-about-sidebar">
              <div
                className="ftp-photo"
                ref={photoRef}
                onPointerMove={onPhotoMove}
                onPointerLeave={onPhotoLeave}
              >
                <Folder
                  tone="blue"
                  tabAt={0.08}
                  tab={initialsOf(name) + ' · ' + handle.replace(/^@/, '').split('.')[0]}
                  bodyClass="ftp-photo-body"
                >
                  <div className="ftp-photo-frame">
                    {typeof photo === 'string' ? (
                      <img
                        src={photo}
                        alt={name}
                        width={300}
                        height={360}
                        style={{ maxWidth: 'none' }}
                      />
                    ) : photo != null ? (
                      photo
                    ) : (
                      <PhotoScene name={name} seed={hashString(name)} />
                    )}
                  </div>
                  <div className="ftp-photo-glass" style={{ color: 'var(--ftp-blue)' }}>
                    <PalmIcon size={28} />
                    <StrokeText
                      text={years.split(/[–-]/).pop() || years}
                      weight={9}
                      color="var(--ftp-ink)"
                      decorative
                    />
                  </div>
                </Folder>
              </div>
              {aboutAside}
            </div>
            <div>
              <p className="ftp-hi">
                <span style={{ color: 'var(--ftp-blue)' }}>
                  <PalmIcon size={34} />
                </span>
                <span>
                  {greeting} <b>{localName || name}</b>!
                  {localName ? (
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: '.5em',
                        marginLeft: 12,
                        color: 'var(--ftp-muted)',
                      }}
                    >
                      {name}
                    </span>
                  ) : null}
                </span>
              </p>
              <div className="game-about-copy">
                <p className="game-about-focus">DevOps & Cloud · My primary focus</p>
                {(about.length ? about : [blurb]).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {highlights.length > 0 && (
                <div className="ftp-cols">
                  {highlights.map((h, i) => (
                    <div className="game-role-card" data-tone={h.tone} key={h.label + i}>
                      <h3
                        className="ftp-badge"
                        style={{
                          background: palette[h.tone ?? (i % 2 ? 'blue' : 'green')],
                          color: h.tone === 'yellow' ? '#5d5434' : '#fff',
                        }}
                      >
                        {h.label}
                      </h3>
                      {h.description && <p className="game-role-description">{h.description}</p>}
                      <ul>
                        {h.lines.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {timeline.length > 0 && (
                <div className="ftp-tl">
                  <span className="ftp-badge" style={{ background: palette.blue, color: '#fff' }}>
                    Work experience
                  </span>
                  <ol className="ftp-tl-track" style={{ '--n': timeline.length } as Vars}>
                    {timeline.map((t, i) => (
                      <li
                        key={t.from + i}
                        className="ftp-tl-item"
                        data-on={tlOn === i ? 'true' : 'false'}
                        onPointerEnter={() => setTlOn(i)}
                        onFocus={() => setTlOn(i)}
                        tabIndex={0}
                      >
                        <span className="ftp-tl-date" style={{ display: 'block' }}>
                          {t.from}–{t.to}
                        </span>
                        <span className="ftp-tl-dot" />
                        <span style={{ display: 'block' }}>
                          <span className="ftp-tl-title" style={{ display: 'block' }}>
                            {t.title}
                          </span>
                          {t.place && <span className="ftp-tl-place">{t.place}</span>}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {contacts.length > 0 && (
                <div className="ftp-contacts">
                  {contacts.map((c, i) => {
                    const tone = TONES[i % 3];
                    const inner = (
                      <>
                        <i style={{ background: palette[tone], color: '#fff' }}>
                          {c.label.slice(0, 1)}
                        </i>
                        {c.value}
                      </>
                    );
                    return c.href ? (
                      <a
                        key={c.label}
                        className="ftp-contact"
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={c.label + ': ' + c.value}
                      >
                        {inner}
                      </a>
                    ) : (
                      <span key={c.label} className="ftp-contact">
                        {inner}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* work */}
        {projects.length > 0 && (
          <section className="ftp-sheet ftp-rv" {...sheetProps('work')}>
            {meta('work')}
            {head('work', '(' + pad2(projects.length) + ')', 'Projects', {
              local: 'PROJECT ARCHIVE',
              kicker:
                'Real repositories. Three disciplines. Select a folder and open a project to explore the build.',
            })}
            <div className="ftp-filter">
              <TabBar
                items={filterItems}
                active={filter}
                onChange={setFilter}
                label="Filter work by category"
                idBase={uid + '-wf'}
              />
              <div className="ftp-bar" style={{ '--c': palette[filterTone] } as Vars} />
            </div>
            <div
              className="ftp-grid"
              role="tabpanel"
              id={uid + '-wf-panel'}
              aria-labelledby={uid + '-wf-tab-' + filter}
              key={filter}
            >
              {shown.map(({ p, i }, k) => {
                const tone = toneOf(p.category);
                return (
                  <Folder
                    key={p.title + i}
                    as="button"
                    tone={tone}
                    tabAt={(k * 0.37) % 1 > 0.85 ? 0.85 : (k * 0.37) % 1}
                    className="ftp-card"
                    style={{ '--i': k } as Vars}
                    tab={
                      <>
                        {catById[p.category]?.label ?? p.category}
                        <span className="ftp-tchip">{pad2(i + 1)}</span>
                      </>
                    }
                    onClick={() => openAt(i)}
                    aria-haspopup="dialog"
                    aria-label={p.title + ', ' + p.year + '. Open details'}
                  >
                    <span className="ftp-card-art" style={{ display: 'block' }}>
                      {p.visual ? (
                        <ProjectVisual kind={p.visual} />
                      ) : p.image ? (
                        <img
                          src={p.image}
                          alt=""
                          width={320}
                          height={220}
                          style={{ maxWidth: 'none' }}
                        />
                      ) : (
                        <CoverArt
                          kind={kindOf(p.category)}
                          seed={hashString(p.title)}
                          mark={markOf(p)}
                          colors={palette}
                        />
                      )}
                    </span>
                    <span className="ftp-card-cap">
                      <span>
                        <span className="ftp-card-t" style={{ display: 'block' }}>
                          {p.title}
                        </span>
                        {p.local && (
                          <span className="ftp-card-l" style={{ display: 'block' }} lang="en">
                            {p.local}
                          </span>
                        )}
                      </span>
                      <span className="ftp-card-y">{p.year}</span>
                    </span>
                  </Folder>
                );
              })}
              {!shown.length && <p className="ftp-empty">This folder is empty for now.</p>}
            </div>
          </section>
        )}

        {/* process */}
        {steps.length > 0 && (
          <section className="ftp-sheet ftp-rv" {...sheetProps('process')}>
            {meta('process')}
            {head('process', '(' + pad2(steps.length) + ')', 'Workflow', {
              local: 'FROM IDEA TO RELEASE',
            })}
            <TabBar
              items={steps.map((s, i) => ({
                id: String(i),
                label: pad2(i + 1) + ' ' + s.title,
                tone: stepTone(i),
              }))}
              active={String(Math.min(step, steps.length - 1))}
              onChange={(id) => setStep(Number(id))}
              label="Process steps"
              idBase={uid + '-ps'}
            />
            {(() => {
              const i = Math.min(step, steps.length - 1);
              const s = steps[i];
              return (
                <div
                  className="ftp-panel"
                  data-tone={stepTone(i)}
                  role="tabpanel"
                  id={uid + '-ps-panel'}
                  aria-labelledby={uid + '-ps-tab-' + i}
                >
                  <div className="ftp-step" key={i}>
                    <div>
                      <div className="ftp-step-n">{pad2(i + 1)}</div>
                      <h3 className="ftp-step-t">
                        {s.title}
                        {s.local && (
                          <span className="ftp-step-l" lang="en">
                            {s.local}
                          </span>
                        )}
                      </h3>
                      {s.duration && <span className="ftp-step-d">{s.duration}</span>}
                      <StepArt index={i} />
                    </div>
                    <div>
                      <p className="ftp-step-b">{s.body}</p>
                      {s.outputs && s.outputs.length > 0 && (
                        <ul className="ftp-step-o">
                          {s.outputs.map((o) => (
                            <li key={o}>{o}</li>
                          ))}
                        </ul>
                      )}
                      <div className="ftp-dots" aria-hidden="true">
                        {steps.map((_, j) => (
                          <span key={j} data-on={j === i ? 'true' : 'false'} />
                        ))}
                      </div>
                      <div className="ftp-btns" style={{ marginTop: 22 }}>
                        <button
                          type="button"
                          className="ftp-btn"
                          data-ghost="true"
                          onClick={() => setStep((i - 1 + steps.length) % steps.length)}
                          aria-label="Previous step"
                        >
                          <Arrow dir="left" />
                        </button>
                        <button
                          type="button"
                          className="ftp-btn"
                          onClick={() => setStep((i + 1) % steps.length)}
                        >
                          Next step <Arrow />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>
        )}

        {/* words */}
        {words.length > 0 && (
          <section className="ftp-sheet ftp-rv" {...sheetProps('words')}>
            {meta('words')}
            {head('words', '(' + pad2(words.length) + ')', 'Kind words', { local: '評價' })}
            <div className="ftp-words">
              <span
                className="ftp-blob"
                style={{
                  left: '8%',
                  top: '18%',
                  width: 220,
                  height: 220,
                  background: palette.blue,
                  opacity: 0.85,
                }}
              />
              <span
                className="ftp-blob"
                style={{
                  left: '46%',
                  top: '40%',
                  width: 180,
                  height: 180,
                  background: palette.green,
                  opacity: 0.85,
                }}
              />
              <span
                className="ftp-blob"
                style={{
                  right: '6%',
                  top: '8%',
                  width: 150,
                  height: 150,
                  background: palette.orange,
                  opacity: 0.8,
                }}
              />
              {words.map((w, i) => (
                <Folder
                  key={w.name + i}
                  as="figure"
                  tone={w.tone ?? TONES[i % 3]}
                  glass
                  tabAt={[0.1, 0.5, 0.86][i % 3]}
                  className="ftp-word"
                  style={{ '--rot': [-2, 1.5, -1][i % 3] + 'deg' } as Vars}
                  tab={w.name.split(/\s+/)[0]}
                >
                  <blockquote>{w.quote}</blockquote>
                  <figcaption>
                    <b>{w.name}</b>
                    {w.role}
                  </figcaption>
                </Folder>
              ))}
            </div>
          </section>
        )}

        {/* contact */}
        <section className="ftp-sheet ftp-rv" {...sheetProps('contact')}>
          {meta('contact')}
          {head('contact', '(:)', 'Connect', { local: 'START THE NEXT BUILD', withSig: true })}
          <div className="ftp-stack">
            <Folder
              tone="blue"
              tabAt={0.78}
              tab={
                <>
                  NEW CONNECTION <Arrow size={12} />
                </>
              }
            >
              <div className="ftp-talk">
                <StrokeText
                  text="Let's talk :)"
                  weight={15}
                  tracking={22}
                  color="#ffffff"
                  label="Let's talk"
                />
                <p>
                  A role, a collaboration, or an interesting problem. Let’s connect and see what we
                  can build together.
                </p>
              </div>
            </Folder>
            {email && (
              <Folder
                tone="green"
                tabAt={0.56}
                tab={
                  <>
                    CONTACT CHANNEL <Arrow size={12} />
                  </>
                }
              >
                <div className="ftp-mail">
                  <a className="ftp-mail-a" href={'mailto:' + email}>
                    {email}
                  </a>
                  <div className="ftp-btns">
                    <button type="button" className="ftp-btn" onClick={copyEmail}>
                      Copy
                    </button>
                    <a className="ftp-btn" data-ghost="true" href={'mailto:' + email}>
                      Write <Arrow dir="ne" />
                    </a>
                  </div>
                </div>
              </Folder>
            )}
            {contactContent}
            {contacts.length > 0 && (
              <Folder
                tone="sheet"
                tabAt={0.3}
                tab={
                  <>
                    ELSEWHERE <Arrow size={12} />
                  </>
                }
                style={{ filter: 'drop-shadow(0 -6px 14px rgba(27,34,52,.08))' }}
              >
                <div className="ftp-else">
                  {contacts.map((c) => (
                    <a
                      key={c.label}
                      href={c.href || '#'}
                      target={c.href ? '_blank' : undefined}
                      rel="noreferrer"
                    >
                      <span>
                        <small>{c.label}</small>
                        {c.value}
                      </span>
                      <Arrow dir="ne" />
                    </a>
                  ))}
                </div>
              </Folder>
            )}
          </div>
        </section>

        <footer className="ftp-foot">
          <span>
            {disciplines[0] || 'Visual design'}
            <small>
              © {years.split(/[–-]/).pop()} {name}
            </small>
          </span>
          <span className="game-footer-note">SAVE. COMMIT. KEEP BUILDING.</span>
          {clock && (
            <span className="ftp-clock">
              <i data-day={clock.day ? 'true' : 'false'} />
              {clock.time} · {timeZone.split('/').pop()?.replace(/_/g, ' ')}
            </span>
          )}
          <button type="button" className="ftp-top" onClick={() => goTo('cover')}>
            Back to cover <Arrow dir="up" size={12} />
          </button>
          <span className="ftp-foot-n" aria-hidden="true">
            {pad2(pageNo(current))}
          </span>
        </footer>
      </main>

      {/* details sheet */}
      {project && (
        <div
          className="ftp-overlay"
          onClick={(e) => e.target === e.currentTarget && closeProject()}
        >
          <Folder
            tone={toneOf(project.category)}
            tabAt={0.04}
            className="ftp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={uid + '-dlg-t'}
            tab={
              <>
                {catById[project.category]?.label ?? project.category}
                <span className="ftp-tchip">{pad2((openProject ?? 0) + 1)}</span>
              </>
            }
          >
            <button
              type="button"
              ref={closeRef}
              className="ftp-close"
              onClick={closeProject}
              aria-label="Close details"
            >
              Close ✕
            </button>
            <div className="ftp-modal-grid" key={openProject}>
              <div className="ftp-modal-art">
                {project.visual ? (
                  <ProjectVisual kind={project.visual} />
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    width={320}
                    height={220}
                    style={{ maxWidth: 'none' }}
                  />
                ) : (
                  <CoverArt
                    kind={kindOf(project.category)}
                    seed={hashString(project.title)}
                    mark={markOf(project)}
                    colors={palette}
                  />
                )}
              </div>
              <div
                className="ftp-modal-info"
                style={{ animation: 'ftp-in .5s cubic-bezier(.2,.8,.2,1) both' }}
              >
                <div>
                  <h3 className="ftp-modal-t" id={uid + '-dlg-t'}>
                    {project.title}
                  </h3>
                  {project.local && (
                    <p className="ftp-modal-l" lang="en">
                      {project.local}
                    </p>
                  )}
                </div>
                <p className="ftp-modal-p">{project.summary}</p>
                {project.body?.map((b, i) => (
                  <p key={i} className="ftp-modal-p">
                    {b}
                  </p>
                ))}
                <dl className="ftp-dl2">
                  <dt>Collection</dt>
                  <dd>{project.year}</dd>
                  {project.client && (
                    <>
                      <dt>Client</dt>
                      <dd>{project.client}</dd>
                    </>
                  )}
                  {project.role && (
                    <>
                      <dt>Role</dt>
                      <dd>{project.role}</dd>
                    </>
                  )}
                  {project.tools && project.tools.length > 0 && (
                    <>
                      <dt>Tools</dt>
                      <dd>{project.tools.join(' · ')}</dd>
                    </>
                  )}
                </dl>
                <div className="ftp-modal-nav">
                  <div className="ftp-btns">
                    <button
                      type="button"
                      className="ftp-btn"
                      data-ghost="true"
                      onClick={() => stepProject(-1)}
                      aria-label="Previous project"
                    >
                      <Arrow dir="left" />
                    </button>
                    <button
                      type="button"
                      className="ftp-btn"
                      data-ghost="true"
                      onClick={() => stepProject(1)}
                      aria-label="Next project"
                    >
                      <Arrow />
                    </button>
                  </div>
                  {project.href && (
                    <a className="ftp-btn" href={project.href} target="_blank" rel="noreferrer">
                      Source code <Arrow dir="ne" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Folder>
        </div>
      )}

      {toast && (
        <div className="ftp-toast" role="status" key={toast.id}>
          {toast.text}
        </div>
      )}
    </div>
  );
}

/*
 * Source: https://github.com/Kedhareswer/21stdev-my-components/blob/f8a5636d294cdf059f1d44b6acab1f70aaa2c915/components/folder-tab-portfolio-template/folder-tab-portfolio-template.tsx
 * Author: Kedhareswer Naidu (@kedhareswer).
 * Usage permission from the upstream README:
 * Free to view, copy, and adapt unless a folder says otherwise. Attribution appreciated.
 * Terms: https://github.com/Kedhareswer/21stdev-my-components/blob/f8a5636d294cdf059f1d44b6acab1f70aaa2c915/README.md
 */
