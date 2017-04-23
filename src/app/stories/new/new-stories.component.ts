import {
  Component,
  OnInit
} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { IStory } from '../../interfaces';
import { StoryRes } from '../../services/stories.resource';
import { UPLOAD_URL } from '../../config';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';


@Component({
  selector: 'new-stories',
  styleUrls: [
    './new-stories.component.scss'
  ],
  templateUrl: './new-stories.component.html',
})
export class NewStoriesComponent implements OnInit {
  stateCtrl: FormControl;
  filteredStates: any;

  states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  filterStates(val: string) {
    return val ? this.states.filter(s => new RegExp(`^${val}`, 'gi').test(s))
      : this.states;
  }

  myControl = new FormControl();
  options = [
    'One',
    'Two',
    'Three'
  ];
  filteredOptions: Observable<string[]>;

  public hasBaseDropZoneOver: boolean = false;

  public uploader: FileUploader = new FileUploader({url: UPLOAD_URL});

  public model:IStory = {
    startPoint: {},
    endPoint: {},
    images: []
  };

  public startPointSearchResults: any = [];
  public endPointSearchResults: any = [];

  constructor(public route: ActivatedRoute, private storyRes: StoryRes, private router: Router) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      // .subscribe((attr: any) => {
      //   console.log(attr);
      // });
      .map(name => this.filterStates(name));
  }


  public ngOnInit() {

    var placeSearch, autocomplete;
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    // var inputItem = document.getElementById(component);

    function initAutocomplete() {
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      autocomplete.addListener('place_changed', fillInAddress);
    }

    function fillInAddress() {
      // Get the place details from the autocomplete object.
      var place = autocomplete.getPlace();

      for (var component in componentForm) {
        // document.getElementById(component).value = '';
        // document.getElementById(component).disabled = false;
      }

      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          console.log('VAL', val);
          // document.getElementById(addressType).value = val;
        }
      }
    }

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    function geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    }


    // initAutocomplete();

    this.uploader.onAfterAddingAll = (items) => {
      items.forEach((file) => {
        file.upload();
      });
    };
    this.uploader.onSuccessItem = (file, item) => {
      try {
        const fileItem = JSON.parse(item);
        this.model.images.push(fileItem);
      } catch (e) {

      }
    };
  }

  filter(val: string): string[] {
    return this.options.filter(option => new RegExp(`^${val}`, 'gi').test(option));
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public onSubmit() {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address' : this.model.startPoint.address }, ( results, status ) => {
      if( status == google.maps.GeocoderStatus.OK ) {
        console.info(results);
      }
    } );

    let story = this.storyRes.create(this.model).subscribe((ret: IStory) => {
      this.router.navigate(['/stories/' + ret._id]);
    });
  }


  onChangeAddress(point: any) {
    this.geocodePoint(point)
        .then(resp => {
          this.startPointSearchResults = resp;
          console.log('startPointResp', resp);
        })
        .catch(err => {
          console.log('ERROR: ', err);
        });
  }

  private geocodePoint(point) {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode( { 'address' : point.address }, ( results, status ) => {
        if( status == google.maps.GeocoderStatus.OK ) {
          return resolve(results);
          /*
           //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
           map.setCenter( results[0].geometry.location );
           var marker = new google.maps.Marker( {
           map     : map,
           position: results[0].geometry.location
           } );*/
        } else {
          reject(`Search address: ${point.address} was not successful`);
          // alert( 'Geocode was not successful for the following reason: ' + status );
        }
      } );
    });
  }
}
