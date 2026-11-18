import { Asset } from "@/hooks/use-assets";

export function getAssetsSymbols(
    assets: (Asset | undefined)[],
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
