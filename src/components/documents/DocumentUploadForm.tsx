"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { uploadDocument } from "@/lib/api/documentCalls";
import { useGeneralStore } from "@/store/generalStore";

import {
  Upload,
  FileText,
  Building,
  Users,
  Globe,
  Lock,
  Eye,
  AlertCircle,
  CheckCircle,
  Loader2,
  FileUp,
  Info,
  ChevronDown,
  Check,
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

// Hardcoded faculty and department data
const facultyOptions = [
  { value: "661e9315-9307-410d-84d8-62612b41d381", label: "Computer Science" },
  {
    value: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
    label: "Bachelor of Entrepreneurial Leadership (BEL)",
  },
];

const departmentOptions = [
  {
    department_id: "77ff206a-7fef-482f-9541-92627628b812",
    label: "Bsc Software Engineering",
    faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
  },
  {
    department_id: "8d625ca9-d146-4ddf-a2fa-0187154609b5",
    label: "Computer Science",
    faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
  },
  {
    department_id: "e43c0873-505d-4686-a772-d2bc00679a20",
    label: "Global Challenges",
    faculty_id: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
  },
  {
    department_id: "fee5b4f6-18f3-482b-b1f7-591f29805952",
    label: "International Business Trade (IBT)",
    faculty_id: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
  },
];

const statusOptions = [
  {
    value: "draft",
    label: "Draft",
    icon: Clock,
    description: "Work in progress",
  },
  {
    value: "under_review",
    label: "Under Review",
    icon: Eye,
    description: "Being reviewed",
  },
  {
    value: "published",
    label: "Published",
    icon: CheckCircle2,
    description: "Publicly available",
  },
];

const documentTypeOptions = [
  { value: "undergraduate_thesis", label: "Undergraduate Thesis", description: "Bachelor's level research", backendValue: "undergraduate_thesis" },
  { value: "masters_thesis", label: "Master's Thesis", description: "Master's level research", backendValue: "masters_thesis" },
  { value: "phd_dissertation", label: "PhD Dissertation", description: "Doctoral level research", backendValue: "phd_dissertation" },
  { value: "research_paper", label: "Research Paper", description: "Academic research paper", backendValue: "research_paper" },
  { value: "conference_paper", label: "Conference Paper", description: "Conference presentation", backendValue: "conference_paper" },
  { value: "journal_article", label: "Journal Article", description: "Published journal article", backendValue: "journal_article" },
];

// Helper function to get backend value for document type
const getBackendDocumentType = (frontendValue: string): string => {
  const option = documentTypeOptions.find((opt) => opt.value === frontendValue);
  return option?.backendValue || "undergraduate_thesis";
};

// Form validation schema
const uploadSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  faculty_id: z.string().min(1, "Faculty is required"),
  department_id: z.string().min(1, "Department is required"),
  author_email: z.string().email("Please enter a valid email address"),
  type: z.string(),
  abstract: z.string().optional(),
  is_public: z.boolean(),
  is_read_only: z.boolean(),
  doi_link: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "under_review", "published"]),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export default function DocumentUploadForm() {
  const router = useRouter();
  const tenantId = useGeneralStore((state) => state.affiliatedUni?.tenantId);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>("");
  const [facultyOpen, setFacultyOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      faculty_id: "",
      department_id: "",
      author_email: "",
      type: "undergraduate_thesis",
      abstract: "",
      is_public: true,
      is_read_only: false,
      doi_link: "",
      status: "draft",
    },
  });

  // Get departments based on selected faculty
  const filteredDepartments = departmentOptions.filter(
    (dept) => dept.faculty_id === selectedFacultyId
  );

  // Get selected faculty and department labels
  const selectedFaculty = facultyOptions.find(
    (f) => f.value === selectedFacultyId
  );
  const selectedDepartment = filteredDepartments.find(
    (d) => d.department_id === form.watch("department_id")
  );
  const selectedStatus = statusOptions.find(
    (s) => s.value === form.watch("status")
  );

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (data: UploadFormData) => {
      if (!selectedFile) {
        throw new Error("Please select a file to upload");
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", data.title);
      formData.append("faculty_id", data.faculty_id);
      formData.append("department_id", data.department_id);
      formData.append("author_email", data.author_email);
      formData.append("type", getBackendDocumentType(data.type));

      // Debug the type conversion
      console.log("=== TYPE CONVERSION DEBUG ===");
      console.log("Frontend type value:", data.type);
      console.log("Backend type value:", getBackendDocumentType(data.type));
      console.log("=== END TYPE CONVERSION DEBUG ===");

      if (data.abstract) {
        formData.append("abstract", data.abstract);
      }

      formData.append("is_public", data.is_public.toString());
      formData.append("is_read_only", data.is_read_only.toString());

      if (data.doi_link) {
        formData.append("doi_link", data.doi_link);
      }

      formData.append("status", data.status);

      // Console log the form data being sent
      console.log("=== FORM DATA BEING SENT ===");
      console.log("Form data object:", data);
      console.log("Selected file:", selectedFile);
      console.log("File name:", selectedFile.name);
      console.log("File size:", selectedFile.size);
      console.log("File type:", selectedFile.type);

      // Log FormData entries
      console.log("=== FORMDATA ENTRIES ===");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("=== END FORMDATA ===");

      return uploadDocument(formData);
    },
    onSuccess: (data) => {
      toast.success("Document uploaded successfully!", {
        description:
          data.assigned_reviewers.length > 0
            ? `Assigned to: ${data.assigned_reviewers.join(", ")}`
            : "Document created successfully",
      });

      // Reset form
      form.reset();
      setSelectedFile(null);
      setSelectedFacultyId("");

      // Redirect to documents page
      router.push("/demo/alu/admin/documents");
    },
    onError: (error: any) => {
      toast.error("Failed to upload document", {
        description: error.message || "Please try again",
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description: "Please upload a PDF, Word document, or text file",
        });
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please upload a file smaller than 10MB",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleFacultyChange = (facultyId: string) => {
    setSelectedFacultyId(facultyId);
    form.setValue("faculty_id", facultyId);
    form.setValue("department_id", ""); // Reset department when faculty changes
    setFacultyOpen(false);
  };

  const handleDepartmentChange = (departmentId: string) => {
    form.setValue("department_id", departmentId);
    setDepartmentOpen(false);
  };

  const handleStatusChange = (status: string) => {
    form.setValue("status", status as any);
  };

  const onSubmit = (data: UploadFormData) => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    uploadMutation.mutate(data);
  };

  const handleFormSubmit = form.handleSubmit(onSubmit, (errors) => {
    console.log("Form validation errors:", errors);

    // Show specific error messages for each field
    if (errors.title) {
      toast.error(errors.title.message || "Title is required");
    } else if (errors.author_email) {
      toast.error(
        errors.author_email.message || "Valid author email is required"
      );
    } else if (errors.faculty_id) {
      toast.error(errors.faculty_id.message || "Faculty is required");
    } else if (errors.department_id) {
      toast.error(errors.department_id.message || "Department is required");
    } else if (errors.doi_link) {
      toast.error(errors.doi_link.message || "Invalid DOI link format");
    } else if (errors.status) {
      toast.error(errors.status.message || "Document status is required");
    } else {
      // Show first error in toast
      const firstError = Object.values(errors)[0];
      if (firstError?.message) {
        toast.error(firstError.message);
      }
    }
  });

  // Trigger validation when form values change
  React.useEffect(() => {
    const subscription = form.watch(() => {
      form.trigger();
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upload Document
        </h1>
        <p className="text-gray-600">Add a new document to the repository</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center gap-3 text-xl">
            <FileUp className="h-6 w-6 text-blue-600" />
            Document Information
          </CardTitle>
          <CardDescription className="text-gray-600">
            Fill in the document details and upload your file. All fields marked
            with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleFormSubmit} className="space-y-8">
            {/* File Upload Section */}
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="file"
                  className="text-base font-semibold text-gray-700"
                >
                  Document File *
                </Label>
                <div className="mt-3">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-gray-300 hover:border-blue-400"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {selectedFile ? (
                          <>
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle className="w-8 h-8 text-green-500" />
                              <span className="text-lg font-semibold text-green-600">
                                File Selected
                              </span>
                            </div>
                            <p className="mb-2 text-sm text-gray-600">
                              <span className="font-semibold">
                                {selectedFile.name}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-12 h-12 mb-4 text-gray-400" />
                            <p className="mb-2 text-lg font-semibold text-gray-700">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                              PDF, Word, or text files
                            </p>
                            <p className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                              Maximum file size: 10MB
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        id="file"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Document Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Title */}
                <div className="lg:col-span-2">
                  <Label
                    htmlFor="title"
                    className="text-base font-semibold text-gray-700"
                  >
                    Document Title *
                  </Label>
                  <Input
                    id="title"
                    {...form.register("title")}
                    placeholder="Enter the document title"
                    className="mt-2 h-12 text-base"
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                {/* Author Email */}
                <div className="lg:col-span-2">
                  <Label
                    htmlFor="author_email"
                    className="text-base font-semibold text-gray-700"
                  >
                    Author Email *
                  </Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <Input
                      id="author_email"
                      type="email"
                      {...form.register("author_email")}
                      placeholder="Enter author's email address"
                      className="mt-2 h-12 text-base"
                    />
                  </div>
                  {form.formState.errors.author_email && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {form.formState.errors.author_email.message}
                    </p>
                  )}
                </div>

                {/* Document Type */}
                <div className="lg:col-span-2">
                  <Label className="text-base font-semibold text-gray-700 mb-3 block">
                    Document Type
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {documentTypeOptions.map((docType) => {
                      const isSelected = form.watch("type") === docType.value;
                      return (
                        <Button
                          key={docType.value}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => form.setValue("type", docType.value)}
                          className={cn(
                            "h-auto p-4 flex flex-col items-center gap-2",
                            isSelected
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "hover:bg-gray-50"
                          )}
                        >
                          <FileText className="h-5 w-5" />
                          <div className="text-center">
                            <div className="font-medium">{docType.label}</div>
                            <div className="text-xs opacity-80">
                              {docType.description}
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Faculty */}
                <div>
                  <Label className="text-base font-semibold text-gray-700">
                    Faculty *
                  </Label>
                  <Popover open={facultyOpen} onOpenChange={setFacultyOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={facultyOpen}
                        className={cn(
                          "w-full justify-between mt-2 h-12 text-base",
                          form.formState.errors.faculty_id && "border-red-500"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-gray-500" />
                          {selectedFaculty
                            ? selectedFaculty.label
                            : "Select faculty..."}
                        </div>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-full p-0 bg-white"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Search faculty..." />
                        <CommandList>
                          <CommandEmpty>No faculty found.</CommandEmpty>
                          <CommandGroup>
                            {facultyOptions.map((faculty) => (
                              <CommandItem
                                key={faculty.value}
                                value={faculty.value}
                                onSelect={() =>
                                  handleFacultyChange(faculty.value)
                                }
                                className="flex items-center gap-2"
                              >
                                <GraduationCap className="h-4 w-4 text-gray-500" />
                                {faculty.label}
                                {selectedFacultyId === faculty.value && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.faculty_id && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {form.formState.errors.faculty_id.message}
                    </p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <Label className="text-base font-semibold text-gray-700">
                    Department *
                  </Label>
                  <Popover
                    open={departmentOpen}
                    onOpenChange={setDepartmentOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={departmentOpen}
                        disabled={!selectedFacultyId}
                        className={cn(
                          "w-full justify-between mt-2 h-12 text-base",
                          form.formState.errors.department_id &&
                            "border-red-500"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          {selectedDepartment
                            ? selectedDepartment.label
                            : selectedFacultyId
                            ? "Select department..."
                            : "Select faculty first"}
                        </div>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search department..." />
                        <CommandList>
                          <CommandEmpty>No department found.</CommandEmpty>
                          <CommandGroup>
                            {filteredDepartments.map((department) => (
                              <CommandItem
                                key={department.department_id}
                                value={department.department_id}
                                onSelect={() =>
                                  handleDepartmentChange(
                                    department.department_id
                                  )
                                }
                                className="flex items-center gap-2"
                              >
                                <Building className="h-4 w-4 text-gray-500" />
                                {department.label}
                                {form.watch("department_id") ===
                                  department.department_id && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.department_id && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {form.formState.errors.department_id.message}
                    </p>
                  )}
                </div>

                {/* DOI Link */}
                <div className="lg:col-span-2">
                  <Label
                    htmlFor="doi_link"
                    className="text-base font-semibold text-gray-700"
                  >
                    DOI Link (Optional)
                  </Label>
                  <Input
                    id="doi_link"
                    {...form.register("doi_link")}
                    placeholder="https://doi.org/..."
                    className="mt-2 h-12 text-base"
                  />
                  {form.formState.errors.doi_link && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {form.formState.errors.doi_link.message}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="lg:col-span-2">
                  <Label className="text-base font-semibold text-gray-700 mb-3 block">
                    Document Status
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {statusOptions.map((status) => {
                      const Icon = status.icon;
                      const isSelected = form.watch("status") === status.value;
                      return (
                        <Button
                          key={status.value}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => handleStatusChange(status.value)}
                          className={cn(
                            "h-auto p-4 flex flex-col items-center gap-2",
                            isSelected
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "hover:bg-gray-50"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <div className="text-center">
                            <div className="font-medium">{status.label}</div>
                            <div className="text-xs opacity-80">
                              {status.description}
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                  {form.formState.errors.status && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {form.formState.errors.status.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Abstract */}
              <div>
                <Label
                  htmlFor="abstract"
                  className="text-base font-semibold text-gray-700"
                >
                  Abstract (Optional)
                </Label>
                <Textarea
                  id="abstract"
                  {...form.register("abstract")}
                  placeholder="Enter document abstract..."
                  className="mt-2 text-base"
                  rows={5}
                />
              </div>
            </div>

            <Separator />

            {/* Access Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Access Settings
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
                  <Checkbox
                    id="is_public"
                    checked={form.watch("is_public")}
                    onCheckedChange={(checked) =>
                      form.setValue("is_public", checked as boolean)
                    }
                  />
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    <div>
                      <Label
                        htmlFor="is_public"
                        className="font-semibold text-gray-700"
                      >
                        Public Access
                      </Label>
                      <p className="text-sm text-gray-500">
                        Make document visible to all users
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
                  <Checkbox
                    id="is_read_only"
                    checked={form.watch("is_read_only")}
                    onCheckedChange={(checked) =>
                      form.setValue("is_read_only", checked as boolean)
                    }
                  />
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-orange-600" />
                    <div>
                      <Label
                        htmlFor="is_read_only"
                        className="font-semibold text-gray-700"
                      >
                        Read Only
                      </Label>
                      <p className="text-sm text-gray-500">
                        Prevent document downloads
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={uploadMutation.isPending}
                className="px-8 h-12"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploadMutation.isPending || !selectedFile}
                className="px-8 h-12 bg-blue-600 text-white hover:bg-blue-700"
              >
                {uploadMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Document
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
