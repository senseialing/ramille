import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

export function TrustFeatures() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      desc: 'On orders over Rp 500.000',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      desc: '100% safe & trusted Midtrans',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      desc: 'Hassle free within 7 days',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      desc: "We're here to help anytime",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-[#FAF7F2] border border-[#E3DBD0] rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#EDE7DE] flex items-center justify-center text-[#8A6B4F] shrink-0">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1E1A17]">{item.title}</h4>
                  <p className="text-xs text-[#70655B] mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
