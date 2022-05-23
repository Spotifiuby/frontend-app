import { Audio } from 'expo-av';
import ConnectionSystemInterface from '../ConnectionSystem/ConnectionSystemInterface';
import { buildEndpointFor, jsonFrom } from '../ConnectionSystem/fetch-helpers';
import GenericSystem from '../GenericSystem';
import SongsSystemInterface from './SongsSystemInterface';

const ROOT = 'songs-api';
const RESOURCE = 'songs';
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

  async getSongs() {
    return jsonFrom(this.#connectionSystem().get([ROOT, RESOURCE]));
  }

  async play(aSongID) {
    await soundObject.unloadAsync();
    if (!aSongID) return;
    try {
      const source = await this.#connectionSystem().withHeaders({
        uri: buildEndpointFor(ROOT, RESOURCE, aSongID, 'content'),
      });
      await soundObject.loadAsync(source);
      await soundObject.playAsync();
    } catch (e) {
      console.log(e);
    }
  }

  coverPictureFor(aSong) {
    return buildEndpointFor(ROOT, RESOURCE, aSong.id, 'cover');
  }
}
