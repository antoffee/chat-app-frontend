import { ApiUserEntityResponse } from "generated";

export type SidebarChatsProps = { id: string };

export type EditSettingsValues = Pick<ApiUserEntityResponse, 'username' | 'email' | 'name'>
