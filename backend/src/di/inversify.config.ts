import { Container } from "inversify";
import ProfileController from "../features/profile/profile.controller";
import ProfileRepository from "../features/profile/profile.repository";
import ProfileService from "../features/profile/profile.service";
import TYPES from "./inversify.types";
import ProfileValidator from "../validator/profile.validator";
import AppController from "../features/apps/apps.controller";
import AppRepository from "../features/apps/apps.repository";
import AppService from "../features/apps/apps.service";
import AppValidator from "../validator/app.validator";
import AppUsersController from "../features/app_users/app-users.controller";
import AppUsersRepository from "../features/app_users/app-users.repository";
import AppUsersService from "../features/app_users/app-users.service";
import AppUsersValidator from "../validator/app.users.validator";
import ChannelController from "../features/channels/channel.controller";
import ChannelRepository from "../features/channels/channel.repository";
import ChannelService from "../features/channels/channel.service";
import ChannelValidator from "../validator/channel.validator";

const container = new Container();

// Profile binding
container.bind(TYPES.ProfileValidator).to(ProfileValidator);
container.bind(TYPES.ProfileRepository).to(ProfileRepository);
container.bind(TYPES.ProfileService).to(ProfileService);
container.bind(TYPES.ProfileController).to(ProfileController);

// App binding
container.bind(TYPES.AppValidator).to(AppValidator);
container.bind(TYPES.AppRepository).to(AppRepository);
container.bind(TYPES.AppService).to(AppService);
container.bind(TYPES.AppController).to(AppController);

// AppUsers binding
container.bind(TYPES.AppUsersValidator).to(AppUsersValidator);
container.bind(TYPES.AppUsersRepository).to(AppUsersRepository);
container.bind(TYPES.AppUsersService).to(AppUsersService);
container.bind(TYPES.AppUsersController).to(AppUsersController);

// Channel binding
container.bind(TYPES.ChannelValidator).to(ChannelValidator);
container.bind(TYPES.ChannelRepository).to(ChannelRepository);
container.bind(TYPES.ChannelService).to(ChannelService);
container.bind(TYPES.ChannelController).to(ChannelController);

export default container;
