'use client';

import { useState } from "react";



export const HealthLogModal = ({modalOpen, setModalOpen} : any) => {
    const [formDetails, setFormDetails] = useState({
        dietQuality: 0,
    })

    return (
        <dialog className="w-4xl h-36 flex flex-col items-center justify-center">

        <button className="bg-red-500 p-12" onClick={() => setModalOpen(false)}>close modal</button>
        </dialog>
    )
};