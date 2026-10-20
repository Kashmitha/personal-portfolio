import { useState } from 'react';
import { Check, Copy, Github } from 'lucide-react';
import FolderPortfolio from './components/FolderPortfolio';
import type { FolderCategory, FolderChapter, FolderStep } from './components/FolderPortfolio';
import { profile, projects } from './data/portfolio';

const categories: FolderCategory[] = [
  { id: 'devops', label: 'DevOps & Cloud', local: 'Deploy. Scale.', tone: 'blue', kind: 'render' },
  {
    id: 'fullstack',
    label: 'Full-stack .NET',
    local: 'Build. Connect.',
    tone: 'green',
    kind: 'page',
  },
  { id: 'games', label: 'Unity & Games', local: 'Create. Play.', tone: 'orange', kind: 'poster' },
];
const chapters: FolderChapter[] = [
  {
    title: 'The player profile',
    local: 'A builder with three disciplines.',
    points: ['DevOps first', '.NET & C#', 'Unity'],
    target: 'about',
  },
  {
    title: 'The project archive',
    local: 'Real code. Real repositories.',
    points: ['Cloud platforms', 'Applications', 'Games'],
    target: 'work',
  },
  {
    title: 'The build sequence',
    local: 'From the first idea to the next release.',
    points: ['Understand', 'Build', 'Automate'],
    target: 'process',
  },
  {
    title: 'The next chapter',
    local: 'Great work starts with a conversation.',
    points: ['Collaborate', 'Connect', 'Build together'],
    target: 'contact',
  },
];
const steps: FolderStep[] = [
  {
    title: 'Understand',
    local: '01 / DISCOVER',
    body: 'Start with the problem and the people behind it. Map the constraints, understand the workflows, and decide what a useful solution looks like before choosing the tools.',
    outputs: ['Requirements', 'Architecture sketch', 'Clear scope'],
    duration: 'Plan before provision',
  },
  {
    title: 'Build',
    local: '02 / DEVELOP',
    body: 'Connect small, understandable pieces. Build the interface, application, or infrastructure with clear boundaries, version control, and repeatable local setup.',
    outputs: ['Working software', 'Version-controlled code', 'Local environments'],
    duration: 'One useful increment at a time',
  },
  {
    title: 'Automate',
    local: '03 / SHIP',
    body: 'Make the path from commit to deployment repeatable. Containerize the application, express infrastructure as code, and use CI/CD to validate and deliver changes.',
    outputs: ['Containers', 'CI/CD workflows', 'Infrastructure as code'],
    duration: 'Less repetition. More reliability.',
  },
  {
    title: 'Observe',
    local: '04 / ITERATE',
    body: 'A deployment is the start of the feedback loop. Use health checks, metrics, and logs to understand the system, then improve the next release with what you learn.',
    outputs: ['Health checks', 'Metrics & logs', 'Continuous improvement'],
    duration: 'Keep learning. Keep shipping.',
  },
];

function ContactDraft() {
  const [draft, setDraft] = useState(() => {
    try {
      return localStorage.getItem('portfolio-draft') || '';
    } catch {
      return '';
    }
  });
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setError('');
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setError('Copy is unavailable. Select your message and copy it manually.');
    }
  };
  return (
    <div className="game-contact-draft">
      <div className="game-draft-top">
        <span>COMPOSE_MESSAGE.txt</span>
        <span>LOCAL DRAFT</span>
      </div>
      <div className="game-draft-body">
        <label htmlFor="message">Start the conversation.</label>
        <p>Prepare a message to share through your preferred channel.</p>
        <textarea
          id="message"
          placeholder="Hi Kashmitha, I’d like to talk about…"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            try {
              localStorage.setItem('portfolio-draft', event.target.value);
            } catch {}
          }}
        />
        <div className="game-draft-actions">
          <button onClick={copy} disabled={!draft.trim()}>
            {copied ? <Check size={16} /> : <Copy size={16} />}{' '}
            {copied ? 'Message copied' : 'Copy message'}
          </button>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={16} /> Connect on GitHub ↗
          </a>
        </div>
        <small role="status">
          {error || 'Saved on this device. No message is sent from this website.'}
        </small>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FolderPortfolio
      name={profile.name}
      localName=""
      handle="@Kashmitha"
      signature="Kashmitha"
      years="2026"
      role="DevOps Engineer"
      disciplines={['DevOps & Cloud', 'Full-stack .NET', 'Unity Game Development']}
      word="Portfolio"
      tag="#ENGINEER / PLAYER_01"
      subtitle={['Engineer.', 'Build. Play.']}
      notes={['CODE', 'DEPLOY', 'RESPAWN']}
      blurb="Building reliable infrastructure, thoughtful .NET applications, and interactive worlds. Based in Sri Lanka. Driven by curiosity."
      photo={
        <img
          src={profile.portrait}
          alt="Professional portrait of Kashmitha Madushan in a navy suit"
          width={1254}
          height={1254}
          fetchPriority="high"
        />
      }
      highlights={[
        {
          label: '01 / DevOps',
          tone: 'blue',
          lines: [
            'AWS & Azure',
            'Docker & Kubernetes',
            'Terraform & GitHub Actions',
            'Observability & automation',
          ],
        },
        {
          label: '02 / Full stack',
          tone: 'green',
          lines: [
            'C# & ASP.NET Core',
            'React interfaces',
            'REST APIs & SQL Server',
            'Containerized applications',
          ],
        },
        {
          label: '03 / Game dev',
          tone: 'orange',
          lines: ['Unity engine', 'C# scripting', '2D game projects', 'Interactive experiences'],
        },
      ]}
      timeline={[]}
      categories={categories}
      projects={projects.map((project) => ({
        title: project.subtitle,
        category: project.category,
        year: 'GITHUB',
        summary: project.description,
        tools: project.tags,
        role:
          project.category === 'devops'
            ? 'DevOps & Cloud'
            : project.category === 'fullstack'
              ? 'Full-stack development'
              : 'Game development',
        body: project.details,
        href: `${profile.github}/${project.repo}`,
        visual: project.visual,
      }))}
      chapters={chapters}
      steps={steps}
      words={[]}
      email={profile.email}
      contacts={[
        { label: 'GitHub', value: '@Kashmitha', href: profile.github },
        {
          label: 'Repositories',
          value: 'Explore the source',
          href: `${profile.github}?tab=repositories`,
        },
      ]}
      contactContent={<ContactDraft />}
      timeZone="Asia/Colombo"
      colors={{ blue: '#6550c9', green: '#236f66', orange: '#ac513c', yellow: '#d5b65f' }}
      defaultTheme="dark"
      className="gaming-portfolio"
    />
  );
}
