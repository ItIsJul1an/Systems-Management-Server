import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import useClientStore from '../../../stores/clientInformationStore'
import {Client} from '../../../data/data_types'

import useHover from '../../../hooks/useHover'

import TooltipManager from '../tooltip/TooltipManager'

import './OnlineStatus.css'

interface OnlineStatusProps {
    client: Client
}

const OnlineStatus = ({client}: OnlineStatusProps) => {

    const {t} = useTranslation()

    const {getClientOnlineStatus} = useClientStore()

    const [hoverRef, isHovered] = useHover()

    const [status, setStatus] = useState<{ status: 'Online' | 'Offline', lastOnline: string }>({
        status: 'Offline',
        lastOnline: ''
    })

    useEffect(() => {
        /* Get default data */
        setStatus(() => getClientOnlineStatus(client.macAddress))

        /* Get new data every minute */
        setInterval(() => {
            setStatus(() => getClientOnlineStatus(client.macAddress))
        }, 60_000)
    }, [])

    return (
        status.status.toLowerCase() === 'online' ?
            <span id='status-online' className='status fs-tr-body-1 fw--semi-bold'>{status.status}</span>
            :
            <>
                <span ref={hoverRef} id='status-offline' className='status fs-tr-body-1 fw--semi-bold'>
                    {status.status}
                </span>

                {
                    (isHovered) ?
                        <TooltipManager content={
                            <span className='fs-sc-body-1'>{t('Last online')} {' '}
                                <span className='fs-sc-body-1 fw--semi-bold'>{t(status.lastOnline)}</span>
                            </span>
                        }/> : null
                }
            </>
    )
}

export default OnlineStatus