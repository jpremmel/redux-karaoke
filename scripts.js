//LYRIC INFO
const songList = {
  1: "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', '),
  2: "When I was a little kid, I never liked to eat, Mom would put things on my plate, And I'd dump 'em on her feet, But then one day she made this soup, I ate it all in bed, I asked her what she put in it, And this is what she said:, Oh chicken lips and lizard hips, And alligator eyes, Monkey legs and buzzard eggs, And salamander thighs, Rabbit ears and camel rears, And tasty toenail pies, Stir 'em all together, And it's mama's soup surprise, I went into the bathroom, And I stood beside the sink, I said \"I'm feeling slightly ill, And I think I'd like a drink\", Mama said, \"I've just the thing, I'll get it in a wink, It's full of lots of protein, And vitamins I think\", It was chicken lips and lizard hips, And alligator eyes, Monkey legs and buzzard eggs, And salamander thighs, Rabbit ears and camel rears, And tasty toenail pies, Stir 'em all together, And it's mama's soup surprise".split(", ")
};

// INITIAL REDUX STATE
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Bye Bye Bye",
      artist: "N'Sync",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "Chicken Lips and Lizard Hips",
      artist: "Nancy Cassidy & John Cassidy",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    }
  }
};

//REDUX REDUCER
//pass initialState as the default parameter to reducer in order to set the store's state to initialState when running createStore()
//provide only the slice of state that this reducer is responsible for
const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    case 'RESTART_SONG':
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    default:
      return state;
  }
}

//JEST TESTS & SETUP
const { expect } = window;

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2 })).toEqual({
  1: {
    title: "Bye Bye Bye",
    artist: "N'Sync",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "Chicken Lips and Lizard Hips",
    artist: "Nancy Cassidy & John Cassidy",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1,
  }
});

expect(lyricChangeReducer(initialState.songById, { type: 'RESTART_SONG', currentSongId: 1 })).toEqual({
  1: {
    title: "Bye Bye Bye",
    artist: "N'Sync",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "Chicken Lips and Lizard Hips",
    artist: "Nancy Cassidy & John Cassidy",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});

//REDUX STORE
const { createStore } = Redux; //imports the createStore() method from the Redux library
const store = createStore(lyricChangeReducer);

//RENDERING STATE IN DOM
// const renderLyrics = () => {
//   const lyricsDisplay = document.getElementById('lyrics');
//   while (lyricsDisplay.firstChild) {
//     lyricsDisplay.removeChild(lyricsDisplay.firstChild);
//   }
//   const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
//   const renderedLine = document.createTextNode(currentLine);
//   document.getElementById('lyrics').appendChild(renderedLine);
// }

// // window.onload is HTML5 version of jQuery's $(document).ready()
// window.onload = function() {
//   renderLyrics();
// }

// CLICK LISTENER
// const userClick = () => {
//   if (store.getState().arrayPosition === store.getState().songLyricsArray.length - 1) {
//     store.dispatch({ type: 'RESTART_SONG' });
//   } else {
//     store.dispatch({ type: 'NEXT_LYRIC' });
//   }
// }

//SUBSCRIBE TO REDUX STORE
//subscribe() is a callback that's automatically invoked whenever the Redux store is updated
// store.subscribe(renderLyrics);
