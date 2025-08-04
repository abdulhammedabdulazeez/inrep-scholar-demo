# Admin Q&A Guide - Scholar AI Knowledge Base
## Practical How-To Questions and Answers for University Administrators

---

## Table of Contents
1. [User Management](#user-management)
2. [Document Operations](#document-operations)
3. [System Configuration](#system-configuration)
4. [Review Management](#review-management)
5. [Analytics & Reports](#analytics--reports)
6. [Troubleshooting](#troubleshooting)

---

## User Management

### Q: How do I add a new user to the system?
**A:** 
1. Go to **Admin > User Management**
2. Click the **"Add New User"** button
3. Fill in the required fields:
   - Email address
   - First name and last name
   - Role (admin, regular, reviewer)
   - Faculty/Department assignment
4. Click **"Create User"**
5. The user will receive an email invitation to set their password

### Q: How do I change a user's role from regular to admin?
**A:**
1. Navigate to **Admin > User Management**
2. Find the user in the list
3. Click the **"Edit"** button next to their name
4. In the dropdown, change their role from "Regular" to "Admin"
5. Click **"Save Changes"**
6. The user will need to log out and log back in for changes to take effect

### Q: How do I assign a user to a specific faculty?
**A:**
1. Go to **Admin > User Management**
2. Click **"Edit"** next to the user's name
3. In the **Faculty** dropdown, select the appropriate faculty
4. If needed, also select a **Department** from the sub-dropdown
5. Click **"Save Changes"**

### Q: How do I deactivate a user account?
**A:**
1. Navigate to **Admin > User Management**
2. Find the user you want to deactivate
3. Click the **"Actions"** dropdown next to their name
4. Select **"Deactivate Account"**
5. Confirm the action in the popup dialog
6. The user will no longer be able to log in

### Q: How do I reset a user's password?
**A:**
1. Go to **Admin > User Management**
2. Find the user in the list
3. Click the **"Actions"** dropdown
4. Select **"Reset Password"**
5. The user will receive an email with a password reset link
6. They can set a new password using the link

---

## Document Operations

### Q: How do I bulk import multiple documents?
**A:**
1. Go to **Admin > Documents**
2. Click the **"Bulk Import"** button
3. Prepare your documents:
   - Convert all files to PDF format
   - Use naming convention: `Title_Author_Year.pdf`
   - Create a ZIP file containing all documents
4. Click **"Choose File"** and select your ZIP file
5. Review the import preview
6. Click **"Import Documents"**
7. Check the results for any failed imports

### Q: How do I change a document's status from "Under Review" to "Published"?
**A:**
1. Navigate to **Admin > Documents**
2. Find the document in the list
3. Click the **"Actions"** dropdown next to the document
4. Select **"Change Status"**
5. Choose **"Published"** from the status dropdown
6. Click **"Update Status"**
7. The document will now be visible to all users

### Q: How do I assign reviewers to a document?
**A:**
1. Go to **Admin > Reviews**
2. Find the document that needs reviewers
3. Click **"Assign Reviewers"**
4. Select one or more reviewers from the list
5. Set the **due date** for the review
6. Click **"Assign Reviewers"**
7. Reviewers will receive email notifications

### Q: How do I delete a document from the system?
**A:**
1. Navigate to **Admin > Documents**
2. Find the document you want to delete
3. Click the **"Actions"** dropdown
4. Select **"Delete Document"**
5. Confirm the deletion in the popup dialog
6. The document will be permanently removed

### Q: How do I update document metadata (title, author, etc.)?
**A:**
1. Go to **Admin > Documents**
2. Find the document in the list
3. Click **"Edit"** next to the document
4. Update the fields you need to change:
   - Title
   - Author
   - Abstract
   - Keywords
   - Faculty/Department
5. Click **"Save Changes"**

---

## System Configuration

### Q: How do I upload a new university logo?
**A:**
1. Go to **Admin > Repository Settings**
2. Scroll to the **"Branding & Appearance"** section
3. Click **"Upload Logo"**
4. Select your logo file (PNG or JPG, max 2MB)
5. Preview the logo to ensure it looks correct
6. Click **"Save Logo"**
7. The new logo will appear throughout the system

### Q: How do I change the university name displayed on the platform?
**A:**
1. Navigate to **Admin > Repository Settings**
2. Go to the **"General Information"** section
3. Update the **"University Name"** field
4. Also update the **"Contact Email"** if needed
5. Click **"Save Changes"**
6. The new name will appear in headers and emails

### Q: How do I set up email notifications?
**A:**
1. Go to **Admin > Repository Settings**
2. Navigate to the **"Notifications"** section
3. Configure the following settings:
   - **SMTP Server**: Your email server address
   - **Port**: Usually 587 or 465
   - **Username**: Your email username
   - **Password**: Your email password
4. Click **"Test Email"** to verify the setup
5. Click **"Save Settings"**

### Q: How do I configure document submission deadlines?
**A:**
1. Navigate to **Admin > Repository Settings**
2. Go to the **"Submission Policies"** section
3. Set the following deadlines:
   - **Thesis Submission Deadline**: Date for student submissions
   - **Review Completion Deadline**: Date for reviewer feedback
   - **Publication Deadline**: Date for final publications
4. Click **"Save Deadlines"**

### Q: How do I add new faculties or departments?
**A:**
1. Go to **Admin > Repository Settings**
2. Navigate to the **"Academic Structure"** section
3. To add a faculty:
   - Click **"Add Faculty"**
   - Enter faculty name and description
   - Click **"Save Faculty"**
4. To add a department:
   - Select the parent faculty
   - Click **"Add Department"**
   - Enter department name
   - Click **"Save Department"**

---

## Review Management

### Q: How do I check which documents are pending review?
**A:**
1. Go to **Admin > Reviews**
2. Look at the **"Pending Reviews"** section
3. You'll see a list of documents awaiting review
4. Each entry shows:
   - Document title and author
   - Assigned reviewers
   - Due date
   - Current status

### Q: How do I reassign a review to a different reviewer?
**A:**
1. Navigate to **Admin > Reviews**
2. Find the document in the **"Pending Reviews"** list
3. Click **"Reassign Review"**
4. Remove the current reviewer
5. Select a new reviewer from the dropdown
6. Set a new due date
7. Click **"Reassign"**

### Q: How do I extend a review deadline?
**A:**
1. Go to **Admin > Reviews**
2. Find the review in the list
3. Click **"Edit Deadline"**
4. Select a new due date
5. Click **"Update Deadline"**
6. The reviewer will receive an email notification

### Q: How do I approve a document after review?
**A:**
1. Navigate to **Admin > Reviews**
2. Find the document in the **"Completed Reviews"** section
3. Click **"View Review"** to see all feedback
4. If the reviews are positive, click **"Approve for Publication"**
5. The document status will change to "Published"
6. If reviews suggest changes, click **"Request Revisions"**

---

## Analytics & Reports

### Q: How do I generate a report of all documents uploaded this month?
**A:**
1. Go to **Admin > Analytics**
2. Click on the **"Documents"** tab
3. Set the date range to "This Month"
4. Click **"Generate Report"**
5. The report will show:
   - Total documents uploaded
   - Documents by faculty
   - Documents by status
6. Click **"Export to PDF"** to download the report

### Q: How do I check which users are most active?
**A:**
1. Navigate to **Admin > Analytics**
2. Click on the **"Users"** tab
3. You'll see a list of most active users
4. The report shows:
   - Login frequency
   - Documents uploaded
   - Reviews completed
   - Last activity date

### Q: How do I see download statistics for a specific document?
**A:**
1. Go to **Admin > Documents**
2. Find the document in the list
3. Click **"View Details"**
4. Scroll to the **"Analytics"** section
5. You'll see:
   - Total downloads
   - Downloads by date
   - User types downloading
   - Geographic distribution

### Q: How do I export user data for analysis?
**A:**
1. Navigate to **Admin > Analytics**
2. Click on the **"Users"** tab
3. Set your desired filters (date range, faculty, etc.)
4. Click **"Export Data"**
5. Choose format: **CSV** or **Excel**
6. The file will download with all user information

---

## Troubleshooting

### Q: A user can't log in - what should I check?
**A:**
1. **Check if account is active:**
   - Go to **Admin > User Management**
   - Find the user and verify their status is "Active"
2. **Check if email is verified:**
   - Look for "Email Verified" status
   - If not verified, click "Resend Verification"
3. **Check if password is correct:**
   - Use "Reset Password" function
   - User will receive reset link via email
4. **Check if user has proper permissions:**
   - Verify their role assignment
   - Ensure they're assigned to a faculty

### Q: Documents aren't showing up in search - what's wrong?
**A:**
1. **Check document status:**
   - Only "Published" documents appear in search
   - Go to **Admin > Documents** and verify status
2. **Check document permissions:**
   - Ensure document is set to "Open Access" or appropriate access level
3. **Check search index:**
   - Go to **Admin > Repository Settings**
   - Click **"Rebuild Search Index"**
4. **Check document metadata:**
   - Verify title, author, and keywords are properly set

### Q: Reviewers aren't receiving email notifications - how do I fix this?
**A:**
1. **Check email configuration:**
   - Go to **Admin > Repository Settings > Notifications**
   - Verify SMTP settings are correct
   - Click "Test Email" to verify
2. **Check reviewer assignments:**
   - Go to **Admin > Reviews**
   - Verify reviewers are properly assigned
   - Check if due dates are set
3. **Check user email addresses:**
   - Go to **Admin > User Management**
   - Verify reviewer email addresses are correct

### Q: Bulk import failed - what should I check?
**A:**
1. **Check file format:**
   - Ensure all files are PDF format
   - Verify file names follow convention: `Title_Author_Year.pdf`
2. **Check file size:**
   - Individual files should be under 50MB
   - Total ZIP file should be under 500MB
3. **Check ZIP structure:**
   - Ensure files are directly in ZIP, not in subfolders
   - Verify no special characters in filenames
4. **Check system storage:**
   - Verify sufficient disk space
   - Check if storage quota is exceeded

### Q: Users can't upload documents - what's the issue?
**A:**
1. **Check user permissions:**
   - Verify user has "Regular" or "Admin" role
   - Check if user is assigned to a faculty
2. **Check upload limits:**
   - Verify file size is under 50MB
   - Check if user has reached upload quota
3. **Check system status:**
   - Go to **Admin > Repository Settings**
   - Verify upload functionality is enabled
4. **Check browser compatibility:**
   - Recommend using Chrome, Firefox, or Safari
   - Clear browser cache and cookies

### Q: How do I fix a document that's stuck in "Under Review" status?
**A:**
1. **Check review assignments:**
   - Go to **Admin > Reviews**
   - Verify reviewers are assigned and active
2. **Check review deadlines:**
   - Extend deadlines if needed
   - Reassign to different reviewers if necessary
3. **Force status change:**
   - Go to **Admin > Documents**
   - Find the document and click "Edit"
   - Manually change status to "Published" or "Draft"
4. **Check for system errors:**
   - Look for error messages in admin logs
   - Contact technical support if needed

---

## Quick Reference

### Common Admin Actions
- **Add User**: Admin > User Management > Add New User
- **Upload Logo**: Admin > Repository Settings > Branding
- **Bulk Import**: Admin > Documents > Bulk Import
- **Assign Reviewers**: Admin > Reviews > Assign Reviewers
- **Generate Reports**: Admin > Analytics > Export Data
- **Change Document Status**: Admin > Documents > Actions > Change Status

### Important Contact Information
- **Technical Support**: support@alu-repository.com
- **Administrative Support**: admin@alu-repository.com
- **Emergency Contact**: emergency@alu-repository.com

### System Limits
- **File Upload Size**: 50MB per document
- **Bulk Import**: 500MB total ZIP file
- **User Roles**: Admin, Regular, Reviewer, Guest
- **Document Statuses**: Draft, Under Review, Pending Plagiarism, Pending DOI, Published, Rejected

---

*This Q&A guide is designed to help administrators quickly find solutions to common operational questions. For complex issues, contact technical support.* 