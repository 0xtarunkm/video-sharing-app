import { atom } from 'recoil';

interface UserState {
  userName: string;
  userEmail: string;
  isLoading: boolean;
}

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    userName: '',
    userEmail: '',
    isLoading: false,
  },
});
