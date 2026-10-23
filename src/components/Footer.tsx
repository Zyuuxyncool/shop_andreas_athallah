import { ArrowLeft, Github, Instagram, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-card/40 backdrop-blur-sm mt-16 text-sm text-muted-foreground">
      <div className="container max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <p className="font-semibold text-foreground">
            Andreas Shop <span className="font-normal text-muted-foreground text-xs">• shop.andreas-athallah.web.id</span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Jasa Joki Koding & Link Aktivasi Google Gemini • Sidoarjo & Surabaya, Indonesia
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://andreas-athallah.web.id"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/80 text-xs font-medium hover:bg-accent text-foreground transition-colors mr-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portofolio Utama</span>
          </a>

          <a
            href="https://wa.me/6285773301211"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-emerald-500 transition-colors"
            aria-label="WhatsApp"
          >
            <SiWhatsapp className="w-4 h-4" />
          </a>

          <a
            href="https://www.instagram.com/andreas_athallah.id"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/Zyuuxyncool"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="mailto:andreasnation970@gmail.com"
            className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto mt-6 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Andreas Athallah. Dibuat dengan presisi dan performa tinggi.
      </div>
    </footer>
  );
}
