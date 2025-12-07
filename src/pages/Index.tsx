import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Logo */}
          <motion.img
            src={logo}
            alt="EC Speech & Language Therapy"
            className="max-w-xs md:max-w-sm mx-auto cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight">
              Emilie Castro Ceballos
            </h1>
            
            <div className="inline-block">
              <p className="text-xl md:text-2xl text-primary font-medium px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                Coming Soon
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              English-based speech pathology services
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed font-light">
              Located in Switzerland, providing professional support for communication and speech & language development
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto"
          />

          {/* Email contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4"
          >
            <a
              href="mailto:emilie@sltherapy.ch"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300 text-base md:text-lg font-medium group"
            >
              <span className="group-hover:translate-x-[-4px] transition-transform duration-300">✉</span>
              emilie@speech.ch
            </a>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-sm text-muted-foreground/60 font-light"
          >
            We're preparing something special. Check back soon.
          </motion.p>
        </div>
      </div>
    </main>
  );
};

export default Index;
