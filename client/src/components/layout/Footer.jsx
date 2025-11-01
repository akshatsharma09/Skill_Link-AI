import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SkillLink AI</h3>
            <p className="text-gray-400">
              Connecting skilled workers with local businesses through AI-powered matching.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">For Workers</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Find Jobs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Skill Assessment</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Training Resources</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">For Businesses</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Post Jobs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Find Workers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Business Solutions</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: support@skilllink.ai</li>
              <li className="text-gray-400">Phone: +91 (XXX) XXX-XXXX</li>
              <li className="text-gray-400">Address: Your City, Country</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} SkillLink AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;