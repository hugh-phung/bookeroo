import React from 'react'
import { Modal, Button} from 'react-bootstrap'
import { useState } from 'react';

export const Success = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        window.location.reload(false)

    }
    const handleCloseOk = () => {
        setShow(false)
        window.location.reload(false)
    }


        return (
        <div>
            <div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Checkout success!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Thank you for shopping with Bookeroo!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseOk}>
                        OK
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )

 

}
