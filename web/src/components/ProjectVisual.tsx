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
            <span>AKS / deployment.yml</span>
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
            <span>➜</span> Kubernetes / delivery & monitoring
            <span className="cursor">_</span>
          </div>
        </>
      )}
      {kind === 'terraform' && (
        <>
          <div className="preview-top">
            <span>AZURE / infrastructure map</span>
            <span className="tiny-status">architecture concept</span>
          </div>
          <div className="terraform-map">
            <div className="tf-resource-group">
              <span>RESOURCE GROUP</span>
              <div className="tf-vnet">
                <small>VIRTUAL NETWORK / SUBNET</small>
                <div className="tf-compute">
                  <Cloud size={26} />
                  <span>
                    Linux VM<small>NIC + PUBLIC IP</small>
                  </span>
                </div>
                <span className="tf-boundary">
                  <ShieldCheck size={12} /> NETWORK SECURITY GROUP
                </span>
              </div>
            </div>
            <div className="tf-state">
              <Database size={20} />
              <span>
                REMOTE STATE<small>Azure Blob Storage</small>
              </span>
            </div>
          </div>
        </>
      )}
      {kind === 'ansible' && (
        <>
          <div className="preview-top">
            <span>ANSIBLE / configure_all.yml</span>
            <span className="tiny-status">playbook concept</span>
          </div>
          <div className="ansible-terminal">
            <div className="terminal-dots">
              <i />
              <i />
              <i />
              <span>azure_linux_hosts</span>
            </div>
            <p>
              <b>PLAY</b> configure & harden
            </p>
            {[
              'common / packages & users',
              'security / UFW & fail2ban',
              'docker / container runtime',
              'nginx / reverse proxy',
            ].map((role) => (
              <div className="ansible-role" key={role}>
                <Check size={12} />
                <span>{role}</span>
              </div>
            ))}
            <div className="ansible-recap">INVENTORY → ROLES → HANDLERS</div>
          </div>
        </>
      )}
      {kind === 'containers' && (
        <>
          <div className="preview-top">
            <span>DOCKER COMPOSE / services</span>
            <span className="tiny-status">service concept</span>
          </div>
          <div className="compose-network">
            <div className="compose-service">
              <LayoutDashboard size={25} />
              <b>Nginx</b>
              <small>STATIC FRONTEND</small>
            </div>
            <span className="compose-link">HTTP →</span>
            <div className="compose-service">
              <Code2 size={25} />
              <b>Flask</b>
              <small>REST API</small>
            </div>
          </div>
          <div className="jenkins-lane">
            <GitBranch size={16} />
            <span>
              JENKINS PIPELINE<small>Webhook / Build / Health test / Deploy</small>
            </span>
            <Box size={22} />
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
      {kind === 'research' && (
        <>
          <span className="game-caption">
            FINAL-YEAR BUILD<small>UNITY 2D / MOVEMENT STUDY</small>
          </span>
          <div className="research-level" aria-hidden="true">
            <div className="research-sun" />
            <div className="research-pillars">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="research-ledge ledge-one" />
            <div className="research-ledge ledge-two" />
            <div className="research-ledge ledge-three" />
            <div className="research-jump-path" />
            <div className="research-player" />
          </div>
          <div className="research-controls">
            <span>← → MOVE</span>
            <span>SPACE / JUMP</span>
          </div>
          <span className="concept-label">LEVEL CONCEPT · NOT GAMEPLAY</span>
        </>
      )}
    </div>
  );
}
