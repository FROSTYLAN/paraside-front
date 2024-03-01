import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar, Stack } from 'rsuite';
import { Text } from '@/components/elements';
import { BiSliderAlt } from 'react-icons/bi';
import { Filters } from '../filters/filters';
import styles from './panel-header.module.scss';
import { getNumNewRequests, cleanNewRequests } from '@/api/user-match';

export const PanelHeader = ({ role, onToggleButtons, show }) => {
    const [showFilters, setShowFilters] = useState(false);
    const onToggleFilters = () => setShowFilters((prev) => !prev);
    const [counter, setCounter] = useState(0);

    const fetchData = async () => {
        try {
            const  { data: num } = await getNumNewRequests();
            if (num !== undefined) setCounter(num);
        } catch (error) {
            console.error('Error al obtener el número de solicitudes:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

    const clean = async () => {
        try {
            await cleanNewRequests(); 
            setCounter(0);
        } catch (error) {
            console.error('Error al limpiar las solicitudes:', error);
        }
    };
    
    if (role === 'suscriptor') {
        return (
            <>
                <Stack justifyContent="space-between">
                    <Text tag="h2" size={20} weight="black" style={{ lineHeight: '2' }}>
                        Gente cerca
                    </Text>
                    <ButtonToolbar>
                        <Button
                            appearance="ghost"
                            style={{ padding: '0.4rem', margin: '0', display: 'flex' }}
                            onClick={onToggleFilters}
                        >
                            <BiSliderAlt style={{ fontSize: '2.4rem' }} />
                        </Button>
                    </ButtonToolbar>
                </Stack>
                <Filters setShowFilters={setShowFilters} showFilters={showFilters} />
            </>
        );
    }

    if (role === 'creator') {
        return (
            <Stack justifyContent="center">
                <Button
                    className={`${styles.button} ${show ? styles.active : styles.inactive}`}
                    appearance="ghost"
                    onClick={() => onToggleButtons(true)}
                >
                    CONTACTOS
                </Button>
                <Button
                    className={`${styles.button} ${!show ? styles.active : styles.inactive}`}
                    appearance="ghost"
                    onClick={() => {
                        onToggleButtons(false)
                        clean()
                    }}
                >
                    SOLICITUDES
                    {
                       counter !== 0 && <div className={styles.counter}>{counter}</div>
                    }
                </Button>
            </Stack>
        );
    }

    return null; 
}
