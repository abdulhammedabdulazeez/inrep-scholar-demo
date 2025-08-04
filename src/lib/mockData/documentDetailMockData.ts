import { DocumentDetail } from "@/lib/documentTypes";

// Mock faculty data
const faculties = [
  {
    faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
    name: "Computer Science",
  },
  {
    faculty_id: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
    name: "Bachelor of Entrepreneurial Leadership (BEL)",
  },
];

// Mock department data
const departments = [
  {
    department_id: "77ff206a-7fef-482f-9541-92627628b812",
    name: "Bsc Software Engineering",
    faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
  },
  {
    department_id: "8d625ca9-d146-4ddf-a2fa-0187154609b5",
    name: "Computer Science",
    faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
  },
  {
    department_id: "e43c0873-505d-4686-a772-d2bc00679a20",
    name: "Global Challenges",
    faculty_id: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
  },
  {
    department_id: "fee5b4f6-18f3-482b-b1f7-591f29805952",
    name: "International Business Trade (IBT)",
    faculty_id: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
  },
];

// Mock document details data
const mockDocumentDetails: Record<string, DocumentDetail> = {
  "doc-001": {
    document: {
      document_id: "doc-001",
      tenant_id: "tenant-alu",
      author: "Marie Uwimana",
      faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
      department_id: "8d625ca9-d146-4ddf-a2fa-0187154609b5",
      title:
        "Machine Learning Applications in Agricultural Yield Prediction for Rwanda",
      file_url: "/documents/doc-001.pdf",
      status: "published",
      abstract:
        "This research explores machine learning applications in agricultural yield prediction using satellite imagery, weather data, and historical crop yield information. The study focuses on developing predictive models for maize and bean production in Rwanda's diverse agro-ecological zones. The research employs various machine learning algorithms including Random Forest, Support Vector Machines, and Neural Networks to predict crop yields based on environmental factors, soil conditions, and historical data. Results show significant improvements in prediction accuracy compared to traditional methods, with potential applications for food security and sustainable agriculture in the region. The study also examines the integration of IoT sensors and real-time data collection for enhanced prediction capabilities.",
      is_public: true,
      is_read_only: false,
      doi_link: "10.12345/ur.thesis.2024.001",
      plagiarism_score: 8.2,
      created_at: "2024-05-10T00:00:00Z",
      updated_at: "2024-05-20T00:00:00Z",
    },
    faculty: faculties[0],
    department: departments[1],
    download_count: 245,
    view_count: 1089,
    comments: [
      {
        comment_id: "comment-001",
        document_id: "doc-001",
        user_id: "dr_johnson",
        content:
          "This is a very well-researched paper with excellent methodology. The machine learning approach to agricultural yield prediction is innovative and has great potential for improving food security in Rwanda. The integration of satellite imagery with traditional agricultural data is particularly noteworthy.",
        created_at: "2024-05-15T10:30:00Z",
      },
      {
        comment_id: "comment-002",
        document_id: "doc-001",
        user_id: "prof_williams",
        content:
          "I found the section on Random Forest algorithms particularly interesting. The comparison with traditional methods is well-documented. The practical applications for smallholder farmers are well-articulated. Great work!",
        created_at: "2024-05-16T14:20:00Z",
      },
      {
        comment_id: "comment-003",
        document_id: "doc-001",
        user_id: "sarah_smith",
        content:
          "The methodology is sound and the results are promising. I would be interested in seeing how this could be scaled to other regions in East Africa. The focus on local context is excellent.",
        created_at: "2024-05-18T09:15:00Z",
      },
    ],
    reviews: [
      {
        document_review_id: "review-001",
        document_id: "doc-001",
        reviewer_id: "dr_johnson",
        status: "approved",
        assigned_at: "2024-05-12T09:00:00Z",
        due_date: "2024-05-25T17:00:00Z",
        created_at: "2024-05-15T16:45:00Z",
        updated_at: "2024-05-18T11:30:00Z",
      },
      {
        document_review_id: "review-002",
        document_id: "doc-001",
        reviewer_id: "prof_williams",
        status: "approved",
        assigned_at: "2024-05-12T09:00:00Z",
        due_date: "2024-05-25T17:00:00Z",
        created_at: "2024-05-16T14:20:00Z",
        updated_at: "2024-05-17T10:15:00Z",
      },
    ],
  },
  "doc-002": {
    document: {
      document_id: "doc-002",
      tenant_id: "tenant-alu",
      author: "Dr. Jean Mukiza",
      faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
      department_id: "8d625ca9-d146-4ddf-a2fa-0187154609b5",
      title:
        "Deep Learning Frameworks for Natural Language Processing in Kinyarwanda",
      file_url: "/documents/doc-002.pdf",
      status: "published",
      abstract:
        "This study investigates deep learning frameworks for NLP in Kinyarwanda, exploring transformer-based models for text classification, sentiment analysis, and machine translation. The research addresses the challenges of low-resource language processing and develops novel approaches for handling the unique linguistic features of Kinyarwanda. The study evaluates various transformer architectures including BERT, GPT, and custom models adapted for African languages. Results demonstrate significant improvements in text processing accuracy and provide a foundation for future NLP research in indigenous African languages.",
      is_public: true,
      is_read_only: false,
      doi_link: "10.12345/ur.article.2024.002",
      plagiarism_score: 5.1,
      created_at: "2024-04-18T00:00:00Z",
      updated_at: "2024-04-28T00:00:00Z",
    },
    faculty: faculties[0],
    department: departments[1],
    download_count: 189,
    view_count: 756,
    comments: [
      {
        comment_id: "comment-004",
        document_id: "doc-002",
        user_id: "nlp_researcher",
        content:
          "Excellent work on low-resource language processing! The adaptation of transformer models for Kinyarwanda is innovative. This could serve as a model for other African languages.",
        created_at: "2024-04-25T11:20:00Z",
      },
    ],
    reviews: [
      {
        document_review_id: "review-003",
        document_id: "doc-002",
        reviewer_id: "nlp_expert",
        status: "approved",
        assigned_at: "2024-04-20T09:00:00Z",
        due_date: "2024-04-30T17:00:00Z",
        created_at: "2024-04-25T14:30:00Z",
        updated_at: "2024-04-26T10:15:00Z",
      },
    ],
  },
  "doc-003": {
    document: {
      document_id: "doc-003",
      tenant_id: "tenant-alu",
      author: "Pierre Nkurunziza",
      faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
      department_id: "77ff206a-7fef-482f-9541-92627628b812",
      title: "Smart Grid Implementation for Rural Electrification in Rwanda",
      file_url: "/documents/doc-003.pdf",
      status: "under_review",
      abstract:
        "This research examines smart grid implementation for rural electrification, focusing on renewable energy integration, demand response systems, and grid stability in Rwanda's rural communities. The study analyzes the technical and economic feasibility of smart grid technologies in developing rural areas and proposes a comprehensive framework for implementation.",
      is_public: true,
      is_read_only: true,
      doi_link: undefined,
      plagiarism_score: 12.4,
      created_at: "2024-06-02T00:00:00Z",
      updated_at: "2024-06-02T00:00:00Z",
    },
    faculty: faculties[0],
    department: departments[0],
    download_count: 0,
    view_count: 34,
    comments: [],
    reviews: [
      {
        document_review_id: "review-004",
        document_id: "doc-003",
        reviewer_id: "energy_expert",
        status: "pending",
        assigned_at: "2024-06-05T09:00:00Z",
        due_date: "2024-06-15T17:00:00Z",
        created_at: "2024-06-05T09:00:00Z",
        updated_at: "2024-06-05T09:00:00Z",
      },
    ],
  },
  "doc-004": {
    document: {
      document_id: "doc-004",
      tenant_id: "tenant-alu",
      author: "Sarah Mutesi",
      faculty_id: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
      department_id: "e43c0873-505d-4686-a772-d2bc00679a20",
      title:
        "Sustainable Development Goals and Youth Entrepreneurship in East Africa",
      file_url: "/documents/doc-004.pdf",
      status: "published",
      abstract:
        "This research explores the intersection of SDGs and youth entrepreneurship, analyzing how young entrepreneurs in East Africa are addressing social and environmental challenges through innovative business models. The study examines case studies from Rwanda, Kenya, and Uganda, identifying best practices and policy recommendations for supporting youth-led sustainable enterprises.",
      is_public: true,
      is_read_only: false,
      doi_link: "10.12345/ur.article.2024.003",
      plagiarism_score: 3.8,
      created_at: "2024-03-15T00:00:00Z",
      updated_at: "2024-03-25T00:00:00Z",
    },
    faculty: faculties[1],
    department: departments[2],
    download_count: 156,
    view_count: 623,
    comments: [
      {
        comment_id: "comment-005",
        document_id: "doc-004",
        user_id: "social_entrepreneur",
        content:
          "This research provides valuable insights into how young people are driving sustainable development. The case studies are well-chosen and the policy recommendations are practical.",
        created_at: "2024-03-20T15:30:00Z",
      },
    ],
    reviews: [
      {
        document_review_id: "review-005",
        document_id: "doc-004",
        reviewer_id: "development_expert",
        status: "approved",
        assigned_at: "2024-03-18T09:00:00Z",
        due_date: "2024-03-28T17:00:00Z",
        created_at: "2024-03-22T14:20:00Z",
        updated_at: "2024-03-23T11:15:00Z",
      },
    ],
  },
  "doc-005": {
    document: {
      document_id: "doc-005",
      tenant_id: "tenant-alu",
      author: "David Niyonzima",
      faculty_id: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
      department_id: "fee5b4f6-18f3-482b-b1f7-591f29805952",
      title: "Blockchain Technology Applications in Rwanda's Financial Sector",
      file_url: "/documents/doc-005.pdf",
      status: "published",
      abstract:
        "Analysis of blockchain implementation opportunities in Rwanda's emerging fintech ecosystem, focusing on digital payments, remittances, and financial inclusion for underserved populations. The study examines regulatory frameworks, technical infrastructure requirements, and potential economic impacts.",
      is_public: true,
      is_read_only: false,
      doi_link: "10.12345/ur.thesis.2024.004",
      plagiarism_score: 7.2,
      created_at: "2024-02-20T00:00:00Z",
      updated_at: "2024-03-10T00:00:00Z",
    },
    faculty: faculties[1],
    department: departments[3],
    download_count: 203,
    view_count: 892,
    comments: [
      {
        comment_id: "comment-006",
        document_id: "doc-005",
        user_id: "fintech_expert",
        content:
          "Comprehensive analysis of blockchain applications in Rwanda's financial sector. The regulatory considerations are particularly well-addressed.",
        created_at: "2024-02-28T12:45:00Z",
      },
    ],
    reviews: [
      {
        document_review_id: "review-006",
        document_id: "doc-005",
        reviewer_id: "blockchain_expert",
        status: "approved",
        assigned_at: "2024-02-25T09:00:00Z",
        due_date: "2024-03-07T17:00:00Z",
        created_at: "2024-03-01T16:30:00Z",
        updated_at: "2024-03-02T10:20:00Z",
      },
    ],
  },
  "doc-006": {
    document: {
      document_id: "doc-006",
      tenant_id: "tenant-alu",
      author: "Grace Uwase",
      faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
      department_id: "8d625ca9-d146-4ddf-a2fa-0187154609b5",
      title: "IoT Sensors for Smart Agriculture in Rwanda",
      file_url: "/documents/doc-006.pdf",
      status: "under_review",
      abstract:
        "A comprehensive study on IoT sensor deployment for precision agriculture in Rwandan farming systems, including soil monitoring, crop health assessment, and automated irrigation systems. The research evaluates cost-effectiveness and scalability for smallholder farmers.",
      is_public: true,
      is_read_only: true,
      doi_link: undefined,
      plagiarism_score: 12.1,
      created_at: "2024-06-01T00:00:00Z",
      updated_at: "2024-06-01T00:00:00Z",
    },
    faculty: faculties[0],
    department: departments[1],
    download_count: 0,
    view_count: 12,
    comments: [],
    reviews: [
      {
        document_review_id: "review-007",
        document_id: "doc-006",
        reviewer_id: "iot_expert",
        status: "pending",
        assigned_at: "2024-06-03T09:00:00Z",
        due_date: "2024-06-13T17:00:00Z",
        created_at: "2024-06-03T09:00:00Z",
        updated_at: "2024-06-03T09:00:00Z",
      },
    ],
  },
  "doc-007": {
    document: {
      document_id: "doc-007",
      tenant_id: "tenant-alu",
      author: "Emmanuel Ndayisaba",
      faculty_id: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
      department_id: "e43c0873-505d-4686-a772-d2bc00679a20",
      title: "Climate Change Adaptation Strategies for Rwandan Farmers",
      file_url: "/documents/doc-007.pdf",
      status: "draft",
      abstract:
        "Analysis of climate adaptation strategies implemented by smallholder farmers in rural Rwanda, including drought-resistant crops, water conservation techniques, and community-based adaptation programs. The study examines both traditional and modern adaptation methods.",
      is_public: false,
      is_read_only: false,
      doi_link: undefined,
      plagiarism_score: undefined,
      created_at: "2024-06-15T00:00:00Z",
      updated_at: "2024-06-15T00:00:00Z",
    },
    faculty: faculties[1],
    department: departments[2],
    download_count: 0,
    view_count: 0,
    comments: [],
    reviews: [],
  },
  "doc-008": {
    document: {
      document_id: "doc-008",
      tenant_id: "tenant-alu",
      author: "Alice Mukamana",
      faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
      department_id: "77ff206a-7fef-482f-9541-92627628b812",
      title: "Cybersecurity Challenges in Rwanda's Digital Transformation",
      file_url: "/documents/doc-008.pdf",
      status: "published",
      abstract:
        "Examination of cybersecurity challenges facing Rwanda's digital transformation initiatives, including government services, financial systems, and critical infrastructure protection. The study provides recommendations for strengthening cybersecurity frameworks.",
      is_public: true,
      is_read_only: false,
      doi_link: "10.12345/ur.article.2024.005",
      plagiarism_score: 4.5,
      created_at: "2024-01-10T00:00:00Z",
      updated_at: "2024-01-20T00:00:00Z",
    },
    faculty: faculties[0],
    department: departments[0],
    download_count: 178,
    view_count: 445,
    comments: [
      {
        comment_id: "comment-007",
        document_id: "doc-008",
        user_id: "cybersecurity_expert",
        content:
          "Well-researched analysis of cybersecurity challenges in Rwanda. The recommendations are practical and actionable for policymakers.",
        created_at: "2024-01-15T14:20:00Z",
      },
    ],
    reviews: [
      {
        document_review_id: "review-008",
        document_id: "doc-008",
        reviewer_id: "security_expert",
        status: "approved",
        assigned_at: "2024-01-12T09:00:00Z",
        due_date: "2024-01-22T17:00:00Z",
        created_at: "2024-01-16T11:30:00Z",
        updated_at: "2024-01-17T09:15:00Z",
      },
    ],
  },
  "doc-009": {
    document: {
      document_id: "doc-009",
      tenant_id: "tenant-alu",
      author: "Robert Niyongabo",
      faculty_id: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
      department_id: "fee5b4f6-18f3-482b-b1f7-591f29805952",
      title: "Digital Payment Systems and Financial Inclusion in East Africa",
      file_url: "/documents/doc-009.pdf",
      status: "published",
      abstract:
        "Study of digital payment systems and their impact on financial inclusion in East Africa, focusing on mobile money adoption, regulatory frameworks, and economic empowerment. The research examines success factors and barriers to adoption.",
      is_public: true,
      is_read_only: false,
      doi_link: "10.12345/ur.thesis.2024.006",
      plagiarism_score: 6.8,
      created_at: "2024-04-05T00:00:00Z",
      updated_at: "2024-04-15T00:00:00Z",
    },
    faculty: faculties[1],
    department: departments[3],
    download_count: 134,
    view_count: 567,
    comments: [
      {
        comment_id: "comment-008",
        document_id: "doc-009",
        user_id: "fintech_researcher",
        content:
          "Excellent analysis of digital payment systems in East Africa. The comparative study across different countries provides valuable insights.",
        created_at: "2024-04-10T16:45:00Z",
      },
    ],
    reviews: [
      {
        document_review_id: "review-009",
        document_id: "doc-009",
        reviewer_id: "payment_expert",
        status: "approved",
        assigned_at: "2024-04-08T09:00:00Z",
        due_date: "2024-04-18T17:00:00Z",
        created_at: "2024-04-12T13:20:00Z",
        updated_at: "2024-04-13T10:30:00Z",
      },
    ],
  },
  "doc-010": {
    document: {
      document_id: "doc-010",
      tenant_id: "tenant-alu",
      author: "Chantal Uwimana",
      faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
      department_id: "8d625ca9-d146-4ddf-a2fa-0187154609b5",
      title:
        "Artificial Intelligence in Healthcare: Applications for Rural Rwanda",
      file_url: "/documents/doc-010.pdf",
      status: "under_review",
      abstract:
        "Exploration of AI applications in healthcare for rural Rwanda, including diagnostic tools, telemedicine platforms, and predictive analytics for disease prevention. The study examines feasibility and implementation challenges.",
      is_public: true,
      is_read_only: true,
      doi_link: undefined,
      plagiarism_score: 9.3,
      created_at: "2024-05-25T00:00:00Z",
      updated_at: "2024-05-25T00:00:00Z",
    },
    faculty: faculties[0],
    department: departments[1],
    download_count: 0,
    view_count: 28,
    comments: [],
    reviews: [
      {
        document_review_id: "review-010",
        document_id: "doc-010",
        reviewer_id: "healthcare_ai_expert",
        status: "pending",
        assigned_at: "2024-05-28T09:00:00Z",
        due_date: "2024-06-07T17:00:00Z",
        created_at: "2024-05-28T09:00:00Z",
        updated_at: "2024-05-28T09:00:00Z",
      },
    ],
  },
};

// Mock function to get document details
export function mockGetDocumentDetails(
  documentId: string
): DocumentDetail | null {
  return mockDocumentDetails[documentId] || null;
}

// Export the mock data for direct use
export { mockDocumentDetails };
