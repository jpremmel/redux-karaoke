//LYRIC INFO
const songLyricsArray = "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', ');

// INITIAL REDUX STATE
const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0
}

//REDUX REDUCER
//pass initialState as the default parameter to reducer in order to set the store's state to initialState when running createStore()
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newArrayPosition = state.arrayPosition + 1;
      newState = {
        songLyricsArray: state.songLyricsArray,
        arrayPosition: newArrayPosition
      }
      return newState;
    case 'RESTART_SONG':
      newState = initialState;
      return newState;
    default:
      return state;
  }
}

//JEST TESTS & SETUP
const { expect } = window;

expect(reducer(initialState, { type: null })).toEqual(initialState);

expect(reducer(initialState, { type: 'NEXT_LYRIC'})).toEqual({
  songLyricsArray: songLyricsArray,
  arrayPosition: 1
});

expect(reducer({
    songLyricsArray: songLyricsArray,
    arrayPosition: 1
  },
  { type: 'RESTART_SONG' })
).toEqual(initialState);

//REDUX STORE
const { createStore } = Redux; //imports the createStore() method from the Redux library
const store = createStore(reducer);

//RENDERING STATE IN DOM
const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
  const renderedLine = document.createTextNode(currentLine);
  document.getElementById('lyrics').appendChild(renderedLine);
}

// window.onload is HTML5 version of jQuery's $(document).ready()
window.onload = function() {
  renderLyrics();
}

// CLICK LISTENER
const userClick = () => {
  if (store.getState().arrayPosition === store.getState().songLyricsArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG' });
  } else {
    store.dispatch({ type: 'NEXT_LYRIC' });
  }
}

//SUBSCRIBE TO REDUX STORE
//subscribe() is a callback that's automatically invoked whenever the Redux store is updated
store.subscribe(renderLyrics);
