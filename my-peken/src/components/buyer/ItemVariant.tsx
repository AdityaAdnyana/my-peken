import { InboxIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";
import { ProductType } from "./Product";

export function ItemVariant({variant} : {variant : ProductType}) {
    return (
        <div className="flex w-full max-w-md gap-6">
            <Button>
                <Item>
                    <ItemMedia variant="icon">
                        <InboxIcon />
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>Dummy Item 1</ItemTitle>
                        <ItemDescription>
                            Transparent background with no border.
                        </ItemDescription>
                    </ItemContent>
                </Item>
            </Button>
        </div>
    )
}
