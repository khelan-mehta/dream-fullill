
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <span className="gradient-text">Make Wishes</span> Come True
              </h1>
              <p className="max-w-[600px] text-wishes-gray text-xl md:text-2xl">
                Connect dreamers with generous souls. Post your wishes or fulfill someone else's.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="button-gradient text-white text-lg px-8 py-6">
                Make a Wish
              </Button>
              <Button variant="outline" className="text-wishes-purple border-wishes-purple hover:bg-wishes-purple/10 text-lg px-8 py-6">
                Grant a Wish
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-wishes-purple-light flex items-center justify-center text-white font-semibold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-wishes-gray">
                <span className="font-medium text-wishes-dark">1,200+</span> wishes fulfilled this month
              </div>
            </div>
          </div>
          <div className="relative mx-auto aspect-square lg:aspect-auto">
            <div className="absolute h-full w-full bg-gradient-to-r from-wishes-purple/20 to-wishes-peach/30 rounded-full blur-3xl opacity-50 animate-pulse-gentle"></div>
            <div className="relative flex items-center justify-center">
              <div className="absolute top-1/4 -left-4 h-40 w-40 rounded-xl bg-wishes-purple p-1 shadow-xl rotate-6 animate-float">
                <div className="h-full w-full bg-white rounded-lg p-4">
                  <div className="h-6 w-20 bg-wishes-purple/20 rounded mb-2"></div>
                  <div className="h-4 w-full bg-wishes-gray/20 rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-wishes-gray/20 rounded"></div>
                </div>
              </div>
              <div className="absolute top-1/3 right-4 h-48 w-48 rounded-xl bg-wishes-peach p-1 shadow-xl -rotate-3 animate-float" style={{ animationDelay: '1s' }}>
                <div className="h-full w-full bg-white rounded-lg p-4">
                  <div className="h-6 w-24 bg-wishes-purple/20 rounded mb-2"></div>
                  <div className="h-4 w-full bg-wishes-gray/20 rounded mb-2"></div>
                  <div className="h-4 w-5/6 bg-wishes-gray/20 rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-wishes-gray/20 rounded"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-10 h-44 w-44 rounded-xl bg-white p-1 shadow-xl rotate-12 animate-float" style={{ animationDelay: '2s' }}>
                <div className="h-full w-full bg-gradient-to-br from-wishes-purple-light to-wishes-purple rounded-lg p-4 text-white">
                  <div className="h-6 w-16 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 w-full bg-white/20 rounded mb-2"></div>
                  <div className="h-4 w-4/5 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
