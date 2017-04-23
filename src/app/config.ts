import { CustomConfig } from 'ng2-ui-auth';

import walkingIcon from '../assets/icons/walking.png';
import planeIcon from '../assets/icons/plane.png';
import drivingIcon from '../assets/icons/driving.png';
import ferryIcon from '../assets/icons/ferry.png';

export 
const ICONS = {
  walking: walkingIcon,
  plane: planeIcon,
  driving: drivingIcon,
  ferry: ferryIcon,
};

export const IS_DEV = ENV === 'development';

export const API_URL = IS_DEV ? 'http://localhost:4040' : 'https://eliftech-tripstory.herokuapp.com';

export const UPLOAD_URL = `${API_URL}/api/upload`;

export const FACEBOOK_APP_ID = IS_DEV ? '418197618334612' : '1876751672543517';

export const GOOGLE_CLIENT_ID = '616075536950-pauau0e7u0c980llqh99ftvg3sd32c61.apps.googleusercontent.com';



export const MAP_STYLES = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#444444"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#f2f2f2"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": 45
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "color": "#20beff"
      },
      {
        "visibility": "on"
      }
    ]
  }
];

export const PREVIEW_MAP_STYLES = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#50492e"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "hue": "#ffcc00"
      },
      {
        "saturation": "35"
      },
      {
        "lightness": "1"
      },
      {
        "gamma": "1.00"
      }
    ]
  },
  {
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#fbf9f1"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#fbf9f1"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c9f1d9"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": 45
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "color": "#46bcec"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  }
];

export class MyAuthConfig extends CustomConfig {
  public defaultHeaders = {'Content-Type': 'application/json'};
  public providers = {
    facebook: {clientId: FACEBOOK_APP_ID, url: `${API_URL}/api/auth/facebook/callback`},
    google: {clientId: GOOGLE_CLIENT_ID, url: `${API_URL}/api/auth/google/callback`}
  };
}
