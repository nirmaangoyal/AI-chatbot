import { Box, Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadButton({ itinerary }) {
  const downloadItineraryAsPDF = () => {
    const doc = new jsPDF();
    const content = document.getElementById("itinerary-content");

    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // width in mm
      const pageHeight = 295; // height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save("itinerary.pdf");
    });
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Button variant="contained" color="primary" onClick={downloadItineraryAsPDF}>
        Download Itinerary as PDF
      </Button>
    </Box>
  );
}
