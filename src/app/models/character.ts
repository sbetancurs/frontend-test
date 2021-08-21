import { Image } from '@models/Image';
import { ResourceList } from '@models/ResourceList';
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
