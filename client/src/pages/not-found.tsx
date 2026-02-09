import { motion } from "framer-motion";
import { Home, ArrowLeft, Zap } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-secondary" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-2xl mx-4 px-6 py-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 Animated Number */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-8xl md:text-9xl font-black font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary drop-shadow-[0_0_25px_rgba(255,153,51,0.4)]">
            404
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4 mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-foreground">
            System Not Found
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-tech tracking-wide uppercase">
            The page you&apos;re looking for has entered hyperspace
          </p>
        </motion.div>

        {/* Animated icon */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full blur-lg opacity-50" />
            <Zap className="w-16 h-16 relative text-primary" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Oops! It seems this pathway doesn&apos;t exist in our digital realm. Let&apos;s get you back on track.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-tech font-semibold tracking-wider uppercase rounded-lg hover:shadow-[0_0_20px_rgba(255,153,51,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.a>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="px-8 py-4 border-2 border-primary text-primary font-tech font-semibold tracking-wider uppercase rounded-lg hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          className="text-xs md:text-sm text-muted-foreground/60 mt-12 font-tech tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Error Code: 404 | System Status: Offline
        </motion.p>
      </motion.div>
    </div>
  );
}
