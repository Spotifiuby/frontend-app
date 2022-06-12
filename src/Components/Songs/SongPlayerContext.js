import { createContext, useMemo } from 'react';

const SongPlayerContext = createContext();

// eslint-disable-next-line react/prop-types
export const WithSongPlayerContext = ({ setCurrentlyPlayingID, setSongsList, children }) => {
  const songPlayerSetting = useMemo(() => ({ setCurrentlyPlayingID, setSongsList }), []);

  return (
    <SongPlayerContext.Provider value={songPlayerSetting}>
      {children}
    </SongPlayerContext.Provider>
  );
};

export default SongPlayerContext;
