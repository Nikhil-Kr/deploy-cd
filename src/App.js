import React, { useState, useEffect } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts";
import ForceGraph2D from "react-force-graph-2d";

/* ---------------------------------------------------------------------------
   1) TREND DATA FOR CHARTS (Expanded)
   --------------------------------------------------------------------------- */
const membershipTrends = [
  { date: "Mar 1", standard: 2.0, personalized: 2.8 },
  { date: "Mar 2", standard: 1.9, personalized: 2.9 },
  { date: "Mar 3", standard: 2.1, personalized: 3.0 },
  { date: "Mar 4", standard: 2.0, personalized: 2.9 },
  { date: "Mar 5", standard: 1.9, personalized: 2.8 },
  { date: "Mar 6", standard: 2.1, personalized: 3.0 },
  { date: "Mar 7", standard: 2.0, personalized: 2.9 },
  { date: "Mar 8", standard: 2.0, personalized: 2.9 },
  { date: "Mar 9", standard: 2.1, personalized: 3.0 },
  { date: "Mar 10", standard: 1.9, personalized: 2.8 },
];

const yppTrends = [
  { date: "Feb 1", standard: 2.1, personalized: 2.6 },
  { date: "Feb 2", standard: 2.0, personalized: 2.7 },
  { date: "Feb 3", standard: 2.2, personalized: 2.8 },
  { date: "Feb 4", standard: 2.1, personalized: 2.7 },
  { date: "Feb 5", standard: 2.0, personalized: 2.6 },
  { date: "Feb 6", standard: 2.2, personalized: 2.8 },
  { date: "Feb 7", standard: 2.1, personalized: 2.7 },
];

const engagementTrends = [
  { date: "Mar 15", standard: 5.2, personalized: 6.1 },
  { date: "Mar 16", standard: 5.3, personalized: 6.3 },
  { date: "Mar 17", standard: 5.1, personalized: 6.2 },
];

// Added failed experiment trend data
const searchTrends = [
  { date: "Mar 1", standard: 4.5, personalized: 4.2 },
  { date: "Mar 2", standard: 4.6, personalized: 4.3 },
  { date: "Mar 3", standard: 4.4, personalized: 4.1 },
  { date: "Mar 4", standard: 4.5, personalized: 4.0 },
  { date: "Mar 5", standard: 4.7, personalized: 4.2 },
];

// Added multivariate experiment trend data
const multivariateTrends = [
  {
    date: "Apr 1",
    control: 2.0,
    variantA: 2.2,
    variantB: 1.9,
    variantC: 2.5,
    variantD: 2.1,
  },
  {
    date: "Apr 2",
    control: 2.1,
    variantA: 2.3,
    variantB: 1.8,
    variantC: 2.7,
    variantD: 2.2,
  },
  {
    date: "Apr 3",
    control: 2.0,
    variantA: 2.4,
    variantB: 1.7,
    variantC: 2.8,
    variantD: 2.3,
  },
  {
    date: "Apr 4",
    control: 2.2,
    variantA: 2.6,
    variantB: 1.9,
    variantC: 3.0,
    variantD: 2.4,
  },
  {
    date: "Apr 5",
    control: 2.1,
    variantA: 2.5,
    variantB: 1.8,
    variantC: 2.9,
    variantD: 2.2,
  },
];

function getTrendData(exp) {
  if (!exp) return [];
  switch (exp.id) {
    case "mem-001":
      return membershipTrends;
    case "ypp-001":
      return yppTrends;
    case "eng-001":
      return engagementTrends;
    case "search-001":
      return searchTrends;
    case "multi-001":
      return multivariateTrends;
    default:
      return [];
  }
}

/* ---------------------------------------------------------------------------
   2) LIFECYCLE STATUS DEFINITIONS
   --------------------------------------------------------------------------- */
const LIFECYCLE_STAGES = {
  PLANNING: {
    DRAFT: {
      label: "Draft",
      color: "amber",
      description: "Initial concept being developed",
      order: 1,
    },
    BACKLOG: {
      label: "Backlog",
      color: "gray",
      description: "Queued for future planning",
      order: 2,
    },
    PLANNED: {
      label: "Planned",
      color: "blue",
      description: "Scheduled to run",
      order: 3,
    },
  },
  REVIEW: {
    UNDER_REVIEW: {
      label: "Under Review",
      color: "blue",
      description: "Awaiting approval",
      order: 4,
    },
    NEEDS_REVISION: {
      label: "Needs Revision",
      color: "red",
      description: "Changes requested",
      order: 5,
    },
    APPROVED: {
      label: "Approved",
      color: "green",
      description: "Ready to start",
      order: 6,
    },
  },
  EXECUTION: {
    IN_PROGRESS: {
      label: "In Progress",
      color: "blue",
      description: "Currently running",
      order: 7,
    },
    PAUSED: {
      label: "Paused",
      color: "amber",
      description: "Temporarily halted",
      order: 8,
    },
    COMPLETED: {
      label: "Completed",
      color: "green",
      description: "Finished running",
      order: 9,
    },
  },
  KNOWLEDGE: {
    ANALYZING: {
      label: "Analyzing",
      color: "purple",
      description: "Results being analyzed",
      order: 10,
    },
    DOCUMENTED: {
      label: "Documented",
      color: "indigo",
      description: "Insights recorded",
      order: 11,
    },
    APPLIED: {
      label: "Applied",
      color: "teal",
      description: "Knowledge being used",
      order: 12,
    },
  },
};

/* ---------------------------------------------------------------------------
   3) TEMPLATE DEFINITIONS
   --------------------------------------------------------------------------- */
const briefTemplates = [
  {
    id: "standard",
    name: "Standard A/B Test",
    description: "Compare two variants with a single variable changed",
    icon: "split-test",
    recommendedFor: "Most experiment types",
    complexity: "Low",
    details:
      "A standard A/B test compares two versions of a single element to determine which performs better according to your defined metrics.",
  },
  {
    id: "multivariate",
    name: "Multivariate Test",
    description: "Test multiple variables simultaneously",
    icon: "matrix",
    recommendedFor: "Complex interfaces with multiple elements",
    complexity: "High",
    details:
      "Multivariate testing enables you to test multiple variables simultaneously, helping you understand how different elements interact with each other.",
  },
  {
    id: "personalization",
    name: "Personalization Test",
    description: "Test different experiences for different user segments",
    icon: "users",
    recommendedFor: "Tailoring experiences to user groups",
    complexity: "Medium",
    details:
      "Personalization tests allow you to serve different variants to different audience segments, measuring how each segment responds to various experiences.",
  },
  {
    id: "holdout",
    name: "Holdout Test",
    description:
      "Measure the impact of a feature by removing it for some users",
    icon: "shield",
    recommendedFor: "Evaluating existing features",
    complexity: "Medium",
    details:
      "A holdout test creates a control group that doesn't receive a feature or change, allowing you to measure the true impact of existing features.",
  },
];

const initialRoadmap = [
  {
    id: "roadmap-001",
    name: "Homepage Redesign Validation",
    category: "engagement",
    priority: "high",
    status: LIFECYCLE_STAGES.PLANNING.PLANNED.label.toLowerCase(),
    lifecycleStage: "planning",
    startDate: "Apr 1, 2025",
    endDate: "Apr 14, 2025",
    duration: "2 weeks",
    goal: "Validate new homepage design effectiveness",
    hypothesis: "New layout improves content discovery by 15%",
    metrics: ["Time on page", "Content clicks", "Return visits"],
    progress: 0,
    owner: "Sarah Chen",
    createdDate: "Mar 5, 2025",
    learningAgenda:
      "Understand how the new layout affects user navigation patterns and content discovery",
    okrs: ["okr-001"],
  },
  {
    id: "roadmap-002",
    name: "Premium Tier Feature Test",
    category: "monetization",
    priority: "medium",
    status: LIFECYCLE_STAGES.PLANNING.DRAFT.label.toLowerCase(),
    lifecycleStage: "planning",
    startDate: "May 1, 2025",
    endDate: "May 21, 2025",
    duration: "3 weeks",
    goal: "Determine best feature set for premium subscription",
    hypothesis: "Feature bundle B raises conversion by 20%",
    metrics: ["Conversion rate", "Upgrade rate", "Feature usage"],
    progress: 0,
    owner: "Miguel Rodriguez",
    createdDate: "Mar 1, 2025",
    learningAgenda:
      "Identify which premium features drive the highest conversion rates and user satisfaction",
    okrs: ["okr-002"],
  },
  {
    id: "roadmap-003",
    name: "Personalized Notification Timing",
    category: "engagement",
    priority: "low",
    status: LIFECYCLE_STAGES.PLANNING.BACKLOG.label.toLowerCase(),
    lifecycleStage: "planning",
    startDate: "Jun 15, 2025",
    endDate: "Jul 13, 2025",
    duration: "4 weeks",
    goal: "Optimize notification timing",
    hypothesis:
      "Time-zone adjusted notifications will improve open rates by 25%",
    metrics: ["Open rate", "Engagement", "Retention"],
    progress: 0,
    owner: "Taylor Wilson",
    createdDate: "Feb 20, 2025",
    learningAgenda:
      "Learn how timing affects notification effectiveness across different user segments",
    okrs: ["okr-001"],
  },
];

const initialReviews = [
  {
    id: "brief-001",
    name: "Mobile Notification Optimization",
    submittedBy: "Michael Wong",
    submittedDate: "Mar 10, 2025",
    status: LIFECYCLE_STAGES.REVIEW.NEEDS_REVISION.label.toLowerCase(),
    lifecycleStage: "review",
    dueDate: "Mar 17, 2025",
    feedback: [
      {
        type: "statistical",
        status: "error",
        message: "Measurement period too short",
      },
      {
        type: "business",
        status: "warning",
        message: "Unclear alignment with Q2 goals",
      },
      {
        type: "operational",
        status: "success",
        message: "Technical plan feasible",
      },
    ],
    businessGoal: "Increase mobile CTR by 10%",
    primaryMetric: "Click-through Rate",
    targetAudience: "All mobile app users, push notifications",
    hypothesis:
      "Time-based push notifications yield 10% higher CTR vs. immediate triggers",
    successCriteria: "At least 10% improvement with 95% significance",
    owner: "Michael Wong",
    reviewers: ["Alex Johnson", "Lisa Park"],
    learningAgenda:
      "Understand optimal timing patterns for different user segments",
    okrs: ["okr-001"],
  },
  {
    id: "brief-002",
    name: "Homepage Personalization Brief",
    submittedBy: "Alice Smith",
    submittedDate: "Mar 12, 2025",
    status: LIFECYCLE_STAGES.REVIEW.UNDER_REVIEW.label.toLowerCase(),
    lifecycleStage: "review",
    dueDate: "Mar 19, 2025",
    feedback: [
      {
        type: "statistical",
        status: "warning",
        message: "Sample size borderline",
      },
      {
        type: "business",
        status: "success",
        message: "Aligns with Q2 personalization initiative",
      },
    ],
    businessGoal: "Boost user retention via homepage personalization",
    primaryMetric: "Retention Rate",
    targetAudience: "Logged-in homepage visitors, US region",
    hypothesis: "Personalized feed layout will improve retention by 15%",
    successCriteria: "At least 15% improvement with 95% significance",
    owner: "Alice Smith",
    reviewers: ["Robert Chen", "Sam Taylor"],
    learningAgenda:
      "Discover which personalization factors have the strongest effect on retention",
    okrs: ["okr-001"],
  },
  {
    id: "brief-003",
    name: "Premium Upsell Brief",
    submittedBy: "Tom Brown",
    submittedDate: "Mar 8, 2025",
    status: LIFECYCLE_STAGES.REVIEW.APPROVED.label.toLowerCase(),
    lifecycleStage: "review",
    dueDate: "Mar 15, 2025",
    feedback: [
      {
        type: "statistical",
        status: "success",
        message: "Power analysis looks good",
      },
      {
        type: "business",
        status: "success",
        message: "Directly supports monetization goals",
      },
    ],
    businessGoal: "Increase premium conversions among free users",
    primaryMetric: "Upgrade Rate",
    targetAudience: "Active free users in the last 30 days",
    hypothesis:
      'A new "Premium trial" CTA will raise upgrade rate by 20% vs. existing CTA',
    successCriteria: "20% improvement with 95% confidence",
    owner: "Tom Brown",
    reviewers: ["James Wilson", "Priya Patel", "Sarah Chen"],
    nextSteps: "Ready for implementation",
    learningAgenda:
      "Identify which messaging most effectively converts free to premium users",
    okrs: ["okr-002"],
  },
];

// Updated and expanded experiment data
const initialExperiments = [
  {
    id: "mem-001",
    name: "Channel Membership Optimization",
    status: LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase(),
    lifecycleStage: "execution",
    category: "monetization",
    startDate: "Mar 1, 2025",
    endDate: "Mar 30, 2025",
    daysRunning: 30,
    daysTotal: 30,
    primaryMetric: "Membership Conversion Rate",
    improvement: 40,
    significance: 0.0012,
    confidence: 95,
    impact: "800+ new members",
    goal: "Increase membership conversion rate via personalized messaging",
    hypothesis: "Personalized membership prompts vs. generic prompts",
    targetAudience: [
      "Watched >3 videos in last 30 days",
      "English-speaking global audience",
      "Active watchers >5 min watch time",
    ],
    successCriteria: "15% improvement in conversion with 95% significance",
    // Images instead of URLs
    controlImage: "/api/placeholder/500/300?text=Generic+Membership+Prompt",
    treatmentImage:
      "/api/placeholder/500/300?text=Personalized+Membership+Prompt",
    progress: 100,
    okrs: ["okr-001"],
    learningAgenda:
      "Understand how personalization affects subscription conversion",
    owner: "Alex Johnson",
    team: ["Michael Wong", "Lisa Park"],
    knowledgeStatus: LIFECYCLE_STAGES.KNOWLEDGE.ANALYZING.label.toLowerCase(),
    segmentedResults: [
      { name: "New Users", improvement: 52 },
      { name: "Returning Users", improvement: 38 },
      { name: "Mobile Users", improvement: 45 },
      { name: "Desktop Users", improvement: 35 },
    ],
    aiAnalysis:
      "The personalized membership prompts significantly outperformed generic prompts with a 40% improvement in conversion rate. This effect was strongest among new users (+52%) and mobile users (+45%), suggesting that personalization resonates most with these segments. The p-value of 0.0012 indicates these results are highly statistically significant.\n\nKey factors driving this success likely include:\n1. Content relevance based on viewing history\n2. Timing of the prompt after engagement with similar content\n3. Mobile-optimized presentation of personalized value propositions\n\nRecommended next steps:\n1. Implement personalized prompts across all channels\n2. Test variations that emphasize specific benefits for different user segments\n3. Explore extending personalization to pricing tiers based on usage patterns",
  },
  {
    id: "ypp-001",
    name: "YouTube Partner Program Enrollment",
    status: LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase(),
    lifecycleStage: "execution",
    category: "monetization",
    startDate: "Feb 1, 2025",
    endDate: "Feb 28, 2025",
    daysRunning: 28,
    daysTotal: 28,
    primaryMetric: "YPP Application Rate",
    improvement: 25,
    significance: 0.0034,
    confidence: 95,
    impact: "500+ new partners",
    goal: "Increase YPP enrollments with progress tracking notifications",
    hypothesis:
      "Creators who see milestone progress are 25% more likely to apply than control",
    targetAudience: [
      "Channels within 20% of YPP eligibility",
      "All categories, 750-1500 subs",
      "Watch Time >3000 hours last 12 months",
    ],
    successCriteria: "20%+ app rate lift with 95% significance",
    // Images instead of URLs
    controlImage: "/api/placeholder/500/300?text=Standard+Eligibility+Notice",
    treatmentImage:
      "/api/placeholder/500/300?text=Progress+Tracking+Notifications",
    progress: 100,
    okrs: ["okr-002"],
    learningAgenda:
      "Identify what motivates creators to complete the YPP application process",
    owner: "James Wilson",
    team: ["Priya Patel", "Tom Brown"],
    knowledgeStatus: LIFECYCLE_STAGES.KNOWLEDGE.DOCUMENTED.label.toLowerCase(),
    segmentedResults: [
      { name: "Gaming Creators", improvement: 30 },
      { name: "Vlog Creators", improvement: 22 },
      { name: "Educational Content", improvement: 28 },
      { name: "Entertainment", improvement: 21 },
    ],
    aiAnalysis:
      "The progress tracking notifications achieved a statistically significant 25% increase in YPP application rates. Gaming creators showed the strongest response (+30%), followed by educational content creators (+28%).\n\nThe psychology of visible progress appears to motivate creators to take action toward monetization. The milestone visualization creates both a sense of achievement for current progress and clearly shows the remaining steps, reducing perceived friction.\n\nKey insights:\n1. Transparent progress visualization increases motivation to complete the application\n2. Different creator segments respond with varying levels of enthusiasm\n3. The timing of notifications relative to milestone achievement is critical\n\nRecommended follow-up experiments:\n1. Test different milestone granularity (fewer vs. more milestones)\n2. Create segment-specific messaging for gaming vs. educational creators\n3. Explore additional motivational elements like social proof from similar creators",
  },
  {
    id: "eng-001",
    name: "Video Engagement Prompts",
    status: LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase(),
    lifecycleStage: "execution",
    category: "engagement",
    startDate: "Mar 15, 2025",
    endDate: "Apr 15, 2025",
    daysRunning: 14,
    daysTotal: 31,
    primaryMetric: "Comment Rate",
    improvement: null,
    significance: null,
    confidence: null,
    impact: "Pending",
    goal: "Boost meaningful engagement with contextual prompts",
    hypothesis:
      "Time-stamped prompts referencing video moments drive more discussion vs. generic boxes",
    targetAudience: [
      "Videos >5 minutes",
      "Educational, How-to, Commentary",
      "English language",
      "Desktop + Mobile web",
    ],
    successCriteria: "25% increase in comment rate with no drop in quality",
    // Images instead of URLs
    controlImage: "/api/placeholder/500/300?text=Generic+Comment+Box",
    treatmentImage: "/api/placeholder/500/300?text=Contextual+Comment+Prompts",
    progress: 50,
    okrs: ["okr-001"],
    learningAgenda:
      "Understand how contextual prompts influence user engagement and comment quality",
    owner: "Robert Chen",
    team: ["Alice Smith", "Sam Taylor"],
    knowledgeStatus: null,
    prelimResults: [
      { segment: "Educational Content", improvement: "~32%*" },
      { segment: "How-to Videos", improvement: "~28%*" },
      { segment: "Commentary", improvement: "~15%*" },
    ],
    aiAnalysis:
      "Preliminary results show promising trends with an overall increase in comment rates. Educational content is showing the strongest response (+32%), while commentary videos show more modest improvements (+15%). \n\nInitial data suggests that timestamp-specific prompts create relevant conversation entry points that lower the barrier to engagement. The treatment appears to increase not just comment volume but also relevance and specificity of comments.\n\nEarly insights (pending final results):\n1. Context-relevance significantly increases engagement likelihood\n2. Educational content benefits most, possibly due to specific questions/clarifications\n3. Comment quality metrics (length, specificity) also trending positive\n\nRecommend continuing the experiment to completion before fully implementing, but current signals strongly support the hypothesis.",
  },
  {
    id: "search-001",
    name: "Search Results Personalization",
    status: LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase(),
    lifecycleStage: "execution",
    category: "engagement",
    startDate: "Mar 1, 2025",
    endDate: "Mar 5, 2025",
    daysRunning: 5,
    daysTotal: 5,
    primaryMetric: "Search Click-Through Rate",
    improvement: -7,
    significance: 0.042,
    confidence: 95.8,
    impact: "Negative: ~2000 fewer clicks",
    goal: "Improve search relevance with personalized results ranking",
    hypothesis:
      "Personalizing search results based on user history will increase CTR by 10%",
    targetAudience: [
      "All logged-in users",
      "Performed at least 3 previous searches",
      "Global audience",
    ],
    successCriteria: "10% improvement in CTR with 95% significance",
    controlImage: "/api/placeholder/500/300?text=Standard+Search+Results",
    treatmentImage: "/api/placeholder/500/300?text=Personalized+Search+Results",
    progress: 100,
    okrs: ["okr-001"],
    learningAgenda:
      "Determine if personalization algorithms improve search satisfaction",
    owner: "Lisa Park",
    team: ["Robert Chen", "Michael Wong"],
    knowledgeStatus: LIFECYCLE_STAGES.KNOWLEDGE.DOCUMENTED.label.toLowerCase(),
    segmentedResults: [
      { name: "Heavy Users", improvement: -5 },
      { name: "Casual Users", improvement: -9 },
      { name: "Mobile Users", improvement: -8 },
      { name: "Desktop Users", improvement: -6 },
    ],
    aiAnalysis:
      "This experiment showed a statistically significant 7% decrease in search click-through rates when using personalized ranking. The negative effect was consistent across user segments, with casual users showing the largest decline (-9%).\n\nPossible explanations for these unexpected results:\n1. The personalization algorithm may have created filter bubbles that limited content discovery\n2. Users may have specific search intent that differs from their general browsing patterns\n3. The implementation may have prioritized historical preferences too heavily over query relevance\n\nKey learnings:\n1. Search context appears fundamentally different from content browsing context\n2. User expectations for search may prioritize query relevance over personalization\n3. The current personalization approach needs substantial revision\n\nRecommended next steps:\n1. Revert to standard search results while exploring alternative approaches\n2. Test a hybrid model with lighter personalization influence\n3. Consider segment-specific personalization only for certain query types",
  },
  {
    id: "multi-001",
    name: "Landing Page Multivariate Test",
    status: LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase(),
    lifecycleStage: "execution",
    category: "monetization",
    startDate: "Apr 1, 2025",
    endDate: "Apr 5, 2025",
    daysRunning: 5,
    daysTotal: 5,
    primaryMetric: "Sign-up Conversion Rate",
    improvement: 35,
    significance: 0.001,
    confidence: 99,
    impact: "Additional 550+ sign-ups per day",
    goal: "Identify optimal landing page configuration for new user sign-ups",
    hypothesis:
      "A combination of simplified form, social proof, and benefit-focused headlines will increase conversion",
    targetAudience: ["New visitors", "All regions", "All devices"],
    successCriteria: "15%+ improvement with 95% significance",
    controlImage: "/api/placeholder/500/300?text=Current+Landing+Page",
    treatmentImage: "/api/placeholder/500/300?text=Winning+Variation+E",
    progress: 100,
    okrs: ["okr-002"],
    learningAgenda:
      "Understand which landing page elements have the strongest impact on conversion",
    owner: "Sarah Chen",
    team: ["James Wilson", "Priya Patel"],
    knowledgeStatus: LIFECYCLE_STAGES.KNOWLEDGE.APPLIED.label.toLowerCase(),
    variantResults: [
      { name: "Control", convRate: "2.2%", lift: "0%" },
      { name: "Var A: New Headline", convRate: "2.4%", lift: "+9%" },
      { name: "Var B: Form Layout", convRate: "2.6%", lift: "+18%" },
      { name: "Var C: Social Proof", convRate: "2.5%", lift: "+14%" },
      { name: "Var D: Hero Image", convRate: "2.3%", lift: "+5%" },
      { name: "Var E: Headlines + Form", convRate: "3.0%", lift: "+35%" },
      { name: "Var F: Headlines + Social", convRate: "2.8%", lift: "+26%" },
      { name: "Var G: Form + Social", convRate: "2.9%", lift: "+31%" },
      { name: "Var H: All Elements", convRate: "2.7%", lift: "+22%" },
    ],
    segmentedResults: [
      { name: "Mobile Users", improvement: 41 },
      { name: "Desktop Users", improvement: 28 },
      { name: "US Region", improvement: 35 },
      { name: "Europe Region", improvement: 38 },
    ],
    aiAnalysis:
      "The multivariate test revealed significant insights about landing page optimization, with Variant E (new headlines + simplified form) achieving the highest conversion rate at 3.0% (+35% lift). Interestingly, the version with all elements combined (Variant H) performed worse than variants with just 2 optimized elements.\n\nKey insights:\n1. Form simplification had the strongest individual impact (+18%)\n2. The combination of clear benefit headlines and simplified form created the optimal experience\n3. Too many elements may create cognitive overload (explaining why Var H underperformed Var E)\n4. Mobile users showed dramatically higher improvement (+41%) vs desktop (+28%)\n\nRecommended actions:\n1. Implement Variant E across all landing pages\n2. Create dedicated mobile-optimized versions with even further simplified forms\n3. Consider A/A/B testing different benefit messaging within the winning template\n4. Explore regional messaging variations based on the different response rates",
  },
];

const initialKnowledge = [
  {
    id: "past-001",
    name: "Personalized Homepage Recommendations",
    category: "engagement",
    date: "Jan 10, 2025",
    improvement: 22,
    significance: 0.001,
    confidence: 99,
    status: LIFECYCLE_STAGES.KNOWLEDGE.APPLIED.label.toLowerCase(),
    tags: ["homepage", "personalization", "recommendations"],
    insights: [
      "Personalized content increased engagement by 22%",
      "New users +35% higher retention",
      "Mobile users benefited most",
    ],
    relatedExperiments: ["mem-001"],
    plainLanguageResult:
      "Personalizing homepage content led to significant improvements in user engagement, especially for new and mobile users.",
    businessImpact: "Medium-High",
    implementationEffort: "Medium",
    owner: "Sarah Chen",
    aiRecommendations: [
      "Apply personalization algorithms to all content discovery surfaces",
      "Test stronger personalization signals for new users",
      "Explore personalized onboarding flows based on initial interests",
    ],
  },
  {
    id: "past-002",
    name: "Comment Section Redesign",
    category: "engagement",
    date: "Dec 5, 2024",
    improvement: 18,
    significance: 0.008,
    confidence: 92,
    status: LIFECYCLE_STAGES.KNOWLEDGE.DOCUMENTED.label.toLowerCase(),
    tags: ["comments", "ui", "user engagement"],
    insights: [
      "Threaded comments increased reply rate by 45%",
      "Average comment length +27%",
      "Creator response rate +15%",
    ],
    relatedExperiments: ["eng-001"],
    plainLanguageResult:
      "The redesigned comment section significantly increased user interaction and content quality.",
    businessImpact: "Medium",
    implementationEffort: "Low",
    owner: "Robert Chen",
    aiRecommendations: [
      "Roll out threaded comments across all content types",
      "Test highlighting top creator responses",
      "Experiment with comment sorting algorithms to surface quality discussions",
    ],
  },
  {
    id: "past-003",
    name: "Failed Search Personalization Analysis",
    category: "engagement",
    date: "Mar 10, 2025",
    improvement: -7,
    significance: 0.042,
    confidence: 95.8,
    status: LIFECYCLE_STAGES.KNOWLEDGE.DOCUMENTED.label.toLowerCase(),
    tags: ["search", "personalization", "negative result"],
    insights: [
      "Search personalization decreased CTR by 7%",
      "Casual users showed strongest negative reaction (-9%)",
      "Possible filter bubble effect limiting discovery",
    ],
    relatedExperiments: ["search-001"],
    plainLanguageResult:
      "Our search personalization algorithm actually decreased user engagement with search results, suggesting users have different expectations for search versus content browsing.",
    businessImpact: "Medium-Negative",
    implementationEffort: "High",
    owner: "Lisa Park",
    aiRecommendations: [
      "Revise personalization approach to prioritize query relevance first",
      "Test personalization only for ambiguous queries",
      "Consider separate approach for different user segments",
      "Explore alternative signals beyond browsing history",
    ],
  },
  {
    id: "past-004",
    name: "Multivariate Landing Page Optimization",
    category: "monetization",
    date: "Apr 6, 2025",
    improvement: 35,
    significance: 0.001,
    confidence: 99,
    status: LIFECYCLE_STAGES.KNOWLEDGE.APPLIED.label.toLowerCase(),
    tags: ["landing page", "conversion", "multivariate"],
    insights: [
      "Simplified form + benefit headlines increased conversion by 35%",
      "Mobile users showed 41% improvement vs 28% for desktop",
      "Too many simultaneous changes decreased effectiveness",
    ],
    relatedExperiments: ["multi-001"],
    plainLanguageResult:
      "Our multivariate test identified that simplifying the signup form combined with clear benefit-focused headlines created the optimal landing page experience, significantly increasing conversions.",
    businessImpact: "High",
    implementationEffort: "Medium",
    owner: "Sarah Chen",
    aiRecommendations: [
      "Implement winning variant across all landing pages",
      "Develop device-specific optimized experiences",
      "Test variations of benefit messaging within winning template",
      "Apply simplified form approach to other conversion points",
    ],
  },
];

const initialOKRs = [
  {
    id: "okr-001",
    title: "Increase Engagement by 20%",
    description:
      "Improve user engagement through targeted content and UI enhancements.",
    key_results: [
      "Achieve 15% increase in daily active users",
      "Reach 25% improvement in session duration",
      "Attain 30% growth in content interactions",
    ],
    progress: 65,
    owner: "Lisa Park",
    quarter: "Q2 2025",
    relatedExperiments: ["mem-001", "eng-001", "search-001"],
    aiRecommendations: [
      "Focus on mobile engagement optimizations",
      "Prioritize experiments around user-generated content",
      "Test variations of personalized content discovery",
    ],
  },
  {
    id: "okr-002",
    title: "Boost Revenue by 15%",
    description:
      "Enhance monetization strategies via feature testing and conversion optimization.",
    key_results: [
      "Increase premium conversion rate by 10%",
      "Grow average revenue per user by 12%",
      "Reduce churn by 15%",
    ],
    progress: 40,
    owner: "James Wilson",
    quarter: "Q2 2025",
    relatedExperiments: ["ypp-001", "multi-001"],
    aiRecommendations: [
      "Test premium feature bundling variations",
      "Optimize upgrade prompts based on usage patterns",
      "Experiment with retention incentives for at-risk subscribers",
    ],
  },
  {
    id: "okr-003",
    title: "Expand International Growth by 25%",
    description:
      "Increase user adoption and engagement in key international markets.",
    key_results: [
      "Grow international user base by 25%",
      "Increase international revenue by 30%",
      "Achieve 85% feature parity across regions",
    ],
    progress: 20,
    owner: "Priya Patel",
    quarter: "Q2 2025",
    relatedExperiments: [],
    aiRecommendations: [
      "Test localized landing pages in key growth markets",
      "Experiment with region-specific content recommendations",
      "Prioritize tests for mobile-first international audiences",
    ],
  },
];

/* ---------------------------------------------------------------------------
   4) TARGET AUDIENCE SEGMENTS
   --------------------------------------------------------------------------- */
const audienceSegments = [
  {
    id: "new-users",
    name: "New Users",
    description: "Users who registered within the last 30 days",
    estimatedSize: "450,000",
  },
  {
    id: "power-users",
    name: "Power Users",
    description: "Users with > 20 sessions per month",
    estimatedSize: "250,000",
  },
  {
    id: "mobile-users",
    name: "Mobile Users",
    description: "Users primarily accessing via mobile devices",
    estimatedSize: "1,200,000",
  },
  {
    id: "desktop-users",
    name: "Desktop Users",
    description: "Users primarily accessing via desktop browsers",
    estimatedSize: "800,000",
  },
  {
    id: "us-users",
    name: "US Users",
    description: "Users located in the United States",
    estimatedSize: "950,000",
  },
  {
    id: "intl-users",
    name: "International Users",
    description: "Users outside the United States",
    estimatedSize: "1,500,000",
  },
  {
    id: "premium-users",
    name: "Premium Users",
    description: "Users with active premium subscriptions",
    estimatedSize: "320,000",
  },
  {
    id: "free-users",
    name: "Free Users",
    description: "Users on free plan",
    estimatedSize: "2,130,000",
  },
];

