import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStore, setResultsModal, submitData } from "../../store/index.ts";
import formConfig from '../../fieldset.ts';

const ResultsModal: React.FC = () => {

    const { resultsModalOpen, submittedData } = useSelector((state: { global: GlobalStore }) => state.global);
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setResultsModal(false));
        dispatch(submitData(null));
    }

    return (
        <Modal show={resultsModalOpen} size='xl' popup>
            <Modal.Header />
            <Modal.Body className='flex flex-col gap-2 items-center justify-center'>
                {formConfig.map((element, i) => Array.isArray(element) ?
                    <div key={i} className='flex gap-6'>{element.map(nested => <div key={nested.id} className='flex gap-2'>{nested.placeholder}: {submittedData?.[nested.id]}</div>)}</div> :
                    <div key={element.id} className='flex gap-2'>{element.placeholder}: {submittedData?.[element.id]}</div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button className='mx-auto' color='blue' onClick={onClose}>Done</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResultsModal;
