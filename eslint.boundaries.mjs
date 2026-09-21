import boundaries from "eslint-plugin-boundaries";

export const eslintBoundariesConfig = {
    plugins: {
        boundaries,
    },
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
            },
        },
        "boundaries/elements": [
            {
                type: "app",
                pattern: "src/app/**",
            },
            {
                type: "pages",
                pattern: "src/pages/*",
                capture: ["slice"],
            },
            {
                type: "widgets",
                pattern: "src/widgets/*",
                capture: ["slice"],
            },
            {
                type: "features",
                pattern: "src/features/*",
                capture: ["slice"],
            },
            {
                type: "entities",
                pattern: "src/entities/*",
                capture: ["slice"],
            },
            {
                type: "shared",
                pattern: "src/shared/**",
            },
        ],
    },
    rules: {
        "boundaries/dependencies": [
            2,
            {
                default: "allow",
                policies: [
                    {
                        from: { element: { type: "shared" } },
                        disallow: [
                            { to: { element: { type: "app" } } },
                            { to: { element: { type: "pages" } } },
                            { to: { element: { type: "widgets" } } },
                            { to: { element: { type: "features" } } },
                            { to: { element: { type: "entities" } } },
                        ],
                        message:
                            "A lower-layer module ({{file.type}}) cannot import an upper-layer module ({{dependency.type}})",
                    },
                    {
                        from: { element: { type: "entities" } },
                        disallow: [
                            { to: { element: { type: "app" } } },
                            { to: { element: { type: "pages" } } },
                            { to: { element: { type: "widgets" } } },
                            { to: { element: { type: "features" } } },
                        ],
                        message:
                            "A lower-layer module ({{file.type}}) cannot import an upper-layer module ({{dependency.type}})",
                    },
                    {
                        from: { element: { type: "features" } },
                        disallow: [
                            { to: { element: { type: "app" } } },
                            { to: { element: { type: "pages" } } },
                            { to: { element: { type: "widgets" } } },
                        ],
                        message:
                            "A lower-layer module ({{file.type}}) cannot import an upper-layer module ({{dependency.type}})",
                    },
                    {
                        from: { element: { type: "widgets" } },
                        disallow: [
                            { to: { element: { type: "app" } } },
                            { to: { element: { type: "pages" } } },
                        ],
                        message:
                            "A lower-layer module ({{file.type}}) cannot import an upper-layer module ({{dependency.type}})",
                    },
                    {
                        from: { element: { type: "pages" } },
                        disallow: [
                            { to: { element: { type: "app" } } },
                        ],
                        message:
                            "A lower-layer module ({{file.type}}) cannot import an upper-layer module ({{dependency.type}})",
                    },
                    {
                        from: { element: { type: "features" } },
                        disallow: [{ to: { element: { type: "features", slice: "!{{from.slice}}" } } }],
                        message:
                            "Cross-slice import between features is forbidden ({{from.slice}} -> {{target.slice}})",
                    },
                    {
                        from: { element: { type: "entities" } },
                        disallow: [{ to: { element: { type: "entities", slice: "!{{from.slice}}" } } }],
                        message:
                            "Cross-slice import between entities is forbidden ({{from.slice}} -> {{target.slice}})",
                    },
                    {
                        to: {
                            element: {
                                type: ["pages", "widgets", "features", "entities"],
                                fileInternalPath: "!@(index.(ts|tsx)|*.page.tsx)",
                            },
                        },
                        disallow: [
                            {
                                from: {
                                    element: {
                                        type: ["app", "pages", "widgets", "features", "entities", "shared"],
                                    },
                                },
                            },
                        ],
                        message:
                            "Direct import from '{{dependency.source}}' is forbidden. Module must be imported through the public API (index.ts)",
                    },
                ],
            },
        ],
    },
};
