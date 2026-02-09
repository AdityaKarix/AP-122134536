import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Globe,
  Code2,
  MessageSquare,
  X,
  BookOpen,
  Cpu,
  Rocket,
  Code,
  Terminal,
} from "lucide-react";
import bgImage from "@assets/generated_images/futuristic_maharashtra_ai_background.png";

// --- Helper for Stars ---
const generateSphere = (count: number, radius: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Random point in sphere
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
};

// --- 3D Background Component ---
function Stars(props: any) {
  const ref = useRef<any>(null);
  const [sphere] = useState(() => generateSphere(5000, 1.5));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ff9933" // Saffron-ish tint
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// --- Social Link Component ---
const SocialLink = ({
  href,
  icon: Icon,
  label,
  color = "border-primary",
}: {
  href: string;
  icon: any;
  label: string;
  color?: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    className={`
      relative group flex items-center gap-3 px-6 py-4 
      bg-card/40 backdrop-blur-md border border-white/10 
      hover:border-primary/50 hover:bg-card/60 transition-all duration-300
      rounded-xl overflow-hidden
    `}
  >
    <div
      className={`
      absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent 
      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700
    `}
    />

    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
    </div>

    <span className="font-tech text-lg font-medium tracking-wide text-gray-300 group-hover:text-white group-hover:text-glow transition-colors">
      {label}
    </span>

    <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
      <Terminal className="w-4 h-4" />
    </div>
  </motion.a>
);

// --- Skill Tag Component ---
const SkillTag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 text-xs font-tech tracking-wider uppercase border border-white/10 bg-white/5 rounded-full text-primary/80 hover:text-primary hover:border-primary/50 transition-colors cursor-default">
    {children}
  </span>
);

export default function Home() {
  const userImage =
    "https://cdn.prod.website-files.com/6875062152f39e5683c3b49d/687f95c99e5a65c01854e3a6_Frame%201597881489.png";
  
  const [hudVisible, setHudVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setHudVisible((prev) => !prev);
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <style>{`
        .hud-text {
          writing-mode: vertical-rl;
          -webkit-writing-mode: vertical-rl;
        }
        @media (min-width: 1024px) {
          .hud-text {
            writing-mode: horizontal-tb;
            -webkit-writing-mode: horizontal-tb;
          }
        }
      `}</style>
      {/* Background Image Layer */}
      <div
        className="fixed inset-0 z-0 opacity-20 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* 3D Canvas Layer */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center gap-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-6 max-w-4xl"
        >
          {/* Avatar with HUD ring */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-secondary to-primary opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full  bg-background overflow-hidden  border-primary/30">
              <img
                src={userImage}
                alt="Profile"
                className="w-auto h-auto object-cover  hover:scale-110 transition-transform duration-700"
              />
            </div>
            {/* Decorative Orbit Rings */}
            <div className="absolute inset-0 rounded-full border border-secondary/30 w-[120%] h-[120%] -left-[10%] -top-[10%] animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-0 rounded-full border border-primary/20 w-[150%] h-[150%] -left-[25%] -top-[25%] animate-[spin_15s_linear_infinite_reverse]" />
          </div>

          <div className="space-y-2 mt-8">
            <motion.h1
              className="text-4xl md:text-7xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white drop-shadow-[0_0_15px_rgba(255,153,51,0.5)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ADITYA PATIL
            </motion.h1>
            <motion.p
              className="text-sm md:text-base text-primary/80 font-light tracking-wide mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Innovativate Attitude to make things possible
            </motion.p>
            <motion.h2
              className="text-xl md:text-2xl font-tech text-secondary tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Engineer • Entrepreneur • Inovator • Mentor • Investor
            </motion.h2>
          </div>

          <motion.p
            className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            I am an Engineer and Entrepreneur building{" "}
            <span className="text-primary font-medium"> AI </span>powered solutions to solve real-time problems with respect to nature. Deeply rooted in the culture of{" "}
            <span className="text-primary">Maharashtra</span>, contributing to
            <span className="text-primary"> India's </span>progress.
            <br className="hidden md:block" />
            Ex-founder of AI company{" "}
            <span className="text-white font-tech tracking-wide border-b border-secondary/50">
              Sukoon AI
            </span>
            .
          </motion.p>

          <motion.div
            className="border border-white/10 bg-white/5 rounded-lg p-4 hover:border-primary/50 hover:bg-primary/10 transition-colors max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-full text-xs font-tech tracking-widest text-white/90 uppercase">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 pb-2 border-b border-white/10">
                <p className="font-semibold text-left">Tech Skills</p>
                <p className="text-primary text-justify col-span-1 md:col-span-3">Python, PHP, JavaScript, Artificial Intelligence, Machine Learning, Deep Learning, NLP, Computer Vision, MLOps</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 py-2 border-b border-white/10">
                <p className="font-semibold text-left">Core Engineering Skills</p>
                <p className="text-primary text-justify col-span-1 md:col-span-3">Industry Management, CAD/CAM, Engineering Designs, Circuit Design, Electrical Wiring Electronic Assembly</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 py-2 border-b border-white/10">
                <p className="font-semibold text-left">Soft Skills</p>
                <p className="text-primary text-justify col-span-1 md:col-span-3">Leadership, Strategic Decision-making, Critical Thinking, Time Management, Positive Attitude</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 py-2 border-b border-white/10">
                <p className="font-semibold text-left">Languages</p>
                <p className="text-primary text-justify col-span-1 md:col-span-3">Marathi, Hindi, Gujarati, English, Sanskrit</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 pt-2">
                <p className="font-semibold text-left">Interests</p>
                <p className="text-primary text-justify col-span-1 md:col-span-3">Nature</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <SocialLink
            href="https://linkedin.com/in/adityapatil100"
            icon={Linkedin}
            label="LinkedIn"
          />
          <SocialLink href="https://github.com/adityapatil100" icon={Github} label="GitHub" />
          <SocialLink
            href="https://instagram.com/adityapatil_100"
            icon={Instagram}
            label="Instagram"
          />
          <SocialLink
            href="https://facebook.com/adityaspatil100"
            icon={Facebook}
            label="Facebook"
          />
          <SocialLink
            href="https://adityapatil100.github.io/aditya-portfolio/"
            icon={Globe}
            label="Website"
          />
          <SocialLink href="https://x.com/adityapatil100" icon={X} label="X.com" />
          <SocialLink href="#" icon={Code2} label="Stack Overflow" />
          <SocialLink href="#" icon={MessageSquare} label="Discord" />
        </motion.div>

        {/* Floating HUD Elements */}
        <div
          className={`fixed top-4 left-4 block lg:block font-tech text-[10px] tracking-widest text-primary hud-text transition-opacity duration-500 ${
            hudVisible ? "opacity-30" : "opacity-0 pointer-events-none"
          }`}
        >
          SYSTEM: ONLINE
          <br />
          LOCATION: PUNE, MAHARASHTRA, INDIA
          <br />
          THINKS: Nation First with respect to Humanity
        </div>

        <div
          className={`fixed bottom-4 left-4 block lg:block font-tech text-[10px] tracking-widest text-secondary hud-text transition-opacity duration-500 ${
            hudVisible ? "opacity-30" : "opacity-0 pointer-events-none"
          }`}
        >
          CORE: STABLE
          <br />
          AI MODULES: ACTIVE
          <br />
          VISION: INFINITE
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-20 text-center space-y-2 opacity-60 hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center gap-2 text-sm font-tech tracking-wider text-muted-foreground">
            <Cpu className="w-4 h-4" />
            <span>ENGINEERED WITH PASSION</span>
            <Rocket className="w-4 h-4" />
          </div>
          <p className="text-xs font-sans text-primary/80 tracking-widest uppercase">
            Jai Hind • Jai Maharashtra •
          </p>

          <p className="text-xs font-sans">
            &copy; 2026 Aditya Patil. All rights reserved.
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
