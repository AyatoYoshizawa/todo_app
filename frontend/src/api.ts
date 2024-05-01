import { Configuration, DefaultApi } from "./api/axios";

export class API {
    private static _instance?: DefaultApi;

    static get instance(): DefaultApi {
        if (!API._instance) {
            const config = new Configuration({
                basePath: 'http://localhost:8000',
            });
            API._instance = new DefaultApi(config);
        }

        return API._instance!;
    }
}