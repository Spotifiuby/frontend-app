import propTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import SystemContext from '../SpotifiubySystem/DefaultSystemContext';
import SongReproductionList from '../SpotifiubySystem/SongsSystem/SongReproductionList';
import SongsSystemInterface from '../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import MainNavigation from './MainNavigation';
import InlineSongPlayer from './Songs/InlineSongPlayer';
import { WithSongPlayerContext } from './Songs/SongPlayerContext';

const AuthorizedAppContent = ({ userType }) => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const [currentlyPlayingID, setCurrentlyPlayingID] = useState('');
  const [songsList, setSongsList] = useState(new SongReproductionList([]));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    songsSystem.initialize();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await songsSystem.play(currentlyPlayingID);
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    })();
  }, [currentlyPlayingID, isLoading]);
  if (isLoading) return null;
  return (
    <WithSongPlayerContext
      setCurrentlyPlayingID={setCurrentlyPlayingID}
      setSongsList={setSongsList}
    >
      {currentlyPlayingID ? (
        <InlineSongPlayer
          songsList={songsList}
          currentlyPlayingID={currentlyPlayingID}
        />
      ) : null}
      <MainNavigation
        userType={userType}
      />
    </WithSongPlayerContext>
  );
};

AuthorizedAppContent.propTypes = {
  userType: propTypes.string.isRequired,
};

export default AuthorizedAppContent;
