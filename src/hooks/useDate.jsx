// this custom hooks takes a date object and returns customized date
import { format, parseISO } from "date-fns";
const useDate = () => {
  function extractedDate(dueDate) {
    const isoDate = dueDate;
    const date = parseISO(isoDate);

    return format(date, "do MMMM, yyyy");
  }
  return extractedDate;
};

export default useDate;
