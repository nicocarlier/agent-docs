import { Button, Spinner } from "@heroui/react";

interface MainButtonProps {
  title: string;
  handleEvent: () => void;
  isLoading: boolean;
  type: "primary" | "secondary" | "tertiary";
}

export default function MainButton({
  title,
  handleEvent,
  isLoading,
  type,
}: MainButtonProps) {
  return (
    <Button
      color="primary"
      onPress={handleEvent}
      isLoading={isLoading}
      spinner={<Spinner size="sm" />}
      radius="md"
      className={`font-semibold rounded-md ${
        type === "primary"
          ? "!bg-black text-white hover:!bg-gray-800"
          : type === "secondary"
            ? "bg-green-400 text-gray-900 hover:bg-green-500"
            : "bg-transparent text-gray-900 hover:bg-gray-100"
      }`}
    >
      {title}
    </Button>
  );
}
