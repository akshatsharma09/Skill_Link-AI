import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-900 text-dark-100 py-8 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark-100">SkillLink AI</h3>
            <p className="text-dark-400">
              Connecting skilled workers with local businesses through AI-powered matching.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-dark-100">For Workers</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-dark-400 hover:text-dark-200 transition-colors">Find Jobs</a>
              </li>
              <li>
                <a href="#" className="text-dark-400 hover:text-dark-200 transition-colors">Skill Assessment</a>
              </li>
              <li>
                <a href="#" className="text-dark-400 hover:text-dark-200 transition-colors">Training Resources</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-dark-100">For Businesses</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-dark-400 hover:text-dark-200 transition-colors">Post Jobs</a>
              </li>
              <li>
                <a href="#" className="text-dark-400 hover:text-dark-200 transition-colors">Find Workers</a>
              </li>
              <li>
                <a href="#" className="text-dark-400 hover:text-dark-200 transition-colors">Business Solutions</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-dark-100">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-dark-400">Email: support@skilllink.ai</li>
              <li className="text-dark-400">Phone: +91 (XXX) XXX-XXXX</li>
              <li className="text-dark-400">Address: Your City, Country</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-700">
          <p className="text-center text-dark-400">
            © {new Date().getFullYear()} SkillLink AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;