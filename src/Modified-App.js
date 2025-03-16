import React, { useState } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/* ---------------------------------------------------------------------------
   1) TREND DATA FOR CHARTS (Expanded)
   --------------------------------------------------------------------------- */
const membershipTrends = [
  { date: 'Mar 1', standard: 2.0, personalized: 2.8 },
  { date: 'Mar 2', standard: 1.9, personalized: 2.9 },
  { date: 'Mar 3', standard: 2.1, personalized: 3.0 },
  { date: 'Mar 4', standard: 2.0, personalized: 2.9 },
  { date: 'Mar 5', standard: 1.9, personalized: 2.8 },
  { date: 'Mar 6', standard: 2.1, personalized: 3.0 },
  { date: 'Mar 7', standard: 2.0, personalized: 2.9 },
  { date: 'Mar 8', standard: 2.0, personalized: 2.9 },
  { date: 'Mar 9', standard: 2.1, personalized: 3.0 },
  { date: 'Mar 10', standard: 1.9, personalized: 2.8 },
  // Repeat or expand to add lines...
];

const yppTrends = [
  { date: 'Feb 1', standard: 2.1, personalized: 2.6 },
  { date: 'Feb 2', standard: 2.0, personalized: 2.7 },
  { date: 'Feb 3', standard: 2.2, personalized: 2.8 },
  { date: 'Feb 4', standard: 2.1, personalized: 2.7 },
  { date: 'Feb 5', standard: 2.0, personalized: 2.6 },
  { date: 'Feb 6', standard: 2.2, personalized: 2.8 },
  { date: 'Feb 7', standard: 2.1, personalized: 2.7 },
  // Repeat or expand...
];

const engagementTrends = [
  { date: 'Mar 15', standard: 5.2, personalized: 6.1 },
  { date: 'Mar 16', standard: 5.3, personalized: 6.3 },
  { date: 'Mar 17', standard: 5.1, personalized: 6.2 },
  // Repeat or expand...
];

function getTrendData(exp) {
  if (!exp) return [];
  switch (exp.id) {
    case 'mem-001':
      return membershipTrends;
    case 'ypp-001':
      return yppTrends;
    case 'eng-001':
      return engagementTrends;
    default:
      return [];
  }
}

/* ---------------------------------------------------------------------------
   2) MOCK DATA: PLANNING, REVIEWS, EXPERIMENTS, KNOWLEDGE
   --------------------------------------------------------------------------- */

/** 2.1) PLANNING */
const initialRoadmap = [
  {
    id: 'roadmap-001',
    name: 'Homepage Redesign Validation',
    category: 'engagement',
    priority: 'high',
    status: 'planned',
    startDate: 'Apr 1, 2025',
    duration: '2 weeks',
    goal: 'Validate new homepage design effectiveness',
    hypothesis: 'New layout improves content discovery by 15%',
    metrics: ['Time on page', 'Content clicks', 'Return visits']
  },
  {
    id: 'roadmap-002',
    name: 'Premium Tier Feature Test',
    category: 'monetization',
    priority: 'draft',
    status: 'draft',
    startDate: 'May 1, 2025',
    duration: '3 weeks',
    goal: 'Determine best feature set for premium subscription',
    hypothesis: 'Feature bundle B raises conversion by 20%',
    metrics: ['Conversion rate', 'Upgrade rate', 'Feature usage']
  },
  {
    id: 'roadmap-003',
    name: 'Personalized Notification Timing',
    category: 'engagement',
    priority: 'medium',
    status: 'backlog',
    startDate: 'Jun 15, 2025',
    duration: '4 weeks',
    goal: 'Optimize notification timing',
    hypothesis: 'Time-zone adjusted notifications will improve open rates by 25%',
    metrics: ['Open rate', 'Engagement', 'Retention']
  }
  // Add more items if you want to expand the code
];

/** 2.2) REVIEWS */
const initialReviews = [
  {
    id: 'brief-001',
    name: 'Mobile Notification Optimization',
    submittedBy: 'Michael Wong',
    submittedDate: 'Mar 10, 2025',
    status: 'needs_revision',
    feedback: [
      { type: 'statistical', status: 'error', message: 'Measurement period too short' },
      { type: 'business', status: 'warning', message: 'Unclear alignment with Q2 goals' },
      { type: 'operational', status: 'success', message: 'Technical plan feasible' }
    ],
    businessGoal: 'Increase mobile CTR by 10%',
    primaryMetric: 'Click-through Rate',
    targetAudience: 'All mobile app users, push notifications',
    hypothesis: 'Time-based push notifications yield 10% higher CTR vs. immediate triggers',
    successCriteria: 'At least 10% improvement with 95% significance'
  },
  {
    id: 'brief-002',
    name: 'Homepage Personalization Brief',
    submittedBy: 'Alice Smith',
    submittedDate: 'Mar 12, 2025',
    status: 'under_review',
    feedback: [
      { type: 'statistical', status: 'warning', message: 'Sample size borderline' },
      { type: 'business', status: 'success', message: 'Aligns with Q2 personalization initiative' }
    ],
    businessGoal: 'Boost user retention via homepage personalization',
    primaryMetric: 'Retention Rate',
    targetAudience: 'Logged-in homepage visitors, US region',
    hypothesis: 'Personalized feed layout will improve retention by 15%',
    successCriteria: 'At least 15% improvement with 95% significance'
  },
  {
    id: 'brief-003',
    name: 'Premium Upsell Brief',
    submittedBy: 'Tom Brown',
    submittedDate: 'Mar 8, 2025',
    status: 'approved',
    feedback: [
      { type: 'statistical', status: 'success', message: 'Power analysis looks good' },
      { type: 'business', status: 'success', message: 'Directly supports monetization goals' }
    ],
    businessGoal: 'Increase premium conversions among free users',
    primaryMetric: 'Upgrade Rate',
    targetAudience: 'Active free users in the last 30 days',
    hypothesis: 'A new “Premium trial” CTA will raise upgrade rate by 20% vs. existing CTA',
    successCriteria: '20% improvement with 95% confidence'
  }
];

