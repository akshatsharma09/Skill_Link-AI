import React from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  CodeBracketIcon,
  PencilSquareIcon,
  MegaphoneIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  CogIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  CpuChipIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

// Mock data
const topSkills = [
  {
    title: 'Web Development',
    description: 'Build modern websites and web applications',
    icon: CodeBracketIcon,
  },
  {
    title: 'Graphic Design',
    description: 'Create stunning visuals and branding',
    icon: PencilSquareIcon,
  },
  {
    title: 'Digital Marketing',
    description: 'Grow your business online',
    icon: MegaphoneIcon,
  },
  {
    title: 'UI/UX Design',
    description: 'Design user-friendly interfaces',
    icon: DevicePhoneMobileIcon,
  },
  {
    title: 'Content Writing',
    description: 'Craft compelling content',
    icon: DocumentTextIcon,
  },
  {
    title: 'Project Management',
    description: 'Lead projects to success',
    icon: CogIcon,
  },
];

const topFreelancers = [
  {
    name: 'Sarah Johnson',
    role: 'Full Stack Developer',
    rating: 4.9,
    avatar: '/api/placeholder/64/64',
    skills: ['React', 'Node.js', 'Python'],
  },
  {
    name: 'Mike Chen',
    role: 'UI/UX Designer',
    rating: 4.8,
    avatar: '/api/placeholder/64/64',
    skills: ['Figma', 'Adobe XD', 'Sketch'],
  },
  {
    name: 'Emily Davis',
    role: 'Content Writer',
    rating: 4.7,
    avatar: '/api/placeholder/64/64',
    skills: ['SEO', 'Copywriting', 'Blogging'],
  },
];

const howItWorks = [
  {
    title: 'Find Your Perfect Match',
    description: 'Our AI analyzes your requirements and matches you with the best freelancers',
    icon: UserGroupIcon,
  },
  {
    title: 'Collaborate & Create',
    description: 'Work together seamlessly with built-in communication tools',
    icon: CheckCircleIcon,
  },
  {
    title: 'Deliver & Grow',
    description: 'Complete projects successfully and build your reputation',
    icon: TruckIcon,
  },
];

const testimonials = [
  {
    quote: 'SkillLink AI helped me find amazing talent for my startup. The AI matching is incredibly accurate!',
    name: 'John Smith',
    role: 'CEO, TechStartup Inc.',
  },
  {
    quote: 'As a freelancer, I love how easy it is to find projects that match my skills. Highly recommended!',
    name: 'Lisa Wong',
    role: 'Freelance Designer',
  },
  {
    quote: 'The platform is intuitive and the support team is fantastic. Great experience overall.',
    name: 'David Brown',
    role: 'Project Manager',
  },
];

const HomePage = () => {
  return (
    <div className="font-['Inter'] bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect Skills with Opportunities using AI
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover the perfect freelancers for your projects with our advanced AI-powered matching system.
            Find talent that fits your needs, budget, and timeline.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white rounded-full shadow-md p-2">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Search for skills, location, category..."
                className="flex-1 px-4 py-3 rounded-full focus:outline-none text-gray-700"
              />
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 mr-2">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Top Skills */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore Top Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topSkills.map((skill, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <skill.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">{skill.title}</h3>
                </div>
                <p className="text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Top Freelancers */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Top Freelancers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topFreelancers.map((freelancer, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <img src={freelancer.avatar} alt={freelancer.name} className="w-16 h-16 rounded-full" />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">{freelancer.name}</h3>
                    <p className="text-gray-600">{freelancer.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`h-5 w-5 ${i < Math.floor(freelancer.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-gray-600">{freelancer.rating}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Skill_Link AI Works */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Skill_Link AI Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Ideas into Reality?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers and businesses already using Skill_Link AI to find their perfect match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-300"
            >
              Join as Freelancer
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
            >
              Hire Talent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
