"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function FilterSelect({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
  className = "",
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value)
  );

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Selected values as chips */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {option.label}
              <button
                type="button"
                onClick={() => handleRemove(option.value)}
                className="ml-1 inline-flex items-center justify-center w-3 h-3 rounded-full hover:bg-blue-200"
              >
                <X className="w-2 h-2" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedOptions.length > 0 ? (
              <span className="text-sm">{selectedOptions.length} selected</span>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-white">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
