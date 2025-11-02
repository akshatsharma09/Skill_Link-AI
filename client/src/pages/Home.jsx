import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// small feature list used by the home page (keeps the file self-contained)
const features = [
  {
    name: 'AI Matching',
    description: 'Smart matching finds the best local talent for your job using skill, location and availability.',
    href: '/about',
    icon: <img src="/ai-matching.svg" alt="AI Matching" className="h-6 w-6 text-primary-400" />,
  },
  {
    name: 'Verified Profiles',
    description: 'Profiles include ratings, portfolios and verified skills so you can hire with confidence.',
    href: '/about',
    icon: <img src="/verified-profiles.svg" alt="Verified Profiles" className="h-6 w-6 text-primary-400" />,
  },
  {
    name: 'Secure Payments',
    description: 'Integrated payment flows and escrow for safe, reliable hiring and payouts.',
    href: '/pricing',
    icon: <img src="/secure-payments.svg" alt="Secure Payments" className="h-6 w-6 text-primary-400" />,
  },
];

const Home = () => {
  return (
    <div className="relative isolate bg-dark-900">
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="lg:flex lg:items-center lg:gap-12">
                <div className="lg:flex-1 mx-auto max-w-2xl text-center lg:text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-dark-100 sm:text-6xl">
                    Connect with Skilled Professionals & Local Businesses
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-dark-300">
                    SkillLink AI matches skilled workers with local businesses using advanced AI technology.
                    Find the perfect match for your needs, whether you're looking for work or hiring.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                    <Link
                      to="/register"
                      className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      Get Started
                    </Link>
                    <Link to="/about" className="text-sm font-semibold leading-6 text-dark-200 hover:text-dark-100">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block lg:flex-1">
                  <img src="/hero-illustration.svg" alt="Hero illustration" className="rounded-lg shadow-xl max-w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 sm:py-32 bg-dark-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-400">Fast & Efficient</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-dark-100 sm:text-4xl">
              Everything you need to connect and grow
            </p>
            <p className="mt-6 text-lg leading-8 text-dark-300">
              Our AI-powered platform makes it easy to find work or hire skilled professionals in your area.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-dark-100">
                    {feature.icon}
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-dark-300">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <Link to={feature.href} className="text-sm font-semibold leading-6 text-primary-400 hover:text-primary-300">
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8 bg-dark-800">
        <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
          <div className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-primary-500 to-primary-300" />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark-100 sm:text-4xl">
            Ready to get started?
            <br />
            Join SkillLink AI today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-dark-300">
            Whether you're a skilled professional looking for work or a business needing talent,
            SkillLink AI has you covered.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/register"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Create an account
            </Link>
            <Link to="/contact" className="text-sm font-semibold leading-6 text-dark-200 hover:text-dark-100">
              Contact us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;