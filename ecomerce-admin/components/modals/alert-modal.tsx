"use client";

import React, { useState } from 'react'
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) => {
    return (
        <Modal
            title='Are you sure'
            description='This cannot be undone.'
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='flex justify-end items-center space-x-2'>
                <Button disabled={loading} variant={'outline'} onClick={onClose}>Close</Button>
                <Button disabled={loading} type="submit" variant={'destructive'} onClick={onConfirm} >Continue</Button>
            </div>
        </Modal >
    )
}
