export default class Song {
  constructor({
    id, name, artists, genre, status,
  }) {
    this.id = id;
    this.title = name;
    this.artists = artists;
    this.genre = genre;
    this.status = status;
  }

  isUploaded() {
    return this.status === 'active';
  }

  artistsDisplayableForm() {
    return this.artists.join(', ');
  }
}
