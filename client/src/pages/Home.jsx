import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

// Enhanced feature list with animations
const features = [
  {
    name: 'AI Matching',
    description: 'Smart matching finds the best local talent for your job using skill, location and availability.',
    href: '/register',
    icon: <img src="/ai-matching.svg" alt="AI Matching" className="h-8 w-8 text-primary-400 animate-float-gentle" />,
    gradient: 'from-blue-500 to-cyan-500',
    delay: '0s',
  },
  {
    name: 'Verified Profiles',
    description: 'Profiles include ratings, portfolios and verified skills so you can hire with confidence.',
    href: '/register',
    icon: <img src="/verified-profiles.svg" alt="Verified Profiles" className="h-8 w-8 text-primary-400 animate-float-gentle" style={{ animationDelay: '1s' }} />,
    gradient: 'from-green-500 to-emerald-500',
    delay: '0.2s',
  },
  {
    name: 'Secure Payments',
    description: 'Integrated payment flows and escrow for safe, reliable hiring and payouts.',
    href: '/register',
    icon: <img src="/secure-payments.svg" alt="Secure Payments" className="h-8 w-8 text-primary-400 animate-float-gentle" style={{ animationDelay: '2s' }} />,
    gradient: 'from-purple-500 to-pink-500',
    delay: '0.4s',
  },
];

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const elements = [heroRef.current, featuresRef.current, ctaRef.current].filter(Boolean);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative isolate bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/8 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-400/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-secondary-500/6 rounded-full blur-2xl animate-float-gentle" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-accent-400/4 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Subtle particle overlay */}
      <div className="particles-container">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 6}s`,
            }}
          />
        ))}
      </div>

      {/* Hero section with enhanced animations */}
      <div className="relative pt-8" ref={heroRef}>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="lg:flex lg:items-center lg:gap-12">
                <div className="lg:flex-1 mx-auto max-w-2xl text-center lg:text-left animate-fade-in-up">
                  <h1 className="text-4xl font-bold tracking-tight text-dark-100 sm:text-6xl lg:text-7xl mt-0 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                    <span className="gradient-text animate-gradient-x animate-bounce-gentle">
                      Connect with Skilled
                    </span>
                    <br />
                    <span className="text-dark-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Professionals & Local</span>
                    <br />
                    <span className="glow-text animate-pulse" style={{ animationDelay: '0.3s' }}>Businesses</span>
                  </h1>
                  <p className="mt-8 text-xl leading-8 text-dark-300 animate-fade-in-up animate-typing" style={{ animationDelay: '0.4s' }}>
                    SkillLink AI matches skilled workers with local businesses using advanced AI technology.
                    Find the perfect match for your needs, whether you're looking for work or hiring.
                  </p>
                  <div className="mt-12 flex items-center justify-center gap-x-6 lg:justify-start animate-fade-in-up animate-stagger" style={{ animationDelay: '0.7s' }}>
                    <Link
                      to="/register"
                      className="group relative rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4 text-lg font-semibold text-white shadow-2xl shadow-primary-500/25 hover:shadow-primary-500/50 hover:scale-110 hover:rotate-1 transition-all duration-500 overflow-hidden animate-pulse-glow"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started
                        <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer" />
                      <div className="absolute inset-0 animate-shimmer opacity-20" />
                    </Link>
                    <Link
                      to="/register"
                      className="group text-lg font-semibold leading-6 text-dark-200 hover:text-primary-400 transition-all duration-500 flex items-center gap-2 hover:translate-x-3 hover:scale-105 animate-fade-in-right"
                    >
                      Learn more
                      <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300" />
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block lg:flex-1 animate-slide-in-right animate-bounce-in" style={{ animationDelay: '0.8s' }}>
                  <div className="relative group">
                    <img
                      src="/hero-illustration.svg"
                      alt="Hero illustration"
                      className="rounded-2xl shadow-2xl max-w-full hover-lift animate-float-gentle group-hover:scale-105 group-hover:rotate-2 transition-all duration-700"
                    />
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl animate-pulse group-hover:animate-spin-slow" />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 rounded-2xl animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features section */}
      <div className="py-24 sm:py-32 bg-gradient-to-b from-dark-800 to-dark-900 relative" ref={featuresRef}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 via-transparent to-accent-900/10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl lg:text-center animate-fade-in-up animate-zoom-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-base font-semibold leading-7 text-primary-400 animate-pulse animate-bounce-gentle">Fast & Efficient</h2>
            <p className="mt-4 text-4xl font-bold tracking-tight text-dark-100 sm:text-5xl animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              Everything you need to
              <span className="gradient-text animate-gradient-x animate-wiggle block">connect and grow</span>
            </p>
            <p className="mt-8 text-xl leading-8 text-dark-300 animate-fade-in-up animate-typing" style={{ animationDelay: '0.6s' }}>
              Our AI-powered platform makes it easy to find work or hire skilled professionals in your area.
            </p>
          </div>
          <div className="mx-auto mt-20 max-w-2xl sm:mt-24 lg:mt-28 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className="card-enhanced card-hover-enhanced animate-fade-in-up group"
                  style={{ animationDelay: feature.delay }}
                >
                  <dt className="flex items-center gap-x-4 text-lg font-semibold leading-7 text-dark-100 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <span className="group-hover:text-primary-400 transition-colors">{feature.name}</span>
                  </dt>
                  <dd className="flex flex-auto flex-col text-base leading-7 text-dark-300">
                    <p className="flex-auto mb-6">{feature.description}</p>
                    <p className="mt-auto">
                      <Link
                        to={feature.href}
                        className="group/link inline-flex items-center text-sm font-semibold leading-6 text-primary-400 hover:text-primary-300 transition-all duration-300 hover:translate-x-1"
                      >
                        Learn more
                        <ArrowRightIcon className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Enhanced CTA section */}
      <div className="relative isolate mt-0 px-6 py-32 sm:py-40 lg:px-8 bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800" ref={ctaRef}>
        <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
          <div className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-primary-500/30 to-accent-500/30 animate-pulse" />
        </div>
        <div className="mx-auto max-w-2xl text-center animate-fade-in-up animate-zoom-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl font-bold tracking-tight text-dark-100 sm:text-5xl mb-6 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            Ready to get started?
            <br />
            <span className="gradient-text animate-gradient-x animate-bounce-gentle">Join SkillLink AI today.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl leading-8 text-dark-300 animate-fade-in-up animate-typing" style={{ animationDelay: '0.6s' }}>
            Whether you're a skilled professional looking for work or a business needing talent,
            SkillLink AI has you covered.
          </p>
          <div className="mt-12 flex items-center justify-center gap-x-6 animate-fade-in-up animate-stagger" style={{ animationDelay: '0.8s' }}>
            <Link
              to="/register"
              className="group relative rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-primary-500/25 hover:shadow-primary-500/50 hover:scale-110 hover:rotate-1 transition-all duration-500 overflow-hidden animate-pulse-glow"
            >
              <span className="relative z-10 flex items-center gap-2">
                Create an account
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer" />
              <div className="absolute inset-0 animate-shimmer opacity-20" />
            </Link>
            <Link
              to="/register"
              className="group text-lg font-semibold leading-6 text-dark-200 hover:text-primary-400 transition-all duration-500 flex items-center gap-2 hover:translate-x-3 hover:scale-105 animate-fade-in-right"
            >
              Contact us
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
