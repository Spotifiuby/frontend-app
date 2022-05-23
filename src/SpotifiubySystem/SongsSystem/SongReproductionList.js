import Song from './Song';

export default class SongReproductionList {
  constructor(songs) {
    this.songs = songs.map((songInfo) => new Song(songInfo));
  }

  isOnGoing() { return true; }

  songIdentifiedBy(aSongID) {
    console.log(aSongID)
    console.log(this.#indexOf(aSongID))
    return this.songs[this.#indexOf(aSongID)];
  }

  #indexOf(aSongID) {
    return this.songs.findIndex((song) => song.id === aSongID);
  }

  previousOf(aSongID) {
    const songIndex = this.#indexOf(aSongID);
    if (songIndex === -1) return aSongID;
    const boundedIndex = (songIndex === 0) ? this.songs.length : songIndex;
    return this.songs[boundedIndex - 1].id;
  }

  nextOf(aSongID) {
    const songIndex = this.#indexOf(aSongID);
    if (songIndex === -1) return aSongID;
    return this.songs[(songIndex + 1) % this.songs.length].id;
  }
}
