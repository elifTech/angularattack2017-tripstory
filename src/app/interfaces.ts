export interface ITokenUser {
  _id: string;
}

export
enum EPathSegmentType {
  POINT_OF_INTEREST,
  ROAD
}

export
enum ETravelModeType {
  DRIVING,
  WALKING
}

export interface IPathSegment {
  type: EPathSegmentType;
}

export interface IStory {
  _id: string;
  title: string;
  subheader: string;

  path: IPathSegment[];
}
