export interface Character {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: [];
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [];
  };
}
