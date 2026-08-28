import React from 'react';
import { type Slot } from '../slot';
import { OrderedDict } from './ordered-dictionary';
type SlotProps = React.ComponentPropsWithoutRef<typeof Slot>;
interface CollectionProps extends SlotProps {
    scope: any;
}
interface BaseItemData {
    id?: string;
}
type ItemDataWithElement<ItemData extends BaseItemData, ItemElement extends HTMLElement> = ItemData & {
    element: ItemElement;
};
type ItemMap<ItemElement extends HTMLElement, ItemData extends BaseItemData> = OrderedDict<ItemElement, ItemDataWithElement<ItemData, ItemElement>>;
declare function createCollection<ItemElement extends HTMLElement, ItemData extends BaseItemData = BaseItemData>(name: string): readonly [{
    readonly Provider: React.FC<{
        children?: React.ReactNode;
        scope: any;
        state?: [ItemMap: ItemMap<ItemElement, ItemData>, SetItemMap: React.Dispatch<React.SetStateAction<ItemMap<ItemElement, ItemData>>>];
    }>;
    readonly Slot: React.ForwardRefExoticComponent<CollectionProps & React.RefAttributes<HTMLElement>>;
    readonly ItemSlot: React.ForwardRefExoticComponent<React.PropsWithoutRef<ItemData & {
        children: React.ReactNode;
        scope: any;
    }> & React.RefAttributes<ItemElement>>;
}, {
    createCollectionScope: import("../context").CreateScope;
    useCollection: (scope: any) => ItemMap<ItemElement, ItemData>;
    useInitCollection: () => [ItemMap<ItemElement, ItemData>, React.Dispatch<React.SetStateAction<ItemMap<ItemElement, ItemData>>>];
}];
export { createCollection };
export type { CollectionProps };
