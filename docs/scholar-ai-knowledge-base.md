# Scholar AI Knowledge Base
## African Leadership University Document Repository - Admin Guide

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Admin Dashboard](#admin-dashboard)
3. [Document Management](#document-management)
4. [User Management](#user-management)
5. [Review System](#review-system)
6. [Settings & Configuration](#settings--configuration)
7. [Analytics & Reports](#analytics--reports)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## System Overview

### What is the Document Repository?
The African Leadership University Document Repository is a comprehensive digital platform for managing academic research, theses, and scholarly publications. It provides secure storage, version control, and collaborative review processes for academic documents.

### Key Features
- **Multi-tenant Architecture**: Each university has its own isolated environment
- **Role-based Access Control**: Admin, Regular User, Reviewer, and Guest roles
- **Document Lifecycle Management**: From draft to published status
- **Plagiarism Detection**: Integrated similarity checking
- **DOI Assignment**: Automatic Digital Object Identifier generation
- **Analytics Dashboard**: Comprehensive usage and performance metrics

### System Architecture
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: FastAPI with Python
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: Supabase Auth
- **File Storage**: Cloud-based document storage
- **AI Integration**: Langflow for intelligent assistance

---

## Admin Dashboard

### Dashboard Overview
The admin dashboard provides a centralized view of all repository activities and key metrics.

### Key Metrics Displayed
1. **Total Documents**: Complete count of all documents in the repository
2. **Active Users**: Number of registered users actively using the system
3. **Pending Reviews**: Documents awaiting review assignment or completion
4. **Monthly Downloads**: Total document downloads for the current month

### Quick Actions Available
- **Upload Document**: Direct link to document upload functionality
- **Manage Users**: Access user management interface
- **Review Queue**: View and manage pending reviews
- **Analytics**: Access detailed performance reports

### Recent Activity Feed
- New document uploads
- Completed reviews
- DOI assignments
- User registrations
- System notifications

---

## Document Management

### Document Types Supported
- **Master's Theses**: Graduate-level research papers
- **PhD Dissertations**: Doctoral research documents
- **Research Articles**: Academic journal submissions
- **Conference Papers**: Presentation materials
- **Technical Reports**: Research findings and analysis

### Document Statuses
1. **Draft**: Initial upload, not yet submitted for review
2. **Under Review**: Assigned to reviewers for evaluation
3. **Pending Plagiarism Check**: Awaiting similarity analysis
4. **Pending DOI**: Ready for Digital Object Identifier assignment
5. **Published**: Available to all users with appropriate access
6. **Rejected**: Requires revision before resubmission

### Bulk Import Process
1. **Prepare Documents**: Ensure all files are in PDF format
2. **Create ZIP Archive**: Compress documents following naming convention
3. **Upload via Admin Interface**: Use bulk import feature in Documents section
4. **Review Import Results**: Check for any failed uploads or errors
5. **Assign Metadata**: Add titles, authors, and other required information

### Document Naming Convention
Format: `Title_Author_Year.pdf`
Example: `Machine_Learning_Agriculture_Rwanda_Marie_Uwimana_2024.pdf`

### Access Rights Configuration
- **Open Access**: Available to all authenticated users
- **Restricted**: Limited to specific user groups or departments
- **Private**: Only accessible to authors and administrators

---

## User Management

### User Roles and Permissions

#### Admin Role
- **Full system access**: All features and functions
- **User management**: Create, edit, and delete user accounts
- **Document oversight**: Approve, reject, and manage all documents
- **System configuration**: Modify settings and preferences
- **Analytics access**: View comprehensive reports and metrics

#### Regular User Role
- **Document upload**: Submit research papers and theses
- **Profile management**: Update personal information
- **Document viewing**: Access published documents based on permissions
- **Comment system**: Provide feedback on documents

#### Reviewer Role
- **Review assignments**: Receive and complete document reviews
- **Feedback submission**: Provide detailed evaluation comments
- **Status updates**: Mark reviews as complete or request revisions
- **Quality assurance**: Ensure academic standards are maintained

#### Guest Role
- **Limited access**: View only open-access documents
- **No upload permissions**: Cannot submit new documents
- **Basic search**: Use repository search functionality

### User Registration Process
1. **Email Verification**: Users receive confirmation emails
2. **Profile Completion**: Required information collection
3. **Role Assignment**: Automatic or admin-assigned roles
4. **Faculty/Department Assignment**: Academic unit association
5. **Access Activation**: Account becomes fully functional

### User Profile Management
- **Personal Information**: Name, email, contact details
- **Academic Affiliation**: Faculty, department, position
- **Research Interests**: Keywords for document matching
- **Notification Preferences**: Email and system alerts
- **Privacy Settings**: Data sharing and visibility options

---

## Review System

### Review Assignment Process
1. **Document Submission**: Author uploads completed document
2. **Admin Review**: Administrator evaluates initial submission
3. **Reviewer Selection**: Assign appropriate reviewers based on expertise
4. **Notification**: Reviewers receive assignment notifications
5. **Review Completion**: Reviewers submit evaluations and feedback
6. **Decision Making**: Admin makes final publication decision

### Review Criteria
- **Academic Quality**: Research methodology and findings
- **Writing Standards**: Clarity, grammar, and structure
- **Originality**: Plagiarism and citation accuracy
- **Relevance**: Alignment with academic standards
- **Technical Accuracy**: Data analysis and conclusions

### Review Status Tracking
- **Assigned**: Review task created and assigned
- **In Progress**: Reviewer actively working on evaluation
- **Completed**: Review submitted with feedback
- **Overdue**: Past due date, requires follow-up
- **Cancelled**: Review assignment withdrawn

### Review Feedback System
- **Structured Comments**: Predefined evaluation categories
- **Free-form Feedback**: Detailed written comments
- **Rating System**: Numerical scores for different aspects
- **Recommendation**: Accept, revise, or reject suggestions
- **Confidential Notes**: Private comments for administrators

---

## Settings & Configuration

### Repository Settings
- **University Information**: Name, logo, contact details
- **Academic Calendar**: Term dates and deadlines
- **Submission Policies**: Document requirements and guidelines
- **Review Guidelines**: Evaluation criteria and processes
- **Access Controls**: Permission levels and restrictions

### Notification System
- **Email Notifications**: Document status updates
- **System Alerts**: In-app notification center
- **Review Reminders**: Automated follow-up messages
- **Publication Announcements**: New document availability
- **Admin Alerts**: System issues and maintenance notices

### Branding and Appearance
- **University Logo**: Custom branding elements
- **Color Scheme**: Institution-specific styling
- **Welcome Messages**: Customized user greetings
- **Help Content**: Contextual assistance information
- **Footer Information**: Contact and support details

### Integration Settings
- **DOI Provider**: Digital Object Identifier configuration
- **Plagiarism Detection**: Similarity checking service setup
- **Email Service**: SMTP configuration for notifications
- **Storage Settings**: File upload limits and retention policies
- **Backup Configuration**: Data protection and recovery settings

---

## Analytics & Reports

### Document Analytics
- **Upload Trends**: Monthly submission patterns
- **Download Statistics**: Popular document tracking
- **View Metrics**: Page visit and engagement data
- **Faculty Performance**: Department-level activity reports
- **Author Productivity**: Individual researcher statistics

### User Activity Reports
- **Registration Trends**: New user sign-up patterns
- **Login Frequency**: User engagement metrics
- **Feature Usage**: Most-used system functions
- **Session Duration**: Time spent in the platform
- **Geographic Distribution**: User location analytics

### Review Performance Metrics
- **Review Completion Rates**: Timeliness of evaluations
- **Reviewer Workload**: Assignment distribution analysis
- **Quality Metrics**: Review consistency and thoroughness
- **Feedback Analysis**: Common review themes and issues
- **Decision Patterns**: Publication approval rates

### System Health Monitoring
- **Performance Metrics**: Response times and uptime
- **Error Tracking**: System issues and resolutions
- **Storage Usage**: Database and file storage consumption
- **Security Events**: Access attempts and violations
- **Backup Status**: Data protection verification

---

## Troubleshooting

### Common Issues and Solutions

#### Document Upload Problems
**Issue**: File upload fails
**Solution**: 
- Check file format (PDF only)
- Verify file size (max 50MB)
- Ensure stable internet connection
- Clear browser cache and retry

**Issue**: Metadata not saving
**Solution**:
- Complete all required fields
- Check for special characters in titles
- Verify author information format
- Refresh page and retry

#### User Access Issues
**Issue**: Cannot log in
**Solution**:
- Verify email and password
- Check account activation status
- Reset password if needed
- Contact admin for account issues

**Issue**: Permission denied errors
**Solution**:
- Verify user role assignments
- Check document access rights
- Confirm faculty/department settings
- Contact administrator for role updates

#### Review System Problems
**Issue**: Review assignments not appearing
**Solution**:
- Check notification settings
- Verify reviewer role assignment
- Refresh dashboard page
- Contact admin for manual assignment

**Issue**: Review feedback not saving
**Solution**:
- Complete all required fields
- Check internet connection
- Save draft before final submission
- Contact support if persistent

#### System Performance Issues
**Issue**: Slow page loading
**Solution**:
- Clear browser cache
- Check internet connection
- Try different browser
- Report to admin if persistent

**Issue**: Search not working
**Solution**:
- Check search term spelling
- Try different keywords
- Clear search filters
- Refresh page and retry

### Error Messages and Meanings

#### Authentication Errors
- **"Invalid credentials"**: Email or password incorrect
- **"Account not activated"**: Email verification required
- **"Session expired"**: Re-login required
- **"Access denied"**: Insufficient permissions

#### Upload Errors
- **"File too large"**: Exceeds 50MB limit
- **"Invalid format"**: Non-PDF file type
- **"Upload failed"**: Network or server issue
- **"Duplicate file"**: Same document already exists

#### Review Errors
- **"Review not found"**: Assignment may have been cancelled
- **"Already reviewed"**: Evaluation already submitted
- **"Deadline passed"**: Review period expired
- **"Permission denied"**: Role doesn't allow review access

---

## Best Practices

### Document Management Best Practices

#### For Administrators
1. **Regular Monitoring**: Check dashboard daily for new submissions
2. **Timely Reviews**: Assign reviewers within 48 hours of submission
3. **Quality Control**: Maintain consistent evaluation standards
4. **User Support**: Respond to user inquiries promptly
5. **System Maintenance**: Regular backup and performance monitoring

#### For Authors
1. **Format Compliance**: Follow PDF and naming conventions
2. **Complete Metadata**: Provide all required document information
3. **Quality Preparation**: Ensure documents are publication-ready
4. **Timely Responses**: Address review feedback promptly
5. **Proper Citations**: Include all necessary references

#### For Reviewers
1. **Thorough Evaluation**: Complete all review criteria
2. **Constructive Feedback**: Provide helpful, specific comments
3. **Timely Completion**: Meet review deadlines
4. **Confidentiality**: Maintain review process integrity
5. **Professional Communication**: Use appropriate tone in feedback

### Security Best Practices
1. **Strong Passwords**: Use complex, unique passwords
2. **Regular Updates**: Keep account information current
3. **Secure Access**: Log out from shared computers
4. **Data Protection**: Don't share login credentials
5. **Suspicious Activity**: Report unusual account behavior

### Performance Optimization
1. **File Size Management**: Optimize document file sizes
2. **Regular Cleanup**: Remove outdated or duplicate files
3. **Efficient Search**: Use specific keywords and filters
4. **Browser Compatibility**: Use supported web browsers
5. **Network Considerations**: Ensure stable internet connection

---

## Contact Information

### Technical Support
- **Email**: support@alu-repository.com
- **Phone**: +250 788 123 456
- **Hours**: Monday-Friday, 8:00 AM - 6:00 PM CAT

### Administrative Support
- **Email**: admin@alu-repository.com
- **Phone**: +250 788 123 457
- **Hours**: Monday-Friday, 9:00 AM - 5:00 PM CAT

### Emergency Contact
- **System Issues**: emergency@alu-repository.com
- **24/7 Hotline**: +250 788 123 458

---

## Version Information
- **Document Version**: 1.0
- **Last Updated**: December 2024
- **Next Review**: March 2025
- **System Version**: Repository v2.1.0

---

*This knowledge base is maintained by the African Leadership University IT Department and is regularly updated to reflect system changes and improvements.* 