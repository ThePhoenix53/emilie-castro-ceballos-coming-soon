import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/** Generate a simple random math challenge */
function generateChallenge() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b };
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  // Honeypot – invisible field that bots auto-fill
  website: z.string().max(0, { message: "Bot detected." }).optional(),
  captcha: z.string().min(1, { message: "Please answer the security question." }),
});

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [challenge, setChallenge] = useState(generateChallenge);

  const refreshChallenge = useCallback(() => setChallenge(generateChallenge()), []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",   // honeypot
      captcha: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Honeypot check – real users never fill this
    if (values.website) {
      toast.error("Spam detected.");
      return;
    }

    // Math captcha check
    if (parseInt(values.captcha, 10) !== challenge.answer) {
      form.setError("captcha", { message: "Incorrect answer. Please try again." });
      refreshChallenge();
      form.setValue("captcha", "");
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          phone: values.phone || "Not provided",
          message: values.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success("Message sent successfully!");
      form.reset();
      refreshChallenge();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      {/* Visually hidden h1 for SEO (logo serves as the visible heading) */}
      <h1 className="sr-only">Emilie Castro Ceballos – Speech &amp; Language Therapy in Zug &amp; Luzern</h1>

      {/* Hero Section */}
      <section aria-label="Introduction" className="container mx-auto px-4 sm:px-6 pt-6 pb-2 md:pt-10 md:pb-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.img
            src={logo}
            alt="Emilie Speech Language Therapy – logo with children climbing a mountain"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </section>

      {/* About Section */}
      <section aria-label="About the practice" className="container mx-auto px-4 sm:px-6 pt-2 pb-6 md:pt-4 md:pb-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-border/50">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              About My Practice
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Welcome! I provide professional speech and language therapy services in the
                <span className="font-medium text-foreground"> Zug and Luzern area</span> of central Switzerland.
              </p>
              <p>
                I specialize in working with <span className="font-medium text-foreground">children and teenagers</span>,
                helping them develop their communication skills, overcome speech challenges, and reach their full potential.
              </p>
              <p>
                With English-based therapy services, I offer personalized support tailored to each individual's
                unique needs in a caring and professional environment.
              </p>
            </div>
          </div>
        </motion.article>
      </section>

      {/* Contact Information */}
      <section aria-label="Contact information" className="container mx-auto px-4 sm:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <motion.a
              href="mailto:emilie@sltherapy.ch"
              className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-colors duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground mb-1">Email</p>
                <p className="text-sm text-muted-foreground break-all">emilie@sltherapy.ch</p>
              </div>
            </motion.a>

            <motion.div
              className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground mb-1">Location</p>
                <p className="text-sm text-muted-foreground">Zug & Luzern Area</p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="p-3 bg-primary/10 rounded-full">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground mb-1">Contact</p>
                <p className="text-sm text-muted-foreground">Via contact form</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section aria-label="Contact form" className="container mx-auto px-4 sm:px-6 py-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-border/50">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              Send an Inquiry
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please tell me about your inquiry..."
                          className="min-h-[150px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Honeypot – hidden from real users, bots auto-fill it */}
                <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input type="text" autoComplete="off" tabIndex={-1} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Simple math captcha */}
                <FormField
                  control={form.control}
                  name="captcha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        Security check: What is {challenge.a} + {challenge.b}? *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="numeric"
                          placeholder="Your answer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Emilie Castro Ceballos - Speech & Language Therapy. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
