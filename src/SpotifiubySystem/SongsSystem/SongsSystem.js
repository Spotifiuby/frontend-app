import { Audio } from 'expo-av';
import ConnectionSystemInterface from '../ConnectionSystem/ConnectionSystemInterface';
import { buildEndpointFor} from '../ConnectionSystem/fetch-helpers';
import GenericSystem from '../GenericSystem';
import SongsSystemInterface from './SongsSystemInterface';

const SONGS_BASE_URL = 'https://spotifiuby-backend-songs.herokuapp.com'
const ROOT = 'songs-api';
const SONGS_RESOURCE = 'songs';
const ALBUMS_RESOURCE = 'albums';
const ARTISTS_RESOURCE = 'artists';
const PLAYLISTS_RESOURCE = 'playlists';
const CONTENT = 'content';
const soundObject = new Audio.Sound();

export default class SongsSystem extends GenericSystem {
  initialize() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    }).then();
  }

  implementing() {
    return SongsSystemInterface;
  }

  #connectionSystem() {
    return this.parent.systemImplementing(ConnectionSystemInterface);
  }

  getSongs() {
    return this.#connectionSystem().getJson([ROOT, SONGS_RESOURCE]);
  }

  getSongsByArtist(artistId) {
    return this.#connectionSystem().getJson([ROOT, SONGS_RESOURCE], { artist_id: artistId });
  }

  songsFilteredBy(aQuery) {
    return this.#connectionSystem().getJson([ROOT, SONGS_RESOURCE], { q: aQuery });
  }

  artistsFilteredBy(aQuery) {
    return this.#connectionSystem().getJson([ROOT, ARTISTS_RESOURCE], { q: aQuery });
  }

  albumsFilteredBy(aQuery) {
    return this.#connectionSystem().getJson([ROOT, ALBUMS_RESOURCE], { q: aQuery });
  }

  getAlbums() {
    return this.#connectionSystem().getJson([ROOT, ALBUMS_RESOURCE]);
  }

  playlistsFilteredBy(aQuery) {
    return this.#connectionSystem().getJson([ROOT, PLAYLISTS_RESOURCE], aQuery && { q: aQuery });
  }

  getPlaylistSongsFilteredBy(id, aQuery) {
    return this.#connectionSystem().getJson([ROOT, PLAYLISTS_RESOURCE, id, 'songs'], aQuery && { q: aQuery });
  }

  getPlaylistById(id, aQuery) {
    return this.#connectionSystem()
      .getJson([ROOT, PLAYLISTS_RESOURCE, id], aQuery && { q: aQuery });
  }

  async play(aSongID) {
    await soundObject.unloadAsync();
    if (!aSongID) return;
    try {
      const source = {
        uri: `${SONGS_BASE_URL}/${SONGS_RESOURCE}/${aSongID}/${CONTENT}`,
        headers: (await this.#connectionSystem().withHeaders({})).headers,
      };

      console.log(source.headers);
      console.log(source.uri);
      await soundObject.loadAsync(source);
      await soundObject.setStatusAsync({ shouldPlay: true });
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }

  coverPictureFor(aSong) {
    return buildEndpointFor(ROOT, SONGS_RESOURCE, aSong.id, 'cover');
  }

  async #uploadSongFile(aSongFile, songID) {
    const formData = new FormData();
    formData.append('file', aSongFile.output[0], aSongFile.name);

    const requestOptions = {
      method: 'POST',
      headers: (await this.#connectionSystem().withHeaders({})).headers,
      body: formData,
      redirect: 'follow',
    };

    await fetch(`${SONGS_BASE_URL}/${SONGS_RESOURCE}/${songID}/${CONTENT}`, requestOptions);
  }

  async uploadSong(songFile, metadata, album) {
    const metadataResponse = await this.#connectionSystem()
      .postJson(
        [ROOT, SONGS_RESOURCE],
        metadata,
      );
    const songResponse = await metadataResponse.json();
    console.log(songResponse);
    await this.#uploadSongFile(songFile, songResponse.id);
    if (album !== "-") {
      await this.addSongToAlbum(album, songResponse.id);
    }
  }

  async getArtistsOwnedBy(anEmail) {
    return (await this.artistsFilteredBy('')).filter((artist) => artist.user_id === anEmail);
  }

  createNewArtist(anArtistName) {
    const date = { name: anArtistName };
    return this.#connectionSystem().postJson([ROOT, ARTISTS_RESOURCE], date);
  }

  async infoFromArtistIdentifiedBy(anId) {
    const artistInfo = await this.#connectionSystem().getJson([ROOT, ARTISTS_RESOURCE, anId]);
    const songs = (await this.songsFilteredBy(artistInfo.name))
      .filter((song) => song.artists.includes(artistInfo.name));
    return { ...artistInfo, songs };
  }

  async createAlbum(metadata) {
    const metadataResponse = await this.#connectionSystem()
      .postJson([ROOT, ALBUMS_RESOURCE], metadata);
    const songResponse = await metadataResponse.json();
    console.log(songResponse);
  }

  async addSongToAlbum(albumId, songId) {
    const metadataResponse = await this.#connectionSystem().putJson([ROOT, ALBUMS_RESOURCE, albumId, SONGS_RESOURCE, '?song_id='+songId]);
    const songResponse = await metadataResponse.json();
    console.log(songResponse);
  }

  async getAlbumsByArtist(artistId) {
    return this.#connectionSystem().getJson([ROOT, ALBUMS_RESOURCE, `?artist_id=${artistId}`])
  }

  async getSongsByAlbum(albumId) {
    return this.#connectionSystem().getJson([ROOT, ALBUMS_RESOURCE, albumId, SONGS_RESOURCE])
  }

  async createPlaylist(metadata) {
    return this.#connectionSystem().postJson([ROOT, PLAYLISTS_RESOURCE], metadata);
  }
}
