import { UserService } from '../services/index.js';
import { Container } from './container.js';

export const appContainer = new Container();
appContainer.register('usersService', new UserService());
