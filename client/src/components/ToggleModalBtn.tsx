
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { toggleModalAction } from '../dux/reducers'


export const ToggleModalBtn: React.FC = () => {
    const dispatch = useDispatch()
    return <Button
        variant="outline-warning"
        size='sm'
        onClick={() => dispatch(toggleModalAction())}>
        + Add House
    </Button>
}

