import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $title: String!, $description: String!) {
    createTask(name: $name, title: $title, description: $description) {
      id
      name
      title
      description
      status
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $name: String, $title: String, $description: String, $status: Status) {
    updateTask(id: $id, name: $name, title: $title, description: $description, status: $status) {
      id
      name
      title
      description
      status
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
