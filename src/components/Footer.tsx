import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">College Discovery</h3>
            <p className="text-sm text-gray-400">
              Helping students find and compare colleges to make informed decisions.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/colleges" className="hover:text-primary">Colleges</Link></li>
              <li><Link href="/compare" className="hover:text-primary">Compare</Link></li>
              <li><Link href="/predict" className="hover:text-primary">Predictor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary">About</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Github size={20} className="cursor-pointer hover:text-primary" />
              <Twitter size={20} className="cursor-pointer hover:text-primary" />
              <Linkedin size={20} className="cursor-pointer hover:text-primary" />
              <Mail size={20} className="cursor-pointer hover:text-primary" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
