import ContactForm from './components/ContactForm';
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
    tone: 'blue',
    local: 'A builder with three disciplines.',
    points: ['DevOps first', '.NET & C#', 'Unity'],
    target: 'about',
  },
  {
    title: 'The project archive',
    tone: 'green',
    local: 'Real code. Real repositories.',
    points: ['Cloud platforms', 'Applications', 'Games'],
    target: 'work',
  },
  {
    title: 'The build sequence',
    tone: 'orange',
    local: 'From the first idea to the next release.',
    points: ['Understand', 'Build', 'Automate'],
    target: 'process',
  },
  {
    title: 'The next chapter',
    tone: 'yellow',
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
      about={[
        'I’m Kashmitha Madushan, a DevOps and Cloud engineer from Sri Lanka. I build infrastructure that deploys itself, scales cleanly, and tells you when something’s wrong.',
        <>
          I work across AWS and Azure with Terraform, Ansible, Docker, and Kubernetes, and I
          automate delivery with GitHub Actions and Jenkins. My main project,{' '}
          <strong>GemOps</strong>, brings it together on AWS EKS with Helm, monitoring, logging,
          alerting, and secrets management in one platform.
        </>,
        'I also build full-stack apps in C# and React, so I understand what software needs from the infrastructure underneath it. I like breaking big problems into clear steps and turning them into repeatable automation.',
        'I also enjoy building 2D games with Unity and C#, exploring player movement, animation, and interactive experiences.',
      ]}
      photo={
        <img
          src={profile.portrait}
          alt="Professional portrait of Kashmitha Madushan in a navy suit"
          width={1254}
          height={1254}
          fetchPriority="high"
        />
      }
      aboutAside={
        <section className="game-build-note" aria-labelledby="build-note-title">
          <span className="game-build-note-label">FIELD NOTES / 01</span>
          <h3 id="build-note-title">How I build.</h3>
          <p>From infrastructure to insight.</p>
          <ol>
            <li>
              <strong>Define it.</strong>
              <span>Infrastructure as code with Terraform and Ansible.</span>
            </li>
            <li>
              <strong>Deliver it.</strong>
              <span>Containers and repeatable CI/CD pipelines.</span>
            </li>
            <li>
              <strong>Understand it.</strong>
              <span>Metrics, logs, and alerts that make systems observable.</span>
            </li>
          </ol>
          <a href={`${profile.github}/gemops-project`} target="_blank" rel="noreferrer">
            Explore GemOps <span aria-hidden="true">↗</span>
          </a>
        </section>
      }
      highlights={[
        {
          label: '01 / DevOps & Cloud Engineer',
          tone: 'blue',
          description:
            'My primary discipline: infrastructure, automated delivery, and visibility into running systems.',
          lines: [
            'AWS & Azure',
            'Docker & Kubernetes',
            'Terraform & GitHub Actions',
            'Observability & automation',
          ],
        },
        {
          label: '02 / Full-stack .NET Developer',
          tone: 'green',
          description:
            'Connecting useful interfaces with structured APIs and data-driven applications.',
          lines: [
            'C# & ASP.NET Core',
            'React interfaces',
            'REST APIs & SQL Server',
            'Containerized applications',
          ],
        },
        {
          label: '03 / Unity Game Developer',
          tone: 'orange',
          description:
            'Exploring interactive experiences through C# scripting and 2D game development.',
          lines: ['Unity engine', 'C# scripting', '2D game projects', 'Interactive experiences'],
        },
      ]}
      timeline={[]}
      categories={categories}
      projects={projects.map((project) => ({
        title: project.subtitle,
        local: project.featured,
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
        { label: 'LinkedIn', value: 'Connect on LinkedIn', href: profile.linkedin },
        { label: 'GitHub', value: '@Kashmitha', href: profile.github },
        {
          label: 'Repositories',
          value: 'Explore the source',
          href: `${profile.github}?tab=repositories`,
        },
      ]}
      contactContent={<ContactForm />}
      timeZone="Asia/Colombo"
      colors={{ blue: '#6550c9', green: '#236f66', orange: '#ac513c', yellow: '#d5b65f' }}
      defaultTheme="dark"
      className="gaming-portfolio"
    />
  );
}
