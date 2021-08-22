import { instance, ResponseType } from "./todolist-api";

export const authAPI = {
   login(data: LoginType) {
     return instance.post<ResponseType<{ userId: number }>>(`auth/login`, data);
   },
   logout() {
     return instance.delete<ResponseType>(`auth/login`);
   },
   me() {
     return instance.get<ResponseType<{ data: GetAuthResponse }>>(`auth/me`);
   },
 };
 export type LoginType = {
   email: string;
   password: string;
   rememberMe: boolean;
   captcha?: string;
 };
 type GetAuthResponse = {
   id: number;
   email: string;
   login: string;
 };