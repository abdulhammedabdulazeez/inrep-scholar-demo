export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                ALU
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  African Leadership University
                </h1>
                <p className="text-sm text-gray-600">My Profile</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <a
                href="/demo/alu/user"
                className="text-blue-600 hover:text-blue-800"
              >
                ← Back to Dashboard
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">
              Manage your personal information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture & Basic Info */}
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="text-center">
                <div className="h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  MU
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Marie Uwimana
                </h3>
                <p className="text-gray-600">Graduate Student</p>
                <p className="text-sm text-gray-500 mt-2">
                  African Leadership University
                </p>

                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
                  Change Photo
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="Marie Uwimana"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="marie.uwimana@ur.ac.rw"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ORCID ID
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="0000-0001-2345-6789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="+250 788 123 456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faculty
                    </label>
                    <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="engineering" selected>
                        Engineering
                      </option>
                      <option value="science">Science</option>
                      <option value="medicine">Medicine</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="business">Business</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="computer_science" selected>
                        Computer Science
                      </option>
                      <option value="electrical_engineering">
                        Electrical Engineering
                      </option>
                      <option value="mechanical_engineering">
                        Mechanical Engineering
                      </option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Level
                    </label>
                    <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="masters" selected>
                        Master's Student
                      </option>
                      <option value="phd">PhD Student</option>
                      <option value="postdoc">Postdoctoral Researcher</option>
                      <option value="faculty">Faculty Member</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Research Interests
                    </label>
                    <textarea
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      defaultValue="Machine learning applications in agriculture, computer vision for crop monitoring, sustainable farming technologies, and AI for food security in developing countries."
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end space-x-4">
                <a
                  href="/demo/alu/user"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Back to Dashboard
                </a>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
