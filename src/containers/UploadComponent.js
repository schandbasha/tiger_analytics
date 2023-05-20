import React, { useState } from "react"
import axios from "axios"
import { Button, Tab, Form, Icon, Progress } from "semantic-ui-react"
import { Link } from "react-router-dom"

const MockAdapter = require("axios-mock-adapter")
const mock = new MockAdapter(axios)

mock.onPost("/file/upload/enpoint").reply(200)

const UploadComponent = () => {
    const [statusCode, setStatusCode] = useState("")
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("")

    const fileChange = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const fileUpload = async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        try {
            axios.post("/file/upload/enpoint").then((response) => {
                setStatusCode(response.status)
            })
        } catch (error) {
            console.error(Error(`Error uploading file ${error.message}`))
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault() // Stop form submit
        fileUpload(file)
    }

    const panes = [
        {
            render: () => (
                <Tab.Pane>
                    <Form onSubmit={onFormSubmit}>
                        <Form.Field>
                            <label>File input & upload </label>
                            <Button
                                as="label"
                                htmlFor="file"
                                type="button"
                                animated="fade"
                            >
                                <Button.Content visible>
                                    <Icon name="file" />
                                </Button.Content>
                                <Button.Content hidden>
                                    Choose a File
                                </Button.Content>
                            </Button>
                            <input
                                type="file"
                                id="file"
                                hidden
                                onChange={fileChange}
                            />
                            <Form.Input
                                fluid
                                label="File Chosen: "
                                placeholder="Use the above bar to browse your file system"
                                readOnly
                                value={fileName}
                            />
                            <Link to="/list">
                                <Button
                                    style={{ marginTop: "20px" }}
                                    type="submit"
                                >
                                    Upload
                                </Button>
                            </Link>
                            {statusCode && statusCode === 200 ? (
                                <Progress
                                    style={{ marginTop: "20px" }}
                                    percent={100}
                                    success
                                    progress
                                >
                                    File Upload Success
                                </Progress>
                            ) : statusCode && statusCode === 500 ? (
                                <Progress
                                    style={{ marginTop: "20px" }}
                                    percent={100}
                                    error
                                    active
                                    progress
                                >
                                    File Upload Failed
                                </Progress>
                            ) : null}
                        </Form.Field>
                    </Form>
                </Tab.Pane>
            ),
        },
    ]
    return (
        <>
            <Tab menu={{ pointing: true }} panes={panes} />
        </>
    )
}

export default UploadComponent
