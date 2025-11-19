
import { PortfolioData, SectionKey } from '../types';

// Helper to create a partial structure to merge with existing state
type PresetData = Omit<PortfolioData, 'themeSettings'>;

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60";
const FEMALE_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60";
const CREATIVE_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60";

export const PRESETS: Record<string, PresetData> = {
  coder: {
    name: "Alex Dev",
    tagline: "Full Stack Developer & Open Source Enthusiast",
    avatarUrl: DEFAULT_AVATAR,
    bio: "I build accessible, pixel-perfect, and performant web applications. Experienced in the MERN stack and cloud architecture, I turn coffee into code.",
    passion: "Building scalable software that solves real-world problems.",
    contactEmail: "alex@dev.com",
    skills: ["React", "TypeScript", "Node.js", "AWS", "Docker", "GraphQL", "PostgreSQL"],
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" },
    education: [{ id: 'ed1', institution: "Tech University", degree: "B.Tech in Computer Science", duration: "2020 - 2024" }],
    experience: [{ id: 'ex1', role: "Software Engineer", company: "TechFlow Systems", duration: "2024 - Present", description: "Developing microservices and optimizing frontend performance." }],
    projects: [
        { id: 'p1', name: "E-Commerce Dashboard", description: "A comprehensive analytics dashboard for online retailers using Next.js.", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800", link: "#" },
        { id: 'p2', name: "Chat Application", description: "Real-time messaging app with end-to-end encryption.", imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800", link: "#" }
    ],
    achievements: [{ id: 'a1', title: "Hackathon Winner", description: "1st Place in National CodeFest 2023" }],
    sectionOrder: ['profile', 'skills', 'projects', 'experience', 'education', 'achievements', 'passion']
  },
  civil: {
    name: "Jordan Build",
    tagline: "Civil Engineer | Structural Design Specialist",
    avatarUrl: DEFAULT_AVATAR,
    bio: "Dedicated Civil Engineer with a strong foundation in structural analysis and project management. Passionate about sustainable infrastructure and urban planning.",
    passion: "Designing sustainable infrastructure for future generations.",
    contactEmail: "jordan@civil.com",
    skills: ["AutoCAD", "Revit", "STAAD.Pro", "Project Management", "Structural Analysis", "Surveying"],
    socials: { github: "", linkedin: "https://linkedin.com", twitter: "" },
    education: [{ id: 'ed1', institution: "Institute of Technology", degree: "B.E. in Civil Engineering", duration: "2020 - 2024" }],
    experience: [{ id: 'ex1', role: "Site Engineer", company: "Urban Construct", duration: "2024 - Present", description: "Supervising site operations and ensuring compliance with safety standards." }],
    projects: [
        { id: 'p1', name: "Green Bridge Design", description: "Designed a sustainable pedestrian bridge using eco-friendly materials.", imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800", link: "#" },
        { id: 'p2', name: "Smart City Layout", description: "Proposed an optimized urban layout for traffic reduction.", imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800", link: "#" }
    ],
    achievements: [{ id: 'a1', title: "Best Project Award", description: "Awarded for innovative use of recycled concrete." }],
    sectionOrder: ['profile', 'experience', 'projects', 'skills', 'education', 'achievements', 'passion']
  },
  mechanical: {
    name: "Casey Gear",
    tagline: "Mechanical Engineer | CAD & Robotics",
    avatarUrl: DEFAULT_AVATAR,
    bio: "Mechanical Engineer passionate about thermodynamics, robotics, and automotive design. proficient in 3D modeling and simulation.",
    passion: "Innovating machinery to automate and improve efficiency.",
    contactEmail: "casey@mech.com",
    skills: ["SolidWorks", "ANSYS", "MATLAB", "3D Printing", "Thermodynamics", "Mechatronics"],
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "" },
    education: [{ id: 'ed1', institution: "State University", degree: "B.Tech in Mechanical Engineering", duration: "2020 - 2024" }],
    experience: [{ id: 'ex1', role: "Design Intern", company: "AutoMoto Corp", duration: "2023 - 2024", description: "Assisted in designing engine components and running stress simulations." }],
    projects: [
        { id: 'p1', name: "Autonomous Rover", description: "Built a 6-wheel rover capable of terrain mapping.", imageUrl: "https://images.unsplash.com/photo-1535376472810-5d229c65da09?auto=format&fit=crop&w=800", link: "#" },
        { id: 'p2', name: "Hydraulic Press", description: "Designed and simulated a high-efficiency hydraulic press system.", imageUrl: "https://images.unsplash.com/photo-1537462713205-e5126e61e302?auto=format&fit=crop&w=800", link: "#" }
    ],
    achievements: [{ id: 'a1', title: "Robotics Champion", description: "Lead the university team to victory in RoboWars." }],
    sectionOrder: ['profile', 'skills', 'projects', 'experience', 'education', 'achievements', 'passion']
  },
  ece: {
    name: "Taylor Chip",
    tagline: "Electronics & Communication Engineer | VLSI",
    avatarUrl: FEMALE_AVATAR,
    bio: "Electronics Engineer focused on embedded systems and VLSI design. Experience with FPGA programming and IoT solutions.",
    passion: "Connecting the physical world with digital intelligence.",
    contactEmail: "taylor@ece.com",
    skills: ["Verilog", "Embedded C", "IoT", "PCB Design", "MATLAB", "Signal Processing"],
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "" },
    education: [{ id: 'ed1', institution: "Tech Institute", degree: "B.E. in ECE", duration: "2020 - 2024" }],
    experience: [{ id: 'ex1', role: "IoT Developer", company: "SmartHome Inc", duration: "2024 - Present", description: "Developing firmware for smart sensors and home automation devices." }],
    projects: [
        { id: 'p1', name: "Smart Agriculture System", description: "IoT based system to monitor soil moisture and automate irrigation.", imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800", link: "#" },
        { id: 'p2', name: "FPGA Processor", description: "Designed a simple 8-bit RISC processor on FPGA.", imageUrl: "https://images.unsplash.com/photo-1555664424-778a6902201b?auto=format&fit=crop&w=800", link: "#" }
    ],
    achievements: [{ id: 'a1', title: "Paper Publication", description: "Published research on Wireless Sensor Networks." }],
    sectionOrder: ['profile', 'skills', 'projects', 'experience', 'education', 'achievements', 'passion']
  },
  eee: {
    name: "Morgan Power",
    tagline: "Electrical Engineer | Power Systems & Renewable Energy",
    avatarUrl: DEFAULT_AVATAR,
    bio: "Electrical Engineer with a focus on renewable energy integration and power system analysis. Dedicated to a greener future.",
    passion: "Optimizing energy systems for sustainability.",
    contactEmail: "morgan@eee.com",
    skills: ["Circuit Design", "Power Systems", "MATLAB/Simulink", "PLC/SCADA", "Renewable Energy"],
    socials: { github: "", linkedin: "https://linkedin.com", twitter: "" },
    education: [{ id: 'ed1', institution: "City Engineering College", degree: "B.Tech in EEE", duration: "2020 - 2024" }],
    experience: [{ id: 'ex1', role: "Graduate Trainee", company: "National Grid", duration: "2024 - Present", description: "Analyzing grid stability and load flow data." }],
    projects: [
        { id: 'p1', name: "Solar Inverter Design", description: "Designed a high-efficiency inverter for residential solar panels.", imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800", link: "#" },
        { id: 'p2', name: "Electric Vehicle Charger", description: "Prototyped a fast-charging station for EVs.", imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800", link: "#" }
    ],
    achievements: [{ id: 'a1', title: "Energy Saver Award", description: "Designed a system that reduced campus energy consumption by 15%." }],
    sectionOrder: ['profile', 'experience', 'skills', 'projects', 'education', 'achievements', 'passion']
  },
  photography: {
    name: "Jamie Lens",
    tagline: "Visual Storyteller & Photographer",
    avatarUrl: CREATIVE_AVATAR,
    bio: "Capturing moments that tell a story. Specializing in portrait, landscape, and street photography with a keen eye for lighting and composition.",
    passion: "Freezing time and emotion through the lens.",
    contactEmail: "jamie@studio.com",
    skills: ["Adobe Lightroom", "Photoshop", "Lighting", "Composition", "Visual Storytelling", "Retouching"],
    socials: { github: "", linkedin: "", twitter: "https://twitter.com" },
    education: [{ id: 'ed1', institution: "Arts Academy", degree: "B.A. in Photography", duration: "2020 - 2023" }],
    experience: [{ id: 'ex1', role: "Freelance Photographer", company: "Self Employed", duration: "2022 - Present", description: "Delivering high-quality visual assets for brands and individuals." }],
    projects: [
        { id: 'p1', name: "Urban Solitude", description: "A photo series exploring loneliness in big cities.", imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800", link: "#" },
        { id: 'p2', name: "Wild Horizons", description: "Landscape collection from the Rockies.", imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800", link: "#" }
    ],
    achievements: [{ id: 'a1', title: "Photo of the Year", description: "Featured in National Geographic Traveler." }],
    sectionOrder: ['profile', 'projects', 'passion', 'skills', 'experience', 'achievements', 'education']
  }
};
