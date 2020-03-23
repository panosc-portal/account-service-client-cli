import { Command, flags } from '@oclif/command';
import Axios, { AxiosInstance } from 'axios';
import { Account, AccountCreatorDto, Role, RoleCreatorDto } from '../models';

export abstract class BaseCommand extends Command {
  static baseFlags = {
    help: flags.help({ char: 'h' }),
    url: flags.string({
      char: 'u',
      description: 'URL of the account service',
      default: 'http://localhost:3000'
    }),
    token: flags.string({
      char: 't',
      description: 'access token'
    })
  };

  private _apiClient: AxiosInstance;
  private _accountServiceUrl: string;

  protected set accountServiceUrl(value: string) {
    this._accountServiceUrl = value;
  }

  protected get apiClient(): AxiosInstance {
    if (this._apiClient == null) {
      this._apiClient = Axios.create({
        baseURL: `${this._accountServiceUrl}/api/v1`,
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return this._apiClient;
  }

  async me(token: string): Promise<Role[]> {
    const response = await this.apiClient.get('me', {
      headers: {
        access_token: token
      }
    });
    return response.data;
  }

  async getRoles(): Promise<Role[]> {
    const response = await this.apiClient.get('roles');
    return response.data;
  }

  async createRole(role: RoleCreatorDto): Promise<Role> {
    const response = await this.apiClient.post('roles', role);
    return response.data;
  }

  async deleteAllRoles(): Promise<boolean> {
    const response = await this.apiClient.delete(`roles`);
    return response.data;
  }

  async deleteRole(roleId: number): Promise<boolean> {
    const response = await this.apiClient.delete(`roles/${roleId}`);
    return response.data;
  }

  async getAccounts(): Promise<Account[]> {
    const response = await this.apiClient.get('accounts');
    return response.data;
  }

  async createAccount(account: AccountCreatorDto): Promise<Account> {
    const response = await this.apiClient.post('accounts', account);
    return response.data;
  }

  async addAccountRole(accountId: number, roleId: number): Promise<Account> {
    const response = await this.apiClient.post(
      `/accounts/${accountId}/roles/${roleId}`,
      { accountId: accountId, roleId: roleId }
    );
    return response.data;
  }

  async deleteAccountRole(accountId: number, roleId: number): Promise<Account> {
    const response = await this.apiClient.delete(
      `/accounts/${accountId}/roles/${roleId}`
    );
    return response.data;
  }

  async deleteAllAccounts(): Promise<boolean> {
    const response = await this.apiClient.delete(`accounts`);
    return response.data;
  }

  async deleteAccount(accountId: number): Promise<boolean> {
    const response = await this.apiClient.delete(`accounts/${accountId}`);
    return response.data;
  }
}
