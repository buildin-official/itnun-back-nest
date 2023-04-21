function convertStringToBoolean(str: string): boolean {
  if (str === '0') {
    return false;
  } else if (str === '1') {
    return true;
  } else {
    throw new Error('Input string must be either "0" or "1"');
  }
}
class WASSetting {
  readonly port: number;
  readonly authServerURL: string;
  constructor() {
    if (!process.env.WAS_PORT) throw new Error('WAS_PORT is not defined');
    if (!process.env.AUTH_SERVER_URL) throw new Error('AUTH_SERVER_URL is not defined');
    this.port = Number(process.env.WAS_PORT);
    this.authServerURL = process.env.AUTH_SERVER_URL;
  }
}

class DBSetting {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly tablesync: boolean;
  // get these env variables and if not exist, raise error
  constructor() {
    if (!process.env.MYSQL_HOSTNAME) throw new Error('MYSQL_HOSTNAME is not defined');
    if (!process.env.MYSQL_PORT) throw new Error('MYSQL_PORT is not defined');
    if (!process.env.MYSQL_DATABASE) throw new Error('MYSQL_DATABASE is not defined');
    if (!process.env.MYSQL_USER) throw new Error('MYSQL_USER is not defined');
    if (!process.env.MYSQL_PASSWORD) throw new Error('MYSQL_PASSWORD is not defined');
    if (!process.env.MYSQL_TABLE_SYNC) throw new Error('TABLE_SYNC is not defined');
    this.host = process.env.MYSQL_HOSTNAME;
    this.port = Number(process.env.MYSQL_PORT);
    this.database = process.env.MYSQL_DATABASE;
    this.user = process.env.MYSQL_USER;
    this.password = process.env.MYSQL_PASSWORD;
    this.tablesync = convertStringToBoolean(process.env.MYSQL_TABLE_SYNC);
  }
}

class YouthPolicyAPISetting {
  readonly host: string;
  readonly apiKey: string;
  constructor() {
    if (!process.env.YOUTH_POLICY_API_HOST) throw new Error('YOUTH_POLICY_API_HOST is not defined');
    if (!process.env.YOUTH_POLICY_API_KEY) throw new Error('YOUTH_POLICY_API_KEY is not defined');
    this.host = process.env.YOUTH_POLICY_API_HOST;
    this.apiKey = process.env.YOUTH_POLICY_API_KEY;
  }
}

class Setting {
  readonly was: WASSetting;
  readonly db: DBSetting;
  readonly youthPolicyAPI: YouthPolicyAPISetting;
  constructor() {
    this.was = new WASSetting();
    this.db = new DBSetting();
    this.youthPolicyAPI = new YouthPolicyAPISetting();
  }
}

export const setting = new Setting();
