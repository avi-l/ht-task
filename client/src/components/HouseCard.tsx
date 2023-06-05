import React, { useState } from 'react';

import { HouseCardProps } from '../types/types';
import { Card, Stack, Button } from 'react-bootstrap';
import { deleteHouseById } from '../api/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const HouseCard: React.FC<HouseCardProps> = ({ house }) => {
    const { address, currentValue, loanAmount, risk, id = 0 } = house;

    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const handleDelete = async () => {
        try {
            setLoading(true)
            await deleteHouseById(id)
            dispatch({type: 'DELETE_HOUSE', payload: house})
            toast.success('Record Deleted')
        } catch (error) {
            console.error(error)
            toast.error('Ooops, problem deleting this record')
        } finally { setLoading(false) }
    }
    return (
        <Card style={{ width: '18rem', height: '14rem', padding: '2px', margin: '2px' }}>
            <Card.Body>
                <Card.Title>{address}</Card.Title>
                <Card.Text>
                    Current Value: {currentValue}
                    <br />
                    Loan Amount: {loanAmount}
                    <br />
                    Risk: {risk}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className="flex justify-end">
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="secondary" onClick={() => null}>
                            Edit
                        </Button>
                        <Button
                            variant="warning"
                            disabled={loading}
                            onClick={handleDelete}
                        >
                            {loading ? 'Deleting..' : 'Delete'}
                        </Button>
                    </Stack>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default HouseCard;
