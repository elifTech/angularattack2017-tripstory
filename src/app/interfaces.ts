export interface ITokenUser {
  _id: string;
}

export
enum EPathSegmentType {
  POINT_OF_INTEREST,
  ROAD
}

export
const PATH_SEGMENT_TYPE = {
  [EPathSegmentType.POINT_OF_INTEREST]: 'poi',
  [EPathSegmentType.ROAD]: 'road'
};

export
enum ETravelModeType {
  DRIVING,
  WALKING,
  PLANE,
  FERRY
}

export
const TRAVEL_MODE_TYPE = {
  [ETravelModeType.DRIVING]: 'driving',
  [ETravelModeType.WALKING]: 'walking',
  [ETravelModeType.PLANE]: 'plane',
  [ETravelModeType.FERRY]: 'ferry',
};

export interface IPoint {
  lat: number;
  lng: number;
}

export interface IPathSegmentLocation {
  title?: string;
  address?: string;
  point?: IPoint;
}

export interface IPathSegmentStory {
  title: string;
  body: string;
}

export interface IPathSegmentRoad {
  pathType: EPathSegmentType;
  start: IPoint;
  end: IPoint;
  travelType: ETravelModeType;
  story: IPathSegmentStory;
}

export interface IPathSegmentPoi {
  pathType: EPathSegmentType;
  location: IPathSegmentLocation;
  story: IPathSegmentStory;
}

export interface IFile {
  _id?: string;
  title: string;
  path: string;
}

export interface IStory {
  _id?: string;
  title?: string;
  description?: string;
  subheader?: string;
  coverPhoto?: string;

  startPoint?: IPathSegmentLocation,
  endPoint?: IPathSegmentLocation,

  path?: any;//(IPathSegmentPoi | IPathSegmentRoad)[];

  images?: Array<IFile>
}
