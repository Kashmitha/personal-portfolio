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
  featured?: string;
  visual:
    | 'pipeline'
    | 'observability'
    | 'terraform'
    | 'ansible'
    | 'containers'
    | 'taskflow'
    | 'care'
    | 'space'
    | 'platform'
    | 'research';
};
export const profile = {
  name: 'Kashmitha Madushan',
  github: 'https://github.com/Kashmitha',
  location: 'Sri Lanka',
  portrait: '/portrait.png',
  // Set these when your contact details and CV are ready. No placeholder contact links are published.
  email: '',
  resume: '',
  linkedin: 'https://www.linkedin.com/in/kashmitha-madushan-362822339/',
};
export const projects: Project[] = [
  {
    id: 'gemops',
    title: 'Visibility into every layer.',
    category: 'devops',
    subtitle: 'GemOps · AWS observability',
    featured: 'Main DevOps project',
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
    id: 'azure-terraform',
    title: 'Infrastructure, defined.',
    category: 'devops',
    subtitle: 'Azure infrastructure · Terraform',
    description:
      'Modular Azure infrastructure as code, connecting networking and Linux compute with remote state and automated Terraform workflows.',
    tags: ['Azure', 'Terraform', 'Azure Blob Storage', 'GitHub Actions'],
    repo: 'devops-project-2-azure-terraform',
    visual: 'terraform',
    details: [
      'Separate networking and compute modules organize the infrastructure.',
      'Resource groups, virtual networks, subnets and network security groups define the network layer.',
      'Public IP, network interface and Ubuntu Linux VM resources form the compute layer.',
      'Azure Blob Storage holds remote Terraform state with locking; GitHub Actions handles plan/apply workflows.',
    ],
  },
  {
    id: 'azure-ansible',
    title: 'Configure once. Repeat reliably.',
    category: 'devops',
    subtitle: 'Azure configuration · Ansible',
    description:
      'Role-based Ansible automation for Azure Linux VMs, covering server configuration, application deployment and security hardening.',
    tags: ['Ansible', 'Azure', 'Nginx', 'Docker'],
    repo: 'devops-project-3',
    visual: 'ansible',
    details: [
      'Reusable common, security, Docker and Nginx roles separate configuration responsibilities.',
      'Dynamic Azure inventory, Jinja2 templates and handlers support repeatable configuration.',
      'Security configuration includes UFW, fail2ban and SSH hardening.',
      'Playbooks cover provisioning, server configuration, deployment and teardown; GitHub Actions runs lint and syntax checks.',
    ],
  },
  {
    id: 'aks',
    title: 'Cloud-native. Carefully orchestrated.',
    category: 'devops',
    subtitle: 'Azure AKS platform',
    description:
      'A Kubernetes deployment on Azure AKS with Terraform infrastructure, container delivery, rolling updates and monitoring.',
    tags: ['Azure AKS', 'Terraform', 'Kubernetes', 'GitHub Actions'],
    repo: 'devops-project-4',
    visual: 'pipeline',
    details: [
      'Terraform provisions Azure infrastructure; GitHub Actions delivers images through Azure Container Registry.',
      'Rolling update configuration, rollback scripts and startup, liveness and readiness probes support application delivery.',
      'Horizontal Pod Autoscaling, resource requests/limits and ResourceQuota define workload scaling and boundaries.',
      'Prometheus and Grafana provide monitoring through a Helm-deployed stack.',
    ],
  },
  {
    id: 'docker-services',
    title: 'The foundations of delivery.',
    category: 'devops',
    subtitle: 'Docker services · Jenkins CI/CD',
    description:
      'A foundational multi-service application pairing an Nginx frontend with a Flask API, Docker Compose and a Jenkins delivery pipeline.',
    tags: ['Docker Compose', 'Jenkins', 'Python Flask', 'Nginx'],
    repo: 'project-1-dockerized-multi-service',
    visual: 'containers',
    details: [
      'Nginx serves the static frontend and Python Flask provides the REST API.',
      'Docker Compose defines the multi-service application.',
      'A GitHub webhook triggers the Jenkins pipeline.',
      'Documented pipeline stages cover checkout, image builds, backend health tests, service deployment and verification.',
    ],
  },
  {
    id: 'care',
    title: 'Software with a purpose.',
    category: 'fullstack',
    subtitle: 'Care Point · Healthcare system',
    featured: 'Largest full-stack project',
    description:
      'A healthcare platform with a React interface and ASP.NET Core API for doctor discovery, appointments, prescriptions and administration.',
    tags: ['React', 'ASP.NET Core', 'EF Core', 'SQL Server'],
    repo: 'Care-Point-Project',
    visual: 'care',
    details: [
      'React 19 UI paired with an ASP.NET Core 9 API, Entity Framework Core and SQL Server integration.',
      'Source includes doctor search and availability, appointment management, and prescription workflows.',
      'Patient, Doctor and Admin roles appear in API authorization and application services.',
      'Authentication services use JWT and BCrypt password hashing; the API separates controllers, DTOs, interfaces and services.',
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
  {
    id: 'final-year-game',
    title: 'The final-year build.',
    category: 'games',
    subtitle: 'Final-year project · Game development',
    description:
      'My final-year Unity 2D game project, with physics-based player movement, grounded jumping and animation controls implemented in C#.',
    tags: ['Unity 2022', 'C#', '2D physics', 'Final-year project'],
    repo: 'MyFinalYearProject',
    visual: 'research',
    details: [
      'Created as my final-year game project; the public source uses Unity 2022.3.43f1 and includes a Level1 scene.',
      'PlayerMovement.cs implements horizontal movement, facing direction, grounded jumping and run/jump animation parameters with Rigidbody2D and Animator.',
      'The project includes 2D art assets, Unity scene files and a Joystick Pack input package.',
      'The preview is a portfolio concept illustration, not a gameplay screenshot.',
    ],
  },
];
export const categoryLabels = {
  all: 'All projects',
  devops: 'DevOps & Cloud',
  fullstack: 'Full-stack .NET',
  games: 'Unity & Games',
};
