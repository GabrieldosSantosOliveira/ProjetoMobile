import { HttpServiceImpl } from '@infra/http/HttpServiceImpl';
import { HttpService } from '@interfaces/HttpService';
import { createContext, FC, ReactNode } from 'react';
export interface IHttpServiceContext {
  httpService: HttpService;
}
export const HttpServiceContext = createContext<IHttpServiceContext>(
  {} as IHttpServiceContext,
);
export interface IHttpServiceProvider {
  children: ReactNode;
}
export const HttpServiceProvider: FC<IHttpServiceProvider> = ({ children }) => {
  const httpServiceImpl = new HttpServiceImpl();
  return (
    <HttpServiceContext.Provider value={{ httpService: httpServiceImpl }}>
      {children}
    </HttpServiceContext.Provider>
  );
};
