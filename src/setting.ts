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

interface YouthAPISetting {
  readonly host: string;
  readonly policyURI: string;
  readonly spaceURI: string;
  readonly apiKey: string;
}

interface YouthNewsSetting {
  readonly host: string;
}

interface APIServerSetting {
  readonly authURL: string;
}

export class Setting {
  private static _instance: Setting;

  public readonly was: WASSetting;
  public readonly db: DBSetting;
  public readonly worknetAPI: WorknetAPISetting;
  public readonly youthAPI: YouthAPISetting;
  public readonly youthNews: YouthNewsSetting;
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
    this.youthAPI = {
      host: 'https://www.youthcenter.go.kr/opi',
      policyURI: '/empList.do',
      spaceURI: '/wantedSpace.do',
      apiKey: getEnv('YOUTH_POLICY_API_KEY'),
    };
    this.youthNews = {
      host: 'https://www.youthdaily.co.kr/news/section_list_all.html?sec_no=54',
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
