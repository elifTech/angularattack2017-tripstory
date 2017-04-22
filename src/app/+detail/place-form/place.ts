import { Component } from '@angular/core';

export class Place {
  constructor(
    public locationTitle: string,
    public type: string,
    public placeTitle: string,
    public description: string
  ) {  }
}
