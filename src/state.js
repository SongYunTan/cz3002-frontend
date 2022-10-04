import {createGlobalState} from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  globalUsername: '',
});

export { setGlobalState, useGlobalState };