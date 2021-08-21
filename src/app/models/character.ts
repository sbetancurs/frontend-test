import { Image } from './Image';
import { ResourceList } from './ResourceList';
export interface Character {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: [];
  thumbnail: Image;
  comics: ResourceList;
}
