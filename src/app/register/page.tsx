'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TenantRegistrationPage() {
  const [formData, setFormData] = useState({
    universityName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    subdomain: '',
    description: '',
    logo: null as File | null,
    estimatedUsers: '',
    estimatedDocuments: '',
    termsAccepted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, logo: file }));
  };

  const generateSubdomain = (universityName: string) => {
    return universityName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .replace(/university|of|the/g, '')
      .slice(0, 15);
  };

  const checkSubdomainAvailability = async (subdomain: string) => {
    if (subdomain.length < 3) {
      setSubdomainAvailable(null);
      return;
    }

    // Mock availability check
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate some taken subdomains
    const takenSubdomains = ['harvard', 'mit', 'stanford', 'oxford', 'cambridge'];
    setSubdomainAvailable(!takenSubdomains.includes(subdomain.toLowerCase()));
  };

  const handleUniversityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({ ...prev, universityName: name }));

    if (name.length >= 3) {
      const suggestedSubdomain = generateSubdomain(name);
      setFormData(prev => ({ ...prev, subdomain: suggestedSubdomain }));
      checkSubdomainAvailability(suggestedSubdomain);
    }
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subdomain = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
    setFormData(prev => ({ ...prev, subdomain }));
    checkSubdomainAvailability(subdomain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission process
    await new Promise(resolve => setTimeout(resolve, 2000));

    setStep(3); // Success step
    setIsSubmitting(false);
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">IR</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">InRep Scholar</h1>
                <p className="text-sm text-gray-500">University Registration</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">← Back to Home</Link>
              <Link href="/demo/ur" className="text-blue-600 hover:text-blue-800">View Demo</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {step < 3 && (
          <>
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-8">
                <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                    1
                  </div>
                  <span className="font-medium">University Details</span>
                </div>

                <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'} rounded`} />

                <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                    2
                  </div>
                  <span className="font-medium">Configuration</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg border p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: University Details */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">Register Your University</h2>
                      <p className="text-gray-600 mt-2">Join leading African universities using InRep Scholar</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">University Name *</label>
                        <input
                          type="text"
                          name="universityName"
                          value={formData.universityName}
                          onChange={handleUniversityNameChange}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="University of Rwanda"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Dr. Sarah Kagame"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="library@ur.ac.rw"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+250 788 123 456"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select country</option>
                          <option value="rwanda">Rwanda</option>
                          <option value="kenya">Kenya</option>
                          <option value="uganda">Uganda</option>
                          <option value="tanzania">Tanzania</option>
                          <option value="south-africa">South Africa</option>
                          <option value="ghana">Ghana</option>
                          <option value="nigeria">Nigeria</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Repository Subdomain *</label>
                        <div className="flex items-center">
                          <input
                            type="text"
                            name="subdomain"
                            value={formData.subdomain}
                            onChange={handleSubdomainChange}
                            className="flex-1 border border-gray-300 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="ur"
                            required
                          />
                          <span className="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-md text-gray-600">
                            .inrepscholar.com
                          </span>
                        </div>
                        {formData.subdomain && (
                          <div className="mt-2">
                            {subdomainAvailable === null && formData.subdomain.length >= 3 && (
                              <p className="text-sm text-gray-500">Checking availability...</p>
                            )}
                            {subdomainAvailable === true && (
                              <p className="text-sm text-green-600">✓ Available: {formData.subdomain}.inrepscholar.com</p>
                            )}
                            {subdomainAvailable === false && (
                              <p className="text-sm text-red-600">✗ Not available. Please try another subdomain.</p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">University Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Brief description of your university and research focus areas..."
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!formData.universityName || !formData.email || !formData.country || !formData.subdomain || subdomainAvailable !== true}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Configuration
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Configuration */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">Repository Configuration</h2>
                      <p className="text-gray-600 mt-2">Help us set up your repository</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Number of Users</label>
                        <select
                          name="estimatedUsers"
                          value={formData.estimatedUsers}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select range</option>
                          <option value="1-50">1 - 50 users</option>
                          <option value="51-200">51 - 200 users</option>
                          <option value="201-500">201 - 500 users</option>
                          <option value="501-1000">501 - 1,000 users</option>
                          <option value="1000+">1,000+ users</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Document Uploads</label>
                        <select
                          name="estimatedDocuments"
                          value={formData.estimatedDocuments}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select range</option>
                          <option value="1-100">1 - 100 documents</option>
                          <option value="101-500">101 - 500 documents</option>
                          <option value="501-1000">501 - 1,000 documents</option>
                          <option value="1001-2000">1,001 - 2,000 documents</option>
                          <option value="2000+">2,000+ documents</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">University Logo</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <div className="text-2xl text-gray-400 mb-2">🏛️</div>
                          <p className="text-gray-600 mb-2">Upload your university logo</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 2MB (optional)</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-4"
                          />
                          {formData.logo && (
                            <p className="text-sm text-green-600 mt-2">✓ {formData.logo.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600"
                            required
                          />
                          <label className="text-sm text-gray-700">
                            I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-800">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!formData.termsAccepted || isSubmitting}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Register University'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg border p-8">
              <div className="text-6xl text-green-600 mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for registering {formData.universityName}. We've received your application and will review it shortly.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">What happens next:</h3>
                <ul className="text-sm text-gray-700 space-y-1 text-left">
                  <li>✓ Email verification sent to {formData.email}</li>
                  <li>✓ Application under review (typically 1-2 business days)</li>
                  <li>✓ Repository setup at {formData.subdomain}.inrepscholar.com</li>
                  <li>✓ Admin account creation and training materials</li>
                </ul>
              </div>

              <div className="flex justify-center space-x-4">
                <Link
                  href="/"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                >
                  Back to Home
                </Link>
                <Link
                  href="/demo/ur"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition"
                >
                  Explore Demo Repository
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