/* ---------------------------------------------------------------------------
   5) METRICS LIBRARY
   --------------------------------------------------------------------------- */
const metricsLibrary = [
  {
    id: "conversion-rate",
    name: "Conversion Rate",
    category: "monetization",
    description: "Percentage of users who complete a desired action",
    typical_baseline: "2.5%",
    typical_improvement: "5-20%",
    calculation: "(Number of conversions / Total visitors) * 100",
    good_for: ["Signup flows", "Purchase flows", "Feature adoption"],
  },
  {
    id: "retention-rate",
    name: "Retention Rate",
    category: "engagement",
    description:
      "Percentage of users who return within a specified time period",
    typical_baseline: "35%",
    typical_improvement: "5-15%",
    calculation: "(Number of returning users / Total users) * 100",
    good_for: ["Product stickiness", "User satisfaction", "Feature value"],
  },
  {
    id: "click-through-rate",
    name: "Click Through Rate",
    category: "engagement",
    description: "Percentage of users who click on a specific element",
    typical_baseline: "1-5%",
    typical_improvement: "10-30%",
    calculation: "(Number of clicks / Number of impressions) * 100",
    good_for: ["Button design", "CTA effectiveness", "Layout testing"],
  },
  {
    id: "average-session-duration",
    name: "Average Session Duration",
    category: "engagement",
    description: "Average length of a user session",
    typical_baseline: "3:45 minutes",
    typical_improvement: "10-20%",
    calculation: "Total session time / Number of sessions",
    good_for: ["Content engagement", "UX improvements", "Feature engagement"],
  },
  {
    id: "average-revenue-per-user",
    name: "Average Revenue Per User (ARPU)",
    category: "monetization",
    description: "Average revenue generated per user",
    typical_baseline: "$2.50",
    typical_improvement: "5-15%",
    calculation: "Total revenue / Number of users",
    good_for: [
      "Pricing tests",
      "Premium feature tests",
      "Monetization strategy",
    ],
  },
  {
    id: "cart-abandonment-rate",
    name: "Cart Abandonment Rate",
    category: "monetization",
    description:
      "Percentage of users who add items to cart but don't complete purchase",
    typical_baseline: "70%",
    typical_improvement: "5-20%",
    calculation: "(1 - (Completed purchases / Carts created)) * 100",
    good_for: ["Checkout flow", "Price presentation", "Payment options"],
  },
  {
    id: "net-promoter-score",
    name: "Net Promoter Score (NPS)",
    category: "satisfaction",
    description: "Measure of customer loyalty and satisfaction",
    typical_baseline: "30",
    typical_improvement: "5-15 points",
    calculation: "% Promoters - % Detractors",
    good_for: ["Overall experience", "Feature satisfaction", "UX improvements"],
  },
  {
    id: "time-on-page",
    name: "Time on Page",
    category: "engagement",
    description: "Average time users spend on a specific page",
    typical_baseline: "1:20 minutes",
    typical_improvement: "10-30%",
    calculation: "Total time on page / Number of page views",
    good_for: ["Content engagement", "Page layout", "Information architecture"],
  },
];

/* ---------------------------------------------------------------------------
   6) SHARED UI COMPONENTS
   --------------------------------------------------------------------------- */

// Status Badge Component
const StatusBadge = ({ status, lifecycleStage, className = "" }) => {
  // Find the status object in the lifecycle stages
  let statusObj = null;
  Object.keys(LIFECYCLE_STAGES).forEach((stage) => {
    Object.keys(LIFECYCLE_STAGES[stage]).forEach((key) => {
      if (
        LIFECYCLE_STAGES[stage][key].label.toLowerCase() ===
        status.toLowerCase()
      ) {
        statusObj = LIFECYCLE_STAGES[stage][key];
      }
    });
  });

  // Fallback if status not found
  if (!statusObj) {
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 ${className}`}
      >
        {status}
      </span>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full bg-${statusObj.color}-100 text-${statusObj.color}-700`}
      >
        {statusObj.label}
      </span>
      {lifecycleStage && (
        <span className="ml-2 text-xs text-gray-500">
          {lifecycleStage.charAt(0).toUpperCase() + lifecycleStage.slice(1)}
        </span>
      )}
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ progress, color = "blue" }) => (
  <div className="w-full bg-gray-200 h-2 rounded">
    <div
      className={`h-2 bg-${color}-500 rounded transition-all duration-500`}
      style={{ width: `${progress}%` }}
    />
  </div>
);

// Lifecycle Indicator Component
const LifecycleIndicator = ({ currentStage }) => {
  const stages = ["planning", "review", "execution", "knowledge"];
  const currentIndex = stages.indexOf(currentStage);

  return (
    <div className="flex items-center space-x-1 my-2">
      {stages.map((stage, index) => (
        <React.Fragment key={stage}>
          <div
            className={`h-2 w-4 rounded-sm ${
              index <= currentIndex ? "bg-blue-500" : "bg-gray-200"
            }`}
          />
          {index < stages.length - 1 && <div className="w-2" />}
        </React.Fragment>
      ))}
    </div>
  );
};

// Timeline Visualization Component
const TimelineViz = ({
  startDate,
  endDate,
  daysRunning,
  daysTotal,
  progress,
}) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  // Calculate percentage of time elapsed
  const totalDays =
    daysTotal || Math.round((end - start) / (1000 * 60 * 60 * 24));
  const elapsedDays =
    daysRunning ||
    (today > start
      ? Math.min(Math.round((today - start) / (1000 * 60 * 60 * 24)), totalDays)
      : 0);
  const timeProgress = totalDays > 0 ? (elapsedDays / totalDays) * 100 : 0;

  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{startDate}</span>
        <span>
          Timeline: {elapsedDays}/{totalDays} days
        </span>
        <span>{endDate}</span>
      </div>
      <div className="relative w-full h-3 bg-gray-100 rounded">
        <div
          className="absolute h-3 bg-blue-200 rounded-l"
          style={{ width: `${timeProgress}%` }}
        />
        <div
          className="absolute h-3 bg-green-500 rounded-l"
          style={{ width: `${progress}%` }}
        />
        {timeProgress > progress + 5 && (
          <div className="absolute top-4 right-0 text-xs text-amber-600 font-medium">
            Progress behind schedule
          </div>
        )}
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span className="text-blue-500">
          Time elapsed: {timeProgress.toFixed(0)}%
        </span>
        <span className="text-green-500">Task progress: {progress}%</span>
      </div>
    </div>
  );
};

