"use client";

import React, { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import { useCounterStore } from "@/store/store";
import { useGeneralStore } from "@/store/generalStore";
import { VisuallyHidden } from "./VisuallyHidden";
import { useRouter } from "next/navigation";
import { AffiliatedUni } from "@/store/generalStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUniversities } from "@/lib/api/tenantCalls";

const LogInWithUni: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // const count = useCounterStore((state) => state.count);
  const setUni = useGeneralStore((state) => state.setAffiliatedUni);

  // Only fetch when dialog is opened
  const {
    data: universities = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: fetchUniversities,
    enabled: open, // Only fetch when open is true
  });

  const onSelectUniversity = (uni: AffiliatedUni) => {
    setUni(uni);
    console.log("Selected University:", uni);
    setOpen(false);
    router.push(`/demo/${uni.subdomain.toLowerCase()}`);
  };

  return (
    <div>
      <Button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => setOpen(true)}
      >
        Login WIth University
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-white text-gray-900 rounded-lg shadow-lg">
          <VisuallyHidden>
            <h2>Pick your university</h2>
          </VisuallyHidden>
          <CommandInput
            className=""
            placeholder="Type a command or search..."
          />
          <CommandList className="">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Universities">
              {isLoading && <div className="p-4">Loading...</div>}
              {isError && (
                <div className="p-4 text-red-600">
                  Failed to load universities.
                </div>
              )}

              {universities.map((uni: AffiliatedUni) => (
                <CommandItem
                  key={uni.tenantId}
                  onSelect={() => onSelectUniversity(uni)}
                  className="cursor-pointer px-4 py-2 rounded transition-colors hover:bg-blue-50 focus:bg-blue-100 active:bg-blue-200"
                >
                  {uni.universityName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
      {/* <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <h2>Pick your university</h2>
        </VisuallyHidden>
        <CommandInput className="" placeholder="Type a command or search..." />
        <CommandList className="">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Universities">
            {listOfUniversities.map((uni) => (
              <CommandItem key={uni.name} onSelect={() => onSelectUniversity(uni)}>
                {uni.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog> */}
    </div>
  );
};

export default LogInWithUni;
