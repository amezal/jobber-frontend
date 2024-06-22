import { FormatDate as FormatAbsoluteDate } from "@jobber/components/FormatDate";
import { Text } from "@jobber/components/Text";

type Props = {
  date: string;
  showColor?: boolean;
};

const FormatDate = ({ date, showColor }: Props) => {
  const today = Date.now();
  const dateObject = new Date(date);
  const dateIsPast = dateObject.getTime() < today;

  return (
    <Text
      size="large"
      variation={showColor && dateIsPast ? "error" : "default"}
    >
      <FormatAbsoluteDate date={date} />
    </Text>
  );
};

export default FormatDate;
