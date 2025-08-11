import FullSEO from "../../config/FullSEO";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import FAQList from "../../utils/FAQList"; // Corrected import path
import { IoIosArrowDown } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

export const metadata = {
  ...FullSEO.FAQ,
};

export default function FAQ() {
  return (
    <section className="max-w-[600px] h-fit flex flex-col shadow-custom">
      {FAQList.map((el) => (
        <Accordion key={uuidv4()}>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>{el.question}</AccordionSummary>
          <AccordionDetails>
            <div style={{ whiteSpace: "pre-line" }}>{el.text}</div>
          </AccordionDetails>
        </Accordion>
      ))}

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<IoIosArrowDown />}>Disclaimer</AccordionSummary>
        <AccordionDetails>
          <div style={{ whiteSpace: "pre-line" }}>
            Service features subject to change. Users advised to review current terms and conditions before transmission.
          </div>
        </AccordionDetails>
      </Accordion>
    </section>
  );
}
