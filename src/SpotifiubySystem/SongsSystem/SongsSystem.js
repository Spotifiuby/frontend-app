import { Audio } from 'expo-av';
// import TrackPlayer from 'react-native-track-player';
import ConnectionSystemInterface from '../ConnectionSystem/ConnectionSystemInterface';
import { buildEndpointFor, post, getFrom } from '../ConnectionSystem/fetch-helpers';
import GenericSystem from '../GenericSystem';
import getFromSettings, { SONGS_URL } from '../settings';
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

  // async initialize() {
  //   await TrackPlayer.setupPlayer();
  //   TrackPlayer.registerPlaybackService(async () => {
  //     TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  //     TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  //     TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
  //   });
  //   TrackPlayer.updateOptions({
  //     stopWithApp: true,
  //   });
  //   const track = {
  //     url: 'https://spotifiuby-backend-songs.herokuapp.com/songs/62a69fdcfe78b4e55112e79d/content', // Load media from the network
  //     title: 'Avaritia',
  //     artist: 'deadmau5',
  //     album: 'while(1<2)',
  //     headers: {
  //       authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZWY1NjlmNTI0MTRlOWY0YTcxMDRiNmQwNzFmMDY2ZGZlZWQ2NzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3BvdGlmaXVieS0yYzBiMiIsImF1ZCI6InNwb3RpZml1YnktMmMwYjIiLCJhdXRoX3RpbWUiOjE2NTUwNjYwNTgsInVzZXJfaWQiOiJYT0xnQzlzMHByZXJUUXNRSFRQTkZoVFFMU0UzIiwic3ViIjoiWE9MZ0M5czBwcmVyVFFzUUhUUE5GaFRRTFNFMyIsImlhdCI6MTY1NTE0MjQ5NiwiZXhwIjoxNjU1MTQ2MDk2LCJlbWFpbCI6ImFndXN0aW40Mjdtb3JlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZ3VzdGluNDI3bW9yZUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mz---8byTK_Vv47cZ7QOp-d4uUGwMuN-Li-e9bfI61ggbVZXHtVe29cvcvr0qCFg8shW_RB1oPTwW_cs6danGKxTyU1AZLToun-UF626Rck4mLBYlTQY5W3hvjJ6e8jEGdwQ6GKJJ6R3SbLTLpJ5dnd5kFzI4gLmxwC7ooDr2-luzWq4EjV7e79c7mnQdNyFwU2FNuFvraTnXYyrVUr6JmF6PSWRSfFT0UmGsboA2vrFaDPSrGGKhw4YpB7MijmTnZ8xVqgpDBWFT06jn8ffS2wbbAK46iIvpeLBpfk6XriziC9NKGdjeR_FNfRfbsrgtRgfHetmuTCKUAOFxrcIaQ',
  //       'x-api-key': '2dd8cb76-c568-4338-a002-1955d414eb53',
  //       'x-user-id': 'agustin427more@gmail.com',

  //     },
  //     // genre: 'Progressive House, Electro House',
  //     // date: '2014-05-20T07:00:00+00:00', // RFC 3339
  //     // artwork: 'http://example.com/cover.png', // Load artwork from the network
  //     // duration: 402, // Duration in seconds
  //   };
  //   // // You can then [add](https://react-native-track-player.js.org/docs/api/functions/queue#addtracks-insertbeforeindex) the items to the queue
  //   await TrackPlayer.add([track]);
  // }

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
      const source = await {
        uri: `${getFromSettings(SONGS_URL)}/${SONGS_RESOURCE}/${aSongID}/${CONTENT}`,
        headers: (await this.#connectionSystem().withHeaders({})).headers,
      };
      // console.log([
      //   `${getFromSettings(SONGS_URL)}/${SONGS_RESOURCE}/${aSongID}/${CONTENT}`,
      //   (await this.#connectionSystem().withHeaders({})).headers,
      // ]);
      // const source = await getFrom(
      //   `${getFromSettings(SONGS_URL)}/${SONGS_RESOURCE}/${aSongID}/${CONTENT}`,
      //   (await this.#connectionSystem().withHeaders({})).headers,
      // );
      console.log(source);

      console.log(source.headers);
      console.log(source.uri);
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
    const { headers } = (await this.#connectionSystem().withHeaders({}));
    const formData = new FormData();
    const { name, mimeType, uri } = aSongFile;
    formData.append('file', { uri, name, type: mimeType });
    await post(`${getFromSettings(SONGS_URL)}/${SONGS_RESOURCE}/${songID}/${CONTENT}`, formData, headers);
  }

  async uploadSong(songFile, metadata) {
    const metadataResponse = await this.#connectionSystem()
      .postJson(
        [ROOT, SONGS_RESOURCE],
        metadata,
      );
    const songResponse = await metadataResponse.json();
    console.log(songResponse);
    await this.#uploadSongFile(songFile, songResponse.id);
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
}
