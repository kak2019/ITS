import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import "@pnp/sp/site-users/web";
import "@pnp/sp/profiles";
import {
    getGraph,
    getSP
} from '../pnpjsConfig';
import "@pnp/graph/users";
import { spfi } from '@pnp/sp';
import { Logger, LogLevel } from '@pnp/logging';

type UseUser = {
    getUserIDCode: (email: string) => Promise<string>,
    getUserPicture: (userId: string) => Promise<Readonly<UserOperators>>,
};
type UserOperators = [userPicture: string];

export function useUser(): UseUser {

    //graph functiton logic will go here for UserIDCode :EX133xx
    async function getUserIDCode(upn: string): Promise<string> {
        try {
            const graph = getGraph();
            const response = await graph.users.getById(upn).select('onPremisesSamAccountName')();
            return response.onPremisesSamAccountName || '';
        } catch (error) {
            Logger.write(`No UserIDCode found ${error}`, LogLevel.Error);
            return '';
        }
    }

    async function getUserPicture(userId: string): Promise<Readonly<UserOperators>> {
        let userPicture = '';
        let userInfo: ISiteUserInfo;
        if (userId) {
            try {
                const sp = spfi(getSP());
                const r = await sp.web.getUserById(+userId)();
                userInfo = { ...r };
                const propertyName = "PictureURL";
                userPicture = await sp.profiles.getUserProfilePropertyFor(userInfo.LoginName, propertyName);
            }
            catch (error) {
                Logger.write(`No UserPicture found ${error}`, LogLevel.Error);
            }
        }
        return [userPicture] as const;
    }
    return {
        getUserIDCode,
        getUserPicture,
    };
}