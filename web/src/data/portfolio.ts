export type Category = 'all' | 'devops' | 'fullstack' | 'games';
export type Project = {
  id: string;
  title: string;
  category: Exclude<Category, 'all'>;
  subtitle: string;
  description: string;
  tags: string[];
  repo: string;
  details: string[];
  visual: 'pipeline' | 'observability' | 'taskflow' | 'care' | 'space' | 'platform';
};
export const profile = {
  name: 'Kashmitha Madushan',
  github: 'https://github.com/Kashmitha',
  location: 'Sri Lanka',
  portrait: '/portrait.png',
  // Set these when your contact details and CV are ready. No placeholder contact links are published.
  email: '',
  resume: '',
  linkedin: '',
};
export const projects: Project[] = [
  {
    id: 'aks',
    title: 'Cloud-native. Production-ready.',
    category: 'devops',
    subtitle: 'Azure AKS platform',
    description:
      'An end-to-end Kubernetes deployment with infrastructure as code, rolling updates, and a complete monitoring stack.',
    tags: ['Azure AKS', 'Terraform', 'Kubernetes', 'GitHub Actions'],
    repo: 'devops-project-4',
    visual: 'pipeline',
    details: [
      'Infrastructure provisioned with Terraform on Azure AKS.',
      'Automated container delivery through GitHub Actions and Azure Container Registry.',
      'Horizontal autoscaling, health probes, and zero-downtime rolling update configuration.',
      'Prometheus and Grafana monitoring, deployed with Helm.',
    ],
  },
  {
    id: 'gemops',
    title: 'Visibility into every layer.',
    category: 'devops',
    subtitle: 'GemOps · AWS observability',
    description:
      'A cloud-native observability and secrets platform, bringing metrics, logs, alerts, and deployments together on AWS.',
    tags: ['AWS EKS', 'Grafana', 'Prometheus', 'Vault'],
    repo: 'gemops-project',
    visual: 'observability',
    details: [
      'AWS infrastructure managed through Terraform and workloads deployed with Helm.',
      'Metrics through Prometheus, dashboards with Grafana, and logs with Loki and Alloy.',
      'Secrets management with Vault and alert routing with Alertmanager.',
      'CI/CD pipeline includes scanning, deployment, and rollback.',
    ],
  },
  {
    id: 'taskflow',
    title: 'Less friction. More flow.',
    category: 'fullstack',
    subtitle: 'TaskFlow · Task management',
    description:
      'A containerized task management application with a React frontend, ASP.NET Core API, and role-based access.',
    tags: ['C#', 'ASP.NET Core', 'React', 'SQL Server'],
    repo: 'dockerized-taskflow-project',
    visual: 'taskflow',
    details: [
      'React 19 frontend connected to an ASP.NET Core 9 REST API.',
      'Task creation, editing, and tracking with Admin and User roles.',
      'JWT authentication, BCrypt password hashing, and Entity Framework Core.',
      'Docker Compose brings together the frontend, backend, and SQL Server.',
    ],
  },
  {
    id: 'meteor',
    title: 'One ship. Endless possibilities.',
    category: 'games',
    subtitle: 'Meteor Blast · Unity game',
    description:
      'A C# game development project. Explore the source behind Meteor Blast and my experiments with interactive worlds.',
    tags: ['Unity', 'C#', 'Game development'],
    repo: 'Meteor-Blast',
    visual: 'space',
    details: [
      'A public C# game project in my GitHub portfolio.',
      'Visit the source repository to explore the implementation.',
      'The visual shown here is a portfolio illustration, not an in-game screenshot.',
    ],
  },
  {
    id: 'care',
    title: 'Software with a purpose.',
    category: 'fullstack',
    subtitle: 'Care Point · Healthcare system',
    description:
      'A full-stack healthcare system project built with C#, focused on bringing healthcare workflows into one application.',
    tags: ['C#', '.NET', 'Full stack'],
    repo: 'Care-Point-Project',
    visual: 'care',
    details: [
      'Public full-stack healthcare system repository.',
      'C# is the primary repository language.',
      'Review the source for implementation details; a detailed case study will be added later.',
    ],
  },
  {
    id: 'unity',
    title: 'Small worlds. Big curiosity.',
    category: 'games',
    subtitle: '2D game · Unity experiments',
    description:
      'A collection of hands-on C# game development work, exploring how code becomes an interactive experience.',
    tags: ['Unity', 'C#', '2D'],
    repo: 'My-New-2D-Game',
    visual: 'platform',
    details: [
      'A public C# 2D game development repository.',
      'Part of my continued exploration of Unity and game development.',
      'The visual shown here is a portfolio illustration, not an in-game screenshot.',
    ],
  },
];
export const categoryLabels = {
  all: 'All projects',
  devops: 'DevOps & Cloud',
  fullstack: 'Full-stack .NET',
  games: 'Unity & Games',
};
