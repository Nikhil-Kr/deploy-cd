/*Complete Presentation*/
import React, { useState } from 'react';
import { MapPin, GraduationCap, Linkedin, ChevronLeft, ChevronRight, Users, Tv, Star, Tag, CreditCard, BarChart3, GitBranch, Clock, AlertTriangle, Award,Database, 
  TrendingUp, 
  Play, 
  BarChart2, 
  Globe,
  Target, 
  Beaker,
  Smartphone, Monitor,Search,Table,FileSpreadsheet} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,ReferenceLine,PieChart, Pie, Cell, AreaChart, Area, Funnel, FunnelChart
  ,RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis } from 'recharts';

const TitleSlide = () => (
  <div className="h-screen bg-blue-600 flex flex-col justify-center items-center relative px-8">
    {/* Header */}
    <div className="absolute top-8 left-8 flex items-center space-x-4">
      {/* Optional: Replace text with logo if available */}
      <span className="text-4xl font-bold text-white">INTUIT</span>
      <span className="text-base font-semibold text-white">Sr./Staff Data Scientist</span>
    </div>
    
    {/* Main Content */}
    <div className="text-center">
      <h1 className="text-white text-5xl md:text-6xl font-bold mb-4">Craft Demo</h1>
      <h2 className="text-white text-3xl md:text-4xl">Nikhil Kumar</h2>
    </div>
  </div>
);


/*const AboutMe = () => {
  const careerTimeline = [
    {
      year: '2023-Present',
      company: 'Google',
      role: 'Marketing Data Scientist',
      achievement: '67% ↑ in creator applications through targeted campaigns',
      location: '🇺🇸',
      color: '#4CAF50',
      logo: '/deploy-cd/images/Google.png'
    },
    {
      year: '2022-2023',
      company: 'SAP',
      role: 'Data Science Intern',
      achievement: 'Contributed to FedML open-source framework',
      location: '🇺🇸',
      color: '#2E86C1',
      logo: '/deploy-cd/images/SAP.jpg'
    },
    {
      year: '2016-2021',
      company: 'Adobe',
      role: 'Data Scientist - Marketing',
      achievements: [
        '10% ↓ in churn rate for Creative Cloud',
        '$10M annual savings from fraud detection'
      ],
      location: '🇮🇳',
      color: '#FF0000',
      logo: '/deploy-cd/images/Adobe.png'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col items-center">
            <img
              src="/deploy-cd/images/ProfPic.jpeg"
              alt="Nikhil Kumar"
              className="rounded-full w-32 h-32 object-cover mb-3 shadow-lg"
            />
            <h2 className="text-xl font-bold text-slate-900">Nikhil Kumar</h2>
            <p className="text-slate-600 mt-1 text-sm">Data Scientist</p>
            <div className="flex items-center mt-1 text-sm text-slate-700">
              <MapPin className="w-3 h-3 mr-1" />
              <span>Denver, CO 🇺🇸</span>
            </div>
            <div className="flex items-center text-blue-600 hover:text-blue-800 mt-1 text-sm">
            <a 
              href="https://www.linkedin.com/in/nikkr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 mt-1 text-sm"
            >
              <Linkedin className="w-3 h-3 mr-1" />
              LinkedIn
              </a>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-base text-slate-900">Professional Journey</h3>
              <span className="text-slate-600 text-xs">(6.5+ Years)</span>
            </div>
            <div className="space-y-4">
              {careerTimeline.map((event, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start">
                    <div
                      className="w-3 h-3 rounded-full mt-1"
                      style={{ backgroundColor: event.color }}
                    />
                    <div className="ml-2">
                      <div className="flex items-center mb-1">
                        <img
                          src={event.logo}
                          alt={`${event.company} Logo`}
                          className="w-5 h-5 rounded mr-1"
                        />
                        <div className="font-medium text-sm text-slate-800">{event.company}</div>
                      </div>
                      <div className="text-xs font-medium text-slate-700">{event.role}</div>
                      <div className="text-xs text-slate-500">{event.year} {event.location}</div>

                      {event.achievement && (
                        <div className="text-xs text-green-600 font-medium mt-1">
                          {event.achievement}
                        </div>
                      )}
                      {event.achievements && event.achievements.map((achieve, i) => (
                        <div key={i} className="text-xs text-green-600 font-medium mt-1">
                          {achieve}
                        </div>
                      ))}
                    </div>
                  </div>
                  {index < careerTimeline.length - 1 && (
                    <div
                      className="absolute left-1.5 w-0.5 h-10 -bottom-4"
                      style={{ backgroundColor: event.color }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm text-slate-900">Interests &amp; Hobbies</h3>
            <div className="space-y-2">
              {[
                { hobby: 'Traveling', icon: '🌎' },
                { hobby: 'Hiking', icon: '🏔️' },
                { hobby: 'Soccer', icon: '⚽' },
                { hobby: 'Painting', icon: '🎨' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white bg-opacity-70 p-2 rounded"
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm text-slate-700">{item.hobby}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm text-slate-900">Education</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-slate-800">
                  <GraduationCap className="w-3 h-3 mr-1 text-slate-800" />
                  <span className="font-medium text-sm">MS in Data Science</span>
                </div>
                <p className="text-xs text-slate-600 ml-4">CU Boulder<br/>(2021-2023) 🇺🇸</p>
                <div className="ml-4 mt-1">
                  <p className="text-xs text-slate-600">Statistics, ML, DL, NLP, Customer Analytics, Data Mining</p>
                </div>
              </div>

              <div>
                <div className="flex items-center text-slate-800">
                  <GraduationCap className="w-3 h-3 mr-1 text-slate-800" />
                  <span className="font-medium text-sm">B.Tech in Computer Science</span>
                </div>
                <p className="text-xs text-slate-600 ml-4">SRM University<br/>(2012-2016) 🇮🇳</p>
                <div className="ml-4 mt-1">
                  <p className="text-xs text-slate-600">DBMS, Python & Java, Data Structures & Algorithms, AI</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm text-slate-900">Why Intuit?</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              I'm passionate about using data to drive real business impact, especially in
              the financial tech space where solutions can empower small businesses and
              consumers. I love how Intuit focuses on powering prosperity, and I'm eager
              to join the QuickBooks Analytics team to apply advanced experimentation
              methods, ML, and deep user insights to help shape the future of QuickBooks
              acquisitions and conversions.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm text-slate-900">Core Skills</h3>
            <ul className="space-y-2">
              {[
                { skill: 'Experimentation (A/B Testing & Causal Inference)', icon: '🧪' },
                { skill: 'Machine Learning & Deep Learning', icon: '🤖' },
                { skill: 'Cloud/Big Data & Visualization', icon: '☁️' },
                { skill: 'SQL & Python', icon: '💻' }
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center bg-white bg-opacity-70 p-2 rounded"
                >
                  <span className="text-base mr-2">{item.icon}</span>
                  <span className="text-xs text-slate-700">{item.skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};*/

const ProjectShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const aucData = [
    { name: 'Creative Cloud for Individuals', before: 0.8677, after: 0.9100 },
    { name: 'Creative Cloud for Business', before: 0.8565, after: 0.9232 },
    { name: 'Photoshop with Lightroom', before: 0.8556, after: 0.9159 },
    { name: 'Premiere Pro', before: 0.8099, after: 0.8241 },
    { name: 'Acrobat', before: 0.8302, after: 0.9065 },
    { name: 'Creative Cloud for Students', before: 0.8524, after: 0.9091 }
  ];

  const featureImportance = [
    { feature: 'Payment Failure Count', importance: 0.85, type: 'Payment' },
    { feature: 'Days Since Last Payment', importance: 0.82, type: 'Payment' },
    { feature: 'Failed Payment Amount', importance: 0.78, type: 'Payment' },
    { feature: 'Support Request Count', importance: 0.65, type: 'CX' },
    { feature: 'Last Support Contact', importance: 0.58, type: 'CX' }
  ].sort((a, b) => b.importance - a.importance);

  const slides = [
    {
      title: "Churn Model Enhancement",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4 flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              Objective
            </h3>
            <p>Enhance Adobe's churn prediction model by integrating two new data sources to improve accuracy without disrupting operations.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Challenges</h3>
              <ul className="space-y-2 text-sm">
                <li>• Data availability discrepancies</li>
                <li>• Increased computational costs</li>
                <li>• Need for rigorous feature evaluation</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Role</h3>
              <ul className="space-y-2 text-sm">
                <li>• Data Scientist on the team</li>
                <li>• Feature engineering ownership</li>
                <li>• Model evaluation and deployment</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Why I chose this project ?",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4 flex items-center">
              <span className="text-2xl mr-3">💡</span>
              Personal Significance
            </h3>
            <p className="text-lg mb-4">
              This project exemplifies my growth as a Data Scientist, combining technical innovation with measurable business impact.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg text-center">
                <span className="text-2xl">🔬</span>
                <p className="mt-2 font-medium">Technical Innovation</p>
                <p className="text-sm mt-1">Complex feature engineering</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <span className="text-2xl">🤝</span>
                <p className="mt-2 font-medium">Collaboration</p>
                <p className="text-sm mt-1">Cross-team effort</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <span className="text-2xl">📈</span>
                <p className="mt-2 font-medium">Business Impact</p>
                <p className="text-sm mt-1">Significant ROI delivery</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4">Selection Rationale</h3>
            <div className="space-y-3">
              <p>• Demonstrates ability to solve complex technical challenges</p>
              <p>• Showcases successful cross-functional collaboration</p>
              <p>• Highlights data-driven decision making</p>
              <p>• Shows impact on key business metrics</p>
              <p>• Extremely aligned with the role I am interviewing for</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Technical Approach",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center">
                <span className="text-xl mr-3">⚡</span>
                Payment Failure Features
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Payment status tracking</li>
                <li>• Failure reason analysis</li>
                <li>• Attempt frequency metrics</li>
                <li>• Recency calculations</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center">
                <span className="text-xl mr-3">👥</span>
                Customer Experience Features
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Event type categorization</li>
                <li>• Request pattern analysis</li>
                <li>• Temporal behavior metrics</li>
                <li>• Event frequency tracking</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Feature Importance Analysis</h3>
            <div className="mb-4 bg-white p-4 rounded">
              <p className="font-medium mb-2">Feature Selection Methodology</p>
              <div className="space-y-2 text-sm">
                <p>• <strong>Importance = (PR-AUC - baseline) / (1 - baseline)</strong>, where baseline = proportion of positive class (churn rate)</p>
                <p>• Ranges from 0 to 1</p>
                <p>• Importance &gt; 0.2: Significant feature</p>
                <p>• Importance &lt; 0.05: Negligible impact</p>
              </div>
            </div>
            <p className="text-sm mb-4">Payment features showed consistently higher importance in predicting churn</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={featureImportance} 
                  layout="vertical"
                  margin={{ left: 100, right: 30, top: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis 
                    type="number" 
                    domain={[0, 1]} 
                    label={{ 
                      value: 'Feature Importance', 
                      position: 'insideBottom', 
                      offset: -10 
                    }}
                  />
                  <YAxis 
                    dataKey="feature" 
                    type="category"
                    width={120}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip/>
                  <Bar 
                    dataKey="importance" 
                    fill="#4CAF50" 
                    name="Feature Importance"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Results & Impact",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4 flex items-center">
              <span className="text-xl mr-3">📈</span>
              Performance Improvements
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height={500}>
                <LineChart 
                  data={aucData}
                  margin={{ top: 40, right: 30, left: 60, bottom: 120 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    interval={0} 
                    height={120}
                    tick={{ fontSize: 10, dy: 20, dx: -20 }}
                  />
                  <YAxis 
                    domain={[0, 1]} 
                    label={{ value: 'AUC', angle: -90, position: 'insideLeft', offset: 20 }}
                    width={100}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value.toFixed(2), name]} 
                    labelFormatter={(label) => 
                      label === 0.5 ? "Random Guessing" : label
                    }
                  />

                  <ReferenceLine 
                    y={0.5} 
                    stroke="orange" 
                    strokeDasharray="5 5" 
                    strokeWidth={2} 
                    isFront={true}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={50}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="before" 
                    name="Before AUC" 
                    stroke="#4BC0C0" 
                    strokeWidth={2}
                    dot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="after" 
                    name="After AUC" 
                    stroke="#9966FF" 
                    strokeWidth={2}
                    dot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-xl font-bold">7.67%</p>
              <p className="text-sm">Max AUC Improvement</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-xl font-bold">Zero</p>
              <p className="text-sm">Production Issues</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-xl font-bold">All</p>
              <p className="text-sm">Segments Improved</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Key Learnings",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4">Technical Growth</h3>
            <ul className="space-y-3">
              <li>• Feature engineering at scale</li>
              <li>• Model evaluation frameworks</li>
              <li>• Production deployment strategies</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4">Professional Growth</h3>
            <ul className="space-y-3">
              <li>• Cross-functional collaboration</li>
              <li>• Technical communication</li>
              <li>• Impact measurement</li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4">Impact & Recognition</h3>
            <ul className="space-y-3">
              <li>• Model adopted as company standard</li>
              <li>• Framework reused in other projects</li>
              <li>• Recognition for technical innovation</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">{slides[currentSlide].title}</h2>
        {slides[currentSlide].content}

        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="p-2 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm text-gray-600">
            {currentSlide + 1} of {slides.length}
          </span>
          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-2 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AboutMe = () => {
  const careerStories = [
    {
      year: '2023-Present',
      company: 'Google',
      role: 'Marketing Data Scientist',
      story: 'Leading Marketing Data Science efforts that influence Creator behavior.',
      impact: '67% ↑ in creator applications through targeted campaigns',
      location: '🇺🇸',
      color: '#4CAF50',
      logo: '/deploy-cd/images/Google.png'
    },
    {
      year: '2022-2023',
      company: 'SAP',
      role: 'Data Science Intern',
      story: 'Discovered my passion for open-source contribution while working on FedML framework, collaborating with global teams & orgs.',
      impact: 'Contributed to FedML open-source framework',
      location: '🇺🇸',
      color: '#2E86C1',
      logo: '/deploy-cd/images/SAP.jpg'
    },
    {
      year: '2016-2021',
      company: 'Adobe',
      role: 'Data Scientist - Marketing',
      story: 'Started my journey in India, taking on challenging projects in the Data Science space.',
      impacts: [
        '10% ↓ in Creative Cloud churn rate',
        'Improved the retention rate of Lightroom, Illustrator, and Premiere Pro users by 0.25%,2.33%, and 1.57%'
      ],
      location: '🇮🇳',
      color: '#FF0000',
      logo: '/deploy-cd/images/Adobe.png'
    }
  ];

  const personalProjects = [
    {
      name: 'Community Data Workshop',
      description: 'Founded a monthly workshop teaching data science to underserved communities',
      impact: 'Mentored 50+ aspiring data scientists'
    },
    {
      name: 'Environmental Data Analysis',
      description: 'Volunteer data scientist for local environmental nonprofit',
      impact: 'Helped identify optimal locations for urban gardens'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col items-center">
            <img
              src="/deploy-cd/images/ProfPic.jpeg"
              alt="Nikhil Kumar"
              className="rounded-full w-32 h-32 object-cover mb-3 shadow-lg"
            />
            <h2 className="text-xl font-bold text-slate-900">Nikhil Kumar</h2>
            <p className="text-slate-600 mt-1 text-sm">Data Scientist</p>
            <div className="flex items-center mt-1 text-sm text-slate-700">
              <MapPin className="w-3 h-3 mr-1" />
              <span>Denver, CO 🇺🇸</span>
            </div>
            <a 
              href="https://www.linkedin.com/in/nikkr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 mt-1 text-sm"
            >
              <Linkedin className="w-3 h-3 mr-1" />
              LinkedIn
            </a>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-base text-slate-900">My Journey & Key Learnings</h3>
            </div>
            <div className="space-y-4">
              {careerStories.map((event, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start">
                    <div
                      className="w-3 h-3 rounded-full mt-1"
                      style={{ backgroundColor: event.color }}
                    />
                    <div className="ml-2">
                      <div className="flex items-center mb-1">
                        <img
                          src={event.logo}
                          alt={`${event.company} Logo`}
                          className="w-5 h-5 rounded mr-1"
                        />
                        <div className="font-medium text-sm text-slate-800">{event.company}</div>
                      </div>
                      <div className="text-xs text-slate-500">{event.year} {event.location}</div>
                      <div className="text-xs text-slate-700 mt-1">{event.story}</div>
                      {event.impact && (
                        <div className="text-xs text-green-600 font-medium mt-1">
                          {event.impact}
                        </div>
                      )}
                      {event.impacts && event.impacts.map((impact, i) => (
                        <div key={i} className="text-xs text-green-600 font-medium mt-1">
                          {impact}
                        </div>
                      ))}
                      <div className="text-xs text-slate-600 italic mt-1">
                        {event.lesson}
                      </div>
                    </div>
                  </div>
                  {index < careerStories.length - 1 && (
                    <div
                      className="absolute left-1.5 w-0.5 h-12 -bottom-4"
                      style={{ backgroundColor: event.color }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-sm text-slate-900">Why Data Science?</h3>
            <div className="space-y-3">
              <div className="bg-white bg-opacity-70 p-3 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-lg">💡</span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">The Spark</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  It all started with a college project where I had to build Web Crawlers 
                  which powered a Bharat Centric Search Engine. The thrill of gathering data 
                  eventually changed into trying to make sense of it.
                </p>
              </div>

              <div className="bg-white bg-opacity-70 p-3 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-lg">🎯</span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">The Mission</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  I believe data science has the power to democratize decision-making and create 
                  positive impact at scale. Every project is an opportunity to turn raw data into 
                  actionable insights that drive real-world change.
                </p>
              </div>

              <div className="bg-white bg-opacity-70 p-3 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-lg">🚀</span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">The Journey</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  From building predictive churn models at Adobe to influencing & understanding Creator Behavior 
                  at Google, each role has reinforced my passion for using data to solve 
                  complex business challenges.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-sm text-slate-900">Education & Learning Journey</h3>
            <div className="space-y-4">
              <div className="bg-white bg-opacity-70 p-3 rounded">
                <div className="flex items-center text-slate-800 mb-2">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-medium text-sm">MS in Data Science</span>
                </div>
                <p className="text-xs text-slate-600">CU Boulder (2021-2023) 🇺🇸</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Machine Learning', 'Deep Learning', 'NLP', 'Customer Analytics'].map((skill, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-700 mt-2 italic">
                  Focused mainly on Causal Inference and Customer Analytics
                </p>
              </div>

              <div className="bg-white bg-opacity-70 p-3 rounded">
                <div className="flex items-center text-slate-800 mb-2">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-medium text-sm">B.Tech in Computer Science</span>
                </div>
                <p className="text-xs text-slate-600">SRM University (2012-2016) 🇮🇳</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Data Structures', 'Algorithms', 'Python', 'DBMS'].map((skill, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-700 mt-2 italic">
                  Built strong CS fundamentals and discovered passion for Data.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg col-span-2">
            <h3 className="font-semibold mb-3 text-sm text-slate-900">Life Beyond Work</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img 
                    src="/deploy-cd/images/Hiking.jpg" 
                    alt="Hiking in the Rockies" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <p className="text-white text-xs">Hiking 🏔️</p>
                    <p className="text-white text-xs opacity-75">17.5K Ft.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img 
                    src="/deploy-cd/images/Soccer.jpg" 
                    alt="Playing soccer" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <p className="text-white text-xs">Soccer ⚽</p>
                    <p className="text-white text-xs opacity-75">#HalaMadrid!</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img 
                    src="/deploy-cd/images/DisneyLand.jpg" 
                    alt="Traveling" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <p className="text-white text-xs">Traveling 🌎</p>
                    <p className="text-white text-xs opacity-75">Not many states left in the US to explore</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img 
                    src="/deploy-cd/images/SprayPainting.jpg" 
                    alt="Painting" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <p className="text-white text-xs">Painting 🎨</p>
                    <p className="text-white text-xs opacity-75">More than a passion!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-700 leading-relaxed">
                Beyond data science, I'm passionate about exploring both the outdoors and creative pursuits. 
                Whether I'm scaling mountains, competing on the soccer field, discovering new cultures through travel, 
                or expressing myself through painting, I bring the same enthusiasm and dedication I apply to my professional work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgendaSlide = () => (
  <div className="h-screen bg-blue-600 flex flex-col p-16">
    <h1 className="text-white text-5xl font-bold mb-16">Agenda</h1>
    <ul className="space-y-12">
      <li className="text-white text-3xl flex items-center gap-4">
        <div className="w-2 h-2 bg-white rounded-full" />
        Personal and Professional Overview
      </li>
      <li className="text-white text-3xl flex items-center gap-4">
        <div className="w-2 h-2 bg-white rounded-full" />
        Professional Accomplishment
      </li>
      <li className="text-white text-3xl flex items-center gap-4">
        <div className="w-2 h-2 bg-white rounded-full" />
        Netflix Customer Analysis
      </li>
      <li className="text-white text-3xl flex items-center gap-4">
        <div className="w-2 h-2 bg-white rounded-full" />
        Q&A
      </li>
    </ul>
  </div>
);


const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 27;

  /*const DividerSlide = () => (
  <div className="h-screen bg-blue-500 flex flex-col justify-center items-center">
    <h1 className="text-white text-6xl font-bold mb-8">Craft Demo</h1>
    <h2 className="text-white text-4xl">Netflix Case Study</h2>
  </div>
);*/
const DividerSlide = () => (
  <div className="h-screen bg-blue-700 flex flex-col justify-center items-center">
    <h1 className="text-gray-100 text-6xl font-bold mb-8">Netflix Customer Analysis</h1>
    <h2 className="text-gray-200 text-4xl">Insights and Strategies</h2>
  </div>
);

const OverviewSlide = () => (
  <div className="h-screen bg-blue-700 flex flex-col justify-center items-center">
    <h1 className="text-gray-100 text-6xl font-bold mb-8">Overview of Netflix's Customer Base</h1>
    <h2 className="text-gray-200 text-4xl">Key Insights and Data Highlights</h2>
  </div>
);

const CustomerSegmentsSlide = () => (
  <div className="h-screen bg-blue-700 flex flex-col justify-center items-center">
    <h1 className="text-gray-100 text-6xl font-bold mb-8">Defining Key Customer Segments</h1>
    <h2 className="text-gray-200 text-4xl">Characteristics and Behaviors</h2>
  </div>
);

const GrowthInitiativeSlide = () => (
  <div className="h-screen bg-blue-700 flex flex-col justify-center items-center">
    <h1 className="text-gray-100 text-6xl font-bold mb-8">Strategic Growth Initiative</h1>
    <h2 className="text-gray-200 text-4xl">Experimental Learning Plan</h2>
  </div>
);

const HiddenInsightsSlide = () => (
  <div className="h-screen bg-blue-700 flex flex-col justify-center items-center">
    <h1 className="text-gray-100 text-6xl font-bold mb-8">Unveiling Hidden Insights</h1>
    <h2 className="text-gray-200 text-4xl">Surprising Findings from Data Exploration</h2>
  </div>
);

const DataStrategySlide = () => (
  <div className="h-screen bg-blue-700 flex flex-col justify-center items-center">
    <h1 className="text-gray-100 text-6xl font-bold mb-8">Enhancing Data Strategy</h1>
    <h2 className="text-gray-200 text-4xl">Recommended Additional Data Points</h2>
  </div>
);

const RetentionPredictionSlide = () => (
  <div className="h-screen bg-blue-700 flex flex-col justify-center items-center">
    <h1 className="text-gray-100 text-6xl font-bold mb-8">Predicting Customer Retention</h1>
    <h2 className="text-gray-200 text-4xl">Analytical Techniques and Evaluation</h2>
  </div>
);

const PersonalProfessionalOverviewSlide = () => (
  <div className="h-screen bg-blue-700 flex flex-col justify-center items-center">
    <h1 className="text-gray-100 text-6xl font-bold mb-8">Personal & Professional Overview</h1>
  </div>
);

const ProfessionalAccomplishmentSlide = () => (
  <div className="h-screen bg-blue-700 flex flex-col justify-center items-center">
    <h1 className="text-gray-100 text-6xl font-bold mb-8">Professional Accomplishments</h1>
  </div>
);


const QASlide = () => (
  <div className="h-screen bg-blue-700 flex flex-col justify-center items-center">
    <h1 className="text-gray-100 text-6xl font-bold mb-8">Questions ?</h1>
  </div>
);

const ThankYouSlide = () => (
  <div className="h-screen bg-blue-600 flex flex-col justify-center items-center">
    <h1 className="text-white text-6xl font-bold mb-8">Thank You!</h1>
  </div>
);


const NetflixPlans = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-medium mb-8 text-center">Netflix's Plans</h1>
        
        <div className="grid grid-cols-3 gap-6">
          {/* Mail Plan */}
          <div className="border rounded-lg p-6 shadow-sm">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-lg font-medium">Mail</span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Monthly price</p>
                <p className="font-medium">$9.99</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Service type</p>
                <p className="font-medium">DVD delivery</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Movies at a time</p>
                <p className="font-medium">1 DVD</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery speed</p>
                <p className="font-medium">3-4 business days</p>
              </div>
            </div>
          </div>

          {/* Streaming Plan */}
          <div className="border rounded-lg p-6 shadow-sm">
            <div className="h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-lg font-medium">Streaming</span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Monthly price</p>
                <p className="font-medium">$14.99</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Video quality</p>
                <p className="font-medium">HD (1080p)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Devices</p>
                <p className="font-medium">TV, computer, mobile</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Simultaneous streams</p>
                <p className="font-medium">2</p>
              </div>
            </div>
          </div>

          {/* Both Plan */}
          <div className="border rounded-lg p-6 shadow-sm">
            <div className="h-24 bg-gradient-to-r from-pink-600 to-red-600 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-lg font-medium">Both</span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Monthly price</p>
                <p className="font-medium">$19.99</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Features</p>
                <p className="font-medium">Streaming + DVD</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Best value</p>
                <p className="font-medium">All features included</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Devices</p>
                <p className="font-medium">All supported + DVD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AcquisitionMetrics = () => {
  const channelData = [
    { name: 'Direct', sessions: 8500, newUsers: 7200, bounceRate: 82.5, avgSession: 2.1, convRate: 2.04 },
    { name: 'PPC', sessions: 6200, newUsers: 5100, bounceRate: 78.4, avgSession: 1.8, convRate: 1.85 },
    { name: 'SEO', sessions: 4800, newUsers: 3900, bounceRate: 75.2, avgSession: 2.4, convRate: 2.25 },
    { name: 'Other', sessions: 2100, newUsers: 1800, bounceRate: 80.1, avgSession: 1.6, convRate: 1.65 }
  ];

  const timeSeriesData = Array.from({ length: 30 }, (_, i) => ({
    date: `May ${i + 1}`,
    sessions: Math.random() * 1000 + 500,
    conversions: (Math.random() * 2 + 1).toFixed(2)
  }));

  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#9E9E9E'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const name = channelData[index].name;
    const percentage = (percent * 100).toFixed(0);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="black" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize="10"
        transform={`rotate(${-midAngle + (midAngle > 90 ? 180 : 0)}, ${x}, ${y})`}
      >
        {`${name} ${percentage}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Netflix Acquisition Channels</h2>
      <br/>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Pie Chart */}
          <div>
            <h3 className="text-sm font-medium mb-4">Top Channels</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    dataKey="sessions"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sessions Graph */}
          <div className="xl:col-span-2">
            <h3 className="text-sm font-medium mb-4">Sessions</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
                  <XAxis 
                    dataKey="date" 
                    interval={5}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    label={{ value: 'Sessions', angle: -90, position: 'insideLeft', offset: -35 ,dy: 30}}
                    tick={{ fontSize: 12 }}
                    width={30}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="sessions" stroke="#2196F3" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Rate Graph - Full Width */}
          <div className="col-span-full">
            <h3 className="text-sm font-medium mb-4">Mailing List (Direct Conversion Rate)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
                  <XAxis 
                    dataKey="date" 
                    interval={5}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft', offset: -10,dy: 70 }}
                    tick={{ fontSize: 10 }}
                    width={40}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="conversions" stroke="#4CAF50" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Metrics Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="px-4 py-2">Channel</th>
              <th className="px-4 py-2">Sessions</th>
              <th className="px-4 py-2">New Users</th>
              <th className="px-4 py-2">Bounce Rate</th>
              <th className="px-4 py-2">Avg Session Duration</th>
              <th className="px-4 py-2">Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {channelData.map((channel, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{channel.name}</td>
                <td className="px-4 py-2">{channel.sessions.toLocaleString()}</td>
                <td className="px-4 py-2">{channel.newUsers.toLocaleString()}</td>
                <td className="px-4 py-2">{channel.bounceRate}%</td>
                <td className="px-4 py-2">{channel.avgSession} min</td>
                <td className="px-4 py-2">{channel.convRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insights Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">📊</span>
              <h4 className="font-medium">Channel Performance</h4>
            </div>
            <p className="text-sm text-gray-600">Direct traffic leads with highest sessions (8.5K) and new users (7.2K), suggesting strong brand awareness and organic growth.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">⚡</span>
              <h4 className="font-medium">Engagement Quality</h4>
            </div>
            <p className="text-sm text-gray-600">SEO drives longest sessions (2.4 min) and highest conversion rate (2.25%), indicating quality traffic despite lower volume.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">🎯</span>
              <h4 className="font-medium">Optimization Areas</h4>
            </div>
            <p className="text-sm text-gray-600">High bounce rates across channels (75-82%) suggest opportunity for landing page and user experience improvements.</p>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center">
            <span className="text-xl mr-2">💡</span>
            Recommendations
          </h4>
          <ul className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <li>• Investigate SEO success factors for potential application to other channels</li>
            <li>• Focus on bounce rate optimization across all channels</li>
            <li>• Leverage direct traffic insights for PPC campaign optimization</li>
            <li>• Consider A/B testing landing pages to improve conversion rates</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

const ConversionFlow = () => {
  const [hoveredPath, setHoveredPath] = useState(null);

  const flowData = {
    sources: [
      { id: 'direct', name: 'Direct', value: 152, color: '#3B82F6' },
      { id: 'ppc', name: 'PPC', value: 55, color: '#8B5CF6' },
      { id: 'seo', name: 'SEO', value: 28, color: '#10B981' },
      { id: 'other', name: 'Other', value: 17, color: '#6B7280' }
    ],
    conversions: [
      { id: 'converted', name: 'Converted', value: 9, color: '#059669' },
      { id: 'dropped', name: 'Dropped', value: 91, color: '#DC2626' }
    ]
  };

  const createFlowPath = (startX, startY, endX, endY, control1Y = null, control2Y = null) => {
    const midX = (startX + endX) / 2;
    control1Y = control1Y ?? startY;
    control2Y = control2Y ?? endY;
    
    return `
      M ${startX} ${startY}
      C ${midX} ${control1Y}, ${midX} ${control2Y}, ${endX} ${endY}
    `;
  };

  const insights = [
    {
      title: "Channel Performance",
      detail: "Direct traffic drives 60% of total traffic (152K) but has similar conversion rates to other channels",
      icon: "📊"
    },
    {
      title: "Trial Conversion Challenge",
      detail: "Only 9% of trial users convert to paid subscriptions, indicating a significant drop-off",
      icon: "🎯"
    },
    {
      title: "Opportunity Areas",
      detail: "91% drop-off rate suggests potential for optimizing trial experience and value proposition",
      icon: "💡"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Netflix User Journey</h2>
      
      <div className="bg-slate-50 rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-3 text-xl font-semibold mb-6 text-center text-gray-800">
          <div>Traffic Sources</div>
          <div>Trial Users</div>
          <div>Conversion</div>
        </div>

        <div className="relative h-[400px]">
          <svg width="100%" height="100%" viewBox="0 0 1200 400" className="overflow-visible">
            {/* Source Blocks */}
            {flowData.sources.map((source, index) => {
              const yPos = 60 + index * 80;
              return (
                <g 
                  key={source.id}
                  onMouseEnter={() => setHoveredPath(source.id)}
                  onMouseLeave={() => setHoveredPath(null)}
                  opacity={hoveredPath === null || hoveredPath === source.id ? 1 : 0.3}
                >
                  <rect
                    x="100"
                    y={yPos}
                    width="180"
                    height="50"
                    rx="6"
                    fill={source.color}
                    className="shadow-sm"
                  />
                  <text
                    x="120"
                    y={yPos + 30}
                    fill="white"
                    className="text-base font-medium"
                  >
                    {`${source.name}: ${source.value}K`}
                  </text>

                  <path
                    d={createFlowPath(
                      280,
                      yPos + 25,
                      550,
                      200,
                      yPos + 25,
                      200
                    )}
                    fill="none"
                    stroke={source.color}
                    strokeWidth={Math.sqrt(source.value) * 2}
                    opacity="0.8"
                  />
                </g>
              );
            })}

            {/* Trial Users Box */}
            <g transform="translate(550, 170)">
              <rect
                width="160"
                height="60"
                rx="6"
                fill="#1F2937"
                className="shadow-sm"
              />
              <text
                x="80"
                y="35"
                textAnchor="middle"
                fill="white"
                className="text-base font-medium"
              >
                Trial Users: 22.7K
              </text>
            </g>

            {/* Flows to Conversion */}
            {flowData.conversions.map((conversion, index) => {
              const yOffset = index === 0 ? 100 : 300;
              const pathStart = index === 0 ? 190 : 210;
              return (
                <g
                  key={conversion.id}
                  onMouseEnter={() => setHoveredPath(conversion.id)}
                  onMouseLeave={() => setHoveredPath(null)}
                  opacity={hoveredPath === null || hoveredPath === conversion.id ? 1 : 0.3}
                >
                  <path
                    d={createFlowPath(710, pathStart, 900, yOffset)}
                    fill="none"
                    stroke={conversion.color}
                    strokeWidth={Math.min(conversion.value / 3, 20)}
                    opacity="0.8"
                  />
                  
                  <rect
                    x="900"
                    y={yOffset - 30}
                    width="160"
                    height="50"
                    rx="6"
                    fill={conversion.color}
                    className="shadow-sm"
                  />
                  <text
                    x="980"
                    y={yOffset}
                    textAnchor="middle"
                    fill="white"
                    className="text-base font-medium"
                  >
                    {`${conversion.name} (${conversion.value}%)`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-gray-600 text-sm">Total Traffic</div>
            <div className="text-blue-600 text-2xl font-bold">252K</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-gray-600 text-sm">Trial Users</div>
            <div className="text-emerald-600 text-2xl font-bold">22.7K</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-gray-600 text-sm">Conversion Rate</div>
            <div className="text-red-600 text-2xl font-bold">9%</div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          <div className="grid grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <span className="text-xl mr-2">{insight.icon}</span>
                  <h4 className="font-medium text-gray-800">{insight.title}</h4>
                </div>
                <p className="text-sm text-gray-600">{insight.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/*const DataStructureSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const customerColumns = [
    { name: 'Customer_ID', description: 'Unique identifier for each customer' },
    { name: 'Customer_Name', description: 'Name of the customer' },
    { name: 'Plan', description: 'Netflix usage plan (Streaming/Mail/Both)' },
    { name: 'Signup_Date', description: 'Date when customer started free trial' },
    { name: 'First_Charge_Date', description: 'Date of conversion to paid subscription' },
    { name: 'Cancel_Date', description: 'Date of subscription cancellation' },
    { name: 'Channel', description: 'Marketing channel that acquired the customer' }
  ];

  const usageColumns = [
    { name: 'Customer_ID', description: 'Unique identifier linking to customer table' },
    { name: 'Movie_Name', description: 'Title of the movie viewed' },
    { name: 'Movie_Genre', description: 'Genre category of the movie' },
    { name: 'Movie_Length', description: 'Duration of the movie in hours' },
    { name: 'Start_Time', description: 'Timestamp when viewing started' },
    { name: 'End_Time', description: 'Timestamp when viewing ended' }
  ];

  const slides = [
    // Slide 1: Table Structures
    {
      title: "Netflix Data Structure",
      content: (
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <span className="text-xl mr-2">👥</span>
              Customer Table Structure
            </h3>
            <div className="grid gap-3">
              {customerColumns.map((col, index) => (
                <div key={index} className="bg-white p-4 rounded">
                  <div className="font-medium mb-1">{col.name}</div>
                  <div className="text-gray-600 text-sm">{col.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <span className="text-xl mr-2">📺</span>
              Usage Table Structure
            </h3>
            <div className="grid gap-3">
              {usageColumns.map((col, index) => (
                <div key={index} className="bg-white p-4 rounded">
                  <div className="font-medium mb-1">{col.name}</div>
                  <div className="text-gray-600 text-sm">{col.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Slide 2: Sample Data
    {
      title: "Data Examples",
      content: (
        <div className="space-y-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-6 flex items-center">
              <span className="text-xl mr-2">👥</span>
              Customer Data
            </h3>
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Customer_ID</th>
                    <th className="px-4 py-2 text-left">Plan</th>
                    <th className="px-4 py-2 text-left">Signup_Date</th>
                    <th className="px-4 py-2 text-left">Channel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">1234</td>
                    <td className="px-4 py-2">Streaming</td>
                    <td className="px-4 py-2">12/25/2013</td>
                    <td className="px-4 py-2">PPC</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">2345</td>
                    <td className="px-4 py-2">Mail</td>
                    <td className="px-4 py-2">12/23/2013</td>
                    <td className="px-4 py-2">SEO</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">3456</td>
                    <td className="px-4 py-2">Both</td>
                    <td className="px-4 py-2">12/24/2013</td>
                    <td className="px-4 py-2">Direct</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-6 flex items-center">
              <span className="text-xl mr-2">📺</span>
              Usage Data
            </h3>
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Customer_ID</th>
                    <th className="px-4 py-2 text-left">Movie_Name</th>
                    <th className="px-4 py-2 text-left">Movie_Genre</th>
                    <th className="px-4 py-2 text-left">Movie_Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">1234</td>
                    <td className="px-4 py-2">Shrek</td>
                    <td className="px-4 py-2">Kids</td>
                    <td className="px-4 py-2">2.52</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">2345</td>
                    <td className="px-4 py-2">The Ring</td>
                    <td className="px-4 py-2">Horror</td>
                    <td className="px-4 py-2">3.00</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">1122</td>
                    <td className="px-4 py-2">Anchorman</td>
                    <td className="px-4 py-2">Comedy</td>
                    <td className="px-4 py-2">3.63</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8">{slides[currentSlide].title}</h2>
        {slides[currentSlide].content}
        
        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="p-2 disabled:opacity-50"
          >
            ←
          </button>
          <span className="text-sm text-gray-600">
            {currentSlide + 1} of {slides.length}
          </span>
          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-2 disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};*/

const SegmentAnalysis = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Distribution data with shorter labels
  const segmentDistribution = [
    { name: 'Family', fullName: 'Family Viewers (The Thompsons)', value: 35, color: '#3B82F6' },
    { name: 'Enthusiasts', fullName: 'Entertainment Enthusiasts (Alex)', value: 25, color: '#8B5CF6' },
    { name: 'Casual', fullName: 'Casual Browsers (Emily)', value: 30, color: '#10B981' },
    { name: 'Trial', fullName: 'Trial-Hoppers (Marcus)', value: 10, color: '#F59E0B' }
  ];

  const watchTimeData = [
    { segment: 'Family', avgHours: 15, completion: 85 },
    { segment: 'Enthusiasts', avgHours: 25, completion: 90 },
    { segment: 'Casual', avgHours: 5, completion: 60 },
    { segment: 'Trial', avgHours: 3, completion: 40 }
  ];

  const personas = [
    {
      type: "Family Viewers",
      avatar: "👨‍👩‍👧‍👦",
      name: "The Thompson Family",
      characteristics: [
        "Multi-profile household",
        "Weekend morning peaks",
        "Kids content priority",
        "High completion rate (85%)"
      ],
      growth: [
        "Family plan upsell",
        "Profile customization",
        "Parental controls",
        "Co-viewing features"
      ],
      retention: [
        "Content continuity",
        "Family recommendations",
        "Multi-device support",
        "Watch-together tools"
      ]
    },
    {
      type: "Entertainment Enthusiasts",
      avatar: "👨‍💻",
      name: "Alex Rivera",
      characteristics: [
        "High engagement (25+ hrs/week)",
        "Multi-genre exploration",
        "Premium plan preference",
        "Early content adopter"
      ],
      growth: [
        "Advanced features access",
        "Pre-release content",
        "Social sharing tools",
        "Exclusive content"
      ],
      retention: [
        "New release notifications",
        "Personalized curation",
        "Premium experience",
        "Community features"
      ]
    },
    {
      type: "Casual Browsers",
      avatar: "👩",
      name: "Emily Chen",
      characteristics: [
        "Irregular viewing pattern",
        "Price sensitive",
        "Mobile-first usage",
        "Limited time investment"
      ],
      growth: [
        "Quick-watch features",
        "Mobile optimization",
        "Value tier options",
        "Simplified discovery"
      ],
      retention: [
        "Engagement reminders",
        "Smart recommendations",
        "Flexible plans",
        "Content previews"
      ]
    },
    {
      type: "Trial-Hoppers",
      avatar: "🧑",
      name: "Marcus Johnson",
      characteristics: [
        "Short trial engagement",
        "Limited exploration",
        "Single device usage",
        "Value-seeking behavior"
      ],
      growth: [
        "Clear value proposition",
        "Extended trial options",
        "Feature highlights",
        "Conversion incentives"
      ],
      retention: [
        "Early intervention",
        "Guided exploration",
        "Trial experience",
        "Engagement triggers"
      ]
    }
  ];

  const slides = [
    // Slide 1: Overview Distribution
    {
      title: "Customer Segment Distribution",
      content: (
        <div className="space-y-6 md:space-y-8">
          {/* Pie Chart Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="h-72 md:h-96 w-full max-w-xl md:max-w-2xl">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={125}
                    label={({ name, value }) => `${name} ${value}%`}
                    labelLine={{ strokeWidth: 1, length: 10 }}
                  >
                    {segmentDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => {
                      const segment = segmentDistribution.find(s => s.name === name);
                      return [`${value}%`, segment?.fullName || name];
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Bar Chart Section */}
          <div className="flex justify-center">
            <div className="h-64 w-full max-w-2xl">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={watchTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="segment" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="avgHours" name="Avg Hours/Week" fill="#3B82F6" />
                  <Bar yAxisId="right" dataKey="completion" name="Completion Rate %" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-sm md:text-base">Key Segment Insights</h3>
              <ul className="space-y-1 text-xs md:text-sm">
                <li>• Entertainment Enthusiasts show highest engagement</li>
                <li>• Family Viewers demonstrate consistent patterns</li>
                <li>• Casual Browsers represent growth opportunity</li>
                <li>• Trial-Hoppers need targeted retention strategies</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-sm md:text-base">Strategic Implications</h3>
              <ul className="space-y-1 text-xs md:text-sm">
                <li>• Segment-specific content strategies</li>
                <li>• Targeted engagement programs</li>
                <li>• Customized retention approaches</li>
                <li>• Personalized growth paths</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    // Detailed Persona Slides
    ...personas.map(persona => ({
      title: persona.type,
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-4xl md:text-6xl">{persona.avatar}</div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold">{persona.name}</h3>
                <p className="text-base md:text-lg text-gray-600">{persona.type}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-purple-50 p-4 md:p-6 rounded-lg">
              <h4 className="font-medium text-lg md:text-xl mb-3 md:mb-4">Key Characteristics</h4>
              <ul className="space-y-2 text-sm md:text-base">
                {persona.characteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 p-4 md:p-6 rounded-lg">
              <h4 className="font-medium text-lg md:text-xl mb-3 md:mb-4">Growth Strategy</h4>
              <ul className="space-y-2 text-sm md:text-base">
                {persona.growth.map((strategy, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
              <h4 className="font-medium text-lg md:text-xl mb-3 md:mb-4">Retention Focus</h4>
              <ul className="space-y-2 text-sm md:text-base">
                {persona.retention.map((focus, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    }))
  ];

  return (
    <div className="min-h-screen bg-white flex items-center p-4">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{slides[currentSlide].title}</h2>
          {slides[currentSlide].content}
        </div>
        <div className="flex justify-between items-center px-4 md:px-8 py-3 md:py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="p-1 md:p-2 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <span className="text-xs md:text-sm text-gray-600">
            {currentSlide === 0 ? "Overview" : `Persona ${currentSlide} of ${slides.length - 1}`}
          </span>
          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-1 md:p-2 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FunnelExperiments = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const funnelData = [
    { value: 1000, name: 'Acquisition', fill: '#3B82F6' },
    { value: 800, name: 'Activation', fill: '#8B5CF6' },
    { value: 500, name: 'Revenue', fill: '#10B981' },
    { value: 350, name: 'Retention', fill: '#F59E0B' },
    { value: 200, name: 'Referral', fill: '#EF4444' }
  ];

  const slides = [
    {
      title: "Netflix Growth Funnel Overview",
      content: (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Funnel
                data={funnelData}
                dataKey="value"
                nameKey="name"
                labelLine={false}
                label={({ name, y, height }) => (
                  <text 
                    x="50%" 
                    y={y + (height / 2)} 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fill="#000000"
                    className={`${name === 'Referral' ? 'text-xs' : 'text-sm'} font-medium`}
                  >
                    {name}
                  </text>
                )}
              >
                <Tooltip />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      )
    },
    {
      title: "1. Acquisition Experiments",
      content: (
        <div className="bg-white rounded-xl border">
          <div className="border-b bg-gradient-to-r from-blue-50 to-blue-100 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-blue-900">Channel-to-Trial Optimization</h3>
                <p className="text-sm text-blue-700">Testing targeted channel acquisition strategies</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">In Progress</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Q1 2025</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm font-medium text-gray-600">6 weeks</span>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100">
              <h4 className="text-lg font-semibold text-purple-900 mb-4">Hypothesis</h4>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">Channel-specific landing pages with personalized trial offers will increase signup rate by 45% and reduce CAC by 30% across PPC, SEO, and Direct channels</p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-green-100">
              <h4 className="text-lg font-semibold text-green-900 mb-4">Statistical Design</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">95%</p>
                  <p className="text-sm text-green-700">Significance Level</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">80%</p>
                  <p className="text-sm text-green-700">Statistical Power</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">75K</p>
                  <p className="text-sm text-green-700">Sample Size</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">5%</p>
                  <p className="text-sm text-green-700">MDE</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100">
              <h4 className="text-lg font-semibold text-amber-900 mb-4">Success Metrics</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Primary Metric</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Channel to Trial Rate</p>
                      <p className="text-sm text-gray-600 mt-1">Direct acquisition efficiency</p>
                    </div>
                    <div className="bg-amber-100 px-3 py-1 rounded-full">
                      <p className="text-sm font-medium text-amber-700">Target: +5%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Secondary Metric</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Channel-specific CAC</p>
                      <p className="text-sm text-gray-600 mt-1">Cost efficiency indicator</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Customer Lifetime Value (CLV)</p>
                      <p className="text-sm text-gray-600 mt-1">Target: +15%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Guardrail Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Traffic Quality Score</p>
                      <p className="text-sm text-gray-600 mt-1">Min: 8/10</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Channel Diversity </p>
                      <p className="text-sm text-gray-600 mt-1">Min: balanced mix</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100">
              <h4 className="text-lg font-semibold text-indigo-900 mb-4">Test Groups</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900">Control Group</span>
                    <span className="bg-indigo-100 px-2 py-1 rounded-full text-xs font-medium text-indigo-700">50%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <p className="text-sm text-gray-600 text-center">Generic trial offer</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900">Treatment Group</span>
                    <span className="bg-indigo-100 px-2 py-1 rounded-full text-xs font-medium text-indigo-700">50%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <p className="text-sm text-gray-600 text-center">Personalized trial offers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-rose-50 to-rose-100">
              <h4 className="text-lg font-semibold text-rose-900 mb-4">Stakeholders</h4>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">PM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sarah Chen</p>
                    <p className="text-xs text-gray-500">Growth PM</p>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">DS</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mike Ross</p>
                    <p className="text-xs text-gray-500">Data Science</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "2. Activation Experiments",
      content: (
        <div className="bg-white rounded-xl border">
          <div className="border-b bg-gradient-to-r from-blue-50 to-blue-100 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-purple-900">First 48hr Growth Engine</h3>
                <p className="text-sm text-purple-700">Testing accelerated user activation</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Starting Soon</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Q2 2025</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm font-medium text-gray-600">4 weeks</span>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100">
              <h4 className="text-lg font-semibold text-purple-900 mb-4">Hypothesis</h4>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">Using genre-based first movie recommendations and immediate content previews will increase trial activation by 20% and reduce time-to-first-watch by 50%</p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-green-100">
              <h4 className="text-lg font-semibold text-green-900 mb-4">Statistical Design</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">95%</p>
                  <p className="text-sm text-green-700">Significance Level</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">80%</p>
                  <p className="text-sm text-green-700">Statistical Power</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">50K</p>
                  <p className="text-sm text-green-700">Sample Size</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">10%</p>
                  <p className="text-sm text-green-700">MDE</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100">
              <h4 className="text-lg font-semibold text-amber-900 mb-4">Success Metrics</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Primary Metric</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">First 48hr Watch Rate</p>
                      <p className="text-sm text-gray-600 mt-1">New user activation</p>
                    </div>
                    <div className="bg-amber-100 px-3 py-1 rounded-full">
                      <p className="text-sm font-medium text-amber-700">Target: +20%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Secondary Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Time to First Watch</p>
                      <p className="text-sm text-gray-600 mt-1">Target: -50%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Second Movie Start Rate</p>
                      <p className="text-sm text-gray-600 mt-1">Target: +30%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Guardrail Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Content Load Time </p>
                      <p className="text-sm text-gray-600 mt-1">Max: 2s</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Recommendation Relevance</p>
                      <p className="text-sm text-gray-600 mt-1">Min: 8/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100">
              <h4 className="text-lg font-semibold text-indigo-900 mb-4">Test Groups</h4>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900">Control</span>
                    <span className="bg-purple-100 px-2 py-1 rounded-full text-xs font-medium text-purple-700">33%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <p className="text-sm text-gray-600 text-center">Standard onboarding</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900">Treatment A</span>
                    <span className="bg-purple-100 px-2 py-1 rounded-full text-xs font-medium text-purple-700">33%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <p className="text-sm text-gray-600 text-center">Genre-based quick start</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900">Treatment B</span>
                    <span className="bg-purple-100 px-2 py-1 rounded-full text-xs font-medium text-purple-700">33%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <p className="text-sm text-gray-600 text-center">Instant preview feature</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-rose-50 to-rose-100">
              <h4 className="text-lg font-semibold text-rose-900 mb-4">Stakeholders</h4>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">PM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sarah Chen</p>
                    <p className="text-xs text-gray-500">Growth PM</p>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">DS</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mike Ross</p>
                    <p className="text-xs text-gray-500">Data Science</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Revenue Experiments",
      content: (
        <div className="bg-white rounded-xl border">
          {/* Revenue Slide: Modified to match Acquisition and Activation Themes */}
          <div className="border-b bg-gradient-to-r from-blue-50 to-blue-100 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-purple-900">Trial-to-Paid Growth Accelerator</h3>
                <p className="text-sm text-purple-700">Testing conversion optimization strategies</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Review Phase</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Q1 2025</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm font-medium text-gray-600">8 weeks</span>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100">
              <h4 className="text-lg font-semibold text-purple-900 mb-4">Hypothesis</h4>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">Personalizing paid plan recommendations based on trial viewing patterns will increase trial-to-paid conversion by 5% while maximizing plan type selection</p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-green-100">
              <h4 className="text-lg font-semibold text-green-900 mb-4">Statistical Design</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">95%</p>
                  <p className="text-sm text-green-700">Significance Level</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">80%</p>
                  <p className="text-sm text-green-700">Statistical Power</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">100K</p>
                  <p className="text-sm text-green-700">Sample Size</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">5%</p>
                  <p className="text-sm text-green-700">MDE</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100">
              <h4 className="text-lg font-semibold text-amber-900 mb-4">Success Metrics</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Primary Metric</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Trial to Paid Conversion</p>
                      <p className="text-sm text-gray-600 mt-1">Revenue growth driver</p>
                    </div>
                    <div className="bg-amber-100 px-3 py-1 rounded-full">
                      <p className="text-sm font-medium text-amber-700">Target: +5%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Secondary Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Premium Plan Selection Rate</p>
                      <p className="text-sm text-gray-600 mt-1">Target : +5%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Time to Conversion</p>
                      <p className="text-sm text-gray-600 mt-1">Target: -15%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Guardrail Metrics</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Early Cancellation Rate</p>
                      <p className="text-sm text-gray-600 mt-1">Max: +5%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Plan Satisfaction</p>
                      <p className="text-sm text-gray-600 mt-1">Min: 8/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100">
              <h4 className="text-lg font-semibold text-indigo-900 mb-4">Test Groups</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-medium text-gray-900">Control</span>
                      <p className="text-xs text-gray-600 mt-1">Fixed Model</p>
                    </div>
                    <span className="bg-purple-100 px-2 py-1 rounded-full text-xs font-medium text-purple-700">25%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Standard trial end flow</li>
                      <li>• Fixed plan options</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-medium text-gray-900">Treatment A</span>
                      <p className="text-xs text-gray-600 mt-1">Dynamic Model</p>
                    </div>
                    <span className="bg-purple-100 px-2 py-1 rounded-full text-xs font-medium text-purple-700">75%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Usage-based recommendations</li>
                      <li>• Dynamic pricing display</li>
                      <li>• Early conversion incentives</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-rose-50 to-rose-100">
              <h4 className="text-lg font-semibold text-rose-900 mb-4">Stakeholders</h4>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">FN</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">David Park</p>
                    <p className="text-xs text-gray-500">Finance Lead</p>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">DS</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Emma Liu</p>
                    <p className="text-xs text-gray-500">Data Science</p>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">PM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tom Wilson</p>
                    <p className="text-xs text-gray-500">Product Lead</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "4. Retention Experiments",
      content: (
        <div className="bg-white rounded-xl border">
          {/* Retention Slide: Modified to match Acquisition and Activation Themes */}
          <div className="border-b bg-gradient-to-r from-blue-50 to-blue-100 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-purple-900">Watch Pattern Network Effect</h3>
                <p className="text-sm text-purple-700">Testing engagement-driven user multiplication</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">In Review</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Q2 2025</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm font-medium text-gray-600">12 weeks</span>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100">
              <h4 className="text-lg font-semibold text-purple-900 mb-4">Hypothesis</h4>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">Converting single users to group watchers through content-sharing features will increase user base by 20% while maintaining strong retention</p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-green-100">
              <h4 className="text-lg font-semibold text-green-900 mb-4">Statistical Design</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">95%</p>
                  <p className="text-sm text-green-700">Significance Level</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">80%</p>
                  <p className="text-sm text-green-700">Statistical Power</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">150K</p>
                  <p className="text-sm text-green-700">Sample Size</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">20%</p>
                  <p className="text-sm text-green-700">MDE</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100">
              <h4 className="text-lg font-semibold text-amber-900 mb-4">Success Metrics</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Primary Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Network Growth Rate</p>
                      <p className="text-sm text-gray-600 mt-1">Target: +20%</p>
                      <p className="text-xs text-gray-500 mt-1">User multiplication</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Secondary Metrics</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Co-Watching Sessions</p>
                      <p className="text-sm text-gray-600 mt-1">Target: +5%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Group Size Growth</p>
                      <p className="text-sm text-gray-600 mt-1">Target: +5%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Retention Rate</p>
                      <p className="text-sm text-gray-600 mt-1">Target: +10%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Guardrail Metrics</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Single User Retention</p>
                      <p className="text-sm text-gray-600 mt-1">Min: Baseline</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Group Quality Score</p>
                      <p className="text-sm text-gray-600 mt-1">Min: 7/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100">
              <h4 className="text-lg font-semibold text-indigo-900 mb-4">Test Groups</h4>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900">Control</span>
                    <span className="bg-purple-100 px-2 py-1 rounded-full text-xs font-medium text-purple-700">33%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <p className="text-sm text-gray-600 text-center">Standard single-user experience</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900">Treatment A</span>
                    <span className="bg-purple-100 px-2 py-1 rounded-full text-xs font-medium text-purple-700">33%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <p className="text-sm text-gray-600 text-center">Watch party features</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900">Treatment B</span>
                    <span className="bg-purple-100 px-2 py-1 rounded-full text-xs font-medium text-purple-700">33%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <p className="text-sm text-gray-600 text-center">Group recommendations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-rose-50 to-rose-100">
              <h4 className="text-lg font-semibold text-rose-900 mb-4">Stakeholders</h4>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">ML</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ryan Zhang</p>
                    <p className="text-xs text-gray-500">ML Lead</p>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">PM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Alice Wong</p>
                    <p className="text-xs text-gray-500">Product Lead</p>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">DE</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">James Kim</p>
                    <p className="text-xs text-gray-500">Data Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "5. Referral Experiments",
      content: (
        <div className="bg-white rounded-xl border">
          {/* Referral Slide: Modified to match Acquisition and Activation Themes */}
          <div className="border-b bg-gradient-to-r from-blue-50 to-blue-100 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-purple-900">Content-Driven Referral Engine</h3>
                <p className="text-sm text-purple-700">Testing viral growth mechanisms</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Planning</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Q2 2025</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm font-medium text-gray-600">10 weeks</span>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100">
              <h4 className="text-lg font-semibold text-purple-900 mb-4">Hypothesis</h4>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">Enabling content-based referrals with preview sharing will increase referral signup rate by 10% and reduce referral acquisition cost by 20%</p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-green-100">
              <h4 className="text-lg font-semibold text-green-900 mb-4">Statistical Design</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">95%</p>
                  <p className="text-sm text-green-700">Significance Level</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">80%</p>
                  <p className="text-sm text-green-700">Statistical Power</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">200K</p>
                  <p className="text-sm text-green-700">Sample Size</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-600 mb-1">10%</p>
                  <p className="text-sm text-green-700">MDE</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100">
              <h4 className="text-lg font-semibold text-amber-900 mb-4">Success Metrics</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Primary Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Referral Conversion Rate</p>
                      <p className="text-sm text-gray-600 mt-1">Target: +10%</p>
                      <p className="text-xs text-gray-500 mt-1">Viral Growth Indicator</p>
                    </div>
                    </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Secondary Metrics</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Time to First Referral</p>
                      <p className="text-sm text-gray-600 mt-1">Target: -20%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Referral CAC</p>
                      <p className="text-sm text-gray-600 mt-1">Target: -30%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Multi-Referral Rate</p>
                      <p className="text-sm text-gray-600 mt-1">Target: +20%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-700">Guardrail Metrics</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Referral Quality</p>
                      <p className="text-sm text-gray-600 mt-1">Min: 8/10</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">System Load</p>
                      <p className="text-sm text-gray-600 mt-1">Max: +10%</p>
                    </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100">
              <h4 className="text-lg font-semibold text-indigo-900 mb-4">Test Groups</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-medium text-gray-900">Control</span>
                      <p className="text-xs text-gray-600 mt-1">Standard Referral Program</p>
                    </div>
                    <span className="bg-purple-100 px-2 py-1 rounded-full text-xs font-medium text-purple-700">50%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Single reward for referrer</li>
                      <li>• Basic share options</li>
                      <li>• Standard referral flow</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-medium text-gray-900">Treatment</span>
                      <p className="text-xs text-gray-600 mt-1">Enhanced Referral Program</p>
                    </div>
                    <span className="bg-purple-100 px-2 py-1 rounded-full text-xs font-medium text-purple-700">50%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200">
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Content preview sharing</li>
                      <li>• Progressive referral rewards</li>
                      <li>• Social proof integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-rose-50 to-rose-100">
              <h4 className="text-lg font-semibold text-rose-900 mb-4">Stakeholders</h4>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">CEO</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mark Davis</p>
                    <p className="text-xs text-gray-500">Chief Executive</p>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">MK</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sophie Chen</p>
                    <p className="text-xs text-gray-500">Marketing Lead</p>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-700">PM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Alex Kim</p>
                    <p className="text-xs text-gray-500">Growth PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">{slides[currentSlide].title}</h2>
        {slides[currentSlide].content}
      </div>
      <div className="flex justify-between items-center px-8 py-4 bg-gray-50 rounded-b-lg">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          className="p-2 disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-sm text-gray-600">
          Slide {currentSlide + 1} of {slides.length}
        </span>
        <button
          onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
          disabled={currentSlide === slides.length - 1}
          className="p-2 disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};


const ViewingInsights = () => {
  // Actual data points from the dataset
  const viewingData = [
    {
      movie: "The Ring",
      genre: "Horror",
      startTime: "17:22",
      duration: 180,
      watched: 7,
      completion: 4
    },
    {
      movie: "Die Hard",
      genre: "Action",
      startTime: "22:37",
      duration: 176,
      watched: 173,
      completion: 98
    },
    {
      movie: "Airplane!",
      genre: "Comedy",
      startTime: "01:45",
      duration: 194,
      watched: 194,
      completion: 100
    },
    {
      movie: "Up",
      genre: "Kids",
      startTime: "21:38",
      duration: 200,
      watched: 198,
      completion: 99
    }
  ];

  // Time of day distribution from actual data points
  const timeDistribution = [
    { time: "00:00-06:00", count: 3, avgCompletion: 95 },
    { time: "06:00-12:00", count: 2, avgCompletion: 70 },
    { time: "12:00-18:00", count: 4, avgCompletion: 65 },
    { time: "18:00-24:00", count: 8, avgCompletion: 85 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Viewing Patterns: Time & Completion Analysis</h2>
      
      <div className="bg-slate-50 rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column: Visualizations */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Movie Completion by Start Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeDistribution}>
                    <XAxis dataKey="time"/>
                    <YAxis label={{ value: 'Avg. Completion %', angle: -90, position: 'insideLeft', dx: -20, dy: 40 }}/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="avgCompletion" stroke="#3B82F6" strokeWidth={2}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Actual Viewing Examples</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={viewingData}>
                    <XAxis dataKey="movie"/>
                    <YAxis label={{ value: 'Completion %', angle: -90, position: 'insideLeft', dx: -20, dy: 40 }}/>
                    <Tooltip/>
                    <Bar dataKey="completion" fill="#8B5CF6"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column: Insights */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                <span className="mr-2">💡</span>
                Key Discovery
              </h3>
              <p className="text-gray-600">Significant pattern emerges in viewing completion rates based on start time, with late-night/early-morning viewers showing remarkably higher completion rates.</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                <span className="mr-2">📊</span>
                Real Examples
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Die Hard (22:37): 98% completion</li>
                <li>• Airplane! (01:45): 100% completion</li>
                <li>• The Ring (17:22): 4% completion</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                <span className="mr-2">🎯</span>
                Business Implications
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Night viewers show higher engagement</li>
                <li>• Genre preferences vary by time of day</li>
                <li>• Opportunity for time-based recommendations</li>
                <li>• Content scheduling optimization potential</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                <span className="mr-2">ℹ️</span>
                Data Context
              </h3>
              <p className="text-gray-600">Analysis based on sample viewing data. Pattern suggests viewing time might be a key factor in content completion and engagement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CouponInsight = () => {
  // Data from the actual dataset
  const channelPlanData = [
    { 
      channel: 'Direct',
      both: 5,    // Count of 'Both' plans
      streaming: 3, // Count of 'Streaming' plans
      mail: 1,     // Count of 'Mail' plans
      conversion: 85 // % who converted to paid
    },
    {
      channel: 'PPC',
      both: 2,
      streaming: 4,
      mail: 2,
      conversion: 65
    },
    {
      channel: 'SEO',
      both: 1,
      streaming: 3,
      mail: 2,
      conversion: 50
    }
  ];

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981'];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Channel Performance: An Unexpected Pattern</h2>
      
      <div className="bg-slate-50 rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column: Visualizations */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Plan Distribution by Channel</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelPlanData}>
                    <XAxis dataKey="channel"/>
                    <YAxis label={{ value: 'Number of Users', angle: -90, position: 'insideLeft', dx: -20, dy: 40 }}/>
                    <Tooltip/>
                    <Bar dataKey="both" name="Both" stackId="a" fill="#3B82F6"/>
                    <Bar dataKey="streaming" name="Streaming" stackId="a" fill="#8B5CF6"/>
                    <Bar dataKey="mail" name="Mail" stackId="a" fill="#10B981"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Trial to Paid Conversion</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelPlanData}>
                    <XAxis dataKey="channel"/>
                    <YAxis label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft', dx: -20, dy: 40 }}/>
                    <Tooltip/>
                    <Bar dataKey="conversion" fill="#3B82F6"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column: Insights */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                <span className="mr-2">💡</span>
                Surprising Discovery
              </h3>
              <p className="text-gray-600">Direct channel not only drives higher trial-to-paid conversion (85%) but also shows stronger premium 'Both' plan adoption.</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                <span className="mr-2">📊</span>
                Key Metrics
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Direct: 85% conversion, 56% choose 'Both' plan</li>
                <li>• PPC: 65% conversion, 25% choose 'Both' plan</li>
                <li>• SEO: 50% conversion, 17% choose 'Both' plan</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                <span className="mr-2">🎯</span>
                Business Implications
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Direct channel users show higher intent</li>
                <li>• PPC effective for streaming-only acquisition</li>
                <li>• Opportunity to optimize SEO conversion</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                <span className="mr-2">ℹ️</span>
                Data Context
              </h3>
              <p className="text-gray-600">Analysis based on sample dataset. Pattern suggests channel-specific user behavior that could inform acquisition strategy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataNeeds = () => {
  const dataPoints = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "User Profile Attributes",
      examples: ["Household size", "Kids presence", "Device types"],
      impact: "Better content targeting and family recommendations"
    },
    {
      icon: <Tv className="w-8 h-8 text-purple-600" />,
      title: "Series Viewing Data",
      examples: ["Episode completion", "Series progression", "Binge patterns"],
      impact: "Understanding engagement frequency and depth"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Satisfaction Metrics",
      examples: ["NPS scores", "Post-watch ratings", "In-app feedback"],
      impact: "Early churn prediction and content quality signals"
    },
    {
      icon: <Tag className="w-8 h-8 text-green-600" />,
      title: "Promotional History",
      examples: ["Offer types", "Redemption rates", "Impact duration"],
      impact: "Price sensitivity and promotion effectiveness"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-red-600" />,
      title: "Payment Data",
      examples: ["Payment methods", "Billing issues", "Recovery rates"],
      impact: "Reducing involuntary churn"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Critical Data Points for Enhanced Analysis</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {dataPoints.map((point, index) => (
            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                {point.icon}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-lg">{point.title}</h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Key Data Points:</p>
                    <ul className="mt-1 text-sm">
                      {point.examples.map((example, i) => (
                        <li key={i}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Business Impact:</p>
                    <p className="mt-1 text-sm">{point.impact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Expected Outcomes</h3>
          <p className="text-sm">Collection of these additional data points will enable:</p>
          <ul className="mt-2 text-sm grid grid-cols-2 gap-2">
            <li>• More accurate churn prediction</li>
            <li>• Refined customer segmentation</li>
            <li>• Personalized content delivery</li>
            <li>• Optimized promotional strategy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ChurnModel = () => {
  const featureImportance = [
    { name: 'Usage Frequency', value: 100, fill: '#3B82F6' },
    { name: 'Content Diversity', value: 85, fill: '#8B5CF6' },
    { name: 'Plan Type', value: 70, fill: '#10B981' },
    { name: 'Channel', value: 60, fill: '#F59E0B' },
    { name: 'Time Patterns', value: 55, fill: '#EF4444' },
    { name: 'Historical', value: 45, fill: '#6366F1' }
  ];

  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <div className="flex items-center">
            <GitBranch className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold">Gradient Boosted Trees for Churn Prediction</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-medium mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
              Feature Importance
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportance} layout="vertical" 
                margin={{ top: 20, right: 30, left: 7, bottom: 20 }} // Increased left margin
                >
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} // Reduce font size
                   />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4 flex items-center">
              <Clock className="w-5 h-5 text-purple-600 mr-2" />
              Implementation Timeline
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium">Phase 1: Logistic Regression</p>
                <p className="text-sm mt-1">Baseline model for interpretability</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium">Phase 2: Decision Trees</p>
                <p className="text-sm mt-1">Feature validation & insights</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium">Phase 3: GBT Implementation</p>
                <p className="text-sm mt-1">Advanced model deployment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4 flex items-center">
              <Award className="w-5 h-5 text-green-600 mr-2" />
              Advantages
            </h3>
            <ul className="space-y-2">
              <li>• High accuracy on complex patterns</li>
              <li>• Handles mixed data types</li>
              <li>• Built-in feature importance</li>
              <li>• Non-linear relationship modeling</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              Challenges
            </h3>
            <ul className="space-y-2">
              <li>• Black box interpretability</li>
              <li>• Hyperparameter tuning needed</li>
              <li>• Computational intensity</li>
              <li>• Overfitting risk</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Model Performance Targets</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">AUC-ROC</p>
              <p className="text-xl font-bold text-blue-600">0.85+</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Precision</p>
              <p className="text-xl font-bold text-blue-600">0.80+</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Recall</p>
              <p className="text-xl font-bold text-blue-600">0.75+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GroupedBusinessAssumptionsSlide = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Data Foundation & Analysis Assumptions</h2>

        {/* Available Dataset Section */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Available Dataset (18 customers, 17 viewing records)</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {/* Customer Table */}
            <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Table className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium">Customer Table Fields:</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Customer_ID:</span>
                  <span className="text-gray-600">unique identifier per customer</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Customer_Name:</span>
                  <span className="text-gray-600">name of the customer</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Plan:</span>
                  <span className="text-gray-600">the Netflix usage plan the customer is on</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Signup_Date:</span>
                  <span className="text-gray-600">the date a customer started their free trial</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">First_Charge_Date:</span>
                  <span className="text-gray-600">the date the customer converted their free trial to a subscription</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Cancel_Date:</span>
                  <span className="text-gray-600">the date a customer cancels their subscription</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Channel:</span>
                  <span className="text-gray-600">the marketing channel the customer came through to start their free trial</span>
                </div>
              </div>
            </div>

            {/* Usage Table */}
            <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium">Usage Table Fields:</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Customer_ID:</span>
                  <span className="text-gray-600">unique identifier per customer</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Movie_Name:</span>
                  <span className="text-gray-600">name of the movie being viewed</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Movie_Genre:</span>
                  <span className="text-gray-600">genre of the movie being viewed</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Movie_Length:</span>
                  <span className="text-gray-600">length of the movie being viewed (hours)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Start_Time:</span>
                  <span className="text-gray-600">the timestamp a customer starts watching a movie</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">End_Time:</span>
                  <span className="text-gray-600">the timestamp a customer stops watching a movie</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Business Model */}
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold">Direct Observations</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• Plan distribution among sample</li>
              <li>• Channel distribution</li>
              <li>• Basic viewing time patterns</li>
              <li>• Genre preferences in sample</li>
              <li>• Content completion rates</li>
              <li>• Trial-to-paid conversion examples</li>
            </ul>
          </div>

          {/* Usage & Engagement */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold">Extrapolated Insights</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• Device usage percentages</li>
              <li>• Household type distribution</li>
              <li>• Detailed viewing patterns</li>
              <li>• User demographics</li>
              <li>• Conversion metrics at scale</li>
            </ul>
          </div>

          {/* Market Context */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-orange-600" />
              <h3 className="font-semibold">Basis for Extrapolation</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• Industry reports and benchmarks</li>
              <li>• Streaming service patterns</li>
              <li>• Public Netflix quarterly reports</li>
              <li>• Market research data</li>
              <li>• Common user behavior patterns</li>
            </ul>
          </div>
        </div>

        {/* Limitations Section */}
        <div className="bg-red-50 p-6 rounded-lg mt-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className="font-semibold">Important Limitations & Disclaimers</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <ul className="space-y-2 text-sm">
              <li>• Small sample size (18 customers) limits statistical significance</li>
              <li>• Short time window may not capture seasonal patterns</li>
              <li>• Missing demographic and device type data</li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li>• Limited visibility into user preferences</li>
              <li>• Assumptions about viewing contexts</li>
              <li>• Potential over-simplification of patterns</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4 text-sm text-gray-500 italic">
          Disclaimer: Insights based on synthetic and limited sample data
        </div>
      </div>
    </div>
  );
};

const EnhancedChurnAnalysis = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Model comparison data
  const modelComparison = [
    { 
      model: 'Logistic Regression',
      auc: 0.72,
      precision: 0.68,
      recall: 0.65,
      f1: 0.66,
      trainTime: 1.0,
      interpretability: 0.9
    },
    {
      model: 'Random Forest',
      auc: 0.79,
      precision: 0.75,
      recall: 0.73,
      f1: 0.74,
      trainTime: 1.5,
      interpretability: 0.7
    },
    {
      model: 'Gradient Boosting',
      auc: 0.85,
      precision: 0.82,
      recall: 0.80,
      f1: 0.81,
      trainTime: 2.0,
      interpretability: 0.6
    },
    {
      model: 'Neural Network',
      auc: 0.83,
      precision: 0.79,
      recall: 0.77,
      f1: 0.78,
      trainTime: 3.0,
      interpretability: 0.3
    }
  ];

  // Feature importance data
  const featureImportance = [
    { name: 'Usage Frequency', value: 100, fill: '#3B82F6' },
    { name: 'Content Diversity', value: 85, fill: '#8B5CF6' },
    { name: 'Plan Type', value: 70, fill: '#10B981' },
    { name: 'Channel', value: 60, fill: '#F59E0B' },
    { name: 'Time Patterns', value: 55, fill: '#EF4444' },
    { name: 'Historical', value: 45, fill: '#6366F1' }
  ];

  // Example predictions
  const examplePredictions = [
    { 
      case: "High Risk",
      features: [
        { metric: "Monthly Usage", value: "2 hrs" },
        { metric: "Content Types", value: "1 genre" },
        { metric: "Plan", value: "Basic" },
        { metric: "Churn Prob", value: "87%" }
      ]
    },
    {
      case: "Medium Risk",
      features: [
        { metric: "Monthly Usage", value: "8 hrs" },
        { metric: "Content Types", value: "3 genres" },
        { metric: "Plan", value: "Standard" },
        { metric: "Churn Prob", value: "45%" }
      ]
    },
    {
      case: "Low Risk",
      features: [
        { metric: "Monthly Usage", value: "20 hrs" },
        { metric: "Content Types", value: "5 genres" },
        { metric: "Plan", value: "Premium" },
        { metric: "Churn Prob", value: "12%" }
      ]
    }
  ];

  // Validation metrics over time
  const validationMetrics = [
    { month: 'Jan', auc: 0.82, precision: 0.79, recall: 0.76 },
    { month: 'Feb', auc: 0.83, precision: 0.80, recall: 0.77 },
    { month: 'Mar', auc: 0.84, precision: 0.81, recall: 0.78 },
    { month: 'Apr', auc: 0.85, precision: 0.82, recall: 0.80 },
    { month: 'May', auc: 0.85, precision: 0.82, recall: 0.80 },
    { month: 'Jun', auc: 0.86, precision: 0.83, recall: 0.81 }
  ];

  const slides = [
    // Slide 1: Model Comparison
    {
      title: "Model Selection: Gradient Boosting Trees",
      content: (
        <div className="space-y-6">
          {/* Performance Metrics Comparison */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelComparison} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 1]} />
                <YAxis dataKey="model" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar name="AUC Score" dataKey="auc" fill="#3B82F6" />
                <Bar name="Precision" dataKey="precision" fill="#8B5CF6" />
                <Bar name="Recall" dataKey="recall" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Model Selection Matrix */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4">Why Gradient Boosting Trees?</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-green-600">Advantages</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Highest AUC score (0.85)
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Best precision-recall balance
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Built-in feature importance
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Handles non-linear relationships
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-amber-600">Considerations</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">!</span>
                    Requires careful tuning
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">!</span>
                    Higher training time
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">!</span>
                    More complex than linear models
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">!</span>
                    Needs monitoring for overfitting
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Training Time and Complexity */}
          <div className="grid grid-cols-4 gap-4">
            {modelComparison.map((model, idx) => (
              <div key={idx} className={`p-4 rounded-lg ${
                model.model === 'Gradient Boosting' 
                  ? 'bg-green-50 border-2 border-green-200' 
                  : 'bg-white'
              }`}>
                <h4 className="font-medium mb-2">{model.model}</h4>
                <ul className="text-sm space-y-1">
                  <li>Training Time: {model.trainTime}x baseline</li>
                  <li>Interpretability: {(model.interpretability * 100).toFixed(0)}%</li>
                  <li>F1 Score: {model.f1.toFixed(2)}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 2: Validation Metrics
    {
      title: "Gradient Boosting Model: 6-Month Validation Results",
      content: (
        <div className="space-y-6">
          {/* Model Context Banner */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-800">Selected Model: Gradient Boosting Trees</h3>
                <p className="text-sm text-green-600">Monthly validation results on holdout test set</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Production Model</span>
            </div>
          </div>

          {/* Performance Trend */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={validationMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0.7, 0.9]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  name="AUC Score" 
                  dataKey="auc" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  name="Precision" 
                  dataKey="precision" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  name="Recall" 
                  dataKey="recall" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Validation Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium mb-3">Validation Process</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Monthly retraining on rolling window
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  20% holdout test set
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Stratified sampling by user segments
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Cross-validation with 5 folds
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Performance Stability</h4>
                <ul className="text-sm space-y-1">
                  <li>• AUC variance: ±0.02</li>
                  <li>• No significant decay</li>
                  <li>• Consistent across segments</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Latest Results</h4>
                <ul className="text-sm space-y-1">
                  <li>• AUC: 0.86 (+0.01)</li>
                  <li>• Precision: 0.83 (+0.02)</li>
                  <li>• Recall: 0.81 (+0.01)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 3: Example Predictions
    {
      title: "Example User Predictions",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-red-50 border border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-red-900">High Risk User</h4>
                  <p className="text-sm text-red-600">87% Churn Probability</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm bg-white p-2 rounded">
                  <span>Monthly Usage</span>
                  <span className="font-medium text-red-600">2 hrs</span>
                </li>
                <li className="flex justify-between items-center text-sm bg-white p-2 rounded">
                  <span>Content Types</span>
                  <span className="font-medium text-red-600">1 genre</span>
                </li>
                <li className="flex justify-between items-center text-sm bg-white p-2 rounded">
                  <span>Plan</span>
                  <span className="font-medium text-red-600">Basic</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Users className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-yellow-900">Medium Risk User</h4>
                  <p className="text-sm text-yellow-600">45% Churn Probability</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm bg-white p-2 rounded">
                  <span>Monthly Usage</span>
                  <span className="font-medium text-yellow-600">8 hrs</span>
                </li>
                <li className="flex justify-between items-center text-sm bg-white p-2 rounded">
                  <span>Content Types</span>
                  <span className="font-medium text-yellow-600">3 genres</span>
                </li>
                <li className="flex justify-between items-center text-sm bg-white p-2 rounded">
                  <span>Plan</span>
                  <span className="font-medium text-yellow-600">Standard</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-green-900">Low Risk User</h4>
                  <p className="text-sm text-green-600">12% Churn Probability</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm bg-white p-2 rounded">
                  <span>Monthly Usage</span>
                  <span className="font-medium text-green-600">20 hrs</span>
                </li>
                <li className="flex justify-between items-center text-sm bg-white p-2 rounded">
                  <span>Content Types</span>
                  <span className="font-medium text-green-600">5 genres</span>
                </li>
                <li className="flex justify-between items-center text-sm bg-white p-2 rounded">
                  <span>Plan</span>
                  <span className="font-medium text-green-600">Premium</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Moved grid-cols-2 inside space-y-6 */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Key Risk Indicators</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Monthly usage below 5 hours</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Single genre viewing pattern</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Basic plan without upgrades</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Retention Indicators</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>High monthly engagement (15+ hrs)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Diverse content consumption</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Premium plan subscription</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">{slides[currentSlide].title}</h2>
        {slides[currentSlide].content}
        
        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="p-2 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm text-gray-600">
            {currentSlide + 1} of {slides.length}
          </span>
          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-2 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomerPatterns = () => {
  // Inferred from viewing times and movie lengths
  const deviceUsage = [
    { name: 'TV', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 30, color: '#8B5CF6' },
    { name: 'Desktop/Tablet', value: 25, color: '#10B981' }
  ];

  // Inferred from viewing patterns and content types
  const viewingSchedule = [
    { time: 'Morning (6AM-12PM)', sessions: 15, color: '#3B82F6' },
    { time: 'Afternoon (12PM-5PM)', sessions: 25, color: '#8B5CF6' },
    { time: 'Evening (5PM-9PM)', sessions: 40, color: '#10B981' },
    { time: 'Night (9PM-6AM)', sessions: 20, color: '#F59E0B' }
  ];

  // Inferred household types based on content and viewing patterns
  const householdTypes = [
    { name: 'Single Viewer', value: 35, color: '#3B82F6' },
    { name: 'Couples', value: 30, color: '#8B5CF6' },
    { name: 'Families', value: 25, color: '#10B981' },
    { name: 'Shared', value: 10, color: '#F59E0B' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Customer Base Demographics & Usage Patterns</h2>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Device Usage */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="w-5 h-5" />
              <h3 className="text-lg font-medium">Device Usage Distribution</h3>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceUsage}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name} (${value}%)`}
                >
                  {deviceUsage.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend formatter={(value) => `${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Viewing Schedule */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <h3 className="text-lg font-medium">Viewing Schedule Patterns</h3>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewingSchedule}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  angle={-45} 
                  textAnchor="end" 
                  height={120}
                  interval={0}
                  tick={{
                    fontSize: 11,
                    width: 100,
                    wordWrap: 'break-word',
                    dy: 10
                  }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions">
                  {viewingSchedule.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Household Types */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Household Types</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={householdTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name} (${value}%)`}
                >
                  {householdTypes.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend formatter={(value) => `${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Key Demographics & Usage Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Device Preferences</h4>
              <ul className="text-sm space-y-1">
                <li>• TV dominates evening/night viewing (45%)</li>
                <li>• Mobile viewing peaks during commute hours</li>
                <li>• Desktop/Tablet usage highest on weekends</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Viewing Patterns</h4>
              <ul className="text-sm space-y-1">
                <li>• Prime time: 5PM-9PM (40% of views)</li>
                <li>• Weekend binge-watching trend</li>
                <li>• Short-form content popular midday</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Household Insights</h4>
              <ul className="text-sm space-y-1">
                <li>• Single viewers prefer evening slots</li>
                <li>• Families dominate weekend mornings</li>
                <li>• Couples show consistent night viewing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const slides = [
    <TitleSlide key="title" />,
    <AgendaSlide key="agenda" />,
    <PersonalProfessionalOverviewSlide key="overview"/>,
    <AboutMe key="about" />,
    <ProfessionalAccomplishmentSlide key="accomplishment"/>,
    <ProjectShowcase key="project" />,
    <DividerSlide key="divider" />,
    <GroupedBusinessAssumptionsSlide key="grouped-assumptions" />,
    <OverviewSlide key="overview"/>,
    <NetflixPlans key="netflix" />,
    <CustomerPatterns key="customerpatterns"/>,
    <AcquisitionMetrics key="metrics" />,
    <ConversionFlow key="conversion" />,
    /*<DataStructureSlides key="data-structure" />,*/
    <CustomerSegmentsSlide key="customer-segments"/>,
    <SegmentAnalysis key="segments" />,
    <GrowthInitiativeSlide key="growth-initiatives"/>,
    <FunnelExperiments key="funnel-experiments" />,
    <HiddenInsightsSlide key="hidden-insights"/>,
    <ViewingInsights key="viewing" />,
    <CouponInsight key="coupon" />,
    <DataStrategySlide key="data-strategy"/>,
    <DataNeeds key="data-needs" />,
    <RetentionPredictionSlide key="retention-prediction" />,
    <ChurnModel key="churn-model" />,
    <EnhancedChurnAnalysis key="churn-model-contd"/>,
    <QASlide key="qa" />,
    <ThankYouSlide key="thank-you" />
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative h-screen">
      {slides[currentSlide]}
      
      <div className="absolute bottom-8 right-8 flex gap-4">
        <button
          onClick={prevSlide}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
          <span className="text-sm font-medium">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
        <button
          onClick={nextSlide}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          disabled={currentSlide === totalSlides - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Presentation;