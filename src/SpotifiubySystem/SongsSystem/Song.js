export default class Song {
  constructor({
    id, name, artists, genre,
  }) {
    this.id = id;
    this.title = name;
    this.artists = artists;
    this.genre = genre;
  }

  artistsDisplayableForm() {
    return this.artists.join(', ');
  }
}
