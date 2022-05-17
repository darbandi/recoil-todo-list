import React, {useState} from 'react'
import {useRecoilCallback, useRecoilValue} from 'recoil'
import styled from 'styled-components'
import {
    Container as TaskContainer,
    taskState,
    TextStyle as TaskTextStyle,
} from './Task'
import {tasksState} from './Tasks'

const InsertInput = styled.input`
    width: 100%;
    height: 100%;
    appearance: none;
    border: 0;
    background-color: transparent;
    outline: none;
    -webkit-appearance: textfield;
    ${TaskTextStyle};

    ::-webkit-search-decoration,
    ::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
`

export const Input: React.FC = () => {
    const [label, setLabel] = useState('')
    const tasks = useRecoilValue(tasksState)

    const insertTask = useRecoilCallback(({set}) => {
        return (label: string) => {
            const newTaskId = tasks.length
            set(tasksState, [...tasks, newTaskId])
            set(taskState(newTaskId), {
                label,
                complete: false,
            })
        }
    })

    return (
        <TaskContainer>
            <InsertInput
                placeholder="Insert a new task..."
                type="search"
                autoComplete="off"
                value={label}
                onChange={({currentTarget}) => {
                    setLabel(currentTarget.value)
                }}
                onKeyUp={({keyCode}) => {
                    if (keyCode === 13) {
                        insertTask(label)
                        setLabel('')
                    }
                }}
            />
        </TaskContainer>
    )
}