/** 2.3) EXPERIMENTS */
const initialExperiments = [
  {
    id: 'mem-001',
    name: 'Channel Membership Optimization',
    status: 'completed',
    category: 'monetization',
    startDate: 'Mar 1, 2025',
    endDate: 'Mar 30, 2025',
    primaryMetric: 'Membership Conversion Rate',
    improvement: 40,
    significance: 0.0012,
    confidence: 95,
    impact: '800+ new members',
    goal: 'Increase membership conversion rate via personalized messaging',
    hypothesis: 'Personalized membership prompts vs. generic prompts',
    targetAudience: [
      'Watched >3 videos in last 30 days',
      'English-speaking global audience',
      'Active watchers >5 min watch time'
    ],
    successCriteria: '15% improvement in conversion with 95% significance',
    controlImage: 'https://via.placeholder.com/500x300.png?text=GenAI+Control',
    treatmentImage: 'https://via.placeholder.com/500x300.png?text=GenAI+Treatment',
    progress: 100
  },
  {
    id: 'ypp-001',
    name: 'YouTube Partner Program Enrollment',
    status: 'completed',
    category: 'monetization',
    startDate: 'Feb 1, 2025',
    endDate: 'Feb 28, 2025',
    primaryMetric: 'YPP Application Rate',
    improvement: 25,
    significance: 0.0034,
    confidence: 95,
    impact: '500+ new partners',
    goal: 'Increase YPP enrollments with progress tracking notifications',
    hypothesis: 'Creators who see milestone progress are 25% more likely to apply than control',
    targetAudience: [
      'Channels within 20% of YPP eligibility',
      'All categories, 750-1500 subs',
      'Watch Time >3000 hours last 12 months'
    ],
    successCriteria: '20%+ app rate lift with 95% significance',
    controlImage: 'https://via.placeholder.com/500x300.png?text=GenAI+Control',
    treatmentImage: 'https://via.placeholder.com/500x300.png?text=GenAI+Treatment',
    progress: 100
  },
  {
    id: 'eng-001',
    name: 'Video Engagement Prompts',
    status: 'in_progress',
    category: 'engagement',
    startDate: 'Mar 15, 2025',
    endDate: 'Apr 15, 2025',
    primaryMetric: 'Comment Rate',
    improvement: null,
    significance: null,
    confidence: null,
    impact: 'Pending',
    goal: 'Boost meaningful engagement w/ contextual prompts',
    hypothesis: 'Time-stamped prompts referencing video moments drive more discussion vs. generic boxes',
    targetAudience: [
      'Videos >5 minutes',
      'Educational, How-to, Commentary',
      'English language',
      'Desktop + Mobile web'
    ],
    successCriteria: '25% increase in comment rate with no drop in quality',
    controlImage: 'https://via.placeholder.com/500x300.png?text=GenAI+Control',
    treatmentImage: 'https://via.placeholder.com/500x300.png?text=GenAI+Treatment',
    progress: 50
  }
];

/** 2.4) KNOWLEDGE */
const initialKnowledge = [
  {
    id: 'past-001',
    name: 'Personalized Homepage Recommendations',
    category: 'engagement',
    date: 'Jan 10, 2025',
    improvement: 22,
    significance: 0.001,
    confidence: 99,
    tags: ['homepage', 'personalization', 'recommendations'],
    insights: [
      'Personalized content increased engagement by 22%',
      'New users +35% higher retention',
      'Mobile users benefited most'
    ]
  },
  {
    id: 'past-002',
    name: 'Comment Section Redesign',
    category: 'engagement',
    date: 'Dec 5, 2024',
    improvement: 18,
    significance: 0.008,
    confidence: 92,
    tags: ['comments', 'ui', 'user engagement'],
    insights: [
      'Threaded comments increased reply rate by 45%',
      'Average comment length +27%',
      'Creator response rate +15%'
    ]
  }
];

/* ---------------------------------------------------------------------------
   3) MAIN COMPONENT: E2EExperimentPlatform
   --------------------------------------------------------------------------- */
