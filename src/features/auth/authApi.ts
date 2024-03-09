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
    updateUser: builder.mutation({
      query: ({ data, email }) => ({
        method: "PUT",
        url: `/user/${email}`,
        body: data,
      }),
    }),
  }),
});

export const { useStoreUserMutation, useUpdateUserMutation } = authApi;
