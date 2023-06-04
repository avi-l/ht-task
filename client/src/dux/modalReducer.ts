export interface ModalState {
    isOpen: boolean;
  }

  const initialState: ModalState = {
    isOpen: false,
  };
  
  export const toggleModal = () => ({
    type: 'TOGGLE_MODAL',
  });
  
  const modalReducer = (state = initialState, action: { type: string; }) => {
    switch (action.type) {
      case 'TOGGLE_MODAL':
        return {
          ...state,
          isOpen: !state.isOpen,
        };
      default:
        return state;
    }
  };
  
  export default modalReducer;
  