import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Globe,
  History,
  Bell,
  Layout,
  DollarSign,
  Slack,
  MessageSquare,
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Real-Time Threat Intelligence",
      description:
        "Offers real-time updates on cybersecurity threats from a wide range of sources, including the open web, tor, and telegram channels.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Track threat actor movement",
      description:
        "We keep a watchful eye on the cyber adversaries so you can stay one step ahead enabling proactive defence.",
    },
    {
      icon: <History className="w-8 h-8" />,
      title: "Historical data access",
      description:
        "Offers access to historical threat data, enabling organizations to analyze trends and anticipate future threats.",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Customized alerts",
      description:
        "Allow organizations to tailor alerts to specific threat indicators relevant to their environment, reducing alert fatigue and improving incident response.",
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Comprehensive coverage",
      description:
        "Monitors diverse sources, including the dark web and communication channels, providing users with a comprehensive view of the threat landscape, even in hidden corners of the internet.",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost saving",
      description:
        "Proactive threat mitigation and reduced incident response time can lead to cost savings by preventing data breaches and minimizing the financial impact of cyberattacks.",
    },
  ];

  const blogPosts = [
    {
      image: "/api/placeholder/400/250",
      title:
        "Cyber Attacks in Australia (January - September 2024): A Comprehensive Analysis",
      description:
        "From January to September 2024, Australia faced 309 cyber attacks, revealing a consistent threat across...",
    },
    {
      image: "/api/placeholder/400/250",
      title:
        "Cyber Attacks in Africa: A Comprehensive Analysis of Trends from January to August 2024",
      description:
        "The blog provides an in-depth analysis of cyber attacks in Africa between January and August 2024...",
    },
    {
      image: "/api/placeholder/400/250",
      title:
        "Cyber Attacks in ASEAN Countries: A Detailed Analysis (January - August 2024)",
      description:
        "Between January and August 2024, ASEAN countries experienced 1,524 cyber attacks, with Indonesia being...",
    },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
    // else navigate('/login');
  }, []);

  return (
    <div className="min-h-screen w-full bg-grey-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center">
        <div className=" px-4 sm:px-6 lg:px-8 py-24">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-blue-400 mb-6">
              Threat intelligence for everyone
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Fortify your defenses with our real-time threat actor monitoring
              and intelligence.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium">
              Start free trial <span className="font-[900]">→</span>
            </button>
          </div>
        </div>

        {/* Background Globe Effect */}
        <div className="absolute inset-0 z-[20] min-h-[140vh] overflow-hidden opacity-20">
          <img
            src="https://d1898qjf7hzy9p.cloudfront.net/icons/globe-cropped.png"
            alt="Globe network"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className=" px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl font-semibold mb-12">WHAT YOU GET</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-800 bg-gray-900/50"
            >
              <div className="mb-4 text-blue-400">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <div className=" flex px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-[40%] mb-12">
          <h2 className="text-4xl font-bold mb-6">
            Latest ransomware attacks & security incidents funnelled to a single
            dashboard from thousands of sources
          </h2>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-medium">
            Take me there →
          </button>
        </div>

        <div className="mt-12">
          <img
            src="https://d1898qjf7hzy9p.cloudfront.net/screenshots/dashboard1.svg"
            alt="Dashboard Preview"
            className="w-full rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Integrations Section */}
      <div className=" px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold mb-8">Seamless integrations</h2>
        <p className="text-xl text-gray-400 mb-12">
          Seamlessly connect Threatactix with{" "}
          <span className="text-green-400">slack</span>,{" "}
          <span className="text-red-400">webhook</span>, and{" "}
          <span className="text-blue-400">Microsoft teams</span> to receive
          real-time alerts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <img
            src="https://d1898qjf7hzy9p.cloudfront.net/screenshots/threatActorProfile.svg"
            alt="Platform Interface"
            className="rounded-lg shadow-lg"
          />
          <img
            src="https://d1898qjf7hzy9p.cloudfront.net/screenshots/threatActorProfile.svg"
            alt="Alerts Interface"
            className="rounded-lg shadow-lg"
          />
          <img
            src="https://d1898qjf7hzy9p.cloudfront.net/screenshots/threatActorProfile.svg"
            alt="API Interface"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Blog Section */}
      <div className=" px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold mb-4">
          Explore the cybersecurity frontier: insights, tips, and trends
        </h2>
        <p className="text-purple-500 mb-12">THREATACTIX BLOG</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-900/50 rounded-lg overflow-hidden"
            >
              <img
                src={'https://imagedelivery.net/-1Tjtddhb6lLGRUEZU6EgQ/09be7cb0-57d8-45ec-2c48-dc00ec809e00/public'}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
                <p className="text-gray-400">{post.description}</p>
                <a href="#" className="text-blue-400 mt-4 inline-block">
                  read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Threat Overview */}
      <div className=" px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold mb-4">
          Global Cyber Threat Overview
        </h2>
        <p className="text-gray-400 mb-8">
          Stay informed and vigilant in the face of{" "}
          <span className="text-red-400">
            ever evolving cybersecurity risks
          </span>{" "}
          by exploring the ever-changing landscape of cyber threats across the
          world.
        </p>
        <img
          src="https://imagedelivery.net/-1Tjtddhb6lLGRUEZU6EgQ/09be7cb0-57d8-45ec-2c48-dc00ec809e00/public"
          alt="Threat Overview Dashboard"
          className="w-full rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default LandingPage;
