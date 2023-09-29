import { selector } from 'recoil';
import { userState } from '../atoms/userAtom';

export const userEmailState = selector({
  key: 'userEmailState',
  get: ({ get }) => {
    const user = get(userState);
    return user.userEmail;
  },
});

export const isLoadingState = selector({
  key: 'isLoadingState',
  get: ({ get }) => {
    const user = get(userState);
    return user.isLoading;
  },
});
