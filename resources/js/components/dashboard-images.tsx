import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemHeader,
} from "@/components/ui/item"
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export function DashboardImages(
        { images, onDelete, deleteImageProcessing } :
        { images: { id: number; image: string; path: string }[]; onDelete: (id: number) => void; deleteImageProcessing: boolean }
) {
  return (
    <div className="w-full">
      <ItemGroup className="grid grid-cols-6 gap-4">
        {images.map((image) => (
          <Item key={image.id} variant="outline">
            <ItemHeader>
              <img
                src={image.path}
                alt={`Project Image ${image.id}`}
                width={128}
                height={128}
                className="aspect-square w-full rounded-sm object-cover"
              />
            </ItemHeader>
                <ItemContent>
                    <ItemActions>
                        <Button disabled={deleteImageProcessing} onClick={() => onDelete(image.id)} className="w-full" variant="destructive" size="sm">
                            <Trash2/> Delete
                        </Button>
                    </ItemActions>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
