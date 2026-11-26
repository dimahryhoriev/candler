import { SpotAsset } from "@/hooks/assets/use-spot-assets";

export function getAssetsSymbols(
    assets: (SpotAsset | undefined)[],
) {
    return (
        assets
            ?.map((a) => a?.s)
            .filter(
                (s): s is string => Boolean(s)
            )
        ??
        []
    );
};
