export interface IConfig {
  publish?: {
    packages: string[],
  },
  install?: {
    dependencies: string[],
    devDependencies: string[],
  }
}