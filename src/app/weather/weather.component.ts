import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {

  myWeather: any;
  temperature: number;
  feelsLikeTemp: number;
  humidity: number;
  pressure: number;
  summary: string;
  iconUrl: any;
  city: string = 'Rio de Janeiro';
  units: string = 'metric';
  formWeather: FormGroup;
  displayCity: string;
  messageError: any;

  createForm() {

    this.formWeather = this.formBuilder.group({
      city: ['', [Validators.required]],
    });
  }

  constructor(private weatherService: WeatherService, private formBuilder: FormBuilder) { }

  send() {

    if (this.formWeather.invalid) return;

    let sendCityData = this.formWeather.getRawValue();
    this.city = sendCityData.city;

    this.fetchData();
  }

  fetchData() {

    this.weatherService.getweather(this.city, this.units).subscribe({

      next: (res: any) => {
        console.log(res);
        this.myWeather = res;
        console.log(this.myWeather);
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;
        this.displayCity = this.myWeather.name;

        this.iconUrl = 'http://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';
      },

      error: (error: any) => console.log(error.message),

      complete: () => console.info('API call completed')
    })
  }

  ngOnInit(): void {
    this.createForm();

    // - Standard : Rio de Janeiro
    this.fetchData();

  }
}
