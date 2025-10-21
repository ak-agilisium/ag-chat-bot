'use client';

import React, { useState } from 'react';
import { Plus, Paperclip, Telescope, ImagePlus, Lightbulb, BookOpen, MoreHorizontal, Globe, Edit3, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { FileUploadModal } from '@/components/file-upload-modal';

export default function ChatInterface() {
  const [showMenu, setShowMenu] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);

  const mainMenuItems = [
    { icon: Paperclip, label: 'Add photos & files' },
    { icon: Telescope, label: 'Deep research' },
    { icon: ImagePlus, label: 'Create image' },
    { icon: Lightbulb, label: 'Thinking' },
    { icon: BookOpen, label: 'Study and learn' },
  ];

  const moreMenuItems = [
    { icon: Globe, label: 'Web search' },
    { icon: Edit3, label: 'Canvas' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl sm:text-5xl font-normal text-center mb-8 sm:mb-16 text-gray-800">
          What are you working on?
        </h1>

        <div className="relative">
          {/* Main Input Container */}
          <div className="bg-white rounded-full shadow-lg border border-gray-200 flex items-center px-3 py-2 sm:px-4 sm:py-3 gap-3">
            {/* Plus Button */}
            <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 w-10 h-10 rounded-full"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 sm:w-80 p-2 rounded-3xl shadow-xl border border-gray-200">
                {mainMenuItems.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="px-6 py-3 flex items-center gap-4 text-left cursor-pointer"
                    onClick={() => {
                      if (item.label === 'Add photos & files') {
                        setIsFileUploadModalOpen(true);
                      }
                    }}
                  >
                    <item.icon className="w-5 h-5 text-gray-700" />
                    <span className="text-sm sm:text-base text-gray-800">{item.label}</span>
                  </DropdownMenuItem>
                ))}

                {/* More Button */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()} // Prevent closing parent dropdown
                      className="px-6 py-3 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <MoreHorizontal className="w-5 h-5 text-gray-700" />
                        <span className="text-sm sm:text-base text-gray-800">More</span>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 sm:w-64 p-2 rounded-3xl shadow-xl border border-gray-200">
                    {moreMenuItems.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="px-6 py-3 flex items-center gap-4 text-left cursor-pointer"
                      >
                        <item.icon className="w-5 h-5 text-gray-700" />
                        <span className="text-sm sm:text-base text-gray-800">{item.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Input Field */}
            <Input
              type="text"
              placeholder="Ask anything"
              className="flex-1 text-base sm:text-lg outline-none border-none focus-visible:ring-0 text-gray-800 placeholder-gray-400"
            />

            {/* Microphone Button */}
            <Button variant="ghost" size="icon" className="flex-shrink-0 w-10 h-10 rounded-full">
              <Mic className="w-5 h-5 text-gray-600" />
            </Button>

            {/* Voice Wave Button */}
            <Button className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors">
              <div className="flex gap-0.5 items-center">
                <div className="w-1 h-3 bg-green-600 rounded-full"></div>
                <div className="w-1 h-4 bg-green-600 rounded-full"></div>
                <div className="w-1 h-2 bg-green-600 rounded-full"></div>
              </div>
            </Button>
          </div>

          
        </div>
      </div>
      <FileUploadModal
        isOpen={isFileUploadModalOpen}
        onClose={() => setIsFileUploadModalOpen(false)}
        onUpload={(files) => {
          console.log('Files uploaded:', files);
          // Handle uploaded files here
        }}
      />
    </div>
  );
}