// Context Banner Component
const ContextBanner = ({ section }) => {
  const contextData = {
    planning: {
      title: "Experiment Planning",
      description:
        "Design and schedule your experiments before sending them for review",
      stage: 1,
      icon: "📝",
    },
    reviews: {
      title: "Review & Approval",
      description:
        "Evaluate experiment proposals and approve them for execution",
      stage: 2,
      icon: "✅",
    },
    experiments: {
      title: "Experiment Execution",
      description: "Track and analyze your running experiments",
      stage: 3,
      icon: "🧪",
    },
    knowledge: {
      title: "Knowledge Hub",
      description: "Store and apply insights from completed experiments",
      stage: 4,
      icon: "📚",
    },
  };

  const data = contextData[section];

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-4">
      <div className="flex items-center">
        <span className="text-xl mr-2">{data.icon}</span>
        <div>
          <h2 className="font-medium text-blue-800">{data.title}</h2>
          <p className="text-sm text-blue-600">{data.description}</p>
        </div>
        <div className="ml-auto flex items-center">
          <span className="text-xs text-blue-700 mr-2">
            Lifecycle Stage {data.stage} of 4
          </span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-6 h-1 rounded-sm ${
                  num === data.stage ? "bg-blue-600" : "bg-blue-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, change, color }) => (
  <div className={`bg-${color}-50 p-4 rounded-lg`}>
    <h3 className={`text-sm text-${color}-800`}>{title}</h3>
    <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
    {change && (
      <p
        className={`text-xs ${
          change >= 0 ? "text-green-600" : "text-red-600"
        } mt-1`}
      >
        {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from previous period
      </p>
    )}
  </div>
);

// Improved Filter Section Component
const FilterControls = ({ filters, onChange, showBorder = true }) => (
  <div
    className={`p-4 ${
      showBorder ? "bg-white border rounded shadow-sm" : ""
    } mb-6`}
  >
    <h3 className="text-sm font-medium text-gray-700 mb-3">Filters</h3>
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <div key={filter.id} className="flex-grow min-w-[180px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            {filter.label}
          </label>
          {filter.type === "select" ? (
            <select
              className="w-full p-2 border rounded text-sm"
              value={filter.value}
              onChange={(e) => onChange(filter.id, e.target.value)}
            >
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={filter.type}
              className="w-full p-2 border rounded text-sm"
              value={filter.value}
              onChange={(e) => onChange(filter.id, e.target.value)}
              placeholder={filter.placeholder}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

// Consistent Card Design Component
const Card = ({ children, onClick, highlight, className = "" }) => (
  <div
    className={`border rounded-lg p-4 bg-white hover:shadow transition ${
      highlight ? "border-blue-300 bg-blue-50" : "border-gray-200"
    } ${onClick ? "cursor-pointer" : ""} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

// Related Items Display Component
const RelatedItems = ({ items, type }) => {
  if (!items || items.length === 0) return null;

  const iconMap = {
    okr: "🎯",
    experiment: "🧪",
    knowledge: "📚",
  };

  return (
    <div className="mt-3">
      <h4 className="text-xs font-medium text-gray-700">Related {type}:</h4>
      <div className="flex flex-wrap gap-1 mt-1">
        {items.map((item) => (
          <span
            key={item.id || item}
            className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
          >
            {iconMap[type.toLowerCase().replace(/s$/, "")]}{" "}
            {item.title || item.name || item}
          </span>
        ))}
      </div>
    </div>
  );
};

// Statistical Result Explainer Component
const StatResultExplainer = ({ improvement, significance, confidence }) => {
  if (!improvement) return null;

  let explanation = "";
  let color = "gray";

  if (significance < 0.01) {
    explanation = `Strong evidence that the improvement of ${improvement}% is real. Highly reliable result.`;
    color = "green";
  } else if (significance < 0.05) {
    explanation = `Good evidence that the improvement of ${improvement}% is real. Reliable result.`;
    color = "green";
  } else if (significance < 0.1) {
    explanation = `Some evidence of a ${improvement}% improvement, but not statistically significant. Consider running longer.`;
    color = "amber";
  } else {
    explanation = `Limited evidence of a real effect. Results inconclusive.`;
    color = "red";
  }

  return (
    <div
      className={`p-3 mt-3 bg-${color}-50 text-${color}-700 text-sm rounded`}
    >
      <p>
        <strong>In simple terms:</strong> {explanation}
      </p>
      <p className="mt-1 text-xs">
        Technical: p={significance}, confidence={confidence}%
      </p>
    </div>
  );
};

// Modal Component
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-full mx-4",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div
        className={`bg-white rounded-lg w-full ${sizeClasses[size]} relative shadow-lg my-8 flex flex-col`}
        style={{ maxHeight: "85vh" }}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 z-10"
          >
            ✕
          </button>
        )}

        {title && (
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
        )}

        <div
          className="overflow-y-auto p-6"
          style={{ maxHeight: "calc(85vh - 80px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = ({
  size = "md",
  color = "blue",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div
            className={`${sizeClasses[size]} border-4 border-t-transparent border-${color}-500 rounded-full animate-spin`}
          ></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} border-4 border-t-transparent border-${color}-500 rounded-full animate-spin`}
    ></div>
  );
};

// Toast Notification Component
const Toast = ({
  message,
  type = "info",
  onClose,
  autoClose = true,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose && onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  const typeClasses = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  const iconMap = {
    success: "✓",
    error: "✗",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg border ${typeClasses[type]} max-w-md z-50 flex items-start`}
    >
      <span className="mr-2 font-bold">{iconMap[type]}</span>
      <p className="flex-1">{message}</p>
      <button
        className="ml-4 text-gray-500 hover:text-gray-700"
        onClick={() => {
          setIsVisible(false);
          onClose && onClose();
        }}
      >
        ✕
      </button>
    </div>
  );
};

// Tab Component
const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`py-3 px-4 text-sm relative ${
              activeTab === tab.id
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
            )}
            {tab.count > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Form Field Component (continued)
const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder = "",
  required = false,
  options = [],
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          className={`w-full p-2 border rounded ${
            error ? "border-red-300" : ""
          }`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
        />
      ) : type === "select" ? (
        <select
          className={`w-full p-2 border rounded ${
            error ? "border-red-300" : ""
          }`}
          value={value}
          onChange={onChange}
        >
          <option value="">{placeholder || "Select an option"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={value}
            onChange={onChange}
            className="mr-2"
          />
          <span>{placeholder}</span>
        </div>
      ) : type === "multiselect" ? (
        <div className="border rounded p-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={`option-${option.value}`}
                checked={value.includes(option.value)}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...value, option.value]
                    : value.filter((v) => v !== option.value);

                  const event = { target: { value: newValue } };
                  onChange(event);
                }}
                className="mr-2"
              />
              <label htmlFor={`option-${option.value}`} className="text-sm">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ) : type === "date" ? (
        <input
          type="date"
          className={`w-full p-2 border rounded ${
            error ? "border-red-300" : ""
          }`}
          value={value}
          onChange={onChange}
        />
      ) : type === "file" ? (
        <div>
          <input type="file" onChange={onChange} className="w-full" />
          {value && (
            <p className="text-xs text-green-600 mt-1">
              File selected: {value.name}
            </p>
          )}
        </div>
      ) : (
        <input
          type={type}
          className={`w-full p-2 border rounded ${
            error ? "border-red-300" : ""
          }`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Form Group Component
const FormGroup = ({ title, description, children, className = "" }) => {
  return (
    <div
      className={`p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6 ${className}`}
    >
      <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({
  title,
  description,
  icon,
  actionText,
  onAction = null,
}) => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg text-center">
      {icon && <div className="text-4xl mb-2">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

// Alert Component
const Alert = ({
  type = "info",
  title,
  message,
  onClose = null,
  actions = [],
}) => {
  const typeClasses = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div className={`p-4 rounded-lg border ${typeClasses[type]} mb-4`}>
      <div className="flex justify-between">
        <div>
          {title && <h4 className="font-medium mb-1">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {actions.length > 0 && (
        <div className="flex justify-end space-x-2 mt-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`px-3 py-1 text-sm rounded ${
                action.primary
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   7) ADVANCED CHART COMPONENTS
   --------------------------------------------------------------------------- */

// A/B Test Comparative Chart
const ABTestChart = ({ controlData, treatmentData, metric, improvement }) => {
  const data = [
    { name: "Control", value: controlData },
    { name: "Treatment", value: treatmentData },
  ];

  const colors = {
    positive: ["#CBD5E0", "#4299E1"],
    negative: ["#CBD5E0", "#F56565"],
  };

  const colorSet = improvement >= 0 ? colors.positive : colors.negative;

  return (
    <div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" name={metric}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorSet[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-2">
        <span
          className={`font-medium ${
            improvement >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {improvement >= 0 ? "+" : ""}
          {improvement}%
        </span>
        <span className="text-gray-600 text-sm ml-1">
          {improvement >= 0 ? "improvement" : "decrease"} with treatment
        </span>
      </div>
    </div>
  );
};

// Segmented Results Chart
const SegmentedResultsChart = ({ segments }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={segments}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={(value) => `${value}%`} />
          <YAxis dataKey="name" type="category" />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar
            dataKey="improvement"
            name="Improvement"
            barSize={20}
            fill="#4299E1"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Multivariate Results Chart
const MultivariateResultsChart = ({ results }) => {
  // Sort by lift (descending)
  const sortedResults = [...results].sort((a, b) => {
    const liftA = parseFloat(a.lift.replace("%", ""));
    const liftB = parseFloat(b.lift.replace("%", ""));
    return liftB - liftA;
  });

  const getBarColor = (lift) => {
    const liftValue = parseFloat(lift.replace("%", ""));
    if (liftValue > 20) return "#38A169"; // green
    if (liftValue > 0) return "#4299E1"; // blue
    return "#E53E3E"; // red
  };

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedResults}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis dataKey="name" type="category" width={120} />
          <Tooltip
            formatter={(value, name, props) => {
              const item = props.payload;
              return [`${item.lift} (${item.convRate})`, name];
            }}
          />
          <Bar
            dataKey={(data) => parseFloat(data.lift.replace("%", ""))}
            name="Lift vs Control"
            barSize={20}
          >
            {sortedResults.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.lift)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Metrics Distribution Chart
const MetricsDistributionChart = ({ controlData, treatmentData }) => {
  // Assumes data is in format [{value: number}, ...]
  const formatData = (data, prefix) => {
    return data.map((d, i) => ({
      id: `${prefix}-${i}`,
      value: d.value,
    }));
  };

  const combinedData = [
    ...formatData(controlData, "control"),
    ...formatData(treatmentData, "treatment"),
  ];

  const minValue = Math.min(...combinedData.map((d) => d.value));
  const maxValue = Math.max(...combinedData.map((d) => d.value));

  // Create histogram bins
  const binCount = 10;
  const binSize = (maxValue - minValue) / binCount;

  const bins = Array.from({ length: binCount }, (_, i) => ({
    start: minValue + i * binSize,
    end: minValue + (i + 1) * binSize,
    controlCount: 0,
    treatmentCount: 0,
  }));

  // Count data points in each bin
  controlData.forEach((d) => {
    const binIndex = Math.min(
      Math.floor((d.value - minValue) / binSize),
      binCount - 1
    );
    bins[binIndex].controlCount++;
  });

  treatmentData.forEach((d) => {
    const binIndex = Math.min(
      Math.floor((d.value - minValue) / binSize),
      binCount - 1
    );
    bins[binIndex].treatmentCount++;
  });

  // Format for chart
  const chartData = bins.map((bin) => ({
    label: `${bin.start.toFixed(1)}-${bin.end.toFixed(1)}`,
    control: bin.controlCount,
    treatment: bin.treatmentCount,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            angle={-45}
            textAnchor="end"
            tick={{ fontSize: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="control" name="Control" fill="#A0AEC0" />
          <Bar dataKey="treatment" name="Treatment" fill="#4299E1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Time Series Comparison Chart
const TimeSeriesComparisonChart = ({ data }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="standard"
            name="Control"
            stroke="#A0AEC0"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="personalized"
            name="Treatment"
            stroke="#4299E1"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Multiple Variants Time Series Chart
const MultivariantTimeSeriesChart = ({ data }) => {
  // Generate a fixed color palette
  const colorPalette = [
    "#A0AEC0", // gray for control
    "#4299E1", // blue
    "#48BB78", // green
    "#ED8936", // orange
    "#9F7AEA", // purple
    "#F56565", // red
    "#38B2AC", // teal
    "#ECC94B", // yellow
    "#667EEA", // indigo
    "#FC8181", // light red
    "#68D391", // light green
  ];

  // Get all data keys except 'date'
  const dataKeys = Object.keys(data[0] || {}).filter((key) => key !== "date");

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={
                key === "control"
                  ? "Control"
                  : `Variant ${key.replace("variant", "")}`
              }
              stroke={colorPalette[index % colorPalette.length]}
              strokeWidth={key === "control" ? 2 : 2}
              dot={{ r: 3 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Confidence Interval Chart
const ConfidenceIntervalChart = ({
  mean,
  lowerBound,
  upperBound,
  baselineMean = null,
}) => {
  const data = [
    {
      name: "Result",
      mean: mean,
      lowerBound: lowerBound,
      upperBound: upperBound,
    },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={["dataMin", "dataMax"]} />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Line
            dataKey="mean"
            stroke="#4299E1"
            strokeWidth={2}
            dot={{ r: 6 }}
          />
          <Line dataKey="lowerBound" stroke="transparent" dot={{ r: 0 }} />
          <Line dataKey="upperBound" stroke="transparent" dot={{ r: 0 }} />
          {baselineMean !== null && (
            <ReferenceLine
              x={baselineMean}
              stroke="#F56565"
              strokeDasharray="3 3"
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center space-x-8 mt-4">
        <div className="text-center">
          <p className="text-xs text-gray-500">Lower Bound</p>
          <p className="text-gray-800 font-medium">{lowerBound.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Mean</p>
          <p className="text-blue-600 font-bold">{mean.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Upper Bound</p>
          <p className="text-gray-800 font-medium">{upperBound.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   8) SPECIALIZED AI COMPONENTS
   --------------------------------------------------------------------------- */

// AI Prompt Interface Component
// const AIPromptInterface = ({
//   onSubmit,
//   placeholder = "Ask AI for help...",
//   isLoading = false,
//   label = "AI Assistant",
//   buttonText = "Generate",
// }) => {
//   const [prompt, setPrompt] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (prompt.trim() && onSubmit) {
//       onSubmit(prompt);
//     }
//   };

//   return (
//     <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
//       <div className="flex items-center mb-3">
//         <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs mr-2">
//           AI
//         </div>
//         <h3 className="font-medium text-purple-800">{label}</h3>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <textarea
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder={placeholder}
//           className="w-full p-3 border border-purple-200 rounded-lg"
//           rows={3}
//         />

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={isLoading || !prompt.trim()}
//             className={`px-4 py-2 rounded-lg flex items-center ${
//               isLoading || !prompt.trim()
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-purple-600 text-white hover:bg-purple-700"
//             }`}
//           >
//             {isLoading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                 Processing...
//               </>
//             ) : (
//               <>
//                 <span className="mr-2">✨</span>
//                 {buttonText}
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
const AIPromptInterface = ({
  onSubmit,
  initialPrompt = "",
  placeholder = "Ask AI for help...",
  isLoading = false,
  label = "AI Assistant",
  buttonText = "Generate",
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);

  // Initialize prompt when initialPrompt changes
  useEffect(() => {
    if (initialPrompt && !prompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && onSubmit) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs mr-2">
          AI
        </div>
        <h3 className="font-medium text-purple-800">{label}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 border border-purple-200 rounded-lg"
          rows={3}
        />

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setPrompt(initialPrompt)}
            className="text-xs text-purple-600 hover:text-purple-800"
            disabled={!initialPrompt || prompt === initialPrompt}
          >
            Reset to suggestion
          </button>

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`px-4 py-2 rounded-lg flex items-center ${
              isLoading || !prompt.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <span className="mr-2">✨</span>
                {buttonText}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// AI Response Display Component
const AIResponseDisplay = ({
  response,
  type = "default",
  title = "AI Generated Response",
}) => {
  if (!response) return null;

  const typeStyles = {
    default: "bg-purple-50 border-purple-200 text-purple-900",
    success: "bg-green-50 border-green-200 text-green-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
  };

  return (
    <div className={`border rounded-lg p-4 ${typeStyles[type]}`}>
      <div className="flex items-center mb-3">
        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs mr-2">
          AI
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>

      <div className="prose max-w-none">
        {response.split("\n").map((paragraph, idx) =>
          paragraph ? (
            <p key={idx} className="mb-2">
              {paragraph}
            </p>
          ) : (
            <br key={idx} />
          )
        )}
      </div>
    </div>
  );
};

// AI Hypothesis Generator Component
const AIHypothesisGenerator = ({
  initialData = {},
  onGenerate,
  isGenerating = false,
}) => {
  const [businessGoal, setBusinessGoal] = useState(
    initialData.businessGoal || ""
  );
  const [targetAudience, setTargetAudience] = useState(
    initialData.targetAudience || ""
  );
  const [issueToSolve, setIssueToSolve] = useState(
    initialData.issueToSolve || ""
  );

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate({
        businessGoal,
        targetAudience,
        issueToSolve,
      });
    }
  };

  const isDisabled = !businessGoal.trim() || isGenerating;

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-800">AI Hypothesis Generator</h3>
      <p className="text-sm text-gray-600">
        Provide information about your experiment goals and context to generate
        a data-driven hypothesis.
      </p>

      <FormField
        label="Business Goal"
        type="textarea"
        value={businessGoal}
        onChange={(e) => setBusinessGoal(e.target.value)}
        placeholder="e.g., Increase conversion rate by 15%"
        required
      />

      <FormField
        label="Target Audience"
        value={targetAudience}
        onChange={(e) => setTargetAudience(e.target.value)}
        placeholder="e.g., New mobile users from US and Canada"
      />

      <FormField
        label="Issue to Solve"
        type="textarea"
        value={issueToSolve}
        onChange={(e) => setIssueToSolve(e.target.value)}
        placeholder="e.g., High drop-off rate in signup flow after form submission"
      />

      <button
        onClick={handleGenerate}
        disabled={isDisabled}
        className={`w-full px-4 py-2 flex items-center justify-center rounded ${
          isDisabled
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Generating...
          </>
        ) : (
          <>
            <span className="mr-2">✨</span>
            Generate Hypothesis
          </>
        )}
      </button>
    </div>
  );
};

// AI Analysis Component
const AIAnalysisComponent = ({
  experiment,
  isLoading = false,
  onRequestAnalysis,
}) => {
  return (
    <div className="border rounded-lg bg-gray-50 p-4">
      <h3 className="font-medium text-gray-800 mb-2">AI Analysis</h3>

      {experiment.aiAnalysis ? (
        <div className="bg-white p-4 rounded border">
          <div className="prose max-w-none text-sm">
            {experiment.aiAnalysis.split("\n").map((paragraph, idx) =>
              paragraph ? (
                <p key={idx} className="mb-2">
                  {paragraph}
                </p>
              ) : (
                <br key={idx} />
              )
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-gray-600">Analyzing experiment data...</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Request AI-powered insights and recommendations based on your
                experiment results.
              </p>
              <button
                onClick={onRequestAnalysis}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center mx-auto"
              >
                <span className="mr-2">✨</span>
                Generate AI Analysis
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Role Selector Component
// const RoleSelector = ({ selectedRole, onRoleChange }) => {
//   const roles = [
//     {
//       id: "pm",
//       name: "Product Manager",
//       description: "End-to-end experiment management",
//     },
//     {
//       id: "data-scientist",
//       name: "Data Scientist",
//       description: "Statistical design and analysis",
//     },
//     {
//       id: "exec",
//       name: "Executive",
//       description: "Strategic view and insights",
//     },
//   ];

//   return (
//     <div className="bg-white p-3 rounded-lg shadow mb-6">
//       <div className="flex items-center space-x-1">
//         <div className="text-sm font-medium text-gray-700 mr-2">View as:</div>
//         {roles.map((role) => (
//           <button
//             key={role.id}
//             onClick={() => onRoleChange(role.id)}
//             className={`px-3 py-1.5 rounded text-sm ${
//               selectedRole === role.id
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             {role.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };
const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const roles = [
    {
      id: "pm",
      name: "Product Manager",
      description: "End-to-end experiment management",
    },
    {
      id: "data-scientist",
      name: "Data Scientist",
      description: "Statistical design and analysis",
    },
    {
      id: "exec",
      name: "Executive",
      description: "Strategic view and insights",
    },
  ];

  const [showTooltip, setShowTooltip] = useState(false);

  const currentRole = roles.find((r) => r.id === selectedRole);

  return (
    <div className="bg-white p-3 rounded-lg shadow mb-6 relative">
      <div className="flex items-center space-x-1">
        <div className="text-sm font-medium text-gray-700 mr-2 flex items-center">
          View as:
          <button
            className="ml-1 w-4 h-4 bg-gray-200 rounded-full text-gray-600 flex items-center justify-center text-xs hover:bg-gray-300"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            ?
          </button>
        </div>
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`px-3 py-1.5 rounded text-sm ${
              selectedRole === role.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {role.name}
          </button>
        ))}
      </div>

      {showTooltip && (
        <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-white shadow-lg rounded-lg z-10 border border-gray-200">
          <h4 className="font-medium text-sm mb-2">
            Current view: {currentRole?.name}
          </h4>
          <p className="text-xs text-gray-600 mb-2">
            {currentRole?.description}
          </p>
          <div className="text-xs text-gray-500">
            Switch roles to see different perspectives of the experimentation
            platform.
          </div>
        </div>
      )}

      {selectedRole !== "pm" && (
        <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100 text-xs text-blue-700">
          {selectedRole === "data-scientist"
            ? "Showing data scientist view with statistical details and analysis tools."
            : "Showing executive view with high-level insights and business impact metrics."}
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   9) SPECIALIZED COMPONENTS
   --------------------------------------------------------------------------- */

// Hypothesis Builder Component (continued)
const HypothesisBuilder = ({ onChange, initialValue = "", category = "" }) => {
  const [hypothesis, setHypothesis] = useState(initialValue);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const templates = {
    monetization: [
      "If we implement [treatment], then conversion will increase by [X%] because [reason].",
      "If we change [element] to [treatment], customers will be [X%] more likely to purchase because [reason].",
      "Showing [treatment] instead of [control] will improve revenue per user by [X%] by [reason].",
    ],
    engagement: [
      "If we implement [treatment], then engagement will increase by [X%] because [reason].",
      "Users who see [treatment] will be [X%] more likely to [action] compared to those who see [control].",
      "Changing [element] from [control] to [treatment] will increase [metric] by [X%] because [reason].",
    ],
    default: [
      "If we implement [treatment], then [metric] will increase by [X%] compared to [control].",
      "Users who experience [treatment] will show [X%] improvement in [metric] over users who experience [control].",
      "By changing [element] from [control] to [treatment], we expect to see [X%] lift in [metric].",
    ],
  };

  const selectedTemplates =
    category && templates[category] ? templates[category] : templates.default;

  const handleSelectTemplate = (template) => {
    setHypothesis(template);
    onChange(template);
  };

  const handleChange = (e) => {
    setHypothesis(e.target.value);
    onChange(e.target.value);
  };

  const handleGenerateAI = (formData) => {
    setIsGenerating(true);

    // Simulate AI response with timeout
    setTimeout(() => {
      let aiHypothesis = "";

      if (category === "monetization") {
        aiHypothesis = `If we implement a simplified checkout process with visual progress indicators, conversion rate will increase by 15% because users will experience less cognitive friction and have clearer expectations about the remaining steps in the purchase flow.`;
      } else if (category === "engagement") {
        aiHypothesis = `Users who see personalized content recommendations based on their viewing history will be 20% more likely to engage with suggested content compared to users who see generic trending recommendations, because the content will be more relevant to their specific interests.`;
      } else {
        aiHypothesis = `By changing our onboarding flow from a linear tutorial to an interactive guided experience, we expect to see a 25% lift in feature adoption within the first week, because users will learn by doing rather than by reading instructions.`;
      }

      setAiSuggestion(aiHypothesis);
      setIsGenerating(false);
    }, 1500);
  };

  const handleUseAiSuggestion = () => {
    if (aiSuggestion) {
      setHypothesis(aiSuggestion);
      onChange(aiSuggestion);
      setShowAIAssistant(false);
      setAiSuggestion("");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-gray-700">Hypothesis</h4>
        <button
          type="button"
          onClick={() => setShowAIAssistant(!showAIAssistant)}
          className="px-2 py-1 text-xs text-purple-700 bg-purple-100 rounded hover:bg-purple-200 flex items-center"
        >
          <span className="mr-1">✨</span>
          AI Assistant
        </button>
      </div>

      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={4}
        value={hypothesis}
        onChange={handleChange}
        placeholder="Enter your hypothesis..."
      />

      {showAIAssistant && (
        <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-medium text-purple-800 mb-2">
            AI Hypothesis Assistant
          </h4>
          {aiSuggestion ? (
            <div className="mb-4">
              <div className="p-3 bg-white border rounded mb-3">
                <p className="text-gray-800">{aiSuggestion}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleUseAiSuggestion}
                  className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                >
                  Use This Hypothesis
                </button>
              </div>
            </div>
          ) : (
            <AIHypothesisGenerator
              initialData={{
                category: category,
                businessGoal: "",
                issueToSolve: "",
              }}
              onGenerate={handleGenerateAI}
              isGenerating={isGenerating}
            />
          )}
        </div>
      )}

      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-2">Templates you can use:</p>
        <div className="space-y-2">
          {selectedTemplates.map((template, index) => (
            <button
              key={index}
              className="block w-full text-left p-2 bg-gray-50 hover:bg-gray-100 text-sm rounded"
              onClick={() => handleSelectTemplate(template)}
            >
              {template}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Metric Selector Component
const MetricSelector = ({ onChange, selectedMetric, category = null }) => {
  const filteredMetrics = category
    ? metricsLibrary.filter((m) => m.category === category)
    : metricsLibrary;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredMetrics.map((metric) => (
          <div
            key={metric.id}
            onClick={() => onChange(metric.id)}
            className={`p-3 border rounded cursor-pointer ${
              selectedMetric === metric.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-medium">{metric.name}</div>
            <p className="text-xs text-gray-600 mt-1">{metric.description}</p>
            <div className="flex justify-between mt-2 text-xs">
              <span>Typical improvement: {metric.typical_improvement}</span>
              <span
                className={`${
                  metric.category === "monetization"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {metric.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedMetric && (
        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <h4 className="font-medium text-blue-800">
            Selected Metric:{" "}
            {metricsLibrary.find((m) => m.id === selectedMetric)?.name}
          </h4>
          <p className="text-sm text-blue-700 mt-1">
            {metricsLibrary.find((m) => m.id === selectedMetric)?.description}
          </p>
          <div className="mt-2">
            <p className="text-xs text-blue-600">
              <strong>Calculation:</strong>{" "}
              {metricsLibrary.find((m) => m.id === selectedMetric)?.calculation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Audience Selector Component
const AudienceSelector = ({ onChange, selectedAudiences = [] }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {audienceSegments.map((segment) => (
          <div
            key={segment.id}
            onClick={() => {
              const isSelected = selectedAudiences.includes(segment.id);
              const newSelection = isSelected
                ? selectedAudiences.filter((id) => id !== segment.id)
                : [...selectedAudiences, segment.id];
              onChange(newSelection);
            }}
            className={`p-3 border rounded cursor-pointer ${
              selectedAudiences.includes(segment.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedAudiences.includes(segment.id)}
                readOnly
                className="mr-2"
              />
              <span className="font-medium">{segment.name}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{segment.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              Est. size: {segment.estimatedSize} users
            </p>
          </div>
        ))}
      </div>

      {selectedAudiences.length > 0 && (
        <div className="mt-4 bg-blue-50 p-3 rounded border border-blue-200">
          <h4 className="font-medium text-blue-800">Selected Audience</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedAudiences.map((audienceId) => {
              const segment = audienceSegments.find((s) => s.id === audienceId);
              return segment ? (
                <span
                  key={segment.id}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center"
                >
                  {segment.name}
                  <button
                    className="ml-1 text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(
                        selectedAudiences.filter((id) => id !== segment.id)
                      );
                    }}
                  >
                    ✕
                  </button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Success Criteria Builder Component
const SuccessCriteriaBuilder = ({
  onChange,
  primaryMetric,
  initialValue = "",
}) => {
  const [criteria, setCriteria] = useState(initialValue);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const templates = [
    `Achieve ≥10% lift in ${primaryMetric} at 95% confidence.`,
    `Statistically significant improvement in ${primaryMetric} with p < 0.05.`,
    `${primaryMetric} increases by at least 15% with 90% confidence.`,
    `No significant decrease in secondary metrics with ≥5% lift in ${primaryMetric}.`,
  ];

  const handleSelectTemplate = (template) => {
    setCriteria(template);
    onChange(template);
  };

  const handleChange = (e) => {
    setCriteria(e.target.value);
    onChange(e.target.value);
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);

    // Simulate AI response with timeout
    setTimeout(() => {
      let aiCriteria = `Achieve ≥15% improvement in ${primaryMetric} with statistical significance (p < 0.05) and a minimum of 90% confidence interval. Ensure no degradation greater than 2% in any secondary metrics, particularly user satisfaction and system performance.`;

      setAiSuggestion(aiCriteria);
      setIsGenerating(false);
    }, 1200);
  };

  const handleUseAiSuggestion = () => {
    if (aiSuggestion) {
      setCriteria(aiSuggestion);
      onChange(aiSuggestion);
      setShowAIAssistant(false);
      setAiSuggestion("");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-gray-700">Success Criteria</h4>
        <button
          type="button"
          onClick={() => setShowAIAssistant(!showAIAssistant)}
          className="px-2 py-1 text-xs text-purple-700 bg-purple-100 rounded hover:bg-purple-200 flex items-center"
        >
          <span className="mr-1">✨</span>
          AI Assistant
        </button>
      </div>

      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={3}
        value={criteria}
        onChange={handleChange}
        placeholder="Define success criteria..."
      />

      {showAIAssistant && (
        <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-medium text-purple-800 mb-2">
            AI Success Criteria Assistant
          </h4>
          {aiSuggestion ? (
            <div className="mb-4">
              <div className="p-3 bg-white border rounded mb-3">
                <p className="text-gray-800">{aiSuggestion}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleUseAiSuggestion}
                  className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                >
                  Use These Criteria
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-purple-700 mb-3">
                Our AI will generate comprehensive success criteria based on the
                metric you've selected and industry best practices.
              </p>
              <button
                onClick={handleGenerateAI}
                className="w-full px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 flex items-center justify-center"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✨</span>
                    Generate Success Criteria
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-2">Suggested criteria:</p>
        <div className="space-y-2">
          {templates.map((template, index) => (
            <button
              key={index}
              className="block w-full text-left p-2 bg-gray-50 hover:bg-gray-100 text-sm rounded"
              onClick={() => handleSelectTemplate(template)}
            >
              {template}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Learning Agenda Component
const LearningAgendaBuilder = ({ onChange, initialValue = "" }) => {
  const [agenda, setAgenda] = useState(initialValue);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const templates = [
    "Understand how [feature/change] impacts [key metric] for [audience segment].",
    "Identify which variation of [element] performs best for [goal/metric].",
    "Learn whether [audience] responds differently to [feature] than other segments.",
    "Determine if [hypothesis] holds true across different [contexts/platforms/regions].",
  ];

  const handleSelectTemplate = (template) => {
    setAgenda(template);
    onChange(template);
  };

  const handleChange = (e) => {
    setAgenda(e.target.value);
    onChange(e.target.value);
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);

    // Simulate AI response with timeout
    setTimeout(() => {
      const aiAgenda =
        "Understand how different user segments respond to our personalized experience, specifically measuring whether new users show stronger engagement lifts than existing users, and identifying which specific personalization elements (content recommendations, UI adaptations, or messaging) drive the most significant improvements in retention and session duration.";

      setAiSuggestion(aiAgenda);
      setIsGenerating(false);
    }, 1200);
  };

  const handleUseAiSuggestion = () => {
    if (aiSuggestion) {
      setAgenda(aiSuggestion);
      onChange(aiSuggestion);
      setShowAIAssistant(false);
      setAiSuggestion("");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-gray-700">Learning Agenda</h4>
        <button
          type="button"
          onClick={() => setShowAIAssistant(!showAIAssistant)}
          className="px-2 py-1 text-xs text-purple-700 bg-purple-100 rounded hover:bg-purple-200 flex items-center"
        >
          <span className="mr-1">✨</span>
          AI Assistant
        </button>
      </div>

      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={3}
        value={agenda}
        onChange={handleChange}
        placeholder="What do you want to learn from this experiment?"
      />

      {showAIAssistant && (
        <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-medium text-purple-800 mb-2">
            AI Learning Agenda Assistant
          </h4>
          {aiSuggestion ? (
            <div className="mb-4">
              <div className="p-3 bg-white border rounded mb-3">
                <p className="text-gray-800">{aiSuggestion}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleUseAiSuggestion}
                  className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                >
                  Use This Agenda
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-purple-700 mb-3">
                Our AI will generate a comprehensive learning agenda based on
                your experiment goals and hypothesis.
              </p>
              <button
                onClick={handleGenerateAI}
                className="w-full px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 flex items-center justify-center"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✨</span>
                    Generate Learning Agenda
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-2">Suggested templates:</p>
        <div className="space-y-2">
          {templates.map((template, index) => (
            <button
              key={index}
              className="block w-full text-left p-2 bg-gray-50 hover:bg-gray-100 text-sm rounded"
              onClick={() => handleSelectTemplate(template)}
            >
              {template}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// OKR Selector Component
const OKRSelector = ({ onChange, selectedOKRs = [], okrData = [] }) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">
        Link to Strategic OKRs
      </h4>
      <div className="space-y-3">
        {okrData.map((okr) => (
          <div
            key={okr.id}
            onClick={() => {
              const isSelected = selectedOKRs.includes(okr.id);
              const newSelection = isSelected
                ? selectedOKRs.filter((id) => id !== okr.id)
                : [...selectedOKRs, okr.id];
              onChange(newSelection);
            }}
            className={`p-3 border rounded cursor-pointer ${
              selectedOKRs.includes(okr.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedOKRs.includes(okr.id)}
                  readOnly
                  className="mr-2"
                />
                <span className="font-medium">{okr.title}</span>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                {okr.quarter}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{okr.description}</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{okr.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
                <div
                  className="h-1.5 bg-blue-500 rounded-full"
                  style={{ width: `${okr.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOKRs.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <h4 className="font-medium text-blue-800">Selected OKRs</h4>
          <ul className="mt-2 space-y-1">
            {selectedOKRs.map((okrId) => {
              const okr = okrData.find((o) => o.id === okrId);
              return okr ? (
                <li key={okr.id} className="flex items-center">
                  <span className="mr-2">🎯</span>
                  <span className="text-sm">{okr.title}</span>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

// Power Calculator Component
const PowerCalculator = ({ onCalculate }) => {
  const [testType, setTestType] = useState("traditional");
  const [effectSize, setEffectSize] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [power, setPower] = useState(0.8);
  const [alpha, setAlpha] = useState(0.05);
  const [sampleSize, setSampleSize] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateSampleSize = () => {
    setLoading(true);

    // Simulate calculation delay
    setTimeout(() => {
      const zAlpha = 1.96; // For 95% confidence
      const zBeta = 0.84; // For 80% power
      const sigma = parseFloat(stdDev) || 1;
      const d = parseFloat(effectSize) || 0.1;

      let baseN = ((zAlpha + zBeta) ** 2 * sigma ** 2) / d ** 2;

      // Adjustments based on test type
      if (testType === "multivariate") {
        baseN *= 1.5;
      } else if (testType === "nontraditional") {
        baseN *= 1.2;
      }

      const result = Math.ceil(baseN);
      setSampleSize(result);
      setLoading(false);

      if (onCalculate) {
        onCalculate({
          sampleSize: result,
          effectSize: d,
          power,
          alpha,
        });
      }
    }, 800);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Test Type
        </label>
        <select
          className="w-full p-2 border rounded"
          value={testType}
          onChange={(e) => setTestType(e.target.value)}
        >
          <option value="traditional">Traditional A/B Test</option>
          <option value="nontraditional">Non-Traditional Test</option>
          <option value="multivariate">Multivariate Test</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expected Effect Size
          <span className="text-xs text-gray-500 ml-1">(0.1-1.0)</span>
        </label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          max="1.0"
          value={effectSize}
          onChange={(e) => setEffectSize(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. 0.2 (small), 0.5 (medium), 0.8 (large)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Standard Deviation
        </label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          value={stdDev}
          onChange={(e) => setStdDev(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. 1.0"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Desired Power
            <span className="text-xs text-gray-500 ml-1">(0-1)</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. 0.8"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alpha (Significance)
            <span className="text-xs text-gray-500 ml-1">(0-1)</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={alpha}
            onChange={(e) => setAlpha(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. 0.05"
          />
        </div>
      </div>

      <button
        onClick={calculateSampleSize}
        className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full mr-2"></span>
            Calculating...
          </>
        ) : (
          "Calculate Sample Size"
        )}
      </button>

      {sampleSize !== null && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">Results</h3>
          <div className="flex justify-between items-center">
            <span className="text-green-700">Recommended Sample Size:</span>
            <span className="text-2xl font-bold text-green-700">
              {sampleSize} per variant
            </span>
          </div>
          <p className="text-sm text-green-600 mt-2">
            With {sampleSize} samples per variant, you have a {power * 100}%
            chance of detecting an effect size of {effectSize} if it exists.
          </p>
        </div>
      )}
    </div>
  );
};

// Variant Designer Component (continued)
const VariantDesigner = ({ control, treatment, onChange }) => {
  const handleControlChange = (field, value) => {
    onChange({
      control: { ...control, [field]: value },
      treatment,
    });
  };

  const handleTreatmentChange = (field, value) => {
    onChange({
      control,
      treatment: { ...treatment, [field]: value },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Control Variant */}
      <div className="border p-4 rounded-lg bg-gray-50">
        <h3 className="font-medium text-gray-800 mb-3">Control Variant</h3>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={control.description || ""}
            onChange={(e) => handleControlChange("description", e.target.value)}
            placeholder="Describe current experience"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject Line (Optional)
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={control.subjectLine || ""}
            onChange={(e) => handleControlChange("subjectLine", e.target.value)}
            placeholder="e.g. 'Welcome to our product'"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Header Text (Optional)
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={control.headerText || ""}
            onChange={(e) => handleControlChange("headerText", e.target.value)}
            placeholder="e.g. 'Discover our features'"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Preview
          </label>
          <div className="border rounded p-2 bg-white">
            <img
              src="/api/placeholder/400/200?text=Control+Variant"
              alt="Control Variant"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Treatment Variant */}
      <div className="border p-4 rounded-lg bg-blue-50">
        <h3 className="font-medium text-gray-800 mb-3">Treatment Variant</h3>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={treatment.description || ""}
            onChange={(e) =>
              handleTreatmentChange("description", e.target.value)
            }
            placeholder="Describe new experience"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject Line (Optional)
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={treatment.subjectLine || ""}
            onChange={(e) =>
              handleTreatmentChange("subjectLine", e.target.value)
            }
            placeholder="e.g. 'Welcome to our enhanced product'"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Header Text (Optional)
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={treatment.headerText || ""}
            onChange={(e) =>
              handleTreatmentChange("headerText", e.target.value)
            }
            placeholder="e.g. 'Discover our premium features'"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Preview
          </label>
          <div className="border rounded p-2 bg-white">
            <img
              src="/api/placeholder/400/200?text=Treatment+Variant"
              alt="Treatment Variant"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Multivariate Designer Component
const MultivariateDesigner = ({ variants, onChange }) => {
  // Add a new variant
  const addVariant = () => {
    const newVariantId = `variant${variants.length}`;
    onChange([
      ...variants,
      {
        id: newVariantId,
        name: `Variant ${variants.length}`,
        description: "",
        elements: [],
      },
    ]);
  };

  // Remove a variant
  const removeVariant = (variantId) => {
    onChange(variants.filter((v) => v.id !== variantId));
  };

  // Update a variant
  const updateVariant = (variantId, field, value) => {
    onChange(
      variants.map((v) => (v.id === variantId ? { ...v, [field]: value } : v))
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">Multivariate Test Design</h3>
        <button
          onClick={addVariant}
          className="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center"
        >
          <span className="mr-1">+</span> Add Variant
        </button>
      </div>

      {/* Variant List */}
      <div className="space-y-4">
        {/* Control Variant (Always first) */}
        <div className="border p-4 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">Control</h4>
            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
              Base
            </span>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              className="w-full p-2 border rounded"
              rows={2}
              value={variants[0]?.description || ""}
              onChange={(e) =>
                updateVariant(variants[0]?.id, "description", e.target.value)
              }
              placeholder="Describe current experience"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image Preview
            </label>
            <div className="border rounded p-2 bg-white">
              <img
                src="/api/placeholder/400/150?text=Control+Variant"
                alt="Control Variant"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Treatment Variants */}
        {variants.slice(1).map((variant, index) => (
          <div key={variant.id} className="border p-4 rounded-lg bg-blue-50">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <input
                  type="text"
                  value={variant.name}
                  onChange={(e) =>
                    updateVariant(variant.id, "name", e.target.value)
                  }
                  className="font-medium text-gray-800 border-0 bg-transparent focus:ring-0 p-0"
                />
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                  #{index + 1}
                </span>
              </div>
              <button
                onClick={() => removeVariant(variant.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                className="w-full p-2 border rounded"
                rows={2}
                value={variant.description || ""}
                onChange={(e) =>
                  updateVariant(variant.id, "description", e.target.value)
                }
                placeholder="Describe this variant"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Changes from Control
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`element1-${variant.id}`}
                    checked={variant.elements?.includes("headline")}
                    onChange={(e) => {
                      const elements = [...(variant.elements || [])];
                      if (e.target.checked) {
                        elements.push("headline");
                      } else {
                        const index = elements.indexOf("headline");
                        if (index !== -1) elements.splice(index, 1);
                      }
                      updateVariant(variant.id, "elements", elements);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`element1-${variant.id}`} className="text-sm">
                    Modified Headline
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`element2-${variant.id}`}
                    checked={variant.elements?.includes("cta")}
                    onChange={(e) => {
                      const elements = [...(variant.elements || [])];
                      if (e.target.checked) {
                        elements.push("cta");
                      } else {
                        const index = elements.indexOf("cta");
                        if (index !== -1) elements.splice(index, 1);
                      }
                      updateVariant(variant.id, "elements", elements);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`element2-${variant.id}`} className="text-sm">
                    Modified CTA
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`element3-${variant.id}`}
                    checked={variant.elements?.includes("layout")}
                    onChange={(e) => {
                      const elements = [...(variant.elements || [])];
                      if (e.target.checked) {
                        elements.push("layout");
                      } else {
                        const index = elements.indexOf("layout");
                        if (index !== -1) elements.splice(index, 1);
                      }
                      updateVariant(variant.id, "elements", elements);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`element3-${variant.id}`} className="text-sm">
                    Modified Layout
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`element4-${variant.id}`}
                    checked={variant.elements?.includes("image")}
                    onChange={(e) => {
                      const elements = [...(variant.elements || [])];
                      if (e.target.checked) {
                        elements.push("image");
                      } else {
                        const index = elements.indexOf("image");
                        if (index !== -1) elements.splice(index, 1);
                      }
                      updateVariant(variant.id, "elements", elements);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`element4-${variant.id}`} className="text-sm">
                    Modified Image
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Preview
              </label>
              <div className="border rounded p-2 bg-white">
                <img
                  src={`/api/placeholder/400/150?text=Variant+${index + 1}`}
                  alt={`Variant ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Panel */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 text-sm">
          Multivariate Test Complexity
        </h4>
        <p className="text-sm text-yellow-700 mt-1">
          Combinations: {Math.pow(2, variants.length - 1)}
          <span className="ml-2 text-xs">
            ({variants.length} variants with{" "}
            {variants.reduce((sum, v) => sum + (v.elements?.length || 0), 0)}{" "}
            total element changes)
          </span>
        </p>
        <p className="text-xs text-yellow-600 mt-1">
          Note: Testing more combinations increases sample size requirements and
          analysis complexity.
        </p>
      </div>
    </div>
  );
};

// Traffic Allocator Component
const TrafficAllocator = ({ allocation, onChange, minPercentage = 5 }) => {
  // Ensure allocation is valid
  const validateAllocation = (newAllocation) => {
    // Make sure all values are at least minPercentage
    const validatedAllocation = { ...newAllocation };
    const groups = Object.keys(validatedAllocation);

    for (const group of groups) {
      if (validatedAllocation[group] < minPercentage) {
        validatedAllocation[group] = minPercentage;
      }
    }

    // Adjust to make sure total is 100%
    const total = Object.values(validatedAllocation).reduce(
      (sum, val) => sum + val,
      0
    );
    if (total !== 100) {
      // Scale proportionally
      const scaleFactor = 100 / total;
      for (const group of groups) {
        validatedAllocation[group] = Math.round(
          validatedAllocation[group] * scaleFactor
        );
      }

      // Handle rounding errors
      const newTotal = Object.values(validatedAllocation).reduce(
        (sum, val) => sum + val,
        0
      );
      if (newTotal !== 100) {
        const diff = 100 - newTotal;
        // Add/subtract the difference from the largest group
        const largestGroup = groups.reduce((a, b) =>
          validatedAllocation[a] > validatedAllocation[b] ? a : b
        );
        validatedAllocation[largestGroup] += diff;
      }
    }

    return validatedAllocation;
  };

  const handleSliderChange = (group, value) => {
    // Calculate new allocation
    const newAllocation = { ...allocation };
    newAllocation[group] = value;

    // Adjust other groups proportionally
    const otherGroups = Object.keys(newAllocation).filter((g) => g !== group);
    const otherTotal = otherGroups.reduce(
      (sum, g) => sum + newAllocation[g],
      0
    );
    const targetOtherTotal = 100 - value;

    if (otherTotal > 0) {
      const scaleFactor = targetOtherTotal / otherTotal;
      for (const g of otherGroups) {
        newAllocation[g] = Math.round(newAllocation[g] * scaleFactor);
      }
    }

    onChange(validateAllocation(newAllocation));
  };

  const calculateColor = (percentage) => {
    // Return a different color based on percentage
    if (percentage < 20) return "bg-red-500";
    if (percentage < 40) return "bg-orange-500";
    if (percentage < 60) return "bg-yellow-500";
    if (percentage < 80) return "bg-green-500";
    return "bg-blue-500";
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-medium text-gray-800 mb-2">Traffic Allocation</h3>
        <p className="text-sm text-gray-600">
          Adjust how traffic will be distributed between variants. Minimum
          allocation per variant is {minPercentage}%.
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(allocation).map(([group, percentage]) => (
          <div key={group}>
            <div className="flex justify-between items-center mb-1">
              <label className="font-medium text-sm">{group}</label>
              <span className="text-sm font-medium">{percentage}%</span>
            </div>
            <div className="relative h-8">
              <input
                type="range"
                min={minPercentage}
                max={100 - (Object.keys(allocation).length - 1) * minPercentage}
                value={percentage}
                onChange={(e) =>
                  handleSliderChange(group, parseInt(e.target.value))
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="absolute inset-0 bg-gray-200 rounded h-2 top-3">
                <div
                  className={`absolute left-0 ${calculateColor(
                    percentage
                  )} h-2 rounded`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">Distribution Preview</h4>
        <div className="h-8 bg-gray-200 rounded-lg overflow-hidden flex">
          {Object.entries(allocation).map(([group, percentage], index) => (
            <div
              key={group}
              className={`h-full ${calculateColor(percentage)}`}
              style={{ width: `${percentage}%` }}
            >
              <div className="h-full flex items-center justify-center text-white text-xs font-medium">
                {percentage > 10 ? `${group} ${percentage}%` : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample Size Calculator Component
const SampleSizeCalculator = ({
  conversionRate,
  minimumDetectableEffect,
  onChange,
}) => {
  const [sampleSize, setSampleSize] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = () => {
    setLoading(true);

    // Simulate calculation
    setTimeout(() => {
      // Basic A/B test sample size calculation
      const baseRate = conversionRate / 100;
      const mde = minimumDetectableEffect / 100;
      const alpha = 0.05; // Significance level
      const beta = 0.2; // 1 - power (power = 0.8)

      // Z-scores
      const zAlpha = 1.96; // For 95% confidence
      const zBeta = 0.84; // For 80% power

      // Sample size calculation
      const p1 = baseRate;
      const p2 = baseRate * (1 + mde);
      const pBar = (p1 + p2) / 2;
      const variance = pBar * (1 - pBar);

      const n = Math.ceil(
        (2 * variance * (zAlpha + zBeta) ** 2) / (p2 - p1) ** 2
      );

      setSampleSize(n);
      setLoading(false);

      if (onChange) {
        onChange(n);
      }
    }, 500);
  };

  useEffect(() => {
    if (conversionRate && minimumDetectableEffect) {
      calculate();
    }
  }, [conversionRate, minimumDetectableEffect]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="font-medium text-gray-800 mb-2">Sample Size Calculator</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Baseline Conversion Rate (%)
          </label>
          <input
            type="number"
            min="0.1"
            max="99.9"
            step="0.1"
            value={conversionRate}
            onChange={(e) =>
              onChange &&
              onChange(parseFloat(e.target.value), minimumDetectableEffect)
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Detectable Effect (%)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            step="1"
            value={minimumDetectableEffect}
            onChange={(e) =>
              onChange && onChange(conversionRate, parseFloat(e.target.value))
            }
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            Assumptions: 95% confidence level, 80% power
          </p>
        </div>

        <button
          onClick={calculate}
          className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin h-3 w-3 border-2 border-t-transparent border-white rounded-full mr-1"></span>
              Calculating...
            </>
          ) : (
            "Recalculate"
          )}
        </button>
      </div>

      {sampleSize !== null && (
        <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-green-800">
                Required Sample Size:
              </p>
              <p className="text-xs text-green-700 mt-1">
                To detect a {minimumDetectableEffect}% effect with 80% power.
              </p>
            </div>
            <div className="text-2xl font-bold text-green-700">
              {sampleSize.toLocaleString()} per variant
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Results Significance Calculator (continued)
const SignificanceCalculator = ({
  controlUsers,
  controlConversions,
  treatmentUsers,
  treatmentConversions,
  onChange,
}) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateSignificance = () => {
    setLoading(true);

    // Simulate calculation
    setTimeout(() => {
      // Conversion rates
      const controlRate = controlConversions / controlUsers;
      const treatmentRate = treatmentConversions / treatmentUsers;

      // Improvement
      const improvement = ((treatmentRate - controlRate) / controlRate) * 100;

      // Chi-square calculation for p-value (simplified)
      const totalUsers = controlUsers + treatmentUsers;
      const totalConversions = controlConversions + treatmentConversions;
      const expectedControlConversions =
        controlUsers * (totalConversions / totalUsers);
      const expectedTreatmentConversions =
        treatmentUsers * (totalConversions / totalUsers);

      // Chi-square statistic
      const chiSquare =
        (controlConversions - expectedControlConversions) ** 2 /
          expectedControlConversions +
        (treatmentConversions - expectedTreatmentConversions) ** 2 /
          expectedTreatmentConversions +
        (controlUsers -
          controlConversions -
          (controlUsers - expectedControlConversions)) **
          2 /
          (controlUsers - expectedControlConversions) +
        (treatmentUsers -
          treatmentConversions -
          (treatmentUsers - expectedTreatmentConversions)) **
          2 /
          (treatmentUsers - expectedTreatmentConversions);

      // Simplified p-value calculation (real implementation would use a chi-square distribution)
      let pValue;
      if (chiSquare < 1) pValue = 0.3;
      else if (chiSquare < 2) pValue = 0.15;
      else if (chiSquare < 3) pValue = 0.08;
      else if (chiSquare < 4) pValue = 0.04;
      else if (chiSquare < 6) pValue = 0.01;
      else pValue = 0.001;

      // Confidence level
      const confidence = 100 * (1 - pValue);

      // Results
      const result = {
        controlRate: controlRate * 100,
        treatmentRate: treatmentRate * 100,
        improvement,
        pValue,
        confidence,
        significant: pValue < 0.05,
      };

      setResults(result);
      setLoading(false);

      if (onChange) {
        onChange(result);
      }
    }, 800);
  };

  useEffect(() => {
    if (
      controlUsers &&
      controlConversions &&
      treatmentUsers &&
      treatmentConversions
    ) {
      calculateSignificance();
    }
  }, [controlUsers, controlConversions, treatmentUsers, treatmentConversions]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="font-medium text-gray-800 mb-2">
        Statistical Significance Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-3 border rounded bg-white">
          <h4 className="font-medium text-sm mb-2">Control Group</h4>

          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-1">
              Total Users
            </label>
            <input
              type="number"
              min="1"
              value={controlUsers}
              onChange={(e) =>
                onChange &&
                onChange({
                  controlUsers: parseInt(e.target.value),
                  controlConversions,
                  treatmentUsers,
                  treatmentConversions,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Conversions
            </label>
            <input
              type="number"
              min="0"
              max={controlUsers}
              value={controlConversions}
              onChange={(e) =>
                onChange &&
                onChange({
                  controlUsers,
                  controlConversions: parseInt(e.target.value),
                  treatmentUsers,
                  treatmentConversions,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="p-3 border rounded bg-white">
          <h4 className="font-medium text-sm mb-2">Treatment Group</h4>

          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-1">
              Total Users
            </label>
            <input
              type="number"
              min="1"
              value={treatmentUsers}
              onChange={(e) =>
                onChange &&
                onChange({
                  controlUsers,
                  controlConversions,
                  treatmentUsers: parseInt(e.target.value),
                  treatmentConversions,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Conversions
            </label>
            <input
              type="number"
              min="0"
              max={treatmentUsers}
              value={treatmentConversions}
              onChange={(e) =>
                onChange &&
                onChange({
                  controlUsers,
                  controlConversions,
                  treatmentUsers,
                  treatmentConversions: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button
          onClick={calculateSignificance}
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin h-3 w-3 border-2 border-t-transparent border-white rounded-full mr-1"></span>
              Calculating...
            </>
          ) : (
            "Calculate Significance"
          )}
        </button>
      </div>

      {results && (
        <div
          className={`p-3 rounded border ${
            results.significant
              ? "bg-green-50 border-green-200"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex justify-between mb-2">
            <h4
              className={`font-medium ${
                results.significant ? "text-green-800" : "text-amber-800"
              }`}
            >
              Results
            </h4>
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                results.significant
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {results.significant ? "Significant" : "Not Significant"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="text-center p-2 bg-white rounded">
              <p className="text-xs text-gray-500">Control</p>
              <p className="font-medium text-gray-800">
                {results.controlRate.toFixed(2)}%
              </p>
            </div>
            <div className="text-center p-2 bg-white rounded">
              <p className="text-xs text-gray-500">Treatment</p>
              <p className="font-medium text-gray-800">
                {results.treatmentRate.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Improvement:</span>
              <span
                className={`font-medium ${
                  results.improvement >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {results.improvement >= 0 ? "+" : ""}
                {results.improvement.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">P-value:</span>
              <span className="font-medium">{results.pValue.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Confidence:</span>
              <span className="font-medium">
                {results.confidence.toFixed(1)}%
              </span>
            </div>
          </div>

          <p className="text-xs mt-3 text-gray-600">
            {results.significant
              ? `This result is statistically significant at the 95% confidence level.`
              : `This result is not statistically significant. Consider running the test longer or increasing the sample size.`}
          </p>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   10) MULTI-STEP WIZARD COMPONENTS
   --------------------------------------------------------------------------- */

// Multi-step Wizard Component
const Wizard = ({ steps, onComplete, initialStep = 0 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [stepData, setStepData] = useState(
    steps.map((step) => step.initialData || {})
  );

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(stepData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepDataChange = (data) => {
    const newStepData = [...stepData];
    newStepData[currentStep] = { ...newStepData[currentStep], ...data };
    setStepData(newStepData);
  };

  const currentStepConfig = steps[currentStep];
  const StepComponent = currentStepConfig.component;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              onClick={() => index < currentStep && setCurrentStep(index)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                } ${index < currentStep ? "cursor-pointer" : ""}`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-gray-600">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2 h-1 bg-gray-200">
          <div
            className="absolute h-1 bg-blue-500 transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">{currentStepConfig.title}</h2>
        {currentStepConfig.description && (
          <p className="text-gray-600">{currentStepConfig.description}</p>
        )}
      </div>

      <div className="mb-6">
        <StepComponent
          data={stepData[currentStep]}
          onChange={handleStepDataChange}
          allData={stepData}
        />
      </div>

      <div className="flex justify-between">
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
          >
            Back
          </button>
        ) : (
          <div></div> // Empty div for spacing
        )}

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={
            currentStepConfig.isDisabled &&
            currentStepConfig.isDisabled(stepData[currentStep])
          }
        >
          {currentStep === steps.length - 1 ? "Complete" : "Continue"}
        </button>
      </div>
    </div>
  );
};

// Basic Info Step Component
const WizardBasicInfoStep = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <FormGroup
        title="Template Selection"
        description="Choose the type of experiment you want to run"
      >
        <TemplateSelector
          templates={briefTemplates}
          selectedTemplate={data.template || ""}
          onChange={(template) => handleChange("template", template)}
        />

        {data.template && (
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <h4 className="font-medium text-blue-800">Template Details</h4>
            <p className="text-sm text-blue-700 mt-1">
              {briefTemplates.find((t) => t.id === data.template)?.details}
            </p>
          </div>
        )}
      </FormGroup>

      <FormGroup title="Basic Information">
        <FormField
          label="Experiment Name"
          value={data.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter a descriptive name for your experiment"
          required
        />

        <FormField
          label="Category"
          type="select"
          value={data.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
          options={[
            { value: "monetization", label: "Monetization" },
            { value: "engagement", label: "Engagement" },
            { value: "satisfaction", label: "User Satisfaction" },
          ]}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Start Date"
            type="date"
            value={data.startDate || ""}
            onChange={(e) => handleChange("startDate", e.target.value)}
            required
          />

          <FormField
            label="End Date"
            type="date"
            value={data.endDate || ""}
            onChange={(e) => handleChange("endDate", e.target.value)}
            required
          />
        </div>

        <FormField
          label="Owner"
          value={data.owner || ""}
          onChange={(e) => handleChange("owner", e.target.value)}
          placeholder="Person responsible for this experiment"
        />
      </FormGroup>

      <FormGroup title="Link to Strategic Objectives">
        <OKRSelector
          selectedOKRs={data.okrs || []}
          onChange={(okrs) => handleChange("okrs", okrs)}
          okrData={initialOKRs}
        />
      </FormGroup>

      <FormGroup
        title="Team Members"
        description="Add team members involved in this experiment"
      >
        <div className="space-y-2">
          {data.team && data.team.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-3">
              {data.team.map((member, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded flex items-center text-sm"
                >
                  {member}
                  <button
                    className="ml-2 text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      const newTeam = [...data.team];
                      newTeam.splice(index, 1);
                      handleChange("team", newTeam);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No team members added yet
            </p>
          )}

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter team member name"
              className="flex-1 p-2 border rounded"
              value={data.newMember || ""}
              onChange={(e) => handleChange("newMember", e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && data.newMember) {
                  const newTeam = data.team || [];
                  handleChange("team", [...newTeam, data.newMember]);
                  handleChange("newMember", "");
                  e.preventDefault();
                }
              }}
            />
            <button
              className="px-3 py-1.5 bg-blue-500 text-white rounded"
              onClick={() => {
                if (data.newMember) {
                  const newTeam = data.team || [];
                  handleChange("team", [...newTeam, data.newMember]);
                  handleChange("newMember", "");
                }
              }}
            >
              Add
            </button>
          </div>
        </div>
      </FormGroup>

      
    </div>
  );
};

// Goals and Metrics Step Component
const WizardGoalsMetricsStep = ({ data, onChange, allData }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <FormGroup
        title="Business Goal"
        description="Define what you're trying to achieve with this experiment"
      >
        <FormField
          label="Business Goal"
          type="textarea"
          value={data.goal || ""}
          onChange={(e) => handleChange("goal", e.target.value)}
          placeholder="e.g., Increase conversion rate of the signup form"
          required
        />
      </FormGroup>

      <FormGroup
        title="Primary Metric"
        description="Select the main metric you'll use to evaluate success"
      >
        <MetricSelector
          selectedMetric={data.primaryMetric || ""}
          onChange={(metric) => handleChange("primaryMetric", metric)}
          category={allData[0].category}
        />
      </FormGroup>

      <FormGroup
        title="Target Audience"
        description="Define who will be included in this experiment"
      >
        <AudienceSelector
          selectedAudiences={data.audiences || []}
          onChange={(audiences) => handleChange("audiences", audiences)}
        />

        <div className="mt-4">
          <FormField
            label="Custom Audience Description (optional)"
            type="textarea"
            value={data.customAudience || ""}
            onChange={(e) => handleChange("customAudience", e.target.value)}
            placeholder="Describe any custom audience criteria not covered above"
          />
        </div>
      </FormGroup>

      <FormGroup
        title="Hypothesis"
        description="Clearly state what you expect to happen and why"
      >
        <HypothesisBuilder
          initialValue={data.hypothesis || ""}
          onChange={(hypothesis) => handleChange("hypothesis", hypothesis)}
          category={allData[0].category}
        />
      </FormGroup>

      <FormGroup
        title="Success Criteria"
        description="Define the conditions that will make this experiment a success"
      >
        <SuccessCriteriaBuilder
          initialValue={data.successCriteria || ""}
          onChange={(criteria) => handleChange("successCriteria", criteria)}
          primaryMetric={
            metricsLibrary.find((m) => m.id === data.primaryMetric)?.name ||
            "primary metric"
          }
        />
      </FormGroup>

      <FormGroup
        title="Learning Agenda"
        description="What specific questions are you trying to answer with this experiment?"
      >
        <LearningAgendaBuilder
          initialValue={data.learningAgenda || ""}
          onChange={(agenda) => handleChange("learningAgenda", agenda)}
        />
      </FormGroup>

      <FormGroup
        title="Sample Size Estimation"
        description="Calculate the sample size needed for this experiment"
      >
        <SampleSizeCalculator
          conversionRate={data.baselineRate || 2.5}
          minimumDetectableEffect={data.minimumEffect || 10}
          onChange={(conversionRate, minimumDetectableEffect) => {
            handleChange("baselineRate", conversionRate);
            handleChange("minimumEffect", minimumDetectableEffect);
          }}
        />
      </FormGroup>
    </div>
  );
};

// Variants Step Component
const WizardVariantsStep = ({ data, onChange, allData }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <FormGroup
        title="Experiment Variants"
        description="Define the control and treatment variations"
      >
        {allData[0].template === "multivariate" ? (
          <MultivariateDesigner
            variants={
              data.variants || [
                { id: "control", name: "Control", description: "" },
                {
                  id: "variant1",
                  name: "Variant 1",
                  description: "",
                  elements: [],
                },
              ]
            }
            onChange={(variants) => handleChange("variants", variants)}
          />
        ) : (
          <VariantDesigner
            control={data.control || {}}
            treatment={data.treatment || {}}
            onChange={({ control, treatment }) => {
              handleChange("control", control);
              handleChange("treatment", treatment);
            }}
          />
        )}
      </FormGroup>

      <FormGroup
        title="Traffic Allocation"
        description="Decide how to split traffic between variants"
      >
        <TrafficAllocator
          allocation={
            data.allocation ||
            (allData[0].template === "multivariate" && data.variants
              ? data.variants.reduce((acc, v) => {
                  acc[v.name] = Math.floor(100 / data.variants.length);
                  return acc;
                }, {})
              : { Control: 50, Treatment: 50 })
          }
          onChange={(allocation) => handleChange("allocation", allocation)}
        />
      </FormGroup>
    </div>
  );
};

// Review Step Component (continued)
const WizardReviewStep = ({ data, onChange, allData }) => {
  const issues = []; // For now, just declare it empty
  // Combine all data from previous steps
  const combinedData = allData.reduce(
    (acc, stepData) => ({ ...acc, ...stepData }),
    {}
  );

  // Rest of the component logic...

  return (
    <div className="space-y-6">
      {/* Issues alert */}

      <div className="border rounded-lg overflow-hidden">
        {/* Header section */}

        {/* Various information sections */}

        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-700">Variants</h4>
          {combinedData.template === "multivariate" ? (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">
                Multivariate test with {combinedData.variants?.length || 0}{" "}
                variants:
              </p>
              <div className="space-y-2">
                {combinedData.variants?.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="p-2 bg-gray-50 rounded border"
                  >
                    <span className="font-medium text-sm">{variant.name}</span>
                    <p className="text-xs text-gray-600 mt-1">
                      {variant.description || "No description"}
                    </p>
                    {variant.elements && variant.elements.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {variant.elements.map((elem) => (
                          <span
                            key={elem}
                            className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded"
                          >
                            {elem}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-2 bg-gray-50 rounded border">
                <span className="text-xs font-medium text-gray-500">
                  Control:
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {combinedData.control?.description || "Not defined"}
                </p>
              </div>
              <div className="p-2 bg-blue-50 rounded border">
                <span className="text-xs font-medium text-gray-500">
                  Treatment:
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {combinedData.treatment?.description || "Not defined"}
                </p>
              </div>
            </div>
          )}

          {combinedData.allocation && (
            <div className="mt-3">
              <span className="text-xs font-medium text-gray-500">
                Traffic Allocation:
              </span>
              <div className="h-6 bg-gray-200 rounded-lg overflow-hidden flex mt-1">
                {Object.entries(combinedData.allocation).map(
                  ([group, percentage], index) => (
                    <div
                      key={group}
                      className={`h-full ${
                        index === 0 ? "bg-gray-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="h-full flex items-center justify-center text-white text-xs font-medium">
                        {percentage > 10 ? `${group} ${percentage}%` : ""}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded border border-green-200">
        <h4 className="font-medium text-green-800">AI Review</h4>
        <div className="mt-2 space-y-2 text-green-700 text-sm">
          {issues.length === 0 ? (
            <>
              <div className="flex items-start">
                <span className="mr-2">✓</span> All required fields completed
              </div>
              <div className="flex items-start">
                <span className="mr-2">✓</span> Hypothesis follows best
                practices
              </div>
              <div className="flex items-start">
                <span className="mr-2">✓</span> Success criteria is measurable &
                specific
              </div>
              <div className="flex items-start">
                <span className="mr-2">✓</span> Date range is appropriate
              </div>
              <div className="flex items-start">
                <span className="mr-2">✓</span> Clear alignment with strategic
                OKRs
              </div>
              <div className="flex items-start">
                <span className="mr-2">✓</span> Learning agenda is well-defined
              </div>
            </>
          ) : (
            <div className="flex items-start">
              <span className="mr-2">⚠</span> There are {issues.length} issue(s)
              to fix before submitting
            </div>
          )}
        </div>
      </div>

      <FormField
        label="Add Notes (Optional)"
        type="textarea"
        value={data.notes || ""}
        onChange={(e) => onChange({ ...data, notes: e.target.value })}
        placeholder="Any additional information or context for reviewers"
      />
    </div>
  );
};

// Template Selector Component
const TemplateSelector = ({ templates, selectedTemplate, onChange }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          onClick={() => onChange(template.id)}
          className={`border p-4 rounded-lg cursor-pointer ${
            selectedTemplate === template.id
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-start">
            <div className="mr-4 text-xl">{template.icon || "📄"}</div>
            <div>
              <h3 className="font-medium text-gray-800">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {template.description}
              </p>

              <div className="flex items-center mt-3 text-xs text-gray-500">
                <span className="mr-4">Complexity: {template.complexity}</span>
                <span>Best for: {template.recommendedFor}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   11) MAIN EXPERIMENT PLATFORM COMPONENT
   --------------------------------------------------------------------------- */

export default function E2ExperimentPlatform() {
  // Global Data States
  const [activeTab, setActiveTab] = useState("planning");
  const [roadmap, setRoadmap] = useState(initialRoadmap);
  const [reviews, setReviews] = useState(initialReviews);
  const [experiments, setExperiments] = useState(initialExperiments);
  const [knowledge, setKnowledge] = useState(initialKnowledge);
  const [experimentDecisions, setExperimentDecisions] = useState({});
  const [okrData, setOkrData] = useState(initialOKRs);
  const [recentItems, setRecentItems] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: "Dashboard", path: "" },
  ]);
  const [notifications, setNotifications] = useState([]);
  const [selectedRole, setSelectedRole] = useState("pm"); // Default role: product manager

  // Modal States
  const [showPowerModal, setShowPowerModal] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showLearningPathModal, setShowLearningPathModal] = useState(false);
  const [showOKRModal, setShowOKRModal] = useState(false);
  const [showKnowledgeModal, setShowKnowledgeModal] = useState(false);
  const [showApplyInsightsModal, setShowApplyInsightsModal] = useState(false);
  const [showAdvancedSearchModal, setShowAdvancedSearchModal] = useState(false);

  // AI Modal States
  const [showAIPromptModal, setShowAIPromptModal] = useState(false);
  const [aiPromptPurpose, setAiPromptPurpose] = useState(""); // 'hypothesis', 'analysis', etc.
  const [aiPromptContext, setAiPromptContext] = useState({});
  const [aiResponse, setAiResponse] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Item States
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);
  const [reviewModalItem, setReviewModalItem] = useState(null);
  const [planItemModalItem, setPlanItemModalItem] = useState(null);

  // Simulation States
  const [simulationDay, setSimulationDay] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  // Loading States
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Breadcrumb management
  const updateBreadcrumbs = (newPath, newLabel) => {
    // Keep Home, add/update the section, and possibly a third level
    if (newPath === "") {
      // Just reset to home
      setBreadcrumbs([{ label: "Dashboard", path: "" }]);
    } else if (
      newPath === "planning" ||
      newPath === "reviews" ||
      newPath === "experiments" ||
      newPath === "knowledge"
    ) {
      // Section level
      setBreadcrumbs([
        { label: "Dashboard", path: "" },
        { label: newLabel, path: newPath },
      ]);
    } else if (newPath === "new-experiment" || newPath === "new-brief") {
      // Special case for creating new items
      setBreadcrumbs([
        { label: "Dashboard", path: "" },
        { label: newLabel, path: newPath },
      ]);
    } else {
      // Deep level - keep first two, add third
      setBreadcrumbs((prev) => {
        // Make sure we have at least two items in the breadcrumbs
        if (prev.length < 2) {
          return [
            { label: "Dashboard", path: "" },
            { label: newLabel, path: newPath },
          ];
        }

        return [prev[0], prev[1], { label: newLabel, path: newPath }];
      });
    }
  };

  // Add to recent items
  const addToRecent = (item) => {
    if (!item || !item.id) return;

    // Create a standardized recent item
    const recentItem = {
      id: item.id,
      name: item.name,
      type:
        item.lifecycleStage ||
        (item.id.startsWith("roadmap")
          ? "planning"
          : item.id.startsWith("brief")
          ? "review"
          : item.id.startsWith("past")
          ? "knowledge"
          : "experiment"),
      timestamp: new Date().toISOString(),
    };

    // Add to recent items, avoid duplicates, keep only last 5
    setRecentItems((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      return [recentItem, ...filtered].slice(0, 5);
    });
  };

  // Show toast notification
  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type, duration });

    // Auto-hide after duration
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  // Show loading indicator
  const showLoading = (message = "Loading...") => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  // Hide loading indicator
  const hideLoading = () => {
    setIsLoading(false);
  };

  // Tab switching with breadcrumb update
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    updateBreadcrumbs(tab, tab.charAt(0).toUpperCase() + tab.slice(1));

    // Reset detailed views when switching tabs
    setSelectedExperiment(null);
  };

  // AI Assistant Modal Handler
  // const openAIPromptModal = (purpose, context = {}) => {
  //   setAiPromptPurpose(purpose);
  //   setAiPromptContext(context);
  //   setAiResponse("");
  //   setShowAIPromptModal(true);
  // };
  const openAIPromptModal = (purpose, context = {}) => {
    setAiPromptPurpose(purpose);
    setAiPromptContext(context);
    setAiResponse("");

    // Generate suggested prompt based on context and purpose
    let suggestedPrompt = "";

    if (purpose === "hypothesis") {
      suggestedPrompt = `Generate a hypothesis for an experiment about ${
        context.category || "improving user experience"
      } with the goal to ${
        context.goal || "increase engagement and retention"
      }.`;
    } else if (purpose === "analysis") {
      if (context.improvement !== undefined) {
        suggestedPrompt = `Analyze the results of the "${context.name}" experiment which showed a ${context.improvement}% change (p=${context.significance}). Explain the implications and suggest next steps.`;
      } else {
        suggestedPrompt = `Analyze the design and goals of the "${context.name}" experiment and provide feedback.`;
      }
    } else if (purpose === "learningAgenda") {
      suggestedPrompt = `Create a comprehensive learning agenda for an experiment about ${
        context.category || "user experience"
      } with the hypothesis: "${
        context.hypothesis || "Our proposed change will improve metrics"
      }".`;
    } else if (purpose === "successCriteria") {
      suggestedPrompt = `Define clear success criteria for an experiment measuring ${
        context.primaryMetric || "key metrics"
      } with baseline conversion rate of ${context.baselineRate || "3"}%.`;
    }

    // Update the AI context with the suggested prompt
    setAiPromptContext({
      ...context,
      suggestedPrompt,
    });

    setShowAIPromptModal(true);
  };

  // Handle AI Prompt Submission
  const handleAIPromptSubmit = (prompt) => {
    setIsGeneratingAI(true);

    // Simulate AI processing time
    setTimeout(() => {
      let response = "";

      // Generate different responses based on the purpose
      switch (aiPromptPurpose) {
        case "hypothesis":
          response = `Based on your input, I've crafted a hypothesis that aligns with your business goals:

"If we implement a personalized recommendation system based on viewing history, user engagement will increase by approximately 25% compared to the current generic recommendations, because users will discover more relevant content that matches their specific interests and viewing patterns."

This hypothesis is testable, includes a clear predicted outcome (25% increase in engagement), and provides a rationale. The personalization approach is supported by data from similar experiments in the industry showing 15-30% improvements in engagement metrics.`;
          break;

        case "analysis":
          response = `## Experiment Analysis: ${
            aiPromptContext.name || "Current Experiment"
          }

Based on the data, this experiment shows a ${
            aiPromptContext.improvement > 0
              ? "statistically significant positive impact"
              : "statistically insignificant or negative impact"
          } with:

- ${aiPromptContext.improvement}% change in the primary metric
- p-value of ${aiPromptContext.significance} (${
            aiPromptContext.significance < 0.05
              ? "significant"
              : "not significant"
          })
- ${aiPromptContext.confidence}% confidence level

### Key Insights:
1. The strongest positive response came from ${
            aiPromptContext.segments
              ? aiPromptContext.segments[0]?.name
              : "new users"
          } (+${
            aiPromptContext.segments
              ? aiPromptContext.segments[0]?.improvement
              : "0"
          }%)
2. The mechanism driving this improvement appears to be improved relevance and discoverability
3. The effect was consistent across device types, suggesting a fundamental user experience improvement

### Recommended Next Steps:
1. ${
            aiPromptContext.improvement > 10
              ? "Implement the winning variant across all applicable surfaces"
              : "Consider iterating on the approach with modifications"
          }
2. Test variations that further enhance the strongest aspects of this implementation
3. Segment analysis suggests targeting ${
            aiPromptContext.segments
              ? aiPromptContext.segments[0]?.name
              : "new users"
          } could yield even higher improvements

This analysis has high confidence due to adequate sample size and clear statistical significance.`;
          break;

        case "learningAgenda":
          response = `I recommend the following comprehensive learning agenda for your experiment:

"Understand how users respond to personalized content recommendations across different segments and usage patterns by:
1. Measuring engagement lift by user tenure (new vs. existing)
2. Analyzing whether personalization increases discovery of new content categories
3. Determining the optimal balance between familiar and novel recommendations
4. Identifying which elements of personalization (recency, similarity, popularity) drive the strongest engagement
5. Examining whether personalization affects session duration and frequency differently"

This agenda will provide actionable insights regardless of whether your hypothesis is confirmed or rejected, helping to build your personalization strategy on solid evidence.`;
          break;

        case "successCriteria":
          response = `Based on your experiment design, I recommend these comprehensive success criteria:

"The experiment will be considered successful if:
1. Primary: ${
            aiPromptContext.primaryMetric || "The primary metric"
          } increases by at least 15% with statistical significance (p < 0.05)
2. Secondary: No statistically significant decrease in user satisfaction metrics
3. Segment: Improvement is consistent across at least 3 major user segments
4. Duration: The positive effect persists for at least 7 days after implementation
5. Technical: No negative impact on page load times (< 200ms difference)"

These criteria balance statistical rigor with practical business impact and account for potential side effects. The 15% threshold is ambitious but realistic based on industry benchmarks for similar changes.`;
          break;

        default:
          response = `I've analyzed your request and here are my thoughts:

${prompt}

This seems like an interesting direction to explore. I'd recommend considering how this aligns with your current strategic objectives and what specific metrics would help validate success. Consider both quantitative metrics and qualitative user feedback to get a complete picture of the impact.

Would you like me to help refine this further with more specific recommendations?`;
      }

      setAiResponse(response);
      setIsGeneratingAI(false);
    }, 2000);
  };

  // Simulate real-time data updates
  // const simulateDataUpdate = () => {
  //   if (isSimulating) return;

  //   setIsSimulating(true);
  //   setSimulationDay((prev) => prev + 1);

  //   // Only update in-progress experiments
  //   const updatedExperiments = experiments.map((exp) => {
  //     if (
  //       exp.status !==
  //       LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase()
  //     ) {
  //       return exp;
  //     }

  //     // Increase progress
  //     const progressIncrement = Math.floor(Math.random() * 5) + 3; // 3-7% progress increment
  //     const newProgress = Math.min(100, exp.progress + progressIncrement);

  //     // Update days running
  //     const newDaysRunning = exp.daysRunning + 1;

  //     // If experiment is completed, add results
  //     if (newProgress >= 100) {
  //       // Generate random results
  //       const improvement = Math.floor(Math.random() * 40) - 5; // -5% to +35%
  //       const significance =
  //         improvement > 15
  //           ? 0.001
  //           : improvement > 5
  //           ? 0.03
  //           : improvement > 0
  //           ? 0.08
  //           : 0.2;
  //       const confidence = 100 - significance * 100;

  //       return {
  //         ...exp,
  //         progress: 100,
  //         daysRunning: newDaysRunning,
  //         status: LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase(),
  //         improvement,
  //         significance,
  //         confidence,
  //         impact:
  //           improvement > 0
  //             ? `~${Math.floor(improvement * 100)} additional conversions`
  //             : "No positive impact detected",
  //         knowledgeStatus:
  //           LIFECYCLE_STAGES.KNOWLEDGE.ANALYZING.label.toLowerCase(),
  //       };
  //     }

  //     // Just update progress for ongoing experiments
  //     return {
  //       ...exp,
  //       progress: newProgress,
  //       daysRunning: newDaysRunning,
  //     };
  //   });

  //   setExperiments(updatedExperiments);

  //   // If we have a selected experiment, update it too
  //   if (
  //     selectedExperiment &&
  //     selectedExperiment.status ===
  //       LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase()
  //   ) {
  //     const updated = updatedExperiments.find(
  //       (e) => e.id === selectedExperiment.id
  //     );
  //     if (updated) {
  //       setSelectedExperiment(updated);
  //     }
  //   }

  //   setIsSimulating(false);
  //   showToast(`Simulation Day ${simulationDay + 1}: Data updated`, "info");
  // };
  const simulateDataUpdate = () => {
    if (isSimulating) return;

    setIsSimulating(true);

    // Increment simulation day
    const newSimDay = simulationDay + 1;
    setSimulationDay(newSimDay);

    showLoading(`Simulating Day ${newSimDay}...`);

    setTimeout(() => {
      // Only update in-progress experiments
      const updatedExperiments = experiments.map((exp) => {
        if (
          exp.status !==
          LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase()
        ) {
          return exp;
        }

        // Increase progress
        const progressIncrement = Math.floor(Math.random() * 5) + 3; // 3-7% progress increment
        const newProgress = Math.min(100, exp.progress + progressIncrement);

        // Update days running
        const newDaysRunning = exp.daysRunning + 1;

        // Generate new data point for trend chart
        const newDataPoint = {
          date: `Sim ${newSimDay}`,
          standard: parseFloat((2.0 + Math.random() * 0.3).toFixed(1)),
          personalized: parseFloat((2.7 + Math.random() * 0.4).toFixed(1)),
        };

        // Handle different experiment IDs
        if (exp.id === "mem-001" && membershipTrends) {
          membershipTrends.push(newDataPoint);
        } else if (exp.id === "ypp-001" && yppTrends) {
          yppTrends.push(newDataPoint);
        } else if (exp.id === "eng-001" && engagementTrends) {
          engagementTrends.push(newDataPoint);
        }

        // If experiment is completed, add results
        if (newProgress >= 100) {
          // Generate random results
          const improvement = Math.floor(Math.random() * 40) - 5; // -5% to +35%
          const significance =
            improvement > 15
              ? 0.001
              : improvement > 5
              ? 0.03
              : improvement > 0
              ? 0.08
              : 0.2;
          const confidence = 100 - significance * 100;

          return {
            ...exp,
            progress: 100,
            daysRunning: newDaysRunning,
            status: LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase(),
            improvement,
            significance,
            confidence,
            impact:
              improvement > 0
                ? `~${Math.floor(improvement * 100)} additional conversions`
                : "No positive impact detected",
            knowledgeStatus:
              LIFECYCLE_STAGES.KNOWLEDGE.ANALYZING.label.toLowerCase(),
          };
        }

        // Just update progress for ongoing experiments
        return {
          ...exp,
          progress: newProgress,
          daysRunning: newDaysRunning,
        };
      });

      setExperiments(updatedExperiments);

      // If we have a selected experiment, update it too
      if (
        selectedExperiment &&
        selectedExperiment.status ===
          LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase()
      ) {
        const updated = updatedExperiments.find(
          (e) => e.id === selectedExperiment.id
        );
        if (updated) {
          setSelectedExperiment(updated);
        }
      }

      // Highlight what changed
      const updatedCount = updatedExperiments.filter(
        (e, i) => e.daysRunning !== experiments[i].daysRunning
      ).length;

      hideLoading();
      setIsSimulating(false);
      showToast(
        `Simulation Day ${newSimDay}: Updated ${updatedCount} experiments with new data`,
        "success",
        4000
      );
    }, 800);
  };

  /* ---------------------------------------------------------------------------
     PLANNING TAB FUNCTIONALITY
     --------------------------------------------------------------------------- */
  const [planningView, setPlanningView] = useState("kanban");
  const [planningSearch, setPlanningSearch] = useState("");
  const [planningGoal, setPlanningGoal] = useState("");
  const [planningGenBusy, setPlanningGenBusy] = useState(false);
  const [planItemModalOpen, setPlanItemModalOpen] = useState(false);

  const plannedCount = roadmap.filter(
    (r) => r.status === LIFECYCLE_STAGES.PLANNING.PLANNED.label.toLowerCase()
  ).length;
  const draftCount = roadmap.filter(
    (r) => r.status === LIFECYCLE_STAGES.PLANNING.DRAFT.label.toLowerCase()
  ).length;
  const backlogCount = roadmap.filter(
    (r) => r.status === LIFECYCLE_STAGES.PLANNING.BACKLOG.label.toLowerCase()
  ).length;

  const openPlanItemModal = (item) => {
    setPlanItemModalItem(item);
    setPlanItemModalOpen(true);
    addToRecent(item);
  };

  const closePlanItemModal = () => {
    setPlanItemModalItem(null);
    setPlanItemModalOpen(false);
  };

  const handleGenerateRoadmap = () => {
    if (!planningSearch || !planningGoal) {
      showToast("Please provide a context and a business goal.", "warning");
      return;
    }

    setPlanningGenBusy(true);
    showLoading("AI generating experiment idea...");

    setTimeout(() => {
      const newId = `road-AI-${Math.floor(Math.random() * 10000)}`;
      const newItem = {
        id: newId,
        name: `${planningSearch.slice(0, 30)}...`,
        category: "engagement",
        priority: "medium",
        status: LIFECYCLE_STAGES.PLANNING.BACKLOG.label.toLowerCase(),
        lifecycleStage: "planning",
        startDate: "Aug 1, 2025",
        endDate: "Aug 21, 2025",
        duration: "3 weeks",
        goal: planningGoal,
        hypothesis: `Based on ${planningSearch}, we expect to see a 20% improvement in engagement metrics.`,
        metrics: ["Conversion", "Engagement"],
        progress: 0,
        owner: "AI Assistant",
        createdDate: new Date().toLocaleDateString(),
        learningAgenda: `Understand how ${planningSearch.toLowerCase()} affects user behavior and engagement patterns.`,
        okrs: ["okr-001"],
      };

      setRoadmap((prev) => [newItem, ...prev]);
      addToRecent(newItem);

      setPlanningSearch("");
      setPlanningGoal("");
      setPlanningGenBusy(false);
      hideLoading();

      showToast("AI-generated experiment added to backlog!", "success");
    }, 1500);
  };

  const sendToWizard = (item) => {
    // Initialize wizard with data from the planning item
    const wizardData = {
      name: item.name,
      category: item.category,
      goal: item.goal,
      hypothesis: item.hypothesis,
      primaryMetric:
        item.metrics[0] === "Conversion"
          ? "conversion-rate"
          : "average-session-duration",
      successCriteria: `Achieve ≥15% improvement in ${item.metrics[0]} with statistical significance (p < 0.05)`,
      learningAgenda: item.learningAgenda || "",
      baselineRate: 2.5,
      minimumEffect: 15,
      okrs: item.okrs || [],
      control: {
        description: "Current implementation",
      },
      treatment: {
        description: "New implementation based on the hypothesis",
      },
      allocation: { Control: 50, Treatment: 50 },
      startDate: item.startDate,
      endDate: item.endDate,
      owner: item.owner,
    };

    // Start the wizard with this data
    initializeWizard(wizardData);

    // Update breadcrumbs
    updateBreadcrumbs("new-experiment", "New Experiment");

    // Close the plan item modal
    closePlanItemModal();
  };

  const movePlanningItem = (item, newStatus) => {
    showLoading("Updating experiment status...");

    setTimeout(() => {
      setRoadmap((prev) =>
        prev.map((r) =>
          r.id === item.id ? { ...r, status: newStatus.toLowerCase() } : r
        )
      );

      hideLoading();
      showToast(`Experiment "${item.name}" moved to ${newStatus}`, "success");
      closePlanItemModal();
    }, 500);
  };

  const deletePlanningItem = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      showLoading("Deleting experiment...");

      setTimeout(() => {
        setRoadmap((prev) => prev.filter((r) => r.id !== item.id));
        hideLoading();
        showToast(`Experiment "${item.name}" deleted`, "success");
        closePlanItemModal();
      }, 500);
    }
  };

  const createExperimentFromPlanning = (item) => {
    showLoading("Creating brief...");

    setTimeout(() => {
      const newBriefId = `brief-auto-${Math.floor(Math.random() * 10000)}`;
      const newBrief = {
        id: newBriefId,
        name: item.name,
        submittedBy: item.owner || "System",
        submittedDate: new Date().toLocaleDateString(),
        status: LIFECYCLE_STAGES.REVIEW.UNDER_REVIEW.label.toLowerCase(),
        lifecycleStage: "review",
        dueDate: new Date(
          new Date().setDate(new Date().getDate() + 7)
        ).toLocaleDateString(),
        feedback: [],
        businessGoal: item.goal,
        primaryMetric: item.metrics[0] || "Conversion Rate",
        targetAudience: "All users",
        hypothesis: item.hypothesis,
        successCriteria: "To be defined",
        owner: item.owner || "System",
        reviewers: [],
        learningAgenda: item.learningAgenda || "",
        okrs: item.okrs || [],
      };

      setReviews((prev) => [...prev, newBrief]);
      addToRecent(newBrief);

      hideLoading();
      showToast(`Brief created from "${item.name}"`, "success");
      closePlanItemModal();

      // Switch to reviews tab
      handleTabChange("reviews");
    }, 800);
  };

  const timelineAll = [...roadmap].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  /* ---------------------------------------------------------------------------
     REVIEWS TAB FUNCTIONALITY
     --------------------------------------------------------------------------- */
  const [reviewStatusFilter, setReviewStatusFilter] = useState("all");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const openReviewModal = (item) => {
    setReviewModalItem(item);
    setReviewModalOpen(true);
    addToRecent(item);
  };

  const closeReviewModal = () => {
    setReviewModalItem(null);
    setReviewModalOpen(false);
  };

  const handleReviewAction = (status) => {
    if (!reviewModalItem) return;

    showLoading(`Updating review status to ${status}...`);

    setTimeout(() => {
      setReviews((prev) =>
        prev.map((b) => (b.id === reviewModalItem.id ? { ...b, status } : b))
      );

      hideLoading();
      showToast(
        `Brief "${reviewModalItem.name}" status updated to ${status}`,
        "success"
      );
      closeReviewModal();
    }, 500);
  };

  const addFeedbackToReview = (feedback) => {
    if (!reviewModalItem) return;

    showLoading("Adding feedback...");

    setTimeout(() => {
      setReviews((prev) =>
        prev.map((b) =>
          b.id === reviewModalItem.id
            ? {
                ...b,
                feedback: [...(b.feedback || []), feedback],
              }
            : b
        )
      );

      hideLoading();
      showToast("Feedback added successfully", "success");
    }, 500);
  };

  const handleStartExperimentFromReview = (brief) => {
    showLoading("Creating experiment from brief...");

    setTimeout(() => {
      const newId = `autoExp-${Math.floor(Math.random() * 10000)}`;
      const newExp = {
        id: newId,
        name: `${brief.name}`,
        status: LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase(),
        lifecycleStage: "execution",
        category: brief.category || "engagement",
        startDate: new Date().toLocaleDateString(),
        endDate: new Date(
          new Date().setDate(new Date().getDate() + 30)
        ).toLocaleDateString(),
        daysRunning: 0,
        daysTotal: 31,
        primaryMetric: brief.primaryMetric || "Conversion Rate",
        improvement: null,
        significance: null,
        confidence: null,
        impact: "Pending",
        goal: brief.businessGoal || "From brief data",
        hypothesis: brief.hypothesis || "From brief data",
        targetAudience: [brief.targetAudience || "From brief data"],
        successCriteria: brief.successCriteria || "TBD 95% significance",
        controlImage: "/api/placeholder/500/300?text=Standard+Version",
        treatmentImage: "/api/placeholder/500/300?text=New+Version",
        progress: 0,
        okrs: brief.okrs || [],
        learningAgenda: brief.learningAgenda || "",
        owner: brief.owner,
        team: brief.reviewers || [],
        knowledgeStatus: null,
      };

      // Update the experiment list with the new experiment
      setExperiments((prev) => [...prev, newExp]);

      // Update the brief status to indicate it's now an experiment
      setReviews((prev) =>
        prev.map((b) =>
          b.id === brief.id
            ? {
                ...b,
                status: LIFECYCLE_STAGES.REVIEW.APPROVED.label.toLowerCase(),
                experimentId: newId,
              }
            : b
        )
      );

      addToRecent(newExp);

      // Update breadcrumbs and switch to experiments tab
      updateBreadcrumbs("experiments", "Current Experiments");
      setActiveTab("experiments");

      hideLoading();
      showToast(`Experiment "${newExp.name}" started!`, "success");
    }, 800);
  };

  /* ---------------------------------------------------------------------------
     EXPERIMENTS TAB FUNCTIONALITY
     --------------------------------------------------------------------------- */
  // Experiments Tab Functionality (continued)
  const [expFilters, setExpFilters] = useState([
    {
      id: "search",
      label: "Search",
      type: "text",
      value: "",
      placeholder: "Search experiments...",
    },
    {
      id: "status",
      label: "Status",
      type: "select",
      value: "all",
      options: [
        { value: "all", label: "All Status" },
        {
          value: LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase(),
          label: "Completed",
        },
        {
          value: LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase(),
          label: "In Progress",
        },
        {
          value: LIFECYCLE_STAGES.EXECUTION.PAUSED.label.toLowerCase(),
          label: "Paused",
        },
      ],
    },
    {
      id: "category",
      label: "Category",
      type: "select",
      value: "all",
      options: [
        { value: "all", label: "All Categories" },
        { value: "monetization", label: "Monetization" },
        { value: "engagement", label: "Engagement" },
        { value: "satisfaction", label: "Satisfaction" },
      ],
    },
    {
      id: "dateRange",
      label: "Date Range",
      type: "select",
      value: "all",
      options: [
        { value: "all", label: "All Time" },
        { value: "thisQuarter", label: "This Quarter" },
        { value: "thisYear", label: "This Year" },
        { value: "custom", label: "Custom Range" },
      ],
    },
  ]);

  const [customRange, setCustomRange] = useState({ start: "", end: "" });
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showAnalysisLoading, setShowAnalysisLoading] = useState(false);
  const [experimentReport, setExperimentReport] = useState(null);

  // Update a single filter
  const updateFilter = (id, value) => {
    setExpFilters((prev) =>
      prev.map((filter) => (filter.id === id ? { ...filter, value } : filter))
    );
  };

  // Get filter values easily
  const getFilterValue = (id) => {
    const filter = expFilters.find((f) => f.id === id);
    return filter ? filter.value : null;
  };

  // Apply filters to experiments
  const filteredExperiments = experiments.filter((exp) => {
    const searchValue = getFilterValue("search").toLowerCase();
    const statusValue = getFilterValue("status");
    const categoryValue = getFilterValue("category");
    const dateRangeValue = getFilterValue("dateRange");

    // Search filter
    const matchSearch =
      !searchValue ||
      exp.name.toLowerCase().includes(searchValue) ||
      exp.hypothesis.toLowerCase().includes(searchValue) ||
      (exp.owner && exp.owner.toLowerCase().includes(searchValue));

    // Status filter
    const matchStatus = statusValue === "all" || exp.status === statusValue;

    // Category filter
    const matchCategory =
      categoryValue === "all" || exp.category === categoryValue;

    // Date range filter
    let matchDate = true;
    if (dateRangeValue !== "all") {
      const startDate = new Date(exp.startDate);
      const now = new Date();

      if (dateRangeValue === "thisQuarter") {
        const quarterStart = new Date(
          now.getFullYear(),
          Math.floor(now.getMonth() / 3) * 3,
          1
        );
        matchDate = startDate >= quarterStart;
      } else if (dateRangeValue === "thisYear") {
        const yearStart = new Date(now.getFullYear(), 0, 1);
        matchDate = startDate >= yearStart;
      } else if (dateRangeValue === "custom") {
        if (customRange.start && customRange.end) {
          const rangeStart = new Date(customRange.start);
          const rangeEnd = new Date(customRange.end);
          matchDate = startDate >= rangeStart && startDate <= rangeEnd;
        }
      }
    }

    return matchSearch && matchStatus && matchCategory && matchDate;
  });

  const selectExperiment = (exp) => {
    setShowAnalysisLoading(true);
    setSelectedExperiment(exp);

    // Simulate loading analysis data
    setTimeout(() => {
      setShowAnalysis(true);
      setShowAnalysisLoading(false);

      // Update breadcrumbs for deep navigation
      updateBreadcrumbs(`experiments/${exp.id}`, exp.name);
      addToRecent(exp);
    }, 500);
  };

  const backToExpList = () => {
    setSelectedExperiment(null);
    setShowAnalysis(false);

    // Update breadcrumbs
    updateBreadcrumbs("experiments", "Current Experiments");
  };

  const completeExperiment = (exp) => {
    showLoading("Completing experiment...");

    setTimeout(() => {
      // Generate some mock results
      const improvement = Math.floor(Math.random() * 30) - 5; // -5% to +25%
      const significance =
        improvement > 0
          ? Math.random() * 0.04 + 0.001 // 0.001 to 0.041 for positive improvement
          : Math.random() * 0.1 + 0.03; // 0.03 to 0.13 for negative improvement
      const confidence = 100 - significance * 100;

      // Update the experiment with results
      setExperiments((prev) =>
        prev.map((e) =>
          e.id === exp.id
            ? {
                ...e,
                status:
                  LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase(),
                improvement,
                significance,
                confidence,
                progress: 100,
                daysRunning: e.daysTotal,
                impact:
                  improvement > 0
                    ? `~${Math.floor(improvement * 150)} additional conversions`
                    : "No positive impact detected",
                knowledgeStatus:
                  LIFECYCLE_STAGES.KNOWLEDGE.ANALYZING.label.toLowerCase(),
              }
            : e
        )
      );

      hideLoading();
      showToast(`Experiment "${exp.name}" marked as completed`, "success");

      // Update the selected experiment
      const updatedExp = experiments.find((e) => e.id === exp.id);
      if (updatedExp) {
        setSelectedExperiment(updatedExp);
      }

      // Prompt to add to knowledge hub
      setTimeout(() => {
        showToast(
          "Don't forget to document your learnings in the Knowledge Hub!",
          "info",
          5000
        );
      }, 1000);
    }, 1000);
  };

  const pauseExperiment = (exp) => {
    showLoading("Updating experiment status...");

    setTimeout(() => {
      setExperiments((prev) =>
        prev.map((e) =>
          e.id === exp.id
            ? {
                ...e,
                status: LIFECYCLE_STAGES.EXECUTION.PAUSED.label.toLowerCase(),
              }
            : e
        )
      );

      hideLoading();
      showToast(`Experiment "${exp.name}" paused`, "info");

      // Update the selected experiment
      const updatedExp = experiments.find((e) => e.id === exp.id);
      if (updatedExp) {
        setSelectedExperiment(updatedExp);
      }
    }, 500);
  };

  const resumeExperiment = (exp) => {
    showLoading("Updating experiment status...");

    setTimeout(() => {
      setExperiments((prev) =>
        prev.map((e) =>
          e.id === exp.id
            ? {
                ...e,
                status:
                  LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase(),
              }
            : e
        )
      );

      hideLoading();
      showToast(`Experiment "${exp.name}" resumed`, "success");

      // Update the selected experiment
      const updatedExp = experiments.find((e) => e.id === exp.id);
      if (updatedExp) {
        setSelectedExperiment(updatedExp);
      }
    }, 500);
  };

  const generateExperimentReport = (exp) => {
    showLoading("Generating experiment report...");

    // Generate the report content
    setTimeout(() => {
      // Create the report content - simplified for the demo version
      const report = `EXPERIMENT REPORT: ${exp.name}
=============================

Date: ${new Date().toLocaleDateString()}
Status: ${exp.status}
Period: ${exp.startDate} - ${exp.endDate}

OVERVIEW
========
Goal: ${exp.goal}
Hypothesis: ${exp.hypothesis}
Primary Metric: ${exp.primaryMetric}
Success Criteria: ${exp.successCriteria}

RESULTS
=======
Improvement: ${exp.improvement !== null ? `${exp.improvement}%` : "N/A"}
Statistical Significance: ${
        exp.significance !== null ? `p=${exp.significance}` : "N/A"
      }
Confidence: ${exp.confidence !== null ? `${exp.confidence}%` : "N/A"}

CONCLUSION
==========
${
  exp.improvement > 0 && exp.significance < 0.05
    ? `The experiment was successful, showing a statistically significant improvement of ${exp.improvement}%.`
    : exp.improvement <= 0
    ? `The experiment did not show an improvement in the primary metric.`
    : `The experiment showed a positive trend but did not reach statistical significance.`
}

RECOMMENDATIONS
==============
${
  exp.improvement > 0 && exp.significance < 0.05
    ? `- Implement the winning variant\n- Consider follow-up experiments to further optimize\n- Document learnings in the Knowledge Hub`
    : `- Review experiment design\n- Consider running for a longer duration\n- Analyze segments for potential insights`
}

Generated by E2E Experiment Platform`;

      setExperimentReport(report);

      hideLoading();
      setShowReportModal(true);
    }, 800);
  };

  const addExperimentToKnowledge = (exp) => {
    showLoading("Adding to Knowledge Hub...");

    setTimeout(() => {
      const newKnowledgeId = `knowledge-${Math.floor(Math.random() * 10000)}`;
      const newKnowledge = {
        id: newKnowledgeId,
        name: exp.name,
        category: exp.category,
        date: new Date().toLocaleDateString(),
        improvement: exp.improvement,
        significance: exp.significance,
        confidence: exp.confidence,
        status: LIFECYCLE_STAGES.KNOWLEDGE.DOCUMENTED.label.toLowerCase(),
        tags: [
          exp.category,
          exp.primaryMetric.toLowerCase().replace(/\s+/g, "-"),
        ],
        insights: [
          `${exp.improvement > 0 ? "Positive" : "Negative"} impact of ${
            exp.improvement
          }% on ${exp.primaryMetric}`,
          `Statistical significance: p=${exp.significance.toFixed(4)}`,
          exp.improvement > 0
            ? "Treatment outperformed control group consistently"
            : "Control group performed better than treatment",
        ],
        relatedExperiments: [exp.id],
        plainLanguageResult:
          exp.improvement > 0
            ? `The changes we tested resulted in a ${
                exp.improvement
              }% improvement in ${exp.primaryMetric}. This result is ${
                exp.significance < 0.05
                  ? "statistically significant"
                  : "not statistically significant"
              }.`
            : `The changes we tested did not improve ${
                exp.primaryMetric
              }. In fact, we saw a ${Math.abs(
                exp.improvement
              )}% decrease, which is ${
                exp.significance < 0.05
                  ? "statistically significant"
                  : "not statistically significant"
              }.`,
        businessImpact:
          exp.improvement > 15
            ? "High"
            : exp.improvement > 5
            ? "Medium"
            : "Low",
        implementationEffort: "Medium",
        owner: exp.owner,
        aiRecommendations: [
          exp.improvement > 0
            ? "Implement winning variant in production"
            : "Revert to control experience",
          "Apply learnings to similar product areas",
          "Follow up with more targeted experiments",
        ],
      };

      // Add the new knowledge item
      setKnowledge((prev) => [...prev, newKnowledge]);

      // Update the experiment to indicate it's in the knowledge hub
      setExperiments((prev) =>
        prev.map((e) =>
          e.id === exp.id
            ? {
                ...e,
                knowledgeStatus:
                  LIFECYCLE_STAGES.KNOWLEDGE.DOCUMENTED.label.toLowerCase(),
                knowledgeId: newKnowledgeId,
              }
            : e
        )
      );

      hideLoading();
      showToast("Added to Knowledge Hub!", "success");

      // Switch to knowledge tab
      handleTabChange("knowledge");
    }, 1000);
  };

  const generateAIAnalysis = (exp) => {
    showLoading("Generating AI analysis...");

    setTimeout(() => {
      // Open AI prompt modal with the context
      openAIPromptModal("analysis", exp);
      hideLoading();
    }, 800);
  };

  /* ---------------------------------------------------------------------------
     KNOWLEDGE HUB FUNCTIONALITY
     --------------------------------------------------------------------------- */
  const [knowledgeSearch, setKnowledgeSearch] = useState("");
  const [knowledgeCategory, setKnowledgeCategory] = useState("all");
  const [knowledgeView, setKnowledgeView] = useState("list");
  const [insightsItem, setInsightsItem] = useState(null);

  const openKnowledgeDetails = (item) => {
    setSelectedKnowledge(item);
    setShowKnowledgeModal(true);
    addToRecent(item);
  };

  const closeKnowledgeDetails = () => {
    setSelectedKnowledge(null);
    setShowKnowledgeModal(false);
  };

  const openApplyInsights = (item) => {
    setInsightsItem(item);
    setShowApplyInsightsModal(true);
  };

  const closeApplyInsights = () => {
    setInsightsItem(null);
    setShowApplyInsightsModal(false);
  };

  const applyInsightsToWizard = () => {
    if (!insightsItem) return;

    // Initialize wizard data with insights
    const wizardData = {
      name: `Follow-up: ${insightsItem.name}`,
      category: insightsItem.category,
      goal: `Build on insights from "${insightsItem.name}"`,
      hypothesis: `Based on prior insights: ${insightsItem.plainLanguageResult} We expect a similar or better result by...`,
      primaryMetric:
        insightsItem.relatedExperiments.length > 0
          ? experiments.find((e) => e.id === insightsItem.relatedExperiments[0])
              ?.primaryMetric || ""
          : "",
      successCriteria: `Improve on previous ${insightsItem.improvement}% lift with statistical significance`,
      baselineRate: 3.0,
      minimumEffect: 5.0,
      learningAgenda: `Further explore the impact and mechanisms behind ${insightsItem.plainLanguageResult}`,
      control: {
        description: "Current implementation based on previous learnings",
      },
      treatment: {
        description: "Further optimized version building on previous insights",
      },
      allocation: { Control: 50, Treatment: 50 },
      knowledgeReference: insightsItem.id,
    };

    // Start the wizard with these values
    initializeWizard(wizardData);

    setShowApplyInsightsModal(false);
    setShowWizard(true);

    // Update breadcrumbs
    updateBreadcrumbs("new-experiment", "New Experiment");
  };

  const markKnowledgeAsApplied = (item) => {
    showLoading("Updating status...");

    setTimeout(() => {
      setKnowledge((prev) =>
        prev.map((k) =>
          k.id === item.id
            ? {
                ...k,
                status: LIFECYCLE_STAGES.KNOWLEDGE.APPLIED.label.toLowerCase(),
                appliedDate: new Date().toLocaleDateString(),
              }
            : k
        )
      );

      hideLoading();
      showToast(`"${item.name}" marked as applied`, "success");

      if (selectedKnowledge && selectedKnowledge.id === item.id) {
        setSelectedKnowledge({
          ...selectedKnowledge,
          status: LIFECYCLE_STAGES.KNOWLEDGE.APPLIED.label.toLowerCase(),
          appliedDate: new Date().toLocaleDateString(),
        });
      }
    }, 500);
  };

  const generateKnowledgeReport = () => {
    showLoading("Generating knowledge report...");

    setTimeout(() => {
      // In a real app, this would generate a comprehensive report
      showToast("Knowledge report downloaded", "success");
      hideLoading();
    }, 1000);
  };

  /* ---------------------------------------------------------------------------
     LEARNING PATH FUNCTIONALITY
     --------------------------------------------------------------------------- */
  // Enhanced Learning Path Generation
  const generateLearningPathPlan = () => {
    showLoading("Generating learning path...");

    setTimeout(() => {
      const plan = okrData.map((obj) => {
        const relatedExps = experiments.filter((exp) =>
          (exp.okrs || []).includes(obj.id)
        );

        if (relatedExps.length === 0) {
          return {
            objective: obj.title,
            nextExperiment: "N/A",
            rationale: `No experiments are addressing this objective yet.`,
            recommendation: `Consider designing an experiment aligned with "${obj.description}".`,
          };
        }

        relatedExps.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        const lastExp = relatedExps[relatedExps.length - 1];

        return {
          objective: obj.title,
          nextExperiment: lastExp.name,
          rationale: `Based on the current experiment "${lastExp.name}", there is an opportunity to build on its results.`,
          recommendation: `Review the metrics of "${lastExp.name}" and consider an iteration with a refined hypothesis.`,
        };
      });

      hideLoading();

      // Show the learning path modal with the generated plan
      setLearningPathData(plan);
      setShowLearningPathModal(true);
    }, 800);
  };

  const [learningPathData, setLearningPathData] = useState([]);

  /* ---------------------------------------------------------------------------
     OKR FUNCTIONALITY
     --------------------------------------------------------------------------- */
  const [newOKRTitle, setNewOKRTitle] = useState("");
  const [newOKRDesc, setNewOKRDesc] = useState("");
  const [newKeyResult, setNewKeyResult] = useState("");
  const [newKeyResults, setNewKeyResults] = useState([]);

  const addKeyResult = () => {
    if (newKeyResult.trim()) {
      setNewKeyResults((prev) => [...prev, newKeyResult]);
      setNewKeyResult("");
    }
  };

  const removeKeyResult = (index) => {
    setNewKeyResults((prev) => prev.filter((_, i) => i !== index));
  };

  const addOKR = () => {
    if (!newOKRTitle) {
      showToast("Please enter an OKR title.", "warning");
      return;
    }

    showLoading("Adding new OKR...");

    setTimeout(() => {
      const newOKR = {
        id: `okr-${Math.floor(Math.random() * 10000)}`,
        title: newOKRTitle,
        description: newOKRDesc,
        key_results:
          newKeyResults.length > 0 ? newKeyResults : ["No key results defined"],
        progress: 0,
        owner: "You",
        quarter: "Q2 2025",
        aiRecommendations: [
          "Create experiments targeting specific key results",
          "Link experiment metrics directly to OKR measurement",
          "Focus on experiments with highest impact potential",
        ],
      };

      setOkrData((prev) => [...prev, newOKR]);

      // Reset form
      setNewOKRTitle("");
      setNewOKRDesc("");
      setNewKeyResults([]);
      setShowOKRModal(false);

      hideLoading();
      showToast("New OKR added successfully", "success");
    }, 500);
  };

  /* ---------------------------------------------------------------------------
     WIZARD FUNCTIONALITY
     --------------------------------------------------------------------------- */
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardAI, setWizardAI] = useState(false);
  const [wizardData, setWizardData] = useState({
    name: "",
    category: "",
    startDate: "",
    endDate: "",
    goal: "",
    primaryMetric: "",
    targetAudience: "",
    hypothesis: "",
    successCriteria: "",
    learningAgenda: "",
    controlDetails: "",
    treatmentDetails: "",
    template: "standard",
    control: {},
    treatment: {},
    allocation: { Control: 50, Treatment: 50 },
    owner: "",
    team: [],
  });

  const initializeWizard = (initialData = {}) => {
    setWizardData({
      name: "",
      category: "",
      startDate: "",
      endDate: "",
      goal: "",
      primaryMetric: "",
      targetAudience: "",
      hypothesis: "",
      successCriteria: "",
      learningAgenda: "",
      controlDetails: "",
      treatmentDetails: "",
      template: "standard",
      control: {},
      treatment: {},
      allocation: { Control: 50, Treatment: 50 },
      owner: "",
      team: [],
      ...initialData,
    });

    setWizardStep(1);
    setShowWizard(true);
  };

  const generateWizardText = (field) => {
    setWizardAI(true);
    showLoading("AI generating suggestions...");

    setTimeout(() => {
      if (field === "hypothesis") {
        openAIPromptModal("hypothesis", wizardData);
      } else if (field === "successCriteria") {
        openAIPromptModal("successCriteria", {
          ...wizardData,
          primaryMetric:
            metricsLibrary.find((m) => m.id === wizardData.primaryMetric)
              ?.name || wizardData.primaryMetric,
        });
      } else if (field === "learningAgenda") {
        openAIPromptModal("learningAgenda", wizardData);
      }

      setWizardAI(false);
      hideLoading();
    }, 500);
  };

  const handleWizardFinalSubmit = () => {
    showLoading("Creating new brief...");

    setTimeout(() => {
      const newBriefId = `brief-auto-${Math.floor(Math.random() * 10000)}`;
      const newBrief = {
        id: newBriefId,
        name: wizardData.name || "Untitled Brief",
        submittedBy: "You",
        submittedDate: new Date().toLocaleDateString(),
        status: LIFECYCLE_STAGES.REVIEW.UNDER_REVIEW.label.toLowerCase(),
        lifecycleStage: "review",
        dueDate: new Date(
          new Date().setDate(new Date().getDate() + 7)
        ).toLocaleDateString(),
        feedback: [
          {
            type: "statistical",
            status: "warning",
            message: "Awaiting final check",
          },
        ],
        businessGoal: wizardData.goal,
        primaryMetric: wizardData.primaryMetric,
        targetAudience: Array.isArray(wizardData.audiences)
          ? audienceSegments
              .filter((segment) => wizardData.audiences.includes(segment.id))
              .map((segment) => segment.name)
              .join(", ")
          : wizardData.targetAudience,
        hypothesis: wizardData.hypothesis,
        successCriteria: wizardData.successCriteria,
        learningAgenda: wizardData.learningAgenda,
        owner: wizardData.owner || "You",
        reviewers: wizardData.team || ["Sarah Chen", "Alex Johnson"],
        template: wizardData.template,
        control: wizardData.control,
        treatment: wizardData.treatment,
        allocation: wizardData.allocation,
        startDate: wizardData.startDate,
        endDate: wizardData.endDate,
        category: wizardData.category,
        okrs: wizardData.okrs || [],
      };

      setReviews((prev) => [...prev, newBrief]);
      addToRecent(newBrief);

      // Update breadcrumbs and switch to reviews tab
      updateBreadcrumbs("reviews", "Brief Reviews");
      setActiveTab("reviews");

      hideLoading();
      showToast("New brief created (Under Review)!", "success");
      setShowWizard(false);
      setWizardStep(1);

      // Reset wizard data
      setWizardData({
        name: "",
        category: "",
        startDate: "",
        endDate: "",
        goal: "",
        primaryMetric: "",
        targetAudience: "",
        hypothesis: "",
        successCriteria: "",
        learningAgenda: "",
        controlDetails: "",
        treatmentDetails: "",
        template: "standard",
        control: {},
        treatment: {},
        allocation: { Control: 50, Treatment: 50 },
        owner: "",
        team: [],
      });
    }, 1000);
  };

  /* ---------------------------------------------------------------------------
     RENDER FUNCTIONS
     --------------------------------------------------------------------------- */
  // Render Header and Navigation
  const renderHeader = () => (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-gray-800 text-xl">
              E2E Experiment Platform
            </h1>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              v2.0
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowOKRModal(true)}
              className="text-gray-600 hover:text-gray-800"
              title="Manage OKRs"
            >
              <span className="mr-1">🎯</span>
              <span className="hidden md:inline">OKRs</span>
            </button>

            <button
              onClick={() => {
                updateBreadcrumbs("new-experiment", "New Brief");
                initializeWizard();
              }}
              className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 text-sm flex items-center"
            >
              <span className="mr-1">+</span>
              <span>New Brief</span>
            </button>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mt-3 flex items-center">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && <span className="mx-2">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-700 font-medium">{crumb.label}</span>
              ) : (
                <button
                  className="hover:text-blue-600"
                  onClick={() => {
                    if (index === 0) {
                      updateBreadcrumbs("", "Dashboard");
                    } else {
                      handleTabChange(crumb.path);
                    }
                  }}
                >
                  {crumb.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );

  const renderNavigation = () => (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <nav className="flex">
            {["planning", "reviews", "experiments", "knowledge"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-3 px-4 text-sm relative ${
                  activeTab === tab
                    ? "text-blue-600 font-medium"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                )}

                {/* Count badges */}
                {tab === "planning" &&
                  plannedCount + draftCount + backlogCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {plannedCount + draftCount + backlogCount}
                    </span>
                  )}
                {tab === "reviews" && reviews.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {reviews.length}
                  </span>
                )}
                {tab === "experiments" && experiments.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {experiments.length}
                  </span>
                )}
                {tab === "knowledge" && knowledge.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {knowledge.length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <RoleSelector
            selectedRole={selectedRole}
            onRoleChange={(role) => setSelectedRole(role)}
          />
        </div>
      </div>
    </div>
  );

  // Render Recent Items Component (continued)
  const renderRecentItems = () => {
    if (recentItems.length === 0) return null;

    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Recently Viewed
        </h3>
        <div className="space-y-2">
          {recentItems.map((item) => {
            const typeIcon =
              item.type === "planning"
                ? "📝"
                : item.type === "review"
                ? "✅"
                : item.type === "experiment" || item.type === "execution"
                ? "🧪"
                : item.type === "knowledge"
                ? "📚"
                : "🔍";

            return (
              <div
                key={item.id}
                className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => {
                  // Navigate to the item based on its type
                  switch (item.type) {
                    case "planning":
                      handleTabChange("planning");
                      setTimeout(() => {
                        const planItem = roadmap.find((r) => r.id === item.id);
                        if (planItem) openPlanItemModal(planItem);
                      }, 100);
                      break;
                    case "review":
                      handleTabChange("reviews");
                      setTimeout(() => {
                        const reviewItem = reviews.find(
                          (r) => r.id === item.id
                        );
                        if (reviewItem) openReviewModal(reviewItem);
                      }, 100);
                      break;
                    case "experiment":
                    case "execution":
                      handleTabChange("experiments");
                      setTimeout(() => {
                        const experimentItem = experiments.find(
                          (e) => e.id === item.id
                        );
                        if (experimentItem) selectExperiment(experimentItem);
                      }, 100);
                      break;
                    case "knowledge":
                      handleTabChange("knowledge");
                      setTimeout(() => {
                        const knowledgeItem = knowledge.find(
                          (k) => k.id === item.id
                        );
                        if (knowledgeItem) openKnowledgeDetails(knowledgeItem);
                      }, 100);
                      break;
                    default:
                      break;
                  }
                }}
              >
                <span className="mr-2">{typeIcon}</span>
                <div>
                  <p className="text-sm text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Experiments Tab with Analysis view
  const renderExperimentsTab = () => (
    <div className="container mx-auto px-6 py-8">
      {/* Context Banner */}
      <ContextBanner section="experiments" />

      {showAnalysis && selectedExperiment
        ? renderSingleExperimentAnalysis(selectedExperiment)
        : renderExperimentsList()}
    </div>
  );

  const renderExperimentsList = () => (
    <div className="flex flex-col md:flex-row md:space-x-6">
      <div className="md:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Current Experiments
          </h1>
          {/* <button
            onClick={simulateDataUpdate}
            className="px-3 py-2 bg-green-500 text-white rounded flex items-center text-sm"
            disabled={isSimulating}
          >
            <span className="mr-1">📊</span>
            Simulate Day +1
          </button> */}
          <button
            onClick={simulateDataUpdate}
            className={`px-3 py-2 ${
              isSimulating ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white rounded flex items-center text-sm`}
            disabled={isSimulating}
          >
            {isSimulating ? (
              <>
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                Simulating...
              </>
            ) : (
              <>
                <span className="mr-1">📊</span>
                Simulate Day +1
              </>
            )}
          </button>
        </div>

        {/* Filters */}
        <FilterControls filters={expFilters} onChange={updateFilter} />

        {getFilterValue("dateRange") === "custom" && (
          <div className="flex space-x-3 mb-6 p-4 bg-white border rounded-lg -mt-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="border rounded p-2 text-sm"
                value={customRange.start}
                onChange={(e) =>
                  setCustomRange((prev) => ({ ...prev, start: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="border rounded p-2 text-sm"
                value={customRange.end}
                onChange={(e) =>
                  setCustomRange((prev) => ({ ...prev, end: e.target.value }))
                }
              />
            </div>
          </div>
        )}

        {/* Experiments Grid */}
        {filteredExperiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExperiments.map((exp) => (
              <Card
                key={exp.id}
                onClick={() => selectExperiment(exp)}
                className="hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-800">
                    {exp.name}
                  </h3>
                  <StatusBadge status={exp.status} lifecycleStage="execution" />
                </div>

                <div className="text-sm text-gray-600 mt-1 flex items-center">
                  <span>
                    {exp.startDate} - {exp.endDate}
                  </span>
                  <span className="mx-2">•</span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      exp.category === "monetization"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {exp.category}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Primary Metric: {exp.primaryMetric}
                  </h4>
                  {exp.status ===
                    LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() &&
                    exp.improvement != null && (
                      <div className="mt-1 flex items-center">
                        <span
                          className={`font-medium ${
                            exp.improvement >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {exp.improvement >= 0 ? "+" : ""}
                          {exp.improvement}%
                        </span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-sm text-gray-600">
                          p={exp.significance} (
                          {exp.significance < 0.05
                            ? "Significant"
                            : "Not significant"}
                          )
                        </span>
                      </div>
                    )}
                </div>

                <TimelineViz
                  startDate={exp.startDate}
                  endDate={exp.endDate}
                  daysRunning={exp.daysRunning}
                  daysTotal={exp.daysTotal}
                  progress={exp.progress}
                />

                <LifecycleIndicator currentStage="execution" />

                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                  <span>Owner: {exp.owner}</span>
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectExperiment(exp);
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-600">
              No experiments match your filter criteria.
            </p>
            <button
              onClick={() =>
                setExpFilters(
                  expFilters.map((f) => ({
                    ...f,
                    value:
                      f.id === "search"
                        ? ""
                        : f.id === "status" ||
                          f.id === "category" ||
                          f.id === "dateRange"
                        ? "all"
                        : f.value,
                  }))
                )
              }
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="md:w-1/4 mt-6 md:mt-0">
        {/* Recent Items */}
        {renderRecentItems()}

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Experiment Stats
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <StatCard
              title="Completed"
              value={
                experiments.filter(
                  (e) =>
                    e.status ===
                    LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase()
                ).length
              }
              color="green"
            />
            <StatCard
              title="In Progress"
              value={
                experiments.filter(
                  (e) =>
                    e.status ===
                    LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase()
                ).length
              }
              color="blue"
            />
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm text-purple-800">Average Improvement</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {experiments
                  .filter(
                    (e) =>
                      e.status ===
                        LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() &&
                      e.improvement
                  )
                  .reduce((sum, e) => sum + e.improvement, 0) /
                  Math.max(
                    1,
                    experiments.filter(
                      (e) =>
                        e.status ===
                          LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() &&
                        e.improvement
                    ).length
                  )}
                %
              </p>
            </div>
          </div>
        </div>

        {/* Related OKRs */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Related OKRs
          </h3>
          <div className="space-y-3">
            {okrData.map((okr) => {
              const relatedExps = experiments.filter((exp) =>
                (exp.okrs || []).includes(okr.id)
              );
              return (
                <div key={okr.id} className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800">
                    {okr.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {okr.description}
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{okr.progress}%</span>
                    </div>
                    <ProgressBar progress={okr.progress} color="amber" />
                  </div>
                  {relatedExps.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        {relatedExps.length} related experiment
                        {relatedExps.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => initializeWizard()}
              className="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded text-sm text-left hover:bg-blue-100 flex items-center"
            >
              <span className="mr-2">+</span>
              Create New Experiment
            </button>
            <button
              onClick={() => setShowPowerModal(true)}
              className="w-full px-3 py-2 bg-purple-50 text-purple-700 rounded text-sm text-left hover:bg-purple-100 flex items-center"
            >
              <span className="mr-2">📊</span>
              Power Analyzer
            </button>
            <button
              onClick={() => generateLearningPathPlan()}
              className="w-full px-3 py-2 bg-green-50 text-green-700 rounded text-sm text-left hover:bg-green-100 flex items-center"
            >
              <span className="mr-2">🧭</span>
              Generate Learning Path
            </button>
            <button
              onClick={() => setShowAdvancedSearchModal(true)}
              className="w-full px-3 py-2 bg-gray-50 text-gray-700 rounded text-sm text-left hover:bg-gray-100 flex items-center"
            >
              <span className="mr-2">🔍</span>
              Advanced Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSingleExperimentAnalysis = (exp) => {
    const data = getTrendData(exp);

    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center mb-4">
          <button
            onClick={backToExpList}
            className="mr-4 px-3 py-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 flex items-center"
          >
            <span className="mr-1">←</span>
            Back to experiments
          </button>
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">{exp.name}</h1>
              <StatusBadge
                status={exp.status}
                lifecycleStage="execution"
                className="ml-3"
              />
            </div>
            <p className="text-sm text-gray-500">
              {exp.owner ? `Owned by ${exp.owner}` : "Unassigned"} • Created{" "}
              {new Date(exp.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        {/* Progress and timeline section */}
        <Card>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800">Experiment Timeline</h3>
              <p className="text-sm text-gray-600">
                {exp.startDate} - {exp.endDate}
              </p>
            </div>
            {exp.status ===
              LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase() && (
              <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm">
                Running for {exp.daysRunning} days
              </div>
            )}
            {exp.status ===
              LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() && (
              <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded text-sm">
                Completed after {exp.daysRunning} days
              </div>
            )}
            {exp.status ===
              LIFECYCLE_STAGES.EXECUTION.PAUSED.label.toLowerCase() && (
              <div className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded text-sm">
                Currently paused
              </div>
            )}
          </div>

          <TimelineViz
            startDate={exp.startDate}
            endDate={exp.endDate}
            daysRunning={exp.daysRunning}
            daysTotal={exp.daysTotal}
            progress={exp.progress}
          />

          <div className="mt-4">
            <LifecycleIndicator currentStage="execution" />
          </div>
        </Card>
        {/* Key metrics and information section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-medium text-gray-800 mb-2">
              Experiment Design
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="text-gray-600 font-medium">Goal</h4>
                <p className="text-gray-800">{exp.goal}</p>
              </div>
              <div>
                <h4 className="text-gray-600 font-medium">Hypothesis</h4>
                <p className="text-gray-800">{exp.hypothesis}</p>
              </div>
              <div>
                <h4 className="text-gray-600 font-medium">Primary Metric</h4>
                <p className="text-gray-800">{exp.primaryMetric}</p>
              </div>
              <div>
                <h4 className="text-gray-600 font-medium">Success Criteria</h4>
                <p className="text-gray-800">{exp.successCriteria}</p>
              </div>
              <div>
                <h4 className="text-gray-600 font-medium">Learning Agenda</h4>
                <p className="text-gray-800">
                  {exp.learningAgenda || "No learning agenda defined"}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-medium text-gray-800 mb-2">Target Audience</h3>
            {Array.isArray(exp.targetAudience) ? (
              <ul className="space-y-1 text-sm">
                {exp.targetAudience.map((audience, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0" />
                    <span>{audience}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">{exp.targetAudience}</p>
            )}

            {exp.team && exp.team.length > 0 && (
              <div className="mt-4">
                <h4 className="text-gray-600 font-medium text-sm">
                  Experiment Team
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.team.map((member, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {exp.okrs && exp.okrs.length > 0 && (
              <div className="mt-4">
                <h4 className="text-gray-600 font-medium text-sm">
                  Strategic OKRs
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.okrs.map((okrId) => {
                    const okr = okrData.find((o) => o.id === okrId);
                    return okr ? (
                      <span
                        key={okrId}
                        className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs flex items-center"
                      >
                        <span className="mr-1">🎯</span> {okr.title}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </Card>
        </div>
        {/* Results section - only shown for completed experiments */}
        {/* {exp.status ===
          LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() && (
          <Card
            className={
              exp.improvement > 0
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-800 mb-2">Results</h3>
              {exp.improvement != null && (
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    exp.improvement > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {exp.improvement > 0 ? "+" : ""}
                  {exp.improvement}% Impact
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-white rounded shadow-sm">
                <h4 className="text-xs font-medium text-gray-600">
                  Improvement
                </h4>
                <p
                  className={`text-2xl font-bold ${
                    exp.improvement > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {exp.improvement > 0 ? "+" : ""}
                  {exp.improvement}%
                </p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <h4 className="text-xs font-medium text-gray-600">
                  Significance
                </h4>
                <p className="text-2xl font-bold text-gray-800">
                  p={exp.significance}
                </p>
                <p className="text-xs text-gray-500">
                  {exp.significance < 0.05
                    ? "Statistically significant"
                    : "Not significant"}
                </p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <h4 className="text-xs font-medium text-gray-600">
                  Confidence
                </h4>
                <p className="text-2xl font-bold text-gray-800">
                  {exp.confidence}%
                </p>
              </div>
            </div>

            <StatResultExplainer
              improvement={exp.improvement}
              significance={exp.significance || 0}
              confidence={exp.confidence || 0}
            />

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Business Impact
              </h4>
              <p className="text-sm text-gray-800">{exp.impact}</p>
            </div>
          </Card>
        )} */}
        {exp.status ===
          LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() && (
          <Card
            className={
              exp.improvement > 0
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-800 mb-2">Results</h3>
              {exp.improvement != null && (
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    exp.improvement > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {exp.improvement > 0 ? "+" : ""}
                  {exp.improvement}% Impact
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-white rounded shadow-sm">
                <h4 className="text-xs font-medium text-gray-600">
                  Improvement
                </h4>
                <p
                  className={`text-2xl font-bold ${
                    exp.improvement > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {exp.improvement > 0 ? "+" : ""}
                  {exp.improvement}%
                </p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <h4 className="text-xs font-medium text-gray-600">
                  Significance
                </h4>
                <p className="text-2xl font-bold text-gray-800">
                  p={exp.significance}
                </p>
                <p className="text-xs text-gray-500">
                  {exp.significance < 0.05
                    ? "Statistically significant"
                    : "Not significant"}
                </p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <h4 className="text-xs font-medium text-gray-600">
                  Confidence
                </h4>
                <p className="text-2xl font-bold text-gray-800">
                  {exp.confidence}%
                </p>
              </div>
            </div>

            <StatResultExplainer
              improvement={exp.improvement}
              significance={exp.significance || 0}
              confidence={exp.confidence || 0}
            />

            {selectedRole === "data-scientist" && (
              <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded">
                <h4 className="text-sm font-medium text-indigo-800 mb-2">
                  Statistical Analysis Notes
                </h4>
                <p className="text-sm text-indigo-700">
                  Test performed using two-tailed hypothesis testing with
                  Bonferroni correction for multiple comparisons. Sample size
                  was determined to achieve 80% power at α=0.05 for detecting a
                  minimum effect size of 10%.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="text-sm">
                    <div className="font-medium text-indigo-800">
                      Test Details
                    </div>
                    <ul className="list-disc list-inside text-indigo-700 text-xs space-y-1 mt-1">
                      <li>Method: Chi-square test</li>
                      <li>
                        Degrees of freedom: {Math.round(Math.random() * 5) + 1}
                      </li>
                      <li>
                        Critical value: {(Math.random() * 3 + 1).toFixed(2)}
                      </li>
                    </ul>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-indigo-800">
                      Power Analysis
                    </div>
                    <ul className="list-disc list-inside text-indigo-700 text-xs space-y-1 mt-1">
                      <li>
                        Required sample:{" "}
                        {Math.floor(Math.random() * 1000) + 1000}
                      </li>
                      <li>
                        Actual sample: {Math.floor(Math.random() * 2000) + 1000}
                      </li>
                      <li>
                        Effect size observed:{" "}
                        {(Math.random() * 0.5 + 0.1).toFixed(2)}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedRole === "exec" && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
                <h4 className="text-sm font-medium text-amber-800 mb-2">
                  Business Impact Summary
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-medium text-amber-700">
                      Projected Annual Impact
                    </h5>
                    <p className="text-xl font-bold text-amber-800">
                      {exp.improvement > 0 ? "+" : ""}$
                      {Math.abs(Math.floor(exp.improvement * 5000))}K
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-amber-700">
                      Implementation Cost
                    </h5>
                    <p className="text-xl font-bold text-amber-800">
                      $${Math.floor(Math.random() * 100) + 10}K
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-amber-700">
                  <p>
                    <strong>ROI Assessment:</strong>{" "}
                    {exp.improvement > 10
                      ? "High"
                      : exp.improvement > 0
                      ? "Medium"
                      : "Low"}
                  </p>
                  <p>
                    <strong>Recommended Action:</strong>{" "}
                    {exp.improvement > 10
                      ? "Full implementation recommended"
                      : exp.improvement > 0
                      ? "Limited rollout with additional testing"
                      : "Revert to control experience"}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Business Impact
              </h4>
              <p className="text-sm text-gray-800">{exp.impact}</p>
            </div>
          </Card>
        )}
        {/* AI Analysis Section */}
        {exp.status ===
          LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() && (
          <AIAnalysisComponent
            experiment={exp}
            onRequestAnalysis={() => generateAIAnalysis(exp)}
          />
        )}
        {/* Trend chart */}
        <Card>
          <h3 className="font-medium text-gray-800 mb-3">Metrics Trend</h3>
          {data.length ? (
            <div className="h-64">
              {exp.id === "multi-001" ? (
                <MultivariantTimeSeriesChart data={data} />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(val) => `${val}%`} />
                    <Tooltip formatter={(val) => `${val}%`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="standard"
                      name="Control"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="personalized"
                      name="Treatment"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">No trend data available</p>
            </div>
          )}
        </Card>
        {/* Segmented Results Section - for completed experiments */}
        {exp.status ===
          LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() &&
          exp.segmentedResults && (
            <Card>
              <h3 className="font-medium text-gray-800 mb-3">
                Segmented Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64">
                  <SegmentedResultsChart segments={exp.segmentedResults} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Segment Analysis
                  </h4>
                  <div className="space-y-3">
                    {exp.segmentedResults.map((segment, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded border">
                        <div className="flex justify-between">
                          <span className="font-medium">{segment.name}</span>
                          <span
                            className={`${
                              segment.improvement >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            } font-medium`}
                          >
                            {segment.improvement >= 0 ? "+" : ""}
                            {segment.improvement}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                          <div
                            className={`h-1.5 rounded-full ${
                              segment.improvement >= 0
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                Math.abs(segment.improvement) * 2
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Understanding segment-specific performance helps target
                    future optimizations.
                  </p>
                </div>
              </div>
            </Card>
          )}
        {/* Multivariate Results Table - for multivariate experiment */}
        {exp.id === "multi-001" && (
          <Card>
            <h3 className="font-medium text-gray-800 mb-3">
              Variant Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80">
                <MultivariateResultsChart results={exp.variantResults} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Variant Comparison
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-2 px-3 text-left">Variant</th>
                        <th className="py-2 px-3 text-right">Conv. Rate</th>
                        <th className="py-2 px-3 text-right">Lift</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exp.variantResults?.map((variant, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2 px-3">{variant.name}</td>
                          <td className="py-2 px-3 text-right">
                            {variant.convRate}
                          </td>
                          <td
                            className={`py-2 px-3 text-right ${
                              variant.lift === "0%"
                                ? "text-gray-500"
                                : variant.lift.startsWith("+")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {variant.lift}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  The best performing variant (E) combined the new headline with
                  the simplified form for a 35% improvement.
                </p>
              </div>
            </div>
          </Card>
        )}
        {/* Sample Distribution Chart - for completed experiments */}
        {exp.status ===
          LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() && (
          <Card>
            <h3 className="font-medium text-gray-800 mb-3">
              Sample Distribution
            </h3>
            <MetricsDistributionChart
              controlData={Array.from({ length: 100 }, () => ({
                value: Math.random() * 2 + 1, // Random values for control around 1-3%
              }))}
              treatmentData={Array.from({ length: 100 }, () => ({
                value: Math.random() * 2 + (1 + exp.improvement / 100), // Random values for treatment adjusted by improvement
              }))}
            />
          </Card>
        )}
        {/* Experiment variations */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-medium text-gray-800 mb-3">Control Group</h3>
          <img
            src={exp.controlImage}
            alt="Control"
            className="rounded w-full h-auto object-cover border"
          />
          {exp.control && exp.control.description && (
            <div className="mt-3 p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-700">{exp.control.description}</p>
            </div>
          )}
        </Card>
          <Card>
            <h3 className="font-medium text-gray-800 mb-3">Treatment Group</h3>
            <img
              src={exp.treatmentImage}
              alt="Treatment"
              className="rounded w-full h-auto object-cover border"
            />
            {exp.treatment && exp.treatment.description && (
              <div className="mt-3 p-3 bg-blue-50 rounded">
                <p className="text-sm text-blue-700">{exp.treatment.description}</p>
              </div>
            )}
          </Card>
        </div> */}
        <Card>
          <h3 className="font-medium text-gray-800 mb-3">
            Experiment Variants
          </h3>

          {exp.id === "multi-001" && exp.variantResults ? (
            <div>
              <div className="mb-4 overflow-x-auto">
                <div className="flex space-x-4 pb-2">
                  {exp.variantResults.map((variant, idx) => (
                    <div key={idx} className="min-w-[200px] flex-shrink-0">
                      <div className="border rounded overflow-hidden">
                        <div className="p-2 bg-gray-50 font-medium text-sm text-center border-b">
                          {variant.name}
                        </div>
                        <img
                          src={
                            idx === 0
                              ? exp.controlImage
                              : `/api/placeholder/200/150?text=${encodeURIComponent(
                                  variant.name
                                )}`
                          }
                          alt={variant.name}
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-2 text-center text-sm">
                          <div className="font-medium">{variant.convRate}</div>
                          <div
                            className={`text-xs ${
                              variant.lift === "0%"
                                ? "text-gray-500"
                                : variant.lift.startsWith("+")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {variant.lift}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  Scroll horizontally to see all variants. The experiment tested
                  multiple variations with different element combinations.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Control Group
                </h4>
                <img
                  src={exp.controlImage}
                  alt="Control"
                  className="rounded w-full h-auto object-cover border"
                />
                {exp.control && exp.control.description && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">
                      {exp.control.description}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Treatment Group
                </h4>
                <img
                  src={exp.treatmentImage}
                  alt="Treatment"
                  className="rounded w-full h-auto object-cover border"
                />
                {exp.treatment && exp.treatment.description && (
                  <div className="mt-3 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-700">
                      {exp.treatment.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
        {/* Related items section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exp.okrs && exp.okrs.length > 0 && (
            <Card>
              <h3 className="font-medium text-gray-800 mb-3">Related OKRs</h3>
              <div className="space-y-3">
                {exp.okrs.map((okrId) => {
                  const okr = okrData.find((o) => o.id === okrId);
                  if (!okr) return null;

                  return (
                    <div key={okr.id} className="p-3 border rounded">
                      <h4 className="font-medium text-gray-800 text-sm">
                        {okr.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {okr.description}
                      </p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{okr.progress}%</span>
                        </div>
                        <ProgressBar progress={okr.progress} color="amber" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          <Card>
            <h3 className="font-medium text-gray-800 mb-3">Learning Agenda</h3>
            <p className="text-sm text-gray-700">
              {exp.learningAgenda ||
                "No learning agenda has been defined for this experiment."}
            </p>

            {exp.status ===
              LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Next Steps
                </h4>
                <div className="space-y-2">
                  <button
                    className="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded text-sm text-left hover:bg-blue-100"
                    onClick={() => addExperimentToKnowledge(exp)}
                    disabled={exp.knowledgeStatus !== null}
                  >
                    {exp.knowledgeStatus === null
                      ? "Document learnings in Knowledge Hub"
                      : `Already in Knowledge Hub (${exp.knowledgeStatus})`}
                  </button>
                  <button
                    className="w-full px-3 py-2 bg-green-50 text-green-700 rounded text-sm text-left hover:bg-green-100"
                    onClick={() => {
                      showToast(
                        "Implementation request submitted to engineering team",
                        "success"
                      );
                    }}
                  >
                    Implement winning variant
                  </button>
                  <button
                    className="w-full px-3 py-2 bg-purple-50 text-purple-700 rounded text-sm text-left hover:bg-purple-100"
                    onClick={() => {
                      initializeWizard({
                        name: `Follow-up to ${exp.name}`,
                        category: exp.category,
                        primaryMetric: exp.primaryMetric,
                        goal: `Build on findings from ${exp.name}`,
                        hypothesis: `Based on the ${
                          exp.improvement > 0 ? "positive" : "negative"
                        } results of our previous experiment, we believe that...`,
                        relatedExperiment: exp.id,
                        okrs: exp.okrs || [],
                      });
                    }}
                  >
                    Create follow-up experiment
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
        {exp.knowledgeId && (
          <Card className="bg-indigo-50 border-indigo-200">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl mr-3 flex-shrink-0">
                📚
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-indigo-800 mb-1">
                  Knowledge Entry
                </h3>
                <p className="text-sm text-indigo-700">
                  This experiment has a documented knowledge entry capturing
                  insights and learnings.
                </p>
                <button
                  className="mt-3 px-3 py-1.5 bg-indigo-200 text-indigo-700 rounded text-sm hover:bg-indigo-300"
                  onClick={() => {
                    const knowledgeItem = knowledge.find(
                      (k) => k.id === exp.knowledgeId
                    );
                    if (knowledgeItem) {
                      handleTabChange("knowledge");
                      setTimeout(() => {
                        openKnowledgeDetails(knowledgeItem);
                      }, 100);
                    }
                  }}
                >
                  View Knowledge Entry
                </button>
              </div>
            </div>
          </Card>
        )}
        {exp.status ===
          LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() && (
          <Card>
            <h3 className="font-medium text-gray-800 mb-3">
              Decision & Implementation Tracking
            </h3>

            {experimentDecisions[exp.id] ? (
              <div>
                <div className="mb-4 p-4 border rounded bg-blue-50">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-blue-800">
                      Decision: {experimentDecisions[exp.id].decision}
                    </h4>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                      {experimentDecisions[exp.id].date}
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    {experimentDecisions[exp.id].rationale}
                  </p>

                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-blue-800 mb-2">
                      Implementation Status
                    </h5>
                    <div className="space-y-2">
                      {experimentDecisions[exp.id].tasks.map((task, idx) => (
                        <div
                          key={idx}
                          className="flex items-center p-2 bg-white rounded border"
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => {
                              const updatedDecision = {
                                ...experimentDecisions[exp.id],
                              };
                              updatedDecision.tasks[idx].completed =
                                !task.completed;
                              setExperimentDecisions({
                                ...experimentDecisions,
                                [exp.id]: updatedDecision,
                              });
                            }}
                            className="mr-2"
                          />
                          <span
                            className={
                              task.completed ? "line-through text-gray-500" : ""
                            }
                          >
                            {task.name}
                          </span>
                          {task.completed && (
                            <span className="ml-auto text-xs text-green-600">
                              Completed
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="px-3 py-1.5 border rounded text-gray-600 text-sm hover:bg-gray-50"
                  onClick={() => {
                    setExperimentDecisions({
                      ...experimentDecisions,
                      [exp.id]: null,
                    });
                  }}
                >
                  Edit Decision
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Record the decision made based on this experiment's results
                  and track implementation.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Decision
                    </label>
                    <select
                      className="w-full p-2 border rounded"
                      id="decision-type"
                    >
                      <option value="">Select a decision...</option>
                      <option value="implement">Implement treatment</option>
                      <option value="partial">
                        Implement with modifications
                      </option>
                      <option value="iterate">
                        Iterate with follow-up experiment
                      </option>
                      <option value="revert">Revert to control</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rationale
                    </label>
                    <textarea
                      className="w-full p-2 border rounded"
                      rows={3}
                      placeholder="Explain the reasoning behind this decision..."
                      id="decision-rationale"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Implementation Tasks
                    </label>
                    <div className="space-y-2" id="implementation-tasks">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="flex-grow p-2 border rounded"
                          placeholder="Task description..."
                          id="new-task"
                        />
                        <button
                          className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          onClick={() => {
                            const taskInput =
                              document.getElementById("new-task");
                            const tasksList = document.getElementById(
                              "implementation-tasks"
                            );

                            if (taskInput.value.trim()) {
                              const newTask = document.createElement("div");
                              newTask.className =
                                "flex items-center p-2 bg-gray-50 rounded border";
                              newTask.innerHTML = `
                        <input type="checkbox" class="mr-2">
                        <span>${taskInput.value}</span>
                        <button class="ml-auto text-red-500 hover:text-red-700" data-action="remove-task">✕</button>
                      `;

                              tasksList.appendChild(newTask);
                              taskInput.value = "";

                              // Add event listener to remove button
                              newTask
                                .querySelector('[data-action="remove-task"]')
                                .addEventListener("click", () => {
                                  newTask.remove();
                                });
                            }
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      const decisionType =
                        document.getElementById("decision-type").value;
                      const rationale =
                        document.getElementById("decision-rationale").value;

                      if (!decisionType || !rationale) {
                        showToast(
                          "Please fill out all required fields",
                          "warning"
                        );
                        return;
                      }

                      // Get tasks from UI
                      const taskElements = document.querySelectorAll(
                        "#implementation-tasks > div:not(:first-child)"
                      );
                      const tasks = Array.from(taskElements).map((el) => ({
                        name: el.querySelector("span").textContent,
                        completed: el.querySelector('input[type="checkbox"]')
                          .checked,
                      }));

                      // Create decision object
                      const decision = {
                        decision:
                          decisionType === "implement"
                            ? "Implement treatment"
                            : decisionType === "partial"
                            ? "Implement with modifications"
                            : decisionType === "iterate"
                            ? "Iterate with follow-up experiment"
                            : "Revert to control",
                        rationale: rationale,
                        date: new Date().toLocaleDateString(),
                        tasks: tasks,
                      };

                      // Save decision
                      setExperimentDecisions({
                        ...experimentDecisions,
                        [exp.id]: decision,
                      });

                      showToast("Decision documented successfully", "success");
                    }}
                  >
                    Save Decision
                  </button>
                </div>
              </div>
            )}
          </Card>
        )}
        {/* Action buttons */}
        <div className="flex justify-between">
          <div className="space-x-2">
            <button
              onClick={() => setShowPowerModal(true)}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
            >
              Power Analyzer
            </button>

            <button
              onClick={() => generateExperimentReport(exp)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Generate Report
            </button>

            {exp.status ===
              LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() &&
              !exp.aiAnalysis && (
                <button
                  onClick={() => generateAIAnalysis(exp)}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 flex items-center"
                >
                  <span className="mr-1">✨</span>
                  AI Analysis
                </button>
              )}
          </div>

          <div className="space-x-2">
            {exp.status ===
              LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase() && (
              <>
                <button
                  className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
                  onClick={() => pauseExperiment(exp)}
                >
                  Pause Experiment
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => completeExperiment(exp)}
                >
                  Mark as Completed
                </button>
              </>
            )}

            {/* {exp.status ===
              LIFECYCLE_STAGES.EXECUTION.PAUSED.label.toLowerCase() && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => resumeExperiment(exp)}
              >
                Resume Experiment
              </button>
            )} */}

            {/* {exp.status ===
              LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => addExperimentToKnowledge(exp)}
                disabled={exp.knowledgeStatus !== null}
              >
                {exp.knowledgeStatus === null
                  ? "Add to Knowledge Hub"
                  : "Already in Knowledge Hub"}
              </button>
            )} */}
            <div className="flex justify-between mt-4">
              <div>
                {exp.status ===
                  LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() &&
                  !exp.knowledgeStatus && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl mr-3">
                        📚
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Next Step: Document Learnings
                        </h4>
                        <p className="text-sm text-blue-700 mt-1">
                          This experiment is complete. Document your learnings
                          to build your organization's knowledge base.
                        </p>
                      </div>
                      <button
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
                        onClick={() => addExperimentToKnowledge(exp)}
                      >
                        Create Knowledge Entry
                      </button>
                    </div>
                  )}

                {exp.knowledgeStatus && exp.knowledgeId && (
                  <button
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 flex items-center"
                    onClick={() => {
                      handleTabChange("knowledge");
                      setTimeout(() => {
                        const knowledgeItem = knowledge.find(
                          (k) => k.id === exp.knowledgeId
                        );
                        if (knowledgeItem) openKnowledgeDetails(knowledgeItem);
                      }, 100);
                    }}
                  >
                    <span className="mr-2">📚</span>
                    View Knowledge Entry
                  </button>
                )}
              </div>

              <div className="space-x-2">
                {/* {exp.status ===
                  LIFECYCLE_STAGES.EXECUTION.IN_PROGRESS.label.toLowerCase() && (
                  <>
                    <button
                      className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
                      onClick={() => pauseExperiment(exp)}
                    >
                      Pause Experiment
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => completeExperiment(exp)}
                    >
                      Mark as Completed
                    </button>
                  </>
                )} */}

                {exp.status ===
                  LIFECYCLE_STAGES.EXECUTION.PAUSED.label.toLowerCase() && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => resumeExperiment(exp)}
                  >
                    Resume Experiment
                  </button>
                )}

                {exp.status ===
                  LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase() && (
                  <button
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    onClick={() => {
                      initializeWizard({
                        name: `Follow-up to ${exp.name}`,
                        category: exp.category,
                        primaryMetric: exp.primaryMetric,
                        goal: `Build on findings from ${exp.name}`,
                        hypothesis: `Based on the ${
                          exp.improvement > 0 ? "positive" : "negative"
                        } results of our previous experiment, we believe that...`,
                        relatedExperiment: exp.id,
                        okrs: exp.okrs || [],
                      });
                    }}
                  >
                    Create Follow-up Experiment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Knowledge Hub Tab
  const renderKnowledgeTab = () => (
    <div className="container mx-auto px-6 py-8">
      {/* Context Banner */}
      <ContextBanner section="knowledge" />

      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Knowledge Hub</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setKnowledgeView("list")}
                className={`px-3 py-1.5 rounded text-sm ${
                  knowledgeView === "list"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setKnowledgeView("graph")}
                className={`px-3 py-1.5 rounded text-sm ${
                  knowledgeView === "graph"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Graph View
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border rounded p-4 mb-6">
            <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search insights or tags..."
                  className="w-full p-2 border rounded"
                  value={knowledgeSearch}
                  onChange={(e) => setKnowledgeSearch(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="appearance-none bg-white border rounded w-full p-2"
                  value={knowledgeCategory}
                  onChange={(e) => setKnowledgeCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="monetization">Monetization</option>
                  <option value="engagement">Engagement</option>
                  <option value="satisfaction">Satisfaction</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <p className="text-xs text-gray-500 mr-2 mt-1">Popular tags:</p>
              {[
                "personalization",
                "conversion",
                "multivariate",
                "negative result",
                "ui",
              ].map((tag) => (
                <button
                  key={tag}
                  className={`px-2 py-1 rounded-full text-xs ${
                    knowledgeSearch === tag
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setKnowledgeSearch(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-medium text-indigo-800 mb-2">
              Knowledge Hub Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded border border-indigo-100">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2">
                    <span className="text-lg">+</span>
                  </div>
                  <h4 className="font-medium text-gray-800">
                    Positive Insights
                  </h4>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {knowledge.filter((k) => k.improvement > 0).length}
                </p>
                <button
                  className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
                  onClick={() => {
                    // Simulate filtering to positive insights
                    showToast("Filtering to positive insights", "info");
                  }}
                >
                  View all positive insights →
                </button>
              </div>

              <div className="p-3 bg-white rounded border border-indigo-100">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center mr-2">
                    <span className="text-lg">-</span>
                  </div>
                  <h4 className="font-medium text-gray-800">
                    Negative Insights
                  </h4>
                </div>
                <p className="text-2xl font-bold text-red-600">
                  {knowledge.filter((k) => k.improvement <= 0).length}
                </p>
                <button
                  className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
                  onClick={() => {
                    // Simulate filtering to negative insights
                    showToast("Filtering to negative insights", "info");
                  }}
                >
                  View all negative insights →
                </button>
              </div>

              <div className="p-3 bg-white rounded border border-indigo-100">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mr-2">
                    <span className="text-lg">✓</span>
                  </div>
                  <h4 className="font-medium text-gray-800">
                    Applied Knowledge
                  </h4>
                </div>
                <p className="text-2xl font-bold text-indigo-600">
                  {
                    knowledge.filter(
                      (k) =>
                        k.status ===
                        LIFECYCLE_STAGES.KNOWLEDGE.APPLIED.label.toLowerCase()
                    ).length
                  }
                </p>
                <button
                  className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
                  onClick={() => {
                    // Simulate filtering to applied knowledge
                    showToast("Filtering to applied knowledge", "info");
                  }}
                >
                  View all applied knowledge →
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <div className="text-sm text-indigo-700 mr-3">
                <span className="font-medium">Knowledge Hub Health:</span>{" "}
                {knowledge.length > 5 ? "Strong" : "Building"}
              </div>
              <div className="flex-grow">
                <div className="w-full bg-indigo-200 h-2 rounded">
                  <div
                    className="bg-indigo-600 h-2 rounded"
                    style={{
                      width: `${Math.min(100, knowledge.length * 10)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="ml-3 text-sm text-indigo-700">
                {Math.min(100, knowledge.length * 10)}%
              </div>
            </div>
          </div>

          {/* Main Content */}
          {knowledgeView === "list" ? (
            <div className="space-y-6">
              {knowledge
                .filter((k) => {
                  const matchName = k.name
                    .toLowerCase()
                    .includes(knowledgeSearch.toLowerCase());
                  const matchTags = k.tags.some((tag) =>
                    tag.toLowerCase().includes(knowledgeSearch.toLowerCase())
                  );
                  const matchInsights = k.insights.some((insight) =>
                    insight
                      .toLowerCase()
                      .includes(knowledgeSearch.toLowerCase())
                  );
                  const matchCat =
                    knowledgeCategory === "all" ||
                    k.category === knowledgeCategory;
                  return (matchName || matchTags || matchInsights) && matchCat;
                })
                .map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => openKnowledgeDetails(item)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.date} • {item.owner}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusBadge
                          status={item.status}
                          lifecycleStage="knowledge"
                        />
                        <div
                          className={`px-3 py-1 text-sm font-medium rounded ${
                            item.improvement > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.improvement > 0
                            ? `+${item.improvement}%`
                            : `${item.improvement}%`}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Summary
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.plainLanguageResult}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded cursor-pointer hover:bg-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setKnowledgeSearch(tag);
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Key Insights
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-1">
                        {item.insights.slice(0, 2).map((insight, idx) => (
                          <li key={idx}>{insight}</li>
                        ))}
                        {item.insights.length > 2 && (
                          <li className="text-blue-600 list-none text-xs cursor-pointer hover:text-blue-800">
                            + {item.insights.length - 2} more insights...
                          </li>
                        )}
                      </ul>
                    </div>

                    {item.aiRecommendations && (
                      <div className="mt-3 bg-purple-50 p-2 rounded border border-purple-100">
                        <div className="flex items-center mb-1">
                          <span className="mr-1 text-purple-700">✨</span>
                          <h4 className="text-xs font-medium text-purple-700">
                            AI Recommendations
                          </h4>
                        </div>
                        <p className="text-xs text-purple-700">
                          {item.aiRecommendations[0]}
                        </p>
                      </div>
                    )}

                    <RelatedExperiments
                      experimentIds={item.relatedExperiments}
                      onViewExperiment={(exp) => {
                        handleTabChange("experiments");
                        setTimeout(() => {
                          selectExperiment(exp);
                        }, 100);
                      }}
                    />

                    <div className="flex items-center justify-between mt-4">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                          item.category === "monetization"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {item.category}
                      </span>

                      <div className="flex space-x-2">
                        <button
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            openKnowledgeDetails(item);
                          }}
                        >
                          View Details
                        </button>
                        <button
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            openApplyInsights(item);
                          }}
                        >
                          Apply Insights
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}

              {knowledge.filter((k) => {
                const matchName = k.name
                  .toLowerCase()
                  .includes(knowledgeSearch.toLowerCase());
                const matchTags = k.tags.some((tag) =>
                  tag.toLowerCase().includes(knowledgeSearch.toLowerCase())
                );
                const matchInsights = k.insights.some((insight) =>
                  insight.toLowerCase().includes(knowledgeSearch.toLowerCase())
                );
                const matchCat =
                  knowledgeCategory === "all" ||
                  k.category === knowledgeCategory;
                return (matchName || matchTags || matchInsights) && matchCat;
              }).length === 0 && (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <p className="text-gray-600">
                    No knowledge items match your search criteria.
                  </p>
                  <button
                    onClick={() => {
                      setKnowledgeSearch("");
                      setKnowledgeCategory("all");
                    }}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            // <Card className="p-0">
            //   <div className="w-full" style={{ height: "600px" }}>
            //     {/* The updated graph data logic */}
            //     <ForceGraph2D
            //       graphData={(() => {
            //         // Extract all experiment and OKR IDs from the data
            //         const completedExperiments = experiments.filter(
            //           (e) =>
            //             e.status ===
            //             LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase()
            //         );

            //         // Create node lists
            //         const knowledgeNodes = knowledge
            //           .filter((k) => {
            //             if (knowledgeSearch) {
            //               const matchName = k.name
            //                 .toLowerCase()
            //                 .includes(knowledgeSearch.toLowerCase());
            //               const matchTags = k.tags.some((tag) =>
            //                 tag
            //                   .toLowerCase()
            //                   .includes(knowledgeSearch.toLowerCase())
            //               );
            //               const matchInsights = k.insights.some((insight) =>
            //                 insight
            //                   .toLowerCase()
            //                   .includes(knowledgeSearch.toLowerCase())
            //               );
            //               return matchName || matchTags || matchInsights;
            //             }
            //             if (knowledgeCategory !== "all") {
            //               return k.category === knowledgeCategory;
            //             }
            //             return true;
            //           })
            //           .map((k) => ({
            //             id: k.id,
            //             name: `📚 ${k.name}`,
            //             group: k.category,
            //             type: "knowledge",
            //             val: 15, // size
            //           }));

            //         const experimentNodes = completedExperiments
            //           .filter((e) => {
            //             if (knowledgeSearch) {
            //               return e.name
            //                 .toLowerCase()
            //                 .includes(knowledgeSearch.toLowerCase());
            //             }
            //             if (knowledgeCategory !== "all") {
            //               return e.category === knowledgeCategory;
            //             }
            //             return true;
            //           })
            //           .map((e) => ({
            //             id: e.id,
            //             name: `🧪 ${e.name}`,
            //             group: e.category,
            //             type: "experiment",
            //             val: 10, // size
            //           }));

            //         const okrNodes = okrData
            //           .filter((o) => {
            //             if (knowledgeSearch) {
            //               return o.title
            //                 .toLowerCase()
            //                 .includes(knowledgeSearch.toLowerCase());
            //             }
            //             return true;
            //           })
            //           .map((o) => ({
            //             id: o.id,
            //             name: `🎯 ${o.title}`,
            //             group: "okr",
            //             type: "okr",
            //             val: 12, // size
            //           }));

            //         // Create a set of all node IDs for quick reference
            //         const nodeIds = new Set([
            //           ...knowledgeNodes.map((n) => n.id),
            //           ...experimentNodes.map((n) => n.id),
            //           ...okrNodes.map((n) => n.id),
            //         ]);

            //         // Create validated links that only connect existing nodes
            //         const links = [];

            //         // Knowledge to experiment links
            //         knowledge.forEach((k) => {
            //           if (k.relatedExperiments) {
            //             k.relatedExperiments.forEach((expId) => {
            //               if (nodeIds.has(expId)) {
            //                 links.push({
            //                   source: k.id,
            //                   target: expId,
            //                 });
            //               }
            //             });
            //           }
            //         });

            //         // Experiment to OKR links
            //         completedExperiments.forEach((e) => {
            //           if (e.okrs) {
            //             e.okrs.forEach((okrId) => {
            //               if (nodeIds.has(okrId)) {
            //                 links.push({
            //                   source: e.id,
            //                   target: okrId,
            //                 });
            //               }
            //             });
            //           }
            //         });

            //         return {
            //           nodes: [
            //             ...knowledgeNodes,
            //             ...experimentNodes,
            //             ...okrNodes,
            //           ],
            //           links: links,
            //         };
            //       })()}
            //       nodeLabel={(node) => `${node.name} (${node.type})`}
            //       nodeAutoColorBy="group"
            //       linkWidth={2}
            //       linkColor={() => "#999"}
            //       cooldownTicks={100}
            //       nodeRelSize={6}
            //       onNodeClick={(node) => {
            //         // Handle node click based on type
            //         if (node.type === "knowledge") {
            //           const item = knowledge.find((k) => k.id === node.id);
            //           if (item) openKnowledgeDetails(item);
            //         } else if (node.type === "experiment") {
            //           handleTabChange("experiments");
            //           setTimeout(() => {
            //             const exp = experiments.find((e) => e.id === node.id);
            //             if (exp) selectExperiment(exp);
            //           }, 100);
            //         } else if (node.type === "okr") {
            //           // Just show a toast for now
            //           showToast(
            //             `Viewing OKR: ${node.name.substring(2)}`,
            //             "info"
            //           );
            //         }
            //       }}
            //       onNodeHover={(node) => {
            //         if (node) {
            //           document.body.style.cursor = "pointer";
            //         } else {
            //           document.body.style.cursor = "default";
            //         }
            //       }}
            //     />
            //   </div>

            //   <div className="p-4 bg-gray-50">
            //     <h3 className="font-medium text-gray-800 mb-2">
            //       Knowledge Graph Legend
            //     </h3>
            //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            //       <div className="flex items-center">
            //         <span className="mr-2">📚</span>
            //         <div>
            //           <p className="font-medium">Knowledge</p>
            //           <p className="text-xs text-gray-600">
            //             Insights and learnings
            //           </p>
            //         </div>
            //       </div>
            //       <div className="flex items-center">
            //         <span className="mr-2">🧪</span>
            //         <div>
            //           <p className="font-medium">Experiment</p>
            //           <p className="text-xs text-gray-600">
            //             Completed experiments
            //           </p>
            //         </div>
            //       </div>
            //       <div className="flex items-center">
            //         <span className="mr-2">🎯</span>
            //         <div>
            //           <p className="font-medium">OKR</p>
            //           <p className="text-xs text-gray-600">
            //             Strategic objectives
            //           </p>
            //         </div>
            //       </div>
            //     </div>
            //     <p className="mt-4 text-sm text-gray-600">
            //       The knowledge graph visualizes relationships between insights,
            //       experiments, and strategic goals. Click on any node to view
            //       details or create new experiments based on existing knowledge.
            //     </p>
            //   </div>
            // </Card>
            <Card className="p-4">
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">
                  Knowledge Graph Visualization
                </h3>
                <p className="text-sm text-gray-600">
                  See how experiments, insights, and OKRs are connected in your
                  organization's knowledge network.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Show Node Types
                    </label>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="showKnowledgeNodes"
                          className="mr-2"
                          defaultChecked
                          onChange={(e) => {
                            // This would filter nodes in a real application
                            showToast(
                              `${
                                e.target.checked ? "Showing" : "Hiding"
                              } knowledge nodes`,
                              "info"
                            );
                          }}
                        />
                        <label htmlFor="showKnowledgeNodes" className="text-sm">
                          📚 Knowledge Items
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="showExperimentNodes"
                          className="mr-2"
                          defaultChecked
                          onChange={(e) => {
                            // This would filter nodes in a real application
                            showToast(
                              `${
                                e.target.checked ? "Showing" : "Hiding"
                              } experiment nodes`,
                              "info"
                            );
                          }}
                        />
                        <label
                          htmlFor="showExperimentNodes"
                          className="text-sm"
                        >
                          🧪 Experiments
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="showOKRNodes"
                          className="mr-2"
                          defaultChecked
                          onChange={(e) => {
                            // This would filter nodes in a real application
                            showToast(
                              `${
                                e.target.checked ? "Showing" : "Hiding"
                              } OKR nodes`,
                              "info"
                            );
                          }}
                        />
                        <label htmlFor="showOKRNodes" className="text-sm">
                          🎯 OKRs
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Filter by Category
                    </label>
                    <select
                      className="w-full p-2 border rounded text-sm"
                      onChange={(e) => {
                        // This would update the graph filter in a real application
                        setKnowledgeCategory(e.target.value);
                      }}
                      value={knowledgeCategory}
                    >
                      <option value="all">All Categories</option>
                      <option value="monetization">Monetization</option>
                      <option value="engagement">Engagement</option>
                      <option value="satisfaction">Satisfaction</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Filter by Impact
                    </label>
                    <select
                      className="w-full p-2 border rounded text-sm"
                      onChange={(e) => {
                        // This would update the graph filter in a real application
                        showToast(
                          `Filtering to ${e.target.value} impact items`,
                          "info"
                        );
                      }}
                    >
                      <option value="all">All Impact Levels</option>
                      <option value="high">High Impact</option>
                      <option value="medium">Medium Impact</option>
                      <option value="low">Low Impact</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    {knowledgeCategory === "all"
                      ? "Showing all categories"
                      : `Filtering to ${knowledgeCategory} category`}
                    {knowledgeSearch ? ` • Search: "${knowledgeSearch}"` : ""}
                  </div>

                  <button
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                    onClick={() => {
                      setKnowledgeSearch("");
                      setKnowledgeCategory("all");
                      showToast("Filters reset", "info");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              <div
                className="w-full bg-gray-50 border rounded"
                style={{ height: "500px" }}
              >
                <ForceGraph2D
                  graphData={(() => {
                    // Extract all experiment and OKR IDs from the data
                    const completedExperiments = experiments.filter(
                      (e) =>
                        e.status ===
                        LIFECYCLE_STAGES.EXECUTION.COMPLETED.label.toLowerCase()
                    );

                    // Create node lists
                    const knowledgeNodes = knowledge
                      .filter((k) => {
                        if (knowledgeSearch) {
                          const matchName = k.name
                            .toLowerCase()
                            .includes(knowledgeSearch.toLowerCase());
                          const matchTags = k.tags.some((tag) =>
                            tag
                              .toLowerCase()
                              .includes(knowledgeSearch.toLowerCase())
                          );
                          const matchInsights = k.insights.some((insight) =>
                            insight
                              .toLowerCase()
                              .includes(knowledgeSearch.toLowerCase())
                          );
                          return matchName || matchTags || matchInsights;
                        }
                        if (knowledgeCategory !== "all") {
                          return k.category === knowledgeCategory;
                        }
                        return true;
                      })
                      .map((k) => ({
                        id: k.id,
                        name: `📚 ${k.name}`,
                        group: k.category,
                        type: "knowledge",
                        val: 15, // size
                      }));

                    const experimentNodes = completedExperiments
                      .filter((e) => {
                        if (knowledgeSearch) {
                          return e.name
                            .toLowerCase()
                            .includes(knowledgeSearch.toLowerCase());
                        }
                        if (knowledgeCategory !== "all") {
                          return e.category === knowledgeCategory;
                        }
                        return true;
                      })
                      .map((e) => ({
                        id: e.id,
                        name: `🧪 ${e.name}`,
                        group: e.category,
                        type: "experiment",
                        val: 10, // size
                      }));

                    const okrNodes = okrData
                      .filter((o) => {
                        if (knowledgeSearch) {
                          return o.title
                            .toLowerCase()
                            .includes(knowledgeSearch.toLowerCase());
                        }
                        return true;
                      })
                      .map((o) => ({
                        id: o.id,
                        name: `🎯 ${o.title}`,
                        group: "okr",
                        type: "okr",
                        val: 12, // size
                      }));

                    // Create a set of all node IDs for quick reference
                    const nodeIds = new Set([
                      ...knowledgeNodes.map((n) => n.id),
                      ...experimentNodes.map((n) => n.id),
                      ...okrNodes.map((n) => n.id),
                    ]);

                    // Create validated links that only connect existing nodes
                    const links = [];

                    // Knowledge to experiment links
                    knowledge.forEach((k) => {
                      if (k.relatedExperiments) {
                        k.relatedExperiments.forEach((expId) => {
                          if (nodeIds.has(expId)) {
                            links.push({
                              source: k.id,
                              target: expId,
                            });
                          }
                        });
                      }
                    });

                    // Experiment to OKR links
                    completedExperiments.forEach((e) => {
                      if (e.okrs) {
                        e.okrs.forEach((okrId) => {
                          if (nodeIds.has(okrId)) {
                            links.push({
                              source: e.id,
                              target: okrId,
                            });
                          }
                        });
                      }
                    });

                    return {
                      nodes: [
                        ...knowledgeNodes,
                        ...experimentNodes,
                        ...okrNodes,
                      ],
                      links: links,
                    };
                  })()}
                  nodeLabel={(node) => `${node.name} (${node.type})`}
                  nodeAutoColorBy="group"
                  linkWidth={2}
                  linkColor={() => "#999"}
                  cooldownTicks={100}
                  nodeRelSize={6}
                  onNodeClick={(node) => {
                    // Handle node click based on type
                    if (node.type === "knowledge") {
                      const item = knowledge.find((k) => k.id === node.id);
                      if (item) openKnowledgeDetails(item);
                    } else if (node.type === "experiment") {
                      handleTabChange("experiments");
                      setTimeout(() => {
                        const exp = experiments.find((e) => e.id === node.id);
                        if (exp) selectExperiment(exp);
                      }, 100);
                    } else if (node.type === "okr") {
                      // Show a toast with OKR info
                      const okr = okrData.find((o) => o.id === node.id);
                      if (okr) {
                        showToast(
                          `OKR: ${okr.title} (${okr.progress}% complete)`,
                          "info",
                          3000
                        );
                      }
                    }
                  }}
                  onNodeHover={(node) => {
                    if (node) {
                      document.body.style.cursor = "pointer";
                    } else {
                      document.body.style.cursor = "default";
                    }
                  }}
                />
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-medium text-gray-800 mb-2">
                  Knowledge Graph Legend
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <span className="mr-2">📚</span>
                    <div>
                      <p className="font-medium">Knowledge</p>
                      <p className="text-xs text-gray-600">
                        Insights and learnings
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🧪</span>
                    <div>
                      <p className="font-medium">Experiment</p>
                      <p className="text-xs text-gray-600">
                        Completed experiments
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🎯</span>
                    <div>
                      <p className="font-medium">OKR</p>
                      <p className="text-xs text-gray-600">
                        Strategic objectives
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  The knowledge graph visualizes relationships between insights,
                  experiments, and strategic goals. Click on any node to view
                  details or create new experiments based on existing knowledge.
                </p>
              </div>
            </Card>
          )}
        </div>

        <div className="md:w-1/4 mt-6 md:mt-0">
          {/* Recent Items */}
          {renderRecentItems()}

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Knowledge Stats
            </h3>
            <div className="space-y-4">
              <StatCard
                title="Total Learnings"
                value={knowledge.length}
                color="indigo"
              />
              <StatCard
                title="Engagement Insights"
                value={
                  knowledge.filter((k) => k.category === "engagement").length
                }
                color="blue"
              />
              <StatCard
                title="Monetization Insights"
                value={
                  knowledge.filter((k) => k.category === "monetization").length
                }
                color="green"
              />
            </div>
          </div>

          {/* Impact Rating */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Impact Rating
            </h3>
            <div className="space-y-3">
              {["High", "Medium", "Low"].map((impact) => {
                const count = knowledge.filter(
                  (k) => k.businessImpact && k.businessImpact.includes(impact)
                ).length;
                return (
                  <div key={impact}>
                    <div className="flex justify-between text-sm">
                      <span>{impact} Impact</span>
                      <span className="font-medium">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded mt-1">
                      <div
                        className={`h-2 rounded ${
                          impact === "High"
                            ? "bg-green-500"
                            : impact === "Medium"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                        style={{
                          width: `${
                            (count / Math.max(1, knowledge.length)) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button
                className="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded text-sm text-left hover:bg-blue-100 flex items-center"
                onClick={() => {
                  // In a real application, this would open a knowledge creation form
                  openAIPromptModal("learningAgenda", {});
                }}
              >
                <span className="mr-2">✨</span>
                Generate New Insight
              </button>
              <button
                className="w-full px-3 py-2 bg-green-50 text-green-700 rounded text-sm text-left hover:bg-green-100 flex items-center"
                onClick={() => generateKnowledgeReport()}
              >
                <span className="mr-2">📊</span>
                Generate Report
              </button>
              <button
                className="w-full px-3 py-2 bg-purple-50 text-purple-700 rounded text-sm text-left hover:bg-purple-100 flex items-center"
                onClick={() => generateLearningPathPlan()}
              >
                <span className="mr-2">🧭</span>
                Generate Learning Path
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Planning Tab
  const renderPlanningTab = () => (
    <div className="container mx-auto px-6 py-8">
      {/* Context Banner */}
      <ContextBanner section="planning" />

      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Experiment Planning
            </h1>
            <div className="space-x-2">
              <button
                onClick={() => setPlanningView("kanban")}
                className={`px-3 py-1.5 rounded text-sm ${
                  planningView === "kanban"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Kanban
              </button>
              <button
                onClick={() => setPlanningView("timeline")}
                className={`px-3 py-1.5 rounded text-sm ${
                  planningView === "timeline"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Timeline
              </button>
            </div>
          </div>

          {/* AI Planning Assistant */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              <span className="mr-2">✨</span>
              AI Planning Assistant
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              Generate experiment ideas based on your business objectives.
            </p>
            <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 bg-white p-3 rounded">
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
                  planningGenBusy
                    ? "bg-gray-300"
                    : "bg-blue-500 hover:bg-blue-600"
                } flex items-center space-x-1`}
                onClick={handleGenerateRoadmap}
                disabled={planningGenBusy}
              >
                {planningGenBusy ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span className="mr-1">✨</span>
                    <span>Generate Idea</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Content - Experiments List */}
          {planningView === "kanban" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Planned Column */}
              <div className="border rounded-lg bg-blue-50 p-3">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-blue-800">Planned</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                    {plannedCount}
                  </span>
                </div>
                <div className="space-y-3">
                  {roadmap
                    .filter(
                      (r) =>
                        r.status ===
                        LIFECYCLE_STAGES.PLANNING.PLANNED.label.toLowerCase()
                    )
                    .map((item) => (
                      <Card
                        key={item.id}
                        onClick={() => openPlanItemModal(item)}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800 text-sm">
                            {item.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              item.category === "monetization"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.startDate} · {item.duration}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.goal}
                        </p>
                        <LifecycleIndicator currentStage="planning" />
                      </Card>
                    ))}
                </div>
              </div>

              {/* Draft Column */}
              <div className="border rounded-lg bg-amber-50 p-3">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-amber-800">Draft</h3>
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-medium">
                    {draftCount}
                  </span>
                </div>
                <div className="space-y-3">
                  {roadmap
                    .filter(
                      (r) =>
                        r.status ===
                        LIFECYCLE_STAGES.PLANNING.DRAFT.label.toLowerCase()
                    )
                    .map((item) => (
                      <Card
                        key={item.id}
                        onClick={() => openPlanItemModal(item)}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800 text-sm">
                            {item.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              item.category === "monetization"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.startDate} · {item.duration}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.goal}
                        </p>
                        <LifecycleIndicator currentStage="planning" />
                      </Card>
                    ))}
                </div>
              </div>

              {/* Backlog Column */}
              <div className="border rounded-lg bg-gray-50 p-3">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-700">Backlog</h3>
                  <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                    {backlogCount}
                  </span>
                </div>
                <div className="space-y-3">
                  {roadmap
                    .filter(
                      (r) =>
                        r.status ===
                        LIFECYCLE_STAGES.PLANNING.BACKLOG.label.toLowerCase()
                    )
                    .map((item) => (
                      <Card
                        key={item.id}
                        onClick={() => openPlanItemModal(item)}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800 text-sm">
                            {item.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              item.category === "monetization"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.startDate} · {item.duration}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.goal}
                        </p>
                        <LifecycleIndicator currentStage="planning" />
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg bg-white p-4">
              <div className="mb-4">
                <h3 className="font-medium text-gray-800">Timeline View</h3>
                <p className="text-sm text-gray-600">
                  Showing all planned experiments in chronological order
                </p>
              </div>
              <div className="space-y-3">
                {timelineAll.map((item) => (
                  <Card key={item.id} onClick={() => openPlanItemModal(item)}>
                    <div className="flex flex-wrap justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.startDate} - {item.endDate || "Ongoing"} •{" "}
                          {item.duration}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <StatusBadge
                          status={item.status}
                          lifecycleStage="planning"
                        />
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            item.category === "monetization"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{item.goal}</p>
                    <LifecycleIndicator currentStage="planning" />

                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <span className="mr-2">
                        Owner: {item.owner || "Unassigned"}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded ${
                          item.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : item.priority === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.priority} priority
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:w-1/4 mt-6 md:mt-0">
          {/* Recent Items */}
          {renderRecentItems()}

          {/* Metrics Summary */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Planning Metrics
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Planned</span>
                  <span className="font-medium">{plannedCount}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                  <div
                    className="h-2 bg-blue-500 rounded"
                    style={{
                      width: `${
                        (plannedCount /
                          (plannedCount + draftCount + backlogCount || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Draft</span>
                  <span className="font-medium">{draftCount}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                  <div
                    className="h-2 bg-amber-500 rounded"
                    style={{
                      width: `${
                        (draftCount /
                          (plannedCount + draftCount + backlogCount || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Backlog</span>
                  <span className="font-medium">{backlogCount}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                  <div
                    className="h-2 bg-gray-500 rounded"
                    style={{
                      width: `${
                        (backlogCount /
                          (plannedCount + draftCount + backlogCount || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Learning Path Button */}
          <button
            onClick={() => generateLearningPathPlan()}
            className="w-full px-4 py-3 bg-purple-500 text-white rounded mb-6 flex items-center justify-center hover:bg-purple-600"
          >
            <span className="mr-2">🧭</span>
            Generate Learning Path
          </button>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => initializeWizard()}
                className="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded text-sm text-left hover:bg-blue-100 flex items-center"
              >
                <span className="mr-2">+</span>
                Create New Experiment
              </button>
              <button
                className="w-full px-3 py-2 bg-purple-50 text-purple-700 rounded text-sm text-left hover:bg-purple-100 flex items-center"
                onClick={() => {
                  // Open AI prompt modal
                  openAIPromptModal("hypothesis", {});
                }}
              >
                <span className="mr-2">✨</span>
                AI Hypothesis Generator
              </button>
              <button
                className="w-full px-3 py-2 bg-green-50 text-green-700 rounded text-sm text-left hover:bg-green-100 flex items-center"
                onClick={() => {
                  showToast("Planning dashboard would open here", "info");
                }}
              >
                <span className="mr-2">📊</span>
                View Planning Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Item Detail Modal */}
      {planItemModalOpen && planItemModalItem && (
        <Modal
          isOpen={planItemModalOpen}
          onClose={closePlanItemModal}
          title={planItemModalItem.name}
          size="lg"
        >
          <div className="flex items-center mb-4">
            <StatusBadge
              status={planItemModalItem.status}
              lifecycleStage="planning"
            />
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
              {planItemModalItem.priority} priority
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="text-sm text-gray-800 p-2 bg-gray-50 rounded">
                {planItemModalItem.category}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner
              </label>
              <div className="text-sm text-gray-800 p-2 bg-gray-50 rounded">
                {planItemModalItem.owner || "Unassigned"}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Goal
            </label>
            <div className="text-sm text-gray-800 p-2 bg-gray-50 rounded">
              {planItemModalItem.goal}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hypothesis
            </label>
            <div className="text-sm text-gray-800 p-2 bg-gray-50 rounded">
              {planItemModalItem.hypothesis}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Metrics
            </label>
            <div className="text-sm text-gray-800 p-2 bg-gray-50 rounded">
              <ul className="list-disc list-inside space-y-1">
                {planItemModalItem.metrics.map((metric, idx) => (
                  <li key={idx}>{metric}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timeline
            </label>
            <div className="text-sm text-gray-800 p-2 bg-gray-50 rounded">
              <p>
                {planItemModalItem.startDate} - {planItemModalItem.endDate}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Duration: {planItemModalItem.duration}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Learning Agenda
            </label>
            <div className="text-sm text-gray-800 p-2 bg-gray-50 rounded">
              <p>
                {planItemModalItem.learningAgenda ||
                  "No learning agenda defined"}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lifecycle Stage
            </label>
            <LifecycleIndicator currentStage="planning" />
            <p className="text-xs text-gray-500 mt-1">
              This experiment is in the Planning stage
            </p>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
              onClick={() => {
                // This would open an editing interface
                showToast("Edit functionality would open here", "info");
              }}
            >
              Edit
            </button>

            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              onClick={() => sendToWizard(planItemModalItem)}
            >
              <span className="mr-1">✨</span>
              Send to Wizard
            </button>

            {planItemModalItem.status ===
              LIFECYCLE_STAGES.PLANNING.BACKLOG.label.toLowerCase() && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() =>
                  movePlanningItem(
                    planItemModalItem,
                    LIFECYCLE_STAGES.PLANNING.DRAFT.label
                  )
                }
              >
                Move to Draft
              </button>
            )}

            {planItemModalItem.status ===
              LIFECYCLE_STAGES.PLANNING.DRAFT.label.toLowerCase() && (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() =>
                  movePlanningItem(
                    planItemModalItem,
                    LIFECYCLE_STAGES.PLANNING.PLANNED.label
                  )
                }
              >
                Move to Planned
              </button>
            )}

            {planItemModalItem.status ===
              LIFECYCLE_STAGES.PLANNING.PLANNED.label.toLowerCase() && (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => createExperimentFromPlanning(planItemModalItem)}
              >
                Move to Reviews
              </button>
            )}

            <button
              className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
              onClick={() => deletePlanningItem(planItemModalItem)}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );

  // Render Reviews Tab
  const renderReviewsTab = () => {
    const reviewsFiltered = reviews.filter(
      (rev) => reviewStatusFilter === "all" || rev.status === reviewStatusFilter
    );

    const underReviewCount = reviews.filter(
      (r) =>
        r.status === LIFECYCLE_STAGES.REVIEW.UNDER_REVIEW.label.toLowerCase()
    ).length;
    const approvedCount = reviews.filter(
      (r) => r.status === LIFECYCLE_STAGES.REVIEW.APPROVED.label.toLowerCase()
    ).length;
    const needsRevisionCount = reviews.filter(
      (r) =>
        r.status === LIFECYCLE_STAGES.REVIEW.NEEDS_REVISION.label.toLowerCase()
    ).length;

    return (
      <div className="container mx-auto px-6 py-8">
        {/* Context Banner */}
        <ContextBanner section="reviews" />

        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Brief Reviews
              </h1>
              <div className="flex items-center space-x-2">
                <select
                  className="appearance-none bg-white border rounded-lg px-4 py-2 text-sm"
                  value={reviewStatusFilter}
                  onChange={(e) => setReviewStatusFilter(e.target.value)}
                >
                  <option value="all">All Briefs</option>
                  <option
                    value={LIFECYCLE_STAGES.REVIEW.UNDER_REVIEW.label.toLowerCase()}
                  >
                    Under Review
                  </option>
                  <option
                    value={LIFECYCLE_STAGES.REVIEW.APPROVED.label.toLowerCase()}
                  >
                    Approved
                  </option>
                  <option
                    value={LIFECYCLE_STAGES.REVIEW.NEEDS_REVISION.label.toLowerCase()}
                  >
                    Needs Revision
                  </option>
                </select>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviewsFiltered.length > 0 ? (
                reviewsFiltered.map((brief) => (
                  <Card key={brief.id} className="hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {brief.name}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>Submitted by {brief.submittedBy}</span>
                          <span className="mx-2">•</span>
                          <span>{brief.submittedDate}</span>
                          {brief.dueDate && (
                            <>
                              <span className="mx-2">•</span>
                              <span
                                className={
                                  new Date(brief.dueDate) < new Date()
                                    ? "text-red-600 font-medium"
                                    : ""
                                }
                              >
                                Due: {brief.dueDate}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <StatusBadge
                        status={brief.status}
                        lifecycleStage="review"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Business Goal
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {brief.businessGoal || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Primary Metric
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {brief.primaryMetric || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Hypothesis
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {brief.hypothesis || "N/A"}
                      </p>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Learning Agenda
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {brief.learningAgenda || "N/A"}
                      </p>
                    </div>

                    <LifecycleIndicator currentStage="review" />

                    {brief.feedback && brief.feedback.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Feedback
                        </h4>
                        {brief.feedback.map((f, i) => (
                          <div
                            key={i}
                            className={`p-2 text-sm rounded ${
                              f.status === "success"
                                ? "bg-green-50 text-green-700"
                                : f.status === "warning"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            <span className="font-medium mr-1">
                              {f.type.charAt(0).toUpperCase() + f.type.slice(1)}
                              :
                            </span>
                            {f.message}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end space-x-2 mt-4">
                      {brief.status ===
                        LIFECYCLE_STAGES.REVIEW.UNDER_REVIEW.label.toLowerCase() && (
                        <button
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                          onClick={() => openReviewModal(brief)}
                        >
                          Review
                        </button>
                      )}
                      {brief.status ===
                        LIFECYCLE_STAGES.REVIEW.NEEDS_REVISION.label.toLowerCase() && (
                        <button
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                          onClick={() => {
                            // This would normally open the experiment editor with the brief data
                            showToast(
                              `Edit functionality would open for "${brief.name}"`,
                              "info"
                            );
                          }}
                        >
                          Edit Brief
                        </button>
                      )}
                      {brief.status ===
                        LIFECYCLE_STAGES.REVIEW.APPROVED.label.toLowerCase() && (
                        <button
                          className="px-3 py-1.5 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                          onClick={() => handleStartExperimentFromReview(brief)}
                        >
                          Start Experiment
                        </button>
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-gray-600">
                    No briefs match your filter criteria.
                  </p>
                  <button
                    onClick={() => setReviewStatusFilter("all")}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-1/4 mt-6 md:mt-0">
            {/* Recent Items */}
            {renderRecentItems()}

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Review Status
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <StatCard
                  title="Under Review"
                  value={underReviewCount}
                  color="blue"
                />
                <StatCard
                  title="Approved"
                  value={approvedCount}
                  color="green"
                />
                <StatCard
                  title="Needs Revision"
                  value={needsRevisionCount}
                  color="red"
                />
              </div>
            </div>

            {/* Due Soon */}
            {reviews.some(
              (r) =>
                r.dueDate &&
                new Date(r.dueDate) <
                  new Date(new Date().setDate(new Date().getDate() + 3))
            ) && (
              <div className="bg-amber-50 rounded-lg shadow-sm p-4 mb-6 border border-amber-200">
                <h3 className="text-sm font-medium text-amber-800 mb-3">
                  Due Soon
                </h3>
                <div className="space-y-2">
                  {reviews
                    .filter(
                      (r) =>
                        r.dueDate &&
                        new Date(r.dueDate) <
                          new Date(new Date().setDate(new Date().getDate() + 3))
                    )
                    .map((brief) => (
                      <div
                        key={brief.id}
                        className="p-2 bg-white rounded border border-amber-100"
                      >
                        <p className="text-sm font-medium text-gray-800">
                          {brief.name}
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                          Due: {brief.dueDate}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => initializeWizard()}
                  className="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded text-sm text-left hover:bg-blue-100 flex items-center"
                >
                  <span className="mr-2">+</span>
                  Create New Brief
                </button>
                <button
                  className="w-full px-3 py-2 bg-purple-50 text-purple-700 rounded text-sm text-left hover:bg-purple-100 flex items-center"
                  onClick={() => {
                    openAIPromptModal("hypothesis", {});
                  }}
                >
                  <span className="mr-2">✨</span>
                  AI Hypothesis Generator
                </button>
                <button
                  className="w-full px-3 py-2 bg-gray-50 text-gray-700 rounded text-sm text-left hover:bg-gray-100 flex items-center"
                  onClick={() => {
                    showToast(
                      "Review guidelines document would open here",
                      "info"
                    );
                  }}
                >
                  <span className="mr-2">📝</span>
                  Review Guidelines
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Review Modal */}
        {reviewModalOpen && reviewModalItem && (
          <Modal
            isOpen={reviewModalOpen}
            onClose={closeReviewModal}
            title="Review Brief"
            size="lg"
          >
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Brief Summary
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {reviewModalItem.name}
                </p>
                <p>
                  <span className="font-medium">Business Goal:</span>{" "}
                  {reviewModalItem.businessGoal}
                </p>
                <p>
                  <span className="font-medium">Primary Metric:</span>{" "}
                  {reviewModalItem.primaryMetric}
                </p>
                <p>
                  <span className="font-medium">Hypothesis:</span>{" "}
                  {reviewModalItem.hypothesis}
                </p>
                <p>
                  <span className="font-medium">Success Criteria:</span>{" "}
                  {reviewModalItem.successCriteria}
                </p>
                <p>
                  <span className="font-medium">Target Audience:</span>{" "}
                  {reviewModalItem.targetAudience}
                </p>
                <p>
                  <span className="font-medium">Learning Agenda:</span>{" "}
                  {reviewModalItem.learningAgenda || "Not specified"}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Review Checklist
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="statistical"
                    className="mr-2"
                    onChange={() => {
                      // In a real app, this would update state
                    }}
                  />
                  <label htmlFor="statistical" className="text-sm">
                    Statistical design is sound
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="business"
                    className="mr-2"
                    onChange={() => {
                      // In a real app, this would update state
                    }}
                  />
                  <label htmlFor="business" className="text-sm">
                    Aligns with business goals
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="technical"
                    className="mr-2"
                    onChange={() => {
                      // In a real app, this would update state
                    }}
                  />
                  <label htmlFor="technical" className="text-sm">
                    Technical implementation is feasible
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="resources"
                    className="mr-2"
                    onChange={() => {
                      // In a real app, this would update state
                    }}
                  />
                  <label htmlFor="resources" className="text-sm">
                    Resources are available
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Add Feedback
                </h3>
                <button
                  onClick={() => openAIPromptModal("analysis", reviewModalItem)}
                  className="flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                >
                  <span className="mr-1">✨</span>
                  AI Feedback
                </button>
              </div>
              <textarea
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Enter feedback for brief author..."
                onChange={(e) => {
                  // In a real app, this would update state
                }}
              />
              <div className="mt-2 flex space-x-2">
                <button
                  className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm"
                  onClick={() =>
                    addFeedbackToReview({
                      type: "statistical",
                      status: "error",
                      message: "Statistical design needs improvement",
                    })
                  }
                >
                  Add Statistical Issue
                </button>
                <button
                  className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded text-sm"
                  onClick={() =>
                    addFeedbackToReview({
                      type: "business",
                      status: "warning",
                      message: "Business alignment could be clearer",
                    })
                  }
                >
                  Add Business Concern
                </button>
                <button
                  className="px-3 py-1.5 bg-green-100 text-green-700 rounded text-sm"
                  onClick={() =>
                    addFeedbackToReview({
                      type: "operation",
                      status: "success",
                      message: "Implementation plan looks good",
                    })
                  }
                >
                  Add Positive Note
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  handleReviewAction(
                    LIFECYCLE_STAGES.REVIEW.NEEDS_REVISION.label.toLowerCase()
                  )
                }
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Needs Revision
              </button>
              <button
                onClick={() =>
                  handleReviewAction(
                    LIFECYCLE_STAGES.REVIEW.APPROVED.label.toLowerCase()
                  )
                }
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // Render various modals
  const renderKnowledgeDetailsModal = () => {
    if (!showKnowledgeModal || !selectedKnowledge) return null;

    return (
      <Modal
        isOpen={showKnowledgeModal}
        onClose={closeKnowledgeDetails}
        title={selectedKnowledge.name}
        size="lg"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-500">
              {selectedKnowledge.date} • {selectedKnowledge.category}
            </p>
          </div>
          <StatusBadge
            status={selectedKnowledge.status}
            lifecycleStage="knowledge"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-gray-50 rounded">
            <h4 className="text-xs font-medium text-gray-600 mb-1">
              Improvement
            </h4>
            <p
              className={`text-xl font-bold ${
                selectedKnowledge.improvement > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {selectedKnowledge.improvement > 0 ? "+" : ""}
              {selectedKnowledge.improvement}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <h4 className="text-xs font-medium text-gray-600 mb-1">
              Statistical Significance
            </h4>
            <p className="text-xl font-bold text-gray-800">
              p={selectedKnowledge.significance}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <h4 className="text-xs font-medium text-gray-600 mb-1">
              Confidence
            </h4>
            <p className="text-xl font-bold text-gray-800">
              {selectedKnowledge.confidence}%
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Summary</h3>
          <p className="text-gray-700 p-3 bg-blue-50 rounded">
            {selectedKnowledge.plainLanguageResult}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Key Insights</h3>
          <ul className="space-y-2">
            {selectedKnowledge.insights.map((insight, idx) => (
              <li key={idx} className="p-3 bg-gray-50 rounded flex items-start">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3 flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-gray-700">{insight}</p>
              </li>
            ))}
          </ul>
        </div>

        {selectedKnowledge.aiRecommendations && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">
              AI Recommendations
            </h3>
            <div className="space-y-2">
              {selectedKnowledge.aiRecommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-purple-50 rounded border border-purple-100 flex items-start"
                >
                  <div className="mr-3 text-purple-700">✨</div>
                  <p className="text-purple-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selectedKnowledge.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {selectedKnowledge.relatedExperiments &&
          selectedKnowledge.relatedExperiments.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">
                Source Experiments
              </h3>
              <div className="space-y-2">
                {selectedKnowledge.relatedExperiments.map((expId) => {
                  const exp = experiments.find((e) => e.id === expId);
                  if (!exp) return null;

                  return (
                    <div
                      key={exp.id}
                      className="p-3 border rounded hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="mr-3 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg">
                            🧪
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {exp.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {exp.startDate} - {exp.endDate} • {exp.category}
                            </p>
                          </div>
                        </div>
                        <button
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                          onClick={() => {
                            closeKnowledgeDetails();
                            handleTabChange("experiments");
                            setTimeout(() => {
                              selectExperiment(exp);
                            }, 100);
                          }}
                        >
                          View
                        </button>
                      </div>

                      {exp.improvement !== undefined && (
                        <div className="mt-2 flex items-center">
                          <span className="text-xs mr-1">Result:</span>
                          <span
                            className={`text-xs font-medium ${
                              exp.improvement > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {exp.improvement > 0 ? "+" : ""}
                            {exp.improvement}% {exp.primaryMetric}
                          </span>
                          <span className="text-xs mx-1">•</span>
                          <span className="text-xs text-gray-600">
                            p={exp.significance} (
                            {exp.significance < 0.05
                              ? "significant"
                              : "not significant"}
                            )
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {selectedKnowledge.relatedExperiments &&
          selectedKnowledge.relatedExperiments.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">
                Related Experiments
              </h3>
              <div className="space-y-2">
                {selectedKnowledge.relatedExperiments.map((expId) => {
                  const exp = experiments.find((e) => e.id === expId);
                  if (!exp) return null;

                  return (
                    <div
                      key={exp.id}
                      className="p-3 border rounded flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{exp.name}</p>
                        <p className="text-xs text-gray-500">
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </div>
                      <button
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                        onClick={() => {
                          closeKnowledgeDetails();
                          handleTabChange("experiments");
                          setTimeout(() => selectExperiment(exp), 100);
                        }}
                      >
                        View
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
            onClick={closeKnowledgeDetails}
          >
            Close
          </button>
          {selectedKnowledge.status !==
            LIFECYCLE_STAGES.KNOWLEDGE.APPLIED.label.toLowerCase() && (
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              onClick={() => markKnowledgeAsApplied(selectedKnowledge)}
            >
              Mark as Applied
            </button>
          )}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              closeKnowledgeDetails();
              openApplyInsights(selectedKnowledge);
            }}
          >
            Apply Insights
          </button>
        </div>
      </Modal>
    );
  };

  // Apply Insights Modal
  const renderApplyInsightsModal = () => {
    if (!showApplyInsightsModal || !insightsItem) return null;

    return (
      <Modal
        isOpen={showApplyInsightsModal}
        onClose={closeApplyInsights}
        title="Apply Insights"
        size="md"
      >
        <p className="text-gray-600 mb-4">
          Create a new experiment based on insights from{" "}
          <strong>{insightsItem.name}</strong>
        </p>

        <div className="p-4 bg-blue-50 rounded mb-4">
          <h3 className="font-medium text-blue-800 text-sm mb-2">
            Key Insight Summary
          </h3>
          <p className="text-blue-700 text-sm">
            {insightsItem.plainLanguageResult}
          </p>
          <div className="mt-3 space-y-1">
            {insightsItem.insights.slice(0, 2).map((insight, idx) => (
              <div key={idx} className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center mr-2 text-xs flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-sm text-blue-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded mb-4">
          <h3 className="font-medium text-green-800 text-sm mb-2">
            Your New Experiment Will Include
          </h3>
          <ul className="space-y-2 text-sm text-green-700">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Pre-filled hypothesis based on these insights
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Success criteria derived from previous experiment
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Link to this knowledge item for reference
            </li>
          </ul>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={closeApplyInsights}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={applyInsightsToWizard}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          >
            <span className="mr-2">+</span>
            Create New Experiment
          </button>
        </div>
      </Modal>
    );
  };

  // Learning Path Modal
  const renderLearningPathModal = () => {
    if (!showLearningPathModal) return null;

    return (
      <Modal
        isOpen={showLearningPathModal}
        onClose={() => setShowLearningPathModal(false)}
        title="Learning Path & Recommendations"
        size="lg"
      >
        <p className="text-gray-600 mb-6">
          Strategic guidance for future experiments based on your objectives and
          past learnings
        </p>

        <div className="space-y-4">
          {learningPathData.map((step, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg hover:shadow-sm transition"
            >
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-4 flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 text-lg">
                    {step.objective}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase">
                        Current/Next Experiment
                      </h4>
                      <p className="text-sm mt-1">{step.nextExperiment}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase">
                        Rationale
                      </h4>
                      <p className="text-sm mt-1">{step.rationale}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase">
                        Recommendation
                      </h4>
                      <p className="text-sm mt-1">{step.recommendation}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200"
                      onClick={() => {
                        initializeWizard({
                          name: `Follow-up: ${
                            step.nextExperiment !== "N/A"
                              ? step.nextExperiment
                              : step.objective
                          }`,
                          goal: step.recommendation,
                        });
                        setShowLearningPathModal(false);
                      }}
                    >
                      Create Recommended Experiment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">
            Learning Path Insights
          </h3>
          <p className="text-sm text-blue-700">
            Your experimentation strategy is currently focused on{" "}
            {okrData.length} key objectives.
            {learningPathData.filter((p) => p.nextExperiment === "N/A").length >
            0
              ? ` ${
                  learningPathData.filter((p) => p.nextExperiment === "N/A")
                    .length
                } objectives don't have active experiments.`
              : " All objectives have active experiments."}
          </p>
        </div>
      </Modal>
    );
  };

  // OKR Modal
  const renderOKRModal = () => {
    if (!showOKRModal) return null;

    return (
      <Modal
        isOpen={showOKRModal}
        onClose={() => setShowOKRModal(false)}
        title="Add New OKR"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={newOKRTitle}
              onChange={(e) => setNewOKRTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g. Increase Engagement by 20%"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newOKRDesc}
              onChange={(e) => setNewOKRDesc(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Describe the objective..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Results
            </label>
            <div className="space-y-2">
              {newKeyResults.map((kr, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-grow p-2 border rounded bg-gray-50">
                    {kr}
                  </div>
                  <button
                    className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    onClick={() => removeKeyResult(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newKeyResult}
                  onChange={(e) => setNewKeyResult(e.target.value)}
                  className="flex-grow p-2 border rounded"
                  placeholder="e.g. Achieve 15% increase in daily active users"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && newKeyResult.trim()) {
                      addKeyResult();
                      e.preventDefault();
                    }
                  }}
                />
                <button
                  className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                  onClick={addKeyResult}
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Add measurable results to track progress
            </p>
          </div>
          <button
            onClick={addOKR}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save OKR
          </button>
        </div>
      </Modal>
    );
  };

  // Power Analyzer Modal
  const renderPowerAnalyzerModal = () => {
    if (!showPowerModal) return null;

    return (
      <Modal
        isOpen={showPowerModal}
        onClose={() => setShowPowerModal(false)}
        title="Statistical Power Analyzer"
        size="md"
      >
        <PowerCalculator
          onCalculate={(result) => {
            // In a real app, this would do something with the result
            console.log("Power calculation result:", result);
          }}
        />
      </Modal>
    );
  };

  // AI Prompt Modal
  const renderAIPromptModal = () => {
    if (!showAIPromptModal) return null;

    return (
      <Modal
        isOpen={showAIPromptModal}
        onClose={() => setShowAIPromptModal(false)}
        title={`AI ${
          aiPromptPurpose.charAt(0).toUpperCase() + aiPromptPurpose.slice(1)
        } Assistant`}
        size="lg"
      >
        {!aiResponse ? (
          // <AIPromptInterface
          //   onSubmit={handleAIPromptSubmit}
          //   placeholder={
          //     aiPromptPurpose === "hypothesis"
          //       ? "Describe your experiment idea or context..."
          //       : aiPromptPurpose === "analysis"
          //       ? "What would you like to know about this experiment?"
          //       : aiPromptPurpose === "learningAgenda"
          //       ? "What do you want to learn from this experiment?"
          //       : aiPromptPurpose === "successCriteria"
          //       ? "What metrics matter most for your experiment?"
          //       : "How can I help with your experiment?"
          //   }
          //   isLoading={isGeneratingAI}
          //   buttonText={
          //     aiPromptPurpose === "hypothesis"
          //       ? "Generate Hypothesis"
          //       : aiPromptPurpose === "analysis"
          //       ? "Analyze Results"
          //       : aiPromptPurpose === "learningAgenda"
          //       ? "Generate Learning Agenda"
          //       : aiPromptPurpose === "successCriteria"
          //       ? "Generate Success Criteria"
          //       : "Generate"
          //   }
          // />
          <div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
              <h4 className="text-sm font-medium text-purple-800 mb-2">
                AI Assistant Context
              </h4>
              <p className="text-sm text-purple-700">
                {aiPromptContext.name
                  ? `Working with: "${aiPromptContext.name}"`
                  : "Creating a new experiment"}
                {aiPromptContext.category
                  ? ` in the ${aiPromptContext.category} category`
                  : ""}
                {aiPromptContext.primaryMetric
                  ? `, measuring ${aiPromptContext.primaryMetric}`
                  : ""}
                {aiPromptContext.improvement !== undefined
                  ? `, with ${aiPromptContext.improvement}% impact (p=${aiPromptContext.significance})`
                  : ""}
              </p>
            </div>

            <AIPromptInterface
              onSubmit={handleAIPromptSubmit}
              initialPrompt={aiPromptContext.suggestedPrompt || ""}
              placeholder={
                aiPromptPurpose === "hypothesis"
                  ? "Describe your experiment idea or context..."
                  : aiPromptPurpose === "analysis"
                  ? "What would you like to know about this experiment?"
                  : aiPromptPurpose === "learningAgenda"
                  ? "What do you want to learn from this experiment?"
                  : aiPromptPurpose === "successCriteria"
                  ? "What metrics matter most for your experiment?"
                  : "How can I help with your experiment?"
              }
              isLoading={isGeneratingAI}
              buttonText={
                aiPromptPurpose === "hypothesis"
                  ? "Generate Hypothesis"
                  : aiPromptPurpose === "analysis"
                  ? "Analyze Results"
                  : aiPromptPurpose === "learningAgenda"
                  ? "Generate Learning Agenda"
                  : aiPromptPurpose === "successCriteria"
                  ? "Generate Success Criteria"
                  : "Generate"
              }
            />
          </div>
        ) : (
          <div className="space-y-4">
            <AIResponseDisplay
              response={aiResponse}
              title={
                aiPromptPurpose === "hypothesis"
                  ? "AI-Generated Hypothesis"
                  : aiPromptPurpose === "analysis"
                  ? "AI Analysis"
                  : aiPromptPurpose === "learningAgenda"
                  ? "AI-Generated Learning Agenda"
                  : aiPromptPurpose === "successCriteria"
                  ? "AI-Generated Success Criteria"
                  : "AI Response"
              }
            />

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAIPromptModal(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Apply the AI response to the appropriate field
                  if (aiPromptPurpose === "hypothesis") {
                    setWizardData((prev) => ({
                      ...prev,
                      hypothesis: aiResponse,
                    }));
                  } else if (aiPromptPurpose === "analysis") {
                    setExperiments((prev) =>
                      prev.map((e) =>
                        e.id === aiPromptContext.id
                          ? { ...e, aiAnalysis: aiResponse }
                          : e
                      )
                    );

                    if (
                      selectedExperiment &&
                      selectedExperiment.id === aiPromptContext.id
                    ) {
                      setSelectedExperiment((prev) => ({
                        ...prev,
                        aiAnalysis: aiResponse,
                      }));
                    }
                  } else if (aiPromptPurpose === "learningAgenda") {
                    setWizardData((prev) => ({
                      ...prev,
                      learningAgenda: aiResponse,
                    }));
                  } else if (aiPromptPurpose === "successCriteria") {
                    setWizardData((prev) => ({
                      ...prev,
                      successCriteria: aiResponse,
                    }));
                  }

                  setShowAIPromptModal(false);
                  showToast("AI suggestion applied", "success");
                }}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Apply Suggestion
              </button>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  // Report Modal
  const renderReportModal = () => {
    if (!showReportModal) return null;

    return (
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Experiment Report"
        size="lg"
      >
        <div className="bg-gray-50 p-4 rounded border font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96">
          {experimentReport}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowReportModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    );
  };

  // Advanced Search Modal
  const renderAdvancedSearchModal = () => {
    if (!showAdvancedSearchModal) return null;

    return (
      <Modal
        isOpen={showAdvancedSearchModal}
        onClose={() => setShowAdvancedSearchModal(false)}
        title="Advanced Search"
        size="lg"
      >
        <div className="space-y-4">
          <FormField
            label="Search Term"
            placeholder="Enter search term..."
            type="text"
          />

          <FormGroup title="Search In">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="search-planning"
                  defaultChecked
                  className="mr-2"
                />
                <label htmlFor="search-planning" className="text-sm">
                  Planning
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="search-reviews"
                  defaultChecked
                  className="mr-2"
                />
                <label htmlFor="search-reviews" className="text-sm">
                  Reviews
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="search-experiments"
                  defaultChecked
                  className="mr-2"
                />
                <label htmlFor="search-experiments" className="text-sm">
                  Experiments
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="search-knowledge"
                  defaultChecked
                  className="mr-2"
                />
                <label htmlFor="search-knowledge" className="text-sm">
                  Knowledge
                </label>
              </div>
            </div>
          </FormGroup>

          <FormGroup title="Filter By">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Status"
                type="select"
                options={[
                  { value: "", label: "All Statuses" },
                  { value: "in_progress", label: "In Progress" },
                  { value: "completed", label: "Completed" },
                  { value: "paused", label: "Paused" },
                  { value: "draft", label: "Draft" },
                ]}
              />

              <FormField
                label="Category"
                type="select"
                options={[
                  { value: "", label: "All Categories" },
                  { value: "monetization", label: "Monetization" },
                  { value: "engagement", label: "Engagement" },
                  { value: "satisfaction", label: "User Satisfaction" },
                ]}
              />

              <FormField
                label="Date Range"
                type="select"
                options={[
                  { value: "", label: "All Time" },
                  { value: "thisMonth", label: "This Month" },
                  { value: "thisQuarter", label: "This Quarter" },
                  { value: "thisYear", label: "This Year" },
                  { value: "custom", label: "Custom Range" },
                ]}
              />

              <FormField
                label="Owner"
                type="text"
                placeholder="Enter owner name..."
              />
            </div>
          </FormGroup>

          <FormGroup title="Advanced Options">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Metrics"
                type="multiselect"
                options={[
                  { value: "conversion", label: "Conversion Rate" },
                  { value: "engagement", label: "Engagement" },
                  { value: "retention", label: "Retention" },
                  { value: "revenue", label: "Revenue" },
                ]}
                value={[]}
              />
              // Continue from the FormField for Tags in
              renderAdvancedSearchModal
              <FormField
                label="Tags"
                type="text"
                placeholder="Enter tags (comma separated)..."
              />
            </div>

            <div className="mt-3">
              <FormField
                label="Results"
                type="select"
                options={[
                  { value: "", label: "All Results" },
                  { value: "positive", label: "Positive Results" },
                  { value: "negative", label: "Negative Results" },
                  { value: "significant", label: "Statistically Significant" },
                  {
                    value: "not_significant",
                    label: "Not Statistically Significant",
                  },
                ]}
              />
            </div>
          </FormGroup>

          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
              onClick={() => setShowAdvancedSearchModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                showToast(
                  "Advanced search functionality would execute here",
                  "info"
                );
                setShowAdvancedSearchModal(false);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  // Add this component definition
  const RelatedExperiments = ({ experimentIds, onViewExperiment }) => {
    if (!experimentIds || experimentIds.length === 0) return null;

    return (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Related Experiments
        </h4>
        <div className="space-y-2">
          {experimentIds.map((expId) => {
            const exp = experiments.find((e) => e.id === expId);
            if (!exp) return null;

            return (
              <div
                key={expId}
                className="flex items-center p-2 bg-gray-50 rounded border hover:bg-gray-100 cursor-pointer"
                onClick={() => onViewExperiment(exp)}
              >
                <span className="mr-2">🧪</span>
                <div className="flex-grow">
                  <div className="font-medium text-sm">{exp.name}</div>
                  <div className="text-xs text-gray-500">
                    {exp.category} • {exp.startDate}
                  </div>
                </div>
                <div
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    exp.improvement > 0
                      ? "bg-green-100 text-green-700"
                      : exp.improvement < 0
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {exp.improvement !== undefined
                    ? (exp.improvement > 0 ? "+" : "") + exp.improvement + "%"
                    : "No data"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Wizard Component
  const renderWizard = () => {
    if (!showWizard) return null;

    const wizardSteps = [
      {
        title: "Basics",
        component: WizardBasicInfoStep,
        initialData: {
          name: "",
          category: "",
          startDate: "",
          endDate: "",
          owner: "",
          team: [],
        },
      },
      {
        title: "Goals & Metrics",
        component: WizardGoalsMetricsStep,
        initialData: {
          goal: "",
          primaryMetric: "",
          audiences: [],
          hypothesis: "",
          successCriteria: "",
          learningAgenda: "",
          baselineRate: 2.5,
          minimumEffect: 10,
        },
      },
      {
        title: "Variants",
        component: WizardVariantsStep,
        initialData: {
          control: {},
          treatment: {},
          allocation: { Control: 50, Treatment: 50 },
        },
      },
      {
        title: "Review",
        component: WizardReviewStep,
        initialData: {
          notes: "",
        },
      },
    ];

    return (
      <Modal
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        title="Create New Experiment Brief"
        size="xl"
      >
        <Wizard
          steps={wizardSteps}
          onComplete={handleWizardFinalSubmit}
          initialStep={0}
        />
      </Modal>
    );
  };

  // Main Application Render
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      {renderHeader()}

      {/* Tab Navigation */}
      {renderNavigation()}

      {/* Main Content */}
      <main>
        {activeTab === "planning" && renderPlanningTab()}
        {activeTab === "reviews" && renderReviewsTab()}
        {activeTab === "experiments" && renderExperimentsTab()}
        {activeTab === "knowledge" && renderKnowledgeTab()}
      </main>

      {/* Modals */}
      {renderPowerAnalyzerModal()}
      {renderLearningPathModal()}
      {renderOKRModal()}
      {renderKnowledgeDetailsModal()}
      {renderApplyInsightsModal()}
      {renderWizard()}
      {renderReportModal()}
      {renderAdvancedSearchModal()}
      {renderAIPromptModal()}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mr-3"></div>
            <p className="text-gray-700">{loadingMessage || "Loading..."}</p>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg border max-w-md z-50 flex items-start ${
            toast.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : toast.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : toast.type === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <span className="mr-2 font-bold">
            {toast.type === "success"
              ? "✓"
              : toast.type === "error"
              ? "✗"
              : toast.type === "warning"
              ? "⚠"
              : "ℹ"}
          </span>
          <p className="flex-1">{toast.message}</p>
          <button
            className="ml-4 text-gray-500 hover:text-gray-700"
            onClick={() => setToast(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
