export type ViteAssetManifest = Record<
  string,
  {
    css?: string[];
    dynamicImports?: string;
    file: string;
    isDynamicEntry?: boolean;
    isEntry?: boolean;
    src: string;
    staticDeps?: string[];
  }
>;
