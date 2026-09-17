import React from 'react';
import { StoreSettings } from '../types';
import { ArrowUpRight, Instagram, Facebook, Youtube, Video } from 'lucide-react';

interface SocialSectionProps {
  settings: StoreSettings;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ settings }) => {
  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@gulmeli_collection',
      url: settings.socialLinks.instagram || 'https://instagram.com',
      icon: Instagram,
      color: 'from-[#833AB4] via-[#FD1D1D] to-[#FCB045]',
      desc: 'Daily drapes, customer fittings & BTS reels',
    },
    {
      name: 'TikTok',
      handle: '@gulmelicollection',
      url: settings.socialLinks.tiktok || 'https://tiktok.com',
      icon: Video,
      color: 'from-[#000000] via-[#00f2fe] to-[#fe0979]',
      desc: 'Trending styling tips & outfit reveals',
    },
    {
      name: 'Facebook',
      handle: 'Gulmeli Collection & Designing Center',
      url: settings.socialLinks.facebook || 'https://facebook.com',
      icon: Facebook,
      color: 'from-[#1877F2] to-[#0D65D9]',
      desc: 'Community updates, announcements & new arrivals',
    },
    {
      name: 'YouTube',
      handle: 'Gulmeli Collection Boutique',
      url: settings.socialLinks.youtube || 'https://youtube.com',
      icon: Youtube,
      color: 'from-[#FF0000] to-[#CC0000]',
      desc: 'In-depth tailoring guides & festive lookbooks',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7B1865]">
            CONNECT WITH US
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E152A] font-bold mt-1">
            Follow Our Journey
          </h2>
          <p className="text-sm text-[#6B6178] mt-2">
            Watch real customer fittings, new seasonal drops, and behind-the-scenes tailoring at our Ranibagiya studio.
          </p>
        </div>

        {/* 4 Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-5 border border-[#EDE0ED] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF0FA] text-[#7B1865] flex items-center justify-center group-hover:bg-[#7B1865] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8C7D99] group-hover:text-[#7B1865] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="font-bold text-sm text-[#1E152A]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#7B1865] font-semibold mt-0.5">
                    {item.handle}
                  </p>
                  <p className="text-xs text-[#6B6178] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5EBF5] text-[11px] font-bold text-[#7B1865] uppercase tracking-wider">
                  Join Community &rarr;
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