export default function E2EExperimentPlatform() {
  /** TAB State */
  const [activeTab, setActiveTab] = useState('planning');

  /** GLOBAL Data States */
  const [roadmap, setRoadmap] = useState(initialRoadmap);
  const [reviews, setReviews] = useState(initialReviews);
  const [experiments, setExperiments] = useState(initialExperiments);
  const [knowledge, setKnowledge] = useState(initialKnowledge);

  /*  
     -------------------------------------------
     PLANNING TAB
     -------------------------------------------
  */
  const [planningView, setPlanningView] = useState('kanban');
  const [planningSearch, setPlanningSearch] = useState('');
  const [planningGoal, setPlanningGoal] = useState('');
  const [planningGenBusy, setPlanningGenBusy] = useState(false);

  const plannedCount = roadmap.filter((r) => r.status === 'planned').length;
  const draftCount = roadmap.filter((r) => r.status === 'draft').length;
  const backlogCount = roadmap.filter((r) => r.status === 'backlog').length;

  // Roadmap Modal
  const [planItemModalOpen, setPlanItemModalOpen] = useState(false);
  const [planItemModalItem, setPlanItemModalItem] = useState(null);

  function openPlanItemModal(item) {
    setPlanItemModalItem(item);
    setPlanItemModalOpen(true);
  }
  function closePlanItemModal() {
    setPlanItemModalItem(null);
    setPlanItemModalOpen(false);
  }

  function handleGenerateRoadmap() {
    if (!planningSearch || !planningGoal) {
      alert('Please provide a context and a business goal.');
      return;
    }
    setPlanningGenBusy(true);
    setTimeout(() => {
      const newId = `road-AI-${Math.floor(Math.random() * 10000)}`;
      const newItem = {
        id: newId,
        name: `AI-Suggested: ${planningSearch.slice(0, 20)}`,
        category: 'engagement',
        priority: 'medium',
        status: 'backlog',
        startDate: 'Aug 1, 2025',
        duration: '3 weeks',
        goal: `Auto-generated from goal: "${planningGoal}"`,
        hypothesis: `From context: "${planningSearch}"`,
        metrics: ['Conversion', 'Engagement']
      };
      setRoadmap((prev) => [...prev, newItem]);
      alert('AI-suggested item added to backlog!');
      setPlanningSearch('');
      setPlanningGoal('');
      setPlanningGenBusy(false);
    }, 1500);
  }

  const timelineAll = [...roadmap].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  function renderPlanningTab() {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Planning</h1>
        <p className="text-sm text-gray-600">
          Organize your upcoming experiments. View them in Kanban or Timeline.
        </p>

        {/* Summaries */}
        <div className="grid grid-cols-3 gap-4 mt-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm text-blue-800">Planned</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{plannedCount}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="text-sm text-amber-800">Draft</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">{draftCount}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-600">Backlog</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{backlogCount}</p>
          </div>
        </div>

        {/* AI Generate */}
        <div className="bg-blue-50 p-4 rounded border border-blue-200 mb-6 space-y-3">
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            <input
              type="text"
              placeholder='Context (e.g. "landing page")'
              className="flex-1 p-2 border rounded"
              value={planningSearch}
              onChange={(e) => setPlanningSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder='Goal (e.g. "Increase signups by 20%")'
              className="flex-1 p-2 border rounded"
              value={planningGoal}
              onChange={(e) => setPlanningGoal(e.target.value)}
            />
            <button
              className={`px-3 py-2 text-white rounded ${
                planningGenBusy ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={handleGenerateRoadmap}
              disabled={planningGenBusy}
            >
              {planningGenBusy ? 'Generating...' : 'Generate Roadmap'}
            </button>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setPlanningView('kanban')}
            className={`px-3 py-1.5 rounded text-sm ${
              planningView === 'kanban'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Kanban View
          </button>
          <button
            onClick={() => setPlanningView('timeline')}
            className={`px-3 py-1.5 rounded text-sm ${
              planningView === 'timeline'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Timeline View
          </button>
          <button
            className="ml-auto px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            onClick={() => setShowWizard(true)}
          >
            + New Experiment
          </button>
        </div>

        {planningView === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Planned Column */}
            <div>
              <div className="bg-gray-200 p-2 rounded mb-2">
                <h3 className="font-medium text-gray-800">Planned</h3>
              </div>
              {roadmap
                .filter((r) => r.status === 'planned')
                .map((r) => (
                  <div
                    key={r.id}
                    className="bg-white p-3 rounded border mb-3 hover:shadow transition cursor-pointer"
                    onClick={() => openPlanItemModal(r)}
                  >
                    <h4 className="font-medium text-gray-800">{r.name}</h4>
                    <p className="text-sm text-gray-600">
                      {r.startDate} · {r.duration}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{r.goal}</p>
                  </div>
                ))}
            </div>
            {/* Draft Column */}
            <div>
              <div className="bg-gray-200 p-2 rounded mb-2">
                <h3 className="font-medium text-gray-800">Draft</h3>
              </div>
              {roadmap
                .filter((r) => r.status === 'draft')
                .map((r) => (
                  <div
                    key={r.id}
                    className="bg-white p-3 rounded border mb-3 hover:shadow transition cursor-pointer"
                    onClick={() => openPlanItemModal(r)}
                  >
                    <h4 className="font-medium text-gray-800">{r.name}</h4>
                    <p className="text-sm text-gray-600">
                      {r.startDate} · {r.duration}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{r.goal}</p>
                  </div>
                ))}
            </div>
            {/* Backlog Column */}
            <div>
              <div className="bg-gray-200 p-2 rounded mb-2">
                <h3 className="font-medium text-gray-800">Backlog</h3>
              </div>
              {roadmap
                .filter((r) => r.status === 'backlog')
                .map((r) => (
                  <div
                    key={r.id}
                    className="bg-white p-3 rounded border mb-3 hover:shadow transition cursor-pointer"
                    onClick={() => openPlanItemModal(r)}
                  >
                    <h4 className="font-medium text-gray-800">{r.name}</h4>
                    <p className="text-sm text-gray-600">
                      {r.startDate} · {r.duration}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{r.goal}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {planningView === 'timeline' && (
          <div>
            {timelineAll.map((r) => (
              <div
                key={r.id}
                className="border p-3 rounded mb-2 hover:shadow transition cursor-pointer"
                onClick={() => openPlanItemModal(r)}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-800">{r.name}</h4>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      r.category === 'monetization'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {r.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {r.startDate} • {r.duration} • {r.priority} priority
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Plan Item Modal */}
        {planItemModalOpen && planItemModalItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg max-h-[80vh] overflow-y-auto">
              <button
                onClick={closePlanItemModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold mb-2">{planItemModalItem.name}</h3>
              <p className="text-xs text-gray-500 mb-3">
                {planItemModalItem.startDate} · {planItemModalItem.duration} ·{' '}
                {planItemModalItem.priority} priority
              </p>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <span className="font-medium">Category:</span> {planItemModalItem.category}
                </p>
                <p>
                  <span className="font-medium">Goal:</span> {planItemModalItem.goal}
                </p>
                <p>
                  <span className="font-medium">Hypothesis:</span> {planItemModalItem.hypothesis}
                </p>
                <div>
                  <span className="font-medium">Metrics:</span>
                  <ul className="list-disc list-inside pl-4 mt-1">
                    {planItemModalItem.metrics.map((m, idx) => (
                      <li key={idx} className="text-gray-600">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ------------------------------
  // 3.2) REVIEWS TAB
  // ------------------------------
  const [reviewStatusFilter, setReviewStatusFilter] = useState('all');
  const reviewsFiltered = reviews.filter(
    (rev) => reviewStatusFilter === 'all' || rev.status === reviewStatusFilter
  );

  const underReviewCount = reviews.filter((r) => r.status === 'under_review').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const needsRevisionCount = reviews.filter((r) => r.status === 'needs_revision').length;

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewModalItem, setReviewModalItem] = useState(null);

  function openReviewModal(item) {
    setReviewModalItem(item);
    setReviewModalOpen(true);
  }
  function closeReviewModal() {
    setReviewModalItem(null);
    setReviewModalOpen(false);
  }

  function handleReviewAction(status) {
    if (!reviewModalItem) return;
    setReviews((prev) =>
      prev.map((b) => (b.id === reviewModalItem.id ? { ...b, status } : b))
    );
    alert(`Brief '${reviewModalItem.name}' => ${status}`);
    closeReviewModal();
  }

  function handleStartExperimentFromReview(brief) {
    const newId = `autoExp-${Math.floor(Math.random() * 10000)}`;
    const newExp = {
      id: newId,
      name: `${brief.name} (AutoCreated)`,
      status: 'in_progress',
      category: 'engagement',
      startDate: 'May 1, 2025',
      endDate: 'May 30, 2025',
      primaryMetric: brief.primaryMetric || 'Engagement Rate',
      improvement: null,
      significance: null,
      confidence: null,
      impact: 'Pending',
      goal: brief.businessGoal || 'From brief data',
      hypothesis: brief.hypothesis || 'From brief data',
      targetAudience: [brief.targetAudience || 'From brief data'],
      successCriteria: brief.successCriteria || 'TBD 95% significance',
      controlImage: 'https://via.placeholder.com/500x300.png?text=GenAI+Control',
      treatmentImage: 'https://via.placeholder.com/500x300.png?text=GenAI+Treatment',
      progress: 0
    };
    setExperiments((prev) => [...prev, newExp]);
    alert(`New experiment started: ${newExp.name}`);
  }

  function renderReviewsTab() {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Brief Reviews</h1>
        <p className="text-sm text-gray-600">Approve or revise new experiment briefs.</p>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mt-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm text-blue-800">Under Review</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{underReviewCount}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm text-green-800">Approved</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{approvedCount}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm text-red-800">Needs Revision</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">{needsRevisionCount}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <select
            className="appearance-none bg-white border rounded-lg px-4 py-2"
            value={reviewStatusFilter}
            onChange={(e) => setReviewStatusFilter(e.target.value)}
          >
            <option value="all">All Briefs</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="needs_revision">Needs Revision</option>
          </select>
        </div>

        {/* Brief cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsFiltered.map((brief) => (
            <div
              key={brief.id}
              className="border bg-white rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{brief.name}</h3>
                  <p className="text-xs text-gray-500">
                    Submitted by {brief.submittedBy} on {brief.submittedDate}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    brief.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : brief.status === 'under_review'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {brief.status === 'needs_revision'
                    ? 'Needs Revision'
                    : brief.status === 'approved'
                    ? 'Approved'
                    : 'Under Review'}
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Business Goal:</span> {brief.businessGoal || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Primary Metric:</span> {brief.primaryMetric || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Target Audience:</span> {brief.targetAudience || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Hypothesis:</span> {brief.hypothesis || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Success Criteria:</span> {brief.successCriteria || 'N/A'}
                </p>
              </div>

              {/* AI feedback segments */}
              <div className="mt-3 space-y-1">
                {brief.feedback.map((f, i) => (
                  <div
                    key={i}
                    className={`p-2 text-sm rounded ${
                      f.status === 'success'
                        ? 'bg-green-50 text-green-700'
                        : f.status === 'warning'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    <span className="font-medium mr-1">
                      {f.type.charAt(0).toUpperCase() + f.type.slice(1)}:
                    </span>
                    {f.message}
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                {brief.status === 'under_review' && (
                  <button
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                    onClick={() => {
                      setReviewModalItem(brief);
                      setReviewModalOpen(true);
                    }}
                  >
                    Review
                  </button>
                )}
                {brief.status === 'needs_revision' && (
                  <button
                    className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                    onClick={() => alert(`Open wizard to edit: ${brief.name}`)}
                  >
                    Edit Brief
                  </button>
                )}
                {brief.status === 'approved' && (
                  <button
                    className="px-3 py-1.5 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                    onClick={() => handleStartExperimentFromReview(brief)}
                  >
                    Start Experiment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* "Review" Modal */}
        {reviewModalOpen && reviewModalItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg max-h-[80vh] overflow-y-auto">
              <button
                onClick={closeReviewModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-2">Review Brief</h2>
              <p className="text-sm text-gray-600 mb-4">{reviewModalItem.name}</p>
              <p className="text-sm text-gray-700 mb-4">
                Approve this brief or request revision?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleReviewAction('needs_revision')}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Needs Revision
                </button>
                <button
                  onClick={() => handleReviewAction('approved')}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ------------------------------
  // 3.3) CURRENT EXPERIMENTS TAB
  // ------------------------------
  const [expSearch, setExpSearch] = useState('');
  const [expStatus, setExpStatus] = useState('all');
  const [expCategory, setExpCategory] = useState('all');
  const [expDateRange, setExpDateRange] = useState('all');
  const [customRange, setCustomRange] = useState({ start: '', end: '' });

  const completedCount = experiments.filter((e) => e.status === 'completed').length;
  const inProgressCount = experiments.filter((e) => e.status === 'in_progress').length;

  function isInDateRange(exp) {
    if (expDateRange === 'all') return true;
    const st = new Date(exp.startDate);
    const now = new Date();
    const qIndex = Math.floor(now.getMonth() / 3);
    const qStart = new Date(now.getFullYear(), qIndex * 3, 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    if (expDateRange === 'thisQuarter') {
      return st >= qStart;
    } else if (expDateRange === 'thisYear') {
      return st >= yearStart;
    } else if (expDateRange === 'custom') {
      if (!customRange.start || !customRange.end) return true;
      const userStart = new Date(customRange.start);
      const userEnd = new Date(customRange.end);
      return st >= userStart && st <= userEnd;
    }
    return true;
  }

  const filteredExperiments = experiments.filter((exp) => {
    const matchSearch = exp.name.toLowerCase().includes(expSearch.toLowerCase());
    const matchStatus = expStatus === 'all' || exp.status === expStatus;
    const matchCategory = expCategory === 'all' || exp.category === expCategory;
    const matchDate = isInDateRange(exp);
    return matchSearch && matchStatus && matchCategory && matchDate;
  });

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisExp, setAnalysisExp] = useState(null);

  function selectExperiment(exp) {
    setAnalysisExp(exp);
    setShowAnalysis(true);
  }
  function backToExpList() {
    setAnalysisExp(null);
    setShowAnalysis(false);
  }

  function renderExperimentsTab() {
    return (
      <div>
        {showAnalysis && analysisExp
          ? renderSingleExperimentAnalysis(analysisExp)
          : renderExperimentsList()}
      </div>
    );
  }

  function renderExperimentsList() {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Current Experiments</h1>
        <p className="text-sm text-gray-600">Track in-progress or completed experiments.</p>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm text-green-800">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{completedCount}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm text-blue-800">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{inProgressCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded border border-gray-200 mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search experiments..."
            className="flex-1 px-4 py-2 border rounded"
            value={expSearch}
            onChange={(e) => setExpSearch(e.target.value)}
          />
          <select
            className="appearance-none bg-white border rounded px-4 py-2"
            value={expStatus}
            onChange={(e) => setExpStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in_progress">In Progress</option>
          </select>
          <select
            className="appearance-none bg-white border rounded px-4 py-2"
            value={expCategory}
            onChange={(e) => setExpCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="monetization">Monetization</option>
            <option value="engagement">Engagement</option>
          </select>
          <select
            className="appearance-none bg-white border rounded px-4 py-2"
            value={expDateRange}
            onChange={(e) => setExpDateRange(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="thisQuarter">This Quarter</option>
            <option value="thisYear">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          {expDateRange === 'custom' && (
            <div className="flex space-x-2">
              <input
                type="date"
                className="border rounded px-3 py-1"
                value={customRange.start}
                onChange={(e) => setCustomRange((prev) => ({ ...prev, start: e.target.value }))}
              />
              <input
                type="date"
                className="border rounded px-3 py-1"
                value={customRange.end}
                onChange={(e) => setCustomRange((prev) => ({ ...prev, end: e.target.value }))}
              />
            </div>
          )}
        </div>

        {/* Experiment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExperiments.map((exp) => (
            <div
              key={exp.id}
              className="border rounded-lg p-6 bg-white hover:shadow transition cursor-pointer"
              onClick={() => selectExperiment(exp)}
            >
              <h3 className="text-lg font-bold text-gray-800">{exp.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {exp.startDate} - {exp.endDate}
              </p>
              <div className="mt-4">
                {exp.status === 'completed' ? (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Completed
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    In Progress
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderSingleExperimentAnalysis(exp) {
    const data = getTrendData(exp);
    return (
      <div className="space-y-6">
        {/* Back */}
        <div className="flex items-center">
          <button
            onClick={backToExpList}
            className="mr-4 px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{exp.name}</h1>
        </div>

        {/* Experiment info header */}
        <div className="bg-white p-4 rounded border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              {exp.startDate} - {exp.endDate}
            </p>
            {exp.status === 'completed' && (
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Completed</div>
            )}
            {exp.status === 'in_progress' && (
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">In Progress</div>
            )}
          </div>
        </div>

        {/* Goal + Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h3 className="text-blue-800 font-semibold mb-2">Campaign Goal</h3>
            <p className="text-sm text-blue-900">{exp.goal}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded border border-amber-200">
            <h3 className="text-amber-800 font-semibold mb-2">Target Audience</h3>
            {Array.isArray(exp.targetAudience) ? (
              <ul className="text-amber-900 text-sm space-y-1">
                {exp.targetAudience.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-amber-900">{exp.targetAudience}</p>
            )}
          </div>
        </div>

        {/* Hypothesis + Success Criteria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-4 rounded border border-purple-200">
            <h3 className="text-purple-800 font-semibold mb-2">Hypothesis</h3>
            <p className="text-sm text-purple-900">{exp.hypothesis}</p>
          </div>
          <div className="bg-green-50 p-4 rounded border border-green-200">
            <h3 className="text-green-800 font-semibold mb-2">Success Criteria</h3>
            <p className="text-sm text-green-900">{exp.successCriteria}</p>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-white p-4 rounded border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2">Trend Chart</h3>
          {data.length ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(val) => `${val}%`} />
                  <Tooltip formatter={(val) => `${val}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="standard" name="Standard" stroke="#8884d8" dot={false} />
                  <Line type="monotone" dataKey="personalized" name="Personalized" stroke="#82ca9d" dot={false} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No data available.</p>
          )}
        </div>

        {/* Control + Treatment Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Control Group</h3>
            <img
              src={exp.controlImage}
              alt="Control"
              className="rounded w-full h-auto object-cover"
            />
          </div>
          <div className="bg-white p-4 rounded border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Treatment Group</h3>
            <img
              src={exp.treatmentImage}
              alt="Treatment"
              className="rounded w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Completed or In-progress? */}
        {exp.status === 'completed' && (
          <div className="bg-green-50 p-4 rounded border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Primary Metric Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-green-900 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Improvement:</span>
                  <strong>+{exp.improvement}%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Significance:</span>
                  <strong>p={exp.significance}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Confidence:</span>
                  <strong>{exp.confidence}%</strong>
                </div>
              </div>
              <div className="bg-white p-3 rounded">
                <h4 className="text-sm font-medium text-amber-700">Recommendations</h4>
                <ul className="text-sm text-amber-900 list-disc list-inside mt-1 space-y-1">
                  <li>Roll out across all channels</li>
                  <li>Automate monitoring &amp; reporting</li>
                  <li>Plan next iteration test</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {exp.status === 'in_progress' && (
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Experiment Progress</h3>
            <div className="space-y-2 text-blue-900 text-sm">
              <div className="flex justify-between">
                <span>Progress:</span>
                <strong>{exp.progress}%</strong>
              </div>
              <div className="w-full bg-blue-200 h-2 rounded">
                <div
                  className="h-2 bg-blue-500 rounded transition-all duration-500"
                  style={{ width: `${exp.progress}%` }}
                />
              </div>
              <p className="text-blue-700 mt-2">
                Preliminary data indicates encouraging signs. Full analysis at day 30.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ------------------------------
  // 3.4) KNOWLEDGE HUB TAB
  // ------------------------------
  const [knowledgeSearch, setKnowledgeSearch] = useState('');
  const [knowledgeCategory, setKnowledgeCategory] = useState('all');

  const totalKnowledgeCount = knowledge.length;
  const monetizationCount = knowledge.filter((k) => k.category === 'monetization').length;
  const engagementCount = knowledge.filter((k) => k.category === 'engagement').length;

  const knowledgeFiltered = knowledge.filter((k) => {
    const matchName = k.name.toLowerCase().includes(knowledgeSearch.toLowerCase());
    const matchTags = k.tags.some((tag) => tag.toLowerCase().includes(knowledgeSearch.toLowerCase()));
    const matchCat = knowledgeCategory === 'all' || k.category === knowledgeCategory;
    return (matchName || matchTags) && matchCat;
  });

  const [showKnowledgeModal, setShowKnowledgeModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const [showApplyInsightsModal, setShowApplyInsightsModal] = useState(false);
  const [insightsItem, setInsightsItem] = useState(null);

  function openKnowledgeDetails(item) {
    setModalItem(item);
    setShowKnowledgeModal(true);
  }
  function closeKnowledgeDetails() {
    setModalItem(null);
    setShowKnowledgeModal(false);
  }

  function openApplyInsights(item) {
    setInsightsItem(item);
    setShowApplyInsightsModal(true);
  }
  function closeApplyInsights() {
    setInsightsItem(null);
    setShowApplyInsightsModal(false);
  }

  function applyInsightsToWizard() {
    if (!insightsItem) return;
    // Prefill wizard
    setWizardData((prev) => ({
      ...prev,
      name: `Insights from: ${insightsItem.name}`,
      hypothesis: `Based on prior test '${insightsItem.name}', we anticipate a similar improvement.`,
      successCriteria: 'Replicate or exceed prior improvement (~10%)'
    }));
    setShowApplyInsightsModal(false);
    setShowWizard(true);
    setWizardStep(1);
  }

  function renderKnowledgeTab() {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Knowledge Hub</h1>
        <p className="text-sm text-gray-600">Explore lessons learned from past experiments.</p>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-600">Total Past Experiments</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{totalKnowledgeCount}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm text-green-800">Monetization</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{monetizationCount}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm text-blue-800">Engagement</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{engagementCount}</p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 my-4">
          <input
            type="text"
            placeholder="Search insights or tags..."
            className="flex-1 p-2 border rounded"
            value={knowledgeSearch}
            onChange={(e) => setKnowledgeSearch(e.target.value)}
          />
          <select
            className="appearance-none bg-white border rounded px-4 py-2"
            value={knowledgeCategory}
            onChange={(e) => setKnowledgeCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="monetization">Monetization</option>
            <option value="engagement">Engagement</option>
          </select>
        </div>

        {/* Quick Tag Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['recommendations', 'personalization', 'ui', 'button', 'comments'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm cursor-pointer hover:bg-gray-200"
              onClick={() => setKnowledgeSearch(tag)}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Knowledge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {knowledgeFiltered.map((k) => (
            <div key={k.id} className="border rounded bg-white overflow-hidden hover:shadow transition">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{k.name}</h3>
                    <p className="text-sm text-gray-500">{k.date}</p>
                  </div>
                  <div
                    className={`px-3 py-1 text-sm font-medium rounded ${
                      k.improvement > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {k.improvement > 0 ? `+${k.improvement}%` : `${k.improvement}%`}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {k.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded cursor-pointer hover:bg-gray-200"
                      onClick={() => setKnowledgeSearch(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-2">
                  {k.insights.map((ins, idx) => (
                    <li key={idx}>{ins}</li>
                  ))}
                </ul>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${
                    k.category === 'monetization'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {k.category}
                </span>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                    onClick={() => {
                      setModalItem(k);
                      setShowKnowledgeModal(true);
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                    onClick={() => {
                      setInsightsItem(k);
                      setShowApplyInsightsModal(true);
                    }}
                  >
                    Apply Insights
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "View Details" Modal */}
        {showKnowledgeModal && modalItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg max-h-[80vh] overflow-y-auto">
              <button
                onClick={closeKnowledgeDetails}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold mb-2">{modalItem.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{modalItem.date}</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-4">
                {modalItem.insights.map((ins, i) => (
                  <li key={i}>{ins}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-600">
                Improvement: {modalItem.improvement}% (p={modalItem.significance}), Confidence:{' '}
                {modalItem.confidence}%
              </p>
            </div>
          </div>
        )}

        {/* "Apply Insights" Modal */}
        {showApplyInsightsModal && insightsItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg max-h-[80vh] overflow-y-auto">
              <button
                onClick={closeApplyInsights}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Apply Insights</h2>
              <p className="text-sm text-gray-700 mb-2">
                Prefill a new brief using insights from <strong>{insightsItem.name}</strong>?
              </p>
              <p className="text-xs text-gray-500 mb-4">This opens the wizard with partial data.</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeApplyInsights}
                  className="px-3 py-1.5 border rounded text-gray-600 hover:bg-gray-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={applyInsightsToWizard}
                  className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ------------------------------
  // 3.5) NEW ANALYSIS WIZARD
  // ------------------------------
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardAI, setWizardAI] = useState(false);

  const [wizardData, setWizardData] = useState({
    name: '',
    category: '',
    startDate: '',
    endDate: '',
    goal: '',
    primaryMetric: '',
    targetAudience: '',
    hypothesis: '',
    successCriteria: '',
    controlDetails: '',
    treatmentDetails: '',
    template: 'standard',
    controlPdfFile: null,
    controlImageFile: null,
    controlSubjectLine: '',
    controlHeader: '',
    treatmentPdfFile: null,
    treatmentImageFile: null,
    treatmentSubjectLine: '',
    treatmentHeader: ''
  });

  const briefTemplates = [
    { id: 'standard', name: 'Standard A/B Test' },
    { id: 'multivariate', name: 'Multivariate Test' },
    { id: 'personalization', name: 'Personalization Experiment' }
  ];

  function generateWizardText(field) {
    setWizardAI(true);
    setTimeout(() => {
      let suggestion = '';
      if (field === 'hypothesis') {
        suggestion =
          wizardData.category === 'monetization'
            ? `If we implement ${wizardData.treatmentDetails || '[treatment]'}, then conversion might be ~15% higher vs. ${wizardData.controlDetails || '[control]'} due to a clearer paywall.`
            : `If we implement ${wizardData.treatmentDetails || '[treatment]'}, user engagement might rise ~20% vs. ${wizardData.controlDetails || '[control]'} (UI improvements).`;
      } else if (field === 'successCriteria') {
        suggestion = `Achieve >=15% lift in ${wizardData.primaryMetric || 'the metric'} at 95% confidence.`;
      }
      setWizardData((prev) => ({ ...prev, [field]: suggestion }));
      setWizardAI(false);
    }, 1200);
  }

  function handleFileChange(e, field) {
    const file = e.target.files[0] || null;
    setWizardData((prev) => ({ ...prev, [field]: file }));
  }

  function closeWizard() {
    setShowWizard(false);
    setWizardStep(1);
    setWizardAI(false);
    setWizardData({
      name: '',
      category: '',
      startDate: '',
      endDate: '',
      goal: '',
      primaryMetric: '',
      targetAudience: '',
      hypothesis: '',
      successCriteria: '',
      controlDetails: '',
      treatmentDetails: '',
      template: 'standard',
      controlPdfFile: null,
      controlImageFile: null,
      controlSubjectLine: '',
      controlHeader: '',
      treatmentPdfFile: null,
      treatmentImageFile: null,
      treatmentSubjectLine: '',
      treatmentHeader: ''
    });
  }

  function handleWizardFinalSubmit() {
    const newBriefId = `brief-auto-${Math.floor(Math.random() * 10000)}`;
    const newBrief = {
      id: newBriefId,
      name: wizardData.name || 'Untitled Brief',
      submittedBy: 'You',
      submittedDate: new Date().toLocaleDateString(),
      status: 'under_review',
      feedback: [
        { type: 'statistical', status: 'warning', message: 'Awaiting final check' }
      ],
      businessGoal: wizardData.goal,
      primaryMetric: wizardData.primaryMetric,
      targetAudience: wizardData.targetAudience,
      hypothesis: wizardData.hypothesis,
      successCriteria: wizardData.successCriteria
    };
    setReviews((prev) => [...prev, newBrief]);
    alert('New brief created (Under Review)!');
    closeWizard();
  }

  // ------------------------------
  // RENDER MAIN
  // ------------------------------
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HEADER */}
      <header className="bg-white shadow flex items-center justify-between px-6 py-3">
        <h1 className="font-bold text-gray-800 text-lg">E2E Experiment Platform</h1>
        <button
          onClick={() => {
            setActiveTab('planning');
            setShowWizard(true);
          }}
          className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 text-sm"
        >
          + New Brief
        </button>
      </header>

      {/* TAB NAV */}
      <div className="bg-white border-b border-gray-200 px-6">
        <nav className="flex space-x-6">
          <button
            onClick={() => {
              setActiveTab('planning');
              setShowWizard(false);
            }}
            className={`py-3 text-sm ${
              activeTab === 'planning'
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Planning
          </button>
          <button
            onClick={() => {
              setActiveTab('reviews');
              setShowWizard(false);
            }}
            className={`py-3 text-sm ${
              activeTab === 'reviews'
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => {
              setActiveTab('experiments');
              setShowWizard(false);
            }}
            className={`py-3 text-sm ${
              activeTab === 'experiments'
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Current Experiments
          </button>
          <button
            onClick={() => {
              setActiveTab('knowledge');
              setShowWizard(false);
            }}
            className={`py-3 text-sm ${
              activeTab === 'knowledge'
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Knowledge Hub
          </button>
        </nav>
      </div>

      {/* CONTENT */}
      <main className="p-6">
        {activeTab === 'planning' && renderPlanningTab()}
        {activeTab === 'reviews' && renderReviewsTab()}
        {activeTab === 'experiments' && renderExperimentsTab()}
        {activeTab === 'knowledge' && renderKnowledgeTab()}
      </main>

{/* NEW ANALYSIS WIZARD MODAL */}
{showWizard && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg w-full max-w-4xl relative shadow-lg flex flex-col max-h-[90vh]">
      {/* Close Button */}
      <button
        onClick={closeWizard}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
      >
        ✕
      </button>

      {/* Wizard Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">New Experiment Brief</h2>
      </div>

      {/* 
        CRUCIAL FIX:
        - The container is set up as a flex column with min-h-0.
        - The middle section (step content) is made scrollable via overflow-y-auto.
        - The bottom nav is outside the scrollable area.
      */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Step Indicators */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className="flex flex-col items-center"
                  onClick={() => step < wizardStep && setWizardStep(step)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      wizardStep >= step
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    } ${step < wizardStep ? 'cursor-pointer' : ''}`}
                  >
                    {step}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">
                    {step === 1
                      ? 'Basics'
                      : step === 2
                      ? 'Goals & Metrics'
                      : step === 3
                      ? 'Variants'
                      : 'Review'}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2 h-1 bg-gray-200">
              <div
                className="absolute h-1 bg-blue-500 transition-all duration-300"
                style={{ width: `${((wizardStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-4">
            {wizardStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-800">Basic Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {briefTemplates.map((t) => (
                      <div
                        key={t.id}
                        onClick={() =>
                          setWizardData((prev) => ({ ...prev, template: t.id }))
                        }
                        className={`border p-3 rounded-lg cursor-pointer ${
                          wizardData.template === t.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-800">{t.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {t.id === 'standard'
                            ? 'Two variants, one variable'
                            : t.id === 'multivariate'
                            ? 'Multiple variables'
                            : 'Personalized segments'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experiment Name*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={wizardData.name}
                    onChange={(e) =>
                      setWizardData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter a descriptive name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    value={wizardData.category}
                    onChange={(e) =>
                      setWizardData((prev) => ({ ...prev, category: e.target.value }))
                    }
                  >
                    <option value="">Select category</option>
                    <option value="monetization">Monetization</option>
                    <option value="engagement">Engagement</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={wizardData.startDate}
                      onChange={(e) =>
                        setWizardData((prev) => ({ ...prev, startDate: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={wizardData.endDate}
                      onChange={(e) =>
                        setWizardData((prev) => ({ ...prev, endDate: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-800">Goals & Metrics</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Goal*
                  </label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={2}
                    value={wizardData.goal}
                    onChange={(e) =>
                      setWizardData((prev) => ({ ...prev, goal: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Metric*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={wizardData.primaryMetric}
                    onChange={(e) =>
                      setWizardData((prev) => ({ ...prev, primaryMetric: e.target.value }))
                    }
                    placeholder="e.g., Conversion Rate, Watch Time"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={wizardData.targetAudience}
                    onChange={(e) =>
                      setWizardData((prev) => ({ ...prev, targetAudience: e.target.value }))
                    }
                    placeholder="e.g., Logged-in users, US-based"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hypothesis*
                  </label>
                  <div className="flex space-x-2">
                    <textarea
                      className="flex-1 p-2 border rounded"
                      rows={3}
                      value={wizardData.hypothesis}
                      onChange={(e) =>
                        setWizardData((prev) => ({ ...prev, hypothesis: e.target.value }))
                      }
                    />
                    <button
                      type="button"
                      className={`px-3 py-2 rounded ${
                        wizardAI
                          ? 'bg-gray-300 text-gray-400'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                      onClick={() => generateWizardText('hypothesis')}
                      disabled={wizardAI}
                    >
                      {wizardAI ? '...' : 'AI'}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Success Criteria*
                  </label>
                  <div className="flex space-x-2">
                    <textarea
                      className="flex-1 p-2 border rounded"
                      rows={2}
                      value={wizardData.successCriteria}
                      onChange={(e) =>
                        setWizardData((prev) => ({ ...prev, successCriteria: e.target.value }))
                      }
                    />
                    <button
                      type="button"
                      className={`px-3 py-2 rounded ${
                        wizardAI
                          ? 'bg-gray-300 text-gray-400'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                      onClick={() => generateWizardText('successCriteria')}
                      disabled={wizardAI}
                    >
                      {wizardAI ? '...' : 'AI'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Test Variants</h3>
                {/* Control */}
                <div className="border p-4 rounded-lg bg-gray-50 mb-4">
                  <h4 className="font-medium text-gray-800 mb-3">Control Variant</h4>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      className="w-full p-2 border rounded"
                      rows={2}
                      value={wizardData.controlDetails}
                      onChange={(e) =>
                        setWizardData((prev) => ({ ...prev, controlDetails: e.target.value }))
                      }
                      placeholder="Describe the current experience"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Line (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={wizardData.controlSubjectLine}
                      onChange={(e) =>
                        setWizardData((prev) => ({ ...prev, controlSubjectLine: e.target.value }))
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Header (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={wizardData.controlHeader}
                      onChange={(e) =>
                        setWizardData((prev) => ({ ...prev, controlHeader: e.target.value }))
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PDF/Doc Upload
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'controlPdfFile')}
                      className="block w-full"
                    />
                    {wizardData.controlPdfFile && (
                      <p className="text-sm text-green-700 mt-1">
                        {wizardData.controlPdfFile.name} selected
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Upload (PNG/JPG)
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleFileChange(e, 'controlImageFile')}
                      className="block w-full"
                    />
                    {wizardData.controlImageFile && (
                      <p className="text-sm text-green-700 mt-1">
                        {wizardData.controlImageFile.name} selected
                      </p>
                    )}
                  </div>
                </div>

                {/* Treatment */}
                <div className="border p-4 rounded-lg bg-blue-50">
                  <h4 className="font-medium text-gray-800 mb-3">Treatment Variant</h4>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      className="w-full p-2 border rounded"
                      rows={2}
                      value={wizardData.treatmentDetails}
                      onChange={(e) =>
                        setWizardData((prev) => ({ ...prev, treatmentDetails: e.target.value }))
                      }
                      placeholder="Describe the new experience"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Line (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={wizardData.treatmentSubjectLine}
                      onChange={(e) =>
                        setWizardData((prev) => ({ ...prev, treatmentSubjectLine: e.target.value }))
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Header (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={wizardData.treatmentHeader}
                      onChange={(e) =>
                        setWizardData((prev) => ({ ...prev, treatmentHeader: e.target.value }))
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PDF/Doc Upload
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'treatmentPdfFile')}
                      className="block w-full"
                    />
                    {wizardData.treatmentPdfFile && (
                      <p className="text-sm text-green-700 mt-1">
                        {wizardData.treatmentPdfFile.name} selected
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Upload (PNG/JPG)
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleFileChange(e, 'treatmentImageFile')}
                      className="block w-full"
                    />
                    {wizardData.treatmentImageFile && (
                      <p className="text-sm text-green-700 mt-1">
                        {wizardData.treatmentImageFile.name} selected
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Review Your Brief</h3>
                <div className="border rounded overflow-hidden">
                  <div className="p-4 bg-blue-50 border-b">
                    <h4 className="font-medium text-blue-800">{wizardData.name || 'Unnamed'}</h4>
                    <div className="flex items-center text-sm text-blue-600 mt-1">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          wizardData.category === 'monetization'
                            ? 'bg-green-500'
                            : 'bg-blue-500'
                        }`}
                      />
                      {wizardData.category || 'No category'}
                      <span className="mx-2">•</span>
                      {wizardData.startDate && wizardData.endDate
                        ? `${wizardData.startDate} to ${wizardData.endDate}`
                        : 'No dates'}
                    </div>
                  </div>
                  <div className="p-4 border-b">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">Business Goal</h5>
                        <p className="text-sm text-gray-600 mt-1">
                          {wizardData.goal || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">Primary Metric</h5>
                        <p className="text-sm text-gray-600 mt-1">
                          {wizardData.primaryMetric || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b">
                    <h5 className="text-sm font-medium text-gray-700">Hypothesis</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {wizardData.hypothesis || 'N/A'}
                    </p>
                  </div>
                  <div className="p-4 border-b">
                    <h5 className="text-sm font-medium text-gray-700">Success Criteria</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {wizardData.successCriteria || 'N/A'}
                    </p>
                  </div>
                  <div className="p-4">
                    <h5 className="text-sm font-medium text-gray-700">Variants</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="p-2 bg-gray-50 rounded border">
                        <span className="text-xs font-medium text-gray-500">Control:</span>
                        <p className="text-sm text-gray-600 mt-1">
                          {wizardData.controlDetails || 'N/A'}
                        </p>
                        {wizardData.controlPdfFile && (
                          <p className="text-xs text-green-700 mt-1">
                            PDF: {wizardData.controlPdfFile.name}
                          </p>
                        )}
                        {wizardData.controlImageFile && (
                          <p className="text-xs text-green-700">
                            Image: {wizardData.controlImageFile.name}
                          </p>
                        )}
                      </div>
                      <div className="p-2 bg-blue-50 rounded border">
                        <span className="text-xs font-medium text-gray-500">Treatment:</span>
                        <p className="text-sm text-gray-600 mt-1">
                          {wizardData.treatmentDetails || 'N/A'}
                        </p>
                        {wizardData.treatmentPdfFile && (
                          <p className="text-xs text-green-700 mt-1">
                            PDF: {wizardData.treatmentPdfFile.name}
                          </p>
                        )}
                        {wizardData.treatmentImageFile && (
                          <p className="text-xs text-green-700">
                            Image: {wizardData.treatmentImageFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded border border-green-200 mt-3">
                  <h4 className="font-medium text-green-800">AI-Powered Brief Review</h4>
                  <div className="mt-2 space-y-2 text-green-700 text-sm">
                    <div className="flex items-start">
                      <span className="mr-2">✓</span> All required fields completed
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span> Hypothesis follows best practices
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span> Success criteria is measurable &amp; specific
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Wizard Nav (always visible) */}
        <div className="border-t p-6 flex justify-between">
          {wizardStep > 1 && (
            <button
              type="button"
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
              onClick={() => setWizardStep(wizardStep - 1)}
            >
              Back
            </button>
          )}
          {wizardStep < 4 ? (
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto"
              onClick={() => setWizardStep(wizardStep + 1)}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-auto"
              onClick={handleWizardFinalSubmit}
            >
              Create Brief
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}