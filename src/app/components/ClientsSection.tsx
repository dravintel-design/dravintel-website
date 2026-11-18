import { Reveal } from '@/app/components/dna/Reveal';

import amazingAddsLogo from '@/assets/d03755cc7b39b00b11f5ea044da7636315c4e01d.png';
import sukhamHandmadeLogo from '@/assets/d631cac07dfcf52815867a921408c163494fd8d2.png';
import toysColonyLogo from '@/assets/73891f7e22291fe159354326aa56baef8c672910.png';
import rajisKitchenLogo from '@/assets/be9116520b2ca48dc31a3c6f5c69dc14263f8cdf.png';

const clients = [
  { name: 'Amazing Adds', logo: amazingAddsLogo },
  { name: 'Sukham Handmade', logo: sukhamHandmadeLogo },
  { name: 'Toys Colony', logo: toysColonyLogo },
  { name: "Raji's Kitchen", logo: rajisKitchenLogo },
];

/** heading left, then a grid of dimmed white logos that brighten on hover. */
export function ClientsSection() {
  return (
    <section aria-labelledby="clients-title" className="relative dna-section">
      <div className="dna-container dna-gutter">
        <Reveal>
          <h2 id="clients-title" className="dna-h2 max-w-[30ch]">
            Working with clients who <span className="dv-hl">push boundaries</span> is what drives us.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="dna-lead mt-5 max-w-[52ch]">
            From startups to global names, each partnership inspires us to keep doing what we love.
          </p>
        </Reveal>
        <ul aria-label="Clients" className="mt-12 md:mt-16 grid grid-cols-2 items-center gap-x-8 gap-y-12 md:grid-cols-4">
          {clients.map((client, i) => (
            <li key={client.name} className="flex justify-center">
              <Reveal delay={i * 0.08}>
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-10 md:h-12 w-auto object-contain brightness-0 invert opacity-70 transition-opacity duration-300 hover:opacity-100"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
