import React from "react";
import { Mail, MapPin, Clock, Phone } from "lucide-react";
import { Locale, Profile, SiteSettings } from "@/types/database";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  CalBookingButton,
  CalInlineEmbed,
} from "@/components/booking/CalBookingModal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getDictionary, localizeField } from "@/lib/i18n/dictionaries";

interface ContactViewProps {
  profile: Profile;
  settings: SiteSettings;
  locale: Locale;
}

export function ContactView({ profile, settings, locale }: ContactViewProps) {
  const dict = getDictionary(locale);

  const contactEmail = settings.contact_email || profile.email;
  const contactLocation =
    locale === "fr" && profile.location_fr
      ? profile.location_fr
      : settings.contact_location || profile.location;
  const contactPhone = settings.contact_phone || "";
  const responseTime =
    localizeField(settings, "response_time", locale) || "Within 24–48 hours";
  const contactEyebrow =
    localizeField(settings, "contact_eyebrow", locale) || "Open for Work";
  const contactHeading =
    localizeField(settings, "contact_heading", locale) || "Let's Build Together";
  const contactDescription =
    localizeField(settings, "contact_description", locale) ||
    "Whether you have a complex AI system to architect, a full-stack product to build, or a design identity to create — every great collaboration starts with a single message.";
  const availabilityHeadline =
    localizeField(settings, "availability_headline", locale) ||
    "Available for Select Projects";
  const availabilityDescription =
    localizeField(settings, "availability_description", locale) ||
    "I'm taking on new collaborations — AI architecture, full-stack builds, and editorial design commissions.";

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                  {contactEyebrow}
                </span>
                <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-[#201a16] leading-tight">
                  {contactHeading}
                </h1>
                <p className="text-base text-[#634f43] leading-relaxed">
                  {contactDescription}
                </p>
              </div>
            </ScrollReveal>

            {/* Contact Details */}
            <ScrollReveal direction="up" delay={150}>
              <div className="space-y-4 pt-2">
                {contactEmail && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#7d6657] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono text-[#7d6657] uppercase tracking-wider mb-0.5">
                        {dict.contact.emailLabel}
                      </p>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-sm font-medium text-[#201a16] hover:text-[#634f43] transition-colors"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>
                )}
                {contactPhone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#7d6657] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono text-[#7d6657] uppercase tracking-wider mb-0.5">
                        {dict.contact.phoneLabel}
                      </p>
                      <a
                        href={`tel:${contactPhone}`}
                        className="text-sm font-medium text-[#201a16] hover:text-[#634f43] transition-colors"
                      >
                        {contactPhone}
                      </a>
                    </div>
                  </div>
                )}
                {contactLocation && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#7d6657] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono text-[#7d6657] uppercase tracking-wider mb-0.5">
                        {dict.contact.locationLabel}
                      </p>
                      <p className="text-sm font-medium text-[#201a16]">
                        {contactLocation}
                      </p>
                    </div>
                  </div>
                )}
                {responseTime && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#7d6657] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono text-[#7d6657] uppercase tracking-wider mb-0.5">
                        {dict.contact.responseTimeLabel}
                      </p>
                      <p className="text-sm font-medium text-[#201a16]">
                        {responseTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Availability Card */}
            <ScrollReveal direction="up" delay={250}>
              <div className="p-5 bg-[#faf8f5] border border-[#e8e2d9] rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      profile.available_for_work
                        ? "bg-[#7d6657] animate-pulse"
                        : "bg-[#c7b49e]"
                    }`}
                  />
                  <span className="text-sm font-medium text-[#201a16]">
                    {profile.available_for_work
                      ? availabilityHeadline
                      : dict.contact.currentlyBooked}
                  </span>
                </div>
                <p className="text-xs text-[#634f43] leading-relaxed">
                  {profile.available_for_work
                    ? availabilityDescription
                    : dict.contact.bookedDescription}
                </p>
                <div className="pt-4 mt-4 border-t border-[#e8e2d9]">
                  <CalBookingButton
                    calUrl={settings.cal_com_url}
                    label={dict.nav.bookCall}
                    variant="primary"
                    locationTag="contact_sidebar"
                    className="w-full justify-center"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Form & Cal.com Inline Widget */}
          <div className="lg:col-span-3 space-y-8">
            <ScrollReveal direction="left" delay={180}>
              <div className="bg-[#faf8f5] border border-[#e8e2d9] rounded-2xl p-6 md:p-8">
                <h2 className="font-serif text-xl font-medium text-[#201a16] mb-6">
                  {dict.contact.sendMessageTitle}
                </h2>
                <ContactForm locale={locale} />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={260}>
              <CalInlineEmbed
                calUrl={settings.cal_com_url}
                title={dict.contact.bookCallTitle}
                subtitle={dict.contact.bookCallSubtitle}
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

