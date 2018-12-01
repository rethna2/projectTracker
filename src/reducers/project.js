import {
  fetchProjects,
  addProject,
  editProject,
  fetchProjectData
} from '../routines';

const initialState = {
  data: [],
  projectData: [],
  loading: false,
  loadingProjectData: false,
  updating: false,
  error: null
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case fetchProjects.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case fetchProjects.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case fetchProjects.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchProjects.FULFILL:
      return {
        ...state,
        loading: false
      };

    case fetchProjectData.TRIGGER:
      return {
        ...state,
        loadingProjectData: true
      };
    case fetchProjectData.SUCCESS:
      return {
        ...state,
        projectData: action.payload
      };
    case fetchProjectData.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchProjectData.FULFILL:
      return {
        ...state,
        loadingProjectData: false
      };

    case addProject.TRIGGER:
    case editProject.TRIGGER:
      return {
        ...state,
        updating: true
      };
    case addProject.FULFILL:
    case editProject.FULFILL:
      return {
        ...state,
        updating: false
      };
    default:
      return state;
  }
}
