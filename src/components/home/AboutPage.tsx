import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Leaf, Users } from 'lucide-react';

const team = [
  {
    name: 'Sophie Laurent',
    role: 'Head Pastry Chef & Founder',
    bio: 'Trained at Le Cordon Bleu Paris, Sophie brings 15 years of artisan baking to every creation at Sweet Crumbs.',
    emoji: '👩‍🍳',
    color: '#FFD0DC',
  },
  {
    name: 'Marcus Chen',
    role: 'Head Baker',
    bio: 'A sourdough obsessive and bread artisan, Marcus has been perfecting our bread programme since 2016.',
    emoji: '🧑‍🍳',
    color: '#FFE4D6',
  },
  {
    name: 'Amelia Rose',
    role: 'Cake Designer',
    bio: 'Amelia transforms sugar and flour into edible art. Her floral cakes have been featured in Vogue and Brides magazine.',
    emoji: '👩‍🎨',
    color: '#FFCAB4',
  },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#FFF8F0' }}>
      {/* Hero */}
      <section className="relative overflow-hidden mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center py-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <p className="accent-text text-2xl mb-2">Our Story</p>
            <h1 className="section-heading mb-6">Baked in Brooklyn, <span style={{ color: '#FF94AF' }}>loved everywhere.</span></h1>
            <p className="text-base leading-relaxed mb-5" style={{ color: '#8B5E5E' }}>
              Sweet Crumbs began in 2014 with a small kitchen, a 7-year-old sourdough starter brought back from Paris, and an obsessive desire to bake the best croissant Brooklyn had ever tasted.
            </p>
            <p className="text-base leading-relaxed mb-5" style={{ color: '#8B5E5E' }}>
              What started as a Saturday farmer's market stall became a neighbourhood institution. Today, we serve hundreds of customers every day from our brick-and-mortar bakery on Blossom Lane, with the same commitment to craft, quality, and seasonal ingredients we had on day one.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#8B5E5E' }}>
              Every recipe is tested dozens of times before it reaches you. Every ingredient is chosen with intention. Every item is made by hand, every morning, starting at 5am.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="rounded-3xl overflow-hidden h-60 shadow-bakery-lg">
              <img src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80" alt="Bakery" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden h-60 shadow-bakery-lg mt-8">
              <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80" alt="Croissants" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden h-44 shadow-bakery-lg">
              <img src="https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400&q=80" alt="Cake" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden h-44 shadow-bakery-lg mt-4">
              <img src="https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&q=80" alt="Macarons" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 px-4 sm:px-6 mb-16" style={{ background: 'linear-gradient(135deg, #FFE4D6, #FFD0DC)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="accent-text text-2xl mb-1">What we believe in</p>
            <h2 className="section-heading">Our values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Heart, title: 'Craft over convenience', desc: 'We never cut corners. Every laminated dough is hand-folded. Every custard is made on the stove.' },
              { Icon: Leaf, title: 'Seasonal & local', desc: 'We work with local farms to source the best seasonal produce. When peaches are ripe, we bake peach tarts.' },
              { Icon: Users, title: 'Community first', desc: 'We donate day-old bread to local food banks every evening. Sweet Crumbs belongs to the neighbourhood.' },
              { Icon: Award, title: 'Always improving', desc: 'We are never satisfied. We are always tasting, refining, and looking for the next step in our craft.' },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.7)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'white' }}>
                  <Icon size={20} style={{ color: '#FF94AF' }} />
                </div>
                <h3 className="font-display font-semibold mb-2" style={{ color: '#3D1C1C' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8B5E5E' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-4 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="accent-text text-2xl mb-1">The people behind your pastries</p>
          <h2 className="section-heading">Meet the team</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-5 text-5xl shadow-bakery-lg"
                style={{ background: member.color }}>
                {member.emoji}
              </div>
              <h3 className="font-display font-bold text-xl mb-1" style={{ color: '#3D1C1C' }}>{member.name}</h3>
              <p className="text-sm font-medium mb-3" style={{ color: '#FF94AF' }}>{member.role}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#8B5E5E' }}>{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bakery photos */}
      <section className="mt-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="section-heading text-center mb-8">Inside our kitchen</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=400&q=80',
            'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80',
            'https://images.unsplash.com/photo-1612203985729-70726954388c?w=400&q=80',
            'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden aspect-square shadow-bakery hover:shadow-bakery-lg transition-shadow duration-300"
            >
              <img src={src} alt="Bakery kitchen" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
