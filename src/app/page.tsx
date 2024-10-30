import { Button } from "@/components/ui/button";
import { BarChart, Battery, Star, Zap } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Revolutionize Your Energy with Solar Power
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Streamline your solar panel installation and hardware
                  procurement with our all-in-one SaaS solution.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/product"}>
                  <Button>Get Started</Button>
                </Link>
                <Link href={"/about"}>
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Battery className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Energy Storage Solutions</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Efficient battery systems for 24/7 power availability.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <BarChart className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Performance Monitoring</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Real-time analytics to optimize your solar system.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Zap className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Smart Grid Integration</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Seamlessly connect to the modern energy infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-white">
                  1
                </div>
                <h3 className="text-xl font-bold">Consultation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We assess your energy needs and site conditions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-white">
                  2
                </div>
                <h3 className="text-xl font-bold">Design & Planning</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our experts create a custom solar solution for you.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-white">
                  3
                </div>
                <h3 className="text-xl font-bold">Installation & Support</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We install your system and provide ongoing support.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Customers Say
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col space-y-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-950"
                >
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    "Exergi has transformed our energy consumption. The
                    installation was smooth, and the ongoing support is
                    exceptional."
                  </p>
                  <p className="font-semibold">- Happy Customer {i}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Harness the Power of the Sun?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied customers who have made the switch
                  to clean, renewable energy.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By subscribing, you agree to our terms and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
