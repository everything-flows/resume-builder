/** @jsxImportSource @emotion/react */
"use client";

import { useRef, useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";

import { usePDF } from "@react-pdf/renderer";

import InputPage from "@components/InputRenderer";
import PDFPage from "@components/PdfRenderer";
import PDFPreViewer from "@components/PdfPreViewer";

import axios from "axios";
import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import { container, body, inputArea, previewArea } from "./styles";
import Header from "@components/Header";
import type { Resume } from "@/types/resume";

const emptyTemplate = {
  userInfo: {
    name: "",
    position: "",
    quote: "",
    contact: [],
    address: "",
  },
  sectionList: [],
};

export default function BuildScreen() {
  const [data, setData] = useState<Resume>({
    id: 0,
    createdAt: new Date(),
    modifiedAt: new Date(),
    fileName: "",
    mainColor: "#ff0000",
    ...emptyTemplate,
  });
  const [resumeFileName, setResumeFileName] = useState("새 이력서");
  const [mainColor, setMainColor] = useState("#ff0000");

  const [pdfComponent, setPdfComponent] = useState(
    <PDFPage data={data} mainColor={mainColor} />
  );
  const [instance, updateInstance] = usePDF({ document: pdfComponent });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const renderCanvas = async ({ pageNumber }: { pageNumber: number }) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (instance.url) {
      const reader = new FileReader();

      try {
        await axios({
          responseType: "blob",
          url: instance.url,
        })
          .then(async (response: any) => {
            // [todo] fix any
            const file = response.data;

            if (file) {
              reader.onload = async (event) => {
                const pdfData = (event.target as FileReader).result;
                const loadingTask = pdfjs.getDocument({
                  // @ts-expect-error
                  data: pdfData as unknown as BinaryData | undefined, // [todo] fix type
                });
                const pdf = await loadingTask.promise;
                setMaxPageNumber(pdf.numPages);
                const page = await pdf.getPage(pageNumber);
                const viewport = page.getViewport({ scale: 2 });

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                page.render({
                  canvasContext: context,
                  viewport,
                });
              };

              reader.readAsArrayBuffer(file);
            }
          })
          .catch((error) => {});
      } catch (error) {}
    }
  };

  useEffect(() => {
    setPdfComponent(<PDFPage data={data} mainColor={mainColor} />);
  }, [data, mainColor]);

  useEffect(() => {
    updateInstance(pdfComponent);
  }, [updateInstance, pdfComponent]);

  useDebounce(
    () => {
      renderCanvas({ pageNumber: pageNumber });
    },
    [instance, pageNumber],
    1000
  );

  return (
    <div css={container}>
      <Header />

      <div css={body}>
        <div css={inputArea}>
          <InputPage
            data={data}
            setData={setData}
            mainColor={mainColor}
            setMainColor={setMainColor}
            resumeFileName={resumeFileName}
            setResumeFileName={setResumeFileName}
            fileUrl={instance.url}
            fileName={`${resumeFileName}.pdf`}
          />
        </div>

        <div css={previewArea}>
          <PDFPreViewer
            canvasRef={canvasRef}
            pageNumber={pageNumber}
            maxPageNumber={maxPageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </div>
  );
}
