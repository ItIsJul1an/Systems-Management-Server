import React, {useEffect, useRef, useState} from 'react'

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'

import Dropdown from '../components/form/dropdown/Dropdown'
import KPIComponent from "../components/ui/kpi_component/KPIComponent"
import FullSize from "../components/form/menu/full_size/FullSizeButton";
import TextListComponent from "../components/ui/text_list_component/TextListComponent";
import ScriptDialogToggle from "../components/form/script_dialog_toggle/ScriptDialogToggle";
import SolidDialogButton from "../components/form/dialog_button/solid/SolidDialogButton";
import SolidOutlinedDialogButton
    from "../components/form/dialog_button/outlined/solid_outlined/SolidOutlinedDialogButton";
import DashedOutlinedDialogButton
    from "../components/form/dialog_button/outlined/dashed_outlined/DashedOutlinedDialogButton";
import {useTranslation} from "react-i18next";
import BasicTable from "../components/ui/table/basic_table/BasicTable";
import {DataTypes} from "../data/data_types";
import BasicCardListManager from "../components/ui/card_list/basic_card_list_manager/BasicCardListManager";
import AvailableClientsList from "../components/ui/available_clients_list/AvailableClientsList";
import ChartScriptExecutionsDropdownContent
    from "../components/form/dropdown/chart/script_executions/ChartScriptExecutionDropdownContent";
import useChartScriptExecutionsStore, {Dataset} from "../stores/chartScriptExecutionsStore";
import useChartPackageInstallationsStore from "../stores/chartPackageInstallationsStore";
import ChartPackageInstallationsDropdownContent
    from "../components/form/dropdown/chart/package_installations/ChartPackageInstallationsDropdownContent";
import ChartContainer from "../components/ui/chart/ChartContainer";
import {ChartTypes} from "../data/chart_types";
import FilterTable from "../components/ui/table/filter_table/FilterTable";
import {
    defaultClientData
} from "../components/ui/card_list/basic_card_list/basic_card_list_demo_data/BasicCardListDemoData";
import useClientStore from "../stores/clientInformationStore";
import useScriptStore from "../stores/scriptInformationStore";
import usePackageStore from "../stores/packageInformationStore";
import {
    defaultPackageData,
    defaultScriptData
} from "../components/ui/table/basic_table/basic_table_demo_data/BasicTableDemoData";

const Overview = () => {

    const {t} = useTranslation()

    const cnRef = useRef<HTMLDivElement>(null)

    const [userName, setUserName] = useState('Håkon Wium Lie')
    const [welcomeMessage, setWelcomeMessage] = useState({title: 'Welcome', subTitle: 'How are you feeling today?'})

    const hours: number = new Date().getHours()

    useEffect((): void => {
        getMessageToTime(hours)
    }, [hours])

    const getMessageToTime = (hours: number): void => {
        if (hours < 11) {
            setWelcomeMessage({title: 'Good Morning', subTitle: 'Have you had a good start to the day?'})
        } else if (hours >= 11 && hours <= 12) {
            setWelcomeMessage({title: 'Good Noon', subTitle: 'Lunchtime.'})
        } else if (hours > 12 && hours <= 18) {
            setWelcomeMessage({title: 'Good Afternoon', subTitle: 'Did you finish of some task?'})
        } else {
            setWelcomeMessage({title: 'Good Evening', subTitle: 'Have a restful night.'})
        }
    }

    const {labels, dataSets, tickStepSize, setLabels, setDataSets} = useChartScriptExecutionsStore()
    const {
        packageInstallationlabels,
        packageInstallationDataSets,
        packageInstallationTickStepSize,
        setPackageInstallationLabels,
        setPackageInstallationDataSets
    } = useChartPackageInstallationsStore()

    /* TODO: remove demo data/labels */
    useEffect(() => {
        setLabels(['April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
        setPackageInstallationLabels(['April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])

        const data1: Dataset = {
            label: 'Executed',
            data: [18, 30, 24, 33, 42, 38, 44, 37, 34]
        }

        const data2: Dataset = {
            label: 'Not Executed',
            data: [28, 19, 34, 21, 28, 20, 25, 20, 24]
        }

        setDataSets([data1, data2])

        const data3: Dataset = {
            label: 'Installed',
            data: [28, 19, 20, 25, 28, 20, 34, 21, 24]
        }

        const data4: Dataset = {
            label: 'Not Installed',
            data: [44, 37, 34, 33, 42, 38, 18, 30, 24,]
        }

        setPackageInstallationDataSets([data3, data4])
    }, [])

    return (
        <div style={{
            height: '100%',
            width: '100%',
            background: 'var(--nl-clr-1)',
            borderRadius: '25px 0 0 0',
            padding: '40px',
            gridArea: 'main',
            overflow: 'auto'
        }}>

            {/*
            <h1 className='fs-pr-1 fw--semi-bold'>{t(welcomeMessage.title)}, {userName}!</h1>
            <span className='fs-pr-body-1 fw-regula'>{t(welcomeMessage.subTitle)}</span>

            <section>
                <div style={{display: 'flex', alignItems: ' center', gap: '50px', marginTop: '28px'}}>
                    <KPIComponent title='Amount of Groups' value={4} icon={<PeopleAltRoundedIcon/>}
                                  theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                    <KPIComponent title='Amount of Clients' value={15} icon={<DevicesRoundedIcon/>}
                                  theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-1')}/>
                    <KPIComponent title='Scripts executed' value={1} icon={<TerminalRoundedIcon/>}
                                  theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-3')}/>
                    <KPIComponent title='Packages installed' value={23} icon={<TerminalRoundedIcon/>}
                                  theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                </div>

                <div style={{display: 'flex', gap: '50px', margin: '30px 0'}}>
                    <AvailableClientsList/>

                    <TextListComponent headingContent={
                        <h2 className='fs-qi-1 fw--semi-bold'>{t('Latest Activities')}</h2>
                    }/>
                </div>
            </section>
            */}

            <FilterTable tableType={DataTypes.SCRIPT}/>
        </div>
    )
}

export default Overview