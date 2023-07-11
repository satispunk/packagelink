export type Config = {
  publish?: {
    packages: string[];
  };
  install?: {
    dependencies?: string[];
    devDependencies?: string[];
  };
};
