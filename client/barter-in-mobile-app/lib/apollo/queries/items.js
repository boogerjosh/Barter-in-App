import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query Query {
    getItems {
      id
      title
      category
      yearOfPurchase
      Images {
        id
        imageUrl
      }
    }
  }
`;

export const GET_ITEMS_HOME = gql`
  query GetItemsHome {
    getItemsHome {
      id
      title
      category
      yearOfPurchase
      Images {
        id
        imageUrl
      }
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem {
    getItem {
      id
      title
      category
      description
      brand
      yearOfPurchase
      Images {
        id
        imageUrl
      }
      User {
        id
        username
        email
      }
    }
  }
`;

export const GET_MY_ADS = gql`
  query GetMyAds($accessToken: String) {
    getMyAds(access_token: $accessToken) {
      id
      title
      category
      brand
      statusPost
      statusBarter
      Images {
        id
        imageUrl
      }
    }
  }
`;

export const GET_DATA_FOR_BARTER = gql`
  query GetDataForBarter($accessToken: String) {
    getDataForBarter(access_token: $accessToken) {
      id
      title
      category
      brand
      yearOfPurchase
      Images {
        id
        imageUrl
      }
    }
  }
`;

export const GET_ROOM_BARTER = gql`
  query GetRoomBarter($accessToken: String) {
    getRoomBarter(access_token: $accessToken) {
      id
      user1
      user2
      item1
      item2
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($itemId: ID, $accessToken: String) {
    deleteItem(itemId: $itemId, access_token: $accessToken) {
      message
    }
  }
`;

export const POST_ROOM_BARTER = gql`
  mutation PostRoomBarter(
    $accessToken: String
    $user2: ID
    $item1: ID
    $item2: ID
  ) {
    postRoomBarter(
      access_token: $accessToken
      user2: $user2
      item1: $item1
      item2: $item2
    ) {
      id
      user1
      user2
      item1
      item2
    }
  }
`;

export const POST_ITEM = gql`
  mutation Mutation($newItem: inputItem) {
    postItem(newItem: $newItem) {
      message
    }
  }
`;
