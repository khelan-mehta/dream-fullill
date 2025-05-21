
const Footer = () => {
  return (
    <footer className="bg-white border-t py-12 mt-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-wishes-purple to-wishes-purple-light flex items-center justify-center text-white font-bold">
                W
              </div>
              <span className="font-semibold text-xl">Wishes</span>
            </div>
            <p className="text-wishes-gray">
              Connecting dreamers with generous hearts since 2025.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">Home</a></li>
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">Browse Wishes</a></li>
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">About Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">How It Works</a></li>
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">FAQ</a></li>
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">Email Us</a></li>
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">Support</a></li>
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">Partnerships</a></li>
              <li><a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-wishes-gray text-sm">
            &copy; {new Date().getFullYear()} Wishes. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">
              <span className="sr-only">Facebook</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">
              <span className="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-wishes-gray hover:text-wishes-dark transition-colors">
              <span className="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
