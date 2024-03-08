import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //==store user data
    storeUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/user",
        body: data,
      }),
    }),
  }),
});

export const { useStoreUserMutation } = authApi;
