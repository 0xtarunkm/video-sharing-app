import { atom } from 'recoil';

interface UserState {
  userEmail: string;
  isLoading: boolean;
}

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    userEmail: '',
    isLoading: false,
  },
});
