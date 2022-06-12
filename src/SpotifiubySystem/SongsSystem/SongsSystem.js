import { Audio } from 'expo-av';
import ConnectionSystemInterface from '../ConnectionSystem/ConnectionSystemInterface';
import { buildEndpointFor, post } from '../ConnectionSystem/fetch-helpers';
import GenericSystem from '../GenericSystem';
import getFromSettings, { LOCAL_SONGS_URL } from '../settings';
import SongsSystemInterface from './SongsSystemInterface';

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
    });
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

  songsFilteredBy(aQuery) {
    return this.#connectionSystem().getJson([ROOT, SONGS_RESOURCE], { q: aQuery });
  }

  artistsFilteredBy(aQuery) {
    return this.#connectionSystem().getJson([ROOT, ARTISTS_RESOURCE], { q: aQuery });
  }

  albumsFilteredBy(aQuery) {
    return this.#connectionSystem().getJson([ROOT, ALBUMS_RESOURCE], { q: aQuery });
  }

  playlistsFilteredBy(aQuery) {
    return this.#connectionSystem().getJson([ROOT, PLAYLISTS_RESOURCE], { q: aQuery });
  }

  async play(aSongID) {
    await soundObject.unloadAsync();
    if (!aSongID) return;
    try {
      const source = await this.#connectionSystem().withHeaders({
        uri: buildEndpointFor(ROOT, SONGS_RESOURCE, aSongID, CONTENT),
      });
      await soundObject.loadAsync(source);
      await soundObject.playAsync();
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }

  coverPictureFor(aSong) {
    return buildEndpointFor(ROOT, SONGS_RESOURCE, aSong.id, 'cover');
  }

  async #uploadSongFile(aSongFile, songID) {
    // const { name, size, uri } = aSongFile;
    // const type = 'application/mp3';
    // const songFileToUpload = { name, size, uri, type };
    // const fileUploadResponse = await this.#connectionSystem()
    //   .post(
    //     [ROOT, SONGS_RESOURCE, songID, CONTENT],
    //     formData,
    //     headers,
    //   );
    const formData = new FormData();
    const { name, mimeType, uri } = aSongFile;
    formData.append('file', { uri, name, type: mimeType });
    await post(`${getFromSettings(LOCAL_SONGS_URL)}/${SONGS_RESOURCE}/${songID}/${CONTENT}`, formData);
  }

  async uploadSong(songFile, { title, artist }) {
    const artists = [artist];
    const name = title;
    const genre = 'default';
    const metadataResponse = await this.#connectionSystem()
      .postJson(
        [ROOT, SONGS_RESOURCE],
        { name, artists, genre },
      );
    const songResponse = await metadataResponse.json();
    console.log(songResponse);
    // await this.#uploadSongFile(songFile, songResponse.id);
  }
}
