import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Trash2 } from "lucide-react";

type Props = {
  url: string;
  index: number;
  onRemove?: () => void;
  disabled?: boolean;
  name?: string;
};

const SortableImage = ({ url, index, onRemove, disabled, name }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative aspect-square rounded-md overflow-hidden shadow"
    >
      <Image
        src={url}
        alt={`${name || "imagem"}-${index}`}
        fill
        className="object-contain"
      />
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 bg-red-500 p-1 rounded-full"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>
      )}
    </div>
  );
};

export default SortableImage;
