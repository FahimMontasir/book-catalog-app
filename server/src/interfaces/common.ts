export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type IGenericPaginationResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IDecodedUser = {
  _id: string;
  email: string;
  iat: number;
  exp: number;
};

export type IJwtPayload = {
  _id: string;
  email: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken: string;
};
