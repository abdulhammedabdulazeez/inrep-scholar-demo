# 🏛️ InRep Scholar - University Repository Platform

A modern, no-code institutional repository platform designed specifically for African universities. Built with Next.js 15, TypeScript, and Tailwind CSS.

![InRep Scholar Demo](https://github.com/abdulhammedabdulazeez/inrep-scholar-demo)

## 🌟 Features

### ✨ **Complete Academic Workflow**
- **Document Upload** - Multi-step submission with automatic abstract extraction
- **Plagiarism Detection** - Automated similarity checking with configurable thresholds
- **Peer Review System** - Smart reviewer assignment and deadline tracking
- **DOI Assignment** - Integration with DataCite for persistent identifiers
- **Scholar AI Chat** - Interactive research assistant for document exploration

### 🎓 **Multi-Tenant Architecture**
- University-specific subdomains (e.g., `ur.inrepscholar.com`)
- Custom branding and themes per institution
- Role-based access control (Guest, User, Admin)
- Faculty and department organization

### 🌐 **Access Control & Discovery**
- **Open Access** - Public research discovery
- **Restricted Access** - University community only
- **Private Access** - Author and admin only
- Guest browsing with metadata visibility

### 📊 **Administrative Tools**
- Document management and bulk operations
- User management with role assignment
- Review workflow automation
- Analytics and reporting dashboards
- Repository configuration settings

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/inrep-scholar-demo.git
cd inrep-scholar-demo

# Install dependencies
bun install

# Start development server
bun dev
```

### Access the Demo

- **Repository Home**: http://localhost:3000/demo/alu 
- **Admin Dashboard**: http://localhost:3000/demo/alu/admin
- **User Dashboard**: http://localhost:3000/demo/alu/user
- **Global Platform**: http://localhost:3000 or https://inrep-scholar-demo.vercel.app/

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js 15 App Router
│   ├── demo/alu/                 # African Leadership University Demo
│   │   ├── admin/               # Admin-specific pages
│   │   ├── user/                # User-specific pages
│   │   ├── documents/           # Document management
│   │   └── search/              # Search functionality
│   ├── register/                # University registration
│   └── page.tsx                 # Global homepage
├── components/                   # Reusable components
│   └── layout/                  # Layout components
└── lib/                         # Utilities and helpers
```

## 📱 Demo Pages Implemented

### **High Priority (Complete)**
- ✅ Tenant Home - Repository overview and search
- ✅ Search Results - Advanced filtering and access control
- ✅ Document Landing - Full document details with Scholar AI
- ✅ Document Upload - Multi-step submission workflow
- ✅ Admin Dashboard - Administrative hub
- ✅ Document Management - Admin document control
- ✅ Reviewer Assignment - Automated review workflows

### **Medium Priority (Complete)**
- ✅ User Dashboard - Personal document management
- ✅ My Documents - User document library
- ✅ Review Tasks - Reviewer interface and workflows
- ✅ Tenant Registration - University onboarding

### **Additional Features**
- ✅ User Profile Management
- ✅ Collaboration Hub
- ✅ Admin User Management
- ✅ Repository Settings

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Bun
- **Linting**: Biome
- **Deployment**: Deployment-ready

## 🌍 Multi-Tenant Demo

The platform demonstrates multi-tenant functionality with the African Leadership University repository:

- **Public Access**: Browse open access research
- **User Access**: Upload documents, manage submissions
- **Admin Access**: Full repository management
- **Reviewer Access**: Peer review workflows

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TENANT_DOMAIN=ur.inrepscholar.com

# Features (for future implementation)
NEXT_PUBLIC_ENABLE_PLAGIARISM_CHECK=true
NEXT_PUBLIC_ENABLE_DOI_ASSIGNMENT=true
NEXT_PUBLIC_ENABLE_SCHOLAR_AI=true
```

### Deployment
Deployed on vercel - inrep-scholar-demo.vercel.app/
Pilot Testing (ALU ADMIN LOGIN Details) -
    mail - alu@admin.com
    password - Password12


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌍 About InRep Scholar

InRep Scholar is designed specifically for African universities to manage their institutional research outputs. The platform addresses the unique challenges of low-resource environments while providing world-class repository functionality.

**Built for African universities, by African technologists.**
# Fix: Add missing @radix-ui/react-label dependency
