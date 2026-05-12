import React from 'react';
import { Twitter, Linkedin, Github, Instagram, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap", "API Status"]
    },
    {
      title: "Resources",
      links: ["Documentation", "API Reference", "Guides", "Community", "Webinars", "Support"]
    },
    {
      title: "Company",
      links: ["About Us", "Blog", "Careers", "Contact", "Press Kit", "Partners"]
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Cookie Policy", "GDPR", "Security", "Compliance"]
    }
  ];

  return (
    <footer className="bg-[#0a051a] border-t border-white/5 pt-16 pb-8 px-6"> {/* Reduced overall vertical padding */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12"> {/* Reduced bottom margin */}

          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-4 space-y-6"> {/* Reduced vertical spacing */}
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <img
                src="/logo.png"
                alt="LeadGenie Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-white font-bold text-xl tracking-tight">LeadGenie</span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Streamline your marketing, automate campaigns, and grow your business with AI insights.
            </p>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500/50 w-full transition-all"
                />
                <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-5 py-2 rounded-xl text-sm transition-all active:scale-95">
                  Join
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6"> {/* Reduced gap between columns */}
            {footerSections.map((section, idx) => (
              <div key={idx} className="space-y-4"> {/* Reduced header-to-links spacing */}
                <h4 className="text-white font-bold text-[13px] uppercase tracking-widest">{section.title}</h4>
                <ul className="space-y-2.5"> {/* Reduced distance between individual links */}
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link to="#" className="text-gray-400 text-sm hover:text-orange-500 transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[11px] flex items-center gap-1">
            © 2026 LeadGenie. Built with <Heart size={10} className="text-red-500 fill-red-500" /> for small businesses.
          </p>

          <div className="flex items-center gap-4 text-gray-500 text-[11px]">
            <button className="hover:text-white transition-colors">English (US)</button>
            <span className="w-[1px] h-3 bg-white/10"></span>
            <button className="hover:text-white transition-colors">Status</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;