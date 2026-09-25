import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface LegalPageProps {
  page: 'about' | 'contact' | 'privacy' | 'terms' | 'affiliate' | 'cookies';
}

export const LegalPage: React.FC<LegalPageProps> = ({ page }) => {
  const { navigate } = useApp();

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setContactError('Please complete all required fields.');
      return;
    }
    setContactError('');
    setSubmitted(true);
  };

  return (
    <div className="py-8 sm:py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Tab Navigation for Legal/Trust Sections */}
      <div className="flex gap-2 border-b border-[#E4E4E7] pb-3 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'about', label: 'About Us' },
          { id: 'affiliate', label: 'Affiliate Disclosure' },
          { id: 'contact', label: 'Contact Us' },
          { id: 'privacy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms of Service' },
          { id: 'cookies', label: 'Cookie Policy' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate({ type: 'legal', page: tab.id as any })}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              page === tab.id
                ? 'bg-[#18181B] text-white'
                : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. About Us */}
      {page === 'about' && (
        <div className="space-y-6 text-sm text-[#3F3F46] leading-relaxed">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
              About What Should I Buy?
            </div>
            <h1 className="text-3xl font-extrabold text-[#18181B]">
              Our Editorial Mission & Testing Standards
            </h1>
          </div>

          <p className="text-base text-[#18181B] font-medium leading-relaxed">
            “What Should I Buy?” was founded on a simple principle: modern shopping research is broken by AI-generated content farms, paid influencer endorsements, and misleading scoreboards.
          </p>

          <p>
            We help consumers in the USA, UK, Europe, Canada, Australia, and worldwide make clear, confident purchase decisions based strictly on their actual budget, intended use case, and genuine product trade-offs.
          </p>

          <h2 className="text-lg font-bold text-[#18181B] pt-4">Our Three Testing Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E4E4E7] space-y-1.5">
              <h3 className="font-bold text-xs text-[#18181B] uppercase">1. Zero Sponsor Influence</h3>
              <p className="text-xs text-[#52525B]">
                We do not accept paid product placements or sponsored rankings. Our editorial team selects every model independently.
              </p>
            </div>

            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E4E4E7] space-y-1.5">
              <h3 className="font-bold text-xs text-[#18181B]">2. Real-World Trade-Offs</h3>
              <p className="text-xs text-[#52525B]">
                No product is perfect. Every single review explicitly lists compromises, non-upgradable parts, and potential frustrations.
              </p>
            </div>

            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E4E4E7] space-y-1.5">
              <h3 className="font-bold text-xs text-[#18181B]">3. Clear Budget Grounding</h3>
              <p className="text-xs text-[#52525B]">
                We never tell someone on a $600 budget to simply "spend more." We evaluate the best choice for the money you have.
              </p>
            </div>
          </div>

          <p className="pt-4">
            We purchase or loan production consumer retail units—never cherry-picked golden engineering samples—and test them under standard real-world conditions.
          </p>
        </div>
      )}

      {/* 2. Affiliate Disclosure */}
      {page === 'affiliate' && (
        <div className="space-y-6 text-sm text-[#3F3F46] leading-relaxed">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
              FTC & International Compliance
            </div>
            <h1 className="text-3xl font-extrabold text-[#18181B]">
              Affiliate Disclosure Policy
            </h1>
          </div>

          <div className="bg-[#FAFAFA] border-l-4 border-[#18181B] p-4 rounded-r-xl space-y-1">
            <p className="font-semibold text-xs text-[#18181B]">
              Transparency Guarantee:
            </p>
            <p className="text-xs text-[#52525B]">
              We may earn a commission when you purchase through links on our website. This comes at zero extra cost to you and never influences our editorial findings.
            </p>
          </div>

          <h2 className="text-base font-bold text-[#18181B]">How Our Monetization Works</h2>
          <p>
            To fund our laboratory testing, writer salaries, and independent server infrastructure, “What Should I Buy?” participates in various affiliate marketing programs. When you click buttons labeled "Check Price", "View Deal", or store links, and subsequently make a purchase, the retailer may pay us an affiliate commission.
          </p>

          <h2 className="text-base font-bold text-[#18181B]">Editorial Independence Guarantee</h2>
          <ul className="space-y-2 text-xs list-disc pl-5 text-[#52525B]">
            <li>Our writers and researchers are never incentivized by commission rates. A product that pays a 0% commission is recommended just as readily as one that pays 3% if it is the superior choice for the reader.</li>
            <li>Manufacturers cannot pay to change our reviews, alter benchmark results, or secure a spot on our top lists.</li>
            <li>If a user returns a product because it failed to meet their needs, the retailer cancels our commission. Therefore, we are strictly aligned with recommending products that consumers genuinely keep and enjoy.</li>
          </ul>

          <h2 className="text-base font-bold text-[#18181B]">Amazon Associates Program</h2>
          <p className="text-xs text-[#52525B]">
            What Should I Buy? is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com and affiliated international marketplaces.
          </p>
        </div>
      )}

      {/* 3. Contact Us */}
      {page === 'contact' && (
        <div className="space-y-6 text-sm text-[#3F3F46] leading-relaxed">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
              Get in Touch
            </div>
            <h1 className="text-3xl font-extrabold text-[#18181B]">
              Contact Our Editorial & Research Team
            </h1>
            <p className="text-xs text-[#52525B] mt-1">
              Have a product inquiry, correction, or suggestion for a category we should test? Let us know.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[#16A34A] mx-auto" />
              <h2 className="font-bold text-base text-[#166534]">
                Message Received
              </h2>
              <p className="text-xs text-[#15803D] max-w-md mx-auto">
                Thank you, {name}. Our editorial team reviews reader inquiries daily and will respond to {email} within 24–48 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-[#166534] underline pt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="bg-white p-6 rounded-2xl border border-[#E4E4E7] shadow-sm space-y-4">
              {contactError && (
                <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs text-[#DC2626]">
                  {contactError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#18181B] block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[#D4D4D8] focus:border-[#18181B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#18181B] block mb-1">Your Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jane@example.com"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[#D4D4D8] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#D4D4D8] focus:border-[#18181B] focus:outline-none bg-white"
                >
                  <option value="General Feedback">General Feedback</option>
                  <option value="Product Testing Request">Product Testing Request</option>
                  <option value="Specification Correction">Specification Correction</option>
                  <option value="Affiliate / Business">Affiliate / Business Partnership</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1">Message *</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our research team assist you?"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#D4D4D8] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* 4. Privacy Policy */}
      {page === 'privacy' && (
        <div className="space-y-6 text-sm text-[#3F3F46] leading-relaxed">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
              Privacy & Data Protection
            </div>
            <h1 className="text-3xl font-extrabold text-[#18181B]">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#71717A] mt-1">Last Updated: September 2026</p>
          </div>

          <p>
            At “What Should I Buy?”, accessible from our web domains, the privacy of our visitors is of paramount importance. This Privacy Policy document outlines the types of information collected and how we use and safeguard it under GDPR, CCPA, and global privacy standards.
          </p>

          <h2 className="text-base font-bold text-[#18181B]">Information We Collect</h2>
          <p className="text-xs text-[#52525B]">
            We do not require user accounts to browse our buying guides, compare products, or run the decision tool. When you voluntarily contact us via our contact form, we collect your name and email address exclusively to reply to your inquiry.
          </p>

          <h2 className="text-base font-bold text-[#18181B]">Log Files and Analytics</h2>
          <p className="text-xs text-[#52525B]">
            Like standard web services, we record basic diagnostic server logs (IP address, browser type, referring page, date/time) to detect malicious bot activity and maintain site security. These logs are purged periodically.
          </p>

          <h2 className="text-base font-bold text-[#18181B]">Your Rights</h2>
          <p className="text-xs text-[#52525B]">
            Under applicable regulations (including European GDPR and California CCPA), you have the right to request deletion or disclosure of any personal correspondence we hold. Contact us at privacy@whatshouldibuy.org for inquiries.
          </p>
        </div>
      )}

      {/* 5. Terms of Service */}
      {page === 'terms' && (
        <div className="space-y-6 text-sm text-[#3F3F46] leading-relaxed">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
              Legal Terms
            </div>
            <h1 className="text-3xl font-extrabold text-[#18181B]">
              Terms of Service
            </h1>
            <p className="text-xs text-[#71717A] mt-1">Effective: September 2026</p>
          </div>

          <p>
            By accessing or using “What Should I Buy?”, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our services.
          </p>

          <h2 className="text-base font-bold text-[#18181B]">Informational Purpose Only</h2>
          <p className="text-xs text-[#52525B]">
            The content, evaluations, and recommendations on What Should I Buy? are provided for consumer informational purposes only. While we rigorously test products and monitor retailer price changes, product specifications, availability, and prices fluctuate rapidly across external merchants. Always verify final checkout details on the retailer’s secure checkout page.
          </p>

          <h2 className="text-base font-bold text-[#18181B]">No Guarantees or Endorsements</h2>
          <p className="text-xs text-[#52525B]">
            We do not manufacture or sell the products displayed. Any warranty claims, fulfillment issues, or return requests must be directed to the respective manufacturer or merchant.
          </p>
        </div>
      )}

      {/* 6. Cookie Policy */}
      {page === 'cookies' && (
        <div className="space-y-6 text-sm text-[#3F3F46] leading-relaxed">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
              Tracking & Storage
            </div>
            <h1 className="text-3xl font-extrabold text-[#18181B]">
              Cookie Policy
            </h1>
          </div>

          <p>
            This Cookie Policy explains what cookies and local storage tokens are, how we use them, and your choices regarding cookies.
          </p>

          <h2 className="text-base font-bold text-[#18181B]">Cookies We Use</h2>
          <div className="space-y-3 text-xs text-[#52525B]">
            <div>
              <strong className="text-[#18181B]">Essential Storage: </strong>
              We use browser LocalStorage to remember your selected currency preference (e.g. USD, GBP, EUR) and your temporary comparison tray list between page views.
            </div>
            <div>
              <strong className="text-[#18181B]">Outbound Affiliate Cookies: </strong>
              When you click on a retailer link (such as Amazon or Best Buy), the retailer’s website sets a standard cookie to credit our referral if you complete a qualifying purchase.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
