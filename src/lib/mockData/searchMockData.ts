import { DocumentListResponse, DocumentDetail } from "@/lib/documentTypes";

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

// Mock documents data
const mockDocuments: DocumentDetail[] = [
  {
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
        "This research explores machine learning applications in agricultural yield prediction using satellite imagery, weather data, and historical crop yield information. The study focuses on developing predictive models for maize and bean production in Rwanda's diverse agro-ecological zones.",
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
    comments: [],
    reviews: [],
  },
  {
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
        "This study investigates deep learning frameworks for NLP in Kinyarwanda, exploring transformer-based models for text classification, sentiment analysis, and machine translation. The research addresses the challenges of low-resource language processing.",
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
    comments: [],
    reviews: [],
  },
  {
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
        "This research examines smart grid implementation for rural electrification, focusing on renewable energy integration, demand response systems, and grid stability in Rwanda's rural communities.",
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
    reviews: [],
  },
  {
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
        "This research explores the intersection of SDGs and youth entrepreneurship, analyzing how young entrepreneurs in East Africa are addressing social and environmental challenges through innovative business models.",
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
    comments: [],
    reviews: [],
  },
  {
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
        "Analysis of blockchain implementation opportunities in Rwanda's emerging fintech ecosystem, focusing on digital payments, remittances, and financial inclusion for underserved populations.",
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
    comments: [],
    reviews: [],
  },
  {
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
        "A comprehensive study on IoT sensor deployment for precision agriculture in Rwandan farming systems, including soil monitoring, crop health assessment, and automated irrigation systems.",
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
    reviews: [],
  },
  {
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
        "Analysis of climate adaptation strategies implemented by smallholder farmers in rural Rwanda, including drought-resistant crops, water conservation techniques, and community-based adaptation programs.",
      is_public: false,
      is_read_only: false,
      doi_link: undefined,
      plagiarism_score: null,
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
  {
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
        "Examination of cybersecurity challenges facing Rwanda's digital transformation initiatives, including government services, financial systems, and critical infrastructure protection.",
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
    comments: [],
    reviews: [],
  },
  {
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
        "Study of digital payment systems and their impact on financial inclusion in East Africa, focusing on mobile money adoption, regulatory frameworks, and economic empowerment.",
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
    comments: [],
    reviews: [],
  },
  {
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
        "Exploration of AI applications in healthcare for rural Rwanda, including diagnostic tools, telemedicine platforms, and predictive analytics for disease prevention.",
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
    reviews: [],
  },
];

// Mock search function that simulates backend filtering
export function mockSearchDocuments(filters: any): DocumentListResponse {
  let filteredResults = [...mockDocuments];

  // Filter by keywords
  if (filters.keywords) {
    const keywords = filters.keywords.toLowerCase();
    filteredResults = filteredResults.filter(
      (doc) =>
        doc.document.title.toLowerCase().includes(keywords) ||
        doc.document.author.toLowerCase().includes(keywords) ||
        doc.document.abstract?.toLowerCase().includes(keywords) ||
        doc.faculty?.name.toLowerCase().includes(keywords) ||
        doc.department?.name.toLowerCase().includes(keywords)
    );
  }

  // Filter by faculty
  if (filters.faculty_ids && filters.faculty_ids.length > 0) {
    filteredResults = filteredResults.filter((doc) =>
      filters.faculty_ids.includes(doc.document.faculty_id)
    );
  }

  // Filter by document type (simplified - using status as proxy)
  if (filters.document_types && filters.document_types.length > 0) {
    filteredResults = filteredResults.filter((doc) =>
      filters.document_types.includes(doc.document.status)
    );
  }

  // Filter by access type
  if (filters.access_types && filters.access_types.length > 0) {
    filteredResults = filteredResults.filter((doc) => {
      const accessType = doc.document.is_public
        ? doc.document.is_read_only
          ? "restricted"
          : "open"
        : "private";
      return filters.access_types.includes(accessType);
    });
  }

  // Sort results
  if (filters.sort_by) {
    filteredResults.sort((a, b) => {
      switch (filters.sort_by) {
        case "title":
          return filters.sort_order === "asc"
            ? a.document.title.localeCompare(b.document.title)
            : b.document.title.localeCompare(a.document.title);
        case "created_at":
          return filters.sort_order === "asc"
            ? new Date(a.document.created_at).getTime() -
                new Date(b.document.created_at).getTime()
            : new Date(b.document.created_at).getTime() -
                new Date(a.document.created_at).getTime();
        case "download_count":
          return filters.sort_order === "asc"
            ? a.download_count - b.download_count
            : b.download_count - a.download_count;
        case "view_count":
          return filters.sort_order === "asc"
            ? a.view_count - b.view_count
            : b.view_count - a.view_count;
        default:
          return 0;
      }
    });
  }

  // Pagination
  const page = filters.page || 1;
  const pageSize = filters.page_size || 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  return {
    results: paginatedResults,
    total: filteredResults.length,
    page: page,
    page_size: pageSize,
    pages: Math.ceil(filteredResults.length / pageSize),
  };
}

// Export the mock data for direct use
export { mockDocuments };
