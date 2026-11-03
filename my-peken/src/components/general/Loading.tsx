import { Spinner } from "@/components/ui/spinner"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
export default function Loading({message} : {message : string}) {
  return(
    <div className="flex justify-center w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item>
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{message}</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  )
}