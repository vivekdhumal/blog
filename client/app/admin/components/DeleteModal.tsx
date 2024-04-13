'use client'

import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const DeleteModal = ({url = '#', label = '', className = '', message = '', callback}) => {
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();

    const callServerAction = async() => { 
        await callback(); 
        router.refresh();
    }

    return (
        <>
            <a href="javascript:void(0);" className={className} onClick={() => setOpenModal(true)}>{label}</a>
            
            <Modal dismissible show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            { message }
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={callServerAction}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteModal;