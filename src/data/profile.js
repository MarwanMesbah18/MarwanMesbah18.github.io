export const profile = {
  name: 'Marwan Mesbah',
  fullName: 'Marwan Omar Mesbah',
  roles: ['CS & AI Student', 'Computer Vision & ML', 'Robotics Software — RobEn', 'Full-Stack Developer'],
  tagline: 'I build real-time computer-vision systems, custom YOLO models, and full-stack products — from underwater robotics to production SaaS.',
  location: 'Heliopolis, Cairo, Egypt',
  email: 'marwan.mesbah.m@gmail.com',
  avatar: '/avatar.jpg',
  socials: {
    github: 'https://github.com/MarwanMesbah18',
    linkedin: 'https://www.linkedin.com/in/marwan-mesbah/',
  },
  resume: '/Profile.pdf',
  about: [
    "I'm a Computer Science & AI student at the Arab Academy for Science, Technology and Maritime Transport (AAST), and Head of the Software & AI team at RobEn — our underwater robotics squad.",
    'My work sits at the intersection of artificial intelligence, embedded systems, and full-stack development. I design real-time computer-vision systems, train custom YOLO models, and ship production software used by real companies.',
    "I led the software effort behind RobEn's underwater ROV to 2nd place at the MATE ROV Competition in 2025 & 2026, and I currently build full-stack features on a multi-tenant recruitment SaaS at Klenka.",
  ],
  highlights: [
    { value: '2×', label: 'MATE ROV 2nd Place' },
    { value: '6+', label: 'Shipped AI Projects' },
    { value: '2', label: 'Consecutive Wins' },
    { value: '2027', label: 'CS Graduation' },
  ],
}

export const experiences = [
  {
    role: 'Head of Software & AI Team',
    org: 'RobEn',
    period: 'Sep 2023 — Present',
    location: 'Cairo, Egypt',
    points: [
      'Lead the software & AI team behind RobEn\u2019s underwater Remotely Operated Vehicle (ROV), owning the full software stack from sensors to thrusters.',
      'Designed the real-time computer-vision system (YOLO, OpenCV) powering underwater object detection and navigation.',
      'Built the complete control system on a Raspberry Pi — owning the full control loop and integrating cameras, sensors, and motor/thruster drivers.',
      'Led the software effort to 2nd Place at the MATE ROV Competition — 2025 & 2026 (two consecutive years).',
    ],
  },
  {
    role: 'Software Engineer Trainee',
    org: 'Klenka',
    period: 'Nov 2025 — Present',
    location: 'Cairo, Egypt',
    points: [
      'Full-stack development on Chameleoni, a multi-tenant recruitment CRM SaaS used by real UK recruitment agencies.',
      'Worked across React, Node.js and PostgreSQL on per-tenant data, complex AG-Grid views, telephony (Twilio), speech-to-text, and LLM features.',
    ],
  },
]

export const education = [
  {
    role: 'B.Sc. Computer Science',
    org: 'Arab Academy for Science, Technology & Maritime Transport (AAST)',
    period: 'Sep 2023 — Sep 2027',
    location: 'Cairo, Egypt',
  },
]

export const languages = [
  { name: 'Arabic', level: 'Native / Bilingual' },
  { name: 'English', level: 'Professional Working' },
]
