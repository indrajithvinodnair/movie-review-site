import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  type = '';
  id = '';
  url = '';
  movies: any;
  movieData: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];

    if (this.type == 'trending') {
      this.url = 'http://localhost:4200/assets/data/trending-movies.json';
    }
    else if (this.type == 'theatre') {
      this.url = 'http://localhost:4200/assets/data/theatre-movies.json';
    }
    else {
      this.url = 'http://localhost:4200/assets/data/popular-movies.json';
    }

    this.getMovieDetails();
  }

  getMovieDetails() {

    this.http.get(this.url).subscribe((data) => {
      this.movies = data;
      // search for the index in a json array
      let index = this.movies.findIndex((movie: { id: string }) => movie.id == this.id)
      this.movieData = this.movies[index];
    })

  }

}
