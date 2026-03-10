import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import spaLogo from "@/assets/spa-cpsp-logo.png";
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
import BackToTop from "@/components/BackToTop";
import CookieConsent from "@/components/CookieConsent";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  // Honeypot – invisible field that bots auto-fill
  website: z.string().max(0, { message: "Bot detected." }).optional(),
});

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",   // honeypot
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Honeypot check – real users never fill this
    if (values.website) {
      toast.error("Spam detected.");
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
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      {/* Skip link for keyboard / screen reader users */}
      <a
        href="#contact-form"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
      >
        Skip to contact form
      </a>

      {/* Visually hidden h1 for SEO (logo serves as the visible heading) */}
      <h1 className="sr-only">Emilie Castro Ceballos – Speech &amp; Language Therapy for Children &amp; Adolescents in Zug &amp; Luzern, Switzerland</h1>

      {/* Hero Section */}
      <section id="hero" aria-label="Introduction" className="container mx-auto px-4 sm:px-6 pt-6 pb-2 md:pt-10 md:pb-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <motion.img
            src={logo}
            alt="Emilie Speech Language Therapy – logo with children climbing a mountain"
            className="w-full max-w-[12rem] sm:max-w-[14rem] md:max-w-xs lg:max-w-sm mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" aria-label="About the practice" className="container mx-auto px-4 sm:px-6 pt-2 pb-6 md:pt-4 md:pb-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-border/50">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              About Me
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Welcome! My name is Emilie, and I am a Speech and Language Therapist providing support for English-speaking children and adolescents. Since moving to Switzerland from Australia in 2022, I have had the opportunity to work within international schools, and I am now excited to offer my services privately to families within the Luzern and Zug regions.
              </p>
              <p>
                I am passionate about collaborating with multicultural and multilingual families. My goal is to help children and young adults achieve their full communication potential while ensuring they feel confident and empowered every step of the way.
              </p>
              <p>
                In my practice, I take a neuro-affirming approach to supporting neurodivergent children. I have specialised training in Gestalt language development, literacy intervention, Childhood Apraxia of Speech, and the Greenspan Floortime model. While my clinical interests are broad, I am especially passionate about receptive and expressive language development, as well as literacy.
              </p>
              <p>
                Please feel free to get in touch for more information. I look forward to connecting with you!
              </p>
            </div>
          </div>
        </motion.article>
      </section>

      {/* Certification Badge */}
      <section id="certification" aria-label="Professional certification" className="container mx-auto px-4 sm:px-6 pb-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <img
            src={spaLogo}
            alt="Speech Pathology Australia – Certified Practising Speech Pathologist"
            loading="lazy"
            className="w-full max-w-[16rem] sm:max-w-[18rem] md:max-w-[20rem]"
          />
        </motion.div>
      </section>

      {/* Contact Information */}
      <section id="contact" aria-label="Contact information" className="container mx-auto px-4 sm:px-6 py-6">
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
      <section id="contact-form" aria-label="Contact form" className="container mx-auto px-4 sm:px-6 py-6 pb-12">
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

      <BackToTop />
      <CookieConsent />
    </main>
  );
};

export default Index;
