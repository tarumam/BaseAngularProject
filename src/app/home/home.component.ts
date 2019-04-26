import { Component, OnInit } from '@angular/core';
import { SeoService, SeoModel } from './../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(seoService: SeoService) {
    let seoModel: SeoModel;
    seoModel = {
      title: 'Seja bem vindo',
      robots: 'Index,Follow',
      description: '',
      keywords: ''
    };
    seoService.setSeoData(seoModel);
  }

  ngOnInit() {
  }

}
