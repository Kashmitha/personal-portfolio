import {
  Activity,
  Box,
  Check,
  Cloud,
  Code2,
  Database,
  GitBranch,
  HeartPulse,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react';
import type { Project } from '../data/portfolio';
export default function ProjectVisual({ kind }: { kind: Project['visual'] }) {
  return (
    <div className={`project-visual visual-${kind}`} aria-label="Illustrative project preview">
      {kind === 'pipeline' && (
        <>
          <div className="preview-top">
            <span>deployment.yml</span>
            <span className="tiny-status">● workflow illustration</span>
          </div>
          <div className="pipeline">
            {[GitBranch, Box, Cloud, ShieldCheck].map((Icon, i) => (
              <div className="pipeline-step" key={i}>
                <div>
                  <Icon size={24} />
                  <span className="mini-check">
                    <Check size={9} />
                  </span>
                </div>
                <span>{['Commit', 'Build', 'Deploy', 'Monitor'][i]}</span>
              </div>
            ))}
          </div>
          <div className="code-line">
            <span>➜</span> infrastructure that scales with you<span className="cursor">_</span>
          </div>
        </>
      )}
      {kind === 'observability' && (
        <>
          <div className="preview-top">
            <span>
              <Activity size={12} /> GemOps / overview
            </span>
            <span className="tiny-status">dashboard concept</span>
          </div>
          <div className="metric-row">
            <div>
              <span>OBSERVABILITY</span>
              <b>Every signal.</b>
            </div>
            <div className="sparkline">▁▂▁▃▂▄▃▆▄▅▃▇▅▆▅█</div>
          </div>
          <div className="chart-grid">
            {Array.from({ length: 22 }, (_, i) => (
              <i
                key={i}
                style={{
                  height: `${[30, 42, 35, 50, 44, 64, 52, 75, 65, 56, 80, 62, 74, 86, 71, 65, 83, 76, 95, 82, 90, 78][i]}%`,
                }}
              />
            ))}
          </div>
          <div className="chart-legend">
            <span>● Metrics</span>
            <span>● Logs</span>
            <span>● Traces</span>
          </div>
        </>
      )}
      {kind === 'taskflow' && (
        <div className="mini-app">
          <aside>
            <LayoutDashboard size={17} />
            <i />
            <i />
            <i />
            <i />
          </aside>
          <div className="mini-main">
            <div className="mini-title">
              My workspace <span>+ New task</span>
            </div>
            <div className="kanban">
              {['To do', 'In progress', 'Done'].map((title, i) => (
                <div key={title}>
                  <span>
                    {title} <b>02</b>
                  </span>
                  <article>
                    <i className={`mini-label label-${i}`} />
                    <strong>
                      {['Design the API', 'Build something great', 'Set up the workspace'][i]}
                    </strong>
                    <p />
                    <small>◉ &nbsp; Oct 20</small>
                  </article>
                  <article>
                    <i className={`mini-label label-${i}`} />
                    <strong>
                      {['Connect the pieces', 'Review & refine', 'Ship with confidence'][i]}
                    </strong>
                    <p />
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {kind === 'care' && (
        <div className="health-preview">
          <HeartPulse size={36} />
          <div>
            <small>CARE POINT</small>
            <h4>Care, connected.</h4>
            <p>A better space for healthcare.</p>
          </div>
          <div className="health-icons">
            <Database />
            <Code2 />
            <ShieldCheck />
          </div>
        </div>
      )}
      {(kind === 'space' || kind === 'platform') && (
        <>
          <div className="stars" />
          <span className="game-caption">
            {kind === 'space' ? 'METEOR BLAST' : 'THE NEXT ADVENTURE'}
            <small>UNITY / C#</small>
          </span>
          {kind === 'space' ? (
            <>
              <div className="planet" />
              <div className="meteor meteor-one" />
              <div className="meteor meteor-two" />
              <div className="spaceship">
                ▲<span />
              </div>
            </>
          ) : (
            <>
              <div className="pixel-moon" />
              <div className="mountain mountain-back" />
              <div className="mountain" />
              <div className="pixel-ground" />
              <div className="pixel-player" />
            </>
          )}
          <span className="concept-label">CONCEPT ART · NOT GAMEPLAY</span>
        </>
      )}
    </div>
  );
}
