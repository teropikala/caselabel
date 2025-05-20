import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import { FormData, CaseType } from '../types';

// Constants for PDF dimensions
// A4 size in points (595 x 842)
const A4_WIDTH = 595;
const A4_HEIGHT = 842;

// Label size in mm converted to points (1 mm ≈ 2.83 points)
const LABEL_WIDTH_MM = 165;
const LABEL_HEIGHT_MM = 100;
const LABEL_WIDTH = Math.round(LABEL_WIDTH_MM * 2.83);
const LABEL_HEIGHT = Math.round(LABEL_HEIGHT_MM * 2.83);

// Crop mark properties
const CROP_MARK_LENGTH = 10;
const CROP_MARK_OFFSET = 5;

// Rounded corner
const SVG_PATH = 'M50,50 L100,50 A50,50 0 0,1 50,0 Z'
// SVG path dimensions
const SVG_PATH_START_X = 50; // Starting X coordinate in the SVG path
const SVG_PATH_ADJUSTMENT = 36; // Adjustment value for positioning the SVG path correctly
// The offset for positioning SVG paths is calculated as (SVG_PATH_START_X - SVG_PATH_ADJUSTMENT)
// This ensures the path is correctly aligned with the corners of the label


// Generate a PDF label based on the form data
export const generatePDF = async (formData: FormData): Promise<Uint8Array> => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add an A4 page to the document
  const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]); // A4 size

  // Get the standard font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Calculate position to center the label on the page
  const labelX = (A4_WIDTH - LABEL_WIDTH) / 2;
  const labelY = (A4_HEIGHT - LABEL_HEIGHT) / 2;

  // Set some properties for the label
  const fontSize = 12;
  const margin = 20;

  // Draw the label area
  page.drawRectangle({
    x: labelX,
    y: labelY,
    width: LABEL_WIDTH,
    height: LABEL_HEIGHT,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });

  // Right top corner curve
  page.drawSvgPath(SVG_PATH, {
    x: A4_WIDTH - (SVG_PATH_START_X - SVG_PATH_ADJUSTMENT),
    y: (A4_HEIGHT / 2) + (LABEL_HEIGHT / 2) - 50,
    color: rgb(0, 0, 0),
    opacity: 1,
    rotate: degrees(180),
  })

  page.drawSvgPath(SVG_PATH, {
    x: A4_WIDTH - LABEL_WIDTH - (SVG_PATH_START_X - SVG_PATH_ADJUSTMENT),
    y: (A4_HEIGHT / 2) + (LABEL_HEIGHT / 2) + 50,
    color: rgb(0, 0, 0),
    opacity: 1,
    rotate: degrees(270),
  })

  // Draw crop marks
  // Top-left corner
  page.drawLine({
    start: { x: labelX - CROP_MARK_OFFSET, y: labelY },
    end: { x: labelX - CROP_MARK_OFFSET - CROP_MARK_LENGTH, y: labelY },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });
  page.drawLine({
    start: { x: labelX, y: labelY - CROP_MARK_OFFSET },
    end: { x: labelX, y: labelY - CROP_MARK_OFFSET - CROP_MARK_LENGTH },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });

  // Top-right corner
  page.drawLine({
    start: { x: labelX + LABEL_WIDTH + CROP_MARK_OFFSET, y: labelY },
    end: { x: labelX + LABEL_WIDTH + CROP_MARK_OFFSET + CROP_MARK_LENGTH, y: labelY },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });
  page.drawLine({
    start: { x: labelX + LABEL_WIDTH, y: labelY - CROP_MARK_OFFSET },
    end: { x: labelX + LABEL_WIDTH, y: labelY - CROP_MARK_OFFSET - CROP_MARK_LENGTH },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });

  // Bottom-left corner
  page.drawLine({
    start: { x: labelX - CROP_MARK_OFFSET, y: labelY + LABEL_HEIGHT },
    end: { x: labelX - CROP_MARK_OFFSET - CROP_MARK_LENGTH, y: labelY + LABEL_HEIGHT },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });
  page.drawLine({
    start: { x: labelX, y: labelY + LABEL_HEIGHT + CROP_MARK_OFFSET },
    end: { x: labelX, y: labelY + LABEL_HEIGHT + CROP_MARK_OFFSET + CROP_MARK_LENGTH },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });

  // Bottom-right corner
  page.drawLine({
    start: { x: labelX + LABEL_WIDTH + CROP_MARK_OFFSET, y: labelY + LABEL_HEIGHT },
    end: { x: labelX + LABEL_WIDTH + CROP_MARK_OFFSET + CROP_MARK_LENGTH, y: labelY + LABEL_HEIGHT },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });
  page.drawLine({
    start: { x: labelX + LABEL_WIDTH, y: labelY + LABEL_HEIGHT + CROP_MARK_OFFSET },
    end: { x: labelX + LABEL_WIDTH, y: labelY + LABEL_HEIGHT + CROP_MARK_OFFSET + CROP_MARK_LENGTH },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });

  // Add title
  page.drawText('MAKITA MAKPAC CASE LABEL', {
    x: labelX + margin,
    y: labelY + LABEL_HEIGHT - margin - fontSize,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Add case type
  page.drawText(`Case Type: ${formData.caseType.toUpperCase()}`, {
    x: labelX + margin,
    y: labelY + LABEL_HEIGHT - margin - fontSize * 3,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Add tool information if available
  if (formData.tool) {
    page.drawText(`Tool: ${formData.tool.name}`, {
      x: labelX + margin,
      y: labelY + LABEL_HEIGHT - margin - fontSize * 4.5,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Model: ${formData.tool.model}`, {
      x: labelX + margin,
      y: labelY + LABEL_HEIGHT - margin - fontSize * 6,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
  }

  // Add custom details
  const { customDetails } = formData;
  let yPosition = labelY + LABEL_HEIGHT - margin - fontSize * 8;

  if (customDetails.ownerName) {
    page.drawText(`Owner: ${customDetails.ownerName}`, {
      x: labelX + margin,
      y: yPosition,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
    yPosition -= fontSize * 1.5;
  }

  if (customDetails.contactDetails) {
    page.drawText(`Contact: ${customDetails.contactDetails}`, {
      x: labelX + margin,
      y: yPosition,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
    yPosition -= fontSize * 1.5;
  }

  if (customDetails.additionalInfo) {
    page.drawText(`Additional Info: ${customDetails.additionalInfo}`, {
      x: labelX + margin,
      y: yPosition,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
  }

  // Serialize the PDFDocument to bytes
  return await pdfDoc.save();
};

// Helper function to download the PDF
export const downloadPDF = async (formData: FormData): Promise<void> => {
  const pdfBytes = await generatePDF(formData);

  // Create a blob from the PDF bytes
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;

  // Generate a filename based on the tool or case type
  const filename = formData.tool
    ? `makita_${formData.tool.model}_label.pdf`
    : `makita_${formData.caseType}_case_label.pdf`;

  link.download = filename;

  // Append the link to the body
  document.body.appendChild(link);

  // Click the link to trigger the download
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
