import { AssetSortOptions, SortOrder } from "@/lib/assets/assets-sorting";
import { AssetsTypeOptions } from "@/lib/assets/assets-types";

export type UseAssetsParams = {
    limit?: number;
    sortOption?: AssetSortOptions;
    sortOrder?: SortOrder;
    typeOptions?: AssetsTypeOptions;
};
