export interface ITokenUser {
  _id: string;
}

const PATH_SEGMENT_TYPE = {
  POINT_OF_INTEREST: 'poi',
  ROAD: 'road'
};

export
enum EPathSegmentType {
  POINT_OF_INTEREST = PATH_SEGMENT_TYPE.POINT_OF_INTEREST,
  ROAD = PATH_SEGMENT_TYPE.ROAD
}

const TRAVEL_MODE_TYPE = {
  DRIVING: 'poi',
  WALKING: 'walking',
  PLANE: 'plane',
  FERRY: 'ferry',
};

export
enum ETravelModeType {
  DRIVING = TRAVEL_MODE_TYPE.DRIVING,
  WALKING = TRAVEL_MODE_TYPE.WALKING,
  PLANE = TRAVEL_MODE_TYPE.PLANE,
  FERRY = TRAVEL_MODE_TYPE.FERRY
}

export interface IPoint {
  lat: number;
  lng: number;
}

export interface IPathSegmentLocation {
  title: string;
  point: IPoint;
}

export interface IPathSegmentStory {
  title: string;
  body: string;
}

export interface IPathSegmentRoad {
  type: EPathSegmentType;
  start: IPoint;
  end: IPoint;
  travelType: ETravelModeType;
}

export interface IPathSegmentPoi {
  type: EPathSegmentType;
  location: IPathSegmentLocation;
  story: IPathSegmentStory;
}

export interface IStory {
  _id?: string;
  title: string;
  subheader: string;

  path: (IPathSegmentPoi | IPathSegmentRoad)[];
}
