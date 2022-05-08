export enum ModelType {
  pluginHybrid = 'plug-in hybrid',
  pureElectric = 'pure electric',
}

export enum BodyType {
  suv = 'suv',
  estate = 'estate',
  sedan = 'sedan',
}

export interface ICar {
  id: string;
  modelName: string;
  bodyType: BodyType;
  modelType: ModelType;
  imageUrl: string;
}

export type BodyTypeFilter = '' | BodyType;
export type SetFilterValue = (s: string) => void;
