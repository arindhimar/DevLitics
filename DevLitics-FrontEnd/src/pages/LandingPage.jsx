"use client"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { useTheme } from "next-themes"
import {
    BarChart,
    Code2,
    GitBranch,
    LineChart,
    Users,
    Zap,
    Star,
    CheckCircle,
    ArrowRight,
    Globe,
    Timer,
    Shield,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function LandingPage() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <LineChart className="h-6 w-6" />
                        <span className="text-xl font-bold">DevLitics</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#features" className="text-sm font-medium hover:text-primary">
                            Features
                        </a>
                        <a href="#testimonials" className="text-sm font-medium hover:text-primary">
                            Testimonials
                        </a>
                        <a href="#pricing" className="text-sm font-medium hover:text-primary">
                            Pricing
                        </a>
                        <a href="#faq" className="text-sm font-medium hover:text-primary">
                            FAQ
                        </a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                            {theme === "dark" ? "🌞" : "🌙"}
                        </Button>
                        <Button>Get Started</Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container px-4 py-24 md:py-32">
                <div className="flex flex-col items-center text-center gap-8">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                        🚀 <span className="ml-2">Trusted by over 10,000 developers</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Track Your Coding Journey in
                        <span className="text-primary"> Real-Time</span>
                    </h1>
                    <p className="max-w-[700px] text-lg text-muted-foreground">
                        DevLitics helps you monitor coding activity, compare changes, and connect with the perfect opportunities
                        through comprehensive analytics.
                    </p>
                    <div className="flex gap-4">
                        <Button size="lg">Start Free Trial</Button>
                        <Button size="lg" variant="outline">
                            View Demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container px-4 py-12 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <StatCard number="10K+" label="Active Users" />
                    <StatCard number="1M+" label="Code Changes Tracked" />
                    <StatCard number="50+" label="IDE Integrations" />
                    <StatCard number="99.9%" label="Uptime" />
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="container px-4 py-24">
                <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<Code2 className="h-8 w-8" />}
                        title="Code Analysis"
                        description="Compare and track code changes over time with detailed insights and summaries."
                    />
                    <FeatureCard
                        icon={<GitBranch className="h-8 w-8" />}
                        title="GitHub Integration"
                        description="Seamlessly connect with GitHub repositories to track your development progress."
                    />
                    <FeatureCard
                        icon={<BarChart className="h-8 w-8" />}
                        title="Real-time Leaderboard"
                        description="Track daily coding activity and compare progress with other developers."
                    />
                    <FeatureCard
                        icon={<Zap className="h-8 w-8" />}
                        title="IDE Extensions"
                        description="Integrate with your favorite IDEs and development tools for better tracking."
                    />
                    <FeatureCard
                        icon={<Users className="h-8 w-8" />}
                        title="Team Collaboration"
                        description="Connect with colleges and companies to find the perfect opportunities."
                    />
                    <FeatureCard
                        icon={<LineChart className="h-8 w-8" />}
                        title="Analytics Dashboard"
                        description="Comprehensive analytics and insights to improve your coding productivity."
                    />
                </div>
            </section>

            {/* How It Works */}
            <section className="container px-4 py-24 border-t">
                <h2 className="text-3xl font-bold text-center mb-16">How DevLitics Works</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                            1
                        </div>
                        <h3 className="text-xl font-semibold">Connect Your Tools</h3>
                        <p className="text-muted-foreground">
                            Integrate with your favorite IDEs, GitHub repositories, and development tools.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                            2
                        </div>
                        <h3 className="text-xl font-semibold">Track Progress</h3>
                        <p className="text-muted-foreground">
                            Monitor your coding activity, changes, and improvements in real-time.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                            3
                        </div>
                        <h3 className="text-xl font-semibold">Gain Insights</h3>
                        <p className="text-muted-foreground">
                            Get detailed analytics and recommendations to improve your development workflow.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="container px-4 py-24 border-t">
                <h2 className="text-3xl font-bold text-center mb-12">What Developers Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <TestimonialCard
                        quote="DevLitics has completely transformed how I track my coding progress. The insights are invaluable."
                        author="Sarah Chen"
                        role="Senior Developer"
                    />
                    <TestimonialCard
                        quote="The real-time analytics and GitHub integration make it super easy to monitor team productivity."
                        author="Michael Rodriguez"
                        role="Tech Lead"
                    />
                    <TestimonialCard
                        quote="As a coding bootcamp instructor, DevLitics helps me track student progress effectively."
                        author="James Wilson"
                        role="Lead Instructor"
                    />
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="container px-4 py-24 border-t">
                <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
                <p className="text-center text-muted-foreground mb-12">Choose the plan that's right for you or your team</p>
                <div className="grid md:grid-cols-3 gap-8">
                    <PricingCard
                        title="Starter"
                        price="Free"
                        description="Perfect for individual developers"
                        features={["Basic analytics", "GitHub integration", "Personal dashboard", "Community support"]}
                    />
                    <PricingCard
                        title="Pro"
                        price="$19"
                        description="For serious developers"
                        features={[
                            "Advanced analytics",
                            "All integrations",
                            "Team collaboration",
                            "Priority support",
                            "Custom reports",
                        ]}
                        popular
                    />
                    <PricingCard
                        title="Enterprise"
                        price="Custom"
                        description="For large teams"
                        features={[
                            "Everything in Pro",
                            "Custom integrations",
                            "Dedicated support",
                            "SLA guarantee",
                            "Advanced security",
                        ]}
                    />
                </div>
            </section>

            {/* Integration Partners */}
            <section className="container px-4 py-24 border-t">
                <h2 className="text-3xl font-bold text-center mb-12">Integration Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                    <div className="h-12 w-full flex items-center justify-center">
                        <img src="/placeholder.svg?height=48&width=120" alt="Partner 1" className="max-h-12" />
                    </div>
                    <div className="h-12 w-full flex items-center justify-center">
                        <img src="/placeholder.svg?height=48&width=120" alt="Partner 2" className="max-h-12" />
                    </div>
                    <div className="h-12 w-full flex items-center justify-center">
                        <img src="/placeholder.svg?height=48&width=120" alt="Partner 3" className="max-h-12" />
                    </div>
                    <div className="h-12 w-full flex items-center justify-center">
                        <img src="/placeholder.svg?height=48&width=120" alt="Partner 4" className="max-h-12" />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="container px-4 py-24 border-t">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does DevLitics track my coding activity?</AccordionTrigger>
                        <AccordionContent>
                            DevLitics integrates with your IDE and version control systems to track changes, time spent coding, and
                            other metrics in real-time, providing comprehensive insights into your development workflow.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is my code secure with DevLitics?</AccordionTrigger>
                        <AccordionContent>
                            We take security seriously. DevLitics only tracks metadata and statistics about your coding activity,
                            never your actual code. All data is encrypted and stored securely.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can I use DevLitics with my team?</AccordionTrigger>
                        <AccordionContent>
                            Yes! Our Pro and Enterprise plans include team collaboration features, allowing you to track team
                            productivity, share insights, and improve overall development efficiency.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Which IDEs are supported?</AccordionTrigger>
                        <AccordionContent>
                            DevLitics supports all major IDEs including VS Code, IntelliJ, Eclipse, and many more through our
                            extensive plugin ecosystem.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            {/* Newsletter */}
            <section className="container px-4 py-24 border-t">
                <div className="rounded-lg bg-primary/5 p-8">
                    <div className="flex flex-col items-center text-center gap-6">
                        <h2 className="text-3xl font-bold">Stay Updated</h2>
                        <p className="max-w-[600px] text-muted-foreground">
                            Subscribe to our newsletter for the latest features, tips, and development insights.
                        </p>
                        <div className="flex w-full max-w-sm gap-2">
                            <Input type="email" placeholder="Enter your email" />
                            <Button>Subscribe</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container px-4 py-24 border-t">
                <div className="rounded-lg bg-primary/5 p-8">
                    <div className="flex flex-col items-center text-center gap-6">
                        <h2 className="text-3xl font-bold">Ready to Level Up Your Development?</h2>
                        <p className="max-w-[600px] text-muted-foreground">
                            Join thousands of developers who are already tracking and improving their coding journey with DevLitics.
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg">Get Started Now</Button>
                            <Button size="lg" variant="outline">
                                Schedule Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t">
                <div className="container px-4 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <LineChart className="h-6 w-6" />
                                <span className="text-xl font-bold">DevLitics</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Empowering developers with actionable insights and analytics.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        Integrations
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        Enterprise
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        API Reference
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                        Terms
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">© 2024 DevLitics. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <span className="sr-only">GitHub</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function StatCard({ number, label }) {
    return (
        <div className="text-center">
            <div className="text-3xl font-bold mb-1">{number}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
        </div>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <Card className="transition-all hover:shadow-lg">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
                    <h3 className="font-semibold text-xl">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function TestimonialCard({ quote, author, role }) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                    <div className="flex text-primary">
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                    </div>
                    <p className="text-muted-foreground">{quote}</p>
                    <div>
                        <div className="font-semibold">{author}</div>
                        <div className="text-sm text-muted-foreground">{role}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function PricingCard({ title, price, description, features, popular }) {
    return (
        <Card className={`relative ${popular ? "border-primary shadow-lg" : ""}`}>
            {popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    Most Popular
                </div>
            )}
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-col gap-2">
                        <div className="text-2xl font-bold">{title}</div>
                        <div className="flex items-baseline gap-1">
                            {price === "Custom" ? (
                                <span className="text-4xl font-bold">{price}</span>
                            ) : (
                                <>
                                    <span className="text-4xl font-bold">{price}</span>
                                    {price !== "Free" && <span className="text-muted-foreground">/month</span>}
                                </>
                            )}
                        </div>
                    </div>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
                <Button className="w-full mt-6" variant={popular ? "default" : "outline"}>
                    Get Started
                </Button>
            </CardContent>
        </Card>
    )
}

