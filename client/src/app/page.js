"use client"
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-black min-h-screen text-black">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-white font-bold text-xl">
            BudgetBuddy
          </Link>
          <Link href="/signin">
            <Button 
              className="bg-white text-green-800 hover:bg-gray-100 font-semibold rounded-full shadow-lg"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white text-center py-52 ">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl font-extrabold">Master Your Finances Effortlessly</h1>
            <p className="text-lg mt-4 max-w-2xl mx-auto">
              BudgetBuddy helps you track income, expenses, loans, savings, and budgets with modern simplicity.
            </p>
            <div className="mt-8 flex justify-center gap-6">
              <Button className="bg-white text-green-800 px-8 py-3 font-semibold rounded-full shadow-lg hover:bg-gray-100">
                Get Started Now
              </Button>
              <Button className="bg-black text-white px-8 py-3 font-semibold rounded-full shadow-lg hover:bg-gray-800">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-x-0 bottom-[-5rem] mx-auto w-11/12 max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/hero-dashboard.png"
            alt="Dashboard Preview"
            className="rounded-3xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-green-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-green-700">Smart Features for Financial Freedom</h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            From tracking income to setting savings goals, BudgetBuddy simplifies every aspect of your financial life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {[
              { title: "Track Your Income", desc: "Visualize all earnings with detailed breakdowns." },
              { title: "Manage Expenses", desc: "Stay on top of spending with categorized insights." },
              { title: "Set Savings Goals", desc: "Achieve targets faster with guided savings plans." },
              { title: "Monitor Loans", desc: "Track repayments and manage debt effectively." },
              { title: "Plan Budgets", desc: "Stay on track with dynamic budgeting tools." },
              { title: "Analytics Dashboard", desc: "Gain clarity with real-time insights." },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white shadow-xl rounded-3xl transform hover:scale-105 transition duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={24} /> {feature.title}
                  </h3>
                  <p className="text-gray-600 mt-3">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="bg-black text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Experience BudgetBuddy in Action</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Explore our sleek, intuitive dashboard designed for your convenience.
          </p>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/demo-dashboard.png"
              alt="App Demo"
              className="rounded-3xl shadow-lg mx-auto w-full md:w-3/4 lg:w-1/2"
            />
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-700 text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-extrabold">Achieve Financial Clarity Today</h2>
          <p className="text-lg mt-4">Join the thousands already transforming their financial lives.</p>
          <Button className="mt-8 bg-white text-green-700 px-8 py-3 font-semibold rounded-full shadow-lg hover:bg-gray-100">
            Get Started for Free <ArrowRight className="inline ml-2" size={20} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-black to-green-800 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} BudgetBuddy. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-green-400 hover:text-green-200">About</a>
            <a href="#" className="text-green-400 hover:text-green-200">Features</a>
            <a href="#" className="text-green-400 hover:text-green-200">Support</a>
            <a href="#" className="text-green-400 hover:text-green-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;