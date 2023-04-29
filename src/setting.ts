const convertStringToBoolean = (str: string): boolean => (str === '1' ? true : false);

function getEnv(target: string) {
  const value = process.env[target];
  if (!value) throw new Error(`${target} is not defined`);
  return value;
}

interface WASSetting {
  readonly port: number;
  readonly authServerURL: string;
}

interface DBSetting {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly tablesync: boolean;
}

interface WorknetAPISetting {
  readonly host: string;
  readonly apiKey: string;
}

interface YouthPolicyAPISetting {
  readonly host: string;
  readonly apiKey: string;
}

interface APIServerSetting {
  readonly authURL: string;
}

export class Setting {
  private static _instance: Setting;

  public readonly was: WASSetting;
  public readonly db: DBSetting;
  public readonly worknetAPI: WorknetAPISetting;
  public readonly youthPolicyAPI: YouthPolicyAPISetting;
  public readonly authServer: APIServerSetting;

  constructor() {
    if (Setting._instance) {
      throw new Error('Error - use Setting.getInstance()');
    }

    this.was = {
      port: Number(getEnv('WAS_PORT')),
      authServerURL: getEnv('AUTH_SERVER_URL'),
    };
    this.db = {
      host: getEnv('MYSQL_HOSTNAME'),
      port: Number(getEnv('MYSQL_PORT')),
      database: getEnv('MYSQL_DATABASE'),
      user: getEnv('MYSQL_USER'),
      password: getEnv('MYSQL_PASSWORD'),
      tablesync: convertStringToBoolean(getEnv('MYSQL_TABLE_SYNC')),
    };
    this.worknetAPI = {
      host: getEnv('WORKNET_API_HOST'),
      apiKey: getEnv('WORKNET_API_KEY'),
    };
    this.youthPolicyAPI = {
      host: getEnv('YOUTH_POLICY_API_HOST'),
      apiKey: getEnv('YOUTH_POLICY_API_KEY'),
    };
    this.authServer = {
      authURL: getEnv('AUTH_SERVER_URL'),
    };
  }

  public static getInstance(): Setting {
    if (!this._instance) {
      this._instance = new Setting();
    }
    return this._instance;
  }
}

export const setting = Setting.getInstance();
