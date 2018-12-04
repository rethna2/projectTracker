import {
  fetchProjects,
  addProject,
  editProject,
  deleteProject,
  fetchProjectData
} from '../routines';

const initialState = {
  list: null,
  data: null,
  loadingList: false,
  loading: false,
  updating: false,
  error: null
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case fetchProjects.TRIGGER:
      return {
        ...state,
        loadingList: true
      };
    case fetchProjects.SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case fetchProjects.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchProjects.FULFILL:
      return {
        ...state,
        loadingList: false
      };

    case fetchProjectData.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case fetchProjectData.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case fetchProjectData.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchProjectData.FULFILL:
      return {
        ...state,
        loading: false
      };

    case addProject.TRIGGER:
    case editProject.TRIGGER:
    case deleteProject.TRIGGER:
      return {
        ...state,
        updating: true
      };
    case addProject.FULFILL:
    case editProject.FULFILL:
    case deleteProject.FULFILL:
      return {
        ...state,
        updating: false
      };
    default:
      return state;
  }
}
