"use client";
import React, { useEffect } from "react";

import Uppy from "@uppy/core";
import { FileInput, StatusBar } from "@uppy/react";
import { TiDelete } from "react-icons/ti";

import { v4 as uuidv4 } from "uuid";

import useAlertStore from "../store/useAlertStore";

export default function UppyFileUploader({ uppyFiles, setUppyFiles, totalPages, setTotalPages }) {
  const [addInfo, addWarning, addError] = useAlertStore((state) => [state.addInfo, state.addWarning, state.addError]);

  useEffect(() => {
    // Set up PDF.js worker
    if (typeof window !== 'undefined' && window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
  }, []);

  const allowedTypes = [".pdf", ".docx"];

  const uppy = new Uppy({
    restrictions: {
      maxNumberOfFiles: 3,
      allowedFileTypes: allowedTypes,
    },
    autoProceed: false,
    locale: {
      strings: {
        chooseFiles: "Attach Files",
      },
    },
  });

  uppy.on("file-added", async (file) => {
    if (uppyFiles.length >= 3) return addError("You can add only 3 files");
    if (totalPages > 25) return addError("You have exceeded the maximum limit 25 pages.");

    if (!allowedTypes.includes(`.${file.extension}`)) {
      addError("We accept only PDF and DOCX files!");
      uppy.removeFile(file.id);
    } else {
      let pagesCount = 0;

      if (file.extension === "pdf") {
        const fileBlob = new Blob([file.data], { type: "application/pdf" });
        const pdfURL = URL.createObjectURL(fileBlob);

        try {
          if (typeof window !== 'undefined' && window.pdfjsLib) {
            const pdf = await window.pdfjsLib.getDocument({ url: pdfURL }).promise;
            pagesCount = pdf.numPages;
            URL.revokeObjectURL(pdfURL);
          } else {
            addError("PDF.js is not loaded");
          }
        } catch (error) {
          addError("Failed to load PDF document.");
        }
      } else if (file.extension === "docx") {
        try {
          const mammoth = await import("mammoth");
          const result = await mammoth.extractRawText({ arrayBuffer: file.data });
          const characterCount = result.value.length;
          const approximatePages = Math.ceil(characterCount / 2000);
          pagesCount = approximatePages;
        } catch (error) {
          addError("Failed to load DOCX document.");
        }
      }

      if (totalPages + pagesCount >= 25) {
        addError("You have exceeded the maximum limit 25 pages");
        uppy.removeFile(file.id);
        return;
      }

      setTotalPages((prev) => prev + pagesCount);
      const uniqueFile = { ...file, uniqueId: uuidv4(), pages: pagesCount };
      setUppyFiles((prevFiles) => [...prevFiles, uniqueFile]);
    }
  });

  uppy.on("file-removed", (file) => {
    setUppyFiles((prevFiles) => prevFiles.filter((f) => f.uniqueId !== file.uniqueId));
  });

  return (
    <>
      <FileInput uppy={uppy} className="uppy-button" />
      <StatusBar uppy={uppy} hideUploadButton />

      {uppyFiles.length > 0 && (
        <div className="files-selected flex items-center gap-[5px] flex-col mt-2">
          <p className="text-base font-semibold">Selected Files:</p>
          {uppyFiles.map((file) => (
            <div key={file.uniqueId} className="flex items-center gap-2">
              <p>
                {file.name} ({file.pages} Pages)
              </p>
              <TiDelete
                className="text-[#f44336] w-5 h-5 cursor-pointer flex-shrink-0"
                onClick={() => {
                  uppy.removeFile(file.id);
                  setUppyFiles((files) => files.filter((el) => el.uniqueId !== file.uniqueId));
                  setTotalPages((prev) => prev - file.pages);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
