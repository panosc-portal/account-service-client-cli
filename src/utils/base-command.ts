import { Command, flags } from '@oclif/command';
import Axios, { AxiosInstance } from 'axios';
import { Role, RoleCreatorDto, User } from '../models';

export abstract class BaseCommand extends Command {
  static baseFlags = {
    help: flags.help({ char: 'h' }),
    url: flags.string({
      char: 'u',
      description: 'URL of the account service',
      default: 'http://localhost:3000'
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

  async getRoles(): Promise<Role[]> {
    const response = await this.apiClient.get('roles');
    return response.data;
  }

  async createRole(role: RoleCreatorDto): Promise<Role> {
    const response = await this.apiClient.post('roles', role);
    return response.data;
  }

  async deleteRole(roleId: number): Promise<boolean> {
    const response = await this.apiClient.delete(`roles/${roleId}`);
    return response.data;
  }

  async getUsers(): Promise<User[]> {
    const response = await this.apiClient.get('users');
    return response.data;
  }
}
