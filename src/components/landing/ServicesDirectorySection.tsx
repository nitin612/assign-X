import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';
import type { WorkCategory } from '../../types';

interface ServiceGroup {
  id: string;
  categoryName: string;
  mappedCategory: WorkCategory;
  tags: string[];
  description: string;
}

export const ServicesDirectorySection: React.FC = () => {
  const { navigate } = useNavigation();
  const { login } = useApp();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleLaunchService = (category: WorkCategory, _specificTag?: string) => {
    login();
    navigate('/create', { category });
  };

  const services: ServiceGroup[] = [
    {
      id: 'digital-solutions',
      categoryName: 'DIGITAL SOLUTIONS',
      mappedCategory: 'Website Development',
      tags: [
        'Landing Pages',
        'Emerging Tech',
        'Services',
        'Business Websites',
        'SaaS Platforms',
        'Online Stores'
      ],
      description:
        'We design and build digital products that simplify complexity whether it’s a fast-growing startup or an established business. Our approach blends strategy, design, and technology.'
    },
    {
      id: 'innovation-tech',
      categoryName: 'INNOVATION & TECH',
      mappedCategory: 'Backend & APIs',
      tags: [
        'Interactive Experiences',
        'AI Tools',
        'Services',
        'Web Applications',
        'Automation',
        'Online Stores'
      ],
      description:
        'We explore new technologies to create engaging, forward-thinking solutions. From intelligent systems to interactive experiences.'
    },
    {
      id: 'design-branding',
      categoryName: 'DESIGN & BRANDING',
      mappedCategory: 'UI/UX Design',
      tags: [
        'UI/UX in Figma',
        '3D & Motion',
        'Brand Identity',
        'Interactive Prototypes',
        'Design Systems',
        'Visual Assets'
      ],
      description:
        'Crafting intuitive user interfaces and scalable design languages. We build component libraries, interactive prototypes, and production visuals that convert.'
    },
    {
      id: 'mobile-applications',
      categoryName: 'MOBILE APPLICATIONS',
      mappedCategory: 'Mobile Apps',
      tags: [
        'iOS & Android Native',
        'React Native',
        'Flutter Apps',
        'Mobile MVPs',
        'App Store Ready',
        'Offline Sync'
      ],
      description:
        'Native-grade mobile experiences engineered for performance and fluid gestures. Supervised from architecture planning to verified store deployment.'
    },
    {
      id: 'growth-strategy',
      categoryName: 'GROWTH & STRATEGY',
      mappedCategory: 'SEO & Marketing',
      tags: [
        'SEO Funnels',
        'Conversion Audits',
        'High-Converting Copy',
        'Performance Speed',
        'Analytics Setup',
        'Campaign Assets'
      ],
      description:
        'Maximize business traction and discovery. We optimize technical search rankings, eliminate conversion friction, and build scalable growth funnels.'
    }
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF8F5] dark:bg-[#000000] text-slate-950 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* ─────────────────────────────────────────────────────────────
            Section Header — Headline & Subtitle Matching Priora Theme
           ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium text-slate-950 dark:text-white tracking-tight leading-[1.15]">
              Get more services done with doers
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right pb-1">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
              Turn tasks into completed milestones — from web development and mobile apps to AI workflows and design.
            </p>
          </div>
        </div>

        {/* Top Dividing Rule */}
        <div className="w-full h-px bg-slate-200/90 dark:bg-white/10 mb-10 sm:mb-14" />

        {/* ─────────────────────────────────────────────────────────────
            Services Grid Rows (Matching Reference Image 1:1)
           ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col divide-y divide-slate-200/90 dark:divide-white/10">
          {services.map((service) => (
            <div
              key={service.id}
              className="py-10 sm:py-14 first:pt-0 last:pb-4 group transition-all duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* ── Left Column: Category Title (lg: 4 cols) ── */}
                <div className="lg:col-span-4">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white uppercase leading-tight group-hover:text-[#EE6B50] transition-colors">
                    {service.categoryName}
                  </h3>
                </div>

                {/* ── Middle Column: Capsule Tags + Description (lg: 5 cols) ── */}
                <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
                  {/* Capsule / Pill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tIdx) => {
                      const isSelected = activeTag === tag;
                      return (
                        <button
                          key={tIdx}
                          onClick={() => {
                            setActiveTag(tag);
                            handleLaunchService(service.mappedCategory, tag);
                          }}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${isSelected
                              ? 'bg-[#EE6B50] text-white'
                              : 'bg-[#18181B] dark:bg-[#1E1E24] text-white dark:text-zinc-200 border border-black/5 dark:border-white/10 hover:bg-[#EE6B50] dark:hover:bg-[#EE6B50] hover:text-white'
                            }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                </div>

                {/* ── Right Column: Launch Your Project Pill Button (lg: 3 cols) ── */}
                <div className="lg:col-span-3 flex justify-start sm:justify-start lg:justify-end items-center pt-2 lg:pt-0">
                  <button
                    onClick={() => handleLaunchService(service.mappedCategory)}
                    className="group/btn inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-transparent border border-slate-950 dark:border-white text-slate-950 dark:text-white hover:bg-[#EE6B50] hover:border-[#EE6B50] hover:text-white dark:hover:bg-[#EE6B50] dark:hover:border-[#EE6B50] text-xs sm:text-sm font-semibold transition-all duration-300 shadow-2xs hover:shadow-[0_6px_20px_rgba(238,107,80,0.35)] cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    <span>Launch your project</span>
                    <ArrowUpRight
                      size={15}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
