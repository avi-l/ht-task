
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { toggleModal } from '../dux/modalSlice'

export const ToggleModalBtn: React.FC = () => {

    const dispatch = useDispatch()

return  <Button variant="outline-warning" size='sm' onClick={() => dispatch(toggleModal())}>+ Add House</Button>
}

